import { useRef } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from 'recharts'
import {
  Heart, Wind, Thermometer, Footprints, Activity, Clock,
  Wifi, WifiOff, AlertTriangle, MapPin,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useVitalSigns } from '../hooks/useVitalSigns'
import {
  getHeartRateStatus, getOxygenStatus, getTemperatureStatus,
  getBloodPressureStatus, ALERT_LABELS, SOS_TRIGGER_LABELS,
  type VitalStatus, type VitalSigns,
} from '../types/wearables'
import { cn } from '../lib/utils'

interface VitalSignsDashboardProps {
  patientId: string
  patientName: string
  serviceId?: string
}

const STATUS_COLORS: Record<VitalStatus, string> = {
  normal: 'text-emerald-600',
  warning: 'text-amber-500',
  danger: 'text-red-600',
  unknown: 'text-muted-foreground',
}

const STATUS_BG: Record<VitalStatus, string> = {
  normal: 'border-emerald-200 bg-emerald-50/50',
  warning: 'border-amber-200 bg-amber-50/50',
  danger: 'border-red-200 bg-red-50/50 animate-pulse',
  unknown: 'border-border bg-card',
}

const STATUS_BADGE: Record<VitalStatus, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  normal: 'outline',
  warning: 'secondary',
  danger: 'destructive',
  unknown: 'outline',
}

interface VitalCardProps {
  icon: React.ReactNode
  label: string
  value: string
  unit?: string
  status: VitalStatus
  subtitle?: string
}

function VitalCard({ icon, label, value, unit, status, subtitle }: VitalCardProps) {
  return (
    <div className={cn(
      'rounded-xl border p-4 flex flex-col gap-1 transition-all duration-500',
      STATUS_BG[status]
    )}>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">{icon}</span>
        <Badge variant={STATUS_BADGE[status]} className="text-xs capitalize">
          {status === 'unknown' ? '--' : status === 'normal' ? 'Normal' : status === 'warning' ? 'Atención' : 'Alerta'}
        </Badge>
      </div>
      <div className={cn('text-2xl font-bold tabular-nums mt-1', STATUS_COLORS[status])}>
        {value}
        {unit && <span className="text-sm font-normal text-muted-foreground ml-1">{unit}</span>}
      </div>
      <div className="text-xs text-muted-foreground font-medium">{label}</div>
      {subtitle && <div className="text-xs text-muted-foreground">{subtitle}</div>}
    </div>
  )
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })
}

function formatChartData(history: VitalSigns[]) {
  return [...history].reverse().map(v => ({
    time: formatTime(v.recorded_at),
    fc: v.heart_rate,
    spo2: v.oxygen_saturation,
    temp: v.temperature,
  }))
}

export default function VitalSignsDashboard({
  patientId, patientName, serviceId,
}: VitalSignsDashboardProps) {
  const alertAudio = useRef<HTMLAudioElement | null>(null)

  const {
    latest, history, sosEvents, thresholds,
    isConnected, isLoading, error,
    activateSOS, resolveSOS,
  } = useVitalSigns({ patientId, serviceId })

  const hrStatus = getHeartRateStatus(latest?.heart_rate ?? null, thresholds ?? undefined)
  const o2Status = getOxygenStatus(latest?.oxygen_saturation ?? null, thresholds ?? undefined)
  const tempStatus = getTemperatureStatus(latest?.temperature ?? null, thresholds ?? undefined)
  const bpStatus = getBloodPressureStatus(latest?.systolic ?? null, latest?.diastolic ?? null)

  const hasActiveAlert = hrStatus === 'danger' || o2Status === 'danger' || tempStatus === 'danger'
  const chartData = formatChartData(history)

  const handleSOSFamily = async () => {
    if (!confirm('¿Confirmas activar una alerta SOS? Se notificará al profesional y al equipo.')) return
    await activateSOS('family_manual')
  }

  return (
    <div className="space-y-6">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Monitoreo de {patientName}
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Signos vitales en tiempo real desde wearable
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {latest?.device_name && (
            <Badge variant="outline" className="gap-1 text-xs">
              <span>📡</span> {latest.device_name}
            </Badge>
          )}
          <Badge
            variant={isConnected ? 'default' : 'secondary'}
            className={cn('gap-1', isConnected && 'bg-emerald-600 hover:bg-emerald-700')}
          >
            {isConnected
              ? <><Wifi className="w-3 h-3" /> En vivo</>
              : <><WifiOff className="w-3 h-3" /> Conectando...</>
            }
          </Badge>
        </div>
      </div>

      {/* ── Demo / error notice ────────────────────────────────────────────── */}
      {error && (
        <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          {error} Conecta Supabase para datos reales.
        </div>
      )}

      {/* ── SOS activos ───────────────────────────────────────────────────── */}
      {sosEvents.map(sos => (
        <div
          key={sos.id}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-red-50 border-2 border-red-400 rounded-xl px-5 py-4 animate-pulse"
        >
          <span className="text-3xl">🆘</span>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-red-700 text-lg">SOS ACTIVO</p>
            <p className="text-sm text-red-600">{SOS_TRIGGER_LABELS[sos.triggered_by]}</p>
            {sos.address_resolved && (
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {sos.address_resolved}
              </p>
            )}
            {sos.latitude && sos.longitude && (
              <a
                href={`https://maps.google.com/?q=${sos.latitude},${sos.longitude}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-blue-600 underline mt-1 inline-block"
              >
                Ver en Google Maps →
              </a>
            )}
          </div>
          <Button
            size="sm"
            variant="outline"
            className="border-red-400 text-red-700 hover:bg-red-100 shrink-0"
            onClick={() => resolveSOS(sos.id)}
          >
            Marcar atendido
          </Button>
        </div>
      ))}

      {/* ── Vital cards grid ──────────────────────────────────────────────── */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl border p-4 h-28 bg-muted/30 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <VitalCard
            icon={<Heart className="w-4 h-4" />}
            label="Frec. cardíaca"
            value={latest?.heart_rate !== null && latest?.heart_rate !== undefined ? String(latest.heart_rate) : '--'}
            unit="bpm"
            status={hrStatus}
          />
          <VitalCard
            icon={<Wind className="w-4 h-4" />}
            label="Saturación O₂"
            value={latest?.oxygen_saturation !== null && latest?.oxygen_saturation !== undefined ? String(latest.oxygen_saturation) : '--'}
            unit="%"
            status={o2Status}
          />
          <VitalCard
            icon={<Activity className="w-4 h-4" />}
            label="Presión arterial"
            value={
              latest?.systolic && latest?.diastolic
                ? `${latest.systolic}/${latest.diastolic}`
                : '--'
            }
            unit="mmHg"
            status={bpStatus}
          />
          <VitalCard
            icon={<Thermometer className="w-4 h-4" />}
            label="Temperatura"
            value={latest?.temperature !== null && latest?.temperature !== undefined ? String(latest.temperature) : '--'}
            unit="°C"
            status={tempStatus}
          />
          <VitalCard
            icon={<Footprints className="w-4 h-4" />}
            label="Pasos hoy"
            value={latest?.steps_today !== null && latest?.steps_today !== undefined
              ? latest.steps_today.toLocaleString('es-CO')
              : '--'}
            status="normal"
          />
          <VitalCard
            icon={<Clock className="w-4 h-4" />}
            label="Última lectura"
            value={latest?.recorded_at ? formatTime(latest.recorded_at) : '--'}
            status="unknown"
            subtitle={latest?.source ? `Fuente: ${latest.source.replace('_', ' ')}` : undefined}
          />
        </div>
      )}

      {/* ── Chart ─────────────────────────────────────────────────────────── */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Historial del turno (últimas {history.length} lecturas)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" tick={{ fontSize: 10 }} interval="preserveStartEnd" />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8 }}
                  formatter={(val, name) => {
                    const labels: Record<string, string> = { fc: 'FC (bpm)', spo2: 'SpO₂ (%)', temp: 'Temp (°C)' }
                    return [val, labels[name as string] ?? name]
                  }}
                />
                <ReferenceLine y={100} stroke="#ef4444" strokeDasharray="4 2" label={{ value: 'FC máx', fontSize: 9 }} />
                <ReferenceLine y={92} stroke="#f59e0b" strokeDasharray="4 2" label={{ value: 'SpO₂ mín', fontSize: 9 }} />
                <Line type="monotone" dataKey="fc" stroke="#ef4444" strokeWidth={2} dot={false} name="fc" />
                <Line type="monotone" dataKey="spo2" stroke="#3b82f6" strokeWidth={2} dot={false} name="spo2" />
                <Line type="monotone" dataKey="temp" stroke="#f59e0b" strokeWidth={2} dot={false} name="temp" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 mt-2 justify-center flex-wrap">
            {[
              { color: '#ef4444', label: 'FC (bpm)' },
              { color: '#3b82f6', label: 'SpO₂ (%)' },
              { color: '#f59e0b', label: 'Temp (°C)' },
            ].map(l => (
              <span key={l.label} className="flex items-center gap-1 text-xs text-muted-foreground">
                <span className="inline-block w-3 h-0.5 rounded" style={{ background: l.color }} />
                {l.label}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── Historial de alertas ──────────────────────────────────────────── */}
      {history.some(v => v.is_alert) && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              Alertas del turno
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {history.filter(v => v.is_alert).map(v => (
                <div
                  key={v.id}
                  className={cn(
                    'flex items-start gap-3 text-sm p-2.5 rounded-lg',
                    v.alert_resolved ? 'bg-muted/30 text-muted-foreground' : 'bg-amber-50 text-amber-800'
                  )}
                >
                  <span className="text-base mt-0.5">⚠️</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">
                      {v.alert_type ? ALERT_LABELS[v.alert_type] : 'Alerta'}
                    </p>
                    <p className="text-xs opacity-80">{v.alert_message}</p>
                  </div>
                  <span className="text-xs shrink-0 tabular-nums">{formatTime(v.recorded_at)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── SOS botón familiar ────────────────────────────────────────────── */}
      <Card className={cn(hasActiveAlert && 'border-red-300')}>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-base">Botón de emergencia familiar</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Activa una alerta SOS inmediata. Se notificará al profesional en turno
                con la ubicación exacta del paciente.
              </p>
            </div>
            <Button
              variant="destructive"
              size="lg"
              className="gap-2 shrink-0 min-w-[160px]"
              onClick={handleSOSFamily}
            >
              🆘 Activar SOS
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Hidden audio element for alerts */}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={alertAudio} src="/sounds/alert.mp3" preload="none" />
    </div>
  )
}
