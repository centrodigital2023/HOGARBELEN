import { PageTemplate } from '../lib/page-template';

export default function TrabajaConNosotros() {
  return (
    <PageTemplate
      title="Trabaja con Nosotros | Hogar Belén - Únete a Nuestro Equipo"
      description="Únete al equipo de Hogar Belén. Buscamos profesionales comprometidos con el cuidado de adultos mayores en Nariño."
      keywords="trabajar Hogar Belén, empleo hogar geriátrico, vacantes cuidado adulto mayor"
      canonical="https://hogarbelen.com/trabaja-con-nosotros"
      h1="Trabaja con Nosotros"
      content={
        <div className="space-y-6">
          <p>En Hogar Belén valoramos el talento humano. Si te apasiona el cuidado de adultos mayores, queremos conocerte.</p>
          <h2 className="text-2xl font-semibold">Perfiles que Buscamos</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Enfermeros y auxiliares de enfermería</li>
            <li>Cuidadores certificados</li>
            <li>Fisioterapeutas</li>
            <li>Terapeutas ocupacionales</li>
            <li>Nutricionistas</li>
            <li>Personal administrativo</li>
          </ul>
          <p>Envía tu hoja de vida a: <a href="mailto:hogarbelen2022@gmail.com" className="text-primary">hogarbelen2022@gmail.com</a></p>
        </div>
      }
    />
  );
}
