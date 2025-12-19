# 🔐 IMPORTANTE: Rotación de Claves de Seguridad

## ⚠️ ACCIÓN INMEDIATA REQUERIDA

Las siguientes credenciales fueron compartidas en texto plano y **DEBEN SER ROTADAS INMEDIATAMENTE**:

### 1. Google OAuth Credentials
```
❌ Client ID EXPUESTO: 1076755525782-hfev4qg6bsjrpth0o2o58mm7cu9l3fpb.apps.googleusercontent.com
❌ Client Secret EXPUESTO: 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
```

**Acción requerida:**
1. Ve a [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Elimina o deshabilita las credenciales expuestas
3. Genera nuevas credenciales OAuth 2.0
4. Actualiza las variables de entorno en Vercel
5. NO compartas estas nuevas credenciales en ningún lugar

### 2. AI API Key
```
❌ API Key EXPUESTA: 7OZaVlec9vY8PYJCPn4kveXnJhBueMhRjeg0fnUS
```

**Acción requerida:**
1. Revoca la API key expuesta inmediatamente
2. Genera una nueva API key
3. Almacénala solo en variables de entorno
4. Verifica que no esté en ningún archivo del repositorio

## 🛡️ Mejores Prácticas de Seguridad

### Variables de Entorno

**✅ CORRECTO - Variables de entorno en Vercel/servidor:**
```bash
# En Vercel Dashboard → Settings → Environment Variables
GOOGLE_CLIENT_SECRET=nueva_clave_secreta_aqui
AI_API_KEY=nueva_api_key_aqui
VITE_GOOGLE_CLIENT_ID=tu_client_id_publico
```

**❌ INCORRECTO - Nunca hacer esto:**
```bash
# ❌ NO poner secretos en código
const secret = "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";

# ❌ NO poner secretos en .env que se sube al repo
# ❌ NO compartir secretos en issues, PRs o mensajes

# ❌ NO exponer secretos en frontend
const apiKey = import.meta.env.VITE_SECRET_KEY; // MAL si es secreto
```

### Archivo .env.local (NO SUBIR A GIT)

Crea un archivo `.env.local` en tu máquina local:

```bash
# .env.local - NUNCA SUBIR A GIT
VITE_SUPABASE_URL=https://cgfpwlqnhgclzzaiqhwz.supabase.co
VITE_SUPABASE_ANON_KEY=tu_anon_key_aqui
VITE_GOOGLE_CLIENT_ID=tu_nuevo_client_id
VITE_META_PIXEL_ID=tu_pixel_id

# Backend only (NO usar VITE_ prefix)
GOOGLE_CLIENT_SECRET=tu_nuevo_client_secret
AI_API_KEY=tu_nueva_ai_key
```

### .gitignore

Verifica que estos archivos NUNCA se suban al repositorio:

```gitignore
# Environment variables
.env
.env.local
.env.production
.env.development
*.env

# Archivos de configuración sensibles
config/secrets.json
config/credentials.json
```

## 🔄 Checklist de Rotación de Claves

- [ ] Revocar Google OAuth Client Secret expuesto
- [ ] Generar nuevas credenciales OAuth en Google Cloud Console
- [ ] Actualizar `GOOGLE_CLIENT_ID` en variables de entorno de Vercel
- [ ] Actualizar `GOOGLE_CLIENT_SECRET` en variables de entorno de Vercel
- [ ] Revocar AI API Key expuesta
- [ ] Generar nueva AI API Key
- [ ] Actualizar `AI_API_KEY` en variables de entorno
- [ ] Verificar que `.env.local` está en `.gitignore`
- [ ] Eliminar cualquier archivo con secretos del historial de Git
- [ ] Probar login con Google con nuevas credenciales
- [ ] Documentar cambios en logs internos (sin exponer claves)

## 📚 Recursos

- [Google OAuth 2.0 Best Practices](https://developers.google.com/identity/protocols/oauth2/best-practices)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [OWASP Key Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Key_Management_Cheat_Sheet.html)

## 🚨 En caso de exposición accidental

Si accidentalmente expones secretos en:
- **GitHub**: Rota inmediatamente y considera usar GitHub Secret Scanning
- **Logs de CI/CD**: Limpia los logs y rota credenciales
- **Mensajes de chat**: Elimina el mensaje y rota credenciales
- **Emails**: Rota inmediatamente y notifica al equipo

## 💡 Recordatorio

> **NUNCA** compartas secretos en:
> - Issues públicos o privados
> - Pull requests
> - Commits de Git
> - Mensajes de chat o email
> - Documentación pública
> - Prompts de IA

Usa siempre sistemas de gestión de secretos:
- Vercel Environment Variables
- AWS Secrets Manager
- HashiCorp Vault
- Azure Key Vault
- 1Password / LastPass para equipo

---

**Fecha de este aviso:** Diciembre 19, 2024
**Acción requerida:** INMEDIATA
