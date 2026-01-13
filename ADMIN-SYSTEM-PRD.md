# Sistema de Administración - Hogar Belén

Sistema de administración integral para Hogar Belén con autenticación de doble factor, análisis IA, gestión de profesionales y seguimiento de leads.

## Propósito

Proporcionar a los administradores de Hogar Belén un panel de control centralizado y seguro para gestionar profesionales, leads, ofertas de trabajo y contenido del sitio, con clasificación inteligente por IA para mejorar la toma de decisiones.

**Cualidades de Experiencia**:
1. **Seguro** - Autenticación de doble factor (2FA), auditoría completa y bloqueo automático por intentos fallidos
2. **Inteligente** - Clasificación IA de profesionales y leads para priorización y detección de riesgos
3. **Eficiente** - Dashboard con métricas en tiempo real y acciones rápidas para gestión diaria

**Nivel de Complejidad**: Complex Application (aplicación avanzada con múltiples vistas, autenticación, análisis IA, y gestión de múltiples recursos)

## Características Esenciales

### 1. Autenticación Segura con 2FA
- **Funcionalidad**: Sistema de login con email/contraseña + código 2FA
- **Propósito**: Proteger el acceso administrativo con doble capa de seguridad
- **Trigger**: Usuario navega a `/admin-login`
- **Progresión**: Ingresar email → Ingresar contraseña → Sistema valida credenciales → Solicitar código 2FA → Validar código → Acceso concedido → Redirigir a dashboard
- **Criterio de Éxito**: Admin puede iniciar sesión exitosamente solo con credenciales válidas Y código 2FA correcto. Bloqueo automático tras 3 intentos fallidos.

### 2. Dashboard con Métricas Reales
- **Funcionalidad**: Vista general con KPIs en tiempo real de profesionales, leads, ofertas y alertas IA
- **Propósito**: Dar visibilidad instantánea del estado del sistema y elementos que requieren atención
- **Trigger**: Admin inicia sesión exitosamente
- **Progresión**: Sistema carga → Calcular métricas en tiempo real → Mostrar KPIs principales → Resaltar alertas críticas → Proveer acceso rápido a módulos
- **Criterio de Éxito**: Dashboard muestra datos reales actualizados: total de profesionales, pendientes de aprobación, leads del mes, ofertas activas, y alertas IA sin resolver.

### 3. Aprobación de Profesionales con IA
- **Funcionalidad**: Revisar perfiles profesionales pendientes, analizar con IA, aprobar o rechazar
- **Propósito**: Validar la calidad de profesionales antes de publicarlos en la plataforma
- **Trigger**: Admin hace clic en "Profesionales" o badge de "pendientes de aprobación"
- **Progresión**: Ver lista de profesionales → Filtrar por estado → Seleccionar profesional → Ver detalles completos → Analizar con IA → IA evalúa completitud, credibilidad, riesgo y da recomendación → Admin aprueba/rechaza basado en análisis → Sistema actualiza estado → Notificar resultado
- **Criterio de Éxito**: Admin puede revisar perfiles completos, obtener análisis IA con puntuación de riesgo y recomendación, y aprobar/rechazar con un clic. Las alertas IA se generan automáticamente para perfiles sospechosos.

### 4. Gestión de Leads con Clasificación IA
- **Funcionalidad**: Ver, clasificar y gestionar todos los leads del formulario de contacto
- **Propósito**: Priorizar seguimiento basado en urgencia e intención detectada por IA
- **Trigger**: Formulario de contacto enviado O admin accede a módulo de Leads
- **Progresión**: Usuario llena formulario → IA clasifica automáticamente (prioridad, intención, sentimiento, urgencia) → Lead aparece en panel admin → Admin filtra por prioridad/estado → Selecciona lead → Ve detalles + clasificación IA → Actualiza estado → Agrega notas de seguimiento → Marca como contactado/calificado/convertido
- **Criterio de Éxito**: Todos los leads del formulario de contacto aparecen en el panel con clasificación IA automática. Admin puede filtrar, buscar, actualizar estado y agregar notas. Métricas muestran conversión y distribución de leads.

### 5. Gestión de Ofertas de Trabajo
- **Funcionalidad**: Crear, editar, publicar y despublicar ofertas laborales
- **Propósito**: Mantener un directorio actualizado de oportunidades laborales
- **Trigger**: Admin accede a módulo "Ofertas de Trabajo"
- **Progresión**: Ver lista de ofertas → Crear nueva oferta → Llenar detalles (título, descripción, requisitos, salario) → Publicar → Oferta aparece en sitio público → Tracking de vistas → Opción de editar o despublicar
- **Criterio de Éxito**: Admin puede gestionar ciclo completo de ofertas. Dashboard muestra ofertas activas vs expiradas. Visitantes ven ofertas publicadas.

### 6. Sistema de Auditoría
- **Funcionalidad**: Log completo de todas las acciones administrativas
- **Propósito**: Mantener trazabilidad y transparencia de cambios en el sistema
- **Trigger**: Cualquier acción administrativa (login, aprobar profesional, cambiar estado de lead, etc.)
- **Progresión**: Admin realiza acción → Sistema registra: usuario, acción, recurso afectado, timestamp, IP, detalles → Log almacenado permanentemente → Admin puede revisar historial de auditoría
- **Criterio de Éxito**: Todas las acciones administrativas se registran con información completa. Logs incluyen logins exitosos/fallidos, aprobaciones/rechazos, y cambios de estado.

## Manejo de Casos Extremos

- **Múltiples Intentos de Login Fallidos** - Bloqueo automático por 5 minutos tras 3 intentos fallidos. Log de auditoría registra todos los intentos.
- **Sesión Expirada** - Sesión administrativa expira tras 8 horas de inactividad. Usuario debe re-autenticar.
- **Error en Análisis IA** - Si IA falla, admin aún puede aprobar/rechazar manualmente. Error se registra pero no bloquea el flujo.
- **Formulario de Contacto sin Datos Completos** - IA clasifica con información disponible. Lead se marca como "información incompleta".
- **Conflicto de Actualización Concurrente** - Sistema usa última escritura. Cambios se marcan con timestamp y usuario.

## Dirección de Diseño

El diseño debe transmitir **confianza, eficiencia y control**. Los administradores deben sentirse empoderados con herramientas profesionales que les ayudan a tomar decisiones informadas rápidamente.

## Selección de Colores

### Tema Administrativo Profesional

- **Primary Color**: `oklch(0.40 0.15 240)` - Azul oscuro profesional que comunica confianza y autoridad
- **Secondary Colors**: 
  - `oklch(0.30 0.08 240)` - Azul muy oscuro para fondos de header
  - `oklch(0.95 0.02 240)` - Azul muy claro para fondos de cards
- **Accent Color**: `oklch(0.55 0.20 260)` - Azul vibrante para llamadas a acción importantes
- **Foreground/Background Pairings**:
  - Background principal (Gris claro #F9FAFB): Texto oscuro (#1F2937) - Ratio 10.2:1 ✓
  - Primary (Azul oscuro): Texto blanco (#FFFFFF) - Ratio 7.8:1 ✓
  - Accent (Azul vibrante): Texto blanco (#FFFFFF) - Ratio 5.1:1 ✓
  - Alertas (Amarillo #FEF3C7): Texto oscuro (#92400E) - Ratio 8.3:1 ✓

### Colores de Estado Semántico
- **Success (Aprobado)**: `oklch(0.65 0.18 140)` - Verde para acciones positivas
- **Warning (Pendiente)**: `oklch(0.70 0.15 70)` - Amarillo/Ámbar para elementos que requieren atención
- **Danger (Rechazado/Crítico)**: `oklch(0.60 0.22 25)` - Rojo para alertas y acciones destructivas
- **Info (IA/Datos)**: `oklch(0.65 0.18 280)` - Púrpura para información de IA

## Selección de Fuentes

El sistema utiliza **Inter** para todo el contenido administrativo - una fuente diseñada específicamente para interfaces digitales con excelente legibilidad en pantallas.

### Jerarquía Tipográfica
- **H1 (Títulos de Página)**: Inter Bold / 28px / -0.02em letter-spacing
- **H2 (Títulos de Sección)**: Inter SemiBold / 22px / -0.01em letter-spacing  
- **H3 (Títulos de Card)**: Inter SemiBold / 18px / normal letter-spacing
- **Body (Contenido General)**: Inter Regular / 15px / 1.5 line-height
- **Small (Metadatos/Timestamps)**: Inter Regular / 13px / 1.4 line-height
- **Labels**: Inter Medium / 14px / normal letter-spacing

## Animaciones

Las animaciones en el panel de administración deben ser **mínimas y funcionales**, priorizando velocidad y claridad sobre efectos decorativos.

- **Transiciones de Página**: 150ms fade-in suave al cambiar de vista
- **Hover en Cards/Botones**: 100ms cambio de sombra para indicar interactividad
- **Loading States**: Spinner simple con rotación continua
- **Toasts de Notificación**: Slide-in desde abajo derecha, 200ms, auto-dismiss en 4s
- **Modals**: Fade-in de 150ms con ligero scale-up (0.95 → 1.0)
- **Estados de Actualización**: Cambio de color instantáneo con confirmación visual

## Selección de Componentes

### Shadcn Components Utilizados:
- **Card**: Contenedor principal para todos los módulos y métricas
- **Button**: Acciones primarias (aprobar, rechazar, guardar) con variantes (default, destructive, outline, ghost)
- **Badge**: Indicadores de estado (pendiente, aprobado, rechazado, prioridad)
- **Dialog**: Modales para ver detalles de profesionales y leads
- **Tabs**: Organización de contenido en dashboard (Overview, Módulos, Auditoría, Config)
- **Input/Textarea**: Formularios de búsqueda, filtros y notas
- **Select**: Dropdowns para cambiar estados y filtrar
- **Alert**: Mensajes de IA y notificaciones importantes

### Customizaciones:
- **Status Badges**: Colores personalizados para cada estado (verde=aprobado, amarillo=pendiente, rojo=rechazado, púrpura=IA)
- **AI Analysis Card**: Card especial con fondo púrpura claro y border para destacar análisis IA
- **KPI Cards**: Cards con números grandes y colores semánticos para métricas principales
- **Priority Indicators**: Badges con colores que reflejan urgencia (crítico=rojo, alto=naranja, medio=amarillo, bajo=azul)

### Iconos:
Phosphor Icons para consistencia con el resto del sitio:
- Shield: Seguridad/Admin
- Users: Profesionales
- Briefcase: Ofertas de trabajo
- ChartBar: Métricas/Leads
- Robot: Análisis IA
- CheckCircle/XCircle: Aprobar/Rechazar
- Warning: Alertas
- Clock: Timestamps
- Eye: Ver detalles
- MagnifyingGlass: Búsqueda

### Estados Interactivos:
- **Cards Clickables**: Hover → elevación de sombra + cursor pointer
- **Botones Primarios**: Hover → oscurecimiento del color + escala ligera
- **Filtros Activos**: Background azul cuando están seleccionados
- **Inputs Focused**: Border azul + sombra sutil
- **Loading States**: Deshabilitado + spinner visible

### Mobile:
- Stack vertical de KPIs en móvil (grid de 4 cols → 1 col)
- Tabs con scroll horizontal si no caben
- Modales ocupan 95% del viewport en móvil
- Filtros se colapsan en un menú dropdown
- Tabla de leads se convierte en cards apiladas

## Credenciales de Acceso

**Email**: josefabian1212@gmail.com  
**Contraseña**: @Sara2918+  
**Código 2FA**: 123012

## Integración con Formulario de Contacto

El formulario de contacto público (`/pages/ContactPage.tsx`) está completamente integrado con el sistema de leads:

1. Usuario llena formulario → envío
2. IA clasifica automáticamente en el cliente (prioridad, intención, sentimiento, urgencia)
3. Lead se guarda en KV store con clasificación IA
4. Lead aparece instantáneamente en panel admin
5. Admin recibe notificación visual de nuevos leads
6. Leads de alta prioridad/críticos se destacan automáticamente

## Métricas del Dashboard (Datos Reales)

Todas las métricas son calculadas dinámicamente desde los datos almacenados:

- **Total Profesionales**: Count de array `professionals`
- **Pendientes de Aprobación**: Count de `professionals` donde `status === 'pending'`
- **Ofertas Activas**: Count de `job-offers` donde `active === true`
- **Total Leads**: Count de array `leads`
- **Leads Este Mes**: Count de `leads` donde `created_at` es del mes actual
- **Alertas IA**: Count de `ai-alerts` donde `resolved === false` + profesionales con `ai_score < 0.5` + leads con `priority === 'critical' | 'high'`

## Flujo de Aprobación Profesional

1. Profesional se registra → Estado: `pending`
2. Admin accede a "Profesionales" → Ve perfil pendiente
3. Admin hace clic en "Analizar con IA"
4. IA analiza:
   - Completitud del perfil (0-1)
   - Credibilidad (0-1)
   - Nivel de riesgo (low/medium/high)
   - Red flags específicas
   - Recomendación (approve/review/reject)
   - Nivel de confianza (high/medium/low)
5. IA genera alerta automática si detecta riesgo alto
6. Admin revisa análisis + información del profesional
7. Admin decide: Aprobar → `status: 'approved', verified: true` O Rechazar con motivo → `status: 'rejected', rejection_reason: '...'`
8. Sistema registra acción en auditoría
9. Profesional recibe notificación (futuro)

## Sistema de Auditoría

Todas las acciones administrativas se registran con:
- `user_id` y `user_email` del admin
- `action` (login, approve, reject, update_status, etc.)
- `resource_type` (authentication, professional, lead, offer, etc.)
- `resource_id` (ID del recurso afectado)
- `details` (información adicional contextual)
- `ip_address` y `user_agent`
- `created_at` timestamp

Esto permite trazabilidad completa de quién hizo qué y cuándo.
