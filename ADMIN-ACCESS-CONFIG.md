# Configuración de Acceso Administrativo - Hogar Belén

## Credenciales del Administrador Principal

El sistema ha sido configurado con las siguientes credenciales de administrador:

### 🔐 Acceso Principal
- **Email**: josefabian1212@gmail.com
- **Contraseña**: @Sara2918+
- **Rol**: Super Administrador
- **2FA (Autenticación de Doble Factor)**: ✅ Habilitado

### 🔑 Código 2FA
Para la autenticación de doble factor, utilice el código:
**123012**

Nota: Este código es estático para propósitos de prueba. En un entorno de producción real, se debe configurar un código TOTP dinámico usando una aplicación como Google Authenticator.

## 📱 Cómo Acceder

1. **Navegar a la página de login administrativo**:
   - URL directa: `/admin-login` 
   - O agregue `#admin` en cualquier parte del sitio

2. **Ingresar credenciales**:
   - Email: josefabian1212@gmail.com
   - Contraseña: @Sara2918+

3. **Autenticación 2FA**:
   - Ingresar el código de 6 dígitos: `123012`
   - El sistema valida y otorga acceso completo

## 🛡️ Características de Seguridad

### Protección de Cuenta
- ✅ Bloqueo automático después de 3 intentos fallidos
- ✅ Período de bloqueo: 5 minutos
- ✅ Autenticación de doble factor obligatoria
- ✅ Sesiones con expiración (8 horas)
- ✅ Registro de auditoría de todos los accesos

### Monitoreo y Auditoría
Cada acción administrativa es registrada incluyendo:
- Inicio de sesión exitoso/fallido
- Dirección IP del usuario
- Marca de tiempo
- Acciones realizadas en el sistema
- User agent del navegador

## 🔧 Configuración Técnica

### Almacenamiento
El sistema utiliza Spark KV (Key-Value storage) para persistir:
- `admin-users`: Datos de usuarios administrativos
- `admin-passwords`: Contraseñas encriptadas
- `admin-session`: Sesión activa del administrador
- `login-attempts`: Registro de intentos de login
- `audit-logs`: Registros de auditoría

### Inicialización Automática
El componente `AdminSetupInitializer` verifica y configura automáticamente el usuario administrador al cargar la aplicación.

## 📊 Panel de Administración

Una vez autenticado, el administrador tiene acceso a:

1. **Dashboard Principal**
   - KPIs del sistema
   - Resumen de actividad
   - Alertas importantes

2. **Gestión de Profesionales**
   - Aprobar/rechazar registros
   - Verificación de documentos
   - Asignación de blue check

3. **Ofertas de Trabajo**
   - Crear y editar ofertas
   - Publicar/ocultar ofertas
   - Gestión de aplicantes

4. **Leads y Contactos**
   - Ver mensajes de contacto
   - Priorizar leads
   - Asignación de seguimiento

5. **Códigos Promocionales**
   - Crear códigos de descuento
   - Gestionar vigencia
   - Ver uso de códigos

6. **Contenido del Sitio**
   - Editor de páginas
   - Gestión de imágenes
   - SEO y metadata

7. **Inteligencia Artificial**
   - Configuración de asistente IA
   - Análisis automáticos
   - Recomendaciones del sistema

8. **Auditoría y Logs**
   - Historial completo de accesos
   - Exportar registros
   - Análisis de seguridad

9. **Configuración**
   - Gestión de administradores
   - Configuración 2FA
   - Parámetros del sistema

## 🔄 Flujo de Autenticación

```
Usuario ingresa email/contraseña
         ↓
Validación de credenciales
         ↓
   [Si es válido]
         ↓
Solicitud de código 2FA
         ↓
Usuario ingresa código 6 dígitos
         ↓
Validación de código TOTP
         ↓
   [Si es válido]
         ↓
Creación de sesión segura
         ↓
Acceso al panel de administración
```

## 🚨 Seguridad y Mejores Prácticas

### Para Entorno de Producción

1. **Cambiar contraseñas predeterminadas** inmediatamente
2. **Configurar TOTP real** con Google Authenticator o similar
3. **Habilitar HTTPS** en todo momento
4. **Revisar logs regularmente** para detectar actividad sospechosa
5. **Crear respaldos** de la base de datos periódicamente
6. **Limitar acceso por IP** si es posible
7. **Implementar rate limiting** adicional
8. **Usar contraseñas fuertes** y únicas
9. **Rotar credenciales** periódicamente
10. **Mantener el sistema actualizado**

## 📞 Soporte

Para problemas con el acceso administrativo:
- Revisar la consola del navegador para errores
- Verificar que la sesión no haya expirado
- Comprobar que no esté bloqueado por intentos fallidos
- Esperar 5 minutos si la cuenta está bloqueada

## 🔍 Debugging

Para verificar el estado del sistema administrativo, abra la consola del navegador y ejecute:

```javascript
// Verificar configuración del admin
const adminUsers = await window.spark.kv.get('admin-users');
console.log('Admin Users:', adminUsers);

// Ver sesión activa
const session = await window.spark.kv.get('admin-session');
console.log('Active Session:', session);

// Revisar intentos de login
const attempts = await window.spark.kv.get('login-attempts');
console.log('Login Attempts:', attempts);

// Ver logs de auditoría
const logs = await window.spark.kv.get('audit-logs');
console.log('Audit Logs:', logs);
```

## ✅ Estado de Implementación

- [x] Sistema de autenticación de admin
- [x] Autenticación de doble factor (2FA)
- [x] Protección contra fuerza bruta
- [x] Registro de auditoría
- [x] Gestión de sesiones
- [x] Panel de administración
- [x] Permisos basados en roles
- [x] Configuración automática
- [x] Interfaz de usuario completa
- [x] Documentación completa

---

**Última actualización**: ${new Date().toLocaleDateString('es-ES')}
**Versión del sistema**: 1.0.0
**Estado**: ✅ Configurado y Operacional
