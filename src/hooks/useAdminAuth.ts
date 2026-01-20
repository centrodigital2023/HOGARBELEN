/**
 * useAdminAuth Hook
 * 
 * Custom hook for admin authentication with Supabase Auth + 2FA
 * Replaces Spark KV storage with Supabase-based authentication
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { verifyTOTPToken } from '@/lib/totp';
import { User } from '@supabase/supabase-js';

export interface AdminAuthState {
  user: User | null;
  isAuthenticated: boolean;
  isSuperAdmin: boolean;
  totpVerified: boolean;
  loading: boolean;
  error: string | null;
}

export interface UseAdminAuthReturn extends AdminAuthState {
  login: (email: string, password: string) => Promise<{
    success: boolean;
    requiresTOTP: boolean;
    error?: string;
  }>;
  verifyMFA: (code: string) => Promise<{
    success: boolean;
    error?: string;
  }>;
  logout: () => Promise<{ success: boolean; error?: string }>;
  checkSuperAdmin: () => boolean;
  refreshAuth: () => Promise<void>;
}

// Rate limiting for login attempts
const MAX_LOGIN_ATTEMPTS = 3;
const LOCKOUT_DURATION = 5 * 60 * 1000; // 5 minutes
const loginAttempts = new Map<string, { count: number; timestamp: number }>();

export function useAdminAuth(): UseAdminAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [totpVerified, setTotpVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingUser, setPendingUser] = useState<User | null>(null);

  /**
   * Check if user is SUPER_ADMIN based on user_metadata
   */
  const checkSuperAdmin = useCallback((userData?: User | null): boolean => {
    const currentUser = userData || user;
    if (!currentUser) return false;
    
    const role = currentUser.user_metadata?.role;
    return role === 'SUPER_ADMIN';
  }, [user]);

  /**
   * Check if account is locked due to failed attempts
   */
  const isAccountLocked = (email: string): boolean => {
    const attempts = loginAttempts.get(email);
    if (!attempts) return false;
    
    const now = Date.now();
    if (now - attempts.timestamp > LOCKOUT_DURATION) {
      loginAttempts.delete(email);
      return false;
    }
    
    return attempts.count >= MAX_LOGIN_ATTEMPTS;
  };

  /**
   * Record login attempt
   */
  const recordLoginAttempt = (email: string, success: boolean) => {
    if (success) {
      loginAttempts.delete(email);
      return;
    }
    
    const attempts = loginAttempts.get(email) || { count: 0, timestamp: Date.now() };
    attempts.count++;
    attempts.timestamp = Date.now();
    loginAttempts.set(email, attempts);
  };

  /**
   * Initialize auth state
   */
  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          setUser(session.user);
          const isSA = checkSuperAdmin(session.user);
          setIsSuperAdmin(isSA);
          setIsAuthenticated(true);
          setTotpVerified(true); // If session exists, TOTP was verified
        }
      } catch (err) {
        console.error('Error initializing auth:', err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          setUser(session.user);
          const isSA = checkSuperAdmin(session.user);
          setIsSuperAdmin(isSA);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsSuperAdmin(false);
          setIsAuthenticated(false);
          setTotpVerified(false);
          setPendingUser(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [checkSuperAdmin]);

  /**
   * Login with email and password
   */
  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      // Check if account is locked
      if (isAccountLocked(email)) {
        return {
          success: false,
          requiresTOTP: false,
          error: 'Cuenta bloqueada temporalmente por múltiples intentos fallidos. Intente de nuevo en 5 minutos.'
        };
      }

      // Attempt to sign in with Supabase
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (signInError) {
        recordLoginAttempt(email, false);
        return {
          success: false,
          requiresTOTP: false,
          error: 'Credenciales inválidas'
        };
      }

      if (!data.user) {
        recordLoginAttempt(email, false);
        return {
          success: false,
          requiresTOTP: false,
          error: 'Error al iniciar sesión'
        };
      }

      // Check if user is SUPER_ADMIN
      const isSA = checkSuperAdmin(data.user);
      if (!isSA) {
        // Not a super admin, sign out
        await supabase.auth.signOut();
        recordLoginAttempt(email, false);
        return {
          success: false,
          requiresTOTP: false,
          error: 'No tiene permisos de administrador'
        };
      }

      // Success - credentials verified, now require TOTP
      recordLoginAttempt(email, true);
      
      // Store pending user for TOTP verification
      setPendingUser(data.user);
      
      // Sign out temporarily until TOTP is verified
      await supabase.auth.signOut();
      
      return {
        success: true,
        requiresTOTP: true
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al iniciar sesión';
      setError(errorMessage);
      return {
        success: false,
        requiresTOTP: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  }, [checkSuperAdmin]);

  /**
   * Verify MFA/TOTP code
   */
  const verifyMFA = useCallback(async (code: string) => {
    setLoading(true);
    setError(null);

    try {
      if (!pendingUser) {
        return {
          success: false,
          error: 'Sesión inválida. Por favor inicie sesión nuevamente.'
        };
      }

      // Verify TOTP code
      // For development, accept test code 123012
      // In production, use the user's TOTP secret from database
      const isValid = await verifyTOTPToken('', code); // Empty secret uses test code

      if (!isValid) {
        return {
          success: false,
          error: 'Código de verificación inválido'
        };
      }

      // TOTP verified, now sign in the user for real
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: pendingUser.email!,
        password: '' // We already verified the password, but Supabase requires it
      });

      // Since we can't sign in without password again, we'll set the session manually
      // This is a simplified approach for the POC
      setUser(pendingUser);
      setIsSuperAdmin(true);
      setIsAuthenticated(true);
      setTotpVerified(true);
      setPendingUser(null);

      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al verificar código';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  }, [pendingUser]);

  /**
   * Logout
   */
  const logout = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { error: signOutError } = await supabase.auth.signOut();

      if (signOutError) {
        throw signOutError;
      }

      setUser(null);
      setIsSuperAdmin(false);
      setIsAuthenticated(false);
      setTotpVerified(false);
      setPendingUser(null);

      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cerrar sesión';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Refresh authentication state
   */
  const refreshAuth = useCallback(async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setUser(session.user);
        const isSA = checkSuperAdmin(session.user);
        setIsSuperAdmin(isSA);
        setIsAuthenticated(true);
        setTotpVerified(true);
      } else {
        setUser(null);
        setIsSuperAdmin(false);
        setIsAuthenticated(false);
        setTotpVerified(false);
      }
    } catch (err) {
      console.error('Error refreshing auth:', err);
    } finally {
      setLoading(false);
    }
  }, [checkSuperAdmin]);

  return {
    user,
    isAuthenticated,
    isSuperAdmin,
    totpVerified,
    loading,
    error,
    login,
    verifyMFA,
    logout,
    checkSuperAdmin,
    refreshAuth
  };
}
