# 🚀 Configuración Completa de Supabase para Hogar Belén

## 📊 Información del Proyecto

- **Nombre del Proyecto**: Hogarbelen144
- **Reference ID**: cgfpwlqnhgclzzaiqhwz
- **URL de Supabase**: https://cgfpwlqnhgclzzaiqhwz.supabase.co
- **Dashboard**: https://supabase.com/dashboard/project/cgfpwlqnhgclzzaiqhwz

- ✅ `/src/lib/supabase.ts` - Client




VITE_SUPABASE_URL=https://cgfpwlqnhgclzza
```

1. Ve a: https://supabase.com/dashboard/p





-- Crear tabla profiles
  i

  plan text,

  updated_at timestamp with time zone default timezone('utc'::text, now()) not nu

alter table profiles enable row le
-- Políticas de seguridad





```

Gestio
```sql
create table appointmen
  user_id uuid references profiles(id) on delete cascade not n
  service text not null,
  time time not null,
  notes text,
  updated_at

alter table a
-- Políticas
  on appointments for select



  on appointments for update

### 3. Tabla: promo_codes
Administra códigos promocionales y descuentos.
```sql
create table prom

  discount_type text not null check (discount_type in ('perce
  max_uses integer,
  valid_from timestamp with time 

  updated_at timestamp with time zone default timezone('utc'::t

alter table promo_codes enab
-- 






-- Crear tabla subscription
  id uuid default gen_rando
  plan text not null,
  user_id uuid references profiles(id) on delete cascade not null,
  professional_id uuid references profiles(id) on delete set null,
  service text not null,
  date date not null,
  time time not null,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
al

  on subscriptio
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


3. Verifica 


- ✅ **Sesiones persistentes** usa



```typescript


```typescript
const { error } = await signIn(em


const { user, userData, loading



- Rein
### Error: "relation 'profi
- Verifica que estás en el proyecto correcto en Supab
### Error: "new row v
- Ver
### Los usuarios no puede
- Asegúrate d





1. Registrar usuarios de pr
3. Probar códigos promocionales

---
**Última actualización**: Confi
















































































































