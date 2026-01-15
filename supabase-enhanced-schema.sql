-- ================================================================
-- HOGAR BELÉN - ENHANCED SUPABASE SCHEMA
-- ================================================================
-- Esquema completo con tablas adicionales, storage buckets,
-- RLS policies, y configuración de autenticación
-- ================================================================

-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ================================================================
-- TABLA: profiles
-- Perfiles base de usuarios (familias y profesionales)
-- ================================================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('family', 'professional')),
  plan TEXT,
  photo_url TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

-- RLS Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- ================================================================
-- TABLA: professionals
-- Información extendida de profesionales de salud
-- ================================================================
CREATE TABLE IF NOT EXISTS professionals (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  
  -- Información profesional
  specialization TEXT NOT NULL,
  experience_years INTEGER NOT NULL CHECK (experience_years >= 0),
  certifications TEXT[] DEFAULT '{}',
  bio TEXT,
  hourly_rate DECIMAL(10, 2) CHECK (hourly_rate >= 0),
  
  -- Disponibilidad
  availability JSONB DEFAULT '{
    "monday": {"available": false, "hours": []},
    "tuesday": {"available": false, "hours": []},
    "wednesday": {"available": false, "hours": []},
    "thursday": {"available": false, "hours": []},
    "friday": {"available": false, "hours": []},
    "saturday": {"available": false, "hours": []},
    "sunday": {"available": false, "hours": []}
  }'::jsonb,
  
  -- Documentos (URLs de Supabase Storage)
  documents JSONB DEFAULT '{
    "id_document": null,
    "professional_license": null,
    "certifications": [],
    "cv": null
  }'::jsonb,
  
  -- Verificación y estado
  verified BOOLEAN DEFAULT false,
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected')),
  verification_date TIMESTAMPTZ,
  verified_by UUID REFERENCES auth.users(id),
  rejection_reason TEXT,
  
  -- Rating system
  rating DECIMAL(3, 2) CHECK (rating >= 0 AND rating <= 5),
  total_reviews INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_professionals_user_id ON professionals(user_id);
CREATE INDEX IF NOT EXISTS idx_professionals_specialization ON professionals(specialization);
CREATE INDEX IF NOT EXISTS idx_professionals_verified ON professionals(verified);
CREATE INDEX IF NOT EXISTS idx_professionals_rating ON professionals(rating);

-- RLS Policies
ALTER TABLE professionals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Professional profiles are viewable by everyone" ON professionals
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own professional profile" ON professionals
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own professional profile" ON professionals
  FOR UPDATE USING (auth.uid() = user_id);

-- ================================================================
-- TABLA: appointments
-- Gestión de citas entre familias y profesionales
-- ================================================================
CREATE TABLE IF NOT EXISTS appointments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  
  -- Referencias
  family_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  professional_id UUID REFERENCES professionals(id) ON DELETE CASCADE NOT NULL,
  
  -- Información de la cita
  scheduled_date TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER DEFAULT 60 CHECK (duration_minutes > 0),
  service_type TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show')),
  
  -- Detalles
  notes TEXT,
  location TEXT,
  
  -- Cancelación
  cancellation_reason TEXT,
  cancelled_by UUID REFERENCES auth.users(id),
  cancelled_at TIMESTAMPTZ,
  
  -- Archivos relacionados
  files JSONB DEFAULT '[]'::jsonb,
  
  -- Rating (después de completarse)
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  reviewed_at TIMESTAMPTZ,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_appointments_family_id ON appointments(family_id);
CREATE INDEX IF NOT EXISTS idx_appointments_professional_id ON appointments(professional_id);
CREATE INDEX IF NOT EXISTS idx_appointments_scheduled_date ON appointments(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);

-- RLS Policies
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own appointments" ON appointments
  FOR SELECT USING (
    auth.uid() = family_id OR 
    auth.uid() IN (SELECT user_id FROM professionals WHERE id = professional_id)
  );

CREATE POLICY "Families can create appointments" ON appointments
  FOR INSERT WITH CHECK (auth.uid() = family_id);

CREATE POLICY "Users can update their own appointments" ON appointments
  FOR UPDATE USING (
    auth.uid() = family_id OR 
    auth.uid() IN (SELECT user_id FROM professionals WHERE id = professional_id)
  );

-- ================================================================
-- TABLA: subscriptions
-- Gestión de suscripciones y planes
-- ================================================================
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Información del plan
  plan_name TEXT NOT NULL CHECK (plan_name IN ('amigos', 'sol_y_cafe', 'sonreir', 'free')),
  plan_price DECIMAL(10, 2) NOT NULL,
  billing_cycle TEXT DEFAULT 'monthly' CHECK (billing_cycle IN ('monthly', 'quarterly', 'annual')),
  
  -- Estado
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired', 'suspended', 'trial')),
  
  -- Fechas
  start_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  end_date TIMESTAMPTZ,
  trial_end_date TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  
  -- Pago
  payment_method TEXT,
  last_payment_date TIMESTAMPTZ,
  next_payment_date TIMESTAMPTZ,
  
  -- Código promocional usado
  promo_code_id UUID,
  discount_applied DECIMAL(5, 2) DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_plan_name ON subscriptions(plan_name);
CREATE INDEX IF NOT EXISTS idx_subscriptions_end_date ON subscriptions(end_date);

-- RLS Policies
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own subscriptions" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own subscriptions" ON subscriptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscriptions" ON subscriptions
  FOR UPDATE USING (auth.uid() = user_id);

-- ================================================================
-- TABLA: leads
-- Gestión de leads y contactos
-- ================================================================
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  
  -- Información de contacto
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  
  -- Origen y seguimiento
  source TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'closed', 'lost')),
  assigned_to UUID REFERENCES auth.users(id),
  
  -- Metadata
  metadata JSONB DEFAULT '{}'::jsonb,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);

-- RLS Policies
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all leads" ON leads
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ================================================================
-- TABLA: promo_codes
-- Códigos promocionales y descuentos
-- ================================================================
CREATE TABLE IF NOT EXISTS promo_codes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  
  -- Código
  code TEXT NOT NULL UNIQUE,
  description TEXT,
  
  -- Descuento
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value DECIMAL(10, 2) NOT NULL CHECK (discount_value > 0),
  
  -- Límites
  max_uses INTEGER,
  current_uses INTEGER DEFAULT 0,
  max_uses_per_user INTEGER DEFAULT 1,
  
  -- Validez
  valid_from TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  valid_until TIMESTAMPTZ,
  active BOOLEAN DEFAULT true,
  
  -- Restricciones
  applicable_plans TEXT[] DEFAULT '{}',
  minimum_purchase DECIMAL(10, 2),
  
  -- Auditoría
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_promo_codes_code ON promo_codes(code);
CREATE INDEX IF NOT EXISTS idx_promo_codes_active ON promo_codes(active);
CREATE INDEX IF NOT EXISTS idx_promo_codes_valid_until ON promo_codes(valid_until);

-- RLS Policies
ALTER TABLE promo_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active promo codes are viewable by everyone" ON promo_codes
  FOR SELECT USING (active = true AND NOW() BETWEEN valid_from AND COALESCE(valid_until, NOW() + INTERVAL '100 years'));

-- ================================================================
-- TABLA: reviews
-- Reseñas de profesionales por familias
-- ================================================================
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  
  -- Referencias
  appointment_id UUID REFERENCES appointments(id) ON DELETE CASCADE UNIQUE NOT NULL,
  professional_id UUID REFERENCES professionals(id) ON DELETE CASCADE NOT NULL,
  family_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Calificación
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  
  -- Aspectos específicos
  punctuality_rating INTEGER CHECK (punctuality_rating >= 1 AND punctuality_rating <= 5),
  professionalism_rating INTEGER CHECK (professionalism_rating >= 1 AND professionalism_rating <= 5),
  communication_rating INTEGER CHECK (communication_rating >= 1 AND communication_rating <= 5),
  
  -- Visibilidad
  visible BOOLEAN DEFAULT true,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_reviews_professional_id ON reviews(professional_id);
CREATE INDEX IF NOT EXISTS idx_reviews_family_id ON reviews(family_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);

-- RLS Policies
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reviews are viewable by everyone" ON reviews
  FOR SELECT USING (visible = true);

CREATE POLICY "Families can create reviews for their appointments" ON reviews
  FOR INSERT WITH CHECK (
    auth.uid() = family_id AND
    EXISTS (
      SELECT 1 FROM appointments 
      WHERE id = appointment_id AND family_id = auth.uid() AND status = 'completed'
    )
  );

-- ================================================================
-- FUNCIONES Y TRIGGERS
-- ================================================================

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger a todas las tablas
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_professionals_updated_at BEFORE UPDATE ON professionals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_promo_codes_updated_at BEFORE UPDATE ON promo_codes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Función para actualizar el rating del profesional cuando se crea una review
CREATE OR REPLACE FUNCTION update_professional_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE professionals
  SET 
    total_reviews = (SELECT COUNT(*) FROM reviews WHERE professional_id = NEW.professional_id),
    rating = (SELECT AVG(rating) FROM reviews WHERE professional_id = NEW.professional_id)
  WHERE id = NEW.professional_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_professional_rating_trigger
  AFTER INSERT OR UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_professional_rating();

-- Función para crear perfil automáticamente al registrarse
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'family')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para crear perfil al registrarse
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ================================================================
-- STORAGE BUCKETS CONFIGURATION
-- ================================================================

-- Nota: Los buckets deben crearse desde el dashboard de Supabase o mediante la API
-- Aquí se documentan las políticas que deben aplicarse

-- BUCKET: profile-images
-- Propósito: Fotos de perfil de usuarios
-- Políticas:
-- - SELECT: Público (cualquiera puede ver)
-- - INSERT: Solo usuarios autenticados pueden subir su propia foto
-- - UPDATE: Solo el propietario puede actualizar
-- - DELETE: Solo el propietario puede eliminar

-- BUCKET: professional-documents
-- Propósito: Documentos de verificación de profesionales (cédulas, licencias, certificados)
-- Políticas:
-- - SELECT: Solo el propietario y admins
-- - INSERT: Solo usuarios autenticados con rol 'professional'
-- - UPDATE: Solo el propietario
-- - DELETE: Solo el propietario

-- BUCKET: appointment-files
-- Propósito: Archivos relacionados con citas (reportes, recetas, etc.)
-- Políticas:
-- - SELECT: Solo participantes de la cita (familia y profesional)
-- - INSERT: Solo participantes de la cita
-- - UPDATE: Solo quien subió el archivo
-- - DELETE: Solo quien subió el archivo

-- ================================================================
-- CONFIGURACIÓN DE AUTENTICACIÓN
-- ================================================================

-- Configuración recomendada en Supabase Dashboard:
-- 
-- Email Auth:
-- - Enable Email Confirmations: YES
-- - Secure Email Change: YES
-- - Confirm Email Changeover Enabled: YES
-- 
-- Password Requirements:
-- - Minimum Length: 8 characters
-- - Require Uppercase: YES
-- - Require Lowercase: YES
-- - Require Numbers: YES
-- - Require Special Characters: NO (opcional)
-- 
-- Email Templates:
-- - Confirmation Email: Personalizado con branding de Hogar Belén
-- - Reset Password Email: Personalizado con instrucciones claras
-- - Magic Link Email: Personalizado (si se usa)
-- 
-- Redirect URLs:
-- - Site URL: https://hogarbelen.org
-- - Redirect URLs: 
--   * https://hogarbelen.org/auth/callback
--   * https://hogarbelen.org/auth/reset-password
--   * http://localhost:5173/auth/callback (desarrollo)
--   * http://localhost:5173/auth/reset-password (desarrollo)

-- ================================================================
-- ÍNDICES COMPUESTOS PARA QUERIES COMPLEJAS
-- ================================================================

CREATE INDEX IF NOT EXISTS idx_appointments_family_status_date 
  ON appointments(family_id, status, scheduled_date DESC);

CREATE INDEX IF NOT EXISTS idx_appointments_professional_status_date 
  ON appointments(professional_id, status, scheduled_date DESC);

CREATE INDEX IF NOT EXISTS idx_subscriptions_user_status_end 
  ON subscriptions(user_id, status, end_date);

-- ================================================================
-- VISTAS ÚTILES
-- ================================================================

-- Vista de profesionales con información completa
CREATE OR REPLACE VIEW professionals_full AS
SELECT 
  p.*,
  pr.full_name,
  pr.email,
  pr.phone,
  pr.photo_url
FROM professionals p
INNER JOIN profiles pr ON p.user_id = pr.id;

-- Vista de citas con información completa
CREATE OR REPLACE VIEW appointments_full AS
SELECT 
  a.*,
  pf.full_name as family_name,
  pf.email as family_email,
  pp.full_name as professional_name,
  pp.email as professional_email,
  pro.specialization,
  pro.hourly_rate
FROM appointments a
INNER JOIN profiles pf ON a.family_id = pf.id
INNER JOIN professionals pro ON a.professional_id = pro.id
INNER JOIN profiles pp ON pro.user_id = pp.id;

-- ================================================================
-- COMENTARIOS EN TABLAS
-- ================================================================

COMMENT ON TABLE profiles IS 'Perfiles base de usuarios (familias y profesionales)';
COMMENT ON TABLE professionals IS 'Información extendida de profesionales de salud';
COMMENT ON TABLE appointments IS 'Gestión de citas entre familias y profesionales';
COMMENT ON TABLE subscriptions IS 'Gestión de suscripciones y planes de usuarios';
COMMENT ON TABLE leads IS 'Gestión de leads y contactos desde formularios';
COMMENT ON TABLE promo_codes IS 'Códigos promocionales y descuentos';
COMMENT ON TABLE reviews IS 'Reseñas y calificaciones de profesionales';

-- ================================================================
-- FINALIZADO
-- ================================================================
