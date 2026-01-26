import { useSEO } from '../lib/seo-utils'

export default function ProfesionalesMedicos() {
  useSEO({
    title: 'Médicos Especialistas | Hogar Belén - Atención Geriátrica',
    description: 'Médicos especialistas en geriatría y atención de adultos mayores. Consultas, seguimiento y cuidado médico integral.',
    keywords: 'médicos, geriatras, médicos especialistas, atención geriátrica',
    canonical: 'https://hogarbelen.com/profesionales/medicos',
    ogImage: '/images/og-medicos.jpg'
  })

  return (
    <div className="min-h-screen">
      <h1>Médicos Especialistas</h1>
      {/* Page content */}
    </div>
  )
}
