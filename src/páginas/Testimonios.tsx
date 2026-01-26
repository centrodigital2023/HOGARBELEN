import { PageTemplate } from '../../lib/page-template';

export default function Testimonios() {
  return (
    <PageTemplate
      title="Testimonios de Familias | Hogar Belén Centro de Vida"
      description="Lee las experiencias reales de familias que confían en Hogar Belén para el cuidado de sus seres queridos. Historias de amor, cuidado y transformación."
      keywords="testimonios Hogar Belén, opiniones centro vida, experiencias familias, reseñas cuidado adulto mayor"
      canonical="https://hogarbelen.com/testimonios"
      h1="Testimonios de Nuestras Familias"
      content={
        <div className="space-y-8">
          <p className="text-lg">
            Las palabras de nuestras familias son nuestro mayor orgullo. Aquí compartimos algunas de sus
            experiencias:
          </p>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="italic mb-4">
              "Desde que mi madre está en Hogar Belén, la veo feliz como hace años no la veía. El trato es
              excepcional y las actividades la mantienen activa y con ánimo."
            </p>
            <p className="font-semibold">- María G., Pasto</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="italic mb-4">
              "La tranquilidad de saber que mi padre está en buenas manos no tiene precio. El equipo de Hogar
              Belén es profesional, cariñoso y siempre atento a cada detalle."
            </p>
            <p className="font-semibold">- Carlos R., Buesaco</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="italic mb-4">
              "El ambiente familiar y la belleza del lugar hacen que las visitas sean un placer. Mi abuela
              participa en todas las actividades y ha hecho nuevos amigos."
            </p>
            <p className="font-semibold">- Andrea T., San Lorenzo</p>
          </div>

          <p className="text-center mt-8">
            <a href="/contacto" className="text-primary hover:underline font-semibold">
              Agenda una visita y conoce más historias →
            </a>
          </p>
        </div>
      }
      schema={{
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Hogar Belén",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "48"
        }
      }}
    />
  );
}
