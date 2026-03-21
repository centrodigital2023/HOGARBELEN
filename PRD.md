# Planning Guide - Hogar Belén

Centro de Vida para Adultos Mayores en Buesaco, Nariño, con plataforma digital integral que conecta familias, profesionales de salud y servicios de cuidado residencial.

**Experience Qualities**:
1. **Confiable y Transparente** - Cada profesional es verificado con IA, documentación validada y check azul de confianza visible para las familias.
2. **Cálido y Humano** - El diseño evoca calidez hogareña, con lenguaje cercano y empatía en cada interacción, sin perder profesionalismo.
3. **Inteligente y Eficiente** - IA integrada para clasificar leads, validar profesionales, recomendar servicios y optimizar la experiencia del usuario.

**Complexity Level**: Complex Application (advanced functionality, likely with multiple views)
- Aplicación compleja que integra múltiples roles (familias, profesionales, administrador), sistema de autenticación, base de datos Supabase, validación IA, panel administrativo completo, gestión de citas, suscripciones, códigos promocionales, y sincronización en tiempo real.

## Essential Features

### 1. Sistema de Autenticación Multi-Rol
- **Functionality**: Login/registro diferenciado para familias, profesionales y super administrador
- **Purpose**: Seguridad y experiencia personalizada según el tipo de usuario
- **Trigger**: Clic en "Ingresar" o "Registrarse" en navegación
### 2. Registro Inteligente de Profesionales
- **Purpose**: Captar profesionales verificados y confiables para las familias


- **Functionality**: Dashboard completo con métricas en tiempo real, gestión de profesionales, ofertas, lea
- **Trigger**: Admin inicia sesión con credenciales (josefabian1212@gmail.com 
- **Success criteria**: Admin ve métricas actualizadas, puede aprobar/rechaz
### 4. Clasificación de Leads con IA
- **Purpose**: Identificar urgencias y oportunidades de alta conversión automáticamente


- **Functionality**: Directorio público con filtros por especialidad, ciudad, tarifa, disponibilidad
- **Trigger**: Familias acceden a "Profesionales" en navegación
- **Success criteria**: Familias encuentran profesionales verificados, pueden filtrar y contactar fácilme
### 6. Sistema de Citas y Reservas
- **Purpose**: Facilitar la coordinación entre familias y profesionales


- **Functionality**: Sistema inteligente que analiza y prioriza contactos entrantes
- **Purpose**: Identificar urgencias y oportunidades de alta conversión automáticamente
- **Trigger**: Usuario envía formulario de contacto en cualquier página
- **Progression**: Captura de datos → Análisis IA (tipo usuario, urgencia, prioridad) → Clasificación automática → Alerta admin si es urgente → Visible en panel de leads
- **Success criteria**: Lead clasificado correctamente, urgentes destacados, admin puede filtrar y gestionar

### 5. Búsqueda y Filtrado de Profesionales
- **Functionality**: Directorio público con filtros por especialidad, ciudad, tarifa, disponibilidad
- **Purpose**: Ayudar a familias a encontrar el profesional ideal rápidamente
- **Trigger**: Familias acceden a "Profesionales" en navegación
- **Progression**: Vista de grid/lista de profesionales → Filtros aplicados → Resultados actualizados → Clic en perfil → Detalle completo → Reservar servicio
- **Success criteria**: Familias encuentran profesionales verificados, pueden filtrar y contactar fácilmente

### 6. Sistema de Citas y Reservas
- **Functionality**: Agendar servicios con profesionales con calendario integrado
- **Purpose**: Facilitar la coordinación entre familias y profesionales
- **Trigger**: Familia selecciona profesional y clic en "Reservar"
- **Progression**: Selección de fecha/hora → Confirmación de detalles → Pago (si aplica) → Notificación a profesional → Estado de cita actualizado
- **Success criteria**: Cita creada, ambas partes notificadas, visible en dashboards respectivos

### 7. Planes de Suscripción y Pagos
- **Functionality**: Gestión de planes residenciales (Habitación compartida $1.850.000, Individual $2.250.000)
- **Purpose**: Facilitar contratación de servicios residenciales
- **Trigger**: Usuario en página de Planes → Clic en "Contratar"
- **Progression**: Selección de plan → Aplicar código promo (opcional) → Datos de pago → Confirmación → Suscripción activa → Dashboard actualizado
- **Success criteria**: Usuario puede contratar, código promo aplicado correctamente, estado de suscripción visible

### 8. Códigos Promocionales
- **Functionality**: Sistema de descuentos con validación y límites
- **Purpose**: Incentivar contratación y fidelización
- **Trigger**: Usuario ingresa código en checkout
- **Progression**: Ingreso de código → Validación (activo, vigente, usos disponibles) → Aplicación de descuento → Precio final actualizado
- **Success criteria**: Descuento aplicado correctamente, uso registrado, límites respetados

### 9. Asistente IA de Cuidado
- **Functionality**: Chat inteligente que recomienda servicios personalizados
- **Errores de red**: Reintentos automáticos con exponential backoff,
## Design Direction
El diseño debe evocar **calidez familiar** combinada con **confianza profesional**. Sentimientos objetivo:
- **Calidez**: "Este lugar se siente como un hogar"

## Color Selection
**Paleta basada en calidez, naturaleza y confianza:**
- **Primary Color**: `oklch(0.205 0 0)` - Gris oscuro casi negro
  - Usado en encabezados, textos principales, elementos estructurales
- **Secondary Colors**:
  - Para fondos de secciones, tarjetas, áreas de descanso visual

  - Evoca calidez hum


  - Leads urgentes, acciones destructivas, alertas críticas
**Foreground/Background Pairings**:
- Primary `oklch(0.205 0 0)` + Primary Foreground `oklch(0.985 0 0)` - Ratio 16.8:1 ✓ WCAG AAA
- Destructive `oklch(0.577 0.245 27.325)` + White text - Ratio 5.2:1 ✓ WCAG AA
## Font Selection
Tipografías que transmiten **profesionalismo cálido** y **accesibilidad moderna**:
- **Primary Font**: **Inter** (Sans-serif)



  - Crea contraste visual memorable
**Typographic Hierarchy**:
- **H2 (Section Titles)**: Inter Bold / 32-40px / l
- **Body Text**: Inter Regular / 16px / line-height 1.6 / lett
- **Captions**: Inter Medium / 12px / line-height 1.4 / letter-spacin

Animaciones **suti

- **Button Interaction**: Scale 0.98 al presionar, co

- **Scroll Reveals**: Fade + slide up elements (400ms) al entrar



- **Card**: Perfiles de
- **Input + Label**: Formularios de registro
- **Dialog**: Modales de confirmación (aprobar/rechazar profesio
- 
- **Toast (Sonner)**: Notificaciones no intrusivas (registro exitoso, ci
- **Separator**: Divisiones visuales en secciones largas
- **Table**: Vista tabular de datos admin (

**Customizations Necesarias**:
- **Tarjeta de Profesional**: Card con avatar grande, especialidad, tarifa,

**Estados de Componentes**:
- **Inputs**: Default, Focus (ring outline), Error (red bor

- **Shield**: Verificación, segurid
- **Users**: Profesionales, equipo
- **Home**: Centro residencial
- **ChartLine**: Métricas, analytics
- **CheckCircle**: Aprobaciones, éxito

- Padding interno



- **Cards**: Grid → 1 columna en mobile, 2
- **Tabs**: Scroll horizontal en mobile, full horizontal
- **Tables**: ScrollArea horizontal en mobi
## Technical Implementation Notes

- JWT tokens con auto-refresh
- Roles: `family`, `professional`, `admin`

Tablas principales:

- `subscriptions`: Planes 
- `leads`: Contactos capturados
- `admin_actions`: Auditoría completa del sistema

Funciones implementadas en `/src/lib/aiService.ts`:
- `validateProfessionalProfile()`: Detecta inconsistencias en documentos
- `validateJobOffer()`: Previene spam y ofertas fraudulentas

- Hooks perso

- Meta tags dinámicos por página (componente `SEOHead`)

- Lazy loading de rutas con React.lazy()

- Lazy loading de páginas principales
- Debouncing en búsquedas (300ms)
- Memoización de componentes pesados (React.memo)


**Domain**: hogarbelen.org

VITE_SUPABASE_ANON_KEY=eyJhbGciOiJI... (configurar en Vercel)

- URL directa: `hogarb

## Success Metrics
**Business Goals**:
- 200+ leads capturados mensualmente
- 10+ suscripciones residenciales en trimestre
**Technical Goals**:
- Uptime >99.5%
- Clasificación IA correcta >90%
**User Experience Goals**:
- Abandono en formularios <30%
- Retorno de usuarios >25%
































































































































