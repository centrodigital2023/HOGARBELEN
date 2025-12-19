import { ArrowLeft } from 'lucide-react';

interface TerminosCondicionesProps {
  setPage: (page: string) => void;
}

const TerminosCondiciones = ({ setPage }: TerminosCondicionesProps) => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => setPage('home')}
          className="flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6"
        >
          <ArrowLeft size={20} />
          Volver al inicio
        </button>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Términos y Condiciones
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Última actualización: Diciembre 2024
          </p>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">
              1. Aceptación de los Términos
            </h2>
            <p className="text-gray-700 mb-4">
              Al acceder y utilizar los servicios de Hogar Belén Buesaco S.A.S., 
              usted acepta estar sujeto a estos Términos y Condiciones, todas las 
              leyes y regulaciones aplicables, y acepta que es responsable del 
              cumplimiento de todas las leyes locales aplicables.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">
              2. Uso de los Servicios
            </h2>
            <p className="text-gray-700 mb-4">
              Nuestros servicios están diseñados para proporcionar cuidado integral 
              y profesional a adultos mayores. El uso de nuestros servicios requiere:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Registro completo y veraz de información personal</li>
              <li>Aceptación de las políticas de privacidad de datos</li>
              <li>Cumplimiento de las normas de comportamiento establecidas</li>
              <li>Pago oportuno de los servicios contratados</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">
              3. Plataforma Belén Conecta
            </h2>
            <p className="text-gray-700 mb-4">
              La plataforma Belén Conecta facilita la conexión entre familias y 
              profesionales de la salud verificados. Al utilizar esta plataforma:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Los usuarios deben proporcionar información veraz y actualizada</li>
              <li>Los profesionales deben presentar documentación válida y vigente</li>
              <li>Todas las ofertas de empleo están sujetas a aprobación administrativa</li>
              <li>La verificación profesional (check azul) es otorgada exclusivamente por administradores</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">
              4. Responsabilidades
            </h2>
            <p className="text-gray-700 mb-4">
              Hogar Belén se compromete a:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Proporcionar servicios de cuidado profesional y humanizado</li>
              <li>Verificar las credenciales de los profesionales de la salud</li>
              <li>Mantener instalaciones seguras y adecuadas</li>
              <li>Proteger la privacidad y confidencialidad de la información</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">
              5. Autorización de Contacto
            </h2>
            <p className="text-gray-700 mb-4">
              Al registrarse en nuestros servicios o completar cualquier formulario, 
              usted autoriza expresamente a Hogar Belén Buesaco S.A.S. para 
              contactarlo mediante:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Llamadas telefónicas</li>
              <li>Mensajes de WhatsApp</li>
              <li>Correo electrónico</li>
              <li>Mensajes de texto SMS</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">
              6. Pagos y Facturación
            </h2>
            <p className="text-gray-700 mb-4">
              Los servicios de Hogar Belén están sujetos a las tarifas publicadas. 
              El pago debe realizarse según los términos acordados al momento de la 
              contratación. Los servicios pueden ser suspendidos en caso de mora.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">
              7. Cancelaciones y Reembolsos
            </h2>
            <p className="text-gray-700 mb-4">
              Las políticas de cancelación varían según el tipo de servicio 
              contratado. Los reembolsos se procesarán de acuerdo con la política 
              específica de cada servicio y estarán sujetos a evaluación administrativa.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">
              8. Limitación de Responsabilidad
            </h2>
            <p className="text-gray-700 mb-4">
              Hogar Belén no será responsable por daños indirectos, incidentales, 
              especiales o consecuentes que resulten del uso o la imposibilidad de 
              usar los servicios, excepto en los casos establecidos por la ley 
              colombiana.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">
              9. Modificaciones
            </h2>
            <p className="text-gray-700 mb-4">
              Hogar Belén se reserva el derecho de modificar estos términos y 
              condiciones en cualquier momento. Los cambios serán efectivos 
              inmediatamente después de su publicación en el sitio web.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">
              10. Ley Aplicable
            </h2>
            <p className="text-gray-700 mb-4">
              Estos términos se rigen por las leyes de la República de Colombia. 
              Cualquier disputa será resuelta en los tribunales competentes de 
              Nariño, Colombia.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">
              Contacto
            </h2>
            <p className="text-gray-700 mb-4">
              Para consultas sobre estos términos y condiciones, por favor contacte:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-gray-700 font-semibold">Hogar Belén Buesaco S.A.S.</p>
              <p className="text-gray-700">Buesaco, Nariño, Colombia</p>
              <p className="text-gray-700">Teléfono: +57 321 570 8655</p>
              <p className="text-gray-700">Email: hogarbelen2022@gmail.com</p>
              <p className="text-gray-700">Web: https://hogarbelen.org</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminosCondiciones;
