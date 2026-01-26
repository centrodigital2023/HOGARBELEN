import { useSEO } from '../lib/seo-utils'

export default function Testimonios() {
  useSEO({
    title: 'Testimonios | Hogar Belén - Experiencias Reales de Nuestras Familias',
    description: 'Lee las historias y testimonios de familias que han confiado en Hogar Belén para el cuidado de sus seres queridos.',
    keywords: 'testimonios, opiniones, reseñas, experiencias, familias satisfechas',
    canonical: 'https://hogarbelen.com/testimonios',
    ogImage: '/images/og-testimonios.jpg'
  })

  return (
    <div className="min-h-screen">
      <h1>Testimonios</h1>
      {/* Page content */}
    </div>
  )
}
