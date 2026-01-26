import { PageTemplate } from '../../lib/page-template';

export default function FamiliasComoFunciona() {
  return (
    <PageTemplate
      title="Cómo Funciona Belén Conecta para Familias | Guía Paso a Paso"
      description="Aprende cómo usar Belén Conecta para encontrar y contratar profesionales de cuidado verificados. Proceso simple y seguro."
      keywords="cómo funciona Belén Conecta, contratar cuidador online, guía familias"
      canonical="https://hogarbelen.com/belen-conecta/familias/como-funciona"
      h1="Cómo Funciona Belén Conecta"
      content={
        <div className="space-y-6">
          <p className="text-lg">Contratar profesionales verificados es fácil y seguro con Belén Conecta.</p>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-semibold">Regístrate Gratis</h3>
                <p>Crea tu cuenta y cuéntanos qué tipo de profesional necesitas.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-semibold">Busca o Publica</h3>
                <p>Busca en nuestra base de profesionales o publica una oferta.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-semibold">Conecta y Contrata</h3>
                <p>Revisa perfiles, contacta y contrata al profesional ideal.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">4</div>
              <div>
                <h3 className="font-semibold">Seguimiento y Soporte</h3>
                <p>Recibe soporte continuo durante toda la relación laboral.</p>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
}
