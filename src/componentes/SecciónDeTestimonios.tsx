import { Star, Quotes } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

const SecciónDeTestimonios = () => {
  const testimonials = [
    {
      name: 'Sofía E.',
      title: 'El Jardín de Papá',
      content: 'En Pasto, mi papá se estaba apagando en su apartamento. Hoy, a sus 82, su mayor emoción es mostrarme los tomates que cultivan en la huerta de Hogar Belén. No solo recuperó una pasión, recuperó la vida.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150'
    },
    {
      name: 'Carlos R.',
      title: 'La Paz Mental',
      content: 'Vivo fuera de Nariño y cada llamada era una angustia. Ahora, sé que mi madre está segura, feliz y acompañada 24/7 en Hogar Belén. Esa tranquilidad no tiene precio.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150'
    },
    {
      name: 'Valentina M.',
      title: 'La Nueva Familia de la Abuela',
      content: 'Mi abuela juró que nunca iría a una residencia. Hoy, llama a las cuidadoras "mis niñas" y tiene un "club de parqués". Encontró una nueva familia, y nosotros, una inmensa paz.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150'
    },
    {
      name: 'Jorge I.',
      title: 'El sol que sana',
      content: 'El frío de Pasto era un martirio para la artritis de mi esposa. El clima cálido de Buesaco en Hogar Belén fue la mejor medicina. Volvió a sonreír sin dolor.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
    },
    {
      name: 'Andrea R.',
      title: 'Ángeles Guardianes',
      content: 'Después de una caída de mi tío, necesitábamos cuidado profesional. Encontramos algo mejor: ángeles guardianes que conocen su medicación, sus chistes y su historia.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
    },
    {
      name: 'Alicia S.',
      title: 'Mi decisión, mi libertad',
      subtitle: '(Residente)',
      content: 'Mis hijos se preocupaban por mí, sola. Yo elegí Hogar Belén. Tengo mi espacio, mis llaves y una comunidad. No fue una renuncia, fue mi acto de libertad más grande.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150'
    },
    {
      name: 'David P.',
      title: 'Recuperó la Chispa',
      content: 'Mi padre era un hombre de pocas palabras. Ahora, en las videollamadas, no para de contarme sobre las clases de música y los nuevos amigos que ha hecho. ¡Recuperó la chispa!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150'
    },
    {
      name: 'Laura G.',
      title: 'Confianza Absoluta',
      content: 'La comunicación con el equipo es constante y transparente. Me mantienen informada sobre la salud y el bienestar de mi tía, lo que me da una confianza absoluta a pesar de la distancia.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'
    },
    {
      name: 'Roberto V.',
      title: 'Más que Cuidado, es Cariño',
      content: 'Vine a visitar a mi hermana y la encontré riendo a carcajadas con una de las cuidadoras. Aquí no solo la cuidan, la quieren de verdad. Eso se nota en cada detalle.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=150'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Voces que Inspiran <span className="text-primary-600">Confianza</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Más que palabras, son historias reales de amor y tranquilidad. Descubra por qué Hogar Belén 
            se ha convertido en el hogar de sus seres queridos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary-200"
            >
              <div className="flex items-start gap-4 mb-4">
                <img 
                  src={testimonial.image} 
                  alt={`Foto de ${testimonial.name}`}
                  className="w-16 h-16 rounded-full object-cover border-4 border-primary-100"
                />
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-primary-600 mb-1">{testimonial.title}</h4>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  {testimonial.subtitle && (
                    <p className="text-sm text-gray-500 italic">{testimonial.subtitle}</p>
                  )}
                </div>
                <Quotes size={32} weight="fill" className="text-primary-200 flex-shrink-0" />
              </div>
              
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} weight="fill" className="text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed">
                "{testimonial.content}"
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="px-8 py-4 bg-primary-600 text-white text-lg font-semibold rounded-xl hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl">
            Ver más testimonios
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default SecciónDeTestimonios;
