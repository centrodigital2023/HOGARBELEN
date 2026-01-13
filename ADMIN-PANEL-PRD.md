# PRD: Panel de Administración Hogar Belén

Panel de administración integral para gestionar profesionales, ofertas de trabajo, leads y configuraciones del sitio público de Hogar Belén, con inteligencia artificial integrada para clasificación, detección de riesgos y auditoría completa.

**Experience Qualities**:
1. **Eficiente y Potente** - Interfaz rápida y directa que permite gestionar múltiples recursos con información clara y acciones inmediatas
2. **Seguro y Transparente** - Sistema de autenticación robusto con 2FA opcional y registro completo de auditoría para todas las acciones críticas
3. **Inteligente y Proactivo** - IA integrada que clasifica automáticamente contenido, detecta riesgos y prioriza leads sin intervención manual

**Complexity Level**: Complex Application (advanced functionality, likely with multiple views)
El panel administra múltiples entidades (profesionales, ofertas, leads, alertas), con roles, autenticación avanzada, clasificación por IA, auditoría, y configuraciones globales que impactan el sitio público.

## Essential Features

### 1. Autenticación y Autorización de Super Admin
- **Functionality**: Sistema de login seguro con credenciales y verificación 2FA opcional (TOTP)
- **Purpose**: Proteger el acceso al panel de administración limitándolo solo a super administradores autorizados
- **Trigger**: Usuario navega a `/admin` y debe iniciar sesión
- **Progression**: Pantalla login → Validar credenciales → (Si 2FA activo) Mostrar pantalla código TOTP → Validar código → Dashboard principal
- **Success criteria**: Solo super admins verificados pueden acceder; intentos fallidos son bloqueados tras 3 intentos; todas las sesiones expiran en 8 horas; cada acción queda registrada en audit logs

### 2. Dashboard de Métricas en Tiempo Real
- **Functionality**: Vista general con KPIs actualizados: profesionales totales/pendientes/aprobados, ofertas activas/pendientes, leads del mes por prioridad, alertas no resueltas
- **Purpose**: Proveer visibilidad instantánea del estado de la plataforma y actividad reciente
- **Trigger**: Admin completa login exitoso
- **Progression**: Login verificado → Cargar datos de useKV → Calcular métricas → Mostrar tarjetas de KPIs → Mostrar alertas IA sin resolver → Actualizar en tiempo real
- **Success criteria**: Métricas reflejan datos reales almacenados; cambios en profesionales/ofertas/leads se reflejan inmediatamente; alertas críticas destacadas visualmente

### 3. Gestión de Profesionales
- **Functionality**: Lista completa de profesionales registrados con filtros por estado (pendiente/aprobado/rechazado), búsqueda, y acciones: aprobar, rechazar, solicitar info adicional, ver documentos, evaluar con IA
- **Purpose**: Validar y aprobar perfiles de profesionales antes de publicarlos en el sitio público
- **Trigger**: Admin selecciona "Profesionales" en menú lateral
- **Progression**: Mostrar lista → Filtrar/buscar → Seleccionar profesional → Ver detalle completo → (IA clasifica automáticamente) → Admin toma decisión → Aprobar/Rechazar con razón → Actualizar estado → Registrar en audit → Reflejar cambio en sitio público
- **Success criteria**: Profesionales aprobados aparecen en sitio público; rechazados no se muestran; clasificación IA genera score y nivel de confianza; acciones quedan registradas con user_id, timestamp, IP

### 4. Gestión de Ofertas de Trabajo
- **Functionality**: CRUD completo de ofertas con revisión IA de lenguaje y legalidad, activación/pausa, fechas de expiración
- **Purpose**: Publicar ofertas laborales revisadas que cumplan estándares legales y de lenguaje apropiado
- **Trigger**: Admin selecciona "Ofertas" o nueva oferta es creada por usuario público
- **Progression**: Listar ofertas → Crear/editar oferta → IA revisa contenido (lenguaje, legalidad, discriminación) → Admin aprueba → Activar → Publicar en sitio → (Opcional) Pausar o eliminar
- **Success criteria**: Ofertas activas visibles en `/ofertas-de-trabajo`; IA detecta lenguaje inapropiado o discriminatorio; ofertas expiradas se marcan automáticamente; cambios reflejados inmediatamente en frontend

### 5. Gestión de Leads y Clasificación Inteligente
- **Functionality**: Todos los leads capturados desde formularios públicos, clasificados automáticamente por IA en prioridad (low/medium/high/critical), con fuente exacta (URL), datos del usuario, y estado de seguimiento
- **Purpose**: Centralizar y priorizar automáticamente oportunidades de negocio para seguimiento efectivo
- **Trigger**: Usuario completa formulario en sitio público → Lead creado → IA clasifica
- **Progression**: Capturar lead con fuente → IA analiza urgencia, intención, sentimiento → Asignar prioridad → Mostrar en panel ordenado por prioridad → Admin actualiza estado (new/contacted/qualified/converted/lost) → Agregar notas
- **Success criteria**: Todos los leads registrados con página fuente exacta; IA asigna prioridad basada en contexto; leads críticos destacados; admin puede actualizar estado y agregar notas; total del mes visible en métricas

### 6. Sistema de Alertas IA
- **Functionality**: Alertas generadas automáticamente por IA para perfiles sospechosos, leads de alto riesgo, violaciones de contenido, detección de fraude
- **Purpose**: Identificar proactivamente problemas o riesgos sin supervisión manual constante
- **Trigger**: IA analiza nuevo contenido (profesional, oferta, lead) y detecta anomalía
- **Progression**: Contenido ingresado → IA evalúa riesgos → (Si detecta problema) Crear alerta con severidad → Mostrar en dashboard → Admin revisa → Tomar acción → Resolver alerta
- **Success criteria**: Alertas críticas visibles inmediatamente; clasificadas por severidad; vinculadas al recurso específico; admin puede resolver y registrar acción

### 7. Auditoría Completa (No Editable)
- **Functionality**: Registro inmutable de todas las acciones admin: login, aprobaciones, rechazos, cambios de configuración, con timestamp, user_id, IP, user_agent, detalles completos
- **Purpose**: Trazabilidad total para cumplimiento, seguridad, y resolución de incidencias
- **Trigger**: Cualquier acción admin en el sistema
- **Progression**: Admin ejecuta acción → Sistema captura contexto → Guardar en audit_logs → Mostrar en vista auditoría → Exportar a CSV si necesario
- **Success criteria**: Cada acción crítica registrada automáticamente; logs no editables; filtrables por usuario, acción, fecha; exportables; incluyen IP y contexto completo

### 8. Configuración del Sitio
- **Functionality**: Edición de textos legales (términos, privacidad), mensajes automáticos, parámetros IA, límites de riesgo, footer, variables de entorno para Meta Pixel, OpenAI, etc.
- **Purpose**: Administrar contenido global del sitio y configurar servicios externos sin modificar código
- **Trigger**: Admin selecciona "Configuración"
- **Progression**: Mostrar categorías (legal, contenido, IA, integraciones) → Seleccionar categoría → Editar valores → Guardar → Actualizar useKV → Reflejar cambios en sitio público inmediatamente
- **Success criteria**: Cambios en términos legales visibles en `/terminos-condiciones`; configuración Meta Pixel actualiza tracking; configuración IA ajusta umbrales de clasificación; todo registrado en audit

## Edge Case Handling

- **Sesión Expirada**: Redirigir automáticamente a login si sesión supera 8 horas o token inválido
- **Intento de Acceso no Autorizado**: Bloquear IP tras 3 intentos fallidos por 5 minutos; registrar en audit
- **Clasificación IA Falla**: Usar valores default (score: 50, label: 'medium'); registrar error pero no bloquear flujo
- **Datos Corruptos en useKV**: Validar estructura antes de renderizar; mostrar error claro si datos inválidos; permitir reset manual
- **Múltiples Admins Simultáneos**: Refrescar datos automáticamente cada 30s para evitar conflictos; mostrar última actualización
- **Alertas Duplicadas**: Deduplicar alertas por resource_id y tipo antes de mostrar
- **Lead sin Fuente**: Marcar fuente como 'unknown' pero no rechazar lead
- **Profesional sin Documentos**: Permitir crear perfil pero marcar en alerta IA para revisión manual

## Design Direction

El diseño debe evocar **profesionalismo técnico, eficiencia operativa y confianza institucional**. Inspiración en dashboards empresariales modernos (Stripe, Linear, Vercel) con información densa pero organizada, acciones rápidas, y feedback instantáneo. Paleta sobria y corporativa con acentos de alerta para prioridades.

## Color Selection

- **Primary Color**: `oklch(0.35 0.08 240)` - Azul marino profundo que comunica autoridad, confianza y profesionalismo corporativo
- **Secondary Colors**: 
  - Gris claro `oklch(0.96 0.005 240)` para fondos
  - Gris medio `oklch(0.55 0.01 240)` para texto secundario
  - Blanco `oklch(1 0 0)` para tarjetas y contraste
- **Accent Color**: `oklch(0.55 0.18 260)` - Azul vibrante para CTAs y elementos interactivos importantes
- **Alert Colors**:
  - Crítico: `oklch(0.55 0.22 25)` - Rojo intenso
  - Alto: `oklch(0.65 0.18 40)` - Naranja
  - Medio: `oklch(0.70 0.15 80)` - Amarillo
  - Bajo: `oklch(0.65 0.15 150)` - Verde azulado
- **Foreground/Background Pairings**:
  - Primary `oklch(0.35 0.08 240)`: White text `oklch(1 0 0)` - Ratio 8.5:1 ✓
  - Accent `oklch(0.55 0.18 260)`: White text `oklch(1 0 0)` - Ratio 4.8:1 ✓
  - Background `oklch(0.96 0.005 240)`: Foreground `oklch(0.15 0.02 240)` - Ratio 13.2:1 ✓
  - Critical Alert `oklch(0.55 0.22 25)`: White text `oklch(1 0 0)` - Ratio 4.9:1 ✓

## Font Selection

Tipografías que transmitan precisión técnica, legibilidad en tablas densas y jerarquía clara. Usar **IBM Plex Sans** para UI (moderna, técnica, excelente en pantalla), **JetBrains Mono** para datos técnicos (IDs, timestamps, JSON), y **Inter** como fallback.

- **Typographic Hierarchy**:
  - Page Title: IBM Plex Sans Bold / 32px / tracking -0.02em
  - Section Heading: IBM Plex Sans Semibold / 20px / tracking -0.01em
  - Card Title: IBM Plex Sans Medium / 16px / tracking 0
  - Body Text: IBM Plex Sans Regular / 14px / line-height 1.6
  - Data/Metrics: JetBrains Mono Medium / 24px / tabular-nums
  - Table Text: IBM Plex Sans Regular / 13px / line-height 1.4
  - Labels: IBM Plex Sans Medium / 12px / uppercase / tracking 0.05em

## Animations

Animaciones mínimas y funcionales que refuercen acciones sin distraer. Transiciones suaves (200ms ease-out) para cambios de estado, feedback inmediato en botones (scale down al click), carga con skeleton screens en lugar de spinners, y animaciones de entrada sutil (fade + translate) para alertas y notificaciones.

## Component Selection

- **Components**:
  - `Sidebar` para navegación principal con iconos (Home, Users, Briefcase, Target, Bell, FileText, Settings)
  - `Card` para KPIs con títulos, métricas grandes y badges de cambio
  - `Table` para listas de profesionales, ofertas, leads con sorting y paginación
  - `Dialog` para detalles completos, aprobación/rechazo, edición
  - `Badge` para estados (pending/approved/rejected), prioridades, severidades
  - `Button` (primary para aprobar, destructive para rechazar, ghost para acciones secundarias)
  - `Select` y `Input` para filtros y búsquedas
  - `Tabs` para categorías en configuración
  - `Alert` para mostrar alertas IA en dashboard
  - `Tooltip` para info adicional sin saturar UI
  - `Sheet` para paneles laterales de edición rápida

- **Customizations**:
  - Tabla custom con row hover, selección múltiple, acciones en línea
  - Badge custom con dot indicator para severidades
  - Card metric con sparkline si hay datos históricos
  - Filtro avanzado component para búsquedas complejas

- **States**:
  - Buttons: Default (solid), Hover (lift shadow), Active (scale 0.98), Disabled (opacity 0.5)
  - Table rows: Default, Hover (bg-accent/5), Selected (bg-accent/10), Loading (skeleton)
  - Alerts: Unresolved (bold border), Resolved (muted + strikethrough)

- **Icon Selection**:
  - Home: `House`
  - Profesionales: `UserCircle`
  - Ofertas: `Briefcase`
  - Leads: `Target`
  - Alertas: `Bell` (con badge si unresolved)
  - Auditoría: `FileText`
  - Configuración: `Gear`
  - Aprobar: `Check`
  - Rechazar: `X`
  - Ver detalles: `Eye`
  - Editar: `PencilSimple`
  - Eliminar: `Trash`
  - IA: `BrainCircuit` (Lucide) o `Robot`

- **Spacing**: Usar escala Tailwind consistente - gap-4 en grids, p-6 en cards, space-y-6 entre secciones, p-4 en sidebar items

- **Mobile**: Sidebar colapsa a bottom navigation en <768px; tabla se convierte en cards stacked; métricas en 2 columnas; acciones en dropdown menu en lugar de inline buttons
