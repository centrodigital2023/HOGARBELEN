/**
 * Meta Pixel (Facebook Pixel) Helper
 * Tracks events for advertising and remarketing
 */

declare global {
  interface Window {
    fbq: any;
  }
}

export const MetaPixel = {
  /**
   * Track PageView - Called automatically on every page load
   */
  trackPageView: () => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView');
    }
  },

  /**
   * Track ViewContent - When user views a service, plan, or professional profile
   * @param contentName - Name of the content being viewed
   * @param contentCategory - Category (e.g., 'servicios', 'planes', 'profesionales')
   * @param value - Optional value
   */
  trackViewContent: (contentName: string, contentCategory: string, value?: number) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_name: contentName,
        content_category: contentCategory,
        value: value,
        currency: 'COP'
      });
    }
  },

  /**
   * Track Lead - When user submits a form, clicks WhatsApp, or makes a reservation
   * @param leadType - Type of lead (e.g., 'contacto', 'whatsapp', 'reserva')
   * @param value - Optional value
   */
  trackLead: (leadType: string, value?: number) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: leadType,
        value: value,
        currency: 'COP'
      });
    }
  },

  /**
   * Track CompleteRegistration - When professional completes registration
   * @param registrationType - Type of registration ('profesional' or 'familiar')
   */
  trackCompleteRegistration: (registrationType: string) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'CompleteRegistration', {
        content_name: registrationType,
        status: 'completed'
      });
    }
  },

  /**
   * Track custom event
   * @param eventName - Custom event name
   * @param parameters - Event parameters
   */
  trackCustomEvent: (eventName: string, parameters?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', eventName, parameters);
    }
  }
};

export default MetaPixel;
