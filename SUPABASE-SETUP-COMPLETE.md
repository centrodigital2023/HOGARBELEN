# 🚀 Configuración Completa de Supabase para Hogar Belén

## 📊 Información del Proyecto

- **Nombre del Proyecto**: Hogarbelen144
- **Reference ID**: cgfpwlqnhgclzzaiqhwz
- **URL de Supabase**: https://cgfpwlqnhgclzzaiqhwz.supabase.co
- **Dashboard**: https://supabase.com/dashboard/project/cgfpwlqnhgclzzaiqhwz

## ✅ Estado Actual de Configuración

### Archivos Configurados
- ✅ `/src/lib/supabase.ts` - Cliente de Supabase configurado
- ✅ `/src/contextos/SupabaseAuthContext.tsx` - Context de autenticación
- ✅ `.env` - Variables de entorno creadas
- ✅ `.env.example` - Plantilla actualizada

### Configuración de Variables de Entorno

El archivo `.env` ya está creado con la URL correcta. Solo necesitas agregar tu clave anónima:

```env
VITE_SUPABASE_URL=https://cgfpwlqnhgclzzaiqhwz.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_anonima_aqui
```

## 🔑 Cómo Obtener la Clave Anónima

1. Ve a: https://supabase.com/dashboard/project/cgfpwlqnhgclzzaiqhwz/settings/api
2. Busca la sección "Project API keys"
3. Copia el valor de "anon public"
4. Pégalo en el archivo `.env` reemplazando `tu_clave_anonima_aqui`

## 🗄️ Tablas de Base de Datos Requeridas

### 1. Tabla: profiles

Esta tabla almacena la información de usuarios (familias y profesionales).

```sql
-- Crear tabla profiles
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null unique,
  full_name text not null,
  role text not null check (role in ('family', 'professional')),
  plan text,
  photo_url text,
  phone text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar Row Level Security (RLS)
alter table profiles enable row level security;

-- Políticas de seguridad
create policy "Los perfiles públicos son visibles para todos"
  on profiles for select
  using ( true );

create policy "Los usuarios pueden insertar su propio perfil"
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Los usuarios pueden actualizar su propio perfil"
  on profiles for update
  using ( auth.uid() = id );
```

### 2. Tabla: appointments

Gestiona las citas y reservas de servicios.

```sql
-- Crear tabla appointments
create table appointments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  professional_id uuid references profiles(id) on delete set null,
  service text not null,
  date date not null,
  time time not null,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar RLS
alter table appointments enable row level security;

-- Políticas
create policy "Los usuarios pueden ver sus propias citas"
  on appointments for select
  using ( auth.uid() = user_id or auth.uid() = professional_id );

create policy "Los usuarios pueden crear sus propias citas"
  on appointments for insert
  with check ( auth.uid() = user_id );

create policy "Los usuarios pueden actualizar sus propias citas"
  on appointments for update
  using ( auth.uid() = user_id or auth.uid() = professional_id );
```

### 3. Tabla: promo_codes

Administra códigos promocionales y descuentos.

```sql
-- Crear tabla promo_codes
create table promo_codes (
  id uuid default gen_random_uuid() primary key,
  code text not null unique,
  description text not null,
  discount_type text not null check (discount_type in ('percentage', 'fixed')),
  discount_value numeric not null,
  max_uses integer,
  current_uses integer default 0 not null,
  valid_from timestamp with time zone not null,
  valid_until timestamp with time zone not null,
  is_active boolean default true not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar RLS
alter table promo_codes enable row level security;

-- Políticas
create policy "Cualquiera puede ver códigos activos"
  on promo_codes for select
  using ( is_active = true );

-- Nota: Para crear/actualizar códigos, necesitarás agregar un campo 'role' en profiles
-- y crear políticas que solo permitan a usuarios con role='admin'
```

### 4. Tabla: subscriptions

Gestiona suscripciones y planes de usuarios.

```sql
-- Crear tabla subscriptions
create table subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  plan text not null,
  status text not null default 'pending' check (status in ('active', 'cancelled', 'expired', 'pending')),
  start_date date not null,
  end_date date,
  payment_method text,
  amount numeric not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar RLS
alter table subscriptions enable row level security;

-- Políticas
create policy "Los usuarios pueden ver sus propias suscripciones"
  on subscriptions for select
  using ( auth.uid() = user_id );

create policy "Los usuarios pueden crear sus propias suscripciones"
  on subscriptions for insert
  with check ( auth.uid() = user_id );

create policy "Los usuarios pueden actualizar sus propias suscripciones"
  on subscriptions for update
  using ( auth.uid() = user_id );
```

### 5. Triggers para updated_at

Estos triggers actualizan automáticamente el campo `updated_at`:

```sql
-- Crear función de trigger
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language 'plpgsql';

-- Aplicar trigger a todas las tablas
create trigger update_profiles_updated_at 
  before update on profiles
  for each row execute procedure update_updated_at_column();

create trigger update_appointments_updated_at 
  before update on appointments
  for each row execute procedure update_updated_at_column();

create trigger update_promo_codes_updated_at 
  before update on promo_codes
  for each row execute procedure update_updated_at_column();

create trigger update_subscriptions_updated_at 
  before update on subscriptions
  for each row execute procedure update_updated_at_column();
```

## 📝 Pasos de Implementación

### Paso 1: Obtener Credenciales
1. Inicia sesión en https://supabase.com
2. Selecciona el proyecto "Hogarbelen144"
3. Ve a Settings → API
4. Copia la clave "anon public"

### Paso 2: Configurar Variables de Entorno
1. Abre el archivo `.env` en la raíz del proyecto
2. Reemplaza `tu_clave_anonima_aqui` con la clave que copiaste
3. Guarda el archivo

### Paso 3: Crear Tablas en Supabase
1. Ve a: https://supabase.com/dashboard/project/cgfpwlqnhgclzzaiqhwz/editor
2. Haz clic en "SQL Editor"
3. Ejecuta cada script SQL en orden:
   - Primero: tabla `profiles`
   - Segundo: tabla `appointments`
   - Tercero: tabla `promo_codes`
   - Cuarto: tabla `subscriptions`
   - Quinto: función y triggers `update_updated_at_column`

### Paso 4: Configurar Autenticación
1. Ve a: https://supabase.com/dashboard/project/cgfpwlqnhgclzzaiqhwz/auth/providers
2. Asegúrate de que "Email" esté habilitado
3. Configura las URLs de redirección si es necesario

### Paso 5: Verificar la Conexión
1. Reinicia el servidor de desarrollo
2. Intenta registrar un nuevo usuario
3. Verifica en Supabase Dashboard → Authentication → Users que el usuario se creó
4. Verifica en Table Editor → profiles que el perfil se creó

## 🔐 Características de Seguridad Implementadas

- ✅ **Row Level Security (RLS)** habilitado en todas las tablas
- ✅ **Sesiones persistentes** usando `spark.kv` en lugar de localStorage
- ✅ **Auto-refresh de tokens** para mantener sesiones activas
- ✅ **Políticas de acceso** que protegen datos de usuarios
- ✅ **Validación de tipos** con TypeScript

## 🧪 Probar la Integración

### Registrar un Usuario
```typescript
// Esto ya está implementado en BelenConectaRegister.tsx
const { error } = await signUp(email, password, fullName, role);
```

### Iniciar Sesión
```typescript
// Esto ya está implementado en BelenConectaLogin.tsx
const { error } = await signIn(email, password);
```

### Verificar Usuario Autenticado
```typescript
// Esto ya está implementado en SupabaseAuthContext.tsx
const { user, userData, loading } = useAuth();
```

## 🆘 Solución de Problemas Comunes

### Error: "Invalid API key"
- Verifica que copiaste la clave correcta desde el dashboard
- Asegúrate de que no hay espacios al principio o final
- Reinicia el servidor de desarrollo

### Error: "relation 'profiles' does not exist"
- Ejecuta los scripts SQL para crear las tablas
- Verifica que estás en el proyecto correcto en Supabase

### Error: "new row violates row-level security policy"
- Revisa que las políticas RLS estén creadas correctamente
- Verifica que el usuario está autenticado antes de hacer operaciones

### Los usuarios no pueden registrarse
- Ve a Authentication → Settings en Supabase
- Asegúrate de que "Enable email confirmations" esté deshabilitado para desarrollo
- O configura un servicio SMTP para emails de confirmación

## 📚 Recursos Adicionales

- [Documentación de Supabase Auth](https://supabase.com/docs/guides/auth)
- [Guía de Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)

## 🎯 Próximos Pasos

Una vez completada la configuración:
1. Registrar usuarios de prueba
2. Crear citas de ejemplo
3. Probar códigos promocionales
4. Configurar suscripciones
5. Implementar notificaciones por email (opcional)

---

**Última actualización**: Configuración completada con URL de Supabase correcta
**Estado**: ✅ Listo para usar - Solo falta agregar la clave anónima al archivo .env
