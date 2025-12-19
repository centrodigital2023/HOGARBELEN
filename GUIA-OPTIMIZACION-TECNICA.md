# Guía de Optimización Técnica y Rendimiento Web - Hogar Belén

## 🎯 Objetivo
Lograr tiempos de carga menores a 2 segundos para cumplir con los estándares de Google Core Web Vitals y mejorar el posicionamiento SEO.

---

## 1. OPTIMIZACIÓN DE IMÁGENES (WebP)

### 🔴 Regla Obligatoria
**PROHIBIDO** subir imágenes en formato PNG o JPG sin optimizar.

### ✅ Formato Requerido: WebP
- **Peso máximo**: 100KB por imagen
- **Calidad recomendada**: 80-85%
- **Dimensiones máximas sugeridas**:
  - Hero/Banner: 1920x1080px
  - Cards/Thumbnails: 800x600px
  - Íconos/Logos: 400x400px
  - Testimonios: 300x300px

### Herramientas de Conversión

#### Opción 1: Online (Más Fácil)
1. **Squoosh.app** (Recomendado)
   - URL: https://squoosh.app
   - Interfaz visual con preview
   - Control de calidad en tiempo real
   - Gratuito

2. **CloudConvert**
   - URL: https://cloudconvert.com/webp-converter
   - Conversión por lotes
   - Gratuito con límites

3. **TinyPNG** (con conversión a WebP)
   - URL: https://tinypng.com
   - Automático y fácil
   - Gratuito

#### Opción 2: Línea de Comandos (Para desarrolladores)

**Instalar cwebp**:
```bash
# Ubuntu/Debian
sudo apt-get install webp

# MacOS
brew install webp

# Windows (con Chocolatey)
choco install webp
```

**Convertir una imagen**:
```bash
cwebp -q 85 input.jpg -o output.webp
```

**Convertir todas las imágenes de una carpeta**:
```bash
# Linux/Mac
for file in *.{jpg,jpeg,png}; do
  cwebp -q 85 "$file" -o "${file%.*}.webp"
done

# Windows PowerShell
Get-ChildItem *.jpg,*.jpeg,*.png | ForEach-Object {
  cwebp -q 85 $_.FullName -o ($_.BaseName + ".webp")
}
```

#### Opción 3: Automatización con Node.js

**Instalar Sharp**:
```bash
npm install sharp --save-dev
```

**Script de conversión** (`scripts/convert-to-webp.js`):
```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './src/assets/images';
const outputDir = './public/images';

// Crear directorio si no existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Función para convertir imagen
async function convertToWebP(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .webp({ quality: 85 })
      .resize(1920, 1080, { 
        fit: 'inside',
        withoutEnlargement: true 
      })
      .toFile(outputPath);
    
    const stats = fs.statSync(outputPath);
    const sizeMB = (stats.size / 1024).toFixed(2);
    console.log(`✓ ${outputPath} (${sizeMB} KB)`);
  } catch (error) {
    console.error(`✗ Error en ${inputPath}:`, error.message);
  }
}

// Procesar todas las imágenes
fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error('Error al leer directorio:', err);
    return;
  }

  files.forEach(file => {
    const ext = path.extname(file).toLowerCase();
    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(outputDir, path.basename(file, ext) + '.webp');
      convertToWebP(inputPath, outputPath);
    }
  });
});
```

**Ejecutar**:
```bash
node scripts/convert-to-webp.js
```

### Implementación en el Código

#### Con Fallback para navegadores antiguos:
```jsx
<picture>
  <source srcSet="/images/photo.webp" type="image/webp" />
  <source srcSet="/images/photo.jpg" type="image/jpeg" />
  <img src="/images/photo.jpg" alt="Descripción SEO" loading="lazy" />
</picture>
```

#### Solo WebP (navegadores modernos):
```jsx
<img 
  src="/images/photo.webp" 
  alt="Adultos mayores disfrutando en Hogar Belén Buesaco" 
  loading="lazy"
  width="800"
  height="600"
/>
```

---

## 2. LAZY LOADING (Carga Diferida)

### Implementación Nativa (HTML5)

**Para imágenes**:
```jsx
<img src="/images/photo.webp" loading="lazy" alt="..." />
```

**Para iframes**:
```jsx
<iframe src="..." loading="lazy"></iframe>
```

### Configuración en React

**Componente de Imagen Optimizada**:
```tsx
// src/components/OptimizedImage.tsx
interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export const OptimizedImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  className 
}: OptimizedImageProps) => {
  // Añadir .webp si no está presente
  const webpSrc = src.endsWith('.webp') ? src : src.replace(/\.(jpg|jpeg|png)$/, '.webp');
  
  return (
    <img
      src={webpSrc}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      className={className}
    />
  );
};
```

**Uso**:
```tsx
<OptimizedImage
  src="/images/centro-vida-buesaco.webp"
  alt="Centro de vida para adultos mayores en Buesaco, Nariño"
  width={800}
  height={600}
/>
```

### Intersección Observer (Avanzado)

Para lazy loading más controlado:
```tsx
import { useEffect, useRef, useState } from 'react';

const LazyImage = ({ src, alt, placeholder }) => {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={imgRef}
      src={isVisible ? src : placeholder}
      alt={alt}
      loading="lazy"
    />
  );
};
```

---

## 3. MOBILE-FIRST OPTIMIZATION

### Botones Fijos en Móvil

**CSS/Tailwind**:
```tsx
<div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg p-4 flex gap-3 md:hidden">
  <a
    href="tel:+573215708655"
    className="flex-1 bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold text-center"
  >
    📞 Llamar
  </a>
  <a
    href="https://wa.me/573215708655"
    target="_blank"
    rel="noopener noreferrer"
    className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-semibold text-center"
  >
    💬 WhatsApp
  </a>
</div>
```

### Menú Responsive

**Optimizado para móvil**:
```tsx
<nav className="bg-white shadow-sm">
  {/* Desktop */}
  <div className="hidden md:flex items-center justify-between px-6 py-4">
    {/* Navegación desktop */}
  </div>
  
  {/* Mobile */}
  <div className="md:hidden">
    <button 
      onClick={() => setMenuOpen(!menuOpen)}
      className="p-4 text-2xl"
      aria-label="Toggle menu"
    >
      {menuOpen ? '✕' : '☰'}
    </button>
    
    {menuOpen && (
      <div className="absolute top-16 left-0 right-0 bg-white shadow-lg p-4">
        {/* Enlaces móvil */}
      </div>
    )}
  </div>
</nav>
```

### Viewport Meta Tag

Ya está configurado en `index.html`:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

### Touch Target Size

**Tamaño mínimo recomendado**: 44x44px

```css
/* Tailwind classes */
className="min-h-[44px] min-w-[44px] touch-manipulation"
```

---

## 4. MINIFICACIÓN

### Configuración en Vite

Actualizar `vite.config.ts`:
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  
  build: {
    // Minificar con Terser (mejor compresión)
    minify: 'terser',
    
    terserOptions: {
      compress: {
        drop_console: true, // Eliminar console.log en producción
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info']
      },
      mangle: {
        safari10: true
      }
    },
    
    // Minificar CSS
    cssMinify: true,
    
    // Code splitting para mejor caching
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        }
      }
    },
    
    // Reportar tamaño de chunks
    chunkSizeWarningLimit: 500
  },
  
  // Optimización de dependencias
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
});
```

### Instalar Terser

```bash
npm install terser --save-dev
```

---

## 5. PRELOAD Y PREFETCH

### Fuentes (Ya configurado en index.html)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="https://fonts.googleapis.com/...">
```

### Recursos Críticos

Para imágenes importantes (logo, hero):
```html
<link rel="preload" as="image" href="/images/logo.webp" type="image/webp">
```

### DNS Prefetch para APIs externas

```html
<link rel="dns-prefetch" href="https://api.hogarbelen.org">
```

---

## 6. MÉTRICAS A MONITOREAR

### Core Web Vitals

1. **LCP (Largest Contentful Paint)**: < 2.5s
2. **FID (First Input Delay)**: < 100ms
3. **CLS (Cumulative Layout Shift)**: < 0.1

### Herramientas de Testing

1. **Google PageSpeed Insights**
   - URL: https://pagespeed.web.dev
   - Análisis completo de rendimiento

2. **GTmetrix**
   - URL: https://gtmetrix.com
   - Análisis detallado con recomendaciones

3. **Lighthouse** (Chrome DevTools)
   - F12 > Lighthouse > Generate Report

4. **WebPageTest**
   - URL: https://www.webpagetest.org
   - Testing desde diferentes ubicaciones

---

## 7. CHECKLIST DE IMPLEMENTACIÓN

### Antes de Producción

- [ ] Todas las imágenes convertidas a WebP
- [ ] Peso de imágenes < 100KB
- [ ] Lazy loading activado en todas las imágenes
- [ ] Botones móviles fijos implementados
- [ ] Menú responsive funcionando correctamente
- [ ] Minificación configurada en build
- [ ] Testing en PageSpeed Insights > 90
- [ ] Testing en GTmetrix grado A/B
- [ ] Pruebas en dispositivos móviles reales
- [ ] Cache del navegador configurado
- [ ] GZIP/Brotli activado en servidor

### Optimizaciones de Servidor (Vercel)

El archivo `vercel.json` debe incluir:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    },
    {
      "source": "/images/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 📞 Soporte Técnico

Para consultas sobre implementación:
- **Email**: hogarbelen2022@gmail.com
- **Documentación**: Ver archivos MD en raíz del proyecto
