import { useEffect } from 'react';

interface SEOHeadProps {
  page: string;
}

const pageMetadata: Record<string, { title: string; description: string; keywords: string }> = {
  home: {
    title: 'Hogar Belén - Centro de Vida para Adultos Mayores en Buesaco, Nariño',
    description: 'Un despertar. Una finca de descanso en el corazón de Buesaco donde la vida no solo continúa, florece. Cuidado residencial, profesionales de salud y vida activa.',
    keywords: 'hogar belén, adultos mayores, buesaco, nariño, cuidado residencial, centro de vida'
  },
  services: {
    title: 'Profesionales de Salud | Hogar Belén',
    description: 'Encuentra enfermeras, cuidadores, fisioterapeutas y profesionales de salud verificados para el cuidado de adultos mayores.',
    keywords: 'enfermeras, cuidadores, fisioterapeutas, profesionales de salud, adulto mayor'
  },
  pricing: {
    title: 'Planes y Precios | Hogar Belén',
    description: 'Habitación compartida $1.850.000/mes, Habitación individual $2.250.000/mes. Todo incluido con cuidado integral.',
    keywords: 'planes, precios, cuidado residencial, todo incluido'
  },
  about: {
    title: 'Nosotros | Hogar Belén',
    description: 'Conoce nuestra historia y misión de brindar cuidado digno y amoroso a los adultos mayores en Buesaco, Nariño.',
    keywords: 'nosotros, misión, visión, hogar belén, buesaco'
  },
  contact: {
    title: 'Contacto | Hogar Belén',
    description: 'Contáctanos para más información sobre nuestros servicios de cuidado residencial y profesionales de salud.',
    keywords: 'contacto, información, teléfono, email, hogar belén'
  },
  'servicio-cuidado-residencial': {
    title: 'Cuidado Residencial - Centro Vida | Hogar Belén',
    description: 'Centro de vida para adultos mayores con atención integral 24/7, alimentación balanceada, actividades recreativas y cuidado médico.',
    keywords: 'centro vida, cuidado residencial, atención integral, adulto mayor'
  },
  'servicio-dulce-hogar': {
    title: 'Servicio Dulce Hogar | Hogar Belén',
    description: 'Planes de vida activa: Plan Amigos, Sol y Café, Sonreír y Turismo Rural para adultos mayores activos.',
    keywords: 'dulce hogar, vida activa, turismo rural, planes bienestar'
  },
  'servicio-belen-conecta': {
    title: 'Belén Conecta para Familias | Hogar Belén',
    description: 'Plataforma para buscar profesionales, publicar ofertas de empleo y gestionar servicios de cuidado.',
    keywords: 'belén conecta, familias, búsqueda profesionales, ofertas empleo'
  },
  'registro-profesional': {
    title: 'Registro de Profesionales | Hogar Belén',
    description: 'Regístrate como profesional de salud verificado. Proceso inteligente con validación IA.',
    keywords: 'registro profesional, enfermera, cuidador, fisioterapeuta, trabajo'
  },
  admin: {
    title: 'Panel de Administración | Hogar Belén',
    description: 'Sistema de administración integral con métricas en tiempo real y gestión IA.',
    keywords: 'admin, dashboard, gestión, métricas'
  },
  'ai-assistant': {
    title: 'Asistente IA de Cuidado | Hogar Belén',
    description: 'Asistente inteligente para ayudarte a encontrar el mejor cuidado para tu familia.',
    keywords: 'ia, asistente virtual, cuidado personalizado, inteligencia artificial'
  }
};

export default function SEOHead({ page }: SEOHeadProps) {
  useEffect(() => {
    const metadata = pageMetadata[page] || pageMetadata.home;
    
    document.title = metadata.title;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', metadata.description);
    }
    
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', metadata.keywords);
    }
    
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', metadata.title);
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', metadata.description);
    }
    
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', metadata.title);
    }
    
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', metadata.description);
    }
  }, [page]);

  return null;
}
