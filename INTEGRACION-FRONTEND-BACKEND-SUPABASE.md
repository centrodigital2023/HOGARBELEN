# 🔗 Integración Frontend-Backend-Supabase

Este documento describe la arquitectura completa de integración entre el frontend (Vite+React), Supabase (base de datos y autenticación) y el despliegue en Vercel.

## 📋 Tabla de Contenidos

1. [Arquitectura General](#arquitectura-general)
2. [Configuración de Frontend](#configuración-de-frontend)
3. [Integración con Supabase](#integración-con-supabase)
4. [Despliegue en Vercel](#despliegue-en-vercel)
5. [Variables de Entorno](#variables-de-entorno)
6. [Flujos de Autenticación](#flujos-de-autenticación)
7. [Operaciones de Base de Datos](#operaciones-de-base-de-datos)
8. [Testing y Validación](#testing-y-validación)

## 🏗️ Arquitectura General

```
┌─────────────────┐
│   Frontend      │
│  (Vite+React)   │
│                 │
│  - UI/UX        │
│  - Auth Flows   │
│  - Data Queries │
└────────┬────────┘
         │
         │ Supabase-JS Client
         │
         ▼
┌─────────────────┐
│    Supabase     │
│  (Backend as    │
│   a Service)    │
│                 │
│  - PostgreSQL   │
│  - Auth         │
│  - Storage      │
│  - Realtime     │
│  - Edge Fns     │
└─────────────────┘
         │
         │ Deploy
         ▼
┌─────────────────┐
│     Vercel      │
│  (Hosting)      │
│                 │
│  - CI/CD        │
│  - Edge Network │
│  - Env Vars     │
└─────────────────┘
```

### ¿Por qué esta arquitectura?

1. **Sin Backend Custom Necesario**: Supabase proporciona todas las funcionalidades backend:
   - Base de datos PostgreSQL completa
   - Autenticación con múltiples proveedores
   - APIs REST y GraphQL automáticas
   - Realtime subscriptions
   - Storage para archivos
   - Edge Functions para lógica custom

2. **Frontend Directo a Supabase**: 
   - El frontend se comunica directamente con Supabase
   - Row Level Security (RLS) protege los datos
   - Reduce latencia (sin middleware)
   - Simplifica la arquitectura

3. **FastAPI Opcional**:
   - Solo necesario para lógica de negocio muy específica
   - Integraciones con servicios externos
   - Procesamiento complejo que no cabe en Edge Functions
   - Por ahora NO implementado (Supabase es suficiente)

## ⚙️ Configuración de Frontend

### Estructura del Proyecto

```
src/
├── lib/
│   ├── supabase.ts          # Cliente Supabase configurado
│   ├── auth.ts              # Funciones de autenticación
│   └── storage.ts           # Gestión de archivos
├── hooks/
│   ├── useSupabaseAuth.ts   # Hook de autenticación
│   ├── useSupabaseQuery.ts  # Hook para queries
│   └── useSupabaseMutation.ts # Hook para mutations
├── components/
│   ├── SupabaseConnectionTest.tsx
│   └── examples/
│       ├── SupabaseAuthExample.tsx
│       └── LeadsManagerExample.tsx
└── pages/
    ├── BelenConectaLogin.tsx
    ├── BelenConectaRegister.tsx
    └── SupabaseIntegrationDemo.tsx
```

### Cliente Supabase

El cliente está configurado en `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})
```

**Características:**
- ✅ Auto-refresh de tokens
- ✅ Persistencia de sesión en localStorage
- ✅ Detección automática de sesión en URL (callbacks OAuth)
- ✅ TypeScript types completos para toda la DB

## 🔐 Integración con Supabase

### 1. Autenticación

Supabase maneja toda la autenticación:

#### Registro de Usuario

```typescript
import { signUp } from '@/lib/auth'

const result = await signUp({
  email: 'user@example.com',
  password: 'SecurePass123',
  fullName: 'Juan Pérez',
  role: 'family', // o 'professional'
  phone: '+573001234567'
})
```

#### Login

```typescript
import { signIn } from '@/lib/auth'

const result = await signIn({
  email: 'user@example.com',
  password: 'SecurePass123'
})
```

#### Usando el Hook

```typescript
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth'

function MyComponent() {
  const { user, session, loading, signIn, signOut } = useSupabaseAuth()

  if (loading) return <div>Cargando...</div>
  
  if (user) {
    return (
      <div>
        <p>Bienvenido {user.email}</p>
        <button onClick={signOut}>Cerrar Sesión</button>
      </div>
    )
  }

  return <LoginForm onSubmit={(email, password) => signIn(email, password)} />
}
```

### 2. Operaciones de Base de Datos

#### Consultas (Queries)

```typescript
import { supabase } from '@/lib/supabase'

// Obtener todos los profesionales verificados
const { data: professionals, error } = await supabase
  .from('professionals')
  .select('*, profiles(*)')
  .eq('verified', true)
  .order('rating', { ascending: false })

// Obtener citas de un usuario
const { data: appointments } = await supabase
  .from('appointments')
  .select('*, professional:professionals(*), family:profiles(*)')
  .eq('family_id', userId)
  .gte('scheduled_date', new Date().toISOString())
```

#### Inserciones

```typescript
// Crear una nueva cita
const { data, error } = await supabase
  .from('appointments')
  .insert([{
    family_id: familyUserId,
    professional_id: professionalId,
    scheduled_date: '2024-02-01T10:00:00',
    service_type: 'Consulta Médica',
    duration_minutes: 60
  }])
  .select()
```

#### Actualizaciones

```typescript
// Actualizar estado de cita
const { error } = await supabase
  .from('appointments')
  .update({ status: 'confirmed' })
  .eq('id', appointmentId)
```

### 3. Row Level Security (RLS)

Todas las tablas tienen políticas RLS que controlan el acceso:

```sql
-- Ejemplo: Los usuarios solo pueden ver sus propios perfiles
CREATE POLICY "Users can view own profile"
ON profiles FOR SELECT
USING (auth.uid() = id);

-- Ejemplo: Solo profesionales verificados pueden crear ofertas
CREATE POLICY "Verified professionals can create offers"
ON job_offers FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM professionals
    WHERE professionals.user_id = auth.uid()
    AND professionals.verified = true
  )
);
```

### 4. Realtime Subscriptions (Opcional)

```typescript
// Suscribirse a cambios en tiempo real
const subscription = supabase
  .channel('appointments')
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'appointments',
    filter: `family_id=eq.${userId}`
  }, (payload) => {
    console.log('Cambio detectado:', payload)
    // Actualizar UI
  })
  .subscribe()

// Limpiar suscripción
return () => subscription.unsubscribe()
```

### 5. Storage (Subida de Archivos)

```typescript
import { supabase } from '@/lib/supabase'

// Subir foto de perfil
const file = event.target.files[0]
const fileExt = file.name.split('.').pop()
const fileName = `${userId}-${Date.now()}.${fileExt}`

const { data, error } = await supabase.storage
  .from('profile_images')
  .upload(fileName, file)

// Obtener URL pública
const { data: { publicUrl } } = supabase.storage
  .from('profile_images')
  .getPublicUrl(fileName)

// Actualizar perfil con la URL
await supabase
  .from('profiles')
  .update({ photo_url: publicUrl })
  .eq('id', userId)
```

## 🚀 Despliegue en Vercel

### Configuración Automática

El proyecto está configurado para despliegue automático en Vercel:

1. **Archivo vercel.json**: Ya configurado con:
   - SPA routing (todas las rutas → index.html)
   - Cache headers para assets estáticos
   - Security headers

2. **Build Settings en Vercel**:
   ```
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

### Variables de Entorno en Vercel

**Paso a paso:**

1. Ve a tu proyecto en Vercel Dashboard
2. Settings → Environment Variables
3. Agrega estas variables:

```
Variable Name: VITE_SUPABASE_URL
Value: https://your-project.supabase.co
Environments: Production, Preview, Development

Variable Name: VITE_SUPABASE_ANON_KEY
Value: your-anon-key-here
Environments: Production, Preview, Development

Variable Name: VITE_SITE_URL
Value: https://www.hogarbelen.org
Environments: Production
```

4. Redeploy el proyecto (automático al agregar variables)

### Deploy Automático en cada Push

**Ya está configurado:**
- Cada push a `main` → Deploy a Production
- Cada PR → Deploy Preview automático
- Logs disponibles en Vercel Dashboard

**Para deployar manualmente:**

```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy a producción
vercel --prod

# Deploy preview
vercel
```

## 🔧 Variables de Entorno

### Desarrollo Local

1. Copia el archivo de ejemplo:
```bash
cp .env.example .env.local
```

2. Obtén las credenciales de Supabase:
   - Ve a https://supabase.com/dashboard
   - Selecciona tu proyecto "HOGARBELEN"
   - Settings → API
   - Copia:
     - Project URL → `VITE_SUPABASE_URL`
     - anon/public key → `VITE_SUPABASE_ANON_KEY`

3. Edita `.env.local`:
```env
VITE_SUPABASE_URL=https://cgfpwlqnhgclzzaiqhwz.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-real-aqui
VITE_SITE_URL=http://localhost:5173
```

4. Reinicia el servidor:
```bash
npm run dev
```

### Producción (Vercel)

Las variables ya deben estar configuradas en Vercel Dashboard (ver sección anterior).

**Validar variables:**
```bash
# En tu proyecto Vercel
vercel env ls
```

## 🧪 Testing y Validación

### 1. Verificar Conexión a Supabase

Visita la página de demo:
```
http://localhost:5173/supabase-demo
```

O usa el componente de prueba:
```typescript
import { SupabaseConnectionTest } from '@/components/SupabaseConnectionTest'

// En tu página
<SupabaseConnectionTest />
```

### 2. Probar Autenticación

```bash
# Registrar usuario de prueba
curl -X POST http://localhost:5173/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123456",
    "fullName": "Usuario Test",
    "role": "family"
  }'
```

### 3. Verificar Base de Datos

En Supabase Dashboard:
1. Table Editor → Selecciona una tabla
2. Verifica que los datos se insertan correctamente
3. Prueba las políticas RLS

### 4. Validar Deploy

```bash
# Después del deploy
curl -I https://www.hogarbelen.org
# Debe devolver 200 OK

# Verificar que las variables están cargadas
# Abre la consola del navegador en tu sitio:
console.log(import.meta.env.VITE_SUPABASE_URL)
```

## 📊 Esquema de Base de Datos

### Tablas Principales

1. **profiles** - Perfiles de usuarios
2. **professionals** - Datos adicionales de profesionales
3. **appointments** - Citas programadas
4. **subscriptions** - Planes activos
5. **leads** - Prospectos del sitio
6. **promo_codes** - Códigos de descuento
7. **reviews** - Reseñas de servicios

### Ejecutar Schema

```bash
# El schema completo está en:
supabase-enhanced-schema.sql

# Ejecutarlo en Supabase Dashboard:
# SQL Editor → New Query → Pegar contenido → Run
```

## 🔒 Seguridad

### Buenas Prácticas Implementadas

✅ **Row Level Security (RLS)** - Todas las tablas protegidas
✅ **Variables de entorno** - Secretos nunca en el código
✅ **HTTPS** - Forzado en producción (Vercel)
✅ **CORS** - Configurado automáticamente por Supabase
✅ **Auth tokens** - Auto-refresh y persistencia segura
✅ **Validación** - Frontend y backend (Supabase)

### Nunca Exponer

❌ `service_role` key - Solo para backend/admin
❌ Database password - Solo en Supabase
❌ API keys de terceros
❌ Tokens de usuario en localStorage sin encriptar

✅ `anon/public` key - Seguro para frontend (con RLS)

## 🚨 Troubleshooting

### Error: "Invalid API key"
**Solución:**
1. Verifica `VITE_SUPABASE_ANON_KEY` en `.env.local`
2. Asegúrate de usar la clave "anon public", no "service_role"
3. Reinicia el servidor de desarrollo

### Error: "Failed to fetch"
**Solución:**
1. Verifica que `VITE_SUPABASE_URL` sea correcta
2. Comprueba tu conexión a internet
3. Verifica que el proyecto Supabase esté activo

### Las variables no se aplican en Vercel
**Solución:**
1. Verifica que las variables estén en el ambiente correcto (Production/Preview)
2. Redeploy el proyecto después de agregar variables
3. Limpia la cache de Vercel

### Build falla en Vercel
**Solución:**
1. Verifica que todas las dependencias estén en `package.json`
2. Asegúrate de que `npm run build` funcione localmente
3. Revisa los logs de build en Vercel Dashboard

## 📚 Recursos

- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)

## 📞 Soporte

Para problemas específicos del proyecto:
1. Revisa la documentación existente en `/docs`
2. Consulta los archivos `SUPABASE-*.md`
3. Revisa los ejemplos en `src/components/examples/`

---

**Última actualización**: 2024-01-27
**Versión**: 1.0.0
**Mantenido por**: Hogar Belén - Centro Digital
