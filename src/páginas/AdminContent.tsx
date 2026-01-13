import { useState, useEffect } from 'react';
import { useAdminAuth } from '@/contextos/AdminAuthContext';
import { useKV } from '@github/spark/hooks';
import { AdminSettings } from '@/types/admin';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, FileText } from '@phosphor-icons/react';
import { toast } from 'sonner';
import { logAudit } from '@/lib/audit';

interface AdminContentProps {
  setPage: (page: string) => void;
}

const AdminContent = ({ setPage }: AdminContentProps) => {
  const { isAuthenticated, adminUser } = useAdminAuth();
  const [settings, setSettings] = useKV<AdminSettings[]>('admin-settings', []);

  const [footerContent, setFooterContent] = useState({
    description: 'Hogar Belén es un centro especializado en cuidado integral para adultos mayores en Buesaco, Nariño.',
    contact_phone: '+57 321 570 8655',
    contact_email: 'hogarbelen2022@gmail.com',
    address: 'Buesaco, Nariño, Colombia',
  });

  const [termsContent, setTermsContent] = useState('');
  const [privacyContent, setPrivacyContent] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      setPage('admin-login');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const footerSettings = (settings || []).filter(s => s.category === 'content' && s.key.startsWith('footer_'));
    footerSettings.forEach(s => {
      const key = s.key.replace('footer_', '');
      if (key in footerContent) {
        setFooterContent(prev => ({ ...prev, [key]: s.value }));
      }
    });

    const terms = (settings || []).find(s => s.key === 'legal_terms');
    if (terms) setTermsContent(terms.value);

    const privacy = (settings || []).find(s => s.key === 'legal_privacy');
    if (privacy) setPrivacyContent(privacy.value);
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
      action: 'update_content',
      resource_type: 'settings',
      resource_id: key,
      details: { key, category },
      ip_address: 'admin',
      user_agent: navigator.userAgent,
    });
  };

  const saveFooter = async () => {
    for (const [key, value] of Object.entries(footerContent)) {
      await saveSetting('content', `footer_${key}`, value);
    }
    toast.success('Contenido del footer actualizado');
  };

  const saveTerms = async () => {
    await saveSetting('legal', 'legal_terms', termsContent);
    toast.success('Términos y Condiciones actualizados');
  };

  const savePrivacy = async () => {
    await saveSetting('legal', 'legal_privacy', privacyContent);
    toast.success('Política de Privacidad actualizada');
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
              <h1 className="text-2xl font-bold text-gray-900">Gestión de Contenido</h1>
              <p className="text-sm text-gray-600">Editar textos del footer y páginas legales</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="footer" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="footer">Footer</TabsTrigger>
            <TabsTrigger value="terms">Términos y Condiciones</TabsTrigger>
            <TabsTrigger value="privacy">Política de Privacidad</TabsTrigger>
          </TabsList>

          <TabsContent value="footer">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText size={20} />
                  Contenido del Footer
                </CardTitle>
                <CardDescription>
                  Edite la información que aparece en el pie de página del sitio
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Descripción</label>
                  <Textarea
                    value={footerContent.description}
                    onChange={(e) => setFooterContent({ ...footerContent, description: e.target.value })}
                    rows={3}
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Teléfono de Contacto</label>
                    <Textarea
                      value={footerContent.contact_phone}
                      onChange={(e) => setFooterContent({ ...footerContent, contact_phone: e.target.value })}
                      rows={1}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email de Contacto</label>
                    <Textarea
                      value={footerContent.contact_email}
                      onChange={(e) => setFooterContent({ ...footerContent, contact_email: e.target.value })}
                      rows={1}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Dirección</label>
                  <Textarea
                    value={footerContent.address}
                    onChange={(e) => setFooterContent({ ...footerContent, address: e.target.value })}
                    rows={2}
                    className="mt-1"
                  />
                </div>

                <Button onClick={saveFooter} className="w-full">
                  Guardar Cambios
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="terms">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText size={20} />
                  Términos y Condiciones
                </CardTitle>
                <CardDescription>
                  Edite el contenido de la página de términos y condiciones
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={termsContent}
                  onChange={(e) => setTermsContent(e.target.value)}
                  rows={20}
                  placeholder="Ingrese los términos y condiciones completos..."
                  className="font-mono text-sm"
                />

                <Button onClick={saveTerms} className="w-full">
                  Guardar Términos y Condiciones
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText size={20} />
                  Política de Privacidad
                </CardTitle>
                <CardDescription>
                  Edite el contenido de la página de política de privacidad
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={privacyContent}
                  onChange={(e) => setPrivacyContent(e.target.value)}
                  rows={20}
                  placeholder="Ingrese la política de privacidad completa..."
                  className="font-mono text-sm"
                />

                <Button onClick={savePrivacy} className="w-full">
                  Guardar Política de Privacidad
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminContent;
