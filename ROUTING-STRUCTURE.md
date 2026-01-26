# 📋 Estructura de URLs y Routing - Hogar Belén

Documentación completa de la estructura de URLs SEO-optimizada para el frontend de Hogar Belén.

## 🎯 Principios de SEO

Todas las URLs siguen estas reglas:

- ✅ **Minúsculas**: Solo letras minúsculas
- ✅ **Guiones**: Separadores `-` en lugar de espacios o guiones bajos
- ✅ **Sin acentos**: Caracteres ASCII estándar
- ✅ **Descriptivas**: URLs legibles que describen el contenido
- ✅ **Jerárquicas**: Estructura lógica de directorios

## 🗺️ Mapa Completo de URLs

### Navegación Principal

```
/                           → Página principal
/nosotros                   → Sobre nosotros e historia
/servicios                  → Catálogo de servicios
/planes                     → Planes y precios
```

### Secciones Inspiracionales

```
/lugar-sonado                  → El lugar ideal
/por-que-hogar-belen          → Diferenciadores
/modo-vacaciones-permanentes  → Filosofía de vida activa
/lo-que-nos-hace-unicos       → Valores únicos
/testimonios                   → Historias de familias
```

### Centro Vida

```
/centro-vida                      → Hub principal Centro Vida
/centro-vida/buesaco              → Sede Buesaco
/centro-vida/instalaciones        → Tour de instalaciones
/centro-vida/planes               → Planes disponibles
/centro-vida/agenda-visita        → Agendar visita guiada
/centro-vida/planes/compartida    → Plan habitación compartida
/centro-vida/planes/individual    → Plan habitación individual
```

### Servicios

```
/servicios/cuidado-en-casa       → Cuidado domiciliario
/servicios/cuidado-residencial   → Cuidado residencial 24/7
/servicios/atencion-medica       → Servicios médicos
/servicios/vida-activa           → Programas de vida activa
```

### Planes de Vida Activa

```
/planes-vida-activa                      → Hub de planes
/planes-vida-activa/plan-amigos          → Plan Amigos
/planes-vida-activa/plan-sol-y-cafe     → Plan Sol y Café
/planes-vida-activa/plan-sonreir         → Plan Sonreír
/planes-vida-activa/plan-turismo-rural   → Plan Turismo Rural
/planes-vida-activa/plan-amigos/galeria  → Galería Plan Amigos
/planes-vida-activa/plan-sol-y-cafe/galeria → Galería Sol y Café
```

### Belén Conecta (Plataforma)

```
/belen-conecta                                  → Hub principal
/belen-conecta/familias                         → Portal familias
/belen-conecta/familias/buscar-profesionales    → Buscar profesionales
/belen-conecta/familias/publicar-oferta         → Publicar oferta
/belen-conecta/familias/como-funciona           → Guía de uso
/belen-conecta/profesionales                    → Portal profesionales
/belen-conecta/profesionales/registro           → Registro profesionales
/belen-conecta/profesionales/ofertas            → Ofertas laborales
/belen-conecta/profesionales/beneficios         → Beneficios plataforma
```

### Autenticación

```
/ingresar      → Login
/registrarse   → Registro de usuario
```

### Profesionales

```
/profesionales                → Directorio general
/profesionales/enfermeria     → Enfermeros
/profesionales/cuidadores     → Cuidadores
/profesionales/medicos        → Médicos
/profesionales/terapia        → Terapeutas
/profesionales/otros          → Otros profesionales
```

#### Rutas Dinámicas (Pendientes de implementar)

```
/profesionales/[ciudad]                  → Por ciudad (ej: /profesionales/pasto)
/profesionales/[categoria]/[ciudad]      → Por categoría y ciudad
/profesional/[slug]                      → Perfil individual
```

### Ofertas y Empleo

```
/ofertas                → Listado de ofertas
/trabaja-con-nosotros   → Vacantes Hogar Belén
```

### Páginas Legales

```
/terminos-y-condiciones   → Términos y condiciones
/politica-de-privacidad   → Política de privacidad
/politica-de-cookies      → Política de cookies
/tratamiento-de-datos     → Tratamiento de datos personales
```

### Admin (No indexadas)

```
/admin                      → Redirect a login
/admin/login                → Login admin
/admin/dashboard            → Dashboard principal
/admin/profesionales        → Gestión profesionales
/admin/ofertas              → Gestión ofertas
/admin/verificaciones       → Verificaciones
```

## 🔧 Implementación Técnica

### Estructura de Archivos

```
src/
├── páginas/
│   ├── PáginaPrincipal.tsx
│   ├── Nosotros.tsx
│   ├── Testimonios.tsx
│   ├── Ofertas.tsx
│   ├── TrabajaConNosotros.tsx
│   ├── inspiracional/
│   │   ├── LugarSonado.tsx
│   │   ├── PorQueHogarBelen.tsx
│   │   ├── ModoVacacionesPermanentes.tsx
│   │   └── LoQueNosHaceUnicos.tsx
│   ├── centro-vida/
│   │   ├── CentroVidaBuesaco.tsx
│   │   ├── CentroVidaInstalaciones.tsx
│   │   ├── CentroVidaPlanes.tsx
│   │   ├── AgendaVisita.tsx
│   │   ├── PlanCompartida.tsx
│   │   └── PlanIndividual.tsx
│   ├── servicios/
│   │   ├── ServicioCuidadoEnCasa.tsx
│   │   ├── ServicioCuidadoResidencial.tsx
│   │   ├── ServicioAtencionMedica.tsx
│   │   └── ServicioVidaActiva.tsx
│   ├── belen-conecta/
│   │   ├── BelenConectaHub.tsx
│   │   ├── FamiliasBuscarProfesionales.tsx
│   │   ├── FamiliasPublicarOferta.tsx
│   │   ├── FamiliasComoFunciona.tsx
│   │   ├── ProfesionalesRegistro.tsx
│   │   ├── ProfesionalesOfertas.tsx
│   │   └── ProfesionalesBeneficios.tsx
│   ├── profesionales-cat/
│   │   ├── Enfermeria.tsx
│   │   ├── Cuidadores.tsx
│   │   ├── Medicos.tsx
│   │   ├── Terapia.tsx
│   │   └── Otros.tsx
│   └── [legal pages].tsx
├── lib/
│   ├── page-template.tsx    → Plantilla base para páginas
│   ├── seo-config.ts         → Configuración SEO por página
│   └── seo-utils.tsx         → Utilidades y Schema.org
├── components/
│   └── SEOHead.tsx           → Componente de meta tags
└── src/
    └── App.tsx               → Configuración de rutas
```

### Sistema de Templates

Todas las páginas nuevas usan `PageTemplate` para consistencia:

```tsx
import { PageTemplate } from '../lib/page-template';

export default function MiPagina() {
  return (
    <PageTemplate
      title="Título SEO | Hogar Belén"
      description="Descripción meta optimizada para SEO"
      keywords="palabras, clave, relevantes"
      canonical="https://hogarbelen.com/mi-ruta"
      h1="Título Principal de la Página"
      content={<div>Contenido aquí</div>}
      schema={{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        // ... schema
      }}
    />
  );
}
```

### Lazy Loading

Todas las páginas usan React.lazy() para code-splitting:

```tsx
const MiPagina = lazy(() => import('./páginas/MiPagina'))
```

### Redirects

Redirects de compatibilidad para URLs antiguas:

```tsx
<Route path="/about" element={<Navigate to="/nosotros" replace />} />
<Route path="/precios" element={<Navigate to="/planes" replace />} />
```

## 📊 SEO Meta Tags

Cada página incluye:

- ✅ `<title>` único y descriptivo
- ✅ `<meta name="description">` optimizada
- ✅ `<meta name="keywords">` relevantes
- ✅ `<link rel="canonical">` para evitar duplicados
- ✅ Open Graph tags (Facebook, LinkedIn)
- ✅ Twitter Card tags
- ✅ Schema.org JSON-LD cuando aplica

## 🤖 robots.txt

```
User-agent: *
Allow: /

# Block admin routes from indexing
Disallow: /admin
Disallow: /admin/
Disallow: /superadmin
Disallow: /familia/dashboard

Sitemap: https://hogarbelen.com/sitemap.xml
```

## 🗺️ sitemap.xml

Sitemap dinámico con:

- 50+ URLs públicas
- Prioridades (0.4 - 1.0)
- Frecuencia de cambio
- Actualización automática

Ubicación: `/public/sitemap.xml`

## 📦 Schema.org

### LocalBusiness (Home y páginas principales)

```json
{
  "@context": "https://schema.org",
  "@type": "NursingHome",
  "name": "Hogar Belén",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Buesaco",
    "addressRegion": "Nariño",
    "addressCountry": "CO"
  },
  "telephone": "+57-321-570-8655",
  "email": "hogarbelen2022@gmail.com"
}
```

### Service (Páginas de servicios)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Cuidado en Casa",
  "provider": {
    "@type": "Organization",
    "name": "Hogar Belén"
  },
  "areaServed": ["Pasto", "Buesaco", "Nariño"]
}
```

### Organization (Nosotros, Testimonios)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Hogar Belén",
  "foundingDate": "2019",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "48"
  }
}
```

## ⚡ Performance

### Optimizaciones Implementadas

- ✅ **Code Splitting**: Todas las páginas con React.lazy()
- ✅ **Suspense Boundaries**: Loading spinners
- ✅ **Image Optimization**: Plugins vite-imagetools y vite-plugin-image-optimizer
- ✅ **Cache Headers**: Configurados en vercel.json
- ✅ **Preconnect**: Google Fonts en index.html

### Core Web Vitals Target

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

## 🔄 Pendientes

### Rutas Dinámicas

Implementar:

```tsx
// Por ciudad
<Route path="/profesionales/:ciudad" element={<ProfesionalesPorCiudad />} />

// Por categoría y ciudad
<Route path="/profesionales/:categoria/:ciudad" element={<ProfesionalesFiltrados />} />

// Perfil individual con slug
<Route path="/profesional/:slug" element={<PerfilDinamico />} />
```

### Generación de Slugs

Crear utilidad para slugs automáticos:

```ts
function generateSlug(name: string, city: string, category: string): string {
  const normalize = (str: string) => str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
    
  return `${normalize(name)}-${normalize(category)}-${normalize(city)}`;
}

// Ejemplo: "María Rodríguez" + "Enfermera" + "Pasto"
// → "maria-rodriguez-enfermera-pasto"
```

## 📚 Referencias

- [Google SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Schema.org Documentation](https://schema.org/)
- [Core Web Vitals](https://web.dev/vitals/)
- [React Router Documentation](https://reactrouter.com/)

## 🤝 Contribuir

Al agregar nuevas páginas:

1. Usar `PageTemplate` para consistencia
2. Definir SEO config en `seo-config.ts`
3. Agregar ruta en `App.tsx`
4. Actualizar `sitemap.xml`
5. Seguir convenciones de nomenclatura
6. Usar lazy loading
7. Incluir Schema.org cuando aplique

---

Actualizado: Enero 2026  
Versión: 1.0
