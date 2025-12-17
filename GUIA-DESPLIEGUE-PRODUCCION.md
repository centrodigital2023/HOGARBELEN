# 🚀 Guía Completa de Despliegue a Producción
# www.hogarbelen.org

## 📋 Resumen Ejecutivo

Esta guía proporciona instrucciones paso a paso para desplegar el sitio web de Hogar Belén en el dominio **www.hogarbelen.org** utilizando Vercel como plataforma de hosting.

**Tiempo estimado:** 30-45 minutos  
**Nivel de dificultad:** Intermedio  
**Prerrequisitos:** Acceso a GitHub, cuenta de Vercel, acceso al registrador de dominio

---

## ✅ Estado Actual del Proyecto

### Configuración Completada ✓

- ✅ **Código fuente:** Listo y configurado para www.hogarbelen.org
- ✅ **Dominio en código:** Todas las referencias apuntan a www.hogarbelen.org
- ✅ **SEO:** Meta tags, Open Graph y Schema.org configurados
- ✅ **Sitemap:** `/public/sitemap.xml` con todas las URLs del sitio
- ✅ **Robots.txt:** `/public/robots.txt` configurado correctamente
- ✅ **Vercel.json:** Configuración de headers, redirects y rewrites
- ✅ **Build:** Proceso de construcción verificado y funcional

### URLs Canónicas Configuradas

Todas las páginas ya tienen configuradas las URLs canónicas:
```
https://www.hogarbelen.org/
https://www.hogarbelen.org/centro-vida-adultos-mayores-buesaco
https://www.hogarbelen.org/plan-amigos-adultos-mayores
https://www.hogarbelen.org/plan-sol-y-cafe-buesaco
https://www.hogarbelen.org/plan-sonreir-celebraciones-adultos-mayores
https://www.hogarbelen.org/plan-turismo-rural-adultos-mayores
```

---

## 🎯 Pasos para Desplegar

## Paso 1: Preparar Variables de Entorno

### 1.1 Obtener Credenciales de Supabase

1. Accede a [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecciona el proyecto: **cgfpwlqnhgclzzaiqhwz**
3. Ve a **Settings** → **API**
4. Copia las siguientes credenciales:
   - **Project URL** (VITE_SUPABASE_URL)
   - **anon public key** (VITE_SUPABASE_ANON_KEY)

### 1.2 Variables Necesarias

```bash
# Supabase (REQUERIDO)
VITE_SUPABASE_URL=https://cgfpwlqnhgclzzaiqhwz.supabase.co
VITE_SUPABASE_ANON_KEY=[tu-clave-anonima-aqui]

# Dominio (ya configurado en el código)
VITE_SITE_URL=https://www.hogarbelen.org

# Google Analytics (OPCIONAL)
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

**⚠️ IMPORTANTE:** Mantén estas credenciales seguras y nunca las subas a GitHub.

---

## Paso 2: Configurar Vercel

### 2.1 Crear Cuenta y Conectar Repositorio

1. Ve a [vercel.com](https://vercel.com)
2. Inicia sesión con tu cuenta de GitHub
3. Haz clic en **"Add New Project"**
4. Selecciona el repositorio: `centrodigital2023/HOGARBELEN`
5. Haz clic en **"Import"**

### 2.2 Configurar el Proyecto

En la pantalla de configuración del proyecto:

```
Project Name: hogar-belen
Framework Preset: Vite
Root Directory: ./
Build Command: npm run build
Output Directory: dist
Install Command: npm install
Node.js Version: 18.x (o superior)
```

### 2.3 Agregar Variables de Entorno

Antes de hacer el primer deploy:

1. En la sección **Environment Variables**
2. Agrega cada variable:
   - Nombre: `VITE_SUPABASE_URL`
   - Valor: `https://cgfpwlqnhgclzzaiqhwz.supabase.co`
   - Environments: ✓ Production ✓ Preview ✓ Development
   
   - Nombre: `VITE_SUPABASE_ANON_KEY`
   - Valor: [tu-clave-aqui]
   - Environments: ✓ Production ✓ Preview ✓ Development

3. Si tienes Google Analytics:
   - Nombre: `VITE_GA_TRACKING_ID`
   - Valor: `G-XXXXXXXXXX`
   - Environments: ✓ Production ✓ Preview ✓ Development

### 2.4 Hacer el Primer Deploy

1. Haz clic en **"Deploy"**
2. Espera 2-5 minutos mientras Vercel construye y despliega
3. Una vez completado, tendrás una URL temporal: `hogar-belen-xxx.vercel.app`
4. ✅ Verifica que el sitio carga correctamente en la URL temporal

---

## Paso 3: Configurar el Dominio www.hogarbelen.org

### 3.1 Agregar Dominio en Vercel

1. En tu proyecto de Vercel, ve a **Settings** → **Domains**
2. Haz clic en **"Add"**
3. Ingresa: `www.hogarbelen.org`
4. Haz clic en **"Add"**

### 3.2 Agregar Dominio Raíz (Opcional pero Recomendado)

Para redirigir `hogarbelen.org` → `www.hogarbelen.org`:

1. Haz clic en **"Add"** nuevamente
2. Ingresa: `hogarbelen.org`
3. Vercel automáticamente configurará la redirección

### 3.3 Configurar DNS

Vercel te mostrará las instrucciones de DNS. Tienes dos opciones:

#### Opción A: Usar Nameservers de Vercel (Recomendado - Más Simple)

**Ventajas:**
- Configuración automática
- Actualización instantánea
- Sin necesidad de configurar records manualmente

**Pasos:**
1. En tu proveedor de dominio (donde compraste hogarbelen.org)
2. Ve a la configuración de **Nameservers** o **DNS**
3. Reemplaza los nameservers actuales con:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
4. Guarda los cambios
5. La propagación toma 5-30 minutos (hasta 48 horas en casos raros)

#### Opción B: Configurar Records DNS Manualmente

**Si prefieres mantener tus nameservers actuales:**

**Para www.hogarbelen.org:**
```
Tipo: CNAME
Nombre: www
Valor: cname.vercel-dns.com
TTL: 3600
```

**Para hogarbelen.org (dominio raíz):**
```
Tipo: A
Nombre: @ (o dejar vacío/raíz)
Valor: 76.76.21.21
TTL: 3600
```

**Registro AAAA (IPv6 - opcional):**
```
Tipo: AAAA
Nombre: @
Valor: 2606:4700:4700::1111
TTL: 3600
```

### 3.4 Verificar Configuración DNS

Después de configurar, espera propagación y verifica:

```bash
# Verificar www
nslookup www.hogarbelen.org

# Verificar dominio raíz
nslookup hogarbelen.org

# Herramienta online
# Ve a: https://www.whatsmydns.net
# Ingresa: www.hogarbelen.org
```

### 3.5 Verificar en Vercel

En Vercel → Settings → Domains, deberías ver:

```
✓ www.hogarbelen.org - Ready
✓ hogarbelen.org - Redirect to www.hogarbelen.org
```

**Estado del SSL:**
- ✓ SSL Certificate Issued
- Acceso seguro: https://www.hogarbelen.org

---

## Paso 4: Configurar Supabase para Producción

### 4.1 Actualizar URLs Permitidas en Supabase

1. Ve a [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecciona tu proyecto: **cgfpwlqnhgclzzaiqhwz**
3. Ve a **Authentication** → **URL Configuration**
4. En **Site URL**, cambia a:
   ```
   https://www.hogarbelen.org
   ```

5. En **Redirect URLs**, agrega:
   ```
   https://www.hogarbelen.org
   https://www.hogarbelen.org/**
   https://www.hogarbelen.org/auth/callback
   http://localhost:5173
   http://localhost:5173/**
   ```

6. Guarda los cambios

### 4.2 Verificar Conexión

Una vez desplegado, abre la consola del navegador en tu sitio:

```javascript
// Esto debe retornar la configuración de Supabase
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);

// Esto debe retornar una sesión o null (si no estás logueado)
// Verifica en el código que el cliente de Supabase se inicializa correctamente
```

---

## Paso 5: Verificar el Deploy

### 5.1 Checklist de Verificación Básica

Accede a https://www.hogarbelen.org y verifica:

- [ ] ✅ El sitio carga sin errores
- [ ] ✅ Aparece el candado verde (HTTPS)
- [ ] ✅ El logo de Hogar Belén se ve correctamente
- [ ] ✅ El menú de navegación funciona
- [ ] ✅ Las imágenes cargan
- [ ] ✅ Los colores y estilos se ven bien

### 5.2 Verificar Páginas Principales

Navega y verifica cada página:

- [ ] https://www.hogarbelen.org/
- [ ] https://www.hogarbelen.org/centro-vida-adultos-mayores-buesaco
- [ ] https://www.hogarbelen.org/plan-amigos-adultos-mayores
- [ ] https://www.hogarbelen.org/plan-sol-y-cafe-buesaco
- [ ] https://www.hogarbelen.org/servicios
- [ ] https://www.hogarbelen.org/contacto

### 5.3 Verificar Funcionalidades

- [ ] **WhatsApp:** Haz clic en los botones de WhatsApp
  - Debe abrir WhatsApp Web o la app
  - Número correcto: +57 321 570 8655
  
- [ ] **Formularios:** Prueba el formulario de contacto
  - Validación funciona
  - Envío funciona (prueba con email real)
  
- [ ] **Navegación:** Prueba todos los links del menú
  
- [ ] **Responsive:** Prueba en móvil
  - Abre Chrome DevTools (F12)
  - Activa vista móvil
  - Verifica que todo se ve bien

### 5.4 Verificar Redirecciones

Prueba que las redirecciones funcionan:

```bash
# Redirigir de HTTP a HTTPS
curl -I http://www.hogarbelen.org
# Debe retornar 301 o 308 y redirigir a https://

# Redirigir de dominio raíz a www
curl -I https://hogarbelen.org
# Debe retornar 301 o 308 y redirigir a https://www.hogarbelen.org
```

---

## Paso 6: Configurar SEO y Analytics

### 6.1 Google Search Console

1. Ve a [Google Search Console](https://search.google.com/search-console)
2. Haz clic en **"Agregar propiedad"**
3. Selecciona **"Prefijo de URL"**
4. Ingresa: `https://www.hogarbelen.org`

**Verificación mediante etiqueta HTML (recomendado):**
- Google te dará un meta tag de verificación
- En Vercel: Settings → General → Verification
- Agrega el código de verificación
- Vuelve a Google Search Console y haz clic en **"Verificar"**

**Enviar Sitemap:**
1. Una vez verificado, ve a **"Sitemaps"**
2. Ingresa: `sitemap.xml`
3. Haz clic en **"Enviar"**
4. Google comenzará a indexar tus páginas

### 6.2 Google Analytics 4 (Opcional)

Si configuraste GA tracking ID:

1. Ve a [Google Analytics](https://analytics.google.com)
2. Verifica que esté rastreando
3. Ve a **Real-Time** → **Overview**
4. Abre tu sitio en otra pestaña
5. Deberías ver tu visita en tiempo real

### 6.3 Google Business Profile

1. Ve a [Google Business](https://business.google.com)
2. Si ya tienes un perfil, actualiza:
   - **Sitio web:** https://www.hogarbelen.org
3. Si no tienes perfil, créalo:
   - **Nombre:** Hogar Belén
   - **Categoría:** Centro de atención para adultos mayores
   - **Ubicación:** Buesaco, Nariño, Colombia
   - **Sitio web:** https://www.hogarbelen.org
   - **Teléfono:** +57 321 570 8655

---

## Paso 7: Monitoreo y Optimización

### 7.1 Verificar Performance

1. Ve a [PageSpeed Insights](https://pagespeed.web.dev/)
2. Ingresa: `https://www.hogarbelen.org`
3. Analiza los resultados

**Objetivos:**
- Performance: > 85
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

### 7.2 Verificar Core Web Vitals

En PageSpeed Insights, revisa:
- **LCP** (Largest Contentful Paint): < 2.5s ✓
- **FID** (First Input Delay): < 100ms ✓
- **CLS** (Cumulative Layout Shift): < 0.1 ✓

### 7.3 Verificar Schema Markup

1. Ve a [Rich Results Test](https://search.google.com/test/rich-results)
2. Ingresa: `https://www.hogarbelen.org`
3. Verifica que detecte:
   - LocalBusiness
   - NursingHome
   - Organization

---

## Paso 8: Deploy Continuo (CI/CD)

### 8.1 Deploy Automático

✅ **Ya está configurado automáticamente con Vercel**

Cada vez que hagas push a la rama `main`:
1. Vercel detecta el cambio
2. Ejecuta `npm run build`
3. Despliega automáticamente
4. Te notifica por email

**Comandos Git para actualizar:**
```bash
# 1. Hacer cambios en el código
# 2. Agregar cambios
git add .

# 3. Commit
git commit -m "Descripción de los cambios"

# 4. Push (esto despliega automáticamente)
git push origin main
```

### 8.2 Preview Deployments

Cada Pull Request (PR) crea automáticamente:
- Una URL de preview única
- Puedes probar cambios antes de mergear a main
- Útil para revisar antes de producción

---

## 🆘 Solución de Problemas

### Problema 1: El sitio no carga

**Síntomas:** Error 404, página en blanco, o "This site can't be reached"

**Soluciones:**
1. Verifica que el DNS está configurado correctamente
2. Espera propagación DNS (puede tomar hasta 48 horas)
3. Limpia caché DNS:
   - Windows: `ipconfig /flushdns`
   - Mac: `sudo dscacheutil -flushcache`
   - Linux: `sudo systemd-resolve --flush-caches`
4. Verifica en [DNS Checker](https://dnschecker.org)

### Problema 2: Imágenes no cargan

**Síntomas:** Iconos rotos, imágenes faltantes

**Soluciones:**
1. Verifica que las imágenes estén en `/src/assets/` o `/public/`
2. Verifica que las rutas en el código sean correctas
3. Revisa los logs en Vercel → Deployments → [Tu deployment] → Building
4. Asegúrate de que las imágenes fueron incluidas en el commit

### Problema 3: Variables de entorno no funcionan

**Síntomas:** Supabase no conecta, errores de "undefined"

**Soluciones:**
1. Verifica que las variables en Vercel comiencen con `VITE_`
2. Verifica que estén marcadas para Production
3. Re-deploy el sitio:
   - Vercel → Deployments → ... → Redeploy
4. Verifica las claves de Supabase en el dashboard

### Problema 4: SSL no funciona

**Síntomas:** "Your connection is not private", "NET::ERR_CERT_AUTHORITY_INVALID"

**Soluciones:**
1. Vercel genera SSL automáticamente (puede tomar 10-30 minutos)
2. En Vercel, ve a Settings → Domains
3. Verifica que diga "SSL Certificate Issued"
4. Si persiste, elimina y vuelve a agregar el dominio

### Problema 5: Build falla

**Síntomas:** "Build Failed" en Vercel

**Soluciones:**
1. Verifica logs en Vercel → Deployments → [Failed deployment] → Building
2. Prueba el build localmente:
   ```bash
   npm install
   npm run build
   ```
3. Corrige errores que aparezcan
4. Push de nuevo a GitHub

### Problema 6: Formularios no envían

**Síntomas:** Formularios no responden, errores en consola

**Soluciones:**
1. Verifica conexión con Supabase
2. Revisa RLS (Row Level Security) en Supabase
3. Verifica políticas de seguridad en tablas
4. Revisa console del navegador para errores JavaScript

---

## 📊 Checklist Post-Deployment

### Inmediato (Primeras 2 horas)

- [ ] Sitio accesible en https://www.hogarbelen.org
- [ ] SSL/HTTPS funcionando (candado verde)
- [ ] Todas las páginas principales cargan
- [ ] Imágenes cargan correctamente
- [ ] WhatsApp abre correctamente
- [ ] Sin errores en consola del navegador

### Primeras 24 horas

- [ ] Verificar logs en Vercel
- [ ] Probar funcionalidades críticas
- [ ] Verificar que formularios funcionan
- [ ] Probar en diferentes dispositivos
- [ ] Probar en diferentes navegadores

### Primera Semana

- [ ] Google Search Console verificado
- [ ] Sitemap enviado y aceptado
- [ ] Google Analytics rastreando (si configurado)
- [ ] Sin errores de indexación
- [ ] Performance auditado con Lighthouse

### Primer Mes

- [ ] Monitorear tráfico en Analytics
- [ ] Revisar posicionamiento en Google
- [ ] Solicitar primeras reseñas en Google Business
- [ ] Optimizar páginas según datos
- [ ] Crear contenido nuevo si es necesario

---

## 📞 Recursos y Contactos

### Documentación Técnica

- **Vercel Docs:** https://vercel.com/docs
- **Supabase Docs:** https://supabase.com/docs
- **Vite Docs:** https://vitejs.dev/guide/

### Plataformas

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Supabase Dashboard:** https://supabase.com/dashboard/project/cgfpwlqnhgclzzaiqhwz
- **GitHub Repo:** https://github.com/centrodigital2023/HOGARBELEN

### SEO y Analytics

- **Google Search Console:** https://search.google.com/search-console
- **Google Analytics:** https://analytics.google.com
- **PageSpeed Insights:** https://pagespeed.web.dev/
- **DNS Checker:** https://dnschecker.org

### Herramientas Útiles

- **Schema Validator:** https://validator.schema.org/
- **Open Graph Checker:** https://www.opengraph.xyz/
- **SSL Checker:** https://www.sslshopper.com/ssl-checker.html

---

## 🎉 ¡Deploy Exitoso!

Una vez completados todos los pasos, tu sitio estará disponible en:

### 🌐 https://www.hogarbelen.org

**Hogar Belén - Centro de Vida para Adultos Mayores**  
📍 Buesaco, Nariño, Colombia  
📞 +57 321 570 8655  
📧 hogarbelen2022@gmail.com

---

## 📈 Próximos Pasos Recomendados

1. **Contenido:**
   - Publicar artículos de blog regularmente
   - Actualizar fotos periódicamente
   - Agregar testimonios de familias

2. **Marketing:**
   - Actualizar redes sociales con el nuevo dominio
   - Solicitar reseñas en Google Business
   - Crear estrategia de contenido local

3. **SEO Local:**
   - Registrar en directorios locales de Nariño
   - Crear contenido específico de Buesaco
   - Optimizar para búsquedas locales

4. **Monitoreo:**
   - Revisar Analytics semanalmente
   - Monitorear Core Web Vitals
   - Responder a mensajes y consultas rápidamente

---

**Fecha de creación:** Diciembre 2024  
**Versión:** 1.0  
**Autor:** Equipo de Desarrollo Hogar Belén

---

**¡Éxito con tu nuevo sitio web! 🎊**
