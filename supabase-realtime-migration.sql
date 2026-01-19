-- ================================================================
-- HOGAR BELÉN - SUPABASE REALTIME MIGRATION
-- ================================================================
-- Migración para agregar columnas de aprobación y configurar
-- Realtime para sincronización automática
-- ================================================================

-- Agregar columnas de aprobación a professionals si no existen
ALTER TABLE professionals 
  ADD COLUMN IF NOT EXISTS approved_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS approved_by UUID REFERENCES auth.users(id);

-- Agregar columnas de aprobación a job_offers si no existen
ALTER TABLE job_offers 
  ADD COLUMN IF NOT EXISTS approved_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS approved_by UUID REFERENCES auth.users(id);

-- Crear índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_professionals_verification_status ON professionals(verification_status);
CREATE INDEX IF NOT EXISTS idx_professionals_approved_at ON professionals(approved_at);
CREATE INDEX IF NOT EXISTS idx_job_offers_estado ON job_offers(estado);
CREATE INDEX IF NOT EXISTS idx_job_offers_approved_at ON job_offers(approved_at);

-- ================================================================
-- CONFIGURACIÓN DE REALTIME
-- ================================================================

-- Habilitar Realtime para professionals
ALTER PUBLICATION supabase_realtime ADD TABLE professionals;

-- Habilitar Realtime para job_offers
ALTER PUBLICATION supabase_realtime ADD TABLE job_offers;

-- ================================================================
-- FUNCIONES PARA APROBACIÓN AUTOMÁTICA
-- ================================================================

-- Función para aprobar profesional
CREATE OR REPLACE FUNCTION approve_professional(
  professional_id UUID,
  admin_user_id UUID
)
RETURNS VOID AS $$
BEGIN
  UPDATE professionals
  SET 
    verification_status = 'approved',
    verified = true,
    approved_at = NOW(),
    approved_by = admin_user_id,
    verification_date = NOW()
  WHERE id = professional_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para rechazar profesional
CREATE OR REPLACE FUNCTION reject_professional(
  professional_id UUID,
  admin_user_id UUID,
  reason TEXT
)
RETURNS VOID AS $$
BEGIN
  UPDATE professionals
  SET 
    verification_status = 'rejected',
    verified = false,
    approved_by = admin_user_id,
    rejection_reason = reason,
    verification_date = NOW()
  WHERE id = professional_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para aprobar oferta de trabajo
CREATE OR REPLACE FUNCTION approve_job_offer(
  offer_id UUID,
  admin_user_id UUID
)
RETURNS VOID AS $$
BEGIN
  UPDATE job_offers
  SET 
    estado = 'aprobada',
    approved_at = NOW(),
    approved_by = admin_user_id,
    fecha_publicacion = NOW()
  WHERE id = offer_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para rechazar oferta de trabajo
CREATE OR REPLACE FUNCTION reject_job_offer(
  offer_id UUID,
  admin_user_id UUID,
  reason TEXT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
  UPDATE job_offers
  SET 
    estado = 'rechazada',
    approved_by = admin_user_id
  WHERE id = offer_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ================================================================
-- POLÍTICAS RLS ACTUALIZADAS
-- ================================================================

-- Políticas para professionals - solo admins pueden aprobar
CREATE POLICY IF NOT EXISTS "Admins can approve professionals" ON professionals
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Políticas para job_offers - solo admins pueden aprobar
CREATE POLICY IF NOT EXISTS "Admins can approve job offers" ON job_offers
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Vista pública solo ve profesionales aprobados
CREATE POLICY IF NOT EXISTS "Public can view approved professionals only" ON professionals
  FOR SELECT USING (verification_status = 'approved' OR auth.uid() = user_id);

-- Vista pública solo ve ofertas aprobadas
CREATE POLICY IF NOT EXISTS "Public can view approved job offers only" ON job_offers
  FOR SELECT USING (estado = 'aprobada' OR auth.uid() = user_id);

-- ================================================================
-- TRIGGERS PARA NOTIFICACIONES
-- ================================================================

-- Trigger para notificar cuando se aprueba un profesional
CREATE OR REPLACE FUNCTION notify_professional_approved()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.verification_status = 'approved' AND OLD.verification_status != 'approved' THEN
    PERFORM pg_notify(
      'professional_approved',
      json_build_object(
        'id', NEW.id,
        'user_id', NEW.user_id,
        'approved_at', NEW.approved_at,
        'approved_by', NEW.approved_by
      )::text
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_notify_professional_approved
  AFTER UPDATE ON professionals
  FOR EACH ROW
  EXECUTE FUNCTION notify_professional_approved();

-- Trigger para notificar cuando se aprueba una oferta
CREATE OR REPLACE FUNCTION notify_job_offer_approved()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.estado = 'aprobada' AND OLD.estado != 'aprobada' THEN
    PERFORM pg_notify(
      'job_offer_approved',
      json_build_object(
        'id', NEW.id,
        'user_id', NEW.user_id,
        'approved_at', NEW.approved_at,
        'approved_by', NEW.approved_by
      )::text
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_notify_job_offer_approved
  AFTER UPDATE ON job_offers
  FOR EACH ROW
  EXECUTE FUNCTION notify_job_offer_approved();

-- ================================================================
-- COMENTARIOS PARA DOCUMENTACIÓN
-- ================================================================

COMMENT ON FUNCTION approve_professional IS 'Aprueba un profesional y actualiza su estado a approved';
COMMENT ON FUNCTION reject_professional IS 'Rechaza un profesional con una razón específica';
COMMENT ON FUNCTION approve_job_offer IS 'Aprueba una oferta de trabajo y la hace pública';
COMMENT ON FUNCTION reject_job_offer IS 'Rechaza una oferta de trabajo';
