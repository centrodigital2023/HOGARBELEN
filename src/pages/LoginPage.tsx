import { useState } from 'react';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner';
import type { User } from '../App';

interface LoginPageProps {
  setPage: (page: string) => void;
  setUser: (user: User) => void;
}

export default function LoginPage({ setPage, setUser }: LoginPageProps) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const userData: User = {
        id: '1',
        email: formData.email,
        fullName: 'Familia Rodríguez',
        role: 'family',
        plan: 'Integral Conectado',
      };
      setUser(userData);
      toast.success('Bienvenido de nuevo');
      setPage('dashboard');
      setLoading(false);
    }, 1000);
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
