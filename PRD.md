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
- **Progression**: Selección de rol → Formulario de registro → Validación email → Acceso al dashboard correspondiente → Persistencia de sesión
- **Success criteria**: Usuario puede autenticarse, mantener sesión entre recargas, y acceder a funciones según su rol

### 2. Registro Inteligente de Profesionales
- **Functionality**: Formulario multi-paso con validación IA, carga de documentos, y estado de verificación
- **Purpose**: Captar profesionales verificados y confiables para las familias
- **Trigger**: Clic en "Para Profesionales" → "Registrarse como Profesional"
- **Progression**: Datos personales → Documentos (cédula, hoja de vida, antecedentes) → Validación IA automática → Estado pendiente → Revisión admin → Aprobación con check azul → Visible en directorio público
- **Success criteria**: Profesional completa formulario, IA valida coherencia, admin aprueba/rechaza, perfil aparece en búsquedas

### 3. Panel de Super Administración
- **Functionality**: Dashboard completo con métricas en tiempo real, gestión de profesionales, ofertas, leads y auditoría
- **Purpose**: Control total del sistema con trazabilidad y toma de decisiones informadas
- **Trigger**: Admin inicia sesión con credenciales (josefabian1212@gmail.com / @Sara2918+ / 2FA: 123012)
- **Progression**: Login → Verificación 2FA → Dashboard con KPIs → Gestión por módulos (profesionales/ofertas/leads/contenido/IA/auditoría) → Acciones registradas en log de auditoría
- **Success criteria**: Admin ve métricas actualizadas, puede aprobar/rechazar perfiles, todas las acciones quedan registradas

### 4. Clasificación de Leads con IA
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
- **Purpose**: Guiar familias sin experiencia en selección de cuidado
- **Trigger**: Clic en "Asistente IA" desde cualquier página
- **Progression**: Preguntas sobre necesidades → Análisis IA → Recomendaciones personalizadas → Opciones de profesionales/servicios → Contacto directo
- **Success criteria**: Recomendaciones relevantes, usuario satisfecho, conversión a lead o contratación

### 10. Notificaciones en Tiempo Real
- **Functionality**: Alertas instantáneas para admins y usuarios
- **Purpose**: Mantener informados a todos los actores del sistema
- **Trigger**: Evento relevante (nuevo lead urgente, profesional registrado, cita próxima, pago recibido)
- **Progression**: Evento → Evaluación IA (urgencia) → Notificación push/email → Usuario ve alerta → Toma acción
- **Success criteria**: Notificaciones entregadas en <5 segundos, sin falsos positivos, no intrusivas

## Edge Case Handling

- **Profesional duplicado**: Validar email único, si ya existe sugerir recuperación de cuenta
- **Documentos ilegibles**: IA solicita resubida con mensaje específico, admin puede aprobar manualmente
- **Pago fallido**: Reintento automático, notificación al usuario, gracia de 48h antes de suspender servicio
- **Lead spam**: IA detecta patrones (emails temporales, texto incoherente, datos falsos) y marca para revisión
- **Cita conflicto de horario**: Sistema previene doble reserva, sugiere horarios alternativos cercanos
- **Sesión expirada**: Auto-refresco de token, si falla redirige a login guardando última ubicación
- **Admin ausente**: Escalación automática de leads urgentes por email/SMS tras 30 minutos sin respuesta
- **Errores de red**: Reintentos automáticos con exponential backoff, mensajes claros al usuario

## Design Direction

El diseño debe evocar **calidez familiar** combinada con **confianza profesional**. Sentimientos objetivo:
- **Seguridad**: "Mis seres queridos están en buenas manos"
- **Calidez**: "Este lugar se siente como un hogar"
- **Modernidad**: "Usan tecnología avanzada para cuidar mejor"
- **Transparencia**: "Puedo confiar en que todo es verificado y real"

## Color Selection

**Paleta basada en calidez, naturaleza y confianza:**

- **Primary Color**: `oklch(0.205 0 0)` - Gris oscuro casi negro
  - Comunica seriedad, profesionalismo y fundamento sólido
  - Usado en encabezados, textos principales, elementos estructurales

- **Secondary Colors**:
  - `oklch(0.97 0 0)` - Gris muy claro suave
  - Para fondos de secciones, tarjetas, áreas de descanso visual
  
- **Accent Color**: `oklch(0.646 0.222 41.116)` - Naranja cálido terroso
  - CTAs principales, badges de verificación, alertas importantes
  - Evoca calidez humana y energía positiva

- **Success/Verification**: `oklch(0.6 0.118 184.704)` - Verde azulado suave
  - Check azul de verificación, estados aprobados, notificaciones positivas

- **Warning/Urgent**: `oklch(0.577 0.245 27.325)` - Rojo suave no agresivo
  - Leads urgentes, acciones destructivas, alertas críticas

**Foreground/Background Pairings**:
- Background `oklch(1 0 0)` (blanco) + Foreground `oklch(0.145 0 0)` (negro suave) - Ratio 18.2:1 ✓ WCAG AAA
- Primary `oklch(0.205 0 0)` + Primary Foreground `oklch(0.985 0 0)` - Ratio 16.8:1 ✓ WCAG AAA
- Accent `oklch(0.646 0.222 41.116)` + White text - Ratio 4.9:1 ✓ WCAG AA
- Destructive `oklch(0.577 0.245 27.325)` + White text - Ratio 5.2:1 ✓ WCAG AA

## Font Selection

Tipografías que transmiten **profesionalismo cálido** y **accesibilidad moderna**:

- **Primary Font**: **Inter** (Sans-serif)
  - Altamente legible, moderna, profesional sin ser fría
  - Variable font para optimización de peso
  - Usada para UI, navegación, formularios, botones

- **Secondary Font**: **Playfair Display** (Serif)
  - Elegante y con personalidad, pero no anticuada
  - Solo para títulos principales (h1, hero sections)
  - Crea contraste visual memorable

**Typographic Hierarchy**:
- **H1 (Hero Titles)**: Playfair Display Bold / 48-64px / line-height 1.1 / letter-spacing -1px
- **H2 (Section Titles)**: Inter Bold / 32-40px / line-height 1.2 / letter-spacing -0.5px
- **H3 (Subsection Titles)**: Inter Semibold / 24-28px / line-height 1.3 / letter-spacing normal
- **Body Text**: Inter Regular / 16px / line-height 1.6 / letter-spacing normal
- **Small Text**: Inter Regular / 14px / line-height 1.5 / letter-spacing 0.1px
- **Captions**: Inter Medium / 12px / line-height 1.4 / letter-spacing 0.2px / uppercase

## Animations

Animaciones **sutiles y funcionales**, que mejoran UX sin distraer:

- **Page Transitions**: Fade in suave (300ms) al cambiar de página
- **Card Hover**: Elevación sutil con sombra (200ms ease-out), escala 1.02
- **Button Interaction**: Scale 0.98 al presionar, color shift suave en hover (150ms)
- **Form Validation**: Shake animation (400ms) en error, checkmark animado en éxito
- **Notifications**: Slide in desde arriba (300ms ease-out), auto-dismiss con progress bar
- **Loading States**: Spinner con gradiente rotativo, skeleton screens para contenido
- **Scroll Reveals**: Fade + slide up elements (400ms) al entrar en viewport (Intersection Observer)
- **Metric Counters**: Count-up animation en números del dashboard (1000ms ease-out)

**Principio**: Animaciones como **feedback visual**, no como decoración. Todo debe tener propósito funcional.

## Component Selection

**Shadcn Components (pre-instalados v4)**:
- **Card**: Perfiles de profesionales, métricas de dashboard, planes de suscripción
- **Button**: Todas las acciones (primary, secondary, outline, ghost variants)
- **Input + Label**: Formularios de registro, login, búsqueda
- **Select**: Filtros de especialidad, ciudad, categoría
- **Dialog**: Modales de confirmación (aprobar/rechazar profesional), detalles ampliados
- **Tabs**: Navegación en dashboard admin (profesionales/ofertas/leads/auditoría)
- **Badge**: Verificación azul, estados (pendiente/aprobado/rechazado), urgencia de leads
- **Alert**: Mensajes de error/éxito, info contextual
- **Toast (Sonner)**: Notificaciones no intrusivas (registro exitoso, cita creada, error de red)
- **Avatar**: Fotos de profesionales, usuario en navegación
- **Separator**: Divisiones visuales en secciones largas
- **ScrollArea**: Listas largas de profesionales, logs de auditoría
- **Table**: Vista tabular de datos admin (leads, suscripciones)
- **Calendar**: Selector de fechas en reservas de citas
- **Progress**: Barra de progreso en formularios multi-paso

**Customizations Necesarias**:
- **Check Azul Verificado**: Badge personalizado con ícono de checkmark + "Verificado" + tooltip explicativo
- **Tarjeta de Profesional**: Card con avatar grande, especialidad, tarifa, rating, badges, CTA destacado
- **Dashboard Metric Card**: Card con ícono grande, número animado, descripción, trend indicator
- **IA Status Indicator**: Badge animado con gradiente que indica "Analizando..." vs "Aprobado por IA"

**Estados de Componentes**:
- **Buttons**: Default, Hover (color shift + escala), Active (pressed scale), Disabled (opacity 50% + cursor not-allowed), Loading (spinner)
- **Inputs**: Default, Focus (ring outline), Error (red border + shake), Success (green border + checkmark), Disabled
- **Cards**: Default, Hover (elevación), Selected (border accent), Loading (skeleton)

**Icon Selection (Phosphor Icons)**:
- **Shield**: Verificación, seguridad, admin
- **Heart**: Cuidado, familias, bienestar
- **Users**: Profesionales, equipo
- **Briefcase**: Ofertas de trabajo
- **Home**: Centro residencial
- **Calendar**: Citas, disponibilidad
- **ChartLine**: Métricas, analytics
- **Warning**: Alertas urgentes
- **CheckCircle**: Aprobaciones, éxito
- **XCircle**: Rechazos, errores

**Spacing (Tailwind Scale)**:
- Padding interno de cards: `p-6` (24px)
- Gap entre elementos relacionados: `gap-4` (16px)
- Separación de secciones: `mb-12` (48px)
- Margen de contenedor principal: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`

**Mobile Responsiveness**:
- **Breakpoints**: Mobile-first con progressive enhancement (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)
- **Navigation**: Hamburger menu en mobile con slide-in lateral
- **Cards**: Grid → 1 columna en mobile, 2 en tablet, 3-4 en desktop
- **Forms**: Inputs full-width en mobile, multi-columna en desktop
- **Tabs**: Scroll horizontal en mobile, full horizontal en desktop
- **Dashboard**: Métricas en cards stackeadas mobile, grid 2x2 o 3x3 desktop
- **Tables**: ScrollArea horizontal en mobile, tabla completa en desktop

## Technical Implementation Notes

### Authentication & Authorization
- Supabase Auth con email/password
- JWT tokens con auto-refresh
- Row Level Security (RLS) en todas las tablas
- Roles: `family`, `professional`, `admin`
- Admin access: 2FA obligatorio (código fijo 123012 para demo)

### Database (Supabase PostgreSQL)
Tablas principales:
- `profiles`: Usuarios base (familias, profesionales)
- `professional_profiles`: Datos extendidos de profesionales + documentos
- `appointments`: Citas y reservas
- `subscriptions`: Planes contratados
- `promo_codes`: Códigos de descuento
- `leads`: Contactos capturados
- `job_offers`: Ofertas de empleo publicadas
- `admin_actions`: Auditoría completa del sistema
- `reviews`: Calificaciones y reseñas

### AI Integration (OpenAI GPT-4)
Funciones implementadas en `/src/lib/aiService.ts`:
- `analyzeUserInteraction()`: Clasifica tipo de usuario y urgencia
- `validateProfessionalProfile()`: Detecta inconsistencias en documentos
- `classifyLead()`: Prioriza leads automáticamente
- `validateJobOffer()`: Previene spam y ofertas fraudulentas

### Real-time Sync
- Supabase Realtime para updates instantáneos
- Hooks personalizados: `useRealtimeSync`, `useProfessionalsSync`, `useMessagesSync`
- Notificaciones push cuando admin está online

### SEO Optimization
- Meta tags dinámicos por página (componente `SEOHead`)
- Sitemap.xml generado con todas las URLs
- Robots.txt configurado
- Structured data (JSON-LD) para profesionales y servicios
- Lazy loading de rutas con React.lazy()
- Image optimization con vite-imagetools

### Performance
- Lazy loading de páginas principales
- Prefetch de datos críticos
- Debouncing en búsquedas (300ms)
- Virtualización de listas largas (react-window si >100 items)
- Memoización de componentes pesados (React.memo)
- Bundle splitting por ruta

## Deployment & Production

**Hosting**: Vercel
**Domain**: hogarbelen.org
**Environment Variables**:
```
VITE_SUPABASE_URL=https://ipkybflzcxirkrocqayp.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJI... (configurar en Vercel)
```

**Admin Access en Producción**:
- URL directa: `hogarbelen.org/admin-login` (crear ruta oculta)
- O desde footer: enlace discreto "Acceso Administrativo"
- Credenciales: josefabian1212@gmail.com / @Sara2918+ / 2FA: 123012

## Success Metrics

**Business Goals**:
- 50+ profesionales verificados en primer mes
- 200+ leads capturados mensualmente
- Tasa de conversión lead→contratación: >15%
- 10+ suscripciones residenciales en trimestre

**Technical Goals**:
- Tiempo de carga <2 segundos (LCP)
- Uptime >99.5%
- Zero downtime en deploys
- Clasificación IA correcta >90%

**User Experience Goals**:
- NPS (Net Promoter Score) >40
- Abandono en formularios <30%
- Tiempo promedio en sitio >3 minutos
- Retorno de usuarios >25%
