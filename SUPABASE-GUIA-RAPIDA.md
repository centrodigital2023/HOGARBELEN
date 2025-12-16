# 🚀 Guía Rápida de Configuración de Supabase

## Paso 1: Crear Proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Haz clic en "Start your project"
3. Inicia sesión con GitHub
4. Crea un nuevo proyecto:
   - **Nombre**: hogar-belen (o el que prefieras)
   - **Contraseña de BD**: Guarda esta contraseña (la necesitarás)
   - **Región**: Selecciona la más cercana (preferiblemente South America)

## Paso 2: Obtener Credenciales

1. En tu proyecto de Supabase, ve a **Settings** → **API**
2. Copia estos valores:
   - **Project URL** (URL del proyecto)
   - **anon public** (Clave pública anónima)

3. Crea el archivo `.env` en la raíz del proyecto:

```bash
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_publica_anonima_aqui
```

## Paso 3: Crear Tablas

1. En Supabase, ve a **SQL Editor**
2. Ejecuta estos scripts **en orden**:

### 3.1 Tabla profiles

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

alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select using ( true );

create policy "Users can insert their own profile."
  on profiles for insert with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update using ( auth.uid() = id );
```

### 3.2 Tabla appointments

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

alter table appointments enable row level security;

create policy "Users can view their own appointments."
  on appointments for select
  using ( auth.uid() = user_id or auth.uid() = professional_id );

create policy "Users can create their own appointments."
  on appointments for insert with check ( auth.uid() = user_id );

create policy "Users can update their own appointments."
  on appointments for update using ( auth.uid() = user_id or auth.uid() = professional_id );
```

### 3.3 Tabla promo_codes

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

alter table promo_codes enable row level security;

create policy "Anyone can view active promo codes."
  on promo_codes for select using ( is_active = true );
```

### 3.4 Tabla subscriptions

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

alter table subscriptions enable row level security;

create policy "Users can view their own subscriptions."
  on subscriptions for select using ( auth.uid() = user_id );

create policy "Users can create their own subscriptions."
  on subscriptions for insert with check ( auth.uid() = user_id );

create policy "Users can update their own subscriptions."
  on subscriptions for update using ( auth.uid() = user_id );
```

### 3.5 Triggers para updated_at

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

### 3.6 (Opcional) Funciones auxiliares

Copia y ejecuta el contenido del archivo `supabase-functions.sql` para agregar funciones adicionales.

## Paso 4: Configurar Autenticación

1. Ve a **Authentication** → **Providers**
2. Asegúrate de que **Email** esté habilitado
3. En **Authentication** → **Settings**:
   - **Enable email confirmations**: Puedes desactivarlo para desarrollo
   - **Minimum password length**: 6 (o más si prefieres)

## Paso 5: Probar la Aplicación

1. Reinicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. La aplicación ahora usará Supabase real
3. Prueba registrar un usuario nuevo
4. Verifica que el usuario aparece en **Authentication** → **Users**

## ✅ Verificación

Para verificar que todo está funcionando:

1. **Base de datos**: Ve a **Table Editor** y verifica que las 4 tablas existen
2. **RLS**: En cada tabla, verifica que "RLS enabled" está activo
3. **Auth**: Ve a **Authentication** y verifica que puedes ver la configuración
4. **Políticas**: En **Table Editor** → selecciona una tabla → pestaña **Policies**

## 🆘 Problemas Comunes

### "Cannot read properties of undefined"
- Verifica que el archivo `.env` existe y tiene las variables correctas
- Reinicia el servidor después de crear el `.env`

### "Failed to fetch"
- Verifica que la URL de Supabase es correcta
- Verifica que tu proyecto de Supabase está activo

### "Row Level Security policy violation"
- Verifica que las políticas RLS están creadas
- Verifica que el usuario está autenticado

### "Table does not exist"
- Verifica que ejecutaste todos los scripts SQL
- Verifica en el Table Editor que las tablas existen

## 📚 Recursos Adicionales

- [Documentación de Supabase](https://supabase.com/docs)
- [Guía de RLS](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase CLI](https://supabase.com/docs/guides/cli)

## 🔐 Seguridad

- ⚠️ **NUNCA** subas el archivo `.env` a Git
- ⚠️ El archivo `.env` ya está en `.gitignore`
- ✅ Usa `.env.example` para documentar variables necesarias
- ✅ Las claves públicas (anon key) son seguras para el frontend
- ✅ Nunca uses la clave `service_role` en el frontend
