# 🏡 Hogar Belén - Centro de Vida y Profesionales de Salud

Plataforma web integral para la gestión de servicios de cuidado para adultos mayores en Hogar Belén, Buesaco, Nariño.

## 🌐 Sitio en Producción

**🔗 https://www.hogarbelen.org**

Centro de Vida para Adultos Mayores en Buesaco, Nariño, Colombia.

---

## 🚀 Inicio Rápido

### 1. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
cp .env.example .env.local
```

Edita `.env.local` y agrega tus credenciales de Supabase:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
VITE_SITE_URL=http://localhost:5173
```

**📖 Para más detalles, consulta la [Guía de Integración Completa](./INTEGRACION-FRONTEND-BACKEND-SUPABASE.md)**

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

### Integración y Arquitectura
- [🔗 Integración Frontend-Backend-Supabase](./INTEGRACION-FRONTEND-BACKEND-SUPABASE.md) ⭐ **NUEVO**
- [🌐 Configuración del Dominio](./CONFIGURACION-DOMINIO.md)
- [Configuración de Supabase](./SUPABASE-CONFIG.md)
- [Conexión Inteligente](./CONEXION-INTELIGENTE.md)

### Deployment
- [🚀 Deploy en Vercel](./DEPLOY-VERCEL.md)
- [Deploy Quick Start](./DEPLOY-QUICK-START.md)

### Features y Funcionalidades
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
   
   **⚠️ IMPORTANTE**: Configura estas variables en Vercel Dashboard antes del primer deploy:
   
   ```
   Variable: VITE_SUPABASE_URL
   Value: https://cgfpwlqnhgclzzaiqhwz.supabase.co
   Environments: ✓ Production ✓ Preview ✓ Development
   
   Variable: VITE_SUPABASE_ANON_KEY
   Value: tu_clave_aqui
   Environments: ✓ Production ✓ Preview ✓ Development
   
   Variable: VITE_SITE_URL
   Value: https://www.hogarbelen.org
   Environments: ✓ Production
   ```
   
   **Cómo agregar variables:**
   - Settings → Environment Variables → Add New
   - Ingresa el nombre y valor
   - Selecciona los ambientes apropiados
   - Clic en "Save"
   - **Redeploy** el proyecto para aplicar cambios

3. **Deploy Automático:**
   - ✅ Cada push a `main` → Deploy automático a Production
   - ✅ Cada Pull Request → Preview deployment automático
   - ✅ Logs disponibles en tiempo real

4. **Configura el dominio:**
   - Settings → Domains
   - Agrega: `www.hogarbelen.org`
   - Configura DNS según instrucciones

**📖 Guía completa:** [DEPLOY-VERCEL.md](./DEPLOY-VERCEL.md) | [Integración Completa](./INTEGRACION-FRONTEND-BACKEND-SUPABASE.md)

---

## 🔐 Autenticación

El sistema utiliza Supabase Auth con:
- Email y contraseña
- Roles: `family` (familias) y `professional` (profesionales)
- Sesiones persistentes
- Protección RLS en todas las tablas

## 🔗 Enlaces Sociales

- **Facebook**: https://www.facebook.com/Hogarbelenbuesaco
- **Instagram**: https://www.instagram.com/hogargeriatricobelen
- **YouTube**: https://www.youtube.com/@hogarbelengeriatrico9521

## 📄 Licencia

MIT License - Copyright GitHub, Inc.
