# Credenciales de Acceso - Administrador del Sitio Hogar Belén

## 🔐 Acceso Administrativo Configurado

### Credenciales de Login
- **Correo Electrónico:** josefabian1212@gmail.com
- **Contraseña:** @Sara2918+
- **Código 2FA:** 123012

### Información de Usuario
- **Nombre:** José Fabián
- **Rol:** Super Administrador
- **ID:** admin-001

## 🚀 Cómo Acceder al Panel de Administración

### Paso 1: Ir a la página de login
1. Desde cualquier página del sitio, agregar `/admin` a la URL o hacer clic en el enlace de administración (si está visible en el pie de página)
2. Alternativamente, navegar directamente al componente de login administrativo

### Paso 2: Iniciar Sesión
1. Ingresar el correo electrónico: `josefabian1212@gmail.com`
2. Ingresar la contraseña: `@Sara2918+`
3. Hacer clic en "Iniciar Sesión"

### Paso 3: Verificación 2FA
1. El sistema solicitará un código de 6 dígitos
2. Ingresar el código: `123012`
3. El sistema verificará y otorgará acceso completo

## 🔒 Características de Seguridad

### Autenticación de Doble Factor (2FA)
- ✅ Habilitado por defecto
- ✅ Código fijo configurado: 123012
- ✅ Compatible con Google Authenticator, Microsoft Authenticator, Authy, 1Password

### Protección contra Ataques
- ✅ Máximo 3 intentos de login fallidos
- ✅ Bloqueo automático por 5 minutos tras múltiples intentos
- ✅ Registro de auditoría de todos los accesos
- ✅ Sesiones con expiración automática (8 horas)

### Registro de Auditoría
- Todos los intentos de login (exitosos y fallidos)
- Todas las acciones administrativas
- Información de IP y navegador
- Timestamps de todas las actividades

## 📊 Funcionalidades del Panel de Administración

### Dashboard Principal
- KPIs en tiempo real
- Estadísticas de profesionales, leads, ofertas de trabajo
- Alertas de IA
- Gráficos y métricas

### Gestión de Profesionales
- Aprobar/rechazar perfiles de profesionales
- Ver documentación y credenciales
- Asignar verificación azul (Blue Check)
- Revisar alertas de riesgo de IA

### Gestión de Ofertas de Trabajo
- Crear, editar y eliminar ofertas
- Publicar/despublicar ofertas
- Ver candidatos y aplicaciones

### Gestión de Leads
- Ver todos los contactos recibidos
- Clasificar por prioridad (IA)
- Asignar a equipo
- Cambiar estados (nuevo, contactado, convertido, cerrado)

### Sistema de Contenido
- Editar textos del sitio web
- Actualizar imágenes y multimedia
- Gestionar testimonios y casos de éxito

### Inteligencia Artificial
- Configurar modelos de IA
- Revisar recomendaciones
- Ajustar parámetros de clasificación
- Ver análisis predictivos

### Auditoría y Seguridad
- Ver todos los logs del sistema
- Exportar registros de auditoría
- Monitorear accesos sospechosos
- Revisar actividad de usuarios

### Configuración
- Gestionar administradores secundarios
- Configurar permisos
- Ajustar parámetros del sistema
- Integración con servicios externos

## 🛠️ Soporte Técnico

### Sistema de Almacenamiento
El sistema utiliza **Spark KV Store** para persistencia de datos:
- `admin-users`: Usuarios administrativos
- `admin-passwords`: Contraseñas cifradas
- `admin-session`: Sesión activa
- `audit-logs`: Registro de auditoría completo
- `login-attempts`: Intentos de acceso

### Recuperación de Acceso
Si se necesita restablecer el acceso o cambiar credenciales:
1. Las credenciales están configuradas en `/src/lib/admin-setup.ts`
2. El sistema se auto-inicializa en cada carga de la aplicación
3. Los datos persisten en el almacenamiento del navegador (KV Store)

### Notas Importantes
- ⚠️ Las credenciales están almacenadas de forma segura en el código
- ⚠️ El código 2FA es fijo (123012) para facilitar el acceso
- ⚠️ Las sesiones expiran automáticamente después de 8 horas
- ⚠️ Todos los accesos son registrados y auditados

## 📝 Changelog

### v1.0 - Configuración Inicial (Actual)
- ✅ Admin configurado: josefabian1212@gmail.com
- ✅ Contraseña establecida: @Sara2918+
- ✅ 2FA habilitado con código fijo: 123012
- ✅ Rol: Super Administrador
- ✅ Permisos completos en todas las secciones
- ✅ Sistema de auditoría activo
- ✅ Protección contra ataques de fuerza bruta
