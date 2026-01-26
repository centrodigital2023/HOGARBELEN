import { PageTemplate } from '../../lib/page-template';

export default function ServicioAtencionMedica() {
  return (
    <PageTemplate
      title="Atención Médica Especializada para Adultos Mayores | Hogar Belén"
      description="Servicios médicos geriátricos: consultas, enfermería, control de medicamentos, seguimiento de enfermedades crónicas en Buesaco y Pasto."
      keywords="atención médica adulto mayor, geriatría Nariño, enfermería geriátrica, control médico"
      canonical="https://hogarbelen.com/servicios/atencion-medica"
      h1="Atención Médica Especializada"
      content={
        <div className="space-y-6">
          <p className="text-lg">
            Contamos con equipo médico especializado en geriatría para el cuidado integral de la salud de
            adultos mayores.
          </p>
          <h2 className="text-2xl font-semibold mt-8">Servicios Médicos</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Consultas médicas geriátricas</li>
            <li>Enfermería profesional 24/7</li>
            <li>Control y administración de medicamentos</li>
            <li>Seguimiento de enfermedades crónicas</li>
            <li>Curaciones y procedimientos básicos</li>
            <li>Medición de signos vitales</li>
            <li>Coordinación con médicos especialistas</li>
            <li>Historial clínico digital</li>
          </ul>
          <h2 className="text-2xl font-semibold mt-8">Disponibilidad</h2>
          <p>
            Nuestros servicios médicos están disponibles tanto en el Centro Vida (residentes) como a
            domicilio (servicio externo) en Pasto y municipios cercanos.
          </p>
        </div>
      }
    />
  );
}
