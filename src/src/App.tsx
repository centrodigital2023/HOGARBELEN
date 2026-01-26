import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'

// Main pages
const PáginaPrincipal = lazy(() => import('./páginas/PáginaPrincipal'))
const Nosotros = lazy(() => import('./páginas/Nosotros'))
const ContactPage = lazy(() => import('./páginas/ContactPage'))
const PáginaDeServicios = lazy(() => import('./páginas/PáginaDeServicios'))
const Planes = lazy(() => import('./páginas/Planes'))
const BelenConecta = lazy(() => import('./páginas/BelenConecta'))
const Ingresar = lazy(() => import('./páginas/Ingresar'))
const Registrarse = lazy(() => import('./páginas/Registrarse'))
const LugarSonado = lazy(() => import('./páginas/LugarSonado'))
const PorQueHogarBelen = lazy(() => import('./páginas/PorQueHogarBelen'))
const ModoVacacionesPermanentes = lazy(() => import('./páginas/ModoVacacionesPermanentes'))
const LoQueNosHaceUnicos = lazy(() => import('./páginas/LoQueNosHaceUnicos'))
const Testimonios = lazy(() => import('./páginas/Testimonios'))

// Centro Vida pages
const CentroVida = lazy(() => import('./páginas/CentroVida'))
const CentroVidaBuesaco = lazy(() => import('./páginas/CentroVidaBuesaco'))
const CentroVidaInstalaciones = lazy(() => import('./páginas/CentroVidaInstalaciones'))
const CentroVidaPlanes = lazy(() => import('./páginas/CentroVidaPlanes'))
const CentroVidaAgendaVisita = lazy(() => import('./páginas/CentroVidaAgendaVisita'))
const CentroVidaPlanesCompartida = lazy(() => import('./páginas/CentroVidaPlanesCompartida'))
const CentroVidaPlanesIndividual = lazy(() => import('./páginas/CentroVidaPlanesIndividual'))

// Services pages
const ServicioCuidadoEnCasa = lazy(() => import('./páginas/ServicioCuidadoEnCasa'))
const ServicioCuidadoResidencial = lazy(() => import('./páginas/ServicioCuidadoResidencial'))
const ServicioAtencionMedica = lazy(() => import('./páginas/ServicioAtencionMedica'))
const ServicioVidaActiva = lazy(() => import('./páginas/ServicioVidaActiva'))

// Planes Vida Activa
const PlanesVidaActiva = lazy(() => import('./páginas/PlanesVidaActiva'))
const PlanAmigos = lazy(() => import('./páginas/PlanAmigos'))
const PlanSolYCafe = lazy(() => import('./páginas/PlanSolYCafe'))
const PlanSonreir = lazy(() => import('./páginas/PlanSonreir'))
const PlanTurismoRural = lazy(() => import('./páginas/PlanTurismoRural'))
const PlanAmigosGaleria = lazy(() => import('./páginas/PlanAmigosGaleria'))
const PlanSolYCafeGaleria = lazy(() => import('./páginas/PlanSolYCafeGaleria'))

// Belén Conecta - Families
const BelenConectaFamilias = lazy(() => import('./páginas/BelenConectaFamilias'))
const FamiliasBuscarProfesionales = lazy(() => import('./páginas/FamiliasBuscarProfesionales'))
const FamiliasPublicarOferta = lazy(() => import('./páginas/FamiliasPublicarOferta'))
const FamiliasComoFunciona = lazy(() => import('./páginas/FamiliasComoFunciona'))

// Belén Conecta - Professionals
const BelenConectaProfesionales = lazy(() => import('./páginas/BelenConectaProfesionales'))
const ProfesionalesRegistro = lazy(() => import('./páginas/ProfesionalesRegistro'))
const ProfesionalesOfertas = lazy(() => import('./páginas/ProfesionalesOfertas'))
const ProfesionalesBeneficios = lazy(() => import('./páginas/ProfesionalesBeneficios'))

// Professionals by category
const ProfesionalesServicios = lazy(() => import('./páginas/ProfesionalesServicios'))
const ProfesionalesEnfermeria = lazy(() => import('./páginas/ProfesionalesEnfermeria'))
const ProfesionalesCuidadores = lazy(() => import('./páginas/ProfesionalesCuidadores'))
const ProfesionalesMedicos = lazy(() => import('./páginas/ProfesionalesMedicos'))
const ProfesionalesTerapia = lazy(() => import('./páginas/ProfesionalesTerapia'))
const ProfesionalesOtros = lazy(() => import('./páginas/ProfesionalesOtros'))

// Professionals by city
const ProfesionalesBogota = lazy(() => import('./páginas/ProfesionalesBogota'))
const ProfesionalesCali = lazy(() => import('./páginas/ProfesionalesCali'))
const ProfesionalesMedellin = lazy(() => import('./páginas/ProfesionalesMedellin'))
const ProfesionalesPasto = lazy(() => import('./páginas/ProfesionalesPasto'))
const ProfesionalesEnfermeriaBogota = lazy(() => import('./páginas/ProfesionalesEnfermeriaBogota'))

// Professional profile
const ProfesionalDinamico = lazy(() => import('./páginas/ProfesionalDinamico'))
const PerfilProfesional = lazy(() => import('./páginas/PerfilProfesional'))
const PanelDeControlProfesional = lazy(() => import('./páginas/PanelDeControlProfesional'))

// Offers
const Ofertas = lazy(() => import('./páginas/Ofertas'))
const OfertaCuidadoAdultoMayorBogota = lazy(() => import('./páginas/OfertaCuidadoAdultoMayorBogota'))
const TrabajaConNosotros = lazy(() => import('./páginas/TrabajaConNosotros'))

// Legal pages
const TerminosYCondiciones = lazy(() => import('./páginas/TerminosYCondiciones'))
const PoliticaPrivacidad = lazy(() => import('./páginas/PoliticaPrivacidad'))
const PoliticaDeCookies = lazy(() => import('./páginas/PoliticaDeCookies'))
const TratamientoDeDatos = lazy(() => import('./páginas/TratamientoDeDatos'))

// Admin pages (no indexar)
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

// Other legacy pages
const FamilyDashboard = lazy(() => import('./páginas/FamilyDashboard'))
const BelenConectaLogin = lazy(() => import('./páginas/BelenConectaLogin'))
const BelenConectaRegister = lazy(() => import('./páginas/BelenConectaRegister'))
const OfertasDeTrabajo = lazy(() => import('./páginas/OfertasDeTrabajo'))
const PáginaDePrecios = lazy(() => import('./páginas/PáginaDePrecios'))
const ResultadosDeBúsqueda = lazy(() => import('./páginas/ResultadosDeBúsqueda'))
const AICareAssistant = lazy(() => import('./páginas/AICareAssistant'))
const AboutPage = lazy(() => import('./páginas/AboutPage'))

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
          {/* Main pages - URLs principales */}
          <Route path="/" element={<PáginaPrincipal />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/servicios" element={<PáginaDeServicios />} />
          <Route path="/planes" element={<Planes />} />
          <Route path="/belen-conecta" element={<BelenConecta />} />
          <Route path="/ingresar" element={<Ingresar />} />
          <Route path="/registrarse" element={<Registrarse />} />
          
          {/* Secondary main pages */}
          <Route path="/lugar-sonado" element={<LugarSonado />} />
          <Route path="/por-que-hogar-belen" element={<PorQueHogarBelen />} />
          <Route path="/modo-vacaciones-permanentes" element={<ModoVacacionesPermanentes />} />
          <Route path="/lo-que-nos-hace-unicos" element={<LoQueNosHaceUnicos />} />
          <Route path="/testimonios" element={<Testimonios />} />

          {/* Centro Vida pages */}
          <Route path="/centro-vida" element={<CentroVida />} />
          <Route path="/centro-vida/buesaco" element={<CentroVidaBuesaco />} />
          <Route path="/centro-vida/instalaciones" element={<CentroVidaInstalaciones />} />
          <Route path="/centro-vida/planes" element={<CentroVidaPlanes />} />
          <Route path="/centro-vida/agenda-visita" element={<CentroVidaAgendaVisita />} />
          <Route path="/centro-vida/planes/compartida" element={<CentroVidaPlanesCompartida />} />
          <Route path="/centro-vida/planes/individual" element={<CentroVidaPlanesIndividual />} />

          {/* Services pages */}
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

          {/* Belén Conecta - Families */}
          <Route path="/belen-conecta/familias" element={<BelenConectaFamilias />} />
          <Route path="/belen-conecta/familias/buscar-profesionales" element={<FamiliasBuscarProfesionales />} />
          <Route path="/belen-conecta/familias/publicar-oferta" element={<FamiliasPublicarOferta />} />
          <Route path="/belen-conecta/familias/como-funciona" element={<FamiliasComoFunciona />} />

          {/* Belén Conecta - Professionals */}
          <Route path="/belen-conecta/profesionales" element={<BelenConectaProfesionales />} />
          <Route path="/belen-conecta/profesionales/registro" element={<ProfesionalesRegistro />} />
          <Route path="/belen-conecta/profesionales/ofertas" element={<ProfesionalesOfertas />} />
          <Route path="/belen-conecta/profesionales/beneficios" element={<ProfesionalesBeneficios />} />

          {/* Professionals by category */}
          <Route path="/profesionales" element={<ProfesionalesServicios />} />
          <Route path="/profesionales/enfermeria" element={<ProfesionalesEnfermeria />} />
          <Route path="/profesionales/cuidadores" element={<ProfesionalesCuidadores />} />
          <Route path="/profesionales/medicos" element={<ProfesionalesMedicos />} />
          <Route path="/profesionales/terapia" element={<ProfesionalesTerapia />} />
          <Route path="/profesionales/otros" element={<ProfesionalesOtros />} />

          {/* Professionals by city */}
          <Route path="/profesionales/bogota" element={<ProfesionalesBogota />} />
          <Route path="/profesionales/cali" element={<ProfesionalesCali />} />
          <Route path="/profesionales/medellin" element={<ProfesionalesMedellin />} />
          <Route path="/profesionales/pasto" element={<ProfesionalesPasto />} />
          <Route path="/profesionales/enfermeria/bogota" element={<ProfesionalesEnfermeriaBogota />} />

          {/* Dynamic professional profile */}
          <Route path="/profesional/:slug" element={<ProfesionalDinamico />} />
          <Route path="/profesional/perfil" element={<PerfilProfesional />} />
          <Route path="/profesional/panel" element={<PanelDeControlProfesional />} />

          {/* Offers */}
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/ofertas/cuidado-adulto-mayor-bogota" element={<OfertaCuidadoAdultoMayorBogota />} />
          <Route path="/trabaja-con-nosotros" element={<TrabajaConNosotros />} />

          {/* Legal pages */}
          <Route path="/terminos-y-condiciones" element={<TerminosYCondiciones />} />
          <Route path="/politica-de-privacidad" element={<PoliticaPrivacidad />} />
          <Route path="/politica-de-cookies" element={<PoliticaDeCookies />} />
          <Route path="/tratamiento-de-datos" element={<TratamientoDeDatos />} />

          {/* Admin routes (no indexar) */}
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/2fa" element={<Admin2FA />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/profesionales" element={<AdminProfessionals />} />
          <Route path="/admin/ofertas" element={<AdminJobOffers />} />
          <Route path="/admin/verificaciones" element={<AdminLeads />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/admin/configuracion" element={<AdminConfiguration />} />
          <Route path="/admin/contenido" element={<AdminContent />} />
          <Route path="/admin/auditoria" element={<AdminAuditLog />} />
          <Route path="/admin/ai-clasificaciones" element={<AdminAIClassifications />} />
          <Route path="/admin/codigos-promo" element={<AdminPromoCodes />} />
          <Route path="/superadmin" element={<SuperAdminDashboard />} />

          {/* Legacy routes for backward compatibility */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/precios" element={<PáginaDePrecios />} />
          <Route path="/busqueda" element={<ResultadosDeBúsqueda />} />
          <Route path="/privacidad" element={<PoliticaPrivacidad />} />
          <Route path="/terminos" element={<TerminosYCondiciones />} />
          <Route path="/familia/dashboard" element={<FamilyDashboard />} />
          <Route path="/belen-conecta/login" element={<BelenConectaLogin />} />
          <Route path="/belen-conecta/register" element={<BelenConectaRegister />} />
          <Route path="/ofertas-trabajo" element={<OfertasDeTrabajo />} />
          <Route path="/plan-amigos" element={<PlanAmigos />} />
          <Route path="/plan-sol-cafe" element={<PlanSolYCafe />} />
          <Route path="/plan-sonreir" element={<PlanSonreir />} />
          <Route path="/plan-turismo-rural" element={<PlanTurismoRural />} />
          <Route path="/ai-assistant" element={<AICareAssistant />} />

          {/* 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
