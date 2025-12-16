# Ejemplos de Uso de Supabase en Componentes

## 1. Autenticación

### Login de Usuario

```typescript
import { useAuth } from '@/contextos/SupabaseAuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { useState } from 'react'

function LoginForm() {
  const { signIn, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const { error } = await signIn(email, password)
    
    if (error) {
      toast.error('Error al iniciar sesión: ' + error.message)
    } else {
      toast.success('¡Bienvenido a Hogar Belén!')
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <Input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <Input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        required
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Iniciando...' : 'Iniciar Sesión'}
      </Button>
    </form>
  )
}
```

### Registro de Usuario

```typescript
import { useAuth } from '@/contextos/SupabaseAuthContext'

function RegisterForm() {
  const { signUp } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState<'family' | 'professional'>('family')

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const { error } = await signUp(email, password, fullName, role)
    
    if (error) {
      toast.error('Error al registrarse: ' + error.message)
    } else {
      toast.success('¡Cuenta creada exitosamente!')
    }
  }

  // ... render form
}
```

### Verificar Usuario Actual

```typescript
import { useAuth } from '@/contextos/SupabaseAuthContext'

function ProfileComponent() {
  const { user, userData, loading } = useAuth()

  if (loading) return <div>Cargando...</div>

  if (!user) return <div>No has iniciado sesión</div>

  return (
    <div>
      <h1>Hola, {userData?.full_name}</h1>
      <p>Email: {user.email}</p>
      <p>Rol: {userData?.role}</p>
    </div>
  )
}
```

## 2. Gestión de Citas

### Listar Citas del Usuario

```typescript
import { useAppointments } from '@/hooks/useAppointments'
import { Card } from '@/components/ui/card'

function MyAppointments() {
  const { appointments, loading, error } = useAppointments()

  if (loading) return <div>Cargando citas...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      {appointments.map((appointment) => (
        <Card key={appointment.id}>
          <h3>{appointment.service}</h3>
          <p>Fecha: {appointment.date}</p>
          <p>Hora: {appointment.time}</p>
          <p>Estado: {appointment.status}</p>
        </Card>
      ))}
    </div>
  )
}
```

### Crear Nueva Cita

```typescript
import { useAppointments } from '@/hooks/useAppointments'
import { toast } from 'sonner'

function CreateAppointmentForm() {
  const { createAppointment } = useAppointments()
  const [service, setService] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await createAppointment({
        service,
        date,
        time,
        status: 'pending',
      })
      
      toast.success('Cita creada exitosamente')
      // Reset form
      setService('')
      setDate('')
      setTime('')
    } catch (error) {
      toast.error('Error al crear la cita')
    }
  }

  // ... render form
}
```

### Actualizar Estado de Cita

```typescript
import { useAppointments } from '@/hooks/useAppointments'

function AppointmentActions({ appointmentId }: { appointmentId: string }) {
  const { updateAppointment } = useAppointments()

  const handleConfirm = async () => {
    try {
      await updateAppointment(appointmentId, { status: 'confirmed' })
      toast.success('Cita confirmada')
    } catch (error) {
      toast.error('Error al confirmar la cita')
    }
  }

  const handleCancel = async () => {
    try {
      await updateAppointment(appointmentId, { status: 'cancelled' })
      toast.success('Cita cancelada')
    } catch (error) {
      toast.error('Error al cancelar la cita')
    }
  }

  return (
    <div>
      <Button onClick={handleConfirm}>Confirmar</Button>
      <Button onClick={handleCancel} variant="destructive">Cancelar</Button>
    </div>
  )
}
```

## 3. Gestión de Suscripciones

### Mostrar Suscripción Activa

```typescript
import { useSubscriptions } from '@/hooks/useSubscriptions'

function ActiveSubscriptionCard() {
  const { activeSubscription, loading } = useSubscriptions()

  if (loading) return <div>Cargando...</div>

  if (!activeSubscription) {
    return <div>No tienes una suscripción activa</div>
  }

  return (
    <Card>
      <h2>Plan Actual: {activeSubscription.plan}</h2>
      <p>Estado: {activeSubscription.status}</p>
      <p>Inicio: {activeSubscription.start_date}</p>
      <p>Monto: ${activeSubscription.amount}</p>
    </Card>
  )
}
```

### Crear Suscripción

```typescript
import { useSubscriptions } from '@/hooks/useSubscriptions'

function SubscribeToPlan({ planName, amount }: { planName: string; amount: number }) {
  const { createSubscription } = useSubscriptions()

  const handleSubscribe = async () => {
    try {
      await createSubscription({
        plan: planName,
        status: 'active',
        start_date: new Date().toISOString().split('T')[0],
        amount,
      })
      
      toast.success('¡Suscripción activada!')
    } catch (error) {
      toast.error('Error al activar la suscripción')
    }
  }

  return (
    <Button onClick={handleSubscribe}>
      Suscribirse a {planName}
    </Button>
  )
}
```

### Cancelar Suscripción

```typescript
import { useSubscriptions } from '@/hooks/useSubscriptions'

function CancelSubscriptionButton({ subscriptionId }: { subscriptionId: string }) {
  const { cancelSubscription } = useSubscriptions()
  const [showDialog, setShowDialog] = useState(false)

  const handleCancel = async () => {
    try {
      await cancelSubscription(subscriptionId)
      toast.success('Suscripción cancelada')
      setShowDialog(false)
    } catch (error) {
      toast.error('Error al cancelar la suscripción')
    }
  }

  return (
    <>
      <Button onClick={() => setShowDialog(true)} variant="destructive">
        Cancelar Suscripción
      </Button>
      
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Cancelar suscripción?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción cancelará tu plan actual.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, mantener</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancel}>
              Sí, cancelar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
```

## 4. Códigos Promocionales

### Validar Código Promo

```typescript
import { usePromoCodes } from '@/hooks/usePromoCodes'
import { useState } from 'react'

function PromoCodeInput({ onApply }: { onApply: (discount: number) => void }) {
  const { validatePromoCode } = usePromoCodes()
  const [code, setCode] = useState('')
  const [isValidating, setIsValidating] = useState(false)

  const handleValidate = async () => {
    setIsValidating(true)
    
    const promoCode = await validatePromoCode(code)
    
    if (promoCode) {
      const discount = promoCode.discount_type === 'percentage' 
        ? promoCode.discount_value / 100 
        : promoCode.discount_value
      
      onApply(discount)
      toast.success(`¡Código aplicado! ${promoCode.discount_value}${promoCode.discount_type === 'percentage' ? '%' : '$'} de descuento`)
    } else {
      toast.error('Código inválido o expirado')
    }
    
    setIsValidating(false)
  }

  return (
    <div className="flex gap-2">
      <Input 
        value={code}
        onChange={(e) => setCode(e.target.value.toUpperCase())}
        placeholder="Código promocional"
      />
      <Button 
        onClick={handleValidate} 
        disabled={isValidating || !code}
      >
        {isValidating ? 'Validando...' : 'Aplicar'}
      </Button>
    </div>
  )
}
```

### Listar Códigos Activos (Admin)

```typescript
import { usePromoCodes } from '@/hooks/usePromoCodes'

function AdminPromoCodesList() {
  const { promoCodes, loading, deletePromoCode } = usePromoCodes()

  const handleDelete = async (id: string) => {
    try {
      await deletePromoCode(id)
      toast.success('Código eliminado')
    } catch (error) {
      toast.error('Error al eliminar el código')
    }
  }

  if (loading) return <div>Cargando códigos...</div>

  return (
    <div>
      {promoCodes.map((promo) => (
        <Card key={promo.id}>
          <h3>{promo.code}</h3>
          <p>{promo.description}</p>
          <p>
            Descuento: {promo.discount_value}
            {promo.discount_type === 'percentage' ? '%' : '$'}
          </p>
          <p>Usos: {promo.current_uses} / {promo.max_uses || '∞'}</p>
          <Button onClick={() => handleDelete(promo.id)} variant="destructive">
            Eliminar
          </Button>
        </Card>
      ))}
    </div>
  )
}
```

## 5. Actualizar Perfil

```typescript
import { useAuth } from '@/contextos/SupabaseAuthContext'

function UpdateProfileForm() {
  const { userData, updateProfile } = useAuth()
  const [fullName, setFullName] = useState(userData?.full_name || '')
  const [phone, setPhone] = useState(userData?.phone || '')

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const { error } = await updateProfile({
      full_name: fullName,
      phone,
    })
    
    if (error) {
      toast.error('Error al actualizar perfil')
    } else {
      toast.success('Perfil actualizado exitosamente')
    }
  }

  return (
    <form onSubmit={handleUpdate}>
      <Input 
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="Nombre completo"
      />
      <Input 
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Teléfono"
      />
      <Button type="submit">Actualizar Perfil</Button>
    </form>
  )
}
```

## 6. Realtime (Actualizaciones en Tiempo Real)

Los hooks `useAppointments`, `useSubscriptions` y `usePromoCodes` ya incluyen suscripciones realtime automáticas. Los componentes se actualizarán automáticamente cuando los datos cambien en la base de datos.

Si necesitas realtime personalizado:

```typescript
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

function RealtimeComponent() {
  const [data, setData] = useState([])

  useEffect(() => {
    // Suscribirse a cambios
    const subscription = supabase
      .channel('custom-channel')
      .on(
        'postgres_changes',
        {
          event: '*', // INSERT, UPDATE, DELETE, o * para todos
          schema: 'public',
          table: 'appointments',
        },
        (payload) => {
          console.log('Cambio detectado:', payload)
          // Actualizar estado
        }
      )
      .subscribe()

    // Limpiar al desmontar
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return <div>Datos en tiempo real</div>
}
```
