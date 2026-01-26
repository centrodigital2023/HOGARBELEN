import { useSEO } from '../lib/seo-utils'

export default function Planes() {
  useSEO({
    title: 'Planes de Cuidado | Hogar Belén - Soluciones para Cada Necesidad',
    description: 'Descubre nuestros planes de cuidado residencial, centro vida y vida activa. Opciones flexibles diseñadas para el bienestar de tu ser querido.',
    keywords: 'planes hogar belén, planes cuidado, planes residenciales, centro vida, vida activa',
    canonical: 'https://hogarbelen.com/planes',
    ogImage: '/images/og-planes.jpg'
  })

  return (
    <div className="min-h-screen">
      <h1>Planes de Cuidado - Hogar Belén</h1>
      {/* Page content */}
    </div>
  )
}
