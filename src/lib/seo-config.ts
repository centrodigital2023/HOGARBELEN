export const SEO_CONFIG = {
  home: {
    title: 'Hogar Geriátrico en Nariño - Finca de Descanso Hogar Belén',
    description: 'Más que un asilo. Habitaciones privadas o compartidas con alimentación, lavandería y cuidados médicos en el mejor clima de Nariño. Planes todo incluido.',
    keywords: 'hogar geriátrico Nariño, hogar geriátrico Buesaco, centro vida adultos mayores Nariño, cuidado adulto mayor, centro día adulto mayor, atención geriátrica Nariño, residencia adultos mayores, turismo rural adultos mayores',
    canonical: 'https://www.hogarbelen.org/',
    ogImage: 'https://www.hogarbelen.org/images/og-home.jpg'
  },
  
  centroVida: {
    title: 'Centro Día Adulto Mayor en Buesaco | Hogar Belén',
    description: 'Centro de día especializado en Buesaco, Nariño. Actividades terapéuticas, nutrición balanceada y cuidado profesional para adultos mayores. Solo días.',
    keywords: 'centro día adulto mayor Buesaco, centro vida adultos mayores Buesaco, cuidado adulto mayor Nariño, centro día geriátrico, hogar adulto mayor Buesaco, atención geriátrica profesional',
    canonical: 'https://www.hogarbelen.org/servicios/centro-dia-adulto-mayor-buesaco',
    ogImage: 'https://www.hogarbelen.org/images/og-centro-vida.jpg',
    h1: 'Centro Vida Hogar Belén: Donde el tiempo se abraza',
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Centro Vida para Adultos Mayores",
      "provider": {
        "@type": "Organization",
        "name": "Hogar Belén",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Buesaco",
          "addressRegion": "Nariño",
          "addressCountry": "CO"
        }
      },
      "areaServed": {
        "@type": "City",
        "name": "Buesaco"
      },
      "description": "Centro Vida especializado en cuidado integral para adultos mayores en Buesaco, Nariño"
    }
  },
  
  planAmigos: {
    title: 'Día de Sol - Pasadía para Adultos Mayores en Nariño | Plan Amigos',
    description: 'Pasadías, encuentros sociales y compañía real para adultos mayores en Nariño. Plan Amigos de Hogar Belén. Socialización y bienestar emocional.',
    keywords: 'pasadía adulto mayor, día de sol adultos mayores, actividades para adultos mayores Nariño, socialización adulto mayor, bienestar emocional tercera edad, plan amigos',
    canonical: 'https://www.hogarbelen.org/planes/dia-de-sol-adulto-mayor-amigos',
    ogImage: 'https://www.hogarbelen.org/images/og-plan-amigos.jpg',
    h1: 'Plan Amigos: Alegría compartida y compañía real',
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Plan Amigos",
      "serviceType": "Actividades sociales y recreativas para adultos mayores",
      "provider": {
        "@type": "Organization",
        "name": "Hogar Belén"
      },
      "areaServed": "Nariño, Colombia",
      "description": "Paseos y fines de semana en fincas compartidos con otros adultos mayores, con todos los servicios incluidos y acompañamiento profesional"
    }
  },
  
  planSolYCafe: {
    title: 'Turismo Cafetero en Buesaco para Adultos Mayores | Plan Sol y Café',
    description: 'Disfrute del Plan Sol y Café. Pasadías, caminatas ecológicas y gastronomía nariñense adaptada para la tercera edad. Actividades seguras y recreativas.',
    keywords: 'turismo cafetero Buesaco, turismo adulto mayor Buesaco, estancias rurales Nariño, descanso tercera edad, café Buesaco, hospedaje rural adultos mayores',
    canonical: 'https://www.hogarbelen.org/planes/turismo-cafetero-buesaco-abuelos',
    ogImage: 'https://www.hogarbelen.org/images/og-plan-sol-cafe.jpg',
    h1: 'Plan Sol y Café: Descansar también es vivir',
    schema: {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      "name": "Plan Sol y Café",
      "provider": {
        "@type": "Organization",
        "name": "Hogar Belén"
      },
      "touristType": "Adultos mayores",
      "description": "Estancias rurales en fincas tradicionales de Buesaco con gastronomía local y café tradicional"
    }
  },
  
  planSonreir: {
    title: 'Celebración Cumpleaños Adulto Mayor en Nariño | Plan Sonreír',
    description: 'Organizamos celebraciones de cumpleaños seguras, emotivas y memorables para adultos mayores en Hogar Belén. Organización completa y acompañamiento profesional en Nariño.',
    keywords: 'cumpleaños adulto mayor Nariño, celebraciones adulto mayor, cumpleaños adultos mayores Nariño, eventos adultos mayores, fiestas tercera edad',
    canonical: 'https://www.hogarbelen.org/planes/celebracion-cumpleanos-adulto-mayor-narino',
    ogImage: 'https://www.hogarbelen.org/images/og-plan-sonreir.jpg',
    h1: 'Plan Sonreír: Celebrar también es cuidar',
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Plan Sonreír",
      "serviceType": "Organización de celebraciones para adultos mayores",
      "provider": {
        "@type": "Organization",
        "name": "Hogar Belén"
      },
      "description": "Servicio integral de organización y acompañamiento de celebraciones para adultos mayores y sus familias"
    }
  },
  
  planTurismoRural: {
    title: 'Ecoturismo y Zooterapia Tercera Edad en Nariño | Turismo Rural',
    description: 'Plan Turismo Rural: Zooterapia, ecoturismo y espiritualidad para adultos mayores en Nariño. Conexión con la naturaleza. Experiencias guiadas y seguras.',
    keywords: 'ecoturismo tercera edad, zooterapia tercera edad Nariño, turismo rural adulto mayor Nariño, zooterapia adultos mayores, ecoturismo senior, naturaleza adultos mayores',
    canonical: 'https://www.hogarbelen.org/planes/ecoturismo-zooterapia-tercera-edad',
    ogImage: 'https://www.hogarbelen.org/images/og-plan-turismo-rural.jpg',
    h1: 'Plan Turismo Rural: Conectarse con la vida',
    schema: {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      "name": "Plan Turismo Rural",
      "provider": {
        "@type": "Organization",
        "name": "Hogar Belén"
      },
      "touristType": "Adultos mayores",
      "description": "Salidas ecológicas, zooterapia, recorridos históricos y espacios de espiritualidad en entornos naturales"
    }
  },
  
  planesVidaActiva: {
    title: 'Planes Recreativos para Adultos Mayores en Nariño | Hogar Belén',
    description: 'Descubre nuestros planes diseñados para promover la vida activa, el bienestar y la felicidad de los adultos mayores en Buesaco, Nariño. Turismo, recreación y celebraciones.',
    keywords: 'planes recreativos adulto mayor, planes adultos mayores, vida activa tercera edad, programas adultos mayores Nariño, bienestar adultos mayores',
    canonical: 'https://www.hogarbelen.org/planes-recreativos-adulto-mayor',
    ogImage: 'https://www.hogarbelen.org/images/og-planes.jpg',
    h1: 'Planes de Vida Activa: Cada día es una oportunidad para vivir mejor'
  },
  
  about: {
    title: 'Quiénes Somos - Hogar Geriátrico en Nariño | Hogar Belén',
    description: 'Conoce la historia, misión y valores de Hogar Belén. Centro de vida y cuidado integral para adultos mayores en Buesaco, Nariño. Autoridad en cuidado geriátrico.',
    keywords: 'quiénes somos Hogar Belén, hogar geriátrico Nariño, hogar geriátrico Buesaco, centro vida Nariño, historia Hogar Belén',
    canonical: 'https://www.hogarbelen.org/quienes-somos-hogar-geriatrico-narino',
    ogImage: 'https://www.hogarbelen.org/images/og-about.jpg'
  },
  
  pricing: {
    title: 'Planes de Cuidado para Adulto Mayor | Hogar Belén',
    description: 'Conoce nuestros precios y planes de cuidado para adultos mayores en Buesaco, Nariño. Habitación compartida económica y habitación privada premium. Opciones flexibles.',
    keywords: 'precios hogar geriátrico Buesaco, tarifas adultos mayores, planes cuidado adulto mayor Nariño, habitación compartida, habitación privada',
    canonical: 'https://www.hogarbelen.org/servicios-cuidado-adulto-mayor',
    ogImage: 'https://www.hogarbelen.org/images/og-pricing.jpg'
  },
  
  services: {
    title: 'Servicios Profesionales de Cuidado | Hogar Belén',
    description: 'Servicios integrales de cuidado, salud, nutrición y terapia para adultos mayores en Buesaco, Nariño. Personal profesional y capacitado.',
    keywords: 'servicios geriátricos, atención adultos mayores, cuidado profesional Nariño, terapia adultos mayores',
    canonical: 'https://www.hogarbelen.org/servicios-cuidado-adulto-mayor',
    ogImage: 'https://www.hogarbelen.org/images/og-services.jpg'
  },
  
  contact: {
    title: 'Contacto y Ubicación en Buesaco | Hogar Belén',
    description: 'Contáctanos para agendar una visita o resolver tus dudas. WhatsApp: +57 321 570 8655. Email: hogarbelen2022@gmail.com. Buesaco, Nariño.',
    keywords: 'contacto Hogar Belén, ubicación Buesaco, teléfono hogar geriátrico Buesaco, dirección centro vida Nariño',
    canonical: 'https://www.hogarbelen.org/contacto-ubicacion-buesaco',
    ogImage: 'https://www.hogarbelen.org/images/og-contact.jpg'
  },
  
  belenConectaFamilias: {
    title: 'Contratar Cuidador Verificado | Belén Conecta Familias',
    description: 'Plataforma líder para contratar enfermeros, geriatras y cuidadores verificados a domicilio en Pasto, Cali y Bogotá. Perfiles revisados y seguros.',
    keywords: 'contratar cuidador, cuidador verificado, enfermeras a domicilio, plataforma familias, seguimiento adultos mayores, comunicación familiar',
    canonical: 'https://www.hogarbelen.org/belen-conecta/contratar-cuidador-verificado',
    ogImage: 'https://www.hogarbelen.org/images/og-familias.jpg'
  },
  
  belenConectaProfesionales: {
    title: 'Empleo Profesionales Salud en Nariño | Belén Conecta',
    description: 'Plataforma para profesionales de la salud y cuidado. Gestión de servicios, agenda y comunicación con familias. Únete a nuestra red verificada.',
    keywords: 'empleo profesionales salud Nariño, empleo cuidadores, trabajo geriátrico, plataforma profesionales salud, empleo geriátrico Nariño, trabajo adultos mayores',
    canonical: 'https://www.hogarbelen.org/belen-conecta/empleo-profesionales-salud-narino',
    ogImage: 'https://www.hogarbelen.org/images/og-profesionales.jpg'
  },
  
  jobs: {
    title: 'Empleo Cuidadores Adulto Mayor | Hogar Belén',
    description: 'Únete a nuestro equipo de profesionales. Ofertas de trabajo en cuidado de adultos mayores en Buesaco, Nariño. Envía tu hoja de vida.',
    keywords: 'empleo cuidadores adulto mayor, empleo hogar geriátrico Nariño, trabajo cuidado adultos mayores, vacantes Buesaco',
    canonical: 'https://www.hogarbelen.org/empleo-cuidadores-adulto-mayor',
    ogImage: 'https://www.hogarbelen.org/images/og-jobs.jpg'
  },
  
  belenConectaApp: {
    title: 'Encuentre Enfermeras y Cuidadores en Pasto y Nariño | Belén Conecta',
    description: 'Plataforma líder para contratar enfermeros, geriatras y cuidadores verificados a domicilio en Pasto, Cali y Bogotá. Perfiles revisados y seguros.',
    keywords: 'enfermeras Pasto, cuidadores Nariño, enfermeras a domicilio, cuidadores verificados, app cuidadores, plataforma salud',
    canonical: 'https://www.hogarbelen.org/belen-conecta-app',
    ogImage: 'https://www.hogarbelen.org/images/og-app.jpg'
  },
  
  // Servicios de Residencia
  habitacionCompartida: {
    title: 'Habitación Compartida Económica | Residencia Adulto Mayor',
    description: 'Plan económico de residencia para adultos mayores. Habitación compartida con alimentación, lavandería y cuidados médicos incluidos en Buesaco, Nariño.',
    keywords: 'habitación compartida adulto mayor, plan económico residencia, internado adulto mayor, residencia económica Nariño',
    canonical: 'https://www.hogarbelen.org/residencia/habitacion-compartida-economica',
    ogImage: 'https://www.hogarbelen.org/images/og-habitacion-compartida.jpg',
    schema: {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Habitación Compartida Económica",
      "description": "Plan económico de residencia para adultos mayores con servicios incluidos",
      "provider": {
        "@type": "Organization",
        "name": "Hogar Belén"
      }
    }
  },
  
  habitacionPrivada: {
    title: 'Habitación Privada Suite | Residencia Premium Adulto Mayor',
    description: 'Plan Premium: Habitación privada tipo suite para adultos mayores cerca de Pasto. Servicios completos, atención personalizada y máximo confort en Buesaco.',
    keywords: 'habitación privada adulto mayor, suite premium, residencia adulto mayor Pasto, internado privado, plan premium',
    canonical: 'https://www.hogarbelen.org/residencia/habitacion-privada-suite-adulto-mayor',
    ogImage: 'https://www.hogarbelen.org/images/og-habitacion-privada.jpg',
    schema: {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Habitación Privada Suite Premium",
      "description": "Plan premium de residencia con habitación privada y servicios exclusivos",
      "provider": {
        "@type": "Organization",
        "name": "Hogar Belén"
      }
    }
  },
  
  // Servicios Externos
  cuidadoresDomicilio: {
    title: 'Cuidadores y Enfermeras a Domicilio | Servicios Externos',
    description: 'Servicio de cuidadores y enfermeras profesionales a domicilio en Pasto y Nariño. Atención personalizada en casa para adultos mayores.',
    keywords: 'cuidadores a domicilio, enfermeras a domicilio, cuidado en casa, atención domiciliaria adulto mayor Pasto',
    canonical: 'https://www.hogarbelen.org/servicios/cuidadores-enfermeras-a-domicilio',
    ogImage: 'https://www.hogarbelen.org/images/og-domicilio.jpg',
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Cuidadores a Domicilio",
      "serviceType": "Cuidado y enfermería a domicilio",
      "provider": {
        "@type": "Organization",
        "name": "Hogar Belén"
      },
      "areaServed": "Nariño, Colombia"
    }
  },
  
  enfermeria24: {
    title: 'Enfermería Geriátrica 24 Horas en Casa | Hogar Belén',
    description: 'Servicio de enfermería geriátrica 24/7 en casa. Atención profesional continua para adultos mayores en Pasto y Nariño.',
    keywords: 'enfermería 24 horas, enfermería geriátrica casa, atención 24/7 adulto mayor, cuidado continuo domicilio',
    canonical: 'https://www.hogarbelen.org/servicios/enfermeria-geriatrica-casa-24-horas',
    ogImage: 'https://www.hogarbelen.org/images/og-enfermeria.jpg',
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Enfermería Geriátrica 24/7",
      "serviceType": "Enfermería profesional a domicilio 24 horas",
      "provider": {
        "@type": "Organization",
        "name": "Hogar Belén"
      },
      "areaServed": "Nariño, Colombia"
    }
  },
  
  // Páginas Legales
  terminosCondiciones: {
    title: 'Términos y Condiciones | Hogar Belén',
    description: 'Términos y condiciones de uso de los servicios de Hogar Belén. Lea nuestras políticas y condiciones de servicio.',
    keywords: 'términos y condiciones, políticas de servicio, condiciones de uso',
    canonical: 'https://www.hogarbelen.org/legales/terminos-y-condiciones',
    ogImage: 'https://www.hogarbelen.org/images/og-legal.jpg'
  },
  
  politicaPrivacidad: {
    title: 'Política de Privacidad y Protección de Datos | Hogar Belén',
    description: 'Política de privacidad y protección de datos personales de Hogar Belén. Conoce cómo protegemos tu información.',
    keywords: 'política de privacidad, protección de datos, RGPD, privacidad datos personales',
    canonical: 'https://www.hogarbelen.org/legales/politica-de-privacidad-datos',
    ogImage: 'https://www.hogarbelen.org/images/og-legal.jpg'
  }
};

export const LOCAL_SEO = {
  NAP: {
    name: 'Hogar Belén',
    address: 'Buesaco, Nariño, Colombia',
    phone: '+57 321 570 8655',
    email: 'hogarbelen2022@gmail.com'
  },
  
  cities: [
    'Buesaco',
    'Pasto', 
    'La Unión',
    'San Lorenzo',
    'Nariño'
  ],
  
  localContent: 'Hogar Belén es un referente en cuidado de adultos mayores en Buesaco y municipios cercanos como Pasto, La Unión y San Lorenzo. Ubicados en el corazón de Nariño, ofrecemos servicios profesionales de cuidado geriátrico en un entorno natural privilegiado.',
  
  legalCheckboxText: 'Acepto la política de datos y términos de servicio: Autorizo de manera libre, previa y voluntaria a Hogar Belen Buesaco S.A.S. para recolectar y tratar mis datos personales conforme a la Política de Privacidad y los Términos y Condiciones. Acepto ser contactado vía telefónica, correo electrónico o WhatsApp para recibir información sobre los servicios.'
};
