import { ArrowLeft } from 'lucide-react';

interface PoliticaPrivacidadProps {
  setPage: (page: string) => void;
}

const PoliticaPrivacidad = ({ setPage }: PoliticaPrivacidadProps) => {
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
            Política de Privacidad y Tratamiento de Datos Personales
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Última actualización: Diciembre 2024
          </p>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">
              1. Responsable del Tratamiento
            </h2>
            <p className="text-gray-700 mb-4">
              <strong>Hogar Belén Buesaco S.A.S.</strong> con domicilio en Buesaco, 
              Nariño, Colombia, es el responsable del tratamiento de los datos 
              personales recolectados a través de su sitio web https://hogarbelen.org 
              y sus servicios asociados.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-gray-700">
                <strong>Datos de contacto:</strong><br />
                Teléfono: +57 321 570 8655<br />
                Email: hogarbelen2022@gmail.com<br />
                Dirección: Buesaco, Nariño, Colombia
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">
              2. Marco Legal
            </h2>
            <p className="text-gray-700 mb-4">
              Esta política cumple con la Ley 1581 de 2012 y el Decreto 1377 de 2013 
              de la República de Colombia sobre Protección de Datos Personales, así 
              como con las directrices de la Superintendencia de Industria y Comercio.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">
              3. Datos Personales Recolectados
            </h2>
            <p className="text-gray-700 mb-4">
              Recolectamos los siguientes tipos de datos personales:
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-3">
              3.1 Datos de Identificación
            </h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Nombre completo</li>
              <li>Documento de identidad</li>
              <li>Fecha de nacimiento</li>
              <li>Fotografía (opcional)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-3">
              3.2 Datos de Contacto
            </h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Dirección de correo electrónico</li>
              <li>Número de teléfono</li>
              <li>Dirección física</li>
              <li>WhatsApp</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-3">
              3.3 Datos Profesionales (para profesionales de salud)
            </h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Especialidad médica o de enfermería</li>
              <li>Experiencia laboral</li>
              <li>Certificados y títulos profesionales</li>
              <li>Tarjetas profesionales</li>
              <li>Tarifas de servicios</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-3">
              3.4 Datos de Navegación
            </h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Dirección IP</li>
              <li>Tipo de navegador</li>
              <li>Páginas visitadas</li>
              <li>Tiempo de navegación</li>
              <li>Cookies y tecnologías similares</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">
              4. Finalidad del Tratamiento de Datos
            </h2>
            <p className="text-gray-700 mb-4">
              Los datos personales recolectados se utilizan para:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Proporcionar servicios de cuidado de adultos mayores</li>
              <li>Gestionar la plataforma Belén Conecta</li>
              <li>Verificar credenciales de profesionales de salud</li>
              <li>Procesar solicitudes de empleo y ofertas de trabajo</li>
              <li>Contactar a usuarios y familias mediante llamadas, WhatsApp o email</li>
              <li>Enviar información sobre servicios, planes y promociones</li>
              <li>Mejorar la experiencia del usuario</li>
              <li>Cumplir obligaciones legales y contractuales</li>
              <li>Realizar análisis estadísticos y de marketing</li>
              <li>Personalizar contenido mediante inteligencia artificial</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">
              5. Autorización de Tratamiento
            </h2>
            <p className="text-gray-700 mb-4">
              Al registrarse en cualquiera de nuestros servicios o completar 
              formularios en nuestro sitio web, usted autoriza expresamente a 
              Hogar Belén Buesaco S.A.S. para:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Recolectar, almacenar y procesar sus datos personales</li>
              <li>Contactarlo mediante llamadas telefónicas, WhatsApp, correo electrónico o SMS</li>
              <li>Compartir información con profesionales de salud verificados para prestar servicios</li>
              <li>Utilizar cookies y tecnologías de seguimiento</li>
              <li>Enviar comunicaciones de marketing con opción de cancelación</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">
              6. Derechos del Titular
            </h2>
            <p className="text-gray-700 mb-4">
              Como titular de datos personales, usted tiene derecho a:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Conocer, actualizar y rectificar sus datos personales</li>
              <li>Solicitar prueba de la autorización otorgada</li>
              <li>Ser informado sobre el uso de sus datos</li>
              <li>Presentar quejas ante la Superintendencia de Industria y Comercio</li>
              <li>Revocar la autorización y/o solicitar la supresión de datos</li>
              <li>Acceder de forma gratuita a sus datos personales</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">
              7. Ejercicio de Derechos
            </h2>
            <p className="text-gray-700 mb-4">
              Para ejercer sus derechos, puede contactarnos mediante:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Email: hogarbelen2022@gmail.com</li>
              <li>Teléfono: +57 321 570 8655</li>
              <li>WhatsApp: +57 321 570 8655</li>
            </ul>
            <p className="text-gray-700 mb-4">
              Responderemos su solicitud dentro de los 15 días hábiles siguientes 
              a la recepción de la misma, según lo establecido por la ley.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">
              8. Seguridad de los Datos
            </h2>
            <p className="text-gray-700 mb-4">
              Implementamos medidas de seguridad técnicas, administrativas y físicas 
              para proteger sus datos personales contra acceso no autorizado, pérdida, 
              alteración o destrucción, incluyendo:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Cifrado SSL/TLS para transmisión de datos</li>
              <li>Autenticación segura con OAuth 2.0</li>
              <li>Almacenamiento seguro en servidores certificados</li>
              <li>Control de acceso restringido a datos sensibles</li>
              <li>Auditorías periódicas de seguridad</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">
              9. Cookies y Tecnologías de Seguimiento
            </h2>
            <p className="text-gray-700 mb-4">
              Utilizamos cookies y tecnologías similares para:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Mejorar la funcionalidad del sitio web</li>
              <li>Analizar el tráfico y comportamiento de usuarios</li>
              <li>Personalizar contenido y publicidad</li>
              <li>Medir efectividad de campañas (Meta Pixel, Google Analytics)</li>
            </ul>
            <p className="text-gray-700 mb-4">
              Puede configurar su navegador para rechazar cookies, aunque esto puede 
              limitar algunas funcionalidades del sitio.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">
              10. Compartir Información con Terceros
            </h2>
            <p className="text-gray-700 mb-4">
              Podemos compartir sus datos con:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Profesionales de salud verificados para prestar servicios</li>
              <li>Proveedores de servicios tecnológicos (hosting, email, analytics)</li>
              <li>Autoridades gubernamentales cuando sea requerido por ley</li>
            </ul>
            <p className="text-gray-700 mb-4">
              Nunca vendemos ni compartimos sus datos con fines comerciales no 
              relacionados con nuestros servicios.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">
              11. Retención de Datos
            </h2>
            <p className="text-gray-700 mb-4">
              Conservamos sus datos personales durante el tiempo necesario para 
              cumplir las finalidades establecidas y según lo requiera la ley 
              colombiana. Los datos pueden ser eliminados a solicitud del titular, 
              salvo obligaciones legales de conservación.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">
              12. Menores de Edad
            </h2>
            <p className="text-gray-700 mb-4">
              Nuestros servicios están dirigidos a adultos mayores y sus familias. 
              No recolectamos intencionalmente datos de menores de 18 años sin 
              autorización de sus representantes legales.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">
              13. Modificaciones a la Política
            </h2>
            <p className="text-gray-700 mb-4">
              Esta política puede ser actualizada periódicamente. Los cambios 
              significativos serán notificados mediante nuestro sitio web o por 
              correo electrónico. La fecha de última actualización aparece al 
              inicio de este documento.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">
              14. Inteligencia Artificial
            </h2>
            <p className="text-gray-700 mb-4">
              Utilizamos herramientas de inteligencia artificial para mejorar 
              nuestros servicios, incluyendo:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Validación inteligente de formularios</li>
              <li>Clasificación automática de solicitudes</li>
              <li>Recomendaciones personalizadas de servicios</li>
              <li>Detección de spam</li>
            </ul>
            <p className="text-gray-700 mb-4">
              Estas herramientas procesan datos de forma segura sin almacenar 
              información sensible innecesariamente.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">
              15. Contacto
            </h2>
            <p className="text-gray-700 mb-4">
              Para consultas sobre esta política de privacidad o el tratamiento 
              de sus datos personales:
            </p>
            <div className="bg-primary-50 p-4 rounded-lg mb-4 border border-primary-200">
              <p className="text-gray-700 font-semibold">Hogar Belén Buesaco S.A.S.</p>
              <p className="text-gray-700">Responsable del Tratamiento de Datos</p>
              <p className="text-gray-700 mt-2">
                <strong>Email:</strong> hogarbelen2022@gmail.com<br />
                <strong>Teléfono/WhatsApp:</strong> +57 321 570 8655<br />
                <strong>Dirección:</strong> Buesaco, Nariño, Colombia<br />
                <strong>Web:</strong> https://hogarbelen.org
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliticaPrivacidad;
