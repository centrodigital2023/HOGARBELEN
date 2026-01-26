import { useSEO } from '../lib/seo-utils'

export default function ProfesionalesEnfermeria() {
  useSEO({
    title: 'Enfermeros Profesionales | Hogar Belén - Cuidado de Enfermería',
    description: 'Encuentra enfermeros profesionales especializados en cuidado de adultos mayores. Atención médica calificada a domicilio y en instituciones.',
    keywords: 'enfermeros, enfermería, profesionales enfermería, cuidado médico',
    canonical: 'https://hogarbelen.com/profesionales/enfermeria',
    ogImage: '/images/og-enfermeros.jpg'
  })

  return (
    <div className="min-h-screen">
      <h1>Profesionales de Enfermería</h1>
      {/* Page content */}
    </div>
  )
}
