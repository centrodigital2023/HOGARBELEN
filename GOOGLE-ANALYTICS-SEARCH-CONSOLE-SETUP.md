# Guía de Configuración: Google Analytics 4 y Search Console

## Google Analytics 4 (GA4)

### 1. Crear una propiedad de GA4

1. Ve a [Google Analytics](https://analytics.google.com/)
2. Haz clic en **Admin** (engranaje en la esquina inferior izquierda)
3. En la columna **Cuenta**, selecciona o crea una cuenta
4. En la columna **Propiedad**, haz clic en **Crear propiedad**
5. Completa los datos:
   - **Nombre de la propiedad**: Hogar Belén
   - **Zona horaria**: (GMT-05:00) Bogotá
   - **Moneda**: Peso colombiano (COP)
6. Haz clic en **Siguiente** y completa la información del negocio
7. Haz clic en **Crear**

### 2. Obtener el ID de medición

1. En la propiedad creada, ve a **Configuración de la propiedad**
2. En **Flujos de datos**, haz clic en **Agregar flujo** > **Web**
3. Completa:
   - **URL del sitio web**: https://www.hogarbelen.org
   - **Nombre del flujo**: Sitio web Hogar Belén
4. Haz clic en **Crear flujo**
5. **Copia el ID de medición** (formato: `G-XXXXXXXXXX`)

### 3. Configurar en tu aplicación

En el archivo `index.html`, reemplaza `G-XXXXXXXXXX` con tu ID real:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-TU_ID_AQUI"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-TU_ID_AQUI', {
    'send_page_view': true,
    'anonymize_ip': true,
    'allow_ad_personalization_signals': false
  });
</script>
```

### 4. Eventos personalizados ya configurados

La aplicación incluye eventos predefinidos en `src/utils/analytics.ts`:

- **Registro y login**: `signup`, `login`
- **Servicios**: `viewService`, `selectPlan`, `purchase`
- **Profesionales**: `viewProfessional`, `contactProfessional`
- **Formularios**: `submitContactForm`
- **Engagement**: `scrollDepth`, `timeOnPage`

### 5. Uso en componentes

```tsx
import { useAnalytics } from './hooks/useAnalytics';
import { GAEvents } from './utils/analytics';

function MiComponente() {
  // Rastreo automático de página
  useAnalytics({
    measurementId: 'G-XXXXXXXXXX',
    pageName: 'Página de Inicio',
    trackScroll: true,
    trackTime: true
  });

  // Rastreo manual de eventos
  const handleClick = () => {
    GAEvents.viewService('Plan Amigos');
  };

  return <button onClick={handleClick}>Ver Plan</button>;
}
```

---

## Google Search Console

### 1. Agregar y verificar tu sitio

1. Ve a [Google Search Console](https://search.google.com/search-console)
2. Haz clic en **Agregar propiedad**
3. Selecciona **Prefijo de URL** e ingresa: `https://www.hogarbelen.org`
4. Haz clic en **Continuar**

### 2. Métodos de verificación

#### Opción A: Meta etiqueta HTML (Recomendado)

1. Copia el código de verificación que proporciona Search Console
2. En `index.html`, reemplaza `YOUR_VERIFICATION_CODE_HERE`:

```html
<meta name="google-site-verification" content="TU_CODIGO_AQUI" />
```

3. Despliega tu sitio
4. Vuelve a Search Console y haz clic en **Verificar**

#### Opción B: Archivo HTML

1. Descarga el archivo HTML de verificación
2. Colócalo en la carpeta `public/`
3. Despliega y verifica

#### Opción C: Google Analytics (Si ya lo tienes configurado)

1. Selecciona "Google Analytics" como método
2. Debe usar la misma cuenta de GA4
3. Haz clic en **Verificar**

### 3. Enviar el sitemap

Una vez verificado:

1. En Search Console, ve a **Sitemaps**
2. Ingresa la URL del sitemap: `https://www.hogarbelen.org/sitemap.xml`
3. Haz clic en **Enviar**

El sitemap ya está generado en `public/sitemap.xml`

### 4. Configurar robots.txt

El archivo `public/robots.txt` ya está configurado:

```
User-agent: *
Allow: /
Sitemap: https://www.hogarbelen.org/sitemap.xml
```

Actualiza el dominio si es diferente.

---

## Verificación de la configuración

### Probar GA4 en tiempo real

1. Ve a Google Analytics
2. Selecciona **Informes** > **Tiempo real**
3. Abre tu sitio web
4. Deberías ver tu visita en tiempo real

### Probar eventos personalizados

En la consola del navegador:

```javascript
// Probar un evento
gtag('event', 'test_event', { test: 'value' });
```

Debería aparecer en **Tiempo real** > **Eventos**

### Verificar Search Console

1. Usa la herramienta de inspección de URLs
2. Ingresa cualquier URL de tu sitio
3. Haz clic en **Solicitar indexación**

---

## Monitoreo y optimización

### Métricas clave a seguir en GA4

- **Usuarios activos**: Total de visitantes únicos
- **Tasa de rebote**: Porcentaje de visitas de una sola página
- **Duración promedio de la sesión**: Tiempo en el sitio
- **Conversiones**: Registros, contactos, compras
- **Páginas más vistas**: Contenido popular
- **Embudos de conversión**: Flujo de usuarios

### Informes importantes en Search Console

- **Rendimiento**: Clics, impresiones, CTR, posición promedio
- **Cobertura**: Páginas indexadas y errores
- **Experiencia**: Core Web Vitals y usabilidad móvil
- **Enlaces**: Backlinks y enlaces internos
- **Mejoras**: Datos estructurados y breadcrumbs

---

## Próximos pasos

1. ✅ Reemplazar IDs de medición en `index.html`
2. ✅ Verificar dominio en Search Console
3. ✅ Enviar sitemap
4. ✅ Configurar eventos personalizados según tu negocio
5. ⬜ Crear audiencias personalizadas en GA4
6. ⬜ Configurar conversiones importantes
7. ⬜ Establecer alertas personalizadas
8. ⬜ Vincular con Google Ads (si aplica)

---

## Recursos adicionales

- [Documentación GA4](https://support.google.com/analytics/answer/10089681)
- [Guía Search Console](https://support.google.com/webmasters/answer/9128668)
- [Mejores prácticas SEO](https://developers.google.com/search/docs/beginner/seo-starter-guide)
