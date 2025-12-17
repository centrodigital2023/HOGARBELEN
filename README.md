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

- [🚀 Guía de Despliegue Completa](./GUIA-DESPLIEGUE-PRODUCCION.md) ⭐ **NUEVO**
- [⚡ Guía Rápida de Despliegue](./DESPLIEGUE-RAPIDO.md) ⭐ **NUEVO**
- [🌐 Configuración del Dominio](./CONFIGURACION-DOMINIO.md)
- [Configuración de Supabase](./SUPABASE-CONFIG.md)
- [PRD - Documento de Requisitos](./PRD.md)
- [Sistema de Descuentos](./SISTEMA-DESCUENTOS.md)
- [Sistema de Pagos](./SISTEMA-PAGOS.md)
- [Estrategia SEO](./SEO-STRATEGY.md)

## 🚢 Deploy a Producción en www.hogarbelen.org

### ✅ Estado: Listo para Desplegar

El código ya está completamente configurado para **www.hogarbelen.org**. Solo necesitas:

1. **Configurar Vercel** (10 min)
   - Importar repositorio desde GitHub
   - Configurar variables de entorno de Supabase
   - Framework: Vite, Output: dist

2. **Agregar Dominio** (5 min)
   - Settings → Domains → Add: `www.hogarbelen.org`
   
3. **Configurar DNS** (10 min)
   - Nameservers: `ns1.vercel-dns.com` y `ns2.vercel-dns.com`
   - O configurar records CNAME/A manualmente

### 📖 Guías de Despliegue

**Elige la guía que necesites:**

- **⚡ [Guía Rápida](./DESPLIEGUE-RAPIDO.md)** - Pasos mínimos (30 min)
- **🚀 [Guía Completa](./GUIA-DESPLIEGUE-PRODUCCION.md)** - Instrucciones detalladas con troubleshooting
- **🌐 [Configuración DNS](./CONFIGURACION-DOMINIO.md)** - Detalles específicos de DNS
- **📋 [Checklist de Producción](./CHECKLIST-PRODUCCION.md)** - Verificación completa

### Variables de Entorno Requeridas

```bash
VITE_SUPABASE_URL=https://cgfpwlqnhgclzzaiqhwz.supabase.co
VITE_SUPABASE_ANON_KEY=[obtener-de-supabase-dashboard]
```

### Deploy Automático

Cada push a `main` despliega automáticamente:
```bash
git push origin main
# Vercel despliega en 2-5 minutos
```

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
