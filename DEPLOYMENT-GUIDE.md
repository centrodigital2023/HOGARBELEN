# 🚀 Guía de Despliegue de HOGARBELEN en Vercel

## 📋 Resumen

Este proyecto es una aplicación React + Vite SPA (Single Page Application) que se despliega en Vercel desde la rama `main`. La aplicación incluye:
- Frontend React con enrutamiento del lado del cliente
- Páginas legales estáticas (terms.html, privacy.html) accesibles públicamente
- Integración con Supabase para backend y autenticación
- Sin servidor backend local (todo a través de Supabase)

---

## 🏗️ Estructura del Proyecto

```
HOGARBELEN/
├── index.html                 # Entry point HTML (raíz)
├── vite.config.ts            # Configuración de Vite
├── vercel.json               # Configuración de Vercel
├── package.json              # Dependencias y scripts
├── public/                   # Archivos estáticos
│   ├── terms.html           # Términos y condiciones (estático)
│   ├── privacy.html         # Política de privacidad (estático)
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── main.tsx             # Entry point de la aplicación
│   ├── App.tsx              # Componente principal con rutas
│   ├── páginas/             # Componentes de páginas
│   └── ...
└── dist/                    # Build output (no versionado)
```

---

## 📦 Prerequisitos

- Cuenta en GitHub
- Cuenta en Vercel (puedes usar login con GitHub)
- Credenciales de Supabase (URL y Anon Key)
- Node.js 18+ y npm

---

## 🚀 Despliegue en Vercel

### Paso 1: Conectar Repositorio a Vercel

1. **Accede a Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Inicia sesión con tu cuenta de GitHub

2. **Importa el Proyecto**
   - Click en **"Add New Project"**
   - Selecciona el repositorio `centrodigital2023/HOGARBELEN`
   - Click en **"Import"**

3. **Configura el Proyecto**
   
   Vercel detectará automáticamente que es un proyecto Vite, pero verifica:
   
   ```
   Framework Preset: Vite
   Root Directory: ./
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   Node.js Version: 18.x (o superior)
   ```

### Paso 2: Configurar Variables de Entorno

En la sección **Environment Variables** de Vercel, agrega las siguientes variables:

**Variables Requeridas:**

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_anonima_aqui
```

**Variables Opcionales (según necesidad):**

```bash
# Site Configuration
VITE_SITE_URL=https://hogarbelen.org
VITE_SITE_NAME=Hogar Belén

# Contact Information
VITE_PHONE_NUMBER=+57_XXX_XXX_XXXX
VITE_WHATSAPP_NUMBER=+57_XXX_XXX_XXXX
VITE_EMAIL=contacto@hogarbelen.org

# Analytics (si se usa)
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

**IMPORTANTE:** 
- Marca todas las variables como disponibles para **Production**, **Preview** y **Development**
- Las variables DEBEN empezar con `VITE_` para ser accesibles en el cliente
- Obtén las credenciales de Supabase desde: [app.supabase.com](https://app.supabase.com) → Tu Proyecto → Settings → API

### Paso 3: Desplegar

1. Click en **"Deploy"**
2. Espera 3-5 minutos mientras Vercel:
   - Instala las dependencias con `npm install`
   - Construye el proyecto con `npm run build`
   - Despliega los archivos estáticos
3. Tu sitio estará disponible en: `https://hogarbelen-xxx.vercel.app`

---

## 🌍 Configurar Dominio Personalizado (hogarbelen.org)

### En Vercel Dashboard

1. Ve a tu proyecto en Vercel
2. **Settings** → **Domains**
3. Click en **"Add Domain"**
4. Ingresa: `hogarbelen.org` (sin www)
5. Click en **"Add"**
6. Repite para: `www.hogarbelen.org`

### Configurar DNS en tu Proveedor de Dominio

Tienes dos opciones:

#### Opción A: Nameservers de Vercel (Recomendado)

1. Vercel te proporcionará nameservers:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```

2. Ve al panel de tu proveedor de dominio (GoDaddy, Namecheap, etc.)
3. Cambia los nameservers a los de Vercel
4. Espera 24-48 horas para propagación DNS (usualmente 1-2 horas)

#### Opción B: Records DNS Manuales

Agrega estos records en tu proveedor de DNS:

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

### Verificar Configuración

Una vez configurado el DNS:

```bash
# Verificar propagación DNS
dig hogarbelen.org
dig www.hogarbelen.org

# O usar herramienta online
# https://dnschecker.org/
```

---

## 📄 Páginas Legales Públicas

### Acceso Directo (Sin Autenticación)

Las páginas legales están disponibles como archivos HTML estáticos en:

- **Términos y Condiciones:** https://hogarbelen.org/terms.html
- **Política de Privacidad:** https://hogarbelen.org/privacy.html

### Redirects Automáticos

El archivo `vercel.json` está configurado para redirigir las rutas SPA a los archivos estáticos:

```json
{
  "redirects": [
    {
      "source": "/terminos",
      "destination": "/terms.html",
      "permanent": false
    },
    {
      "source": "/privacidad",
      "destination": "/privacy.html",
      "permanent": false
    }
  ]
}
```

Esto significa que ambas URLs funcionan:
- https://hogarbelen.org/terminos → redirige a → /terms.html
- https://hogarbelen.org/terms.html → acceso directo

---

## 🔄 CI/CD Automático

### Despliegue Automático Configurado

✅ **Push a `main`:** Despliega automáticamente a producción  
✅ **Pull Request:** Crea un preview deployment único  
✅ **Commit a PR:** Actualiza el preview deployment  

### Branch Protection (Opcional pero Recomendado)

En GitHub:
1. **Settings** → **Branches** → **Add rule**
2. Branch name pattern: `main`
3. ✅ Require pull request reviews before merging
4. ✅ Require status checks to pass before merging

---

## ✅ Checklist Post-Deployment

### Funcionalidad Básica
- [ ] Sitio carga en el dominio personalizado
- [ ] HTTPS está activo (candado verde)
- [ ] Página principal se muestra correctamente
- [ ] Navegación entre páginas funciona
- [ ] Imágenes y assets cargan correctamente

### Páginas Legales
- [ ] `/terms.html` es accesible públicamente (sin login)
- [ ] `/privacy.html` es accesible públicamente (sin login)
- [ ] `/terminos` redirige a `/terms.html`
- [ ] `/privacidad` redirige a `/privacy.html`
- [ ] Contenido se ve correctamente formateado

### SEO y Rendimiento
- [ ] `robots.txt` accesible en `/robots.txt`
- [ ] `sitemap.xml` accesible en `/sitemap.xml`
- [ ] Meta tags presentes en el HTML
- [ ] Open Graph tags configurados

### Responsive Design
- [ ] Sitio se ve bien en móvil (< 768px)
- [ ] Sitio se ve bien en tablet (768px - 1024px)
- [ ] Sitio se ve bien en desktop (> 1024px)
- [ ] Menú de navegación funciona en móvil
- [ ] Botones y formularios son usables en móvil

### Integraciones
- [ ] Formularios envían datos correctamente
- [ ] Autenticación con Supabase funciona
- [ ] Links de WhatsApp funcionan
- [ ] Enlaces externos funcionan

---

## 🔧 Comandos Útiles

### Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Ejecutar en puerto específico
npm run dev -- --port 3000

# Build local para verificar
npm run build

# Preview del build local
npm run preview
```

### Vercel CLI (Opcional)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy a preview
vercel

# Deploy a producción
vercel --prod

# Ver logs
vercel logs

# Ver lista de despliegues
vercel ls
```

---

## 🐛 Troubleshooting

### Problema: Sitio muestra error 404

**Solución:**
- Verifica que `vercel.json` contiene la regla de rewrite correcta
- Verifica que `index.html` está en la raíz del proyecto
- Verifica que el build se completó exitosamente en Vercel logs

### Problema: Variables de entorno no funcionan

**Solución:**
- Verifica que las variables empiezan con `VITE_`
- Verifica que están configuradas en Vercel Dashboard
- Redespliega después de agregar variables (no se aplican automáticamente)
- Usa `import.meta.env.VITE_TU_VARIABLE` en el código

### Problema: Legal pages no son accesibles

**Solución:**
- Verifica que `terms.html` y `privacy.html` existen en `/public`
- Verifica que el build los copió a `/dist` correctamente
- Verifica que `vercel.json` tiene las reglas de redirect correctas
- Limpia la caché del navegador

### Problema: Dominio no resuelve

**Solución:**
- Verifica configuración DNS (puede tardar hasta 48h)
- Usa [dnschecker.org](https://dnschecker.org) para verificar propagación
- Limpia caché DNS local:
  - Windows: `ipconfig /flushdns`
  - Mac: `sudo dscacheutil -flushcache`
  - Linux: `sudo systemd-resolve --flush-caches`

### Problema: Build falla en Vercel

**Solución:**
- Verifica que `npm run build` funciona localmente
- Revisa los logs de build en Vercel
- Verifica que todas las dependencias están en `package.json`
- Verifica la versión de Node.js en Vercel (debe ser 18+)

---

## 📊 Monitoreo y Analytics

### Vercel Analytics

Vercel proporciona analytics básicos automáticamente:
- Visitas y pageviews
- Tiempos de carga
- Core Web Vitals
- Distribución geográfica

Accede en: Vercel Dashboard → Tu Proyecto → Analytics

### Google Analytics 4 (Opcional)

Si configuraste `VITE_GA_TRACKING_ID`:

1. Los eventos se trackean automáticamente
2. Accede a [analytics.google.com](https://analytics.google.com)
3. Monitorea tráfico, conversiones, y comportamiento de usuarios

### Google Search Console (Recomendado)

1. Ve a [search.google.com/search-console](https://search.google.com/search-console)
2. Agrega tu propiedad: `hogarbelen.org`
3. Verifica usando el método DNS o HTML tag
4. Envía tu sitemap: `https://hogarbelen.org/sitemap.xml`

---

## 🔐 Seguridad

### Headers de Seguridad

Los siguientes headers están configurados automáticamente en Vercel:

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000
```

### Variables Sensibles

⚠️ **NUNCA** commits:
- Archivos `.env` o `.env.local`
- API keys o secrets
- Credenciales de Supabase
- Tokens de acceso

✅ **SIEMPRE** usa:
- Variables de entorno en Vercel Dashboard
- Supabase Row Level Security (RLS)
- HTTPS para todas las comunicaciones

---

## 📞 Soporte y Recursos

### Documentación Oficial
- [Vercel Docs](https://vercel.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [React Router](https://reactrouter.com/)
- [Supabase Docs](https://supabase.com/docs)

### Repositorio
- **GitHub:** [centrodigital2023/HOGARBELEN](https://github.com/centrodigital2023/HOGARBELEN)
- **Issues:** Reporta problemas en GitHub Issues
- **Pull Requests:** Contribuciones son bienvenidas

### Contacto del Proyecto
- **Email:** hogarbelen2022@gmail.com
- **WhatsApp:** +57 321 570 8655
- **Sitio web:** https://hogarbelen.org

---

## 🎉 ¡Listo!

Tu aplicación HOGARBELEN ahora está desplegada en Vercel con:

✅ Despliegue automático desde `main`  
✅ Dominio personalizado configurado  
✅ HTTPS habilitado automáticamente  
✅ Páginas legales públicas y accesibles  
✅ Responsive design para móvil y desktop  
✅ Integración con Supabase  
✅ CI/CD automático  

**URLs Principales:**
- **Sitio principal:** https://hogarbelen.org
- **Términos:** https://hogarbelen.org/terms.html
- **Privacidad:** https://hogarbelen.org/privacy.html

---

**Última actualización:** Enero 2025
