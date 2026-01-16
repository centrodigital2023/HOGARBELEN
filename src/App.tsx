import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Toaster } from 'sonner';
import { AuthProvider, useAuth } from './contextos/SupabaseAuthContext';
import { AdminAuthProvider } from './contextos/AdminAuthContext';
import { AdminSetupInitializer } from './components/AdminSetupInitializer';
import { LoadingFallback } from './components/LoadingFallback';
import { usePrefetchRoutes } from './hooks/usePrefetch';
import Navegación from './componentes/Navegación';
import PieDePágina from './componentes/PieDePágina';
import PáginaPrincipal from './páginas/PáginaPrincipal';

// Lazy loading de componentes
const AboutPage = lazy(() => import('./páginas/AboutPage'));
const PáginaDePrecios = lazy(() => import('./páginas/PáginaDePrecios'));
const PáginaDeServicios = lazy(() => import('./páginas/PáginaDeServicios'));
const ContactPage = lazy(() => import('./páginas/ContactPage'));
const BelenConectaLogin = lazy(() => import('./páginas/BelenConectaLogin'));
const BelenConectaRegister = lazy(() => import('./páginas/BelenConectaRegister'));
const FamilyDashboard = lazy(() => import('./páginas/FamilyDashboard'));
const PanelDeControlProfesional = lazy(() => import('./páginas/PanelDeControlProfesional'));
const AICareAssistant = lazy(() => import('./páginas/AICareAssistant'));
const AdminPromoCodes = lazy(() => import('./páginas/AdminPromoCodes'));
const SuperAdminDashboard = lazy(() => import('./páginas/SuperAdminDashboard'));
const CentroVida = lazy(() => import('./páginas/CentroVida'));
const OfertasDeTrabajo = lazy(() => import('./páginas/OfertasDeTrabajo'));
const BelenConectaFamilias = lazy(() => import('./páginas/BelenConectaFamilias'));
const BelenConectaProfesionales = lazy(() => import('./páginas/BelenConectaProfesionales'));
const ProfesionalesServicios = lazy(() => import('./páginas/ProfesionalesServicios'));
const PlanesVidaActiva = lazy(() => import('./páginas/PlanesVidaActiva'));
const PlanAmigos = lazy(() => import('./páginas/PlanAmigos'));
const PlanSolYCafe = lazy(() => import('./páginas/PlanSolYCafe'));
const PlanSonreir = lazy(() => import('./páginas/PlanSonreir'));
const PlanTurismoRural = lazy(() => import('./páginas/PlanTurismoRural'));
const TerminosYCondiciones = lazy(() => import('./páginas/TerminosYCondiciones'));
const PoliticaPrivacidad = lazy(() => import('./páginas/PoliticaPrivacidad'));
const AdminLogin = lazy(() => import('./páginas/AdminLogin'));
const Admin2FA = lazy(() => import('./páginas/Admin2FA'));
const AdminDashboard = lazy(() => import('./páginas/AdminDashboard'));
const AdminProfessionals = lazy(() => import('./páginas/AdminProfessionals'));
const AdminLeads = lazy(() => import('./páginas/AdminLeads'));
const AdminJobOffers = lazy(() => import('./páginas/AdminJobOffers'));
const AdminContent = lazy(() => import('./páginas/AdminContent'));
const AdminAIClassifications = lazy(() => import('./páginas/AdminAIClassifications'));
const AdminAuditLog = lazy(() => import('./páginas/AdminAuditLog'));
const AdminConfiguration = lazy(() => import('./páginas/AdminConfiguration'));
const AdminAnalytics = lazy(() => import('./páginas/AdminAnalytics'));
const RegistroProfesionalInteligente = lazy(() => import('./pages/RegistroProfesionalInteligente'));
const TestDemoPage = lazy(() => import('./pages/TestDemoPage'));

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

  // Precargar rutas importantes basadas en prioridad
  usePrefetchRoutes([
    // Alta prioridad: páginas más visitadas
    { path: 'services', loader: () => import('./páginas/PáginaDeServicios'), priority: 'high' },
    { path: 'pricing', loader: () => import('./páginas/PáginaDePrecios'), priority: 'high' },
    { path: 'about', loader: () => import('./páginas/AboutPage'), priority: 'high' },
    { path: 'contact', loader: () => import('./páginas/ContactPage'), priority: 'high' },
    
    // Prioridad media: páginas de conversión
    { path: 'login', loader: () => import('./páginas/BelenConectaLogin'), priority: 'medium' },
    { path: 'register', loader: () => import('./páginas/BelenConectaRegister'), priority: 'medium' },
    { path: 'planes', loader: () => import('./páginas/PlanesVidaActiva'), priority: 'medium' },
    
    // Baja prioridad: resto de páginas
    { path: 'centro-vida', loader: () => import('./páginas/CentroVida'), priority: 'low' },
    { path: 'jobs', loader: () => import('./páginas/OfertasDeTrabajo'), priority: 'low' },
  ]);

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
      case 'home': 
        return <PáginaPrincipal setPage={setCurrentPage} />;
      case 'about': 
        return <Suspense fallback={<LoadingFallback />}><AboutPage /></Suspense>;
      case 'pricing': 
        return <Suspense fallback={<LoadingFallback />}><PáginaDePrecios setPage={setCurrentPage} /></Suspense>;
      case 'services': 
        return <Suspense fallback={<LoadingFallback />}><PáginaDeServicios /></Suspense>;
      case 'contact': 
        return <Suspense fallback={<LoadingFallback />}><ContactPage /></Suspense>;
      case 'centro-vida': 
        return <Suspense fallback={<LoadingFallback />}><CentroVida setPage={setCurrentPage} /></Suspense>;
      case 'jobs': 
        return <Suspense fallback={<LoadingFallback />}><OfertasDeTrabajo setPage={setCurrentPage} /></Suspense>;
      case 'profesionales-servicios': 
        return <Suspense fallback={<LoadingFallback />}><ProfesionalesServicios /></Suspense>;
      case 'belen-familias': 
        return <Suspense fallback={<LoadingFallback />}><BelenConectaFamilias setPage={setCurrentPage} /></Suspense>;
      case 'belen-profesionales': 
        return <Suspense fallback={<LoadingFallback />}><BelenConectaProfesionales setPage={setCurrentPage} /></Suspense>;
      case 'planes-vida-activa': 
        return <Suspense fallback={<LoadingFallback />}><PlanesVidaActiva setPage={setCurrentPage} /></Suspense>;
      case 'plan-amigos': 
        return <Suspense fallback={<LoadingFallback />}><PlanAmigos setPage={setCurrentPage} /></Suspense>;
      case 'plan-sol-cafe': 
        return <Suspense fallback={<LoadingFallback />}><PlanSolYCafe setPage={setCurrentPage} /></Suspense>;
      case 'plan-sonreir': 
        return <Suspense fallback={<LoadingFallback />}><PlanSonreir setPage={setCurrentPage} /></Suspense>;
      case 'plan-turismo-rural': 
        return <Suspense fallback={<LoadingFallback />}><PlanTurismoRural setPage={setCurrentPage} /></Suspense>;
      case 'login': 
        return <Suspense fallback={<LoadingFallback />}><BelenConectaLogin setPage={setCurrentPage} /></Suspense>;
      case 'register': 
        return <Suspense fallback={<LoadingFallback />}><BelenConectaRegister setPage={setCurrentPage} /></Suspense>;
      case 'registro-profesional-inteligente': 
        return <Suspense fallback={<LoadingFallback />}><RegistroProfesionalInteligente setPage={setCurrentPage} /></Suspense>;
      case 'dashboard-family': 
        return <Suspense fallback={<LoadingFallback />}><FamilyDashboard user={user} setPage={setCurrentPage} /></Suspense>;
      case 'dashboard-pro': 
        return <Suspense fallback={<LoadingFallback />}><PanelDeControlProfesional user={user} userData={userData} setPage={setCurrentPage} /></Suspense>;
      case 'ai-assistant': 
        return <Suspense fallback={<LoadingFallback />}><AICareAssistant setPage={setCurrentPage} /></Suspense>;
      case 'admin-promo-codes': 
        return <Suspense fallback={<LoadingFallback />}><AdminPromoCodes setPage={setCurrentPage} /></Suspense>;
      case 'admin-verificar-profesionales': 
        return <Suspense fallback={<LoadingFallback />}><AdminProfessionals setPage={setCurrentPage} /></Suspense>;
      case 'super-admin-dashboard': 
        return <Suspense fallback={<LoadingFallback />}><SuperAdminDashboard setPage={setCurrentPage} /></Suspense>;
      case 'terminos-condiciones': 
        return <Suspense fallback={<LoadingFallback />}><TerminosYCondiciones setPage={setCurrentPage} /></Suspense>;
      case 'politica-privacidad': 
        return <Suspense fallback={<LoadingFallback />}><PoliticaPrivacidad setPage={setCurrentPage} /></Suspense>;
      case 'admin-login': 
        return <Suspense fallback={<LoadingFallback />}><AdminLogin setPage={setCurrentPage} /></Suspense>;
      case 'admin-2fa': 
        return <Suspense fallback={<LoadingFallback />}><Admin2FA setPage={setCurrentPage} /></Suspense>;
      case 'admin-dashboard': 
        return <Suspense fallback={<LoadingFallback />}><AdminDashboard setPage={setCurrentPage} /></Suspense>;
      case 'admin-profesionales': 
        return <Suspense fallback={<LoadingFallback />}><AdminProfessionals setPage={setCurrentPage} /></Suspense>;
      case 'admin-leads': 
        return <Suspense fallback={<LoadingFallback />}><AdminLeads setPage={setCurrentPage} /></Suspense>;
      case 'admin-ofertas': 
        return <Suspense fallback={<LoadingFallback />}><AdminJobOffers setPage={setCurrentPage} /></Suspense>;
      case 'admin-contenido': 
        return <Suspense fallback={<LoadingFallback />}><AdminContent setPage={setCurrentPage} /></Suspense>;
      case 'admin-ia': 
        return <Suspense fallback={<LoadingFallback />}><AdminAIClassifications setPage={setCurrentPage} /></Suspense>;
      case 'admin-auditoria': 
        return <Suspense fallback={<LoadingFallback />}><AdminAuditLog setPage={setCurrentPage} /></Suspense>;
      case 'admin-configuracion': 
        return <Suspense fallback={<LoadingFallback />}><AdminConfiguration setPage={setCurrentPage} /></Suspense>;
      case 'admin-analytics': 
        return <Suspense fallback={<LoadingFallback />}><AdminAnalytics setPage={setCurrentPage} /></Suspense>;
      case 'test-inteligente': 
        return <Suspense fallback={<LoadingFallback />}><TestDemoPage setPage={setCurrentPage} /></Suspense>;
      default: 
        return <PáginaPrincipal setPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <AdminSetupInitializer />
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
    <AdminAuthProvider>
      <MainApp />
    </AdminAuthProvider>
  </AuthProvider>
);

export default BelenConectaApp;
