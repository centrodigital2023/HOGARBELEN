# ═══════════════════════════════════════════════════════════════════════════
# HUMANIX — Script de despliegue a producción (Pasos 3, 4 y 5)
# Requisito: Supabase CLI instalado  →  https://supabase.com/docs/guides/cli
#   winget install Supabase.CLI
# ═══════════════════════════════════════════════════════════════════════════

param(
    [string]$ProjectRef  = "",   # Tu Project Reference (Dashboard → Settings → General)
    [string]$TwilioSid   = "",   # TWILIO_ACCOUNT_SID
    [string]$TwilioToken = "",   # TWILIO_AUTH_TOKEN
    [string]$TwilioFrom  = "whatsapp:+14155238886",
    [string]$AdminPhone  = "+573147444715"
)

# ── Validación básica ────────────────────────────────────────────────────────
if (-not $ProjectRef) {
    $ProjectRef = Read-Host "Ingresa tu Supabase Project Ref (Dashboard → Settings → General)"
}
if (-not $TwilioSid) {
    $TwilioSid = Read-Host "TWILIO_ACCOUNT_SID"
}
if (-not $TwilioToken) {
    $TwilioToken = Read-Host "TWILIO_AUTH_TOKEN"
}

Write-Host ""
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
Write-Host " HUMANIX — Despliegue a producción"    -ForegroundColor Cyan
Write-Host " Proyecto: $ProjectRef"                 -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# ── PASO 3: Autenticar y deployer Edge Function ──────────────────────────────
Write-Host "[ PASO 3 ] Desplegando Edge Function: process-health-alert ..." -ForegroundColor Yellow

supabase login
supabase link --project-ref $ProjectRef
supabase functions deploy process-health-alert --no-verify-jwt

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR desplegando Edge Function. Revisa el output arriba." -ForegroundColor Red
    exit 1
}
Write-Host "OK Edge Function desplegada." -ForegroundColor Green

# ── PASO 4: Configurar secrets de Twilio ────────────────────────────────────
Write-Host ""
Write-Host "[ PASO 4 ] Configurando secrets de Twilio en Supabase ..." -ForegroundColor Yellow

$secrets = @(
    "TWILIO_ACCOUNT_SID=$TwilioSid",
    "TWILIO_AUTH_TOKEN=$TwilioToken",
    "TWILIO_WHATSAPP_FROM=$TwilioFrom",
    "HUMANIX_ADMIN_PHONE=$AdminPhone"
)

foreach ($secret in $secrets) {
    $name = $secret.Split("=")[0]
    supabase secrets set $secret
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  OK $name" -ForegroundColor Green
    } else {
        Write-Host "  ERROR configurando $name" -ForegroundColor Red
    }
}

# ── PASO 5: Crear Database Webhooks via Management API ───────────────────────
Write-Host ""
Write-Host "[ PASO 5 ] Creando Database Webhooks ..." -ForegroundColor Yellow

$SupabaseToken = $env:SUPABASE_ACCESS_TOKEN
if (-not $SupabaseToken) {
    $SupabaseToken = Read-Host "Ingresa tu Supabase Access Token (dashboard.supabase.com → Account → Access Tokens)"
}

$FunctionUrl = "https://$ProjectRef.supabase.co/functions/v1/process-health-alert"
$Headers = @{
    "Authorization" = "Bearer $SupabaseToken"
    "Content-Type"  = "application/json"
}

# Webhook para vital_signs (INSERT)
$webhookVitals = @{
    name       = "process_vital_alerts"
    enabled    = $true
    event      = "INSERT"
    schema     = "public"
    table      = "vital_signs"
    function_name = "process-health-alert"
    http_url   = $FunctionUrl
    http_method = "POST"
    headers    = @{ "Content-Type" = "application/json" }
} | ConvertTo-Json -Depth 5

$resp1 = Invoke-RestMethod `
    -Uri "https://api.supabase.com/v1/projects/$ProjectRef/database/webhooks" `
    -Method POST `
    -Headers $Headers `
    -Body $webhookVitals `
    -ErrorAction SilentlyContinue

if ($resp1) {
    Write-Host "  OK Webhook vital_signs creado." -ForegroundColor Green
} else {
    Write-Host "  AVISO: Crea el webhook vital_signs manualmente en Dashboard → Database → Webhooks" -ForegroundColor Yellow
}

# Webhook para sos_events (INSERT)
$webhookSOS = @{
    name       = "process_sos_events"
    enabled    = $true
    event      = "INSERT"
    schema     = "public"
    table      = "sos_events"
    function_name = "process-health-alert"
    http_url   = $FunctionUrl
    http_method = "POST"
    headers    = @{ "Content-Type" = "application/json" }
} | ConvertTo-Json -Depth 5

$resp2 = Invoke-RestMethod `
    -Uri "https://api.supabase.com/v1/projects/$ProjectRef/database/webhooks" `
    -Method POST `
    -Headers $Headers `
    -Body $webhookSOS `
    -ErrorAction SilentlyContinue

if ($resp2) {
    Write-Host "  OK Webhook sos_events creado." -ForegroundColor Green
} else {
    Write-Host "  AVISO: Crea el webhook sos_events manualmente en Dashboard → Database → Webhooks" -ForegroundColor Yellow
}

# ── Resumen final ─────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "═══════════════════════════════════════" -ForegroundColor Green
Write-Host " Despliegue completado"                  -ForegroundColor Green
Write-Host "═══════════════════════════════════════" -ForegroundColor Green
Write-Host ""
Write-Host "Recuerda completar el PASO 1 (SQL migration):" -ForegroundColor Cyan
Write-Host "  1. Abre: https://supabase.com/dashboard/project/$ProjectRef/sql"
Write-Host "  2. Copia el contenido de: supabase/migrations/20260605_wearables.sql"
Write-Host "  3. Ejecuta el SQL"
Write-Host ""
Write-Host "URL de la Edge Function:" -ForegroundColor Cyan
Write-Host "  $FunctionUrl"
Write-Host ""
