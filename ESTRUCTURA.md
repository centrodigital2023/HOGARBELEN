# Estructura de Archivos - Hogar Belén

Este documento describe la estructura organizativa del proyecto Hogar Belén, una plataforma SaaS que conecta familias con servicios de cuidado para adultos mayores.

## 📁 Estructura Principal

```
src/
├── componentes/           # Componentes reutilizables de UI
│   ├── ui/               # Componentes base de interfaz
│   ├── Navegación.tsx    # Barra de navegación principal
│   ├── PieDePágina.tsx   # Footer del sitio
│   ├── ServiciosCarousel.tsx
│   ├── TrustSection.tsx
│   └── SecciónDeTestimonios.tsx
│
├── páginas/              # Páginas principales de la aplicación
│   ├── PáginaPrincipal.tsx
│   ├── AboutPage.tsx
│   ├── ContactPage.tsx
│   ├── PáginaDePrecios.tsx
│   ├── PáginaDeServicios.tsx
│   ├── BelenConectaLogin.tsx
│   ├── BelenConectaRegister.tsx
│   ├── FamilyDashboard.tsx
│   ├── PanelDeControlProfesional.tsx
│   └── AICareAssistant.tsx
│
├── página principal/     # Componentes específicos del hero/homepage
│   ├── HeroNarrative.tsx
│   ├── PromiseSection.tsx
│   └── SoulCarousel.tsx
│
├── contextos/           # React Context providers
│   └── SupabaseAuthContext.tsx
│
├── pages/               # Páginas originales (mantenidas para compatibilidad)
├── components/          # Componentes originales (mantenidos)
├── App.tsx             # Componente raíz de la aplicación
├── main.tsx            # Punto de entrada
├── index.css           # Estilos globales y variables CSS
└── lib/                # Utilidades y helpers
```

## 🎨 Componentes de UI Base

### componentes/ui/
- **botón.tsx**: Componente de botón con variantes (primary, secondary, outline, ghost, ai)
- **input.tsx**: Campo de entrada de formulario con labels y manejo de errores
- **avatar.tsx**: Avatar de usuario con imagen o placeholder
- **insignia.tsx**: Badges para estados y categorías

## 📄 Páginas Principales

### Páginas Públicas
- **PáginaPrincipal**: Landing page con hero, servicios, testimonios
- **AboutPage**: Información sobre Hogar Belén
- **ContactPage**: Formulario de contacto
- **PáginaDeServicios**: Catálogo de servicios disponibles
- **PáginaDePrecios**: Planes y precios

### Autenticación
- **BelenConectaLogin**: Página de inicio de sesión
- **BelenConectaRegister**: Registro de nuevos usuarios

### Dashboards
- **FamilyDashboard**: Panel de control para familias
- **PanelDeControlProfesional**: Panel para profesionales de salud
- **AICareAssistant**: Asistente de IA para recomendaciones de cuidado

## 🔧 Contextos

### SupabaseAuthContext
Maneja la autenticación y estado del usuario usando el sistema de persistencia de Spark (`useKV`).

**Proporciona:**
- `user`: Usuario actual autenticado
- `userData`: Datos adicionales del perfil
- `loading`: Estado de carga
- `signOut()`: Función para cerrar sesión

## 🎯 Componentes de Homepage

### página principal/
- **HeroNarrative**: Hero section con imagen de fondo y llamadas a la acción
- **PromiseSection**: Sección de promesas y valores de Hogar Belén
- **SoulCarousel**: Carrusel de citas inspiracionales

### componentes/
- **ServiciosCarousel**: Grid de categorías de servicios
- **TrustSection**: Indicadores de confianza y credenciales
- **SecciónDeTestimonios**: Testimonios de familias

## 🎨 Sistema de Diseño

### Colores (oklch)
```css
--primary-600: oklch(0.50 0.14 200)  /* Teal principal */
--primary-500: oklch(0.55 0.15 200)  /* Teal base */
--accent: oklch(0.68 0.18 50)        /* Orange cálido */
--ai-gradient: from violet to indigo  /* Gradiente IA */
```

### Tipografía
- **Familia**: Inter (Google Fonts)
- **H1**: 56px Bold, -0.02em letter-spacing
- **H2**: 36px Bold
- **H3**: 24px Bold
- **Body**: 16px Regular, 1.6 line-height

### Animaciones
```css
.fade-in-page: 0.5s ease-in-out
@keyframes fadeIn: opacity + translateY
```

## 🔄 Flujo de Navegación

### Rutas Principales
```typescript
'home' → PáginaPrincipal
'about' → AboutPage
'services' → PáginaDeServicios
'pricing' → PáginaDePrecios
'contact' → ContactPage
'login' → BelenConectaLogin
'register' → BelenConectaRegister
'dashboard-family' → FamilyDashboard
'dashboard-pro' → PanelDeControlProfesional
'ai-assistant' → AICareAssistant
```

## 📦 Dependencias Principales

- **React 19**: Framework UI
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Framework de estilos
- **Lucide React**: Iconos
- **Sonner**: Notificaciones toast
- **Framer Motion**: Animaciones (disponible)
- **@github/spark**: SDK de persistencia y LLM

## 🛠 Utilidades de Spark

### Persistencia con useKV
```typescript
import { useKV } from '@github/spark/hooks'
const [data, setData, deleteData] = useKV('key', defaultValue)
```

### LLM para IA
```typescript
const prompt = spark.llmPrompt`Tu consulta aquí`
const response = await spark.llm(prompt, 'gpt-4o')
```

## 🌐 Nombres en Español

Este proyecto usa convenciones de nombres en español para:
- Carpetas: `páginas/`, `componentes/`, `contextos/`
- Archivos: `PáginaPrincipal.tsx`, `Navegación.tsx`
- Componentes UI base mantienen nombres cortos: `botón.tsx`, `insignia.tsx`

## 📝 Convenciones de Código

1. **Componentes**: PascalCase
2. **Archivos**: Mismo nombre que el componente exportado
3. **Props**: Interfaces con sufijo `Props`
4. **Estilos**: Tailwind utility classes
5. **Colores**: Variables CSS custom properties
6. **Íconos**: Lucide React
7. **Animaciones**: CSS keyframes + Framer Motion

## 🚀 Desarrollo

### Estructura de Componente Típica
```typescript
import { useState } from 'react';
import Button from '@/componentes/ui/botón';

interface MiComponenteProps {
  setPage: (page: string) => void;
}

const MiComponente = ({ setPage }: MiComponenteProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Contenido */}
    </div>
  );
};

export default MiComponente;
```

## 🎯 Próximos Pasos

La estructura básica está implementada. Los siguientes componentes pueden desarrollarse:

1. **Profesionales**: Directorio de profesionales con búsqueda/filtros
2. **Sistema de Citas**: Calendario y gestión de appointments
3. **Mensajería**: Sistema de chat/WhatsApp integration
4. **Métricas de Salud**: Dashboards con gráficos
5. **Perfil de Usuario**: Edición de datos y configuración
6. **Sistema de Planes**: Gestión de suscripciones

---

**Nota**: Este proyecto usa el Spark Template optimizado para React + TypeScript + Tailwind CSS v4.
