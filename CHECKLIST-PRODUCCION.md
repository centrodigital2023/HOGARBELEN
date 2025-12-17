# ✅ Checklist de Producción - www.hogarbelen.org

## 🎯 Pre-Deploy

### Código y Build
- [ ] Todas las páginas funcionan correctamente en local
- [ ] No hay errores en la consola del navegador
- [ ] No hay errores TypeScript (`npm run build` exitoso)
- [ ] Todas las imágenes cargan correctamente
- [ ] Todas las rutas funcionan sin errores
- [ ] Formularios validados y funcionando
- [ ] Responsive design en móvil, tablet y desktop

### Configuración
- [ ] `.env.example` actualizado con todas las variables necesarias
- [ ] `vercel.json` configurado correctamente
- [ ] `robots.txt` en `/public`
- [ ] `sitemap.xml` en `/public` actualizado
- [ ] Favicon configurado en `index.html`
- [ ] Dominio canónico configurado en todas las páginas

---

## 🌐 Configuración de Dominio

### DNS y Dominio
- [ ] Dominio `www.hogarbelen.org` adquirido
- [ ] Acceso al panel de control del dominio
- [ ] DNS configurado (CNAME o A records)
- [ ] Nameservers apuntando a Vercel (si aplica)
- [ ] Redirección de `hogarbelen.org` → `www.hogarbelen.org`

### Verificación DNS
```bash
# Verificar CNAME
nslookup www.hogarbelen.org

# Verificar A record
nslookup hogarbelen.org
```

---

## 🚀 Deploy en Vercel

### Configuración Inicial
- [ ] Cuenta de Vercel creada
- [ ] Repositorio conectado con Vercel
- [ ] Proyecto importado correctamente
- [ ] Framework preset: Vite
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`

### Variables de Entorno
- [ ] `VITE_SUPABASE_URL` configurada
- [ ] `VITE_SUPABASE_ANON_KEY` configurada
- [ ] Variables aplicadas a Production, Preview y Development

### Dominio en Vercel
- [ ] Dominio `www.hogarbelen.org` agregado
- [ ] Dominio `hogarbelen.org` agregado (para redirección)
- [ ] Estado: "Ready" o "Valid Configuration"
- [ ] SSL/HTTPS funcionando (candado verde)

---

## 🗄️ Configuración de Supabase

### Base de Datos
- [ ] Proyecto Supabase: `cgfpwlqnhgclzzaiqhwz` activo
- [ ] Todas las tablas creadas (`profiles`, `appointments`, `subscriptions`, `promo_codes`)
- [ ] Row Level Security (RLS) habilitado en todas las tablas
- [ ] Políticas de seguridad configuradas
- [ ] Funciones SQL ejecutadas correctamente

### Autenticación
- [ ] Email provider habilitado
- [ ] URL del sitio configurada en Supabase
- [ ] Redirect URLs configuradas:
  - `https://www.hogarbelen.org`
  - `https://www.hogarbelen.org/**`
  - `http://localhost:5173` (para desarrollo)

### Verificación de Conexión
```bash
# En la consola del navegador después del deploy
console.log(supabase.auth.getSession())
```

---

## 🔍 SEO y Indexación

### Google Search Console
- [ ] Cuenta creada
- [ ] Propiedad `https://www.hogarbelen.org` agregada
- [ ] Propiedad verificada (HTML tag o DNS)
- [ ] Sitemap enviado: `https://www.hogarbelen.org/sitemap.xml`
- [ ] Cobertura de índice sin errores

### Google Analytics
- [ ] Cuenta de GA4 creada
- [ ] Código de tracking instalado en `index.html`
- [ ] Tracking funcionando (verificar en Real-Time)
- [ ] Conversiones configuradas (WhatsApp, llamadas, formularios)

### Google Business Profile
- [ ] Perfil creado para "Hogar Belén"
- [ ] Ubicación: Buesaco, Nariño
- [ ] Sitio web actualizado: `https://www.hogarbelen.org`
- [ ] Categoría: Nursing Home / Centro de Vida
- [ ] Fotos agregadas
- [ ] Horarios configurados
- [ ] Teléfono y email actualizados

### Schema.org (Datos Estructurados)
- [ ] Schema LocalBusiness en `index.html`
- [ ] Schema NursingHome en `index.html`
- [ ] Schema Organization en `index.html`
- [ ] Validado en [Schema Markup Validator](https://validator.schema.org/)

### Meta Tags
- [ ] Title optimizado en todas las páginas
- [ ] Meta description en todas las páginas
- [ ] Open Graph configurado
- [ ] Twitter Cards configurado
- [ ] Canonical URLs configuradas

---

## 🎨 Performance y Optimización

### Core Web Vitals
Verifica en [PageSpeed Insights](https://pagespeed.web.dev/):

- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] FID (First Input Delay) < 100ms
- [ ] CLS (Cumulative Layout Shift) < 0.1
- [ ] Performance Score > 90

### Optimización de Recursos
- [ ] Imágenes en formato WebP
- [ ] Imágenes con lazy loading
- [ ] Texto ALT en todas las imágenes
- [ ] CSS minificado
- [ ] JavaScript minificado
- [ ] Fuentes web optimizadas (Google Fonts preconnect)

---

## 🔐 Seguridad

### Headers de Seguridad
Verificar en `vercel.json`:
- [ ] X-Content-Type-Options: nosniff
- [ ] X-Frame-Options: DENY
- [ ] X-XSS-Protection: 1; mode=block
- [ ] Referrer-Policy configurada
- [ ] Permissions-Policy configurada

### SSL/HTTPS
- [ ] Certificado SSL activo
- [ ] HTTPS forzado (sin HTTP)
- [ ] Certificado válido (verificar en navegador)

### Autenticación
- [ ] Claves de Supabase en variables de entorno (no en código)
- [ ] RLS habilitado en todas las tablas
- [ ] Sesiones seguras
- [ ] Logout funcionando correctamente

---

## 📱 Funcionalidad

### Navegación
- [ ] Menú principal funciona en todas las páginas
- [ ] Links internos funcionan
- [ ] Redirecciones configuradas
- [ ] Página 404 personalizada (si aplica)

### Formularios
- [ ] Formulario de contacto funciona
- [ ] Validación de campos
- [ ] Mensajes de error claros
- [ ] Confirmación de envío

### Integración con WhatsApp
- [ ] Botones de WhatsApp funcionan
- [ ] Número correcto: +57 321 570 8655
- [ ] Mensaje pre-rellenado apropiado

### Planes y Servicios
- [ ] Todas las subpáginas de planes accesibles
- [ ] Imágenes cargando en planes
- [ ] CTAs funcionando
- [ ] Información actualizada

### Autenticación
- [ ] Login funciona
- [ ] Registro funciona
- [ ] Logout funciona
- [ ] Dashboards (familiar y profesional) funcionan
- [ ] Protección de rutas funciona

---

## 🧪 Testing en Producción

### Navegadores
- [ ] Chrome (desktop y móvil)
- [ ] Firefox
- [ ] Safari (iOS y macOS)
- [ ] Edge

### Dispositivos
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Móvil (375x667 - iPhone SE)
- [ ] Móvil (414x896 - iPhone 11)

### Funcionalidades Críticas
- [ ] Página principal carga completamente
- [ ] Navegación entre páginas
- [ ] Formularios envían correctamente
- [ ] Login/Registro funciona
- [ ] Dashboard familiar funciona
- [ ] Dashboard profesional funciona
- [ ] WhatsApp se abre correctamente
- [ ] Imágenes cargan (incluyendo logo)

---

## 📊 Monitoreo Post-Deploy

### Primeras 24 horas
- [ ] Verificar errores en Vercel → Logs
- [ ] Verificar tráfico en Analytics
- [ ] Probar todas las funcionalidades críticas
- [ ] Revisar Search Console por errores de indexación
- [ ] Verificar que los emails de Supabase funcionen

### Primera semana
- [ ] Monitorear Core Web Vitals
- [ ] Verificar conversiones (leads)
- [ ] Revisar páginas más visitadas
- [ ] Identificar errores recurrentes
- [ ] Actualizar contenido si es necesario

### Mensual
- [ ] Revisar posicionamiento en Google
- [ ] Actualizar sitemap si hay nuevo contenido
- [ ] Analizar palabras clave
- [ ] Optimizar páginas con alto tráfico pero baja conversión
- [ ] Agregar nuevo contenido al blog (si existe)

---

## 🔗 Enlaces Importantes

### Producción
- 🌐 **Sitio:** https://www.hogarbelen.org
- 🚀 **Vercel:** https://vercel.com/dashboard
- 🗄️ **Supabase:** https://supabase.com/dashboard/project/cgfpwlqnhgclzzaiqhwz

### SEO y Analytics
- 🔍 **Search Console:** https://search.google.com/search-console
- 📊 **Analytics:** https://analytics.google.com
- 🏢 **Google Business:** https://business.google.com
- ⚡ **PageSpeed:** https://pagespeed.web.dev/

### Social
- 📘 **Facebook:** https://www.facebook.com/Hogarbelenbuesaco
- 📸 **Instagram:** https://www.instagram.com/hogargeriatricobelen
- 🎥 **YouTube:** https://www.youtube.com/@hogarbelengeriatrico9521

---

## ✅ Aprobación Final

### Stakeholders
- [ ] Revisión por dueño/administrador de Hogar Belén
- [ ] Aprobación de contenido
- [ ] Aprobación de diseño
- [ ] Aprobación de funcionalidad

### Lanzamiento
- [ ] Fecha de lanzamiento acordada
- [ ] Plan de comunicación preparado
- [ ] Redes sociales actualizadas con nuevo dominio
- [ ] Material de marketing actualizado

---

## 🎉 Post-Lanzamiento

### Comunicación
- [ ] Anuncio en redes sociales
- [ ] Email a base de datos existente
- [ ] Actualizar firma de email
- [ ] Actualizar materiales impresos
- [ ] Notificar a medios locales (si aplica)

### Monitoreo
- [ ] Configurar alertas en Vercel
- [ ] Configurar alertas en Supabase
- [ ] Revisar feedback de usuarios
- [ ] Documentar problemas y soluciones

---

**Fecha de revisión:** _____________  
**Aprobado por:** _____________  
**Fecha de lanzamiento:** _____________

---

## 📝 Notas Adicionales

Usa este espacio para notas específicas del proyecto:

```
[Escribe aquí cualquier nota relevante]
```

---

**Proyecto:** Hogar Belén - Centro de Vida para Adultos Mayores  
**Dominio:** www.hogarbelen.org  
**Ubicación:** Buesaco, Nariño, Colombia  
**Contacto:** +57 321 570 8655 | hogarbelen2022@gmail.com
