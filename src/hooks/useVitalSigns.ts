import { useState, useEffect, useRef, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import type { VitalSigns, SOSEvent, PatientThresholds } from '../types/wearables'
import { DEMO_VITALS, generateDemoHistory } from '../types/wearables'

const IS_DEMO = !import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.VITE_SUPABASE_URL === 'https://placeholder.supabase.co'

interface UseVitalSignsOptions {
  patientId: string
  serviceId?: string
  demoMode?: boolean
}

interface UseVitalSignsReturn {
  latest: VitalSigns | null
  history: VitalSigns[]
  sosEvents: SOSEvent[]
  thresholds: PatientThresholds | null
  isConnected: boolean
  isLoading: boolean
  error: string | null
  activateSOS: (triggeredBy: 'family_manual') => Promise<void>
  resolveSOS: (sosId: string) => Promise<void>
  refetch: () => void
}

export function useVitalSigns({
  patientId,
  serviceId,
  demoMode,
}: UseVitalSignsOptions): UseVitalSignsReturn {
  const demo = demoMode ?? IS_DEMO

  const [latest, setLatest] = useState<VitalSigns | null>(demo ? DEMO_VITALS : null)
  const [history, setHistory] = useState<VitalSigns[]>(demo ? generateDemoHistory() : [])
  const [sosEvents, setSosEvents] = useState<SOSEvent[]>([])
  const [thresholds, setThresholds] = useState<PatientThresholds | null>(null)
  const [isConnected, setIsConnected] = useState(demo)
  const [isLoading, setIsLoading] = useState(!demo)
  const [error, setError] = useState<string | null>(null)

  const demoIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // ── Demo mode: simulate live updates every 5 seconds ──────────────────────
  useEffect(() => {
    if (!demo) return

    demoIntervalRef.current = setInterval(() => {
      const next: VitalSigns = {
        ...DEMO_VITALS,
        id: `demo-${Date.now()}`,
        heart_rate: Math.round(70 + (Math.random() - 0.5) * 20),
        oxygen_saturation: Math.round(96 + (Math.random() - 0.5) * 4),
        temperature: Math.round((36.5 + (Math.random() - 0.5) * 0.8) * 10) / 10,
        systolic: Math.round(115 + (Math.random() - 0.5) * 20),
        diastolic: Math.round(76 + (Math.random() - 0.5) * 12),
        steps_today: Math.round(3500 + Math.random() * 2000),
        recorded_at: new Date().toISOString(),
      }
      setLatest(next)
      setHistory(prev => [next, ...prev.slice(0, 19)])
    }, 5000)

    return () => {
      if (demoIntervalRef.current) clearInterval(demoIntervalRef.current)
    }
  }, [demo])

  // ── Real Supabase mode ─────────────────────────────────────────────────────
  const fetchInitialData = useCallback(async () => {
    if (demo || !patientId) return
    setIsLoading(true)
    setError(null)

    try {
      const [latestRes, historyRes, sosRes, threshRes] = await Promise.all([
        supabase
          .from('vital_signs')
          .select('*')
          .eq('patient_id', patientId)
          .order('recorded_at', { ascending: false })
          .limit(1)
          .single(),
        supabase
          .from('vital_signs')
          .select('*')
          .eq('patient_id', patientId)
          .order('recorded_at', { ascending: false })
          .limit(20),
        supabase
          .from('sos_events')
          .select('*')
          .eq('patient_id', patientId)
          .eq('status', 'active')
          .order('created_at', { ascending: false }),
        supabase
          .from('patient_thresholds')
          .select('*')
          .eq('patient_id', patientId)
          .single(),
      ])

      if (latestRes.data) setLatest(latestRes.data as VitalSigns)
      if (historyRes.data) setHistory(historyRes.data as VitalSigns[])
      if (sosRes.data) setSosEvents(sosRes.data as SOSEvent[])
      if (threshRes.data) setThresholds(threshRes.data as PatientThresholds)
    } catch (err) {
      setError('No se pudo cargar datos en tiempo real. Modo demo activo.')
      setLatest(DEMO_VITALS)
      setHistory(generateDemoHistory())
      setIsConnected(true)
    } finally {
      setIsLoading(false)
    }
  }, [demo, patientId])

  useEffect(() => {
    fetchInitialData()
  }, [fetchInitialData])

  // ── Supabase Realtime subscription ─────────────────────────────────────────
  useEffect(() => {
    if (demo || !patientId) return

    const channel = supabase
      .channel(`vitals-${patientId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'vital_signs',
          filter: `patient_id=eq.${patientId}`,
        },
        (payload) => {
          const newVital = payload.new as VitalSigns
          setLatest(newVital)
          setHistory(prev => [newVital, ...prev.slice(0, 19)])
          setIsConnected(true)

          if (newVital.is_alert && 'vibrate' in navigator) {
            navigator.vibrate([300, 100, 300])
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'sos_events',
          filter: `patient_id=eq.${patientId}`,
        },
        (payload) => {
          setSosEvents(prev => [payload.new as SOSEvent, ...prev])
          if ('vibrate' in navigator) navigator.vibrate([500, 200, 500, 200, 500])
        }
      )
      .subscribe((status) => {
        setIsConnected(status === 'SUBSCRIBED')
      })

    return () => {
      supabase.removeChannel(channel)
    }
  }, [demo, patientId])

  // ── Activate SOS from family panel ────────────────────────────────────────
  const activateSOS = useCallback(async (triggeredBy: 'family_manual') => {
    if (demo) {
      const mockSOS: SOSEvent = {
        id: `demo-sos-${Date.now()}`,
        patient_id: patientId,
        service_id: serviceId ?? null,
        triggered_by: triggeredBy,
        latitude: DEMO_VITALS.latitude,
        longitude: DEMO_VITALS.longitude,
        address_resolved: 'Pasto, Nariño, Colombia (Demo)',
        vital_signs_snapshot: latest,
        status: 'active',
        resolved_by: null,
        resolved_at: null,
        resolution_note: null,
        created_at: new Date().toISOString(),
      }
      setSosEvents(prev => [mockSOS, ...prev])
      return
    }

    await supabase.from('sos_events').insert({
      patient_id: patientId,
      service_id: serviceId ?? null,
      triggered_by: triggeredBy,
      vital_signs_snapshot: latest,
      status: 'active',
    })
  }, [demo, patientId, serviceId, latest])

  // ── Resolve SOS ───────────────────────────────────────────────────────────
  const resolveSOS = useCallback(async (sosId: string) => {
    setSosEvents(prev => prev.filter(s => s.id !== sosId))
    if (demo) return

    await supabase
      .from('sos_events')
      .update({ status: 'resolved', resolved_at: new Date().toISOString() })
      .eq('id', sosId)
  }, [demo])

  return {
    latest,
    history,
    sosEvents,
    thresholds,
    isConnected,
    isLoading,
    error,
    activateSOS,
    resolveSOS,
    refetch: fetchInitialData,
  }
}
