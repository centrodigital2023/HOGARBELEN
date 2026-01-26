# Ejemplos de Schema.org JSON-LD

Ejemplos de structured data para implementar en las páginas de Hogar Belén.

## 1. LocalBusiness / MedicalBusiness (Página Principal)

```json
{
  "@context": "https://schema.org",
  "@type": "NursingHome",
  "@id": "https://hogarbelen.com",
  "name": "Hogar Belén",
  "alternateName": "Centro de Vida Hogar Belén",
  "description": "Centro de día y hogar geriátrico especializado en cuidado integral para adultos mayores en Buesaco, Nariño. Ofrecemos servicios profesionales de salud, actividades terapéuticas, nutrición especializada y turismo rural adaptado.",
  "url": "https://hogarbelen.com",
  "logo": "https://hogarbelen.com/logo.png",
  "image": [
    "https://hogarbelen.com/images/centro-vida-1.jpg",
    "https://hogarbelen.com/images/actividades-terapeuticas.jpg",
    "https://hogarbelen.com/images/instalaciones-buesaco.jpg"
  ],
  "telephone": "+57-321-570-8655",
  "email": "hogarbelen2022@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Vereda Santa Ana",
    "addressLocality": "Buesaco",
    "addressRegion": "Nariño",
    "postalCode": "524040",
    "addressCountry": "CO"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "1.3724",
    "longitude": "-77.1551"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "07:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "08:00",
      "closes": "14:00"
    }
  ],
  "priceRange": "$$",
  "areaServed": [
    {
      "@type": "City",
      "name": "Buesaco",
      "containedInPlace": {
        "@type": "State",
        "name": "Nariño"
      }
    },
    {
      "@type": "City",
      "name": "Pasto",
      "containedInPlace": {
        "@type": "State",
        "name": "Nariño"
      }
    },
    {
      "@type": "City",
      "name": "San Lorenzo",
      "containedInPlace": {
        "@type": "State",
        "name": "Nariño"
      }
    }
  ],
  "hasMap": "https://goo.gl/maps/ejemplo",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "48",
    "bestRating": "5",
    "worstRating": "1"
  },
  "sameAs": [
    "https://www.facebook.com/hogarbelen",
    "https://www.instagram.com/hogar_belen",
    "https://www.linkedin.com/company/hogar-belen"
  ],
  "knowsAbout": [
    "Cuidado geriátrico",
    "Terapia ocupacional",
    "Nutrición para adultos mayores",
    "Fisioterapia",
    "Turismo rural adaptado",
    "Centro de día",
    "Atención domiciliaria",
    "Enfermería geriátrica"
  ],
  "makesOffer": [
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Centro de Vida",
        "description": "Servicio de centro de día con actividades terapéuticas, nutrición y cuidado profesional"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Cuidado Residencial 24/7",
        "description": "Servicio de cuidado residencial permanente con atención integral"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Cuidado en Casa",
        "description": "Servicios profesionales de salud y cuidado a domicilio"
      }
    }
  ]
}
```

## 2. Professional / Person (Perfil de Profesional)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "María Rodríguez García",
  "jobTitle": "Enfermera Geriátrica Certificada",
  "url": "https://hogarbelen.com/profesional/maria-rodriguez-enfermera-pasto",
  "image": "https://hogarbelen.com/profesionales/maria-rodriguez.jpg",
  "email": "maria.rodriguez@ejemplo.com",
  "telephone": "+57-XXX-XXX-XXXX",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Pasto",
    "addressRegion": "Nariño",
    "addressCountry": "CO"
  },
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "Universidad de Nariño"
  },
  "hasCredential": [
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Degree",
      "name": "Enfermería Profesional"
    },
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Certification",
      "name": "Especialización en Enfermería Geriátrica"
    }
  ],
  "hasOccupation": {
    "@type": "Occupation",
    "name": "Enfermera Geriátrica",
    "occupationLocation": {
      "@type": "City",
      "name": "Pasto"
    },
    "estimatedSalary": {
      "@type": "MonetaryAmountDistribution",
      "currency": "COP",
      "duration": "PT1H"
    },
    "experienceRequirements": {
      "@type": "OccupationalExperienceRequirements",
      "monthsOfExperience": 60
    }
  },
  "knowsAbout": [
    "Cuidado geriátrico",
    "Administración de medicamentos",
    "Primeros auxilios",
    "Atención de enfermedades crónicas",
    "Cuidados paliativos"
  ],
  "knowsLanguage": [
    {
      "@type": "Language",
      "name": "Español"
    }
  ],
  "memberOf": {
    "@type": "Organization",
    "name": "Hogar Belén - Belén Conecta"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "12",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": [
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Ana Martínez"
      },
      "reviewBody": "Excelente profesional, muy dedicada y cariñosa con mi madre.",
      "datePublished": "2025-12-15"
    }
  ]
}
```

## 3. Service (Página de Servicio Específico)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Cuidado en Casa para Adultos Mayores",
  "name": "Servicio de Cuidado en Casa",
  "description": "Cuidado profesional a domicilio para adultos mayores en Pasto y Nariño. Cuidadores certificados, enfermería, terapias y acompañamiento en casa las 24 horas.",
  "provider": {
    "@type": "Organization",
    "name": "Hogar Belén",
    "url": "https://hogarbelen.com",
    "logo": "https://hogarbelen.com/logo.png",
    "telephone": "+57-321-570-8655",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Buesaco",
      "addressRegion": "Nariño",
      "addressCountry": "CO"
    }
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Pasto"
    },
    {
      "@type": "City",
      "name": "Buesaco"
    },
    {
      "@type": "State",
      "name": "Nariño"
    }
  ],
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceUrl": "https://hogarbelen.com/servicios/cuidado-en-casa",
    "servicePhone": {
      "@type": "ContactPoint",
      "telephone": "+57-321-570-8655",
      "contactType": "customer service"
    }
  },
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "COP",
    "lowPrice": "50000",
    "highPrice": "150000",
    "offerCount": "3",
    "priceSpecification": [
      {
        "@type": "PriceSpecification",
        "name": "Turno de 4 horas",
        "price": "50000",
        "priceCurrency": "COP"
      },
      {
        "@type": "PriceSpecification",
        "name": "Turno de 12 horas",
        "price": "100000",
        "priceCurrency": "COP"
      },
      {
        "@type": "PriceSpecification",
        "name": "Cuidado 24/7",
        "price": "150000",
        "priceCurrency": "COP"
      }
    ]
  },
  "category": "Healthcare",
  "audience": {
    "@type": "Audience",
    "audienceType": "Adultos mayores y sus familias"
  }
}
```

## 4. Organization (Página Nosotros)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Hogar Belén",
  "url": "https://hogarbelen.com",
  "logo": "https://hogarbelen.com/logo.png",
  "description": "Centro de cuidado integral para adultos mayores en Buesaco, Nariño. Más de 5 años brindando servicios de calidad con calidez humana.",
  "foundingDate": "2019",
  "founder": {
    "@type": "Person",
    "name": "Fundadores Hogar Belén"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Vereda Santa Ana",
    "addressLocality": "Buesaco",
    "addressRegion": "Nariño",
    "postalCode": "524040",
    "addressCountry": "CO"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+57-321-570-8655",
      "contactType": "customer service",
      "areaServed": "CO",
      "availableLanguage": ["Spanish"]
    },
    {
      "@type": "ContactPoint",
      "email": "hogarbelen2022@gmail.com",
      "contactType": "customer service",
      "areaServed": "CO"
    }
  ],
  "sameAs": [
    "https://www.facebook.com/hogarbelen",
    "https://www.instagram.com/hogar_belen"
  ],
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "value": 15
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "48"
  }
}
```

## 5. BreadcrumbList (Navegación)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Inicio",
      "item": "https://hogarbelen.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Centro Vida",
      "item": "https://hogarbelen.com/centro-vida"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Planes",
      "item": "https://hogarbelen.com/centro-vida/planes"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Plan Individual",
      "item": "https://hogarbelen.com/centro-vida/planes/individual"
    }
  ]
}
```

## 6. WebApplication (Belén Conecta)

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Belén Conecta",
  "url": "https://hogarbelen.com/belen-conecta",
  "description": "Plataforma digital que conecta a familias que necesitan servicios de cuidado con profesionales certificados y verificados",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "COP"
  },
  "featureList": [
    "Búsqueda de profesionales verificados",
    "Publicación de ofertas laborales",
    "Gestión de perfiles profesionales",
    "Sistema de calificaciones",
    "Comunicación directa",
    "Pagos seguros"
  ],
  "provider": {
    "@type": "Organization",
    "name": "Hogar Belén"
  }
}
```

## 7. ItemList (Listado de Profesionales)

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Cuidadores Certificados en Pasto",
  "description": "Listado de cuidadores profesionales certificados disponibles en Pasto, Nariño",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "url": "https://hogarbelen.com/profesional/juan-perez-cuidador-pasto",
      "name": "Juan Pérez - Cuidador Certificado"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "url": "https://hogarbelen.com/profesional/ana-gomez-cuidador-pasto",
      "name": "Ana Gómez - Cuidadora Certificada"
    }
  ],
  "numberOfItems": 2
}
```

## Cómo Implementar

### En un Componente React:

```tsx
import { SEOHead } from '../components/SEOHead';

export default function MiPagina() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Mi Servicio",
    // ... resto del schema
  };

  return (
    <>
      <SEOHead
        title="Mi Página | Hogar Belén"
        description="Descripción optimizada"
        schema={schema}
      />
      {/* Contenido */}
    </>
  );
}
```

### Directamente en HTML:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Hogar Belén"
}
</script>
```

## Validación

Usa estas herramientas para validar tu Schema.org:

1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Schema.org Validator**: https://validator.schema.org/
3. **Google Search Console**: Sección "Mejoras"

## Referencias

- [Schema.org Documentation](https://schema.org/)
- [Google Structured Data Guidelines](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- [JSON-LD Playground](https://json-ld.org/playground/)
