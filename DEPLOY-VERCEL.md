# 🚀 Guía Rápida de Deploy en Vercel para www.hogarbelen.org

## 📦 Preparación del Proyecto

### 1. Repositorio en GitHub

Asegúrate de que tu proyecto esté en un repositorio de GitHub:

```bash
git init
git add .
git commit -m "Configuración inicial para www.hogarbelen.org"
git branch -M main
git remote add origin https://github.com/tu-usuario/hogar-belen.git
git push -u origin main
```

---

## 🌐 Deploy en Vercel

### Método 1: Deploy desde la Web de Vercel (Recomendado)

1. **Accede a Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Inicia sesión con tu cuenta de GitHub

2. **Importa el Proyecto**
   - Haz clic en **"Add New Project"**
   - Selecciona el repositorio `hogar-belen`
   - Haz clic en **"Import"**

3. **Configura el Proyecto**
   ```
   Project Name: hogar-belen
   Framework Preset: Vite
   Root Directory: ./
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Variables de Entorno**
   
   Antes de hacer deploy, configura estas variables en **Environment Variables**:
   
   ```
   VITE_SUPABASE_URL=https://cgfpwlqnhgclzzaiqhwz.supabase.co
   VITE_SUPABASE_ANON_KEY=tu_clave_anon_aqui
   ```
   
   **Cómo obtener las claves:**
   - Ve a [supabase.com](https://supabase.com)
   - Proyecto: **cgfpwlqnhgclzzaiqhwz**
   - Settings → API → Copia las claves

5. **Deploy**
   - Haz clic en **"Deploy"**
   - Espera 2-3 minutos
   - Tu sitio estará en: `https://hogar-belen-xxx.vercel.app`

---

### Método 2: Deploy desde CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy a producción
vercel --prod
```

---

## 🌍 Configurar el Dominio www.hogarbelen.org

### 1. En Vercel

1. Ve a tu proyecto en Vercel
2. **Settings** → **Domains**
3. Haz clic en **"Add Domain"**
4. Ingresa: `www.hogarbelen.org`
5. Haz clic en **"Add"**

### 2. Configurar DNS

Vercel te mostrará cómo configurar el DNS. Tienes dos opciones:

#### Opción A: Nameservers de Vercel (Más Simple)

En tu proveedor de dominio (donde compraste hogarbelen.org):

1. Ve a la configuración de DNS/Nameservers
2. Cambia los nameservers a:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```

#### Opción B: Registros DNS Manuales

Si prefieres mantener tus nameservers actuales:

**Para www.hogarbelen.org:**
```
Tipo: CNAME
Nombre: www
Valor: cname.vercel-dns.com
TTL: 3600
```

**Para hogarbelen.org (raíz):**
```
Tipo: A
Nombre: @ (o vacío)
Valor: 76.76.21.21
TTL: 3600
```

### 3. Agregar Dominio Raíz (Opcional)

Para redirigir `hogarbelen.org` → `www.hogarbelen.org`:

1. En Vercel, agrega también: `hogarbelen.org`
2. Vercel configurará la redirección automáticamente

### 4. Esperar Propagación

- Tiempo normal: 5-30 minutos
- Máximo: 48 horas
- Verifica en: [whatsmydns.net](https://www.whatsmydns.net)

---

## ✅ Verificación del Deploy

### 1. Verificar que el sitio carga

```bash
curl -I https://www.hogarbelen.org
```

Deberías ver: `HTTP/2 200`

### 2. Verificar SSL

El certificado SSL se configura automáticamente:
- ✅ https://www.hogarbelen.org (con candado verde)

### 3. Verificar Redirecciones

```bash
# Esto debería redirigir a www
curl -I http://hogarbelen.org
```

---

## 🔧 Comandos Útiles

### Build Local (Antes de Deploy)

```bash
# Instalar dependencias
npm install

# Build de producción
npm run build

# Preview local del build
npm run preview
```

### Verificar Build

```bash
# Debe crear la carpeta dist/
ls -la dist/

# Verificar tamaño del build
du -sh dist/
```

---

## 📊 Monitoreo Post-Deploy

### Vercel Analytics

Vercel incluye analytics gratuitos:
- Ve a tu proyecto → **Analytics**
- Monitorea: visitas, performance, errores

### Google Search Console

1. Ve a [search.google.com/search-console](https://search.google.com/search-console)
2. Agrega: `https://www.hogarbelen.org`
3. Verifica propiedad
4. Envía sitemap: `https://www.hogarbelen.org/sitemap.xml`

### Google Analytics

Si tienes GA configurado, verifica que esté trackeando:
1. Ve a [analytics.google.com](https://analytics.google.com)
2. Real-Time → Overview
3. Visita tu sitio y verifica que aparezca

---

## 🔄 Deploy Continuo (CI/CD)

### Deploy Automático

Una vez conectado con GitHub, cada push desplegará automáticamente:

```bash
git add .
git commit -m "Actualización del sitio"
git push origin main
```

Vercel automáticamente:
1. Detecta el push
2. Ejecuta el build
3. Despliega a producción
4. Te notifica por email

### Deploy por Ramas

- `main` → Producción (www.hogarbelen.org)
- Otras ramas → Preview URLs automáticas

---

## 🐛 Solución de Problemas

### Error: "Build Failed"

**Causa:** Errores de TypeScript o build

**Solución:**
```bash
# Local
npm run build

# Si falla, revisa los errores
# Corrige y vuelve a intentar
```

### Error: "Dominio no resuelve"

**Causa:** DNS no propagado o mal configurado

**Solución:**
1. Verifica configuración DNS en tu proveedor
2. Espera 30 minutos
3. Usa [whatsmydns.net](https://www.whatsmydns.net) para verificar

### Error: "Variables de entorno no definidas"

**Causa:** Olvidaste configurar Supabase keys

**Solución:**
1. Vercel → Settings → Environment Variables
2. Agrega `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`
3. Re-deploy: Deployments → ... → Redeploy

### Imágenes no cargan

**Causa:** Rutas incorrectas o archivos no commiteados

**Solución:**
```bash
# Verifica que las imágenes estén en Git
git status

# Si no están, agrégalas
git add src/assets/
git commit -m "Agregar imágenes faltantes"
git push
```

---

## 📞 Recursos y Soporte

### Documentación Oficial

- **Vercel:** [vercel.com/docs](https://vercel.com/docs)
- **Vite:** [vitejs.dev/guide](https://vitejs.dev/guide/)
- **Supabase:** [supabase.com/docs](https://supabase.com/docs)

### Comunidad

- **Vercel Support:** [vercel.com/support](https://vercel.com/support)
- **Discord de Vercel:** [vercel.com/discord](https://vercel.com/discord)

---

## 🎯 Checklist Final

Antes de considerar el deploy completo, verifica:

- [ ] ✅ Proyecto desplegado en Vercel
- [ ] ✅ Dominio www.hogarbelen.org configurado
- [ ] ✅ DNS apuntando correctamente
- [ ] ✅ SSL/HTTPS funcionando (candado verde)
- [ ] ✅ Variables de entorno configuradas
- [ ] ✅ Todas las páginas cargando
- [ ] ✅ Imágenes cargando correctamente
- [ ] ✅ Formularios funcionando
- [ ] ✅ Supabase conectado
- [ ] ✅ Google Search Console verificado
- [ ] ✅ Analytics instalado
- [ ] ✅ Sitemap enviado
- [ ] ✅ Probado en móvil
- [ ] ✅ Probado en diferentes navegadores

---

## 🎉 ¡Deploy Exitoso!

Tu sitio ahora está en vivo en:

### 🌐 https://www.hogarbelen.org

Centro de Vida para Adultos Mayores en Buesaco, Nariño.

---

## 📈 Próximos Pasos

1. **Monitoreo:** Revisa analytics diariamente
2. **SEO:** Envía sitemap a Google Search Console
3. **Marketing:** Actualiza enlaces en redes sociales
4. **Contenido:** Publica blog posts regularmente
5. **Performance:** Monitorea Core Web Vitals

---

**Fecha de creación:** Enero 2024  
**Dominio:** www.hogarbelen.org  
**Plataforma:** Vercel  
**Framework:** React + Vite + TypeScript  
**Base de Datos:** Supabase
