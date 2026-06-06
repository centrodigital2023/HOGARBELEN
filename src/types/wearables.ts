export type AlertType =
  | 'high_heart_rate'
  | 'low_heart_rate'
  | 'low_oxygen'
  | 'fall_detected'
  | 'high_temperature'
  | 'inactivity'
  | 'sos_manual'

export type VitalSource = 'apple_health' | 'google_health' | 'manual' | 'wearable'

export interface VitalSigns {
  id: string
  patient_id: string
  service_id: string | null
  professional_id: string | null
  heart_rate: number | null
  systolic: number | null
  diastolic: number | null
  oxygen_saturation: number | null
  temperature: number | null
  respiratory_rate: number | null
  blood_glucose: number | null
  steps_today: number | null
  source: VitalSource
  device_name: string | null
  latitude: number | null
  longitude: number | null
  is_alert: boolean
  alert_type: AlertType | null
  alert_message: string | null
  alert_resolved: boolean
  recorded_at: string
  created_at: string
}

export type SOSTriggeredBy =
  | 'patient_manual'
  | 'family_manual'
  | 'auto_fall'
  | 'auto_heart_rate'
  | 'auto_oxygen'
  | 'auto_inactivity'

export type SOSStatus = 'active' | 'acknowledged' | 'resolved'

export interface SOSEvent {
  id: string
  patient_id: string
  service_id: string | null
  triggered_by: SOSTriggeredBy
  latitude: number | null
  longitude: number | null
  address_resolved: string | null
  vital_signs_snapshot: Partial<VitalSigns> | null
  status: SOSStatus
  resolved_by: string | null
  resolved_at: string | null
  resolution_note: string | null
  created_at: string
}

export interface PatientThresholds {
  id: string
  patient_id: string
  family_id: string
  hr_min: number
  hr_max: number
  o2_min: number
  temp_max: number
  inactivity_minutes: number
  notify_whatsapp: boolean
  notify_email: boolean
  notify_push: boolean
  emergency_contact_name: string | null
  emergency_contact_phone: string | null
  created_at: string
  updated_at: string
}

export type VitalStatus = 'normal' | 'warning' | 'danger' | 'unknown'

export function getHeartRateStatus(hr: number | null, thresholds?: Partial<PatientThresholds>): VitalStatus {
  if (hr === null) return 'unknown'
  const min = thresholds?.hr_min ?? 50
  const max = thresholds?.hr_max ?? 100
  if (hr < min || hr > max) return 'danger'
  if (hr < 60 || hr > 90) return 'warning'
  return 'normal'
}

export function getOxygenStatus(o2: number | null, thresholds?: Partial<PatientThresholds>): VitalStatus {
  if (o2 === null) return 'unknown'
  const min = thresholds?.o2_min ?? 92
  if (o2 < min) return 'danger'
  if (o2 < 95) return 'warning'
  return 'normal'
}

export function getTemperatureStatus(temp: number | null, thresholds?: Partial<PatientThresholds>): VitalStatus {
  if (temp === null) return 'unknown'
  const max = thresholds?.temp_max ?? 38.0
  if (temp > max + 0.5) return 'danger'
  if (temp > max) return 'warning'
  return 'normal'
}

export function getBloodPressureStatus(sys: number | null, dia: number | null): VitalStatus {
  if (sys === null || dia === null) return 'unknown'
  if (sys >= 140 || dia >= 90) return 'danger'
  if (sys >= 130 || dia >= 85) return 'warning'
  return 'normal'
}

export const ALERT_LABELS: Record<AlertType, string> = {
  high_heart_rate: 'FC alta',
  low_heart_rate: 'FC baja',
  low_oxygen: 'SpO₂ baja',
  fall_detected: 'Caída detectada',
  high_temperature: 'Temperatura alta',
  inactivity: 'Inactividad',
  sos_manual: 'SOS manual',
}

export const SOS_TRIGGER_LABELS: Record<SOSTriggeredBy, string> = {
  patient_manual: 'Paciente presionó SOS',
  family_manual: 'Familia activó SOS',
  auto_fall: 'Caída detectada automáticamente',
  auto_heart_rate: 'FC anormal detectada',
  auto_oxygen: 'SpO₂ crítica detectada',
  auto_inactivity: 'Inactividad prolongada',
}

export const DEMO_VITALS: VitalSigns = {
  id: 'demo-001',
  patient_id: 'demo-patient',
  service_id: 'demo-service',
  professional_id: null,
  heart_rate: 74,
  systolic: 118,
  diastolic: 78,
  oxygen_saturation: 97,
  temperature: 36.6,
  respiratory_rate: 16,
  blood_glucose: null,
  steps_today: 3842,
  source: 'apple_health',
  device_name: 'Apple Watch Series 9 (Demo)',
  latitude: 1.2136,
  longitude: -77.2811,
  is_alert: false,
  alert_type: null,
  alert_message: null,
  alert_resolved: false,
  recorded_at: new Date().toISOString(),
  created_at: new Date().toISOString(),
}

function jitter(base: number, range: number): number {
  return Math.round((base + (Math.random() - 0.5) * range) * 10) / 10
}

export function generateDemoHistory(count = 20): VitalSigns[] {
  const now = Date.now()
  return Array.from({ length: count }, (_, i) => ({
    ...DEMO_VITALS,
    id: `demo-hist-${i}`,
    heart_rate: Math.round(jitter(74, 14)),
    oxygen_saturation: Math.round(jitter(97, 4)),
    temperature: jitter(36.6, 0.6),
    systolic: Math.round(jitter(118, 16)),
    diastolic: Math.round(jitter(78, 10)),
    steps_today: Math.round(jitter(3842, 400)),
    recorded_at: new Date(now - (count - i) * 2 * 60 * 1000).toISOString(),
  }))
}
