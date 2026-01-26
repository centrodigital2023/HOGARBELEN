import { useSEO } from '../lib/seo-utils'

export default function ProfesionalesCuidadores() {
  useSEO({
    title: 'Cuidadores Profesionales | Hogar Belén - Acompañamiento Especializado',
    description: 'Encuentra cuidadores profesionales capacitados en atención de adultos mayores. Servicio personalizado con experiencia y vocación.',
    keywords: 'cuidadores, cuidadores profesionales, acompañamiento, cuidado adultos',
    canonical: 'https://hogarbelen.com/profesionales/cuidadores',
    ogImage: '/images/og-cuidadores.jpg'
  })

  return (
    <div className="min-h-screen">
      <h1>Cuidadores Profesionales</h1>
      {/* Page content */}
    </div>
  )
}
