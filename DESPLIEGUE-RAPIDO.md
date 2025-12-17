# ⚡ Guía Rápida de Despliegue
# www.hogarbelen.org

> Esta es una versión resumida. Para instrucciones detalladas, consulta [GUIA-DESPLIEGUE-PRODUCCION.md](./GUIA-DESPLIEGUE-PRODUCCION.md)

## ✅ Estado: Listo para Desplegar

El código ya está configurado para www.hogarbelen.org. Solo necesitas:
1. Configurar Vercel
2. Agregar variables de entorno
3. Configurar DNS

---

## 🚀 Pasos Mínimos (30 minutos)

### 1️⃣ Obtener Credenciales de Supabase (5 min)

```
1. Ve a: https://supabase.com/dashboard
2. Proyecto: cgfpwlqnhgclzzaiqhwz
3. Settings → API
4. Copia:
   - Project URL
   - anon public key
```

### 2️⃣ Configurar Vercel (10 min)

```
1. Ve a: https://vercel.com
2. Conecta con GitHub
3. Importa: centrodigital2023/HOGARBELEN
4. Configuración:
   - Framework: Vite
   - Build Command: npm run build
   - Output Directory: dist
```

**Variables de Entorno en Vercel:**
```bash
VITE_SUPABASE_URL=https://cgfpwlqnhgclzzaiqhwz.supabase.co
VITE_SUPABASE_ANON_KEY=[tu-clave-aqui]
```

Aplica a: ✓ Production ✓ Preview ✓ Development

### 3️⃣ Configurar Dominio en Vercel (5 min)

```
1. Settings → Domains
2. Add: www.hogarbelen.org
3. Add: hogarbelen.org (para redirección)
```

### 4️⃣ Configurar DNS (10 min)

**Opción A - Nameservers (Más Simple):**
```
En tu proveedor de dominio:
- Nameserver 1: ns1.vercel-dns.com
- Nameserver 2: ns2.vercel-dns.com
```

**Opción B - Records Manuales:**
```
CNAME: www → cname.vercel-dns.com
A: @ → 76.76.21.21
```

### 5️⃣ Actualizar Supabase

```
1. Supabase Dashboard → Authentication → URL Configuration
2. Site URL: https://www.hogarbelen.org
3. Redirect URLs:
   - https://www.hogarbelen.org
   - https://www.hogarbelen.org/**
```

---

## ✅ Verificación Rápida

Accede a https://www.hogarbelen.org y verifica:

- [ ] Sitio carga con HTTPS (candado verde)
- [ ] Logo e imágenes cargan
- [ ] Menú funciona
- [ ] WhatsApp funciona: +57 321 570 8655
- [ ] Formularios funcionan

---

## 🔍 SEO Post-Deploy

### Google Search Console (5 min)

```
1. https://search.google.com/search-console
2. Agregar: https://www.hogarbelen.org
3. Verificar con meta tag (Vercel → Settings → Verification)
4. Enviar sitemap: sitemap.xml
```

---

## 📊 Herramientas de Verificación

| Herramienta | URL | Qué Verificar |
|-------------|-----|---------------|
| DNS Checker | https://dnschecker.org | Propagación DNS |
| PageSpeed | https://pagespeed.web.dev | Performance |
| SSL Checker | https://www.sslshopper.com/ssl-checker.html | Certificado SSL |

---

## 🆘 Problemas Comunes

### Sitio no carga
```bash
# Verificar DNS
nslookup www.hogarbelen.org

# Esperar propagación (5-30 min, hasta 48h)
# Limpiar caché: ipconfig /flushdns (Windows)
```

### Variables de entorno no funcionan
```
1. Vercel → Settings → Environment Variables
2. Verificar que empiecen con VITE_
3. Re-deploy: Deployments → ... → Redeploy
```

### SSL no funciona
```
# Esperar 10-30 minutos después de agregar dominio
# Vercel genera SSL automáticamente
```

---

## 🎯 Checklist Final

- [ ] ✅ Sitio accesible en https://www.hogarbelen.org
- [ ] ✅ SSL funcionando
- [ ] ✅ Todas las páginas cargan
- [ ] ✅ WhatsApp funciona
- [ ] ✅ Google Search Console configurado
- [ ] ✅ DNS propagado

---

## 📞 Contactos Importantes

**Producción:**
- 🌐 Sitio: https://www.hogarbelen.org
- 🚀 Vercel: https://vercel.com/dashboard
- 🗄️ Supabase: https://supabase.com/dashboard/project/cgfpwlqnhgclzzaiqhwz

**SEO:**
- 🔍 Search Console: https://search.google.com/search-console
- 📊 Analytics: https://analytics.google.com (si configurado)

**Repositorio:**
- 💻 GitHub: https://github.com/centrodigital2023/HOGARBELEN

---

## 🚀 Deploy Automático

Una vez configurado, cada push a `main` despliega automáticamente:

```bash
git add .
git commit -m "Actualización"
git push origin main
# Vercel despliega automáticamente en 2-5 minutos
```

---

**¿Necesitas ayuda?** Consulta la [Guía Completa](./GUIA-DESPLIEGUE-PRODUCCION.md)

---

**Hogar Belén** 🏡  
Centro de Vida para Adultos Mayores  
📍 Buesaco, Nariño  
📞 +57 321 570 8655
