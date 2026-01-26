import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'

// Lazy load pages from src/páginas/
const PáginaPrincipal = lazy(() => import('./páginas/PáginaPrincipal'))
const Nosotros = lazy(() => import('./páginas/Nosotros'))
const ContactPage = lazy(() => import('./páginas/ContactPage'))

// Inspirational pages
const LugarSonado = lazy(() => import('./páginas/inspiracional/LugarSonado'))
const PorQueHogarBelen = lazy(() => import('./páginas/inspiracional/PorQueHogarBelen'))
const ModoVacacionesPermanentes = lazy(() => import('./páginas/inspiracional/ModoVacacionesPermanentes'))
const LoQueNosHaceUnicos = lazy(() => import('./páginas/inspiracional/LoQueNosHaceUnicos'))
const Testimonios = lazy(() => import('./páginas/Testimonios'))

// Admin pages
const AdminLogin = lazy(() => import('./páginas/AdminLogin'))
const Admin2FA = lazy(() => import('./páginas/Admin2FA'))
const AdminDashboard = lazy(() => import('./páginas/AdminDashboard'))
const AdminProfessionals = lazy(() => import('./páginas/AdminProfessionals'))
const AdminLeads = lazy(() => import('./páginas/AdminLeads'))
const AdminJobOffers = lazy(() => import('./páginas/AdminJobOffers'))
const AdminAnalytics = lazy(() => import('./páginas/AdminAnalytics'))
const AdminConfiguration = lazy(() => import('./páginas/AdminConfiguration'))
const AdminContent = lazy(() => import('./páginas/AdminContent'))
const AdminAuditLog = lazy(() => import('./páginas/AdminAuditLog'))
const AdminAIClassifications = lazy(() => import('./páginas/AdminAIClassifications'))
const AdminPromoCodes = lazy(() => import('./páginas/AdminPromoCodes'))
const SuperAdminDashboard = lazy(() => import('./páginas/SuperAdminDashboard'))

// Family pages
const FamilyDashboard = lazy(() => import('./páginas/FamilyDashboard'))
const BelenConectaFamilias = lazy(() => import('./páginas/BelenConectaFamilias'))

// Belén Conecta pages
const BelenConectaHub = lazy(() => import('./páginas/belen-conecta/BelenConectaHub'))
const BelenConectaProfesionales = lazy(() => import('./páginas/BelenConectaProfesionales'))
const BelenConectaLogin = lazy(() => import('./páginas/BelenConectaLogin'))
const BelenConectaRegister = lazy(() => import('./páginas/BelenConectaRegister'))
const FamiliasBuscarProfesionales = lazy(() => import('./páginas/belen-conecta/FamiliasBuscarProfesionales'))
const FamiliasPublicarOferta = lazy(() => import('./páginas/belen-conecta/FamiliasPublicarOferta'))
const FamiliasComoFunciona = lazy(() => import('./páginas/belen-conecta/FamiliasComoFunciona'))
const ProfesionalesRegistro = lazy(() => import('./páginas/belen-conecta/ProfesionalesRegistro'))
const ProfesionalesOfertas = lazy(() => import('./páginas/belen-conecta/ProfesionalesOfertas'))
const ProfesionalesBeneficios = lazy(() => import('./páginas/belen-conecta/ProfesionalesBeneficios'))

// Professional pages
const ProfesionalesServicios = lazy(() => import('./páginas/ProfesionalesServicios'))
const PerfilProfesional = lazy(() => import('./páginas/PerfilProfesional'))
const PanelDeControlProfesional = lazy(() => import('./páginas/PanelDeControlProfesional'))
const OfertasDeTrabajo = lazy(() => import('./páginas/OfertasDeTrabajo'))
const Ofertas = lazy(() => import('./páginas/Ofertas'))
const TrabajaConNosotros = lazy(() => import('./páginas/TrabajaConNosotros'))

// Professional categories
const ProfesionalesEnfermeria = lazy(() => import('./páginas/profesionales-cat/Enfermeria'))
const ProfesionalesCuidadores = lazy(() => import('./páginas/profesionales-cat/Cuidadores'))
const ProfesionalesMedicos = lazy(() => import('./páginas/profesionales-cat/Medicos'))
const ProfesionalesTerapia = lazy(() => import('./páginas/profesionales-cat/Terapia'))
const ProfesionalesOtros = lazy(() => import('./páginas/profesionales-cat/Otros'))

// Centro Vida pages
const CentroVida = lazy(() => import('./páginas/CentroVida'))
const CentroVidaBuesaco = lazy(() => import('./páginas/centro-vida/CentroVidaBuesaco'))
const CentroVidaInstalaciones = lazy(() => import('./páginas/centro-vida/CentroVidaInstalaciones'))
const CentroVidaPlanes = lazy(() => import('./páginas/centro-vida/CentroVidaPlanes'))
const AgendaVisita = lazy(() => import('./páginas/centro-vida/AgendaVisita'))
const PlanCompartida = lazy(() => import('./páginas/centro-vida/PlanCompartida'))
const PlanIndividual = lazy(() => import('./páginas/centro-vida/PlanIndividual'))

// Services pages
const PáginaDeServicios = lazy(() => import('./páginas/PáginaDeServicios'))
const ServicioCuidadoEnCasa = lazy(() => import('./páginas/servicios/ServicioCuidadoEnCasa'))
const ServicioCuidadoResidencial = lazy(() => import('./páginas/servicios/ServicioCuidadoResidencial'))
const ServicioAtencionMedica = lazy(() => import('./páginas/servicios/ServicioAtencionMedica'))
const ServicioVidaActiva = lazy(() => import('./páginas/servicios/ServicioVidaActiva'))

// Vida Activa Plans
const PlanesVidaActiva = lazy(() => import('./páginas/PlanesVidaActiva'))
const PlanAmigos = lazy(() => import('./páginas/PlanAmigos'))
const PlanSolYCafe = lazy(() => import('./páginas/PlanSolYCafe'))
const PlanSonreir = lazy(() => import('./páginas/PlanSonreir'))
const PlanTurismoRural = lazy(() => import('./páginas/PlanTurismoRural'))
const PlanAmigosGaleria = lazy(() => import('./páginas/PlanAmigosGaleria'))
const PlanSolYCafeGaleria = lazy(() => import('./páginas/PlanSolYCafeGaleria'))

// Other pages
const PáginaDePrecios = lazy(() => import('./páginas/PáginaDePrecios'))
const ResultadosDeBúsqueda = lazy(() => import('./páginas/ResultadosDeBúsqueda'))
const PoliticaPrivacidad = lazy(() => import('./páginas/PoliticaPrivacidad'))
const TerminosYCondiciones = lazy(() => import('./páginas/TerminosYCondiciones'))
const PoliticaDeCookies = lazy(() => import('./páginas/PoliticaDeCookies'))
const TratamientoDeDatos = lazy(() => import('./páginas/TratamientoDeDatos'))
const AICareAssistant = lazy(() => import('./páginas/AICareAssistant'))

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
)

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Home */}
          <Route path="/" element={<PáginaPrincipal />} />
          
          {/* Main navigation */}
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/servicios" element={<PáginaDeServicios />} />
          <Route path="/planes" element={<PáginaDePrecios />} />
          
          {/* Inspirational/Home sections */}
          <Route path="/lugar-sonado" element={<LugarSonado />} />
          <Route path="/por-que-hogar-belen" element={<PorQueHogarBelen />} />
          <Route path="/modo-vacaciones-permanentes" element={<ModoVacacionesPermanentes />} />
          <Route path="/lo-que-nos-hace-unicos" element={<LoQueNosHaceUnicos />} />
          <Route path="/testimonios" element={<Testimonios />} />
          
          {/* Centro Vida */}
          <Route path="/centro-vida" element={<CentroVida />} />
          <Route path="/centro-vida/buesaco" element={<CentroVidaBuesaco />} />
          <Route path="/centro-vida/instalaciones" element={<CentroVidaInstalaciones />} />
          <Route path="/centro-vida/planes" element={<CentroVidaPlanes />} />
          <Route path="/centro-vida/agenda-visita" element={<AgendaVisita />} />
          <Route path="/centro-vida/planes/compartida" element={<PlanCompartida />} />
          <Route path="/centro-vida/planes/individual" element={<PlanIndividual />} />
          
          {/* Services */}
          <Route path="/servicios/cuidado-en-casa" element={<ServicioCuidadoEnCasa />} />
          <Route path="/servicios/cuidado-residencial" element={<ServicioCuidadoResidencial />} />
          <Route path="/servicios/atencion-medica" element={<ServicioAtencionMedica />} />
          <Route path="/servicios/vida-activa" element={<ServicioVidaActiva />} />
          
          {/* Planes Vida Activa */}
          <Route path="/planes-vida-activa" element={<PlanesVidaActiva />} />
          <Route path="/planes-vida-activa/plan-amigos" element={<PlanAmigos />} />
          <Route path="/planes-vida-activa/plan-sol-y-cafe" element={<PlanSolYCafe />} />
          <Route path="/planes-vida-activa/plan-sonreir" element={<PlanSonreir />} />
          <Route path="/planes-vida-activa/plan-turismo-rural" element={<PlanTurismoRural />} />
          <Route path="/planes-vida-activa/plan-amigos/galeria" element={<PlanAmigosGaleria />} />
          <Route path="/planes-vida-activa/plan-sol-y-cafe/galeria" element={<PlanSolYCafeGaleria />} />
          
          {/* Belén Conecta */}
          <Route path="/belen-conecta" element={<BelenConectaHub />} />
          <Route path="/belen-conecta/familias" element={<BelenConectaFamilias />} />
          <Route path="/belen-conecta/familias/buscar-profesionales" element={<FamiliasBuscarProfesionales />} />
          <Route path="/belen-conecta/familias/publicar-oferta" element={<FamiliasPublicarOferta />} />
          <Route path="/belen-conecta/familias/como-funciona" element={<FamiliasComoFunciona />} />
          <Route path="/belen-conecta/profesionales" element={<BelenConectaProfesionales />} />
          <Route path="/belen-conecta/profesionales/registro" element={<ProfesionalesRegistro />} />
          <Route path="/belen-conecta/profesionales/ofertas" element={<ProfesionalesOfertas />} />
          <Route path="/belen-conecta/profesionales/beneficios" element={<ProfesionalesBeneficios />} />
          
          {/* Auth - SEO-friendly URLs */}
          <Route path="/ingresar" element={<BelenConectaLogin />} />
          <Route path="/registrarse" element={<BelenConectaRegister />} />
          
          {/* Professionals */}
          <Route path="/profesionales" element={<ProfesionalesServicios />} />
          <Route path="/profesionales/enfermeria" element={<ProfesionalesEnfermeria />} />
          <Route path="/profesionales/cuidadores" element={<ProfesionalesCuidadores />} />
          <Route path="/profesionales/medicos" element={<ProfesionalesMedicos />} />
          <Route path="/profesionales/terapia" element={<ProfesionalesTerapia />} />
          <Route path="/profesionales/otros" element={<ProfesionalesOtros />} />
          <Route path="/profesional/perfil" element={<PerfilProfesional />} />
          <Route path="/profesional/panel" element={<PanelDeControlProfesional />} />
          
          {/* Job offers */}
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/trabaja-con-nosotros" element={<TrabajaConNosotros />} />
          
          {/* Legal pages */}
          <Route path="/terminos-y-condiciones" element={<TerminosYCondiciones />} />
          <Route path="/politica-de-privacidad" element={<PoliticaPrivacidad />} />
          <Route path="/politica-de-cookies" element={<PoliticaDeCookies />} />
          <Route path="/tratamiento-de-datos" element={<TratamientoDeDatos />} />
          
          {/* Admin routes (no indexar) */}
          <Route path="/admin" element={<Navigate to="/admin/login" />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/2fa" element={<Admin2FA />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/profesionales" element={<AdminProfessionals />} />
          <Route path="/admin/leads" element={<AdminLeads />} />
          <Route path="/admin/ofertas" element={<AdminJobOffers />} />
          <Route path="/admin/verificaciones" element={<AdminProfessionals />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/admin/configuracion" element={<AdminConfiguration />} />
          <Route path="/admin/contenido" element={<AdminContent />} />
          <Route path="/admin/auditoria" element={<AdminAuditLog />} />
          <Route path="/admin/ai-clasificaciones" element={<AdminAIClassifications />} />
          <Route path="/admin/codigos-promo" element={<AdminPromoCodes />} />
          <Route path="/superadmin" element={<SuperAdminDashboard />} />
          
          {/* Family dashboard */}
          <Route path="/familia/dashboard" element={<FamilyDashboard />} />
          
          {/* Backward compatibility redirects */}
          <Route path="/about" element={<Navigate to="/nosotros" replace />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/precios" element={<Navigate to="/planes" replace />} />
          <Route path="/privacidad" element={<Navigate to="/politica-de-privacidad" replace />} />
          <Route path="/terminos" element={<Navigate to="/terminos-y-condiciones" replace />} />
          <Route path="/belen-conecta/login" element={<Navigate to="/ingresar" replace />} />
          <Route path="/belen-conecta/register" element={<Navigate to="/registrarse" replace />} />
          <Route path="/plan-amigos" element={<Navigate to="/planes-vida-activa/plan-amigos" replace />} />
          <Route path="/plan-sol-cafe" element={<Navigate to="/planes-vida-activa/plan-sol-y-cafe" replace />} />
          <Route path="/plan-sonreir" element={<Navigate to="/planes-vida-activa/plan-sonreir" replace />} />
          <Route path="/plan-turismo-rural" element={<Navigate to="/planes-vida-activa/plan-turismo-rural" replace />} />
          <Route path="/ofertas-trabajo" element={<Navigate to="/ofertas" replace />} />
          <Route path="/busqueda" element={<ResultadosDeBúsqueda />} />
          
          {/* AI Assistant */}
          <Route path="/ai-assistant" element={<AICareAssistant />} />

          {/* 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
