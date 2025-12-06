import { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { AuthProvider, useAuth } from './contextos/SupabaseAuthContext';
import Navegación from './componentes/Navegación';
import PieDePágina from './componentes/PieDePágina';
import PáginaPrincipal from './páginas/PáginaPrincipal';
import AboutPage from './páginas/AboutPage';
import PáginaDePrecios from './páginas/PáginaDePrecios';
import PáginaDeServicios from './páginas/PáginaDeServicios';
import ContactPage from './páginas/ContactPage';
import BelenConectaLogin from './páginas/BelenConectaLogin';
import BelenConectaRegister from './páginas/BelenConectaRegister';
import FamilyDashboard from './páginas/FamilyDashboard';
import PanelDeControlProfesional from './páginas/PanelDeControlProfesional';
import AICareAssistant from './páginas/AICareAssistant';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'family' | 'professional';
  plan?: string;
  photoUrl?: string;
}

const MainApp = () => {
  const { user, userData, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    if (user) {
      if (currentPage === 'login' || currentPage === 'register') {
        setCurrentPage(userData?.role === 'professional' ? 'dashboard-pro' : 'dashboard-family');
      }
    }
  }, [user, userData, currentPage]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-primary-600">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        <span className="ml-3 text-lg">Cargando Hogar Belén...</span>
      </div>
    );
  }

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <PáginaPrincipal setPage={setCurrentPage} />;
      case 'about': return <AboutPage />;
      case 'pricing': return <PáginaDePrecios setPage={setCurrentPage} />;
      case 'services': return <PáginaDeServicios />;
      case 'contact': return <ContactPage />;
      case 'login': return <BelenConectaLogin setPage={setCurrentPage} />;
      case 'register': return <BelenConectaRegister setPage={setCurrentPage} />;
      case 'dashboard-family': return <FamilyDashboard user={user} setPage={setCurrentPage} />;
      case 'dashboard-pro': return <PanelDeControlProfesional user={user} userData={userData} />;
      case 'ai-assistant': return <AICareAssistant setPage={setCurrentPage} />;
      default: return <PáginaPrincipal setPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Navegación setPage={setCurrentPage} user={user} userData={userData} />
      <main className="fade-in-page">
        {renderPage()}
      </main>
      <PieDePágina setPage={setCurrentPage} />
      <Toaster position="bottom-right" />
    </div>
  );
};

const BelenConectaApp = () => (
  <AuthProvider>
    <MainApp />
  </AuthProvider>
);

export default BelenConectaApp;
