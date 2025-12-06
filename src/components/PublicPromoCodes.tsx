import { Tag, Clock, Sparkles, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { useKV } from '@github/spark/hooks';

interface PromoCode {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  description: string;
  expiryDate: string;
  maxUses: number;
  usedCount: number;
  isActive: boolean;
  applicablePlans: string[];
  createdDate: string;
}

export default function PublicPromoCodes() {
  const [promoCodes] = useKV<PromoCode[]>('hogar-belen-promo-codes', []);

  const activePublicCodes = (promoCodes || []).filter(code => {
    const notExpired = new Date(code.expiryDate) >= new Date();
    const notExhausted = code.usedCount < code.maxUses;
    return code.isActive && notExpired && notExhausted;
  });

  if (activePublicCodes.length === 0) {
    return null;
  }

  const getDiscountText = (code: PromoCode) => {
    if (code.discountType === 'percentage') {
      return `${code.discountValue}% OFF`;
    } else {
      return `$${code.discountValue.toLocaleString()} COP OFF`;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const daysLeft = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    return daysLeft;
  };

  return (
    <div className="py-16 bg-gradient-to-br from-primary-50 via-white to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">Ofertas Especiales</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Códigos <span className="text-primary">Promocionales</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Aprovecha nuestros descuentos exclusivos para acceder a nuestros servicios premium
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activePublicCodes.slice(0, 6).map((code) => {
            const daysLeft = formatDate(code.expiryDate);
            const usagePercent = (code.usedCount / code.maxUses) * 100;
            const isAlmostExhausted = usagePercent >= 80;

            return (
              <Card
                key={code.id}
                className="relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />
                
                <CardHeader className="relative">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Tag className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-mono">
                          {code.code}
                        </CardTitle>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {code.description || 'Descuento especial disponible'}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative space-y-4">
                  <div className="bg-gradient-to-br from-primary to-primary-600 p-6 rounded-xl text-center shadow-lg">
                    <p className="text-4xl font-black text-white drop-shadow-md">
                      {getDiscountText(code)}
                    </p>
                    <p className="text-primary-100 text-sm mt-2 font-medium">
                      En planes seleccionados
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Expira en
                      </span>
                      <Badge variant={daysLeft <= 3 ? 'destructive' : 'default'}>
                        {daysLeft} {daysLeft === 1 ? 'día' : 'días'}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Sparkles className="w-4 h-4" />
                        Disponibles
                      </span>
                      <Badge variant={isAlmostExhausted ? 'destructive' : 'default'}>
                        {code.maxUses - code.usedCount} usos
                      </Badge>
                    </div>

                    {code.applicablePlans.length < 3 && (
                      <div className="pt-2 border-t">
                        <p className="text-xs text-muted-foreground mb-2">Válido para:</p>
                        <div className="flex flex-wrap gap-1">
                          {code.applicablePlans.map((plan, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {plan}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {isAlmostExhausted && (
                    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 text-center">
                      <p className="text-xs font-semibold text-destructive">
                        ¡Últimos cupos disponibles!
                      </p>
                    </div>
                  )}

                  {daysLeft <= 3 && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-center">
                      <p className="text-xs font-semibold text-amber-700">
                        ⚡ Oferta por tiempo limitado
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground bg-muted/50 inline-block px-6 py-3 rounded-full">
            💡 <strong>Tip:</strong> Ingresa el código durante el proceso de pago para obtener tu descuento
          </p>
        </div>
      </div>
    </div>
  );
}
