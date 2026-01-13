import { useState, useEffect } from 'react';
import { useAdminAuth } from '@/contextos/AdminAuthContext';
import { useKV } from '@github/spark/hooks';
import { AdminSettings } from '@/types/admin';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { 
  ArrowLeft, Gear, Bell, Shield, Palette, Database, Envelope
} from '@phosphor-icons/react';
import { toast } from 'sonner';
import { logAudit } from '@/lib/audit';

interface AdminConfigurationProps {
  setPage: (page: string) => void;
}

const AdminConfiguration = ({ setPage }: AdminConfigurationProps) => {
  const { isAuthenticated, adminUser } = useAdminAuth();
  const [settings, setSettings] = useKV<AdminSettings[]>('admin-settings', []);

  const [systemSettings, setSystemSettings] = useState({
    site_name: 'Hogar Belén',
    site_url: 'https://www.hogarbelen.org',
    maintenance_mode: false,
    registration_enabled: true,
    ai_features_enabled: true,
    email_notifications_enabled: true,
  });

  const [notificationSettings, setNotificationSettings] = useState({
    admin_emails: 'hogarbelen2022@gmail.com',
    notify_high_priority_leads: true,
    notify_professional_signup: true,
    notify_new_booking: true,
    notify_payment_received: true,
  });

  const [aiSettings, setAiSettings] = useState({
    auto_classify_leads: true,
    auto_analyze_professionals: true,
    auto_review_job_offers: true,
    confidence_threshold: 0.7,
  });

  const [integrationSettings, setIntegrationSettings] = useState({
    meta_pixel_id: '',
    google_analytics_id: '',
    smtp_host: '',
    smtp_port: '',
    smtp_user: '',
    smtp_from: 'noreply@hogarbelen.org',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      setPage('admin-login');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    (settings || []).forEach(setting => {
      if (setting.category === 'system') {
        setSystemSettings(prev => ({ ...prev, [setting.key]: setting.value }));
      } else if (setting.category === 'ai') {
        setAiSettings(prev => ({ ...prev, [setting.key]: setting.value }));
      } else if (setting.category === 'integrations') {
        setIntegrationSettings(prev => ({ ...prev, [setting.key]: setting.value }));
      }
    });

    const notifySetting = (settings || []).find(s => s.key === 'notification_settings');
    if (notifySetting) {
      setNotificationSettings(notifySetting.value);
    }
  }, [settings]);

  const saveSetting = async (category: AdminSettings['category'], key: string, value: any) => {
    const existing = (settings || []).find(s => s.key === key);

    if (existing) {
      await setSettings((current) =>
        (current || []).map(s =>
          s.key === key
            ? { ...s, value, updated_by: adminUser?.email || 'admin', updated_at: new Date().toISOString() }
            : s
        )
      );
    } else {
      const newSetting: AdminSettings = {
        id: `setting-${Date.now()}`,
        category,
        key,
        value,
        updated_by: adminUser?.email || 'admin',
        updated_at: new Date().toISOString(),
      };
      await setSettings((current) => [...(current || []), newSetting]);
    }

    await logAudit({
      user_id: adminUser?.id || 'unknown',
      user_email: adminUser?.email || 'unknown',
      action: 'update_system_settings',
      resource_type: 'settings',
      resource_id: key,
      details: { key, category },
      ip_address: 'admin',
      user_agent: navigator.userAgent,
    });
  };

  const saveSystemSettings = async () => {
    for (const [key, value] of Object.entries(systemSettings)) {
      await saveSetting('system', key, value);
    }
    toast.success('Configuración del sistema actualizada');
  };

  const saveNotificationSettings = async () => {
    await saveSetting('system', 'notification_settings', notificationSettings);
    toast.success('Configuración de notificaciones actualizada');
  };

  const saveAISettings = async () => {
    for (const [key, value] of Object.entries(aiSettings)) {
      await saveSetting('ai', key, value);
    }
    toast.success('Configuración de IA actualizada');
  };

  const saveIntegrationSettings = async () => {
    for (const [key, value] of Object.entries(integrationSettings)) {
      await saveSetting('integrations', key, value);
    }
    toast.success('Configuración de integraciones actualizada');
  };

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
              <h1 className="text-2xl font-bold text-gray-900">Configuración del Sistema</h1>
              <p className="text-sm text-gray-600">Ajustes globales y preferencias administrativas</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="system" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="system">Sistema</TabsTrigger>
            <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
            <TabsTrigger value="ai">IA</TabsTrigger>
            <TabsTrigger value="integrations">Integraciones</TabsTrigger>
          </TabsList>

          <TabsContent value="system">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gear size={20} />
                  Configuración General
                </CardTitle>
                <CardDescription>
                  Configuraciones básicas del sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Nombre del Sitio</Label>
                  <Input
                    value={systemSettings.site_name}
                    onChange={(e) => setSystemSettings({ ...systemSettings, site_name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>URL del Sitio</Label>
                  <Input
                    value={systemSettings.site_url}
                    onChange={(e) => setSystemSettings({ ...systemSettings, site_url: e.target.value })}
                    type="url"
                  />
                </div>

                <div className="flex items-center justify-between py-4 border-t border-b">
                  <div className="space-y-1">
                    <Label>Modo de Mantenimiento</Label>
                    <p className="text-sm text-gray-500">
                      Desactiva el acceso público al sitio
                    </p>
                  </div>
                  <Switch
                    checked={systemSettings.maintenance_mode}
                    onCheckedChange={(checked) => 
                      setSystemSettings({ ...systemSettings, maintenance_mode: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between py-4 border-b">
                  <div className="space-y-1">
                    <Label>Registro de Usuarios Habilitado</Label>
                    <p className="text-sm text-gray-500">
                      Permite nuevos registros de familias y profesionales
                    </p>
                  </div>
                  <Switch
                    checked={systemSettings.registration_enabled}
                    onCheckedChange={(checked) => 
                      setSystemSettings({ ...systemSettings, registration_enabled: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between py-4 border-b">
                  <div className="space-y-1">
                    <Label>Funcionalidades de IA</Label>
                    <p className="text-sm text-gray-500">
                      Habilita análisis automático con inteligencia artificial
                    </p>
                  </div>
                  <Switch
                    checked={systemSettings.ai_features_enabled}
                    onCheckedChange={(checked) => 
                      setSystemSettings({ ...systemSettings, ai_features_enabled: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between py-4">
                  <div className="space-y-1">
                    <Label>Notificaciones por Email</Label>
                    <p className="text-sm text-gray-500">
                      Envía notificaciones automáticas por correo
                    </p>
                  </div>
                  <Switch
                    checked={systemSettings.email_notifications_enabled}
                    onCheckedChange={(checked) => 
                      setSystemSettings({ ...systemSettings, email_notifications_enabled: checked })
                    }
                  />
                </div>

                <Button onClick={saveSystemSettings} className="w-full">
                  Guardar Configuración del Sistema
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell size={20} />
                  Configuración de Notificaciones
                </CardTitle>
                <CardDescription>
                  Gestione las notificaciones por email a administradores
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Emails de Administradores (separados por comas)</Label>
                  <Textarea
                    value={notificationSettings.admin_emails}
                    onChange={(e) => 
                      setNotificationSettings({ ...notificationSettings, admin_emails: e.target.value })
                    }
                    rows={2}
                    placeholder="admin1@example.com, admin2@example.com"
                  />
                  <p className="text-sm text-gray-500">
                    Estos emails recibirán todas las notificaciones administrativas
                  </p>
                </div>

                <div className="flex items-center justify-between py-4 border-t border-b">
                  <div className="space-y-1">
                    <Label>Notificar Leads de Alta Prioridad</Label>
                    <p className="text-sm text-gray-500">
                      Envía email inmediato cuando se recibe un lead crítico o de alta prioridad
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.notify_high_priority_leads}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({ ...notificationSettings, notify_high_priority_leads: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between py-4 border-b">
                  <div className="space-y-1">
                    <Label>Notificar Registro de Profesionales</Label>
                    <p className="text-sm text-gray-500">
                      Envía email cuando se registra un nuevo profesional
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.notify_professional_signup}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({ ...notificationSettings, notify_professional_signup: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between py-4 border-b">
                  <div className="space-y-1">
                    <Label>Notificar Nuevas Reservas</Label>
                    <p className="text-sm text-gray-500">
                      Envía email cuando se hace una nueva reserva de servicio
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.notify_new_booking}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({ ...notificationSettings, notify_new_booking: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between py-4">
                  <div className="space-y-1">
                    <Label>Notificar Pagos Recibidos</Label>
                    <p className="text-sm text-gray-500">
                      Envía email cuando se procesa un pago exitoso
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.notify_payment_received}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({ ...notificationSettings, notify_payment_received: checked })
                    }
                  />
                </div>

                <Button onClick={saveNotificationSettings} className="w-full">
                  Guardar Configuración de Notificaciones
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield size={20} />
                  Configuración de Inteligencia Artificial
                </CardTitle>
                <CardDescription>
                  Configure el comportamiento del sistema de IA
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between py-4 border-t border-b">
                  <div className="space-y-1">
                    <Label>Clasificar Leads Automáticamente</Label>
                    <p className="text-sm text-gray-500">
                      Usa IA para analizar y priorizar nuevos leads
                    </p>
                  </div>
                  <Switch
                    checked={aiSettings.auto_classify_leads}
                    onCheckedChange={(checked) => 
                      setAiSettings({ ...aiSettings, auto_classify_leads: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between py-4 border-b">
                  <div className="space-y-1">
                    <Label>Analizar Profesionales Automáticamente</Label>
                    <p className="text-sm text-gray-500">
                      Analiza perfiles de profesionales al registrarse
                    </p>
                  </div>
                  <Switch
                    checked={aiSettings.auto_analyze_professionals}
                    onCheckedChange={(checked) => 
                      setAiSettings({ ...aiSettings, auto_analyze_professionals: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between py-4 border-b">
                  <div className="space-y-1">
                    <Label>Revisar Ofertas de Trabajo Automáticamente</Label>
                    <p className="text-sm text-gray-500">
                      Analiza ofertas laborales al crearse
                    </p>
                  </div>
                  <Switch
                    checked={aiSettings.auto_review_job_offers}
                    onCheckedChange={(checked) => 
                      setAiSettings({ ...aiSettings, auto_review_job_offers: checked })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Umbral de Confianza (0.0 - 1.0)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="1"
                    step="0.1"
                    value={aiSettings.confidence_threshold}
                    onChange={(e) => 
                      setAiSettings({ ...aiSettings, confidence_threshold: parseFloat(e.target.value) })
                    }
                  />
                  <p className="text-sm text-gray-500">
                    Puntuación mínima para considerar un análisis de IA como confiable
                  </p>
                </div>

                <Button onClick={saveAISettings} className="w-full">
                  Guardar Configuración de IA
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database size={20} />
                  Integraciones de Terceros
                </CardTitle>
                <CardDescription>
                  Configure integraciones con servicios externos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4 pb-6 border-b">
                  <h3 className="font-semibold">Analítica y Tracking</h3>
                  
                  <div className="space-y-2">
                    <Label>Meta Pixel ID</Label>
                    <Input
                      value={integrationSettings.meta_pixel_id}
                      onChange={(e) => 
                        setIntegrationSettings({ ...integrationSettings, meta_pixel_id: e.target.value })
                      }
                      placeholder="1234567890"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Google Analytics ID</Label>
                    <Input
                      value={integrationSettings.google_analytics_id}
                      onChange={(e) => 
                        setIntegrationSettings({ ...integrationSettings, google_analytics_id: e.target.value })
                      }
                      placeholder="G-XXXXXXXXXX"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Envelope size={18} />
                    Configuración SMTP (Email)
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Host SMTP</Label>
                      <Input
                        value={integrationSettings.smtp_host}
                        onChange={(e) => 
                          setIntegrationSettings({ ...integrationSettings, smtp_host: e.target.value })
                        }
                        placeholder="smtp.gmail.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Puerto SMTP</Label>
                      <Input
                        value={integrationSettings.smtp_port}
                        onChange={(e) => 
                          setIntegrationSettings({ ...integrationSettings, smtp_port: e.target.value })
                        }
                        placeholder="587"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Usuario SMTP</Label>
                    <Input
                      value={integrationSettings.smtp_user}
                      onChange={(e) => 
                        setIntegrationSettings({ ...integrationSettings, smtp_user: e.target.value })
                      }
                      placeholder="user@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Email Remitente</Label>
                    <Input
                      value={integrationSettings.smtp_from}
                      onChange={(e) => 
                        setIntegrationSettings({ ...integrationSettings, smtp_from: e.target.value })
                      }
                      placeholder="noreply@hogarbelen.org"
                    />
                  </div>
                </div>

                <Button onClick={saveIntegrationSettings} className="w-full">
                  Guardar Configuración de Integraciones
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminConfiguration;
