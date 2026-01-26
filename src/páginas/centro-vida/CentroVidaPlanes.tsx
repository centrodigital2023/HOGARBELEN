import { PageTemplate } from '../../lib/page-template';

export default function CentroVidaPlanes() {
  return (
    <PageTemplate
      title="Planes de Centro Vida | Opciones de Cuidado en Hogar Belén"
      description="Conoce nuestros planes de Centro Vida: habitación compartida e individual. Servicios incluidos, precios y modalidades flexibles."
      keywords="planes centro vida, precios hogar geriátrico Buesaco, modalidades cuidado adulto mayor"
      canonical="https://hogarbelen.com/centro-vida/planes"
      h1="Planes de Centro Vida"
      content={
        <div className="space-y-6">
          <p>
            Ofrecemos diferentes modalidades para adaptarnos a las necesidades de cada familia:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="border rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-4">Habitación Compartida</h3>
              <p className="text-gray-600 mb-4">
                Ideal para adultos mayores que disfrutan de la compañía y socialización.
              </p>
              <ul className="space-y-2 mb-6">
                <li>✓ Habitación doble con baño privado</li>
                <li>✓ Todas las comidas incluidas</li>
                <li>✓ Actividades terapéuticas</li>
                <li>✓ Atención médica y enfermería</li>
                <li>✓ Lavandería de ropa</li>
              </ul>
              <a href="/centro-vida/planes/compartida" className="text-primary hover:underline font-semibold">
                Ver detalles →
              </a>
            </div>

            <div className="border rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-4">Habitación Individual</h3>
              <p className="text-gray-600 mb-4">
                Mayor privacidad con todos los servicios incluidos.
              </p>
              <ul className="space-y-2 mb-6">
                <li>✓ Habitación privada con baño</li>
                <li>✓ Todas las comidas incluidas</li>
                <li>✓ Actividades terapéuticas</li>
                <li>✓ Atención médica y enfermería</li>
                <li>✓ Lavandería de ropa</li>
                <li>✓ Atención personalizada premium</li>
              </ul>
              <a href="/centro-vida/planes/individual" className="text-primary hover:underline font-semibold">
                Ver detalles →
              </a>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Modalidades Disponibles</h3>
            <ul className="space-y-2">
              <li><strong>Centro de Día:</strong> Lunes a viernes de 7am a 6pm</li>
              <li><strong>Media Pensión:</strong> Incluye desayuno y almuerzo</li>
              <li><strong>Pensión Completa:</strong> 24/7 con todas las comidas</li>
              <li><strong>Estadía Temporal:</strong> Por semanas o meses</li>
            </ul>
          </div>
        </div>
      }
    />
  );
}
