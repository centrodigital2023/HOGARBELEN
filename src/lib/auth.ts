import { supabase } from './supabase'
import type { User, Session, AuthError } from '@supabase/supabase-js'

export interface AuthResponse {
  success: boolean
  user?: User
  session?: Session
  error?: string
}

export interface SignUpData {
  email: string
  password: string
  fullName: string
  role: 'family' | 'professional'
  phone?: string
}

export interface SignInData {
  email: string
  password: string
}

export interface ResetPasswordData {
  email: string
}

export interface UpdatePasswordData {
  newPassword: string
}

export async function signUp(data: SignUpData): Promise<AuthResponse> {
  try {
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
          role: data.role,
          phone: data.phone
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    })

    if (error) {
      return { success: false, error: error.message }
    }

    if (!authData.user) {
      return { success: false, error: 'No se pudo crear el usuario' }
    }

    return {
      success: true,
      user: authData.user,
      session: authData.session || undefined
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    }
  }
}

export async function signIn(data: SignInData): Promise<AuthResponse> {
  try {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return {
      success: true,
      user: authData.user,
      session: authData.session
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    }
  }
}

export async function signOut(): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.auth.signOut()

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    }
  }
}

export async function resetPassword(data: ResetPasswordData): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${window.location.origin}/auth/reset-password`
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    }
  }
}

export async function updatePassword(data: UpdatePasswordData): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.auth.updateUser({
      password: data.newPassword
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    }
  }
}

export async function resendVerificationEmail(): Promise<{ success: boolean; error?: string }> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return { success: false, error: 'No hay usuario autenticado' }
    }

    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: user.email!,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    }
  }
}

export async function getCurrentUser(): Promise<{ user: User | null; error?: string }> {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error) {
      return { user: null, error: error.message }
    }

    return { user }
  } catch (error) {
    return {
      user: null,
      error: error instanceof Error ? error.message : 'Error desconocido'
    }
  }
}

export async function getSession(): Promise<{ session: Session | null; error?: string }> {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()

    if (error) {
      return { session: null, error: error.message }
    }

    return { session }
  } catch (error) {
    return {
      session: null,
      error: error instanceof Error ? error.message : 'Error desconocido'
    }
  }
}

export async function refreshSession(): Promise<{ session: Session | null; error?: string }> {
  try {
    const { data: { session }, error } = await supabase.auth.refreshSession()

    if (error) {
      return { session: null, error: error.message }
    }

    return { session }
  } catch (error) {
    return {
      session: null,
      error: error instanceof Error ? error.message : 'Error desconocido'
    }
  }
}

export function onAuthStateChange(
  callback: (event: string, session: Session | null) => void
) {
  return supabase.auth.onAuthStateChange(callback)
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePassword(password: string): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push('La contraseña debe tener al menos 8 caracteres')
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('La contraseña debe contener al menos una mayúscula')
  }

  if (!/[a-z]/.test(password)) {
    errors.push('La contraseña debe contener al menos una minúscula')
  }

  if (!/[0-9]/.test(password)) {
    errors.push('La contraseña debe contener al menos un número')
  }

  return {
    valid: errors.length === 0,
    errors
  }
}

export function getAuthErrorMessage(error: AuthError | Error): string {
  const errorMessages: Record<string, string> = {
    'Invalid login credentials': 'Credenciales inválidas',
    'Email not confirmed': 'Email no confirmado. Por favor verifica tu correo.',
    'User already registered': 'Este email ya está registrado',
    'Password should be at least 8 characters': 'La contraseña debe tener al menos 8 caracteres',
    'Unable to validate email address: invalid format': 'Formato de email inválido',
    'Email rate limit exceeded': 'Límite de emails excedido. Intenta más tarde.',
    'For security purposes, you can only request this once every 60 seconds': 'Por seguridad, solo puedes solicitar esto una vez cada 60 segundos'
  }

  const message = error.message
  return errorMessages[message] || message
}
