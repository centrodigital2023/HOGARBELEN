import { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { AuthProvider, useAuth } from './contextos/SupabaseAuthContext';
import Navegación from './componentes/Navegación';
import PieDePágina from './componentes/PieDePágina';
import FixedMobileButtons from './components/FixedMobileButtons';
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
import AdminPromoCodes from './páginas/AdminPromoCodes';
import CentroVida from './páginas/CentroVida';
import OfertasDeTrabajo from './páginas/OfertasDeTrabajo';
import BelenConectaFamilias from './páginas/BelenConectaFamilias';
import BelenConectaProfesionales from './páginas/BelenConectaProfesionales';
import ProfesionalesServicios from './páginas/ProfesionalesServicios';
import PlanesVidaActiva from './páginas/PlanesVidaActiva';
import PlanAmigos from './páginas/PlanAmigos';
import PlanSolYCafe from './páginas/PlanSolYCafe';
import PlanSonreir from './páginas/PlanSonreir';
import PlanTurismoRural from './páginas/PlanTurismoRural';
import TerminosCondiciones from './páginas/TerminosCondiciones';
import PoliticaPrivacidad from './páginas/PoliticaPrivacidad';
import AdminProfessionals from './páginas/AdminProfessionals';

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
      case 'centro-vida': return <CentroVida setPage={setCurrentPage} />;
      case 'jobs': return <OfertasDeTrabajo setPage={setCurrentPage} />;
      case 'profesionales-servicios': return <ProfesionalesServicios />;
      case 'belen-familias': return <BelenConectaFamilias setPage={setCurrentPage} />;
      case 'belen-profesionales': return <BelenConectaProfesionales setPage={setCurrentPage} />;
      case 'planes-vida-activa': return <PlanesVidaActiva setPage={setCurrentPage} />;
      case 'plan-amigos': return <PlanAmigos setPage={setCurrentPage} />;
      case 'plan-sol-cafe': return <PlanSolYCafe setPage={setCurrentPage} />;
      case 'plan-sonreir': return <PlanSonreir setPage={setCurrentPage} />;
      case 'plan-turismo-rural': return <PlanTurismoRural setPage={setCurrentPage} />;
      case 'terminos-condiciones': return <TerminosCondiciones setPage={setCurrentPage} />;
      case 'politica-privacidad': return <PoliticaPrivacidad setPage={setCurrentPage} />;
      case 'login': return <BelenConectaLogin setPage={setCurrentPage} />;
      case 'register': return <BelenConectaRegister setPage={setCurrentPage} />;
      case 'dashboard-family': return <FamilyDashboard user={user} setPage={setCurrentPage} />;
      case 'dashboard-pro': return <PanelDeControlProfesional user={user} userData={userData} setPage={setCurrentPage} />;
      case 'ai-assistant': return <AICareAssistant setPage={setCurrentPage} />;
      case 'admin-promo-codes': return <AdminPromoCodes setPage={setCurrentPage} />;
      case 'admin-professionals': return <AdminProfessionals setPage={setCurrentPage} />;
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
      <FixedMobileButtons />
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
