import { useSEO } from '../lib/seo-utils'

export default function CentroVidaPlanes() {
  useSEO({
    title: 'Planes Centro Vida | Hogar Belén - Opciones Flexibles',
    description: 'Descubre nuestros planes de Centro Vida: habitaciones compartidas e individuales con servicios completos y atención profesional 24/7.',
    keywords: 'planes centro vida, precios centro día, habitaciones, tarifas',
    canonical: 'https://hogarbelen.com/centro-vida/planes',
    ogImage: '/images/og-planes-centro-vida.jpg'
  })

  return (
    <div className="min-h-screen">
      <h1>Planes Centro Vida</h1>
      {/* Page content */}
    </div>
  )
}
