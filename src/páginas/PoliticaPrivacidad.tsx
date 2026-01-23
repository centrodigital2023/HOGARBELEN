import { ShieldCheck } from '@phosphor-icons/react';
import { Card } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';

const PoliticaPrivacidad = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-primary-50/30 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
            <ShieldCheck className="w-8 h-8 text-primary" weight="duotone" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Política de Privacidad y Tratamiento de Datos Personales
          </h1>
          <p className="text-lg text-muted-foreground">
            Hogar Belén
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Última actualización: 23 de Enero de 2026 (v1.0)
          </p>
        </div>

        <Card className="p-8 md:p-12 shadow-lg">
          <div className="prose prose-lg max-w-none">
            
            <div className="bg-primary-50/50 border-l-4 border-primary p-6 rounded-r-lg mb-8">
              <p className="text-foreground/90 leading-relaxed italic">
                En Hogar Belén, valoramos profundamente la confianza de las familias y de nuestros adultos mayores. 
                Por ello, garantizamos que el tratamiento de los datos personales se realiza conforme a la Ley 1581 de 2012, 
                el Decreto 1377 de 2013 y demás normas vigentes sobre protección de datos personales en la República de Colombia.
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                1. Responsable del Tratamiento de Datos
              </h2>
              <ul className="space-y-2 text-foreground/80 ml-6">
                <li><strong>Nombre del establecimiento:</strong> Hogar Belén</li>
                <li><strong>Actividad:</strong> Hogar y residencia para el cuidado integral del adulto mayor</li>
                <li><strong>País:</strong> Colombia</li>
                <li>
                  <strong>Correo electrónico de contacto:</strong>{' '}
                  <a href="mailto:hogarbelen2022@gmail.com" className="text-primary hover:underline">
                    hogarbelen2022@gmail.com
                  </a>
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                2. Datos Personales que se Recopilan
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Hogar Belén podrá recopilar, almacenar y tratar los siguientes datos personales a través de su sitio web, 
                WhatsApp, formularios, llamadas telefónicas o atención presencial:
              </p>

              <div className="ml-4 mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  a) Datos recopilados vía Google OAuth 2.0
                </h3>
                <p className="text-foreground/80 leading-relaxed mb-3">
                  Cuando los usuarios se autentican mediante Google, recopilamos:
                </p>
                <ul className="space-y-2 text-foreground/80 ml-6 list-disc">
                  <li><strong>Nombre completo:</strong> Para personalizar la experiencia del usuario</li>
                  <li><strong>Correo electrónico:</strong> Para identificación y comunicaciones del servicio</li>
                  <li><strong>Foto de perfil:</strong> Para mostrar en su cuenta (opcional)</li>
                  <li><strong>ID de Google:</strong> Para vincular su cuenta de forma segura</li>
                </ul>
                <p className="text-foreground/80 leading-relaxed mt-3 text-sm">
                  <strong>Nota:</strong> Solo solicitamos acceso a información básica de perfil. 
                  No accedemos a sus correos, contactos u otros datos de Google.
                </p>
              </div>

              <div className="ml-4 mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  b) Datos de familiares o responsables
                </h3>
                <ul className="space-y-2 text-foreground/80 ml-6 list-disc">
                  <li>Nombre completo</li>
                  <li>Documento de identidad</li>
                  <li>Número telefónico</li>
                  <li>Correo electrónico</li>
                  <li>Dirección de contacto</li>
                  <li>Información de contacto de emergencia</li>
                </ul>
              </div>

              <div className="ml-4 mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  c) Datos del adulto mayor
                </h3>
                <ul className="space-y-2 text-foreground/80 ml-6 list-disc">
                  <li>Nombre completo</li>
                  <li>Edad</li>
                  <li>Información básica necesaria para su atención</li>
                  <li>Datos relevantes para la prestación del servicio de cuidado integral</li>
                </ul>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
                <p className="text-foreground/90 text-sm">
                  ⚠️ <strong>Importante:</strong> Los datos sensibles, especialmente los relacionados con la salud, 
                  serán tratados únicamente con autorización expresa y bajo estrictas medidas de seguridad.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                3. Finalidades del Tratamiento
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-3">
                Los datos personales serán utilizados para:
              </p>
              
              <div className="ml-4 mb-4">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Datos de Google OAuth:
                </h3>
                <ul className="space-y-2 text-foreground/80 ml-6 list-disc">
                  <li><strong>Autenticación:</strong> Verificar su identidad y permitir acceso seguro a la plataforma</li>
                  <li><strong>Personalización:</strong> Mostrar su nombre y foto en su perfil de usuario</li>
                  <li><strong>Comunicaciones:</strong> Enviar notificaciones importantes sobre su cuenta y servicios</li>
                  <li><strong>Soporte técnico:</strong> Brindar asistencia cuando sea necesario</li>
                </ul>
              </div>

              <div className="ml-4">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Otros datos:
                </h3>
                <ul className="space-y-2 text-foreground/80 ml-6 list-disc">
                  <li>Procesos de admisión y estadía en Hogar Belén</li>
                  <li>Prestación adecuada de los servicios de cuidado al adulto mayor</li>
                  <li>Comunicación permanente con familiares o responsables</li>
                  <li>Atención de solicitudes, consultas, reservas o reclamos</li>
                  <li>Cumplimiento de obligaciones legales, contractuales y administrativas</li>
                  <li>Envío de información relacionada con los servicios del hogar (previa autorización)</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                4. Tratamiento de Datos Sensibles
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-3">
                Los datos sensibles serán tratados:
              </p>
              <ul className="space-y-2 text-foreground/80 ml-6 list-disc">
                <li>Solo cuando sea estrictamente necesario</li>
                <li>Con autorización previa del titular o su representante legal</li>
                <li>Garantizando confidencialidad, respeto y protección</li>
                <li>Exclusivamente para fines relacionados con el bienestar del adulto mayor</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                5. Derechos de los Titulares
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-3">
                Los titulares de la información o sus representantes legales tienen derecho a:
              </p>
              <ul className="space-y-2 text-foreground/80 ml-6 list-disc">
                <li>Conocer, actualizar y rectificar sus datos personales</li>
                <li>Solicitar prueba de la autorización otorgada</li>
                <li>Solicitar la supresión de datos cuando no exista obligación legal</li>
                <li>Revocar la autorización de tratamiento</li>
                <li>Presentar quejas ante la Superintendencia de Industria y Comercio (SIC)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                6. Procedimiento para Ejercer Derechos
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-3">
                Las solicitudes deberán enviarse al correo:
              </p>
              <p className="text-lg font-medium text-primary mb-4 ml-6">
                📧{' '}
                <a href="mailto:hogarbelen2022@gmail.com" className="hover:underline">
                  hogarbelen2022@gmail.com
                </a>
              </p>
              <p className="text-foreground/80 leading-relaxed mb-3">
                La solicitud debe incluir:
              </p>
              <ul className="space-y-2 text-foreground/80 ml-6 list-disc">
                <li>Nombre del titular o representante</li>
                <li>Tipo de solicitud</li>
                <li>Descripción clara del requerimiento</li>
              </ul>
              <p className="text-foreground/80 leading-relaxed mt-3">
                Hogar Belén responderá dentro de los tiempos establecidos por la ley.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                7. Almacenamiento y Seguridad
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-3">
                <strong>Infraestructura:</strong> Los datos se almacenan en una base de datos PostgreSQL segura 
                alojada en Supabase, con respaldo automatizado y encriptación en tránsito y en reposo.
              </p>
              <p className="text-foreground/80 leading-relaxed mb-3">
                <strong>Medidas de seguridad:</strong> Implementamos:
              </p>
              <ul className="space-y-2 text-foreground/80 ml-6 list-disc">
                <li>Encriptación SSL/TLS para todas las comunicaciones</li>
                <li>Autenticación segura mediante Google OAuth 2.0</li>
                <li>Control de acceso basado en roles (Row Level Security)</li>
                <li>Monitoreo continuo de seguridad</li>
                <li>Auditoría de accesos</li>
              </ul>
              <p className="text-foreground/80 leading-relaxed mt-3">
                El acceso a la información está restringido únicamente a personal autorizado.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                8. Compartir Datos con Terceros
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-3">
                Hogar Belén puede compartir datos con:
              </p>
              <ul className="space-y-2 text-foreground/80 ml-6 list-disc">
                <li><strong>Google LLC:</strong> Para autenticación mediante Google OAuth 2.0</li>
                <li><strong>Supabase (PostgreSQL):</strong> Proveedor de infraestructura de base de datos</li>
                <li><strong>Vercel:</strong> Proveedor de hosting y servicios de infraestructura</li>
                <li><strong>Servicios de analítica:</strong> Para mejorar la experiencia del usuario (datos anonimizados)</li>
              </ul>
              <p className="text-foreground/80 leading-relaxed mt-3">
                Todos los terceros están obligados contractualmente a proteger sus datos y no pueden 
                utilizarlos para fines propios.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                9. Uso de Cookies
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                El sitio web de Hogar Belén puede utilizar cookies con fines informativos, estadísticos 
                y de mejora de la experiencia del usuario. El visitante puede desactivar las cookies desde 
                la configuración de su navegador.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                10. Modificaciones a la Política
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                Hogar Belén se reserva el derecho de modificar esta política en cualquier momento. 
                Los cambios serán publicados en esta misma página y entrarán en vigencia desde su publicación.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                11. Vigencia
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                Esta política rige a partir de su publicación y permanecerá vigente mientras Hogar Belén 
                realice el tratamiento de datos personales.
              </p>
            </section>

            <div className="bg-primary-50 border border-primary/20 rounded-xl p-6 mt-8">
              <p className="text-center text-foreground/90 leading-relaxed italic">
                🤍 <strong>Compromiso institucional:</strong><br />
                En Hogar Belén protegemos la información con el mismo respeto y cuidado con el que 
                protegemos la vida, la dignidad y la historia de cada adulto mayor.
              </p>
            </div>

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
                to="/terminos"
                className="text-primary hover:text-primary-600 font-medium transition-colors"
              >
                Ver Términos y Condiciones
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PoliticaPrivacidad;
