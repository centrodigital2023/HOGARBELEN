# Guía de Supabase Realtime - Sistema de Sincronización en Tiempo Real

## 📋 Índice

1. [Introducción](#introducción)
2. [Arquitectura del Sistema](#arquitectura-del-sistema)
3. [Configuración Inicial](#configuración-inicial)
4. [Hooks Disponibles](#hooks-disponibles)
5. [Componentes](#componentes)
6. [Flujos de Trabajo](#flujos-de-trabajo)
7. [Solución de Problemas](#solución-de-problemas)
8. [Ejemplos de Uso](#ejemplos-de-uso)

---

## Introducción

Este sistema implementa sincronización en tiempo real usando **Supabase Realtime**, permitiendo que todos los componentes de la aplicación se actualicen automáticamente cuando hay cambios en la base de datos.

### Características Principales

- ⚡ **Sincronización instantánea** (< 2 segundos)
- 🔄 **Reconexión automática** con backoff exponencial
- 🎯 **Filtrado en tiempo real** por estado y usuario
- 🔒 **Seguridad con RLS** (Row Level Security)
- 📱 **Notificaciones toast** para cambios importantes
- 🎨 **Indicador visual** de estado de conexión

---

## Arquitectura del Sistema

### Flujo de Datos

```
Usuario realiza acción
    ↓
INSERT/UPDATE en Supabase
    ↓
Trigger SQL ejecuta
    ↓
Supabase Realtime envía evento
    ↓
Hook detecta cambio
    ↓
Estado local actualizado
    ↓
UI re-renderiza automáticamente
```

### Componentes del Sistema

1. **Base de Datos**: PostgreSQL con triggers y funciones
2. **Realtime Server**: Supabase Realtime (WebSockets)
3. **Hooks**: React hooks para suscripción y estado
4. **Componentes**: UI que consume los hooks

---

## Configuración Inicial

### 1. Ejecutar Migración SQL

Ejecuta el script `supabase-realtime-migration.sql` en tu base de datos de Supabase:

```bash
# En Supabase Dashboard > SQL Editor
# O usando CLI:
supabase db execute -f supabase-realtime-migration.sql
```

Este script configura:
- Columnas de aprobación (`approved_at`, `approved_by`)
- Funciones SQL para aprobar/rechazar
- Triggers para notificaciones
- Políticas RLS actualizadas
- Habilitación de Realtime en las tablas

### 2. Verificar Variables de Entorno

Asegúrate de tener configuradas en `.env`:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key
```

### 3. Habilitar Realtime en Supabase

En el Dashboard de Supabase:
1. Ve a **Database** > **Replication**
2. Asegúrate que las tablas `professionals` y `job_offers` tienen Realtime habilitado

---

## Hooks Disponibles

### useSupabaseRealtimeSync (Hook Genérico)

Hook de bajo nivel para suscribirse a cambios de cualquier tabla.

```typescript
import { useSupabaseRealtimeSync } from '@/hooks/useSupabaseRealtimeSync';

const { status, isConnected } = useSupabaseRealtimeSync({
  table: 'professionals',
  event: '*', // 'INSERT' | 'UPDATE' | 'DELETE' | '*'
  onInsert: (payload) => console.log('Insertado:', payload.new),
  onUpdate: (payload) => console.log('Actualizado:', payload.new),
  onDelete: (payload) => console.log('Eliminado:', payload.old),
  onError: (error) => console.error('Error:', error),
});
```

**Parámetros:**
- `table`: Nombre de la tabla
- `event`: Tipo de evento a escuchar
- `filter`: Filtro opcional (ej: `"status=eq.approved"`)
- `onInsert/onUpdate/onDelete`: Callbacks para eventos
- `onError`: Callback para errores
- `enabled`: Habilitar/deshabilitar suscripción (default: true)

**Retorna:**
- `status`: Estado de conexión ('connected' | 'connecting' | 'disconnected')
- `isConnected`: Boolean de conexión
- `subscribe/unsubscribe`: Funciones para control manual

### useProfessionalsSupabase

Hook especializado para gestión de profesionales.

```typescript
import { useProfessionalsSupabase } from '@/hooks/useProfessionalsSupabase';

const { 
  professionals,          // Lista de profesionales
  loading,                // Estado de carga
  error,                  // Error si existe
  isConnected,            // Estado de conexión Realtime
  addProfessional,        // Agregar profesional
  updateProfessional,     // Actualizar profesional
  approveProfessional,    // Aprobar profesional
  rejectProfessional,     // Rechazar profesional
  deleteProfessional,     // Eliminar profesional
  refresh,                // Refrescar datos manualmente
} = useProfessionalsSupabase({
  status: 'pending',      // 'pending' | 'approved' | 'rejected' | 'all'
  autoSync: true,         // Habilitar sincronización automática
  onUpdate: (profs) => {} // Callback cuando hay cambios
});
```

**Ejemplo de uso:**

```typescript
// En un panel de admin
const AdminPanel = () => {
  const { professionals, approveProfessional, rejectProfessional } = 
    useProfessionalsSupabase({ status: 'pending' });

  const handleApprove = async (id: string) => {
    await approveProfessional(id, adminUserId);
  };

  return (
    <div>
      {professionals.map(prof => (
        <ProfessionalCard 
          key={prof.id}
          professional={prof}
          onApprove={() => handleApprove(prof.id)}
        />
      ))}
    </div>
  );
};
```

### useJobOffersSupabase

Hook especializado para ofertas de trabajo.

```typescript
import { useJobOffersSupabase } from '@/hooks/useJobOffersSupabase';

const { 
  jobOffers,              // Lista de ofertas
  loading,                // Estado de carga
  error,                  // Error si existe
  isConnected,            // Estado de conexión
  addJobOffer,            // Agregar oferta
  updateJobOffer,         // Actualizar oferta
  approveJobOffer,        // Aprobar oferta
  rejectJobOffer,         // Rechazar oferta
  deleteJobOffer,         // Eliminar oferta
  refresh,                // Refrescar datos
} = useJobOffersSupabase({
  status: 'pendiente',    // 'pendiente' | 'aprobada' | 'rechazada' | 'all'
  autoSync: true,
  onUpdate: (offers) => {}
});
```

---

## Componentes

### RealtimeIndicator

Indicador visual del estado de sincronización.

```typescript
import { RealtimeIndicator } from '@/components/RealtimeIndicator';

<RealtimeIndicator 
  status={realtimeStatus}  // 'connected' | 'connecting' | 'disconnected'
  showLabel={true}         // Mostrar texto del estado
  className="ml-auto"      // Clases CSS adicionales
/>
```

**Estados:**
- 🟢 **Conectado**: Verde pulsante - "Sincronizado"
- 🟡 **Conectando**: Amarillo - "Conectando..."
- 🔴 **Desconectado**: Rojo - "Desconectado"

### AdminProfessionalsPanel

Panel completo para administración de profesionales.

```typescript
import { AdminProfessionalsPanel } from '@/components/AdminProfessionalsPanel';

<AdminProfessionalsPanel adminId={currentUser.id} />
```

**Características:**
- Tabs para pendientes/aprobados/rechazados
- Estadísticas en cards
- Aprobación/rechazo con un clic
- Dialog de detalles
- Indicador de sincronización en tiempo real

### AdminJobOffersPanel

Panel para administración de ofertas de trabajo.

```typescript
import { AdminJobOffersPanel } from '@/components/AdminJobOffersPanel';

<AdminJobOffersPanel adminId={currentUser.id} />
```

### PublicJobOffers

Vista pública de ofertas aprobadas.

```typescript
import { PublicJobOffers } from '@/components/PublicJobOffers';

<PublicJobOffers onSelectOffer={(offer) => console.log(offer)} />
```

**Características:**
- Solo muestra ofertas con estado 'aprobada'
- Filtros por ubicación y tipo de servicio
- Búsqueda en tiempo real
- Actualización automática cuando se aprueba una oferta

### RealtimeProfessionalsList

Lista pública de profesionales aprobados.

```typescript
import { RealtimeProfessionalsList } from '@/components/RealtimeProfessionalsList';

<RealtimeProfessionalsList 
  onSelectProfessional={(prof) => console.log(prof)} 
/>
```

---

## Flujos de Trabajo

### Flujo 1: Registro de Profesional

```
1. Usuario completa formulario de registro
   ↓
2. addProfessional() crea registro con status='pending'
   ↓
3. INSERT trigger dispara evento Realtime
   ↓
4. AdminProfessionalsPanel recibe notificación
   ↓
5. Nuevo profesional aparece en tab "Pendientes" (< 2s)
   ↓
6. Admin hace clic en "Aprobar"
   ↓
7. approveProfessional() llama función SQL
   ↓
8. UPDATE trigger dispara evento Realtime
   ↓
9. RealtimeProfessionalsList recibe actualización
   ↓
10. Profesional aparece públicamente (< 2s)
```

### Flujo 2: Publicación de Oferta de Trabajo

```
1. Familia completa formulario de oferta
   ↓
2. addJobOffer() crea registro con estado='pendiente'
   ↓
3. INSERT trigger dispara evento
   ↓
4. AdminJobOffersPanel se actualiza automáticamente
   ↓
5. Admin revisa y aprueba
   ↓
6. approveJobOffer() actualiza estado='aprobada'
   ↓
7. UPDATE trigger dispara evento
   ↓
8. PublicJobOffers muestra nueva oferta
```

### Flujo 3: Reconexión Automática

```
1. Conexión se pierde (red/servidor)
   ↓
2. Hook detecta desconexión
   ↓
3. Status cambia a 'disconnected'
   ↓
4. Indicador muestra 🔴 "Desconectado"
   ↓
5. Intento de reconexión #1 (delay: 1s)
   ↓
6. Si falla, intento #2 (delay: 2s)
   ↓
7. Intento #3 (delay: 4s)
   ↓
8. Hasta 5 intentos con backoff exponencial
   ↓
9. Al reconectar: status = 'connected'
   ↓
10. Indicador muestra 🟢 "Sincronizado"
```

---

## Solución de Problemas

### Problema: No se reciben actualizaciones en tiempo real

**Solución:**

1. Verifica que Realtime esté habilitado:
```sql
-- Verificar publicación
SELECT * FROM pg_publication_tables 
WHERE pubname = 'supabase_realtime';

-- Si no está, ejecutar:
ALTER PUBLICATION supabase_realtime ADD TABLE professionals;
ALTER PUBLICATION supabase_realtime ADD TABLE job_offers;
```

2. Verifica la conexión:
```typescript
const { status } = useSupabaseRealtimeSync({...});
console.log('Status:', status); // Debe ser 'connected'
```

3. Revisa políticas RLS:
```sql
-- Debe permitir SELECT a usuarios autenticados
SELECT * FROM pg_policies 
WHERE tablename IN ('professionals', 'job_offers');
```

### Problema: Error "relation does not exist"

**Solución:**

Asegúrate de haber ejecutado la migración:
```bash
supabase db execute -f supabase-realtime-migration.sql
```

### Problema: Reconexión infinita

**Solución:**

Verifica las credenciales de Supabase:
```typescript
// En src/lib/supabase.ts
console.log('URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('Key exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);
```

### Problema: Actualizaciones lentas (> 2 segundos)

**Posibles causas:**

1. **Problemas de red**: Verifica la conexión
2. **Carga del servidor**: Revisa el dashboard de Supabase
3. **Demasiadas suscripciones**: Limita las suscripciones activas
4. **Queries complejos**: Optimiza los joins en los hooks

---

## Ejemplos de Uso

### Ejemplo 1: Dashboard de Admin Simple

```typescript
import { AdminProfessionalsPanel } from '@/components/AdminProfessionalsPanel';
import { AdminJobOffersPanel } from '@/components/AdminJobOffersPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>
      
      <Tabs defaultValue="professionals">
        <TabsList>
          <TabsTrigger value="professionals">Profesionales</TabsTrigger>
          <TabsTrigger value="jobs">Ofertas de Trabajo</TabsTrigger>
        </TabsList>

        <TabsContent value="professionals">
          <AdminProfessionalsPanel adminId={user.id} />
        </TabsContent>

        <TabsContent value="jobs">
          <AdminJobOffersPanel adminId={user.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

### Ejemplo 2: Vista Pública con Tabs

```typescript
import { RealtimeProfessionalsList } from '@/components/RealtimeProfessionalsList';
import { PublicJobOffers } from '@/components/PublicJobOffers';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function PublicDirectory() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Directorio Público</h1>
      
      <Tabs defaultValue="professionals">
        <TabsList>
          <TabsTrigger value="professionals">Profesionales</TabsTrigger>
          <TabsTrigger value="jobs">Ofertas de Trabajo</TabsTrigger>
        </TabsList>

        <TabsContent value="professionals">
          <RealtimeProfessionalsList />
        </TabsContent>

        <TabsContent value="jobs">
          <PublicJobOffers />
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

### Ejemplo 3: Hook Personalizado

```typescript
// useMyCustomRealtime.ts
import { useSupabaseRealtimeSync } from '@/hooks/useSupabaseRealtimeSync';
import { toast } from 'sonner';

export function useMyCustomRealtime() {
  const { status, isConnected } = useSupabaseRealtimeSync({
    table: 'my_table',
    event: 'INSERT',
    onInsert: (payload) => {
      toast.success('Nuevo registro añadido!', {
        description: `ID: ${payload.new.id}`
      });
    },
    onError: (error) => {
      toast.error('Error en Realtime', {
        description: error.message
      });
    }
  });

  return { isConnected, status };
}
```

### Ejemplo 4: Sincronización Bidireccional

```typescript
export function BidirectionalSync() {
  const [localData, setLocalData] = useState<any[]>([]);
  
  const { professionals, updateProfessional } = useProfessionalsSupabase({
    onUpdate: (profs) => {
      // Actualización desde servidor → local
      setLocalData(profs);
    }
  });

  const handleLocalChange = async (id: string, changes: any) => {
    // Actualización local → servidor
    await updateProfessional(id, changes);
    // El hook recibirá el cambio y actualizará automáticamente
  };

  return (
    <div>
      {localData.map(item => (
        <ItemCard 
          key={item.id}
          item={item}
          onChange={(changes) => handleLocalChange(item.id, changes)}
        />
      ))}
    </div>
  );
}
```

---

## Performance y Mejores Prácticas

### ✅ Buenas Prácticas

1. **Limita las suscripciones**: No te suscribas a más tablas de las necesarias
2. **Usa filtros**: Filtra en el hook, no en el cliente
3. **Cleanup**: Los hooks limpian automáticamente al desmontar
4. **Error handling**: Siempre proporciona callbacks de error
5. **Loading states**: Usa el estado `loading` para mostrar skeletons

### ❌ Evita

1. ❌ Múltiples suscripciones a la misma tabla
2. ❌ Modificar el estado local sin pasar por los hooks
3. ❌ Ignorar el estado de conexión
4. ❌ No manejar errores de red
5. ❌ Suscripciones en loops o effects sin dependencies

---

## Testing

### Test de Conexión

```typescript
import { checkRealtimeStatus } from '@/lib/supabase-realtime';

// En consola de desarrollo
const isWorking = await checkRealtimeStatus();
console.log('Realtime working:', isWorking);
```

### Test de Sincronización

1. Abre dos pestañas/ventanas
2. En una, aprueba un profesional
3. En la otra, verifica que aparece en < 2 segundos

### Test de Reconexión

1. Desactiva la red del dispositivo
2. Verifica que el indicador muestra 🔴 "Desconectado"
3. Reactiva la red
4. Verifica que reconecta automáticamente (🟢 "Sincronizado")

---

## Recursos Adicionales

- [Documentación de Supabase Realtime](https://supabase.com/docs/guides/realtime)
- [React Hooks Best Practices](https://react.dev/reference/react)
- [PostgreSQL Triggers](https://www.postgresql.org/docs/current/trigger-definition.html)

---

## Soporte

Si encuentras problemas:

1. Revisa esta guía
2. Verifica los logs en la consola del navegador
3. Revisa el dashboard de Supabase > Logs
4. Crea un issue en el repositorio

---

**Última actualización**: Enero 2026  
**Versión**: 1.0.0
