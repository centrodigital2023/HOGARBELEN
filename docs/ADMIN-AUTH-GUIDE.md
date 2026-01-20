# Guía de Autenticación de Administrador - Hogar Belén

## 📋 Descripción General

Sistema completo de autenticación para el panel administrativo de Hogar Belén utilizando Supabase Auth con verificación de doble factor (2FA).

## 🏗️ Arquitectura

### Componentes Principales

1. **Supabase Auth**: Gestión de usuarios y sesiones
2. **TOTP 2FA**: Verificación de doble factor
3. **User Metadata**: Almacenamiento de rol `SUPER_ADMIN`
4. **Protected Routes**: Protección de rutas administrativas
5. **Session Management**: Manejo automático de tokens JWT

### Flujo de Datos

```
Usuario → AdminLogin → Supabase Auth → Verificación 2FA → Dashboard
                ↓                              ↓
         useAdminAuth hook          verifyTOTPToken()
                ↓                              ↓
         ProtectedRoute            AdminAuthContext
```

## 🔐 Credenciales de Acceso

### Usuario Administrador

- **Email**: `josefabian1212@gmail.com`
- **Password**: `@Sara2918+`
- **Rol**: `SUPER_ADMIN`
- **2FA Test Code**: `123012`

**⚠️ Cambiar credenciales en producción**

## 🚀 Uso del Sistema

### 1. Iniciar Sesión

```typescript
import { useAdminAuth } from '@/hooks/useAdminAuth';

const { login, verifyMFA } = useAdminAuth();

// Paso 1: Login con credenciales
const result = await login(email, password);

if (result.success && result.requiresTOTP) {
  // Mostrar formulario 2FA
}

// Paso 2: Verificar código 2FA
const mfaResult = await verifyMFA(code);

if (mfaResult.success) {
  // Usuario autenticado, redirigir a dashboard
}
```

### 2. Verificar Autenticación

```typescript
import { useAdminAuth } from '@/hooks/useAdminAuth';

const { isAuthenticated, isSuperAdmin, user } = useAdminAuth();

if (isAuthenticated && isSuperAdmin) {
  // Usuario tiene acceso
}
```

### 3. Cerrar Sesión

```typescript
import { useAdminAuth } from '@/hooks/useAdminAuth';

const { logout } = useAdminAuth();

await logout();
// Usuario desconectado, sesión limpiada
```

### 4. Proteger Rutas

```tsx
import { ProtectedRoute } from '@/components/ProtectedRoute';

<Route path="/admin/dashboard" element={
  <ProtectedRoute requireSuperAdmin={true}>
    <AdminDashboard />
  </ProtectedRoute>
} />
```

## 🔧 Configuración

### Variables de Entorno

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

### Configurar Nuevo Administrador

1. **Crear usuario en Supabase Dashboard**:
   - Authentication → Users → Invite User
   - Ingresar email y password
   - Confirmar email automáticamente

2. **Asignar rol SUPER_ADMIN**:

```sql
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data || '{"role": "SUPER_ADMIN"}'::jsonb
WHERE email = 'nuevo-admin@ejemplo.com';
```

3. **Verificar configuración**:

```sql
SELECT 
  id, 
  email, 
  raw_user_meta_data->>'role' as role
FROM auth.users
WHERE email = 'nuevo-admin@ejemplo.com';
```

### Deshabilitar Administrador

```sql
-- Remover rol de admin
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data - 'role'
WHERE email = 'admin@ejemplo.com';

-- O suspender cuenta
UPDATE auth.users
SET banned_until = NOW() + INTERVAL '90 days'
WHERE email = 'admin@ejemplo.com';
```

## 🔒 Seguridad

### Rate Limiting

El sistema incluye protección contra ataques de fuerza bruta:

- **Máximo intentos**: 3
- **Período de bloqueo**: 5 minutos
- **Implementación**: `useAdminAuth` hook

```typescript
// Automático en useAdminAuth
if (isAccountLocked(email)) {
  return {
    success: false,
    error: 'Cuenta bloqueada temporalmente...'
  };
}
```

### Expiración de Sesiones

- **Duración**: 8 horas de inactividad
- **Auto-refresh**: Manejado por Supabase
- **Verificación**: En cada request a rutas protegidas

### Logs de Auditoría

```typescript
import { logAdminAction } from '@/middleware/authMiddleware';

// Registrar acción administrativa
await logAdminAction(
  'user_updated',
  'professionals',
  { professional_id: '123', changes: {...} }
);
```

## 🛠️ Desarrollo

### Testing Local

1. **Iniciar servidor de desarrollo**:

```bash
npm run dev
```

2. **Navegar a**: `http://localhost:5173/admin/login`

3. **Usar credenciales de prueba**:
   - Email: `josefabian1212@gmail.com`
   - Password: `@Sara2918+`
   - 2FA: `123012`

### Mock de Autenticación (Solo Testing)

Para testing sin backend:

```typescript
// En src/hooks/useAdminAuth.ts
const login = useCallback(async (email: string, password: string) => {
  // SOLO PARA TESTING
  if (import.meta.env.DEV && email === 'test@test.com') {
    setUser({ id: 'test', email } as User);
    setIsSuperAdmin(true);
    return { success: true, requiresTOTP: false };
  }
  
  // Lógica normal...
});
```

## 🔍 Debugging

### Ver Estado de Autenticación

```typescript
import { useAdminAuth } from '@/hooks/useAdminAuth';

const auth = useAdminAuth();

console.log('Auth State:', {
  isAuthenticated: auth.isAuthenticated,
  isSuperAdmin: auth.isSuperAdmin,
  user: auth.user,
  loading: auth.loading,
  error: auth.error
});
```

### Ver Sesión en Supabase

```typescript
import { supabase } from '@/lib/supabase';

const { data: { session } } = await supabase.auth.getSession();
console.log('Session:', session);
```

### Verificar Token JWT

```typescript
import { supabase } from '@/lib/supabase';

const { data: { user } } = await supabase.auth.getUser();
console.log('User Metadata:', user?.user_metadata);
console.log('Role:', user?.user_metadata?.role);
```

## 🐛 Troubleshooting

### Problema: "Cannot read properties of undefined"

**Causa**: Hook usado fuera de contexto

**Solución**: Asegurar que el componente esté dentro de un provider si es necesario

### Problema: Sesión se pierde al recargar

**Causa**: Configuración de persistencia incorrecta

**Solución**: Verificar en `src/lib/supabase.ts`:

```typescript
export const supabase = createClient(url, key, {
  auth: {
    persistSession: true,      // ✅ Debe ser true
    autoRefreshToken: true,    // ✅ Debe ser true
    detectSessionInUrl: true
  }
});
```

### Problema: 2FA siempre falla

**Causa**: Secret TOTP no configurado o incorrecto

**Solución**: 
1. Verificar que el código de prueba `123012` funcione
2. En producción, generar y configurar secret TOTP real

### Problema: Usuario no es reconocido como SUPER_ADMIN

**Causa**: Metadata no está configurado correctamente

**Solución**:

```sql
-- Verificar metadata
SELECT raw_user_meta_data FROM auth.users WHERE email = 'usuario@ejemplo.com';

-- Si está vacío o sin 'role', actualizar:
UPDATE auth.users
SET raw_user_meta_data = '{"role": "SUPER_ADMIN"}'::jsonb
WHERE email = 'usuario@ejemplo.com';
```

## 📊 Monitoreo

### Métricas Importantes

1. **Intentos de login fallidos**
2. **Usuarios bloqueados por rate limiting**
3. **Sesiones activas de admin**
4. **Tiempo promedio de sesión**

### Queries de Monitoreo

```sql
-- Sesiones activas de SUPER_ADMIN
SELECT 
  u.email,
  u.last_sign_in_at,
  u.raw_user_meta_data->>'role' as role
FROM auth.users u
WHERE u.raw_user_meta_data->>'role' = 'SUPER_ADMIN'
  AND u.last_sign_in_at > NOW() - INTERVAL '1 hour';

-- Total de admins
SELECT COUNT(*) 
FROM auth.users 
WHERE raw_user_meta_data->>'role' = 'SUPER_ADMIN';
```

## 🔄 Rotación de Credenciales

### Cambiar Password de Admin

1. **Desde Dashboard**:
   - Supabase Dashboard → Authentication → Users
   - Click en usuario → Reset Password
   - O actualizar directamente

2. **Programáticamente**:

```typescript
import { supabase } from '@/lib/supabase';

const { error } = await supabase.auth.updateUser({
  password: 'nueva-contraseña-segura'
});
```

### Política de Rotación

- **Password**: Cada 90 días
- **TOTP Secret**: Cada 180 días
- **JWT Keys**: Manejado por Supabase

## 📚 APIs Disponibles

### useAdminAuth Hook

```typescript
interface UseAdminAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  isSuperAdmin: boolean;
  totpVerified: boolean;
  loading: boolean;
  error: string | null;
  login: (email, password) => Promise<Result>;
  verifyMFA: (code) => Promise<Result>;
  logout: () => Promise<Result>;
  checkSuperAdmin: () => boolean;
  refreshAuth: () => Promise<void>;
}
```

### authMiddleware

```typescript
import authMiddleware from '@/middleware/authMiddleware';

// Verificar autenticación
const auth = await authMiddleware.checkAuthentication();

// Verificar SUPER_ADMIN
const admin = await authMiddleware.verifySuperAdmin();

// Proteger ruta
const protection = await authMiddleware.protectRoute(true);

// Refrescar sesión
await authMiddleware.refreshSession();

// Log de acción
await authMiddleware.logAdminAction('action', 'resource', details);
```

## ✅ Checklist de Seguridad

- [ ] Credenciales por defecto cambiadas en producción
- [ ] 2FA habilitado para todos los admins
- [ ] Rate limiting activo
- [ ] Logs de auditoría configurados
- [ ] Sesiones con timeout apropiado
- [ ] Variables de entorno en servidor seguro
- [ ] HTTPS habilitado en producción
- [ ] Backup de secrets TOTP
- [ ] Proceso de recuperación documentado
- [ ] Monitoreo de accesos configurado

## 🆘 Soporte

Para problemas con autenticación:

- **Técnico**: josefabian1212@gmail.com
- **General**: contacto@hogarbelen.com
- **Documentación**: Ver archivos en `/docs`

## 🔗 Referencias

- [useAdminAuth Hook](/src/hooks/useAdminAuth.ts)
- [ProtectedRoute Component](/src/components/ProtectedRoute.tsx)
- [Auth Middleware](/src/middleware/authMiddleware.ts)
- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
