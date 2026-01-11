declare global {
  interface Window {
    fbq?: (
      action: string,
      eventName: string,
      params?: Record<string, any>
    ) => void;
    _fbq?: any;
  }
}

export class MetaPixelService {
  static trackPageView(): void {
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'PageView');
    }
  }

  static trackViewContent(params: {
    content_name: string;
    content_category?: string;
  }): void {
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'ViewContent', {
        content_name: params.content_name,
        content_category: params.content_category || 'Adulto Mayor',
      });
    }
  }

  static trackLead(params: {
    source: string;
    content_name?: string;
  }): void {
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'Lead', {
        source: params.source,
        content_name: params.content_name,
        content_category: 'Adulto Mayor',
      });
    }
  }

  static trackCompleteRegistration(params: {
    role: string;
  }): void {
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'CompleteRegistration', {
        role: params.role,
        content_category: 'Profesional de Salud',
      });
    }
  }

  static trackContact(params: {
    method: 'WhatsApp' | 'Formulario' | 'Email' | 'Telefono';
  }): void {
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'Contact', {
        contact_method: params.method,
      });
    }
  }

  static trackCustomEvent(eventName: string, params?: Record<string, any>): void {
    if (typeof window.fbq !== 'undefined') {
      window.fbq('trackCustom', eventName, params);
    }
  }
}

export default MetaPixelService;
