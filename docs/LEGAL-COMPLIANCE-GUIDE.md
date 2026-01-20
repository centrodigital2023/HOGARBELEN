# Guía de Cumplimiento Legal - Hogar Belén

## 📋 Descripción General

Este documento describe el sistema de gestión de aceptación de términos legales y cumplimiento normativo para la plataforma Hogar Belén.

## ⚖️ Normativa Aplicable

### Colombia

- **Ley 1581 de 2012**: Protección de Datos Personales
- **Decreto 1377 de 2013**: Reglamentación parcial de la Ley 1581
- **Decreto 1074 de 2015**: Sector Comercio, Industria y Turismo

### Principios Aplicados

1. **Legalidad**: Tratamiento conforme a la ley colombiana
2. **Finalidad**: Datos usados solo para propósitos declarados
3. **Libertad**: Consentimiento informado y voluntario
4. **Veracidad**: Datos completos, exactos y actualizados
5. **Transparencia**: Información clara sobre uso de datos
6. **Acceso**: Usuarios pueden consultar sus datos
7. **Seguridad**: Medidas técnicas de protección

## 📄 Documentos Legales

### Términos y Condiciones

**Ubicación**: `/terminos-y-condiciones`  
**Versión Actual**: 1.0  
**Última Actualización**: 2026-01-19

**Contenido incluye:**
- Aceptación de términos
- Descripción del servicio
- Registro de usuarios
- Responsabilidades
- Limitaciones de responsabilidad
- Modificaciones
- Información de contacto

### Política de Privacidad

**Ubicación**: `/politica-de-privacidad`  
**Versión Actual**: 1.0  
**Última Actualización**: 2026-01-19

**Contenido incluye:**
- Responsable del tratamiento
- Datos recopilados
- Finalidad del tratamiento
- Derechos de los titulares
- Medidas de seguridad
- Compartir información
- Cookies y tecnologías
- Contacto DPO

## 🗄️ Sistema de Aceptación

### Tabla: legal_acceptances

```sql
CREATE TABLE legal_acceptances (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  terms_version TEXT NOT NULL,
  privacy_version TEXT NOT NULL,
  accepted_at TIMESTAMPTZ NOT NULL,
  ip_hash TEXT NOT NULL,          -- SHA256 hash (nunca IP en texto plano)
  user_agent TEXT,
  acceptance_context TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Contextos de Aceptación

- `professional_registration`: Registro de profesional
- `family_registration`: Registro de familia
- `job_offer_publication`: Publicación de oferta de trabajo
- `profile_update`: Actualización de perfil

## 🔧 Implementación Técnica

### Hook: useLegalAcceptance

```typescript
import { useLegalAcceptance } from '@/hooks/useLegalAcceptance';

const { checkAcceptance, recordAcceptance, getCurrentVersions } = useLegalAcceptance();

// Verificar si usuario aceptó términos actuales
const { hasAccepted, needsNewAcceptance } = await checkAcceptance(userId);

// Registrar nueva aceptación
await recordAcceptance(userId, 'professional_registration');

// Obtener versiones actuales
const versions = getCurrentVersions();
```

### Componente: LegalAcceptanceCheckbox

```tsx
import { LegalAcceptanceCheckbox } from '@/components/LegalAcceptanceCheckbox';

<LegalAcceptanceCheckbox
  checked={accepted}
  onCheckedChange={setAccepted}
  required={true}
/>
```

## 📊 Versionado de Documentos

### Sistema de Versiones

Las versiones siguen el formato: `MAJOR.MINOR`

- **MAJOR**: Cambios significativos que requieren re-aceptación
- **MINOR**: Correcciones menores que no requieren re-aceptación

### Actualizar Versión

1. Editar archivo: `src/lib/legalVersions.ts`

```typescript
export const LEGAL_VERSIONS = {
  TERMS: '2.0',  // Incrementar versión
  PRIVACY: '1.1',
  LAST_UPDATED: '2026-02-15'
};
```

2. Agregar entrada al historial:

```typescript
export const TERMS_HISTORY: LegalVersion[] = [
  {
    version: '2.0',
    effectiveDate: '2026-02-15',
    changelog: [
      'Nuevas condiciones de uso',
      'Actualización de responsabilidades'
    ]
  },
  // ... versiones anteriores
];
```

3. Actualizar contenido en páginas:
   - `/src/páginas/TerminosYCondiciones.tsx`
   - `/src/páginas/PoliticaPrivacidad.tsx`

### Migración de Usuarios

Cuando se actualiza una versión MAJOR:

```typescript
// Sistema detecta automáticamente que usuario necesita re-aceptar
const { needsNewAcceptance } = await checkAcceptance(userId);

if (needsNewAcceptance) {
  // Mostrar modal/página de re-aceptación
  // Bloquear acceso hasta que acepte nuevos términos
}
```

## 🔒 Privacidad y Seguridad

### IP Hash

Las IPs se almacenan hasheadas (SHA-256):

```typescript
import { hashIP, getClientIP } from '@/lib/security';

const clientIP = getClientIP();
const ipHash = await hashIP(clientIP);

// ipHash se guarda en base de datos
// IP original NUNCA se almacena
```

### User Agent

Se almacena el user agent para:
- Análisis de dispositivos usados
- Detección de patrones sospechosos
- Auditoría de aceptaciones

**No se considera dato sensible** según la ley colombiana.

## 📋 Auditoría y Compliance

### Consultar Aceptaciones de un Usuario

```sql
SELECT 
  terms_version,
  privacy_version,
  accepted_at,
  acceptance_context
FROM legal_acceptances
WHERE user_id = 'uuid-del-usuario'
ORDER BY accepted_at DESC;
```

### Reporte de Aceptaciones por Versión

```sql
SELECT 
  terms_version,
  privacy_version,
  COUNT(*) as total_acceptances
FROM legal_acceptances
GROUP BY terms_version, privacy_version
ORDER BY terms_version DESC, privacy_version DESC;
```

### Usuarios sin Aceptación Reciente

```sql
SELECT u.id, u.email
FROM auth.users u
LEFT JOIN legal_acceptances la ON u.id = la.user_id
WHERE la.id IS NULL
   OR (la.terms_version != '1.0' OR la.privacy_version != '1.0');
```

## 👥 Derechos de los Titulares (ARCO)

### Acceso

**Código:**
```typescript
// Usuario puede ver su historial de aceptaciones
const { data } = await supabase
  .from('legal_acceptances')
  .select('*')
  .eq('user_id', userId);
```

### Rectificación

Si un usuario solicita rectificar datos:

1. Validar identidad del solicitante
2. Actualizar información en `profiles` table
3. Registrar en audit log

### Cancelación (Eliminación)

```sql
-- Eliminar usuario y todas sus aceptaciones (CASCADE)
DELETE FROM auth.users WHERE id = 'uuid-del-usuario';
```

### Oposición

Si usuario se opone al tratamiento:
- Desactivar cuenta
- Anonimizar datos
- Mantener mínimos requeridos por ley (5 años)

## 📧 Contacto para Solicitudes

**Responsable del Tratamiento:**
- Nombre: Hogar Belén
- Email: hogarbelen2022@gmail.com
- Dirección: [Dirección física en Colombia]

**Data Protection Officer (DPO):**
- Email: contacto@hogarbelen.com

## 🔄 Proceso de Actualización Legal

### Cuando Actualizar

- Cambios en legislación colombiana
- Nuevas funcionalidades que recopilan datos
- Cambios en uso de datos existentes
- Nuevos proveedores de servicios
- Cambios en ubicación de servidores

### Pasos para Actualizar

1. ✅ Revisar con asesoría legal
2. ✅ Actualizar documentos (Términos y/o Privacidad)
3. ✅ Incrementar versión en `legalVersions.ts`
4. ✅ Agregar entrada al changelog
5. ✅ Desplegar cambios
6. ✅ Notificar a usuarios existentes (email)
7. ✅ Usuarios deben re-aceptar en próximo acceso

## ⚠️ Consideraciones Importantes

### Menores de Edad

**⚠️ IMPORTANTE:** Servicios NO dirigidos a menores de 18 años.

Si se detecta registro de menor:
1. Suspender cuenta inmediatamente
2. Contactar con representante legal
3. Solicitar consentimiento de tutor
4. Documentar proceso

### Datos Sensibles

Según Ley 1581, son sensibles:
- Datos de salud (diagnósticos, tratamientos)
- Datos biométricos
- Orientación sexual
- Información financiera detallada

**Requerir autorización explícita y separada** para estos datos.

### Transferencias Internacionales

Si se usan servicios fuera de Colombia:
- Verificar nivel de protección adecuado
- Cláusulas contractuales apropiadas
- Informar en Política de Privacidad

## 📚 Referencias Legales

- [Ley 1581 de 2012](http://www.secretariasenado.gov.co/senado/basedoc/ley_1581_2012.html)
- [Decreto 1377 de 2013](http://www.sic.gov.co/decreto-1377-de-2013)
- [Superintendencia de Industria y Comercio](https://www.sic.gov.co/)

## 📝 Plantillas

### Email de Notificación de Actualización

```
Asunto: Actualización de Términos y Condiciones - Hogar Belén

Estimado/a [Nombre],

Te informamos que hemos actualizado nuestros Términos y Condiciones
y/o Política de Privacidad.

Versión anterior: [X.X]
Nueva versión: [Y.Y]
Fecha efectiva: [DD/MM/YYYY]

Principales cambios:
- [Cambio 1]
- [Cambio 2]

Para continuar usando nuestros servicios, deberás aceptar los
nuevos términos en tu próximo acceso.

Puedes revisar los documentos completos en:
- Términos: https://hogarbelen.com/terminos-y-condiciones
- Privacidad: https://hogarbelen.com/politica-de-privacidad

Atentamente,
Equipo Hogar Belén
```

## ✅ Checklist de Cumplimiento

- [ ] Políticas legales publicadas y accesibles
- [ ] Sistema de aceptación implementado
- [ ] IPs hasheadas (no texto plano)
- [ ] Versionado de documentos funcional
- [ ] Usuarios pueden ver sus aceptaciones
- [ ] Proceso ARCO definido y comunicado
- [ ] Email de contacto DPO disponible
- [ ] Registro de auditoría activo
- [ ] Política de retención de datos definida
- [ ] Procedimiento de breach notification documentado
