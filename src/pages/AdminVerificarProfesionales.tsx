import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescriptio
import { Alert, AlertDescription } from '@/com
import { Separator } from '@/components/ui/separator';
import {
  CheckCircle,
  FileText,
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
  TrendingUp,
  AlertCircle,
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
    const profile = pendingProfiles.find(p => p.id === profileId);
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
    const profile = pendingProfiles.find(p => p.id === profileId);
    if (!profile) return;

    setPendingProfiles((current: any[]) => current.filter(p => p.id !== profileId));
    
    toast.success(`Perfil de ${profile.nombre_completo} rechazado`);
    setShowDetailDialog(false);
  };

          <div>
              Verificación de Pr
            <p className="text
    

          

          <Card>
              <CardTitle className="text-sm font-medium text-gra
              <
            <CardContent>
                {(pendingProfiles || []).le
            </Car

            <CardHeader className="pb-3">
                
            </Ca
              <div className="text-3xl font-bold text-green-600">
              </div>
          </Card>
          <Car

              </CardTitle>
            <Car
                {(pendingProfiles || []).
            </CardContent>
        </div>
        {(pendingProfiles 
            <CardContent 
              <p classNam
          </Card>
          <div className="space-y-4">
              <Card 
                  <div cla
                 

                
                        {profile.ai_analy
                        )}
                          <
                      </di
                      <p 
                      <di
                          <MapPin size={16} />
                        </div>
                    
                        </
                 

                
                        </div>

                     
                          
                         
                         
                              <div className="flex items-center 
                                <span className="font-semibold">{p
                    
                          
                 
              

                            </div>
                
                    </div>
                    <div className="flex gap-2 ml-4">
                        variant="outline"
                        on
                 
             
                  </div>
              </Card>
          </div>
      </div>
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDia
          {selectedProfile && (
              <DialogHeader>
                  <User size={24} />
                </DialogTitle>
                  Revisión completa del perfil profesional
              </DialogHeader>
              <Tabs defaul
                  <TabsTrigger value="basico">Datos Básicos</TabsTrigger>
                  <TabsTrigger value="test">Test</TabsTrigger>
                </TabsList
                <TabsContent value="basico" className="space-y-4">
                    <CardHeader>
                    </Card
                      <div c
                      
                        </div>
                      
                        </div>
                          <p className="text-sm font-medium text-
                        </div>
                          <p className="te
                        </div>
                          <p className="text-sm font-medium text-
                        </div>
                          <p className="text
                        </div>
                      
                      
                        <p className="text-sm font-medium text-g
                      </div>
                      <Separator />
                      <div>
                        <div className="flex flex-wrap g
                            <B
                        </di

                  </Card>

                  <Card>
                      <CardTitle className="text-lg">Documentos Cargados</C
                    <CardContent className="space-y-3">
                        <div cla
                          <span>Cédula</span>
                        <CheckCircle className="text-green-600" size={20} />
                      
                        <div className="flex items-center gap-2">
                          <span>Hoja de vida</span>
                        <CheckCircle className="text-green-600" size={20} />
                      
                        <div class
                          <span>A
                        <CheckCircle className="text-green-600" size={20} />

                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <Shield size={20} />
                          </div>
                        </div>
                    </CardContent>
                </TabsContent>
                <TabsContent value
                    <CardHeader>
                    </CardHead
                      <d
                          

                          de {selectedProfile.test_re
                      </div>
                      <Progress value={se
                      <div classN
                          <div key={idx} className="p-3 bg-gray-50 
                       
                                <CheckCircle className="te
                                <War
                              <
                          
                        
                      </div>
                  </C

                
          
            

                        <AlertDescription>
                          {selectedProfile.ai_analysis.riesgo_general.toUp
                      </Alert>
              
                          <C
                        <CardContent className="space-y-4">
                            <p class
                          </div>
                          <Sep
                          <div>
                            <ul className="list-disc list-
                                <li 
                            <

                            <>
                              <div>
                                <ul className="list-disc list-inside spac
                                    <li key={idx} className="text-base tex
                                </ul>
                            </>


                            <p className="text-sm font-medium text
                        
                                
                                    <span className="font-medium text-sm">{v.tipo}</s
                                 
                                </div>
                            </div>
                        </Car
                    </>
                </TabsContent>

                <Button
                  onClick={() => setShowDetailDialog(false)}
                >
                </Button>
                  variant="de
                  className="flex-1"
                  Rechazar Perfil
                <Button
                  className="
                  <CheckCircle size={18} className="mr-2" />
                </Button>
            </>
        </DialogContent>
    </div>
}























































































































































































































