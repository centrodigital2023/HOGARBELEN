/**
 * Auth Middleware
 * 
 * Provides middleware functions for protecting routes and verifying permissions
 */

import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

export interface AuthMiddlewareResult {
  isAuthenticated: boolean;
  isSuperAdmin: boolean;
  user: User | null;
  error?: string;
}

/**
 * Check if user is authenticated
 */
export async function checkAuthentication(): Promise<AuthMiddlewareResult> {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
      return {
        isAuthenticated: false,
        isSuperAdmin: false,
        user: null,
        error: error.message
      };
    }

    if (!session || !session.user) {
      return {
        isAuthenticated: false,
        isSuperAdmin: false,
        user: null
      };
    }

    const isSuperAdmin = session.user.user_metadata?.role === 'SUPER_ADMIN';

    return {
      isAuthenticated: true,
      isSuperAdmin,
      user: session.user
    };
  } catch (err) {
    return {
      isAuthenticated: false,
      isSuperAdmin: false,
      user: null,
      error: err instanceof Error ? err.message : 'Error al verificar autenticación'
    };
  }
}

/**
 * Verify if user has SUPER_ADMIN role
 */
export async function verifySuperAdmin(): Promise<{
  isSuperAdmin: boolean;
  user: User | null;
  error?: string;
}> {
  const result = await checkAuthentication();

  if (!result.isAuthenticated) {
    return {
      isSuperAdmin: false,
      user: null,
      error: 'Usuario no autenticado'
    };
  }

  if (!result.isSuperAdmin) {
    return {
      isSuperAdmin: false,
      user: result.user,
      error: 'Usuario no tiene permisos de administrador'
    };
  }

  return {
    isSuperAdmin: true,
    user: result.user
  };
}

/**
 * Check if current session is valid (not expired)
 */
export async function isSessionValid(): Promise<boolean> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) return false;
    
    // Check if session is expired
    const expiresAt = session.expires_at;
    if (expiresAt && expiresAt * 1000 < Date.now()) {
      return false;
    }
    
    return true;
  } catch {
    return false;
  }
}

/**
 * Refresh the current session
 */
export async function refreshSession(): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const { data, error } = await supabase.auth.refreshSession();

    if (error) {
      return {
        success: false,
        error: error.message
      };
    }

    return {
      success: !!data.session
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Error al refrescar sesión'
    };
  }
}

/**
 * Middleware function to protect routes
 * Returns true if access is allowed, false otherwise
 */
export async function protectRoute(requireSuperAdmin: boolean = false): Promise<{
  allowed: boolean;
  redirectTo?: string;
  error?: string;
}> {
  const auth = await checkAuthentication();

  if (!auth.isAuthenticated) {
    return {
      allowed: false,
      redirectTo: '/admin/login',
      error: 'Debe iniciar sesión para acceder'
    };
  }

  if (requireSuperAdmin && !auth.isSuperAdmin) {
    return {
      allowed: false,
      redirectTo: '/admin/login',
      error: 'No tiene permisos suficientes'
    };
  }

  return {
    allowed: true
  };
}

/**
 * Log audit event for admin actions
 */
export async function logAdminAction(
  action: string,
  resourceType: string,
  details: Record<string, unknown> = {}
): Promise<void> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return;

    // This would integrate with your audit log table
    // For now, just console log in development
    if (import.meta.env.DEV) {
      console.log('[Admin Action]', {
        user_id: user.id,
        user_email: user.email,
        action,
        resource_type: resourceType,
        details,
        timestamp: new Date().toISOString()
      });
    }

    // In production, insert into audit_logs table
    // await supabase.from('audit_logs').insert({...})
  } catch (err) {
    console.error('Error logging admin action:', err);
  }
}

export default {
  checkAuthentication,
  verifySuperAdmin,
  isSessionValid,
  refreshSession,
  protectRoute,
  logAdminAction
};
