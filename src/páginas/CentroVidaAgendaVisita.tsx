import { useSEO } from '../lib/seo-utils'

export default function CentroVidaAgendaVisita() {
  useSEO({
    title: 'Agenda tu Visita | Centro Vida Hogar Belén - Conoce Nuestras Instalaciones',
    description: 'Agenda una visita sin compromiso a nuestro Centro Vida. Te mostraremos las instalaciones, servicios y responderemos todas tus preguntas.',
    keywords: 'agenda visita, tour, conocer instalaciones, visita guiada',
    canonical: 'https://hogarbelen.com/centro-vida/agenda-visita',
    ogImage: '/images/og-agenda-visita.jpg'
  })

  return (
    <div className="min-h-screen">
      <h1>Agenda tu Visita</h1>
      {/* Page content */}
    </div>
  )
}
