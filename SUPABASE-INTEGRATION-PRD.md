# Supabase Integration Enhancement - PRD

Plataforma integral de gestión de base de datos, almacenamiento y autenticación para Hogar Belén con tablas adicionales (citas, profesionales, suscripciones), integración de Supabase Storage para archivos multimedia, y flujos completos de autenticación por correo electrónico con restablecimiento de contraseña.

**Experience Qualities**: 
1. **Seguro** - Implementación robusta de autenticación y políticas de seguridad RLS que protegen los datos sensibles
2. **Fluido** - Gestión transparente de archivos, citas y datos con feedback inmediato y validaciones inteligentes
3. **Confiable** - Sistema de recuperación de contraseñas y gestión de sesiones que garantiza acceso continuo

**Complexity Level**: Complex Application - Sistema completo de backend-as-a-service con múltiples tablas relacionales, storage buckets, políticas de seguridad granulares, y flujos de autenticación avanzados.

## Essential Features

### 1. Enhanced Database Schema
- **Functionality**: Tablas adicionales para appointments (citas), professionals (perfiles profesionales extendidos), subscriptions (suscripciones de planes)
- **Purpose**: Permitir la gestión completa del ciclo de vida de servicios y relaciones usuario-profesional
- **Trigger**: Migración automática al inicializar la aplicación
- **Progression**: Definir schema SQL → Ejecutar migraciones → Crear índices → Configurar RLS policies → Validar integridad referencial
- **Success criteria**: Todas las tablas creadas con políticas RLS activas, relaciones foráneas funcionando, índices optimizados

### 2. Supabase Storage Integration
- **Functionality**: Buckets para profile_images, professional_documents, appointment_files con upload/download/delete capabilities
- **Purpose**: Almacenar de forma segura fotos de perfil, certificados profesionales, y documentos relacionados con citas
- **Trigger**: Usuario sube archivo desde formulario de perfil o gestión de documentos
- **Progression**: Seleccionar archivo → Validar tipo/tamaño → Comprimir si es imagen → Upload a bucket → Actualizar URL en DB → Mostrar preview
- **Success criteria**: Archivos se suben correctamente, URLs públicas/privadas funcionan, eliminación cascada al borrar registros

### 3. Email Authentication Flow
- **Functionality**: Registro y login con email/password, verificación de email, confirmación de cuenta
- **Purpose**: Proporcionar método de autenticación estándar y seguro con verificación de identidad
- **Trigger**: Usuario completa formulario de registro o inicia sesión
- **Progression**: Ingresar email/password → Validar formato → Enviar a Supabase Auth → Enviar email verificación → Usuario confirma → Redirigir a dashboard
- **Success criteria**: Emails de verificación llegan en <30s, links funcionan, usuarios no pueden acceder sin confirmar email

### 4. Password Reset Flow
- **Functionality**: Solicitud de restablecimiento, email con link seguro, formulario de nueva contraseña
- **Purpose**: Permitir recuperación de cuenta en caso de olvido de contraseña
- **Trigger**: Usuario hace clic en "Olvidé mi contraseña"
- **Progression**: Ingresar email → Enviar solicitud → Recibir email con link → Hacer clic → Formulario nueva contraseña → Confirmar cambio → Login automático
- **Success criteria**: Email llega en <60s, link expira en 1 hora, contraseña se actualiza correctamente

### 5. Appointments Management
- **Functionality**: CRUD completo de citas entre familias y profesionales con estados y notificaciones
- **Purpose**: Gestionar el calendario de servicios y coordinación entre usuarios
- **Trigger**: Familia solicita cita con profesional o profesional actualiza disponibilidad
- **Progression**: Seleccionar profesional → Elegir fecha/hora → Agregar notas → Crear cita → Notificar partes → Confirmar/Rechazar → Completar servicio
- **Success criteria**: Citas se crean sin conflictos de horario, notificaciones funcionan, estados se actualizan correctamente

### 6. Professional Profiles Extended
- **Functionality**: Perfiles completos con certificaciones, disponibilidad, tarifas, documentos de verificación
- **Purpose**: Proporcionar información detallada para que familias tomen decisiones informadas
- **Trigger**: Profesional completa registro o actualiza perfil
- **Progression**: Completar datos básicos → Subir documentos → IA valida info → Admin aprueba → Perfil visible públicamente → Recibe solicitudes
- **Success criteria**: Documentos se almacenan de forma segura, validación IA funciona, aprobación admin es requerida

### 7. Subscriptions System
- **Functionality**: Gestión de planes (Amigos, Sol y Café, Sonreír), estados, renovaciones
- **Purpose**: Controlar acceso a funcionalidades premium y servicios según plan contratado
- **Trigger**: Usuario selecciona plan o se vence suscripción actual
- **Progression**: Elegir plan → Procesar pago → Crear suscripción → Activar funcionalidades → Notificar antes de vencimiento → Renovar/Cancelar
- **Success criteria**: Estados de suscripción actualizados en tiempo real, acceso controlado por plan, notificaciones de vencimiento

## Edge Case Handling

- **Upload Failures**: Reintentos automáticos con exponential backoff, cancelación manual disponible
- **Duplicate Appointments**: Validación de conflictos de horario antes de crear cita
- **Expired Sessions**: Refresh token automático, redirección a login con mensaje claro
- **Email Not Received**: Link para reenviar email de verificación/restablecimiento
- **Storage Quota**: Validación de límites por usuario, compresión automática de imágenes
- **Offline Operations**: Queue de operaciones pendientes con sync al reconectar
- **Concurrent Updates**: Optimistic locking con resolución de conflictos
- **Invalid File Types**: Validación frontend y backend con mensajes específicos

## Design Direction

Interfaz profesional y confiable que inspira seguridad y transparencia. Visualizaciones claras del estado de autenticación, progreso de uploads, y gestión de datos. Diseño que comunica seriedad médica/profesional mientras mantiene calidez y accesibilidad.

## Color Selection

Paleta que refuerza confianza y profesionalismo médico con toques cálidos de cuidado.

- **Primary Color**: `oklch(0.55 0.15 200)` (Azul médico confiable) - Comunicates authority and healthcare professionalism
- **Secondary Colors**: `oklch(0.92 0.08 200)` (Azul claro suave) para fondos de cards y secciones secundarias
- **Accent Color**: `oklch(0.70 0.18 160)` (Verde esmeralda vibrante) para CTAs, confirmaciones, éxitos
- **Foreground/Background Pairings**: 
  - Background (Light): `oklch(0.98 0.01 180)` with Foreground `oklch(0.15 0.02 240)` - Ratio 14.2:1 ✓
  - Primary: White text `oklch(0.98 0.01 180)` - Ratio 5.8:1 ✓
  - Accent: Dark text `oklch(0.15 0.02 240)` - Ratio 6.2:1 ✓

## Font Selection

Tipografía moderna y legible que proyecta profesionalismo tecnológico con claridad médica.

- **Primary**: Inter (Sans-serif moderno, excelente legibilidad en UI, amplio rango de pesos)
- **Secondary**: JetBrains Mono (Para códigos de verificación, IDs, datos técnicos)

- **Typographic Hierarchy**:
  - H1 (Page Titles): Inter Bold/32px/tight letter-spacing for section headers
  - H2 (Section Headers): Inter SemiBold/24px/normal spacing
  - H3 (Card Headers): Inter Medium/18px/normal spacing
  - Body (Content): Inter Regular/16px/1.6 line-height
  - Small (Metadata): Inter Regular/14px/muted color for timestamps, helper text
  - Code (Technical): JetBrains Mono Medium/14px for verification codes, IDs

## Animations

Transiciones suaves que comunican estado y progreso sin distraer, enfocadas en feedback de operaciones asíncronas.

- Upload progress: Linear progress bar con pulse animation
- Authentication: Fade transitions entre formularios (300ms ease-out)
- Success states: Gentle scale + fade para checkmarks (400ms spring)
- Loading states: Skeleton screens con shimmer effect
- Form validation: Slide-down error messages (200ms ease-in-out)
- File previews: Smooth fade-in al cargar thumbnails

## Component Selection

- **Components**: 
  - Form (react-hook-form integration) para todos los formularios de auth y registro
  - Input con validación visual inmediata para email/password
  - Button con loading states para operaciones asíncronas
  - Card para organizar secciones de perfil, documentos, citas
  - Alert para errores de autenticación y notificaciones
  - Progress para uploads de archivos
  - Avatar para fotos de perfil con fallback
  - Calendar para selección de fechas de citas
  - Select para filtros de profesionales y estados
  - Tabs para organizar secciones de perfil (Info, Documentos, Citas, Suscripción)
  - Dialog para confirmaciones de eliminación y operaciones críticas
  - Badge para estados de verificación, suscripción, citas
  - Skeleton para loading states de listas
  - toast (sonner) para feedback de operaciones exitosas/fallidas

- **Customizations**: 
  - FileUpload component custom con drag-and-drop, preview, y progress
  - AuthGuard wrapper para proteger rutas según autenticación y rol
  - SubscriptionGate para limitar funcionalidades por plan

- **States**: 
  - Buttons: default/hover con scale(1.02)/loading con spinner/disabled con opacity
  - Inputs: focus con ring accent, error con border destructive, success con checkmark
  - Upload area: idle/hover con highlight/dragging con dashed border/uploading con progress

- **Icon Selection**: 
  - Upload: CloudArrowUp
  - Download: Download
  - Delete: Trash
  - Email: Envelope
  - Lock: Lock
  - Check: CheckCircle
  - Calendar: Calendar
  - User: User
  - Document: FileText

- **Spacing**: 
  - Form fields: gap-4 vertical spacing
  - Card content: p-6
  - Section margins: mb-8
  - Grid gaps: gap-6 for cards grid

- **Mobile**: 
  - Formularios full-width con inputs larger touch targets (h-12)
  - Upload área simplificada sin drag-and-drop, botón directo
  - Tabs horizontales scroll en mobile
  - Cards stack vertically con gap-4
  - Fixed bottom action buttons para formularios largos
