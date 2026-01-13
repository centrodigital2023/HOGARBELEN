import { useState } from 'react';
import { useAdminAuth } from '@/contextos/AdminAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Lock, Warning } from '@phosphor-icons/react';
import { toast } from 'sonner';

interface AdminLoginProps {
  setPage: (page: string) => void;
}

const AdminLogin = ({ setPage }: AdminLoginProps) => {
  const { loginWithCredentials, totpRequired } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await loginWithCredentials(email, password);
      
      if (!result.success) {
        setError(result.error || 'Error al iniciar sesión');
        toast.error(result.error || 'Error al iniciar sesión');
        return;
      }

      if (result.requiresTOTP) {
        setPage('admin-2fa');
      } else {
        toast.success('Sesión iniciada exitosamente');
        setPage('admin-dashboard');
      }
    } catch (err) {
      setError('Error inesperado al iniciar sesión');
      toast.error('Error inesperado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
      
      <Card className="w-full max-w-md relative z-10 border-gray-700 bg-gray-800/50 backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <Shield size={24} weight="bold" className="text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">
            Acceso Administrativo
          </CardTitle>
          <CardDescription className="text-gray-400">
            Sistema de administración de Hogar Belén
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive" className="bg-red-900/20 border-red-900 text-red-200">
                <Warning size={16} className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">
                Correo Electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@hogarbelen.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-blue-500"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Verificando...
                </>
              ) : (
                <>
                  <Lock size={16} className="mr-2" />
                  Iniciar Sesión
                </>
              )}
            </Button>

            <div className="pt-4 border-t border-gray-700">
              <div className="flex items-start gap-2 text-xs text-gray-400">
                <Shield size={14} className="mt-0.5 flex-shrink-0" />
                <p>
                  Este es un área restringida. Todos los accesos son registrados y monitoreados.
                  El sistema cuenta con autenticación de doble factor (2FA) y bloqueo automático tras múltiples intentos fallidos.
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="ghost"
              className="w-full text-gray-400 hover:text-gray-300"
              onClick={() => setPage('home')}
            >
              Volver al sitio público
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
