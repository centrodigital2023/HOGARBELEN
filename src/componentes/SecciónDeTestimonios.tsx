import { Star } from 'lucide-react';

const SecciónDeTestimonios = () => {
  const testimonials = [
    {
      name: 'María González',
      role: 'Familiar',
      content: 'Gracias a Hogar Belén, mi madre recibe el mejor cuidado. Los profesionales son excelentes y siempre están disponibles.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100'
    },
    {
      name: 'Carlos Ramírez',
      role: 'Familiar',
      content: 'El centro de vida es maravilloso. Mi padre disfruta de las actividades diarias y ha mejorado mucho su ánimo.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100'
    },
    {
      name: 'Ana Martínez',
      role: 'Familiar',
      content: 'La tranquilidad de saber que mi abuela está en buenas manos no tiene precio. El servicio es excepcional.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Lo Que Dicen Nuestras Familias
          </h2>
          <p className="text-lg text-gray-600">
            Testimonios reales de familias que confían en nosotros
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed italic">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecciónDeTestimonios;
