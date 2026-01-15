# Ejemplos de Uso - Supabase Integration

Esta guía contiene ejemplos prácticos de cómo usar las funciones de autenticación, storage y base de datos en tu aplicación.

## 🔐 Autenticación

### Registro de Usuario

```typescript
import { signUp } from '@/lib/auth'
import { toast } from 'sonner'

async function handleSignUp() {
  const result = await signUp({
    email: 'usuario@example.com',
    password: 'Password123',
    fullName: 'Juan Pérez',
    role: 'family',
    phone: '+573001234567'
  })

  if (result.success) {
    toast.success('Registro exitoso. Por favor verifica tu correo.')
    // Redirigir a página de verificación
  } else {
    toast.error(result.error || 'Error en el registro')
  }
}
```

### Inicio de Sesión

```typescript
import { signIn } from '@/lib/auth'
import { toast } from 'sonner'

async function handleSignIn() {
  const result = await signIn({
    email: 'usuario@example.com',
    password: 'Password123'
  })

  if (result.success) {
    toast.success('Inicio de sesión exitoso')
    // Redirigir a dashboard
  } else {
    toast.error(result.error || 'Error al iniciar sesión')
  }
}
```

### Cerrar Sesión

```typescript
import { signOut } from '@/lib/auth'
import { toast } from 'sonner'

async function handleSignOut() {
  const result = await signOut()

  if (result.success) {
    toast.success('Sesión cerrada')
    // Redirigir a home
  } else {
    toast.error(result.error || 'Error al cerrar sesión')
  }
}
```

### Restablecer Contraseña

```typescript
import { resetPassword } from '@/lib/auth'
import { toast } from 'sonner'

async function handleResetPassword() {
  const result = await resetPassword({
    email: 'usuario@example.com'
  })

  if (result.success) {
    toast.success('Correo de restablecimiento enviado. Revisa tu bandeja.')
  } else {
    toast.error(result.error || 'Error al enviar correo')
  }
}
```

### Actualizar Contraseña

```typescript
import { updatePassword } from '@/lib/auth'
import { toast } from 'sonner'

async function handleUpdatePassword(newPassword: string) {
  const result = await updatePassword({ newPassword })

  if (result.success) {
    toast.success('Contraseña actualizada exitosamente')
    // Redirigir a login
  } else {
    toast.error(result.error || 'Error al actualizar contraseña')
  }
}
```

### Reenviar Email de Verificación

```typescript
import { resendVerificationEmail } from '@/lib/auth'
import { toast } from 'sonner'

async function handleResendEmail() {
  const result = await resendVerificationEmail()

  if (result.success) {
    toast.success('Email de verificación reenviado')
  } else {
    toast.error(result.error || 'Error al reenviar email')
  }
}
```

### Obtener Usuario Actual

```typescript
import { getCurrentUser } from '@/lib/auth'
import { useEffect, useState } from 'react'

function UserProfile() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function loadUser() {
      const { user, error } = await getCurrentUser()
      if (user) {
        setUser(user)
      }
    }
    loadUser()
  }, [])

  return <div>{user?.email}</div>
}
```

### Escuchar Cambios de Autenticación

```typescript
import { onAuthStateChange } from '@/lib/auth'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    const { data: { subscription } } = onAuthStateChange((event, session) => {
      console.log('Auth event:', event)
      console.log('Session:', session)
      
      if (event === 'SIGNED_IN') {
        // Usuario inició sesión
      } else if (event === 'SIGNED_OUT') {
        // Usuario cerró sesión
      } else if (event === 'TOKEN_REFRESHED') {
        // Token renovado
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  return <div>App</div>
}
```

### Validación de Contraseña

```typescript
import { validatePassword, validateEmail } from '@/lib/auth'

function SignUpForm() {
  const handlePasswordChange = (password: string) => {
    const validation = validatePassword(password)
    
    if (!validation.valid) {
      console.log('Errores:', validation.errors)
      // Mostrar errores al usuario
    }
  }

  const handleEmailChange = (email: string) => {
    if (!validateEmail(email)) {
      console.log('Email inválido')
    }
  }
}
```

## 📦 Storage (Archivos)

### Subir Imagen de Perfil

```typescript
import { uploadProfileImage } from '@/lib/storage'
import { toast } from 'sonner'

async function handleProfileImageUpload(userId: string, file: File) {
  const result = await uploadProfileImage(userId, file)

  if (result.success) {
    toast.success('Imagen subida exitosamente')
    console.log('URL:', result.url)
    // Actualizar URL en base de datos
    await supabase
      .from('profiles')
      .update({ photo_url: result.url })
      .eq('id', userId)
  } else {
    toast.error(result.error || 'Error al subir imagen')
  }
}
```

### Subir Documento Profesional

```typescript
import { uploadProfessionalDocument } from '@/lib/storage'
import { toast } from 'sonner'

async function handleDocumentUpload(userId: string, file: File, docType: string) {
  const result = await uploadProfessionalDocument(userId, file, docType)

  if (result.success) {
    toast.success('Documento subido exitosamente')
    // Actualizar registro en base de datos
  } else {
    toast.error(result.error || 'Error al subir documento')
  }
}
```

### Subir Archivo de Cita

```typescript
import { uploadAppointmentFile } from '@/lib/storage'
import { toast } from 'sonner'

async function handleAppointmentFileUpload(
  appointmentId: string,
  userId: string,
  file: File
) {
  const result = await uploadAppointmentFile(appointmentId, file, userId)

  if (result.success) {
    toast.success('Archivo subido exitosamente')
    // Agregar URL a los archivos de la cita
  } else {
    toast.error(result.error || 'Error al subir archivo')
  }
}
```

### Componente de Upload con Drag & Drop

```typescript
import { useState } from 'react'
import { uploadProfileImage } from '@/lib/storage'
import { toast } from 'sonner'

function ImageUploader({ userId }: { userId: string }) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string>()

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    await handleFileUpload(file)
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      await handleFileUpload(file)
    }
  }

  const handleFileUpload = async (file: File) => {
    setUploading(true)
    const result = await uploadProfileImage(userId, file)
    
    if (result.success) {
      setPreview(result.url)
      toast.success('Imagen subida')
    } else {
      toast.error(result.error || 'Error')
    }
    setUploading(false)
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed p-8 rounded-lg"
    >
      {preview && <img src={preview} alt="Preview" className="w-32 h-32" />}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
      />
      {uploading && <p>Subiendo...</p>}
    </div>
  )
}
```

### Eliminar Archivo

```typescript
import { deleteFile, STORAGE_BUCKETS } from '@/lib/storage'
import { toast } from 'sonner'

async function handleDeleteFile(filePath: string) {
  const result = await deleteFile(STORAGE_BUCKETS.PROFILE_IMAGES, filePath)

  if (result.success) {
    toast.success('Archivo eliminado')
  } else {
    toast.error(result.error || 'Error al eliminar')
  }
}
```

## 🗄️ Base de Datos

### Crear Perfil

```typescript
import { supabase } from '@/lib/supabase'
import type { Database } from '@/lib/supabase'

type ProfileInsert = Database['public']['Tables']['profiles']['Insert']

async function createProfile(userId: string, data: Omit<ProfileInsert, 'id'>) {
  const { data: profile, error } = await supabase
    .from('profiles')
    .insert({
      id: userId,
      ...data
    })
    .select()
    .single()

  if (error) {
    console.error('Error:', error)
    return null
  }

  return profile
}
```

### Obtener Perfil de Usuario

```typescript
import { supabase } from '@/lib/supabase'

async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error:', error)
    return null
  }

  return data
}
```

### Actualizar Perfil

```typescript
import { supabase } from '@/lib/supabase'

async function updateProfile(userId: string, updates: Partial<Profile>) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()

  if (error) {
    console.error('Error:', error)
    return null
  }

  return data
}
```

### Crear Profesional

```typescript
import { supabase } from '@/lib/supabase'

async function createProfessional(userId: string, data: ProfessionalData) {
  const { data: professional, error } = await supabase
    .from('professionals')
    .insert({
      user_id: userId,
      specialization: data.specialization,
      experience_years: data.experience_years,
      bio: data.bio,
      hourly_rate: data.hourly_rate,
      availability: data.availability
    })
    .select()
    .single()

  if (error) {
    console.error('Error:', error)
    return null
  }

  return professional
}
```

### Buscar Profesionales

```typescript
import { supabase } from '@/lib/supabase'

async function searchProfessionals(filters: {
  specialization?: string
  minRating?: number
  verified?: boolean
}) {
  let query = supabase
    .from('professionals')
    .select(`
      *,
      profiles:user_id (
        full_name,
        email,
        photo_url
      )
    `)

  if (filters.specialization) {
    query = query.eq('specialization', filters.specialization)
  }

  if (filters.minRating) {
    query = query.gte('rating', filters.minRating)
  }

  if (filters.verified !== undefined) {
    query = query.eq('verified', filters.verified)
  }

  const { data, error } = await query.order('rating', { ascending: false })

  if (error) {
    console.error('Error:', error)
    return []
  }

  return data
}
```

### Crear Cita

```typescript
import { supabase } from '@/lib/supabase'

async function createAppointment(data: {
  familyId: string
  professionalId: string
  scheduledDate: string
  serviceType: string
  notes?: string
}) {
  const { data: appointment, error } = await supabase
    .from('appointments')
    .insert({
      family_id: data.familyId,
      professional_id: data.professionalId,
      scheduled_date: data.scheduledDate,
      service_type: data.serviceType,
      notes: data.notes,
      status: 'pending'
    })
    .select()
    .single()

  if (error) {
    console.error('Error:', error)
    return null
  }

  return appointment
}
```

### Obtener Citas del Usuario

```typescript
import { supabase } from '@/lib/supabase'

async function getUserAppointments(userId: string) {
  const { data, error } = await supabase
    .from('appointments')
    .select(`
      *,
      professional:professional_id (
        *,
        profile:user_id (
          full_name,
          photo_url
        )
      )
    `)
    .eq('family_id', userId)
    .order('scheduled_date', { ascending: true })

  if (error) {
    console.error('Error:', error)
    return []
  }

  return data
}
```

### Actualizar Estado de Cita

```typescript
import { supabase } from '@/lib/supabase'
import type { AppointmentStatus } from '@/lib/supabase'

async function updateAppointmentStatus(
  appointmentId: string,
  status: AppointmentStatus
) {
  const { data, error } = await supabase
    .from('appointments')
    .update({ status })
    .eq('id', appointmentId)
    .select()
    .single()

  if (error) {
    console.error('Error:', error)
    return null
  }

  return data
}
```

### Crear Suscripción

```typescript
import { supabase } from '@/lib/supabase'
import type { PlanName } from '@/lib/supabase'

async function createSubscription(
  userId: string,
  planName: PlanName,
  planPrice: number
) {
  const endDate = new Date()
  endDate.setMonth(endDate.getMonth() + 1) // 1 mes de duración

  const { data, error } = await supabase
    .from('subscriptions')
    .insert({
      user_id: userId,
      plan_name: planName,
      plan_price: planPrice,
      status: 'active',
      end_date: endDate.toISOString()
    })
    .select()
    .single()

  if (error) {
    console.error('Error:', error)
    return null
  }

  return data
}
```

### Obtener Suscripción Activa

```typescript
import { supabase } from '@/lib/supabase'

async function getActiveSubscription(userId: string) {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .single()

  if (error) {
    console.error('Error:', error)
    return null
  }

  return data
}
```

### Crear Review

```typescript
import { supabase } from '@/lib/supabase'

async function createReview(data: {
  appointmentId: string
  professionalId: string
  familyId: string
  rating: number
  comment?: string
}) {
  const { data: review, error } = await supabase
    .from('reviews')
    .insert(data)
    .select()
    .single()

  if (error) {
    console.error('Error:', error)
    return null
  }

  // Esto automáticamente actualizará el rating del profesional
  // gracias al trigger en la base de datos
  return review
}
```

### Suscribirse a Cambios en Tiempo Real

```typescript
import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'

function AppointmentsList({ userId }: { userId: string }) {
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    // Cargar citas iniciales
    loadAppointments()

    // Suscribirse a cambios en tiempo real
    const subscription = supabase
      .channel('appointments_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'appointments',
          filter: `family_id=eq.${userId}`
        },
        (payload) => {
          console.log('Cambio detectado:', payload)
          loadAppointments() // Recargar citas
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [userId])

  async function loadAppointments() {
    const { data } = await supabase
      .from('appointments')
      .select('*')
      .eq('family_id', userId)
    
    setAppointments(data || [])
  }

  return (
    <div>
      {appointments.map(apt => (
        <div key={apt.id}>{apt.service_type}</div>
      ))}
    </div>
  )
}
```

## 🔒 Verificar Permisos

### Hook Personalizado para Auth

```typescript
import { useState, useEffect } from 'react'
import { getCurrentUser } from '@/lib/auth'
import { supabase } from '@/lib/supabase'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUser() {
      const { user } = await getCurrentUser()
      setUser(user)

      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        
        setProfile(data)
      }

      setLoading(false)
    }

    loadUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null)
        if (session?.user) {
          const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()
          setProfile(data)
        } else {
          setProfile(null)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return { user, profile, loading }
}
```

### Componente de Ruta Protegida

```typescript
import { useAuth } from '@/hooks/useAuth'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children, allowedRoles }) {
  const { user, profile, loading } = useAuth()

  if (loading) {
    return <div>Cargando...</div>
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  if (allowedRoles && !allowedRoles.includes(profile?.role)) {
    return <Navigate to="/unauthorized" />
  }

  return children
}

// Uso:
<ProtectedRoute allowedRoles={['professional']}>
  <ProfessionalDashboard />
</ProtectedRoute>
```
