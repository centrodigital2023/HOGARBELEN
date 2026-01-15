# 🚀 Guía Rápida de Despliegue - Supabase + Vercel

## ⚡ Quick Start (5 minutos)

### 1. Configurar Supabase

```bash
# 1. Ve a https://supabase.com y crea una cuenta
# 2. Crea un nuevo proyecto llamado "hogar-belen"
# 3. Espera a que se aprovisione (2-3 minutos)
```

### 2. Ejecutar Schema SQL

En Supabase Dashboard → SQL Editor → New Query, ejecuta este schema mínimo:

```sql
-- Tabla de perfiles
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('family', 'professional')),
  plan TEXT,
  photo_url TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Políticas básicas
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- Función para crear perfil automáticamente
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'role');
  RETURN new;
END;
$$;

-- Trigger para nuevos usuarios
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Tabla de leads
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  source TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Leads are viewable by authenticated users"
  ON leads FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Anyone can insert leads"
  ON leads FOR INSERT WITH CHECK (true);
```

### 3. Configurar Variables de Entorno Locales

```bash
# Crear archivo .env en la raíz del proyecto
cp .env.example .env

# Editar .env con tus credenciales de Supabase
# (Las encuentras en Supabase → Project Settings → API)
```

Contenido del `.env`:
```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_anonima_aqui
```

### 4. Probar Localmente

```bash
# Instalar dependencias (si es necesario)
npm install

# Ejecutar en desarrollo
npm run dev

# La app debería estar en http://localhost:5173
```

### 5. Deploy a Vercel

#### Opción A: Vercel CLI (Recomendado)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login a Vercel
vercel login

# Deploy a preview
vercel

# Deploy a producción
vercel --prod
```

#### Opción B: GitHub + Vercel Dashboard

```bash
# 1. Commitear y pushear a GitHub
git add .
git commit -m "Configuración Supabase completa"
git push origin main

# 2. Ir a https://vercel.com/new
# 3. Importar tu repositorio de GitHub
# 4. Configurar variables de entorno (ver abajo)
# 5. Click en "Deploy"
```

### 6. Configurar Variables en Vercel

En Vercel Dashboard → Tu Proyecto → Settings → Environment Variables:

```
VITE_SUPABASE_URL = https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY = tu_clave_anonima
```

**Importante:** Agregar estas variables para todos los entornos (Production, Preview, Development)

### 7. Configurar Dominio Personalizado

1. En Vercel Dashboard → Tu Proyecto → Settings → Domains
2. Agregar `hogarbelen.org` y `www.hogarbelen.org`
3. Configurar DNS en tu proveedor:

```
# Registro A para @ (root domain)
Type: A
Name: @
Value: 76.76.21.21

# Registro CNAME para www
Type: CNAME  
Name: www
Value: cname.vercel-dns.com.
```

## 🔍 Verificación de Funcionamiento

### Test de Autenticación
```typescript
// En consola del navegador
const { data, error } = await window.supabase.auth.signUp({
  email: 'test@ejemplo.com',
  password: 'test123456',
  options: {
    data: {
      full_name: 'Usuario de Prueba',
      role: 'family'
    }
  }
})
console.log(data, error)
```

### Test de Leads
```typescript
// En consola del navegador
const { data, error } = await window.supabase
  .from('leads')
  .insert([{
    name: 'Lead de Prueba',
    email: 'lead@ejemplo.com',
    phone: '+57 321 123 4567',
    message: 'Mensaje de prueba',
    source: 'web'
  }])
console.log(data, error)
```

## 📊 Componentes Ejemplo Disponibles

Dos componentes completamente funcionales para referencia:

### 1. Autenticación
```typescript
import { SupabaseAuthExample } from '@/components/examples/SupabaseAuthExample'

// Usar en cualquier página
<SupabaseAuthExample />
```

### 2. Gestión de Leads
```typescript
import { LeadsManagerExample } from '@/components/examples/LeadsManagerExample'

// Usar en cualquier página
<LeadsManagerExample />
```

## 🎯 Hooks Personalizados

### useSupabaseAuth
```typescript
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth'

const { user, session, loading, signIn, signUp, signOut } = useSupabaseAuth()
```

### useSupabaseQuery
```typescript
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery'

const { data, loading, error, refetch } = useSupabaseQuery(
  'key',
  async () => await supabase.from('table').select('*')
)
```

### useSupabaseMutation
```typescript
import { useSupabaseMutation } from '@/hooks/useSupabaseMutation'

const mutation = useSupabaseMutation(
  async (data) => await supabase.from('table').insert([data])
)

await mutation.mutate({ name: 'Example' })
```

## 🔧 Troubleshooting

### Error: "Invalid API key"
- Verifica que las variables de entorno estén correctamente configuradas
- Asegúrate de usar `VITE_` prefix en el nombre
- Reinicia el servidor de desarrollo después de cambiar `.env`

### Error: "Failed to fetch"
- Verifica la URL de Supabase (debe incluir `https://`)
- Revisa que el proyecto de Supabase esté activo
- Chequea la consola del navegador para detalles

### Error: "Row Level Security"
- Asegúrate de haber habilitado RLS en las tablas
- Verifica que las políticas de acceso estén configuradas
- Para testing, puedes temporalmente deshabilitar RLS

### Deploy falla en Vercel
- Verifica que todas las variables de entorno estén configuradas
- Revisa los logs de build en Vercel
- Asegúrate de que `package.json` tenga los scripts correctos

## 🎉 ¡Listo!

Tu aplicación ahora está:
- ✅ Conectada a Supabase para auth y database
- ✅ Desplegada en Vercel con CI/CD automático
- ✅ Con componentes de ejemplo funcionales
- ✅ Type-safe con TypeScript
- ✅ Lista para escalar

## 📚 Recursos Adicionales

- **Documentación Completa**: Ver `CONEXION-INTELIGENTE.md`
- **Schema SQL Completo**: Ver `supabase-schema-complete.sql`
- **Ejemplos de Código**: Ver `src/components/examples/`
- **Supabase Docs**: https://supabase.com/docs
- **Vercel Docs**: https://vercel.com/docs

## 🆘 Soporte

Si encuentras problemas:
1. Revisa los logs en Vercel Dashboard
2. Chequea la consola del navegador
3. Verifica Supabase Dashboard → Logs
4. Consulta `CONEXION-INTELIGENTE.md` para más detalles
