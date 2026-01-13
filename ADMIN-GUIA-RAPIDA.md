# 🔐 Acceso Rápido al Panel de Administración - Hogar Belén

## Credenciales de Acceso

**URL de Acceso**: La aplicación redirige automáticamente. Alternativamente, puede acceder via el botón en el footer del sitio.

**Email**: `josefabian1212@gmail.com`  
**Contraseña**: `@Sara2918+`  
**Código 2FA**: `123012`

## Características Implementadas ✅

### 1. Autenticación Segura
- ✅ Login con email y contraseña
- ✅ Autenticación de doble factor (2FA) con código estático
- ✅ Bloqueo automático tras 3 intentos fallidos (5 minutos)
- ✅ Sesiones con expiración de 8 horas
- ✅ Registro completo de auditoría de accesos

### 2. Dashboard con Métricas Reales
- ✅ Total de profesionales registrados
- ✅ Profesionales pendientes de aprobación
- ✅ Ofertas de trabajo activas
- ✅ Total de leads y leads del mes actual
- ✅ Alertas de IA sin resolver
- ✅ Acceso rápido a todos los módulos

### 3. Gestión de Profesionales con IA
- ✅ Lista completa de profesionales con filtros (todos/pendientes/aprobados/rechazados)
- ✅ Búsqueda por nombre, email o título
- ✅ Análisis inteligente con IA para cada profesional:
  - Puntuación de completitud del perfil
  - Puntuación de credibilidad
  - Nivel de riesgo (bajo/medio/alto)
  - Red flags automáticas
  - Recomendación de IA (aprobar/revisar/rechazar)
  - Nivel de confianza
- ✅ Aprobación con un clic
- ✅ Rechazo con motivo personalizado
- ✅ Generación automática de alertas para perfiles sospechosos

### 4. Gestión de Leads Inteligente
- ✅ Todos los leads del formulario de contacto aparecen automáticamente
- ✅ Clasificación automática por IA:
  - Prioridad (crítica/alta/media/baja)
  - Intención (reserva/emergencia/información/queja)
  - Sentimiento (positivo/neutral/negativo)
  - Urgencia (urgente/alta/media/baja)
- ✅ Filtros por prioridad y estado
- ✅ Búsqueda por nombre, email o mensaje
- ✅ Actualización de estado (nuevo/contactado/calificado/convertido/perdido)
- ✅ Sistema de notas internas
- ✅ Asignación automática al admin que gestiona el lead
- ✅ Métricas de conversión en tiempo real

### 5. Gestión de Ofertas de Trabajo
- ✅ Vista de todas las ofertas activas
- ✅ Tracking de vistas por oferta
- ✅ Ofertas con análisis IA de calidad y conformidad legal
- ✅ Sistema de expiración automática

### 6. Sistema de Auditoría Completo
- ✅ Registro de todos los logins (exitosos y fallidos)
- ✅ Registro de aprobaciones y rechazos de profesionales
- ✅ Registro de cambios de estado de leads
- ✅ Información de IP, user agent y timestamp
- ✅ Trazabilidad completa de acciones administrativas

## Datos de Demostración Incluidos 📊

### Profesionales (5 registros)
- **3 Pendientes de Aprobación**:
  1. María Fernanda Gómez - Enfermera Geriátrica (perfil completo)
  2. Ana Lucía Torres - Cuidadora (con alertas IA - perfil incompleto)
  3. Sofía Mendoza - Terapeuta Ocupacional (nuevo registro)

- **2 Aprobados**:
  1. Carlos Andrés Muñoz - Fisioterapeuta (score IA: 87%)
  2. Dr. Jorge Luis Martínez - Médico Geriatra (score IA: 95%)

### Leads (6 registros)
- **2 Nuevos** (requieren atención):
  1. Patricia González - Prioridad ALTA - Necesita info urgente centro de día
  2. Andrés Castillo - Prioridad BAJA - Consulta de precios

- **2 Contactados**:
  1. Roberto Jiménez - Interesado en turismo rural
  2. Carmen Rodríguez - PRIORIDAD CRÍTICA - Emergencia enfermería (ya atendida)

- **1 Calificado**:
  1. Luisa Fernanda Pérez - Visita agendada para el viernes

- **1 Convertido**:
  1. Diego Martínez - Servicio contratado (fisioterapia)

### Ofertas de Trabajo (3 activas)
1. Enfermera con experiencia en geriatría - 42 vistas
2. Auxiliar de cocina y nutrición - 28 vistas (urgente)
3. Fisioterapeuta para terapia domiciliaria - 35 vistas

### Alertas de IA (2 registros)
1. Perfil sospechoso - Ana Lucía Torres (pendiente)
2. Lead crítico - Carmen Rodríguez (resuelta)

## Flujo de Trabajo Recomendado 🔄

### Al iniciar sesión cada día:

1. **Revisar Dashboard** - Ver métricas generales y alertas pendientes
2. **Atender Leads Críticos/Altos** - Ir a módulo Leads → Filtrar por prioridad alta/crítica → Contactar
3. **Aprobar Profesionales Pendientes** - Ir a módulo Profesionales → Filtrar pendientes → Analizar con IA → Aprobar/Rechazar
4. **Actualizar Estados de Leads en Seguimiento** - Actualizar leads contactados → marcar como calificados o convertidos
5. **Revisar Ofertas de Trabajo** - Ver engagement y renovar ofertas próximas a expirar

## Funcionalidad de IA 🤖

### Análisis de Profesionales
Cuando hace clic en "Analizar con IA" en un perfil profesional, el sistema:
1. Analiza la completitud del perfil (documentos, certificaciones, experiencia)
2. Evalúa la credibilidad basada en coherencia de información
3. Detecta red flags (información inconsistente, experiencia insuficiente, documentación faltante)
4. Calcula nivel de riesgo
5. Genera recomendación final con razonamiento
6. Crea alertas automáticas si detecta problemas

### Clasificación de Leads
Cuando un usuario llena el formulario de contacto, la IA automáticamente:
1. Analiza el mensaje para detectar intención (reserva, emergencia, información, etc.)
2. Evalúa el sentimiento (positivo, neutral, negativo)
3. Determina la urgencia del contacto
4. Asigna prioridad (crítica/alta/media/baja)
5. El lead aparece en el panel con toda esta información

Esto permite priorizar seguimiento de manera inteligente.

## Seguridad 🔒

### Características de Seguridad Implementadas:
- ✅ Contraseñas no se muestran en logs ni auditoría
- ✅ Códigos 2FA validados contra código estático configurado
- ✅ Bloqueo automático temporal tras intentos fallidos
- ✅ Sesiones con expiración automática
- ✅ Registro de IP y user agent en auditoría
- ✅ Todas las acciones administrativas son trazables

### Buenas Prácticas:
- Cerrar sesión al terminar de usar el panel
- No compartir credenciales de acceso
- Revisar logs de auditoría regularmente
- Responder a alertas de IA prontamente

## Acciones Rápidas en el Dashboard ⚡

Desde el dashboard principal puede:
- Hacer clic en cualquier card de métricas para ir a ese módulo
- Ver número de pendientes de aprobación y acceder directamente
- Ver alertas de IA y acceder al módulo de clasificaciones
- Acceder a los 4 módulos principales: Profesionales, Ofertas, Leads, Contenido

## Próximos Pasos Sugeridos 🚀

1. **Notificaciones por Email** - Recibir emails automáticos cuando llegan leads de prioridad crítica/alta
2. **Gráficos y Estadísticas** - Dashboard con gráficos de conversión de leads en el tiempo
3. **Múltiples Administradores** - Sistema de roles con permisos granulares para diferentes niveles de acceso
4. **Exportación de Datos** - Exportar leads y profesionales a CSV/Excel
5. **Templates de Respuesta** - Respuestas predefinidas para contactar leads comunes

## Soporte Técnico 💬

Si tiene preguntas o necesita asistencia con el panel de administración, toda la documentación técnica está en:
- `ADMIN-SYSTEM-PRD.md` - Documentación completa del sistema
- `src/lib/admin-setup.ts` - Configuración de credenciales
- `src/contextos/AdminAuthContext.tsx` - Lógica de autenticación

## Estado del Sistema ✅

**Fecha de Implementación**: Enero 2025  
**Versión**: 1.0  
**Estado**: Totalmente Funcional  
**Datos**: Seed data incluido para demostración  
**Integración**: Formulario de contacto completamente integrado con sistema de leads

---

**¡Todo listo para usar! Inicie sesión con las credenciales proporcionadas y explore el sistema.** 🎉
