import { useState } from 'react';
import { Mail, Lock, User as UserIcon, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from 'sonner';
import type { User } from '../App';

interface RegisterPageProps {
  setPage: (page: string) => void;
  setUser: (user: User) => void;
}

export default function RegisterPage({ setPage, setUser }: RegisterPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'family' as 'family' | 'professional',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const userData: User = {
        id: '2',
        email: formData.email,
        fullName: formData.name,
        role: formData.role,
        plan: formData.role === 'family' ? 'Básico' : undefined,
      };
      setUser(userData);
      toast.success('Cuenta creada exitosamente');
      setPage('dashboard');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-muted/50 py-12">
      <Card className="max-w-md w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Crear Cuenta</CardTitle>
          <CardDescription className="text-center">
            Únete a la comunidad de Hogar Belén
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <Tabs
              value={formData.role}
              onValueChange={(value) => setFormData({ ...formData, role: value as 'family' | 'professional' })}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="family">Familia</TabsTrigger>
                <TabsTrigger value="professional">Profesional</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="space-y-2">
              <Label htmlFor="name">Nombre Completo</Label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  id="name"
                  placeholder="Tu nombre completo"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

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
                  minLength={6}
                />
              </div>
              <p className="text-xs text-muted-foreground">Mínimo 6 caracteres</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 animate-spin" size={18} />
                  Creando cuenta...
                </>
              ) : (
                'Registrarse'
              )}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              ¿Ya tienes cuenta?{' '}
              <button
                type="button"
                onClick={() => setPage('login')}
                className="text-primary hover:underline font-medium"
              >
                Inicia sesión
              </button>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
