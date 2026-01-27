import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'

// Lazy load pages from src/páginas/
const PáginaPrincipal = lazy(() => import('../páginas/PáginaPrincipal'))
const AboutPage = lazy(() => import('../páginas/AboutPage'))
const ContactPage = lazy(() => import('../páginas/ContactPage'))

// Admin pages
const AdminLogin = lazy(() => import('../páginas/AdminLogin'))
const Admin2FA = lazy(() => import('../páginas/Admin2FA'))
const AdminDashboard = lazy(() => import('../páginas/AdminDashboard'))
const AdminProfessionals = lazy(() => import('../páginas/AdminProfessionals'))
const AdminLeads = lazy(() => import('../páginas/AdminLeads'))
const AdminJobOffers = lazy(() => import('../páginas/AdminJobOffers'))
const AdminAnalytics = lazy(() => import('../páginas/AdminAnalytics'))
const AdminConfiguration = lazy(() => import('../páginas/AdminConfiguration'))
const AdminContent = lazy(() => import('../páginas/AdminContent'))
const AdminAuditLog = lazy(() => import('../páginas/AdminAuditLog'))
const AdminAIClassifications = lazy(() => import('../páginas/AdminAIClassifications'))
const AdminPromoCodes = lazy(() => import('../páginas/AdminPromoCodes'))
const SuperAdminDashboard = lazy(() => import('../páginas/SuperAdminDashboard'))

// Family pages
const FamilyDashboard = lazy(() => import('../páginas/FamilyDashboard'))
const BelenConectaFamilias = lazy(() => import('../páginas/BelenConectaFamilias'))

// Professional pages
const BelenConectaProfesionales = lazy(() => import('../páginas/BelenConectaProfesionales'))
const BelenConectaLogin = lazy(() => import('../páginas/BelenConectaLogin'))
const BelenConectaRegister = lazy(() => import('../páginas/BelenConectaRegister'))
const ProfesionalesServicios = lazy(() => import('../páginas/ProfesionalesServicios'))
const PerfilProfesional = lazy(() => import('../páginas/PerfilProfesional'))
const PanelDeControlProfesional = lazy(() => import('../páginas/PanelDeControlProfesional'))
const OfertasDeTrabajo = lazy(() => import('../páginas/OfertasDeTrabajo'))

// Services pages
const CentroVida = lazy(() => import('../páginas/CentroVida'))
const PlanesVidaActiva = lazy(() => import('../páginas/PlanesVidaActiva'))
const PlanAmigos = lazy(() => import('../páginas/PlanAmigos'))
const PlanSolYCafe = lazy(() => import('../páginas/PlanSolYCafe'))
const PlanSonreir = lazy(() => import('../páginas/PlanSonreir'))
const PlanTurismoRural = lazy(() => import('../páginas/PlanTurismoRural'))

// Other pages
const PáginaDeServicios = lazy(() => import('../páginas/PáginaDeServicios'))
const PáginaDePrecios = lazy(() => import('../páginas/PáginaDePrecios'))
const ResultadosDeBúsqueda = lazy(() => import('../páginas/ResultadosDeBúsqueda'))
const PoliticaPrivacidad = lazy(() => import('../páginas/PoliticaPrivacidad'))
const TerminosYCondiciones = lazy(() => import('../páginas/TerminosYCondiciones'))
const AICareAssistant = lazy(() => import('../páginas/AICareAssistant'))

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
          {/* Public routes */}
          <Route path="/" element={<PáginaPrincipal />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/servicios" element={<PáginaDeServicios />} />
          <Route path="/precios" element={<PáginaDePrecios />} />
          <Route path="/busqueda" element={<ResultadosDeBúsqueda />} />
          <Route path="/privacidad" element={<PoliticaPrivacidad />} />
          <Route path="/terminos" element={<TerminosYCondiciones />} />

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/2fa" element={<Admin2FA />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/profesionales" element={<AdminProfessionals />} />
          <Route path="/admin/leads" element={<AdminLeads />} />
          <Route path="/admin/ofertas" element={<AdminJobOffers />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/admin/configuracion" element={<AdminConfiguration />} />
          <Route path="/admin/contenido" element={<AdminContent />} />
          <Route path="/admin/auditoria" element={<AdminAuditLog />} />
          <Route path="/admin/ai-clasificaciones" element={<AdminAIClassifications />} />
          <Route path="/admin/codigos-promo" element={<AdminPromoCodes />} />
          <Route path="/superadmin" element={<SuperAdminDashboard />} />

          {/* Family routes */}
          <Route path="/familia/dashboard" element={<FamilyDashboard />} />
          <Route path="/belen-conecta/familias" element={<BelenConectaFamilias />} />

          {/* Professional routes */}
          <Route path="/belen-conecta/login" element={<BelenConectaLogin />} />
          <Route path="/belen-conecta/register" element={<BelenConectaRegister />} />
          <Route path="/belen-conecta/profesionales" element={<BelenConectaProfesionales />} />
          <Route path="/profesionales" element={<ProfesionalesServicios />} />
          <Route path="/profesional/perfil" element={<PerfilProfesional />} />
          <Route path="/profesional/panel" element={<PanelDeControlProfesional />} />
          <Route path="/ofertas-trabajo" element={<OfertasDeTrabajo />} />

          {/* Services routes */}
          <Route path="/centro-vida" element={<CentroVida />} />
          <Route path="/planes-vida-activa" element={<PlanesVidaActiva />} />
          <Route path="/plan-amigos" element={<PlanAmigos />} />
          <Route path="/plan-sol-cafe" element={<PlanSolYCafe />} />
          <Route path="/plan-sonreir" element={<PlanSonreir />} />
          <Route path="/plan-turismo-rural" element={<PlanTurismoRural />} />

          {/* AI Assistant */}
          <Route path="/ai-assistant" element={<AICareAssistant />} />

          {/* 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
