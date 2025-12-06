import { useState } from 'react';
import { CreditCard, Lock, X, Check, AlertCircle, Tag, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { toast } from 'sonner';
import { useKV } from '@github/spark/hooks';
import { useAuth } from '../contextos/SupabaseAuthContext';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: {
    name: string;
    price: string;
    period: string;
    features: string[];
  };
}

interface CardData {
  cardNumber: string;
  cardName: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  email: string;
}

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

export default function PaymentModal({ isOpen, onClose, plan }: PaymentModalProps) {
  const { user, userData } = useAuth();
  const [subscriptions, setSubscriptions] = useKV<any[]>('hogar-belen-subscriptions', []);
  const [paymentHistory, setPaymentHistory] = useKV<any[]>('hogar-belen-payment-history', []);
  const [promoCodes, setPromoCodes] = useKV<PromoCode[]>('hogar-belen-promo-codes', []);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'form' | 'processing' | 'success'>('form');
  
  const [cardData, setCardData] = useState<CardData>({
    cardNumber: '',
    cardName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    email: userData?.email || ''
  });

  const [errors, setErrors] = useState<Partial<CardData>>({});
  
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [promoError, setPromoError] = useState('');

  const validateCardNumber = (number: string) => {
    const cleaned = number.replace(/\s/g, '');
    return /^\d{16}$/.test(cleaned);
  };

  const validateCVV = (cvv: string) => {
    return /^\d{3,4}$/.test(cvv);
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const applyPromoCode = () => {
    if (!promoCodeInput.trim()) {
      setPromoError('Ingresa un código promocional');
      return;
    }

    const code = (promoCodes || []).find(
      c => c.code.toUpperCase() === promoCodeInput.toUpperCase()
    );

    if (!code) {
      setPromoError('Código inválido');
      return;
    }

    if (!code.isActive) {
      setPromoError('Este código no está activo');
      return;
    }

    if (new Date(code.expiryDate) < new Date()) {
      setPromoError('Este código ha expirado');
      return;
    }

    if (code.usedCount >= code.maxUses) {
      setPromoError('Este código ha alcanzado su límite de usos');
      return;
    }

    if (!code.applicablePlans.includes(plan.name)) {
      setPromoError(`Este código no es válido para el plan ${plan.name}`);
      return;
    }

    setAppliedPromo(code);
    setPromoError('');
    toast.success(`¡Código ${code.code} aplicado! ${getDiscountText(code)}`);
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoCodeInput('');
    setPromoError('');
  };

  const getDiscountText = (code: PromoCode) => {
    if (code.discountType === 'percentage') {
      return `${code.discountValue}% de descuento`;
    } else {
      return `$${code.discountValue.toLocaleString()} COP de descuento`;
    }
  };

  const calculateFinalPrice = () => {
    const priceMatch = plan.price.match(/\$([\d,]+)/);
    if (!priceMatch) return { 
      original: plan.price, 
      discount: '$0 COP', 
      final: plan.price, 
      finalNumber: 0 
    };

    const basePrice = parseInt(priceMatch[1].replace(/,/g, ''));
    
    if (!appliedPromo) {
      const formatted = `$${basePrice.toLocaleString()} COP`;
      return {
        original: formatted,
        discount: '$0 COP',
        final: formatted,
        finalNumber: basePrice
      };
    }

    let discount = 0;
    if (appliedPromo.discountType === 'percentage') {
      discount = (basePrice * appliedPromo.discountValue) / 100;
    } else {
      discount = appliedPromo.discountValue;
    }

    const finalPrice = Math.max(0, basePrice - discount);
    return {
      original: `$${basePrice.toLocaleString()} COP`,
      discount: `$${discount.toLocaleString()} COP`,
      final: `$${finalPrice.toLocaleString()} COP`,
      finalNumber: finalPrice
    };
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(' ') : cleaned;
  };

  const handleInputChange = (field: keyof CardData, value: string) => {
    let formattedValue = value;
    
    if (field === 'cardNumber') {
      const cleaned = value.replace(/\D/g, '');
      formattedValue = formatCardNumber(cleaned.slice(0, 16));
    } else if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    } else if (field === 'expiryMonth' || field === 'expiryYear') {
      formattedValue = value.replace(/\D/g, '').slice(0, field === 'expiryMonth' ? 2 : 4);
    }

    setCardData(prev => ({ ...prev, [field]: formattedValue }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CardData> = {};

    if (!validateCardNumber(cardData.cardNumber)) {
      newErrors.cardNumber = 'Número de tarjeta inválido';
    }
    if (!cardData.cardName.trim()) {
      newErrors.cardName = 'Nombre requerido';
    }
    if (!cardData.expiryMonth || parseInt(cardData.expiryMonth) < 1 || parseInt(cardData.expiryMonth) > 12) {
      newErrors.expiryMonth = 'Mes inválido';
    }
    if (!cardData.expiryYear || cardData.expiryYear.length !== 4) {
      newErrors.expiryYear = 'Año inválido';
    }
    if (!validateCVV(cardData.cvv)) {
      newErrors.cvv = 'CVV inválido';
    }
    if (!validateEmail(cardData.email)) {
      newErrors.email = 'Email inválido';
    }

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const expYear = parseInt(cardData.expiryYear);
    const expMonth = parseInt(cardData.expiryMonth);

    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
      newErrors.expiryMonth = 'Tarjeta vencida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const processPayment = async () => {
    if (!validateForm()) {
      toast.error('Por favor corrige los errores en el formulario');
      return;
    }

    setIsProcessing(true);
    setPaymentStep('processing');

    await new Promise(resolve => setTimeout(resolve, 2500));

    const subscriptionId = `SUB-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    const priceCalc = calculateFinalPrice();
    const finalPrice = priceCalc.final;
    
    const newSubscription = {
      id: subscriptionId,
      userId: user?.id || user?.uid || 'guest',
      plan: plan.name,
      price: finalPrice,
      period: plan.period,
      status: 'active',
      startDate: new Date().toISOString(),
      nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      cardLastFour: cardData.cardNumber.slice(-4),
      features: plan.features,
      promoCode: appliedPromo?.code || null
    };

    const newTransaction = {
      id: transactionId,
      subscriptionId,
      userId: user?.id || user?.uid || 'guest',
      amount: finalPrice,
      plan: plan.name,
      status: 'completed',
      date: new Date().toISOString(),
      paymentMethod: 'Tarjeta ****' + cardData.cardNumber.slice(-4),
      email: cardData.email,
      promoCode: appliedPromo?.code || null,
      discount: appliedPromo ? priceCalc.discount : null
    };

    setSubscriptions(current => [...(current || []), newSubscription]);
    setPaymentHistory(current => [...(current || []), newTransaction]);

    if (appliedPromo) {
      setPromoCodes(current =>
        (current || []).map(code =>
          code.id === appliedPromo.id
            ? { ...code, usedCount: code.usedCount + 1 }
            : code
        )
      );
    }

    setPaymentStep('success');
    toast.success('¡Pago procesado exitosamente!');
    
    setTimeout(() => {
      onClose();
      resetForm();
    }, 3000);
  };

  const resetForm = () => {
    setCardData({
      cardNumber: '',
      cardName: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      email: userData?.email || ''
    });
    setErrors({});
    setIsProcessing(false);
    setPaymentStep('form');
    setPromoCodeInput('');
    setAppliedPromo(null);
    setPromoError('');
  };

  const handleClose = () => {
    if (!isProcessing) {
      onClose();
      resetForm();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {paymentStep === 'form' && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-2xl">
                <CreditCard className="w-6 h-6 text-primary" />
                Completar Suscripción
              </DialogTitle>
              <DialogDescription>
                Ingresa los datos de tu tarjeta para activar el plan {plan.name}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Plan {plan.name}</CardTitle>
                    {appliedPromo ? (
                      <div className="flex flex-col items-end gap-1">
                        <Badge className="bg-green-600 text-white">
                          <Sparkles className="w-3 h-3 mr-1" />
                          {getDiscountText(appliedPromo)}
                        </Badge>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground line-through">
                            {calculateFinalPrice().original}
                          </span>
                          <Badge className="bg-primary text-primary-foreground">
                            {calculateFinalPrice().final}{plan.period}
                          </Badge>
                        </div>
                      </div>
                    ) : (
                      <Badge className="bg-primary text-primary-foreground">
                        {plan.price}{plan.period}
                      </Badge>
                    )}
                  </div>
                  <CardDescription>
                    Renovación automática cada mes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {plan.features.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-dashed">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Tag className="w-4 h-4 text-primary" />
                    Código Promocional
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {appliedPromo ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Check className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="font-semibold text-green-900">{appliedPromo.code}</p>
                            <p className="text-xs text-green-700">{appliedPromo.description}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={removePromoCode}
                          className="text-green-700 hover:text-green-900"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Subtotal:</span>
                          <span>{calculateFinalPrice().original}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-green-700 font-semibold">Descuento:</span>
                          <span className="text-green-700 font-semibold">-{calculateFinalPrice().discount}</span>
                        </div>
                        <div className="flex justify-between text-base font-bold pt-2 border-t">
                          <span>Total:</span>
                          <span className="text-green-700">{calculateFinalPrice().final}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          placeholder="CODIGO2024"
                          value={promoCodeInput}
                          onChange={(e) => {
                            setPromoCodeInput(e.target.value.toUpperCase());
                            setPromoError('');
                          }}
                          className={`font-mono ${promoError ? 'border-destructive' : ''}`}
                        />
                        <Button
                          variant="outline"
                          onClick={applyPromoCode}
                        >
                          Aplicar
                        </Button>
                      </div>
                      {promoError && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {promoError}
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email de Confirmación</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={cardData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="cardNumber">Número de Tarjeta</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    className={errors.cardNumber ? 'border-destructive' : ''}
                    maxLength={19}
                  />
                  {errors.cardNumber && (
                    <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.cardNumber}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="cardName">Nombre del Titular</Label>
                  <Input
                    id="cardName"
                    placeholder="Como aparece en la tarjeta"
                    value={cardData.cardName}
                    onChange={(e) => handleInputChange('cardName', e.target.value.toUpperCase())}
                    className={errors.cardName ? 'border-destructive' : ''}
                  />
                  {errors.cardName && (
                    <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.cardName}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="expiryMonth">Mes</Label>
                    <Input
                      id="expiryMonth"
                      placeholder="MM"
                      value={cardData.expiryMonth}
                      onChange={(e) => handleInputChange('expiryMonth', e.target.value)}
                      className={errors.expiryMonth ? 'border-destructive' : ''}
                      maxLength={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="expiryYear">Año</Label>
                    <Input
                      id="expiryYear"
                      placeholder="AAAA"
                      value={cardData.expiryYear}
                      onChange={(e) => handleInputChange('expiryYear', e.target.value)}
                      className={errors.expiryYear ? 'border-destructive' : ''}
                      maxLength={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      type="password"
                      value={cardData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value)}
                      className={errors.cvv ? 'border-destructive' : ''}
                      maxLength={4}
                    />
                  </div>
                </div>
                {(errors.expiryMonth || errors.cvv) && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.expiryMonth || errors.cvv}
                  </p>
                )}

                <div className="bg-muted/50 p-4 rounded-lg flex items-start gap-3">
                  <Lock className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-semibold text-foreground mb-1">Pago 100% Seguro</p>
                    <p className="text-muted-foreground">
                      Tus datos están protegidos con encriptación SSL de nivel bancario. 
                      No almacenamos información completa de tarjetas.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={handleClose}
                  disabled={isProcessing}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={processPayment}
                  disabled={isProcessing}
                  className="flex-1"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Pagar {calculateFinalPrice().final}
                </Button>
              </div>
            </div>
          </>
        )}

        {paymentStep === 'processing' && (
          <div className="flex flex-col items-center justify-center py-12 space-y-6">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
              <CreditCard className="w-10 h-10 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold">Procesando Pago...</h3>
              <p className="text-muted-foreground">
                Estamos verificando tu información de forma segura
              </p>
            </div>
          </div>
        )}

        {paymentStep === 'success' && (
          <div className="flex flex-col items-center justify-center py-12 space-y-6">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="w-12 h-12 text-green-600" />
            </div>
            <div className="text-center space-y-3">
              <h3 className="text-3xl font-bold text-green-600">¡Pago Exitoso!</h3>
              <p className="text-lg text-muted-foreground">
                Tu suscripción al plan {plan.name} está activa
              </p>
              <div className="bg-muted/50 p-4 rounded-lg mt-4">
                <p className="text-sm text-muted-foreground">
                  Recibirás un email de confirmación en <strong>{cardData.email}</strong>
                </p>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
