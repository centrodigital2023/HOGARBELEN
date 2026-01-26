import { PageTemplate } from '../../lib/page-template';

export default function ServicioCuidadoEnCasa() {
  return (
    <PageTemplate
      title="Servicio de Cuidado en Casa para Adultos Mayores | Hogar Belén"
      description="Cuidado profesional a domicilio en Pasto y Nariño. Cuidadores certificados, enfermería, terapias y acompañamiento en casa las 24 horas."
      keywords="cuidado a domicilio adulto mayor, cuidadores en casa Pasto, servicio domiciliario Nariño"
      canonical="https://hogarbelen.com/servicios/cuidado-en-casa"
      h1="Servicio de Cuidado en Casa"
      content={
        <div className="space-y-6">
          <p className="text-lg">
            Brindamos cuidado profesional en la comodidad del hogar. Nuestro equipo de cuidadores y
            profesionales de la salud visita tu domicilio en Pasto, Buesaco y municipios cercanos.
          </p>
          <h2 className="text-2xl font-semibold mt-8">Servicios a Domicilio</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Cuidadores certificados por horas, turnos o 24/7</li>
            <li>Enfermería domiciliaria</li>
            <li>Fisioterapia y rehabilitación en casa</li>
            <li>Terapia ocupacional</li>
            <li>Acompañamiento a citas médicas</li>
            <li>Asistencia en actividades diarias</li>
          </ul>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <a href="/belen-conecta" className="text-primary font-semibold hover:underline">
              Contrata a través de Belén Conecta →
            </a>
          </div>
        </div>
      }
      schema={{
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Cuidado en Casa para Adultos Mayores",
        "provider": {
          "@type": "Organization",
          "name": "Hogar Belén"
        },
        "areaServed": ["Pasto", "Buesaco", "Nariño"]
      }}
    />
  );
}
