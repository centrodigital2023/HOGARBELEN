import { useSEO } from '../lib/seo-utils'

export default function ProfesionalesPasto() {
  useSEO({
    title: 'Profesionales en Pasto | Hogar Belén - Cuidado de Adultos Mayores',
    description: 'Encuentra profesionales de cuidado de adultos mayores en Pasto: enfermeros, cuidadores, terapeutas disponibles en tu zona.',
    keywords: 'profesionales pasto, cuidadores pasto, enfermeros pasto',
    canonical: 'https://hogarbelen.com/profesionales/pasto',
    ogImage: '/images/og-profesionales-pasto.jpg'
  })

  return (
    <div className="min-h-screen">
      <h1>Profesionales en Pasto</h1>
      {/* Page content */}
    </div>
  )
}
