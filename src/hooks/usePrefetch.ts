/**
 * Hook para precargar componentes lazy antes de que se necesiten
 */

import { useEffect } from 'react';

type LazyComponent = () => Promise<any>;

interface PrefetchOptions {
  /**
   * Precargar en el evento onMouseEnter (hover)
   */
  onHover?: boolean;
  /**
   * Precargar después de un delay en milisegundos
   */
  delay?: number;
  /**
   * Precargar inmediatamente
   */
  immediate?: boolean;
}

/**
 * Precarga un componente lazy importado
 */
export function prefetchComponent(componentLoader: LazyComponent): Promise<any> {
  return componentLoader();
}

/**
 * Hook para precargar múltiples componentes
 */
export function usePrefetch(
  components: Record<string, LazyComponent>,
  options: PrefetchOptions = {}
) {
  const { delay = 0, immediate = false } = options;

  useEffect(() => {
    if (!immediate && delay === 0) return;

    const timeoutId = setTimeout(() => {
      Object.values(components).forEach(componentLoader => {
        // Usar requestIdleCallback si está disponible
        if ('requestIdleCallback' in window) {
          (window as any).requestIdleCallback(() => {
            prefetchComponent(componentLoader);
          });
        } else {
          prefetchComponent(componentLoader);
        }
      });
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [components, delay, immediate]);
}

/**
 * Props helper para agregar prefetch on hover a links
 */
export function createPrefetchProps(
  componentLoader: LazyComponent
): {
  onMouseEnter: () => void;
  onFocus: () => void;
} {
  const handlePrefetch = () => {
    prefetchComponent(componentLoader);
  };

  return {
    onMouseEnter: handlePrefetch,
    onFocus: handlePrefetch,
  };
}

/**
 * Hook para precargar rutas basado en prioridad
 */
export function usePrefetchRoutes(
  routes: Array<{ path: string; loader: LazyComponent; priority: 'high' | 'medium' | 'low' }>
) {
  useEffect(() => {
    // Precargar rutas de alta prioridad inmediatamente
    const highPriority = routes.filter(r => r.priority === 'high');
    highPriority.forEach(route => {
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(() => prefetchComponent(route.loader));
      } else {
        setTimeout(() => prefetchComponent(route.loader), 100);
      }
    });

    // Precargar rutas de prioridad media después de 2 segundos
    const mediumTimeout = setTimeout(() => {
      const mediumPriority = routes.filter(r => r.priority === 'medium');
      mediumPriority.forEach(route => {
        if ('requestIdleCallback' in window) {
          (window as any).requestIdleCallback(() => prefetchComponent(route.loader));
        } else {
          prefetchComponent(route.loader);
        }
      });
    }, 2000);

    // Precargar rutas de baja prioridad después de 5 segundos
    const lowTimeout = setTimeout(() => {
      const lowPriority = routes.filter(r => r.priority === 'low');
      lowPriority.forEach(route => {
        if ('requestIdleCallback' in window) {
          (window as any).requestIdleCallback(() => prefetchComponent(route.loader));
        } else {
          prefetchComponent(route.loader);
        }
      });
    }, 5000);

    return () => {
      clearTimeout(mediumTimeout);
      clearTimeout(lowTimeout);
    };
  }, [routes]);
}
