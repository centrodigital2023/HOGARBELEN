import { useSEO } from '../lib/seo-utils'

export default function Registrarse() {
  useSEO({
    title: 'Crear Cuenta | Hogar Belén - Únete a Nuestra Comunidad',
    description: 'Crea tu cuenta en Hogar Belén para acceder a nuestros servicios y beneficios exclusivos.',
    keywords: 'registro, crear cuenta, registrarse, sign up',
    canonical: 'https://hogarbelen.com/registrarse',
    ogImage: '/images/og-registro.jpg'
  })

  return (
    <div className="min-h-screen">
      <h1>Crear Cuenta</h1>
      {/* Page content */}
    </div>
  )
}
