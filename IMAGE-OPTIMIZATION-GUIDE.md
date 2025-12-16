# Guía de Optimización de Imágenes para SEO - Hogar Belén

## 📸 Convención de Nombres de Archivo

### Formato General
```
[categoria]-[descripcion-seo]-[keyword]-[numero].jpg
```

### Reglas
- ✅ Todo en minúsculas
- ✅ Usar guiones (-) para separar palabras (NO usar espacios o guiones bajos)
- ✅ Incluir palabras clave relevantes
- ✅ Ser descriptivo pero conciso
- ✅ Máximo 50 caracteres
- ❌ Evitar nombres genéricos como "img001.jpg" o "photo.jpg"
- ❌ No usar caracteres especiales (ñ, á, é, etc.)

### Ejemplos Correctos ✅

```
centro-vida-adultos-mayores-buesaco-1.jpg
actividades-terapeuticas-jardin-nariño-2.jpg
plan-amigos-reunion-social-cafe-3.jpg
profesional-enfermeria-geriatrica-4.jpg
instalaciones-comedor-hogar-belen-5.jpg
turismo-rural-excursion-nariño-6.jpg
terapia-ocupacional-adultos-mayores-7.jpg
nutricion-dieta-balanceada-geriatrica-8.jpg
fisioterapia-rehabilitacion-adultos-9.jpg
evento-cumpleaños-centro-vida-10.jpg
```

### Ejemplos Incorrectos ❌

```
IMG_20240115.jpg              → No descriptivo
foto adultos.jpg              → Tiene espacios
imagen_centro.jpg             → Usa guiones bajos
adultos-mayores-ñ.jpg        → Caracteres especiales
muy-larga-descripcion-actividades-terapeuticas-jardin-naturale-etc.jpg → Muy largo
```

---

## 🏷️ Texto ALT Descriptivo

### Formato
```
[Descripción visual detallada] + [Contexto/Actividad] + [Ubicación si es relevante]
```

### Reglas
- ✅ 100-125 caracteres idealmente
- ✅ Describe lo que se ve en la imagen
- ✅ Incluye palabras clave naturalmente (sin keyword stuffing)
- ✅ Agrega contexto geográfico cuando sea relevante
- ✅ Menciona personas, actividades, lugares específicos
- ❌ No empieces con "Imagen de..." o "Foto de..."
- ❌ No repitas el nombre del archivo
- ❌ No uses solo keywords sin contexto

### Ejemplos por Categoría

#### Centro de Vida

```html
<!-- Actividades Grupales -->
<img 
  src="centro-vida-actividades-grupo-1.jpg"
  alt="Adultos mayores participando en terapia de grupo en el salón principal del Centro de Vida Hogar Belén, Buesaco"
  loading="lazy"
  width="800"
  height="600"
/>

<!-- Comedor -->
<img 
  src="instalaciones-comedor-nutricion-2.jpg"
  alt="Comedor acogedor con mesas familiares donde adultos mayores disfrutan comida balanceada en Hogar Belén"
  loading="lazy"
  width="800"
  height="600"
/>

<!-- Jardín Terapéutico -->
<img 
  src="terapia-jardin-adultos-mayores-3.jpg"
  alt="Adultos mayores cultivando vegetales en el jardín terapéutico del Centro de Vida, actividad de horticultura en Buesaco"
  loading="lazy"
  width="800"
  height="600"
/>
```

#### Profesionales de Salud

```html
<!-- Enfermera -->
<img 
  src="profesional-enfermeria-geriatrica-1.jpg"
  alt="Enfermera geriátrica certificada tomando signos vitales a paciente adulto mayor en servicio domiciliario, Nariño"
  loading="lazy"
  width="400"
  height="400"
/>

<!-- Fisioterapeuta -->
<img 
  src="fisioterapia-rehabilitacion-adultos-2.jpg"
  alt="Fisioterapeuta asistiendo ejercicios de movilidad a adulto mayor en sesión de rehabilitación, Hogar Belén"
  loading="lazy"
  width="400"
  height="400"
/>

<!-- Nutricionista -->
<img 
  src="nutricionista-plan-alimentacion-3.jpg"
  alt="Nutricionista diseñando plan de alimentación personalizado para adultos mayores con dieta geriátrica balanceada"
  loading="lazy"
  width="400"
  height="400"
/>
```

#### Planes y Servicios

```html
<!-- Plan Amigos -->
<img 
  src="plan-amigos-socialización-cafe-1.jpg"
  alt="Grupo de adultos mayores disfrutando café y conversación en el Plan Amigos, actividad social en Hogar Belén"
  loading="lazy"
  width="800"
  height="600"
/>

<!-- Plan Turismo Rural -->
<img 
  src="turismo-rural-excursion-naturaleza-2.jpg"
  alt="Adultos mayores en excursión de turismo rural por paisajes naturales de Nariño con acompañamiento profesional"
  loading="lazy"
  width="800"
  height="600"
/>

<!-- Plan Sonreír -->
<img 
  src="plan-sonreir-musicoterapia-3.jpg"
  alt="Sesión de musicoterapia con adultos mayores disfrutando instrumentos musicales, terapia emocional en Centro de Vida"
  loading="lazy"
  width="800"
  height="600"
/>
```

#### Instalaciones

```html
<!-- Fachada -->
<img 
  src="instalaciones-fachada-hogar-belen-1.jpg"
  alt="Fachada principal del Centro de Vida Hogar Belén ubicado en Buesaco, Nariño, con jardines y acceso adaptado"
  loading="lazy"
  width="1200"
  height="800"
/>

<!-- Sala de estar -->
<img 
  src="instalaciones-sala-estar-comoda-2.jpg"
  alt="Sala de estar acogedora con sillones cómodos y decoración familiar para descanso de adultos mayores"
  loading="lazy"
  width="800"
  height="600"
/>

<!-- Área exterior -->
<img 
  src="instalaciones-jardin-exterior-3.jpg"
  alt="Jardín exterior con senderos adaptados, áreas verdes y bancas para actividades al aire libre en Hogar Belén"
  loading="lazy"
  width="800"
  height="600"
/>
```

---

## 📏 Tamaños y Formatos Recomendados

### Tamaños por Tipo

#### Hero / Banner Principal
- **Tamaño:** 1920x1080px (Full HD)
- **Peso máximo:** 200-300KB
- **Formato:** JPG (calidad 80%)
- **Uso:** Página principal, banners grandes

#### Tarjetas de Servicio
- **Tamaño:** 800x600px (4:3)
- **Peso máximo:** 100-150KB
- **Formato:** JPG (calidad 75-80%)
- **Uso:** Servicios, planes, centro de vida

#### Fotos de Profesionales
- **Tamaño:** 400x400px (1:1)
- **Peso máximo:** 50-80KB
- **Formato:** JPG (calidad 75%)
- **Uso:** Perfiles de equipo, directorio profesionales

#### Galería / Lightbox
- **Tamaño:** 1200x900px (4:3)
- **Peso máximo:** 150-200KB
- **Formato:** JPG (calidad 80%)
- **Uso:** Galería de fotos, imágenes expandibles

#### Thumbnails
- **Tamaño:** 300x200px
- **Peso máximo:** 30-50KB
- **Formato:** JPG (calidad 70%)
- **Uso:** Previsualizaciones, blog posts

#### Open Graph / Social Media
- **Tamaño:** 1200x630px (1.91:1)
- **Peso máximo:** 100KB
- **Formato:** JPG (calidad 80%)
- **Uso:** Compartir en redes sociales

### Tabla de Referencia Rápida

| Uso | Dimensiones | Peso Max | Formato | Calidad |
|-----|-------------|----------|---------|---------|
| Hero Banner | 1920x1080 | 300KB | JPG | 80% |
| Servicio Card | 800x600 | 150KB | JPG | 75-80% |
| Perfil Pro | 400x400 | 80KB | JPG | 75% |
| Galería | 1200x900 | 200KB | JPG | 80% |
| Thumbnail | 300x200 | 50KB | JPG | 70% |
| OG Image | 1200x630 | 100KB | JPG | 80% |
| Logo | Variable | 20KB | PNG | - |
| Iconos | 64x64 | 10KB | PNG/SVG | - |

---

## 🛠️ Herramientas de Optimización

### Online (Gratis)

1. **TinyPNG / TinyJPG**
   - URL: https://tinypng.com
   - Uso: Comprimir JPG y PNG sin pérdida visible
   - Límite: 20 imágenes (5MB cada una)

2. **Squoosh (Google)**
   - URL: https://squoosh.app
   - Uso: Comparar formatos, ajustar calidad manualmente
   - Ventaja: Sin límites, funciona offline

3. **ImageOptim Online**
   - URL: https://imageoptim.com/online
   - Uso: Optimización rápida por lote
   - Formatos: JPG, PNG, GIF

4. **Cloudinary**
   - URL: https://cloudinary.com
   - Uso: Transformaciones automáticas, CDN
   - Plan gratis: 25GB/mes

### Software Desktop

1. **ImageOptim (Mac)**
   - Gratis
   - Optimización por lote
   - Elimina metadatos

2. **RIOT (Windows)**
   - Gratis
   - Comparación visual antes/después
   - Múltiples formatos

3. **XnConvert (Windows/Mac/Linux)**
   - Gratis
   - Procesamiento por lotes
   - Redimensionar + optimizar

### Línea de Comandos

#### ImageMagick (Para procesamiento masivo)

```bash
# Instalar
# Mac: brew install imagemagick
# Ubuntu: sudo apt-get install imagemagick

# Redimensionar y optimizar
magick convert input.jpg -resize 800x600 -quality 80 output.jpg

# Procesamiento por lote (todas las imágenes de una carpeta)
magick mogrify -resize 800x600 -quality 80 -path ./optimized *.jpg
```

#### cwebp (Para convertir a WebP)

```bash
# Instalar
# Mac: brew install webp
# Ubuntu: sudo apt-get install webp

# Convertir JPG a WebP
cwebp -q 80 input.jpg -o output.webp

# Por lote
for file in *.jpg; do cwebp -q 80 "$file" -o "${file%.jpg}.webp"; done
```

---

## 🚀 Formato WebP (Recomendado)

### Ventajas
- ✅ 25-35% más pequeño que JPG
- ✅ Soporta transparencia (como PNG)
- ✅ Compatible con la mayoría de navegadores modernos
- ✅ Mejor para Core Web Vitals

### Implementación con Fallback

```html
<picture>
  <source 
    srcset="centro-vida-adultos-mayores-1.webp" 
    type="image/webp"
  >
  <source 
    srcset="centro-vida-adultos-mayores-1.jpg" 
    type="image/jpeg"
  >
  <img 
    src="centro-vida-adultos-mayores-1.jpg" 
    alt="Adultos mayores en actividades terapéuticas en Centro de Vida Hogar Belén, Buesaco"
    loading="lazy"
    width="800"
    height="600"
  />
</picture>
```

### Soporte de Navegadores
- ✅ Chrome 32+
- ✅ Firefox 65+
- ✅ Edge 18+
- ✅ Safari 14+ (macOS 11+)
- ✅ Opera 19+
- ❌ IE 11 (usar fallback JPG)

---

## ⚡ Lazy Loading

### Implementación Nativa

```html
<!-- Método 1: Atributo loading -->
<img 
  src="imagen.jpg" 
  alt="Descripción SEO" 
  loading="lazy"
  width="800"
  height="600"
/>

<!-- Above the fold (primera pantalla): NO usar lazy loading -->
<img 
  src="hero-image.jpg" 
  alt="Centro de Vida Hogar Belén" 
  loading="eager"
  width="1920"
  height="1080"
/>
```

### Regla General
- **Primera imagen (hero):** `loading="eager"` o sin atributo
- **Todas las demás:** `loading="lazy"`

---

## 📱 Responsive Images

### Diferentes Tamaños según Dispositivo

```html
<img 
  src="centro-vida-800.jpg"
  srcset="
    centro-vida-400.jpg 400w,
    centro-vida-800.jpg 800w,
    centro-vida-1200.jpg 1200w,
    centro-vida-1600.jpg 1600w
  "
  sizes="
    (max-width: 640px) 400px,
    (max-width: 1024px) 800px,
    (max-width: 1536px) 1200px,
    1600px
  "
  alt="Centro de Vida Hogar Belén con adultos mayores en actividades"
  loading="lazy"
  width="800"
  height="600"
/>
```

### Breakpoints Recomendados
- Mobile: 400px, 600px
- Tablet: 800px, 1024px
- Desktop: 1200px, 1600px, 1920px

---

## 📋 Checklist Pre-Upload

Antes de subir una imagen al proyecto, verifica:

- [ ] Nombre de archivo SEO-friendly (keywords, guiones)
- [ ] Tamaño apropiado para el uso (no más grande de lo necesario)
- [ ] Peso optimizado (<150KB idealmente, <300KB máximo para hero)
- [ ] Formato correcto (JPG para fotos, PNG para logos/transparencia)
- [ ] Calidad 75-80% (balance calidad/peso)
- [ ] Texto ALT descriptivo y con keywords naturales
- [ ] Atributos width y height definidos
- [ ] Lazy loading activado (excepto hero)
- [ ] Versión WebP generada (opcional pero recomendado)
- [ ] Responsive sizes si es imagen grande (opcional)

---

## 📂 Estructura de Carpetas Recomendada

```
/public/images/
├── heroes/
│   ├── home-hero-1920x1080.jpg
│   ├── centro-vida-hero-1920x1080.jpg
│   └── ...
├── servicios/
│   ├── centro-vida-actividades-800x600.jpg
│   ├── plan-amigos-social-800x600.jpg
│   └── ...
├── profesionales/
│   ├── enfermera-maria-400x400.jpg
│   ├── fisioterapeuta-juan-400x400.jpg
│   └── ...
├── instalaciones/
│   ├── fachada-hogar-belen-1200x900.jpg
│   ├── comedor-800x600.jpg
│   └── ...
├── actividades/
│   ├── terapia-jardin-800x600.jpg
│   ├── musicoterapia-800x600.jpg
│   └── ...
├── turismo/
│   ├── excursion-nariño-800x600.jpg
│   └── ...
└── og/
    ├── og-home-1200x630.jpg
    ├── og-centro-vida-1200x630.jpg
    └── ...
```

---

## 🎨 Guía de Contenido Visual

### Qué Fotografiar

#### Alta Prioridad
1. **Instalaciones**
   - Fachada del centro
   - Comedor
   - Sala de estar
   - Jardines / áreas exteriores
   - Habitaciones / áreas de descanso

2. **Actividades**
   - Terapia de jardín / horticultura
   - Clases de ejercicio / fisioterapia
   - Actividades sociales / cafés
   - Musicoterapia / arte
   - Celebraciones / eventos

3. **Profesionales**
   - Fotos profesionales del equipo
   - En acción (atendiendo residentes)
   - Con certificaciones/credenciales visible

4. **Residentes** (con consentimiento)
   - Interacciones sociales positivas
   - Participando en actividades
   - Momentos de felicidad genuina
   - Con familias (visitas)

#### Tips de Fotografía
- ✅ Luz natural siempre que sea posible
- ✅ Rostros felices y genuinos
- ✅ Espacios limpios y ordenados
- ✅ Colores vivos y cálidos
- ✅ Ángulos que muestren amplitud
- ❌ Evitar fotos oscuras o sombrías
- ❌ Evitar desorden o suciedad
- ❌ Evitar expresiones tristes o dolor
- ❌ Nunca fotos sin consentimiento

---

## 📊 Auditoría de Imágenes

### Herramientas para Auditar

1. **Lighthouse (Chrome DevTools)**
   - Abre DevTools → Lighthouse
   - Revisa sección "Opportunities"
   - Busca "Properly size images" y "Serve images in next-gen formats"

2. **Google PageSpeed Insights**
   - URL: https://pagespeed.web.dev
   - Ingresa tu URL
   - Revisa sugerencias de imágenes

3. **WebPageTest**
   - URL: https://www.webpagetest.org
   - Test avanzado con waterfall de carga

### Métricas Objetivo

- **LCP (Largest Contentful Paint):** <2.5s
  - La imagen hero debe cargar rápido
- **Peso total de imágenes por página:** <1MB
- **Número de requests de imágenes:** <20

---

## ✅ Checklist de Implementación

### Imágenes Existentes (Migración)
- [ ] Auditar todas las imágenes actuales
- [ ] Renombrar según convención SEO
- [ ] Optimizar tamaño y peso
- [ ] Agregar alt text descriptivo
- [ ] Implementar lazy loading
- [ ] Generar versiones WebP

### Nuevas Imágenes (Flujo de Trabajo)
- [ ] Tomar/seleccionar foto de alta calidad
- [ ] Editar/recortar según tamaño objetivo
- [ ] Nombrar con convención SEO
- [ ] Optimizar con herramienta (TinyPNG, Squoosh)
- [ ] Generar versión WebP
- [ ] Subir a carpeta apropiada
- [ ] Implementar con alt text + lazy loading
- [ ] Probar en diferentes dispositivos

---

## 📞 Contacto y Soporte

Para dudas sobre optimización de imágenes:
- **Email:** dev@hogar-belen.com
- **Documentación:** Ver `/docs/SEO-STRATEGY.md`

**Recursos adicionales:**
- [Web.dev Image Optimization](https://web.dev/fast/#optimize-your-images)
- [Google Images SEO](https://developers.google.com/search/docs/appearance/google-images)
- [Squoosh App](https://squoosh.app)
