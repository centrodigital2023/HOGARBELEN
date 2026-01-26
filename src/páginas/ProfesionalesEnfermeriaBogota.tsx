import { useSEO } from '../lib/seo-utils'

export default function ProfesionalesEnfermeriaBogota() {
  useSEO({
    title: 'Enfermeros en Bogotá | Hogar Belén - Enfermería a Domicilio',
    description: 'Enfermeros profesionales especializados en cuidado de adultos mayores en Bogotá. Atención de enfermería calificada a domicilio.',
    keywords: 'enfermeros bogotá, enfermería bogotá, cuidado domicilio bogotá',
    canonical: 'https://hogarbelen.com/profesionales/enfermeria/bogota',
    ogImage: '/images/og-enfermeros-bogota.jpg'
  })

  return (
    <div className="min-h-screen">
      <h1>Enfermeros en Bogotá</h1>
      {/* Page content */}
    </div>
  )
}
