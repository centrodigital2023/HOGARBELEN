import { useState } from 'react';
import { CreditCard, Calendar, AlertCircle, CheckCircle, XCircle, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useKV } from '@github/spark/hooks';
import { useAuth } from '../contextos/SupabaseAuthContext';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

export default function SubscriptionManager() {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useKV<any[]>('hogar-belen-subscriptions', []);
  const [paymentHistory, setPaymentHistory] = useKV<any[]>('hogar-belen-payment-history', []);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);

  const userSubscriptions = (subscriptions || []).filter(
    sub => sub.userId === user?.id
  );

  const userPayments = (paymentHistory || []).filter(
    payment => payment.userId === user?.id
  );

  const activeSubscription = userSubscriptions.find(sub => sub.status === 'active');

  const handleCancelSubscription = (subId: string) => {
    setSelectedSubId(subId);
    setShowCancelDialog(true);
  };

  const confirmCancel = () => {
    if (selectedSubId) {
      setSubscriptions(current =>
        (current || []).map(sub =>
          sub.id === selectedSubId
            ? { ...sub, status: 'cancelled', cancelledDate: new Date().toISOString() }
            : sub
        )
      );
      toast.success('Suscripción cancelada correctamente');
      setShowCancelDialog(false);
      setSelectedSubId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: string) => {
    return amount;
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: { text: 'Activa', className: 'bg-green-100 text-green-700 border-green-200' },
      cancelled: { text: 'Cancelada', className: 'bg-red-100 text-red-700 border-red-200' },
      expired: { text: 'Expirada', className: 'bg-gray-100 text-gray-700 border-gray-200' }
    };
    
    const variant = variants[status as keyof typeof variants] || variants.active;
    
    return (
      <Badge className={variant.className}>
        {variant.text}
      </Badge>
    );
  };

  const downloadInvoice = (payment: any) => {
    const invoiceText = `
FACTURA - HOGAR BELÉN CONECTA
================================

ID Transacción: ${payment.id}
Fecha: ${formatDate(payment.date)}

Plan: ${payment.plan}
Monto: ${formatCurrency(payment.amount)}
Método de Pago: ${payment.paymentMethod}
Estado: ${payment.status}

Email: ${payment.email}

Gracias por tu suscripción.
    `;

    const blob = new Blob([invoiceText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `factura-${payment.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success('Factura descargada');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Mi Suscripción</h2>
        <p className="text-muted-foreground">
          Administra tu plan y revisa tu historial de pagos
        </p>
      </div>

      <Tabs defaultValue="subscription" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="subscription">Suscripción Activa</TabsTrigger>
          <TabsTrigger value="history">Historial de Pagos</TabsTrigger>
        </TabsList>

        <TabsContent value="subscription" className="space-y-4">
          {activeSubscription ? (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">Plan {activeSubscription.plan}</CardTitle>
                    <CardDescription className="mt-2">
                      {formatCurrency(activeSubscription.price)}{activeSubscription.period}
                    </CardDescription>
                  </div>
                  {getStatusBadge(activeSubscription.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Fecha de Inicio</span>
                    </div>
                    <p className="text-lg font-semibold">
                      {formatDate(activeSubscription.startDate)}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Próximo Cobro</span>
                    </div>
                    <p className="text-lg font-semibold">
                      {formatDate(activeSubscription.nextBillingDate)}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CreditCard className="w-4 h-4" />
                      <span>Método de Pago</span>
                    </div>
                    <p className="text-lg font-semibold">
                      •••• {activeSubscription.cardLastFour}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold mb-3">Características Incluidas:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activeSubscription.features.map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-6 flex gap-3">
                  <Button variant="outline" className="flex-1">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Actualizar Método de Pago
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleCancelSubscription(activeSubscription.id)}
                    className="flex-1"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Cancelar Suscripción
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-12 pb-12 text-center">
                <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No tienes una suscripción activa</h3>
                <p className="text-muted-foreground mb-6">
                  Elige un plan para acceder a todas las funcionalidades premium
                </p>
                <Button onClick={() => window.location.href = '#pricing'}>
                  Ver Planes Disponibles
                </Button>
              </CardContent>
            </Card>
          )}

          {userSubscriptions.filter(sub => sub.status === 'cancelled').length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Suscripciones Anteriores</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {userSubscriptions
                  .filter(sub => sub.status === 'cancelled')
                  .map(sub => (
                    <div
                      key={sub.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <p className="font-semibold">Plan {sub.plan}</p>
                        <p className="text-sm text-muted-foreground">
                          Cancelada el {formatDate(sub.cancelledDate)}
                        </p>
                      </div>
                      {getStatusBadge(sub.status)}
                    </div>
                  ))}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {userPayments.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>Historial de Transacciones</CardTitle>
                <CardDescription>
                  Registro completo de todos tus pagos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {userPayments
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map(payment => (
                      <div
                        key={payment.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <CreditCard className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold">{payment.plan}</p>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(payment.date)} • {payment.paymentMethod}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              ID: {payment.id}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-bold text-lg">{formatCurrency(payment.amount)}</p>
                            <Badge className="bg-green-100 text-green-700 border-green-200">
                              Completado
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => downloadInvoice(payment)}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-12 pb-12 text-center">
                <CreditCard className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Sin historial de pagos</h3>
                <p className="text-muted-foreground">
                  Aquí aparecerán tus transacciones cuando realices tu primer pago
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Cancelar Suscripción?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción cancelará tu suscripción y perderás acceso a las funciones premium 
              al finalizar el período de facturación actual. ¿Estás seguro de continuar?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, mantener suscripción</AlertDialogCancel>
            <AlertDialogAction onClick={confirmCancel} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Sí, cancelar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
