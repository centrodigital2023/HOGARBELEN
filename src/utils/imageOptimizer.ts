/**
 * Utilidades para optimización de imágenes con soporte WebP
 */

interface ImageOptimizationOptions {
  quality?: number;
  format?: 'webp' | 'avif' | 'auto';
  width?: number;
  height?: number;
}

/**
 * Genera URLs optimizadas para diferentes tamaños y formatos
 */
export function getOptimizedImageUrl(
  src: string,
  options: ImageOptimizationOptions = {}
): string {
  const { quality = 85, format = 'auto', width, height } = options;

  // Si es una URL externa, retornarla tal cual
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }

  // Convertir extensión a WebP para imágenes locales
  const webpSrc = src.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp');
  
  return webpSrc;
}

/**
 * Genera un srcset con múltiples resoluciones
 */
export function generateSrcSet(
  src: string,
  widths: number[] = [320, 640, 768, 1024, 1280, 1920]
): string {
  return widths
    .map(width => {
      const optimizedSrc = getOptimizedImageUrl(src, { width });
      return `${optimizedSrc} ${width}w`;
    })
    .join(', ');
}

/**
 * Genera sizes attribute para responsive images
 */
export function generateSizes(breakpoints: Record<string, string>): string {
  return Object.entries(breakpoints)
    .map(([breakpoint, size]) => `(max-width: ${breakpoint}) ${size}`)
    .join(', ');
}

/**
 * Detecta soporte de WebP en el navegador
 */
export function supportsWebP(): Promise<boolean> {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
}

/**
 * Precargar imagen crítica
 */
export function preloadImage(src: string, as: 'image' = 'image'): void {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = as;
  link.href = src;
  document.head.appendChild(link);
}
