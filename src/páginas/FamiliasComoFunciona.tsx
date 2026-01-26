import { useSEO } from '../lib/seo-utils'

export default function FamiliasComoFunciona() {
  useSEO({
    title: 'Cómo Funciona para Familias | Belén Conecta - Guía Paso a Paso',
    description: 'Aprende cómo usar Belén Conecta para encontrar profesionales de cuidado: registro, búsqueda, contacto y contratación.',
    keywords: 'cómo funciona, guía familias, usar plataforma, paso a paso',
    canonical: 'https://hogarbelen.com/belen-conecta/familias/como-funciona',
    ogImage: '/images/og-como-funciona-familias.jpg'
  })

  return (
    <div className="min-h-screen">
      <h1>Cómo Funciona para Familias</h1>
      {/* Page content */}
    </div>
  )
}
