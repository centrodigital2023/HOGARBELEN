import { PageTemplate } from '../../lib/page-template';

export default function CentroVidaInstalaciones() {
  return (
    <PageTemplate
      title="Instalaciones del Centro Vida Hogar Belén | Tours Virtuales"
      description="Conoce nuestras instalaciones: habitaciones, áreas comunes, jardines terapéuticos y espacios de recreación. Agenda tu visita presencial."
      keywords="instalaciones hogar geriátrico, habitaciones adulto mayor, áreas comunes Buesaco"
      canonical="https://hogarbelen.com/centro-vida/instalaciones"
      h1="Nuestras Instalaciones"
      content={
        <div className="space-y-6">
          <p>
            En Hogar Belén hemos diseñado cada espacio pensando en la comodidad, seguridad y bienestar de
            nuestros residentes.
          </p>
          <h2 className="text-2xl font-semibold mt-8">Espacios Principales</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold">🛏️ Habitaciones</h3>
              <p>Habitaciones individuales y compartidas con baño privado, amplias ventanas con vista natural y mobiliario adaptado.</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold">🏥 Área Médica</h3>
              <p>Consultorio médico equipado, enfermería 24/7 y sala de terapias con equipamiento moderno.</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold">🍽️ Comedor y Cocina</h3>
              <p>Comedor amplio con ambiente familiar y cocina con estándares de nutrición geriátrica.</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold">🌳 Jardines Terapéuticos</h3>
              <p>Áreas verdes con caminos seguros, zonas de descanso y huerto terapéutico.</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold">🎨 Salas de Actividades</h3>
              <p>Espacios para talleres, terapia ocupacional, musicoterapia y actividades recreativas.</p>
            </div>
          </div>

          <p className="text-center mt-8 p-4 bg-blue-50 rounded-lg">
            <strong>¿Quieres conocer nuestras instalaciones en persona?</strong><br />
            <a href="/centro-vida/agenda-visita" className="text-primary hover:underline font-semibold">
              Agenda una visita guiada →
            </a>
          </p>
        </div>
      }
    />
  );
}
