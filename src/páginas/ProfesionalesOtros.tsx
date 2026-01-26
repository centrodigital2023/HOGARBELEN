import { useSEO } from '../lib/seo-utils'

export default function ProfesionalesOtros() {
  useSEO({
    title: 'Otros Profesionales | Hogar Belén - Servicios Complementarios',
    description: 'Encuentra otros profesionales relacionados con el cuidado de adultos mayores: nutricionistas, psicólogos, trabajadores sociales y más.',
    keywords: 'otros profesionales, nutricionistas, psicólogos, servicios complementarios',
    canonical: 'https://hogarbelen.com/profesionales/otros',
    ogImage: '/images/og-otros-profesionales.jpg'
  })

  return (
    <div className="min-h-screen">
      <h1>Otros Profesionales</h1>
      {/* Page content */}
    </div>
  )
}
