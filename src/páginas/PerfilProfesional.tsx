import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../componentes/ui/pestañas';
import ResumenDelPerfil from '../panel/ResumenDelPerfil';
import ProfileTab from '../panel/ProfileTab';
import PestañaCitas from '../panel/PestañaCitas';
import PestañaMensajes from '../panel/PestañaMensajes';
import SettingsTab from '../panel/SettingsTab';

interface PerfilProfesionalProps {
  user: any;
  userData?: any;
}

const PerfilProfesional = ({ user, userData }: PerfilProfesionalProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <ResumenDelPerfil user={user} userData={userData} />

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="appointments">Citas</TabsTrigger>
            <TabsTrigger value="messages">Mensajes</TabsTrigger>
            <TabsTrigger value="settings">Configuración</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Actividad Reciente</h3>
                <p className="text-muted-foreground">Próximamente...</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Estadísticas</h3>
                <p className="text-muted-foreground">Próximamente...</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <ProfileTab userData={userData} />
          </TabsContent>

          <TabsContent value="appointments">
            <PestañaCitas />
          </TabsContent>

          <TabsContent value="messages">
            <PestañaMensajes />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PerfilProfesional;
