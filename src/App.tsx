import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider, useAuth } from './contextos/SupabaseAuthContext';
import { RouterWrapper } from './components/RouterWrapper';
import { routes } from './config/routes';
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

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'family' | 'professional';
  plan?: string;
  photoUrl?: string;
}

const AppContent = () => {
  const { user, userData, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      if (location.pathname === '/login' || location.pathname === '/registro') {
        navigate(userData?.role === 'professional' ? '/dashboard-profesional' : '/dashboard-familia');
      }
    }
  }, [user, userData, location.pathname, navigate]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-primary-600">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        <span className="ml-3 text-lg">Cargando Hogar Belén...</span>
      </div>
    );
  }

  // Helper function to navigate between pages
  const setPage = (pageKey: string) => {
    const route = routes.find(r => r.pageKey === pageKey);
    if (route) {
      navigate(route.path);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Navegación setPage={setPage} user={user} userData={userData} />
      <main className="fade-in-page">
        <Routes>
          {/* Home */}
          <Route path="/" element={<PáginaPrincipal setPage={setPage} />} />
          
          {/* About & Local SEO Pages */}
          <Route path="/quienes-somos-hogar-geriatrico-narino" element={<AboutPage />} />
          <Route path="/hogar-belen-buesaco-narino" element={<AboutPage />} />
          <Route path="/hogar-geriatrico-en-buesaco" element={<AboutPage />} />
          <Route path="/hogar-geriatrico-en-pasto" element={<AboutPage />} />
          <Route path="/hogar-geriatrico-narino-clima-templado" element={<AboutPage />} />
          
          {/* Contact */}
          <Route path="/contacto-hogar-geriatrico-buesaco" element={<ContactPage />} />
          
          {/* Residence & Services */}
          <Route path="/residencia-adulto-mayor-narino" element={<CentroVida setPage={setPage} />} />
          <Route path="/residencia-geriatrica-buesaco" element={<CentroVida setPage={setPage} />} />
          <Route path="/servicios-cuidado-adulto-mayor" element={<PáginaDeServicios />} />
          
          {/* Rooms */}
          <Route path="/residencia/habitacion-compartida-adulto-mayor" element={<CentroVida setPage={setPage} />} />
          <Route path="/residencia/habitacion-privada-adulto-mayor" element={<CentroVida setPage={setPage} />} />
          <Route path="/residencia/habitacion-suite-adulto-mayor" element={<CentroVida setPage={setPage} />} />
          <Route path="/residencia/habitacion-temporal-recuperacion" element={<CentroVida setPage={setPage} />} />
          
          {/* Services */}
          <Route path="/servicios/centro-dia-adulto-mayor-buesaco" element={<CentroVida setPage={setPage} />} />
          <Route path="/servicios/rehabilitacion-adulto-mayor-narino" element={<PáginaDeServicios />} />
          <Route path="/servicios/enfermeria-geriatrica-en-sede" element={<PáginaDeServicios />} />
          <Route path="/servicios/atencion-medica-basica-adulto-mayor" element={<PáginaDeServicios />} />
          
          {/* Home Services (High Conversion) */}
          <Route path="/servicios/cuidadores-adulto-mayor-a-domicilio" element={<ProfesionalesServicios />} />
          <Route path="/servicios/cuidadores-adulto-mayor-pasto" element={<ProfesionalesServicios />} />
          <Route path="/servicios/cuidadores-adulto-mayor-narino" element={<ProfesionalesServicios />} />
          <Route path="/servicios/enfermeria-geriatrica-domiciliaria" element={<ProfesionalesServicios />} />
          <Route path="/servicios/acompanamiento-adulto-mayor-en-casa" element={<ProfesionalesServicios />} />
          <Route path="/servicios/cuidado-adulto-mayor-24-horas" element={<ProfesionalesServicios />} />
          
          {/* Plans */}
          <Route path="/planes-adultos-mayores-narino" element={<PlanesVidaActiva setPage={setPage} />} />
          <Route path="/planes-recreativos-adulto-mayor" element={<PlanesVidaActiva setPage={setPage} />} />
          <Route path="/planes/dia-de-sol-adulto-mayor-amigos" element={<PlanAmigos setPage={setPage} />} />
          <Route path="/planes/turismo-cafetero-buesaco-adultos-mayores" element={<PlanSolYCafe setPage={setPage} />} />
          <Route path="/planes/celebracion-cumpleanos-adulto-mayor" element={<PlanSonreir setPage={setPage} />} />
          <Route path="/planes/ecoturismo-zooterapia-tercera-edad" element={<PlanTurismoRural setPage={setPage} />} />
          <Route path="/planes/estancia-temporal-adulto-mayor" element={<CentroVida setPage={setPage} />} />
          
          {/* Belén Conecta */}
          <Route path="/belen-conecta" element={<BelenConectaFamilias setPage={setPage} />} />
          <Route path="/belen-conecta-app" element={<BelenConectaFamilias setPage={setPage} />} />
          <Route path="/belen-conecta/contratar-cuidador-verificado" element={<BelenConectaFamilias setPage={setPage} />} />
          <Route path="/belen-conecta/cuidadores-verificados-narino" element={<BelenConectaFamilias setPage={setPage} />} />
          <Route path="/belen-conecta/enfermeras-verificadas-pasto" element={<BelenConectaProfesionales setPage={setPage} />} />
          
          {/* Employment */}
          <Route path="/belen-conecta/empleo-profesionales-salud-narino" element={<OfertasDeTrabajo setPage={setPage} />} />
          <Route path="/belen-conecta/empleo-cuidadores-adulto-mayor" element={<OfertasDeTrabajo setPage={setPage} />} />
          <Route path="/belen-conecta/ofertas-cuidado-adulto-mayor" element={<OfertasDeTrabajo setPage={setPage} />} />
          
          {/* Professionals */}
          <Route path="/profesionales-salud" element={<ProfesionalesServicios />} />
          <Route path="/profesionales-cuidado-adulto-mayor" element={<ProfesionalesServicios />} />
          
          {/* Job Offers */}
          <Route path="/empleo-cuidadores-adulto-mayor" element={<OfertasDeTrabajo setPage={setPage} />} />
          <Route path="/ofertas-salud-narino" element={<OfertasDeTrabajo setPage={setPage} />} />
          
          {/* Pricing */}
          <Route path="/precios-cuidado-adulto-mayor" element={<PáginaDePrecios setPage={setPage} />} />
          
          {/* Auth */}
          <Route path="/login" element={<BelenConectaLogin setPage={setPage} />} />
          <Route path="/registro" element={<BelenConectaRegister setPage={setPage} />} />
          
          {/* Dashboards */}
          <Route path="/dashboard-familia" element={<FamilyDashboard user={user} setPage={setPage} />} />
          <Route path="/dashboard-profesional" element={<PanelDeControlProfesional user={user} userData={userData} setPage={setPage} />} />
          
          {/* AI Assistant */}
          <Route path="/asistente-ia" element={<AICareAssistant setPage={setPage} />} />
          
          {/* Admin */}
          <Route path="/admin-promo-codes" element={<AdminPromoCodes setPage={setPage} />} />
          
          {/* Fallback to home */}
          <Route path="*" element={<PáginaPrincipal setPage={setPage} />} />
        </Routes>
      </main>
      <PieDePágina setPage={setPage} />
      <Toaster position="bottom-right" />
    </div>
  );
};

const MainApp = () => (
  <RouterWrapper>
    {() => <AppContent />}
  </RouterWrapper>
);

const BelenConectaApp = () => (
  <AuthProvider>
    <MainApp />
  </AuthProvider>
);

export default BelenConectaApp;
