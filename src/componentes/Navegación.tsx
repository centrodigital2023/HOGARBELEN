import { useState } from 'react';
import { Heart, Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from '../contextos/SupabaseAuthContext';
import { toast } from 'sonner';
import Button from './ui/botón';
import Avatar from './ui/avatar';

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
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setPage('home')}
          >
            <Heart className="text-primary-600 fill-primary-600 group-hover:scale-110 transition-transform" size={24} />
            <span className="text-xl font-bold tracking-tight text-gray-800">
              Hogar<span className="text-primary-600"> Belén</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => setPage('home')} className={navLinkClass}>
              Inicio
            </button>
            <button onClick={() => setPage('about')} className={navLinkClass}>
              Nosotros
            </button>
            <button onClick={() => setPage('services')} className={navLinkClass}>
              Servicios
            </button>
            <button onClick={() => setPage('pricing')} className={navLinkClass}>
              Planes
            </button>
            <button onClick={() => setPage('contact')} className={navLinkClass}>
              Contacto
            </button>
            
            {user ? (
              <div className="flex items-center gap-4 border-l pl-4 ml-4">
                <div 
                  className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors"
                  onClick={() => setPage(userData?.role === 'professional' ? 'dashboard-pro' : 'dashboard-family')}
                >
                  <Avatar src={userData?.photoUrl} size="sm" />
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
          <div className="md:hidden bg-white border-t py-4 space-y-3 animate-fade-in">
            <button 
              onClick={() => { setPage('home'); setMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Inicio
            </button>
            <button 
              onClick={() => { setPage('services'); setMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Servicios
            </button>
            <button 
              onClick={() => { setPage('pricing'); setMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Planes
            </button>
            
            {!user ? (
              <div className="px-4 pt-2 space-y-2">
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
              <div className="px-4 pt-2 space-y-2 border-t">
                <button 
                  onClick={() => { 
                    setPage(userData?.role === 'professional' ? 'dashboard-pro' : 'dashboard-family'); 
                    setMenuOpen(false); 
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
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
