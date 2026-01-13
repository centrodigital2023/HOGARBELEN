import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Lock, Eye, EyeSlash, Tag } from '@phosphor-icons/react';
import { toast } from 'sonner';

interface SettingsTabProps {
  setPage?: (page: string) => void;
}

const SettingsTab = ({ setPage }: SettingsTabProps) => {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    messageAlerts: true
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleNotificationChange = (key: string) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key as keyof typeof notifications]
    });
    toast.success('Preferencias actualizadas');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }
    toast.success('Contraseña actualizada correctamente');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Tag size={20} className="text-primary" />
            <CardTitle>Gestión de Promociones</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground mb-1">
                Códigos Promocionales
              </p>
              <p className="text-sm text-muted-foreground">
                Crea y gestiona códigos de descuento para atraer más clientes
              </p>
            </div>
            {setPage && (
              <Button 
                onClick={() => setPage('admin-promo-codes')}
                className="gap-2"
              >
                <Tag size={16} />
                Gestionar Códigos
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell size={20} className="text-primary" />
            <CardTitle>Notificaciones</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-foreground">
                  {key === 'emailNotifications' && 'Notificaciones por Email'}
                  {key === 'smsNotifications' && 'Notificaciones por SMS'}
                  {key === 'appointmentReminders' && 'Recordatorios de Citas'}
                  {key === 'messageAlerts' && 'Alertas de Mensajes'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {key === 'emailNotifications' && 'Recibe actualizaciones por correo electrónico'}
                  {key === 'smsNotifications' && 'Recibe mensajes de texto'}
                  {key === 'appointmentReminders' && 'Notificaciones antes de tus citas'}
                  {key === 'messageAlerts' && 'Cuando recibes mensajes nuevos'}
                </p>
              </div>
              <button
                onClick={() => handleNotificationChange(key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  value ? 'bg-primary' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    value ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock size={20} className="text-primary" />
            <CardTitle>Cambiar Contraseña</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-foreground mb-2">
                Contraseña Actual
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-foreground mb-2">
                Nueva Contraseña
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="newPassword"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                Confirmar Nueva Contraseña
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline">
                Cancelar
              </Button>
              <Button type="submit">
                Actualizar Contraseña
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsTab;
