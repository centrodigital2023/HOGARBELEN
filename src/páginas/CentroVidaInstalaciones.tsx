import { useSEO } from '../lib/seo-utils'

export default function CentroVidaInstalaciones() {
  useSEO({
    title: 'Instalaciones Centro Vida | Hogar Belén - Tour Virtual',
    description: 'Conoce nuestras instalaciones del Centro Vida: salas de terapia, espacios recreativos, comedores y jardines diseñados para el bienestar.',
    keywords: 'instalaciones centro vida, tour virtual, espacios, infraestructura',
    canonical: 'https://hogarbelen.com/centro-vida/instalaciones',
    ogImage: '/images/og-instalaciones.jpg'
  })

  return (
    <div className="min-h-screen">
      <h1>Instalaciones Centro Vida</h1>
      {/* Page content */}
    </div>
  )
}
