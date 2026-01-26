import { useSEO } from '../lib/seo-utils'

export default function ServicioVidaActiva() {
  useSEO({
    title: 'Vida Activa | Hogar Belén - Programas de Actividades y Bienestar',
    description: 'Programas de vida activa: actividades recreativas, terapias ocupacionales, ejercicio adaptado y socialización para adultos mayores.',
    keywords: 'vida activa, actividades recreativas, terapia ocupacional, ejercicio',
    canonical: 'https://hogarbelen.com/servicios/vida-activa',
    ogImage: '/images/og-vida-activa.jpg'
  })

  return (
    <div className="min-h-screen">
      <h1>Servicio Vida Activa</h1>
      {/* Page content */}
    </div>
  )
}
