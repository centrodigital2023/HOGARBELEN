import { PageTemplate } from '../../lib/page-template';

export default function ServicioCuidadoResidencial() {
  return (
    <PageTemplate
      title="Cuidado Residencial 24/7 para Adultos Mayores | Hogar Belén"
      description="Servicio de cuidado residencial permanente en Buesaco. Atención integral, médica y personalizada para adultos mayores las 24 horas."
      keywords="cuidado residencial adulto mayor, hogar permanente, atención 24/7, residencia geriátrica"
      canonical="https://hogarbelen.com/servicios/cuidado-residencial"
      h1="Servicio de Cuidado Residencial"
      content={
        <div className="space-y-6">
          <p className="text-lg">
            Ofrecemos cuidado residencial permanente con atención integral las 24 horas en nuestro Centro
            Vida en Buesaco, Nariño.
          </p>
          <h2 className="text-2xl font-semibold mt-8">Qué Incluye</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Habitación individual o compartida</li>
            <li>Alimentación balanceada (3 comidas + 2 meriendas)</li>
            <li>Atención médica y enfermería permanente</li>
            <li>Actividades terapéuticas diarias</li>
            <li>Terapias de rehabilitación</li>
            <li>Recreación y socialización</li>
            <li>Lavandería y limpieza</li>
            <li>Comunicación constante con familias</li>
          </ul>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <a href="/centro-vida/planes" className="text-primary font-semibold hover:underline">
              Ver planes y precios →
            </a>
          </div>
        </div>
      }
    />
  );
}
