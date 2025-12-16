import { useEffect } from 'react'

export interface SEOConfig {
  title: string
  description: string
  keywords?: string
  canonical?: string
  ogImage?: string
  ogType?: string
  twitterCard?: 'summary' | 'summary_large_image'
}

export interface PageSEO extends SEOConfig {
  h1: string
  breadcrumbs?: Array<{ label: string; url: string }>
}

export const useSEO = (config: SEOConfig) => {
  useEffect(() => {
    document.title = config.title

    const metaTags = [
      { name: 'description', content: config.description },
      { name: 'keywords', content: config.keywords || '' },
      { property: 'og:title', content: config.title },
      { property: 'og:description', content: config.description },
      { property: 'og:type', content: config.ogType || 'website' },
      { property: 'og:image', content: config.ogImage || '/src/assets/images/logo-hogar-belen.png' },
      { property: 'og:url', content: config.canonical || window.location.href },
      { name: 'twitter:card', content: config.twitterCard || 'summary_large_image' },
      { name: 'twitter:title', content: config.title },
      { name: 'twitter:description', content: config.description },
      { name: 'twitter:image', content: config.ogImage || '/src/assets/images/logo-hogar-belen.png' },
    ]

    metaTags.forEach(({ name, property, content }) => {
      if (!content) return
      
      const attribute = name ? 'name' : 'property'
      const value = name || property
      let element = document.querySelector(`meta[${attribute}="${value}"]`)
      
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, value!)
        document.head.appendChild(element)
      }
      
      element.setAttribute('content', content)
    })

    if (config.canonical) {
      let link = document.querySelector('link[rel="canonical"]')
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', 'canonical')
        document.head.appendChild(link)
      }
      link.setAttribute('href', config.canonical)
    }
  }, [config])
}

export const generateLocalBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'NursingHome',
  '@id': 'https://hogar-belen.com',
  name: 'Hogar Belén',
  alternateName: 'Centro de Vida Hogar Belén',
  description: 'Centro de día y hogar geriátrico especializado en cuidado integral para adultos mayores en Buesaco, Nariño. Ofrecemos servicios profesionales de salud, actividades terapéuticas, nutrición especializada y turismo rural adaptado.',
  url: 'https://hogar-belen.com',
  logo: 'https://hogar-belen.com/logo.png',
  image: [
    'https://hogar-belen.com/images/centro-vida-1.jpg',
    'https://hogar-belen.com/images/actividades-terapeuticas.jpg',
    'https://hogar-belen.com/images/instalaciones-buesaco.jpg'
  ],
  telephone: '+57-XXX-XXX-XXXX',
  email: 'contacto@hogar-belen.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Calle Principal',
    addressLocality: 'Buesaco',
    addressRegion: 'Nariño',
    postalCode: '524040',
    addressCountry: 'CO'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '1.3724',
    longitude: '-77.1551'
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:00',
      closes: '18:00'
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '08:00',
      closes: '14:00'
    }
  ],
  priceRange: '$$',
  areaServed: [
    {
      '@type': 'City',
      name: 'Buesaco',
      containedInPlace: {
        '@type': 'State',
        name: 'Nariño'
      }
    },
    {
      '@type': 'City',
      name: 'Pasto',
      containedInPlace: {
        '@type': 'State',
        name: 'Nariño'
      }
    },
    {
      '@type': 'City',
      name: 'San Lorenzo',
      containedInPlace: {
        '@type': 'State',
        name: 'Nariño'
      }
    }
  ],
  hasMap: 'https://goo.gl/maps/example',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '47'
  },
  sameAs: [
    'https://www.facebook.com/hogar-belen',
    'https://www.instagram.com/hogar_belen'
  ],
  knowsAbout: [
    'Cuidado geriátrico',
    'Terapia ocupacional',
    'Nutrición para adultos mayores',
    'Fisioterapia',
    'Turismo rural adaptado',
    'Centro de día',
    'Atención domiciliaria'
  ],
  makesOffer: [
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Centro de Vida',
        description: 'Servicio de centro de día con actividades terapéuticas, nutrición y cuidado profesional'
      }
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Plan Amigos',
        description: 'Actividades sociales y encuentros grupales para adultos mayores'
      }
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Plan Turismo Rural',
        description: 'Excursiones y turismo rural adaptado con acompañamiento profesional'
      }
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Servicios Profesionales a Domicilio',
        description: 'Enfermería, fisioterapia, terapia ocupacional y más en la comodidad del hogar'
      }
    }
  ]
})

export const generateBreadcrumbSchema = (breadcrumbs: Array<{ label: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbs.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.label,
    item: `https://hogar-belen.com${item.url}`
  }))
})

export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Hogar Belén',
  url: 'https://hogar-belen.com',
  logo: 'https://hogar-belen.com/logo.png',
  description: 'Centro de cuidado integral para adultos mayores en Buesaco, Nariño',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+57-XXX-XXX-XXXX',
      contactType: 'customer service',
      areaServed: 'CO',
      availableLanguage: ['Spanish']
    }
  ],
  foundingDate: '2014',
  founder: {
    '@type': 'Person',
    name: 'María Rodríguez',
    jobTitle: 'Enfermera Geriátrica'
  }
})

export const StructuredData = ({ schema }: { schema: object }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export const pageSEOConfig: Record<string, PageSEO> = {
  home: {
    title: 'Hogar Belén - Centro de Vida y Cuidado Integral para Adultos Mayores en Buesaco, Nariño',
    description: 'Centro de día y hogar geriátrico en Buesaco, Nariño. Cuidado profesional, actividades terapéuticas y turismo rural para adultos mayores. Atención personalizada y familiar.',
    keywords: 'hogar geriátrico Buesaco, centro vida adultos mayores Nariño, cuidado adulto mayor, centro día adulto mayor, atención geriátrica Nariño',
    h1: 'Cuidado Integral para Adultos Mayores en Buesaco, Nariño',
    ogImage: '/images/og-home.jpg',
    canonical: 'https://hogar-belen.com/'
  },
  'centro-vida': {
    title: 'Centro de Vida Hogar Belén - Centro de Día para Adultos Mayores en Buesaco',
    description: 'Centro de día especializado en Buesaco, Nariño. Actividades terapéuticas, nutrición balanceada, terapia de jardín y cuidado profesional para adultos mayores.',
    keywords: 'centro día adulto mayor, centro vida Buesaco, actividades adultos mayores, terapia ocupacional, nutrición geriátrica',
    h1: 'Centro de Vida Hogar Belén: Tu Hogar Durante el Día',
    breadcrumbs: [
      { label: 'Inicio', url: '/' },
      { label: 'Centro de Vida', url: '/centro-vida' }
    ],
    ogImage: '/images/og-centro-vida.jpg',
    canonical: 'https://hogar-belen.com/centro-vida'
  },
  'planes-amigos': {
    title: 'Plan Amigos - Actividades Sociales para Adultos Mayores | Hogar Belén',
    description: 'Plan social para adultos mayores en Nariño. Encuentros, actividades grupales y nuevas amistades en ambiente familiar. Vida activa y conexión social.',
    keywords: 'actividades sociales adulto mayor, club adultos mayores Nariño, integración social, vida activa adultos mayores',
    h1: 'Plan Amigos: Conexión Social y Vida Activa',
    breadcrumbs: [
      { label: 'Inicio', url: '/' },
      { label: 'Planes', url: '/planes' },
      { label: 'Plan Amigos', url: '/planes/amigos' }
    ],
    ogImage: '/images/og-plan-amigos.jpg',
    canonical: 'https://hogar-belen.com/planes/amigos'
  },
  'planes-sol-cafe': {
    title: 'Plan Sol y Café - Tardes de Recreación para Adultos Mayores en Buesaco',
    description: 'Tardes de café, conversación y actividades recreativas para adultos mayores en Buesaco. Ambiente cálido y familiar en Hogar Belén.',
    keywords: 'recreación adulto mayor, café para adultos mayores, actividades vespertinas, entretenimiento adulto mayor',
    h1: 'Plan Sol y Café: Tardes de Bienestar y Conversación',
    breadcrumbs: [
      { label: 'Inicio', url: '/' },
      { label: 'Planes', url: '/planes' },
      { label: 'Plan Sol y Café', url: '/planes/sol-y-cafe' }
    ],
    ogImage: '/images/og-plan-sol-cafe.jpg',
    canonical: 'https://hogar-belen.com/planes/sol-y-cafe'
  },
  'planes-sonreir': {
    title: 'Plan Sonreír - Terapia Recreativa y Emocional para Adultos Mayores',
    description: 'Programa terapéutico centrado en el bienestar emocional de adultos mayores. Risoterapia, musicoterapia y actividades que promueven la felicidad.',
    keywords: 'terapia emocional adulto mayor, bienestar geriátrico, risoterapia, musicoterapia adultos mayores',
    h1: 'Plan Sonreír: Bienestar Emocional y Terapia Recreativa',
    breadcrumbs: [
      { label: 'Inicio', url: '/' },
      { label: 'Planes', url: '/planes' },
      { label: 'Plan Sonreír', url: '/planes/sonreir' }
    ],
    ogImage: '/images/og-plan-sonreir.jpg',
    canonical: 'https://hogar-belen.com/planes/sonreir'
  },
  'planes-turismo-rural': {
    title: 'Turismo Rural para Adultos Mayores en Nariño | Hogar Belén',
    description: 'Excursiones y turismo rural adaptado para adultos mayores en Nariño. Naturaleza, cultura y aventura con acompañamiento profesional.',
    keywords: 'turismo rural adultos mayores, excursiones Nariño adulto mayor, ecoturismo adultos mayores, turismo accesible Nariño',
    h1: 'Plan Turismo Rural: Aventura y Naturaleza en Nariño',
    breadcrumbs: [
      { label: 'Inicio', url: '/' },
      { label: 'Planes', url: '/planes' },
      { label: 'Plan Turismo Rural', url: '/planes/turismo-rural' }
    ],
    ogImage: '/images/og-plan-turismo-rural.jpg',
    canonical: 'https://hogar-belen.com/planes/turismo-rural'
  },
  'servicios-profesionales': {
    title: 'Servicios Profesionales de Salud a Domicilio | Hogar Belén Nariño',
    description: 'Red de profesionales verificados en Nariño: enfermería, fisioterapia, terapia ocupacional, nutrición y más. Servicios de salud a domicilio para adultos mayores.',
    keywords: 'enfermería domicilio Nariño, fisioterapia adultos mayores, profesionales salud Buesaco, servicios geriátricos domicilio',
    h1: 'Servicios Profesionales de Salud a Domicilio',
    breadcrumbs: [
      { label: 'Inicio', url: '/' },
      { label: 'Servicios Profesionales', url: '/servicios-profesionales' }
    ],
    ogImage: '/images/og-servicios-profesionales.jpg',
    canonical: 'https://hogar-belen.com/servicios-profesionales'
  },
  nosotros: {
    title: 'Nosotros - Historia y Equipo de Hogar Belén en Buesaco, Nariño',
    description: 'Conoce la historia de Hogar Belén, nuestro equipo de profesionales certificados y nuestra misión de brindar cuidado digno a adultos mayores en Buesaco.',
    keywords: 'hogar Belén historia, equipo profesional geriátrico Buesaco, centro vida Nariño trayectoria',
    h1: 'Nosotros: 10 Años Cuidando a las Familias de Buesaco',
    breadcrumbs: [
      { label: 'Inicio', url: '/' },
      { label: 'Nosotros', url: '/nosotros' }
    ],
    ogImage: '/images/og-nosotros.jpg',
    canonical: 'https://hogar-belen.com/nosotros'
  },
  precios: {
    title: 'Planes y Precios - Hogar Belén | Centro de Vida en Buesaco, Nariño',
    description: 'Planes de cuidado para adultos mayores en Buesaco: Básico, Premium y Empresarial. Precios transparentes, servicios integrales y atención familiar.',
    keywords: 'precio centro día Nariño, costo cuidado adulto mayor Buesaco, planes hogar geriátrico, tarifas centro vida',
    h1: 'Planes y Precios: Elige el Mejor Cuidado para tu Ser Querido',
    breadcrumbs: [
      { label: 'Inicio', url: '/' },
      { label: 'Planes y Precios', url: '/precios' }
    ],
    ogImage: '/images/og-precios.jpg',
    canonical: 'https://hogar-belen.com/precios'
  },
  contacto: {
    title: 'Contacto - Agenda tu Visita | Hogar Belén Buesaco, Nariño',
    description: 'Contáctanos para agendar una visita guiada, resolver dudas o conocer nuestros servicios. WhatsApp, teléfono y formulario de contacto disponibles.',
    keywords: 'contacto hogar geriátrico Buesaco, agendar visita centro vida, teléfono Hogar Belén',
    h1: 'Contáctanos: Estamos Aquí para Ayudarte',
    breadcrumbs: [
      { label: 'Inicio', url: '/' },
      { label: 'Contacto', url: '/contacto' }
    ],
    ogImage: '/images/og-contacto.jpg',
    canonical: 'https://hogar-belen.com/contacto'
  }
}

export const NAP_INFO = {
  name: 'Hogar Belén',
  address: 'Buesaco, Nariño, Colombia',
  phone: '+57 XXX XXX XXXX',
  whatsapp: '+57 XXX XXX XXXX',
  email: 'contacto@hogar-belen.com'
}
