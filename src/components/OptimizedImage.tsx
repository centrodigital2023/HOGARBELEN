import { useState, useEffect, ImgHTMLAttributes } from 'react';
import { getOptimizedImageUrl, generateSrcSet, supportsWebP } from '../utils/imageOptimizer';

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  priority?: boolean;
  responsive?: boolean;
  fallback?: string;
}

/**
 * Componente de imagen optimizado con soporte WebP y lazy loading
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  quality = 85,
  priority = false,
  responsive = true,
  fallback,
  className = '',
  loading,
  ...props
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState<string>(src);
  const [hasError, setHasError] = useState(false);
  const [webpSupported, setWebpSupported] = useState(true);

  useEffect(() => {
    // Detectar soporte de WebP
    supportsWebP().then(setWebpSupported);
  }, []);

  useEffect(() => {
    if (webpSupported) {
      const optimizedSrc = getOptimizedImageUrl(src, { quality, width, height });
      setImageSrc(optimizedSrc);
    } else {
      setImageSrc(src);
    }
  }, [src, quality, width, height, webpSupported]);

  const handleError = () => {
    setHasError(true);
    if (fallback) {
      setImageSrc(fallback);
    } else if (webpSupported) {
      // Si falla WebP, intentar con la imagen original
      setImageSrc(src);
      setWebpSupported(false);
    }
  };

  const srcSet = responsive && webpSupported
    ? generateSrcSet(src)
    : undefined;

  const sizes = responsive
    ? '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
    : undefined;

  return (
    <img
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : loading || 'lazy'}
      decoding="async"
      srcSet={srcSet}
      sizes={sizes}
      onError={handleError}
      className={className}
      {...props}
    />
  );
}
