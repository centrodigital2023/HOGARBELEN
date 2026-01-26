import { useSEO } from '../lib/seo-utils'

export default function CentroVidaPlanesCompartida() {
  useSEO({
    title: 'Habitación Compartida | Centro Vida Hogar Belén - Convivir y Florecer',
    description: 'Plan de habitación compartida en nuestro Centro Vida: atención 24/7, nutrición completa, terapias y actividades. $1.700.000/mes todo incluido.',
    keywords: 'habitación compartida, plan convivir, centro vida compartido, precio',
    canonical: 'https://hogarbelen.com/centro-vida/planes/compartida',
    ogImage: '/images/og-plan-compartida.jpg'
  })

  return (
    <div className="min-h-screen">
      <h1>Plan Convivir y Florecer - Habitación Compartida</h1>
      {/* Page content */}
    </div>
  )
}
