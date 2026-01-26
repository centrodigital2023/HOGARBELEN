import { useSEO } from '../lib/seo-utils'

export default function Ofertas() {
  useSEO({
    title: 'Ofertas de Trabajo | Hogar Belén - Oportunidades Laborales',
    description: 'Explora todas las ofertas de trabajo disponibles en cuidado de adultos mayores. Encuentra tu próxima oportunidad profesional.',
    keywords: 'ofertas trabajo, empleos, oportunidades laborales, trabajar',
    canonical: 'https://hogarbelen.com/ofertas',
    ogImage: '/images/og-ofertas.jpg'
  })

  return (
    <div className="min-h-screen">
      <h1>Ofertas de Trabajo</h1>
      {/* Page content */}
    </div>
  )
}
