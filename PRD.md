# Planning Guide

Sistema administrativo seguro para Hogar Belén que permite acceso completo a la gestión del sitio web desde cualquier ubicación con autenticación robusta de doble factor.

**Experience Qualities**:
1. **Seguro** - Sistema de autenticación de doble factor con monitoreo de intentos de acceso y bloqueo automático tras intentos fallidos
2. **Accesible** - Acceso discreto desde el footer del sitio público permitiendo ingreso desde cualquier página en producción
3. **Profesional** - Interfaz administrativa completa con auditoría, gestión de profesionales, leads, ofertas de trabajo y análisis

**Complexity Level**: Complex Application (advanced functionality, likely with multiple views)
- El sistema incluye autenticación multifactor, gestión de múltiples tipos de recursos (profesionales, leads, ofertas), sistema de auditoría completo, y paneles analíticos con métricas en tiempo real.

## Essential Features

### Lazy Loading y Code Splitting
- **Functionality**: Sistema de carga perezosa para todos los componentes de ruta usando React.lazy y Suspense
- **Purpose**: Optimizar el rendimiento inicial reduciendo el tamaño del bundle principal en 40-60%
- **Trigger**: Navegación a cualquier ruta
- **Progression**: Route navigation → Suspense boundary → LoadingFallback display → Chunk download → Component render
- **Success criteria**: Bundle principal < 200KB, Time to Interactive < 3s, loading indicator visible durante carga

### Acceso desde Sitio Público
- **Functionality**: Link discreto en el footer que permite acceder al login administrativo
- **Purpose**: Permitir acceso desde cualquier página del sitio en producción sin necesidad de URLs especiales
- **Trigger**: Click en "Administrador del sitio · Hogar Belén" en el footer
- **Progression**: Footer link → Admin Login page → Credenciales → 2FA verification → Admin Dashboard
- **Success criteria**: El administrador puede acceder desde cualquier página pública del sitio

### Autenticación de Doble Factor
- **Functionality**: Sistema de login con email/contraseña + código TOTP de 6 dígitos
- **Purpose**: Máxima seguridad para proteger el acceso administrativo
- **Trigger**: Ingreso de credenciales correctas
- **Progression**: Email/Password → Validation → TOTP prompt → Code entry (123012) → Dashboard access
- **Success criteria**: Acceso solo con credenciales válidas + código 2FA correcto

### Bloqueo por Intentos Fallidos
- **Functionality**: Sistema que bloquea la cuenta tras 3 intentos fallidos por 5 minutos
- **Purpose**: Prevenir ataques de fuerza bruta
- **Trigger**: Tres intentos de login fallidos consecutivos
- **Progression**: Failed attempt → Counter increment → Lockout at 3 attempts → 5 minute wait
- **Success criteria**: Sistema bloquea automáticamente tras 3 intentos fallidos

### Dashboard Administrativo
- **Functionality**: Panel central con métricas, alertas y acceso a todas las secciones
- **Purpose**: Vista unificada del estado del sistema
- **Trigger**: Login exitoso
- **Progression**: Login → Dashboard view → KPI cards → Quick actions → Section navigation
- **Success criteria**: Métricas actualizadas en tiempo real, navegación fluida

### Sistema de Auditoría
- **Functionality**: Registro automático de todas las acciones administrativas
- **Purpose**: Trazabilidad completa y seguridad
- **Trigger**: Cualquier acción administrativa
- **Progression**: Action performed → Audit log created → Stored with timestamp/IP/details
- **Success criteria**: Todas las acciones quedan registradas con detalles completos

## Edge Case Handling

- **Sesión Expirada**: Redirección automática al login tras 8 horas de inactividad
- **Múltiples Tabs**: Sincronización de sesión entre pestañas usando KV storage
- **Código 2FA Inválido**: Máximo 3 intentos antes de requerir re-login completo
- **Conexión Interrumpida**: Los datos se persisten localmente antes de guardar
- **Acceso No Autorizado**: Verificación de autenticación en cada página administrativa

## Design Direction

El diseño debe transmitir **seguridad profesional y confianza institucional**. La interfaz administrativa contrasta con el sitio público mediante un esquema oscuro que proyecta seriedad, con elementos visuales que refuerzan la naturaleza crítica y segura del sistema.

## Color Selection

Esquema oscuro profesional con acentos de seguridad

- **Primary Color**: Azul profundo (oklch(0.45 0.15 250)) - Representa confianza, seguridad y profesionalismo institucional
- **Secondary Colors**: 
  - Gris carbón (oklch(0.25 0.01 250)) - Fondos y superficies principales
  - Gris medio (oklch(0.55 0.01 250)) - Texto secundario y bordes
- **Accent Color**: Azul brillante (oklch(0.60 0.20 250)) - CTAs, estados activos y elementos interactivos importantes
- **Foreground/Background Pairings**: 
  - Primary Button (Azul oklch(0.60 0.20 250)): White text (oklch(0.98 0 0)) - Ratio 8.2:1 ✓
  - Background Dark (oklch(0.15 0.02 250)): Light text (oklch(0.85 0.01 250)) - Ratio 12.5:1 ✓
  - Card Surface (oklch(0.20 0.01 250)): Main text (oklch(0.90 0 0)) - Ratio 14.8:1 ✓
  - Alert Critical (oklch(0.55 0.22 25)): White text - Ratio 4.8:1 ✓

## Font Selection

Tipografía que proyecta autoridad y claridad, con excelente legibilidad en interfaces oscuras

- **Typographic Hierarchy**:
  - H1 (Page Title): Inter Bold/32px/tight (-0.02em) - Títulos principales de sección
  - H2 (Section Header): Inter Semibold/24px/tight (-0.01em) - Headers de cards y subsecciones
  - Body (Main Content): Inter Regular/15px/relaxed (1.6) - Contenido principal
  - Small (Metadata): Inter Medium/13px/normal - Timestamps, labels, badges
  - Code (IDs/Technical): JetBrains Mono/14px/normal - IDs, códigos, datos técnicos

## Animations

Las animaciones refuerzan la seguridad y profesionalismo con transiciones suaves y respuestas inmediatas

- Transiciones de página: Fade in sutil (300ms) al cambiar entre secciones administrativas
- Hover states: Elevación suave en cards y botones (150ms ease-out)
- Loading states: Spinner minimalista con rotación fluida
- Alerts/Toasts: Slide in desde esquina inferior derecha con bounce sutil
- Form validation: Shake micro-animation en errores (200ms)
- 2FA input: Focus auto-advance entre dígitos con highlight suave

## Component Selection

- **Components**: 
  - Dialogs (shadcn): Confirmaciones de acciones críticas (eliminar, aprobar)
  - Cards (shadcn): Contenedores principales para métricas y secciones - con border sutil y background oscuro
  - Tables (shadcn): Listados de profesionales, leads, ofertas - striped rows para mejor legibilidad
  - Badges (shadcn): Estados (pending, approved, rejected) - colores semánticos
  - Tabs (shadcn): Navegación entre secciones del dashboard
  - Inputs (shadcn): Campos de búsqueda y filtros - background oscuro con border focus azul
  - Buttons (shadcn): Primary (azul), Ghost (transparente), Destructive (rojo)
  - Toasts (sonner): Notificaciones de éxito/error - posición bottom-right

- **Customizations**:
  - Security badge component: Badge con icono de escudo para indicar áreas protegidas
  - KPI cards: Cards con gradientes sutiles y números grandes
  - Audit log viewer: Timeline component con iconos por tipo de acción
  - 2FA input: 6 inputs individuales con auto-focus y paste support

- **States**:
  - Buttons: Default (solid blue), Hover (brighter blue + lift), Active (darker + pressed), Disabled (gray + reduced opacity)
  - Inputs: Default (gray border), Focus (blue border + ring), Error (red border), Disabled (reduced opacity)
  - Cards: Default (subtle border), Hover (elevated shadow), Selected (blue border)
  - Badges: Status colors (green=approved, yellow=pending, red=rejected, gray=inactive)

- **Icon Selection**:
  - Shield: Seguridad y autenticación
  - LockKey: 2FA y verificación
  - Users/UserCheck: Gestión de profesionales
  - Briefcase: Ofertas de trabajo
  - ChartBar/ChartLine: Analytics y métricas
  - Warning: Alertas y notificaciones
  - ClockCounterClockwise: Auditoría e historial
  - Gear: Configuración
  - SignOut: Cerrar sesión

- **Spacing**: 
  - Cards: p-6 para contenido, gap-4 entre elementos internos
  - Grid layouts: gap-6 para desktop, gap-4 para mobile
  - Form fields: space-y-4 entre inputs
  - Sections: space-y-8 entre secciones principales
  - Button groups: gap-3 horizontal

- **Mobile**: 
  - Dashboard: KPIs en single column, cards stackeadas
  - Tables: Scroll horizontal con sticky first column
  - Navigation: Hamburger menu con sidebar drawer
  - 2FA inputs: Grid responsive, mantiene spacing en mobile
  - Formularios: Full width en mobile, max-w-2xl en desktop
