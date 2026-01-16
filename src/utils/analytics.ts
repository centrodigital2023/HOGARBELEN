/**
 * Configuración y utilidades para Google Analytics 4 y Search Console
 */

// Tipos para eventos de GA4
export interface GAEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

/**
 * Inicializar Google Analytics 4
 */
export function initGA4(measurementId: string): void {
  if (typeof window === 'undefined') return;

  // Cargar script de GA4
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  script.async = true;
  document.head.appendChild(script);

  // Inicializar dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    page_path: window.location.pathname,
    send_page_view: true,
  });
}

/**
 * Enviar evento a GA4
 */
export function trackEvent(eventName: string, params?: Record<string, any>): void {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', eventName, params);
}

/**
 * Rastrear vista de página
 */
export function trackPageView(url: string, title?: string): void {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('config', window.GA_MEASUREMENT_ID, {
    page_path: url,
    page_title: title,
  });
}

/**
 * Eventos predefinidos para el negocio
 */
export const GAEvents = {
  // Registro y autenticación
  signup: (role: string) =>
    trackEvent('sign_up', { method: 'email', role }),
  
  login: (role: string) =>
    trackEvent('login', { method: 'email', role }),

  // Interacciones con servicios
  viewService: (serviceName: string) =>
    trackEvent('view_item', { 
      item_name: serviceName,
      item_category: 'service'
    }),

  selectPlan: (planName: string, price: number) =>
    trackEvent('add_to_cart', {
      items: [{ item_name: planName, price }]
    }),

  beginCheckout: (planName: string) =>
    trackEvent('begin_checkout', {
      items: [{ item_name: planName }]
    }),

  purchase: (planName: string, value: number) =>
    trackEvent('purchase', {
      transaction_id: `${Date.now()}`,
      value,
      currency: 'COP',
      items: [{ item_name: planName, price: value }]
    }),

  // Interacciones con profesionales
  viewProfessional: (professionalId: string) =>
    trackEvent('view_item', {
      item_id: professionalId,
      item_category: 'professional'
    }),

  contactProfessional: (professionalId: string) =>
    trackEvent('contact_professional', {
      professional_id: professionalId
    }),

  // Formularios de contacto
  submitContactForm: (formType: string) =>
    trackEvent('generate_lead', {
      form_type: formType
    }),

  // Búsqueda
  search: (searchTerm: string) =>
    trackEvent('search', {
      search_term: searchTerm
    }),

  // Engagement
  scrollDepth: (percentage: number) =>
    trackEvent('scroll', {
      percent_scrolled: percentage
    }),

  timeOnPage: (seconds: number, page: string) =>
    trackEvent('time_on_page', {
      value: seconds,
      page
    }),
};

/**
 * Hook para rastrear scroll depth
 */
export function trackScrollDepth(): void {
  if (typeof window === 'undefined') return;

  const depths = [25, 50, 75, 100];
  const tracked = new Set<number>();

  const handleScroll = () => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );

    depths.forEach(depth => {
      if (scrollPercent >= depth && !tracked.has(depth)) {
        tracked.add(depth);
        GAEvents.scrollDepth(depth);
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  
  return () => window.removeEventListener('scroll', handleScroll);
}

/**
 * Hook para rastrear tiempo en página
 */
export function trackTimeOnPage(pageName: string): () => void {
  const startTime = Date.now();

  return () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    if (timeSpent > 5) { // Solo rastrear si estuvo más de 5 segundos
      GAEvents.timeOnPage(timeSpent, pageName);
    }
  };
}

/**
 * Declaraciones de tipos para window
 */
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    GA_MEASUREMENT_ID: string;
  }
}
