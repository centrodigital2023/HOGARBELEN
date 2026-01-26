import { PageTemplate } from '../../lib/page-template';

export default function ModoVacacionesPermanentes() {
  return (
    <PageTemplate
      title="Modo Vacaciones Permanentes: Bienestar y Felicidad | Hogar Belén"
      description="En Hogar Belén, cada día se vive como unas vacaciones. Actividades, naturaleza y compañía en un ambiente de paz y alegría para adultos mayores."
      keywords="vida activa adulto mayor, actividades recreativas, bienestar integral, felicidad tercera edad"
      canonical="https://hogarbelen.com/modo-vacaciones-permanentes"
      h1="Modo Vacaciones Permanentes"
      content={
        <div className="space-y-6">
          <p>
            Imagina un lugar donde cada amanecer trae nuevas experiencias, donde la rutina se transforma en
            aventura y el cuidado se siente como estar de vacaciones permanentemente.
          </p>
          <h2 className="text-2xl font-semibold mt-8">Una Vida Plena Cada Día</h2>
          <p>
            En Hogar Belén creemos que la tercera edad debe vivirse con plenitud. Por eso diseñamos cada día
            como una experiencia enriquecedora:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Excursiones a lugares naturales de Nariño</li>
            <li>Talleres de arte, música y cultura</li>
            <li>Gastronomía variada y saludable</li>
            <li>Espacios de socialización y nuevas amistades</li>
            <li>Conexión con la naturaleza y zooterapia</li>
          </ul>
        </div>
      }
    />
  );
}
