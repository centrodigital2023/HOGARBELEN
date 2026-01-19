import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle, XCircle, Eye, Clock, Briefcase, MapPin, Phone
} from '@phosphor-icons/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useJobOffersSupabase, JobOfferSupabase } from '@/hooks/useJobOffersSupabase';
import { RealtimeIndicator } from './RealtimeIndicator';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { toast } from 'sonner';

interface AdminJobOffersPanelProps {
  adminId: string;
}

export function AdminJobOffersPanel({ adminId }: AdminJobOffersPanelProps) {
  const { 
    jobOffers, 
    loading,
    approveJobOffer, 
    rejectJobOffer,
    deleteJobOffer,
    isConnected,
    realtimeStatus
  } = useJobOffersSupabase({ status: 'all' });

  const [selectedOffer, setSelectedOffer] = useState<JobOfferSupabase | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  const pendingOffers = jobOffers.filter(o => o.estado === 'pendiente');
  const approvedOffers = jobOffers.filter(o => o.estado === 'aprobada');
  const rejectedOffers = jobOffers.filter(o => o.estado === 'rechazada');

  const handleApprove = async (offer: JobOfferSupabase) => {
    try {
      await approveJobOffer(offer.id, adminId);
      toast.success('Oferta aprobada', {
        description: `"${offer.titulo}" ahora aparece en el listado público`
      });
    } catch (error) {
      // Error ya manejado en el hook
    }
  };

  const handleReject = async (offer: JobOfferSupabase) => {
    if (!confirm(`¿Estás seguro de rechazar "${offer.titulo}"?`)) return;

    try {
      await rejectJobOffer(offer.id, adminId);
    } catch (error) {
      // Error ya manejado en el hook
    }
  };

  const handleDelete = async (offer: JobOfferSupabase) => {
    if (!confirm(`¿Estás seguro de eliminar "${offer.titulo}"?`)) return;

    try {
      await deleteJobOffer(offer.id);
    } catch (error) {
      // Error ya manejado en el hook
    }
  };

  const JobOfferCard = ({ offer }: { offer: JobOfferSupabase }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Card>
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold">{offer.titulo}</h4>
                  {offer.urgencia === 'urgente' && (
                    <Badge variant="destructive" className="text-xs">URGENTE</Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {offer.tipo_servicio}
                  </Badge>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {offer.ubicacion}
                  </span>
                </div>
              </div>
              <Badge 
                variant={
                  offer.estado === 'aprobada' ? 'default' : 
                  offer.estado === 'pendiente' ? 'secondary' : 
                  'destructive'
                }
              >
                {offer.estado === 'aprobada' ? 'Aprobada' :
                 offer.estado === 'pendiente' ? 'Pendiente' :
                 'Rechazada'}
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2">
              {offer.descripcion}
            </p>

            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              {offer.salario_rango && (
                <span>💰 {offer.salario_rango}</span>
              )}
              {offer.full_name && (
                <span>👤 {offer.full_name}</span>
              )}
              <span>📅 {formatDistanceToNow(new Date(offer.created_at), { 
                addSuffix: true,
                locale: es
              })}</span>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {offer.estado === 'pendiente' && (
                <>
                  <Button 
                    size="sm" 
                    onClick={() => handleApprove(offer)}
                    className="flex items-center gap-1"
                  >
                    <CheckCircle weight="bold" className="h-4 w-4" />
                    Aprobar
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => handleReject(offer)}
                    className="flex items-center gap-1"
                  >
                    <XCircle weight="bold" className="h-4 w-4" />
                    Rechazar
                  </Button>
                </>
              )}
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => {
                  setSelectedOffer(offer);
                  setShowDetailsDialog(true);
                }}
                className="flex items-center gap-1"
              >
                <Eye weight="bold" className="h-4 w-4" />
                Ver detalles
              </Button>
              {offer.estado !== 'pendiente' && (
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => handleDelete(offer)}
                >
                  Eliminar
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando ofertas de trabajo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Pendientes</CardDescription>
            <CardTitle className="text-3xl">{pendingOffers.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock weight="bold" className="h-4 w-4" />
              Requieren revisión
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Aprobadas</CardDescription>
            <CardTitle className="text-3xl">{approvedOffers.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <CheckCircle weight="bold" className="h-4 w-4" />
              Publicadas
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Rechazadas</CardDescription>
            <CardTitle className="text-3xl">{rejectedOffers.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-red-600">
              <XCircle weight="bold" className="h-4 w-4" />
              No aprobadas
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total</CardDescription>
            <CardTitle className="text-3xl">{jobOffers.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Briefcase weight="bold" className="h-4 w-4" />
              En el sistema
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gestión de Ofertas de Trabajo</h2>
        <RealtimeIndicator status={realtimeStatus} />
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending" className="relative">
            Pendientes
            {pendingOffers.length > 0 && (
              <Badge className="ml-2" variant="destructive">
                {pendingOffers.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="approved">
            Aprobadas
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rechazadas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingOffers.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                <Briefcase className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No hay ofertas pendientes de revisión</p>
              </CardContent>
            </Card>
          ) : (
            pendingOffers.map(offer => (
              <JobOfferCard key={offer.id} offer={offer} />
            ))
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          {approvedOffers.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                <CheckCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No hay ofertas aprobadas aún</p>
              </CardContent>
            </Card>
          ) : (
            approvedOffers.map(offer => (
              <JobOfferCard key={offer.id} offer={offer} />
            ))
          )}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          {rejectedOffers.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                <XCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No hay ofertas rechazadas</p>
              </CardContent>
            </Card>
          ) : (
            rejectedOffers.map(offer => (
              <JobOfferCard key={offer.id} offer={offer} />
            ))
          )}
        </TabsContent>
      </Tabs>

      {/* Dialog de detalles */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalles de la Oferta</DialogTitle>
          </DialogHeader>
          {selectedOffer && (
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold">{selectedOffer.titulo}</h3>
                  {selectedOffer.urgencia === 'urgente' && (
                    <Badge variant="destructive">URGENTE</Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Badge>{selectedOffer.tipo_servicio}</Badge>
                  <Badge variant="outline">{selectedOffer.estado}</Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Ubicación</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {selectedOffer.ubicacion}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Contacto</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    {selectedOffer.contacto}
                  </p>
                </div>
                {selectedOffer.salario_rango && (
                  <div>
                    <p className="text-sm font-medium">Rango Salarial</p>
                    <p className="text-sm text-muted-foreground">{selectedOffer.salario_rango}</p>
                  </div>
                )}
                {selectedOffer.full_name && (
                  <div>
                    <p className="text-sm font-medium">Publicado por</p>
                    <p className="text-sm text-muted-foreground">{selectedOffer.full_name}</p>
                  </div>
                )}
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Descripción</p>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{selectedOffer.descripcion}</p>
              </div>

              {selectedOffer.requisitos && (
                <div>
                  <p className="text-sm font-medium mb-2">Requisitos</p>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{selectedOffer.requisitos}</p>
                </div>
              )}

              {selectedOffer.categoria_detectada && (
                <div>
                  <p className="text-sm font-medium mb-2">Categoría Detectada (IA)</p>
                  <Badge variant="outline">{selectedOffer.categoria_detectada}</Badge>
                </div>
              )}

              <div className="text-xs text-muted-foreground">
                <p>Creado: {new Date(selectedOffer.created_at).toLocaleString('es')}</p>
                {selectedOffer.fecha_publicacion && (
                  <p>Publicado: {new Date(selectedOffer.fecha_publicacion).toLocaleString('es')}</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
