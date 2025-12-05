import { Check, Home, Users, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

interface PricingPageProps {
  setPage: (page: string) => void;
}

export default function PricingPage({ setPage }: PricingPageProps) {
  const plans = [
    {
      name: 'Básico',
      price: 'Gratis',
      period: '',
      description: 'Para familias que necesitan cuidado ocasional',
      icon: Home,
      popular: false,
      features: [
        'Acceso a profesionales verificados',
        'Contacto directo por WhatsApp',
        'Disponibilidad en tiempo real',
        'Hasta 3 contactos mensuales',
      ],
    },
    {
      name: 'Premium',
      price: '$49.900',
      period: '/mes',
      description: 'Para cuidado regular y seguimiento',
      icon: Users,
      popular: true,
      features: [
        'Todo en Básico',
        'Contactos ilimitados',
        'Validación IA avanzada',
        'Historial de profesionales',
        'Soporte prioritario',
        'Recordatorios automáticos',
      ],
    },
    {
      name: 'Empresarial',
      price: 'Personalizado',
      period: '',
      description: 'Para instituciones y empresas',
      icon: Shield,
      popular: false,
      features: [
        'Todo en Premium',
        'Dashboard administrativo',
        'Múltiples usuarios',
        'API integración',
        'Soporte dedicado 24/7',
        'Reportes personalizados',
      ],
    },
  ];

  return (
    <div className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Planes para Cada Necesidad
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Desde uso personal hasta soluciones empresariales completas
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {plans.map((plan, index) => (
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
                  onClick={() => setPage('register')}
                >
                  {plan.price === 'Gratis'
                    ? 'Comenzar Gratis'
                    : plan.price === 'Personalizado'
                    ? 'Contactar Ventas'
                    : 'Elegir Plan'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* FAQ or CTA */}
        <div className="max-w-3xl mx-auto text-center">
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
      </div>
    </div>
  );
}
