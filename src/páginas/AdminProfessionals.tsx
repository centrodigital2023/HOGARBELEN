import { useState, useEffect } from 'react';
import { useAdminAuth } from '@/contextos/AdminAuthContext';
import { useKV } from '@github/spark/hooks';
import { Professional, AIAlert } from '@/types/admin';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  UserCheck, UserMinus, Eye, Robot, Warning, CheckCircle, 
  XCircle, ArrowLeft, MagnifyingGlass, Funnel, Trash, FileText
} from '@phosphor-icons/react';
import { toast } from 'sonner';
import { logAudit } from '@/lib/audit';
import { notifyProfessionalApproval, notifyProfessionalRejection } from '@/lib/email';

interface AdminProfessionalsProps {
  setPage: (page: string) => void;
}

const AdminProfessionals = ({ setPage }: AdminProfessionalsProps) => {
  const { adminUser, isAuthenticated } = useAdminAuth();
  const [professionals, setProfessionals] = useKV<Professional[]>('professionals', []);
  const [aiAlerts, setAiAlerts] = useKV<AIAlert[]>('ai-alerts', []);
  const [selectedPro, setSelectedPro] = useState<Professional | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [analyzingAI, setAnalyzingAI] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      setPage('admin-login');
    }
  }, [isAuthenticated]);

  const filteredProfessionals = (professionals || []).filter(pro => {
    const matchesFilter = filter === 'all' || pro.status === filter;
    const matchesSearch = !searchTerm || 
      pro.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pro.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pro.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const analyzeWithAI = async (professional: Professional) => {
    setAnalyzingAI(true);
    try {
      const prompt = (window.spark.llmPrompt as any)`Analyze this professional's profile for approval:

Name: ${professional.name}
Title: ${professional.title}
Category: ${professional.category}
Experience: ${professional.years_experience} years
Description: ${professional.description}
Email: ${professional.email}
Phone: ${professional.phone}
City: ${professional.city}

Analyze:
1. Completeness of profile (0-1 score)
2. Professional credibility (0-1 score) 
3. Risk level (low/medium/high)
4. Red flags (list any concerns)
5. Recommendation (approve/review/reject)
6. Confidence level (high/medium/low)

Return JSON: {
  "completeness_score": 0-1,
  "credibility_score": 0-1, 
  "risk_level": "low|medium|high",
  "red_flags": ["flag1", "flag2"],
  "recommendation": "approve|review|reject",
  "confidence_level": "high|medium|low",
  "reasoning": "explanation"
}`;

      const response = await window.spark.llm(prompt, 'gpt-4o', true);
      const analysis = JSON.parse(response);
      setAiAnalysis(analysis);

      if (analysis.risk_level === 'high' || analysis.red_flags.length > 0) {
        const alert: AIAlert = {
          id: `alert-${Date.now()}`,
          type: 'suspicious_profile',
          message: `Professional ${professional.name} flagged by AI: ${analysis.reasoning}`,
          severity: analysis.risk_level === 'high' ? 'high' : 'medium',
          resource_type: 'professional',
          resource_id: professional.id,
          details: analysis,
          resolved: false,
          created_at: new Date().toISOString(),
        };
        await setAiAlerts((current) => [...(current || []), alert]);
      }

      await setProfessionals((current) =>
        (current || []).map(p =>
          p.id === professional.id
            ? {
                ...p,
                ai_score: (analysis.completeness_score + analysis.credibility_score) / 2,
                ai_label: analysis.recommendation,
                confidence_level: analysis.confidence_level,
                ai_alerts: analysis.red_flags || [],
              }
            : p
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

  const approveProfessional = async (professional: Professional) => {
    await setProfessionals((current) =>
      (current || []).map(p =>
        p.id === professional.id
          ? {
              ...p,
              status: 'approved',
              verified: true,
              approval_date: new Date().toISOString(),
              approved_by: adminUser?.email,
            }
          : p
      )
    );

    await logAudit({
      user_id: adminUser?.id || 'unknown',
      user_email: adminUser?.email || 'unknown',
      action: 'approve_professional',
      resource_type: 'professional',
      resource_id: professional.id,
      details: { name: professional.name, email: professional.email },
      ip_address: 'admin',
      user_agent: navigator.userAgent,
    });

    const emailSent = await notifyProfessionalApproval(professional);
    
    if (emailSent) {
      toast.success(`${professional.name} ha sido aprobado y notificado por email`);
    } else {
      toast.success(`${professional.name} ha sido aprobado (no se pudo enviar email)`);
    }
    
    setSelectedPro(null);
  };

  const rejectProfessional = async (professional: Professional) => {
    if (!rejectionReason.trim()) {
      toast.error('Por favor proporcione un motivo de rechazo');
      return;
    }

    await setProfessionals((current) =>
      (current || []).map(p =>
        p.id === professional.id
          ? {
              ...p,
              status: 'rejected',
              rejection_reason: rejectionReason,
              approved_by: adminUser?.email,
            }
          : p
      )
    );

    await logAudit({
      user_id: adminUser?.id || 'unknown',
      user_email: adminUser?.email || 'unknown',
      action: 'reject_professional',
      resource_type: 'professional',
      resource_id: professional.id,
      details: { name: professional.name, reason: rejectionReason },
      ip_address: 'admin',
      user_agent: navigator.userAgent,
    });

    const emailSent = await notifyProfessionalRejection(professional, rejectionReason);
    
    if (emailSent) {
      toast.success(`${professional.name} ha sido rechazado y notificado por email`);
    } else {
      toast.success(`${professional.name} ha sido rechazado (no se pudo enviar email)`);
    }
    
    setSelectedPro(null);
    setRejectionReason('');
  };

  const deleteProfessional = async (professional: Professional) => {
    if (!confirm(`¿Está seguro de eliminar permanentemente a ${professional.name}?`)) {
      return;
    }

    await setProfessionals((current) =>
      (current || []).filter(p => p.id !== professional.id)
    );

    await logAudit({
      user_id: adminUser?.id || 'unknown',
      user_email: adminUser?.email || 'unknown',
      action: 'delete_professional',
      resource_type: 'professional',
      resource_id: professional.id,
      details: { name: professional.name, email: professional.email },
      ip_address: 'admin',
      user_agent: navigator.userAgent,
    });

    toast.success(`${professional.name} ha sido eliminado`);
    setSelectedPro(null);
  };

  const pendingCount = (professionals || []).filter(p => p.status === 'pending').length;
  const approvedCount = (professionals || []).filter(p => p.status === 'approved').length;
  const rejectedCount = (professionals || []).filter(p => p.status === 'rejected').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setPage('admin-dashboard')}>
              <ArrowLeft size={16} className="mr-2" />
              Volver
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestión de Profesionales</h1>
              <p className="text-sm text-gray-600">Aprobar y gestionar perfiles profesionales</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Total</p>
                <p className="text-3xl font-bold">{(professionals || []).length}</p>
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
                <p className="text-sm text-gray-600 mb-1">Aprobados</p>
                <p className="text-3xl font-bold text-green-600">{approvedCount}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Rechazados</p>
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
                  placeholder="Buscar por nombre, email o título..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filter === 'all' ? 'default' : 'outline'}
                  onClick={() => setFilter('all')}
                >
                  Todos
                </Button>
                <Button
                  variant={filter === 'pending' ? 'default' : 'outline'}
                  onClick={() => setFilter('pending')}
                >
                  <Funnel size={16} className="mr-1" />
                  Pendientes
                </Button>
                <Button
                  variant={filter === 'approved' ? 'default' : 'outline'}
                  onClick={() => setFilter('approved')}
                >
                  Aprobados
                </Button>
                <Button
                  variant={filter === 'rejected' ? 'default' : 'outline'}
                  onClick={() => setFilter('rejected')}
                >
                  Rechazados
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4">
          {filteredProfessionals.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-gray-500">
                No se encontraron profesionales
              </CardContent>
            </Card>
          ) : (
            filteredProfessionals.map((pro) => (
              <Card key={pro.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{pro.name}</h3>
                        {pro.status === 'approved' && (
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle size={14} className="mr-1" />
                            Aprobado
                          </Badge>
                        )}
                        {pro.status === 'pending' && (
                          <Badge className="bg-amber-100 text-amber-800">
                            Pendiente
                          </Badge>
                        )}
                        {pro.status === 'rejected' && (
                          <Badge className="bg-red-100 text-red-800">
                            <XCircle size={14} className="mr-1" />
                            Rechazado
                          </Badge>
                        )}
                        {pro.ai_score && pro.ai_score < 0.5 && (
                          <Badge variant="destructive">
                            <Warning size={14} className="mr-1" />
                            Alerta IA
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600">{pro.title} • {pro.category}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {pro.years_experience} años de experiencia • {pro.city}
                      </p>
                      <p className="text-sm text-gray-500">{pro.email} • {pro.phone}</p>
                      {pro.ai_score && (
                        <div className="mt-2 flex items-center gap-2">
                          <Robot size={16} className="text-purple-600" />
                          <span className="text-sm text-gray-600">
                            Puntuación IA: {(pro.ai_score * 100).toFixed(0)}% 
                            {pro.confidence_level && ` (${pro.confidence_level})`}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedPro(pro);
                          setAiAnalysis(null);
                        }}
                      >
                        <Eye size={16} className="mr-1" />
                        Ver Detalles
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      <Dialog open={!!selectedPro} onOpenChange={() => setSelectedPro(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalles del Profesional</DialogTitle>
            <DialogDescription>
              Revise la información y use IA para análisis avanzado
            </DialogDescription>
          </DialogHeader>

          {selectedPro && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Nombre</label>
                  <p className="text-base">{selectedPro.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Título</label>
                  <p className="text-base">{selectedPro.title}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Categoría</label>
                  <p className="text-base">{selectedPro.category}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Experiencia</label>
                  <p className="text-base">{selectedPro.years_experience} años</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <p className="text-base">{selectedPro.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Teléfono</label>
                  <p className="text-base">{selectedPro.phone}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-600">Descripción</label>
                  <p className="text-base">{selectedPro.description}</p>
                </div>
                {selectedPro.documents && Object.keys(selectedPro.documents).length > 0 && (
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-600">Documentos</label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {selectedPro.documents.cv && (
                        <Button variant="outline" size="sm" className="justify-start" asChild>
                          <a href={selectedPro.documents.cv} target="_blank" rel="noopener noreferrer">
                            <FileText size={16} className="mr-2" />
                            Ver CV
                          </a>
                        </Button>
                      )}
                      {selectedPro.documents.id_doc && (
                        <Button variant="outline" size="sm" className="justify-start" asChild>
                          <a href={selectedPro.documents.id_doc} target="_blank" rel="noopener noreferrer">
                            <FileText size={16} className="mr-2" />
                            Ver Documento ID
                          </a>
                        </Button>
                      )}
                      {selectedPro.documents.professional_card && (
                        <Button variant="outline" size="sm" className="justify-start" asChild>
                          <a href={selectedPro.documents.professional_card} target="_blank" rel="noopener noreferrer">
                            <FileText size={16} className="mr-2" />
                            Ver Tarjeta Profesional
                          </a>
                        </Button>
                      )}
                      {selectedPro.documents.certificates && selectedPro.documents.certificates.length > 0 && (
                        <>
                          {selectedPro.documents.certificates.map((cert, idx) => (
                            <Button key={idx} variant="outline" size="sm" className="justify-start" asChild>
                              <a href={cert} target="_blank" rel="noopener noreferrer">
                                <FileText size={16} className="mr-2" />
                                Certificado {idx + 1}
                              </a>
                            </Button>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {aiAnalysis && (
                <Alert className={aiAnalysis.risk_level === 'high' ? 'border-red-500 bg-red-50' : 'border-blue-500 bg-blue-50'}>
                  <Robot size={20} />
                  <AlertDescription>
                    <div className="space-y-2">
                      <p className="font-semibold">Análisis IA</p>
                      <p className="text-sm"><strong>Recomendación:</strong> {aiAnalysis.recommendation}</p>
                      <p className="text-sm"><strong>Nivel de Confianza:</strong> {aiAnalysis.confidence_level}</p>
                      <p className="text-sm"><strong>Nivel de Riesgo:</strong> {aiAnalysis.risk_level}</p>
                      <p className="text-sm"><strong>Completitud:</strong> {(aiAnalysis.completeness_score * 100).toFixed(0)}%</p>
                      <p className="text-sm"><strong>Credibilidad:</strong> {(aiAnalysis.credibility_score * 100).toFixed(0)}%</p>
                      {aiAnalysis.red_flags.length > 0 && (
                        <div>
                          <p className="text-sm font-semibold">Alertas:</p>
                          <ul className="list-disc list-inside text-sm">
                            {aiAnalysis.red_flags.map((flag: string, idx: number) => (
                              <li key={idx}>{flag}</li>
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
                  onClick={() => analyzeWithAI(selectedPro)}
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

              {selectedPro.status === 'pending' && (
                <div className="space-y-4 pt-4 border-t">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => approveProfessional(selectedPro)}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <UserCheck size={16} className="mr-2" />
                      Aprobar
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => {}}
                      className="flex-1"
                    >
                      <UserMinus size={16} className="mr-2" />
                      Rechazar
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Motivo de rechazo (opcional)</label>
                    <Textarea
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      placeholder="Explique el motivo del rechazo..."
                      rows={3}
                    />
                    {rejectionReason && (
                      <Button
                        variant="destructive"
                        onClick={() => rejectProfessional(selectedPro)}
                        className="w-full"
                      >
                        Confirmar Rechazo
                      </Button>
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-4 border-t">
                <Button
                  variant="destructive"
                  onClick={() => deleteProfessional(selectedPro)}
                  className="flex-1"
                >
                  <Trash size={16} className="mr-2" />
                  Eliminar Permanentemente
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProfessionals;
