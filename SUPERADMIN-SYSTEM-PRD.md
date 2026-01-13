# Sistema de Superadministrador - PRD

Sistema de administración seguro con autenticación de doble factor (2FA TOTP), gestión de roles y auditoría completa para Hogar Belén.

2. **Hiperconectividad** - Panel 




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
- **Progresión**: Login → Dashboard → Módulos específicos → Acciones → Actualización en tiempo
  - KPIs actualizados en tiempo real


- **Funcionalidad**: 
  - Ofertas: Crear/editar/eliminar ofertas de trab
  - Leads: Ver y gestionar f
  - IA: Ver clasificaciones, riesgos y recomendaciones
  - Auditoría: Log comple
- **Trigger**: Navegación desde dash
- **Criterio de éxito**: T
### 6. Auditoría Completa
- **Propósito**: Trazabilidad y transparencia operacio

  - Todas las acciones registr
  - Filtrable y busca

- **2FA perdido**: Proceso de recuperación manual (co
- **Sesión expirada**: Redirección a login con m
- **Error de red**: Reintentos automáticos, mensaj
## Dirección de Diseño

- **Primary Color**: `oklch(0.25 0.08 250)` (Az
  - Gris oscuro `oklch(0.18 0.02 240)` para fondos
- **Accent Color**: `oklch(0.65 0.20 160)` (Verde azulado) - Para acci
  - Warning: `oklch(0.75 0.15 85)` (Amari
  - Success: `oklch(0.60 0.18 145)` (Verde) - Ratio 5.2:1 ✓
  - Primary bg: Blanco `oklch(0.98 0.01 180)` con texto oscuro `oklch(0.15 0.02 240)` - Ratio 12

## Selección de Fuente

  - H1 (Título principal): Inter Bold / 32px / -0.02em le
  - H3 (Subtítulos): Inter Medium / 18px / nor
  - Caption (Metadatos): Inter Regular / 12px / 1.4 line height / text-muted-foregro

Animaciones sutiles y profesionales que refuerzan la sensación de con
- Transiciones 
- Carga de datos: skelet
- Confirmacion


- **Alert Dialog**: Para confirmaciones de acciones críticas (eliminar, aprobar)
- **Table**: Listados de profesionales, usuarios, auditoría
- **Button**: Todos los CTAs con variantes (default, destruc
- **Tabs**: Navegación entre módulos del dashboard
- **Switch**: Activar/desactivar funcionalidades

- **Toast (Sonner)**: 
### Customizaciones

- **KPICard**: Card p

- **Buttons**: Default, 
- **Cards**: Default, Hover (sombra elevada), Acti
### Selección de Iconos (Phosphor)
- UserCheck: Aprobaciones de profesionales
- ChartBar: KPIs y 
- Briefcase: Ofertas de trabajo
- Robot: IA y clasificaciones
- Gear: Configuración
- Warning: Alertas

- Padding de cards: p-6
- Margen entre secciones: mb-8

### Mobile
- Tablas se convierten en cards apiladas









































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
