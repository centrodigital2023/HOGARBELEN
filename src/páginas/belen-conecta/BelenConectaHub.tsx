import { PageTemplate } from '../../lib/page-template';

export default function BelenConectaHub() {
  return (
    <PageTemplate
      title="Belén Conecta | Plataforma de Cuidado y Profesionales de Salud"
      description="Conecta con profesionales verificados o encuentra oportunidades laborales en cuidado de adultos mayores en Nariño. Plataforma Belén Conecta."
      keywords="Belén Conecta, plataforma cuidadores, profesionales salud Nariño, empleo cuidado adulto mayor"
      canonical="https://hogarbelen.com/belen-conecta"
      h1="Belén Conecta: Conectando Familias con Profesionales"
      content={
        <div className="space-y-8">
          <p className="text-lg">
            Belén Conecta es nuestra plataforma digital que conecta a familias que necesitan servicios de
            cuidado con profesionales certificados y verificados.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6 hover:shadow-lg transition">
              <h2 className="text-2xl font-bold mb-4">Para Familias</h2>
              <p className="mb-4">Encuentra profesionales de salud y cuidado verificados para tus seres queridos.</p>
              <ul className="space-y-2 mb-4">
                <li>✓ Perfiles verificados</li>
                <li>✓ Experiencia comprobada</li>
                <li>✓ Contratación segura</li>
                <li>✓ Soporte continuo</li>
              </ul>
              <a href="/belen-conecta/familias" className="text-primary hover:underline font-semibold">
                Buscar profesionales →
              </a>
            </div>

            <div className="border rounded-lg p-6 hover:shadow-lg transition">
              <h2 className="text-2xl font-bold mb-4">Para Profesionales</h2>
              <p className="mb-4">Encuentra oportunidades laborales en el sector de cuidado de adultos mayores.</p>
              <ul className="space-y-2 mb-4">
                <li>✓ Ofertas reales</li>
                <li>✓ Pagos garantizados</li>
                <li>✓ Capacitación continua</li>
                <li>✓ Comunidad profesional</li>
              </ul>
              <a href="/belen-conecta/profesionales" className="text-primary hover:underline font-semibold">
                Ver ofertas laborales →
              </a>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-3">¿Eres nuevo en Belén Conecta?</h3>
            <div className="flex gap-4 justify-center">
              <a href="/ingresar" className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90">
                Ingresar
              </a>
              <a href="/registrarse" className="border border-primary text-primary px-6 py-2 rounded hover:bg-primary/10">
                Registrarse
              </a>
            </div>
          </div>
        </div>
      }
      schema={{
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Belén Conecta",
        "applicationCategory": "HealthApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "COP"
        }
      }}
    />
  );
}
