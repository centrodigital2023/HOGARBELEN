import { useSEO } from '../lib/seo-utils'

export default function LugarSonado() {
  useSEO({
    title: 'El Lugar Soñado para Adultos Mayores | Hogar Belén',
    description: 'Descubre el hogar perfecto donde tu ser querido vivirá con dignidad, amor y cuidado profesional en un ambiente cálido y familiar.',
    keywords: 'lugar soñado, hogar ideal, residencia adultos mayores, cuidado digno',
    canonical: 'https://hogarbelen.com/lugar-sonado',
    ogImage: '/images/og-lugar-sonado.jpg'
  })

  return (
    <div className="min-h-screen">
      <h1>El Lugar Soñado</h1>
      {/* Page content */}
    </div>
  )
}
