import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminProfessionalsPanel } from './AdminProfessionalsPanel';
import { AdminJobOffersPanel } from './AdminJobOffersPanel';

interface RealtimeAdminPanelProps {
  adminId: string;
  adminEmail: string;
}

/**
 * Panel de administración centralizado con tabs para profesionales y ofertas
 * Utiliza los nuevos componentes especializados con Supabase Realtime
 */
export function RealtimeAdminPanel({ adminId, adminEmail }: RealtimeAdminPanelProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Panel de Administración</h1>
        <p className="text-muted-foreground mt-2">
          Gestiona profesionales y ofertas de trabajo en tiempo real
        </p>
      </div>

      <Tabs defaultValue="professionals" className="space-y-6">
        <TabsList>
          <TabsTrigger value="professionals">
            👨‍⚕️ Profesionales
          </TabsTrigger>
          <TabsTrigger value="jobs">
            💼 Ofertas de Trabajo
          </TabsTrigger>
        </TabsList>

        <TabsContent value="professionals">
          <AdminProfessionalsPanel adminId={adminId} />
        </TabsContent>

        <TabsContent value="jobs">
          <AdminJobOffersPanel adminId={adminId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
