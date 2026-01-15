import { useState, useEffect } from 'react';
import { useKV } from '@github/spark/hooks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import {
  Users,
  UserCheck,
  Clock,
  Briefcase,
  FileText,
  Phone,
  Warning,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  TrendUp,
  Shield,
  ChartLine,
  Trash,
  Calendar,
  MapPin,
  EnvelopeSimple,
  CurrencyCircleDollar,
} from '@phosphor-icons/react';
import { supabase } from '@/lib/supabase';
import { type ProfessionalProfile, type JobOffer, type Lead, type AdminAction } from '@/lib/supabase-helpers';
import { AIService } from '@/lib/aiService';

interface SuperAdminDashboardProps {
  setPage: (page: string) => void;
}

interface DashboardMetrics {
  totalProfessionals: number;
  verifiedProfessionals: number;
  pendingProfessionals: number;
  rejectedProfessionals: number;
  activeOffers: number;
  pendingOffers: number;
  totalLeads: number;
  urgentLeads: number;
}

export default function SuperAdminDashboard({ setPage }: SuperAdminDashboardProps) {
  const [professionals, setProfessionals] = useState<ProfessionalProfile[]>([]);
  const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [auditLogs, setAuditLogs] = useState<AdminAction[]>([]);
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalProfessionals: 0,
    verifiedProfessionals: 0,
    pendingProfessionals: 0,
    rejectedProfessionals: 0,
    activeOffers: 0,
    pendingOffers: 0,
    totalLeads: 0,
    urgentLeads: 0,
  });
  
  const [selectedProfessional, setSelectedProfessional] = useState<ProfessionalProfile | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<JobOffer | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showProfessionalDialog, setShowProfessionalDialog] = useState(false);
  const [showOfferDialog, setShowOfferDialog] = useState(false);
  const [showLeadDialog, setShowLeadDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  
  const [adminInfo] = useState({ id: '1', email: 'admin@hogarbelen.org', name: 'Super Admin' });

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      const { data: proData } = await supabase.from('professional_profiles').select('*').order('created_at', { ascending: false });
      const { data: offerData } = await supabase.from('job_offers').select('*').order('created_at', { ascending: false });
      const { data: leadData } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
      const { data: auditData } = await supabase.from('admin_actions').select('*').order('created_at', { ascending: false }).limit(50);
      
      if (proData) setProfessionals(proData);
      if (offerData) setJobOffers(offerData);
      if (leadData) setLeads(leadData);
      if (auditData) setAuditLogs(auditData);
      
      calculateMetrics(proData || [], offerData || [], leadData || []);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const calculateMetrics = (pros: ProfessionalProfile[], offers: JobOffer[], lds: Lead[]) => {
    setMetrics({
      totalProfessionals: pros.length,
      verifiedProfessionals: pros.filter(p => p.check_verificado).length,
      pendingProfessionals: pros.filter(p => p.estado_perfil === 'pendiente_verificacion').length,
      rejectedProfessionals: pros.filter(p => p.estado_perfil === 'rechazado').length,
      activeOffers: offers.filter(o => o.estado === 'aprobada').length,
      pendingOffers: offers.filter(o => o.estado === 'pendiente').length,
      totalLeads: lds.length,
      urgentLeads: lds.filter(l => l.urgencia === 'urgente' && l.estado === 'nuevo').length,
    });
  };

  const logAdminAction = async (action: string, userAffected: string, details: any) => {
    try {
      const logEntry: Omit<AdminAction, 'id' | 'created_at'> = {
        accion: action,
        usuario_afectado: userAffected,
        admin_id: adminInfo.id,
        admin_email: adminInfo.email,
        detalles: details,
      };
      
      await supabase.from('admin_actions').insert([logEntry]);
      await loadAllData();
    } catch (error) {
      console.error('Error logging action:', error);
    }
  };

  const approveProfessional = async (professional: ProfessionalProfile) => {
    setLoading(true);
    try {
      const updates = {
        estado_perfil: 'aprobado',
        check_verificado: true,
        fecha_aprobacion: new Date().toISOString(),
        aprobado_por: adminInfo.email,
      };
      
      await supabase
        .from('professional_profiles')
        .update(updates)
        .eq('id', professional.id);
      
      await logAdminAction(
        'Profesional Aprobado',
        professional.nombre_completo,
        { categoria: professional.categoria_profesional, ciudad: professional.ciudad }
      );
      
      toast.success(`Profesional ${professional.nombre_completo} aprobado exitosamente`);
      setShowProfessionalDialog(false);
      await loadAllData();
    } catch (error) {
      console.error('Error approving professional:', error);
      toast.error('Error al aprobar profesional');
    } finally {
      setLoading(false);
    }
  };

  const rejectProfessional = async (professional: ProfessionalProfile) => {
    if (!rejectionReason) {
      toast.error('Debe especificar un motivo de rechazo');
      return;
    }
    
    setLoading(true);
    try {
      const updates = {
        estado_perfil: 'rechazado',
        check_verificado: false,
        motivo_rechazo: rejectionReason,
      };
      
      await supabase
        .from('professional_profiles')
        .update(updates)
        .eq('id', professional.id);
      
      await logAdminAction(
        'Profesional Rechazado',
        professional.nombre_completo,
        { motivo: rejectionReason }
      );
      
      toast.success(`Profesional ${professional.nombre_completo} rechazado`);
      setShowProfessionalDialog(false);
      setRejectionReason('');
      await loadAllData();
    } catch (error) {
      console.error('Error rejecting professional:', error);
      toast.error('Error al rechazar profesional');
    } finally {
      setLoading(false);
    }
  };

  const deleteProfessional = async (professional: ProfessionalProfile) => {
    if (!confirm(`¿Está seguro de eliminar el perfil de ${professional.nombre_completo}?`)) return;
    
    setLoading(true);
    try {
      await supabase
        .from('professional_profiles')
        .delete()
        .eq('id', professional.id);
      
      await logAdminAction(
        'Profesional Eliminado',
        professional.nombre_completo,
        { razon: 'Eliminación administrativa' }
      );
      
      toast.success('Profesional eliminado exitosamente');
      setShowProfessionalDialog(false);
      await loadAllData();
    } catch (error) {
      console.error('Error deleting professional:', error);
      toast.error('Error al eliminar profesional');
    } finally {
      setLoading(false);
    }
  };

  const approveJobOffer = async (offer: JobOffer) => {
    setLoading(true);
    try {
      await supabase
        .from('job_offers')
        .update({ estado: 'aprobada', fecha_publicacion: new Date().toISOString() })
        .eq('id', offer.id);
      
      await logAdminAction('Oferta Aprobada', offer.titulo, { ubicacion: offer.ubicacion });
      
      toast.success('Oferta de trabajo aprobada');
      setShowOfferDialog(false);
      await loadAllData();
    } catch (error) {
      console.error('Error approving offer:', error);
      toast.error('Error al aprobar oferta');
    } finally {
      setLoading(false);
    }
  };

  const rejectJobOffer = async (offer: JobOffer) => {
    setLoading(true);
    try {
      await supabase
        .from('job_offers')
        .update({ estado: 'rechazada' })
        .eq('id', offer.id);
      
      await logAdminAction('Oferta Rechazada', offer.titulo, { ubicacion: offer.ubicacion });
      
      toast.success('Oferta de trabajo rechazada');
      setShowOfferDialog(false);
      await loadAllData();
    } catch (error) {
      console.error('Error rejecting offer:', error);
      toast.error('Error al rechazar oferta');
    } finally {
      setLoading(false);
    }
  };

  const markLeadAsAttended = async (lead: Lead) => {
    setLoading(true);
    try {
      await supabase
        .from('leads')
        .update({ estado: 'atendido' })
        .eq('id', lead.id);
      
      await logAdminAction('Lead Atendido', lead.nombre, { tipo: lead.tipo_usuario });
      
      toast.success('Lead marcado como atendido');
      setShowLeadDialog(false);
      await loadAllData();
    } catch (error) {
      console.error('Error updating lead:', error);
      toast.error('Error al actualizar lead');
    } finally {
      setLoading(false);
    }
  };

  const filteredProfessionals = professionals.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'pendiente') return p.estado_perfil === 'pendiente_verificacion';
    if (filter === 'aprobado') return p.estado_perfil === 'aprobado';
    if (filter === 'rechazado') return p.estado_perfil === 'rechazado';
    if (filter === 'eliminado') return p.estado_perfil === 'eliminado_por_usuario';
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Panel de Super Administrador</h1>
            <p className="text-muted-foreground">Control integral de Hogar Belén</p>
          </div>
          <Button onClick={() => setPage('home')} variant="outline">
            Volver al Sitio
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setFilter('all')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profesionales Totales</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.totalProfessionals}</div>
              <p className="text-xs text-muted-foreground">Registrados en la plataforma</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setFilter('aprobado')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verificados</CardTitle>
              <UserCheck className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{metrics.verifiedProfessionals}</div>
              <p className="text-xs text-muted-foreground">Con check azul activo</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setFilter('pendiente')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
              <Clock className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">{metrics.pendingProfessionals}</div>
              <p className="text-xs text-muted-foreground">Esperando verificación</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Leads Urgentes</CardTitle>
              <Warning className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{metrics.urgentLeads}</div>
              <p className="text-xs text-muted-foreground">Requieren atención inmediata</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="professionals" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="professionals">
              <Users className="mr-2 h-4 w-4" />
              Profesionales
            </TabsTrigger>
            <TabsTrigger value="offers">
              <Briefcase className="mr-2 h-4 w-4" />
              Ofertas
            </TabsTrigger>
            <TabsTrigger value="leads">
              <Phone className="mr-2 h-4 w-4" />
              Leads
            </TabsTrigger>
            <TabsTrigger value="audit">
              <Shield className="mr-2 h-4 w-4" />
              Auditoría
            </TabsTrigger>
          </TabsList>

          <TabsContent value="professionals" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Profesionales</CardTitle>
                <CardDescription>Aprobar, rechazar o eliminar perfiles profesionales</CardDescription>
                
                <div className="flex gap-2 mt-4">
                  <Button
                    variant={filter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter('all')}
                  >
                    Todos
                  </Button>
                  <Button
                    variant={filter === 'pendiente' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter('pendiente')}
                  >
                    Pendientes ({metrics.pendingProfessionals})
                  </Button>
                  <Button
                    variant={filter === 'aprobado' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter('aprobado')}
                  >
                    Aprobados
                  </Button>
                  <Button
                    variant={filter === 'rechazado' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter('rechazado')}
                  >
                    Rechazados
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  <div className="space-y-4">
                    {filteredProfessionals.map((prof) => (
                      <Card key={prof.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold text-lg">{prof.nombre_completo}</h3>
                                {prof.check_verificado && (
                                  <Badge className="bg-blue-500">
                                    <CheckCircle className="mr-1 h-3 w-3" />
                                    Verificado
                                  </Badge>
                                )}
                                <Badge variant={
                                  prof.estado_perfil === 'aprobado' ? 'default' :
                                  prof.estado_perfil === 'pendiente_verificacion' ? 'secondary' :
                                  'destructive'
                                }>
                                  {prof.estado_perfil}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-1">{prof.titulo_profesional}</p>
                              <p className="text-sm text-muted-foreground mb-2">{prof.categoria_profesional}</p>
                              <div className="flex gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {prof.ciudad}
                                </span>
                                <span className="flex items-center gap-1">
                                  <CurrencyCircleDollar className="h-3 w-3" />
                                  ${prof.tarifa_por_hora?.toLocaleString('es-CO')}/hora
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {prof.años_experiencia} años exp.
                                </span>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              onClick={() => {
                                setSelectedProfessional(prof);
                                setShowProfessionalDialog(true);
                              }}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              Ver Detalle
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="offers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Ofertas de Trabajo</CardTitle>
                <CardDescription>Aprobar o rechazar ofertas publicadas</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  <div className="space-y-4">
                    {jobOffers.map((offer) => (
                      <Card key={offer.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold">{offer.titulo}</h3>
                                <Badge variant={offer.estado === 'aprobada' ? 'default' : 'secondary'}>
                                  {offer.estado}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-1">{offer.tipo_servicio}</p>
                              <p className="text-sm text-muted-foreground">{offer.ubicacion}</p>
                            </div>
                            <Button
                              size="sm"
                              onClick={() => {
                                setSelectedOffer(offer);
                                setShowOfferDialog(true);
                              }}
                            >
                              Ver Detalle
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leads" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Leads y Contactos</CardTitle>
                <CardDescription>Clasificación inteligente con IA</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  <div className="space-y-4">
                    {leads.map((lead) => (
                      <Card key={lead.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold">{lead.nombre}</h3>
                                <Badge>{lead.tipo_usuario}</Badge>
                                <Badge variant={lead.urgencia === 'urgente' ? 'destructive' : 'secondary'}>
                                  {lead.urgencia}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-1">{lead.email}</p>
                              <p className="text-sm text-muted-foreground">{lead.telefono}</p>
                            </div>
                            <Button
                              size="sm"
                              onClick={() => {
                                setSelectedLead(lead);
                                setShowLeadDialog(true);
                              }}
                            >
                              Ver Detalle
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audit" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Historial de Auditoría</CardTitle>
                <CardDescription>Registro de todas las acciones administrativas</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  <div className="space-y-3">
                    {auditLogs.map((log) => (
                      <div key={log.id} className="border-l-4 border-primary pl-4 py-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{log.accion}</p>
                            <p className="text-sm text-muted-foreground">Usuario: {log.usuario_afectado}</p>
                            <p className="text-sm text-muted-foreground">Admin: {log.admin_email}</p>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {new Date(log.created_at || '').toLocaleString('es-CO')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={showProfessionalDialog} onOpenChange={setShowProfessionalDialog}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Detalle del Profesional</DialogTitle>
              <DialogDescription>Revisa la información y decide la acción</DialogDescription>
            </DialogHeader>
            
            {selectedProfessional && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Nombre Completo</Label>
                    <p className="font-medium">{selectedProfessional.nombre_completo}</p>
                  </div>
                  <div>
                    <Label>Título Profesional</Label>
                    <p className="font-medium">{selectedProfessional.titulo_profesional}</p>
                  </div>
                  <div>
                    <Label>Categoría</Label>
                    <p className="font-medium">{selectedProfessional.categoria_profesional}</p>
                  </div>
                  <div>
                    <Label>Ciudad</Label>
                    <p className="font-medium">{selectedProfessional.ciudad}</p>
                  </div>
                  <div>
                    <Label>Teléfono</Label>
                    <p className="font-medium">{selectedProfessional.telefono}</p>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <p className="font-medium">{selectedProfessional.email}</p>
                  </div>
                  <div>
                    <Label>Experiencia</Label>
                    <p className="font-medium">{selectedProfessional.años_experiencia} años</p>
                  </div>
                  <div>
                    <Label>Tarifa</Label>
                    <p className="font-medium">${selectedProfessional.tarifa_por_hora?.toLocaleString('es-CO')}/hora</p>
                  </div>
                </div>
                
                <div>
                  <Label>Descripción Profesional</Label>
                  <p className="text-sm mt-1">{selectedProfessional.descripcion_profesional}</p>
                </div>
                
                <div>
                  <Label>Días Disponibles</Label>
                  <p className="text-sm mt-1">{selectedProfessional.dias_disponibles?.join(', ')}</p>
                </div>
                
                <div>
                  <Label>Horario</Label>
                  <p className="text-sm mt-1">{selectedProfessional.horario_atencion}</p>
                </div>
                
                {selectedProfessional.estado_perfil === 'pendiente_verificacion' && (
                  <div>
                    <Label>Motivo de Rechazo (si aplica)</Label>
                    <Select value={rejectionReason} onValueChange={setRejectionReason}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un motivo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Documentos incompletos">Documentos incompletos</SelectItem>
                        <SelectItem value="Información inconsistente">Información inconsistente</SelectItem>
                        <SelectItem value="Información dudosa">Información dudosa</SelectItem>
                        <SelectItem value="No cumple requisitos">No cumple requisitos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            )}
            
            <DialogFooter>
              <div className="flex gap-2 w-full justify-between">
                <Button
                  variant="destructive"
                  onClick={() => selectedProfessional && deleteProfessional(selectedProfessional)}
                  disabled={loading}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Eliminar
                </Button>
                <div className="flex gap-2">
                  {selectedProfessional?.estado_perfil === 'pendiente_verificacion' && (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => selectedProfessional && rejectProfessional(selectedProfessional)}
                        disabled={loading}
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Rechazar
                      </Button>
                      <Button
                        onClick={() => selectedProfessional && approveProfessional(selectedProfessional)}
                        disabled={loading}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Aprobar
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showOfferDialog} onOpenChange={setShowOfferDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Detalle de la Oferta</DialogTitle>
            </DialogHeader>
            
            {selectedOffer && (
              <div className="space-y-4">
                <div>
                  <Label>Título</Label>
                  <p className="font-medium">{selectedOffer.titulo}</p>
                </div>
                <div>
                  <Label>Tipo de Servicio</Label>
                  <p>{selectedOffer.tipo_servicio}</p>
                </div>
                <div>
                  <Label>Ubicación</Label>
                  <p>{selectedOffer.ubicacion}</p>
                </div>
                <div>
                  <Label>Descripción</Label>
                  <p className="text-sm">{selectedOffer.descripcion}</p>
                </div>
                <div>
                  <Label>Contacto</Label>
                  <p>{selectedOffer.contacto}</p>
                </div>
              </div>
            )}
            
            <DialogFooter>
              {selectedOffer?.estado === 'pendiente' && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => selectedOffer && rejectJobOffer(selectedOffer)}
                    disabled={loading}
                  >
                    Rechazar
                  </Button>
                  <Button
                    onClick={() => selectedOffer && approveJobOffer(selectedOffer)}
                    disabled={loading}
                  >
                    Aprobar
                  </Button>
                </div>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showLeadDialog} onOpenChange={setShowLeadDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Detalle del Lead</DialogTitle>
            </DialogHeader>
            
            {selectedLead && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Nombre</Label>
                    <p className="font-medium">{selectedLead.nombre}</p>
                  </div>
                  <div>
                    <Label>Tipo</Label>
                    <Badge>{selectedLead.tipo_usuario}</Badge>
                  </div>
                </div>
                <div>
                  <Label>Email</Label>
                  <p>{selectedLead.email}</p>
                </div>
                <div>
                  <Label>Teléfono</Label>
                  <p>{selectedLead.telefono}</p>
                </div>
                <div>
                  <Label>Ciudad</Label>
                  <p>{selectedLead.ciudad}</p>
                </div>
                <div>
                  <Label>Mensaje</Label>
                  <p className="text-sm">{selectedLead.mensaje}</p>
                </div>
                {selectedLead.ia_clasificacion && (
                  <Alert>
                    <AlertDescription>
                      <strong>Análisis IA:</strong> {JSON.stringify(selectedLead.ia_clasificacion, null, 2)}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}
            
            <DialogFooter>
              {selectedLead?.estado === 'nuevo' && (
                <Button
                  onClick={() => selectedLead && markLeadAsAttended(selectedLead)}
                  disabled={loading}
                >
                  Marcar como Atendido
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
