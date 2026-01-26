import { useSEO } from '../lib/seo-utils'

export default function PlanSolYCafeGaleria() {
  useSEO({
    title: 'Galería Plan Sol y Café | Hogar Belén - Experiencias y Momentos',
    description: 'Explora la galería del Plan Sol y Café: imágenes de actividades, encuentros y momentos especiales de nuestros participantes.',
    keywords: 'galería sol y café, fotos plan, imágenes actividades',
    canonical: 'https://hogarbelen.com/planes-vida-activa/plan-sol-y-cafe/galeria',
    ogImage: '/images/og-plan-sol-cafe-galeria.jpg'
  })

  return (
    <div className="min-h-screen">
      <h1>Galería Plan Sol y Café</h1>
      {/* Page content */}
    </div>
  )
}
