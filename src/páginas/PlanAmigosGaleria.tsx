import { useSEO } from '../lib/seo-utils'

export default function PlanAmigosGaleria() {
  useSEO({
    title: 'Galería Plan Amigos | Hogar Belén - Momentos Compartidos',
    description: 'Conoce a través de imágenes las experiencias y momentos especiales del Plan Amigos: encuentros sociales, actividades y compañía.',
    keywords: 'galería plan amigos, fotos actividades, imágenes encuentros',
    canonical: 'https://hogarbelen.com/planes-vida-activa/plan-amigos/galeria',
    ogImage: '/images/og-plan-amigos-galeria.jpg'
  })

  return (
    <div className="min-h-screen">
      <h1>Galería Plan Amigos</h1>
      {/* Page content */}
    </div>
  )
}
