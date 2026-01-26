import { PageTemplate } from '../../lib/page-template';

export default function PlanIndividual() {
  return (
    <PageTemplate
      title="Plan Habitación Individual | Centro Vida Hogar Belén Premium"
      description="Habitación privada con todos los servicios incluidos. Mayor privacidad y atención personalizada en Hogar Belén."
      keywords="habitación individual adulto mayor, habitación privada hogar geriátrico, plan premium"
      canonical="https://hogarbelen.com/centro-vida/planes/individual"
      h1="Plan Habitación Individual"
      content={
        <div className="space-y-6">
          <p className="text-lg">
            Nuestro plan de habitación individual ofrece privacidad y comodidad con atención personalizada
            de la más alta calidad.
          </p>

          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Servicios Premium Incluidos</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2">
                <li>✓ Habitación privada amplia</li>
                <li>✓ Baño privado con ducha adaptada</li>
                <li>✓ Cama clínica de última generación</li>
                <li>✓ Armario y closet personal</li>
                <li>✓ TV y conexión WiFi</li>
                <li>✓ Aire acondicionado/calefacción</li>
              </ul>
              <ul className="space-y-2">
                <li>✓ 3 comidas + 2 meriendas personalizadas</li>
                <li>✓ Atención médica preferencial</li>
                <li>✓ Enfermería dedicada 24/7</li>
                <li>✓ Actividades terapéuticas premium</li>
                <li>✓ Servicio de lavandería express</li>
                <li>✓ Visitas sin restricción de horario</li>
              </ul>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Ventajas del Plan Individual</h3>
            <ul className="space-y-2">
              <li><strong>Privacidad Total:</strong> Espacio personal exclusivo</li>
              <li><strong>Atención Personalizada:</strong> Plan de cuidado individualizado</li>
              <li><strong>Mayor Confort:</strong> Decoración personalizable</li>
              <li><strong>Tranquilidad:</strong> Ambiente silencioso y privado</li>
              <li><strong>Flexibilidad:</strong> Horarios y rutinas adaptables</li>
            </ul>
          </div>

          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Servicios Adicionales Disponibles</h3>
            <ul className="space-y-1">
              <li>• Terapias especializadas (fisioterapia, ocupacional)</li>
              <li>• Acompañamiento para salidas y citas médicas</li>
              <li>• Peluquería y servicios de estética</li>
              <li>• Transporte privado</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <p className="text-lg mb-4">¿Te gustaría conocer la habitación?</p>
            <a href="/centro-vida/agenda-visita" className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition">
              Agendar Visita
            </a>
          </div>
        </div>
      }
    />
  );
}
