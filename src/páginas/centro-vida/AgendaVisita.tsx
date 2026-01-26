import { PageTemplate } from '../../lib/page-template';

export default function AgendaVisita() {
  return (
    <PageTemplate
      title="Agenda tu Visita al Centro Vida Hogar Belén | Tours Guiados"
      description="Conoce personalmente nuestras instalaciones y servicios. Agenda una visita guiada sin compromiso. Horarios flexibles de lunes a sábado."
      keywords="agendar visita hogar geriátrico, tour Centro Vida Buesaco, conocer instalaciones"
      canonical="https://hogarbelen.com/centro-vida/agenda-visita"
      h1="Agenda tu Visita"
      content={
        <div className="space-y-6">
          <p className="text-lg">
            Te invitamos a conocer personalmente Hogar Belén. Nada como una visita para sentir la calidez
            de nuestro centro y resolver todas tus dudas.
          </p>

          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">¿Qué incluye la visita?</h2>
            <ul className="space-y-2">
              <li>✓ Recorrido completo por las instalaciones</li>
              <li>✓ Conoce a nuestro equipo profesional</li>
              <li>✓ Información detallada sobre servicios y planes</li>
              <li>✓ Asesoría personalizada sin compromiso</li>
              <li>✓ Resolución de dudas y consultas</li>
            </ul>
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Horarios de Atención</h3>
            <p><strong>Lunes a Viernes:</strong> 8:00 AM - 5:00 PM</p>
            <p><strong>Sábados:</strong> 9:00 AM - 1:00 PM</p>
            <p className="text-sm text-gray-600 mt-2">*Domingos y festivos con cita previa</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Agendar Visita</h3>
            <p className="mb-4">Contáctanos por cualquiera de estos medios:</p>
            <div className="space-y-2">
              <p><strong>📱 WhatsApp:</strong> <a href="https://wa.me/573215708655" className="text-primary hover:underline">+57 321 570 8655</a></p>
              <p><strong>📧 Email:</strong> <a href="mailto:hogarbelen2022@gmail.com" className="text-primary hover:underline">hogarbelen2022@gmail.com</a></p>
              <p><strong>📞 Teléfono:</strong> Llamar al +57 321 570 8655</p>
            </div>
          </div>

          <p className="text-center text-sm text-gray-600">
            También puedes llenar nuestro <a href="/contacto" className="text-primary hover:underline">formulario de contacto</a> y
            nos comunicaremos contigo a la brevedad.
          </p>
        </div>
      }
    />
  );
}
