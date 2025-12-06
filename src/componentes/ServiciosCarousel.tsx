import { Stethoscope, Activity, User, Heart, Briefcase } from 'lucide-react';

interface ServiciosCarouselProps {
  setPage: (page: string) => void;
}

const ServiciosCarousel = ({ setPage }: ServiciosCarouselProps) => {
  const categories = [
    { 
      id: 'medicos', 
      label: 'Médicos', 
      icon: Stethoscope, 
      description: 'Atención médica especializada en casa.' 
    },
    { 
      id: 'enfermeria', 
      label: 'Enfermería', 
      icon: Activity, 
      description: 'Cuidados clínicos y paliativos.' 
    },
    { 
      id: 'terapia', 
      label: 'Terapia', 
      icon: User, 
      description: 'Rehabilitación física y respiratoria.' 
    },
    { 
      id: 'cuidadores', 
      label: 'Cuidadores', 
      icon: Heart, 
      description: 'Acompañamiento y cuidado diario.' 
    },
    { 
      id: 'otros', 
      label: 'Otros', 
      icon: Briefcase, 
      description: 'Psicología, Nutrición y más.' 
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ofrecemos una amplia gama de servicios especializados para el cuidado 
            integral de adultos mayores en Nariño.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => setPage('dashboard-family')}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer group border border-gray-100"
            >
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <category.icon size={24} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{category.label}</h3>
              <p className="text-sm text-gray-600">{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiciosCarousel;
