# Sistema de Sincronización en Tiempo Real

## Descripción General

Este sistema proporciona sincronización de datos en tiempo real entre administradores, profesionales registrados, familias y la página pública de profesionales utilizando el KV store de Spark.

## Características Principales

✅ **Sincronización automática cada 2-3 segundos**
✅ **Actualizaciones en tiempo real sin necesidad de recargar la página**
✅ **Notificaciones instantáneas de cambios importantes**
✅ **Sistema de mensajería en tiempo real**
✅ **Registro de actividad completo**
✅ **Gestión de profesionales con aprobación/rechazo**

## Hooks Disponibles

### 1. `useRealtimeSync<T>`
Hook base para sincronización en tiempo real de cualquier tipo de dato.

```typescript
import { useRealtimeSync } from '@/hooks/useRealtimeSync';

const { data, updateData, refresh } = useRealtimeSync<MyType>({
  key: 'my-data-key',
  syncInterval: 2000, // milisegundos
  onUpdate: (data) => {
    // Callback cuando hay actualización
    console.log('Datos actualizados:', data);
  }
});
```

### 2. `useProfessionalsSync`
Gestión completa de profesionales con sincronización en tiempo real.

```typescript
import { useProfessionalsSync } from '@/hooks/useProfessionalsSync';

const {
  professionals,           // Lista de profesionales
  addProfessional,        // Agregar nuevo profesional
  updateProfessional,     // Actualizar datos
  approveProfessional,    // Aprobar profesional
  rejectProfessional,     // Rechazar profesional
  deleteProfessional,     // Eliminar profesional
  refresh                 // Refrescar manualmente
} = useProfessionalsSync();

// Agregar profesional
await addProfessional({
  name: "Dr. Juan Pérez",
  email: "juan@example.com",
  title: "Geriatra",
  category: "Medicina Geriátrica",
  description: "Especialista...",
  years_experience: 10,
  status: 'pending'
});

// Aprobar profesional
await approveProfessional(professionalId, 'admin@email.com');

// Rechazar profesional
await rejectProfessional(professionalId, 'Documentación incompleta');
```

### 3. `useNotificationsSync`
Sistema de notificaciones en tiempo real para usuarios.

```typescript
import { useNotificationsSync } from '@/hooks/useNotificationsSync';

const {
  notifications,          // Lista de notificaciones del usuario
  unreadCount,           // Contador de no leídas
  sendNotification,      // Enviar notificación
  markAsRead,           // Marcar como leída
  markAllAsRead,        // Marcar todas como leídas
  deleteNotification    // Eliminar notificación
} = useNotificationsSync(userId, userRole);

// Enviar notificación
await sendNotification({
  type: 'professional_approved',
  title: 'Perfil Aprobado',
  message: 'Tu perfil ha sido aprobado',
  recipient_id: professionalId,
  recipient_role: 'professional'
});
```

### 4. `useMessagesSync`
Sistema de mensajería en tiempo real entre usuarios.

```typescript
import { useMessagesSync } from '@/hooks/useMessagesSync';

const {
  messages,                  // Mensajes del usuario
  conversations,             // Conversaciones
  sendMessage,              // Enviar mensaje
  markAsRead,               // Marcar mensaje como leído
  markConversationAsRead,   // Marcar conversación como leída
  refresh                   // Refrescar manualmente
} = useMessagesSync(userId);

// Enviar mensaje
await sendMessage(
  recipientId,
  'professional',
  'Hola, tengo una consulta...',
  'Juan Pérez',
  'family'
);
```

### 5. `useActivitySync`
Registro de actividad y auditoría en tiempo real.

```typescript
import { useActivitySync } from '@/hooks/useActivitySync';

const {
  activities,               // Lista de actividades
  logActivity,             // Registrar actividad
  getActivitiesByUser,     // Por usuario
  getActivitiesByEntity,   // Por entidad
  getRecentActivities      // Actividades recientes
} = useActivitySync();

// Registrar actividad
await logActivity({
  user_id: adminId,
  user_name: 'Admin',
  user_role: 'admin',
  action: 'approve_professional',
  entity_type: 'professional',
  entity_id: professionalId,
  details: 'Profesional aprobado exitosamente'
});
```

## Componentes de UI

### 1. `<RealtimeNotifications />`
Componente de notificaciones con badge y popup.

```typescript
import { RealtimeNotifications } from '@/components/RealtimeNotifications';

<RealtimeNotifications 
  userId={currentUser.id} 
  userRole={currentUser.role}
/>
```

### 2. `<RealtimeProfessionalsList />`
Listado de profesionales con actualización automática.

```typescript
import { RealtimeProfessionalsList } from '@/components/RealtimeProfessionalsList';

<RealtimeProfessionalsList 
  onSelectProfessional={(prof) => console.log(prof)}
/>
```

## Flujo de Datos

### Registro y Aprobación de Profesionales

1. **Profesional se registra** → Estado: `pending`
2. **Admin recibe notificación automática**
3. **Admin aprueba/rechaza** → Estado: `approved` o `rejected`
4. **Profesional recibe notificación instantánea**
5. **Listado público se actualiza automáticamente**
6. **Familias ven el nuevo profesional sin recargar**

### Comunicación en Tiempo Real

1. **Usuario A envía mensaje a Usuario B**
2. **Sistema crea/actualiza conversación**
3. **Usuario B recibe notificación instantánea**
4. **Contador de mensajes no leídos se actualiza**
5. **Ambos usuarios ven la conversación sincronizada**

## Estructura de Datos

### Professional
```typescript
interface Professional {
  id: string;
  name: string;
  email: string;
  title: string;
  category: string;
  description: string;
  years_experience: number;
  phone?: string;
  city?: string;
  avatar?: string;
  rating?: number;
  reviews?: number;
  schedule?: string[];
  status: 'pending' | 'approved' | 'rejected';
  ai_score?: number;
  ai_analysis?: any;
  rejection_reason?: string;
  created_at: string;
  updated_at: string;
  approved_by?: string;
  approved_at?: string;
}
```

### Notification
```typescript
interface Notification {
  id: string;
  type: 'professional_approved' | 'professional_rejected' | 'new_message' | 'system';
  title: string;
  message: string;
  recipient_id: string;
  recipient_role: 'professional' | 'family' | 'admin';
  read: boolean;
  created_at: string;
  data?: any;
}
```

### Message
```typescript
interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender_name: string;
  sender_role: 'professional' | 'family' | 'admin';
  recipient_id: string;
  recipient_role: 'professional' | 'family' | 'admin';
  content: string;
  read: boolean;
  created_at: string;
  attachments?: string[];
}
```

## Mejores Prácticas

### 1. Actualización Funcional
Siempre usar funciones para actualizar estado que depende del valor anterior:

```typescript
// ❌ INCORRECTO
setData([...data, newItem]); // data puede estar obsoleto

// ✅ CORRECTO
setData((currentData) => [...currentData, newItem]);
```

### 2. Intervalo de Sincronización
Ajustar según la criticidad de los datos:

- **Alta prioridad (mensajes)**: 2000ms (2 segundos)
- **Media prioridad (notificaciones)**: 3000ms (3 segundos)
- **Baja prioridad (actividad)**: 5000ms (5 segundos)

### 3. Cleanup
Los hooks manejan automáticamente la limpieza de intervalos al desmontar.

### 4. Manejo de Errores
Los errores se capturan internamente y se registran en consola.

## Ventajas del Sistema

✅ **Sin necesidad de backend WebSocket** - Usa KV store nativo de Spark
✅ **Simple y confiable** - No requiere configuración compleja
✅ **Escalable** - Funciona con múltiples usuarios simultáneamente
✅ **Persistente** - Los datos se mantienen entre sesiones
✅ **Type-safe** - Totalmente tipado con TypeScript
✅ **Optimizado** - Usa functional updates para evitar datos obsoletos

## Ejemplo Completo: Panel de Admin

```typescript
import { useProfessionalsSync } from '@/hooks/useProfessionalsSync';
import { useNotificationsSync } from '@/hooks/useNotificationsSync';
import { useActivitySync } from '@/hooks/useActivitySync';

export function AdminPanel() {
  const { professionals, approveProfessional, rejectProfessional } = useProfessionalsSync();
  const { sendNotification } = useNotificationsSync();
  const { logActivity } = useActivitySync();

  const handleApprove = async (prof: Professional) => {
    // Aprobar profesional
    await approveProfessional(prof.id, 'admin@email.com');
    
    // Enviar notificación al profesional
    await sendNotification({
      type: 'professional_approved',
      title: '¡Perfil Aprobado!',
      message: 'Tu perfil profesional ha sido aprobado y ahora es visible públicamente.',
      recipient_id: prof.id,
      recipient_role: 'professional'
    });
    
    // Registrar actividad
    await logActivity({
      user_id: 'admin_id',
      user_name: 'Administrador',
      user_role: 'admin',
      action: 'approve_professional',
      entity_type: 'professional',
      entity_id: prof.id,
      details: `Profesional ${prof.name} aprobado`
    });
  };

  const pendingProfessionals = professionals.filter(p => p.status === 'pending');

  return (
    <div>
      <h2>Profesionales Pendientes ({pendingProfessionals.length})</h2>
      {pendingProfessionals.map(prof => (
        <div key={prof.id}>
          <h3>{prof.name}</h3>
          <button onClick={() => handleApprove(prof)}>Aprobar</button>
          <button onClick={() => rejectProfessional(prof.id, 'Razón...')}>Rechazar</button>
        </div>
      ))}
    </div>
  );
}
```

## Soporte

Para más información o problemas, revisar los archivos de implementación en:
- `/src/hooks/useRealtimeSync.ts`
- `/src/hooks/useProfessionalsSync.ts`
- `/src/hooks/useNotificationsSync.ts`
- `/src/hooks/useMessagesSync.ts`
- `/src/hooks/useActivitySync.ts`
