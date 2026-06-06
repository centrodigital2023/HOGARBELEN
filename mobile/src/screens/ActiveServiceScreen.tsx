/**
 * ActiveServiceScreen — pantalla del profesional durante el turno
 *
 * Muestra signos vitales en tiempo real leídos desde el wearable del paciente
 * y el botón SOS de emergencia (mantener 2 segundos para activar).
 */

import React, { useEffect, useState, useCallback } from 'react'
import {
  View, Text, TouchableOpacity, StyleSheet, Alert,
  Vibration, ScrollView, ActivityIndicator,
} from 'react-native'
import * as WearableService from '../services/WearableService'
import { supabase } from '../services/supabase'
import type { VitalSignsData, AlertResult } from '../types/wearables'
import { DEFAULT_THRESHOLDS } from '../types/wearables'

// ── Tipos de navegación ───────────────────────────────────────────────────────
interface RouteParams {
  serviceId: string
  patientId: string
  patientName: string
}

interface Props {
  route: { params: RouteParams }
  navigation: { navigate: (screen: string) => void }
}

// ── Colores ───────────────────────────────────────────────────────────────────
const COLORS = {
  primary:  '#0EA5E9',
  success:  '#22C55E',
  warning:  '#F59E0B',
  danger:   '#EF4444',
  bg:       '#F8FAFC',
  card:     '#FFFFFF',
  text:     '#0F172A',
  muted:    '#64748B',
  border:   '#E2E8F0',
}

// ── VitalCard ─────────────────────────────────────────────────────────────────
interface VitalCardProps {
  emoji: string
  label: string
  value: string
  isAlert?: boolean
}

function VitalCard({ emoji, label, value, isAlert = false }: VitalCardProps) {
  return (
    <View style={[styles.vitalCard, isAlert && styles.vitalCardAlert]}>
      <Text style={styles.vitalEmoji}>{emoji}</Text>
      <Text style={[styles.vitalValue, isAlert && styles.vitalValueAlert]}>
        {value}
      </Text>
      <Text style={styles.vitalLabel}>{label}</Text>
    </View>
  )
}

// ── Pantalla principal ────────────────────────────────────────────────────────
export default function ActiveServiceScreen({ route }: Props) {
  const { serviceId, patientId, patientName } = route.params

  const [vitals, setVitals] = useState<VitalSignsData | null>(null)
  const [alerts, setAlerts] = useState<AlertResult[]>([])
  const [permissionsGranted, setPermissionsGranted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [sosActive, setSosActive] = useState(false)
  const [syncStatus, setSyncStatus] = useState<'connecting' | 'live' | 'error'>('connecting')

  // ── Configurar permisos e iniciar sync ─────────────────────────────────
  useEffect(() => {
    async function setup() {
      setIsLoading(true)

      const granted = await WearableService.requestWearablePermissions()
      setPermissionsGranted(granted)

      if (granted) {
        try {
          const initialVitals = await WearableService.readCurrentVitals()
          setVitals(initialVitals)
          setSyncStatus('live')
        } catch {
          setSyncStatus('error')
        }

        const { data: user } = await supabase.auth.getUser()
        const professionalId = user?.user?.id ?? ''

        WearableService.initBackgroundVitalsSync(patientId, serviceId, professionalId)
      }

      setIsLoading(false)
    }

    setup()

    return () => {
      WearableService.stopBackgroundVitalsSync()
    }
  }, [patientId, serviceId])

  // ── Polling de vitales cada 10 segundos mientras la app está abierta ───
  useEffect(() => {
    if (!permissionsGranted) return

    const interval = setInterval(async () => {
      try {
        const thresholds = await WearableService.getPatientThresholds(patientId)
        const newVitals = await WearableService.readCurrentVitals()
        setVitals(newVitals)
        setSyncStatus('live')

        const newAlerts = WearableService.evaluateAlerts(
          newVitals,
          thresholds ?? DEFAULT_THRESHOLDS
        )
        setAlerts(newAlerts)

        if (newAlerts.length > 0) {
          Vibration.vibrate([0, 200, 100, 200])
        }
      } catch {
        setSyncStatus('error')
      }
    }, 10_000)

    return () => clearInterval(interval)
  }, [permissionsGranted, patientId])

  // ── Botón SOS manual ──────────────────────────────────────────────────
  const handleSOS = useCallback(async () => {
    Vibration.vibrate([0, 500, 200, 500, 200, 500])
    setSosActive(true)

    try {
      await WearableService.activateManualSOS(patientId, serviceId)
      Alert.alert(
        '🆘 SOS Activado',
        `La familia y el equipo Humanix fueron notificados con tu ubicación exacta.\n\nPaciente: ${patientName}`,
        [{ text: 'Entendido', onPress: () => setSosActive(false) }]
      )
    } catch {
      Alert.alert(
        'Error',
        'No se pudo enviar la alerta SOS. Verifica tu conexión e intenta de nuevo.',
        [{ text: 'Cerrar', onPress: () => setSosActive(false) }]
      )
    }
  }, [patientId, serviceId, patientName])

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Turno activo</Text>
        <Text style={styles.patientName}>{patientName}</Text>
        <View style={[
          styles.statusBadge,
          syncStatus === 'live'   && styles.statusLive,
          syncStatus === 'error'  && styles.statusError,
        ]}>
          <Text style={styles.statusText}>
            {syncStatus === 'connecting' ? '⏳ Conectando...'
              : syncStatus === 'live' ? '● EN VIVO'
              : '⚠ Sin señal'}
          </Text>
        </View>
      </View>

      {/* ── Cargando ────────────────────────────────────────────────────── */}
      {isLoading && (
        <View style={styles.loadingCard}>
          <ActivityIndicator color={COLORS.primary} size="large" />
          <Text style={styles.loadingText}>Solicitando permisos al wearable...</Text>
        </View>
      )}

      {/* ── Sin permisos ────────────────────────────────────────────────── */}
      {!isLoading && !permissionsGranted && (
        <View style={styles.warningCard}>
          <Text style={styles.warningTitle}>⚠️ Sin acceso a salud</Text>
          <Text style={styles.warningText}>
            Para leer datos del wearable:{'\n'}
            iOS: Ajustes → Salud → Humanix → Activar lectura{'\n'}
            Android: Configuración → Health Connect → Humanix
          </Text>
        </View>
      )}

      {/* ── Alertas activas ─────────────────────────────────────────────── */}
      {alerts.map((alert, i) => (
        <View key={i} style={styles.alertBanner}>
          <Text style={styles.alertText}>⚠️ {alert.message}</Text>
        </View>
      ))}

      {/* ── Tarjetas de signos vitales ──────────────────────────────────── */}
      {vitals && (
        <View style={styles.vitalsGrid}>
          <VitalCard
            emoji="❤️" label="FC"
            value={vitals.heart_rate !== null ? `${vitals.heart_rate} bpm` : '--'}
            isAlert={vitals.heart_rate !== null && vitals.heart_rate > 100}
          />
          <VitalCard
            emoji="🫁" label="SpO₂"
            value={vitals.oxygen_saturation !== null ? `${vitals.oxygen_saturation}%` : '--'}
            isAlert={vitals.oxygen_saturation !== null && vitals.oxygen_saturation < 92}
          />
          <VitalCard
            emoji="🌡️" label="Temp"
            value={vitals.temperature !== null ? `${vitals.temperature}°C` : '--'}
            isAlert={vitals.temperature !== null && vitals.temperature > 38}
          />
          <VitalCard
            emoji="🩺" label="Presión"
            value={
              vitals.systolic && vitals.diastolic
                ? `${vitals.systolic}/${vitals.diastolic}`
                : '--'
            }
          />
          <VitalCard
            emoji="🚶" label="Pasos"
            value={vitals.steps_today !== null
              ? vitals.steps_today.toLocaleString('es-CO')
              : '--'}
          />
          <VitalCard
            emoji="💨" label="Resp"
            value={vitals.respiratory_rate !== null
              ? `${vitals.respiratory_rate}/min`
              : '--'}
          />
        </View>
      )}

      {/* ── Dispositivo ─────────────────────────────────────────────────── */}
      {vitals?.device_name && (
        <Text style={styles.deviceInfo}>
          📡 Leyendo desde: {vitals.device_name}
        </Text>
      )}

      {/* ── Botón SOS ───────────────────────────────────────────────────── */}
      <TouchableOpacity
        style={[styles.sosButton, sosActive && styles.sosButtonActive]}
        onLongPress={handleSOS}
        delayLongPress={2000}
        activeOpacity={0.8}
      >
        <Text style={styles.sosEmoji}>🆘</Text>
        <Text style={styles.sosLabel}>Mantén 2 seg · SOS</Text>
        <Text style={styles.sosSubLabel}>
          Notifica a la familia con ubicación exacta
        </Text>
      </TouchableOpacity>

    </ScrollView>
  )
}

// ── Estilos ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container:   { flex: 1, backgroundColor: COLORS.bg },
  content:     { padding: 16, paddingBottom: 40 },

  header:      { alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 14, color: COLORS.muted, letterSpacing: 1 },
  patientName: { fontSize: 24, fontWeight: '700', color: COLORS.text, marginTop: 4 },

  statusBadge:    { marginTop: 8, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 99, backgroundColor: COLORS.border },
  statusLive:     { backgroundColor: '#DCFCE7' },
  statusError:    { backgroundColor: '#FEF2F2' },
  statusText:     { fontSize: 12, fontWeight: '600', color: COLORS.text },

  loadingCard:  { alignItems: 'center', padding: 32, gap: 12 },
  loadingText:  { color: COLORS.muted, textAlign: 'center' },

  warningCard:  { backgroundColor: '#FFFBEB', borderWidth: 1, borderColor: '#FDE68A', borderRadius: 12, padding: 16, marginBottom: 16 },
  warningTitle: { fontWeight: '700', color: '#92400E', marginBottom: 6 },
  warningText:  { fontSize: 13, color: '#92400E', lineHeight: 20 },

  alertBanner:  { backgroundColor: '#FEF2F2', borderWidth: 1, borderColor: '#FCA5A5', borderRadius: 10, padding: 12, marginBottom: 8 },
  alertText:    { color: '#991B1B', fontWeight: '600', fontSize: 13 },

  vitalsGrid:   { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 },

  vitalCard:      {
    width: '47%', backgroundColor: COLORS.card,
    borderRadius: 14, padding: 14, alignItems: 'center',
    borderWidth: 1, borderColor: COLORS.border,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, elevation: 2,
  },
  vitalCardAlert: { borderColor: COLORS.danger, backgroundColor: '#FEF2F2' },
  vitalEmoji:     { fontSize: 22 },
  vitalValue:     { fontSize: 22, fontWeight: '700', color: COLORS.text, marginTop: 4 },
  vitalValueAlert:{ color: COLORS.danger },
  vitalLabel:     { fontSize: 11, color: COLORS.muted, marginTop: 2, fontWeight: '500' },

  deviceInfo:   { textAlign: 'center', color: COLORS.muted, fontSize: 12, marginBottom: 20 },

  sosButton: {
    backgroundColor: COLORS.danger, borderRadius: 18,
    padding: 24, alignItems: 'center', marginTop: 8,
    shadowColor: COLORS.danger, shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 }, shadowRadius: 12, elevation: 8,
  },
  sosButtonActive: { backgroundColor: '#991B1B', transform: [{ scale: 0.97 }] },
  sosEmoji:      { fontSize: 40 },
  sosLabel:      { fontSize: 18, fontWeight: '800', color: '#FFFFFF', marginTop: 8 },
  sosSubLabel:   { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 4, textAlign: 'center' },
})
