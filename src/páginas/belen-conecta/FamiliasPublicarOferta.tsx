import { PageTemplate } from '../../lib/page-template';

export default function FamiliasPublicarOferta() {
  return (
    <PageTemplate
      title="Publicar Oferta de Trabajo | Belén Conecta Familias"
      description="Publica tu oferta de trabajo para encontrar cuidadores y profesionales de salud para el cuidado de adultos mayores."
      keywords="publicar oferta cuidador, contratar enfermero, buscar profesional salud"
      canonical="https://hogarbelen.com/belen-conecta/familias/publicar-oferta"
      h1="Publicar Oferta de Trabajo"
      content={
        <div className="space-y-6">
          <p>¿Necesitas contratar un cuidador o profesional de salud? Publica tu oferta y recibe aplicaciones de profesionales verificados.</p>
          <div className="border p-6 rounded">
            <h3 className="font-semibold mb-4">Formulario de Publicación</h3>
            <p className="text-gray-600">Formulario próximamente</p>
          </div>
        </div>
      }
    />
  );
}
