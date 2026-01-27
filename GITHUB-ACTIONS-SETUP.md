# ⚙️ Configuración de GitHub Actions para Deploy Automático

Este documento explica cómo configurar GitHub Actions para deployment automático a Vercel en cada push a la rama `main`.

## 📋 Requisitos Previos

1. Proyecto conectado a Vercel
2. Acceso al repositorio de GitHub
3. Token de Vercel con permisos apropiados

## 🔐 Configurar Secrets en GitHub

### Paso 1: Obtener Credenciales de Vercel

#### 1.1. VERCEL_TOKEN

1. Ve a [Vercel Dashboard](https://vercel.com/account/tokens)
2. Click en "Create New Token"
3. Dale un nombre descriptivo: "GitHub Actions Deploy"
4. Selecciona el scope apropiado (Full Account o específico del proyecto)
5. Copia el token generado (solo se muestra una vez)

#### 1.2. VERCEL_ORG_ID y VERCEL_PROJECT_ID

Opción A - Desde el proyecto local:

```bash
# Instala Vercel CLI si no lo tienes
npm install -g vercel@latest

# Inicia sesión
vercel login

# Enlaza tu proyecto (desde la raíz del repo)
vercel link

# Los IDs se guardan en .vercel/project.json
cat .vercel/project.json
```

Opción B - Desde Vercel Dashboard:

1. Ve a tu proyecto en Vercel
2. Settings → General
3. Copia:
   - **Project ID**: En la sección "Project Settings"
   - **Org ID**: En la URL (vercel.com/**[org-id]**/project-name)

### Paso 2: Agregar Secrets en GitHub

1. Ve a tu repositorio en GitHub
2. Click en **Settings** (del repositorio)
3. En el menú lateral: **Secrets and variables** → **Actions**
4. Click en **New repository secret**
5. Agrega cada uno de los siguientes secrets:

#### Secrets de Vercel (Deployment)

```
Name: VERCEL_TOKEN
Secret: [tu-token-de-vercel]
```

```
Name: VERCEL_ORG_ID
Secret: [tu-org-id]
```

```
Name: VERCEL_PROJECT_ID
Secret: [tu-project-id]
```

#### Secrets de Supabase (Build)

```
Name: VITE_SUPABASE_URL
Secret: https://cgfpwlqnhgclzzaiqhwz.supabase.co
```

```
Name: VITE_SUPABASE_ANON_KEY
Secret: [tu-clave-anonima-de-supabase]
```

### Paso 3: Verificar Configuración

Después de agregar todos los secrets:

1. Ve a **Actions** en tu repositorio de GitHub
2. Deberías ver el workflow "Deploy to Vercel"
3. Si no hay ejecuciones, haz un push a `main`:

```bash
git add .
git commit -m "Configure GitHub Actions"
git push origin main
```

4. El workflow debería ejecutarse automáticamente
5. Revisa los logs para verificar que todo funcione

## 🚀 Cómo Funciona

### Deploy a Producción

Cada vez que haces `push` a la rama `main`:

1. GitHub Actions inicia el workflow
2. Instala dependencias
3. Construye el proyecto con las variables de entorno
4. Despliega a Vercel en modo producción
5. Tu sitio se actualiza en `www.hogarbelen.org`

### Preview Deployments

Cada vez que abres un Pull Request:

1. GitHub Actions inicia el workflow
2. Construye el proyecto
3. Despliega a Vercel en modo preview
4. Agrega un comentario al PR con la URL del preview
5. Puedes revisar los cambios antes de mergear

## 🔍 Workflow Configurado

El archivo `.github/workflows/deploy.yml` contiene:

```yaml
name: Deploy to Vercel

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - Checkout del código
      - Setup de Node.js 20
      - Instalación de dependencias (npm ci)
      - Build del proyecto con variables de entorno
      - Deploy a Vercel (prod o preview según el evento)
```

## 📊 Monitoreo

### Ver el Estado del Deploy

1. **En GitHub**:
   - Ve a la pestaña **Actions**
   - Click en el workflow run más reciente
   - Revisa los logs de cada paso

2. **En Vercel**:
   - Ve a tu proyecto en Vercel Dashboard
   - Pestaña **Deployments**
   - Verás cada deployment con su estado

### Notificaciones

GitHub Actions enviará notificaciones:
- ✅ Cuando el deploy es exitoso
- ❌ Cuando hay errores
- 📧 Por email (si está habilitado en tu cuenta)

## 🐛 Troubleshooting

### Error: "VERCEL_TOKEN is invalid"

**Causa**: Token expirado o mal copiado

**Solución**:
1. Genera un nuevo token en Vercel
2. Actualiza el secret en GitHub
3. Vuelve a ejecutar el workflow

### Error: "Project not found"

**Causa**: VERCEL_PROJECT_ID incorrecto

**Solución**:
1. Verifica el ID en `.vercel/project.json` o Vercel Dashboard
2. Actualiza el secret en GitHub
3. Asegúrate de que el proyecto existe en Vercel

### Error: "Build failed"

**Causa**: Error en el código o dependencias

**Solución**:
1. Revisa los logs del paso "Build project"
2. Verifica que `npm run build` funcione localmente
3. Asegúrate de que todas las variables de entorno estén configuradas

### El workflow no se ejecuta

**Causa**: El archivo no está en la rama correcta o hay un error de sintaxis

**Solución**:
1. Verifica que `.github/workflows/deploy.yml` existe en `main`
2. Valida la sintaxis YAML en [yamllint.com](http://www.yamllint.com/)
3. Revisa los permisos de GitHub Actions (Settings → Actions → General)

## ✅ Checklist de Verificación

- [ ] VERCEL_TOKEN configurado en GitHub Secrets
- [ ] VERCEL_ORG_ID configurado en GitHub Secrets
- [ ] VERCEL_PROJECT_ID configurado en GitHub Secrets
- [ ] VITE_SUPABASE_URL configurado en GitHub Secrets
- [ ] VITE_SUPABASE_ANON_KEY configurado en GitHub Secrets
- [ ] Workflow file existe en `.github/workflows/deploy.yml`
- [ ] Proyecto conectado a Vercel
- [ ] Permisos de GitHub Actions habilitados
- [ ] Primer workflow ejecutado exitosamente

## 🔒 Seguridad

### Buenas Prácticas

✅ **DO:**
- Usa GitHub Secrets para información sensible
- Rota tokens regularmente
- Usa permisos mínimos necesarios
- Revisa logs de Actions regularmente

❌ **DON'T:**
- Nunca commits tokens en el código
- No compartas secrets entre proyectos innecesariamente
- No uses service_role keys en el frontend

### Permisos del VERCEL_TOKEN

El token solo necesita permisos para:
- Leer configuración del proyecto
- Desplegar código
- Acceder a logs de deployment

No necesita permisos de administración de la cuenta.

## 📚 Recursos Adicionales

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [Vercel GitHub Integration](https://vercel.com/docs/git/vercel-for-github)

## 🎯 Próximos Pasos

Después de configurar GitHub Actions:

1. **Configurar Branch Protection**:
   - Requiere PR reviews antes de mergear
   - Requiere que los checks pasen
   - Settings → Branches → Add rule

2. **Configurar Notifications**:
   - Slack/Discord webhooks
   - Email notifications
   - Status checks en PRs

3. **Agregar Tests**:
   - Unit tests con Vitest
   - E2E tests con Playwright
   - Ejecutar en el workflow antes del deploy

---

**Última actualización**: 2024-01-27
**Versión**: 1.0.0
