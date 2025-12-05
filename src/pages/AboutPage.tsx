export default function AboutPage() {
  return (
    <div className="py-20 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Nuestra Misión</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Nacimos con el propósito de democratizar el acceso a cuidados de calidad para adultos mayores, 
          empoderando a las familias con herramientas tecnológicas que no pierden el toque humano.
        </p>
      </div>
      
      <div className="aspect-video rounded-2xl overflow-hidden shadow-xl mb-12">
        <img
          src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1000"
          className="w-full h-full object-cover"
          alt="Equipo Hogar Belén"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {[
          { number: '2023', label: 'Fundación' },
          { number: '5+', label: 'Municipios en Nariño' },
          { number: '98%', label: 'Satisfacción Familiar' },
        ].map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
            <div className="text-muted-foreground font-semibold">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="prose prose-lg max-w-none text-muted-foreground">
        <h2 className="text-2xl font-bold text-foreground mb-4">Nuestra Historia</h2>
        <p>
          Hogar Belén nació de la necesidad real de una familia en Nariño que buscaba cuidado de calidad 
          para un ser querido. Nos dimos cuenta de que muchas familias enfrentaban el mismo desafío: 
          encontrar profesionales confiables y coordinar múltiples servicios de cuidado.
        </p>
        <p>
          Hoy, somos una plataforma integral que conecta familias con un ecosistema completo de cuidado: 
          desde nuestro centro de vida donde los adultos mayores disfrutan de actividades terapéuticas 
          diarias, hasta una red verificada de profesionales de salud disponibles para cuidado en casa.
        </p>
      </div>
    </div>
  );
}
