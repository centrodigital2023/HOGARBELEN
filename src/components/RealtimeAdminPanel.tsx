import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  UserCheck, UserMinus, Eye, Clock, CheckCircle,
  XCircle, Users, ChartLineUp
} from '@phosphor-icons/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useProfessionalsSync, Professional } from '@/hooks/useProfessionalsSync';
import { useNotificationsSync } from '@/hooks/useNotificationsSync';
import { useActivitySync } from '@/hooks/useActivitySync';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { toast } from 'sonner';

interface RealtimeAdminPanelProps {
  adminId: string;
  adminEmail: string;
}

export function RealtimeAdminPanel({ adminId, adminEmail }: RealtimeAdminPanelProps) {
  const { 
    professionals, 
    approveProfessional, 
    rejectProfessional,
    deleteProfessional 
  } = useProfessionalsSync({
    onUpdate: () => {
      toast.info('Datos sincronizados');
    }
  });
  
  const { sendNotification } = useNotificationsSync(adminId, 'admin');
  const { logActivity, getRecentActivities } = useActivitySync();

  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const pendingProfessionals = professionals.filter(p => p.status === 'pending');
  const approvedProfessionals = professionals.filter(p => p.status === 'approved');
  const rejectedProfessionals = professionals.filter(p => p.status === 'rejected');
  const recentActivities = getRecentActivities(10);

  const handleApprove = async (prof: Professional) => {
    try {
      await approveProfessional(prof.id, adminEmail);

      await sendNotification({
        type: 'professional_approved',
        title: '¡Perfil Aprobado!',
        message: `Tu perfil profesional ha sido aprobado y ahora es visible públicamente en Hogar Belén.`,
        recipient_id: prof.id,
        recipient_role: 'professional'
      });

      await logActivity({
        user_id: adminId,
        user_name: 'Administrador',
        user_role: 'admin',
        action: 'approve_professional',
        entity_type: 'professional',
        entity_id: prof.id,
        details: `Profesional ${prof.name} (${prof.title}) aprobado exitosamente`,
        metadata: { email: prof.email, category: prof.category }
      });

      toast.success('Profesional aprobado', {
        description: `${prof.name} ahora aparece en el listado público`
      });
    } catch (error) {
      toast.error('Error al aprobar profesional');
    }
  };

  const handleReject = async () => {
    if (!selectedProfessional || !rejectionReason.trim()) {
      toast.error('Por favor proporciona una razón para el rechazo');
      return;
    }

    try {
      await rejectProfessional(selectedProfessional.id, rejectionReason);

      await sendNotification({
        type: 'professional_rejected',
        title: 'Perfil Rechazado',
        message: `Tu solicitud ha sido revisada. Razón: ${rejectionReason}`,
        recipient_id: selectedProfessional.id,
        recipient_role: 'professional',
        data: { reason: rejectionReason }
      });

      await logActivity({
        user_id: adminId,
        user_name: 'Administrador',
        user_role: 'admin',
        action: 'reject_professional',
        entity_type: 'professional',
        entity_id: selectedProfessional.id,
        details: `Profesional ${selectedProfessional.name} rechazado. Razón: ${rejectionReason}`,
        metadata: { email: selectedProfessional.email, reason: rejectionReason }
      });

      toast.success('Profesional rechazado');
      setShowRejectDialog(false);
      setRejectionReason('');
      setSelectedProfessional(null);
    } catch (error) {
      toast.error('Error al rechazar profesional');
    }
  };

  const handleDelete = async (prof: Professional) => {
    if (!confirm(`¿Estás seguro de eliminar a ${prof.name}?`)) return;

    try {
      await deleteProfessional(prof.id);

      await logActivity({
        user_id: adminId,
        user_name: 'Administrador',
        user_role: 'admin',
        action: 'delete_professional',
        entity_type: 'professional',
        entity_id: prof.id,
        details: `Profesional ${prof.name} eliminado del sistema`,
        metadata: { email: prof.email, status: prof.status }
      });

      toast.success('Profesional eliminado');
    } catch (error) {
      toast.error('Error al eliminar profesional');
    }
  };

  const ProfessionalCard = ({ prof }: { prof: Professional }) => (
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
              <AvatarImage src={prof.avatar} alt={prof.name} />
              <AvatarFallback>
                {prof.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-semibold truncate">{prof.name}</h4>
                  <p className="text-sm text-muted-foreground truncate">{prof.title}</p>
                </div>
                {prof.ai_score && (
                  <Badge variant="outline" className="shrink-0">
                    IA: {(prof.ai_score * 100).toFixed(0)}%
                  </Badge>
                )}
              </div>
              
              <div className="mt-2 space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{prof.category}</Badge>
                  {prof.city && (
                    <span className="text-muted-foreground">{prof.city}</span>
                  )}
                </div>
                <p className="text-muted-foreground line-clamp-2">{prof.description}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(prof.created_at), { 
                    addSuffix: true,
                    locale: es
                  })}
                </p>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {prof.status === 'pending' && (
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
                  onClick={() => setSelectedProfessional(prof)}
                  className="flex items-center gap-1"
                >
                  <Eye weight="bold" className="h-4 w-4" />
                  Ver detalles
                </Button>
                {prof.status !== 'pending' && (
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
        <Badge variant="outline" className="animate-pulse">
          <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
          Sincronización activa
        </Badge>
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
          <TabsTrigger value="activity">
            Actividad
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

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChartLineUp weight="bold" className="h-5 w-5" />
                Actividad Reciente
              </CardTitle>
              <CardDescription>Últimas 10 acciones administrativas</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-3">
                  {recentActivities.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No hay actividad registrada
                    </p>
                  ) : (
                    recentActivities.map(activity => (
                      <div key={activity.id} className="border-l-2 border-primary pl-4 pb-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <p className="font-medium">{activity.details}</p>
                            <p className="text-sm text-muted-foreground">
                              Por {activity.user_name}
                            </p>
                          </div>
                          <Badge variant="outline" className="shrink-0">
                            {activity.entity_type}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDistanceToNow(new Date(activity.created_at), { 
                            addSuffix: true,
                            locale: es
                          })}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

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
    </div>
  );
}
