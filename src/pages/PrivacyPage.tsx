import { Shield, Lock, Users, FileCheck, Clock, Database } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-green-50/30 to-white">
      {/* Hero Section */}
      <div className="relative py-16 px-4 overflow-hidden bg-gradient-to-r from-green-600/10 to-green-400/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Shield className="w-16 h-16 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Política de Privacidad y Tratamiento de Datos Personales
          </h1>
          <p className="text-lg text-gray-600">
            Hogar Belen Buesaco S.A.S. - Ley 1581 de 2012
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none">
          {/* Introduction */}
          <Card className="mb-8 border-2 border-green-200">
            <CardContent className="p-8">
              <p className="text-gray-700 leading-relaxed">
                <strong>Hogar Belen Buesaco S.A.S.</strong>, en cumplimiento de lo dispuesto por la Ley Estatutaria 1581 de 2012 
                y su Decreto Reglamentario 1377 de 2013, adopta la presente política para el tratamiento de datos personales.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4 font-semibold">
                Al navegar en este sitio web o al suministrar sus datos, usted autoriza a Hogar Belen Buesaco S.A.S. de manera 
                libre, previa, expresa e informada para recolectar, almacenar, usar, circular y suprimir sus datos personales de 
                acuerdo con las siguientes disposiciones:
              </p>
            </CardContent>
          </Card>

          {/* Section 1: Responsible Entity */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-6 h-6 text-green-600" />
                1. RESPONSABLE DEL TRATAMIENTO
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed mb-4">
                La persona jurídica responsable del tratamiento de sus datos personales es:
              </p>
              <ul className="list-none space-y-2 text-gray-700">
                <li><strong>Razón Social:</strong> Hogar Belen Buesaco S.A.S.</li>
                <li><strong>NIT:</strong> 901.904.908</li>
                <li><strong>Domicilio:</strong> Buesaco, Nariño, Colombia.</li>
                <li><strong>Teléfono:</strong> 321 570 8655</li>
                <li><strong>Correo Electrónico:</strong> hogarbelen2022@gmail.com</li>
                <li><strong>Sitio Web:</strong> www.hogarbelen.org</li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 2: Treatment and Purpose */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="w-6 h-6 text-green-600" />
                2. TRATAMIENTO Y FINALIDAD
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed mb-4">
                Los datos personales que Hogar Belen Buesaco S.A.S. recolecta a través de su sitio web, formularios físicos, 
                llamadas telefónicas o aplicaciones de mensajería (WhatsApp), serán incluidos en nuestras bases de datos y 
                utilizados exclusivamente para las siguientes finalidades:
              </p>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h4 className="font-semibold mb-2">Gestión de Solicitudes:</h4>
                  <p className="leading-relaxed">
                    Dar respuesta a consultas, peticiones, quejas o reclamos realizados por los usuarios o familiares interesados 
                    en nuestros servicios.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Prestación del Servicio:</h4>
                  <p className="leading-relaxed">
                    Gestionar los procesos de admisión, valoración y cuidado de los residentes adultos mayores.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Comunicación Comercial:</h4>
                  <p className="leading-relaxed">
                    Contactar al usuario vía telefónica, correo electrónico, SMS o WhatsApp para enviar información sobre tarifas, 
                    promociones, eventos, novedades y actualizaciones sobre los servicios del hogar.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Seguridad y Salud:</h4>
                  <p className="leading-relaxed">
                    En el caso de residentes, recolectar datos sensibles (historia clínica, medicamentos, condiciones de salud) 
                    estrictamente necesarios para garantizar su bienestar y atención integral.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Cumplimiento Legal:</h4>
                  <p className="leading-relaxed">
                    Dar cumplimiento a obligaciones contables, tributarias y legales ante entidades del Estado.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Rights */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-6 h-6 text-green-600" />
                3. DERECHOS DE LOS TITULARES
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed mb-4">
                De conformidad con el artículo 8 de la Ley 1581 de 2012, usted como titular de los datos tiene derecho a:
              </p>
              <ul className="list-disc list-inside space-y-3 text-gray-700 ml-4">
                <li className="leading-relaxed">
                  Conocer, actualizar y rectificar sus datos personales frente a Hogar Belen Buesaco S.A.S. Este derecho se 
                  podrá ejercer, entre otros, frente a datos parciales, inexactos, incompletos, fraccionados, que induzcan a 
                  error, o aquellos cuyo tratamiento esté expresamente prohibido o no haya sido autorizado.
                </li>
                <li className="leading-relaxed">
                  Solicitar prueba de la autorización otorgada para el tratamiento de sus datos.
                </li>
                <li className="leading-relaxed">
                  Ser informado, previa solicitud, respecto del uso que se le ha dado a sus datos personales.
                </li>
                <li className="leading-relaxed">
                  Presentar ante la Superintendencia de Industria y Comercio (SIC) quejas por infracciones a lo dispuesto en la ley.
                </li>
                <li className="leading-relaxed">
                  Revocar la autorización y/o solicitar la supresión del dato cuando en el tratamiento no se respeten los 
                  principios, derechos y garantías constitucionales y legales.
                </li>
                <li className="leading-relaxed">
                  Acceder en forma gratuita a sus datos personales que hayan sido objeto de tratamiento.
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 4: Sensitive Data */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>4. DATOS SENSIBLES Y DE MENORES DE EDAD</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed mb-4">
                Hogar Belen Buesaco S.A.S. informa que, dado el objeto de su servicio (cuidado del adulto mayor), podrá 
                recolectar <strong>Datos Sensibles</strong> relacionados con la salud y el bienestar físico o mental. El 
                Titular tiene la facultad de abstenerse de responder preguntas sobre datos sensibles. Sin embargo, para la 
                correcta prestación del servicio de residencia, estos datos pueden ser indispensables.
              </p>
              <p className="text-gray-700 leading-relaxed">
                El sitio web no está dirigido a menores de edad ni recolecta intencionalmente datos de niños, niñas y 
                adolescentes, salvo aquellos datos que sean de naturaleza pública.
              </p>
            </CardContent>
          </Card>

          {/* Section 5: Procedure */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-6 h-6 text-green-600" />
                5. PROCEDIMIENTO PARA ATENCIÓN DE CONSULTAS Y RECLAMOS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed mb-4">
                Para ejercer sus derechos de conocer, actualizar, rectificar o suprimir sus datos, el Titular debe seguir 
                el siguiente procedimiento:
              </p>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h4 className="font-semibold mb-2">Canal:</h4>
                  <p className="leading-relaxed">
                    Enviar una solicitud escrita al correo electrónico oficial: <strong>hogarbelen2022@gmail.com</strong>.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Contenido de la Solicitud:</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Nombre completo del Titular y número de identificación.</li>
                    <li>Descripción clara de los hechos que dan lugar a la solicitud (ej.: corrección de un teléfono, eliminación de la lista de correos, solicitud de información).</li>
                    <li>Datos de contacto para recibir la respuesta.</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Tiempos de Respuesta:</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>Consultas:</strong> Serán atendidas en un término máximo de diez (10) días hábiles contados a partir de la fecha de recibo de la misma.</li>
                    <li><strong>Reclamos:</strong> Serán atendidos en un término máximo de quince (15) días hábiles contados a partir del día siguiente a la fecha de su recibo.</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 6: Security */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-6 h-6 text-green-600" />
                6. SEGURIDAD DE LA INFORMACIÓN
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                Hogar Belen Buesaco S.A.S. implementa las medidas técnicas, humanas y administrativas necesarias para otorgar 
                seguridad a los registros, evitando su adulteración, pérdida, consulta, uso o acceso no autorizado o fraudulento.
              </p>
            </CardContent>
          </Card>

          {/* Section 7: Cookies */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>7. POLÍTICA DE COOKIES</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                El sitio web <strong>www.hogarbelen.org</strong> puede utilizar cookies propias y de terceros para mejorar 
                la experiencia de navegación y recopilar estadísticas anónimas de uso. El usuario tiene la opción de configurar 
                su navegador para impedir la entrada de cookies, bloquearlas o eliminarlas en cualquier momento.
              </p>
            </CardContent>
          </Card>

          {/* Section 8: Validity */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>8. VIGENCIA</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                La presente Política de Privacidad y Tratamiento de Datos Personales entra en vigencia a partir del 
                <strong> 18 de diciembre de 2025</strong>. Las bases de datos tendrán una vigencia igual al tiempo en que se 
                mantenga y utilice la información para las finalidades descritas en esta política.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
