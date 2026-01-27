# 🏡 Hogar Belén - Centro de Vida y Profesionales de Salud

Plataforma web integral para la gestión de servicios de cuidado para adultos mayores en Hogar Belén, Buesaco, Nariño.

## 🌐 Sitio en Producción

**🔗 https://www.hogarbelen.org**

Centro de Vida para Adultos Mayores en Buesaco, Nariño, Colombia.

---

## 🚀 Inicio Rápido

### 1. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```bash
cp .env.example .env
```

Edita `.env` y agrega tus credenciales de Supabase:

```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
```

### 2. Configurar Supabase

Consulta [SUPABASE-CONFIG.md](./SUPABASE-CONFIG.md) para instrucciones detalladas sobre:
- Creación del proyecto Supabase
- Configuración de tablas y esquemas
- Políticas de seguridad (RLS)
- Scripts SQL necesarios

### 3. Instalar Dependencias

```bash
npm install
```

### 4. Ejecutar en Desarrollo

```bash
npm run dev
```

El servidor de desarrollo se iniciará en `http://localhost:5173`

---

## 🗺️ Estructura de Rutas

La aplicación es una **Single Page Application (SPA)** usando React Router v6.

### Rutas Públicas (Sin autenticación)

#### Páginas Principales
- `/` - Página principal
- `/about` - Nosotros
- `/contact` - Contacto
- `/servicios` - Servicios
- `/precios` - Precios

#### Páginas Legales (Públicamente accesibles, indexables)
- `/terminos-y-condiciones` - Términos y Condiciones
- `/politica-de-privacidad` - Política de Privacidad
- `/legales/terminos-y-condiciones` - Alias de términos
- `/legales/politica-privacidad-datos` - Alias de privacidad

#### Servicios
- `/centro-vida` - Centro de Vida
- `/planes-vida-activa` - Planes de Vida Activa
- `/plan-amigos` - Plan Amigos
- `/plan-sol-cafe` - Plan Sol y Café
- `/plan-sonreir` - Plan Sonreír
- `/plan-turismo-rural` - Plan Turismo Rural

#### Belén Conecta
- `/belen-conecta/login` - Login para profesionales
- `/belen-conecta/register` - Registro de profesionales
- `/belen-conecta/familias` - Portal de familias
- `/belen-conecta/profesionales` - Portal de profesionales
- `/profesionales` - Servicios profesionales
- `/ofertas-trabajo` - Ofertas de trabajo

### Rutas Administrativas (Requieren autenticación)
- `/admin/login` - Login admin con 2FA
- `/admin/2fa` - Verificación 2FA
- `/admin/dashboard` - Panel administrativo
- `/admin/profesionales` - Gestión de profesionales
- `/admin/leads` - Gestión de leads
- `/admin/ofertas` - Gestión de ofertas de trabajo
- `/admin/analytics` - Analíticas
- `/admin/configuracion` - Configuración
- `/admin/contenido` - Gestión de contenido
- `/admin/auditoria` - Registro de auditoría
- `/admin/ai-clasificaciones` - Clasificaciones IA
- `/admin/codigos-promo` - Códigos promocionales
- `/superadmin` - Panel de super administrador

### Rutas de Familia (Requieren autenticación)
- `/familia/dashboard` - Panel de familia

### Rutas de Profesional (Requieren autenticación)
- `/profesional/perfil` - Perfil profesional
- `/profesional/panel` - Panel de control profesional

---

## 🔍 SEO e Indexación

### Archivos SEO Configurados

#### `sitemap.xml` (Raíz del dominio)
Contiene 77 URLs optimizadas organizadas por:
- Páginas principales (prioridad 1.0)
- Páginas de autoridad (prioridad 0.8-0.9)
- SEO local para Buesaco, Pasto, Nariño (prioridad 0.8-0.9)
- Servicios y planes (prioridad 0.7-0.9)
- **Páginas legales (prioridad 0.4)**
- Blog y contenido educativo (prioridad 0.7)

**Acceso:** `https://hogarbelen.org/sitemap.xml`

#### `robots.txt` (Raíz del dominio)
Configurado para permitir todos los bots con acceso completo:
```
User-agent: *
Allow: /

Sitemap: https://hogarbelen.org/sitemap.xml
```

**Acceso:** `https://hogarbelen.org/robots.txt`

### Mejores Prácticas SEO Implementadas

✅ **Páginas Legales Accesibles Públicamente**
- No requieren autenticación
- Están incluidas en sitemap.xml
- Son completamente indexables por motores de búsqueda
- Cumplen con normativa colombiana (Ley 1581 de 2012)

✅ **URLs SEO-Friendly**
- Rutas descriptivas en español
- Sin parámetros de consulta innecesarios
- Estructura jerárquica clara

✅ **Metadatos Configurados**
- Títulos y descripciones optimizados
- Open Graph para redes sociales
- Twitter Cards
- Schema.org markup (NursingHome, LocalBusiness)

✅ **Performance**
- Lazy loading de componentes
- Code splitting automático
- Optimización de assets estáticos
- Caché headers configurados

---

## 🗄️ Base de Datos

El proyecto utiliza **Supabase** como backend, incluyendo:
- ✅ Autenticación de usuarios (familias y profesionales)
- ✅ Base de datos PostgreSQL
- ✅ Almacenamiento en tiempo real
- ✅ Row Level Security (RLS)
- ✅ Persistencia de sesiones con spark.kv

### Tablas Principales

- `profiles` - Perfiles de usuarios
- `appointments` - Citas y reservas
- `subscriptions` - Suscripciones y planes
- `promo_codes` - Códigos promocionales

---

## 🎨 Características

- 🏠 **Centro de Vida**: Información sobre servicios residenciales
- 👨‍⚕️ **Profesionales**: Directorio y reservas de servicios de salud
- 🎯 **Planes de Bienestar**: Plan Amigos, Sol y Café, Sonreír, Turismo Rural
- 👪 **Belén Conecta**: Plataformas para familias y profesionales
- 💳 **Sistema de Pagos**: Gestión de suscripciones y pagos
- 🎁 **Códigos Promocionales**: Sistema de descuentos
- 📅 **Reservas**: Gestión de citas y servicios

---

## 🛠️ Tecnologías

### Frontend
- **React 19** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **React Router v6** - Enrutamiento SPA
- **Tailwind CSS v4** - Framework CSS
- **shadcn/ui** - Componentes UI
- **Framer Motion** - Animaciones
- **Phosphor Icons** - Iconografía

### Backend & Services
- **Supabase** - Backend as a Service
  - PostgreSQL database
  - Authentication
  - Real-time subscriptions
  - Row Level Security
- **Spark Runtime** - SDK y persistencia

### Deployment
- **Vercel** - Hosting y CI/CD
- **Configuración SPA** - Rewrites para client-side routing

---

## 📚 Documentación Adicional

- [🚀 Deploy en Vercel](./DEPLOY-VERCEL.md)
- [🌐 Configuración del Dominio](./CONFIGURACION-DOMINIO.md)
- [⚙️ Configuración de Supabase](./SUPABASE-CONFIG.md)
- [📋 Sistema de Descuentos](./SISTEMA-DESCUENTOS.md)
- [💳 Sistema de Pagos](./SISTEMA-PAGOS.md)
- [🔍 Estrategia SEO](./SEO-STRATEGY.md)
- [✅ Actualización SEO y Legal](./ACTUALIZACION-SEO-LEGAL-COMPLETADO.md)

---

## 🚢 Deploy a Producción en Vercel

### Configuración Inicial

El proyecto está configurado para despliegue en **Vercel** como SPA (Single Page Application).

### Requisitos Previos
1. Cuenta en [Vercel](https://vercel.com)
2. Repositorio en GitHub
3. Variables de entorno de Supabase

### Pasos de Despliegue

1. **Importar Proyecto en Vercel**
   ```
   - Conecta tu cuenta de GitHub
   - Selecciona el repositorio
   - Vercel detectará automáticamente la configuración
   ```

2. **Configurar Variables de Entorno**
   ```
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu_clave_anonima
   ```

3. **Configuración de Build** (Auto-detectada)
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Configurar Dominio**
   - Settings → Domains
   - Agregar: `hogarbelen.org` y `www.hogarbelen.org`
   - Configurar DNS según instrucciones de Vercel

### Configuración Especial para SPA

El archivo `vercel.json` incluye:

✅ **Rewrites para Client-Side Routing**
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

✅ **Security Headers**
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block

✅ **Cache Optimization**
- Assets estáticos: 1 año (immutable)
- sitemap.xml y robots.txt: 1 hora (revalidable)

### Verificación Post-Deploy

Verifica que estos endpoints funcionen:

```bash
# Página principal
curl https://hogarbelen.org/

# Sitemap (debe devolver XML)
curl https://hogarbelen.org/sitemap.xml

# Robots.txt (debe devolver texto plano)
curl https://hogarbelen.org/robots.txt

# Páginas legales (debe devolver HTML con meta tags)
curl https://hogarbelen.org/terminos-y-condiciones
curl https://hogarbelen.org/politica-de-privacidad
```

### Google Search Console

Después del despliegue:

1. Ir a [Google Search Console](https://search.google.com/search-console)
2. Agregar propiedad: `https://hogarbelen.org`
3. Verificar propiedad (método HTML tag o DNS)
4. **Enviar sitemap:** `https://hogarbelen.org/sitemap.xml`
5. Monitorear indexación y cobertura

**📖 Guía completa:** [DEPLOY-VERCEL.md](./DEPLOY-VERCEL.md)

---

## 📱 Responsividad y Compatibilidad

### Dispositivos Soportados
- ✅ Desktop (1920px+)
- ✅ Laptop (1024px - 1919px)
- ✅ Tablet (768px - 1023px)
- ✅ Mobile (320px - 767px)

### Navegadores Soportados
- ✅ Chrome/Edge (últimas 2 versiones)
- ✅ Firefox (últimas 2 versiones)
- ✅ Safari (últimas 2 versiones)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🔐 Autenticación y Seguridad

### Sistema de Autenticación
- **Supabase Auth** con email y contraseña
- **Roles:** `family` (familias) y `professional` (profesionales)
- **Admin:** Sistema 2FA con códigos temporales
- **Sesiones persistentes** con tokens JWT
- **RLS (Row Level Security)** en todas las tablas

### Seguridad Implementada
- ✅ Headers de seguridad (XSS, Clickjacking, MIME sniffing)
- ✅ HTTPS obligatorio en producción
- ✅ Tokens de autenticación seguros
- ✅ Validación de datos en frontend y backend
- ✅ Protección contra inyección SQL (Supabase RLS)

---

## 🏗️ Arquitectura Full Stack - Mejores Prácticas

### Patrón de Arquitectura: JAMstack
- **JavaScript:** React 19 con TypeScript
- **APIs:** Supabase (PostgreSQL, Auth, Real-time)
- **Markup:** Pre-renderizado estático con Vite

### Ventajas de esta Arquitectura
✅ **Performance:** Assets estáticos servidos desde CDN global
✅ **Escalabilidad:** Separación frontend/backend permite escalar independientemente
✅ **Seguridad:** No hay servidor tradicional que comprometer
✅ **Developer Experience:** Hot reload, TypeScript, componentes modulares
✅ **SEO:** SPA con routing client-side + sitemap/meta tags optimizados

### Consideraciones SPA vs SSR/SSG

#### ¿Por qué SPA para este proyecto?
- ✅ Interactividad rica (dashboards, forms dinámicos)
- ✅ Real-time updates (Supabase subscriptions)
- ✅ Menor complejidad en deployment
- ✅ SEO manejado con sitemap + meta tags estáticos

#### Limitaciones SEO y Soluciones
| Limitación | Solución Implementada |
|------------|----------------------|
| JS necesario para renderizar | Meta tags en index.html, sitemap.xml completo |
| URLs dinámicas no pre-renderizadas | React Router con todas las rutas definidas |
| Tiempo de carga inicial | Code splitting, lazy loading, asset optimization |
| Crawlers sin JS | Sitemap.xml + robots.txt facilita descubrimiento |

#### Futuras Mejoras (Opcionales)
- 🔄 **Pre-rendering:** Usar `react-snap` para pre-renderizar páginas clave
- 🔄 **Server Components:** Migrar a Next.js si se requiere SSR
- 🔄 **Edge Functions:** Para contenido personalizado por geo-localización

---

## 🔗 Enlaces Sociales

- **Facebook**: https://www.facebook.com/Hogarbelenbuesaco
- **Instagram**: https://www.instagram.com/hogargeriatricobelen
- **YouTube**: https://www.youtube.com/@hogarbelengeriatrico9521
- **X (Twitter)**: https://x.com/HogarBelen
- **TikTok**: https://www.tiktok.com/@hogarbelen2022

---

## 📞 Contacto

- **Teléfono/WhatsApp:** +57 321 570 8655
- **Email:** hogarbelen2022@gmail.com
- **Ubicación:** Buesaco, Nariño, Colombia

---

## 📄 Licencia

MIT License - Copyright GitHub, Inc.
