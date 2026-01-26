import { PageTemplate } from '../../lib/page-template';

export default function ServicioVidaActiva() {
  return (
    <PageTemplate
      title="Programas de Vida Activa para Adultos Mayores | Hogar Belén"
      description="Actividades recreativas, terapéuticas y sociales para adultos mayores en Nariño. Mantén a tus seres queridos activos y felices."
      keywords="vida activa adulto mayor, actividades recreativas, terapia ocupacional, programas adultos mayores"
      canonical="https://hogarbelen.com/servicios/vida-activa"
      h1="Programas de Vida Activa"
      content={
        <div className="space-y-6">
          <p className="text-lg">
            Promovemos la vida activa y el bienestar integral a través de actividades diseñadas
            específicamente para adultos mayores.
          </p>
          <h2 className="text-2xl font-semibold mt-8">Actividades y Programas</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Actividades Físicas</h3>
              <ul className="list-disc pl-6">
                <li>Gimnasia suave</li>
                <li>Caminatas guiadas</li>
                <li>Ejercicios de equilibrio</li>
                <li>Yoga para mayores</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Actividades Cognitivas</h3>
              <ul className="list-disc pl-6">
                <li>Talleres de memoria</li>
                <li>Juegos de mesa</li>
                <li>Lectura y conversación</li>
                <li>Estimulación cognitiva</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Actividades Creativas</h3>
              <ul className="list-disc pl-6">
                <li>Pintura y manualidades</li>
                <li>Musicoterapia</li>
                <li>Huerto terapéutico</li>
                <li>Cocina recreativa</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Actividades Sociales</h3>
              <ul className="list-disc pl-6">
                <li>Celebraciones y fiestas</li>
                <li>Excursiones</li>
                <li>Cine y entretenimiento</li>
                <li>Tertulias y café</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <a href="/planes-vida-activa" className="text-primary font-semibold hover:underline">
              Ver todos nuestros planes →
            </a>
          </div>
        </div>
      }
    />
  );
}
