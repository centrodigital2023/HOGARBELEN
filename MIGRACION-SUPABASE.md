# Migración de useKV a Supabase

Esta guía muestra cómo migrar componentes existentes que usan `useKV` a Supabase.

## ❌ Antes (usando useKV)

```typescript
import { useKV } from '@github/spark/hooks'
import { useAuth } from '@/contextos/SupabaseAuthContext'

function AppointmentsOld() {
  const { user } = useAuth()
  const [appointments, setAppointments] = useKV('user-appointments', [])

  // Filtrar solo las citas del usuario actual
  const userAppointments = appointments.filter(
    apt => apt.userId === user?.id
  )

  const addAppointment = (newAppointment) => {
    setAppointments([...appointments, {
      id: Date.now().toString(),
      userId: user?.id,
      ...newAppointment
    }])
  }

  const updateAppointment = (id, updates) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, ...updates } : apt
    ))
  }

  const deleteAppointment = (id) => {
    setAppointments(appointments.filter(apt => apt.id !== id))
  }

  return (
    <div>
      {userAppointments.map(apt => (
        <div key={apt.id}>{apt.service}</div>
      ))}
    </div>
  )
}
```

## ✅ Después (usando Supabase)

```typescript
import { useAppointments } from '@/hooks/useAppointments'
import { useAuth } from '@/contextos/SupabaseAuthContext'

function AppointmentsNew() {
  const { user } = useAuth()
  const { 
    appointments, 
    loading,
    createAppointment,
    updateAppointment,
    deleteAppointment 
  } = useAppointments()

  const addAppointment = async (newAppointment) => {
    try {
      await createAppointment(newAppointment)
      toast.success('Cita creada')
    } catch (error) {
      toast.error('Error al crear cita')
    }
  }

  const handleUpdate = async (id, updates) => {
    try {
      await updateAppointment(id, updates)
      toast.success('Cita actualizada')
    } catch (error) {
      toast.error('Error al actualizar')
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteAppointment(id)
      toast.success('Cita eliminada')
    } catch (error) {
      toast.error('Error al eliminar')
    }
  }

  if (loading) return <div>Cargando...</div>

  return (
    <div>
      {appointments.map(apt => (
        <div key={apt.id}>{apt.service}</div>
      ))}
    </div>
  )
}
```

## Diferencias Clave

### 1. Estado Automático vs Manual

**useKV**: Debes gestionar manualmente filtros y actualizaciones
```typescript
const [all, setAll] = useKV('key', [])
const filtered = all.filter(item => item.userId === user?.id)
```

**Supabase**: Los datos ya vienen filtrados por RLS
```typescript
const { appointments } = useAppointments() // Ya filtrados
```

### 2. Operaciones Síncronas vs Asíncronas

**useKV**: Operaciones síncronas
```typescript
setAppointments([...appointments, newOne]) // Inmediato
```

**Supabase**: Operaciones asíncronas
```typescript
await createAppointment(newOne) // Requiere await
```

### 3. Sin Loading vs Con Loading

**useKV**: No hay estado de carga
```typescript
const [data, setData] = useKV('key', [])
// Siempre disponible inmediatamente
```

**Supabase**: Estado de carga incluido
```typescript
const { data, loading, error } = useAppointments()
if (loading) return <Spinner />
```

### 4. Local vs Compartido

**useKV**: Datos locales por dispositivo
- No se comparten entre usuarios
- No persisten en servidor
- No hay sincronización

**Supabase**: Datos en la nube
- Compartidos entre dispositivos
- Persisten en servidor
- Actualizaciones en tiempo real

## Patrón de Migración

### Paso 1: Identificar useKV

Busca en tu código:
```typescript
const [data, setData] = useKV('some-key', defaultValue)
```

### Paso 2: Determinar el Tipo de Datos

- ¿Citas? → `useAppointments()`
- ¿Suscripciones? → `useSubscriptions()`
- ¿Códigos promo? → `usePromoCodes()`
- ¿Otros datos del usuario? → Consulta directa a Supabase

### Paso 3: Reemplazar Hook

```typescript
// Antes
const [appointments, setAppointments] = useKV('appointments', [])

// Después
const { appointments, loading, createAppointment, updateAppointment } = useAppointments()
```

### Paso 4: Actualizar Operaciones

```typescript
// Antes: Síncrono
setAppointments([...appointments, newOne])

// Después: Asíncrono
const handleAdd = async () => {
  try {
    await createAppointment(newOne)
  } catch (error) {
    console.error(error)
  }
}
```

### Paso 5: Agregar Estado de Carga

```typescript
if (loading) {
  return <Spinner />
}
```

### Paso 6: Manejar Errores

```typescript
if (error) {
  return <ErrorMessage error={error} />
}
```

## Casos Especiales

### Datos Temporales (No Migrar)

Algunos datos NO deben migrarse a Supabase:

```typescript
// ✅ BIEN - Usar useState para estado temporal UI
const [selectedTab, setSelectedTab] = useState('home')
const [isModalOpen, setIsModalOpen] = useState(false)
const [searchQuery, setSearchQuery] = useState('')

// ❌ MAL - No usar Supabase para esto
```

### Datos de Configuración Local

```typescript
// ✅ BIEN - useKV para preferencias locales
const [theme, setTheme] = useKV('user-theme', 'light')
const [language, setLanguage] = useKV('user-language', 'es')

// Estos NO necesitan Supabase
```

### Datos que SÍ deben migrar

```typescript
// ✅ Migrar a Supabase:
- Citas y reservas
- Suscripciones
- Información de perfil
- Datos compartidos entre dispositivos
- Datos que deben persistir en servidor
- Datos que otros usuarios pueden ver/editar
```

## Ejemplo Completo de Migración

### Componente Original (useKV)

```typescript
function SubscriptionManager() {
  const { user } = useAuth()
  const [subscriptions, setSubscriptions] = useKV('subscriptions', [])
  
  const userSubs = subscriptions.filter(s => s.userId === user?.id)
  const activeSub = userSubs.find(s => s.status === 'active')

  const subscribe = (plan) => {
    setSubscriptions([...subscriptions, {
      id: Date.now(),
      userId: user?.id,
      plan,
      status: 'active',
      startDate: new Date().toISOString()
    }])
  }

  const cancel = (id) => {
    setSubscriptions(subscriptions.map(s => 
      s.id === id ? { ...s, status: 'cancelled' } : s
    ))
  }

  return (
    <div>
      {activeSub ? (
        <div>Plan: {activeSub.plan}</div>
      ) : (
        <Button onClick={() => subscribe('Premium')}>Suscribirse</Button>
      )}
    </div>
  )
}
```

### Componente Migrado (Supabase)

```typescript
import { useSubscriptions } from '@/hooks/useSubscriptions'
import { toast } from 'sonner'

function SubscriptionManager() {
  const { user } = useAuth()
  const { 
    activeSubscription, 
    loading,
    createSubscription, 
    cancelSubscription 
  } = useSubscriptions()

  const handleSubscribe = async (planName: string) => {
    try {
      await createSubscription({
        plan: planName,
        status: 'active',
        start_date: new Date().toISOString().split('T')[0],
        amount: 99.99,
      })
      toast.success('¡Suscripción activada!')
    } catch (error) {
      toast.error('Error al suscribirse')
      console.error(error)
    }
  }

  const handleCancel = async () => {
    if (!activeSubscription) return
    
    try {
      await cancelSubscription(activeSubscription.id)
      toast.success('Suscripción cancelada')
    } catch (error) {
      toast.error('Error al cancelar')
      console.error(error)
    }
  }

  if (loading) {
    return <div>Cargando suscripciones...</div>
  }

  return (
    <div>
      {activeSubscription ? (
        <div>
          <div>Plan: {activeSubscription.plan}</div>
          <Button onClick={handleCancel} variant="destructive">
            Cancelar
          </Button>
        </div>
      ) : (
        <Button onClick={() => handleSubscribe('Premium')}>
          Suscribirse
        </Button>
      )}
    </div>
  )
}
```

## Beneficios de la Migración

✅ **Datos persistentes**: No se pierden al cambiar de dispositivo
✅ **Sincronización**: Actualizaciones en tiempo real
✅ **Seguridad**: Row Level Security protege datos
✅ **Escalabilidad**: Backend robusto de PostgreSQL
✅ **Compartir datos**: Entre usuarios según permisos
✅ **Queries avanzadas**: Filtros, ordenamiento, joins
✅ **Backup automático**: Supabase gestiona respaldos

## Checklist de Migración

- [ ] Identificar todos los `useKV` en el proyecto
- [ ] Determinar cuáles deben migrar a Supabase
- [ ] Verificar que las tablas existen en Supabase
- [ ] Reemplazar hooks useKV por hooks de Supabase
- [ ] Convertir operaciones a asíncronas
- [ ] Agregar manejo de loading y errores
- [ ] Probar cada componente migrado
- [ ] Verificar que RLS funciona correctamente
- [ ] Eliminar código useKV obsoleto
