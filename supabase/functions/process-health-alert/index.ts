// Supabase Edge Function: process-health-alert
// Activado por Database Webhooks en vital_signs (INSERT) y sos_events (INSERT)
// Variables de entorno requeridas:
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
//   TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_FROM
//   HUMANIX_ADMIN_PHONE

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

const TWILIO_SID   = Deno.env.get('TWILIO_ACCOUNT_SID')!
const TWILIO_TOKEN = Deno.env.get('TWILIO_AUTH_TOKEN')!
const TWILIO_FROM  = Deno.env.get('TWILIO_WHATSAPP_FROM')! // whatsapp:+14155238886
const ADMIN_PHONE  = Deno.env.get('HUMANIX_ADMIN_PHONE')!  // +573147444715

// ── WhatsApp via Twilio ──────────────────────────────────────────────────────
async function sendWhatsApp(to: string, body: string): Promise<void> {
  const form = new URLSearchParams({
    From: TWILIO_FROM,
    To: `whatsapp:${to}`,
    Body: body,
  })
  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(`${TWILIO_SID}:${TWILIO_TOKEN}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: form,
    }
  )
  if (!res.ok) {
    const err = await res.text()
    console.error('Twilio error:', err)
  }
}

// ── Geocoding inverso (OpenStreetMap, sin costo) ─────────────────────────────
async function resolveAddress(lat: number, lng: number): Promise<string> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
      { headers: { 'User-Agent': 'HumanixApp/1.0' } }
    )
    const data = await res.json()
    return data.display_name ?? `${lat}, ${lng}`
  } catch {
    return `${lat}, ${lng}`
  }
}

// ── Timestamp legible ────────────────────────────────────────────────────────
function formatTime(): string {
  return new Date().toLocaleTimeString('es-CO', {
    hour: '2-digit', minute: '2-digit', timeZone: 'America/Bogota',
  })
}

// ── Handler principal ────────────────────────────────────────────────────────
Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  let payload: { table: string; record: Record<string, unknown> }
  try {
    payload = await req.json()
  } catch {
    return new Response('Invalid JSON', { status: 400 })
  }

  const { table, record } = payload
  const time = formatTime()

  // ── Obtener contexto del servicio/paciente ───────────────────────────────
  const serviceId = record.service_id as string | null
  const patientId = record.patient_id as string

  const { data: service } = serviceId
    ? await supabase
        .from('services')
        .select(`
          *,
          family:family_id ( full_name, phone, email ),
          professional:professional_id ( full_name, phone ),
          patient:patient_id ( full_name )
        `)
        .eq('id', serviceId)
        .single()
    : { data: null }

  const { data: thresholds } = await supabase
    .from('patient_thresholds')
    .select('*')
    .eq('patient_id', patientId)
    .single()

  const patientName = (service?.patient as { full_name?: string })?.full_name
    ?? 'Paciente Humanix'
  const familyPhone = (service?.family as { phone?: string })?.phone
  const professionalName = (service?.professional as { full_name?: string })?.full_name ?? 'Profesional'
  const professionalPhone = (service?.professional as { phone?: string })?.phone ?? ''
  const emergencyPhone = (thresholds as { emergency_contact_phone?: string } | null)
    ?.emergency_contact_phone

  // ══════════════════════════════════════════════════════════════════════════
  // CASO 1 — Alerta de signos vitales (tabla: vital_signs, event: INSERT)
  // ══════════════════════════════════════════════════════════════════════════
  if (table === 'vital_signs' && record.is_alert && !record.alert_resolved) {
    const lat = record.latitude as number | null
    const lng = record.longitude as number | null
    const address = lat && lng ? await resolveAddress(lat, lng) : 'No disponible'

    const ALERT_EMOJI: Record<string, string> = {
      high_heart_rate: '💓', low_heart_rate: '💔',
      low_oxygen: '🫁', high_temperature: '🌡️',
      fall_detected: '⚠️', inactivity: '😴', sos_manual: '🆘',
    }
    const emoji = ALERT_EMOJI[record.alert_type as string] ?? '⚠️'

    const msg =
      `${emoji} *HUMANIX ALERTA — ${patientName}*\n\n` +
      `${record.alert_message}\n\n` +
      `🕐 Hora: ${time}\n` +
      `📍 Ubicación: ${address}\n` +
      `👩‍⚕️ Profesional: ${professionalName}\n` +
      `📊 Signos: FC ${record.heart_rate ?? '--'} bpm | ` +
      `SpO₂ ${record.oxygen_saturation ?? '--'}% | ` +
      `T° ${record.temperature ?? '--'}°C\n\n` +
      (serviceId ? `Ver bitácora: https://humanix.lat/turno/${serviceId}` : '')

    const recipients = [
      familyPhone,
      emergencyPhone,
      (thresholds as { notify_whatsapp?: boolean } | null)?.notify_whatsapp ? ADMIN_PHONE : null,
    ].filter(Boolean) as string[]

    await Promise.all(recipients.map(phone => sendWhatsApp(phone, msg)))

    return new Response(JSON.stringify({ processed: true, type: 'vital_alert' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // ══════════════════════════════════════════════════════════════════════════
  // CASO 2 — Evento SOS activo (tabla: sos_events, event: INSERT)
  // ══════════════════════════════════════════════════════════════════════════
  if (table === 'sos_events' && record.status === 'active') {
    const lat = record.latitude as number | null
    const lng = record.longitude as number | null
    const address = lat && lng ? await resolveAddress(lat, lng) : 'No disponible'
    const mapsUrl = lat && lng ? `https://maps.google.com/?q=${lat},${lng}` : ''

    const TRIGGER_LABELS: Record<string, string> = {
      patient_manual:  'El paciente presionó el botón SOS',
      family_manual:   'La familia activó el SOS',
      auto_fall:       'Detección automática de caída',
      auto_heart_rate: 'Frecuencia cardíaca anormal',
      auto_oxygen:     'Saturación de oxígeno crítica',
      auto_inactivity: 'Inactividad prolongada detectada',
    }
    const razon = TRIGGER_LABELS[record.triggered_by as string] ?? 'Alerta automática'
    const snap = (record.vital_signs_snapshot as Record<string, unknown> | null) ?? {}

    const sosMsg =
      `🆘 *SOS ACTIVADO — ${patientName}*\n\n` +
      `*Razón:* ${razon}\n` +
      `🕐 *Hora:* ${time}\n` +
      `📍 *Ubicación:* ${address}\n` +
      (mapsUrl ? `🗺️ *Google Maps:* ${mapsUrl}\n\n` : '\n') +
      `📊 *Últimos signos vitales:*\n` +
      `• FC: ${snap.heart_rate ?? '--'} bpm\n` +
      `• SpO₂: ${snap.oxygen_saturation ?? '--'}%\n` +
      `• Temperatura: ${snap.temperature ?? '--'}°C\n\n` +
      `👩‍⚕️ *Profesional en turno:* ${professionalName}` +
      (professionalPhone ? ` (${professionalPhone})` : '') + '\n\n' +
      `Responde *CONFIRMADO* cuando hayas contactado al paciente.\n` +
      (record.id ? `Ver turno: https://humanix.lat/sos/${record.id}` : '')

    const adminMsg =
      `🆘 SOS ACTIVO | Paciente: ${patientName} | ${address}`

    const recipients = [familyPhone, emergencyPhone].filter(Boolean) as string[]
    await Promise.all([
      ...recipients.map(phone => sendWhatsApp(phone, sosMsg)),
      sendWhatsApp(ADMIN_PHONE, adminMsg),
    ])

    return new Response(JSON.stringify({ processed: true, type: 'sos_event' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return new Response(JSON.stringify({ processed: false, reason: 'no_matching_rule' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
})
