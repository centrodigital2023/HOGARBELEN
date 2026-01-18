# Variables de Entorno

## Configuración Obligatoria

### Supabase (Autenticación y Base de Datos)

```bash
VITE_SUPABASE_URL=https://cgfpwlqnhgclzzaiqhwz.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_aqui
```

**Dónde obtener las credenciales:**

1. Ir a [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Seleccionar proyecto "HOGARBELEN"
3. Ir a Settings > API
4. Copiar:
   - Project URL → `VITE_SUPABASE_URL`
   - anon/public key → `VITE_SUPABASE_ANON_KEY`

### URL del Sitio

```bash
VITE_SITE_URL=http://localhost:5173
```

En producción (Vercel):

```bash
VITE_SITE_URL=https://www.hogarbelen.org
```

## Configuración Opcional

### Google Analytics (si se implementa)

```bash
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Validación

Ejecuta este comando para verificar que las variables están configuradas:

```bash
npm run dev
```

Si ves errores de "Invalid API key" o "Failed to fetch", revisa las variables de entorno.

## Configuración en Desarrollo

1. Copia el archivo `.env.example` a `.env`:

```bash
cp .env.example .env
```

2. Edita el archivo `.env` y completa los valores de las variables:

```bash
nano .env  # o usa tu editor favorito
```

3. Reinicia el servidor de desarrollo si ya estaba corriendo:

```bash
npm run dev
```

## Configuración en Producción (Vercel)

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona Settings > Environment Variables
3. Agrega cada variable con su valor correspondiente
4. Asegúrate de seleccionar los ambientes correctos (Production, Preview, Development)
5. Redeploy el proyecto para aplicar los cambios

## Troubleshooting

### Error: "Invalid API key"

- Verifica que `VITE_SUPABASE_ANON_KEY` esté correctamente copiada desde Supabase
- Asegúrate de no tener espacios en blanco al inicio o final de la clave
- Confirma que estás usando la "anon/public" key, no la "service_role" key

### Error: "Failed to fetch"

- Verifica que `VITE_SUPABASE_URL` sea correcta y termine sin `/`
- Comprueba tu conexión a internet
- Verifica que el proyecto de Supabase esté activo

### Las variables no se aplican

- Las variables de entorno con prefijo `VITE_` solo se cargan al iniciar el servidor
- Debes reiniciar `npm run dev` después de cambiar el archivo `.env`
- En producción, debes hacer redeploy del proyecto

## Seguridad

⚠️ **IMPORTANTE:**

- **NUNCA** commits el archivo `.env` al repositorio
- El archivo `.env` debe estar en `.gitignore`
- Solo commits `.env.example` con valores de ejemplo
- La clave `VITE_SUPABASE_ANON_KEY` es segura para uso público (con RLS habilitado)
- NUNCA expongas la `service_role` key en el frontend
