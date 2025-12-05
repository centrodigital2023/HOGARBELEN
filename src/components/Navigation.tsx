import { useState } from 'react';
import { Heart, Menu, X, LogOut } from 'lucide-react';
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

  const handleLogout = () => {
    setUser(null);
    setPage('home');
    toast.success('Sesión cerrada correctamente');
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { id: 'home', label: 'Inicio' },
    { id: 'about', label: 'Nosotros' },
    { id: 'services', label: 'Servicios' },
    { id: 'pricing', label: 'Planes' },
    { id: 'contact', label: 'Contacto' },
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
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setPage(link.id)}
                className={`text-sm font-medium transition-colors ${
                  currentPage === link.id
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {link.label}
              </button>
            ))}

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
          <div className="md:hidden bg-white border-t py-4 space-y-3 animate-in slide-in-from-top">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setPage(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  currentPage === link.id
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-primary hover:bg-muted'
                }`}
              >
                {link.label}
              </button>
            ))}

            {!user ? (
              <div className="px-4 pt-2 space-y-2">
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
