import { PageTemplate } from '../../lib/page-template';

export default function LoQueNosHaceUnicos() {
  return (
    <PageTemplate
      title="Lo Que Nos Hace Únicos | Hogar Belén Centro de Vida"
      description="Descubre los factores diferenciales que hacen de Hogar Belén el mejor centro de cuidado para adultos mayores en Nariño. Pasión, profesionalismo y amor en cada detalle."
      keywords="centro vida único, diferenciadores Hogar Belén, mejor cuidado adulto mayor Nariño"
      canonical="https://hogarbelen.com/lo-que-nos-hace-unicos"
      h1="Lo Que Nos Hace Únicos"
      content={
        <div className="space-y-6">
          <p>
            Hogar Belén se distingue por su enfoque integral que combina atención médica profesional con
            calidez humana y conexión con la naturaleza.
          </p>
          <h2 className="text-2xl font-semibold mt-8">Nuestras Fortalezas</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold">🏔️ Entorno Natural Privilegiado</h3>
              <p>Ubicados en Buesaco con clima templado, aire puro y vistas espectaculares</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">👨‍⚕️ Equipo Multidisciplinario Certificado</h3>
              <p>Médicos, enfermeros, terapeutas y cuidadores con experiencia en geriatría</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">🎨 Programas de Vida Activa</h3>
              <p>Actividades terapéuticas, recreativas y culturales diseñadas por expertos</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">🏡 Ambiente Familiar</h3>
              <p>Instalaciones cálidas donde cada residente se siente como en casa</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">📱 Tecnología y Comunicación</h3>
              <p>Plataforma Belén Conecta para familias siempre informadas</p>
            </div>
          </div>
        </div>
      }
    />
  );
}
