import { SEOHead } from '../components/SEOHead';
import { SEO_CONFIG } from '../lib/seo-config';

interface TerminosYCondicionesProps {
  setPage?: (page: string) => void;
}

const TerminosYCondiciones = ({ setPage }: TerminosYCondicionesProps) => {
  return (
    <>
      <SEOHead
        title={SEO_CONFIG.terminosCondiciones.title}
        description={SEO_CONFIG.terminosCondiciones.description}
        keywords={SEO_CONFIG.terminosCondiciones.keywords}
        canonical={SEO_CONFIG.terminosCondiciones.canonical}
        ogImage={SEO_CONFIG.terminosCondiciones.ogImage}
      />
      
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-800 mb-6">
            Términos y Condiciones
          </h1>
          
          <p className="text-gray-600 mb-8">
            <strong>Última actualización:</strong> 19 de diciembre de 2025
          </p>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-primary-700 mb-4">
                1. Aceptación de los Términos
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Al acceder y utilizar los servicios de Hogar Belén Buesaco S.A.S., usted acepta estar sujeto a estos 
                Términos y Condiciones, todas las leyes y regulaciones aplicables, y acepta que es responsable del 
                cumplimiento de las leyes locales aplicables.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-primary-700 mb-4">
                2. Descripción de Servicios
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Hogar Belén ofrece servicios integrales de cuidado para adultos mayores, que incluyen:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Servicios de residencia (habitaciones compartidas y privadas)</li>
                <li>Centro de día para adultos mayores</li>
                <li>Planes recreativos y turísticos</li>
                <li>Servicios de cuidado a domicilio</li>
                <li>Enfermería geriátrica 24/7</li>
                <li>Plataforma digital Belén Conecta</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-primary-700 mb-4">
                3. Uso de la Plataforma
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                La plataforma Belén Conecta permite a familias contratar servicios de cuidado y a profesionales 
                ofrecer sus servicios. Al utilizar la plataforma, usted se compromete a:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Proporcionar información veraz y actualizada</li>
                <li>Mantener la confidencialidad de sus credenciales de acceso</li>
                <li>No utilizar la plataforma con fines ilícitos o no autorizados</li>
                <li>Respetar los derechos de otros usuarios</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-primary-700 mb-4">
                4. Responsabilidades del Cliente
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Los clientes se comprometen a:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Proporcionar información médica completa y precisa del adulto mayor</li>
                <li>Realizar los pagos acordados en los plazos establecidos</li>
                <li>Notificar cualquier cambio en el estado de salud o necesidades especiales</li>
                <li>Respetar las normas y procedimientos del centro</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-primary-700 mb-4">
                5. Responsabilidades de Hogar Belén
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Hogar Belén se compromete a:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Proporcionar cuidado profesional y digno a todos los residentes</li>
                <li>Mantener instalaciones seguras y adecuadas</li>
                <li>Contar con personal capacitado y certificado</li>
                <li>Proteger la privacidad y los datos personales de los usuarios</li>
                <li>Mantener comunicación constante con las familias</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-primary-700 mb-4">
                6. Política de Pagos y Cancelaciones
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Los servicios de residencia requieren un pago mensual anticipado. Las cancelaciones deben 
                notificarse con al menos 30 días de anticipación. Los servicios recreativos y de pasadía 
                pueden cancelarse con 48 horas de anticipación para obtener reembolso completo.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-primary-700 mb-4">
                7. Limitación de Responsabilidad
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Hogar Belén no será responsable por eventos fuera de su control razonable, incluyendo 
                desastres naturales, emergencias médicas imprevistas o situaciones de fuerza mayor. 
                En caso de emergencias médicas, se contactará inmediatamente a los familiares designados 
                y se prestará la atención necesaria.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-primary-700 mb-4">
                8. Modificaciones a los Términos
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Hogar Belén se reserva el derecho de modificar estos términos en cualquier momento. 
                Las modificaciones serán efectivas inmediatamente después de su publicación en el sitio web. 
                Es responsabilidad del usuario revisar periódicamente estos términos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-primary-700 mb-4">
                9. Ley Aplicable y Jurisdicción
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Estos términos se rigen por las leyes de la República de Colombia. Cualquier disputa 
                relacionada con estos términos será resuelta en los tribunales competentes de Nariño, Colombia.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-primary-700 mb-4">
                10. Contacto
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Para preguntas sobre estos términos y condiciones, contáctenos:
              </p>
              <ul className="list-none text-gray-700 space-y-2">
                <li><strong>Email:</strong> hogarbelen2022@gmail.com</li>
                <li><strong>Teléfono:</strong> +57 321 570 8655</li>
                <li><strong>Dirección:</strong> Buesaco, Nariño, Colombia</li>
              </ul>
            </section>
          </div>

          <div className="mt-12 pt-6 border-t border-gray-200">
            <button
              onClick={() => setPage?.('home')}
              className="text-primary-600 hover:text-primary-800 font-medium"
            >
              ← Volver al inicio
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TerminosYCondiciones;
