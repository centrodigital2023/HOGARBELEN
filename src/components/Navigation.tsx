import { useState } from 'react';
import { Heart, Menu, X, LogOut, ChevronDown, Home, Users, Briefcase, Building, UserPlus } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { toast } from 'sonner';
import type { User } from '../App';

interface NavigationProps {
  setPage: (page: string) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  currentPage: string;
}

export default function Navigation({ setPage, user, setUser, currentPage }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [serviciosDropdownOpen, setServiciosDropdownOpen] = useState(false);
  const [belenConectaDropdownOpen, setBelenConectaDropdownOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    setPage('home');
    toast.success('Sesión cerrada correctamente');
    setMobileMenuOpen(false);
  };

  const serviciosMenu = [
    { id: 'centro-vida', label: 'Centro Vida', icon: Home },
    { id: 'professionals', label: 'Profesionales', icon: Users },
    { id: 'jobs', label: 'Ofertas de Trabajo', icon: Briefcase },
  ];

  const belenConectaMenu = [
    { id: 'family-platform', label: 'Para Familias', icon: Heart },
    { id: 'professional-platform', label: 'Para Profesionales', icon: UserPlus },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => setPage('home')}
            className="flex items-center gap-2 group transition-all hover:opacity-80"
          >
            <Heart className="text-primary fill-primary group-hover:scale-110 transition-transform" size={28} />
            <span className="text-2xl font-bold tracking-tight">
              <span className="text-foreground">Hogar</span>
              <span className="text-primary"> Belén</span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setPage('home')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'home'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              Inicio
            </button>

            <button
              onClick={() => setPage('about')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'about'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              Nosotros
            </button>

            {/* Servicios Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setServiciosDropdownOpen(true)}
              onMouseLeave={() => setServiciosDropdownOpen(false)}
            >
              <button
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
              >
                Servicios
                <ChevronDown size={16} className={`transition-transform ${serviciosDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {serviciosDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-border py-2 animate-in fade-in slide-in-from-top-2">
                  {serviciosMenu.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setPage(item.id);
                        setServiciosDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-muted transition-colors flex items-center gap-3"
                    >
                      <item.icon size={18} className="text-primary" />
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setPage('pricing')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'pricing'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              Planes
            </button>

            {/* Belén Conecta Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setBelenConectaDropdownOpen(true)}
              onMouseLeave={() => setBelenConectaDropdownOpen(false)}
            >
              <button
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
              >
                Belén Conecta
                <ChevronDown size={16} className={`transition-transform ${belenConectaDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {belenConectaDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-border py-2 animate-in fade-in slide-in-from-top-2">
                  {belenConectaMenu.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setPage(item.id);
                        setBelenConectaDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-muted transition-colors flex items-center gap-3"
                    >
                      <item.icon size={18} className="text-primary" />
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {user ? (
              <div className="flex items-center gap-4 border-l pl-4 ml-4">
                <button
                  onClick={() => setPage('dashboard')}
                  className="flex items-center gap-3 hover:bg-muted rounded-lg p-2 transition-colors"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoUrl} />
                    <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <p className="font-semibold text-sm text-foreground">
                      {user.fullName}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {user.role === 'professional' ? 'Profesional' : 'Familia'}
                    </p>
                  </div>
                </button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-muted-foreground hover:text-destructive"
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
                <Button onClick={() => setPage('register')}>
                  Registrarse
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-foreground hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t py-4 space-y-2 animate-in slide-in-from-top">
            <button
              onClick={() => {
                setPage('home');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
            >
              Inicio
            </button>
            <button
              onClick={() => {
                setPage('about');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
            >
              Nosotros
            </button>

            {/* Mobile Servicios Section */}
            <div className="px-4 py-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Servicios</p>
              {serviciosMenu.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setPage(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setPage('pricing');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
            >
              Planes
            </button>

            {/* Mobile Belén Conecta Section */}
            <div className="px-4 py-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Belén Conecta</p>
              {belenConectaMenu.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setPage(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              ))}
            </div>

            {!user ? (
              <div className="px-4 pt-2 space-y-2 border-t">
                <Button
                  onClick={() => {
                    setPage('login');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full"
                >
                  Ingresar
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setPage('register');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full"
                >
                  Registrarse
                </Button>
              </div>
            ) : (
              <div className="px-4 pt-2 space-y-2 border-t">
                <button
                  onClick={() => {
                    setPage('dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                >
                  Mi Panel
                </button>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="w-full text-destructive border-destructive/30 hover:bg-destructive/10"
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
}
