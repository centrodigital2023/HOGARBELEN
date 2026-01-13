import { useState } from 'react';
import { useKV } from '@github/spark/hooks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import {
  CheckCircle,
  XCircle,
  Eye,
  Brain,
  AlertTriangle,
  Shield,
  FileText,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Award,
  Search,
  ExternalLink,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

interface AdminVerificarProfesionalesProps {
  setPage: (page: string) => void;
}

export default function AdminVerificarProfesionales({ setPage }: AdminVerificarProfesionalesProps) {
  const [pendingProfiles, setPendingProfiles] = useKV<any[]>('pending-professional-verification', []);
  const [approvedProfiles, setApprovedProfiles] = useKV<any[]>('professional-profiles', []);
  const [selectedProfile, setSelectedProfile] = useState<any | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);

  const handleApprove = (profile: any) => {
    const updatedProfile = {
      ...profile,
      estado_perfil: 'aprobado',
      visible_publico: true,
      check_verificado: true,
      fecha_aprobacion: new Date().toISOString()
    };

    setApprovedProfiles((current: any[]) => [...current, updatedProfile]);
    setPendingProfiles((current: any[]) => current.filter((p: any) => p.id !== profile.id));
    
    toast.success(`Perfil de ${profile.nombre_completo} aprobado`);
    setShowDetailDialog(false);
  };

  const handleReject = (profile: any, razon: string = 'No cumple requisitos') => {
    const rejectedProfile = {
      ...profile,
      estado_perfil: 'rechazado',
      visible_publico: false,
      fecha_rechazo: new Date().toISOString(),
      razon_rechazo: razon
    };

    setPendingProfiles((current: any[]) => current.filter((p: any) => p.id !== profile.id));
    
    toast.error(`Perfil de ${profile.nombre_completo} rechazado`);
    setShowDetailDialog(false);
  };

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'bajo': return 'bg-green-100 text-green-800 border-green-300';
      case 'medio': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'alto': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'aprobar_automaticamente': return 'text-green-600';
      case 'revisar_manualmente': return 'text-amber-600';
      case 'rechazar': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const renderProfileCard = (profile: any) => (
    <Card key={profile.id} className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl">{profile.nombre_completo}</CardTitle>
            <CardDescription className="mt-1">
              {profile.titulo_profesional} - {profile.categoria_profesional}
            </CardDescription>
          </div>
          {profile.ai_analysis && (
            <Badge className={getRiskBadgeColor(profile.ai_analysis.riesgo_general)}>
              {profile.ai_analysis.riesgo_general?.toUpperCase()}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-muted-foreground" />
            <span>{profile.ciudad}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-muted-foreground" />
            <span className="truncate">{profile.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-muted-foreground" />
            <span>{profile.telefono}</span>
          </div>
          <div className="flex items-center gap-2">
            <Award size={16} className="text-muted-foreground" />
            <span>Test: {profile.test_score}/100</span>
          </div>
        </div>

        {profile.ai_analysis && (
          <Alert className="bg-purple-50 border-purple-200">
            <Brain className="h-4 w-4 text-purple-600" />
            <AlertDescription>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Confianza IA:</span>
                  <Badge variant="secondary">{profile.ai_analysis.nivel_confianza}/100</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Recomendación:</span>
                  <span className={`font-semibold ${getRecommendationColor(profile.ai_analysis.recomendacion)}`}>
                    {profile.ai_analysis.recomendacion?.replace(/_/g, ' ').toUpperCase()}
                  </span>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => {
              setSelectedProfile(profile);
              setShowDetailDialog(true);
            }}
          >
            <Eye className="mr-2" size={16} />
            Ver Detalles
          </Button>
          <Button
            variant="default"
            className="flex-1 bg-green-600 hover:bg-green-700"
            onClick={() => handleApprove(profile)}
          >
            <CheckCircle className="mr-2" size={16} />
            Aprobar
          </Button>
          <Button
            variant="destructive"
            onClick={() => handleReject(profile)}
          >
            <XCircle size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-foreground flex items-center gap-3">
                <Shield className="text-purple-600" size={40} />
                Verificación de Profesionales
              </h1>
              <p className="text-lg text-muted-foreground mt-2">
                Sistema de aprobación con análisis de IA
              </p>
            </div>
            <Button variant="outline" onClick={() => setPage('admin-dashboard')}>
              Volver al Panel
            </Button>
          </div>
        </div>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pending">
              Pendientes ({pendingProfiles?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="approved">
              Aprobados ({approvedProfiles?.length || 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {!pendingProfiles || pendingProfiles.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <CheckCircle className="mx-auto mb-4 text-green-500" size={64} />
                  <h3 className="text-xl font-semibold mb-2">No hay perfiles pendientes</h3>
                  <p className="text-muted-foreground">
                    Todos los registros han sido procesados
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {pendingProfiles.map((profile) => renderProfileCard(profile))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="approved" className="space-y-4">
            {!approvedProfiles || approvedProfiles.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <User className="mx-auto mb-4 text-muted-foreground" size={64} />
                  <h3 className="text-xl font-semibold mb-2">No hay profesionales aprobados</h3>
                  <p className="text-muted-foreground">
                    Los perfiles aprobados aparecerán aquí
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {approvedProfiles.map((profile) => (
                  <Card key={profile.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{profile.nombre_completo}</CardTitle>
                      <CardDescription>{profile.categoria_profesional}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-muted-foreground" />
                          <span>{profile.ciudad}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Award size={14} className="text-muted-foreground" />
                          <span>Test: {profile.test_score}/100</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle size={14} className="text-green-600" />
                          <span className="text-green-600">Aprobado</span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-4"
                        onClick={() => {
                          setSelectedProfile(profile);
                          setShowDetailDialog(true);
                        }}
                      >
                        <Eye className="mr-2" size={14} />
                        Ver Detalles
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <User className="text-purple-600" size={24} />
              Detalle del Perfil
            </DialogTitle>
            <DialogDescription>
              Información completa y análisis de IA
            </DialogDescription>
          </DialogHeader>

          {selectedProfile && (
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Información Personal</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold">Nombre:</span>
                      <p>{selectedProfile.nombre_completo}</p>
                    </div>
                    <div>
                      <span className="font-semibold">Título:</span>
                      <p>{selectedProfile.titulo_profesional}</p>
                    </div>
                    <div>
                      <span className="font-semibold">Categoría:</span>
                      <p>{selectedProfile.categoria_profesional}</p>
                    </div>
                    <div>
                      <span className="font-semibold">Ciudad:</span>
                      <p>{selectedProfile.ciudad}</p>
                    </div>
                    <div>
                      <span className="font-semibold">Email:</span>
                      <p>{selectedProfile.email}</p>
                    </div>
                    <div>
                      <span className="font-semibold">Teléfono:</span>
                      <p>{selectedProfile.telefono}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="font-semibold">Disponibilidad:</span>
                      <p>{selectedProfile.dias_disponibles?.join(', ')} - {selectedProfile.horario_atencion}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="font-semibold">Descripción:</span>
                      <p className="mt-1">{selectedProfile.descripcion_profesional}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText size={20} />
                      Documentos
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Cédula:</span>
                      <Badge variant={selectedProfile.documento_cedula ? 'default' : 'secondary'}>
                        {selectedProfile.documento_cedula ? 'Adjuntada' : 'No adjuntada'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Hoja de vida:</span>
                      <Badge variant={selectedProfile.documento_hoja_vida ? 'default' : 'secondary'}>
                        {selectedProfile.documento_hoja_vida ? 'Adjuntada' : 'No adjuntada'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Antecedentes:</span>
                      <Badge variant={selectedProfile.documento_antecedentes ? 'default' : 'secondary'}>
                        {selectedProfile.documento_antecedentes ? 'Adjuntados' : 'No adjuntados'}
                      </Badge>
                    </div>
                    {selectedProfile.requiere_tarjeta_profesional && (
                      <div className="flex items-center justify-between">
                        <span>Tarjeta Profesional:</span>
                        <Badge variant="default">{selectedProfile.numero_tarjeta_profesional}</Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Award size={20} />
                      Test de Competencias
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Puntuación:</span>
                        <Badge className="text-lg px-4 py-1">
                          {selectedProfile.test_score}/100
                        </Badge>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full ${
                            selectedProfile.test_score >= 80
                              ? 'bg-green-500'
                              : selectedProfile.test_score >= 60
                              ? 'bg-amber-500'
                              : 'bg-red-500'
                          }`}
                          style={{ width: `${selectedProfile.test_score}%` }}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {selectedProfile.test_score >= 80
                          ? 'Excelente desempeño'
                          : selectedProfile.test_score >= 60
                          ? 'Buen desempeño'
                          : 'Desempeño aceptable'}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {selectedProfile.ai_analysis && (
                  <Card className="border-2 border-purple-200 bg-purple-50">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2 text-purple-700">
                        <Brain size={20} />
                        Análisis de IA (Solo Administrador)
                      </CardTitle>
                      <CardDescription>
                        Este análisis NO es visible para el profesional
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold">Nivel de Confianza:</span>
                            <Badge className="text-lg">{selectedProfile.ai_analysis.nivel_confianza}/100</Badge>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-purple-600 h-2 rounded-full"
                              style={{ width: `${selectedProfile.ai_analysis.nivel_confianza}%` }}
                            />
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg">
                          <div className="flex flex-col">
                            <span className="font-semibold mb-2">Riesgo General:</span>
                            <Badge className={getRiskBadgeColor(selectedProfile.ai_analysis.riesgo_general)}>
                              {selectedProfile.ai_analysis.riesgo_general?.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-lg">
                        <span className="font-semibold flex items-center gap-2 mb-2">
                          Recomendación IA:
                        </span>
                        <p className={`text-lg font-bold ${getRecommendationColor(selectedProfile.ai_analysis.recomendacion)}`}>
                          {selectedProfile.ai_analysis.recomendacion?.replace(/_/g, ' ').toUpperCase()}
                        </p>
                      </div>

                      {selectedProfile.ai_analysis.comentario_general && (
                        <div className="bg-white p-4 rounded-lg">
                          <span className="font-semibold mb-2 block">Comentario General:</span>
                          <p className="text-sm">{selectedProfile.ai_analysis.comentario_general}</p>
                        </div>
                      )}

                      {selectedProfile.ai_analysis.fortalezas?.length > 0 && (
                        <div className="bg-white p-4 rounded-lg">
                          <span className="font-semibold flex items-center gap-2 mb-2">
                            <TrendingUp className="text-green-600" size={18} />
                            Fortalezas:
                          </span>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            {selectedProfile.ai_analysis.fortalezas.map((f: string, idx: number) => (
                              <li key={idx} className="text-green-700">{f}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {selectedProfile.ai_analysis.alertas?.length > 0 && (
                        <div className="bg-white p-4 rounded-lg">
                          <span className="font-semibold flex items-center gap-2 mb-2">
                            <AlertTriangle className="text-amber-600" size={18} />
                            Alertas:
                          </span>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            {selectedProfile.ai_analysis.alertas.map((a: string, idx: number) => (
                              <li key={idx} className="text-amber-700">{a}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {selectedProfile.ai_analysis.areas_revision?.length > 0 && (
                        <div className="bg-white p-4 rounded-lg">
                          <span className="font-semibold flex items-center gap-2 mb-2">
                            <TrendingDown className="text-blue-600" size={18} />
                            Áreas de Revisión:
                          </span>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            {selectedProfile.ai_analysis.areas_revision.map((a: string, idx: number) => (
                              <li key={idx} className="text-blue-700">{a}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {selectedProfile.ai_analysis.verificaciones_sugeridas?.length > 0 && (
                        <div className="bg-white p-4 rounded-lg">
                          <span className="font-semibold flex items-center gap-2 mb-2">
                            <Search className="text-purple-600" size={18} />
                            Verificaciones Sugeridas:
                          </span>
                          <div className="space-y-2">
                            {selectedProfile.ai_analysis.verificaciones_sugeridas.map((v: any, idx: number) => (
                              <div key={idx} className="border border-purple-200 rounded p-3 text-sm">
                                <div className="flex items-center justify-between mb-1">
                                  <Badge variant="outline">{v.tipo}</Badge>
                                  <a
                                    href={`https://www.google.com/search?q=${encodeURIComponent(v.consulta)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-purple-600 hover:text-purple-800 flex items-center gap-1"
                                  >
                                    Buscar <ExternalLink size={14} />
                                  </a>
                                </div>
                                <p className="font-medium">{v.consulta}</p>
                                <p className="text-xs text-muted-foreground mt-1">{v.razon}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedProfile.ai_analysis.coherencia_datos && (
                        <div className="bg-white p-4 rounded-lg">
                          <span className="font-semibold mb-2 block">Coherencia de Datos:</span>
                          <div className="grid grid-cols-3 gap-2 text-sm">
                            <div>
                              <span className="text-xs text-muted-foreground">Título/Categoría:</span>
                              <Badge variant={selectedProfile.ai_analysis.coherencia_datos.titulo_categoria === 'coherente' ? 'default' : 'secondary'} className="block mt-1">
                                {selectedProfile.ai_analysis.coherencia_datos.titulo_categoria}
                              </Badge>
                            </div>
                            <div>
                              <span className="text-xs text-muted-foreground">Experiencia/Test:</span>
                              <Badge variant={selectedProfile.ai_analysis.coherencia_datos.experiencia_test === 'coherente' ? 'default' : 'secondary'} className="block mt-1">
                                {selectedProfile.ai_analysis.coherencia_datos.experiencia_test}
                              </Badge>
                            </div>
                            <div>
                              <span className="text-xs text-muted-foreground">Disponibilidad:</span>
                              <Badge variant={selectedProfile.ai_analysis.coherencia_datos.disponibilidad === 'razonable' ? 'default' : 'secondary'} className="block mt-1">
                                {selectedProfile.ai_analysis.coherencia_datos.disponibilidad}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {selectedProfile.estado_perfil === 'pendiente_verificacion' && (
                  <div className="flex gap-4 pt-4">
                    <Button
                      variant="default"
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={() => handleApprove(selectedProfile)}
                    >
                      <CheckCircle className="mr-2" size={18} />
                      Aprobar Profesional
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1"
                      onClick={() => handleReject(selectedProfile)}
                    >
                      <XCircle className="mr-2" size={18} />
                      Rechazar
                    </Button>
                  </div>
                )}
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
