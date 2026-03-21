import { Heart, Users, Shield, Brain, Sparkles, ArrowRight, Home as HomeIcon, Stethoscope, Clock, Video, FileText, Bell, Music, Utensils, Sprout, Activity, Star, CheckCircle, Key, Sun, PartyPopper, Trees, Coffee, Smile, Building } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import OptimizedImage from '../components/OptimizedImage';

interface HomePageProps {
  setPage: (page: string) => void;
}

export default function HomePage({ setPage }: HomePageProps) {
  return (
    <div>
      <HeroSection setPage={setPage} />
      <KeyMessageSection setPage={setPage} />
      <VacacionesPermanentesSection setPage={setPage} />
      <HistoriaSection />
      <TodoIncluidoSection setPage={setPage} />
      <PromiseSection />
      <ServicesCarousel setPage={setPage} />
      <ValueProposition />
      <TrustSection />
      <TestimonialsSection />
      <CTASection setPage={setPage} />
      <InspirationalCarousel />
    </div>
  );
}

function HeroSection({ setPage }: { setPage: (page: string) => void }) {
  return (
    <div className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, currentColor 35px, currentColor 36px)`,
      }} />
      
      <div className="container-custom grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-6 bg-gradient-ai text-white border-0 px-4 py-1.5">
            <Sparkles size={14} className="inline mr-1.5" />
            Tecnología IA Integrada
          </Badge>

          <h1 className="heading-xl mb-6 text-balance bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            Un Hogar Donde la Vida Florece
          </h1>

          <p className="text-xl md:text-2xl mb-8 leading-relaxed text-muted-foreground max-w-xl">
            Centro de vida para adultos mayores en Buesaco, Nariño. Cuidado profesional, calidez familiar y vida activa.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button
              onClick={() => setPage('pricing')}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover-lift"
            >
              Ver Planes
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button
              onClick={() => setPage('ai-assistant')}
              size="lg"
              variant="outline"
              className="border-2 px-8 py-6 text-lg font-semibold rounded-xl hover:bg-muted"
            >
              <Brain className="mr-2" size={20} />
              Asistente IA
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
            {[
              { value: '24/7', label: 'Atención' },
              { value: '100%', label: 'Verificados' },
              { value: '5★', label: 'Calificación' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              {[
                { icon: Users, title: 'Centro de Día', desc: 'Actividades diarias enriquecedoras' },
                { icon: Heart, title: 'Cuidado en Casa', desc: 'Profesionales a domicilio' },
              ].map((item, i) => (
                <div key={i} className="glass-effect rounded-2xl p-6 border border-border/50 hover-lift">
                  <item.icon className="w-10 h-10 mb-4 text-primary" />
                  <h3 className="font-bold text-lg mb-2 text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="space-y-4 mt-8">
              {[
                { icon: Shield, title: 'Seguridad 24/7', desc: 'Monitoreo constante' },
                { icon: Brain, title: 'IA Predictiva', desc: 'Cuidado inteligente' },
              ].map((item, i) => (
                <div key={i} className="glass-effect rounded-2xl p-6 border border-border/50 hover-lift">
                  <item.icon className="w-10 h-10 mb-4 text-primary" />
                  <h3 className="font-bold text-lg mb-2 text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function PromiseSection() {
  const promises = [
    {
      icon: Heart,
      title: 'Atención Personalizada',
      description: 'Cada residente recibe un plan de cuidado individualizado que respeta sus necesidades, preferencias y ritmo de vida.',
    },
    {
      icon: HomeIcon,
      title: 'Ambiente Familiar',
      description: 'Creemos en el poder de las relaciones significativas. Nuestro equipo se convierte en una extensión de la familia.',
    },
    {
      icon: Sprout,
      title: 'Actividades Enriquecedoras',
      description: 'Desde huertas terapéuticas hasta clases de música, ofrecemos actividades que nutren cuerpo, mente y espíritu.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nuestra <span className="text-primary">Promesa</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            En Hogar Belén, no solo cuidamos, creamos un entorno donde cada residente puede florecer, 
            encontrar propósito y disfrutar de una vida plena y significativa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {promises.map((promise, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-xl bg-muted border border-border hover:shadow-lg transition-all duration-300 text-center group hover:bg-white"
            >
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <promise.icon size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{promise.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{promise.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesCarousel({ setPage }: { setPage: (page: string) => void }) {
  const [activeCategory, setActiveCategory] = useState('centro-vida');

  const categories = [
    {
      id: 'centro-vida',
      label: 'Centro de Vida',
      icon: HomeIcon,
      description: 'Servicios diurnos integrales en nuestras instalaciones',
      services: [
        { name: 'Actividades Terapéuticas', description: 'Talleres de memoria, musicoterapia, arteterapia', icon: Music },
        { name: 'Alimentación Balanceada', description: 'Plan nutricional supervisado', icon: Utensils },
        { name: 'Huerta Terapéutica', description: 'Terapia ocupacional con cultivo', icon: Sprout },
        { name: 'Ejercicio Guiado', description: 'Rutinas adaptadas', icon: Activity },
      ],
    },
    {
      id: 'profesionales',
      label: 'Profesionales a Domicilio',
      icon: Stethoscope,
      description: 'Red de especialistas disponibles para cuidado en casa',
      services: [
        { name: 'Médicos Geriatras', description: 'Consultas a domicilio', icon: Stethoscope },
        { name: 'Enfermería Especializada', description: 'Cuidados clínicos', icon: Activity },
        { name: 'Terapeutas', description: 'Fisioterapia y terapia ocupacional', icon: Heart },
        { name: 'Cuidadores Certificados', description: 'Acompañamiento personalizado', icon: Users },
      ],
    },
  ];

  const activeCategoryData = categories.find((cat) => cat.id === activeCategory);

  return (
    <section className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Servicios Integrados</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Combinamos la excelencia del cuidado presencial en nuestro centro con la comodidad del servicio a domicilio.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-white text-foreground hover:bg-muted border border-border'
              }`}
            >
              <category.icon size={20} />
              {category.label}
            </button>
          ))}
        </div>

        {activeCategoryData && (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{activeCategoryData.label}</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">{activeCategoryData.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {activeCategoryData.services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <service.icon size={24} />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{service.name}</h4>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button onClick={() => setPage('services')} size="lg">
                Ver Todos los Servicios
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function ValueProposition() {
  const features = [
    { icon: Video, title: 'Gestión Centralizada', description: 'Coordina citas, actividades y cuidados desde una plataforma' },
    { icon: Clock, title: 'Conexión en Tiempo Real', description: 'Actualizaciones instantáneas entre familiares y profesionales' },
    { icon: FileText, title: 'Expediente Digital', description: 'Historial médico completo accesible 24/7' },
    { icon: Bell, title: 'Alertas Inteligentes', description: 'Notificaciones proactivas sobre medicamentos y salud' },
    { icon: Shield, title: 'Monitoreo 24/7', description: 'Seguimiento continuo con reportes automáticos' },
    { icon: Users, title: 'Red Colaborativa', description: 'Profesionales trabajando en equipo' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Todo en <span className="text-primary">Una Plataforma</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Integramos los servicios del centro de vida con la red de profesionales y el acompañamiento familiar 
            en un ecosistema inteligente y conectado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-muted/50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group hover:bg-white border border-transparent hover:border-border"
            >
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  const trustPoints = [
    { icon: Shield, title: 'Verificación Rigurosa', desc: 'Validamos antecedentes y títulos de cada profesional' },
    { icon: Star, title: 'Calidad Garantizada', desc: 'Sistema de reseñas transparente basado en servicios reales' },
    { icon: Heart, title: 'Cuidado Compasivo', desc: 'Profesionales seleccionados por su experiencia y empatía' },
  ];

  return (
    <section className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Por qué confiar en Hogar Belén</h2>
          <p className="text-muted-foreground">Seguridad y calidad en cada conexión</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {trustPoints.map((item, i) => (
            <div key={i} className="p-6 rounded-xl bg-white border border-border hover:shadow-md transition-all text-center">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <item.icon size={24} />
              </div>
              <h3 className="font-bold text-xl mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sofía E.',
      title: 'El Jardín de Papá',
      text: 'En Pasto, mi papá se estaba apagando en su apartamento. Hoy, a sus 82, su mayor emoción es mostrarme los tomates que cultiva en la huerta de Hogar Belén.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150',
    },
    {
      name: 'Carlos R.',
      title: 'La Paz Mental',
      text: 'Vivo fuera de Nariño y cada llamada era una angustia. Ahora, sé que mi madre está segura, feliz y acompañada 24/7.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Voces que Inspiran Confianza</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Más que palabras, son historias reales de amor y tranquilidad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="bg-muted/50 rounded-xl shadow-sm border border-border overflow-hidden hover:shadow-lg transition-all">
              <div className="p-8">
                <div className="flex gap-4 items-start mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{testimonial.title}</h3>
                    <div className="flex my-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground italic mb-4">&ldquo;{testimonial.text}&rdquo;</p>
                <p className="font-bold text-primary text-lg">{testimonial.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InspirationalCarousel() {
  const quotes = [
    { text: 'El arte de la medicina consiste en entretener al paciente mientras la naturaleza cura la enfermedad.', author: 'Voltaire' },
    { text: 'Cuidar es la esencia de la enfermería y el corazón del sistema de salud.', author: 'Anónimo' },
  ];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIdx((i) => (i + 1) % quotes.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gray-900 text-white py-16 text-center px-4">
      <div className="max-w-4xl mx-auto">
        <Heart className="w-12 h-12 text-primary mx-auto mb-6" />
        <h3 className="text-2xl md:text-3xl font-serif italic mb-4">
          &ldquo;{quotes[idx].text}&rdquo;
        </h3>
        <p className="text-primary font-bold">— {quotes[idx].author}</p>
      </div>
    </div>
  );
}

function KeyMessageSection({ setPage }: { setPage: (page: string) => void }) {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative"
        >
          <OptimizedImage
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600"
            alt="Residente feliz con llave"
            width={600}
            height={600}
            className="w-64 h-64 object-cover rounded-full mx-auto mb-8 shadow-2xl border-8 border-white"
          />
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            &ldquo;Aquí, usted tiene la llave...
          </h2>
          <p className="text-3xl md:text-4xl font-light text-primary mb-8">
            ...de su puerta, de su vida.&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function VacacionesPermanentesSection({ setPage }: { setPage: (page: string) => void }) {
  const features = [
    {
      icon: HomeIcon,
      title: 'Su Espacio, Su Estilo',
      description: 'Espacios agradables, habitación personalizable.',
    },
    {
      icon: Sun,
      title: 'El Mejor Clima, La Mejor Energía',
      description: 'Despierte con el sol de Nariño.',
    },
    {
      icon: Heart,
      title: 'Cuidado que Abraza',
      description: 'Personal humano 24/7 con un corazón enorme.',
    },
    {
      icon: PartyPopper,
      title: 'Cada Día un Motivo para Vivir',
      description: 'Actividades, amigos y momentos felices.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-accent text-accent-foreground text-lg px-6 py-2">
            <PartyPopper className="inline mr-2" size={20} />
            &ldquo;Modo Vacaciones Permanentes&rdquo; ¡Sí, Existe!
          </Badge>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Esto no es un hogar tradicional. Es un club de vida, una finca de descanso donde la puerta siempre está abierta 
            y cada espacio se amuebla al gusto. Porque la dignidad empieza con la libertad.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-border hover:shadow-lg transition-all"
            >
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6">
                <feature.icon size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button onClick={() => setPage('services')} size="lg" className="px-8 py-4 text-lg">
            Ver cómo celebramos la vida aquí
          </Button>
        </div>
      </div>
    </section>
  );
}

function HistoriaSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Nuestra Historia de Amor y Cuidado
          </h2>
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="text-6xl font-bold text-primary">2022</div>
            <div className="h-24 w-1 bg-primary"></div>
            <div className="text-left max-w-md">
              <h3 className="text-2xl font-bold mb-2">Un sueño impulsado por amor</h3>
              <p className="text-lg text-muted-foreground">
                Desde 2022, un sueño impulsado por el amor: crear un hogar donde florece la dignidad.
              </p>
            </div>
          </div>
          <OptimizedImage
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200"
            alt="Historia Hogar Belén"
            width={1200}
            height={800}
            className="rounded-2xl shadow-2xl mx-auto max-w-3xl w-full"
          />
        </motion.div>
      </div>
    </section>
  );
}

function TodoIncluidoSection({ setPage }: { setPage: (page: string) => void }) {
  const services = [
    { icon: HomeIcon, title: 'Hospedaje Confortable', description: 'Su espacio para sentirse en casa.' },
    { icon: Utensils, title: 'Nutrición Deliciosa', description: '5 comidas al día que nutren cuerpo y alma.' },
    { icon: Users, title: 'Personal 24/7', description: 'Cuidado con calidez humana.' },
    { icon: Stethoscope, title: 'Acompañamiento Médico', description: 'Sin estrés por las citas.' },
    { icon: Activity, title: 'Terapias Vitalizantes', description: 'Movilidad e independencia.' },
    { icon: PartyPopper, title: 'Celebración Diaria', description: 'La alegría es nuestra rutina.' },
    { icon: Trees, title: 'Espacios terapéuticos', description: 'Conexión con la naturaleza y la creatividad.' },
    { icon: Heart, title: 'Apoyo emocional', description: 'Un oído siempre dispuesto a escuchar.' },
    { icon: Sparkles, title: 'Bienestar espiritual', description: 'Paz para el alma.' },
    { icon: CheckCircle, title: 'Lavandería incluida', description: 'Olvídese de las preocupaciones.' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            &ldquo;Todo Incluido&rdquo; para una Vida Plena
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Nuestra promesa es simple: una vida sin preocupaciones donde cada necesidad está cubierta con amor y profesionalismo. 
            Esto es solo el comienzo de lo que ofrecemos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-muted/50 to-background border border-border hover:shadow-lg transition-all group"
            >
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <service.icon size={28} />
              </div>
              <h3 className="font-bold text-lg mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button onClick={() => setPage('services')} size="lg" className="px-8 py-4 text-lg">
            Explora todos nuestros servicios en detalle
          </Button>
        </div>
      </div>
    </section>
  );
}

function CTASection({ setPage }: { setPage: (page: string) => void }) {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-accent"></div>
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}></div>
      
      <div className="container-custom text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm text-base px-6 py-2">
            <Sparkles size={16} className="inline mr-2" />
            Visita sin compromiso
          </Badge>
          
          <h2 className="heading-xl text-white mb-8 text-balance">
            ¿Listo para unas vacaciones permanentes?
          </h2>
          
          <p className="text-xl md:text-2xl text-white/95 mb-12 leading-relaxed max-w-3xl mx-auto">
            Deje de imaginar y venga a vivir la experiencia Hogar Belén. Le invitamos a conocer nuestra familia, 
            nuestros espacios y a tomar un delicioso café de Buesaco.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setPage('contact')}
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 px-10 py-7 text-xl font-bold shadow-2xl rounded-xl hover-lift"
            >
              ¡Agendar Mi Visita!
              <ArrowRight className="ml-2" size={24} />
            </Button>
            <Button
              onClick={() => setPage('pricing')}
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 px-10 py-7 text-xl font-semibold rounded-xl backdrop-blur-sm"
            >
              Ver Planes
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

