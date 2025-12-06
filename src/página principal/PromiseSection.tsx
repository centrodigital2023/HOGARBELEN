import { Heart, Home, Sprout } from 'lucide-react';

const PromiseSection = () => {
  const promises = [
    {
      icon: Heart,
      title: "Atención Personalizada",
      description: "Cada residente recibe un plan de cuidado individualizado que respeta sus necesidades, preferencias y ritmo de vida."
    },
    {
      icon: Home,
      title: "Ambiente Familiar",
      description: "Creemos en el poder de las relaciones significativas. Nuestro equipo se convierte en una extensión de la familia."
    },
    {
      icon: Sprout,
      title: "Actividades Enriquecedoras",
      description: "Desde huertas terapéuticas hasta clases de música, ofrecemos actividades que nutren cuerpo, mente y espíritu."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nuestra <span className="text-primary-600">Promesa</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            En Hogar Belén, no solo cuidamos, creamos un entorno donde cada residente puede florecer, 
            encontrar propósito y disfrutar de una vida plena y significativa.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {promises.map((promise, index) => (
            <div 
              key={index}
              className="p-8 rounded-xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-all duration-300 text-center group hover:bg-white"
            >
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <promise.icon size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{promise.title}</h3>
              <p className="text-gray-600 leading-relaxed">{promise.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromiseSection;
