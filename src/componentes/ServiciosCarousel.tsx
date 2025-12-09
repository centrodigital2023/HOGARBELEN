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
      description: 'Atención médica especializada en casa.',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop'
    },
    { 
      id: 'enfermeria', 
      label: 'Enfermería', 
      icon: Activity, 
      description: 'Cuidados clínicos y paliativos.',
      image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400&auto=format&fit=crop'
    },
    { 
      id: 'terapia', 
      label: 'Terapia', 
      icon: User, 
      description: 'Rehabilitación física y respiratoria.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&auto=format&fit=crop'
    },
    { 
      id: 'cuidadores', 
      label: 'Cuidadores', 
      icon: Heart, 
      description: 'Acompañamiento y cuidado diario.',
      image: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=400&auto=format&fit=crop'
    },
    { 
      id: 'otros', 
      label: 'Otros', 
      icon: Briefcase, 
      description: 'Psicología, Nutrición y más.',
      image: 'https://images.unsplash.com/photo-1551135049-8a33b5883817?w=400&auto=format&fit=crop'
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
              onClick={() => setPage('services')}
              className="relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer group border border-gray-100 overflow-hidden"
            >
              <div className="relative h-40 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="w-10 h-10 bg-white/90 text-primary-600 rounded-lg flex items-center justify-center mb-2">
                    <category.icon size={20} />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-2">{category.label}</h3>
                <p className="text-sm text-gray-600">{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiciosCarousel;
