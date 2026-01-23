import { FileText } from '@phosphor-icons/react';
import { Card } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';

const TerminosYCondiciones = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-primary-50/30 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
            <FileText className="w-8 h-8 text-primary" weight="duotone" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Términos y Condiciones de Uso
          </h1>
          <p className="text-lg text-muted-foreground">
            Hogar Belén – Fundación Hogar Belén
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Última actualización: 23 de Enero de 2026 (v1.0)
          </p>
        </div>

        <Card className="p-8 md:p-12 shadow-lg">
          <div className="prose prose-lg max-w-none">
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                1. Identificación del Titular del Sitio
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-3">
                En cumplimiento de la legislación colombiana, se informa que el presente sitio web{' '}
                <a href="https://hogarbelen.org" className="text-primary hover:underline font-medium">
                  https://hogarbelen.org
                </a>{' '}
                es operado por:
              </p>
              <ul className="space-y-2 text-foreground/80 ml-6">
                <li><strong>Nombre / Razón social:</strong> Fundación Hogar Belén</li>
                <li><strong>Actividad:</strong> Servicios de cuidado integral del adulto mayor y plataforma de conexión de profesionales</li>
                <li><strong>Ubicación:</strong> Buesaco, Nariño – Colombia</li>
                <li><strong>Correo de contacto:</strong> hogarbelen2022@gmail.com</li>
                <li><strong>Teléfono / WhatsApp:</strong> +57 321 570 8655</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                2. Aceptación de los Términos
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                El acceso, navegación y uso del sitio web atribuye la condición de usuario, e implica la aceptación plena y sin reservas de los presentes Términos y Condiciones.
              </p>
              <p className="text-foreground/80 leading-relaxed mt-3">
                Si el usuario no está de acuerdo con estos términos, deberá abstenerse de utilizar el sitio.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                3. Objeto del Sitio Web
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-3">
                Hogar Belén (https://www.hogarbelen.org) es una plataforma web integral que tiene como finalidad:
              </p>
              <ul className="space-y-2 text-foreground/80 ml-6 list-disc">
                <li>Brindar información sobre servicios de residencia geriátrica y cuidado del adulto mayor.</li>
                <li>Ofrecer servicios en sede y a domicilio.</li>
                <li>Facilitar la conexión entre usuarios/clientes y profesionales del sector salud y cuidado geriátrico mediante la plataforma Belén Conecta.</li>
                <li>Publicar contenido informativo, educativo y de orientación.</li>
                <li>Proporcionar acceso seguro mediante autenticación con Google OAuth 2.0.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                4. Autenticación y Uso de Google OAuth
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-3">
                Hogar Belén utiliza <strong>Google OAuth 2.0</strong> como método de autenticación seguro:
              </p>
              <ul className="space-y-2 text-foreground/80 ml-6 list-disc">
                <li>Al iniciar sesión con Google, autorizas el acceso a tu <strong>información básica de perfil</strong> (nombre, correo electrónico, foto).</li>
                <li>Solo accedemos a los datos necesarios para tu identificación. <strong>NO</strong> accedemos a tus correos, contactos u otros datos privados de Google.</li>
                <li>Puedes revocar el acceso en cualquier momento desde tu cuenta de Google.</li>
                <li>Los datos obtenidos se utilizan exclusivamente según nuestra <Link to="/privacidad" className="text-primary hover:underline font-medium">Política de Privacidad</Link>.</li>
              </ul>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mt-4">
                <p className="text-foreground/90 text-sm">
                  ℹ️ <strong>Nota:</strong> El uso de Google OAuth proporciona una capa adicional de seguridad, 
                  ya que no necesitas crear ni recordar otra contraseña.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                5. Condiciones de Uso
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-3">
                El usuario se compromete a:
              </p>
              <ul className="space-y-2 text-foreground/80 ml-6 list-disc">
                <li>Utilizar el sitio de forma lícita y respetuosa.</li>
                <li>No realizar actividades fraudulentas, ilegales o que afecten a terceros.</li>
                <li>Proporcionar información veraz en formularios y registros.</li>
                <li>No suplantar identidades ni alterar contenidos del sitio.</li>
              </ul>
              <p className="text-foreground/80 leading-relaxed mt-3">
                Hogar Belén se reserva el derecho de suspender o bloquear el acceso a usuarios que incumplan estas condiciones.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                6. Registro de Usuarios y Profesionales
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-3">
                Al registrarse en el sitio o en la plataforma Belén Conecta:
              </p>
              <ul className="space-y-2 text-foreground/80 ml-6 list-disc">
                <li>El usuario garantiza que la información suministrada es veraz, completa y actualizada.</li>
                <li>Los profesionales aceptan un proceso de verificación previo a su publicación.</li>
                <li>Hogar Belén se reserva el derecho de aprobar o rechazar registros sin necesidad de justificación adicional.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                7. Verificación de Profesionales (Check Azul)
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-3">
                El distintivo de profesional verificado:
              </p>
              <ul className="space-y-2 text-foreground/80 ml-6 list-disc">
                <li>Es otorgado exclusivamente por Hogar Belén.</li>
                <li>No puede ser modificado, activado ni solicitado directamente por el profesional.</li>
                <li>Indica que la información fue revisada, no garantiza resultados médicos ni contractuales.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                8. Publicación de Ofertas de Trabajo
              </h2>
              <ul className="space-y-2 text-foreground/80 ml-6 list-disc">
                <li>Solo se permiten ofertas relacionadas con salud y cuidado del adulto mayor.</li>
                <li>Todas las ofertas quedan en estado pendiente de aprobación.</li>
                <li>Hogar Belén puede rechazar publicaciones que incumplan la normativa o el objeto del sitio.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                9. Responsabilidad y Limitaciones
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-3">
                Hogar Belén:
              </p>
              <ul className="space-y-2 text-foreground/80 ml-6 list-disc">
                <li>No se hace responsable por acuerdos privados entre usuarios y profesionales.</li>
                <li>No garantiza resultados específicos de servicios contratados entre terceros.</li>
                <li>Actúa como facilitador de información y contacto, no como intermediario laboral.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                10. Propiedad Intelectual
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                Todos los contenidos del sitio (textos, imágenes, logotipos, diseño, estructura) son propiedad de Hogar Belén o se utilizan con autorización.
              </p>
              <p className="text-foreground/80 leading-relaxed mt-3">
                Queda prohibida su reproducción total o parcial sin autorización expresa.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                11. Protección de Datos Personales
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-3">
                El tratamiento de datos personales se rige por nuestra{' '}
                <Link
                  to="/privacidad"
                  className="text-primary hover:underline font-medium"
                >
                  Política de Privacidad
                </Link>
                , conforme a la Ley 1581 de 2012.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                El usuario puede ejercer sus derechos de acceso, actualización, rectificación y supresión escribiendo a:{' '}
                <a href="mailto:hogarbelen2022@gmail.com" className="text-primary hover:underline">
                  hogarbelen2022@gmail.com
                </a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                12. Uso de Cookies
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-3">
                Este sitio utiliza cookies propias y de terceros con fines estadísticos, funcionales y publicitarios.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                El usuario puede gestionar su consentimiento desde el banner de cookies.
                Más información en nuestra Política de Cookies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                13. Modificaciones
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                Hogar Belén podrá modificar estos Términos y Condiciones en cualquier momento.
                Las modificaciones entrarán en vigor desde su publicación en el sitio web.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                14. Legislación Aplicable y Jurisdicción
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-3">
                Estos términos se rigen por las leyes de la República de Colombia.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Cualquier controversia será sometida a los juzgados competentes del departamento de Nariño.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                15. Contacto
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-3">
                Para consultas relacionadas con estos términos, puede comunicarse a:
              </p>
              <ul className="space-y-2 text-foreground/80 ml-6">
                <li>
                  📧{' '}
                  <a href="mailto:hogarbelen2022@gmail.com" className="text-primary hover:underline">
                    hogarbelen2022@gmail.com
                  </a>
                </li>
                <li>📍 Buesaco, Nariño – Colombia</li>
              </ul>
            </section>

          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex gap-4">
              <Link
                to="/"
                className="text-primary hover:text-primary-600 font-medium transition-colors"
              >
                ← Volver al inicio
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link
                to="/privacidad"
                className="text-primary hover:text-primary-600 font-medium transition-colors"
              >
                Ver Política de Privacidad
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TerminosYCondiciones;
