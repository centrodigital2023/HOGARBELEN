import { useState, useEffect } from 'react';
import { useKV } from '@github/spark/hooks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
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
} from '@phosphor-icons/react';
import { useOpenAI } from '@/hooks/useOpenAI';

interface Professional {
  id: string;
  nombre_completo: string;
  titulo_profesional: string;
  categoria: string;
  ciudad: string;
  telefono: string;
  email: string;
  foto_url?: string;
  descripcion: string;
  años_experiencia: number;
  dias_disponibles: string[];
  horario: string;
  tarifa_hora: number;
  documentos: string[];
  estado: 'pendiente' | 'aprobado' | 'rechazado' | 'eliminado_por_usuario';
  check_verificado: boolean;
  fecha_registro: string;
  fecha_aprobacion?: string;
  aprobado_por?: string;
  motivo_rechazo?: string;
  ai_analysis?: any;
}

interface JobOffer {
  id: string;
  titulo: string;
  tipo_servicio: string;
  ubicacion: string;
  descripcion: string;
  contacto: string;
  fecha_publicacion: string;
  estado: 'pendiente' | 'aprobado' | 'rechazado';
  publicado_por: string;
}

interface Lead {
  id: string;
  nombre: string;
  ciudad: string;
  telefono: string;
  email: string;
  tipo: 'familia' | 'profesional' | 'empleador';
  mensaje: string;
  necesidad: string;
  urgencia: 'alta' | 'media' | 'baja';
  estado: 'pendiente' | 'atendido';
  fecha: string;
  ai_analysis?: any;
}

interface AuditLog {
  id: string;
  accion: string;
  usuario_afectado: string;
  fecha: string;
  administrador: string;
  detalles: string;
}

interface SuperAdminDashboardProps {
  setPage: (page: string) => void;
}

export default function SuperAdminDashboard({ setPage }: SuperAdminDashboardProps) {
  const [professionals = [], setProfessionals] = useKV<Professional[]>('professionals-list', []);
  const [jobOffers = [], setJobOffers] = useKV<JobOffer[]>('job-offers-list', []);
  const [leads = [], setLeads] = useKV<Lead[]>('leads-list', []);
  const [auditLogs = [], setAuditLogs] = useKV<AuditLog[]>('audit-logs', []);
  
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<JobOffer | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [activeAction, setActiveAction] = useState<'professional' | 'offer' | null>(null);

  const { validateProfessionalProfile, classifyLead, loading: aiLoading } = useOpenAI();

  const adminUser = 'Super Admin';

  const addAuditLog = (accion: string, usuarioAfectado: string, detalles: string) => {
    const newLog: AuditLog = {
      id: Date.now().toString(),
      accion,
      usuario_afectado: usuarioAfectado,
      fecha: new Date().toISOString(),
      administrador: adminUser,
      detalles,
    };
    setAuditLogs((logs = []) => [newLog, ...logs]);
  };

  const approveProfessional = async (professional: Professional) => {
    setProfessionals((profs = []) =>
      profs.map((p) =>
        p.id === professional.id
          ? {
              ...p,
              estado: 'aprobado',
              check_verificado: true,
              fecha_aprobacion: new Date().toISOString(),
              aprobado_por: adminUser,
            }
          : p
      )
    );

    addAuditLog(
      'Profesional Aprobado',
      professional.nombre_completo,
      `Perfil aprobado y check azul activado. Categoría: ${professional.categoria}`
    );

    toast.success(`${professional.nombre_completo} ha sido aprobado con éxito`);
    setSelectedProfessional(null);
  };

  const rejectProfessional = () => {
    if (!selectedProfessional || !rejectReason) {
      toast.error('Debe proporcionar un motivo de rechazo');
      return;
    }

    setProfessionals((profs = []) =>
      profs.map((p) =>
        p.id === selectedProfessional.id
          ? {
              ...p,
              estado: 'rechazado',
              check_verificado: false,
              motivo_rechazo: rejectReason,
            }
          : p
      )
    );

    addAuditLog(
      'Profesional Rechazado',
      selectedProfessional.nombre_completo,
      `Motivo: ${rejectReason}`
    );

    toast.error(`${selectedProfessional.nombre_completo} ha sido rechazado`);
    setShowRejectDialog(false);
    setSelectedProfessional(null);
    setRejectReason('');
  };

  const approveJobOffer = (offer: JobOffer) => {
    setJobOffers((offers = []) =>
      offers.map((o) =>
        o.id === offer.id
          ? { ...o, estado: 'aprobado' }
          : o
      )
    );

    addAuditLog('Oferta Aprobada', offer.titulo, `Tipo: ${offer.tipo_servicio}, Ubicación: ${offer.ubicacion}`);
    toast.success('Oferta de trabajo aprobada');
    setSelectedOffer(null);
  };

  const rejectJobOffer = () => {
    if (!selectedOffer || !rejectReason) {
      toast.error('Debe proporcionar un motivo de rechazo');
      return;
    }

    setJobOffers((offers = []) =>
      offers.map((o) =>
        o.id === selectedOffer.id
          ? { ...o, estado: 'rechazado' }
          : o
      )
    );

    addAuditLog('Oferta Rechazada', selectedOffer.titulo, `Motivo: ${rejectReason}`);
    toast.error('Oferta de trabajo rechazada');
    setShowRejectDialog(false);
    setSelectedOffer(null);
    setRejectReason('');
  };

  const markLeadAsAttended = (lead: Lead) => {
    setLeads((leadsList = []) =>
      leadsList.map((l) =>
        l.id === lead.id
          ? { ...l, estado: 'atendido' }
          : l
      )
    );

    addAuditLog('Lead Atendido', lead.nombre, `Tipo: ${lead.tipo}, Urgencia: ${lead.urgencia}`);
    toast.success('Lead marcado como atendido');
  };

  const analyzeLeadWithAI = async (lead: Lead) => {
    const analysis = await classifyLead({
      nombre: lead.nombre,
      ciudad: lead.ciudad,
      tipo: lead.tipo,
      mensaje: lead.mensaje,
      necesidad: lead.necesidad,
    });

    if (analysis) {
      setLeads((leadsList = []) =>
        leadsList.map((l) =>
          l.id === lead.id
            ? { ...l, ai_analysis: analysis, urgencia: analysis.urgencia }
            : l
        )
      );
      toast.success('Análisis IA completado');
    }
  };

  const analyzeProfessionalWithAI = async (professional: Professional) => {
    const analysis = await validateProfessionalProfile({
      nombre_completo: professional.nombre_completo,
      categoria: professional.categoria,
      años_experiencia: professional.años_experiencia,
      descripcion: professional.descripcion,
      ciudad: professional.ciudad,
    });

    if (analysis) {
      setProfessionals((profs = []) =>
        profs.map((p) =>
          p.id === professional.id
            ? { ...p, ai_analysis: analysis }
            : p
        )
      );
      toast.success('Análisis IA completado');
    }
  };

  const stats = {
    totalProfessionals: professionals.length,
    verifiedProfessionals: professionals.filter((p) => p.check_verificado).length,
    pendingProfessionals: professionals.filter((p) => p.estado === 'pendiente').length,
    rejectedProfessionals: professionals.filter((p) => p.estado === 'rechazado').length,
    totalOffers: jobOffers.length,
    pendingOffers: jobOffers.filter((o) => o.estado === 'pendiente').length,
    approvedOffers: jobOffers.filter((o) => o.estado === 'aprobado').length,
    totalLeads: leads.length,
    urgentLeads: leads.filter((l) => l.urgencia === 'alta' && l.estado === 'pendiente').length,
    pendingLeads: leads.filter((l) => l.estado === 'pendiente').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard Superadministrador</h1>
            <p className="text-muted-foreground">Centro de control integral - Hogar Belén</p>
          </div>
          <Button variant="outline" onClick={() => setPage('home')}>
            Volver al inicio
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-primary-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Profesionales</CardTitle>
              <Users className="h-5 w-5 text-primary" weight="duotone" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{stats.totalProfessionals}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.verifiedProfessionals} verificados
              </p>
            </CardContent>
          </Card>

          <Card className="border-amber-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
              <Clock className="h-5 w-5 text-amber-600" weight="duotone" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-600">{stats.pendingProfessionals}</div>
              <p className="text-xs text-muted-foreground mt-1">Profesionales por revisar</p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Ofertas</CardTitle>
              <Briefcase className="h-5 w-5 text-blue-600" weight="duotone" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{stats.totalOffers}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.pendingOffers} pendientes
              </p>
            </CardContent>
          </Card>

          <Card className="border-red-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Leads Urgentes</CardTitle>
              <Warning className="h-5 w-5 text-red-600" weight="duotone" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">{stats.urgentLeads}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.pendingLeads} leads totales pendientes
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="professionals" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="professionals">Profesionales</TabsTrigger>
            <TabsTrigger value="offers">Ofertas</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="audit">Auditoría</TabsTrigger>
          </TabsList>

          <TabsContent value="professionals" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Profesionales</CardTitle>
                <CardDescription>
                  Revisa, aprueba o rechaza profesionales registrados
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {professionals
                  .filter((p) => p.estado !== 'eliminado_por_usuario')
                  .map((professional) => (
                    <Card key={professional.id} className="p-4 border-l-4 border-l-primary">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">{professional.nombre_completo}</h3>
                            {professional.check_verificado && (
                              <Badge className="bg-blue-500">
                                <CheckCircle className="h-3 w-3 mr-1" weight="fill" />
                                Verificado
                              </Badge>
                            )}
                            <Badge
                              variant={
                                professional.estado === 'aprobado'
                                  ? 'default'
                                  : professional.estado === 'rechazado'
                                  ? 'destructive'
                                  : 'secondary'
                              }
                            >
                              {professional.estado}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">
                            {professional.titulo_profesional} · {professional.categoria}
                          </p>
                          <p className="text-sm text-muted-foreground mb-2">
                            📍 {professional.ciudad} · 💰 ${professional.tarifa_hora.toLocaleString()}/hora
                          </p>
                          <p className="text-sm mb-2">{professional.descripcion}</p>
                          <div className="flex gap-2 text-xs text-muted-foreground">
                            <span>📞 {professional.telefono}</span>
                            <span>✉️ {professional.email}</span>
                            <span>📅 {new Date(professional.fecha_registro).toLocaleDateString()}</span>
                          </div>
                          {professional.ai_analysis && (
                            <div className="mt-2 p-2 bg-purple-50 rounded-md">
                              <p className="text-xs font-semibold text-purple-900">Análisis IA:</p>
                              <p className="text-xs text-purple-800">
                                {professional.ai_analysis.observaciones_admin}
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col gap-2 ml-4">
                          {professional.estado === 'pendiente' && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => analyzeProfessionalWithAI(professional)}
                                disabled={aiLoading}
                                variant="outline"
                              >
                                <ChartLine className="h-4 w-4 mr-1" />
                                Analizar IA
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => approveProfessional(professional)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" weight="fill" />
                                Aprobar
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => {
                                  setSelectedProfessional(professional);
                                  setActiveAction('professional');
                                  setShowRejectDialog(true);
                                }}
                              >
                                <XCircle className="h-4 w-4 mr-1" weight="fill" />
                                Rechazar
                              </Button>
                            </>
                          )}
                          <Button size="sm" variant="outline" onClick={() => setSelectedProfessional(professional)}>
                            <Eye className="h-4 w-4 mr-1" />
                            Ver detalles
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                {professionals.filter((p) => p.estado !== 'eliminado_por_usuario').length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No hay profesionales registrados
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="offers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Ofertas de Trabajo</CardTitle>
                <CardDescription>Aprueba o rechaza ofertas publicadas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {jobOffers.map((offer) => (
                  <Card key={offer.id} className="p-4 border-l-4 border-l-blue-500">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{offer.titulo}</h3>
                          <Badge
                            variant={
                              offer.estado === 'aprobado'
                                ? 'default'
                                : offer.estado === 'rechazado'
                                ? 'destructive'
                                : 'secondary'
                            }
                          >
                            {offer.estado}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {offer.tipo_servicio} · {offer.ubicacion}
                        </p>
                        <p className="text-sm mb-2">{offer.descripcion}</p>
                        <div className="flex gap-2 text-xs text-muted-foreground">
                          <span>📞 {offer.contacto}</span>
                          <span>📅 {new Date(offer.fecha_publicacion).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        {offer.estado === 'pendiente' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => approveJobOffer(offer)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" weight="fill" />
                              Aprobar
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => {
                                setSelectedOffer(offer);
                                setActiveAction('offer');
                                setShowRejectDialog(true);
                              }}
                            >
                              <XCircle className="h-4 w-4 mr-1" weight="fill" />
                              Rechazar
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
                {jobOffers.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No hay ofertas de trabajo registradas
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leads" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Leads</CardTitle>
                <CardDescription>
                  Visualiza y gestiona los contactos recibidos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {leads.map((lead) => (
                  <Card
                    key={lead.id}
                    className={`p-4 border-l-4 ${
                      lead.urgencia === 'alta'
                        ? 'border-l-red-500'
                        : lead.urgencia === 'media'
                        ? 'border-l-amber-500'
                        : 'border-l-green-500'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{lead.nombre}</h3>
                          <Badge
                            variant={lead.urgencia === 'alta' ? 'destructive' : 'secondary'}
                          >
                            {lead.urgencia}
                          </Badge>
                          <Badge variant={lead.estado === 'atendido' ? 'default' : 'outline'}>
                            {lead.estado}
                          </Badge>
                          <Badge>{lead.tipo}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          📍 {lead.ciudad} · 📞 {lead.telefono}
                        </p>
                        <p className="text-sm mb-2">
                          <strong>Necesidad:</strong> {lead.necesidad}
                        </p>
                        <p className="text-sm mb-2">{lead.mensaje}</p>
                        {lead.ai_analysis && (
                          <div className="mt-2 p-2 bg-purple-50 rounded-md">
                            <p className="text-xs font-semibold text-purple-900">Análisis IA:</p>
                            <p className="text-xs text-purple-800">
                              {lead.ai_analysis.observaciones_admin}
                            </p>
                            <p className="text-xs text-purple-800 mt-1">
                              Recomendación: {lead.ai_analysis.recomendacion_accion}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        {lead.estado === 'pendiente' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => analyzeLeadWithAI(lead)}
                              disabled={aiLoading}
                              variant="outline"
                            >
                              <ChartLine className="h-4 w-4 mr-1" />
                              Analizar IA
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => markLeadAsAttended(lead)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" weight="fill" />
                              Marcar atendido
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
                {leads.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">No hay leads registrados</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audit" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Historial de Auditoría</CardTitle>
                <CardDescription>
                  Registro completo de acciones administrativas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {auditLogs.map((log) => (
                  <Card key={log.id} className="p-3 bg-muted/50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Shield className="h-4 w-4 text-primary" weight="duotone" />
                          <span className="font-semibold text-sm">{log.accion}</span>
                          <Badge variant="outline" className="text-xs">
                            {log.administrador}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Usuario: {log.usuario_afectado}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{log.detalles}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(log.fecha).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
                {auditLogs.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No hay registros de auditoría
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Motivo de Rechazo</DialogTitle>
              <DialogDescription>
                Por favor, proporcione un motivo claro para el rechazo
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Textarea
                placeholder="Ejemplo: Documentos incompletos, información inconsistente..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows={4}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  if (activeAction === 'professional') {
                    rejectProfessional();
                  } else if (activeAction === 'offer') {
                    rejectJobOffer();
                  }
                }}
              >
                Confirmar Rechazo
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
