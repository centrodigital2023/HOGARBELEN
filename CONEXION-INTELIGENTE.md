# Guía de Conexión Inteligente: Supabase + Vercel

## 🎯 Resumen Ejecutivo

Esta aplicación ahora cuenta con una arquitectura inteligente que conecta:
- ✅ **Supabase** para autenticación y base de datos
- ✅ **Vercel** para deployment optimizado
- ✅ **Componentes modulares** para escalabilidad

## 📦 Componentes Implementados

### 1. Cliente Supabase (`src/lib/supabase.ts`)
- Cliente configurado con tipos TypeScript completos
- Definiciones de tablas: profiles, professionals, appointments, leads, subscriptions, promo_codes
- Type-safe database operations

### 2. Helpers y Utilidades (`src/lib/supabase-helpers.ts`)
- Interfaces reutilizables (Lead, ProfessionalProfile, JobOffer, AdminAction)
- Constantes de la aplicación (categorías profesionales, ciudades colombianas)
- Validaciones y transformaciones de datos

### 3. Context de Autenticación Mejorado
El contexto existente ahora puede integrar fácilmente Supabase Auth

### 4. Hooks Personalizados
- `useSupabaseQuery` - Para queries reactivas
- `useSupabaseMutation` - Para operaciones de escritura
- `useSupabaseAuth` - Para gestión de autenticación

## 🚀 Configuración Paso a Paso

### Paso 1: Configurar Supabase

1. **Crear proyecto en Supabase** (https://supabase.com)
   - Nombre del proyecto: `hogar-belen`
   - Región: South America (closest to Colombia)

2. **Ejecutar el schema SQL**
   ```sql
   -- Ver archivo: supabase-schema-complete.sql
   ```

3. **Obtener credenciales**
   - Project URL: `https://xxxxx.supabase.co`
   - Anon Key: `eyJhbGc...`

### Paso 2: Configurar Variables de Entorno

#### Desarrollo Local
Crear archivo `.env` en la raíz:
```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_anon_key_aqui
```

#### Producción en Vercel
1. Ir a tu proyecto en Vercel Dashboard
2. Settings → Environment Variables
3. Agregar:
   - `VITE_SUPABASE_URL` = tu URL de Supabase
   - `VITE_SUPABASE_ANON_KEY` = tu clave anónima

### Paso 3: Deploy a Vercel

#### Opción A: CLI (Recomendado)
```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Para producción
vercel --prod
```

#### Opción B: GitHub Integration
1. Push código a GitHub
2. Importar proyecto en Vercel
3. Configurar variables de entorno
4. Deploy automático

## 🧩 Uso de Componentes Inteligentes

### Ejemplo 1: Query de Datos
```typescript
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery'
import { supabase } from '@/lib/supabase'

function ProfessionalsList() {
  const { data, loading, error } = useSupabaseQuery(
    'professionals',
    () => supabase
      .from('professionals')
      .select('*, profiles(*)')
      .eq('verified', true)
  )

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage error={error} />

  return (
    <div>
      {data?.map(prof => (
        <ProfessionalCard key={prof.id} professional={prof} />
      ))}
    </div>
  )
}
```

### Ejemplo 2: Crear Lead
```typescript
import { useSupabaseMutation } from '@/hooks/useSupabaseMutation'
import { supabase } from '@/lib/supabase'

function ContactForm() {
  const createLead = useSupabaseMutation(
    async (data: Lead) => {
      const { error } = await supabase
        .from('leads')
        .insert([data])
      
      if (error) throw error
    }
  )

  const handleSubmit = async (formData: Lead) => {
    await createLead.mutate(formData)
    toast.success('¡Mensaje enviado!')
  }

  return <form onSubmit={handleSubmit}>...</form>
}
```

### Ejemplo 3: Autenticación
```typescript
import { supabase } from '@/lib/supabase'

// Sign Up
const { data, error } = await supabase.auth.signUp({
  email: 'usuario@ejemplo.com',
  password: 'contraseña-segura',
  options: {
    data: {
      full_name: 'Nombre Completo',
      role: 'family'
    }
  }
})

// Sign In
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'usuario@ejemplo.com',
  password: 'contraseña-segura'
})

// Sign Out
await supabase.auth.signOut()

// Get Current User
const { data: { user } } = await supabase.auth.getUser()
```

## 🎨 Componentes UI Disponibles

Todos los componentes shadcn están pre-instalados en `src/components/ui/`:

- ✅ Forms (Input, Label, Select, Textarea, Checkbox, Radio)
- ✅ Feedback (Alert, Toast, Dialog, Sheet)
- ✅ Navigation (Tabs, Breadcrumb, Pagination)
- ✅ Data Display (Card, Table, Badge, Avatar)
- ✅ Layout (Sidebar, Separator, Scroll Area)
- ✅ Overlays (Popover, Dropdown, Context Menu, Hover Card)

## 📊 Schema de Base de Datos

### Tablas Principales

**profiles**
- Información básica de usuarios (familias y profesionales)
- Conectado a Supabase Auth

**professionals**
- Datos específicos de profesionales
- Disponibilidad, tarifas, certificaciones

**appointments**
- Citas entre familias y profesionales
- Estados: pending, confirmed, completed, cancelled

**leads**
- Prospectos del sitio web
- Pipeline de ventas

**subscriptions**
- Planes activos de usuarios
- Gestión de pagos

**promo_codes**
- Códigos de descuento
- Límites de uso y validez

## 🔒 Seguridad Implementada

1. **Row Level Security (RLS)** habilitado en todas las tablas
2. **Políticas de acceso** por rol de usuario
3. **Validación en el cliente** con zod
4. **Headers de seguridad** en vercel.json
5. **Variables de entorno** para secretos

## 🌐 Vercel Configuration

El archivo `vercel.json` incluye:
- ✅ SPA routing (rewrites)
- ✅ Cache optimizado para assets
- ✅ Security headers (XSS, CSRF, etc.)
- ✅ Redirects (www, domain variants)

## 📱 Responsive & Mobile-First

Todos los componentes son:
- ✅ Mobile-first design
- ✅ Touch-friendly (44px+ touch targets)
- ✅ Responsive breakpoints
- ✅ Progressive enhancement

## 🧪 Testing & Quality

```bash
# Type checking
npm run type-check

# Lint
npm run lint

# Build test
npm run build

# Preview production build
npm run preview
```

## 🚦 Checklist de Deployment

- [ ] Crear proyecto en Supabase
- [ ] Ejecutar schema SQL
- [ ] Configurar variables de entorno locales (.env)
- [ ] Testear autenticación localmente
- [ ] Crear cuenta en Vercel
- [ ] Conectar repositorio Git
- [ ] Configurar variables de entorno en Vercel
- [ ] Deploy a staging
- [ ] Probar todas las funcionalidades
- [ ] Deploy a producción
- [ ] Configurar dominio personalizado (hogarbelen.org)
- [ ] Configurar DNS
- [ ] Habilitar SSL/HTTPS

## 🎯 Próximos Pasos

1. **Migrar datos existentes** del KV storage a Supabase
2. **Implementar realtime subscriptions** para actualizaciones en vivo
3. **Agregar storage** para imágenes de perfil y documentos
4. **Configurar emails** con Supabase Auth
5. **Implementar analytics** con Vercel Analytics

## 📞 Soporte

- Supabase Docs: https://supabase.com/docs
- Vercel Docs: https://vercel.com/docs
- Shadcn UI: https://ui.shadcn.com

## 🎉 ¡Listo para Producción!

Tu aplicación ahora tiene:
- ✅ Base de datos escalable
- ✅ Autenticación segura
- ✅ Deployment automatizado
- ✅ Componentes reutilizables
- ✅ TypeScript type-safe
- ✅ Performance optimizado
