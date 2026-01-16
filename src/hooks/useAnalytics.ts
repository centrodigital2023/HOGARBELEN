/**
 * Hook de React para Google Analytics 4
 */

import { useEffect } from 'react';
import { initGA4, trackPageView, trackScrollDepth, trackTimeOnPage } from '../utils/analytics';

interface UseAnalyticsOptions {
  measurementId: string;
  trackScroll?: boolean;
  trackTime?: boolean;
  pageName?: string;
}

export function useAnalytics(options: UseAnalyticsOptions) {
  const { measurementId, trackScroll = true, trackTime = true, pageName } = options;

  useEffect(() => {
    // Inicializar GA4 una vez
    if (measurementId && !window.gtag) {
      initGA4(measurementId);
      window.GA_MEASUREMENT_ID = measurementId;
    }
  }, [measurementId]);

  useEffect(() => {
    // Rastrear vista de página cuando cambia la URL
    if (window.gtag) {
      trackPageView(window.location.pathname, pageName);
    }

    // Configurar rastreo de scroll
    let cleanupScroll: (() => void) | undefined;
    if (trackScroll) {
      cleanupScroll = trackScrollDepth();
    }

    // Configurar rastreo de tiempo
    let cleanupTime: (() => void) | undefined;
    if (trackTime && pageName) {
      cleanupTime = trackTimeOnPage(pageName);
    }

    return () => {
      cleanupScroll?.();
      cleanupTime?.();
    };
  }, [trackScroll, trackTime, pageName]);
}
