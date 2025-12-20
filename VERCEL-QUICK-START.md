# 🚀 Despliegue Rápido en Vercel - Hogar Belén

## ✅ Estado del Proyecto

El proyecto **está listo para desplegarse en Vercel**. Todas las configuraciones necesarias ya están implementadas:

- ✅ `vercel.json` configurado correctamente
- ✅ Build scripts funcionando (`npm run build`)
- ✅ SEO optimizado (robots.txt, sitemap.xml)
- ✅ Configuración de headers de seguridad
- ✅ Redirects configurados
- ✅ Variables de entorno documentadas

---

## 📋 Pasos para Desplegar

### 1. Acceder a Vercel

Visita: https://vercel.com/

- Inicia sesión con tu cuenta de GitHub
- Si no tienes cuenta, créala (es gratis)

### 2. Importar el Proyecto

1. Click en **"Add New Project"** o **"Import Project"**
2. Selecciona **"Import Git Repository"**
3. Busca y selecciona: `centrodigital2023/HOGARBELEN`
4. Click en **"Import"**

### 3. Configurar el Proyecto

Vercel detectará automáticamente que es un proyecto Vite. Verifica que la configuración sea:

```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
Root Directory: ./
```

### 4. Agregar Variables de Entorno

**⚠️ IMPORTANTE:** Antes de hacer deploy, configura las siguientes variables de entorno:

En la sección **Environment Variables**, agrega:

```env
VITE_SUPABASE_URL=https://cgfpwlqnhgclzzaiqhwz.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_anonima_aqui
VITE_SITE_URL=https://www.hogarbelen.org
```

**Cómo obtener la ANON_KEY:**
1. Ve a https://supabase.com/dashboard
2. Selecciona el proyecto: `cgfpwlqnhgclzzaiqhwz`
3. Ve a Settings → API
4. Copia el valor de `anon` `public` key

**Marca las variables para:**
- ✅ Production
- ✅ Preview
- ✅ Development

### 5. Desplegar

1. Click en **"Deploy"**
2. Espera 2-3 minutos mientras Vercel:
   - Instala dependencias
   - Ejecuta el build
   - Despliega los archivos

### 6. Configurar Dominio

Una vez desplegado, tu sitio estará en: `https://hogarbelen-xxx.vercel.app`

**Para usar el dominio personalizado `www.hogarbelen.org`:**

1. En el dashboard de tu proyecto en Vercel, ve a **Settings → Domains**
2. Click en **"Add Domain"**
3. Ingresa: `www.hogarbelen.org`
4. Click en **"Add"**

**Configurar DNS:**

Vercel te mostrará instrucciones específicas. La opción más simple:

**Opción A: Usar Nameservers de Vercel (Recomendado)**
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

**Opción B: Configurar registros DNS manualmente**

Para `www.hogarbelen.org`:
```
Tipo: CNAME
Nombre: www
Valor: cname.vercel-dns.com
TTL: 3600
```

Para dominio raíz `hogarbelen.org`:
```
Tipo: A
Nombre: @ (o vacío)
Valor: 76.76.21.21
TTL: 3600
```

### 7. Verificar el Despliegue

✅ Visita: https://www.hogarbelen.org (puede tardar hasta 48h en propagar el DNS)
✅ Verifica que el sitio carga correctamente
✅ Revisa que todas las imágenes cargan
✅ Prueba la navegación entre páginas
✅ Verifica que los formularios funcionan

---

## 🔄 Despliegues Automáticos

Una vez conectado con GitHub, **cada push a la rama `main` desplegará automáticamente**:

```bash
git add .
git commit -m "Actualización del sitio"
git push origin main
```

Vercel automáticamente:
1. ✅ Detecta el cambio
2. ✅ Ejecuta el build
3. ✅ Despliega a producción
4. ✅ Te notifica por email

---

## 📊 Configuraciones Incluidas

### Headers de Seguridad
- ✅ X-Content-Type-Options: nosniff
- ✅ X-Frame-Options: DENY
- ✅ X-XSS-Protection
- ✅ Referrer-Policy
- ✅ Permissions-Policy

### Cache Control
- ✅ HTML: Sin cache (siempre actualizado)
- ✅ Assets: Cache de 1 año (inmutable)

### Redirects
- ✅ `/home` → `/`
- ✅ Dominios alternativos → `www.hogarbelen.org`

### SEO
- ✅ robots.txt configurado
- ✅ sitemap.xml generado
- ✅ Meta tags optimizados
- ✅ Schema.org markup

---

## 🐛 Solución de Problemas

### Error: "Build Failed"

**Solución:**
```bash
# Verifica el build localmente
npm install
npm run build

# Si hay errores, revísalos en la terminal
```

### Error: "Variables de entorno no funcionan"

**Solución:**
1. Ve a Settings → Environment Variables en Vercel
2. Verifica que todas empiecen con `VITE_`
3. Haz un nuevo deploy: Deployments → ⋯ → Redeploy

### Dominio no resuelve

**Solución:**
1. La propagación DNS puede tardar hasta 48 horas
2. Verifica la configuración en https://www.whatsmydns.net
3. Limpia tu caché DNS local:
   - Windows: `ipconfig /flushdns`
   - Mac/Linux: `sudo dscacheutil -flushcache`

---

## 📚 Documentación Completa

Para instrucciones más detalladas:
- 📖 [DEPLOY-VERCEL.md](./DEPLOY-VERCEL.md) - Guía completa
- 📖 [VERCEL-DEPLOYMENT-GUIDE.md](./VERCEL-DEPLOYMENT-GUIDE.md) - Guía extendida
- 📖 [CONFIGURACION-DOMINIO.md](./CONFIGURACION-DOMINIO.md) - Configuración de dominio

---

## ✅ Checklist de Despliegue

Usa esta lista para asegurarte de que todo está configurado:

- [ ] Proyecto importado en Vercel
- [ ] Variables de entorno configuradas
- [ ] Build exitoso
- [ ] Deploy completado
- [ ] Dominio personalizado agregado
- [ ] DNS configurado
- [ ] Sitio accesible en https://www.hogarbelen.org
- [ ] HTTPS activo (candado verde)
- [ ] Todas las páginas cargan correctamente
- [ ] Imágenes se muestran correctamente
- [ ] Formularios funcionan
- [ ] Google Search Console verificado (opcional pero recomendado)
- [ ] Analytics configurado (opcional)

---

## 🎉 ¡Listo!

Tu sitio **Hogar Belén** estará en vivo en:

### 🌐 https://www.hogarbelen.org

**Tiempo total estimado:** 15-30 minutos (sin contar propagación DNS)

---

## 📞 Soporte

Si tienes problemas:
- 📖 Consulta [DEPLOY-VERCEL.md](./DEPLOY-VERCEL.md)
- 💬 Vercel Support: https://vercel.com/support
- 📧 Supabase Support: https://supabase.com/support

---

**Última actualización:** Diciembre 2024  
**Versión:** 1.0  
**Proyecto:** centrodigital2023/HOGARBELEN
