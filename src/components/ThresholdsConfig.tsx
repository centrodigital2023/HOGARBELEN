import { useState, useEffect } from 'react'
import { Save, Bell, MessageCircle, Mail, Smartphone, UserCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Switch } from './ui/switch'
import { supabase } from '../lib/supabase'
import type { PatientThresholds } from '../types/wearables'
import { toast } from 'sonner'

interface ThresholdsConfigProps {
  patientId: string
  familyId: string
  patientName: string
}

const DEFAULTS: Omit<PatientThresholds, 'id' | 'patient_id' | 'family_id' | 'created_at' | 'updated_at'> = {
  hr_min: 50,
  hr_max: 100,
  o2_min: 92,
  temp_max: 38.0,
  inactivity_minutes: 120,
  notify_whatsapp: true,
  notify_email: false,
  notify_push: true,
  emergency_contact_name: '',
  emergency_contact_phone: '',
}

interface FieldConfig {
  key: keyof typeof DEFAULTS
  label: string
  description: string
  min: number
  max: number
  step: number
  unit: string
  icon: string
}

const NUMERIC_FIELDS: FieldConfig[] = [
  {
    key: 'hr_min', label: 'FC mínima', unit: 'bpm',
    description: 'Alerta si la frecuencia cardíaca cae por debajo de este valor',
    min: 30, max: 80, step: 1, icon: '💔',
  },
  {
    key: 'hr_max', label: 'FC máxima', unit: 'bpm',
    description: 'Alerta si la frecuencia cardíaca supera este valor',
    min: 80, max: 200, step: 1, icon: '💓',
  },
  {
    key: 'o2_min', label: 'SpO₂ mínima', unit: '%',
    description: 'Alerta si la saturación de oxígeno cae por debajo de este porcentaje',
    min: 80, max: 98, step: 1, icon: '🫁',
  },
  {
    key: 'temp_max', label: 'Temperatura máxima', unit: '°C',
    description: 'Alerta si la temperatura supera este valor',
    min: 37.0, max: 41.0, step: 0.1, icon: '🌡️',
  },
  {
    key: 'inactivity_minutes', label: 'Inactividad', unit: 'min',
    description: 'Alerta si no se detecta movimiento por este tiempo',
    min: 30, max: 480, step: 15, icon: '😴',
  },
]

export default function ThresholdsConfig({ patientId, familyId, patientName }: ThresholdsConfigProps) {
  const [values, setValues] = useState(DEFAULTS)
  const [saving, setSaving] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    supabase
      .from('patient_thresholds')
      .select('*')
      .eq('patient_id', patientId)
      .single()
      .then(({ data }) => {
        if (data) {
          setValues({
            hr_min: data.hr_min,
            hr_max: data.hr_max,
            o2_min: data.o2_min,
            temp_max: data.temp_max,
            inactivity_minutes: data.inactivity_minutes,
            notify_whatsapp: data.notify_whatsapp,
            notify_email: data.notify_email,
            notify_push: data.notify_push,
            emergency_contact_name: data.emergency_contact_name ?? '',
            emergency_contact_phone: data.emergency_contact_phone ?? '',
          })
        }
        setLoaded(true)
      })
      .catch(() => setLoaded(true))
  }, [patientId])

  const set = <K extends keyof typeof DEFAULTS>(key: K, val: (typeof DEFAULTS)[K]) =>
    setValues(prev => ({ ...prev, [key]: val }))

  const handleSave = async () => {
    setSaving(true)
    try {
      const payload = {
        patient_id: patientId,
        family_id: familyId,
        ...values,
        emergency_contact_name: values.emergency_contact_name || null,
        emergency_contact_phone: values.emergency_contact_phone || null,
        updated_at: new Date().toISOString(),
      }
      const { error } = await supabase
        .from('patient_thresholds')
        .upsert(payload, { onConflict: 'patient_id' })
      if (error) throw error
      toast.success('Umbrales guardados. Humanix vigilará según estos valores.')
    } catch {
      toast.error('No se pudo guardar. Verifica la conexión a Supabase.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">

      {/* ── Numeric thresholds ─────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            Umbrales de alerta para {patientName}
          </CardTitle>
          <CardDescription>
            Recibirás notificación inmediata cuando algún signo supere estos límites.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {loaded && NUMERIC_FIELDS.map(field => (
            <div key={field.key} className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2 items-start">
              <div>
                <Label htmlFor={field.key} className="flex items-center gap-1.5 mb-1">
                  <span>{field.icon}</span>
                  <span>{field.label}</span>
                  <span className="text-muted-foreground font-normal text-xs">({field.unit})</span>
                </Label>
                <p className="text-xs text-muted-foreground">{field.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  id={field.key}
                  type="number"
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  value={values[field.key] as number}
                  onChange={e => set(field.key, parseFloat(e.target.value) as never)}
                  className="w-24 text-center tabular-nums"
                />
                <span className="text-sm text-muted-foreground w-8 shrink-0">{field.unit}</span>
              </div>
            </div>
          ))}
          {!loaded && (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-12 bg-muted/30 rounded-lg animate-pulse" />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Notification channels ──────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Canales de notificación</CardTitle>
          <CardDescription>¿Cómo quieres recibir las alertas?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            {
              key: 'notify_whatsapp' as const,
              icon: <MessageCircle className="w-4 h-4 text-green-600" />,
              label: 'WhatsApp',
              desc: 'Mensaje instantáneo al número registrado',
            },
            {
              key: 'notify_push' as const,
              icon: <Smartphone className="w-4 h-4 text-blue-600" />,
              label: 'Notificación push',
              desc: 'Alerta en el navegador o app',
            },
            {
              key: 'notify_email' as const,
              icon: <Mail className="w-4 h-4 text-purple-600" />,
              label: 'Correo electrónico',
              desc: 'Correo al email de la cuenta',
            },
          ].map(ch => (
            <div key={ch.key} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {ch.icon}
                <div>
                  <p className="text-sm font-medium">{ch.label}</p>
                  <p className="text-xs text-muted-foreground">{ch.desc}</p>
                </div>
              </div>
              <Switch
                checked={values[ch.key]}
                onCheckedChange={v => set(ch.key, v)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ── Emergency contact ─────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <UserCircle className="w-4 h-4 text-primary" />
            Contacto de emergencia adicional
          </CardTitle>
          <CardDescription>
            Esta persona también recibirá alertas SOS por WhatsApp (incluir código de país).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="ec-name">Nombre</Label>
            <Input
              id="ec-name"
              placeholder="Ej: Dr. García"
              value={values.emergency_contact_name ?? ''}
              onChange={e => set('emergency_contact_name', e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="ec-phone">WhatsApp (con código de país)</Label>
            <Input
              id="ec-phone"
              type="tel"
              placeholder="+57 300 123 4567"
              value={values.emergency_contact_phone ?? ''}
              onChange={e => set('emergency_contact_phone', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} disabled={saving} className="w-full gap-2" size="lg">
        <Save className="w-4 h-4" />
        {saving ? 'Guardando...' : 'Guardar configuración de alertas'}
      </Button>
    </div>
  )
}
