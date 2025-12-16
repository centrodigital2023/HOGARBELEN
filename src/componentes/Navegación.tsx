import { useState } from 'react';
import { Heart, Menu, X, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../contextos/SupabaseAuthContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import logoImg from '@/assets/images/logo-hogar-belen.png';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavegaciónProps {
  setPage: (page: string) => void;
  user: any;
  userData: any;
}

const Navegación = ({ setPage, user, userData }: NavegaciónProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      setPage('home');
      toast.success('Sesión cerrada correctamente');
    } catch (error) {
      toast.error('Error al cerrar sesión');
    }
  };

  const navLinkClass = "text-gray-600 hover:text-primary-600 font-medium cursor-pointer transition-colors";

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setPage('home')}
          >
            <img src={logoImg} alt="Hogar Belén Logo" className="h-10 w-10 object-contain group-hover:scale-110 transition-transform" />
            <span className="text-xl font-bold tracking-tight text-gray-800">
              Hogar<span className="text-primary-600"> Belén</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => setPage('home')} className={navLinkClass}>
              Inicio
            </button>
            <button onClick={() => setPage('about')} className={navLinkClass}>
              Nosotros
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-gray-600 hover:text-primary-600 font-medium cursor-pointer transition-colors outline-none">
                Servicios
                <ChevronDown size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem onClick={() => setPage('centro-vida')} className="cursor-pointer py-3">
                  <span className="font-medium">Centro Vida</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPage('profesionales-servicios')} className="cursor-pointer py-3">
                  <span className="font-medium">Profesionales</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPage('jobs')} className="cursor-pointer py-3">
                  <span className="font-medium">Ofertas de Trabajo</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button onClick={() => setPage('pricing')} className={navLinkClass}>
              Planes
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-gray-600 hover:text-primary-600 font-medium cursor-pointer transition-colors outline-none">
                Belén Conecta
                <ChevronDown size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem onClick={() => setPage('belen-familias')} className="cursor-pointer py-3">
                  <span className="font-medium">Para Familias</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPage('belen-profesionales')} className="cursor-pointer py-3">
                  <span className="font-medium">Para Profesionales</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {user ? (
              <div className="flex items-center gap-3 border-l pl-6 ml-2">
                <div 
                  className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors"
                  onClick={() => setPage(userData?.role === 'professional' ? 'dashboard-pro' : 'dashboard-family')}
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={userData?.photoUrl} />
                    <AvatarFallback className="bg-primary-100 text-primary-600">
                      {userData?.fullName?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-right">
                    <p className="font-semibold text-sm text-gray-900">
                      {userData?.fullName || 'Usuario'}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {userData?.role === 'professional' ? 'Profesional' : 'Familia'}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-gray-500 hover:text-red-600"
                >
                  <LogOut size={16} />
                </Button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setPage('login')}
                >
                  Ingresar
                </Button>
                <Button 
                  onClick={() => setPage('register')}
                >
                  Registrarse
                </Button>
              </div>
            )}
          </div>

          <button 
            className="md:hidden text-gray-600 hover:text-gray-900 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t py-4 space-y-2 animate-fade-in">
            <button 
              onClick={() => { setPage('home'); setMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors font-medium"
            >
              Inicio
            </button>
            <button 
              onClick={() => { setPage('about'); setMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors font-medium"
            >
              Nosotros
            </button>

            <div className="px-4 py-2">
              <p className="text-sm font-semibold text-gray-400 mb-2">SERVICIOS</p>
              <div className="space-y-1 pl-2">
                <button 
                  onClick={() => { setPage('centro-vida'); setMenuOpen(false); }}
                  className="block w-full text-left px-3 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Centro Vida
                </button>
                <button 
                  onClick={() => { setPage('services'); setMenuOpen(false); }}
                  className="block w-full text-left px-3 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Profesionales
                </button>
                <button 
                  onClick={() => { setPage('jobs'); setMenuOpen(false); }}
                  className="block w-full text-left px-3 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Ofertas de Trabajo
                </button>
              </div>
            </div>

            <button 
              onClick={() => { setPage('pricing'); setMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors font-medium"
            >
              Planes
            </button>

            <div className="px-4 py-2">
              <p className="text-sm font-semibold text-gray-400 mb-2">BELÉN CONECTA</p>
              <div className="space-y-1 pl-2">
                <button 
                  onClick={() => { setPage('belen-familias'); setMenuOpen(false); }}
                  className="block w-full text-left px-3 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Para Familias
                </button>
                <button 
                  onClick={() => { setPage('belen-profesionales'); setMenuOpen(false); }}
                  className="block w-full text-left px-3 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Para Profesionales
                </button>
              </div>
            </div>
            
            {!user ? (
              <div className="px-4 pt-4 space-y-2 border-t mt-4">
                <Button 
                  onClick={() => { setPage('login'); setMenuOpen(false); }}
                  className="w-full"
                >
                  Ingresar
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => { setPage('register'); setMenuOpen(false); }}
                  className="w-full"
                >
                  Registrarse
                </Button>
              </div>
            ) : (
              <div className="px-4 pt-4 space-y-2 border-t mt-4">
                <button 
                  onClick={() => { 
                    setPage(userData?.role === 'professional' ? 'dashboard-pro' : 'dashboard-family'); 
                    setMenuOpen(false); 
                  }}
                  className="block w-full text-left px-4 py-3 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                >
                  Mi Panel
                </button>
                <Button 
                  variant="outline"
                  onClick={handleLogout}
                  className="w-full text-red-600 border-red-200 hover:bg-red-50"
                >
                  Cerrar Sesión
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navegación;
