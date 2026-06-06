/**
 * WearableService — corazón del módulo móvil Humanix
 *
 * Lee signos vitales desde Apple HealthKit (iOS) o Google Health Connect (Android),
 * evalúa alertas contra umbrales del paciente y sincroniza con Supabase cada 2 minutos
 * en segundo plano, incluso con la app cerrada.
 *
 * Sin Terra. Sin Vital. Sin costo de agregador. El teléfono ES el agregador.
 */

import { Platform } from 'react-native'
import AppleHealthKit, {
  type HealthKitPermissions,
} from 'react-native-health'
import { initialize, readRecords } from 'react-native-health-connect'
import BackgroundFetch from 'react-native-background-fetch'
import Geolocation from '@react-native-community/geolocation'
import { supabase } from './supabase'
import type {
  VitalSignsData, AlertResult, PatientThresholds,
} from '../types/wearables'

// ── Permisos HealthKit (iOS) ─────────────────────────────────────────────────
const IOS_PERMISSIONS: HealthKitPermissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.HeartRate,
      AppleHealthKit.Constants.Permissions.HeartRateVariability,
      AppleHealthKit.Constants.Permissions.OxygenSaturation,
      AppleHealthKit.Constants.Permissions.BodyTemperature,
      AppleHealthKit.Constants.Permissions.StepCount,
      AppleHealthKit.Constants.Permissions.RespiratoryRate,
      AppleHealthKit.Constants.Permissions.BloodPressureSystolic,
      AppleHealthKit.Constants.Permissions.BloodPressureDiastolic,
    ],
    write: [],
  },
}

// ── Solicitar permisos ────────────────────────────────────────────────────────
export async function requestWearablePermissions(): Promise<boolean> {
  try {
    if (Platform.OS === 'ios') {
      return new Promise(resolve => {
        AppleHealthKit.initHealthKit(IOS_PERMISSIONS, err => resolve(!err))
      })
    }
    if (Platform.OS === 'android') {
      return await initialize()
    }
    return false
  } catch {
    return false
  }
}

// ── Leer signos vitales actuales ─────────────────────────────────────────────
export async function readCurrentVitals(): Promise<VitalSignsData> {
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
  const now = new Date()

  const vitals: VitalSignsData = {
    heart_rate: null,
    systolic: null,
    diastolic: null,
    oxygen_saturation: null,
    temperature: null,
    respiratory_rate: null,
    steps_today: null,
    device_name: null,
    source: Platform.OS === 'ios' ? 'apple_health' : 'google_health',
  }

  if (Platform.OS === 'ios') {
    const opts = {
      startDate: fiveMinutesAgo.toISOString(),
      endDate: now.toISOString(),
      limit: 1,
    }

    vitals.heart_rate = await new Promise(resolve => {
      AppleHealthKit.getHeartRateSamples(opts, (err, results) => {
        if (err || !results.length) return resolve(null)
        vitals.device_name = results[0].sourceId?.includes('Watch')
          ? `Apple Watch (${results[0].sourceId})`
          : 'iPhone'
        resolve(Math.round(results[0].value))
      })
    })

    vitals.oxygen_saturation = await new Promise(resolve => {
      AppleHealthKit.getOxygenSaturationSamples(opts, (err, results) => {
        if (err || !results.length) return resolve(null)
        // HealthKit devuelve 0–1; multiplicar × 100
        resolve(Math.round(results[0].value * 100))
      })
    })

    vitals.temperature = await new Promise(resolve => {
      AppleHealthKit.getBodyTemperatureSamples(opts, (err, results) => {
        if (err || !results.length) return resolve(null)
        resolve(Math.round(results[0].value * 10) / 10)
      })
    })

    vitals.respiratory_rate = await new Promise(resolve => {
      AppleHealthKit.getRespiratoryRateSamples(opts, (err, results) => {
        if (err || !results.length) return resolve(null)
        resolve(Math.round(results[0].value))
      })
    })

    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)
    vitals.steps_today = await new Promise(resolve => {
      AppleHealthKit.getStepCount(
        { startDate: todayStart.toISOString(), endDate: now.toISOString() },
        (err, res) => resolve(err ? null : Math.round(res.value))
      )
    })

    vitals.systolic = await new Promise(resolve => {
      AppleHealthKit.getBloodPressureSamples(opts, (err, results) => {
        if (err || !results.length) return resolve(null)
        resolve(results[0].bloodPressureSystolicValue ?? null)
      })
    })

    vitals.diastolic = await new Promise(resolve => {
      AppleHealthKit.getBloodPressureSamples(opts, (err, results) => {
        if (err || !results.length) return resolve(null)
        resolve(results[0].bloodPressureDiastolicValue ?? null)
      })
    })

  } else if (Platform.OS === 'android') {
    const timeFilter = {
      timeRangeFilter: {
        operator: 'between' as const,
        startTime: fiveMinutesAgo.toISOString(),
        endTime: now.toISOString(),
      },
    }

    const hrRecords = await readRecords('HeartRate', timeFilter)
    if (hrRecords.records.length > 0) {
      const last = hrRecords.records[hrRecords.records.length - 1]
      vitals.heart_rate = last.samples[0]?.beatsPerMinute ?? null
      vitals.device_name = (last.metadata?.dataOrigin as string | undefined)
        ?? 'Android Wearable'
    }

    const spo2Records = await readRecords('OxygenSaturation', timeFilter)
    if (spo2Records.records.length > 0) {
      vitals.oxygen_saturation = Math.round(
        spo2Records.records[spo2Records.records.length - 1].percentage
      )
    }

    const tempRecords = await readRecords('BodyTemperature', timeFilter)
    if (tempRecords.records.length > 0) {
      vitals.temperature =
        Math.round(tempRecords.records[tempRecords.records.length - 1].temperature.inCelsius * 10) / 10
    }

    const respRecords = await readRecords('RespiratoryRate', timeFilter)
    if (respRecords.records.length > 0) {
      vitals.respiratory_rate = Math.round(
        respRecords.records[respRecords.records.length - 1].rate
      )
    }

    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)
    const stepsRecords = await readRecords('Steps', {
      timeRangeFilter: {
        operator: 'between',
        startTime: todayStart.toISOString(),
        endTime: now.toISOString(),
      },
    })
    vitals.steps_today = stepsRecords.records.reduce(
      (acc, r) => acc + r.count, 0
    ) || null

    const bpRecords = await readRecords('BloodPressure', timeFilter)
    if (bpRecords.records.length > 0) {
      const last = bpRecords.records[bpRecords.records.length - 1]
      vitals.systolic  = Math.round(last.systolic.inMillimetersOfMercury)
      vitals.diastolic = Math.round(last.diastolic.inMillimetersOfMercury)
    }
  }

  return vitals
}

// ── Obtener ubicación GPS ─────────────────────────────────────────────────────
export function getCurrentLocation(): Promise<{ latitude: number; longitude: number } | null> {
  return new Promise(resolve => {
    Geolocation.getCurrentPosition(
      pos => resolve({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
      () => resolve(null),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 30000 }
    )
  })
}

// ── Evaluar alertas contra umbrales ──────────────────────────────────────────
export function evaluateAlerts(
  vitals: VitalSignsData,
  thresholds: PatientThresholds
): AlertResult[] {
  const alerts: AlertResult[] = []

  if (vitals.heart_rate !== null) {
    if (vitals.heart_rate > thresholds.hr_max)
      alerts.push({ type: 'high_heart_rate',
        message: `FC alta: ${vitals.heart_rate} bpm (máx configurado: ${thresholds.hr_max})` })
    else if (vitals.heart_rate < thresholds.hr_min)
      alerts.push({ type: 'low_heart_rate',
        message: `FC baja: ${vitals.heart_rate} bpm (mín configurado: ${thresholds.hr_min})` })
  }

  if (vitals.oxygen_saturation !== null && vitals.oxygen_saturation < thresholds.o2_min)
    alerts.push({ type: 'low_oxygen',
      message: `SpO₂ baja: ${vitals.oxygen_saturation}% (mín: ${thresholds.o2_min}%)` })

  if (vitals.temperature !== null && vitals.temperature > thresholds.temp_max)
    alerts.push({ type: 'high_temperature',
      message: `Temperatura: ${vitals.temperature}°C (máx: ${thresholds.temp_max}°C)` })

  return alerts
}

// ── Obtener umbrales del paciente desde Supabase ─────────────────────────────
export async function getPatientThresholds(
  patientId: string
): Promise<PatientThresholds | null> {
  const { data } = await supabase
    .from('patient_thresholds')
    .select('*')
    .eq('patient_id', patientId)
    .single()
  return data as PatientThresholds | null
}

// ── Enviar vitales al backend ─────────────────────────────────────────────────
export async function sendVitalsToBackend(
  patientId: string,
  serviceId: string,
  professionalId: string,
  vitals: VitalSignsData,
  location: { latitude: number; longitude: number } | null,
  alerts: AlertResult[]
): Promise<void> {
  const hasAlert = alerts.length > 0

  const { error } = await supabase.from('vital_signs').insert({
    patient_id: patientId,
    service_id: serviceId,
    professional_id: professionalId,
    ...vitals,
    latitude: location?.latitude ?? null,
    longitude: location?.longitude ?? null,
    is_alert: hasAlert,
    alert_type: hasAlert ? alerts[0].type : null,
    alert_message: hasAlert
      ? alerts.map(a => a.message).join(' | ')
      : null,
    recorded_at: new Date().toISOString(),
  })

  if (error) throw new Error(`Error insertando vitales: ${error.message}`)

  // Si hay alerta crítica (oxígeno bajo, FC extrema, caída), abrir SOS automático
  const CRITICAL: string[] = ['low_oxygen', 'high_heart_rate', 'fall_detected']
  if (hasAlert && alerts.some(a => CRITICAL.includes(a.type))) {
    await supabase.from('sos_events').insert({
      patient_id: patientId,
      service_id: serviceId,
      triggered_by: `auto_${alerts[0].type}`,
      latitude: location?.latitude ?? null,
      longitude: location?.longitude ?? null,
      vital_signs_snapshot: vitals,
      status: 'active',
    })
  }
}

// ── Tarea en segundo plano (cada 2 minutos durante turno activo) ──────────────
export function initBackgroundVitalsSync(
  patientId: string,
  serviceId: string,
  professionalId: string
): void {
  BackgroundFetch.configure(
    {
      minimumFetchInterval: 2,   // cada 2 minutos
      stopOnTerminate: false,    // continúa aunque se cierre la app
      startOnBoot: true,
      enableHeadless: true,
      requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY,
    },
    async (taskId: string) => {
      try {
        const [vitals, location, thresholds] = await Promise.all([
          readCurrentVitals(),
          getCurrentLocation(),
          getPatientThresholds(patientId),
        ])

        const { DEFAULT_THRESHOLDS } = await import('../types/wearables')
        const effectiveThresholds = thresholds ?? DEFAULT_THRESHOLDS
        const alerts = evaluateAlerts(vitals, effectiveThresholds)

        await sendVitalsToBackend(
          patientId, serviceId, professionalId, vitals, location, alerts
        )
      } catch (err) {
        console.error('[Humanix] Background sync error:', err)
      } finally {
        BackgroundFetch.finish(taskId)
      }
    },
    (taskId: string) => {
      // Timeout: el SO necesita que finalicemos la tarea
      BackgroundFetch.finish(taskId)
    }
  )

  BackgroundFetch.start()
}

// ── Detener sync al finalizar turno ──────────────────────────────────────────
export function stopBackgroundVitalsSync(): void {
  BackgroundFetch.stop()
}

// ── Activar SOS manual desde el profesional/paciente ─────────────────────────
export async function activateManualSOS(
  patientId: string,
  serviceId: string
): Promise<void> {
  const [vitals, location] = await Promise.all([
    readCurrentVitals(),
    getCurrentLocation(),
  ])

  await supabase.from('sos_events').insert({
    patient_id: patientId,
    service_id: serviceId,
    triggered_by: 'patient_manual',
    latitude: location?.latitude ?? null,
    longitude: location?.longitude ?? null,
    vital_signs_snapshot: vitals,
    status: 'active',
  })
}
