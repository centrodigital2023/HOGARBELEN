-- ================================================
-- HOGAR BELÉN - SCHEMA COMPLETO SUPABASE
-- ================================================
-- Este archivo contiene todas las tablas necesarias
-- para la plataforma completa de Hogar Belén
-- ================================================

-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ================================================
-- TABLA: professional_profiles
-- Almacena perfiles de profesionales de salud
-- ================================================
CREATE TABLE IF NOT EXISTS professional_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Datos básicos
  nombre_completo TEXT NOT NULL,
  titulo_profesional TEXT NOT NULL,
  categoria_profesional TEXT NOT NULL CHECK (categoria_profesional IN (
    'Enfermería',
    'Cuidador(a) de adulto mayor',
    'Auxiliar de enfermería',
    'Fisioterapia',
    'Terapia ocupacional',
    'Psicología',
    'Acompañamiento terapéutico',
    'Gerontología',
    'Otro'
  )),
  
  -- Ubicación y contacto
  ciudad TEXT NOT NULL,
  telefono TEXT NOT NULL CHECK (telefono ~ '^\+57\d{10}$'),
  email TEXT NOT NULL CHECK (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  
  -- Perfil público
  foto_perfil TEXT,
  descripcion_profesional TEXT NOT NULL CHECK (length(descripcion_profesional) >= 100 AND length(descripcion_profesional) <= 500),
  
  -- Experiencia y disponibilidad
  años_experiencia INTEGER NOT NULL CHECK (años_experiencia >= 0 AND años_experiencia <= 50),
  dias_disponibles TEXT[] NOT NULL,
  horario_atencion TEXT NOT NULL,
  tarifa_por_hora INTEGER NOT NULL CHECK (tarifa_por_hora >= 10000 AND tarifa_por_hora <= 200000),
  
  -- Documentos (almacenados en Supabase Storage)
  documentos JSONB DEFAULT '{"cv": null, "documento_id": null, "certificados": [], "tarjeta_profesional": null}'::jsonb,
  
  -- Estado y verificación
  estado_perfil TEXT NOT NULL DEFAULT 'pendiente_verificacion' CHECK (estado_perfil IN (
    'pendiente_verificacion',
    'aprobado',
    'rechazado',
    'eliminado_por_usuario'
  )),
  check_verificado BOOLEAN DEFAULT FALSE,
  fecha_aprobacion TIMESTAMP WITH TIME ZONE,
  aprobado_por TEXT,
  motivo_rechazo TEXT,
  
  -- IA y validación
  nivel_confianza TEXT CHECK (nivel_confianza IN ('alto', 'medio', 'bajo')),
  ia_alertas JSONB DEFAULT '[]'::jsonb,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para búsquedas eficientes
CREATE INDEX idx_professional_categoria ON professional_profiles(categoria_profesional);
CREATE INDEX idx_professional_ciudad ON professional_profiles(ciudad);
CREATE INDEX idx_professional_estado ON professional_profiles(estado_perfil);
CREATE INDEX idx_professional_verificado ON professional_profiles(check_verificado);
CREATE INDEX idx_professional_tarifa ON professional_profiles(tarifa_por_hora);

-- ================================================
-- TABLA: job_offers
-- Ofertas de trabajo publicadas
-- ================================================
CREATE TABLE IF NOT EXISTS job_offers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Información de la oferta
  titulo TEXT NOT NULL,
  tipo_servicio TEXT NOT NULL,
  ubicacion TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  requisitos TEXT,
  salario_rango TEXT,
  contacto TEXT NOT NULL,
  
  -- Estado y validación
  estado TEXT NOT NULL DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'aprobada', 'rechazada')),
  urgencia TEXT DEFAULT 'normal' CHECK (urgencia IN ('normal', 'urgente')),
  
  -- IA y clasificación
  ia_validacion JSONB,
  categoria_detectada TEXT,
  
  -- Timestamps
  fecha_publicacion TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_offer_estado ON job_offers(estado);
CREATE INDEX idx_offer_ubicacion ON job_offers(ubicacion);
CREATE INDEX idx_offer_tipo ON job_offers(tipo_servicio);

-- ================================================
-- TABLA: leads
-- Contactos y solicitudes de usuarios
-- ================================================
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Datos del lead
  tipo_usuario TEXT NOT NULL CHECK (tipo_usuario IN ('familia', 'profesional', 'empleador')),
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT NOT NULL,
  ciudad TEXT,
  mensaje TEXT NOT NULL,
  
  -- Clasificación y priorización
  urgencia TEXT NOT NULL DEFAULT 'normal' CHECK (urgencia IN ('normal', 'urgente')),
  nivel_confianza TEXT CHECK (nivel_confianza IN ('alto', 'medio', 'bajo')),
  estado TEXT NOT NULL DEFAULT 'nuevo' CHECK (estado IN ('nuevo', 'atendido', 'cerrado')),
  prioridad TEXT DEFAULT 'media' CHECK (prioridad IN ('alta', 'media', 'baja')),
  
  -- IA y análisis
  ia_clasificacion JSONB,
  
  -- Seguimiento
  atendido_por TEXT,
  fecha_atencion TIMESTAMP WITH TIME ZONE,
  notas_seguimiento TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_lead_tipo ON leads(tipo_usuario);
CREATE INDEX idx_lead_estado ON leads(estado);
CREATE INDEX idx_lead_urgencia ON leads(urgencia);
CREATE INDEX idx_lead_prioridad ON leads(prioridad);
CREATE INDEX idx_lead_fecha ON leads(created_at);

-- ================================================
-- TABLA: admin_actions
-- Auditoría de acciones administrativas
-- ================================================
CREATE TABLE IF NOT EXISTS admin_actions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Información de la acción
  accion TEXT NOT NULL,
  usuario_afectado TEXT,
  
  -- Administrador responsable
  admin_id TEXT NOT NULL,
  admin_email TEXT NOT NULL,
  
  -- Detalles adicionales
  detalles JSONB,
  
  -- IP y metadata
  ip_address INET,
  user_agent TEXT,
  
  -- Timestamp (NO EDITABLE)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_admin_action_tipo ON admin_actions(accion);
CREATE INDEX idx_admin_action_admin ON admin_actions(admin_id);
CREATE INDEX idx_admin_action_fecha ON admin_actions(created_at);

-- ================================================
-- TABLA: ai_interactions
-- Registro de interacciones con IA
-- ================================================
CREATE TABLE IF NOT EXISTS ai_interactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Contexto de la interacción
  pagina TEXT NOT NULL,
  tipo_evento TEXT NOT NULL,
  
  -- Análisis IA
  tipo_usuario TEXT,
  nivel_interes TEXT,
  urgencia TEXT,
  riesgo TEXT,
  recomendacion_accion TEXT,
  observaciones_admin TEXT,
  
  -- Sesión
  session_id TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  -- Timestamp
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_ai_pagina ON ai_interactions(pagina);
CREATE INDEX idx_ai_tipo_usuario ON ai_interactions(tipo_usuario);
CREATE INDEX idx_ai_urgencia ON ai_interactions(urgencia);
CREATE INDEX idx_ai_session ON ai_interactions(session_id);
CREATE INDEX idx_ai_fecha ON ai_interactions(created_at);

-- ================================================
-- TABLA: page_analytics
-- Analítica de páginas para SEO
-- ================================================
CREATE TABLE IF NOT EXISTS page_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Información de la página
  url TEXT NOT NULL,
  page_title TEXT,
  
  -- Métricas
  views INTEGER DEFAULT 1,
  unique_visitors INTEGER DEFAULT 1,
  bounce_rate DECIMAL(5,2),
  avg_time_on_page INTEGER,
  
  -- Origen del tráfico
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  
  -- Dispositivo
  device_type TEXT,
  browser TEXT,
  
  -- Timestamp
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_analytics_url ON page_analytics(url);
CREATE INDEX idx_analytics_fecha ON page_analytics(created_at);

-- ================================================
-- FUNCIONES AUTOMÁTICAS
-- ================================================

-- Actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger a tablas relevantes
CREATE TRIGGER update_professional_profiles_updated_at
    BEFORE UPDATE ON professional_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_job_offers_updated_at
    BEFORE UPDATE ON job_offers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ================================================
-- ROW LEVEL SECURITY (RLS)
-- ================================================

-- Habilitar RLS en todas las tablas
ALTER TABLE professional_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_interactions ENABLE ROW LEVEL SECURITY;

-- Políticas para professional_profiles
CREATE POLICY "Los profesionales pueden ver su propio perfil"
  ON professional_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Los profesionales pueden actualizar su propio perfil"
  ON professional_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Cualquiera puede ver perfiles aprobados"
  ON professional_profiles FOR SELECT
  USING (estado_perfil = 'aprobado' AND check_verificado = true);

CREATE POLICY "Solo admins pueden insertar perfiles"
  ON professional_profiles FOR INSERT
  WITH CHECK (true); -- Ajustar según lógica de roles

-- Políticas para job_offers
CREATE POLICY "Cualquiera puede ver ofertas aprobadas"
  ON job_offers FOR SELECT
  USING (estado = 'aprobada');

CREATE POLICY "Los usuarios pueden ver sus propias ofertas"
  ON job_offers FOR SELECT
  USING (auth.uid() = user_id);

-- Políticas para leads (solo admins)
CREATE POLICY "Solo admins pueden ver leads"
  ON leads FOR SELECT
  USING (true); -- Ajustar según lógica de roles de admin

-- Políticas para admin_actions (solo lectura, no editable)
CREATE POLICY "Solo admins pueden ver auditoría"
  ON admin_actions FOR SELECT
  USING (true); -- Ajustar según lógica de roles de admin

CREATE POLICY "Solo el sistema puede insertar en auditoría"
  ON admin_actions FOR INSERT
  WITH CHECK (true);

-- ================================================
-- DATOS DE EJEMPLO (OPCIONAL - SOLO DESARROLLO)
-- ================================================

-- Insertar un profesional de ejemplo
-- INSERT INTO professional_profiles (
--   nombre_completo,
--   titulo_profesional,
--   categoria_profesional,
--   ciudad,
--   telefono,
--   email,
--   descripcion_profesional,
--   años_experiencia,
--   dias_disponibles,
--   horario_atencion,
--   tarifa_por_hora,
--   estado_perfil,
--   check_verificado,
--   nivel_confianza
-- ) VALUES (
--   'María Fernanda Rojas',
--   'Enfermera Jefe – Especialista UCI',
--   'Enfermería',
--   'Pasto',
--   '+573001234567',
--   'maria.rojas@ejemplo.com',
--   'Enfermera con más de 10 años de experiencia en cuidado geriátrico. Especializada en atención de adultos mayores con enfermedades crónicas y cuidados paliativos. Certificada en geriatría.',
--   10,
--   ARRAY['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
--   '8:00 a.m. – 12:00 m, 2:00 p.m. – 6:00 p.m.',
--   25000,
--   'aprobado',
--   true,
--   'alto'
-- );

-- ================================================
-- VISTAS ÚTILES
-- ================================================

-- Vista de profesionales verificados
CREATE OR REPLACE VIEW verified_professionals AS
SELECT 
  id,
  nombre_completo,
  titulo_profesional,
  categoria_profesional,
  ciudad,
  años_experiencia,
  tarifa_por_hora,
  check_verificado,
  estado_perfil
FROM professional_profiles
WHERE estado_perfil = 'aprobado' 
  AND check_verificado = true
ORDER BY created_at DESC;

-- Vista de leads urgentes
CREATE OR REPLACE VIEW urgent_leads AS
SELECT 
  id,
  tipo_usuario,
  nombre,
  email,
  telefono,
  ciudad,
  urgencia,
  prioridad,
  estado,
  created_at
FROM leads
WHERE urgencia = 'urgente' 
  AND estado = 'nuevo'
ORDER BY created_at DESC;

-- Vista de métricas del dashboard
CREATE OR REPLACE VIEW dashboard_metrics AS
SELECT 
  (SELECT COUNT(*) FROM professional_profiles) as total_profesionales,
  (SELECT COUNT(*) FROM professional_profiles WHERE check_verificado = true) as profesionales_verificados,
  (SELECT COUNT(*) FROM professional_profiles WHERE estado_perfil = 'pendiente_verificacion') as profesionales_pendientes,
  (SELECT COUNT(*) FROM job_offers WHERE estado = 'aprobada') as ofertas_activas,
  (SELECT COUNT(*) FROM job_offers WHERE estado = 'pendiente') as ofertas_pendientes,
  (SELECT COUNT(*) FROM leads) as total_leads,
  (SELECT COUNT(*) FROM leads WHERE urgencia = 'urgente' AND estado = 'nuevo') as leads_urgentes;

-- ================================================
-- SCRIPT COMPLETADO
-- ================================================
-- Para ejecutar este script:
-- 1. Copia todo el contenido
-- 2. Ve a Supabase Dashboard → SQL Editor
-- 3. Pega y ejecuta
-- ================================================
