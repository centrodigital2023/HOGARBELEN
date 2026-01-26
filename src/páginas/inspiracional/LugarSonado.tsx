import { PageTemplate } from '../../lib/page-template';

export default function LugarSonado() {
  return (
    <PageTemplate
      title="El Lugar Soñado para el Cuidado de tus Seres Queridos | Hogar Belén"
      description="Descubre el lugar ideal para el cuidado integral de adultos mayores en Buesaco, Nariño. Un espacio diseñado con amor donde cada día es especial."
      keywords="hogar adulto mayor, cuidado integral, Buesaco Nariño, centro vida"
      canonical="https://hogarbelen.com/lugar-sonado"
      h1="El Lugar Soñado para tus Seres Queridos"
      content={
        <div className="space-y-6">
          <p>
            En Hogar Belén hemos creado el espacio que siempre soñaste para el cuidado de tus seres queridos.
            Un lugar donde la calidez humana se combina con la atención profesional.
          </p>
          <p>
            Ubicado en las hermosas montañas de Buesaco, Nariño, nuestro centro ofrece:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Entorno natural privilegiado con clima templado</li>
            <li>Instalaciones modernas y acogedoras</li>
            <li>Equipo profesional altamente calificado</li>
            <li>Atención personalizada 24/7</li>
            <li>Actividades terapéuticas y recreativas diarias</li>
          </ul>
        </div>
      }
    />
  );
}
