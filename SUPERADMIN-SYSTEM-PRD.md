# Sistema de Superadministrador - PRD

Sistema de administración seguro con autenticación de doble factor (2FA TOTP), gestión de roles y auditoría completa para Hogar Belén.

**Cualidades de la experiencia:**
1. **Seguridad extrema** - Múltiples capas de protección con 2FA TOTP real, RLS y auditoría completa
2. **Hiperconectividad** - Panel centralizado que controla y visualiza toda la plataforma en tiempo real
3. **Transparencia operacional** - Registro inmutable de todas las acciones administrativas

**Nivel de complejidad:** Complex Application - Sistema administrativo multi-módulo con autenticación robusta, gestión de roles y conexión con todas las páginas públicas

## Características Esenciales

### 1. Acceso desde Footer (Discreto)
- **Funcionalidad**: Enlace discreto "Administrador del sitio · Hogar Belén" en todas las páginas
- **Propósito**: Acceso transparente pero no promocionado al sistema administrativo
- **Trigger**: Click en enlace del footer
- **Progresión**: Click en footer → Verificación de sesión → /admin/login o /admin/dashboard
- **Criterio de éxito**: Enlace visible en todas las páginas, redirección correcta según estado de autenticación

### 2. Autenticación Multi-Factor (2FA TOTP Real)
- **Funcionalidad**: Login con email/password + verificación TOTP (Google Authenticator compatible)
- **Propósito**: Máxima seguridad para acceso administrativo
- **Trigger**: Intento de login desde /admin/login
- **Progresión**: Email/password → Validación → /admin/2fa → Código TOTP → Dashboard
- **Criterio de éxito**: 
  - Credenciales validadas correctamente
  - TOTP generado y verificado
  - Máximo 3 intentos fallidos
  - Bloqueo temporal tras intentos fallidos
  - Registro de IP y dispositivo

### 3. Sistema de Roles y RLS
- **Funcionalidad**: Control de acceso basado en roles (super_admin, admin_secundario)
- **Propósito**: Segregación de permisos administrativos
- **Trigger**: Cada acción administrativa
- **Progresión**: Acción solicitada → Verificación de rol → Ejecución o denegación → Auditoría
- **Criterio de éxito**: Solo super_admin puede ejecutar acciones críticas

### 4. Dashboard Hiperconectado
- **Funcionalidad**: Vista centralizada de toda la plataforma (KPIs, alertas, accesos rápidos)
- **Propósito**: Control total desde un solo lugar
- **Trigger**: Login exitoso
- **Progresión**: Login → Dashboard → Módulos específicos → Acciones → Actualización en tiempo real
- **Criterio de éxito**: 
  - KPIs actualizados en tiempo real
  - Alertas de IA visibles
  - Navegación fluida a todos los módulos
  - Cambios reflejados inmediatamente en sitio público

### 5. Módulos Administrativos
- **Funcionalidad**: 
  - Profesionales: Aprobar/rechazar, activar check azul, gestionar perfiles
  - Ofertas: Crear/editar/eliminar ofertas de trabajo
  - Usuarios: Gestionar familias y profesionales
  - Leads: Ver y gestionar formularios de contacto
  - Contenido: Editar textos del footer y páginas legales
  - IA: Ver clasificaciones, riesgos y recomendaciones
  - Configuración: Ajustes globales del sistema
  - Auditoría: Log completo de acciones administrativas
- **Propósito**: Gestión completa de la plataforma desde un solo lugar
- **Trigger**: Navegación desde dashboard
- **Progresión**: Dashboard → Módulo → Lista/Vista → Acción → Confirmación → Auditoría
- **Criterio de éxito**: Todas las acciones funcionan y se reflejan en sitio público y auditoría

### 6. Auditoría Completa
- **Funcionalidad**: Registro inmutable de todas las acciones administrativas
- **Propósito**: Trazabilidad y transparencia operacional
- **Trigger**: Cualquier acción administrativa
- **Progresión**: Acción ejecutada → Registro automático → Vista en /admin/auditoria
- **Criterio de éxito**: 
  - Todas las acciones registradas con timestamp, usuario, IP, acción
  - No editable
  - Filtrable y buscable
  - Exportable

## Manejo de Casos Límite
- **2FA perdido**: Proceso de recuperación manual (contacto directo con super admin)
- **Intentos fallidos**: Bloqueo temporal progresivo (5 min, 15 min, 1 hora)
- **Sesión expirada**: Redirección a login con mensaje claro
- **Sin permisos**: Mensaje claro de acceso denegado, registro en auditoría
- **Error de red**: Reintentos automáticos, mensajes de error claros

## Dirección de Diseño
El diseño debe evocar **confianza, profesionalismo y control total**. Estética de panel de control corporativo moderno con énfasis en seguridad.

## Selección de Color
- **Primary Color**: `oklch(0.25 0.08 250)` (Azul marino profundo) - Comunica autoridad y confianza
- **Secondary Colors**: 
  - Gris oscuro `oklch(0.18 0.02 240)` para fondos
  - Gris medio `oklch(0.45 0.02 240)` para texto secundario
- **Accent Color**: `oklch(0.65 0.20 160)` (Verde azulado) - Para acciones positivas y CTAs
- **Alert Colors**:
  - Warning: `oklch(0.75 0.15 85)` (Amarillo) - Ratio 4.5:1 ✓
  - Error: `oklch(0.65 0.20 25)` (Rojo) - Ratio 4.8:1 ✓
  - Success: `oklch(0.60 0.18 145)` (Verde) - Ratio 5.2:1 ✓
- **Foreground/Background Pairings**:
  - Primary bg: Blanco `oklch(0.98 0.01 180)` con texto oscuro `oklch(0.15 0.02 240)` - Ratio 12.5:1 ✓
  - Card bg: `oklch(0.99 0.005 180)` con texto `oklch(0.15 0.02 240)` - Ratio 13:1 ✓
  - Accent: Verde azulado con blanco - Ratio 4.8:1 ✓

## Selección de Fuente
Tipografía que comunica profesionalismo técnico y autoridad administrativa.

- **Typographic Hierarchy**:
  - H1 (Título principal): Inter Bold / 32px / -0.02em letter spacing
  - H2 (Títulos de sección): Inter SemiBold / 24px / -0.01em
  - H3 (Subtítulos): Inter Medium / 18px / normal
  - Body (Texto general): Inter Regular / 14px / 1.5 line height
  - Caption (Metadatos): Inter Regular / 12px / 1.4 line height / text-muted-foreground
  - Monospace (Datos técnicos): JetBrains Mono Regular / 13px / para IDs, tokens

## Animaciones
Animaciones sutiles y profesionales que refuerzan la sensación de control y eficiencia.

- Transiciones de página: fade + slide vertical suave (300ms)
- Hover en botones: scale ligero (1.02) + cambio de color
- Carga de datos: skeleton loaders con shimmer effect
- Notificaciones: slide desde la esquina superior derecha
- Confirmaciones críticas: modal con backdrop blur
- Estados de loading: spinners minimalistas

## Selección de Componentes

### Shadcn Components
- **Alert Dialog**: Para confirmaciones de acciones críticas (eliminar, aprobar)
- **Card**: Contenedor principal de módulos y KPIs
- **Table**: Listados de profesionales, usuarios, auditoría
- **Form + Input**: Formularios de login, 2FA, edición
- **Button**: Todos los CTAs con variantes (default, destructive, outline)
- **Badge**: Estados (aprobado, pendiente, rechazado)
- **Tabs**: Navegación entre módulos del dashboard
- **Dialog**: Modales para edición y detalles
- **Switch**: Activar/desactivar funcionalidades
- **Select**: Filtros y selectores
- **Separator**: Divisiones visuales entre secciones
- **Skeleton**: Loading states
- **Toast (Sonner)**: Notificaciones de acciones

### Customizaciones
- **AuthGuard**: Componente que verifica autenticación y rol antes de renderizar rutas admin
- **AuditLogger**: Componente que registra automáticamente acciones administrativas
- **TwoFactorSetup**: Componente para configurar TOTP con QR code
- **KPICard**: Card personalizado para métricas del dashboard
- **AdminLayout**: Layout consistente con sidebar de navegación

### Estados
- **Buttons**: Default, Hover (escala 1.02), Active (presionado), Disabled (opacity 0.5)
- **Inputs**: Default, Focus (ring accent), Error (ring destructive), Disabled
- **Cards**: Default, Hover (sombra elevada), Active (borde accent)

### Selección de Iconos (Phosphor)
- Shield: Seguridad y protección
- UserCheck: Aprobaciones de profesionales
- Lock: Autenticación y 2FA
- ChartBar: KPIs y métricas
- Users: Gestión de usuarios
- Briefcase: Ofertas de trabajo
- FileText: Contenido y documentos
- Robot: IA y clasificaciones
- ClockCounterClockwise: Auditoría e historial
- Gear: Configuración
- SignOut: Cerrar sesión
- Warning: Alertas
- CheckCircle: Acciones exitosas

### Espaciado
- Padding de cards: p-6
- Gap entre elementos: gap-4
- Margen entre secciones: mb-8
- Sidebar width: w-64
- Container max-width: max-w-7xl

### Mobile
- Sidebar colapsa a drawer en < 768px
- Tablas se convierten en cards apiladas
- Dashboard KPIs pasan de grid-cols-4 a grid-cols-1
- Botones de acción se agrupan en dropdown menu
- Touch targets mínimo 44x44px
