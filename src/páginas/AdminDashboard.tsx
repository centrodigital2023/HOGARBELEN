import { useState, useEffect } from 'react';
import { useAdminAuth } from '@/contextos/AdminAuthContext';
import { useKV } from '@github/spark/hooks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, SignOut, Users, Briefcase, ChartBar, FileText, 
  Robot, ClockCounterClockwise, Gear, UserCheck, Warning, ChartLine
} from '@phosphor-icons/react';
import { DashboardKPIs } from '@/types/admin';
import { toast } from 'sonner';

interface AdminDashboardProps {
  setPage: (page: string) => void;
}

const AdminDashboard = ({ setPage }: AdminDashboardProps) => {
  const { adminUser, logout, isAuthenticated, isSuperAdmin } = useAdminAuth();
  const [professionals] = useKV<any[]>('professionals', []);
  const [leads] = useKV<any[]>('leads', []);
  const [jobOffers] = useKV<any[]>('job-offers', []);
  const [aiAlerts] = useKV<any[]>('ai-alerts', []);
  const [kpis, setKpis] = useState<DashboardKPIs | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setPage('admin-login');
      return;
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const pendingApprovals = (professionals || []).filter((p: any) => p.status === 'pending').length;
    
    const thisMonth = new Date();
    thisMonth.setDate(1);
    thisMonth.setHours(0, 0, 0, 0);
    
    const leadsThisMonth = (leads || []).filter((l: any) => 
      new Date(l.created_at) >= thisMonth
    ).length;

    const unresolvedAlerts = (aiAlerts || []).filter((a: any) => !a.resolved).length;
    const highRiskPros = (professionals || []).filter((p: any) => 
      p.ai_score && p.ai_score < 0.5
    ).length;
    const highPriorityLeads = (leads || []).filter((l: any) => 
      l.priority === 'high' || l.priority === 'critical'
    ).length;

    setKpis({
      total_professionals: (professionals || []).length,
      pending_approvals: pendingApprovals,
      active_jobs: (jobOffers || []).filter((j: any) => j.active || j.published).length,
      total_leads: (leads || []).length,
      leads_this_month: leadsThisMonth,
      ai_alerts: unresolvedAlerts + highRiskPros + highPriorityLeads,
    });
  }, [professionals, leads, jobOffers, aiAlerts]);

  const handleLogout = async () => {
    await logout();
    toast.success('Sesión cerrada exitosamente');
    setPage('home');
  };

  if (!adminUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Shield size={20} weight="bold" className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Panel de Administración
                </h1>
                <p className="text-sm text-gray-500">
                  {adminUser.email} {isSuperAdmin && <Badge variant="default" className="ml-2 bg-blue-600">Super Admin</Badge>}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => setPage('home')}
                className="text-gray-600"
              >
                Ver sitio público
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <SignOut size={16} />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Profesionales Totales</CardDescription>
              <CardTitle className="text-3xl">{kpis?.total_professionals ?? 0}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users size={16} />
                <span>Registrados en la plataforma</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Pendientes de Aprobación</CardDescription>
              <CardTitle className="text-3xl text-amber-600">{kpis?.pending_approvals ?? 0}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <UserCheck size={16} />
                <span>Requieren verificación</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Ofertas Activas</CardDescription>
              <CardTitle className="text-3xl text-green-600">{kpis?.active_jobs ?? 0}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Briefcase size={16} />
                <span>Publicadas actualmente</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Leads este mes</CardDescription>
              <CardTitle className="text-3xl text-blue-600">{kpis?.leads_this_month ?? 0}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <ChartBar size={16} />
                <span>De {kpis?.total_leads ?? 0} totales</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {kpis && kpis.ai_alerts > 0 && (
          <Card className="mb-8 border-amber-500 bg-amber-50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Warning size={20} className="text-amber-600" />
                <CardTitle className="text-amber-900">Alertas de IA</CardTitle>
              </div>
              <CardDescription className="text-amber-700">
                {kpis.ai_alerts} elementos requieren atención inmediata
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => setPage('admin-ia')}
                className="bg-amber-600 hover:bg-amber-700"
              >
                <Robot size={16} className="mr-2" />
                Ver Clasificaciones IA
              </Button>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview">Vista General</TabsTrigger>
            <TabsTrigger value="modules">Módulos</TabsTrigger>
            <TabsTrigger value="audit">Auditoría</TabsTrigger>
            <TabsTrigger value="settings">Configuración</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Bienvenido, {adminUser.full_name}</CardTitle>
                <CardDescription>
                  Panel de control centralizado de Hogar Belén
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Desde este panel puede gestionar todos los aspectos de la plataforma:
                    profesionales, ofertas de trabajo, leads, contenido y configuración del sistema.
                  </p>
                  <p className="text-sm text-gray-600">
                    Todas las acciones administrativas son registradas en el sistema de auditoría
                    para mantener transparencia y trazabilidad completa.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="modules" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setPage('admin-profesionales')}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Users size={24} className="text-blue-600" />
                    <CardTitle>Profesionales</CardTitle>
                  </div>
                  <CardDescription>
                    Aprobar, rechazar y gestionar perfiles profesionales
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {kpis && kpis.pending_approvals > 0 && (
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                      {kpis.pending_approvals} pendientes
                    </Badge>
                  )}
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setPage('admin-ofertas')}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Briefcase size={24} className="text-green-600" />
                    <CardTitle>Ofertas de Trabajo</CardTitle>
                  </div>
                  <CardDescription>
                    Crear, editar y publicar ofertas laborales
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {kpis?.active_jobs ?? 0} activas
                  </Badge>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setPage('admin-leads')}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <ChartBar size={24} className="text-purple-600" />
                    <CardTitle>Leads</CardTitle>
                  </div>
                  <CardDescription>
                    Gestionar contactos y solicitudes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                    {kpis?.total_leads ?? 0} totales
                  </Badge>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setPage('admin-analytics')}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <ChartLine size={24} className="text-blue-600" />
                    <CardTitle>Analíticas</CardTitle>
                  </div>
                  <CardDescription>
                    Visualización de datos y métricas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Gráficos interactivos
                  </Badge>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setPage('admin-contenido')}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <FileText size={24} className="text-orange-600" />
                    <CardTitle>Contenido</CardTitle>
                  </div>
                  <CardDescription>
                    Editar textos del footer y páginas legales
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setPage('admin-ia')}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Robot size={24} className="text-pink-600" />
                    <CardTitle>Clasificaciones IA</CardTitle>
                  </div>
                  <CardDescription>
                    Ver análisis y recomendaciones de IA
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {kpis && kpis.ai_alerts > 0 && (
                    <Badge variant="destructive" className="bg-red-100 text-red-800">
                      {kpis.ai_alerts} alertas
                    </Badge>
                  )}
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setPage('admin-auditoria')}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <ClockCounterClockwise size={24} className="text-gray-600" />
                    <CardTitle>Auditoría</CardTitle>
                  </div>
                  <CardDescription>
                    Registro completo de acciones administrativas
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="audit" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Registros de Auditoría Recientes</CardTitle>
                <CardDescription>
                  Ver historial completo de acciones administrativas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => setPage('admin-auditoria')}>
                  <ClockCounterClockwise size={16} className="mr-2" />
                  Ver Auditoría Completa
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Configuración del Sistema</CardTitle>
                <CardDescription>
                  Ajustes globales y preferencias administrativas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => setPage('admin-configuracion')}>
                  <Gear size={16} className="mr-2" />
                  Abrir Configuración
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
