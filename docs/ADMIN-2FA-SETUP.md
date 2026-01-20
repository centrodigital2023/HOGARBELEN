# Configuración de 2FA para Administrador - Hogar Belén

## 📋 Descripción General

Este documento describe la configuración y uso del sistema de autenticación de doble factor (2FA) para el panel de administración de Hogar Belén.

## 🔐 Arquitectura del Sistema

El sistema utiliza:
- **Supabase Auth** para autenticación base (email + contraseña)
- **TOTP (Time-based One-Time Password)** para 2FA
- **User Metadata** para almacenar el rol `SUPER_ADMIN`
- **JWT tokens** para manejo de sesiones

## 🚀 Configuración Inicial

### 1. Habilitar MFA en Supabase Dashboard

1. Ir a **Authentication → Providers**
2. Habilitar **Email** como provider
3. Ir a **Authentication → Settings**
4. Habilitar **Multi-Factor Authentication (MFA)**
5. Configurar método: **TOTP (Time-based One-Time Password)**

### 2. Crear Usuario SUPER_ADMIN

Ejecutar el script SQL en Supabase Dashboard → SQL Editor:

```sql
-- Ver archivo: scripts/setup-admin-user.sql
```

Este script:
- Crea el usuario con email `josefabian1212@gmail.com`
- Asigna el rol `SUPER_ADMIN` en user_metadata
- Configura el perfil inicial

### 3. Configurar Variables de Entorno

Asegurar que las siguientes variables estén configuradas en `.env`:

```env
VITE_SUPABASE_URL=tu_supabase_url
VITE_SUPABASE_ANON_KEY=tu_anon_key
```

## 🔑 Flujo de Autenticación

### Paso 1: Login con Email/Password

```
Usuario → /admin/login
     ↓
Ingresa email: josefabian1212@gmail.com
Ingresa password: @Sara2918+
     ↓
Click "Iniciar Sesión"
     ↓
Sistema verifica credenciales con Supabase Auth
     ↓
Verifica rol SUPER_ADMIN en user_metadata
     ↓
Si correcto → Solicita código 2FA
```

### Paso 2: Verificación 2FA

```
Sistema → Redirige a /admin/2fa
     ↓
Usuario ingresa código de 6 dígitos
     ↓
Sistema verifica código TOTP
     ↓
Si correcto → Establece sesión y redirige a /admin/dashboard
```

### Código 2FA de Prueba

Para **desarrollo/testing**, el código **`123012`** es aceptado siempre.

**⚠️ IMPORTANTE:** En producción, deshabilitar este código de prueba y usar solo TOTP real.

## 📱 Aplicaciones de Autenticación Compatibles

Los usuarios pueden usar cualquiera de estas aplicaciones para generar códigos TOTP:

- **Google Authenticator** (iOS/Android)
- **Microsoft Authenticator** (iOS/Android)
- **Authy** (iOS/Android/Desktop)
- **1Password** (con soporte TOTP)
- **Bitwarden** (con soporte TOTP)

## 🔧 Configuración de TOTP para Usuarios

### Generar Secret TOTP

```typescript
import { generateTOTPSecret } from '@/lib/totp';

const secret = generateTOTPSecret();
// Guardar secret en la base de datos para el usuario
```

### Generar QR Code para Escanear

```typescript
import { generateQRCodeURL } from '@/lib/totp';

const qrUrl = generateQRCodeURL(secret, email, 'Hogar Belén Admin');
// Mostrar este QR al usuario para que lo escanee con su app
```

### Verificar Código TOTP

```typescript
import { verifyTOTPToken } from '@/lib/totp';

const isValid = await verifyTOTPToken(secret, userCode);
if (isValid) {
  // Código correcto, permitir acceso
}
```

## 🛡️ Seguridad

### Protección contra Fuerza Bruta

- Máximo **3 intentos** de login fallidos
- Bloqueo de **5 minutos** después de exceder intentos
- Rate limiting implementado en `useAdminAuth` hook

### Expiración de Sesiones

- Sesiones expiran después de **8 horas** de inactividad
- Auto-refresh de tokens manejado por Supabase
- Verificación de sesión en cada request a rutas protegidas

### Almacenamiento Seguro

- Contraseñas: **Hasheadas por Supabase Auth** (bcrypt)
- JWT Tokens: **Firmados y verificados por Supabase**
- Secrets TOTP: **Nunca expuestos al frontend**

## 🔍 Troubleshooting

### Error: "Credenciales inválidas"

**Causas posibles:**
- Email o contraseña incorrectos
- Usuario no existe en Supabase
- Usuario no tiene email confirmado

**Solución:**
1. Verificar credenciales en Supabase Dashboard → Authentication → Users
2. Confirmar que el email esté verificado
3. Revisar logs en Supabase Dashboard

### Error: "Código de verificación inválido"

**Causas posibles:**
- Código TOTP expirado (válido por 30 segundos)
- Reloj del dispositivo desincronizado
- Secret TOTP incorrecto

**Solución:**
1. Generar nuevo código en la app authenticator
2. Verificar sincronización de hora del dispositivo
3. Regenerar secret TOTP si es necesario

### Error: "No tiene permisos de administrador"

**Causa:**
- Usuario no tiene rol `SUPER_ADMIN` en user_metadata

**Solución:**
```sql
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data || '{"role": "SUPER_ADMIN"}'::jsonb
WHERE email = 'usuario@ejemplo.com';
```

## 📚 Referencias

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [TOTP RFC 6238](https://datatracker.ietf.org/doc/html/rfc6238)

## 💡 Mejores Prácticas

1. ✅ **Nunca** compartir credenciales de admin
2. ✅ **Siempre** usar TOTP en producción
3. ✅ **Rotar** secrets TOTP periódicamente
4. ✅ **Monitorear** logs de acceso
5. ✅ **Mantener** actualizado el software
