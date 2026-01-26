import { useSEO } from '../lib/seo-utils'

export default function ProfesionalesRegistro() {
  useSEO({
    title: 'Registro Profesionales | Belén Conecta - Únete a Nuestra Red',
    description: 'Regístrate como profesional en Belén Conecta y accede a oportunidades laborales en cuidado de adultos mayores. Proceso gratuito y simple.',
    keywords: 'registro profesionales, registrarse, trabajar cuidado, empleo',
    canonical: 'https://hogarbelen.com/belen-conecta/profesionales/registro',
    ogImage: '/images/og-registro-profesionales.jpg'
  })

  return (
    <div className="min-h-screen">
      <h1>Registro de Profesionales</h1>
      {/* Page content */}
    </div>
  )
}
