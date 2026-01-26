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

## 🎨 Características

- 🏠 **Centro de Vida**: Información sobre servicios residenciales
- 👨‍⚕️ **Profesionales**: Directorio y reservas de servicios de salud
- 🎯 **Planes de Bienestar**: Plan Amigos, Sol y Café, Sonreír, Turismo Rural
- 👪 **Belén Conecta**: Plataformas para familias y profesionales
- 💳 **Sistema de Pagos**: Gestión de suscripciones y pagos
- 🎁 **Códigos Promocionales**: Sistema de descuentos
- 📅 **Reservas**: Gestión de citas y servicios

## 🛠️ Tecnologías

- **React 19** + TypeScript
- **Supabase** - Backend y autenticación
- **Tailwind CSS** - Estilos
- **shadcn/ui** - Componentes
- **Framer Motion** - Animaciones
- **Spark Runtime** - SDK y persistencia

## 📚 Documentación

- [🎨 Frontend - SEO y Despliegue](./FRONTEND-README.md) - **NUEVO**
- [🚀 Deploy en Vercel](./DEPLOY-VERCEL.md)
- [🌐 Configuración del Dominio](./CONFIGURACION-DOMINIO.md)
- [Configuración de Supabase](./SUPABASE-CONFIG.md)
- [PRD - Documento de Requisitos](./PRD.md)
- [Sistema de Descuentos](./SISTEMA-DESCUENTOS.md)
- [Sistema de Pagos](./SISTEMA-PAGOS.md)
- [Estrategia SEO](./SEO-STRATEGY.md)

## 🚢 Deploy a Producción

### Vercel (Recomendado)

1. **Conecta tu repositorio con Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Importa tu proyecto desde GitHub
   - Configura las variables de entorno

2. **Variables de Entorno en Vercel:**
   ```
   VITE_SUPABASE_URL=https://cgfpwlqnhgclzzaiqhwz.supabase.co
   VITE_SUPABASE_ANON_KEY=tu_clave_aqui
   ```

3. **Configura el dominio:**
   - Settings → Domains
   - Agrega: `www.hogarbelen.org`
   - Configura DNS según instrucciones

**📖 Guía completa:** [DEPLOY-VERCEL.md](./DEPLOY-VERCEL.md)

---

## 🔐 Autenticación

El sistema utiliza Supabase Auth con:
- Email y contraseña
- **Google OAuth** - Autenticación con cuenta de Google
- Roles: `family` (familias) y `professional` (profesionales)
- Sesiones persistentes
- Protección RLS en todas las tablas

## ⚖️ Páginas Legales

El sitio incluye todas las páginas legales requeridas para Google OAuth y cumplimiento normativo:

- **[Términos y Condiciones](/terminos)** - Condiciones de uso y servicios
- **[Política de Privacidad](/privacidad)** - Ley 1581 de 2012 (Colombia), GDPR, LGPD
- **[Política de Cookies](/cookies)** - Gestión de cookies y tracking

**URLs Públicas:**
- https://hogarbelen.org/terminos
- https://hogarbelen.org/privacidad
- https://hogarbelen.org/cookies

Todas las páginas cumplen con:
- ✅ Ley 1581 de 2012 (Colombia)
- ✅ GDPR (Unión Europea)
- ✅ LGPD (Brasil)
- ✅ Requisitos de Google OAuth Consent Screen

## 🔗 Enlaces Sociales

- **Facebook**: https://www.facebook.com/Hogarbelenbuesaco
- **Instagram**: https://www.instagram.com/hogargeriatricobelen
- **YouTube**: https://www.youtube.com/@hogarbelengeriatrico9521

## 📄 Licencia

MIT License - Copyright GitHub, Inc.
