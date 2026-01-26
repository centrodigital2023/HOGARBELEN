import { Cookie } from '@phosphor-icons/react';
import { Card } from '@/components/ui/card';

interface PoliticaCookiesProps {
  setPage: (page: string) => void;
}

const PoliticaCookies = ({ setPage }: PoliticaCookiesProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-primary-50/30 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
            <Cookie className="w-8 h-8 text-primary" weight="duotone" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Política de Cookies
          </h1>
          <p className="text-lg text-muted-foreground">
            Hogar Belén
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Última actualización: Enero 2026
          </p>
        </div>

        <Card className="p-8 md:p-12 shadow-lg">
          <div className="prose prose-lg max-w-none">
            
            <div className="bg-primary-50/50 border-l-4 border-primary p-6 rounded-r-lg mb-8">
              <p className="text-foreground/90 leading-relaxed italic">
                Esta Política de Cookies explica qué son las cookies, cómo las utilizamos en nuestro sitio web 
                hogarbelen.org, y cómo puedes gestionarlas.
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                1. ¿Qué son las Cookies?
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (ordenador, tablet o móvil) 
                cuando visitas un sitio web. Permiten que el sitio recuerde tus acciones y preferencias durante un 
                período de tiempo, para que no tengas que volver a configurarlas cada vez que regreses.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                2. ¿Qué Cookies Utilizamos?
              </h2>
              
              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
                2.1. Cookies Esenciales
              </h3>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Estas cookies son necesarias para el funcionamiento del sitio web y no pueden ser desactivadas:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-foreground/80">
                <li><strong>Cookies de sesión:</strong> Mantienen tu sesión activa mientras navegas por el sitio</li>
                <li><strong>Cookies de autenticación:</strong> Utilizadas para la autenticación de usuarios y profesionales</li>
                <li><strong>Cookies de seguridad:</strong> Protegen contra ataques maliciosos y garantizan la seguridad de las transacciones</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
                2.2. Cookies de Funcionalidad
              </h3>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Estas cookies permiten recordar tus preferencias:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-foreground/80">
                <li><strong>Preferencias de idioma:</strong> Guardan el idioma seleccionado</li>
                <li><strong>Configuración de la interfaz:</strong> Recuerdan tus ajustes de visualización</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
                2.3. Cookies Analíticas
              </h3>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Utilizamos Google Analytics para entender cómo los visitantes usan nuestro sitio:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-foreground/80">
                <li><strong>_ga:</strong> Distingue a los usuarios (duración: 2 años)</li>
                <li><strong>_gid:</strong> Distingue a los usuarios (duración: 24 horas)</li>
                <li><strong>_gat:</strong> Limita la tasa de solicitudes (duración: 1 minuto)</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
                2.4. Cookies de Google OAuth
              </h3>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Si decides iniciar sesión usando tu cuenta de Google, se utilizan cookies de Google OAuth:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-foreground/80">
                <li><strong>Propósito:</strong> Autenticación segura mediante Google</li>
                <li><strong>Datos almacenados:</strong> Token de acceso, información de perfil básica (nombre, email, foto)</li>
                <li><strong>Duración:</strong> Según la configuración de tu sesión de Google</li>
                <li><strong>Revocación:</strong> Puedes revocar el acceso en cualquier momento desde tu{' '}
                  <a 
                    href="https://myaccount.google.com/permissions" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    cuenta de Google
                  </a>
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                3. Cookies de Terceros
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Utilizamos servicios de terceros que pueden establecer cookies:
              </p>
              <ul className="list-disc ml-6 space-y-3 text-foreground/80">
                <li>
                  <strong>Google Analytics:</strong> Para análisis estadístico del tráfico web
                </li>
                <li>
                  <strong>Google OAuth:</strong> Para autenticación mediante cuenta de Google
                </li>
                <li>
                  <strong>Supabase:</strong> Para autenticación y almacenamiento de datos
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                4. ¿Cómo Gestionar las Cookies?
              </h2>
              
              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
                4.1. Configuración del Navegador
              </h3>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Puedes configurar tu navegador para que rechace las cookies o te avise cuando se envíe una:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-foreground/80">
                <li>
                  <strong>Chrome:</strong>{' '}
                  <code className="bg-muted px-2 py-1 rounded text-sm">Configuración → Privacidad y seguridad → Cookies</code>
                </li>
                <li>
                  <strong>Firefox:</strong>{' '}
                  <code className="bg-muted px-2 py-1 rounded text-sm">Preferencias → Privacidad y seguridad → Cookies</code>
                </li>
                <li>
                  <strong>Safari:</strong>{' '}
                  <code className="bg-muted px-2 py-1 rounded text-sm">Preferencias → Privacidad → Cookies</code>
                </li>
                <li>
                  <strong>Edge:</strong>{' '}
                  <code className="bg-muted px-2 py-1 rounded text-sm">Configuración → Privacidad → Cookies</code>
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
                4.2. Desactivar Google Analytics
              </h3>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Puedes instalar el{' '}
                <a 
                  href="https://tools.google.com/dlpage/gaoptout" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  complemento de inhabilitación de Google Analytics
                </a>
                {' '}para tu navegador.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
                4.3. Revocar Permisos de Google OAuth
              </h3>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Si has iniciado sesión con Google, puedes revocar los permisos desde:{' '}
                <a 
                  href="https://myaccount.google.com/permissions" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  myaccount.google.com/permissions
                </a>
              </p>
            </section>

            <section className="mb-8 bg-amber-50/50 border-l-4 border-amber-500 p-6 rounded-r-lg">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                ⚠️ Advertencia Importante
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                <strong>Si desactivas las cookies esenciales,</strong> algunas funcionalidades del sitio podrían no 
                funcionar correctamente. En particular:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-foreground/80 mt-3">
                <li>No podrás iniciar sesión como familia o profesional</li>
                <li>No podrás reservar servicios</li>
                <li>No podrás acceder al panel de control</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                5. Consentimiento
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                Al utilizar nuestro sitio web, aceptas el uso de cookies conforme a esta política. 
                Si no estás de acuerdo con el uso de cookies, debes ajustar la configuración de tu navegador 
                o abstenerte de utilizar el sitio.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                6. Cambios en la Política de Cookies
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                Hogar Belén se reserva el derecho de modificar esta Política de Cookies en cualquier momento. 
                Los cambios serán publicados en esta página con la fecha de "Última actualización" correspondiente.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                7. Más Información
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Para más información sobre el tratamiento de tus datos personales, consulta nuestra:
              </p>
              <ul className="space-y-2 text-foreground/80">
                <li>
                  <button
                    onClick={() => setPage('privacidad')}
                    className="text-primary hover:underline font-medium"
                  >
                    Política de Privacidad y Tratamiento de Datos
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setPage('terminos')}
                    className="text-primary hover:underline font-medium"
                  >
                    Términos y Condiciones
                  </button>
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                8. Contacto
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Si tienes preguntas sobre esta Política de Cookies, puedes contactarnos:
              </p>
              <div className="bg-muted/50 p-6 rounded-lg space-y-2">
                <p className="text-foreground/80">
                  <strong>Email:</strong>{' '}
                  <a href="mailto:hogarbelen2022@gmail.com" className="text-primary hover:underline">
                    hogarbelen2022@gmail.com
                  </a>
                </p>
                <p className="text-foreground/80">
                  <strong>Teléfono:</strong>{' '}
                  <a href="tel:+573215708655" className="text-primary hover:underline">
                    +57 321 570 8655
                  </a>
                </p>
                <p className="text-foreground/80">
                  <strong>Ubicación:</strong> Buesaco, Nariño, Colombia
                </p>
              </div>
            </section>

            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setPage('home')}
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  Volver al Inicio
                </button>
                <button
                  onClick={() => setPage('privacidad')}
                  className="px-8 py-3 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors font-medium"
                >
                  Política de Privacidad
                </button>
              </div>
            </div>

          </div>
        </Card>
      </div>
    </div>
  );
};

export default PoliticaCookies;
