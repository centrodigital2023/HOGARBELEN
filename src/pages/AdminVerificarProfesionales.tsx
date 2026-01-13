import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import {
  Shield,
  CheckCircle,
  Eye,
  FileText,
  Phone,
  MapPin,
  Calendar,
  TrendUp,
  WarningCircle,
  Brain,
  Globe,
  User
} from '@phosphor-icons/react';
import { useKV } from '@github/spark/hooks';

interface AdminVerificarProfesionalesProps {
  setPage: (page: string) => void;
}

export default function AdminVerificarProfesionales({ setPage }: AdminVerificarProfesionalesProps) {
  const [pendingProfiles, setPendingProfiles] = useKV<any[]>('pending-professional-verification', []);
  const [verifiedProfiles, setVerifiedProfiles] = useKV<any[]>('professional-profiles', []);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);

  const handleApproveProfile = (profileId: string) => {
    const profile = (pendingProfiles || []).find(p => p.id === profileId);
    if (!profile) return;

    const updatedProfile = {
      ...profile,
      estado_perfil: 'aprobado',
      check_verificado: true,
      visible_publico: true,
      fecha_aprobacion: new Date().toISOString()
    };

    setVerifiedProfiles((current: any[]) => [...(current || []), updatedProfile]);
    setPendingProfiles((current: any[]) => (current || []).filter(p => p.id !== profileId));
    
    toast.success(`Perfil de ${profile.nombre_completo} aprobado`);
    setShowDetailDialog(false);
  };

  const handleRejectProfile = (profileId: string) => {
    const profile = (pendingProfiles || []).find(p => p.id === profileId);
    if (!profile) return;

    setPendingProfiles((current: any[]) => (current || []).filter(p => p.id !== profileId));
    
    toast.success(`Perfil de ${profile.nombre_completo} rechazado`);
    setShowDetailDialog(false);
  };

  const viewProfileDetails = (profile: any) => {
    setSelectedProfile(profile);
    setShowDetailDialog(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Verificación de Profesionales
            </h1>
            <p className="text-gray-600">
              Revisa y aprueba perfiles de profesionales registrados
            </p>
          </div>
          <Button variant="outline" onClick={() => setPage('admin-dashboard')}>
            Volver al Panel
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Pendientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-600">
                {(pendingProfiles || []).length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Verificados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {(verifiedProfiles || []).length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {(pendingProfiles || []).length + (verifiedProfiles || []).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {(pendingProfiles || []).length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <Shield className="mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-gray-500">No hay perfiles pendientes de verificación</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {(pendingProfiles || []).map((profile) => (
              <Card key={profile.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold">{profile.nombre_completo}</h3>
                        <Badge variant="secondary">{profile.categoria_profesional}</Badge>
                        {profile.ai_analysis?.riesgo_general === 'bajo' && (
                          <Badge className="bg-green-100 text-green-700">Riesgo Bajo</Badge>
                        )}
                        {profile.ai_analysis?.riesgo_general === 'medio' && (
                          <Badge className="bg-amber-100 text-amber-700">Riesgo Medio</Badge>
                        )}
                        {profile.ai_analysis?.riesgo_general === 'alto' && (
                          <Badge className="bg-red-100 text-red-700">Riesgo Alto</Badge>
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-3">{profile.titulo_profesional}</p>
                      
                      <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <MapPin size={16} />
                          {profile.ciudad}
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone size={16} />
                          {profile.telefono}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          {profile.dias_disponibles?.join(', ')}
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendUp size={16} />
                          Test: {profile.test_score}/100
                        </div>
                      </div>

                      {profile.ai_analysis && (
                        <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Brain className="text-purple-600" size={20} />
                            <span className="font-semibold text-sm">Análisis IA</span>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                              <span>Nivel de confianza:</span>
                              <div className="flex items-center gap-2">
                                <Progress value={profile.ai_analysis.nivel_confianza} className="w-24 h-2" />
                                <span className="font-semibold">{profile.ai_analysis.nivel_confianza}%</span>
                              </div>
                            </div>
                            <div>
                              <span className="font-medium">Recomendación: </span>
                              <Badge variant={
                                profile.ai_analysis.recomendacion === 'aprobar_automaticamente' ? 'default' :
                                profile.ai_analysis.recomendacion === 'revisar_manualmente' ? 'secondary' :
                                'destructive'
                              }>
                                {profile.ai_analysis.recomendacion.replace('_', ' ')}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => viewProfileDetails(profile)}
                      >
                        <Eye size={16} className="mr-2" />
                        Ver Detalles
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProfile && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <User size={24} />
                  {selectedProfile.nombre_completo}
                </DialogTitle>
                <DialogDescription>
                  Revisión completa del perfil profesional
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="basico" className="mt-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="basico">Datos Básicos</TabsTrigger>
                  <TabsTrigger value="documentos">Documentos</TabsTrigger>
                  <TabsTrigger value="test">Test</TabsTrigger>
                  <TabsTrigger value="ia">Análisis IA</TabsTrigger>
                </TabsList>

                <TabsContent value="basico" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Información Personal</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Nombre completo</p>
                          <p className="text-base">{selectedProfile.nombre_completo}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Email</p>
                          <p className="text-base">{selectedProfile.email}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Teléfono</p>
                          <p className="text-base">{selectedProfile.telefono}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Ciudad</p>
                          <p className="text-base">{selectedProfile.ciudad}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Categoría</p>
                          <p className="text-base">{selectedProfile.categoria_profesional}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Título</p>
                          <p className="text-base">{selectedProfile.titulo_profesional}</p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-2">Descripción profesional</p>
                        <p className="text-base">{selectedProfile.descripcion_profesional}</p>
                      </div>

                      <Separator />

                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-2">Disponibilidad</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedProfile.dias_disponibles?.map((dia: string) => (
                            <Badge key={dia} variant="secondary">{dia}</Badge>
                          ))}
                        </div>
                        <p className="text-base mt-2">Horario: {selectedProfile.horario_atencion}</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="documentos" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Documentos Cargados</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <FileText size={20} />
                          <span>Cédula</span>
                        </div>
                        <CheckCircle className="text-green-600" size={20} />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <FileText size={20} />
                          <span>Hoja de vida</span>
                        </div>
                        <CheckCircle className="text-green-600" size={20} />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <FileText size={20} />
                          <span>Antecedentes penales</span>
                        </div>
                        <CheckCircle className="text-green-600" size={20} />
                      </div>

                      {selectedProfile.requiere_tarjeta_profesional && (
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Shield size={20} />
                            <span>Tarjeta profesional: {selectedProfile.numero_tarjeta_profesional}</span>
                          </div>
                          <CheckCircle className="text-green-600" size={20} />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="test" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Resultados del Test</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center mb-6">
                        <div className="text-5xl font-bold text-purple-600 mb-2">
                          {selectedProfile.test_score}/100
                        </div>
                        <p className="text-gray-600">
                          {selectedProfile.test_respuestas?.filter((r: any) => r.correcta).length} respuestas correctas 
                          de {selectedProfile.test_respuestas?.length}
                        </p>
                      </div>

                      <Progress value={selectedProfile.test_score} className="h-3 mb-6" />

                      <div className="space-y-2">
                        {selectedProfile.test_respuestas?.slice(0, 5).map((respuesta: any, idx: number) => (
                          <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                            <p className="font-medium text-sm mb-1">{respuesta.pregunta}</p>
                            <div className="flex items-center gap-2">
                              {respuesta.correcta ? (
                                <CheckCircle className="text-green-600" size={16} />
                              ) : (
                                <WarningCircle className="text-red-600" size={16} />
                              )}
                              <span className="text-sm text-gray-600">
                                {respuesta.correcta ? 'Correcta' : 'Incorrecta'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="ia" className="space-y-4">
                  {selectedProfile.ai_analysis && (
                    <>
                      <Alert className={
                        selectedProfile.ai_analysis.riesgo_general === 'bajo' ? 'bg-green-50 border-green-200' :
                        selectedProfile.ai_analysis.riesgo_general === 'medio' ? 'bg-amber-50 border-amber-200' :
                        'bg-red-50 border-red-200'
                      }>
                        <Brain className="h-4 w-4" />
                        <AlertDescription>
                          <strong>Riesgo General: </strong>
                          {selectedProfile.ai_analysis.riesgo_general.toUpperCase()}
                        </AlertDescription>
                      </Alert>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Análisis Completo de IA</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <p className="text-sm font-medium text-gray-600 mb-2">Comentario General</p>
                            <p className="text-base">{selectedProfile.ai_analysis.comentario_general}</p>
                          </div>

                          <Separator />

                          <div>
                            <p className="text-sm font-medium text-gray-600 mb-2">Fortalezas</p>
                            <ul className="list-disc list-inside space-y-1">
                              {selectedProfile.ai_analysis.fortalezas?.map((f: string, idx: number) => (
                                <li key={idx} className="text-base">{f}</li>
                              ))}
                            </ul>
                          </div>

                          {selectedProfile.ai_analysis.alertas?.length > 0 && (
                            <>
                              <Separator />
                              <div>
                                <p className="text-sm font-medium text-gray-600 mb-2">Alertas</p>
                                <ul className="list-disc list-inside space-y-1">
                                  {selectedProfile.ai_analysis.alertas.map((a: string, idx: number) => (
                                    <li key={idx} className="text-base text-red-600">{a}</li>
                                  ))}
                                </ul>
                              </div>
                            </>
                          )}

                          <Separator />

                          <div>
                            <p className="text-sm font-medium text-gray-600 mb-2">Verificaciones Sugeridas</p>
                            <div className="space-y-2">
                              {selectedProfile.ai_analysis.verificaciones_sugeridas?.map((v: any, idx: number) => (
                                <div key={idx} className="p-3 bg-blue-50 rounded-lg">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Globe size={16} className="text-blue-600" />
                                    <span className="font-medium text-sm">{v.tipo}</span>
                                  </div>
                                  <p className="text-sm text-gray-600 mb-1">Búsqueda: {v.consulta}</p>
                                  <p className="text-xs text-gray-500">Razón: {v.razon}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </TabsContent>
              </Tabs>

              <div className="flex gap-3 mt-6 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={() => setShowDetailDialog(false)}
                  className="flex-1"
                >
                  Cerrar
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleRejectProfile(selectedProfile.id)}
                  className="flex-1"
                >
                  Rechazar Perfil
                </Button>
                <Button
                  onClick={() => handleApproveProfile(selectedProfile.id)}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle size={18} className="mr-2" />
                  Aprobar Perfil
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
