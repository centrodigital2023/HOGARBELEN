import { PageTemplate } from '../../lib/page-template';

export default function CentroVidaBuesaco() {
  return (
    <PageTemplate
      title="Centro Vida Hogar Belén en Buesaco, Nariño | Instalaciones y Servicios"
      description="Visita nuestro Centro Vida en Buesaco, Nariño. Instalaciones modernas, equipo profesional y un entorno natural ideal para el bienestar de adultos mayores."
      keywords="centro vida Buesaco, hogar geriátrico Buesaco Nariño, instalaciones adulto mayor"
      canonical="https://hogarbelen.com/centro-vida/buesaco"
      h1="Centro Vida Hogar Belén - Sede Buesaco"
      content={
        <div className="space-y-6">
          <p>
            Nuestra sede principal en Buesaco, Nariño, está diseñada para ofrecer el mejor ambiente de
            cuidado y bienestar para adultos mayores.
          </p>
          <h2 className="text-2xl font-semibold mt-8">Ubicación Privilegiada</h2>
          <p>
            Buesaco es conocido por su clima templado, aire puro y paisajes montañosos. Nuestro centro está
            ubicado en una zona tranquila con fácil acceso desde Pasto y municipios cercanos.
          </p>
          <h2 className="text-2xl font-semibold mt-8">Servicios en Nuestra Sede</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Centro de día con actividades terapéuticas</li>
            <li>Atención médica y enfermería permanente</li>
            <li>Servicios de fisioterapia y rehabilitación</li>
            <li>Alimentación balanceada y personalizada</li>
            <li>Áreas verdes y espacios de recreación</li>
            <li>Transporte desde Pasto y municipios cercanos</li>
          </ul>
        </div>
      }
      schema={{
        "@context": "https://schema.org",
        "@type": "MedicalBusiness",
        "name": "Centro Vida Hogar Belén - Buesaco",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Buesaco",
          "addressRegion": "Nariño",
          "addressCountry": "CO"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "1.3724",
          "longitude": "-77.1551"
        }
      }}
    />
  );
}
