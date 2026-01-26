import { useSEO } from '../lib/seo-utils'

export default function CentroVidaPlanesIndividual() {
  useSEO({
    title: 'Habitación Individual | Centro Vida Hogar Belén - Privacidad y Armonía',
    description: 'Plan de habitación individual en nuestro Centro Vida: máxima privacidad, atención personalizada y servicios completos. $1.950.000/mes todo incluido.',
    keywords: 'habitación individual, plan privado, centro vida individual, precio',
    canonical: 'https://hogarbelen.com/centro-vida/planes/individual',
    ogImage: '/images/og-plan-individual.jpg'
  })

  return (
    <div className="min-h-screen">
      <h1>Plan Privacidad y Armonía - Habitación Individual</h1>
      {/* Page content */}
    </div>
  )
}
