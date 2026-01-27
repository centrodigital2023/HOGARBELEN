import { FileText, ArrowLeft } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface TerminosYCondicionesProps {
  setPage?: (page: string) => void; // Made optional for backward compatibility
}

const TerminosYCondiciones = ({ setPage }: TerminosYCondicionesProps) => {
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
            Última actualización: Enero 2025
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
                Hogar Belén tiene como finalidad:
              </p>
              <ul className="space-y-2 text-foreground/80 ml-6 list-disc">
                <li>Brindar información sobre servicios de residencia geriátrica y cuidado del adulto mayor.</li>
                <li>Ofrecer servicios en sede y a domicilio.</li>
                <li>Facilitar la conexión entre usuarios/clientes y profesionales del sector salud y cuidado geriátrico mediante la plataforma Belén Conecta.</li>
                <li>Publicar contenido informativo, educativo y de orientación.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                4. Condiciones de Uso
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
                5. Registro de Usuarios y Profesionales
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
                6. Verificación de Profesionales (Check Azul)
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
                7. Publicación de Ofertas de Trabajo
              </h2>
              <ul className="space-y-2 text-foreground/80 ml-6 list-disc">
                <li>Solo se permiten ofertas relacionadas con salud y cuidado del adulto mayor.</li>
                <li>Todas las ofertas quedan en estado pendiente de aprobación.</li>
                <li>Hogar Belén puede rechazar publicaciones que incumplan la normativa o el objeto del sitio.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                8. Responsabilidad y Limitaciones
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
                9. Propiedad Intelectual
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
                10. Protección de Datos Personales
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-3">
                El tratamiento de datos personales se rige por nuestra{' '}
                <Link
                  to="/politica-de-privacidad"
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
                11. Uso de Cookies
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
                12. Modificaciones
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                Hogar Belén podrá modificar estos Términos y Condiciones en cualquier momento.
                Las modificaciones entrarán en vigor desde su publicación en el sitio web.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                13. Legislación Aplicable y Jurisdicción
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
                14. Contacto
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
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-600 font-medium transition-colors"
            >
              <ArrowLeft size={20} />
              Volver al inicio
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TerminosYCondiciones;
