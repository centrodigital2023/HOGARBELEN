import { PageTemplate } from '../../lib/page-template';

export default function PlanAmigosGaleria() {
  return (
    <PageTemplate
      title="Galería Plan Amigos | Momentos Especiales de Nuestros Residentes"
      description="Fotos y videos de las actividades del Plan Amigos de Hogar Belén. Paseos, encuentros y momentos felices de nuestros adultos mayores."
      keywords="galería plan amigos, fotos actividades adultos mayores, momentos Hogar Belén"
      canonical="https://hogarbelen.com/planes-vida-activa/plan-amigos/galeria"
      h1="Galería Plan Amigos"
      content={
        <div className="space-y-6">
          <p>Revive los mejores momentos del Plan Amigos. Aquí compartimos fotos y videos de nuestras actividades sociales y paseos.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-gray-200 h-48 rounded flex items-center justify-center">
              <span className="text-gray-500">Foto próximamente</span>
            </div>
            <div className="bg-gray-200 h-48 rounded flex items-center justify-center">
              <span className="text-gray-500">Foto próximamente</span>
            </div>
            <div className="bg-gray-200 h-48 rounded flex items-center justify-center">
              <span className="text-gray-500">Foto próximamente</span>
            </div>
          </div>
          <p className="text-center mt-6">
            <a href="/plan-amigos" className="text-primary hover:underline">← Volver al Plan Amigos</a>
          </p>
        </div>
      }
    />
  );
}
