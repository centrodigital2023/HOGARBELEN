import { Zap, ArrowRight, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { useKV } from '@github/spark/hooks';
import { useAuth } from '../contextos/SupabaseAuthContext';

interface UpgradeBannerProps {
  onUpgrade: () => void;
}

export default function UpgradeBanner({ onUpgrade }: UpgradeBannerProps) {
  const { user } = useAuth();
  const [subscriptions] = useKV<any[]>('hogar-belen-subscriptions', []);

  const hasActiveSubscription = (subscriptions || []).some(
    sub => sub.userId === (user?.id || user?.uid) && sub.status === 'active'
  );

  if (hasActiveSubscription) {
    return null;
  }

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl -ml-24 -mb-24" />
      
      <CardContent className="pt-6 pb-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <Zap className="w-8 h-8 text-white" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-gray-900">Desbloquea Todo el Potencial</h3>
                <div className="flex gap-1">
                  {[1, 2, 3].map(i => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
              </div>
              
              <p className="text-muted-foreground mb-3">
                Actualiza a <strong className="text-primary">Premium</strong> y obtén acceso ilimitado a profesionales, 
                IA avanzada, recordatorios automáticos y soporte prioritario
              </p>
              
              <div className="flex flex-wrap gap-3 text-sm">
                <div className="flex items-center gap-2 bg-white/50 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-gray-700">Contactos ilimitados</span>
                </div>
                <div className="flex items-center gap-2 bg-white/50 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-gray-700">Validación IA avanzada</span>
                </div>
                <div className="flex items-center gap-2 bg-white/50 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-gray-700">Soporte prioritario</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 items-center md:items-end text-center md:text-right">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Solo</div>
              <div className="text-4xl font-bold text-primary">$49.900</div>
              <div className="text-sm text-muted-foreground">por mes</div>
            </div>
            
            <Button
              size="lg"
              onClick={onUpgrade}
              className="shadow-lg hover:shadow-xl transition-all group"
            >
              <Zap className="w-4 h-4 mr-2" />
              Actualizar a Premium
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <p className="text-xs text-muted-foreground">
              Cancela en cualquier momento • Sin compromisos
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
