# Guía de Despliegue en Vercel - Hogar Belén

## 📋 Pre-requisitos

- [ ] Cuenta en GitHub
- [ ] Cuenta en Vercel (puedes usar GitHub para iniciar sesión)
- [ ] Repositorio Git del proyecto
- [ ] Credenciales de Supabase (si usas autenticación)

---

## 🚀 Paso 1: Preparar el Repositorio

### 1.1 Inicializar Git (si no está inicializado)

```bash
cd /workspaces/spark-template
git init
git add .
git commit -m "Initial commit: Hogar Belén with SEO optimization"
```

### 1.2 Crear Repositorio en GitHub

1. Ve a https://github.com/new
2. Nombre del repositorio: `hogar-belen-web`
3. Descripción: "Plataforma web para Centro de Vida Hogar Belén - Buesaco, Nariño"
4. Visibilidad: Privado (recomendado) o Público
5. NO inicialices con README, .gitignore o licencia (ya los tienes)
6. Click "Create repository"

### 1.3 Conectar Repositorio Local a GitHub

```bash
git remote add origin https://github.com/TU-USUARIO/hogar-belen-web.git
git branch -M main
git push -u origin main
```

---

## 🔧 Paso 2: Configurar Variables de Entorno

### 2.1 Crear archivo `.env.local` (NO lo subas a Git)

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anonima-aqui

# Site Configuration
VITE_SITE_URL=https://hogar-belen.com
VITE_SITE_NAME=Hogar Belén

# Contact Information
VITE_PHONE_NUMBER=+57XXXXXXXXXX
VITE_WHATSAPP_NUMBER=+57XXXXXXXXXX
VITE_EMAIL=contacto@hogar-belen.com

# Google Analytics (opcional)
VITE_GA_TRACKING_ID=G-XXXXXXXXXX

# Google Maps API (opcional)
VITE_GOOGLE_MAPS_API_KEY=tu-api-key-aqui
```

### 2.2 Asegurar que `.env.local` está en `.gitignore`

Verifica que tu `.gitignore` contiene:

```
# Environment variables
.env
.env.local
.env.production
.env.*.local
```

---

## 🌐 Paso 3: Desplegar en Vercel

### 3.1 Conectar Proyecto a Vercel

#### Opción A: Desde Vercel Dashboard (Recomendado)

1. Ve a https://vercel.com/new
2. Click "Import Git Repository"
3. Autoriza Vercel a acceder a tu GitHub
4. Selecciona el repositorio `hogar-belen-web`
5. Click "Import"

#### Opción B: Desde CLI de Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Desplegar
vercel
```

### 3.2 Configurar el Proyecto en Vercel

**Framework Preset:** Vite

**Build Settings:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

**Root Directory:** `./` (raíz del proyecto)

### 3.3 Agregar Variables de Entorno en Vercel

1. En el dashboard de Vercel, ve a tu proyecto
2. Click en "Settings" → "Environment Variables"
3. Agrega cada variable de tu `.env.local`:

```
VITE_SUPABASE_URL = https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY = tu-clave-aqui
VITE_SITE_URL = https://hogar-belen.com
VITE_PHONE_NUMBER = +57XXXXXXXXXX
VITE_WHATSAPP_NUMBER = +57XXXXXXXXXX
VITE_EMAIL = contacto@hogar-belen.com
```

**Importante:** Marca todas como disponibles para:
- [x] Production
- [x] Preview
- [x] Development

### 3.4 Deploy

Click "Deploy" o ejecuta:

```bash
vercel --prod
```

**Tiempo estimado:** 2-5 minutos

---

## 🌍 Paso 4: Configurar Dominio Personalizado

### 4.1 En Vercel Dashboard

1. Ve a Settings → Domains
2. Click "Add Domain"
3. Ingresa: `hogar-belen.com`
4. Click "Add"

### 4.2 Configurar DNS

Vercel te dará instrucciones específicas. Generalmente:

#### Opción A: Usar Nameservers de Vercel (Recomendado)

```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

1. Ve al panel de tu proveedor de dominio (GoDaddy, Namecheap, etc.)
2. Cambia los nameservers a los de Vercel
3. Espera 24-48 horas para propagación (generalmente 1-2 horas)

#### Opción B: Configurar Records Manualmente

**A Record:**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

**CNAME Record para www:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### 4.3 Agregar Subdominio www

1. En Vercel, click "Add" otra vez
2. Ingresa: `www.hogar-belen.com`
3. Vercel lo configurará automáticamente para redirigir a `hogar-belen.com`

### 4.4 Configurar HTTPS/SSL

✅ Vercel configura SSL automáticamente con Let's Encrypt
✅ HTTPS forzado por defecto
✅ Renovación automática de certificados

---

## 📊 Paso 5: Configurar Google Search Console

### 5.1 Verificar Propiedad del Sitio

1. Ve a https://search.google.com/search-console
2. Click "Agregar propiedad"
3. Selecciona "Dominio" o "Prefijo de URL"
4. Ingresa: `https://hogar-belen.com`

**Métodos de verificación:**

#### Método 1: Etiqueta HTML (Recomendado para Vercel)

Vercel te permite agregar meta tags de verificación en Settings → General → Verification

#### Método 2: Archivo HTML

1. Google te dará un archivo `google-verification-xxxxx.html`
2. Colócalo en `/public/` de tu proyecto
3. Commit y push a GitHub (se desplegará automáticamente)

#### Método 3: DNS (si usas nameservers de Vercel)

Agrega un TXT record según las instrucciones de Google

### 5.2 Enviar Sitemap

1. Una vez verificado, ve a "Sitemaps" en Search Console
2. Ingresa: `sitemap.xml`
3. Click "Enviar"
4. Google comenzará a indexar tu sitio

**Verifica tu sitemap en:**
https://hogar-belen.com/sitemap.xml

---

## 📈 Paso 6: Configurar Google Analytics 4

### 6.1 Crear Propiedad GA4

1. Ve a https://analytics.google.com
2. Click "Admin" → "Create Property"
3. Nombre: "Hogar Belén"
4. Timezone: Colombia (UTC-5)
5. Currency: COP (Peso Colombiano)

### 6.2 Crear Data Stream

1. Selecciona "Web"
2. URL: `https://hogar-belen.com`
3. Stream name: "Hogar Belén Website"
4. Copia el Measurement ID (G-XXXXXXXXX)

### 6.3 Agregar a Variables de Entorno

En Vercel → Settings → Environment Variables:

```
VITE_GA_TRACKING_ID = G-XXXXXXXXX
```

### 6.4 Implementar en el Código

Si aún no está implementado, agrega en `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXX');
</script>
```

---

## 🗺️ Paso 7: Configurar Google My Business

### 7.1 Crear Perfil

1. Ve a https://business.google.com
2. Click "Administrar ahora"
3. Ingresa información:

**Nombre:** Hogar Belén
**Categoría principal:** Centro de atención para adultos mayores
**Categorías secundarias:**
- Centro de día
- Servicios de atención médica a domicilio
- Residencia para personas mayores

**Ubicación:** Buesaco, Nariño, Colombia
**Área de servicio:** Buesaco, Pasto, San Lorenzo, Arboleda

### 7.2 Completar Información

**Horario:**
- Lunes a Viernes: 7:00 AM - 6:00 PM
- Sábados: 8:00 AM - 2:00 PM
- Domingos: Cerrado

**Contacto:**
- Teléfono: +57 XXX XXX XXXX
- Website: https://hogar-belen.com
- WhatsApp: Habilitar mensajería

**Descripción:**
```
Hogar Belén es un centro de vida y cuidado integral para adultos mayores en Buesaco, Nariño. 
Ofrecemos servicios de centro de día, actividades terapéuticas, nutrición especializada, 
atención profesional a domicilio y turismo rural adaptado. Con más de 10 años de experiencia, 
brindamos un ambiente cálido y familiar donde tus seres queridos reciben el cuidado y respeto 
que merecen.
```

### 7.3 Agregar Fotos (Mínimo 10)

**Tipos de fotos:**
- Fachada / Logo (obligatorio)
- Instalaciones interiores
- Actividades terapéuticas
- Comedor / áreas comunes
- Jardines / espacios exteriores
- Equipo profesional
- Actividades de grupo
- Eventos especiales

**Requisitos:**
- Formato: JPG o PNG
- Tamaño: Mínimo 720px ancho
- Peso: Máximo 5MB por foto
- Calidad: Alta resolución

### 7.4 Obtener y Responder Reseñas

**Generar link para reseñas:**

1. En GMB, ve a "Home"
2. Click en "Get more reviews"
3. Copia el link corto

**Ejemplo:**
`https://g.page/r/XXXXXXXXX/review`

**Estrategia:**
- Solicita reseñas a familias satisfechas por WhatsApp
- Incluye el link en emails post-servicio
- Agrega un QR code en las instalaciones
- Responde TODAS las reseñas (positivas y negativas) en <24 horas

---

## 🔍 Paso 8: Optimización Post-Deployment

### 8.1 Verificar que todo funciona

```bash
# Checklist de Verificación
□ Sitio carga correctamente en https://hogar-belen.com
□ Todas las páginas son accesibles
□ Imágenes se cargan correctamente
□ Formularios funcionan
□ Links de WhatsApp abren correctamente
□ Botones de CTA funcionan
□ Responsive funciona en móvil
□ SSL está activo (candado verde)
□ robots.txt accesible: /robots.txt
□ sitemap.xml accesible: /sitemap.xml
```

### 8.2 Auditoría con Lighthouse

1. Abre Chrome DevTools (F12)
2. Ve a la pestaña "Lighthouse"
3. Selecciona:
   - [x] Performance
   - [x] Accessibility
   - [x] Best Practices
   - [x] SEO
4. Device: Mobile y Desktop
5. Click "Analyze page load"

**Objetivos:**
- Performance: >85
- Accessibility: >90
- Best Practices: >90
- SEO: >90

### 8.3 Probar Core Web Vitals

Ve a: https://pagespeed.web.dev/

Ingresa: `https://hogar-belen.com`

**Métricas objetivo:**
- LCP (Largest Contentful Paint): <2.5s
- FID (First Input Delay): <100ms
- CLS (Cumulative Layout Shift): <0.1

### 8.4 Verificar Schema Markup

Ve a: https://search.google.com/test/rich-results

Ingresa: `https://hogar-belen.com`

Debe detectar:
- LocalBusiness schema
- Organization schema
- BreadcrumbList schema (en páginas internas)

### 8.5 Probar Open Graph

Ve a: https://www.opengraph.xyz/

Ingresa: `https://hogar-belen.com`

Verifica que se muestra:
- Título correcto
- Descripción correcta
- Imagen OG correcta

---

## 📱 Paso 9: Configurar PWA (Opcional pero Recomendado)

### 9.1 Crear `manifest.json`

Crea `/public/manifest.json`:

```json
{
  "name": "Hogar Belén - Centro de Vida",
  "short_name": "Hogar Belén",
  "description": "Centro de cuidado integral para adultos mayores en Buesaco, Nariño",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#4F9D9D",
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### 9.2 Agregar a `index.html`

```html
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#4F9D9D">
<link rel="apple-touch-icon" href="/icons/icon-192x192.png">
```

---

## 🔄 Paso 10: Configurar CI/CD (Automático con Vercel)

### 10.1 Deployment Automático

✅ Cada push a `main` despliega automáticamente a producción
✅ Cada PR crea un preview deployment
✅ Rollbacks con un click

### 10.2 Configurar Branch Protection (Recomendado)

En GitHub:
1. Settings → Branches → Add rule
2. Branch name pattern: `main`
3. [x] Require pull request reviews before merging
4. [x] Require status checks to pass before merging

---

## 📊 Paso 11: Monitoreo Continuo

### 11.1 Configurar Alertas

**En Vercel:**
- Settings → Notifications
- Habilita notificaciones para:
  - Deployment failed
  - Deployment success (opcional)

**En Google Search Console:**
- Settings → Users and permissions
- Agrega tu email
- Recibirás alertas de:
  - Errores de indexación
  - Problemas de seguridad
  - Mejoras de usabilidad móvil

### 11.2 Revisiones Semanales

**Checklist semanal:**
- [ ] Revisar Google Analytics (tráfico, conversiones)
- [ ] Revisar Google Search Console (errores, mejoras)
- [ ] Responder reseñas de GMB
- [ ] Verificar uptime (Vercel dashboard)
- [ ] Revisar logs de errores

### 11.3 Revisiones Mensuales

**Checklist mensual:**
- [ ] Actualizar sitemap si hay nuevas páginas
- [ ] Publicar nuevos artículos de blog (según estrategia)
- [ ] Analizar keywords emergentes
- [ ] Auditoría Lighthouse
- [ ] Backup de base de datos Supabase
- [ ] Revisar Core Web Vitals
- [ ] Actualizar contenido desactualizado

---

## 🆘 Troubleshooting

### Problema: Sitio no carga después del deployment

**Solución:**
1. Verifica logs en Vercel → Deployments → [Tu deployment] → Building
2. Revisa que `npm run build` funciona localmente
3. Verifica que todas las variables de entorno estén configuradas

### Problema: Imágenes no cargan

**Solución:**
1. Verifica que las imágenes estén en `/public/` o importadas correctamente
2. Rutas deben ser absolutas: `/images/foto.jpg` no `./images/foto.jpg`
3. Asegúrate de usar import para assets en `/src/assets/`

### Problema: Variables de entorno no funcionan

**Solución:**
1. Deben empezar con `VITE_`
2. Deben estar en Settings → Environment Variables en Vercel
3. Requiere nuevo deployment después de agregarlas
4. Usa `import.meta.env.VITE_TU_VARIABLE` en el código

### Problema: Dominio no resuelve

**Solución:**
1. Verifica configuración DNS (puede tardar 24-48h)
2. Usa https://dnschecker.org para verificar propagación
3. Limpia caché DNS local: `ipconfig /flushdns` (Windows) o `sudo dscacheutil -flushcache` (Mac)

### Problema: Google Search Console no verifica

**Solución:**
1. Verifica que el meta tag o archivo HTML esté en la página
2. Espera 5-10 minutos después del deployment
3. Prueba método alternativo (DNS o Google Analytics)

---

## ✅ Checklist Final Post-Deployment

### Técnico
- [ ] Sitio accesible en dominio personalizado
- [ ] HTTPS activo y forzado
- [ ] robots.txt accesible y correcto
- [ ] sitemap.xml accesible y enviado a GSC
- [ ] Meta tags SEO en todas las páginas
- [ ] Schema markup implementado
- [ ] Open Graph tags implementados
- [ ] Favicon y app icons configurados
- [ ] PWA manifest configurado (opcional)
- [ ] Variables de entorno configuradas

### SEO y Analytics
- [ ] Google Search Console verificado y sitemap enviado
- [ ] Google Analytics 4 configurado y tracking activo
- [ ] Google My Business creado y verificado
- [ ] GMB con mínimo 5 fotos de calidad
- [ ] Información NAP consistente en todas las plataformas
- [ ] Primera auditoría Lighthouse completada (>85 en todas las categorías)
- [ ] Core Web Vitals en rango verde

### Contenido y Marketing
- [ ] Todas las páginas principales con contenido optimizado
- [ ] CTAs claros y funcionales
- [ ] Formularios de contacto probados
- [ ] Links de WhatsApp probados
- [ ] Testimonios y casos de éxito visibles
- [ ] Información de contacto visible en todas las páginas

### Monitoreo
- [ ] Alertas configuradas en Vercel
- [ ] Alertas configuradas en GSC
- [ ] Plan de contenido mensual definido
- [ ] Calendario de revisiones establecido
- [ ] Documentación de accesos y credenciales

---

## 📞 Soporte y Recursos

### Documentación Oficial
- [Vercel Docs](https://vercel.com/docs)
- [Google Search Console Help](https://support.google.com/webmasters)
- [Google Analytics](https://support.google.com/analytics)
- [Vite Guide](https://vitejs.dev/guide/)

### Comunidades
- [Vercel Discord](https://vercel.com/discord)
- [Stack Overflow - Vercel](https://stackoverflow.com/questions/tagged/vercel)

### Contacto del Proyecto
- **Email técnico:** dev@hogar-belen.com
- **Repositorio:** github.com/[usuario]/hogar-belen-web
- **Vercel Dashboard:** vercel.com/[usuario]/hogar-belen-web

---

## 🎉 ¡Felicidades!

Tu sitio Hogar Belén está ahora desplegado en Vercel con:
✅ SEO técnico optimizado
✅ Configuración local para búsquedas en Buesaco y Nariño
✅ Analytics y monitoreo configurado
✅ HTTPS y seguridad activa
✅ Deployment automático con CI/CD

**Próximos pasos recomendados:**
1. Publicar primer artículo de blog (según estrategia SEO)
2. Solicitar primeras 10 reseñas en Google My Business
3. Crear contenido para redes sociales vinculando al sitio
4. Configurar Google Ads local (opcional)
5. Registrar en directorios locales y de salud

**Meta 6 meses:**
- Top 3 en "hogar geriátrico Buesaco"
- Top 5 en "centro vida adultos mayores Nariño"
- 1000+ visitas orgánicas mensuales
- 50+ reseñas en GMB
- 15+ conversiones mensuales

¡Éxito con Hogar Belén! 🏡❤️
