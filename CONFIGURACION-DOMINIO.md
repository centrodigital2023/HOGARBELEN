# 🌐 Configuración del Dominio www.hogarbelen.org

## 📋 Resumen de Configuración

**Dominio Principal:** www.hogarbelen.org  
**Proyecto:** Hogar Belén - Centro de Vida para Adultos Mayores  
**Plataforma de Deploy:** Vercel  
**Base de Datos:** Supabase (cgfpwlqnhgclzzaiqhwz)

---

## 🎯 Pasos para Configurar el Dominio en Vercel

### 1. Acceder al Proyecto en Vercel

1. Inicia sesión en [vercel.com](https://vercel.com)
2. Selecciona tu proyecto "hogar-belen"
3. Ve a **Settings** → **Domains**

### 2. Agregar el Dominio www.hogarbelen.org

En la sección de Domains:

1. Haz clic en **Add Domain**
2. Ingresa: `www.hogarbelen.org`
3. Haz clic en **Add**

### 3. Agregar el Dominio Raíz (opcional pero recomendado)

Para redirigir automáticamente:

1. Agrega también: `hogarbelen.org`
2. Vercel configurará automáticamente la redirección de `hogarbelen.org` → `www.hogarbelen.org`

---

## 🔧 Configuración DNS del Dominio

Debes configurar los registros DNS en tu proveedor de dominio (donde compraste hogarbelen.org).

### Opción A: Usando Nameservers de Vercel (Recomendado)

**Ventaja:** Configuración automática y más simple.

1. En Vercel, copia los nameservers que te proporciona
2. Ve a tu proveedor de dominio
3. Reemplaza los nameservers actuales con los de Vercel:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```

### Opción B: Configuración Manual de Registros DNS

Si prefieres mantener tus nameservers actuales:

#### Para www.hogarbelen.org:

```
Tipo: CNAME
Nombre: www
Valor: cname.vercel-dns.com
TTL: 3600
```

#### Para hogarbelen.org (dominio raíz):

```
Tipo: A
Nombre: @ (o raíz)
Valor: 76.76.21.21
TTL: 3600
```

**Registros adicionales (recomendados):**

```
Tipo: AAAA (IPv6)
Nombre: @
Valor: 2606:4700:4700::1111
TTL: 3600
```

---

## ✅ Verificación de la Configuración

### 1. Esperar Propagación DNS

- Tiempo normal: 5-30 minutos
- Puede tomar hasta 48 horas en algunos casos
- Verifica con: [whatsmydns.net](https://www.whatsmydns.net)

### 2. Verificar en Vercel

En Vercel → Settings → Domains, deberías ver:

✓ `www.hogarbelen.org` - Ready  
✓ `hogarbelen.org` - Redirect to www.hogarbelen.org

### 3. Verificar SSL/HTTPS

Vercel configura automáticamente SSL con Let's Encrypt:

- Estado: **SSL Certificate Issued**
- Acceso: `https://www.hogarbelen.org`

---

## 🔐 Variables de Entorno en Vercel

Asegúrate de configurar estas variables en **Settings** → **Environment Variables**:

```bash
VITE_SUPABASE_URL=https://cgfpwlqnhgclzzaiqhwz.supabase.co
VITE_SUPABASE_ANON_KEY=tu_anon_key_aqui
```

### Cómo Obtener las Claves de Supabase:

1. Ve a [supabase.com](https://supabase.com)
2. Selecciona tu proyecto: **cgfpwlqnhgclzzaiqhwz**
3. Ve a **Settings** → **API**
4. Copia:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** → `VITE_SUPABASE_ANON_KEY`

---

## 🚀 Deploy a Producción

### Deploy Automático

Cada push a la rama `main` desplegará automáticamente a producción.

```bash
git add .
git commit -m "Configuración del dominio www.hogarbelen.org"
git push origin main
```

### Deploy Manual desde Vercel

1. Ve a tu proyecto en Vercel
2. Haz clic en **Deploy**
3. Selecciona la rama y confirma

---

## 📊 Configuración de Analytics y SEO

### Google Search Console

1. Ve a [search.google.com/search-console](https://search.google.com/search-console)
2. Agrega la propiedad: `https://www.hogarbelen.org`
3. Verifica con método de verificación HTML (agregar en `index.html`)
4. Envía el sitemap: `https://www.hogarbelen.org/sitemap.xml`

### Google Analytics

Agrega el código de tracking en `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Google Business Profile

Actualiza tu ficha con el nuevo dominio:

1. Ve a [business.google.com](https://business.google.com)
2. Edita tu perfil de Hogar Belén
3. Actualiza el sitio web: `https://www.hogarbelen.org`

---

## 🌍 Configuración de Dominios Alternativos

El archivo `vercel.json` ya incluye redirecciones automáticas:

- `hogarbelen.org` → `www.hogarbelen.org`
- `hogarbelen.com` → `www.hogarbelen.org`
- `www.hogarbelen.com` → `www.hogarbelen.org`

Todas las variantes redirigirán automáticamente al dominio principal.

---

## 📝 URLs Canónicas Configuradas

Todas las páginas tienen URLs canónicas apuntando a www.hogarbelen.org:

```html
<link rel="canonical" href="https://www.hogarbelen.org/" />
```

Páginas principales:
- `https://www.hogarbelen.org/`
- `https://www.hogarbelen.org/centro-vida-adultos-mayores-buesaco`
- `https://www.hogarbelen.org/plan-amigos-adultos-mayores`
- `https://www.hogarbelen.org/plan-sol-y-cafe-buesaco`
- `https://www.hogarbelen.org/plan-sonreir-celebraciones-adultos-mayores`
- `https://www.hogarbelen.org/plan-turismo-rural-adultos-mayores`

---

## 🔍 Verificación Final

### Checklist de Producción

- [ ] Dominio configurado en Vercel
- [ ] DNS apuntando correctamente
- [ ] SSL/HTTPS funcionando
- [ ] Variables de entorno configuradas
- [ ] Deploy exitoso
- [ ] Todas las páginas accesibles
- [ ] Imágenes cargando correctamente
- [ ] Formularios funcionando
- [ ] Google Search Console verificado
- [ ] Google Analytics instalado
- [ ] Supabase conectado y funcionando

### Comandos de Verificación

```bash
# Verificar DNS
nslookup www.hogarbelen.org

# Verificar SSL
curl -I https://www.hogarbelen.org

# Verificar redirecciones
curl -I http://hogarbelen.org
```

---

## 🆘 Solución de Problemas

### El dominio no resuelve

1. Verifica la configuración DNS en tu proveedor
2. Espera propagación (hasta 48 horas)
3. Limpia caché DNS local: `ipconfig /flushdns` (Windows) o `sudo dscacheutil -flushcache` (Mac)

### Error de SSL

1. Vercel genera SSL automáticamente
2. Puede tomar 10-30 minutos
3. Si persiste, elimina y vuelve a agregar el dominio

### Supabase no conecta

1. Verifica las variables de entorno en Vercel
2. Asegúrate que las claves sean las correctas
3. Verifica que el proyecto de Supabase esté activo

---

## 📞 Contacto de Soporte

**Vercel Support:** [vercel.com/support](https://vercel.com/support)  
**Supabase Support:** [supabase.com/support](https://supabase.com/support)

---

## 🎉 ¡Listo!

Una vez completados todos los pasos, tu sitio estará disponible en:

### 🌐 https://www.hogarbelen.org

Tu Centro de Vida para Adultos Mayores en Buesaco, Nariño, ahora en producción.
