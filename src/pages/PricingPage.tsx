import { useState } from 'react';
import { Check, Home, Users, Shield, CreditCard, Zap, Heart, Utensils, Stethoscope, Activity, PartyPopper, Trees, Sparkles, Clock, Bell, Calendar, FileText, Phone, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import PaymentModal from '../components/PaymentModal';
import PlanComparison from '../components/PlanComparison';
import PublicPromoCodes from '../components/PublicPromoCodes';
import { useAuth } from '../contextos/SupabaseAuthContext';
import { motion } from 'framer-motion';

interface PricingPageProps {
  setPage: (page: string) => void;
}

export default function PricingPage({ setPage }: PricingPageProps) {
  const { user } = useAuth();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  const centroVidaPlans = [
    {
      name: 'Convivir y Florecer',
      price: '$1.850.000',
      period: '/mes (Todo Incluido)',
      description: 'Ideal para quienes encuentran alegría en la compañía',
      subtitle: 'Habitación compartida (dos personas) con todo el confort',
      icon: Users,
      popular: false,
      isPaid: true,
      type: 'centro-vida',
      features: [
        'Atención profesional 24/7',
        'Nutrición Completa (5 comidas diarias)',
        'Hospedaje Confortable',
        'Terapias y Actividades',
        'Comunidad y Eventos',
        'Acompañamiento Médico',
        'Bienestar Espiritual y Emocional',
        'Comodidad Total (Lavandería)',
      ],
    },
    {
      name: 'Privacidad y Armonía',
      price: '$2.250.000',
      period: '/mes (Todo Incluido)',
      description: 'Su propio santuario personal',
      subtitle: 'Habitación individual para crear un espacio íntimo y único',
      icon: Home,
      popular: true,
      isPaid: true,
      type: 'centro-vida',
      features: [
        'Atención profesional 24/7',
        'Nutrición Completa (5 comidas diarias)',
        'Hospedaje Confortable',
        'Terapias y Actividades',
        'Comunidad y Eventos',
        'Acompañamiento Médico',
        'Bienestar Espiritual y Emocional',
        'Comodidad Total (Lavandería)',
      ],
    },
  ];

  const carePlans = [
    {
      name: 'Básico',
      price: 'Gratis',
      period: '',
      description: 'Para familias que necesitan cuidado ocasional',
      icon: Home,
      popular: false,
      isPaid: false,
      type: 'care',
      features: [
        'Acceso a profesionales verificados',
        'Contacto directo por WhatsApp',
        'Disponibilidad en tiempo real',
        'Hasta 3 contactos mensuales',
      ],
    },
    {
      name: 'Premium',
      price: '$20.000',
      period: '/mes',
      description: 'Para cuidado regular y seguimiento',
      icon: Heart,
      popular: true,
      isPaid: true,
      type: 'care',
      features: [
        'Todo en Básico',
        'Contactos ilimitados',
        'Validación IA avanzada',
        'Historial de profesionales',
        'Soporte prioritario',
        'Recordatorios automáticos',
        'Agenda de citas integrada',
        'Notificaciones personalizadas',
      ],
    },
    {
      name: 'Empresarial',
      price: 'Personalizado',
      period: '',
      description: 'Para instituciones y empresas',
      icon: Shield,
      popular: false,
      isPaid: false,
      type: 'care',
      features: [
        'Todo en Premium',
        'Dashboard administrativo',
        'Múltiples usuarios',
        'API integración',
        'Soporte dedicado 24/7',
        'Reportes personalizados',
        'Facturación centralizada',
        'Capacitación del equipo',
        'Gestor de cuenta dedicado',
      ],
    },
  ];

  const handleSelectPlan = (plan: any) => {
    if (!user) {
      setPage('login');
      return;
    }

    if (plan.isPaid && plan.price !== 'Personalizado') {
      setSelectedPlan(plan);
      setShowPaymentModal(true);
    } else if (plan.price === 'Personalizado') {
      setPage('contact');
    } else {
      setPage('register');
    }
  };

  const handleSelectPlanByName = (planName: string) => {
    const allPlans = [...centroVidaPlans, ...carePlans];
    const plan = allPlans.find(p => p.name === planName);
    if (plan) {
      handleSelectPlan(plan);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-primary-50/30 to-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-background">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-primary text-primary-foreground text-lg px-6 py-2">
              <Sparkles className="inline mr-2" size={20} />
              Transparencia Total
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Invierta en Felicidad: Planes Transparentes para una Vida Plena
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Un refugio de paz y alegría, diseñado para que sus seres queridos vivan plenamente cada día. 
              La tranquilidad que busca, a un precio justo.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto text-center space-y-6 mb-12"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-4">Descubra su Nuevo Hogar</h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                La tranquilidad de saber que sus seres queridos están bien no tiene precio. 
                Nuestro cuidado integral la hace posible.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                Entendemos que esta es una de las decisiones más importantes de su vida, una decisión que nace del amor. 
                Por eso, hemos diseñado nuestros planes para ser completamente transparentes, integrales y, sobre todo, justos. 
                Aquí, usted no invierte en un servicio; invierte en la felicidad diaria, la seguridad constante y la paz mental 
                que su familia merece.
              </p>
            </div>
          </motion.div>

          {/* Visual Gallery Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl group">
              <img
                src="https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=800&q=80"
                alt="Adulto mayor en actividad grupal"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <p className="text-white font-semibold p-4">Actividades Recreativas Diarias</p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl group">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"
                alt="Cuidado profesional"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <p className="text-white font-semibold p-4">Atención Profesional 24/7</p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl group">
              <img
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80"
                alt="Jardines y naturaleza"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <p className="text-white font-semibold p-4">Conexión con la Naturaleza</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tabs for Plan Categories */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Tabs defaultValue="centro-vida" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
              <TabsTrigger value="centro-vida" className="text-lg">
                <Home className="w-5 h-5 mr-2" />
                Centro Vida
              </TabsTrigger>
              <TabsTrigger value="care-plans" className="text-lg">
                <Heart className="w-5 h-5 mr-2" />
                Cuidado en Casa
              </TabsTrigger>
            </TabsList>

            {/* Centro Vida Plans */}
            <TabsContent value="centro-vida">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Nuestros Planes: Un Hogar para Cada Sueño
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Recibimos con los brazos abiertos a personas maravillosas desde los 50 hasta los 100 años.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
                {centroVidaPlans.map((plan, index) => (
                  <Card
                    key={index}
                    className={`relative transition-all duration-300 hover:shadow-2xl ${
                      plan.popular ? 'border-primary border-2 scale-105' : ''
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-accent text-accent-foreground px-6 py-2 text-sm font-bold">
                          Más populares
                        </Badge>
                      </div>
                    )}

                    <CardHeader className="text-center pb-8">
                      <div className="w-20 h-20 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <plan.icon size={40} />
                      </div>
                      <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                      <CardDescription className="text-base font-medium">{plan.description}</CardDescription>
                      <p className="text-sm text-muted-foreground mt-2">{plan.subtitle}</p>
                      <div className="mt-6">
                        <span className="text-4xl md:text-5xl font-bold text-gray-900">{plan.price}</span>
                        {plan.period && <div className="text-muted-foreground mt-2 text-sm">{plan.period}</div>}
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-3 px-8">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </CardContent>

                    <CardFooter className="pt-8">
                      <Button
                        className="w-full"
                        size="lg"
                        variant={plan.popular ? 'default' : 'outline'}
                        onClick={() => handleSelectPlan(plan)}
                      >
                        {plan.popular && <Sparkles className="w-4 h-4 mr-2" />}
                        Seleccionar plan
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {/* Centro Vida Additional Info */}
              <div className="max-w-5xl mx-auto mb-16">
                <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-2xl md:text-3xl font-bold mb-4">
                      Sin sorpresas. Solo cuidado, comodidad y felicidad.
                    </CardTitle>
                    <CardDescription className="text-base text-gray-700 max-w-3xl mx-auto">
                      Cada plan en Hogar Belén es una promesa de cuidado integral. Esto es lo que siempre está incluido:
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {[
                        { icon: Clock, label: 'Atención profesional 24/7' },
                        { icon: Utensils, label: 'Nutrición Completa' },
                        { icon: Home, label: 'Hospedaje Confortable' },
                        { icon: Activity, label: 'Terapias y Actividades' },
                        { icon: Users, label: 'Comunidad y Eventos' },
                        { icon: Stethoscope, label: 'Acompañamiento Médico' },
                        { icon: Heart, label: 'Bienestar Espiritual y Emocional' },
                        { icon: Sparkles, label: 'Comodidad Total (Lavandería)' },
                      ].map((item, i) => (
                        <div key={i} className="text-center">
                          <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-3">
                            <item.icon size={24} />
                          </div>
                          <p className="text-sm font-medium text-gray-700">{item.label}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Proceso de Ingreso */}
              <div className="max-w-5xl mx-auto mb-16">
                <h3 className="text-3xl font-bold text-center mb-8">
                  Empezar a florecer en Hogar Belén es así de sencillo
                </h3>
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      step: '1',
                      title: 'Una Conversación de Corazón a Corazón',
                      description:
                        'Todo comienza con una visita a nuestra finca para que sienta la calidez, conozca a nuestra familia y resolvamos todas sus dudas.',
                      icon: Heart,
                    },
                    {
                      step: '2',
                      title: 'Entendiendo su Historia',
                      description:
                        'Solo necesitamos su documento de identidad y su historia clínica para personalizar nuestro apoyo desde el primer día.',
                      icon: FileText,
                    },
                    {
                      step: '3',
                      title: 'El Acuerdo de Confianza',
                      description:
                        'Formalizamos nuestro compromiso a través de un contrato flexible y sin cláusulas de permanencia. Su tranquilidad es nuestro único compromiso.',
                      icon: CheckCircle,
                    },
                  ].map((step, index) => (
                    <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                          {step.step}
                        </div>
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                          <step.icon size={24} />
                        </div>
                        <CardTitle className="text-xl mb-3">{step.title}</CardTitle>
                        <CardDescription className="text-base leading-relaxed">{step.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Personalization CTA */}
              <div className="max-w-3xl mx-auto text-center">
                <Card className="bg-gradient-to-br from-primary to-primary-600 text-primary-foreground">
                  <CardContent className="pt-8 pb-8">
                    <Phone className="w-12 h-12 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-4">¿Necesita algo diferente?</h3>
                    <p className="mb-6 text-primary-foreground/90 leading-relaxed">
                      Entendemos que cada familia es única. Si nuestros planes no se ajustan perfectamente a sus necesidades, 
                      hablemos. Estamos comprometidos a encontrar una solución personalizada.
                    </p>
                    <Button size="lg" variant="secondary" onClick={() => setPage('contact')}>
                      Contactar Ahora
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Care Plans */}
            <TabsContent value="care-plans">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Plan Dulce Hogar - Cuidado en Casa
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Cuidado profesional sin salir del hogar. Respeto por la rutina, la independencia y el entorno familiar.
                </p>
              </div>

              {/* Dulce Hogar Description */}
              <div className="max-w-4xl mx-auto mb-12">
                <Card className="bg-gradient-to-br from-primary-50 to-white">
                  <CardContent className="pt-8 pb-8">
                    <div className="flex items-center gap-3 mb-6">
                      <Home className="w-12 h-12 text-primary" />
                      <div>
                        <h3 className="text-2xl font-bold">Cuidado experto en su propio espacio</h3>
                        <p className="text-muted-foreground">Llevamos el cuidado profesional a la comodidad de su hogar</p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      {[
                        { icon: CheckCircle, text: 'Cuidadores certificados y verificados' },
                        { icon: Clock, text: 'Horarios flexibles (por horas o tiempo completo)' },
                        { icon: Stethoscope, text: 'Seguimiento médico' },
                        { icon: Activity, text: 'Apoyo en actividades diarias' },
                        { icon: Heart, text: 'Compañía emocional y bienestar integral' },
                        { icon: Bell, text: 'Comunicación directa y segura' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center flex-shrink-0">
                            <item.icon size={20} />
                          </div>
                          <span className="text-sm font-medium">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Planes de Acceso a Profesionales
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Desde uso personal hasta soluciones empresariales completas
                </p>
              </div>

              <PublicPromoCodes />

              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
                {carePlans.map((plan, index) => (
                  <Card
                    key={index}
                    className={`relative transition-all duration-300 hover:shadow-xl ${
                      plan.popular ? 'border-primary border-2 scale-105' : ''
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-primary text-primary-foreground px-4 py-2">
                          Más Popular
                        </Badge>
                      </div>
                    )}

                    <CardHeader className="text-center pb-8">
                      <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <plan.icon size={32} />
                      </div>
                      <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                      <div className="mt-4">
                        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                        {plan.period && <span className="text-muted-foreground ml-2">{plan.period}</span>}
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </CardContent>

                    <CardFooter>
                      <Button
                        className="w-full"
                        variant={plan.popular ? 'default' : 'outline'}
                        onClick={() => handleSelectPlan(plan)}
                      >
                        {plan.isPaid && plan.price !== 'Personalizado' && (
                          <CreditCard className="w-4 h-4 mr-2" />
                        )}
                        {plan.popular && <Zap className="w-4 h-4 mr-2" />}
                        {plan.price === 'Gratis'
                          ? 'Comenzar Gratis'
                          : plan.price === 'Personalizado'
                          ? 'Contactar con un Asesor'
                          : 'Suscribirse Ahora'}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {/* FAQ or CTA */}
              <div className="max-w-3xl mx-auto text-center mb-12">
                <Card>
                  <CardContent className="pt-8 pb-8">
                    <h3 className="text-2xl font-bold mb-4">¿Necesitas ayuda para elegir?</h3>
                    <p className="text-muted-foreground mb-6">
                      Nuestro equipo está disponible para ayudarte a encontrar el plan perfecto para tus necesidades.
                    </p>
                    <Button size="lg" onClick={() => setPage('contact')}>
                      Contactar con un Asesor
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Info Section */}
              <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 mb-12">
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <Shield className="w-12 h-12 text-primary mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Pagos Seguros</h4>
                    <p className="text-sm text-muted-foreground">
                      Encriptación SSL de nivel bancario
                    </p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <CreditCard className="w-12 h-12 text-primary mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Sin Compromisos</h4>
                    <p className="text-sm text-muted-foreground">
                      Cancela cuando quieras, sin penalizaciones
                    </p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <Zap className="w-12 h-12 text-primary mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Activación Inmediata</h4>
                    <p className="text-sm text-muted-foreground">
                      Acceso instantáneo a todas las funciones
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Plan Comparison Table */}
              <div className="mt-16">
                <PlanComparison onSelectPlan={handleSelectPlanByName} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Belén Conecta Platform Section */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-purple-600 text-white text-lg px-6 py-2">
              <Zap className="inline mr-2" size={20} />
              Tecnología al Servicio del Cuidado
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Plataforma Digital – Belén Conecta</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Marketplace de confianza. Filtros por especialidad, ciudad y calificación.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { icon: CheckCircle, title: 'Perfiles Verificados', description: 'Profesionales cualificados y de confianza' },
              { icon: Users, title: 'Reseñas Reales', description: 'Transparencia y fiabilidad en cada elección' },
              { icon: Zap, title: 'Búsqueda Inteligente', description: 'Por especialidad y ciudad' },
              { icon: Shield, title: 'Comunicación Segura', description: 'Directa y protegida' },
              { icon: Calendar, title: 'Gestión de Citas', description: 'Organice servicios sin complicaciones' },
              { icon: Clock, title: 'Soporte 24/7', description: 'Siempre a su disposición' },
            ].map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 text-center">
                  <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon size={28} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700" onClick={() => setPage('profesionales-servicios')}>
              <Users className="w-5 h-5 mr-2" />
              Ver Profesionales Disponibles
            </Button>
          </div>
        </div>
      </section>

      {/* Programas de Vida Activa */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Planes de Vida Activa</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Programas diseñados para mantener la alegría, la conexión social y el bienestar integral
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Users,
                title: 'Plan Amigos',
                subtitle: 'Alegría compartida y compañía real',
                description: 'Juegos de mesa, talleres creativos, encuentros sociales y acompañamiento emocional grupal.',
                color: 'from-blue-500 to-cyan-500',
                iconBg: 'bg-blue-100 text-blue-600',
              },
              {
                icon: Trees,
                title: 'Plan Sol y Café',
                subtitle: 'Estancias rurales con sabor a tradición',
                description: 'Hospedaje campestre, gastronomía local, caminatas suaves y conversaciones con café de Buesaco.',
                color: 'from-amber-500 to-orange-500',
                iconBg: 'bg-amber-100 text-amber-600',
              },
              {
                icon: PartyPopper,
                title: 'Plan Sonreír',
                subtitle: 'Celebraciones Inolvidables',
                description: 'Organización completa del evento, acompañamiento profesional y espacios seguros para celebrar.',
                color: 'from-pink-500 to-rose-500',
                iconBg: 'bg-pink-100 text-pink-600',
              },
              {
                icon: Trees,
                title: 'Plan Turismo Rural',
                subtitle: 'Naturaleza y Espiritualidad',
                description: 'Salidas ecológicas, zooterapia, recorridos históricos y espacios de reflexión espiritual.',
                color: 'from-green-500 to-emerald-500',
                iconBg: 'bg-green-100 text-green-600',
              },
            ].map((program, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${program.color}`} />
                <CardContent className="pt-6">
                  <div className={`w-16 h-16 ${program.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <program.icon size={32} />
                  </div>
                  <h3 className="font-bold text-xl text-center mb-2">{program.title}</h3>
                  <p className="text-sm font-semibold text-center text-primary mb-3">{program.subtitle}</p>
                  <p className="text-sm text-muted-foreground text-center leading-relaxed mb-4">
                    {program.description}
                  </p>
                  <Button variant="outline" className="w-full" onClick={() => setPage('services')}>
                    Ver Actividades
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-600 text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Heart className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              ¿Listo para vivir la experiencia Hogar Belén?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Lo invitamos a conocernos, tomar un café de nuestra tierra y sentir la diferencia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" onClick={() => setPage('contact')} className="text-lg px-8">
                <Calendar className="w-5 h-5 mr-2" />
                Agendar visita
              </Button>
              <Button size="lg" variant="outline" onClick={() => setPage('contact')} className="text-lg px-8 bg-white/10 hover:bg-white/20 border-white text-white">
                <Phone className="w-5 h-5 mr-2" />
                Solicitar información
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {selectedPlan && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => {
            setShowPaymentModal(false);
            setSelectedPlan(null);
          }}
          plan={selectedPlan}
        />
      )}
    </div>
  );
}
