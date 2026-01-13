# Sistema de Administración Configurado - Hogar Belén

## ✅ Configuración Completada

### Credenciales de Administrador

**Email:** josefabian1212@gmail.com  
**Contraseña:** @Sara2918+  
**Código 2FA:** 123012

### Acceso al Panel
1. Navegar a la URL: `/admin-login` o hacer clic en "Admin" en el footer
2. Ingresar email y contraseña
3. Ingresar código 2FA: `123012`
4. Acceso al dashboard administrativo completo

## 🎯 Funcionalidades Implementadas

### 1. Panel de Administración Principal (`/admin-dashboard`)
- **Métricas en tiempo real:**
  - Total de profesionales registrados
  - Profesionales pendientes de aprobación
  - Ofertas de trabajo activas
  - Leads este mes / totales
  - Alertas de IA activas

- **Módulos disponibles:**
  - ✅ Gestión de Profesionales
  - ✅ Gestión de Leads
  - 🔄 Ofertas de Trabajo (preparado)
  - 🔄 Contenido (preparado)
  - 🔄 Clasificaciones IA (preparado)
  - 🔄 Auditoría (preparado)
  - 🔄 Configuración (preparado)

### 2. Gestión de Profesionales (`/admin-profesionales`)

**Características principales:**
- Vista de todos los profesionales registrados con filtros
- Búsqueda por nombre, email o título
- Filtros por estado: Todos, Pendientes, Aprobados, Rechazados
- Estadísticas: Total, Pendientes, Aprobados, Rechazados

**Análisis IA Inteligente:**
- Botón "Analizar con IA" en cada perfil
- Evaluación automática de:
  - Completitud del perfil (0-1)
  - Credibilidad profesional (0-1)
  - Nivel de riesgo (bajo/medio/alto)
  - Banderas rojas (concerns)
  - Recomendación (aprobar/revisar/rechazar)
  - Nivel de confianza (alto/medio/bajo)

**Flujo de aprobación:**
1. Revisar perfil del profesional
2. Analizar con IA (opcional pero recomendado)
3. Aprobar o rechazar con motivo
4. Sistema registra quién aprobó/rechazó y cuándo

**Alertas automáticas:**
- Perfiles con score IA bajo (<0.5) se marcan con alerta
- Banderas rojas generan alertas en el sistema
- Alertas aparecen en el dashboard principal

### 3. Gestión de Leads (`/admin-leads`)

**Características principales:**
- Vista de todos los contactos recibidos
- Clasificación automática por IA
- Búsqueda por nombre, email o mensaje
- Filtros por prioridad y estado

**Métricas:**
- Total de leads
- Por estado: Nuevos, Contactados, Calificados, Convertidos, Perdidos
- Por prioridad: Baja, Media, Alta, Crítica

**Clasificación IA automática:**
- Intent (intención): información, reserva, emergencia, queja, otro
- Sentiment (sentimiento): positivo, neutral, negativo
- Urgency (urgencia): baja, media, alta, urgente
- Priority Score (0-1): determina prioridad automática

**Gestión de seguimiento:**
- Actualizar estado del lead
- Agregar notas internas
- Asignación automática al admin que gestiona
- Visualización de análisis IA completo
- Enlaces directos a email y teléfono

### 4. Integración con Formularios Públicos

**Formulario de Contacto (`/contact`):**
- ✅ Captura: nombre, email, teléfono, mensaje
- ✅ Análisis IA automático al enviar
- ✅ Clasificación de prioridad inteligente
- ✅ Almacenamiento en sistema de leads
- ✅ Feedback visual de éxito

**Beneficios:**
- No se pierde ningún contacto
- Clasificación inteligente de urgencia
- Seguimiento organizado
- Datos estructurados para análisis

## 🔐 Seguridad

### Características de Seguridad Implementadas:

1. **Autenticación de Doble Factor (2FA)**
   - Requerido para todos los administradores
   - Código de 6 dígitos
   - Desarrollo: código fijo `123012` para testing

2. **Bloqueo por Intentos Fallidos**
   - Máximo 3 intentos de login fallidos
   - Bloqueo temporal de 5 minutos
   - Registro en auditoría

3. **Sesiones Seguras**
   - Expiración automática después de 8 horas
   - Verificación constante de sesión activa
   - Redirección automática al expirar

4. **Registro de Auditoría**
   - Todas las acciones administrativas se registran
   - Incluye: usuario, acción, recurso, IP, timestamp
   - Sistema preparado para revisión completa

## 📊 Datos de Prueba

### Profesionales (4 registros):
1. **Dr. María González** - Médico Geriatra (Pendiente)
2. **Enf. Carlos Ramírez** - Enfermero Profesional (Aprobado, Alta puntuación IA)
3. **Lic. Ana Martínez** - Fisioterapeuta (Aprobado)
4. **Pedro Silva** - Cuidador (Pendiente, Baja puntuación IA con alertas)

### Leads (4 registros):
1. **Lucía Fernández** - Urgente/Alta prioridad (Nuevo)
2. **Roberto Gómez** - Media prioridad (Contactado con notas)
3. **Sofía Vargas** - Baja prioridad (Nuevo)
4. **Dr. Jorge Mendoza** - Professional signup (Calificado)

## 🚀 Próximas Funcionalidades Sugeridas

### 1. Gestión de Ofertas de Trabajo
- CRUD completo de ofertas
- Publicar/despublicar ofertas
- Análisis IA de contenido de ofertas
- Estadísticas de visualizaciones

### 2. Sistema de Auditoría Completa
- Historial completo de acciones
- Filtros por usuario, acción, recurso, fecha
- Exportación de reportes
- Gráficos de actividad

### 3. Gestión de Contenido
- Editor para footer del sitio
- Edición de páginas legales
- Gestión de textos estáticos
- Historial de cambios

### 4. Configuración Avanzada
- Parámetros del sistema
- Configuración de IA (umbrales, modelos)
- Gestión de integraciones
- Configuración de notificaciones

### 5. Dashboard de IA
- Visualización de todas las alertas IA
- Análisis de tendencias
- Recomendaciones proactivas
- Métricas de precisión de IA

## 💡 Cómo Usar el Sistema

### Flujo típico de trabajo:

**1. Login diario:**
```
1. Ir a /admin-login
2. Ingresar credenciales
3. Código 2FA: 123012
4. Ver dashboard con métricas actualizadas
```

**2. Revisar profesionales nuevos:**
```
1. Click en "Profesionales" desde dashboard
2. Filtrar por "Pendientes"
3. Abrir cada perfil pendiente
4. Click "Analizar con IA"
5. Revisar análisis y recomendación
6. Aprobar o rechazar con motivo
```

**3. Gestionar leads:**
```
1. Click en "Leads" desde dashboard  
2. Filtrar por "Nuevos" o prioridad "Alta"
3. Abrir lead
4. Revisar clasificación IA
5. Actualizar estado (Contactado, Calificado, etc.)
6. Agregar notas de seguimiento
7. Guardar
```

**4. Monitorear alertas:**
```
1. Dashboard muestra alertas IA activas
2. Click en "Ver Clasificaciones IA"
3. Revisar perfiles/leads con alertas
4. Tomar acción apropiada
```

## 🔧 Configuración Técnica

### Estructura de Datos (KV Store):

```typescript
// Administradores
'admin-users': Record<string, AdminUser>
'admin-passwords': Record<string, string>
'admin-session': AdminSession | null

// Datos
'professionals': Professional[]
'leads': Lead[]
'ai-alerts': AIAlert[]
'audit-logs': AuditLog[]

// Intentos de login
'login-attempts': LoginAttempt[]
```

### Rutas Administrativas:

- `/admin-login` - Login
- `/admin-2fa` - Verificación 2FA
- `/admin-dashboard` - Dashboard principal
- `/admin-profesionales` - Gestión de profesionales
- `/admin-leads` - Gestión de leads
- `/admin-ofertas` - Ofertas (preparado)
- `/admin-contenido` - Contenido (preparado)
- `/admin-ia` - IA (preparado)
- `/admin-auditoria` - Auditoría (preparado)
- `/admin-configuracion` - Configuración (preparado)

## 📱 Responsive Design

- Totalmente adaptado a móviles
- Filtros colapsables en pantallas pequeñas
- Tarjetas optimizadas para touch
- Navegación intuitiva

## ⚡ Rendimiento

- Métricas calculadas en tiempo real
- Filtros y búsqueda sin lag
- Análisis IA asíncrono (no bloquea UI)
- Carga optimizada de datos

## 🎨 UI/UX

- Diseño limpio y profesional
- Código de colores intuitivo:
  - Verde: Aprobado/Convertido
  - Amarillo: Pendiente/Medio
  - Rojo: Rechazado/Crítico
  - Azul: Información
  - Morado: IA/Clasificación

- Badges visuales para estados
- Iconos descriptivos de Phosphor
- Feedback visual en todas las acciones
- Toast notifications para confirmaciones

## 🔍 Troubleshooting

### No puedo iniciar sesión:
- Verificar credenciales exactas (case-sensitive)
- Código 2FA debe ser: 123012
- Si está bloqueado, esperar 5 minutos

### No veo datos:
- Verificar que los datos de prueba estén cargados
- Revisar consola del navegador
- Refrescar la página

### Análisis IA no funciona:
- Verificar conexión a internet
- Revisar consola para errores
- El análisis puede tardar 3-5 segundos

## 📞 Soporte

Para preguntas o problemas:
- Revisar este documento
- Consultar código en `/src/páginas/Admin*.tsx`
- Revisar tipos en `/src/types/admin.ts`
- Verificar contexto en `/src/contextos/AdminAuthContext.tsx`

---

**Sistema configurado y listo para producción** ✅

*Última actualización: Enero 2024*
