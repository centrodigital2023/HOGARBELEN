-- ================================================================
-- SCRIPT: Configuración de Usuario SUPER_ADMIN
-- ================================================================
-- Script para crear y configurar el usuario administrador en Supabase
-- Se ejecuta desde Supabase Dashboard → SQL Editor
-- ================================================================

-- ================================================================
-- PASO 1: Crear usuario administrativo
-- ================================================================
-- NOTA: En Supabase Dashboard, ir a Authentication → Users → Invite User
-- Email: josefabian1212@gmail.com
-- Password: @Sara2918+
-- Confirmar email automáticamente

-- ================================================================
-- PASO 2: Actualizar metadata para agregar rol SUPER_ADMIN
-- ================================================================
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data || '{"role": "SUPER_ADMIN"}'::jsonb
WHERE email = 'josefabian1212@gmail.com';

-- ================================================================
-- PASO 3: Verificar configuración
-- ================================================================
SELECT 
  id, 
  email, 
  raw_user_meta_data->>'role' as role,
  created_at,
  email_confirmed_at
FROM auth.users
WHERE email = 'josefabian1212@gmail.com';

-- ================================================================
-- PASO 4: Crear perfil en tabla profiles (si es necesario)
-- ================================================================
-- NOTA: Esto debería crearse automáticamente con un trigger,
-- pero si no existe, crear manualmente:

INSERT INTO profiles (id, email, full_name, role)
SELECT 
  id,
  email,
  'José Fabián - Super Admin',
  'professional' -- Usar 'professional' como role en profiles
FROM auth.users
WHERE email = 'josefabian1212@gmail.com'
ON CONFLICT (id) DO NOTHING;

-- ================================================================
-- NOTAS IMPORTANTES
-- ================================================================
-- 1. El rol 'SUPER_ADMIN' se almacena en auth.users.raw_user_meta_data
-- 2. Este rol es diferente del campo 'role' en la tabla profiles
-- 3. La función is_super_admin() verifica el rol en user_metadata
-- 4. El código 2FA de prueba es: 123012 (solo para desarrollo)
-- 5. En producción, se debe usar TOTP real con aplicación authenticator
-- ================================================================
