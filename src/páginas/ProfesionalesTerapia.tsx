import { useSEO } from '../lib/seo-utils'

export default function ProfesionalesTerapia() {
  useSEO({
    title: 'Terapeutas Profesionales | Hogar Belén - Terapias Especializadas',
    description: 'Terapeutas especializados en adultos mayores: fisioterapia, terapia ocupacional, lenguaje y más. Rehabilitación y bienestar integral.',
    keywords: 'terapeutas, fisioterapia, terapia ocupacional, rehabilitación',
    canonical: 'https://hogarbelen.com/profesionales/terapia',
    ogImage: '/images/og-terapeutas.jpg'
  })

  return (
    <div className="min-h-screen">
      <h1>Terapeutas Profesionales</h1>
      {/* Page content */}
    </div>
  )
}
