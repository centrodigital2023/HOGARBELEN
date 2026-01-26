import { PageTemplate } from '../lib/page-template';

export default function Nosotros() {
  return (
    <PageTemplate
      title="Nosotros | Hogar Belén - Quiénes Somos y Nuestra Historia"
      description="Conoce la historia de Hogar Belén, nuestro equipo profesional y nuestra misión de brindar cuidado digno a adultos mayores en Buesaco, Nariño."
      keywords="Hogar Belén historia, quiénes somos, equipo profesional, misión visión"
      canonical="https://hogarbelen.com/nosotros"
      h1="Sobre Nosotros"
      content={
        <div className="space-y-6">
          <p className="text-lg">
            Hogar Belén nació del sueño de crear un espacio donde los adultos mayores reciban el cuidado
            y amor que merecen en un entorno natural privilegiado.
          </p>
          <h2 className="text-2xl font-semibold">Nuestra Historia</h2>
          <p>
            Fundado en Buesaco, Nariño, Hogar Belén se ha convertido en un referente de cuidado integral
            para adultos mayores en la región. Nuestro compromiso es brindar servicios de calidad con
            calidez humana.
          </p>
          <h2 className="text-2xl font-semibold">Misión</h2>
          <p>
            Brindar cuidado integral y personalizado a adultos mayores, promoviendo su bienestar físico,
            emocional y social en un ambiente familiar y profesional.
          </p>
          <h2 className="text-2xl font-semibold">Visión</h2>
          <p>
            Ser el centro de referencia en cuidado de adultos mayores en Nariño, reconocidos por nuestra
            excelencia, innovación y compromiso con el bienestar de nuestros residentes.
          </p>
          <h2 className="text-2xl font-semibold">Valores</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Respeto:</strong> Dignidad y trato humanizado</li>
            <li><strong>Profesionalismo:</strong> Equipo capacitado y comprometido</li>
            <li><strong>Calidez:</strong> Ambiente familiar y acogedor</li>
            <li><strong>Integridad:</strong> Transparencia en todos nuestros servicios</li>
            <li><strong>Innovación:</strong> Mejora continua en nuestros procesos</li>
          </ul>
        </div>
      }
      schema={{
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Hogar Belén",
        "foundingDate": "2019",
        "description": "Centro de cuidado integral para adultos mayores en Buesaco, Nariño",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Buesaco",
          "addressRegion": "Nariño",
          "addressCountry": "CO"
        }
      }}
    />
  );
}
