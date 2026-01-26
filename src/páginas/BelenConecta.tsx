import { useSEO } from '../lib/seo-utils'

export default function BelenConecta() {
  useSEO({
    title: 'Belén Conecta | Plataforma que Conecta Familias y Profesionales',
    description: 'Encuentra profesionales especializados en cuidado de adultos mayores o registra tu perfil profesional. La comunidad de cuidado que conecta.',
    keywords: 'belén conecta, profesionales cuidado, cuidadores, enfermería, plataforma empleo',
    canonical: 'https://hogarbelen.com/belen-conecta',
    ogImage: '/images/og-belen-conecta.jpg'
  })

  return (
    <div className="min-h-screen">
      <h1>Belén Conecta</h1>
      {/* Page content */}
    </div>
  )
}
