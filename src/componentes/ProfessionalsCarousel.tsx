import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, MessageCircle, ChevronLeft, ChevronRight, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useKV } from '@github/spark/hooks';

interface Professional {
  id: number;
  name: string;
  role: string;
  category: string;
  rating: number;
  reviews: number;
  location: string;
  image: string;
  whatsappNumber: string;
  schedule: string[];
}

interface ProfessionalsCarouselProps {
  setPage: (page: string) => void;
}

const ProfessionalsCarousel = ({ setPage }: ProfessionalsCarouselProps) => {
  const [professionals] = useKV<Professional[]>('registered-professionals', []);
  const [scrollPosition, setScrollPosition] = useState(0);

  const defaultProfessionals: Professional[] = [
    {
      id: 1,
      name: "María Fernanda Rojas",
      role: "Enfermera Jefe (Especialista UCI)",
      category: "Enfermería",
      rating: 5.0,
      reviews: 155,
      location: "Bogotá",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200",
      whatsappNumber: "+573101234567",
      schedule: ['Lun 8-12', 'Mar 2-6', 'Vie 8-4']
    },
    {
      id: 2,
      name: "Laura Sofía Cifuentes",
      role: "Cuidadora Domiciliaria Certificada",
      category: "Cuidadores",
      rating: 5.0,
      reviews: 210,
      location: "Cali",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200",
      whatsappNumber: "+573123456789",
      schedule: ['Lun a Vie 7-7']
    },
    {
      id: 3,
      name: "Dr. Ricardo Poveda",
      role: "Médico Geriatra",
      category: "Médicos",
      rating: 5.0,
      reviews: 121,
      location: "Cali",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200",
      whatsappNumber: "+573167890123",
      schedule: ['Solo Urgencias']
    },
    {
      id: 4,
      name: "Carlos Eduardo Pardo",
      role: "Terapeuta Ocupacional",
      category: "Terapia",
      rating: 4.8,
      reviews: 68,
      location: "Medellín",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200",
      whatsappNumber: "+573156789012",
      schedule: ['Lun a Jue 1-7']
    },
    {
      id: 5,
      name: "Dra. Paula Andrea Vélez",
      role: "Psicóloga Clínica",
      category: "Otros",
      rating: 4.9,
      reviews: 105,
      location: "Medellín",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=200",
      whatsappNumber: "+573190123456",
      schedule: ['Mar, Jue 2-7p.m.']
    }
  ];

  const displayProfessionals = (professionals && professionals.length > 0) ? professionals : defaultProfessionals;

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('professionals-scroll-container');
    if (container) {
      const scrollAmount = 320;
      const newPosition = direction === 'left' 
        ? Math.max(0, scrollPosition - scrollAmount)
        : Math.min(container.scrollWidth - container.clientWidth, scrollPosition + scrollAmount);
      
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  const contactViaWhatsApp = (pro: Professional) => {
    const number = pro.whatsappNumber.replace(/[^0-9+]/g, '');
    const message = encodeURIComponent(`Hola ${pro.name}, vi tu perfil en Hogar Belén y me gustaría conocer más sobre tus servicios como ${pro.role}.`);
    window.open(`https://wa.me/${number}?text=${message}`, '_blank');
  };

  return (
    <section className="py-16 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <UserCheck className="w-10 h-10 text-indigo-600 mr-3" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Profesionales <span className="text-indigo-600">Disponibles</span>
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Conozca a nuestros especialistas verificados listos para brindar cuidado de excelencia
          </p>
        </motion.div>

        <div className="relative">
          {/* Botón Izquierdo */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl rounded-full p-3 hover:bg-gray-50 transition-all duration-200 hover:scale-110 hidden md:block"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-indigo-600" />
          </button>

          {/* Contenedor Scrolleable */}
          <div
            id="professionals-scroll-container"
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {displayProfessionals.map((pro, index) => (
              <motion.div
                key={pro.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-[300px]"
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 border-2 hover:border-indigo-300 overflow-hidden">
                  <CardContent className="p-6">
                    {/* Imagen y Nombre */}
                    <div className="flex items-start mb-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-indigo-200 flex-shrink-0 mr-3">
                        <img 
                          src={pro.image} 
                          alt={pro.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200";
                          }}
                        />
                      </div>
                      <div className="flex-grow min-w-0">
                        <h3 className="text-lg font-bold text-gray-900 truncate">{pro.name}</h3>
                        <p className="text-sm text-indigo-600 font-medium line-clamp-2">{pro.role}</p>
                      </div>
                    </div>

                    {/* Rating y Ubicación */}
                    <div className="flex items-center text-xs text-gray-600 mb-3">
                      <Star className="w-3.5 h-3.5 mr-1 text-yellow-500 fill-yellow-500" />
                      <span className="font-bold text-gray-800 mr-2">{pro.rating}</span>
                      <span className="mr-2">({pro.reviews})</span>
                      <MapPin className="w-3.5 h-3.5 mr-1" />
                      <span>{pro.location}</span>
                    </div>

                    {/* Categoría */}
                    <Badge className="mb-4 bg-indigo-100 text-indigo-700 border-indigo-200">
                      {pro.category}
                    </Badge>

                    {/* Botón de Contacto */}
                    <Button
                      onClick={() => contactViaWhatsApp(pro)}
                      className="w-full bg-green-500 hover:bg-green-600 text-white"
                      size="sm"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Contactar
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Botón Derecho */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl rounded-full p-3 hover:bg-gray-50 transition-all duration-200 hover:scale-110 hidden md:block"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-indigo-600" />
          </button>
        </div>

        {/* Botón Ver Todos */}
        <div className="text-center mt-8">
          <Button
            size="lg"
            onClick={() => setPage('profesionales-servicios')}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            Ver Todos los Profesionales
          </Button>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default ProfessionalsCarousel;
