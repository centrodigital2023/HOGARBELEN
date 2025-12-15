import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkle, Key, Sun, Heart, Confetti, ArrowRight, Phone, MapPin } from '@phosphor-icons/react';
import Button from '../componentes/ui/botón';
import { Card, CardContent } from '../componentes/ui/tarjeta';
import Input from '../componentes/ui/input';
import Textarea from '../componentes/ui/textarea';
import { toast } from 'sonner';

interface EnhancedHeroSectionProps {
  setPage: (page: string) => void;
}

const EnhancedHeroSection = ({ setPage }: EnhancedHeroSectionProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Solicitud de visita:', formData);
    toast.success('¡Solicitud enviada! Nos pondremos en contacto pronto.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const features = [
    {
      icon: <Sun size={32} weight="fill" className="text-yellow-500" />,
      title: 'Su Espacio, Su Estilo',
      description: 'Espacios agradables, habitación personalizable.'
    },
    {
      icon: <Sun size={32} weight="fill" className="text-orange-500" />,
      title: 'El Mejor Clima, La Mejor Energía',
      description: 'Despierte con el sol de Nariño.'
    },
    {
      icon: <Heart size={32} weight="fill" className="text-red-500" />,
      title: 'Cuidado que Abraza',
      description: 'Personal humano 24/7 con un corazón enorme.'
    },
    {
      icon: <Confetti size={32} weight="fill" className="text-purple-500" />,
      title: 'Cada Día un Motivo para Vivir',
      description: 'Actividades, amigos y momentos felices.'
    }
  ];

  const timeline = [
    {
      year: '2022',
      title: 'Un sueño impulsado por amor',
      description: 'Desde 2022, un sueño impulsado por el amor: crear un hogar donde florece la dignidad.'
    }
  ];

  const services = [
    { title: 'Hospedaje Confortable', description: 'Su espacio para sentirse en casa.' },
    { title: 'Nutrición Deliciosa', description: '5 comidas al día que nutren cuerpo y alma.' },
    { title: 'Personal 24/7', description: 'Cuidado con calidez humana.' },
    { title: 'Acompañamiento Médico', description: 'Sin estrés por las citas.' },
    { title: 'Terapias Vitalizantes', description: 'Movilidad e independencia.' },
    { title: 'Celebración Diaria', description: 'La alegría es nuestra rutina.' },
    { title: 'Espacios terapéuticos', description: 'Conexión con la naturaleza y la creatividad.' },
    { title: 'Apoyo emocional', description: 'Un oído siempre dispuesto a escuchar.' },
    { title: 'Bienestar espiritual', description: 'Paz para el alma.' },
    { title: 'Lavandería incluida', description: 'Olvídese de las preocupaciones.' }
  ];

  return (
    <div className="bg-background">
      {/* Hero Principal */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-blue-50 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2000")',
          }}
        />
        
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
              Encuentre el Lugar Soñado
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-6 leading-relaxed">
              No es una residencia. Es un despertar. Una finca de descanso en el corazón de Buesaco 
              donde la vida no solo continúa, <span className="font-bold text-primary-600">florece</span>.
            </p>
            
            <div className="inline-block bg-yellow-100 border-2 border-yellow-400 rounded-2xl p-6 mb-8">
              <p className="text-lg font-semibold text-yellow-900">
                ⭐ Plazas limitadas para garantizar una experiencia exclusiva. 
                ¿Será su ser querido uno de los afortunados?
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button 
                size="lg" 
                onClick={() => setPage('centro-vida')}
                className="text-lg px-8 py-6"
              >
                Descubra por qué somos diferentes
                <ArrowRight size={20} className="ml-2" weight="bold" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => setPage('pricing')}
                className="text-lg px-8 py-6"
              >
                Ver Planes y Precios
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sección "Aquí usted tiene la llave" */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&q=80&w=800" 
                alt="Residente feliz y empoderada con la llave de su habitación"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Key size={48} weight="fill" className="text-primary-600 mb-4" />
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                "Aquí, usted tiene la llave...
              </h2>
              <p className="text-3xl font-semibold text-primary-600 mb-6">
                ...de su puerta, de su vida."
              </p>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-6 rounded-r-xl">
                <h3 className="text-2xl font-bold text-yellow-900 mb-2">
                  "Modo Vacaciones Permanentes"
                </h3>
                <p className="text-xl text-yellow-800 font-semibold">¡Sí, Existe!</p>
              </div>

              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Esto no es un hogar tradicional. Es un club de vida, una finca de descanso donde la puerta 
                siempre está abierta y cada espacio se amuebla al gusto. Porque la dignidad empieza con la libertad.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Características Destacadas */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Lo Que Nos Hace <span className="text-primary-600">Únicos</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-primary-300">
                  <CardContent className="pt-6 text-center">
                    <div className="mb-4 flex justify-center">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg" 
              onClick={() => setPage('services')}
              className="text-lg px-8 py-6"
            >
              Ver cómo celebramos la vida aquí
              <ArrowRight size={20} className="ml-2" weight="bold" />
            </Button>
          </div>
        </div>
      </section>

      {/* Nuestra Historia */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Nuestra Historia de Amor y Cuidado
            </h2>
          </motion.div>

          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative pl-8 pb-12 border-l-4 border-primary-500"
            >
              <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary-500 border-4 border-white shadow-lg" />
              <div className="bg-primary-50 rounded-xl p-6 shadow-md">
                <span className="text-3xl font-black text-primary-600 mb-2 block">{item.year}</span>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-lg text-gray-700 leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* "Todo Incluido" para una Vida Plena */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              "Todo Incluido" para una Vida Plena
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Nuestra promesa es simple: una vida sin preocupaciones donde cada necesidad está cubierta 
              con amor y profesionalismo. Esto es solo el comienzo de lo que ofrecemos.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-bold mb-2 text-gray-900">
                          {service.title}
                        </h3>
                        <p className="text-gray-600">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg" 
              onClick={() => setPage('services')}
              className="text-lg px-8 py-6"
            >
              Explora todos nuestros servicios en detalle
              <ArrowRight size={20} className="ml-2" weight="bold" />
            </Button>
          </div>
        </div>
      </section>

      {/* Formulario de Contacto */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              ¿Listo para unas <span className="text-primary-600">vacaciones permanentes</span>?
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              Deje de imaginar y venga a vivir la experiencia Hogar Belén. Le invitamos a conocer nuestra 
              familia, nuestros espacios y a tomar un delicioso café de Buesaco sin ningún compromiso.
            </p>
          </motion.div>

          <Card className="shadow-2xl border-2 border-primary-200">
            <CardContent className="pt-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-2 text-gray-900">
                      Nombre
                    </label>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Su nombre completo"
                      className="text-base"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-900">
                      Correo electrónico
                    </label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ejemplo@correo.com"
                      className="text-base"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold mb-2 text-gray-900">
                    Teléfono
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+57 300 123 4567"
                    className="text-base"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2 text-gray-900">
                    Mensaje
                  </label>
                  <Textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Cuéntenos cómo podemos ayudarle..."
                    className="text-base"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full text-lg py-6 font-bold"
                >
                  ¡QUIERO AGENDAR MI VISITA!
                  <Sparkle size={20} className="ml-2" weight="fill" />
                </Button>
              </form>

              <div className="mt-8 pt-8 border-t border-gray-200 grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Phone size={20} className="text-primary-600" weight="bold" />
                  <span>+57 300 123 4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={20} className="text-primary-600" weight="bold" />
                  <span>Buesaco, Nariño, Colombia</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default EnhancedHeroSection;
