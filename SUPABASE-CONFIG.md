# Configuración de Supabase para Hogar Belén

> 🚀 **¿Primera vez configurando?** Ve a [SUPABASE-GUIA-RAPIDA.md](./SUPABASE-GUIA-RAPIDA.md) para una guía paso a paso simplificada.
> 
> 📚 **¿Buscas ejemplos de código?** Ve a [EJEMPLOS-USO-SUPABASE.md](./EJEMPLOS-USO-SUPABASE.md) para ejemplos prácticos.

## 📋 Variables de Entorno Requeridas

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
```

## 🗄️ Esquema de Base de Datos

### Tabla: profiles

Almacena la información de perfil de usuarios (familias y profesionales).

```sql
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

-- Enable RLS
alter table profiles enable row level security;

-- Policies
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );
```

### Tabla: appointments

Gestiona las citas y reservas de servicios.

```sql
create table appointments (
  id uuid default uuid_generate_v4() primary key,
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

-- Enable RLS
alter table appointments enable row level security;

-- Policies
create policy "Users can view their own appointments."
  on appointments for select
  using ( auth.uid() = user_id or auth.uid() = professional_id );

create policy "Users can create their own appointments."
  on appointments for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own appointments."
  on appointments for update
  using ( auth.uid() = user_id or auth.uid() = professional_id );

create policy "Professionals can view their assigned appointments."
  on appointments for select
  using ( auth.uid() = professional_id );
```

### Tabla: promo_codes

Administra códigos promocionales y descuentos.

```sql
create table promo_codes (
  id uuid default uuid_generate_v4() primary key,
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

-- Enable RLS
alter table promo_codes enable row level security;

-- Policies
create policy "Anyone can view active promo codes."
  on promo_codes for select
  using ( is_active = true );

create policy "Only admins can insert promo codes."
  on promo_codes for insert
  with check ( 
    exists (
      select 1 from profiles 
      where id = auth.uid() 
      and role = 'admin'
    )
  );

create policy "Only admins can update promo codes."
  on promo_codes for update
  using ( 
    exists (
      select 1 from profiles 
      where id = auth.uid() 
      and role = 'admin'
    )
  );
```

### Tabla: subscriptions

Gestiona suscripciones y planes de usuarios.

```sql
create table subscriptions (
  id uuid default uuid_generate_v4() primary key,
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

-- Enable RLS
alter table subscriptions enable row level security;

-- Policies
create policy "Users can view their own subscriptions."
  on subscriptions for select
  using ( auth.uid() = user_id );

create policy "Users can create their own subscriptions."
  on subscriptions for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own subscriptions."
  on subscriptions for update
  using ( auth.uid() = user_id );
```

## 🔧 Triggers para updated_at

Para actualizar automáticamente el campo `updated_at`:

```sql
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language 'plpgsql';

create trigger update_profiles_updated_at before update on profiles
  for each row execute procedure update_updated_at_column();

create trigger update_appointments_updated_at before update on appointments
  for each row execute procedure update_updated_at_column();

create trigger update_promo_codes_updated_at before update on promo_codes
  for each row execute procedure update_updated_at_column();

create trigger update_subscriptions_updated_at before update on subscriptions
  for each row execute procedure update_updated_at_column();
```

## 🔐 Autenticación

El sistema utiliza Supabase Auth con:
- **Email y contraseña** para autenticación
- **Persistencia de sesión** usando spark.kv
- **Row Level Security (RLS)** para proteger datos
- **PKCE flow** para mayor seguridad

## 🚀 Pasos de Implementación

1. **Crear proyecto en Supabase**
   - Ve a https://supabase.com
   - Crea un nuevo proyecto
   - Copia la URL y la clave anónima

2. **Configurar variables de entorno**
   - Crea el archivo `.env` con las credenciales

3. **Ejecutar scripts SQL**
   - Abre el SQL Editor en Supabase
   - Ejecuta cada script de tabla en orden
   - Ejecuta los triggers

4. **Configurar autenticación**
   - En Supabase Dashboard → Authentication → Settings
   - Habilita Email provider
   - Configura redirect URLs si es necesario

5. **Probar la conexión**
   - La aplicación debería conectarse automáticamente
   - Los usuarios podrán registrarse e iniciar sesión

## 📝 Notas Importantes

- **RLS está habilitado**: Cada tabla tiene políticas de seguridad
- **Las sesiones persisten**: Usando spark.kv en lugar de localStorage
- **TypeScript incluido**: Tipos definidos para todas las tablas
- **Migraciones futuras**: Usa Supabase CLI para gestionar cambios

## 🔄 Migración desde useKV

La aplicación migrará automáticamente de useKV simulado a Supabase real:
- Las funciones `signIn`, `signUp` y `signOut` ahora usan Supabase
- Los datos de usuario se almacenan en la base de datos
- La sesión se mantiene entre recargas

## 🆘 Solución de Problemas

**Error: Cannot find VITE_SUPABASE_URL**
- Verifica que el archivo `.env` existe en la raíz
- Reinicia el servidor de desarrollo

**Error: Database connection failed**
- Verifica las credenciales en `.env`
- Verifica que el proyecto de Supabase está activo

**Error: RLS policy violation**
- Verifica que las políticas de RLS están creadas
- Verifica que el usuario está autenticado correctamente
