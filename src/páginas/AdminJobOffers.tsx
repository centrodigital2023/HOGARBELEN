import { useState, useEffect } from 'react';
import { useAdminAuth } from '@/contextos/AdminAuthContext';
import { useKV } from '@github/spark/hooks';
import { JobOffer } from '@/types/admin';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  ArrowLeft, Plus, MagnifyingGlass, Briefcase, Eye, CheckCircle,
  XCircle, Trash, Robot, Warning, Calendar
} from '@phosphor-icons/react';
import { toast } from 'sonner';
import { logAudit } from '@/lib/audit';

interface AdminJobOffersProps {
  setPage: (page: string) => void;
}

const AdminJobOffers = ({ setPage }: AdminJobOffersProps) => {
  const { isAuthenticated, adminUser } = useAdminAuth();
  const [jobOffers, setJobOffers] = useKV<JobOffer[]>('job-offers', []);
  const [selectedOffer, setSelectedOffer] = useState<JobOffer | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [analyzingAI, setAnalyzingAI] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);

  const [formData, setFormData] = useState({
    title: '',
    service_type: '',
    location: '',
    description: '',
    requirements: '',
    salary_range: '',
    contact: '',
    urgency: 'normal' as 'normal' | 'urgent',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      setPage('admin-login');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const pendingOffers = (jobOffers || []).filter(j => j.status === 'pending' && !j.ai_review);
    
    if (pendingOffers.length > 0) {
      pendingOffers.forEach(async (offer) => {
        await analyzeOfferWithAI(offer);
      });
    }
  }, [jobOffers]);

  const filteredOffers = (jobOffers || []).filter(offer => {
    const matchesSearch = !searchTerm || 
      offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.service_type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || offer.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const analyzeOfferWithAI = async (offer: JobOffer) => {
    setAnalyzingAI(true);
    try {
      const prompt = (window.spark.llmPrompt as any)`Analyze this job offer for quality and compliance:

Title: ${offer.title}
Service Type: ${offer.service_type}
Description: ${offer.description}
Requirements: ${offer.requirements || 'Not specified'}
Salary Range: ${offer.salary_range || 'Not specified'}

Analyze:
1. Overall quality score (0-1)
2. Language appropriateness (professional, clear, no discrimination)
3. Legal compliance check (no discriminatory language, fair practices)
4. Completeness of information
5. Red flags or concerns
6. Recommendation (approve/review/reject)

Return JSON: {
  "quality_score": 0-1,
  "language_check": true/false,
  "legal_check": true/false,
  "completeness": 0-1,
  "concerns": ["concern1", "concern2"],
  "recommendation": "approve|review|reject",
  "reasoning": "explanation"
}`;

      const response = await window.spark.llm(prompt, 'gpt-4o', true);
      const analysis = JSON.parse(response);
      setAiAnalysis(analysis);

      await setJobOffers((current) =>
        (current || []).map(j =>
          j.id === offer.id
            ? {
                ...j,
                ai_review: {
                  score: analysis.quality_score,
                  legal_check: analysis.legal_check,
                  language_check: analysis.language_check,
                  concerns: analysis.concerns,
                },
              }
            : j
        )
      );

      toast.success('Análisis IA completado');
    } catch (error) {
      console.error('AI Analysis error:', error);
      toast.error('Error al analizar con IA');
    } finally {
      setAnalyzingAI(false);
    }
  };

  const createOffer = async () => {
    if (!formData.title || !formData.service_type || !formData.description) {
      toast.error('Complete los campos requeridos');
      return;
    }

    const newOffer: JobOffer = {
      id: `offer-${Date.now()}`,
      ...formData,
      status: 'approved',
      active: true,
      views: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    await setJobOffers((current) => [...(current || []), newOffer]);

    await logAudit({
      user_id: adminUser?.id || 'unknown',
      user_email: adminUser?.email || 'unknown',
      action: 'create_job_offer',
      resource_type: 'offer',
      resource_id: newOffer.id,
      details: { title: newOffer.title },
      ip_address: 'admin',
      user_agent: navigator.userAgent,
    });

    toast.success('Oferta de trabajo creada');
    setIsCreating(false);
    setFormData({
      title: '',
      service_type: '',
      location: '',
      description: '',
      requirements: '',
      salary_range: '',
      contact: '',
      urgency: 'normal',
    });
  };

  const approveOffer = async (offer: JobOffer) => {
    await setJobOffers((current) =>
      (current || []).map(j =>
        j.id === offer.id
          ? { ...j, status: 'approved' as const, active: true, updated_at: new Date().toISOString() }
          : j
      )
    );

    await logAudit({
      user_id: adminUser?.id || 'unknown',
      user_email: adminUser?.email || 'unknown',
      action: 'approve_job_offer',
      resource_type: 'offer',
      resource_id: offer.id,
      details: { title: offer.title },
      ip_address: 'admin',
      user_agent: navigator.userAgent,
    });

    toast.success('Oferta aprobada');
    setSelectedOffer(null);
  };

  const rejectOffer = async (offer: JobOffer) => {
    await setJobOffers((current) =>
      (current || []).map(j =>
        j.id === offer.id
          ? { ...j, status: 'rejected' as const, active: false, updated_at: new Date().toISOString() }
          : j
      )
    );

    await logAudit({
      user_id: adminUser?.id || 'unknown',
      user_email: adminUser?.email || 'unknown',
      action: 'reject_job_offer',
      resource_type: 'offer',
      resource_id: offer.id,
      details: { title: offer.title },
      ip_address: 'admin',
      user_agent: navigator.userAgent,
    });

    toast.success('Oferta rechazada');
    setSelectedOffer(null);
  };

  const deleteOffer = async (offer: JobOffer) => {
    if (!confirm('¿Está seguro de eliminar esta oferta de trabajo?')) {
      return;
    }

    await setJobOffers((current) =>
      (current || []).filter(j => j.id !== offer.id)
    );

    await logAudit({
      user_id: adminUser?.id || 'unknown',
      user_email: adminUser?.email || 'unknown',
      action: 'delete_job_offer',
      resource_type: 'offer',
      resource_id: offer.id,
      details: { title: offer.title },
      ip_address: 'admin',
      user_agent: navigator.userAgent,
    });

    toast.success('Oferta eliminada');
    setSelectedOffer(null);
  };

  const toggleActiveStatus = async (offer: JobOffer) => {
    await setJobOffers((current) =>
      (current || []).map(j =>
        j.id === offer.id
          ? { ...j, active: !j.active, updated_at: new Date().toISOString() }
          : j
      )
    );

    toast.success(offer.active ? 'Oferta desactivada' : 'Oferta activada');
  };

  const pendingCount = (jobOffers || []).filter(j => j.status === 'pending').length;
  const activeCount = (jobOffers || []).filter(j => j.active).length;
  const rejectedCount = (jobOffers || []).filter(j => j.status === 'rejected').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => setPage('admin-dashboard')}>
                <ArrowLeft size={16} className="mr-2" />
                Volver
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Gestión de Ofertas de Trabajo</h1>
                <p className="text-sm text-gray-600">Crear, aprobar y gestionar ofertas laborales</p>
              </div>
            </div>
            <Button onClick={() => setIsCreating(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus size={16} className="mr-2" />
              Nueva Oferta
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Total</p>
                <p className="text-3xl font-bold">{(jobOffers || []).length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Activas</p>
                <p className="text-3xl font-bold text-green-600">{activeCount}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Pendientes</p>
                <p className="text-3xl font-bold text-amber-600">{pendingCount}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Rechazadas</p>
                <p className="text-3xl font-bold text-red-600">{rejectedCount}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <MagnifyingGlass size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Buscar ofertas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="pending">Pendientes</SelectItem>
                  <SelectItem value="approved">Aprobadas</SelectItem>
                  <SelectItem value="rejected">Rechazadas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4">
          {filteredOffers.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-gray-500">
                No se encontraron ofertas de trabajo
              </CardContent>
            </Card>
          ) : (
            filteredOffers.map((offer) => (
              <Card key={offer.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{offer.title}</h3>
                        {offer.active ? (
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle size={14} className="mr-1" />
                            Activa
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Inactiva</Badge>
                        )}
                        {offer.status === 'pending' && (
                          <Badge className="bg-amber-100 text-amber-800">Pendiente</Badge>
                        )}
                        {offer.urgency === 'urgent' && (
                          <Badge variant="destructive">Urgente</Badge>
                        )}
                        {offer.ai_review && offer.ai_review.concerns.length > 0 && (
                          <Badge variant="outline" className="bg-red-50 border-red-200">
                            <Warning size={14} className="mr-1" />
                            {offer.ai_review.concerns.length} alertas
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600 mb-1">{offer.service_type} • {offer.location}</p>
                      <p className="text-sm text-gray-500 line-clamp-2">{offer.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(offer.created_at).toLocaleDateString('es-CO')}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye size={12} />
                          {offer.views} vistas
                        </div>
                        {offer.ai_review && (
                          <div className="flex items-center gap-1">
                            <Robot size={12} />
                            Puntuación: {(offer.ai_review.score * 100).toFixed(0)}%
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedOffer(offer);
                          setAiAnalysis(null);
                        }}
                      >
                        <Eye size={16} className="mr-1" />
                        Ver
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      <Dialog open={isCreating} onOpenChange={setIsCreating}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Nueva Oferta de Trabajo</DialogTitle>
            <DialogDescription>
              Complete la información de la oferta laboral
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Título *</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ej: Enfermero/a especializado en geriatría"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Tipo de Servicio *</label>
                <Input
                  value={formData.service_type}
                  onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
                  placeholder="Ej: Enfermería"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Ubicación *</label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Ej: Buesaco, Nariño"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Descripción *</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describa las responsabilidades y el entorno de trabajo..."
                rows={4}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Requisitos</label>
              <Textarea
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                placeholder="Liste los requisitos y calificaciones necesarias..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Rango Salarial</label>
                <Input
                  value={formData.salary_range}
                  onChange={(e) => setFormData({ ...formData, salary_range: e.target.value })}
                  placeholder="Ej: $1,500,000 - $2,000,000"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Contacto</label>
                <Input
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  placeholder="Email o teléfono"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Urgencia</label>
              <Select
                value={formData.urgency}
                onValueChange={(value: 'normal' | 'urgent') =>
                  setFormData({ ...formData, urgency: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="urgent">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={createOffer} className="flex-1">
                Crear Oferta
              </Button>
              <Button variant="outline" onClick={() => setIsCreating(false)} className="flex-1">
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedOffer} onOpenChange={() => setSelectedOffer(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalles de la Oferta</DialogTitle>
            <DialogDescription>
              Revisar, aprobar o gestionar la oferta de trabajo
            </DialogDescription>
          </DialogHeader>

          {selectedOffer && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-600">Título</label>
                  <p className="text-base font-semibold">{selectedOffer.title}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Tipo de Servicio</label>
                  <p className="text-base">{selectedOffer.service_type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Ubicación</label>
                  <p className="text-base">{selectedOffer.location}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-600">Descripción</label>
                  <p className="text-base">{selectedOffer.description}</p>
                </div>
                {selectedOffer.requirements && (
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-600">Requisitos</label>
                    <p className="text-base">{selectedOffer.requirements}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-gray-600">Rango Salarial</label>
                  <p className="text-base">{selectedOffer.salary_range || 'No especificado'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Contacto</label>
                  <p className="text-base">{selectedOffer.contact}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Estado</label>
                  <p className="text-base">{selectedOffer.active ? 'Activa' : 'Inactiva'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Vistas</label>
                  <p className="text-base">{selectedOffer.views}</p>
                </div>
              </div>

              {aiAnalysis && (
                <Alert className={aiAnalysis.concerns.length > 0 ? 'border-red-500 bg-red-50' : 'border-blue-500 bg-blue-50'}>
                  <Robot size={20} />
                  <AlertDescription>
                    <div className="space-y-2">
                      <p className="font-semibold">Análisis IA</p>
                      <p className="text-sm"><strong>Recomendación:</strong> {aiAnalysis.recommendation}</p>
                      <p className="text-sm"><strong>Puntuación de Calidad:</strong> {(aiAnalysis.quality_score * 100).toFixed(0)}%</p>
                      <p className="text-sm"><strong>Verificación Legal:</strong> {aiAnalysis.legal_check ? '✓ Aprobada' : '✗ Rechazada'}</p>
                      <p className="text-sm"><strong>Verificación de Lenguaje:</strong> {aiAnalysis.language_check ? '✓ Aprobada' : '✗ Rechazada'}</p>
                      {aiAnalysis.concerns.length > 0 && (
                        <div>
                          <p className="text-sm font-semibold">Preocupaciones:</p>
                          <ul className="list-disc list-inside text-sm">
                            {aiAnalysis.concerns.map((concern: string, idx: number) => (
                              <li key={idx}>{concern}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <p className="text-sm"><strong>Razonamiento:</strong> {aiAnalysis.reasoning}</p>
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => analyzeOfferWithAI(selectedOffer)}
                  disabled={analyzingAI}
                  className="flex-1"
                >
                  {analyzingAI ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2" />
                      Analizando...
                    </>
                  ) : (
                    <>
                      <Robot size={16} className="mr-2" />
                      Analizar con IA
                    </>
                  )}
                </Button>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <div className="flex gap-2">
                  {selectedOffer.status === 'pending' && (
                    <>
                      <Button
                        onClick={() => approveOffer(selectedOffer)}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle size={16} className="mr-2" />
                        Aprobar
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => rejectOffer(selectedOffer)}
                        className="flex-1"
                      >
                        <XCircle size={16} className="mr-2" />
                        Rechazar
                      </Button>
                    </>
                  )}
                  {selectedOffer.status === 'approved' && (
                    <Button
                      variant="outline"
                      onClick={() => toggleActiveStatus(selectedOffer)}
                      className="flex-1"
                    >
                      {selectedOffer.active ? 'Desactivar' : 'Activar'}
                    </Button>
                  )}
                  <Button
                    variant="destructive"
                    onClick={() => deleteOffer(selectedOffer)}
                    className="flex-1"
                  >
                    <Trash size={16} className="mr-2" />
                    Eliminar
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminJobOffers;
