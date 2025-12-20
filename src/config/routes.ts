// SEO-Optimized Routes Configuration for Hogar Belén
// Based on strategic keywords for Nariño, Pasto, and Buesaco

export interface RouteConfig {
  path: string;
  pageKey: string;
  title: string;
  description: string;
  keywords: string;
  h1?: string;
}

export const routes: RouteConfig[] = [
  // HOME
  {
    path: '/',
    pageKey: 'home',
    title: 'Hogar Belén | Hogar Geriátrico en Nariño – Cuidado Adulto Mayor',
    description: 'Hogar geriátrico en Nariño con cuidado integral para adultos mayores. Ambiente natural, atención humana y profesionales verificados en Buesaco.',
    keywords: 'hogar geriátrico en nariño, hogar geriátrico en pasto, cuidado adulto mayor nariño, residencia adulto mayor',
    h1: 'Hogar Geriátrico en Nariño - Cuidado Integral para Adultos Mayores'
  },
  
  // AUTORIDAD Y CONFIANZA
  {
    path: '/quienes-somos-hogar-geriatrico-narino',
    pageKey: 'about',
    title: 'Quiénes Somos | Hogar Geriátrico en Nariño – Hogar Belén',
    description: 'Conoce Hogar Belén, hogar geriátrico en Nariño enfocado en el bienestar, cuidado digno y calidad de vida del adulto mayor.',
    keywords: 'hogar geriátrico nariño, quienes somos hogar belen, residencia adulto mayor',
    h1: 'Quiénes Somos - Hogar Geriátrico Belén en Nariño'
  },
  {
    path: '/hogar-belen-buesaco-narino',
    pageKey: 'about',
    title: 'Hogar Belén en Buesaco, Nariño | Residencia Adulto Mayor',
    description: 'Hogar Belén en Buesaco ofrece cuidado integral al adulto mayor en un entorno rural, tranquilo y seguro en Nariño.',
    keywords: 'hogar belen buesaco, hogar geriátrico buesaco, residencia adulto mayor buesaco',
    h1: 'Hogar Belén - Residencia para Adultos Mayores en Buesaco, Nariño'
  },
  
  // SEO LOCAL (GEO POSICIONAMIENTO)
  {
    path: '/hogar-geriatrico-en-buesaco',
    pageKey: 'about',
    title: 'Hogar Geriátrico en Buesaco | Cuidado Adulto Mayor',
    description: 'Hogar geriátrico en Buesaco con atención integral, clima templado y entorno natural para adultos mayores.',
    keywords: 'hogar geriátrico en buesaco, hogar geriátrico buesaco nariño, cuidado adulto mayor buesaco',
    h1: 'Hogar Geriátrico en Buesaco - Atención Integral para Adultos Mayores'
  },
  {
    path: '/hogar-geriatrico-en-pasto',
    pageKey: 'about',
    title: 'Hogar Geriátrico en Pasto | Residencia Adulto Mayor',
    description: 'Buscas hogar geriátrico en Pasto. Hogar Belén ofrece cuidado profesional cerca de Pasto, en Buesaco, Nariño.',
    keywords: 'hogar geriátrico en pasto, hogar geriátrico cerca de pasto, cuidadores adultos mayores pasto',
    h1: 'Hogar Geriátrico cerca de Pasto - Hogar Belén en Buesaco'
  },
  {
    path: '/hogar-geriatrico-narino-clima-templado',
    pageKey: 'about',
    title: 'Hogar Geriátrico en Nariño | Clima Templado Ideal',
    description: 'Hogar geriátrico en Nariño con clima templado, ideal para el bienestar físico y emocional del adulto mayor.',
    keywords: 'hogar geriátrico clima templado, hogar geriátrico rural, finca descanso adulto mayor',
    h1: 'Hogar Geriátrico en Clima Templado - Nariño'
  },
  {
    path: '/contacto-hogar-geriatrico-buesaco',
    pageKey: 'contact',
    title: 'Contacto | Hogar Geriátrico en Buesaco – Hogar Belén',
    description: 'Contáctanos y recibe información sobre cuidado del adulto mayor en Hogar Belén, Buesaco, Nariño.',
    keywords: 'contacto hogar belen, contacto hogar geriátrico buesaco, información adulto mayor',
    h1: 'Contacto - Hogar Geriátrico Belén'
  },
  
  // RESIDENCIA GERIÁTRICA
  {
    path: '/residencia-adulto-mayor-narino',
    pageKey: 'centro-vida',
    title: 'Residencia Adulto Mayor en Nariño | Hogar Belén',
    description: 'Residencia para adultos mayores en Nariño con atención integral, médica y emocional en un entorno seguro.',
    keywords: 'residencia adulto mayor nariño, residencia geriátrica nariño, hogar para ancianos',
    h1: 'Residencia para Adultos Mayores en Nariño'
  },
  {
    path: '/residencia-geriatrica-buesaco',
    pageKey: 'centro-vida',
    title: 'Residencia Geriátrica en Buesaco | Hogar Belén',
    description: 'Residencia geriátrica en Buesaco con cuidado permanente y acompañamiento humano para adultos mayores.',
    keywords: 'residencia geriátrica buesaco, hogar adultos mayores buesaco',
    h1: 'Residencia Geriátrica en Buesaco - Hogar Belén'
  },
  {
    path: '/servicios-cuidado-adulto-mayor',
    pageKey: 'services',
    title: 'Servicios de Cuidado del Adulto Mayor | Hogar Belén',
    description: 'Servicios especializados de cuidado del adulto mayor en Nariño: residencia, centro día, rehabilitación y atención a domicilio.',
    keywords: 'servicios cuidado adulto mayor, cuidado adulto mayor nariño, atención geriátrica',
    h1: 'Servicios de Cuidado del Adulto Mayor'
  },
  
  // HABITACIONES
  {
    path: '/residencia/habitacion-compartida-adulto-mayor',
    pageKey: 'centro-vida',
    title: 'Habitación Compartida Adulto Mayor | Hogar Belén',
    description: 'Habitación compartida para adultos mayores con atención continua y ambiente seguro en Hogar Belén.',
    keywords: 'habitación adulto mayor, residencia compartida adulto mayor',
    h1: 'Habitación Compartida para Adultos Mayores'
  },
  {
    path: '/residencia/habitacion-privada-adulto-mayor',
    pageKey: 'centro-vida',
    title: 'Habitación Privada Adulto Mayor | Residencia Geriátrica',
    description: 'Habitación privada para adultos mayores que buscan comodidad, privacidad y cuidado profesional.',
    keywords: 'habitación privada adulto mayor, residencia privada geriátrica',
    h1: 'Habitación Privada para Adultos Mayores'
  },
  {
    path: '/residencia/habitacion-suite-adulto-mayor',
    pageKey: 'centro-vida',
    title: 'Suite Adulto Mayor | Hogar Geriátrico en Nariño',
    description: 'Suite exclusiva para adultos mayores con mayor confort, tranquilidad y atención personalizada.',
    keywords: 'suite adulto mayor, habitación premium geriátrica',
    h1: 'Suite Premium para Adultos Mayores'
  },
  {
    path: '/residencia/habitacion-temporal-recuperacion',
    pageKey: 'centro-vida',
    title: 'Estancia Temporal Adulto Mayor | Recuperación Segura',
    description: 'Estancia temporal para recuperación del adulto mayor con supervisión profesional y entorno tranquilo.',
    keywords: 'estancia temporal adulto mayor, recuperación adulto mayor, cuidado post hospitalario',
    h1: 'Estancia Temporal para Recuperación'
  },
  
  // SERVICIOS EN SEDE
  {
    path: '/servicios/centro-dia-adulto-mayor-buesaco',
    pageKey: 'centro-vida',
    title: 'Centro Día Adulto Mayor en Buesaco | Hogar Belén',
    description: 'Centro día para adultos mayores en Buesaco con actividades terapéuticas, recreativas y atención profesional.',
    keywords: 'centro día adulto mayor, centro día buesaco, actividades adulto mayor',
    h1: 'Centro Día para Adultos Mayores en Buesaco'
  },
  {
    path: '/servicios/rehabilitacion-adulto-mayor-narino',
    pageKey: 'services',
    title: 'Rehabilitación Adulto Mayor en Nariño | Hogar Belén',
    description: 'Servicios de rehabilitación física y terapéutica para adultos mayores en Nariño con profesionales especializados.',
    keywords: 'rehabilitación adulto mayor, fisioterapia geriátrica, terapia adulto mayor',
    h1: 'Rehabilitación para Adultos Mayores'
  },
  {
    path: '/servicios/enfermeria-geriatrica-en-sede',
    pageKey: 'services',
    title: 'Enfermería Geriátrica en Sede | Hogar Belén',
    description: 'Servicio de enfermería geriátrica profesional en nuestras instalaciones con atención 24/7.',
    keywords: 'enfermería geriátrica, enfermeras adulto mayor, atención médica geriátrica',
    h1: 'Enfermería Geriátrica Profesional'
  },
  {
    path: '/servicios/atencion-medica-basica-adulto-mayor',
    pageKey: 'services',
    title: 'Atención Médica Básica Adulto Mayor | Hogar Belén',
    description: 'Atención médica básica y monitoreo continuo para adultos mayores en Hogar Belén.',
    keywords: 'atención médica adulto mayor, control médico geriátrico',
    h1: 'Atención Médica Básica para Adultos Mayores'
  },
  
  // SERVICIOS A DOMICILIO (ALTA CONVERSIÓN)
  {
    path: '/servicios/cuidadores-adulto-mayor-a-domicilio',
    pageKey: 'profesionales-servicios',
    title: 'Cuidadores Adulto Mayor a Domicilio | Hogar Belén',
    description: 'Servicio de cuidadores de adultos mayores a domicilio en Nariño. Atención confiable, humana y profesional.',
    keywords: 'cuidadores adulto mayor a domicilio, cuidadores domicilio nariño, cuidado en casa adulto mayor',
    h1: 'Cuidadores de Adultos Mayores a Domicilio'
  },
  {
    path: '/servicios/cuidadores-adulto-mayor-pasto',
    pageKey: 'profesionales-servicios',
    title: 'Cuidadores de Adulto Mayor en Pasto | A Domicilio',
    description: 'Cuidadores de adultos mayores en Pasto y Nariño. Atención confiable, humana y profesional a domicilio.',
    keywords: 'cuidadores de adultos mayores en pasto, cuidadores pasto, cuidado adulto mayor pasto',
    h1: 'Cuidadores de Adultos Mayores en Pasto'
  },
  {
    path: '/servicios/cuidadores-adulto-mayor-narino',
    pageKey: 'profesionales-servicios',
    title: 'Cuidadores Adulto Mayor en Nariño | Profesionales',
    description: 'Cuidadores verificados para adultos mayores en Nariño. Servicio confiable y profesional.',
    keywords: 'cuidadores adulto mayor nariño, cuidadores verificados nariño',
    h1: 'Cuidadores de Adultos Mayores en Nariño'
  },
  {
    path: '/servicios/enfermeria-geriatrica-domiciliaria',
    pageKey: 'profesionales-servicios',
    title: 'Enfermería Geriátrica a Domicilio | Pasto y Nariño',
    description: 'Servicio de enfermería geriátrica a domicilio para adultos mayores. Atención segura y profesional.',
    keywords: 'enfermería geriátrica a domicilio, enfermeras a domicilio pasto, enfermería domiciliaria',
    h1: 'Enfermería Geriátrica a Domicilio'
  },
  {
    path: '/servicios/acompanamiento-adulto-mayor-en-casa',
    pageKey: 'profesionales-servicios',
    title: 'Acompañamiento Adulto Mayor en Casa | Nariño',
    description: 'Servicio de acompañamiento profesional para adultos mayores en su hogar. Cuidado y compañía.',
    keywords: 'acompañamiento adulto mayor, compañía adulto mayor, cuidado en casa',
    h1: 'Acompañamiento Profesional para Adultos Mayores'
  },
  {
    path: '/servicios/cuidado-adulto-mayor-24-horas',
    pageKey: 'profesionales-servicios',
    title: 'Cuidado Adulto Mayor 24 Horas | A Domicilio',
    description: 'Servicio de cuidado para adultos mayores 24 horas al día. Atención continua y profesional.',
    keywords: 'cuidadores adulto mayor 24 horas, cuidado continuo adulto mayor, atención 24/7',
    h1: 'Cuidado de Adultos Mayores 24 Horas'
  },
  
  // PLANES Y EXPERIENCIAS
  {
    path: '/planes-adultos-mayores-narino',
    pageKey: 'planes-vida-activa',
    title: 'Planes para Adultos Mayores en Nariño | Hogar Belén',
    description: 'Planes recreativos, terapéuticos y de bienestar diseñados para adultos mayores en Nariño.',
    keywords: 'planes adultos mayores, actividades tercera edad, recreación adulto mayor',
    h1: 'Planes para Adultos Mayores en Nariño'
  },
  {
    path: '/planes-recreativos-adulto-mayor',
    pageKey: 'planes-vida-activa',
    title: 'Planes Recreativos Adulto Mayor | Hogar Belén',
    description: 'Planes recreativos y actividades para el bienestar del adulto mayor en Nariño.',
    keywords: 'planes recreativos adulto mayor, actividades recreativas, turismo adulto mayor',
    h1: 'Planes Recreativos para Adultos Mayores'
  },
  {
    path: '/planes/dia-de-sol-adulto-mayor-amigos',
    pageKey: 'plan-amigos',
    title: 'Día de Sol Adulto Mayor | Plan Amigos Hogar Belén',
    description: 'Plan Día de Sol para adultos mayores: encuentros sociales, actividades grupales y nuevas amistades en Nariño.',
    keywords: 'plan social adulto mayor, actividades sociales tercera edad, amigos adulto mayor',
    h1: 'Plan Día de Sol - Encuentra Nuevos Amigos'
  },
  {
    path: '/planes/turismo-cafetero-buesaco-adultos-mayores',
    pageKey: 'plan-sol-cafe',
    title: 'Turismo Cafetero Buesaco | Adultos Mayores',
    description: 'Turismo cafetero para adultos mayores en Buesaco: conoce el proceso del café y disfruta del campo.',
    keywords: 'turismo cafetero adulto mayor, turismo rural buesaco, café adulto mayor',
    h1: 'Turismo Cafetero para Adultos Mayores'
  },
  {
    path: '/planes/celebracion-cumpleanos-adulto-mayor',
    pageKey: 'plan-sonreir',
    title: 'Celebración Cumpleaños Adulto Mayor | Hogar Belén',
    description: 'Celebra cumpleaños y fechas especiales del adulto mayor con actividades, música y alegría.',
    keywords: 'cumpleaños adulto mayor, celebración tercera edad, fiestas adulto mayor',
    h1: 'Celebración de Cumpleaños para Adultos Mayores'
  },
  {
    path: '/planes/ecoturismo-zooterapia-tercera-edad',
    pageKey: 'plan-turismo-rural',
    title: 'Ecoturismo y Zooterapia | Bienestar Adulto Mayor',
    description: 'Plan de ecoturismo y zooterapia para adultos mayores. Naturaleza, bienestar y salud emocional.',
    keywords: 'ecoturismo adulto mayor, zooterapia tercera edad, turismo rural adulto mayor',
    h1: 'Ecoturismo y Zooterapia para Adultos Mayores'
  },
  {
    path: '/planes/estancia-temporal-adulto-mayor',
    pageKey: 'centro-vida',
    title: 'Estancia Temporal Adulto Mayor | Descanso y Cuidado',
    description: 'Estancia temporal para adultos mayores en entorno rural y natural. Descanso y atención profesional.',
    keywords: 'estancia temporal adulto mayor, descanso adulto mayor, vacaciones tercera edad',
    h1: 'Estancia Temporal para Adultos Mayores'
  },
  
  // BELÉN CONECTA (PLATAFORMA)
  {
    path: '/belen-conecta',
    pageKey: 'belen-familias',
    title: 'Belén Conecta | Cuidadores y Enfermeras Verificados',
    description: 'Plataforma para contratar cuidadores y enfermeras verificadas para adultos mayores en Nariño.',
    keywords: 'belen conecta, plataforma cuidadores, contratar cuidador verificado',
    h1: 'Belén Conecta - Plataforma de Cuidado del Adulto Mayor'
  },
  {
    path: '/belen-conecta-app',
    pageKey: 'belen-familias',
    title: 'Belén Conecta App | Encuentra Profesionales Verificados',
    description: 'Aplicación Belén Conecta: encuentra y contrata profesionales verificados para el cuidado del adulto mayor.',
    keywords: 'app cuidadores, aplicación adulto mayor, tecnología cuidado geriátrico',
    h1: 'Belén Conecta - Aplicación Móvil'
  },
  {
    path: '/belen-conecta/contratar-cuidador-verificado',
    pageKey: 'belen-familias',
    title: 'Contratar Cuidador Verificado | Adulto Mayor',
    description: 'Contrata cuidadores de adultos mayores verificados, confiables y evaluados por Hogar Belén.',
    keywords: 'contratar cuidador verificado, cuidadores confiables, cuidador profesional',
    h1: 'Contratar Cuidadores Verificados'
  },
  {
    path: '/belen-conecta/cuidadores-verificados-narino',
    pageKey: 'belen-familias',
    title: 'Cuidadores Verificados en Nariño | Belén Conecta',
    description: 'Red de cuidadores verificados para adultos mayores en Nariño. Seguridad y profesionalismo garantizado.',
    keywords: 'cuidadores verificados nariño, red cuidadores, profesionales verificados',
    h1: 'Cuidadores Verificados en Nariño'
  },
  {
    path: '/belen-conecta/enfermeras-verificadas-pasto',
    pageKey: 'belen-profesionales',
    title: 'Enfermeras Verificadas en Pasto | Belén Conecta',
    description: 'Enfermeras profesionales verificadas para cuidado geriátrico en Pasto y Nariño.',
    keywords: 'enfermeras verificadas pasto, enfermeras profesionales, enfermería geriátrica',
    h1: 'Enfermeras Verificadas en Pasto'
  },
  
  // EMPLEO Y PROFESIONALES
  {
    path: '/belen-conecta/empleo-profesionales-salud-narino',
    pageKey: 'jobs',
    title: 'Empleo Profesionales de Salud en Nariño | Belén Conecta',
    description: 'Ofertas de empleo para profesionales de la salud especializado en cuidado del adulto mayor en Nariño.',
    keywords: 'empleo salud nariño, trabajo cuidadores, ofertas enfermería geriátrica',
    h1: 'Empleo para Profesionales de Salud en Nariño'
  },
  {
    path: '/belen-conecta/empleo-cuidadores-adulto-mayor',
    pageKey: 'jobs',
    title: 'Empleo Cuidadores Adulto Mayor | Ofertas de Trabajo',
    description: 'Encuentra trabajo como cuidador de adultos mayores. Únete a nuestra red de profesionales.',
    keywords: 'empleo cuidadores adulto mayor, trabajo cuidadores, vacantes cuidadores',
    h1: 'Ofertas de Empleo para Cuidadores'
  },
  {
    path: '/belen-conecta/ofertas-cuidado-adulto-mayor',
    pageKey: 'jobs',
    title: 'Ofertas de Cuidado del Adulto Mayor | Trabajo',
    description: 'Ofertas de trabajo en cuidado del adulto mayor. Convierte tu vocación en profesión.',
    keywords: 'ofertas cuidado adulto mayor, trabajo gerontología, empleo geriátrico',
    h1: 'Ofertas de Trabajo en Cuidado del Adulto Mayor'
  },
  
  // PERFILES PROFESIONALES
  {
    path: '/profesionales-salud',
    pageKey: 'profesionales-servicios',
    title: 'Profesionales de Salud | Cuidado Adulto Mayor',
    description: 'Directorio de profesionales de la salud especializados en cuidado del adulto mayor.',
    keywords: 'profesionales salud, directorio cuidadores, profesionales geriátricos',
    h1: 'Profesionales de Salud Especializados'
  },
  {
    path: '/profesionales-cuidado-adulto-mayor',
    pageKey: 'profesionales-servicios',
    title: 'Profesionales en Cuidado del Adulto Mayor | Nariño',
    description: 'Listado de profesionales en cuidado del adulto mayor verificados y disponibles en Nariño.',
    keywords: 'profesionales cuidado adulto mayor, cuidadores profesionales, gerontólogos',
    h1: 'Profesionales en Cuidado del Adulto Mayor'
  },
  
  // OFERTAS DE TRABAJO (DINÁMICO)
  {
    path: '/empleo-cuidadores-adulto-mayor',
    pageKey: 'jobs',
    title: 'Empleo Cuidadores Adulto Mayor | Bolsa de Trabajo',
    description: 'Bolsa de empleo para cuidadores de adultos mayores en Nariño. Encuentra tu próximo trabajo.',
    keywords: 'empleo cuidadores, bolsa trabajo salud, vacantes adulto mayor',
    h1: 'Bolsa de Empleo para Cuidadores'
  },
  {
    path: '/ofertas-salud-narino',
    pageKey: 'jobs',
    title: 'Ofertas de Empleo en Salud - Nariño | Hogar Belén',
    description: 'Ofertas de empleo en el sector salud enfocadas en geriatría y cuidado del adulto mayor.',
    keywords: 'ofertas salud nariño, empleo sector salud, trabajo enfermería',
    h1: 'Ofertas de Empleo en Salud - Nariño'
  },
  
  // PRECIOS
  {
    path: '/precios-cuidado-adulto-mayor',
    pageKey: 'pricing',
    title: 'Precios Cuidado Adulto Mayor | Planes y Tarifas',
    description: 'Conoce nuestros planes y tarifas de cuidado del adulto mayor. Transparencia y calidad.',
    keywords: 'precios cuidado adulto mayor, tarifas hogar geriátrico, costos residencia',
    h1: 'Precios y Planes de Cuidado del Adulto Mayor'
  },
  
  // AUTENTICACIÓN (NO INDEXAR)
  {
    path: '/login',
    pageKey: 'login',
    title: 'Iniciar Sesión | Belén Conecta',
    description: 'Accede a tu cuenta de Belén Conecta',
    keywords: '',
    h1: 'Iniciar Sesión'
  },
  {
    path: '/registro',
    pageKey: 'register',
    title: 'Registro | Belén Conecta',
    description: 'Crea tu cuenta en Belén Conecta',
    keywords: '',
    h1: 'Crear Cuenta'
  },
  
  // DASHBOARDS (NO INDEXAR)
  {
    path: '/dashboard-familia',
    pageKey: 'dashboard-family',
    title: 'Panel Familiar | Belén Conecta',
    description: 'Panel de control para familias',
    keywords: '',
    h1: 'Panel Familiar'
  },
  {
    path: '/dashboard-profesional',
    pageKey: 'dashboard-pro',
    title: 'Panel Profesional | Belén Conecta',
    description: 'Panel de control para profesionales',
    keywords: '',
    h1: 'Panel Profesional'
  },
  {
    path: '/asistente-ia',
    pageKey: 'ai-assistant',
    title: 'Asistente IA | Belén Conecta',
    description: 'Asistente de inteligencia artificial',
    keywords: '',
    h1: 'Asistente de IA'
  }
];

// Helper function to get route by path
export const getRouteByPath = (path: string): RouteConfig | undefined => {
  return routes.find(route => route.path === path);
};

// Helper function to get route by page key
export const getRouteByPageKey = (pageKey: string): RouteConfig | undefined => {
  return routes.find(route => route.pageKey === pageKey);
};

// Helper function to get all routes for a specific page key
export const getRoutesByPageKey = (pageKey: string): RouteConfig[] => {
  return routes.filter(route => route.pageKey === pageKey);
};
