import { useSEO } from '../lib/seo-utils'

export default function ServicioAtencionMedica() {
  useSEO({
    title: 'Atención Médica | Hogar Belén - Cuidado de Salud Integral',
    description: 'Servicios de atención médica especializada para adultos mayores: control médico, enfermería, terapias y seguimiento personalizado.',
    keywords: 'atención médica, servicios médicos, control salud, enfermería, geriatría',
    canonical: 'https://hogarbelen.com/servicios/atencion-medica',
    ogImage: '/images/og-atencion-medica.jpg'
  })

  return (
    <div className="min-h-screen">
      <h1>Servicio de Atención Médica</h1>
      {/* Page content */}
    </div>
  )
}
