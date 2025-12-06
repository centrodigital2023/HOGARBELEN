import { useState } from 'react';
import { Check, Home, Users, Shield, CreditCard, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import PaymentModal from '../components/PaymentModal';
import PlanComparison from '../components/PlanComparison';
import { useAuth } from '../contextos/SupabaseAuthContext';

interface PricingPageProps {
  setPage: (page: string) => void;
}

export default function PricingPage({ setPage }: PricingPageProps) {
  const { user } = useAuth();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const plans = [
    {
      name: 'Básico',
      price: 'Gratis',
      period: '',
      description: 'Para familias que necesitan cuidado ocasional',
      icon: Home,
      popular: false,
      isPaid: false,
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
      isPaid: true,
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
      features: [
        'Todo en Premium',
        'Dashboard administrativo',
        'Múltiples usuarios',
        'API integración',
        'Soporte dedicado 24/7',
        'Reportes personalizados',
        'Facturación centralizada',
        'Capacitación del equipo',
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
    const plan = plans.find(p => p.name === planName);
    if (plan) {
      handleSelectPlan(plan);
    }
  };

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
                  onClick={() => handleSelectPlan(plan)}
                >
                  {plan.isPaid && plan.price !== 'Personalizado' && (
                    <CreditCard className="w-4 h-4 mr-2" />
                  )}
                  {plan.popular && <Zap className="w-4 h-4 mr-2" />}
                  {plan.price === 'Gratis'
                    ? 'Comenzar Gratis'
                    : plan.price === 'Personalizado'
                    ? 'Contactar Ventas'
                    : 'Suscribirse Ahora'}
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

        {/* Info Section */}
        <div className="max-w-4xl mx-auto mt-12 grid md:grid-cols-3 gap-6">
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
      </div>

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
