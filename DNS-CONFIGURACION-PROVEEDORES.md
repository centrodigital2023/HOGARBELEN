# 🌐 Guía de Configuración DNS por Proveedor

Esta guía te ayudará a configurar el dominio **www.hogarbelen.org** dependiendo de dónde lo hayas comprado.

---

## 📋 Información Necesaria de Vercel

Antes de comenzar, obtén esta información de tu proyecto en Vercel:

1. Ve a tu proyecto en Vercel
2. Settings → Domains
3. Después de agregar el dominio, Vercel te mostrará:
   - **CNAME:** `cname.vercel-dns.com`
   - **A Record:** `76.76.21.21`

---

## 🔧 Configuración por Proveedor

### 1. GoDaddy

#### Opción A: Usar Nameservers de Vercel (Recomendado)

1. Inicia sesión en [godaddy.com](https://www.godaddy.com)
2. Ve a **My Products** → **Domains**
3. Haz clic en el dominio **hogarbelen.org**
4. En la sección **Nameservers**, haz clic en **Change**
5. Selecciona **Custom**
6. Ingresa los nameservers de Vercel:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
7. Haz clic en **Save**

#### Opción B: Configuración Manual de DNS

1. Inicia sesión en [godaddy.com](https://www.godaddy.com)
2. Ve a **My Products** → **Domains**
3. Haz clic en **DNS** junto a tu dominio
4. **Para www.hogarbelen.org:**
   - Tipo: `CNAME`
   - Nombre: `www`
   - Valor: `cname.vercel-dns.com`
   - TTL: `600 segundos`
5. **Para hogarbelen.org (raíz):**
   - Tipo: `A`
   - Nombre: `@`
   - Valor: `76.76.21.21`
   - TTL: `600 segundos`

---

### 2. Namecheap

#### Opción A: Usar Nameservers de Vercel

1. Inicia sesión en [namecheap.com](https://www.namecheap.com)
2. Ve a **Domain List**
3. Haz clic en **Manage** junto a hogarbelen.org
4. En **Nameservers**, selecciona **Custom DNS**
5. Ingresa:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
6. Haz clic en el ✓ (checkmark) verde

#### Opción B: Configuración Manual de DNS

1. En **Domain List**, haz clic en **Manage**
2. Ve a la pestaña **Advanced DNS**
3. **Agregar CNAME:**
   - Type: `CNAME Record`
   - Host: `www`
   - Value: `cname.vercel-dns.com`
   - TTL: `Automatic`
4. **Agregar A Record:**
   - Type: `A Record`
   - Host: `@`
   - Value: `76.76.21.21`
   - TTL: `Automatic`

---

### 3. Cloudflare

#### Configuración DNS

1. Inicia sesión en [cloudflare.com](https://www.cloudflare.com)
2. Selecciona tu dominio **hogarbelen.org**
3. Ve a **DNS** → **Records**
4. **Agregar CNAME para www:**
   - Type: `CNAME`
   - Name: `www`
   - Target: `cname.vercel-dns.com`
   - Proxy status: **DNS only** (nube gris, NO naranja)
   - TTL: `Auto`
5. **Agregar A Record para raíz:**
   - Type: `A`
   - Name: `@`
   - IPv4 address: `76.76.21.21`
   - Proxy status: **DNS only** (nube gris)
   - TTL: `Auto`

**⚠️ Importante:** Si usas Cloudflare, asegúrate de que el proxy esté **desactivado** (nube gris) para que Vercel pueda gestionar el SSL.

---

### 4. Google Domains (ahora Squarespace Domains)

1. Inicia sesión en [domains.google.com](https://domains.google.com) o [domains.squarespace.com](https://domains.squarespace.com)
2. Haz clic en tu dominio **hogarbelen.org**
3. Ve a **DNS** en el menú lateral
4. **Agregar CNAME:**
   - Host name: `www`
   - Type: `CNAME`
   - TTL: `3600`
   - Data: `cname.vercel-dns.com`
5. **Agregar A Record:**
   - Host name: `@`
   - Type: `A`
   - TTL: `3600`
   - Data: `76.76.21.21`

---

### 5. AWS Route 53

1. Inicia sesión en [AWS Console](https://console.aws.amazon.com)
2. Ve a **Route 53**
3. Selecciona **Hosted zones**
4. Haz clic en **hogarbelen.org**
5. **Crear CNAME:**
   - Haz clic en **Create record**
   - Record name: `www`
   - Record type: `CNAME`
   - Value: `cname.vercel-dns.com`
   - TTL: `300`
   - Routing policy: `Simple routing`
6. **Crear A Record:**
   - Haz clic en **Create record**
   - Record name: (dejar vacío para raíz)
   - Record type: `A`
   - Value: `76.76.21.21`
   - TTL: `300`

---

### 6. HostGator

1. Inicia sesión en tu cPanel
2. Ve a **Zone Editor**
3. Selecciona el dominio **hogarbelen.org**
4. **Agregar CNAME:**
   - Name: `www.hogarbelen.org`
   - Type: `CNAME`
   - Record: `cname.vercel-dns.com`
5. **Agregar A Record:**
   - Name: `hogarbelen.org`
   - Type: `A`
   - Address: `76.76.21.21`

---

### 7. Bluehost

1. Inicia sesión en tu cuenta de Bluehost
2. Ve a **Domains** → **Zone Editor**
3. Selecciona **hogarbelen.org**
4. **Agregar CNAME:**
   - Host Record: `www`
   - Points To: `cname.vercel-dns.com`
   - TTL: `14400`
5. **Agregar A Record:**
   - Host Record: `@`
   - Points To: `76.76.21.21`
   - TTL: `14400`

---

### 8. Domain.com

1. Inicia sesión en [domain.com](https://www.domain.com)
2. Ve a **My Account** → **Domain Manager**
3. Haz clic en **Manage** junto a hogarbelen.org
4. Ve a **DNS & Nameservers**
5. **Agregar CNAME:**
   - Subdomain: `www`
   - Record Type: `CNAME`
   - Destination: `cname.vercel-dns.com`
6. **Agregar A Record:**
   - Subdomain: `@`
   - Record Type: `A`
   - Destination: `76.76.21.21`

---

## ✅ Verificación de la Configuración

### 1. Verificar DNS con comandos

**En Windows (CMD o PowerShell):**
```cmd
nslookup www.hogarbelen.org
nslookup hogarbelen.org
```

**En Mac/Linux (Terminal):**
```bash
dig www.hogarbelen.org
dig hogarbelen.org
```

### 2. Verificar DNS Online

Usa estas herramientas para verificar la propagación:

- **WhatsMyDNS:** [whatsmydns.net](https://www.whatsmydns.net)
  - Ingresa: `www.hogarbelen.org`
  - Tipo: `CNAME` o `A`
  
- **DNS Checker:** [dnschecker.org](https://dnschecker.org)
  - Verifica propagación global

### 3. Verificar en Vercel

1. Ve a tu proyecto en Vercel
2. Settings → Domains
3. Deberías ver:
   - ✅ `www.hogarbelen.org` - **Valid Configuration**
   - ✅ `hogarbelen.org` - **Redirect to www.hogarbelen.org**

### 4. Verificar SSL

Una vez que el DNS esté propagado:

1. Visita: `https://www.hogarbelen.org`
2. Verifica el candado verde en la barra de direcciones
3. Haz clic en el candado → **Certificate is valid**

---

## ⏱️ Tiempo de Propagación

| Proveedor | Tiempo Típico |
|-----------|---------------|
| GoDaddy | 1-2 horas |
| Namecheap | 30 minutos - 2 horas |
| Cloudflare | 5-15 minutos |
| Google Domains | 10-30 minutos |
| AWS Route 53 | 5-10 minutos |
| HostGator | 1-4 horas |
| Bluehost | 1-4 horas |
| Domain.com | 1-2 horas |

**Máximo:** 48 horas (raro, pero posible)

---

## 🐛 Solución de Problemas

### Problema: DNS no resuelve después de 24 horas

**Solución:**
1. Verifica que los registros estén exactamente como se especifica arriba
2. Asegúrate de no tener registros duplicados
3. Elimina cualquier registro conflictivo (especialmente parking pages)
4. Contacta al soporte de tu proveedor de dominio

### Problema: SSL no se genera

**Solución:**
1. Espera 10-30 minutos después de que el DNS esté propagado
2. En Vercel, elimina y vuelve a agregar el dominio
3. Asegúrate de que no haya proxy (Cloudflare en modo naranja)

### Problema: Cloudflare muestra "Error 522"

**Solución:**
1. Ve a DNS → Records en Cloudflare
2. Haz clic en la nube naranja para cambiarla a gris
3. Esto desactiva el proxy de Cloudflare
4. Espera 5-10 minutos

### Problema: "Too many redirects"

**Solución:**
1. Verifica que no tengas redirecciones forzadas en tu proveedor
2. Desactiva cualquier SSL/TLS en tu proveedor (Vercel lo maneja)
3. En Cloudflare, cambia SSL/TLS mode a "Full" o "Full (strict)"

---

## 📞 Contacto de Soporte por Proveedor

| Proveedor | Soporte |
|-----------|---------|
| GoDaddy | https://www.godaddy.com/contact-us |
| Namecheap | https://www.namecheap.com/support/ |
| Cloudflare | https://support.cloudflare.com |
| Google Domains | https://support.google.com/domains |
| AWS | https://aws.amazon.com/support/ |
| HostGator | https://www.hostgator.com/contact |
| Bluehost | https://www.bluehost.com/contact |
| Domain.com | https://www.domain.com/help |

---

## 🎯 Configuración Recomendada

Para la mejor experiencia y menor tiempo de configuración:

1. **Mejor opción:** Usar nameservers de Vercel
   - Configuración automática
   - Menor tiempo de propagación
   - Vercel maneja todo

2. **Segunda opción:** Cloudflare con proxy desactivado
   - CDN adicional (si se activa después)
   - DDoS protection
   - Analytics incluido

3. **Tercera opción:** Configuración manual de DNS
   - Más control
   - Funciona con cualquier proveedor

---

## ✅ Checklist Final

- [ ] Registros DNS configurados
- [ ] Propagación verificada en whatsmydns.net
- [ ] Dominio aparece como "Valid" en Vercel
- [ ] SSL funcionando (candado verde)
- [ ] Redirección de raíz a www funcionando
- [ ] Sitio accesible en `https://www.hogarbelen.org`

---

**Dominio:** www.hogarbelen.org  
**Proyecto:** Hogar Belén  
**Plataforma:** Vercel  
**Documentación completa:** [CONFIGURACION-DOMINIO.md](./CONFIGURACION-DOMINIO.md)
