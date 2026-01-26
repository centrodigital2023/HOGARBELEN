# 🚀 Frontend - Hogar Belén

## 📋 Índice

- [Arquitectura](#arquitectura)
- [SEO y Estructura de URLs](#seo-y-estructura-de-urls)
- [Páginas Legales](#páginas-legales)
- [Despliegue en Vercel](#despliegue-en-vercel)
- [Optimizaciones Implementadas](#optimizaciones-implementadas)

---

## 🏗️ Arquitectura

### Stack Tecnológico

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 7.2.6
- **Routing**: React Router v6
- **UI Components**: shadcn/ui + Radix UI
- **Estilos**: Tailwind CSS
- **Autenticación**: Supabase Auth
- **Backend**: Supabase (PostgreSQL + Storage)

### Estructura de Directorios

```
src/
├── componentes/          # Componentes reutilizables (español)
├── components/           # Componentes UI (inglés)
├── pages/                # Páginas de la aplicación
├── páginas/              # Páginas principales (español)
├── lib/                  # Utilidades y configuración
├── hooks/                # Custom React hooks
├── contextos/            # Context providers
├── types/                # Definiciones TypeScript
├── assets/               # Imágenes y recursos estáticos
└── styles/               # Estilos globales

public/
├── robots.txt            # Directivas para crawlers
└── sitemap.xml           # Mapa del sitio para SEO
```

---

## 🔍 SEO y Estructura de URLs

### URLs Principales

#### Páginas Públicas
- `/` - Página principal
- `/about` - Acerca de Hogar Belén
- `/contact` - Contacto
- `/servicios` - Servicios generales
- `/precios` - Planes y precios

#### Centro de Vida y Planes
- `/centro-vida` - Centro de Vida para Adultos Mayores
- `/planes-vida-activa` - Resumen de planes
- `/plan-amigos` - Plan Amigos (socialización)
- `/plan-sol-cafe` - Plan Sol y Café (descanso)
- `/plan-sonreir` - Plan Sonreír (celebraciones)
- `/plan-turismo-rural` - Plan Turismo Rural (ecoturismo)

#### Belén Conecta (Marketplace)
- `/belen-conecta/login` - Login profesionales
- `/belen-conecta/register` - Registro profesionales
- `/belen-conecta/familias` - Panel familias
- `/belen-conecta/profesionales` - Panel profesionales
- `/profesionales` - Servicios profesionales
- `/profesional/perfil` - Perfil profesional
- `/profesional/panel` - Panel de control
- `/ofertas-trabajo` - Ofertas de trabajo

#### Páginas Legales
- `/privacidad` - Política de Privacidad
- `/terminos` - Términos y Condiciones
- `/cookies` - Política de Cookies

#### Administración (Bloqueadas en robots.txt)
- `/admin/*` - Panel administrativo (requiere autenticación)
- `/superadmin` - Panel superadministrador
- `/familia/*` - Área privada familias

### Meta Tags Implementados

Cada página incluye:

✅ **Meta Tags Básicos**
- Title optimizado con keywords locales
- Meta description (hasta 160 caracteres)
- Keywords relevantes
- Canonical URL
- Robots directives

✅ **Open Graph (Facebook)**
- `og:type`, `og:url`, `og:site_name`
- `og:title`, `og:description`
- `og:image` con dimensiones (1200x630)
- `og:locale` (es_CO)

✅ **Twitter Cards**
- `twitter:card` (summary_large_image)
- `twitter:title`, `twitter:description`
- `twitter:image`

✅ **Geo-Localización**
- `geo.region` (CO-NAR)
- `geo.placename` (Buesaco, Nariño)
- `geo.position` + `ICBM` (coordenadas)

✅ **Schema.org JSON-LD**
- Tipo: `NursingHome`
- Incluye: dirección, teléfono, horarios
- Áreas servidas: Buesaco, Pasto, La Unión
- Redes sociales, ratings, catálogo de servicios

### robots.txt

```txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /superadmin/
Disallow: /familia/
Disallow: /profesional/

Sitemap: https://hogarbelen.org/sitemap.xml
```

**Rutas bloqueadas para crawlers:**
- `/admin/*` - Panel administrativo
- `/superadmin` - Panel super admin
- `/familia/*` - Dashboards privados familias
- `/profesional/*` - Dashboards privados profesionales

### sitemap.xml

Contiene **77 URLs** organizadas por prioridad:

- **Prioridad 1.0**: Homepage
- **Prioridad 0.9**: Servicios principales, SEO local
- **Prioridad 0.8**: Habitaciones, servicios específicos
- **Prioridad 0.7**: Planes, blog
- **Prioridad 0.4**: Páginas legales

---

## ⚖️ Páginas Legales

### Implementación

Todas las páginas legales están implementadas como componentes React:

#### 1. Política de Privacidad (`/privacidad`)
- **Componente**: `src/páginas/PoliticaPrivacidad.tsx`
- **Cumplimiento**: Ley 1581 de 2012 (Colombia)
- **Contenido**:
  - Responsable del tratamiento
  - Datos recopilados y finalidades
  - Derechos del titular (ARCO)
  - Procedimiento para ejercer derechos
  - Seguridad de la información
  - Tratamiento de datos sensibles

#### 2. Términos y Condiciones (`/terminos`)
- **Componente**: `src/páginas/TerminosYCondiciones.tsx`
- **Contenido**:
  - Identificación del titular
  - Objeto del sitio web
  - Condiciones de uso
  - Registro de usuarios y profesionales
  - Verificación de profesionales (Check Azul)
  - Responsabilidad y limitaciones
  - Propiedad intelectual

#### 3. Política de Cookies (`/cookies`)
- **Componente**: `src/páginas/PoliticaCookies.tsx`
- **Contenido**:
  - Qué son las cookies
  - Cookies esenciales, funcionales, analíticas
  - Cookies de Google OAuth
  - Cookies de terceros (Google Analytics, Supabase)
  - Cómo gestionar cookies
  - Enlaces a configuración de navegadores

### Características Comunes

✅ Diseño responsive (mobile-first)
✅ Iconografía con Phosphor Icons
✅ Cards de shadcn/ui
✅ Navegación cruzada entre páginas legales
✅ Botón de regreso al inicio
✅ Información de contacto visible
✅ Última actualización: Enero 2026

### Integración con Google OAuth

Las páginas legales cumplen con los requisitos de:
- **Google Cloud Console** - OAuth Consent Screen
- **GDPR** - Protección de datos (usuarios europeos)
- **LGPD** - Protección de datos (usuarios brasileños)
- **Ley 1581/2012** - Colombia

---

## 🚀 Despliegue en Vercel

### Configuración Automática

El proyecto está configurado para despliegue automático en Vercel mediante `vercel.json`.

#### vercel.json

```json
{
  "rewrites": [
    {
      "source": "/((?!robots\\.txt|sitemap\\.xml).*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)\\.js",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/robots.txt",
      "headers": [
        {
          "key": "Content-Type",
          "value": "text/plain"
        },
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600"
        }
      ]
    },
    {
      "source": "/sitemap.xml",
      "headers": [
        {
          "key": "Content-Type",
          "value": "application/xml"
        },
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600"
        }
      ]
    }
  ]
}
```

### Pasos de Despliegue

#### 1. Conectar Repositorio

1. Ve a [vercel.com](https://vercel.com)
2. Click en "New Project"
3. Importa el repositorio desde GitHub
4. Selecciona la rama `main`

#### 2. Configurar Variables de Entorno

En el dashboard de Vercel, agrega las siguientes variables:

```
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_anonima_aqui
```

#### 3. Configurar Build Settings

Vercel detectará automáticamente:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

#### 4. Configurar Dominio

En **Settings → Domains**:

1. Agrega tu dominio: `hogarbelen.org`
2. Opcional: agrega `www.hogarbelen.org` con redirect
3. Configura los DNS según instrucciones:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### Verificación Post-Despliegue

Verifica que las siguientes URLs funcionen:

✅ **Homepage**: https://hogarbelen.org/
✅ **Robots**: https://hogarbelen.org/robots.txt
✅ **Sitemap**: https://hogarbelen.org/sitemap.xml
✅ **Legal - Privacidad**: https://hogarbelen.org/privacidad
✅ **Legal - Términos**: https://hogarbelen.org/terminos
✅ **Legal - Cookies**: https://hogarbelen.org/cookies

### Comandos de Build Local

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview

# Linter
npm run lint
```

---

## ⚡ Optimizaciones Implementadas

### Performance

✅ **Code Splitting**
- Lazy loading de todas las páginas
- Manual chunks para vendors (React, UI components)
- Reducción de bundle size inicial

✅ **Caching**
- Archivos estáticos: 1 año (immutable)
- robots.txt/sitemap.xml: 1 hora
- Service worker para PWA (futuro)

✅ **Imágenes**
- Formato WebP donde sea posible
- Lazy loading con `loading="lazy"`
- Dimensiones especificadas

### SEO

✅ **Technical SEO**
- Meta tags completos
- Schema.org JSON-LD
- Sitemap XML estructurado
- robots.txt optimizado
- Canonical URLs

✅ **Local SEO**
- Geo-tags (Buesaco, Nariño)
- NAP consistency (Name, Address, Phone)
- Áreas servidas definidas
- Keywords locales

✅ **Content SEO**
- H1-H6 jerarquía
- Alt text descriptivo
- Contenido semántico
- Enlaces internos

### Accessibility

✅ **WCAG 2.1 Level AA**
- Contraste de colores
- Navegación por teclado
- ARIA labels
- Semántica HTML5
- Skip links (futuro)

### Security

✅ **Headers de Seguridad**
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

✅ **Autenticación**
- Supabase Auth (JWT)
- Row Level Security (RLS)
- OAuth 2.0 con Google
- Sesiones persistentes seguras

---

## 📊 Google Search Console

### Configuración Post-Despliegue

1. **Verificar Propiedad**
   - Ve a [Google Search Console](https://search.google.com/search-console)
   - Agrega la propiedad `https://hogarbelen.org`
   - Verifica mediante tag HTML o DNS

2. **Enviar Sitemap**
   - Sección: **Sitemaps**
   - URL: `https://hogarbelen.org/sitemap.xml`
   - Submit

3. **Monitorear**
   - URLs indexadas
   - Cobertura de indexación
   - Errores de rastreo
   - Queries de búsqueda
   - Rendimiento en SERP

### Google Analytics

Para análisis de tráfico (configurar en futuro):

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 📱 Redes Sociales

Las URLs de redes sociales están integradas en el Schema.org:

- **Facebook**: https://www.facebook.com/Hogarbelenbuesaco
- **Instagram**: https://www.instagram.com/hogargeriatricobelen
- **YouTube**: https://www.youtube.com/@hogarbelengeriatrico9521

---

## 📞 Información de Contacto (NAP)

**Consistente en todo el sitio:**

```
Nombre: Hogar Belén
Dirección: Vereda El Higuerón, Buesaco, Nariño, Colombia
Teléfono: +57 321 570 8655
Email: hogarbelen2022@gmail.com
```

---

## 🎯 Próximos Pasos Recomendados

### SEO (Corto Plazo)
- [ ] Crear Google My Business
- [ ] Solicitar primeras reseñas
- [ ] Configurar Google Analytics 4
- [ ] Monitorear posicionamiento keywords principales

### Contenido (Mediano Plazo)
- [ ] Crear sección de blog
- [ ] Publicar 1 artículo por semana
- [ ] Optimizar imágenes (WebP, compresión)
- [ ] Agregar testimonios de familias

### Técnico (Largo Plazo)
- [ ] Implementar PWA
- [ ] Service worker para offline
- [ ] Optimizar Core Web Vitals
- [ ] A/B testing de CTAs

---

## 📄 Licencia

MIT License - Copyright GitHub, Inc.

---

**Última actualización**: Enero 2026
