import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
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
  User,
  Warning,
  XCircle
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

    setVerifiedProfiles((current: any[]) => [...current, updatedProfile]);
    setPendingProfiles((current: any[]) => current.filter(p => p.id !== profileId));
    
    toast.success(`Perfil de ${profile.nombre_completo} aprobado`);
    setShowDetailDialog(false);
  };

  const handleRejectProfile = (profileId: string) => {
    const profile = (pendingProfiles || []).find(p => p.id === profileId);
    if (!profile) return;

    setPendingProfiles((current: any[]) => current.filter(p => p.id !== profileId));
    
    toast.success(`Perfil de ${profile.nombre_completo} rechazado`);
    setShowDetailDialog(false);
  };

  const viewProfileDetails = (profile: any) => {
    setSelectedProfile(profile);
    setShowDetailDialog(true);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Verificación de Profesionales
        </h1>
        <p className="text-gray-600">
          Revisa y aprueba perfiles profesionales pendientes de verificación
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Pendientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">
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
              Total Procesados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {(pendingProfiles || []).length + (verifiedProfiles || []).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {(pendingProfiles || []).length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-500">
              No hay perfiles pendientes de verificación
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {(pendingProfiles || []).map((profile) => (
            <Card key={profile.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {profile.nombre_completo}
                      </h3>
                      {profile.ai_analysis?.riesgo_general && (
                        <Badge 
                          variant={
                            profile.ai_analysis.riesgo_general === 'bajo' ? 'default' : 
                            profile.ai_analysis.riesgo_general === 'medio' ? 'secondary' : 
                            'destructive'
                          }
                        >
                          Riesgo: {profile.ai_analysis.riesgo_general}
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-3">{profile.especialidad}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin size={16} />
                        <span>{profile.ubicacion || 'No especificado'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone size={16} />
                        <span>{profile.telefono}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        <span>Registrado: {new Date(profile.fecha_registro).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {profile.test_result && (
                      <div className="mt-3">
                        <div className="flex items-center gap-2">
                          <Brain size={16} className="text-primary" />
                          <span className="font-semibold">Test:</span>
                          <span>{profile.test_result.score}% ({profile.test_result.correctAnswers}/{profile.test_result.totalQuestions})</span>
                          {profile.test_result.passed ? (
                            <CheckCircle size={16} className="text-green-600" />
                          ) : (
                            <XCircle size={16} className="text-red-600" />
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      onClick={() => viewProfileDetails(profile)}
                    >
                      <Eye size={18} className="mr-2" />
                      Ver Detalle
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

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

              <Tabs defaultValue="basico" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basico">Datos Básicos</TabsTrigger>
                  <TabsTrigger value="test">Test</TabsTrigger>
                  <TabsTrigger value="ia">Análisis IA</TabsTrigger>
                </TabsList>

                <TabsContent value="basico" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Información Personal</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Cédula</p>
                          <p className="text-base">{selectedProfile.cedula}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Email</p>
                          <p className="text-base">{selectedProfile.email}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Teléfono</p>
                          <p className="text-base">{selectedProfile.telefono}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Ubicación</p>
                          <p className="text-base">{selectedProfile.ubicacion || 'No especificado'}</p>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-2">Especialidad</p>
                        <p className="text-base">{selectedProfile.especialidad}</p>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-2">Habilidades</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedProfile.habilidades?.map((skill: string, idx: number) => (
                            <Badge key={idx} variant="secondary">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Documentos Cargados</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span>Cédula</span>
                        <CheckCircle className="text-green-600" size={20} />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span>Hoja de vida</span>
                        <CheckCircle className="text-green-600" size={20} />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span>Antecedentes</span>
                        <CheckCircle className="text-green-600" size={20} />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Shield size={20} />
                          <span>Verificación de identidad</span>
                        </div>
                        <CheckCircle className="text-green-600" size={20} />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="test" className="space-y-4">
                  {selectedProfile.test_result ? (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Resultados del Test</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-primary mb-2">
                            {selectedProfile.test_result.score.toFixed(1)}%
                          </div>
                          <p className="text-gray-600">
                            {selectedProfile.test_result.correctAnswers} de {selectedProfile.test_result.totalQuestions} respuestas correctas
                          </p>
                        </div>

                        <Progress value={selectedProfile.test_result.score} className="h-3" />

                        <div className="space-y-2">
                          <p className="font-medium">Rendimiento por categoría:</p>
                          {Object.entries(selectedProfile.test_result.categoryPerformance || {}).map(([category, perf]: [string, any], idx) => (
                            <div key={idx} className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
                              <span className="font-medium">{category}</span>
                              <div className="flex items-center gap-2">
                                <span>{perf.correct}/{perf.total}</span>
                                {perf.correct === perf.total ? (
                                  <CheckCircle className="text-green-600" size={20} />
                                ) : perf.correct / perf.total >= 0.7 ? (
                                  <Warning className="text-yellow-600" size={20} />
                                ) : (
                                  <XCircle className="text-red-600" size={20} />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card>
                      <CardContent className="py-12 text-center">
                        <p className="text-gray-500">No se completó el test</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="ia" className="space-y-4">
                  {selectedProfile.ai_analysis ? (
                    <>
                      <Alert variant={selectedProfile.ai_analysis.riesgo_general === 'bajo' ? 'default' : 'destructive'}>
                        <WarningCircle size={20} />
                        <AlertDescription>
                          Riesgo General: {selectedProfile.ai_analysis.riesgo_general.toUpperCase()}
                        </AlertDescription>
                      </Alert>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Brain size={20} />
                            Análisis de IA
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <p className="font-medium mb-2">Resumen:</p>
                            <p className="text-gray-700">{selectedProfile.ai_analysis.resumen}</p>
                          </div>

                          <Separator />

                          <div>
                            <p className="font-medium mb-2">Fortalezas:</p>
                            <ul className="list-disc list-inside space-y-1">
                              {selectedProfile.ai_analysis.fortalezas?.map((item: string, idx: number) => (
                                <li key={idx} className="text-gray-700">{item}</li>
                              ))}
                            </ul>
                          </div>

                          {selectedProfile.ai_analysis.areas_mejora && selectedProfile.ai_analysis.areas_mejora.length > 0 && (
                            <>
                              <Separator />
                              <div>
                                <p className="font-medium mb-2">Áreas de Mejora:</p>
                                <ul className="list-disc list-inside space-y-1">
                                  {selectedProfile.ai_analysis.areas_mejora.map((item: string, idx: number) => (
                                    <li key={idx} className="text-base text-gray-700">{item}</li>
                                  ))}
                                </ul>
                              </div>
                            </>
                          )}

                          {selectedProfile.ai_analysis.verificaciones && selectedProfile.ai_analysis.verificaciones.length > 0 && (
                            <>
                              <Separator />
                              <div>
                                <p className="font-medium mb-2">Verificaciones Requeridas:</p>
                                <div className="space-y-2">
                                  {selectedProfile.ai_analysis.verificaciones.map((v: any, idx: number) => (
                                    <div key={idx} className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                                      <span className="font-medium text-sm">{v.tipo}</span>
                                      <p className="text-sm text-gray-600 mt-1">{v.descripcion}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </>
                          )}
                        </CardContent>
                      </Card>
                    </>
                  ) : (
                    <Card>
                      <CardContent className="py-12 text-center">
                        <p className="text-gray-500">No hay análisis de IA disponible</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowDetailDialog(false)}
                >
                  Cancelar
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={() => handleRejectProfile(selectedProfile.id)}
                >
                  <XCircle size={18} className="mr-2" />
                  Rechazar Perfil
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => handleApproveProfile(selectedProfile.id)}
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
