# 🔍 Estructura de URLs y SEO - Hogar Belén

## 📋 Índice
- [Estructura de Rutas](#estructura-de-rutas)
- [SEO Meta Tags](#seo-meta-tags)
- [Schema.org Structured Data](#schemaorg-structured-data)
- [Generación de Slugs](#generación-de-slugs)
- [Sitemap y Robots.txt](#sitemap-y-robotstxt)
- [Mejores Prácticas](#mejores-prácticas)
- [Ejemplos de Implementación](#ejemplos-de-implementación)

---

## Estructura de Rutas

El sitio implementa más de **90 rutas SEO-optimizadas** organizadas jerárquicamente:

### 📍 URLs Principales
```
/                          → Página de inicio
/nosotros                  → Sobre Hogar Belén
/servicios                 → Catálogo de servicios
/planes                    → Planes y precios
/belen-conecta            → Hub principal
/ingresar                 → Login
/registrarse              → Registro
```

### 🏥 Centro Vida
```
/centro-vida                           → Home Centro Vida
/centro-vida/buesaco                   → Información de ubicación
/centro-vida/instalaciones             → Tour virtual
/centro-vida/planes                    → Planes disponibles
/centro-vida/agenda-visita             → Agendar visita
/centro-vida/planes/compartida         → Habitación compartida
/centro-vida/planes/individual         → Habitación individual
```

### 🩺 Servicios
```
/servicios/cuidado-en-casa             → Cuidado domiciliario
/servicios/cuidado-residencial         → Residencia permanente
/servicios/atencion-medica             → Servicios médicos
/servicios/vida-activa                 → Actividades y terapias
```

### 🎯 Planes Vida Activa
```
/planes-vida-activa                    → Resumen de planes
/planes-vida-activa/plan-amigos        → Plan social
/planes-vida-activa/plan-sol-y-cafe    → Plan recreativo
/planes-vida-activa/plan-sonreir       → Plan terapéutico
/planes-vida-activa/plan-turismo-rural → Ecoturismo
/planes-vida-activa/plan-amigos/galeria
/planes-vida-activa/plan-sol-y-cafe/galeria
```

### 👨‍⚕️ Profesionales
```
/profesionales                         → Directorio general
/profesionales/enfermeria              → Enfermeras
/profesionales/cuidadores              → Cuidadores
/profesionales/medicos                 → Médicos
/profesionales/terapia                 → Terapeutas
/profesionales/otros                   → Otras especialidades

# Por ciudad
/profesionales/bogota
/profesionales/cali
/profesionales/medellin
/profesionales/pasto
/profesionales/enfermeria/bogota       → Combinación categoría+ciudad

# Perfiles dinámicos
/profesional/:slug                     → Ej: /profesional/maria-garcia-enfermeria-bogota
```

### 👪 Belén Conecta
```
# Familias
/belen-conecta/familias
/belen-conecta/familias/buscar-profesionales
/belen-conecta/familias/publicar-oferta
/belen-conecta/familias/como-funciona

# Profesionales
/belen-conecta/profesionales
/belen-conecta/profesionales/registro
/belen-conecta/profesionales/ofertas
/belen-conecta/profesionales/beneficios
```

### 💼 Ofertas
```
/ofertas                               → Todas las ofertas
/ofertas/cuidado-adulto-mayor-bogota  → Ofertas por ciudad
/trabaja-con-nosotros                 → Únete al equipo
```

### 📜 Páginas Legales
```
/terminos-y-condiciones
/politica-de-privacidad
/politica-de-cookies
/tratamiento-de-datos
```

### 🚫 Rutas Administrativas (No Indexadas)
```
/admin                     → Redirige a /admin/login
/admin/login
/admin/dashboard
/admin/profesionales
/admin/ofertas
/admin/verificaciones
```

---

## SEO Meta Tags

### Implementación con `useSEO` Hook

Todas las páginas utilizan el hook `useSEO` para configurar meta tags:

```tsx
import { useSEO } from '../lib/seo-utils'

export default function MiPagina() {
  useSEO({
    title: 'Título de la Página | Hogar Belén',
    description: 'Descripción optimizada para SEO (150-160 caracteres)',
    keywords: 'palabra clave 1, palabra clave 2, palabra clave 3',
    canonical: 'https://hogarbelen.com/mi-pagina',
    ogImage: '/images/og-mi-pagina.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  })

  return <div>Contenido de la página</div>
}
```

### Meta Tags Generados Automáticamente

El hook `useSEO` genera automáticamente:
- `<title>` - Título de la página
- `<meta name="description">` - Descripción
- `<meta name="keywords">` - Palabras clave
- `<meta property="og:title">` - Open Graph título
- `<meta property="og:description">` - Open Graph descripción
- `<meta property="og:image">` - Imagen para compartir
- `<meta property="og:url">` - URL canónica
- `<meta property="og:type">` - Tipo de contenido
- `<meta name="twitter:card">` - Twitter Card tipo
- `<meta name="twitter:title">` - Twitter título
- `<meta name="twitter:description">` - Twitter descripción
- `<meta name="twitter:image">` - Twitter imagen
- `<link rel="canonical">` - URL canónica

---

## Schema.org Structured Data

### LocalBusiness Schema (Homepage)

```tsx
import { generateLocalBusinessSchema, StructuredDataScript } from '../lib/schema-utils'

export default function HomePage() {
  const schema = generateLocalBusinessSchema()
  
  return (
    <>
      <StructuredDataScript schema={schema} />
      {/* Contenido de la página */}
    </>
  )
}
```

**Schema generado:**
```json
{
  "@context": "https://schema.org",
  "@type": "NursingHome",
  "@id": "https://hogarbelen.com",
  "name": "Hogar Belén",
  "description": "Centro de cuidado integral para adultos mayores...",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Buesaco",
    "addressRegion": "Nariño",
    "postalCode": "524040",
    "addressCountry": "CO"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "1.3724",
    "longitude": "-77.1551"
  },
  "telephone": "+57 321 570 8655",
  "openingHoursSpecification": [...],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "47"
  }
}
```

### MedicalBusiness Schema (Servicios)

```tsx
import { generateMedicalBusinessSchema, StructuredDataScript } from '../lib/schema-utils'

export default function ServiciosPage() {
  const schema = generateMedicalBusinessSchema()
  
  return (
    <>
      <StructuredDataScript schema={schema} />
      {/* Contenido */}
    </>
  )
}
```

### Professional Person Schema (Perfiles)

```tsx
import { generateProfessionalSchema, StructuredDataScript } from '../lib/schema-utils'

export default function ProfesionalPage({ professional }) {
  const schema = generateProfessionalSchema({
    name: professional.name,
    jobTitle: professional.jobTitle,
    description: professional.bio,
    city: professional.city,
    category: professional.category,
    slug: professional.slug,
    image: professional.photo,
    credentials: professional.certifications
  })
  
  return (
    <>
      <StructuredDataScript schema={schema} />
      {/* Contenido del perfil */}
    </>
  )
}
```

**Schema generado:**
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "María García",
  "jobTitle": "Enfermera Geriátrica",
  "description": "Enfermera especializada en cuidado de adultos mayores...",
  "url": "https://hogarbelen.com/profesional/maria-garcia-enfermeria-bogota",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Bogotá",
    "addressCountry": "CO"
  },
  "worksFor": {
    "@type": "Organization",
    "name": "Hogar Belén"
  },
  "hasCredential": [...]
}
```

### Breadcrumb Schema

```tsx
import { generateBreadcrumbSchema, StructuredDataScript } from '../lib/schema-utils'

const breadcrumbs = [
  { label: 'Inicio', url: '/' },
  { label: 'Servicios', url: '/servicios' },
  { label: 'Cuidado en Casa', url: '/servicios/cuidado-en-casa' }
]

const schema = generateBreadcrumbSchema(breadcrumbs)

return <StructuredDataScript schema={schema} />
```

---

## Generación de Slugs

### Utilidades Disponibles

```typescript
import {
  slugify,
  generateProfessionalSlug,
  parseProfessionalSlug,
  generateOfferSlug,
  generateArticleSlug,
  generateCanonicalUrl
} from '../lib/slug-utils'
```

### Slugify Básico

```typescript
// Convierte texto a slug SEO-friendly
slugify('María José García López')
// → 'maria-jose-garcia-lopez'

slugify('Enfermería Geriátrica en Bogotá')
// → 'enfermeria-geriatrica-en-bogota'
```

### Slug de Profesional

```typescript
// Genera slug para perfil profesional
generateProfessionalSlug('María García', 'Bogotá', 'Enfermería')
// → 'maria-garcia-enfermeria-bogota'

// Parsear slug existente
parseProfessionalSlug('maria-garcia-enfermeria-bogota')
// → { name: 'maria-garcia', category: 'enfermeria', city: 'bogota' }
```

### Slug de Oferta

```typescript
generateOfferSlug('Cuidado Adulto Mayor', 'Bogotá')
// → 'cuidado-adulto-mayor-bogota'
```

### URL Canónica

```typescript
generateCanonicalUrl('/profesionales/enfermeria')
// → 'https://hogarbelen.com/profesionales/enfermeria'
```

---

## Sitemap y Robots.txt

### Sitemap.xml

Ubicación: `/public/sitemap.xml`

Incluye **60+ URLs públicas** con prioridades y frecuencias de actualización:

```xml
<url>
  <loc>https://hogarbelen.com/</loc>
  <priority>1.0</priority>
  <changefreq>daily</changefreq>
</url>
<url>
  <loc>https://hogarbelen.com/centro-vida</loc>
  <priority>0.9</priority>
  <changefreq>weekly</changefreq>
</url>
```

**Prioridades:**
- `1.0` - Homepage
- `0.9` - Páginas principales (servicios, centro vida, profesionales)
- `0.8` - Páginas secundarias (planes, instalaciones)
- `0.7` - Galerías, registros
- `0.4` - Páginas legales

### Robots.txt

Ubicación: `/public/robots.txt`

```txt
User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/
Disallow: /superadmin

Sitemap: https://hogarbelen.com/sitemap.xml
```

**Rutas bloqueadas:**
- `/admin/*` - Panel administrativo
- `/superadmin` - Superadmin dashboard

---

## Mejores Prácticas

### ✅ Nombres de URL

- **Minúsculas:** Siempre usar minúsculas
- **Guiones:** Separar palabras con guiones `-`
- **Sin acentos:** Remover tildes y caracteres especiales
- **Descriptivos:** URLs que describen el contenido
- **Cortos:** Máximo 3-4 niveles de profundidad

**Ejemplo correcto:**
```
/servicios/cuidado-en-casa
/profesionales/enfermeria/bogota
```

**Evitar:**
```
/Servicios/Cuidado-En-Casa
/profesionales_enfermeria_bogotá
/srv/prof/enf/bog
```

### ✅ Meta Descriptions

- **Longitud:** 150-160 caracteres
- **Call-to-action:** Incluir invitación a la acción
- **Keywords:** Palabras clave naturalmente integradas
- **Único:** Cada página debe tener descripción única

### ✅ Títulos de Página

- **Formato:** `Título Específico | Hogar Belén`
- **Longitud:** 50-60 caracteres (máx. 70)
- **Keywords:** Palabra clave principal al inicio
- **Descriptivo:** Claro sobre el contenido

**Ejemplo:**
```
Enfermeras Geriátricas en Bogotá | Hogar Belén
```

### ✅ Imágenes Open Graph

- **Dimensiones:** 1200x630 px (ratio 1.91:1)
- **Formato:** JPG o PNG
- **Peso:** < 1 MB
- **Nombrado:** `/images/og-nombre-pagina.jpg`

### ✅ Structured Data

- **LocalBusiness:** Homepage, contacto
- **MedicalBusiness:** Servicios médicos
- **Person:** Perfiles profesionales
- **Service:** Servicios específicos
- **Breadcrumb:** Todas las páginas con navegación

---

## Ejemplos de Implementación

### Página de Servicio Completa

```tsx
import { useSEO } from '../lib/seo-utils'
import { generateServiceSchema, StructuredDataScript } from '../lib/schema-utils'

export default function CuidadoEnCasa() {
  // SEO Meta Tags
  useSEO({
    title: 'Cuidado de Adultos Mayores en Casa | Hogar Belén',
    description: 'Servicios profesionales de cuidado domiciliario para adultos mayores en Nariño. Enfermeras, cuidadores y terapeutas verificados disponibles 24/7.',
    keywords: 'cuidado domiciliario, cuidadores a domicilio, enfermería en casa, atención adultos mayores',
    canonical: 'https://hogarbelen.com/servicios/cuidado-en-casa',
    ogImage: '/images/og-cuidado-en-casa.jpg'
  })

  // Schema.org Structured Data
  const schema = generateServiceSchema({
    name: 'Cuidado de Adultos Mayores en Casa',
    description: 'Servicios profesionales de cuidado domiciliario',
    url: 'https://hogarbelen.com/servicios/cuidado-en-casa',
    serviceType: 'Home Health Care',
    areaServed: 'Nariño, Colombia'
  })

  return (
    <>
      <StructuredDataScript schema={schema} />
      <main className="min-h-screen">
        <h1>Cuidado de Adultos Mayores en Casa</h1>
        {/* Contenido */}
      </main>
    </>
  )
}
```

### Perfil Profesional Dinámico

```tsx
import { useParams } from 'react-router-dom'
import { useSEO } from '../lib/seo-utils'
import { parseProfessionalSlug } from '../lib/slug-utils'
import { generateProfessionalSchema, StructuredDataScript } from '../lib/schema-utils'

export default function ProfesionalDinamico() {
  const { slug } = useParams()
  const parsed = parseProfessionalSlug(slug)
  
  // Cargar datos del profesional desde base de datos
  const professional = useFetchProfessional(parsed)
  
  // SEO dinámico
  useSEO({
    title: `${professional.name} - ${professional.jobTitle} | Hogar Belén`,
    description: professional.bio,
    keywords: `${professional.category}, ${professional.city}, profesional verificado`,
    canonical: `https://hogarbelen.com/profesional/${slug}`,
    ogImage: professional.photo
  })

  // Schema dinámico
  const schema = generateProfessionalSchema({
    name: professional.name,
    jobTitle: professional.jobTitle,
    description: professional.bio,
    city: professional.city,
    category: professional.category,
    slug: slug,
    credentials: professional.certifications
  })

  return (
    <>
      <StructuredDataScript schema={schema} />
      {/* Perfil del profesional */}
    </>
  )
}
```

### Página con Breadcrumbs

```tsx
import { useSEO } from '../lib/seo-utils'
import { generateBreadcrumbSchema, StructuredDataScript } from '../lib/schema-utils'

export default function PlanAmigos() {
  const breadcrumbs = [
    { label: 'Inicio', url: '/' },
    { label: 'Planes Vida Activa', url: '/planes-vida-activa' },
    { label: 'Plan Amigos', url: '/planes-vida-activa/plan-amigos' }
  ]

  useSEO({
    title: 'Plan Amigos - Actividades Sociales | Hogar Belén',
    description: 'Plan social para adultos mayores en Nariño...',
    canonical: 'https://hogarbelen.com/planes-vida-activa/plan-amigos'
  })

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

  return (
    <>
      <StructuredDataScript schema={breadcrumbSchema} />
      
      {/* Breadcrumb UI */}
      <nav aria-label="Breadcrumb">
        {breadcrumbs.map((crumb, i) => (
          <a key={i} href={crumb.url}>{crumb.label}</a>
        ))}
      </nav>
      
      {/* Contenido */}
    </>
  )
}
```

---

## 🔧 Herramientas de Validación

### Google Tools
- **Search Console:** https://search.google.com/search-console
- **Rich Results Test:** https://search.google.com/test/rich-results
- **PageSpeed Insights:** https://pagespeed.web.dev/

### Schema Validation
- **Schema.org Validator:** https://validator.schema.org/
- **Google Structured Data Testing Tool**

### SEO Audits
- **Lighthouse:** DevTools > Lighthouse
- **ahrefs Site Audit**
- **Screaming Frog SEO Spider**

---

## 📊 Monitoreo

### Core Web Vitals
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

### SEO Metrics
- **Indexación:** Verificar en Google Search Console
- **Rankings:** Monitorear posiciones en Google Analytics
- **CTR:** Click-through rate desde SERPs

---

## 🚀 Próximos Pasos

1. ✅ Estructura de rutas implementada
2. ✅ Meta tags y Schema.org
3. ✅ Sitemap y robots.txt
4. ⏳ Optimización de imágenes
5. ⏳ Lazy loading avanzado
6. ⏳ Prerendering para SSR
7. ⏳ Testing de accesibilidad

---

## 🔄 Generación Dinámica de Sitemap

### Para Entornos Múltiples

El proyecto incluye un generador dinámico de sitemap en `src/lib/sitemap-generator.ts` que:

- ✅ Detecta automáticamente el dominio según el entorno
- ✅ Soporta variables de entorno (`VITE_APP_URL`)
- ✅ Puede incluir URLs dinámicas desde base de datos
- ✅ Genera XML válido con todas las URLs

### Uso Básico

```typescript
import { generateSitemap, getBaseUrl } from '../lib/sitemap-generator'

// Obtener dominio del entorno
const baseUrl = getBaseUrl()
// → Development: 'http://localhost:5173'
// → Production: 'https://hogarbelen.com'

// Generar sitemap completo
const xml = await generateSitemap()
console.log(xml)
```

### Configuración de Dominio

**Variables de entorno (.env):**
```env
# Development
VITE_APP_URL=http://localhost:5173

# Staging
VITE_APP_URL=https://staging.hogarbelen.com

# Production
VITE_APP_URL=https://hogarbelen.com
```

### Agregar URLs Dinámicas

```typescript
// En src/lib/sitemap-generator.ts

export async function getDynamicProfessionalUrls(): Promise<SitemapUrl[]> {
  // Fetch from database
  const { data: professionals } = await supabase
    .from('professionals')
    .select('slug, updated_at')
    .eq('verified', true)
    .eq('active', true)
  
  return professionals.map(prof => ({
    loc: `/profesional/${prof.slug}`,
    priority: 0.8,
    changefreq: 'weekly',
    lastmod: prof.updated_at
  }))
}
```

### Build Script

Para regenerar sitemap.xml antes del build:

```json
// package.json
{
  "scripts": {
    "generate:sitemap": "node scripts/generate-sitemap.js",
    "prebuild": "npm run generate:sitemap",
    "build": "tsc -b --noCheck && vite build"
  }
}
```

---

**Documentación actualizada:** Enero 2026
**Contacto:** desarrollo@hogarbelen.com
