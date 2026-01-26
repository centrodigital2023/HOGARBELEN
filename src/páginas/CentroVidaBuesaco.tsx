import { useSEO } from '../lib/seo-utils'

export default function CentroVidaBuesaco() {
  useSEO({
    title: 'Centro Vida en Buesaco, Nariño | Hogar Belén - Cuidado Diurno',
    description: 'Nuestro Centro Vida en Buesaco ofrece cuidado diurno profesional, actividades terapéuticas y acompañamiento para adultos mayores en Nariño.',
    keywords: 'centro vida buesaco, cuidado diurno nariño, hogar día, adultos mayores buesaco',
    canonical: 'https://hogarbelen.com/centro-vida/buesaco',
    ogImage: '/images/og-centro-vida-buesaco.jpg'
  })

  return (
    <div className="min-h-screen">
      <h1>Centro Vida Buesaco</h1>
      {/* Page content */}
    </div>
  )
}
