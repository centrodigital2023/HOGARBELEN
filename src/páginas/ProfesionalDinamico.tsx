import { useSEO } from '../lib/seo-utils'
import { useParams } from 'react-router-dom'

export default function ProfesionalDinamico() {
  const { slug } = useParams<{ slug: string }>()
  
  useSEO({
    title: `Perfil Profesional | Hogar Belén`,
    description: 'Conoce el perfil de este profesional especializado en cuidado de adultos mayores.',
    keywords: 'perfil profesional, cuidador, enfermero, profesional',
    canonical: `https://hogarbelen.com/profesional/${slug}`,
    ogImage: '/images/og-profesional.jpg'
  })

  return (
    <div className="min-h-screen">
      <h1>Perfil Profesional</h1>
      {/* Page content */}
    </div>
  )
}
