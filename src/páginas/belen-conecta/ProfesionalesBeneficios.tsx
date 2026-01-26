import { PageTemplate } from '../../lib/page-template';

export default function ProfesionalesBeneficios() {
  return (
    <PageTemplate
      title="Beneficios para Profesionales | Belén Conecta"
      description="Descubre los beneficios de ser parte de Belén Conecta: capacitaciones, ofertas verificadas, comunidad profesional."
      keywords="beneficios profesionales salud, ventajas Belén Conecta, capacitación cuidadores"
      canonical="https://hogarbelen.com/belen-conecta/profesionales/beneficios"
      h1="Beneficios de Ser Parte de Belén Conecta"
      content={
        <div className="space-y-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>Acceso a ofertas laborales verificadas</li>
            <li>Capacitaciones gratuitas en línea</li>
            <li>Certificaciones reconocidas</li>
            <li>Comunidad de profesionales</li>
            <li>Soporte y asesoría continua</li>
            <li>Pagos garantizados y seguros</li>
          </ul>
        </div>
      }
    />
  );
}
