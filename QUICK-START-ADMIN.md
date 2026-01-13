# 🚀 Guía de Inicio Rápido - Acceso Administrativo

## Credenciales de Acceso

### 👤 Administrador Principal

```
Email:     josefabian1212@gmail.com
Contraseña: @Sara2918+
Código 2FA: 123012
```

## 📋 Pasos para Acceder

### Opción 1: Acceso Directo
1. Haga clic en cualquier parte de la aplicación
2. El sistema cargará la página de inicio
3. En la barra de direcciones, navegue a la ruta `/admin-login` o haga clic en el enlace de administración
4. Ingrese las credenciales listadas arriba
5. Cuando se solicite el código 2FA, ingrese: `123012`

### Opción 2: Desde la Consola del Navegador
```javascript
// Abrir la consola del navegador (F12 o Cmd+Option+I)
// Y ejecutar:
window.location.hash = '#admin-login';
```

## ✅ Verificación de Configuración

Para verificar que el sistema está configurado correctamente, abra la consola del navegador y ejecute:

```javascript
// Verificar usuario administrador
const adminUsers = await window.spark.kv.get('admin-users');
console.log('✅ Admin configurado:', adminUsers);

// Verificar contraseña
const passwords = await window.spark.kv.get('admin-passwords');
console.log('✅ Contraseña configurada:', Object.keys(passwords));
```

## 🔐 Características de Seguridad

- ✅ **Autenticación de doble factor (2FA)**: Obligatoria
- ✅ **Protección contra fuerza bruta**: 3 intentos máximos
- ✅ **Bloqueo temporal**: 5 minutos después de intentos fallidos
- ✅ **Sesiones seguras**: Expiración automática en 8 horas
- ✅ **Registro de auditoría**: Todos los accesos son registrados

## 📊 Funcionalidades del Panel Admin

Una vez autenticado, tendrá acceso a:

1. **Dashboard**: Vista general del sistema
2. **Profesionales**: Gestión de registros y aprobaciones
3. **Ofertas de Trabajo**: Crear y administrar vacantes
4. **Leads**: Gestión de contactos y seguimiento
5. **Códigos Promocionales**: Sistema de descuentos
6. **Contenido**: Edición de páginas y SEO
7. **IA**: Configuración de asistente inteligente
8. **Auditoría**: Logs y registros de seguridad
9. **Configuración**: Parámetros del sistema

## 🛠️ Solución de Problemas

### No puedo iniciar sesión
- Verifique que está usando el email correcto (sin espacios)
- Asegúrese de que la contraseña es exactamente: `@Sara2918+`
- Si está bloqueado, espere 5 minutos

### El código 2FA no funciona
- Ingrese exactamente: `123012`
- No añada espacios ni guiones
- Los 6 dígitos deben ingresarse en orden

### La sesión expiró
- Las sesiones duran 8 horas
- Simplemente vuelva a iniciar sesión

### Cómo cerrar sesión
- En el panel de administración, busque el botón "Cerrar Sesión"
- O ejecute en la consola: `await window.spark.kv.delete('admin-session')`

## 📱 Aplicaciones 2FA Compatibles

Aunque en este momento usa un código estático, el sistema soporta:
- Google Authenticator
- Microsoft Authenticator
- Authy
- 1Password
- LastPass Authenticator

## 🔄 Actualización del Sistema

El sistema se inicializa automáticamente cuando carga la aplicación. Si necesita reinicializar:

```javascript
// En la consola del navegador
import { setupAdminUser } from '@/lib/admin-setup';
await setupAdminUser();
```

## 📞 Contacto y Soporte

Para asistencia adicional:
- Revise el archivo `ADMIN-ACCESS-CONFIG.md` para documentación completa
- Consulte los logs en la consola del navegador
- Verifique el estado del sistema con los comandos de debugging

---

**✨ ¡El sistema está listo para usar!**

**Estado**: ✅ Configurado y Operacional
**Última actualización**: ${new Date().toLocaleDateString('es-ES')}
