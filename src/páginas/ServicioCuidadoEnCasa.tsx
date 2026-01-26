import { useSEO } from '../lib/seo-utils'

export default function ServicioCuidadoEnCasa() {
  useSEO({
    title: 'Cuidado en Casa | Hogar Belén - Atención Profesional a Domicilio',
    description: 'Servicio de cuidado profesional en casa para adultos mayores. Enfermería, cuidadores y terapias en la comodidad de tu hogar.',
    keywords: 'cuidado en casa, atención domiciliaria, enfermería domicilio, cuidadores hogar',
    canonical: 'https://hogarbelen.com/servicios/cuidado-en-casa',
    ogImage: '/images/og-cuidado-casa.jpg'
  })

  return (
    <div className="min-h-screen">
      <h1>Servicio de Cuidado en Casa</h1>
      {/* Page content */}
    </div>
  )
}
