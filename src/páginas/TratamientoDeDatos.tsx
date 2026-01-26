import { useSEO } from '../lib/seo-utils'

export default function TratamientoDeDatos() {
  useSEO({
    title: 'Tratamiento de Datos Personales | Hogar Belén - Protección de Datos',
    description: 'Conoce cómo Hogar Belén protege y gestiona tus datos personales de acuerdo con la legislación colombiana de protección de datos.',
    keywords: 'tratamiento datos, protección datos, habeas data, privacidad datos',
    canonical: 'https://hogarbelen.com/tratamiento-de-datos',
    ogImage: '/images/og-datos.jpg'
  })

  return (
    <div className="min-h-screen">
      <h1>Tratamiento de Datos Personales</h1>
      {/* Page content */}
    </div>
  )
}
