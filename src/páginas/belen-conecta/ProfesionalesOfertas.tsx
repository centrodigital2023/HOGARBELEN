import { PageTemplate } from '../../lib/page-template';

export default function ProfesionalesOfertas() {
  return (
    <PageTemplate
      title="Ofertas Laborales para Profesionales de Salud | Belén Conecta"
      description="Ofertas de trabajo verificadas para cuidadores, enfermeros y profesionales de salud en Nariño."
      keywords="ofertas trabajo cuidador, empleo enfermero Nariño, vacantes salud"
      canonical="https://hogarbelen.com/belen-conecta/profesionales/ofertas"
      h1="Ofertas Laborales Disponibles"
      content={<div><p>Listado de ofertas próximamente. <a href="/ofertas" className="text-primary">Ver todas las ofertas →</a></p></div>}
    />
  );
}
