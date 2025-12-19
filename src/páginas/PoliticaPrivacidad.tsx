import { SEOHead } from '../components/SEOHead';
import { SEO_CONFIG } from '../lib/seo-config';

interface PoliticaPrivacidadProps {
  setPage?: (page: string) => void;
}

const PoliticaPrivacidad = ({ setPage }: PoliticaPrivacidadProps) => {
  return (
    <>
      <SEOHead
        title={SEO_CONFIG.politicaPrivacidad.title}
        description={SEO_CONFIG.politicaPrivacidad.description}
        keywords={SEO_CONFIG.politicaPrivacidad.keywords}
        canonical={SEO_CONFIG.politicaPrivacidad.canonical}
        ogImage={SEO_CONFIG.politicaPrivacidad.ogImage}
      />
      
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-800 mb-6">
            Política de Privacidad y Protección de Datos
          </h1>
          
          <p className="text-gray-600 mb-8">
            <strong>Última actualización:</strong> 19 de diciembre de 2025
          </p>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-primary-700 mb-4">
                1. Introducción
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Hogar Belén Buesaco S.A.S. (en adelante "Hogar Belén") se compromete a proteger la privacidad 
                y seguridad de los datos personales de nuestros usuarios. Esta política describe cómo recopilamos, 
                utilizamos, almacenamos y protegemos su información personal en cumplimiento con la Ley 1581 de 2012 
                y el Decreto 1377 de 2013 de Colombia sobre protección de datos personales.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-primary-700 mb-4">
                2. Responsable del Tratamiento de Datos
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg mb-4">
                <p className="text-gray-700 mb-2"><strong>Razón Social:</strong> Hogar Belén Buesaco S.A.S.</p>
                <p className="text-gray-700 mb-2"><strong>Domicilio:</strong> Buesaco, Nariño, Colombia</p>
                <p className="text-gray-700 mb-2"><strong>Email:</strong> hogarbelen2022@gmail.com</p>
                <p className="text-gray-700"><strong>Teléfono:</strong> +57 321 570 8655</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-primary-700 mb-4">
                3. Datos Personales que Recopilamos
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Recopilamos diferentes tipos de información según el servicio utilizado:
              </p>
              
              <h3 className="text-xl font-semibold text-primary-600 mb-3 mt-6">
                Datos de Identificación:
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Nombre completo</li>
                <li>Número de identificación (Cédula de Ciudadanía)</li>
                <li>Fecha de nacimiento</li>
                <li>Fotografía</li>
              </ul>

              <h3 className="text-xl font-semibold text-primary-600 mb-3 mt-6">
                Datos de Contacto:
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Dirección de residencia</li>
                <li>Número de teléfono</li>
                <li>Correo electrónico</li>
              </ul>

              <h3 className="text-xl font-semibold text-primary-600 mb-3 mt-6">
                Datos Sensibles (Datos de Salud):
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Historia clínica</li>
                <li>Diagnósticos médicos</li>
                <li>Medicamentos y tratamientos</li>
                <li>Alergias y condiciones especiales</li>
                <li>Información sobre movilidad y capacidades</li>
              </ul>

              <h3 className="text-xl font-semibold text-primary-600 mb-3 mt-6">
                Datos Financieros:
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Información de pagos</li>
                <li>Datos bancarios (cuando aplique)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-primary-700 mb-4">
                4. Finalidad del Tratamiento de Datos
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Los datos personales recopilados serán utilizados para las siguientes finalidades:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Prestar servicios de cuidado integral para adultos mayores</li>
                <li>Realizar seguimiento médico y de salud</li>
                <li>Gestionar servicios de residencia, centro de día y planes recreativos</li>
                <li>Facilitar la comunicación entre familias y profesionales de la salud</li>
                <li>Procesar pagos y facturación</li>
                <li>Enviar información sobre servicios, eventos y actividades</li>
                <li>Cumplir obligaciones legales y regulatorias</li>
                <li>Mejorar nuestros servicios mediante análisis y estadísticas</li>
                <li>Gestionar la plataforma Belén Conecta</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-primary-700 mb-4">
                5. Autorización para el Tratamiento de Datos
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Al utilizar nuestros servicios y aceptar esta política, usted autoriza de manera libre, previa, 
                expresa e informada a Hogar Belén para recopilar, almacenar, usar, circular y suprimir sus datos 
                personales de acuerdo con las finalidades descritas.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Para datos sensibles (información médica), se solicita autorización expresa y específica, 
                la cual puede ser revocada en cualquier momento.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-primary-700 mb-4">
                6. Derechos de los Titulares de Datos
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Como titular de datos personales, usted tiene derecho a:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Conocer, actualizar y rectificar sus datos personales</li>
                <li>Solicitar prueba de la autorización otorgada</li>
                <li>Ser informado sobre el uso que se ha dado a sus datos</li>
                <li>Presentar quejas ante la Superintendencia de Industria y Comercio</li>
                <li>Revocar la autorización y/o solicitar la supresión de datos</li>
                <li>Acceder de forma gratuita a sus datos personales</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-primary-700 mb-4">
                7. Seguridad de los Datos
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Hogar Belén implementa medidas técnicas, humanas y administrativas necesarias para proteger 
                los datos personales y evitar su adulteración, pérdida, consulta, uso o acceso no autorizado 
                o fraudulento. Estas medidas incluyen:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Encriptación de datos sensibles</li>
                <li>Control de acceso a la información</li>
                <li>Capacitación del personal en protección de datos</li>
                <li>Respaldos periódicos de información</li>
                <li>Protocolos de seguridad para la plataforma digital</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-primary-700 mb-4">
                8. Compartir Información con Terceros
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Hogar Belén podrá compartir información personal con terceros solo en los siguientes casos:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Profesionales de la salud que presten servicios a través de nuestra plataforma</li>
                <li>Entidades de salud (EPS, hospitales) cuando sea necesario para la atención médica</li>
                <li>Autoridades judiciales o administrativas cuando sea requerido por ley</li>
                <li>Proveedores de servicios tecnológicos bajo acuerdos de confidencialidad</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-primary-700 mb-4">
                9. Conservación de Datos
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Los datos personales serán conservados durante el tiempo necesario para cumplir con las 
                finalidades para las cuales fueron recopilados y de acuerdo con las obligaciones legales aplicables. 
                Los datos médicos se conservarán de acuerdo con la normativa de historia clínica vigente.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-primary-700 mb-4">
                10. Cookies y Tecnologías de Rastreo
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Nuestro sitio web utiliza cookies y tecnologías similares para mejorar la experiencia del usuario. 
                Puede configurar su navegador para rechazar cookies, aunque esto puede afectar la funcionalidad 
                del sitio.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-primary-700 mb-4">
                11. Modificaciones a esta Política
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Hogar Belén se reserva el derecho de modificar esta política en cualquier momento. 
                Las modificaciones serán publicadas en nuestro sitio web y notificadas a los usuarios registrados.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-primary-700 mb-4">
                12. Procedimiento para Ejercer sus Derechos
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Para ejercer sus derechos o presentar consultas o reclamos sobre el tratamiento de sus datos, 
                puede contactarnos a través de:
              </p>
              <ul className="list-none text-gray-700 space-y-2 mb-4">
                <li><strong>Email:</strong> hogarbelen2022@gmail.com</li>
                <li><strong>Teléfono:</strong> +57 321 570 8655</li>
                <li><strong>Dirección:</strong> Buesaco, Nariño, Colombia</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                Responderemos a su solicitud dentro de los 15 días hábiles siguientes a su recepción.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-primary-700 mb-4">
                13. Aceptación de la Política
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Al utilizar nuestros servicios, usted reconoce haber leído, entendido y aceptado esta 
                Política de Privacidad y Protección de Datos.
              </p>
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

export default PoliticaPrivacidad;
