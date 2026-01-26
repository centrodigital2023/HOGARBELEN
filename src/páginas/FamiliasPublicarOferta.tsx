import { useSEO } from '../lib/seo-utils'

export default function FamiliasPublicarOferta() {
  useSEO({
    title: 'Publicar Oferta de Trabajo | Belén Conecta - Encuentra tu Cuidador Ideal',
    description: 'Publica tu oferta de trabajo para encontrar al profesional perfecto para el cuidado de tu ser querido. Proceso simple y rápido.',
    keywords: 'publicar oferta, buscar cuidador, contratar, oferta trabajo',
    canonical: 'https://hogarbelen.com/belen-conecta/familias/publicar-oferta',
    ogImage: '/images/og-publicar-oferta.jpg'
  })

  return (
    <div className="min-h-screen">
      <h1>Publicar Oferta de Trabajo</h1>
      {/* Page content */}
    </div>
  )
}
