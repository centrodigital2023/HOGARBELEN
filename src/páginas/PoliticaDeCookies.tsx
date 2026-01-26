import { useSEO } from '../lib/seo-utils'

export default function PoliticaDeCookies() {
  useSEO({
    title: 'Política de Cookies | Hogar Belén',
    description: 'Información sobre el uso de cookies en nuestro sitio web. Conoce qué cookies utilizamos y cómo gestionarlas.',
    keywords: 'política cookies, cookies, privacidad, uso cookies',
    canonical: 'https://hogarbelen.com/politica-de-cookies',
    ogImage: '/images/og-cookies.jpg'
  })

  return (
    <div className="min-h-screen">
      <h1>Política de Cookies</h1>
      {/* Page content */}
    </div>
  )
}
