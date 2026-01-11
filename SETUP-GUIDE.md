# 🚀 GUÍA DE CONFIGURACIÓN PASO A PASO
## Hogar Belén - Plataforma Completa

Esta guía te llevará desde cero hasta tener la plataforma completamente funcional en producción.

---

## 📋 PRERREQUISITOS

Antes de comenzar, asegúrate de tener:

- [ ] Cuenta de Supabase (gratis en https://supabase.com)
- [ ] Cuenta de Facebook Business Manager (para Meta Pixel)
- [ ] Cuenta de OpenAI con créditos (https://platform.openai.com)
- [ ] Dominio hogarbelen.org configurado
- [ ] Node.js 18+ instalado
- [ ] Git instalado

---

## PASO 1: CONFIGURAR SUPABASE

### 1.1 Crear Proyecto
1. Ve a https://supabase.com/dashboard
2. Click en "New Project"
3. Nombre: `Hogar Belén`
4. Base de datos password: Guarda este password de forma segura
5. Región: Elige la más cercana a Colombia (Preferiblemente South America)
6. Click "Create new project"

### 1.2 Ejecutar Schema SQL
1. En el dashboard de Supabase, ve a "SQL Editor"
2. Abre el archivo `supabase-schema-complete.sql`
3. Copia TODO el contenido
4. Pega en el editor SQL de Supabase
5. Click "Run"
6. Verifica que todas las tablas se hayan creado correctamente

### 1.3 Configurar Storage
1. Ve a "Storage" en el sidebar
2. Crea estos buckets públicos:
   - `profile-photos` (público)
   - `site-images` (público)
3. Crea este bucket privado:
   - `professional-documents` (privado)

### 1.4 Obtener Credenciales
1. Ve a "Project Settings" → "API"
2. Copia estos valores:
   - Project URL
   - anon public key
3. Guárdalos para el siguiente paso

---

## PASO 2: CONFIGURAR VARIABLES DE ENTORNO

### 2.1 Crear archivo .env
1. En la raíz del proyecto, copia `.env.example` a `.env`
2. Edita `.env` y completa:

```env
VITE_SUPABASE_URL=https://[tu-proyecto].supabase.co
VITE_SUPABASE_ANON_KEY=[tu-anon-key]
```

### 2.2 NO incluir OpenAI en el frontend
⚠️ **IMPORTANTE**: La API Key de OpenAI NO debe estar en `.env` del frontend.
Se configurará más adelante en Supabase Edge Functions.

---

## PASO 3: CONFIGURAR META PIXEL

### 3.1 Crear Pixel
1. Ve a https://business.facebook.com/events_manager
2. Click "Connect Data Sources" → "Web"
3. Click "Get Started"
4. Nombre: `Hogar Belén Website`
5. URL: `https://hogarbelen.org`
6. Click "Continue"

### 3.2 Obtener Pixel ID
1. En Events Manager, selecciona tu Pixel
2. Ve a "Settings"
3. Copia el "Pixel ID" (son números)

### 3.3 Actualizar el código
1. Abre `index.html`
2. Busca `YOUR_PIXEL_ID_HERE` (2 veces)
3. Reemplaza con tu Pixel ID real
4. Guarda el archivo

### 3.4 Verificar instalación
1. Instala "Meta Pixel Helper" en Chrome
2. Visita tu sitio
3. Verifica que el pixel se active (ícono azul)

---

## PASO 4: CONFIGURAR OPENAI (SUPABASE EDGE FUNCTION)

### 4.1 Instalar Supabase CLI
```bash
npm install -g supabase
```

### 4.2 Login en Supabase
```bash
supabase login
```

### 4.3 Crear Edge Function
```bash
supabase functions new ai-service
```

### 4.4 Código de la Edge Function

Crea el archivo `supabase/functions/ai-service/index.ts`:

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { prompt, model = 'gpt-4o', jsonMode = false } = await req.json()

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages: [{ role: 'user', content: prompt }],
        ...(jsonMode && { response_format: { type: 'json_object' } })
      }),
    })

    const data = await response.json()
    const result = data.choices[0].message.content

    return new Response(JSON.stringify({ result }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}
```

### 4.5 Configurar Secret de OpenAI
```bash
supabase secrets set OPENAI_API_KEY=sk-proj-[tu-api-key]
```

⚠️ **REEMPLAZA con tu API Key real**

### 4.6 Deploy Edge Function
```bash
supabase functions deploy ai-service
```

### 4.7 Actualizar aiService.ts

En `src/lib/aiService.ts`, actualiza el método `callOpenAI`:

```typescript
private static async callOpenAI(prompt: string): Promise<any> {
  try {
    const response = await fetch(
      'https://[tu-proyecto].supabase.co/functions/v1/ai-service',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({ prompt, jsonMode: true })
      }
    );
    
    const data = await response.json();
    return JSON.parse(data.result);
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    return null;
  }
}
```

---

## PASO 5: CONFIGURAR SEO

### 5.1 Subir Sitemap
1. Genera el build: `npm run build`
2. El sitemap está en `public/sitemap.xml`
3. Súbelo a tu servidor en: `https://hogarbelen.org/sitemap.xml`

### 5.2 Verificar robots.txt
1. El archivo está en `public/robots.txt`
2. Súbelo a: `https://hogarbelen.org/robots.txt`

### 5.3 Google Search Console
1. Ve a https://search.google.com/search-console
2. Click "Agregar propiedad"
3. Ingresa: `https://hogarbelen.org`
4. Verifica tu dominio (método HTML tag o DNS)
5. Una vez verificado:
   - Ve a "Sitemaps"
   - Ingresa: `https://hogarbelen.org/sitemap.xml`
   - Click "Enviar"

---

## PASO 6: CONFIGURAR ROLES Y PERMISOS

### 6.1 Crear Rol de Super Admin

En Supabase SQL Editor:

```sql
-- Crear tabla de roles de usuario
CREATE TABLE IF NOT EXISTS user_roles (
  user_id UUID REFERENCES auth.users(id) PRIMARY KEY,
  role TEXT NOT NULL CHECK (role IN ('user', 'professional', 'admin', 'superadmin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Asignar tu usuario como superadmin
-- Primero, obtén tu user_id desde auth.users
SELECT id, email FROM auth.users;

-- Luego, asigna el rol (reemplaza con tu user_id)
INSERT INTO user_roles (user_id, role)
VALUES ('TU-USER-ID-AQUI', 'superadmin');
```

### 6.2 Actualizar RLS para roles

```sql
-- Política para que solo superadmins accedan al dashboard
CREATE POLICY "Solo superadmins pueden ver todas las acciones"
ON admin_actions FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'superadmin'
  )
);
```

---

## PASO 7: PRUEBAS LOCALES

### 7.1 Instalar dependencias
```bash
npm install
```

### 7.2 Ejecutar en desarrollo
```bash
npm run dev
```

### 7.3 Probar funcionalidades

**Registro de Profesional:**
1. Ve a `/registro-profesional`
2. Completa todos los campos
3. Verifica validaciones en tiempo real
4. Envía el formulario
5. Verifica que aparezca en Supabase como "pendiente"

**Dashboard Admin:**
1. Ve a `/super-admin-dashboard`
2. Verifica métricas
3. Prueba aprobar un profesional
4. Verifica check azul activado
5. Verifica log en auditoría

**Formulario Inteligente:**
1. Ve a `/formulario-contacto`
2. Prueba cada tipo de usuario
3. Escribe mensaje con palabra "urgente"
4. Verifica detección de urgencia
5. Verifica lead en Supabase

**Meta Pixel:**
1. Instala Meta Pixel Helper
2. Navega por el sitio
3. Verifica eventos disparados
4. Revisa en Facebook Events Manager

---

## PASO 8: DEPLOYMENT A PRODUCCIÓN

### 8.1 Preparar Build
```bash
npm run build
```

### 8.2 Opciones de Hosting

**Opción A: Vercel (Recomendado)**
1. Instala Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Deploy: `vercel --prod`
4. Configura variables de entorno en dashboard de Vercel

**Opción B: Netlify**
1. Instala Netlify CLI: `npm i -g netlify-cli`
2. Login: `netlify login`
3. Deploy: `netlify deploy --prod`
4. Configura variables de entorno en dashboard de Netlify

### 8.3 Configurar Dominio
1. En tu proveedor de DNS (GoDaddy, Namecheap, etc.)
2. Crea registro A apuntando a IP del hosting
3. O crea CNAME apuntando al dominio del hosting
4. Espera propagación DNS (hasta 48 horas)

### 8.4 Configurar SSL
1. En tu hosting (Vercel/Netlify), SSL se configura automáticamente
2. Verifica que https://hogarbelen.org cargue correctamente

---

## PASO 9: CONFIGURACIÓN POST-DESPLIEGUE

### 9.1 Actualizar URLs
1. En Supabase Dashboard → Authentication → URL Configuration
2. Site URL: `https://hogarbelen.org`
3. Redirect URLs: Agrega `https://hogarbelen.org/**`

### 9.2 Actualizar Meta Pixel
1. Ve a Facebook Events Manager
2. Settings → Domains
3. Verifica el dominio `hogarbelen.org`

### 9.3 Configurar CORS en Supabase
```sql
-- En Supabase SQL Editor
ALTER DATABASE postgres SET "app.settings.cors_origins" = 'https://hogarbelen.org';
```

---

## PASO 10: MONITOREO Y MANTENIMIENTO

### 10.1 Verificaciones Diarias
- [ ] Revisar leads urgentes en dashboard
- [ ] Aprobar/rechazar profesionales pendientes
- [ ] Revisar ofertas de trabajo
- [ ] Verificar logs de auditoría

### 10.2 Verificaciones Semanales
- [ ] Revisar métricas de Meta Pixel
- [ ] Verificar posición SEO en Google
- [ ] Revisar errores en Supabase logs
- [ ] Backup de base de datos

### 10.3 Verificaciones Mensuales
- [ ] Analizar tendencias de leads
- [ ] Revisar profesionales más solicitados
- [ ] Optimizar contenido según analítica
- [ ] Actualizar precios si es necesario

---

## 🆘 TROUBLESHOOTING

### Problema: Meta Pixel no se dispara
**Solución:**
1. Verifica que el Pixel ID sea correcto en `index.html`
2. Limpia caché del navegador
3. Usa Meta Pixel Helper para ver errores específicos

### Problema: Errores de CORS con Supabase
**Solución:**
1. Verifica que el dominio esté en la lista de Redirect URLs
2. Asegúrate de usar el anon key correcto
3. Verifica políticas RLS

### Problema: IA no responde
**Solución:**
1. Verifica que la Edge Function esté desplegada
2. Verifica el secret de OpenAI: `supabase secrets list`
3. Revisa logs: `supabase functions logs ai-service`
4. Verifica créditos en OpenAI

### Problema: Formularios no envían
**Solución:**
1. Abre consola del navegador (F12)
2. Revisa errores en "Console" tab
3. Verifica que Supabase URL y key sean correctos
4. Verifica que las tablas existan en Supabase

---

## ✅ CHECKLIST FINAL

Antes de lanzar oficialmente:

- [ ] Todas las tablas creadas en Supabase
- [ ] RLS configurado correctamente
- [ ] Edge Function de IA funcionando
- [ ] Meta Pixel instalado y verificado
- [ ] Sitemap enviado a Google Search Console
- [ ] SSL configurado (https)
- [ ] Dominio apuntando correctamente
- [ ] Variables de entorno en producción
- [ ] Rol de superadmin asignado
- [ ] Pruebas de registro profesional
- [ ] Pruebas de dashboard admin
- [ ] Pruebas de formulario de contacto
- [ ] WhatsApp funcionando correctamente
- [ ] Emails de contacto funcionando
- [ ] Políticas de privacidad actualizadas
- [ ] Banner de cookies implementado

---

## 📞 SOPORTE

Si encuentras problemas:

1. Revisa la sección de Troubleshooting arriba
2. Revisa logs en Supabase Dashboard
3. Revisa consola del navegador (F12)
4. Documenta el error exacto y los pasos para reproducirlo

---

## 🎉 ¡LISTO!

Tu plataforma Hogar Belén ahora está completamente configurada y lista para:

✅ Registrar profesionales verificados
✅ Gestionar ofertas de trabajo
✅ Capturar y clasificar leads inteligentemente
✅ Rastrear conversiones con Meta Pixel
✅ Posicionarse en Google con SEO optimizado
✅ Escalar como plataforma seria de salud

**¡Éxito con Hogar Belén!** 🏡💚
