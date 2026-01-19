# 🚀 Quick Start Guide - Sistema Realtime

## Despliegue Rápido en 5 Pasos

### Paso 1: Ejecutar Migración SQL (5 minutos)

1. Abre Supabase Dashboard
2. Ve a **SQL Editor**
3. Copia todo el contenido de `supabase-realtime-migration.sql`
4. Pega y ejecuta
5. Verifica que se ejecutó sin errores

✅ **Verificación**: Deberías ver mensajes de éxito para todas las operaciones

---

### Paso 2: Habilitar Realtime (2 minutos)

1. En Supabase Dashboard, ve a **Database** → **Replication**
2. Busca la tabla `professionals`
3. Toggle ON para habilitar Realtime
4. Busca la tabla `job_offers`
5. Toggle ON para habilitar Realtime

✅ **Verificación**: Ambas tablas deben mostrar el switch en verde

---

### Paso 3: Variables de Entorno (1 minuto)

Verifica que tu `.env` tenga:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anon-aqui
```

✅ **Verificación**: Las variables deben estar presentes y ser correctas

---

### Paso 4: Instalar y Build (3 minutos)

```bash
# Instalar dependencias (si es necesario)
npm install

# Build del proyecto
npm run build

# O para desarrollo
npm run dev
```

✅ **Verificación**: Build debe completarse sin errores

---

### Paso 5: Testing (5 minutos)

#### Test 1: Conexión Realtime
1. Abre la aplicación
2. Ve al panel de administración
3. Busca el indicador de Realtime
4. Debe mostrar 🟢 "Sincronizado"

#### Test 2: Sincronización
1. Abre dos pestañas del navegador
2. En la primera, aprueba un profesional
3. En la segunda, verifica que aparece automáticamente
4. Debe aparecer en < 2 segundos

✅ **Verificación**: Cambios deben sincronizarse instantáneamente

---

## 🎯 Uso Básico

### Para Administradores

**Acceder al Panel:**
```tsx
import { RealtimeAdminPanel } from '@/components/RealtimeAdminPanel';

<RealtimeAdminPanel 
  adminId={currentUser.id} 
  adminEmail={currentUser.email} 
/>
```

**Funcionalidades:**
- Ver profesionales pendientes en tiempo real
- Aprobar/rechazar con un clic
- Ver ofertas de trabajo pendientes
- Gestionar estados automáticamente

### Para Vista Pública

**Lista de Profesionales:**
```tsx
import { RealtimeProfessionalsList } from '@/components/RealtimeProfessionalsList';

<RealtimeProfessionalsList />
```

**Lista de Ofertas:**
```tsx
import { PublicJobOffers } from '@/components/PublicJobOffers';

<PublicJobOffers />
```

---

## 🔍 Verificación de Estado

### Indicador de Conexión

El `RealtimeIndicator` muestra:
- 🟢 **Verde pulsante**: Conectado y sincronizando
- 🟡 **Amarillo**: Intentando conectar
- 🔴 **Rojo**: Desconectado

### Logs en Consola

En la consola del navegador deberías ver:
```
✅ Subscribed to professionals realtime updates
✅ Subscribed to job_offers realtime updates
```

### Supabase Dashboard

En **Database** → **Logs** deberías ver:
- Conexiones Realtime activas
- Eventos de INSERT/UPDATE
- Trigger executions

---

## 🐛 Solución Rápida de Problemas

### Problema: Indicador muestra 🔴 Desconectado

**Solución:**
1. Verifica variables de entorno
2. Verifica que Realtime está habilitado en tablas
3. Revisa firewall/cors
4. Verifica plan de Supabase (Realtime incluido)

### Problema: Cambios no se sincronizan

**Solución:**
1. Ejecuta la migración SQL
2. Verifica políticas RLS
3. Revisa logs en Supabase Dashboard
4. Verifica que estás usando los nuevos hooks

### Problema: Error "function does not exist"

**Solución:**
1. Ejecuta completamente `supabase-realtime-migration.sql`
2. Verifica que todas las funciones se crearon
3. Ejecuta en Supabase SQL Editor:
   ```sql
   SELECT proname FROM pg_proc WHERE proname LIKE 'approve%';
   ```
   Deberías ver 4 funciones

---

## 📱 Componentes Disponibles

### Admin
- `AdminProfessionalsPanel` - Gestión completa de profesionales
- `AdminJobOffersPanel` - Gestión completa de ofertas
- `RealtimeAdminPanel` - Panel integrado con tabs

### Público
- `RealtimeProfessionalsList` - Lista de profesionales aprobados
- `PublicJobOffers` - Lista de ofertas aprobadas

### Utilidades
- `RealtimeIndicator` - Indicador de estado de conexión

---

## 🔧 Configuración Avanzada

### Cambiar Intervalo de Reconexión

En `src/lib/supabase-realtime.ts`:
```typescript
export const defaultReconnectConfig: ReconnectConfig = {
  maxAttempts: 5,      // Intentos máximos
  baseDelay: 1000,     // Delay base (ms)
  maxDelay: 30000,     // Delay máximo (ms)
};
```

### Personalizar Filtros

```typescript
// En tus componentes
const { professionals } = useProfessionalsSupabase({
  status: 'pending',  // 'pending' | 'approved' | 'rejected' | 'all'
  autoSync: true,     // Habilitar/deshabilitar sync
  onUpdate: (profs) => {
    // Callback cuando hay cambios
    console.log('Updated:', profs);
  }
});
```

---

## 📚 Documentación Completa

- **Guía Técnica**: `REALTIME-SUPABASE-GUIDE.md`
- **Resumen**: `REALTIME-IMPLEMENTATION-SUMMARY.md`
- **SQL**: `supabase-realtime-migration.sql` (con comentarios)

---

## ✅ Checklist de Despliegue

- [ ] Migración SQL ejecutada
- [ ] Realtime habilitado en tablas
- [ ] Variables de entorno configuradas
- [ ] Build sin errores
- [ ] Test de conexión pasado
- [ ] Test de sincronización pasado
- [ ] Indicador muestra 🟢
- [ ] Logs sin errores

---

## 🎉 ¡Todo Listo!

Si todos los checks pasan, el sistema está listo para producción.

**Tiempo total estimado**: 15-20 minutos

**Preguntas?** Ver documentación completa o crear issue en repo.

---

**Versión**: 1.0.0  
**Última Actualización**: Enero 2026
