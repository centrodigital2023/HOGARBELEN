/**
 * Schema.org structured data utilities for SEO
 * Provides JSON-LD schemas for LocalBusiness, MedicalBusiness, and Person
 */

interface LocalBusinessSchema {
  '@context': string
  '@type': string
  '@id'?: string
  name: string
  alternateName?: string
  description: string
  url: string
  logo: string
  image: string[]
  telephone: string
  email: string
  address: {
    '@type': string
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  geo: {
    '@type': string
    latitude: string
    longitude: string
  }
  openingHoursSpecification?: Array<{
    '@type': string
    dayOfWeek: string | string[]
    opens: string
    closes: string
  }>
  priceRange?: string
  areaServed?: Array<{
    '@type': string
    name: string
    containedInPlace?: {
      '@type': string
      name: string
    }
  }>
  sameAs?: string[]
  aggregateRating?: {
    '@type': string
    ratingValue: string
    reviewCount: string
  }
  makesOffer?: Array<{
    '@type': string
    itemOffered: {
      '@type': string
      name: string
      description: string
    }
  }>
}

interface ProfessionalPersonSchema {
  '@context': string
  '@type': string
  name: string
  jobTitle: string
  description: string
  url: string
  image?: string
  telephone?: string
  email?: string
  address: {
    '@type': string
    addressLocality: string
    addressRegion: string
    addressCountry: string
  }
  worksFor?: {
    '@type': string
    name: string
    url: string
  }
  knowsAbout?: string[]
  hasCredential?: Array<{
    '@type': string
    name: string
    credentialCategory: string
  }>
}

/**
 * Generates LocalBusiness schema for Hogar Belén main site
 * Use on homepage and main service pages
 */
export function generateLocalBusinessSchema(): LocalBusinessSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'NursingHome',
    '@id': 'https://hogarbelen.com',
    name: 'Hogar Belén',
    alternateName: 'Centro de Vida Hogar Belén',
    description: 'Centro de cuidado integral para adultos mayores en Buesaco, Nariño. Servicios profesionales de salud, actividades terapéuticas, nutrición especializada y turismo rural adaptado.',
    url: 'https://hogarbelen.com',
    logo: 'https://hogarbelen.com/logo.png',
    image: [
      'https://hogarbelen.com/images/centro-vida.jpg',
      'https://hogarbelen.com/images/actividades.jpg',
      'https://hogarbelen.com/images/instalaciones.jpg'
    ],
    telephone: '+57 321 570 8655',
    email: 'hogarbelen2022@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Buesaco',
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
      }
    ],
    sameAs: [
      'https://www.facebook.com/hogarbelen',
      'https://www.instagram.com/hogar_belen'
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '47'
    },
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Centro de Vida',
          description: 'Servicio de centro de día con actividades terapéuticas y cuidado profesional'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Cuidado Residencial',
          description: 'Atención residencial permanente con equipo médico especializado'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Servicios a Domicilio',
          description: 'Enfermería, fisioterapia y cuidado personalizado en el hogar'
        }
      }
    ]
  }
}

/**
 * Generates MedicalBusiness schema for healthcare services
 * Use on professional services pages
 */
export function generateMedicalBusinessSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: 'Hogar Belén - Servicios Médicos',
    description: 'Servicios médicos y de enfermería especializados para adultos mayores',
    url: 'https://hogarbelen.com/servicios',
    telephone: '+57 321 570 8655',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Buesaco',
      addressRegion: 'Nariño',
      addressCountry: 'CO'
    },
    medicalSpecialty: [
      'Geriatría',
      'Enfermería Geriátrica',
      'Fisioterapia',
      'Terapia Ocupacional',
      'Nutrición Clínica'
    ]
  }
}

/**
 * Generates Person schema for professional profiles
 * Use on individual professional pages
 */
export function generateProfessionalSchema(professional: {
  name: string
  jobTitle: string
  description: string
  city: string
  category: string
  slug: string
  image?: string
  credentials?: string[]
}): ProfessionalPersonSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: professional.name,
    jobTitle: professional.jobTitle,
    description: professional.description,
    url: `https://hogarbelen.com/profesional/${professional.slug}`,
    image: professional.image,
    address: {
      '@type': 'PostalAddress',
      addressLocality: professional.city,
      addressRegion: 'Colombia',
      addressCountry: 'CO'
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Hogar Belén',
      url: 'https://hogarbelen.com'
    },
    knowsAbout: [professional.category, 'Cuidado de adultos mayores', 'Atención geriátrica'],
    hasCredential: professional.credentials?.map(credential => ({
      '@type': 'EducationalOccupationalCredential',
      name: credential,
      credentialCategory: 'Professional Certification'
    }))
  }
}

/**
 * Generates Organization schema
 * Use on about page and main pages
 */
export function generateOrganizationSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Hogar Belén',
    url: 'https://hogarbelen.com',
    logo: 'https://hogarbelen.com/logo.png',
    description: 'Centro de cuidado integral para adultos mayores en Buesaco, Nariño',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+57 321 570 8655',
        contactType: 'customer service',
        areaServed: 'CO',
        availableLanguage: ['Spanish']
      }
    ],
    sameAs: [
      'https://www.facebook.com/hogarbelen',
      'https://www.instagram.com/hogar_belen'
    ]
  }
}

/**
 * Generates BreadcrumbList schema
 * Use on all pages with breadcrumb navigation
 */
export function generateBreadcrumbSchema(breadcrumbs: Array<{ label: string; url: string }>): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `https://hogarbelen.com${item.url}`
    }))
  }
}

/**
 * Generates Service schema for specific services
 */
export function generateServiceSchema(service: {
  name: string
  description: string
  url: string
  serviceType: string
  areaServed?: string
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    serviceType: service.serviceType,
    url: service.url,
    provider: {
      '@type': 'Organization',
      name: 'Hogar Belén',
      url: 'https://hogarbelen.com'
    },
    areaServed: service.areaServed || 'Nariño, Colombia'
  }
}

/**
 * React component to inject structured data into page head
 */
export function StructuredDataScript({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
