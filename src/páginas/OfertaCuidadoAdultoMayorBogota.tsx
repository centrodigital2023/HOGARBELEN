import { useSEO } from '../lib/seo-utils'

export default function OfertaCuidadoAdultoMayorBogota() {
  useSEO({
    title: 'Oferta: Cuidado Adulto Mayor Bogotá | Hogar Belén',
    description: 'Oferta de trabajo para cuidado de adulto mayor en Bogotá. Únete a nuestro equipo y marca la diferencia en la vida de nuestros mayores.',
    keywords: 'oferta cuidado bogotá, trabajo cuidador bogotá, empleo adulto mayor',
    canonical: 'https://hogarbelen.com/ofertas/cuidado-adulto-mayor-bogota',
    ogImage: '/images/og-oferta-bogota.jpg'
  })

  return (
    <div className="min-h-screen">
      <h1>Oferta: Cuidado Adulto Mayor en Bogotá</h1>
      {/* Page content */}
    </div>
  )
}
