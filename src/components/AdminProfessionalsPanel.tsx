import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  UserCheck, UserMinus, Eye, Clock, CheckCircle,
  XCircle, Users
} from '@phosphor-icons/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useProfessionalsSupabase, ProfessionalSupabase } from '@/hooks/useProfessionalsSupabase';
import { RealtimeIndicator } from './RealtimeIndicator';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { toast } from 'sonner';

interface AdminProfessionalsPanelProps {
  adminId: string;
}

export function AdminProfessionalsPanel({ adminId }: AdminProfessionalsPanelProps) {
  const { 
    professionals, 
    loading,
    approveProfessional, 
    rejectProfessional,
    deleteProfessional,
    isConnected,
    realtimeStatus
  } = useProfessionalsSupabase({ status: 'all' });

  const [selectedProfessional, setSelectedProfessional] = useState<ProfessionalSupabase | null>(null);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  const pendingProfessionals = professionals.filter(p => p.verification_status === 'pending');
  const approvedProfessionals = professionals.filter(p => p.verification_status === 'approved');
  const rejectedProfessionals = professionals.filter(p => p.verification_status === 'rejected');

  const handleApprove = async (prof: ProfessionalSupabase) => {
    try {
      await approveProfessional(prof.id, adminId);
      toast.success('Profesional aprobado', {
        description: `${prof.full_name || 'Profesional'} ahora aparece en el listado público`
      });
    } catch (error) {
      // Error ya manejado en el hook
    }
  };

  const handleReject = async () => {
    if (!selectedProfessional || !rejectionReason.trim()) {
      toast.error('Por favor proporciona una razón para el rechazo');
      return;
    }

    try {
      await rejectProfessional(selectedProfessional.id, adminId, rejectionReason);
      setShowRejectDialog(false);
      setRejectionReason('');
      setSelectedProfessional(null);
    } catch (error) {
      // Error ya manejado en el hook
    }
  };

  const handleDelete = async (prof: ProfessionalSupabase) => {
    if (!confirm(`¿Estás seguro de eliminar a ${prof.full_name || 'este profesional'}?`)) return;

    try {
      await deleteProfessional(prof.id);
    } catch (error) {
      // Error ya manejado en el hook
    }
  };

  const ProfessionalCard = ({ prof }: { prof: ProfessionalSupabase }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Card>
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={prof.photo_url || undefined} alt={prof.full_name} />
              <AvatarFallback>
                {(prof.full_name || 'UN').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-semibold truncate">{prof.full_name || 'Sin nombre'}</h4>
                  <p className="text-sm text-muted-foreground truncate">{prof.specialization}</p>
                </div>
                <Badge 
                  variant={
                    prof.verification_status === 'approved' ? 'default' : 
                    prof.verification_status === 'pending' ? 'secondary' : 
                    'destructive'
                  }
                >
                  {prof.verification_status === 'approved' ? 'Aprobado' :
                   prof.verification_status === 'pending' ? 'Pendiente' :
                   'Rechazado'}
                </Badge>
              </div>
              
              <div className="mt-2 space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">
                    {prof.experience_years} años de experiencia
                  </span>
                </div>
                {prof.bio && (
                  <p className="text-muted-foreground line-clamp-2">{prof.bio}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Registrado {formatDistanceToNow(new Date(prof.created_at), { 
                    addSuffix: true,
                    locale: es
                  })}
                </p>
                {prof.rejection_reason && (
                  <p className="text-xs text-red-600">
                    Razón de rechazo: {prof.rejection_reason}
                  </p>
                )}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {prof.verification_status === 'pending' && (
                  <>
                    <Button 
                      size="sm" 
                      onClick={() => handleApprove(prof)}
                      className="flex items-center gap-1"
                    >
                      <UserCheck weight="bold" className="h-4 w-4" />
                      Aprobar
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => {
                        setSelectedProfessional(prof);
                        setShowRejectDialog(true);
                      }}
                      className="flex items-center gap-1"
                    >
                      <UserMinus weight="bold" className="h-4 w-4" />
                      Rechazar
                    </Button>
                  </>
                )}
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => {
                    setSelectedProfessional(prof);
                    setShowDetailsDialog(true);
                  }}
                  className="flex items-center gap-1"
                >
                  <Eye weight="bold" className="h-4 w-4" />
                  Ver detalles
                </Button>
                {prof.verification_status !== 'pending' && (
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => handleDelete(prof)}
                  >
                    Eliminar
                  </Button>
                )}
              </div>
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
          <p className="text-muted-foreground">Cargando profesionales...</p>
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
            <CardTitle className="text-3xl">{pendingProfessionals.length}</CardTitle>
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
            <CardDescription>Aprobados</CardDescription>
            <CardTitle className="text-3xl">{approvedProfessionals.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <CheckCircle weight="bold" className="h-4 w-4" />
              Activos
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Rechazados</CardDescription>
            <CardTitle className="text-3xl">{rejectedProfessionals.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-red-600">
              <XCircle weight="bold" className="h-4 w-4" />
              No aprobados
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total</CardDescription>
            <CardTitle className="text-3xl">{professionals.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users weight="bold" className="h-4 w-4" />
              En el sistema
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gestión de Profesionales</h2>
        <RealtimeIndicator status={realtimeStatus} />
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending" className="relative">
            Pendientes
            {pendingProfessionals.length > 0 && (
              <Badge className="ml-2" variant="destructive">
                {pendingProfessionals.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="approved">
            Aprobados
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rechazados
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingProfessionals.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No hay profesionales pendientes de revisión</p>
              </CardContent>
            </Card>
          ) : (
            pendingProfessionals.map(prof => (
              <ProfessionalCard key={prof.id} prof={prof} />
            ))
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          {approvedProfessionals.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                <CheckCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No hay profesionales aprobados aún</p>
              </CardContent>
            </Card>
          ) : (
            approvedProfessionals.map(prof => (
              <ProfessionalCard key={prof.id} prof={prof} />
            ))
          )}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          {rejectedProfessionals.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                <XCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No hay profesionales rechazados</p>
              </CardContent>
            </Card>
          ) : (
            rejectedProfessionals.map(prof => (
              <ProfessionalCard key={prof.id} prof={prof} />
            ))
          )}
        </TabsContent>
      </Tabs>

      {/* Dialog de rechazo */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rechazar Profesional</DialogTitle>
            <DialogDescription>
              Proporciona una razón clara para el rechazo. El profesional recibirá esta información.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Textarea
              placeholder="Ej: Documentación incompleta, certificaciones no válidas..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowRejectDialog(false);
              setRejectionReason('');
            }}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleReject}>
              Confirmar Rechazo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de detalles */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalles del Profesional</DialogTitle>
          </DialogHeader>
          {selectedProfessional && (
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={selectedProfessional.photo_url || undefined} />
                  <AvatarFallback>
                    {(selectedProfessional.full_name || 'UN').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold">{selectedProfessional.full_name}</h3>
                  <p className="text-muted-foreground">{selectedProfessional.specialization}</p>
                  <Badge className="mt-2">{selectedProfessional.verification_status}</Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{selectedProfessional.email || 'No disponible'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Teléfono</p>
                  <p className="text-sm text-muted-foreground">{selectedProfessional.phone || 'No disponible'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Experiencia</p>
                  <p className="text-sm text-muted-foreground">{selectedProfessional.experience_years} años</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Tarifa por hora</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedProfessional.hourly_rate ? `$${selectedProfessional.hourly_rate}` : 'No especificada'}
                  </p>
                </div>
              </div>

              {selectedProfessional.bio && (
                <div>
                  <p className="text-sm font-medium mb-2">Biografía</p>
                  <p className="text-sm text-muted-foreground">{selectedProfessional.bio}</p>
                </div>
              )}

              {selectedProfessional.certifications && selectedProfessional.certifications.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Certificaciones</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProfessional.certifications.map((cert, idx) => (
                      <Badge key={idx} variant="outline">{cert}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {selectedProfessional.rejection_reason && (
                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="text-sm font-medium text-red-900 mb-1">Razón de Rechazo</p>
                  <p className="text-sm text-red-700">{selectedProfessional.rejection_reason}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
