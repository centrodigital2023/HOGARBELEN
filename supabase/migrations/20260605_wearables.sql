-- ═══════════════════════════════════════════════════════════════════
-- HUMANIX — Módulo de signos vitales, wearables y botón SOS
-- Migración: 20260605_wearables.sql
-- Ejecutar en: Supabase Dashboard → SQL Editor → Run
-- ═══════════════════════════════════════════════════════════════════

-- ── Tabla de servicios (turno activo) ───────────────────────────────────────
-- Nota: esta tabla puede ya existir en tu proyecto. Si existe, omite este bloque.
CREATE TABLE IF NOT EXISTS services (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id       UUID REFERENCES profiles(id) NOT NULL,
  professional_id UUID REFERENCES profiles(id),
  patient_id      UUID REFERENCES profiles(id) NOT NULL,
  status          TEXT DEFAULT 'active' CHECK (status IN ('active','completed','cancelled')),
  started_at      TIMESTAMPTZ DEFAULT NOW(),
  ended_at        TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── Signos vitales ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS vital_signs (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id        UUID REFERENCES profiles(id) NOT NULL,
  service_id        UUID REFERENCES services(id),
  professional_id   UUID REFERENCES profiles(id),

  -- Signos
  heart_rate          INTEGER,
  systolic            INTEGER,
  diastolic           INTEGER,
  oxygen_saturation   INTEGER,
  temperature         DECIMAL(4,1),
  respiratory_rate    INTEGER,
  blood_glucose       DECIMAL(5,1),
  steps_today         INTEGER,

  -- Fuente del dato
  source      TEXT DEFAULT 'wearable'
    CHECK (source IN ('apple_health','google_health','manual','wearable')),
  device_name TEXT,

  -- Geolocalización
  latitude    DECIMAL(10,8),
  longitude   DECIMAL(11,8),

  -- Alertas
  is_alert        BOOLEAN DEFAULT false,
  alert_type      TEXT CHECK (alert_type IN (
    'high_heart_rate','low_heart_rate','low_oxygen',
    'fall_detected','high_temperature','inactivity','sos_manual'
  )),
  alert_message   TEXT,
  alert_resolved  BOOLEAN DEFAULT false,

  recorded_at TIMESTAMPTZ DEFAULT NOW(),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── Umbrales personalizados por paciente ────────────────────────────────────
CREATE TABLE IF NOT EXISTS patient_thresholds (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES profiles(id) UNIQUE NOT NULL,
  family_id  UUID REFERENCES profiles(id) NOT NULL,

  hr_min             INTEGER     DEFAULT 50,
  hr_max             INTEGER     DEFAULT 100,
  o2_min             INTEGER     DEFAULT 92,
  temp_max           DECIMAL(3,1) DEFAULT 38.0,
  inactivity_minutes INTEGER     DEFAULT 120,

  notify_whatsapp BOOLEAN DEFAULT true,
  notify_email    BOOLEAN DEFAULT false,
  notify_push     BOOLEAN DEFAULT true,

  emergency_contact_name  TEXT,
  emergency_contact_phone TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── Eventos SOS ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS sos_events (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES profiles(id) NOT NULL,
  service_id UUID REFERENCES services(id),

  triggered_by TEXT NOT NULL CHECK (triggered_by IN (
    'patient_manual','family_manual','auto_fall',
    'auto_heart_rate','auto_oxygen','auto_inactivity'
  )),

  latitude         DECIMAL(10,8),
  longitude        DECIMAL(11,8),
  address_resolved TEXT,
  vital_signs_snapshot JSONB,

  status TEXT DEFAULT 'active'
    CHECK (status IN ('active','acknowledged','resolved')),
  resolved_by   UUID REFERENCES profiles(id),
  resolved_at   TIMESTAMPTZ,
  resolution_note TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── Índices ─────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_vitals_patient_time
  ON vital_signs (patient_id, recorded_at DESC);

CREATE INDEX IF NOT EXISTS idx_vitals_alerts
  ON vital_signs (is_alert, alert_resolved)
  WHERE is_alert = true;

CREATE INDEX IF NOT EXISTS idx_sos_active
  ON sos_events (status)
  WHERE status = 'active';

CREATE INDEX IF NOT EXISTS idx_sos_patient
  ON sos_events (patient_id, created_at DESC);

-- ── Vista para el panel en tiempo real ──────────────────────────────────────
CREATE OR REPLACE VIEW latest_vital_signs AS
SELECT DISTINCT ON (patient_id)
  patient_id, heart_rate, systolic, diastolic,
  oxygen_saturation, temperature, respiratory_rate,
  steps_today, is_alert, alert_type, alert_message,
  device_name, source, latitude, longitude, recorded_at
FROM vital_signs
ORDER BY patient_id, recorded_at DESC;

-- ── Row Level Security ───────────────────────────────────────────────────────
ALTER TABLE vital_signs        ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_thresholds ENABLE ROW LEVEL SECURITY;
ALTER TABLE sos_events         ENABLE ROW LEVEL SECURITY;

-- Profesional puede insertar signos vitales
DROP POLICY IF EXISTS "pro_insert_vitals" ON vital_signs;
CREATE POLICY "pro_insert_vitals" ON vital_signs FOR INSERT
  WITH CHECK (professional_id = auth.uid());

-- Familia puede leer signos de sus pacientes (vía services)
DROP POLICY IF EXISTS "family_read_vitals" ON vital_signs;
CREATE POLICY "family_read_vitals" ON vital_signs FOR SELECT
  USING (
    patient_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM services s
      WHERE s.id = service_id AND s.family_id = auth.uid()
    )
  );

-- Familia gestiona sus propios umbrales
DROP POLICY IF EXISTS "family_own_thresholds" ON patient_thresholds;
CREATE POLICY "family_own_thresholds" ON patient_thresholds
  USING  (family_id = auth.uid())
  WITH CHECK (family_id = auth.uid());

-- Lectura SOS: paciente, familia o profesional del turno
DROP POLICY IF EXISTS "sos_read" ON sos_events;
CREATE POLICY "sos_read" ON sos_events FOR SELECT
  USING (
    patient_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM services s
      WHERE s.id = service_id
        AND (s.family_id = auth.uid() OR s.professional_id = auth.uid())
    )
  );

-- Inserción SOS: cualquier usuario autenticado puede abrir SOS
DROP POLICY IF EXISTS "sos_insert" ON sos_events;
CREATE POLICY "sos_insert" ON sos_events FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Resolución SOS: familia o profesional del turno
DROP POLICY IF EXISTS "sos_update" ON sos_events;
CREATE POLICY "sos_update" ON sos_events FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM services s
      WHERE s.id = service_id
        AND (s.family_id = auth.uid() OR s.professional_id = auth.uid())
    )
  );

-- ── Función helper: actualizar updated_at ───────────────────────────────────
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS set_patient_thresholds_updated_at ON patient_thresholds;
CREATE TRIGGER set_patient_thresholds_updated_at
  BEFORE UPDATE ON patient_thresholds
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- ── Enable Realtime para el panel familiar ───────────────────────────────────
-- Activa las tablas para Supabase Realtime (necesario para el panel en vivo)
DO $$
BEGIN
  -- vital_signs: el panel familiar escucha INSERTs en tiempo real
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND tablename = 'vital_signs'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE vital_signs;
  END IF;

  -- sos_events: alerta instantánea cuando se activa un SOS
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND tablename = 'sos_events'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE sos_events;
  END IF;
END $$;
