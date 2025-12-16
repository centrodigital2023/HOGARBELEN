-- Función para incrementar el uso de códigos promocionales
create or replace function increment_promo_code_usage(promo_id uuid)
returns void
language plpgsql
security definer
as $$
begin
  update promo_codes
  set current_uses = current_uses + 1
  where id = promo_id;
end;
$$;

-- Función para limpiar códigos promocionales expirados
create or replace function cleanup_expired_promo_codes()
returns void
language plpgsql
security definer
as $$
begin
  update promo_codes
  set is_active = false
  where valid_until < now() and is_active = true;
end;
$$;

-- Función para verificar disponibilidad de citas
create or replace function check_appointment_availability(
  check_date date,
  check_time time,
  professional_id uuid default null
)
returns boolean
language plpgsql
as $$
declare
  appointment_count integer;
begin
  select count(*) into appointment_count
  from appointments
  where date = check_date
    and time = check_time
    and status not in ('cancelled', 'completed')
    and (professional_id is null or appointments.professional_id = check_appointment_availability.professional_id);
  
  return appointment_count = 0;
end;
$$;

-- Función para obtener suscripción activa de un usuario
create or replace function get_active_subscription(user_id uuid)
returns subscriptions
language plpgsql
as $$
declare
  active_sub subscriptions;
begin
  select * into active_sub
  from subscriptions
  where subscriptions.user_id = get_active_subscription.user_id
    and status = 'active'
    and (end_date is null or end_date > now())
  order by created_at desc
  limit 1;
  
  return active_sub;
end;
$$;

-- Función para actualizar estado de suscripciones expiradas
create or replace function update_expired_subscriptions()
returns void
language plpgsql
security definer
as $$
begin
  update subscriptions
  set status = 'expired'
  where end_date < now()
    and status = 'active';
end;
$$;

-- Crear índices para mejorar el rendimiento
create index if not exists idx_appointments_user_id on appointments(user_id);
create index if not exists idx_appointments_professional_id on appointments(professional_id);
create index if not exists idx_appointments_date on appointments(date);
create index if not exists idx_appointments_status on appointments(status);

create index if not exists idx_subscriptions_user_id on subscriptions(user_id);
create index if not exists idx_subscriptions_status on subscriptions(status);
create index if not exists idx_subscriptions_end_date on subscriptions(end_date);

create index if not exists idx_promo_codes_code on promo_codes(code);
create index if not exists idx_promo_codes_is_active on promo_codes(is_active);
create index if not exists idx_promo_codes_valid_until on promo_codes(valid_until);

create index if not exists idx_profiles_email on profiles(email);
create index if not exists idx_profiles_role on profiles(role);

-- Trigger para actualizar suscripciones expiradas automáticamente
create or replace function check_subscription_expiry()
returns trigger
language plpgsql
as $$
begin
  if new.end_date is not null and new.end_date < now() and new.status = 'active' then
    new.status = 'expired';
  end if;
  return new;
end;
$$;

create trigger trigger_check_subscription_expiry
  before update on subscriptions
  for each row
  execute function check_subscription_expiry();
