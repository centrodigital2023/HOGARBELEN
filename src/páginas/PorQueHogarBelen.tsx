import { useSEO } from '../lib/seo-utils'

export default function PorQueHogarBelen() {
  useSEO({
    title: '¿Por Qué Hogar Belén? | La Mejor Opción en Cuidado de Adultos Mayores',
    description: 'Conoce las razones que hacen de Hogar Belén la mejor opción para el cuidado de tu ser querido: experiencia, amor, profesionalismo y dedicación.',
    keywords: 'por qué hogar belén, ventajas, diferencias, mejor opción cuidado',
    canonical: 'https://hogarbelen.com/por-que-hogar-belen',
    ogImage: '/images/og-por-que.jpg'
  })

  return (
    <div className="min-h-screen">
      <h1>¿Por Qué Hogar Belén?</h1>
      {/* Page content */}
    </div>
  )
}
