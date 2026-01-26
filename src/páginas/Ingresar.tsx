import { useSEO } from '../lib/seo-utils'

export default function Ingresar() {
  useSEO({
    title: 'Iniciar Sesión | Hogar Belén',
    description: 'Accede a tu cuenta de Hogar Belén para gestionar servicios, reservas y más.',
    keywords: 'login, ingresar, iniciar sesión, acceder',
    canonical: 'https://hogarbelen.com/ingresar',
    ogImage: '/images/og-login.jpg'
  })

  return (
    <div className="min-h-screen">
      <h1>Iniciar Sesión</h1>
      {/* Page content */}
    </div>
  )
}
