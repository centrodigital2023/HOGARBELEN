import { PageTemplate } from '../../lib/page-template';

export default function PorQueHogarBelen() {
  return (
    <PageTemplate
      title="¿Por Qué Elegir Hogar Belén? | Centro de Vida en Nariño"
      description="Conoce las razones por las que familias de toda la región confían en Hogar Belén para el cuidado de sus adultos mayores. Experiencia, profesionalismo y amor."
      keywords="por qué Hogar Belén, mejor hogar geriátrico Nariño, centro vida Buesaco"
      canonical="https://hogarbelen.com/por-que-hogar-belen"
      h1="¿Por Qué Elegir Hogar Belén?"
      content={
        <div className="space-y-6">
          <p>
            Hogar Belén no es solo un centro de cuidado, es una familia extendida donde cada residente recibe
            la atención personalizada que merece.
          </p>
          <h2 className="text-2xl font-semibold mt-8">Nuestros Diferenciadores</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Experiencia Comprobada:</strong> Más de 5 años cuidando familias en Nariño</li>
            <li><strong>Equipo Multidisciplinario:</strong> Enfermeros, médicos, terapeutas y cuidadores certificados</li>
            <li><strong>Ubicación Privilegiada:</strong> Entorno natural que promueve el bienestar</li>
            <li><strong>Atención Personalizada:</strong> Planes de cuidado individualizados</li>
            <li><strong>Transparencia Total:</strong> Comunicación constante con las familias</li>
          </ul>
        </div>
      }
    />
  );
}
