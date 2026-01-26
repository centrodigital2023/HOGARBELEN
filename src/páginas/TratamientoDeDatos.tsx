import { PageTemplate } from '../lib/page-template';

export default function TratamientoDeDatos() {
  return (
    <PageTemplate
      title="Tratamiento de Datos Personales | Hogar Belén"
      description="Política de tratamiento de datos personales de Hogar Belén conforme a la Ley 1581 de 2012 de Colombia."
      keywords="tratamiento datos personales, protección datos, Ley 1581 de 2012"
      canonical="https://hogarbelen.com/tratamiento-de-datos"
      h1="Política de Tratamiento de Datos Personales"
      content={
        <div className="space-y-6">
          <p>Hogar Belén, en cumplimiento de la Ley 1581 de 2012 y su decreto reglamentario, informa sobre el tratamiento de datos personales.</p>
          <h2 className="text-xl font-semibold">Responsable del Tratamiento</h2>
          <p>Hogar Belén - Centro de Vida para Adultos Mayores<br/>Buesaco, Nariño, Colombia<br/>Email: hogarbelen2022@gmail.com</p>
          <h2 className="text-xl font-semibold">Finalidad del Tratamiento</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Prestación de servicios de cuidado</li>
            <li>Comunicación con familias y residentes</li>
            <li>Cumplimiento de obligaciones legales</li>
            <li>Mejora de nuestros servicios</li>
          </ul>
        </div>
      }
    />
  );
}
