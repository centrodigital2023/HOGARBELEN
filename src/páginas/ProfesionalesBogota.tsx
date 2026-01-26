import { useSEO } from '../lib/seo-utils'

export default function ProfesionalesBogota() {
  useSEO({
    title: 'Profesionales en Bogotá | Hogar Belén - Cuidado de Adultos Mayores',
    description: 'Encuentra profesionales de cuidado de adultos mayores en Bogotá: enfermeros, cuidadores, terapeutas disponibles en tu zona.',
    keywords: 'profesionales bogotá, cuidadores bogotá, enfermeros bogotá',
    canonical: 'https://hogarbelen.com/profesionales/bogota',
    ogImage: '/images/og-profesionales-bogota.jpg'
  })

  return (
    <div className="min-h-screen">
      <h1>Profesionales en Bogotá</h1>
      {/* Page content */}
    </div>
  )
}
