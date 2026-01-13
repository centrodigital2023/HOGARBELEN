import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useKV } from '@github/spark/hooks';
import { toast } from 'sonner';
import {
  ArrowLeft,
  Shield,
  User,
  CheckCircle,
  XCircle,
  Eye,
  AlertTriangle,
  FileText,
  Mail,
  Phone,
  MapPin,
  Award,
  Clock,
  Search,
  TrendingUp,
  TrendingDown
} from '@phosphor-icons/react';

interface AdminVerificarProfesionalesProps {
  setPage: (page: string) => void;
}

export default function AdminVerificarProfesionales({ setPage }: AdminVerificarProfesionalesProps) {
  const [pendingProfiles, setPendingProfiles] = useKV<any[]>('pending-professional-verification', []);
  const [approvedProfiles, setApprovedProfiles] = useKV<any[]>('professional-profiles', []);
  const [selectedProfile, setSelectedProfile] = useState<any | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('pending');

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
      motivo_rechazo: razon
    };

    setPendingProfiles((current: any[]) => current.filter((p: any) => p.id !== profile.id));
    toast.success(`Perfil rechazado`);
    setShowDetailDialog(false);
  };

  const getRiskBadgeColor = (riesgo: string) => {
    if (riesgo === 'bajo') return 'bg-green-100 text-green-800';
    if (riesgo === 'medio') return 'bg-amber-100 text-amber-800';
    return 'bg-red-100 text-red-800';
  };

  const filteredPending = (pendingProfiles || []).filter((profile: any) =>
    profile.nombre_completo?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.categoria_profesional?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredApproved = (approvedProfiles || []).filter((profile: any) =>
    profile.nombre_completo?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.categoria_profesional?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Shield className="text-purple-600" size={28} />
                Verificación de Profesionales
              </h1>
              <p className="text-sm text-gray-600">Sistema de aprobación con análisis de IA</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-amber-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Pendientes</p>
                <p className="text-3xl font-bold text-amber-600">{(pendingProfiles || []).length}</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Aprobados</p>
                <p className="text-3xl font-bold text-green-600">{(approvedProfiles || []).length}</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Verificados</p>
                <p className="text-3xl font-bold text-blue-600">
                  {(approvedProfiles || []).filter((p: any) => p.check_verificado).length}
                </p>
              </div>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nombre o categoría..."
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pending">
              Pendientes ({(pendingProfiles || []).length})
            </TabsTrigger>
            <TabsTrigger value="approved">
              Aprobados ({(approvedProfiles || []).length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {!filteredPending || filteredPending.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-gray-500">
                  <h3 className="text-xl font-semibold mb-2">No hay perfiles pendientes</h3>
                  <p>Todos los registros han sido procesados</p>
                </CardContent>
              </Card>
            ) : (
              filteredPending.map((profile: any) => (
                <Card key={profile.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2">
                          <User size={20} />
                          {profile.nombre_completo}
                        </CardTitle>
                        <CardDescription>{profile.categoria_profesional}</CardDescription>
                      </div>
                      {profile.ai_analysis?.riesgo_general && (
                        <Badge className={getRiskBadgeColor(profile.ai_analysis.riesgo_general)}>
                          Riesgo: {profile.ai_analysis.riesgo_general}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-muted-foreground" />
                        <span className="text-sm">{profile.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={14} className="text-muted-foreground" />
                        <span className="text-sm">{profile.telefono}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-muted-foreground" />
                        <span className="text-sm">{profile.ciudad}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award size={14} className="text-muted-foreground" />
                        <span className="text-sm">Test: {profile.test_score || 0}/100</span>
                      </div>
                    </div>

                    {profile.ai_analysis && (
                      <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          <div className="space-y-2">
                            <div>
                              <span className="font-semibold">Análisis IA: </span>
                              {profile.ai_analysis.observaciones_admin}
                            </div>
                            <div>
                              <span className="font-semibold">Recomendación: </span>
                              {profile.ai_analysis.recomendacion_accion}
                            </div>
                          </div>
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          setSelectedProfile(profile);
                          setShowDetailDialog(true);
                        }}
                      >
                        <Eye className="mr-2" size={14} />
                        Ver Detalles
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={() => handleApprove(profile)}
                      >
                        <CheckCircle className="mr-2" size={14} />
                        Aprobar
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="flex-1"
                        onClick={() => handleReject(profile)}
                      >
                        <XCircle className="mr-2" size={14} />
                        Rechazar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="approved" className="space-y-4">
            {!filteredApproved || filteredApproved.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-gray-500">
                  <h3 className="text-xl font-semibold mb-2">No hay perfiles aprobados</h3>
                  <p>Los perfiles aprobados aparecerán aquí</p>
                </CardContent>
              </Card>
            ) : (
              filteredApproved.map((profile: any) => (
                <Card key={profile.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2">
                          <User size={20} />
                          {profile.nombre_completo}
                          {profile.check_verificado && (
                            <Badge className="bg-blue-500">
                              <CheckCircle size={12} className="mr-1" />
                              Verificado
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription>{profile.categoria_profesional}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-muted-foreground" />
                        <span className="text-sm">{profile.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-muted-foreground" />
                        <span className="text-sm">{profile.ciudad}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-muted-foreground" />
                        <span className="text-sm">
                          {new Date(profile.fecha_aprobacion).toLocaleDateString()}
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedProfile(profile);
                          setShowDetailDialog(true);
                        }}
                      >
                        <Eye className="mr-2" size={14} />
                        Ver Detalles
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User size={24} />
              Información completa del profesional
            </DialogTitle>
            <DialogDescription>
              Revisa todos los detalles antes de aprobar o rechazar
            </DialogDescription>
          </DialogHeader>
          {selectedProfile && (
            <ScrollArea className="max-h-[70vh] pr-4">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Información Personal</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4">
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
                      <span>Certificado:</span>
                      <Badge variant={selectedProfile.documento_certificado ? 'default' : 'secondary'}>
                        {selectedProfile.documento_certificado ? 'Adjuntado' : 'No adjuntado'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {selectedProfile.ai_analysis && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Shield size={20} />
                        Análisis de IA
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="font-semibold">Nivel de Interés:</span>
                          <Badge className="ml-2">{selectedProfile.ai_analysis.nivel_interes}</Badge>
                        </div>
                        <div>
                          <span className="font-semibold">Urgencia:</span>
                          <Badge className="ml-2">{selectedProfile.ai_analysis.urgencia}</Badge>
                        </div>
                        <div>
                          <span className="font-semibold">Riesgo:</span>
                          <Badge className={getRiskBadgeColor(selectedProfile.ai_analysis.riesgo_general)}>
                            {selectedProfile.ai_analysis.riesgo_general}
                          </Badge>
                        </div>
                        <div>
                          <span className="font-semibold">Score:</span>
                          <span className="ml-2">{selectedProfile.test_score || 0}/100</span>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <span className="font-semibold">Observaciones:</span>
                        <p className="mt-2 text-sm">{selectedProfile.ai_analysis.observaciones_admin}</p>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <span className="font-semibold">Recomendación:</span>
                        <p className="mt-2 text-sm">{selectedProfile.ai_analysis.recomendacion_accion}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {selectedProfile.estado_perfil === 'pendiente_verificacion' && (
                  <div className="flex gap-4 pt-4">
                    <Button
                      variant="destructive"
                      className="flex-1"
                      onClick={() => handleReject(selectedProfile)}
                    >
                      <XCircle className="mr-2" size={16} />
                      Rechazar
                    </Button>
                    <Button
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={() => handleApprove(selectedProfile)}
                    >
                      <CheckCircle className="mr-2" size={16} />
                      Aprobar
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






















































































