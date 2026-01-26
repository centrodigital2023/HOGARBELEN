import { useSEO } from '../lib/seo-utils'

export default function ModoVacacionesPermanentes() {
  useSEO({
    title: 'Modo Vacaciones Permanentes | Hogar Belén - Vive Cada Día con Plenitud',
    description: 'Descubre cómo en Hogar Belén cada día se vive como unas vacaciones: tranquilidad, actividades, naturaleza y compañía en un ambiente excepcional.',
    keywords: 'modo vacaciones, vacaciones permanentes, estilo de vida, bienestar diario',
    canonical: 'https://hogarbelen.com/modo-vacaciones-permanentes',
    ogImage: '/images/og-vacaciones.jpg'
  })

  return (
    <div className="min-h-screen">
      <h1>Modo Vacaciones Permanentes</h1>
      {/* Page content */}
    </div>
  )
}
