import { PageTemplate } from '../../lib/page-template';

export default function PlanCompartida() {
  return (
    <PageTemplate
      title="Plan Habitación Compartida | Centro Vida Hogar Belén"
      description="Conoce nuestro plan de habitación compartida: servicios incluidos, actividades y precios. Ideal para adultos mayores que disfrutan la compañía."
      keywords="habitación compartida adulto mayor, plan compartido hogar geriátrico, precio habitación doble"
      canonical="https://hogarbelen.com/centro-vida/planes/compartida"
      h1="Plan Habitación Compartida"
      content={
        <div className="space-y-6">
          <p className="text-lg">
            Nuestra opción de habitación compartida es ideal para adultos mayores que valoran la compañía y
            disfrutan de socializar con otros residentes.
          </p>

          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Servicios Incluidos</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2">
                <li>✓ Habitación compartida (máximo 2 personas)</li>
                <li>✓ Baño privado con adaptaciones</li>
                <li>✓ Cama clínica ajustable</li>
                <li>✓ Armario personal con cerradura</li>
                <li>✓ Llamado de enfermería</li>
              </ul>
              <ul className="space-y-2">
                <li>✓ 3 comidas + 2 meriendas diarias</li>
                <li>✓ Atención médica regular</li>
                <li>✓ Enfermería 24/7</li>
                <li>✓ Actividades terapéuticas</li>
                <li>✓ Lavandería de ropa</li>
              </ul>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Beneficios del Plan Compartido</h3>
            <ul className="space-y-2">
              <li><strong>Socialización Constante:</strong> Compañía las 24 horas</li>
              <li><strong>Precio Accesible:</strong> Opción más económica</li>
              <li><strong>Ambiente Familiar:</strong> Crear nuevas amistades</li>
              <li><strong>Estimulación Social:</strong> Conversación y actividades grupales</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <p className="text-lg mb-4">¿Quieres más información sobre este plan?</p>
            <a href="/contacto" className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition">
              Contactar Ahora
            </a>
          </div>
        </div>
      }
    />
  );
}
