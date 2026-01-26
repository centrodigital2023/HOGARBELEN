import { useSEO } from '../lib/seo-utils'

export default function LoQueNosHaceUnicos() {
  useSEO({
    title: 'Lo Que Nos Hace Únicos | Hogar Belén - Diferencia y Excelencia',
    description: 'Descubre los valores, servicios y atención personalizada que hacen de Hogar Belén un lugar único para el cuidado de adultos mayores.',
    keywords: 'únicos, diferenciadores, valores, excelencia, cuidado especial',
    canonical: 'https://hogarbelen.com/lo-que-nos-hace-unicos',
    ogImage: '/images/og-unicos.jpg'
  })

  return (
    <div className="min-h-screen">
      <h1>Lo Que Nos Hace Únicos</h1>
      {/* Page content */}
    </div>
  )
}
