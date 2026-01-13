import { useState, useEffect } from 'react';
import { useAdminAuth } from '@/contextos/AdminAuthContext';
import { useKV } from '@github/spark/hooks';
import { AIAlert, Professional, Lead, JobOffer } from '@/types/admin';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  ArrowLeft, Robot, Warning, CheckCircle, XCircle, Clock 
} from '@phosphor-icons/react';
import { toast } from 'sonner';
import { logAudit } from '@/lib/audit';

interface AdminAIClassificationsProps {
  setPage: (page: string) => void;
}

const AdminAIClassifications = ({ setPage }: AdminAIClassificationsProps) => {
  const { isAuthenticated, adminUser } = useAdminAuth();
  const [aiAlerts, setAiAlerts] = useKV<AIAlert[]>('ai-alerts', []);
  const [professionals] = useKV<Professional[]>('professionals', []);
  const [leads] = useKV<Lead[]>('leads', []);
  const [jobOffers] = useKV<JobOffer[]>('job-offers', []);

  useEffect(() => {
    if (!isAuthenticated) {
      setPage('admin-login');
    }
  }, [isAuthenticated]);

  const unresolvedAlerts = (aiAlerts || []).filter(a => !a.resolved);
  const resolvedAlerts = (aiAlerts || []).filter(a => a.resolved);

  const highRiskProfessionals = (professionals || []).filter(p => 
    p.ai_score && p.ai_score < 0.5
  );

  const highPriorityLeads = (leads || []).filter(l => 
    l.priority === 'high' || l.priority === 'critical'
  );

  const flaggedOffers = (jobOffers || []).filter(j => 
    j.ai_review && j.ai_review.concerns.length > 0
  );

  const resolveAlert = async (alertId: string) => {
    await setAiAlerts((current) =>
      (current || []).map(a =>
        a.id === alertId
          ? {
              ...a,
              resolved: true,
              resolved_by: adminUser?.email,
              resolved_at: new Date().toISOString(),
            }
          : a
      )
    );

    await logAudit({
      user_id: adminUser?.id || 'unknown',
      user_email: adminUser?.email || 'unknown',
      action: 'resolve_ai_alert',
      resource_type: 'ai_alert',
      resource_id: alertId,
      details: {},
      ip_address: 'admin',
      user_agent: navigator.userAgent,
    });

    toast.success('Alerta resuelta');
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

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
              <h1 className="text-2xl font-bold text-gray-900">Clasificaciones IA</h1>
              <p className="text-sm text-gray-600">Análisis y alertas del sistema de inteligencia artificial</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Alertas Sin Resolver</p>
                <p className="text-3xl font-bold text-red-600">{unresolvedAlerts.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Profesionales de Riesgo</p>
                <p className="text-3xl font-bold text-orange-600">{highRiskProfessionals.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Leads Alta Prioridad</p>
                <p className="text-3xl font-bold text-purple-600">{highPriorityLeads.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Ofertas Marcadas</p>
                <p className="text-3xl font-bold text-blue-600">{flaggedOffers.length}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="alerts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="alerts">Alertas</TabsTrigger>
            <TabsTrigger value="professionals">Profesionales</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="offers">Ofertas</TabsTrigger>
          </TabsList>

          <TabsContent value="alerts">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Warning size={20} />
                    Alertas Sin Resolver
                  </CardTitle>
                  <CardDescription>
                    Alertas del sistema que requieren atención
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {unresolvedAlerts.length === 0 ? (
                    <p className="text-center py-8 text-gray-500">
                      No hay alertas sin resolver
                    </p>
                  ) : (
                    unresolvedAlerts.map((alert) => (
                      <Alert key={alert.id} className={getSeverityColor(alert.severity)}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Robot size={16} />
                              <span className="font-semibold">{alert.type}</span>
                              <Badge variant="outline">
                                {alert.severity}
                              </Badge>
                            </div>
                            <AlertDescription>
                              {alert.message}
                            </AlertDescription>
                            <p className="text-xs mt-2 text-gray-600">
                              <Clock size={12} className="inline mr-1" />
                              {new Date(alert.created_at).toLocaleString('es-CO')}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => resolveAlert(alert.id)}
                          >
                            <CheckCircle size={16} className="mr-1" />
                            Resolver
                          </Button>
                        </div>
                      </Alert>
                    ))
                  )}
                </CardContent>
              </Card>

              {resolvedAlerts.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle size={20} className="text-green-600" />
                      Alertas Resueltas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {resolvedAlerts.slice(0, 5).map((alert) => (
                      <Alert key={alert.id} className="bg-green-50 border-green-200">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Robot size={16} />
                              <span className="font-semibold text-sm">{alert.type}</span>
                            </div>
                            <AlertDescription className="text-sm">
                              {alert.message}
                            </AlertDescription>
                            <p className="text-xs mt-2 text-gray-600">
                              Resuelto por {alert.resolved_by} el {new Date(alert.resolved_at!).toLocaleString('es-CO')}
                            </p>
                          </div>
                        </div>
                      </Alert>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="professionals">
            <Card>
              <CardHeader>
                <CardTitle>Profesionales con Alertas IA</CardTitle>
                <CardDescription>
                  Profesionales que han sido marcados con bajo puntaje de confianza
                </CardDescription>
              </CardHeader>
              <CardContent>
                {highRiskProfessionals.length === 0 ? (
                  <p className="text-center py-8 text-gray-500">
                    No hay profesionales con alertas IA
                  </p>
                ) : (
                  <div className="space-y-3">
                    {highRiskProfessionals.map((pro) => (
                      <div key={pro.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold">{pro.name}</h4>
                              <Badge variant="destructive">
                                <Warning size={12} className="mr-1" />
                                Riesgo
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{pro.title} • {pro.category}</p>
                            {pro.ai_score && (
                              <div className="flex items-center gap-2">
                                <Robot size={16} className="text-purple-600" />
                                <span className="text-sm">
                                  Puntuación IA: {(pro.ai_score * 100).toFixed(0)}%
                                </span>
                                {pro.confidence_level && (
                                  <Badge variant="outline" className="text-xs">
                                    {pro.confidence_level}
                                  </Badge>
                                )}
                              </div>
                            )}
                            {pro.ai_alerts && pro.ai_alerts.length > 0 && (
                              <div className="mt-2">
                                <p className="text-xs font-semibold text-gray-600">Alertas:</p>
                                <ul className="list-disc list-inside text-xs text-gray-600">
                                  {pro.ai_alerts.map((alert: any, idx: number) => (
                                    <li key={idx}>{alert}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setPage('admin-profesionales')}
                          >
                            Ver Perfil
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leads">
            <Card>
              <CardHeader>
                <CardTitle>Leads de Alta Prioridad</CardTitle>
                <CardDescription>
                  Leads clasificados como alta prioridad o críticos por el sistema IA
                </CardDescription>
              </CardHeader>
              <CardContent>
                {highPriorityLeads.length === 0 ? (
                  <p className="text-center py-8 text-gray-500">
                    No hay leads de alta prioridad
                  </p>
                ) : (
                  <div className="space-y-3">
                    {highPriorityLeads.map((lead) => (
                      <div key={lead.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold">{lead.data.name || 'Sin nombre'}</h4>
                              <Badge className={
                                lead.priority === 'critical'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-orange-100 text-orange-800'
                              }>
                                {lead.priority}
                              </Badge>
                              <Badge variant="outline">{lead.status}</Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              {lead.data.email} • {lead.source_page}
                            </p>
                            {lead.ai_classification && (
                              <div className="space-y-1 text-sm">
                                <p><strong>Intención:</strong> {lead.ai_classification.intent}</p>
                                <p><strong>Sentimiento:</strong> {lead.ai_classification.sentiment}</p>
                                <p><strong>Urgencia:</strong> {lead.ai_classification.urgency}</p>
                                <p><strong>Puntuación:</strong> {(lead.ai_classification.priority_score * 100).toFixed(0)}%</p>
                              </div>
                            )}
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setPage('admin-leads')}
                          >
                            Ver Lead
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="offers">
            <Card>
              <CardHeader>
                <CardTitle>Ofertas con Alertas IA</CardTitle>
                <CardDescription>
                  Ofertas de trabajo que han sido marcadas por el análisis de IA
                </CardDescription>
              </CardHeader>
              <CardContent>
                {flaggedOffers.length === 0 ? (
                  <p className="text-center py-8 text-gray-500">
                    No hay ofertas con alertas
                  </p>
                ) : (
                  <div className="space-y-3">
                    {flaggedOffers.map((offer) => (
                      <div key={offer.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold">{offer.title}</h4>
                              <Badge variant="outline" className="bg-red-50 border-red-200">
                                <Warning size={12} className="mr-1" />
                                {offer.ai_review?.concerns.length} alertas
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              {offer.service_type} • {offer.location}
                            </p>
                            {offer.ai_review && (
                              <div className="space-y-1 text-sm">
                                <p><strong>Puntuación:</strong> {(offer.ai_review.score * 100).toFixed(0)}%</p>
                                <p>
                                  <strong>Verificación Legal:</strong>{' '}
                                  {offer.ai_review.legal_check ? (
                                    <CheckCircle size={14} className="inline text-green-600" />
                                  ) : (
                                    <XCircle size={14} className="inline text-red-600" />
                                  )}
                                </p>
                                <p>
                                  <strong>Verificación de Lenguaje:</strong>{' '}
                                  {offer.ai_review.language_check ? (
                                    <CheckCircle size={14} className="inline text-green-600" />
                                  ) : (
                                    <XCircle size={14} className="inline text-red-600" />
                                  )}
                                </p>
                                {offer.ai_review.concerns.length > 0 && (
                                  <div>
                                    <p className="font-semibold">Preocupaciones:</p>
                                    <ul className="list-disc list-inside">
                                      {offer.ai_review.concerns.map((concern, idx) => (
                                        <li key={idx}>{concern}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setPage('admin-ofertas')}
                          >
                            Ver Oferta
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminAIClassifications;
