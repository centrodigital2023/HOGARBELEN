import { useSEO } from '../lib/seo-utils'

export default function FamiliasBuscarProfesionales() {
  useSEO({
    title: 'Buscar Profesionales | Belén Conecta - Encuentra Cuidadores y Enfermeros',
    description: 'Busca profesionales verificados para el cuidado de adultos mayores: enfermeros, cuidadores, terapeutas y más en tu ciudad.',
    keywords: 'buscar profesionales, cuidadores, enfermeros, contratar, belén conecta',
    canonical: 'https://hogarbelen.com/belen-conecta/familias/buscar-profesionales',
    ogImage: '/images/og-buscar-profesionales.jpg'
  })

  return (
    <div className="min-h-screen">
      <h1>Buscar Profesionales</h1>
      {/* Page content */}
    </div>
  )
}
