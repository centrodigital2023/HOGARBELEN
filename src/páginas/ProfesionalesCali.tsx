import { useSEO } from '../lib/seo-utils'

export default function ProfesionalesCali() {
  useSEO({
    title: 'Profesionales en Cali | Hogar Belén - Cuidado de Adultos Mayores',
    description: 'Encuentra profesionales de cuidado de adultos mayores en Cali: enfermeros, cuidadores, terapeutas disponibles en tu zona.',
    keywords: 'profesionales cali, cuidadores cali, enfermeros cali',
    canonical: 'https://hogarbelen.com/profesionales/cali',
    ogImage: '/images/og-profesionales-cali.jpg'
  })

  return (
    <div className="min-h-screen">
      <h1>Profesionales en Cali</h1>
      {/* Page content */}
    </div>
  )
}
