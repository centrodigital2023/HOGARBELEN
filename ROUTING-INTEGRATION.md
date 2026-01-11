# 🔗 INTEGRACIÓN DE NUEVAS PÁGINAS AL ROUTING

Este documento explica cómo integrar las nuevas páginas creadas con el sistema de routing existente en `App.tsx`.

---

## PÁGINAS NUEVAS CREADAS

1. **RegistroProfesional.tsx** - Registro de profesionales con IA
2. **SuperAdminDashboard.tsx** - Dashboard administrativo completo (NUEVA VERSIÓN)
3. **FormularioInteligente.tsx** - Formulario de contacto con clasificación IA

---

## PASO 1: IMPORTAR LAS NUEVAS PÁGINAS

En `src/App.tsx`, agrega estas importaciones al principio del archivo:

```typescript
// Importaciones existentes...
import SuperAdminDashboard from './páginas/SuperAdminDashboard';

// NUEVAS IMPORTACIONES
import RegistroProfesional from './pages/RegistroProfesional';
import FormularioInteligente from './pages/FormularioInteligente';
import SuperAdminDashboardNew from './pages/SuperAdminDashboard';
```

---

## PASO 2: AGREGAR CASOS AL SWITCH

En la función `renderPage()` dentro de `MainApp`, agrega estos casos:

```typescript
const renderPage = () => {
  switch(currentPage) {
    case 'home': return <PáginaPrincipal setPage={setCurrentPage} />;
    case 'about': return <AboutPage />;
    case 'pricing': return <PáginaDePrecios setPage={setCurrentPage} />;
    case 'services': return <PáginaDeServicios />;
    case 'contact': return <ContactPage />;
    
    // ... casos existentes ...
    
    // NUEVOS CASOS
    case 'registro-profesional': 
      return <RegistroProfesional setPage={setCurrentPage} />;
    
    case 'formulario-inteligente': 
      return <FormularioInteligente setPage={setCurrentPage} />;
    
    case 'super-admin-dashboard': 
      return <SuperAdminDashboardNew setPage={setCurrentPage} />;
    
    // Casos existentes...
    case 'super-admin-dashboard': 
      return <SuperAdminDashboard setPage={setCurrentPage} />;
    case 'terminos-condiciones': 
      return <TerminosYCondiciones setPage={setCurrentPage} />;
    case 'politica-privacidad': 
      return <PoliticaPrivacidad setPage={setCurrentPage} />;
    
    default: return <PáginaPrincipal setPage={setCurrentPage} />;
  }
};
```

---

## PASO 3: ACTUALIZAR NAVEGACIÓN

### En el componente de Navegación

Si tienes un menú de navegación, agrega estos enlaces:

```typescript
// En Navegación.tsx o el componente correspondiente

// Para profesionales
<Button onClick={() => setPage('registro-profesional')}>
  Registrarse como Profesional
</Button>

// Para contacto inteligente
<Button onClick={() => setPage('formulario-inteligente')}>
  Contacto
</Button>

// Para admins (solo visible si user.role === 'superadmin')
{user?.role === 'superadmin' && (
  <Button onClick={() => setPage('super-admin-dashboard')}>
    Panel Admin
  </Button>
)}
```

---

## PASO 4: ACTUALIZAR ENLACES EN PÁGINAS EXISTENTES

### En BelenConectaProfesionales.tsx

Actualiza el CTA para que lleve al nuevo formulario:

```typescript
<Button 
  onClick={() => setPage('registro-profesional')}
  size="lg"
  className="bg-primary hover:bg-primary-600"
>
  Registrarme Ahora
</Button>
```

### En PáginaDeServicios.tsx

Actualiza botones de contacto:

```typescript
<Button 
  onClick={() => setPage('formulario-inteligente')}
  variant="default"
>
  Solicitar Información
</Button>
```

### En PáginaPrincipal.tsx

Actualiza CTAs principales:

```typescript
// CTA para familias
<Button 
  onClick={() => setPage('formulario-inteligente')}
  size="lg"
>
  Consultar Servicios
</Button>

// CTA para profesionales
<Button 
  onClick={() => setPage('registro-profesional')}
  variant="outline"
  size="lg"
>
  Únete como Profesional
</Button>
```

---

## PASO 5: CONFIGURAR ACCESO AL DASHBOARD ADMIN

### Crear Hook para Verificar Rol Admin

Crea `src/hooks/useAdmin.ts`:

```typescript
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      setIsAdmin(roleData?.role === 'superadmin');
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  return { isAdmin, loading };
}
```

### Proteger Ruta del Dashboard

En `App.tsx`, modifica el caso del dashboard:

```typescript
case 'super-admin-dashboard': {
  // Verificar que el usuario sea admin
  const { isAdmin, loading } = useAdmin();
  
  if (loading) {
    return <div>Verificando permisos...</div>;
  }
  
  if (!isAdmin) {
    toast.error('No tienes permisos para acceder a esta página');
    setCurrentPage('home');
    return <PáginaPrincipal setPage={setCurrentPage} />;
  }
  
  return <SuperAdminDashboardNew setPage={setCurrentPage} />;
}
```

---

## PASO 6: AGREGAR TRACKING DE META PIXEL

### En el useEffect de App.tsx

Agrega tracking de cambios de página:

```typescript
import { MetaPixelService } from '@/lib/metaPixel';

useEffect(() => {
  // Track page view cuando cambia la página
  MetaPixelService.trackPageView();
  
  // Track content específico según la página
  const pageName = currentPage.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  MetaPixelService.trackViewContent({
    content_name: pageName,
    content_category: 'Adulto Mayor'
  });
}, [currentPage]);
```

---

## PASO 7: AGREGAR BREADCRUMBS (OPCIONAL PERO RECOMENDADO PARA SEO)

Crea un componente de breadcrumbs:

```typescript
// src/components/Breadcrumbs.tsx
import { ChevronRight } from '@phosphor-icons/react';

interface BreadcrumbsProps {
  items: { label: string; page?: string }[];
  setPage: (page: string) => void;
}

export default function Breadcrumbs({ items, setPage }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <ChevronRight className="mx-2 h-4 w-4" />}
          {item.page ? (
            <button
              onClick={() => setPage(item.page!)}
              className="hover:text-primary transition-colors"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
```

Úsalo en las páginas nuevas:

```typescript
// En RegistroProfesional.tsx
<Breadcrumbs 
  items={[
    { label: 'Inicio', page: 'home' },
    { label: 'Belén Conecta', page: 'belen-profesionales' },
    { label: 'Registro Profesional' }
  ]}
  setPage={setPage}
/>
```

---

## PASO 8: ACTUALIZAR FOOTER

En el componente Footer, agrega enlaces a las nuevas páginas:

```typescript
// En PieDePágina.tsx o Footer.tsx

<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
  <div>
    <h3 className="font-semibold mb-4">Para Profesionales</h3>
    <ul className="space-y-2">
      <li>
        <button onClick={() => setPage('registro-profesional')}>
          Registrarse
        </button>
      </li>
      <li>
        <button onClick={() => setPage('belen-profesionales')}>
          Cómo Funciona
        </button>
      </li>
    </ul>
  </div>
  
  <div>
    <h3 className="font-semibold mb-4">Contacto</h3>
    <ul className="space-y-2">
      <li>
        <button onClick={() => setPage('formulario-inteligente')}>
          Formulario de Contacto
        </button>
      </li>
      <li>
        <button onClick={() => setPage('contact')}>
          Información de Contacto
        </button>
      </li>
    </ul>
  </div>
</div>
```

---

## PASO 9: TESTING

### Checklist de Pruebas

- [ ] Navegar a `/registro-profesional` funciona
- [ ] Navegar a `/formulario-inteligente` funciona
- [ ] Navegar a `/super-admin-dashboard` funciona (solo con permisos)
- [ ] Botones de navegación actualizados
- [ ] Breadcrumbs se muestran correctamente
- [ ] Meta Pixel se dispara en cada cambio de página
- [ ] Validaciones de formularios funcionan
- [ ] Envío de formularios guarda en Supabase
- [ ] Dashboard admin carga datos correctamente
- [ ] Acceso al dashboard está protegido por rol

---

## PASO 10: ESTRUCTURA DE ARCHIVOS FINAL

```
src/
├── App.tsx (actualizado con nuevas rutas)
├── pages/
│   ├── RegistroProfesional.tsx ✨ NUEVO
│   ├── FormularioInteligente.tsx ✨ NUEVO
│   └── SuperAdminDashboard.tsx ✨ NUEVO (versión mejorada)
├── lib/
│   ├── supabase.ts ✨ NUEVO
│   ├── aiService.ts ✨ NUEVO
│   └── metaPixel.ts ✨ NUEVO
├── hooks/
│   └── useAdmin.ts ✨ NUEVO (opcional)
└── components/
    └── Breadcrumbs.tsx ✨ NUEVO (opcional)
```

---

## NOTAS IMPORTANTES

1. **Rutas existentes**: Las páginas nuevas NO reemplazan las existentes. Se agregan como alternativas mejoradas.

2. **Migración gradual**: Puedes mantener ambas versiones y migrar usuarios gradualmente.

3. **URLs amigables**: Considera mapear las rutas a URLs del sitemap:
   ```typescript
   // Mapeo de URLs SEO
   const urlMap: Record<string, string> = {
     '/registro-profesional': 'belen-conecta/empleo-profesionales-salud-narino',
     '/formulario-inteligente': 'contacto-hogar-geriatrico-buesaco'
   };
   ```

4. **Redirecciones**: Considera agregar redirecciones automáticas desde URLs antiguas a las nuevas.

---

## SIGUIENTE PASO

Una vez integrado todo, ejecuta:

```bash
npm run dev
```

Y prueba cada ruta navegando desde:
- `/` (home)
- `/registro-profesional`
- `/formulario-inteligente`
- `/super-admin-dashboard` (con credenciales de admin)

---

¡Listo! Tu plataforma ahora tiene todas las funcionalidades integradas. 🎉
