import { PageTemplate } from '../../lib/page-template';

export default function PlanSolYCafeGaleria() {
  return (
    <PageTemplate
      title="Galería Plan Sol y Café | Tardes Inolvidables en Hogar Belén"
      description="Fotos de nuestras tardes de Sol y Café. Momentos de conversación, café y compañía en el mejor ambiente."
      keywords="galería plan sol y café, fotos actividades vespertinas, tardes adultos mayores"
      canonical="https://hogarbelen.com/planes-vida-activa/plan-sol-y-cafe/galeria"
      h1="Galería Plan Sol y Café"
      content={
        <div className="space-y-6">
          <p>Nuestras tardes de Sol y Café están llenas de risas, conversación y buenos momentos. Aquí algunas imágenes.</p>
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
            <a href="/plan-sol-cafe" className="text-primary hover:underline">← Volver al Plan Sol y Café</a>
          </p>
        </div>
      }
    />
  );
}
