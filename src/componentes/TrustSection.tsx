import { Shield, Users, Clock, Award } from 'lucide-react';

const TrustSection = () => {
  const trustItems = [
    {
      icon: Shield,
      title: 'Profesionales Verificados',
      description: 'Todos nuestros profesionales están certificados y verificados.'
    },
    {
      icon: Users,
      title: '500+ Familias Atendidas',
      description: 'Más de 500 familias confían en nosotros para el cuidado de sus seres queridos.'
    },
    {
      icon: Clock,
      title: 'Disponibilidad 24/7',
      description: 'Servicio y soporte disponible las 24 horas del día, los 7 días de la semana.'
    },
    {
      icon: Award,
      title: '10 Años de Experiencia',
      description: 'Más de una década brindando servicios de cuidado de calidad.'
    }
  ];

  return (
    <section className="py-20 bg-primary-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Por Qué Confiar en Nosotros
          </h2>
          <p className="text-lg text-gray-600">
            Líderes en servicios de cuidado para adultos mayores en Nariño
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustItems.map((item, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <item.icon size={32} />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
