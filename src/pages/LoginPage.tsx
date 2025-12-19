import { useState, useEffect } from 'react';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner';
import type { User } from '../App';
import { useAuth } from '../contextos/SupabaseAuthContext';
import { initializeGoogleSignIn, renderGoogleButton, parseJWT, type GoogleAuthResponse } from '../lib/googleAuth';
import MetaPixel from '../lib/metaPixel';

interface LoginPageProps {
  setPage: (page: string) => void;
  setUser: (user: User) => void;
}

export default function LoginPage({ setPage, setUser }: LoginPageProps) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  useEffect(() => {
    // Initialize Google Sign-In
    initializeGoogleSignIn(
      handleGoogleSuccess,
      (error) => {
        console.error('Google Sign-In initialization error:', error);
      }
    );

    // Render Google button after a short delay to ensure DOM is ready
    const timer = setTimeout(() => {
      renderGoogleButton('googleSignInButton', {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        text: 'signin_with',
        shape: 'rectangular',
        width: 350,
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleGoogleSuccess = async (response: GoogleAuthResponse) => {
    try {
      setLoading(true);
      
      // Parse the JWT token to get user info
      const googleUser = parseJWT(response.credential);
      
      if (!googleUser) {
        toast.error('Error al procesar información de Google');
        return;
      }

      // In production, send the credential to backend for validation
      // Backend should validate with Google: https://developers.google.com/identity/gsi/web/guides/verify-google-id-token
      // For now, we'll use the local auth system
      
      // Try to sign in or create account
      const { error } = await signIn(googleUser.email, 'google-oauth-' + googleUser.id);
      
      if (error) {
        // If user doesn't exist, could auto-register or show message
        toast.info('Cuenta no encontrada. Por favor regístrate primero.');
        setPage('register');
        return;
      }

      MetaPixel.trackLead('login_google');
      toast.success(`¡Bienvenido, ${googleUser.name}!`);
      
    } catch (error) {
      console.error('Google Sign-In error:', error);
      toast.error('Error al iniciar sesión con Google');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await signIn(formData.email, formData.password);
      
      if (error) {
        toast.error('Credenciales incorrectas');
        return;
      }

      MetaPixel.trackLead('login_email');
      toast.success('Bienvenido de nuevo');
    } catch (error) {
      toast.error('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-muted/50">
      <Card className="max-w-md w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Iniciar Sesión</CardTitle>
          <CardDescription className="text-center">
            Ingresa a tu cuenta de Hogar Belén
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
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
            
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  O continúa con
                </span>
              </div>
            </div>

            {/* Google Sign-In Button */}
            <div id="googleSignInButton" className="w-full flex justify-center"></div>
            
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
