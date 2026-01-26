import { PageTemplate } from '../../lib/page-template';

export default function FamiliasBuscarProfesionales() {
  return (
    <PageTemplate
      title="Buscar Profesionales de Salud Verificados | Belén Conecta"
      description="Encuentra cuidadores, enfermeros, fisioterapeutas y más profesionales verificados para el cuidado de adultos mayores en Nariño."
      keywords="buscar cuidadores verificados, contratar enfermero Nariño, profesionales salud adulto mayor"
      canonical="https://hogarbelen.com/belen-conecta/familias/buscar-profesionales"
      h1="Buscar Profesionales Verificados"
      content={
        <div className="space-y-6">
          <p>Encuentra el profesional ideal para el cuidado de tu ser querido. Todos nuestros profesionales están verificados y certificados.</p>
          <div className="border p-4 rounded">
            <p className="text-center text-gray-600">Buscador de profesionales próximamente</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="border p-4 rounded">
              <h3 className="font-semibold mb-2">Cuidadores</h3>
              <p className="text-sm">Profesionales especializados en cuidado diario</p>
            </div>
            <div className="border p-4 rounded">
              <h3 className="font-semibold mb-2">Enfermeros</h3>
              <p className="text-sm">Atención médica profesional</p>
            </div>
            <div className="border p-4 rounded">
              <h3 className="font-semibold mb-2">Terapeutas</h3>
              <p className="text-sm">Fisioterapia y terapia ocupacional</p>
            </div>
          </div>
        </div>
      }
    />
  );
}
