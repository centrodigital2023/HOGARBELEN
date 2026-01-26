import { useSEO } from '../lib/seo-utils'

export default function ProfesionalesBeneficios() {
  useSEO({
    title: 'Beneficios para Profesionales | Belén Conecta - Ventajas de Unirte',
    description: 'Descubre los beneficios de ser parte de Belén Conecta: acceso a ofertas laborales, capacitación, comunidad y respaldo profesional.',
    keywords: 'beneficios profesionales, ventajas, por qué unirse, capacitación',
    canonical: 'https://hogarbelen.com/belen-conecta/profesionales/beneficios',
    ogImage: '/images/og-beneficios-profesionales.jpg'
  })

  return (
    <div className="min-h-screen">
      <h1>Beneficios para Profesionales</h1>
      {/* Page content */}
    </div>
  )
}
