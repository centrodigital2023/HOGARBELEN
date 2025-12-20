// Meta Pixel (Facebook) Tracking Utilities
// Implementation for tracking user events and conversions

declare global {
  interface Window {
    fbq: any;
  }
}

export type PixelEventName = 
  | 'PageView'
  | 'ViewContent'
  | 'Lead'
  | 'CompleteRegistration'
  | 'Contact'
  | 'Schedule'
  | 'SubmitApplication';

export interface ViewContentData {
  content_name: string;
  content_category: string;
  content_ids?: string[];
  value?: number;
  currency?: string;
}

export interface LeadData {
  source: 'WhatsApp' | 'Formulario' | 'Reserva' | 'Teléfono' | 'Email';
  content_name?: string;
  value?: number;
  currency?: string;
}

export interface CompleteRegistrationData {
  role: 'Profesional de Salud' | 'Familia' | 'Usuario';
  content_name?: string;
  status?: string;
}

/**
 * Check if Facebook Pixel is loaded
 */
export const isPixelLoaded = (): boolean => {
  return typeof window !== 'undefined' && typeof window.fbq === 'function';
};

/**
 * Track a page view event
 */
export const trackPageView = (): void => {
  if (isPixelLoaded()) {
    window.fbq('track', 'PageView');
  }
};

/**
 * Track a ViewContent event
 * Use when a user views a service, plan, or professional profile
 */
export const trackViewContent = (data: ViewContentData): void => {
  if (isPixelLoaded()) {
    window.fbq('track', 'ViewContent', {
      content_name: data.content_name,
      content_category: data.content_category,
      ...(data.content_ids && { content_ids: data.content_ids }),
      ...(data.value && { value: data.value }),
      ...(data.currency && { currency: data.currency || 'COP' })
    });
    
    console.log('📊 Meta Pixel - ViewContent tracked:', data.content_name);
  }
};

/**
 * Track a Lead event
 * Use when a user submits a contact form, WhatsApp message, or reservation
 */
export const trackLead = (data: LeadData): void => {
  if (isPixelLoaded()) {
    window.fbq('track', 'Lead', {
      source: data.source,
      ...(data.content_name && { content_name: data.content_name }),
      ...(data.value && { value: data.value }),
      ...(data.currency && { currency: data.currency || 'COP' })
    });
    
    console.log('📊 Meta Pixel - Lead tracked:', data.source);
  }
};

/**
 * Track a CompleteRegistration event
 * Use when a professional or family member completes registration
 */
export const trackCompleteRegistration = (data: CompleteRegistrationData): void => {
  if (isPixelLoaded()) {
    window.fbq('track', 'CompleteRegistration', {
      role: data.role,
      ...(data.content_name && { content_name: data.content_name }),
      ...(data.status && { status: data.status })
    });
    
    console.log('📊 Meta Pixel - CompleteRegistration tracked:', data.role);
  }
};

/**
 * Track a Contact event
 * Use when a user initiates contact via phone or email
 */
export const trackContact = (method: string): void => {
  if (isPixelLoaded()) {
    window.fbq('track', 'Contact', {
      contact_method: method
    });
    
    console.log('📊 Meta Pixel - Contact tracked:', method);
  }
};

/**
 * Track a Schedule event
 * Use when a user schedules an appointment or visit
 */
export const trackSchedule = (serviceName: string): void => {
  if (isPixelLoaded()) {
    window.fbq('track', 'Schedule', {
      content_name: serviceName,
      content_category: 'Adulto Mayor'
    });
    
    console.log('📊 Meta Pixel - Schedule tracked:', serviceName);
  }
};

/**
 * Track a SubmitApplication event
 * Use when a professional submits a job application
 */
export const trackSubmitApplication = (jobTitle: string): void => {
  if (isPixelLoaded()) {
    window.fbq('track', 'SubmitApplication', {
      content_name: jobTitle,
      content_category: 'Empleo Salud'
    });
    
    console.log('📊 Meta Pixel - SubmitApplication tracked:', jobTitle);
  }
};

/**
 * Track custom event
 * Use for any custom tracking needs
 */
export const trackCustomEvent = (eventName: string, data?: any): void => {
  if (isPixelLoaded()) {
    window.fbq('trackCustom', eventName, data);
    
    console.log('📊 Meta Pixel - Custom event tracked:', eventName);
  }
};

// Helper functions for common scenarios

/**
 * Track when user views a professional profile
 */
export const trackProfessionalView = (professionalName: string, professionalId: string): void => {
  trackViewContent({
    content_name: `Perfil: ${professionalName}`,
    content_category: 'Profesional de Salud',
    content_ids: [professionalId]
  });
};

/**
 * Track when user views a service page
 */
export const trackServiceView = (serviceName: string): void => {
  trackViewContent({
    content_name: serviceName,
    content_category: 'Servicio'
  });
};

/**
 * Track when user views a plan page
 */
export const trackPlanView = (planName: string, price?: number): void => {
  trackViewContent({
    content_name: planName,
    content_category: 'Plan',
    ...(price && { value: price, currency: 'COP' })
  });
};

/**
 * Track when user submits contact form
 */
export const trackContactFormSubmit = (formType: string): void => {
  trackLead({
    source: 'Formulario',
    content_name: formType
  });
};

/**
 * Track when user clicks WhatsApp button
 */
export const trackWhatsAppClick = (context: string): void => {
  trackLead({
    source: 'WhatsApp',
    content_name: context
  });
};

/**
 * Track when user makes a phone call
 */
export const trackPhoneCall = (): void => {
  trackLead({
    source: 'Teléfono'
  });
};

/**
 * Track when a professional completes registration
 */
export const trackProfessionalRegistration = (professionalType: string): void => {
  trackCompleteRegistration({
    role: 'Profesional de Salud',
    content_name: professionalType,
    status: 'pendiente'
  });
};

/**
 * Track when a family member completes registration
 */
export const trackFamilyRegistration = (): void => {
  trackCompleteRegistration({
    role: 'Familia',
    status: 'activo'
  });
};
