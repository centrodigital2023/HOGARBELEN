import { useState } from 'react';
import { Dialog, DialogContent, DialogDescriptio
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
  TrendingUp,
  AlertCircle,
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

  const [verifiedProfiles, setVerifiedProfiles] = useKV<any[]>('professional-profiles', []);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const handleApproveProfile = (profileId: string) => {
    if (!profile) return;
    const updatedProfile = {

      visible_publico: true,
    };
    setVerifiedProfiles((

    setShowDetailDialog(fals

    const profile = (pendingProf

    
    setShowDetailDialog(false);


  };
  return (
    
          Verificación de Profesionales
    setShowDetailDialog(false);
  };

  const handleRejectProfile = (profileId: string) => {
    const profile = pendingProfiles.find(p => p.id === profileId);
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
                      </h3>
                  
                        
               
            

                    </div>
              
                    <div className="flex flex-wrap ga
                        <MapPin size={16}
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
                    </Button
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

                          <
                        <p className="text-sm font-medium text-gray-500 mb-2">Especialidad</p>
                        <p className="text-base">{selectedProfile.especialidad}</p>
                      </div>

                      <div>

                  {selectedProfile.test_result ? (
                      <CardHeader>
                      </CardHeader>
                        <div 
                            {s
                          <p
                          </p>


                        
                            <div
                              <div className="flex items-center gap-2">
                                {
                                ) : perf.correct / perf
                                ) : (
                                )}
                            </div>
                        </di
                    </Card>
                    <Card>
                        <p className="text-gray-500">No se completó el test<
                    </Card>
                </TabsContent>
                <TabsContent value="ia" className
                    <>
                        <War
                          Riesgo General: {selectedProfile.ai_analysis.riesgo_general.toUpperCase()
                      </Alert>
                      <Card>
                          <CardTitle className="text-lg flex ite
                            An
                        </CardHeader>
                          <d
                            <p cla



                              {selectedProfile.ai_analysis.forta
                              ))}
                          
                          {selecte
                              <Separator />
                                <p 
                                  {selectedProfile.ai_ana
                                  ))}
                              </div>
                          )}
                          {selec
                              <Separator />
                                <p className="font-medium mb-2">Verificaciones Requeridas:</p>
                              
                              

                                </div>

                        </CardContent>
                    </>
                    <Card>
                        <p className="text-gray-500">No hay análisis de IA disponible</p>
                    </Card>
                </TabsContent>

                <Button
                  className="flex-1"
                >
                </Button>
                  variant="destructiv
                  onClick={() => handleRejectProfile(selectedProfile.id)}
                  <XCircle size={1
                </Button>
                  className="flex-
                >
                  Aprobar Perf
              </div>
          )}
      </Dialog>
  );



















































































































