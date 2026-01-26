import { PageTemplate } from '../lib/page-template';

export default function Ofertas() {
  return (
    <PageTemplate
      title="Ofertas de Trabajo en Cuidado de Adultos Mayores | Hogar Belén"
      description="Ofertas de empleo para cuidadores, enfermeros y profesionales de salud en Nariño. Únete al equipo de Hogar Belén."
      keywords="ofertas trabajo cuidador, empleo enfermero Nariño, trabajo adultos mayores"
      canonical="https://hogarbelen.com/ofertas"
      h1="Ofertas de Trabajo"
      content={<div><p>Listado de ofertas laborales en cuidado de adultos mayores próximamente.</p></div>}
    />
  );
}
