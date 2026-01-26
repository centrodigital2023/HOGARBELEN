import { useSEO } from '../lib/seo-utils'

export default function ProfesionalesMedellin() {
  useSEO({
    title: 'Profesionales en Medellín | Hogar Belén - Cuidado de Adultos Mayores',
    description: 'Encuentra profesionales de cuidado de adultos mayores en Medellín: enfermeros, cuidadores, terapeutas disponibles en tu zona.',
    keywords: 'profesionales medellín, cuidadores medellín, enfermeros medellín',
    canonical: 'https://hogarbelen.com/profesionales/medellin',
    ogImage: '/images/og-profesionales-medellin.jpg'
  })

  return (
    <div className="min-h-screen">
      <h1>Profesionales en Medellín</h1>
      {/* Page content */}
    </div>
  )
}
