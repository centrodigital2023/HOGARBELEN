import { FileText, Scale, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-primary-50/30 to-white">
      {/* Hero Section */}
      <div className="relative py-16 px-4 overflow-hidden bg-gradient-to-r from-primary-600/10 to-primary-400/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Scale className="w-16 h-16 text-primary-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Términos y Condiciones de Uso
          </h1>
          <p className="text-lg text-gray-600">
            Fecha de última actualización: 18 de diciembre de 2025
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none">
          {/* Introduction */}
          <Card className="mb-8 border-2 border-primary-200">
            <CardContent className="p-8">
              <p className="text-gray-700 leading-relaxed mb-4">
                Bienvenido al sitio web <strong>www.hogarbelen.org</strong> (en adelante, el "Sitio Web"). 
                A continuación, se describen los términos y condiciones generales (en adelante, los "Términos y Condiciones") 
                que regulan el acceso, navegación y uso del Sitio Web, propiedad de <strong>Hogar Belen Buesaco S.A.S.</strong> (en adelante, "Hogar Belén").
              </p>
              <p className="text-gray-700 leading-relaxed">
                Al acceder a este Sitio Web, usted (en adelante, el "Usuario") declara haber leído, comprendido y aceptado 
                plenamente los presentes Términos y Condiciones. Si no está de acuerdo con ellos, le sugerimos abstenerse 
                de utilizar el Sitio Web.
              </p>
            </CardContent>
          </Card>

          {/* Section 1: Legal Information */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-6 h-6 text-primary-600" />
                1. INFORMACIÓN LEGAL
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed mb-4">
                En cumplimiento de la Ley 1480 de 2011 (Estatuto del Consumidor) y la Ley 527 de 1999 (Comercio Electrónico), 
                se informa que el responsable del Sitio Web es:
              </p>
              <ul className="list-none space-y-2 text-gray-700">
                <li><strong>Razón Social:</strong> Hogar Belen Buesaco S.A.S.</li>
                <li><strong>NIT:</strong> 901.904.908</li>
                <li><strong>Domicilio:</strong> Buesaco, Nariño, Colombia.</li>
                <li><strong>Correo electrónico de contacto:</strong> hogarbelen2022@gmail.com</li>
                <li><strong>Teléfono:</strong> 321 570 8655</li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 2: Purpose */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>2. OBJETO DEL SITIO WEB</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed mb-4">
                El Sitio Web tiene como finalidad brindar información sobre los servicios de residencia, descanso y cuidado 
                para adultos mayores ofrecidos por Hogar Belén en el municipio de Buesaco, Nariño. El Sitio Web permite a 
                los Usuarios conocer las instalaciones, filosofía ("Modo Vacaciones Permanentes"), servicios incluidos, 
                precios referenciales y contactar a la administración para agendar visitas.
              </p>
              <p className="text-gray-700 leading-relaxed font-semibold">
                La información contenida en el Sitio Web es de carácter informativo y no constituye una oferta vinculante 
                ni un contrato de prestación de servicios, el cual deberá formalizarse de manera presencial o mediante los 
                documentos contractuales específicos estipulados por la empresa.
              </p>
            </CardContent>
          </Card>

          {/* Section 3: Use of Website */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>3. USO DEL SITIO WEB</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed mb-4">
                El Usuario se compromete a utilizar el Sitio Web de conformidad con la ley colombiana, el orden público 
                y las buenas costumbres. Queda prohibido:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Utilizar el Sitio Web para fines ilícitos, fraudulentos o que vulneren derechos de terceros.</li>
                <li>Intentar acceder a áreas restringidas de los sistemas informáticos de Hogar Belén.</li>
                <li>Introducir virus informáticos o realizar acciones que puedan alterar, interrumpir o dañar el funcionamiento del Sitio Web.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 4: Intellectual Property */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-primary-600" />
                4. PROPIEDAD INTELECTUAL E INDUSTRIAL
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed mb-4">
                Todos los contenidos del Sitio Web, incluyendo pero no limitado a textos, testimonios, imágenes, fotografías, 
                logotipos, diseño gráfico y software, son propiedad exclusiva de Hogar Belen Buesaco S.A.S. o de terceros 
                que han autorizado su uso, y están protegidos por las normas nacionales e internacionales de propiedad 
                intelectual (Decisión 486 de la CAN y leyes complementarias).
              </p>
              <p className="text-gray-700 leading-relaxed font-semibold">
                Queda estrictamente prohibida la reproducción, distribución, comunicación pública o transformación de dichos 
                contenidos sin la autorización expresa y por escrito de la empresa.
              </p>
            </CardContent>
          </Card>

          {/* Section 5: Data Protection */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>5. PROTECCIÓN DE DATOS PERSONALES (HÁBEAS DATA)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed mb-4">
                Hogar Belén está comprometido con la protección de la privacidad de los Usuarios. El tratamiento de los 
                datos personales (como nombres, teléfonos o correos electrónicos recolectados a través de formularios de 
                contacto o WhatsApp) se rige por nuestra Política de Tratamiento de Datos Personales, conforme a la Ley 
                1581 de 2012 y el Decreto 1377 de 2013.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Al suministrar sus datos en el Sitio Web, el Usuario autoriza de manera libre, previa, expresa e informada 
                a Hogar Belen Buesaco S.A.S. para contactarlo con fines informativos, comerciales o de servicio al cliente 
                relacionados con la residencia. El Usuario puede ejercer sus derechos de conocer, actualizar, rectificar y 
                suprimir sus datos escribiendo al correo electrónico: <strong>hogarbelen2022@gmail.com</strong>.
              </p>
            </CardContent>
          </Card>

          {/* Section 6: Limitation of Liability */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>6. LIMITACIÓN DE RESPONSABILIDAD</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h4 className="font-semibold mb-2">Contenido Informativo:</h4>
                  <p className="leading-relaxed">
                    La información sobre cuidados, terapias o bienestar publicada en el Sitio Web es de carácter general. 
                    No sustituye el consejo, diagnóstico o tratamiento médico profesional.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Disponibilidad:</h4>
                  <p className="leading-relaxed">
                    Hogar Belén no garantiza la disponibilidad ininterrumpida del Sitio Web y no se hace responsable por 
                    daños derivados de fallas técnicas, virus o interrupciones en el servicio de internet.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Terceros:</h4>
                  <p className="leading-relaxed">
                    El Sitio Web puede contener enlaces a sitios de terceros. Hogar Belén no controla ni se hace responsable 
                    del contenido o políticas de privacidad de dichos sitios externos.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 7: Prices */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>7. PRECIOS Y TARIFAS</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                Cualquier precio o tarifa publicada en el Sitio Web es referencial y está sujeta a cambios sin previo aviso. 
                El valor final de los servicios dependerá de la valoración específica de las necesidades del residente y se 
                establecerá en el contrato de servicios respectivo.
              </p>
            </CardContent>
          </Card>

          {/* Section 8: Modifications */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>8. MODIFICACIONES</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                Hogar Belen Buesaco S.A.S. se reserva el derecho de modificar los presentes Términos y Condiciones en 
                cualquier momento. Las modificaciones entrarán en vigencia a partir de su publicación en el Sitio Web. 
                Se recomienda al Usuario revisar esta sección periódicamente.
              </p>
            </CardContent>
          </Card>

          {/* Section 9: Jurisdiction */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>9. LEGISLACIÓN APLICABLE Y JURISDICCIÓN</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                Estos Términos y Condiciones se rigen por las leyes de la República de Colombia. Para la resolución de 
                cualquier controversia que surja en relación con el Sitio Web, las partes se someten a la jurisdicción 
                de los jueces competentes de la República de Colombia.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
