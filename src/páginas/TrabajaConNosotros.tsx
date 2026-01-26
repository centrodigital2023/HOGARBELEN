import { useSEO } from '../lib/seo-utils'

export default function TrabajaConNosotros() {
  useSEO({
    title: 'Trabaja con Nosotros | Hogar Belén - Únete a Nuestro Equipo',
    description: 'Forma parte del equipo de Hogar Belén. Oportunidades laborales para profesionales comprometidos con el cuidado de adultos mayores.',
    keywords: 'trabaja con nosotros, empleo, vacantes, únete al equipo, carreras',
    canonical: 'https://hogarbelen.com/trabaja-con-nosotros',
    ogImage: '/images/og-trabaja-con-nosotros.jpg'
  })

  return (
    <div className="min-h-screen">
      <h1>Trabaja con Nosotros</h1>
      {/* Page content */}
    </div>
  )
}
