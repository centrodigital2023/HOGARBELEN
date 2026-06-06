// Tipos compartidos entre web y móvil — mantener sincronizados con src/types/wearables.ts

export type AlertType =
  | 'high_heart_rate' | 'low_heart_rate' | 'low_oxygen'
  | 'fall_detected' | 'high_temperature' | 'inactivity' | 'sos_manual'

export type VitalSource = 'apple_health' | 'google_health' | 'manual' | 'wearable'

export interface VitalSignsData {
  heart_rate: number | null
  systolic: number | null
  diastolic: number | null
  oxygen_saturation: number | null
  temperature: number | null
  respiratory_rate: number | null
  steps_today: number | null
  device_name: string | null
  source: VitalSource
}

export interface AlertResult {
  type: AlertType
  message: string
}

export interface PatientThresholds {
  hr_min: number
  hr_max: number
  o2_min: number
  temp_max: number
  inactivity_minutes: number
  emergency_contact_phone: string | null
  notify_whatsapp: boolean
  notify_push: boolean
}

export const DEFAULT_THRESHOLDS: PatientThresholds = {
  hr_min: 50,
  hr_max: 100,
  o2_min: 92,
  temp_max: 38.0,
  inactivity_minutes: 120,
  emergency_contact_phone: null,
  notify_whatsapp: true,
  notify_push: true,
}
