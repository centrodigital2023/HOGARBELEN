import { PageTemplate } from '../../lib/page-template';

export default function ProfesionalesRegistro() {
  return (
    <PageTemplate
      title="Registro Profesionales | Únete a Belén Conecta"
      description="Regístrate como profesional de salud en Belén Conecta. Accede a ofertas laborales verificadas en Nariño."
      keywords="registro profesional salud, trabajo cuidador Nariño, empleo enfermero"
      canonical="https://hogarbelen.com/belen-conecta/profesionales/registro"
      h1="Registro de Profesionales"
      content={<div><p>Formulario de registro próximamente. <a href="/registrarse" className="text-primary">Registrarse ahora →</a></p></div>}
    />
  );
}
