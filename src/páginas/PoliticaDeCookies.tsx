import { PageTemplate } from '../lib/page-template';

export default function PoliticaDeCookies() {
  return (
    <PageTemplate
      title="Política de Cookies | Hogar Belén"
      description="Información sobre el uso de cookies en el sitio web de Hogar Belén. Cómo las usamos y cómo gestionarlas."
      keywords="política cookies, uso cookies, privacidad web"
      canonical="https://hogarbelen.com/politica-de-cookies"
      h1="Política de Cookies"
      content={
        <div className="space-y-6">
          <p>Este sitio web utiliza cookies para mejorar la experiencia del usuario.</p>
          <h2 className="text-xl font-semibold">¿Qué son las cookies?</h2>
          <p>Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web.</p>
          <h2 className="text-xl font-semibold">Cookies que utilizamos</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Cookies esenciales:</strong> Necesarias para el funcionamiento del sitio</li>
            <li><strong>Cookies de análisis:</strong> Para entender cómo usas nuestro sitio</li>
            <li><strong>Cookies de preferencias:</strong> Para recordar tus configuraciones</li>
          </ul>
        </div>
      }
    />
  );
}
