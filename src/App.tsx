import { useState, useEffect, lazy, Suspense } from 'react';
import { useKV } from '@github/spark/hooks';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import LoadingFallback from './components/LoadingFallback';
import SEOHead from './components/SEOHead';
import AdminSetupInitializer from './components/AdminSetupInitializer';
import { Toaster } from 'sonner';
import { AuthProvider } from './contextos/SupabaseAuthContext';

const HomePage = lazy(() => import('./pages/HomePage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const ServicioCuidadoResidencial = lazy(() => import('./pages/ServicioCuidadoResidencial'));
const ServicioDulceHogar = lazy(() => import('./pages/ServicioDulceHogar'));
const ServicioBelenConecta = lazy(() => import('./pages/ServicioBelenConecta'));
const RegistroProfesionalInteligente = lazy(() => import('./pages/RegistroProfesionalInteligente'));
const FamilyDashboard = lazy(() => import('./pages/FamilyDashboard'));
const SuperAdminDashboard = lazy(() => import('./pages/SuperAdminDashboard'));
const AICareAssistant = lazy(() => import('./pages/AICareAssistant'));

function App() {
  const [currentPage, setCurrentPage] = useKV('current-page', 'home');
  const [isAuthenticated, setIsAuthenticated] = useKV('is-authenticated', false);
  const [userRole, setUserRole] = useKV('user-role', '');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useKV('admin-authenticated', false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('');
    setIsAdminAuthenticated(false);
    setCurrentPage('home');
  };

  const renderPage = () => {
    if (currentPage === 'admin' && isAdminAuthenticated) {
      return <SuperAdminDashboard setPage={setCurrentPage} />;
    }

    if (currentPage === 'family-dashboard' && isAuthenticated && userRole === 'family') {
      return <FamilyDashboard setPage={setCurrentPage} />;
    }

    switch (currentPage) {
      case 'home':
        return <HomePage setPage={setCurrentPage} />;
      case 'services':
        return <ServicesPage setPage={setCurrentPage} />;
      case 'pricing':
        return <PricingPage setPage={setCurrentPage} />;
      case 'about':
        return <AboutPage setPage={setCurrentPage} />;
      case 'contact':
        return <ContactPage setPage={setCurrentPage} />;
      case 'login':
        return <LoginPage setPage={setCurrentPage} setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />;
      case 'register':
        return <RegisterPage setPage={setCurrentPage} setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />;
      case 'servicio-cuidado-residencial':
        return <ServicioCuidadoResidencial setPage={setCurrentPage} />;
      case 'servicio-dulce-hogar':
        return <ServicioDulceHogar setPage={setCurrentPage} />;
      case 'servicio-belen-conecta':
        return <ServicioBelenConecta setPage={setCurrentPage} />;
      case 'registro-profesional':
        return <RegistroProfesionalInteligente setPage={setCurrentPage} />;
      case 'ai-assistant':
        return <AICareAssistant setPage={setCurrentPage} />;
      case 'admin-login':
        return (
          <LoginPage 
            setPage={setCurrentPage} 
            setIsAuthenticated={setIsAdminAuthenticated} 
            setUserRole={setUserRole}
            isAdminLogin={true}
          />
        );
      default:
        return <HomePage setPage={setCurrentPage} />;
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <AdminSetupInitializer />
        <SEOHead page={currentPage} />
        <Toaster position="top-right" expand={true} richColors />
        
        <Navigation 
          setPage={setCurrentPage}
          currentPage={currentPage}
          isAuthenticated={isAuthenticated}
          userRole={userRole}
          onLogout={handleLogout}
          isAdminAuthenticated={isAdminAuthenticated}
        />
        
        <main className="flex-1">
          <Suspense fallback={<LoadingFallback />}>
            {renderPage()}
          </Suspense>
        </main>
        
        <Footer setPage={setCurrentPage} />
      </div>
    </AuthProvider>
  );
}

export default App;
