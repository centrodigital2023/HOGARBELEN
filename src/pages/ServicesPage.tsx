import { Home, Stethoscope, Heart, Users, Clock, Shield, Bell, Activity, Music, Utensils, Sprout } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

export default function ServicesPage() {
  const servicePackages = [
    {
      name: 'Plan Básico Centro Vida',
      description: 'Servicios esenciales de centro de día',
      price: '$800.000/mes',
      features: [
        'Acceso al centro 5 días/semana',
        'Alimentación balanceada',
        'Actividades recreativas básicas',
        'Monitoreo de signos vitales',
        'Reportes semanales a familiares',
      ],
      icon: Home,
      popular: false,
    },
    {
      name: 'Plan Integral Conectado',
      description: 'Centro de vida + profesionales a domicilio',
      price: '$1.200.000/mes',
      features: [
        'Todo el Plan Básico',
        '4 visitas mensuales de enfermería',
        '2 consultas médicas a domicilio',
        'App familiar premium',
        'Alertas inteligentes',
        'Expediente digital',
      ],
      icon: Users,
      popular: true,
    },
    {
      name: 'Plan Premium Total',
      description: 'Ecosistema completo de cuidado',
      price: '$2.000.000/mes',
      features: [
        'Todo el Plan Integral',
        'Cuidador personalizado 8h/día',
        'Terapias especializadas',
        'Monitoreo 24/7 con sensores',
        'Asistente IA personal',
        'Coordinador de cuidado dedicado',
      ],
      icon: Shield,
      popular: false,
    },
  ];

  const additionalServices = [
    {
      name: 'Consultas Médicas Especializadas',
      description: 'Geriatra, cardiólogo, neurólogo a domicilio',
      price: '$80.000 - $150.000',
      icon: Stethoscope,
    },
    {
      name: 'Terapias de Rehabilitación',
      description: 'Fisioterapia, terapia ocupacional, fonoaudiología',
      price: '$60.000 - $100.000/sesión',
      icon: Heart,
    },
    {
      name: 'Cuidado Nocturno',
      description: 'Acompañamiento durante la noche',
      price: '$120.000/noche',
      icon: Clock,
    },
    {
      name: 'Emergencias Médicas',
      description: 'Respuesta inmediata 24/7',
      price: '$200.000/visita',
      icon: Bell,
    },
  ];

  const dayCarActivities = [
    { icon: Music, name: 'Musicoterapia', description: 'Estimulación cognitiva y emocional' },
    { icon: Utensils, name: 'Nutrición', description: 'Menús balanceados supervisados' },
    { icon: Sprout, name: 'Huerta Terapéutica', description: 'Conexión con la naturaleza' },
    { icon: Activity, name: 'Ejercicio Adaptado', description: 'Rutinas personalizadas' },
  ];

  return (
    <div className="min-h-screen bg-muted/50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Nuestros Servicios</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Ofrecemos soluciones integrales que combinan la calidez del cuidado humano con la eficiencia de la
            tecnología más avanzada.
          </p>
        </div>

        {/* Day Care Activities */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Actividades del Centro de Vida</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dayCarActivities.map((activity, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                    <activity.icon size={24} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{activity.name}</h3>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Service Packages */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Planes de Servicio</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {servicePackages.map((pkg, index) => (
              <Card
                key={index}
                className={`relative transition-all duration-300 hover:shadow-xl ${
                  pkg.popular ? 'border-primary border-2 transform -translate-y-2' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">MÁS POPULAR</Badge>
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                      <pkg.icon size={24} />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{pkg.name}</CardTitle>
                      <CardDescription>{pkg.description}</CardDescription>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{pkg.price}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant={pkg.popular ? 'default' : 'outline'}>
                    Solicitar Información
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Additional Services */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Servicios Adicionales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                    <service.icon size={24} />
                  </div>
                  <h3 className="font-bold mb-2">{service.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                  <div className="text-primary font-bold">{service.price}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="pt-12 pb-12">
              <h2 className="text-3xl font-bold mb-4">¿No encuentras lo que necesitas?</h2>
              <p className="text-primary-foreground/90 mb-8 text-lg max-w-2xl mx-auto">
                Contáctanos para crear un plan personalizado adaptado a las necesidades específicas de tu ser
                querido.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="secondary" size="lg">
                  Agendar Evaluación
                </Button>
                <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                  Llamar Ahora
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
