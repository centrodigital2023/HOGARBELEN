import { useSEO } from '../lib/seo-utils'

export default function Nosotros() {
  useSEO({
    title: 'Nosotros - Hogar Belén | Cuidado y Amor para Adultos Mayores',
    description: 'Conoce nuestra historia, misión y valores. Hogar Belén es un espacio de cuidado, dignidad y acompañamiento para adultos mayores en Colombia.',
    keywords: 'nosotros hogar belén, historia, misión, valores, cuidado adultos mayores',
    canonical: 'https://hogarbelen.com/nosotros',
    ogImage: '/images/og-nosotros.jpg'
  })

  return (
    <div className="min-h-screen">
      <h1>Nosotros - Hogar Belén</h1>
      {/* Page content */}
    </div>
  )
}
