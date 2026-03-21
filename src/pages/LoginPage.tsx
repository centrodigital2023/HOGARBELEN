import { useState } from 'react';
import { Mail, Lock, Loader2, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { toast } from 'sonner';

interface LoginPageProps {
  setPage: (page: string) => void;
  setIsAuthenticated: (value: boolean) => void;
  setUserRole: (role: string) => void;
  isAdminLogin?: boolean;
}

export default function LoginPage({ setPage, setIsAuthenticated, setUserRole, isAdminLogin = false }: LoginPageProps) {
  const [formData, setFormData] = useState({ email: '', password: '', twoFactorCode: '' });
  const [loading, setLoading] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isAdminLogin) {
      if (formData.email === 'josefabian1212@gmail.com' && formData.password === '@Sara2918+') {
        if (!showTwoFactor) {
          setShowTwoFactor(true);
          setLoading(false);
          return;
        }
        
        if (formData.twoFactorCode === '123012') {
          setIsAuthenticated(true);
          setUserRole('admin');
          toast.success('Bienvenido, Super Administrador');
          setPage('admin');
          setLoading(false);
        } else {
          toast.error('Código 2FA incorrecto');
          setLoading(false);
        }
      } else {
        toast.error('Credenciales incorrectas');
        setLoading(false);
      }
    } else {
      setTimeout(() => {
        setIsAuthenticated(true);
        setUserRole('family');
        toast.success('Bienvenido de nuevo');
        setPage('family-dashboard');
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-muted/50">
      <Card className="max-w-md w-full">
        <CardHeader className="space-y-1">
          {isAdminLogin && (
            <div className="flex justify-center mb-2">
              <Shield className="h-12 w-12 text-primary" />
            </div>
          )}
          <CardTitle className="text-2xl font-bold text-center">
            {isAdminLogin ? 'Panel de Administración' : 'Iniciar Sesión'}
          </CardTitle>
          <CardDescription className="text-center">
            {isAdminLogin ? 'Acceso solo para administradores' : 'Ingresa a tu cuenta de Hogar Belén'}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {isAdminLogin && !showTwoFactor && (
              <Alert>
                <AlertDescription className="text-xs">
                  Credenciales: josefabian1212@gmail.com / @Sara2918+
                </AlertDescription>
              </Alert>
            )}
            
            {!showTwoFactor ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="twoFactorCode">Código 2FA</Label>
                <Alert className="mb-3">
                  <AlertDescription className="text-xs">
                    Ingrese el código: 123012
                  </AlertDescription>
                </Alert>
                <Input
                  id="twoFactorCode"
                  type="text"
                  placeholder="123012"
                  value={formData.twoFactorCode}
                  onChange={(e) => setFormData({ ...formData, twoFactorCode: e.target.value })}
                  maxLength={6}
                  required
                />
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 animate-spin" size={18} />
                  Iniciando sesión...
                </>
              ) : (
                'Entrar'
              )}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              ¿No tienes cuenta?{' '}
              <button
                type="button"
                onClick={() => setPage('register')}
                className="text-primary hover:underline font-medium"
              >
                Regístrate
              </button>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
