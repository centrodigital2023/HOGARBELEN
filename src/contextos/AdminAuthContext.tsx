import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useKV } from '@github/spark/hooks';
import { AdminUser, AdminSession, LoginAttempt } from '@/types/admin';
import { generateTOTPSecret, verifyTOTPToken } from '@/lib/totp';
import { logAudit } from '@/lib/audit';

interface AdminAuthContextType {
  adminUser: AdminUser | null;
  adminSession: AdminSession | null;
  loading: boolean;
  totpRequired: boolean;
  loginWithCredentials: (email: string, password: string) => Promise<{ success: boolean; error?: string; requiresTOTP?: boolean }>;
  verifyTOTP: (token: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isSuperAdmin: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const MAX_LOGIN_ATTEMPTS = 3;
const LOCKOUT_DURATION = 5 * 60 * 1000;

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [adminSession, setAdminSession] = useKV<AdminSession | null>('admin-session', null);
  const [adminUsers] = useKV<Record<string, AdminUser>>('admin-users', {});
  const [adminPasswords] = useKV<Record<string, string>>('admin-passwords', {});
  const [loginAttempts, setLoginAttempts] = useKV<LoginAttempt[]>('login-attempts', []);
  const [tempUserId, setTempUserId] = useState<string | null>(null);
  const [totpRequired, setTotpRequired] = useState(false);
  const [loading, setLoading] = useState(false);

  const adminUser = adminSession?.user ?? null;
  const isAuthenticated = !!adminSession && adminSession.totp_verified && adminSession.expires_at > Date.now();
  const isSuperAdmin = adminUser?.role === 'super_admin';

  useEffect(() => {
    if (adminSession && adminSession.expires_at <= Date.now()) {
      setAdminSession(null);
    }
  }, [adminSession]);

  const getClientIP = () => {
    return 'client-ip-placeholder';
  };

  const isAccountLocked = (email: string): boolean => {
    const now = Date.now();
    const recentAttempts = (loginAttempts || []).filter(
      attempt => 
        attempt.email === email && 
        !attempt.success && 
        (now - attempt.timestamp) < LOCKOUT_DURATION
    );
    return recentAttempts.length >= MAX_LOGIN_ATTEMPTS;
  };

  const recordLoginAttempt = async (email: string, success: boolean) => {
    const attempt: LoginAttempt = {
      email,
      ip_address: getClientIP(),
      timestamp: Date.now(),
      success,
    };

    await setLoginAttempts((current) => {
      const filtered = (current || []).filter(
        a => (Date.now() - a.timestamp) < LOCKOUT_DURATION
      );
      return [...filtered, attempt];
    });
  };

  const loginWithCredentials = async (email: string, password: string) => {
    setLoading(true);
    try {
      if (isAccountLocked(email)) {
        await logAudit({
          user_id: 'unknown',
          user_email: email,
          action: 'login_blocked',
          resource_type: 'authentication',
          details: { reason: 'too_many_attempts' },
          ip_address: getClientIP(),
          user_agent: navigator.userAgent,
        });

        return { 
          success: false, 
          error: 'Cuenta bloqueada temporalmente por múltiples intentos fallidos. Intente de nuevo en 5 minutos.' 
        };
      }

      const users = await window.spark.kv.get<Record<string, AdminUser>>('admin-users') ?? {};
      const user = Object.values(users).find(u => u.email === email);

      if (!user) {
        await recordLoginAttempt(email, false);
        await logAudit({
          user_id: 'unknown',
          user_email: email,
          action: 'login_failed',
          resource_type: 'authentication',
          details: { reason: 'user_not_found' },
          ip_address: getClientIP(),
          user_agent: navigator.userAgent,
        });
        return { success: false, error: 'Credenciales inválidas' };
      }

      const passwords = await window.spark.kv.get<Record<string, string>>('admin-passwords') ?? {};
      if (passwords[user.id] !== password) {
        await recordLoginAttempt(email, false);
        await logAudit({
          user_id: user.id,
          user_email: email,
          action: 'login_failed',
          resource_type: 'authentication',
          details: { reason: 'invalid_password' },
          ip_address: getClientIP(),
          user_agent: navigator.userAgent,
        });
        return { success: false, error: 'Credenciales inválidas' };
      }

      await recordLoginAttempt(email, true);

      if (user.totp_enabled && user.totp_secret) {
        setTempUserId(user.id);
        setTotpRequired(true);
        
        await logAudit({
          user_id: user.id,
          user_email: email,
          action: 'login_credentials_verified',
          resource_type: 'authentication',
          details: { awaiting_totp: true },
          ip_address: getClientIP(),
          user_agent: navigator.userAgent,
        });

        return { success: true, requiresTOTP: true };
      }

      const session: AdminSession = {
        user: { ...user, last_login: new Date().toISOString() },
        token: `admin-token-${Date.now()}-${Math.random()}`,
        expires_at: Date.now() + (8 * 60 * 60 * 1000),
        totp_verified: false,
      };

      await setAdminSession(session);

      await logAudit({
        user_id: user.id,
        user_email: email,
        action: 'login_success',
        resource_type: 'authentication',
        details: { totp_enabled: false },
        ip_address: getClientIP(),
        user_agent: navigator.userAgent,
      });

      return { success: true, requiresTOTP: false };
    } catch (error) {
      return { success: false, error: 'Error al iniciar sesión' };
    } finally {
      setLoading(false);
    }
  };

  const verifyTOTP = async (token: string) => {
    if (!tempUserId) {
      return { success: false, error: 'Sesión inválida' };
    }

    setLoading(true);
    try {
      const users = await window.spark.kv.get<Record<string, AdminUser>>('admin-users') ?? {};
      const user = users[tempUserId];

      if (!user || !user.totp_secret) {
        return { success: false, error: 'Usuario no encontrado' };
      }

      const isValid = verifyTOTPToken(user.totp_secret, token);

      if (!isValid) {
        await logAudit({
          user_id: user.id,
          user_email: user.email,
          action: 'totp_verification_failed',
          resource_type: 'authentication',
          details: { token: 'hidden' },
          ip_address: getClientIP(),
          user_agent: navigator.userAgent,
        });

        return { success: false, error: 'Código de verificación inválido' };
      }

      const session: AdminSession = {
        user: { ...user, last_login: new Date().toISOString() },
        token: `admin-token-${Date.now()}-${Math.random()}`,
        expires_at: Date.now() + (8 * 60 * 60 * 1000),
        totp_verified: true,
      };

      await setAdminSession(session);
      setTempUserId(null);
      setTotpRequired(false);

      await logAudit({
        user_id: user.id,
        user_email: user.email,
        action: 'login_success_with_totp',
        resource_type: 'authentication',
        details: {},
        ip_address: getClientIP(),
        user_agent: navigator.userAgent,
      });

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Error al verificar código' };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    if (adminUser) {
      await logAudit({
        user_id: adminUser.id,
        user_email: adminUser.email,
        action: 'logout',
        resource_type: 'authentication',
        details: {},
        ip_address: getClientIP(),
        user_agent: navigator.userAgent,
      });
    }

    await setAdminSession(null);
    setTempUserId(null);
    setTotpRequired(false);
  };

  const value: AdminAuthContextType = {
    adminUser,
    adminSession: adminSession ?? null,
    loading,
    totpRequired,
    loginWithCredentials,
    verifyTOTP,
    logout,
    isAuthenticated,
    isSuperAdmin,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
};
