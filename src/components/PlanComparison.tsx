import { Check, X } from 'lucide-react';
import { Card, CardContent } from './ui/card';

interface PlanComparisonProps {
  onSelectPlan: (planName: string) => void;
}

export default function PlanComparison({ onSelectPlan }: PlanComparisonProps) {
  const features = [
    {
      category: 'Acceso a Profesionales',
      items: [
        { name: 'Búsqueda de profesionales verificados', basic: true, premium: true, enterprise: true },
        { name: 'Contactos mensuales', basic: '3', premium: 'Ilimitados', enterprise: 'Ilimitados' },
        { name: 'Disponibilidad en tiempo real', basic: true, premium: true, enterprise: true },
        { name: 'Perfiles detallados', basic: true, premium: true, enterprise: true },
      ],
    },
    {
      category: 'Herramientas IA',
      items: [
        { name: 'Asistente IA básico', basic: true, premium: true, enterprise: true },
        { name: 'Validación IA avanzada', basic: false, premium: true, enterprise: true },
        { name: 'Recomendaciones personalizadas', basic: false, premium: true, enterprise: true },
        { name: 'Análisis predictivo', basic: false, premium: false, enterprise: true },
      ],
    },
    {
      category: 'Gestión y Seguimiento',
      items: [
        { name: 'Historial de contactos', basic: false, premium: true, enterprise: true },
        { name: 'Agenda de citas', basic: false, premium: true, enterprise: true },
        { name: 'Recordatorios automáticos', basic: false, premium: true, enterprise: true },
        { name: 'Notificaciones personalizadas', basic: false, premium: true, enterprise: true },
        { name: 'Dashboard administrativo', basic: false, premium: false, enterprise: true },
        { name: 'Reportes personalizados', basic: false, premium: false, enterprise: true },
      ],
    },
    {
      category: 'Soporte y Servicios',
      items: [
        { name: 'Soporte por email', basic: true, premium: true, enterprise: true },
        { name: 'Soporte prioritario', basic: false, premium: true, enterprise: true },
        { name: 'Soporte 24/7 dedicado', basic: false, premium: false, enterprise: true },
        { name: 'Capacitación del equipo', basic: false, premium: false, enterprise: true },
        { name: 'Gestor de cuenta dedicado', basic: false, premium: false, enterprise: true },
      ],
    },
    {
      category: 'Integración y API',
      items: [
        { name: 'Múltiples usuarios', basic: false, premium: false, enterprise: true },
        { name: 'API de integración', basic: false, premium: false, enterprise: true },
        { name: 'Facturación centralizada', basic: false, premium: false, enterprise: true },
        { name: 'Personalización de marca', basic: false, premium: false, enterprise: true },
      ],
    },
  ];

  const renderValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-5 h-5 text-green-600 mx-auto" />
      ) : (
        <X className="w-5 h-5 text-gray-300 mx-auto" />
      );
    }
    return <span className="text-sm font-semibold text-primary">{value}</span>;
  };

  return (
    <div className="overflow-x-auto">
      <Card>
        <CardContent className="p-6">
          <div className="mb-8 text-center">
            <h3 className="text-2xl font-bold mb-2">Comparación Detallada de Planes</h3>
            <p className="text-muted-foreground">
              Encuentra el plan perfecto para tus necesidades
            </p>
          </div>

          <div className="min-w-[800px]">
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="font-semibold text-lg">Características</div>
              <div className="text-center">
                <div className="font-bold text-xl mb-1">Básico</div>
                <div className="text-2xl font-bold text-green-600 mb-2">Gratis</div>
                <button
                  onClick={() => onSelectPlan('Básico')}
                  className="text-sm text-primary hover:underline"
                >
                  Seleccionar
                </button>
              </div>
              <div className="text-center bg-primary/5 rounded-lg p-4 -mt-2">
                <div className="text-xs font-semibold text-primary uppercase mb-1">Más Popular</div>
                <div className="font-bold text-xl mb-1">Premium</div>
                <div className="text-2xl font-bold text-primary mb-2">$49.900<span className="text-sm">/mes</span></div>
                <button
                  onClick={() => onSelectPlan('Premium')}
                  className="text-sm text-primary hover:underline font-semibold"
                >
                  Suscribirse →
                </button>
              </div>
              <div className="text-center">
                <div className="font-bold text-xl mb-1">Empresarial</div>
                <div className="text-2xl font-bold text-gray-900 mb-2">Personalizado</div>
                <button
                  onClick={() => onSelectPlan('Empresarial')}
                  className="text-sm text-primary hover:underline"
                >
                  Contactar
                </button>
              </div>
            </div>

            <div className="space-y-8">
              {features.map((category, categoryIndex) => (
                <div key={categoryIndex} className="space-y-3">
                  <h4 className="font-bold text-lg text-primary border-b pb-2">
                    {category.category}
                  </h4>
                  {category.items.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="grid grid-cols-4 gap-4 py-3 border-b border-gray-100 hover:bg-muted/30 transition-colors rounded"
                    >
                      <div className="text-sm text-muted-foreground flex items-center">
                        {feature.name}
                      </div>
                      <div className="flex items-center justify-center">
                        {renderValue(feature.basic)}
                      </div>
                      <div className="flex items-center justify-center bg-primary/5">
                        {renderValue(feature.premium)}
                      </div>
                      <div className="flex items-center justify-center">
                        {renderValue(feature.enterprise)}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground text-center">
                <strong>Nota:</strong> Todos los planes incluyen acceso a la plataforma Hogar Belén Conecta 
                con profesionales verificados. El plan Premium desbloquea funciones avanzadas de IA y seguimiento. 
                El plan Empresarial está diseñado para instituciones con múltiples usuarios y necesidades de integración.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
