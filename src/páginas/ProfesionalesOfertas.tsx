import { useSEO } from '../lib/seo-utils'

export default function ProfesionalesOfertas() {
  useSEO({
    title: 'Ofertas de Trabajo | Belén Conecta - Oportunidades para Profesionales',
    description: 'Explora ofertas de trabajo disponibles en cuidado de adultos mayores. Encuentra tu próxima oportunidad laboral.',
    keywords: 'ofertas trabajo, empleos cuidado, oportunidades, trabajos disponibles',
    canonical: 'https://hogarbelen.com/belen-conecta/profesionales/ofertas',
    ogImage: '/images/og-ofertas-profesionales.jpg'
  })

  return (
    <div className="min-h-screen">
      <h1>Ofertas de Trabajo para Profesionales</h1>
      {/* Page content */}
    </div>
  )
}
