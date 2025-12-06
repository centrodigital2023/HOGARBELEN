import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../componentes/ui/pestañas';
import { User, Calendar, ChatCircle, Gear } from '@phosphor-icons/react';
import ResumenDelPerfil from '../panel/ResumenDelPerfil';
import ProfileTab from '../panel/ProfileTab';
import PestañaCitas from '../panel/PestañaCitas';
import PestañaMensajes from '../panel/PestañaMensajes';
import SettingsTab from '../panel/SettingsTab';

interface PanelDeControlProfesionalProps {
  user: any;
  userData?: any;
}

const PanelDeControlProfesional = ({ user, userData }: PanelDeControlProfesionalProps) => {
  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Panel de Control Profesional
          </h1>
          <p className="text-muted-foreground">
            Gestiona tu perfil, citas y comunicación con familias
          </p>
        </div>

        <div className="space-y-6">
          <ResumenDelPerfil user={user} userData={userData} />

          <Tabs defaultValue="perfil" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
              <TabsTrigger value="perfil" className="gap-2">
                <User size={16} />
                <span className="hidden sm:inline">Perfil</span>
              </TabsTrigger>
              <TabsTrigger value="citas" className="gap-2">
                <Calendar size={16} />
                <span className="hidden sm:inline">Citas</span>
              </TabsTrigger>
              <TabsTrigger value="mensajes" className="gap-2">
                <ChatCircle size={16} />
                <span className="hidden sm:inline">Mensajes</span>
              </TabsTrigger>
              <TabsTrigger value="configuracion" className="gap-2">
                <Gear size={16} />
                <span className="hidden sm:inline">Configuración</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="perfil">
              <ProfileTab userData={userData} />
            </TabsContent>

            <TabsContent value="citas">
              <PestañaCitas />
            </TabsContent>

            <TabsContent value="mensajes">
              <PestañaMensajes />
            </TabsContent>

            <TabsContent value="configuracion">
              <SettingsTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PanelDeControlProfesional;
