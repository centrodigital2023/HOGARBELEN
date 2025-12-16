# Guía de Despliegue en Vercel

Este documento describe cómo desplegar el proyecto Hogar Belén en Vercel.

## Requisitos Previos

- Una cuenta en [Vercel](https://vercel.com)
- Acceso al repositorio GitHub del proyecto

## Métodos de Despliegue

### Opción 1: Despliegue desde GitHub (Recomendado)

1. **Conectar con Vercel**
   - Ve a [vercel.com](https://vercel.com) e inicia sesión
   - Haz clic en "Add New Project"
   - Conecta tu cuenta de GitHub si aún no lo has hecho

2. **Importar el Repositorio**
   - Busca y selecciona el repositorio `centrodigital2023/HOGARBELEN`
   - Haz clic en "Import"

3. **Configurar el Proyecto**
   - Vercel detectará automáticamente que es un proyecto Vite
   - La configuración en `vercel.json` se aplicará automáticamente:
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Framework Preset: Vite

4. **Desplegar**
   - Haz clic en "Deploy"
   - Vercel construirá y desplegará tu aplicación automáticamente
   - Una vez completado, recibirás una URL de producción

### Opción 2: Despliegue con Vercel CLI

1. **Instalar Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Iniciar Sesión**
   ```bash
   vercel login
   ```

3. **Desplegar**
   ```bash
   cd /ruta/al/proyecto
   vercel
   ```
   - Sigue las instrucciones en pantalla
   - Para despliegue en producción:
   ```bash
   vercel --prod
   ```

## Configuración Automática

El archivo `vercel.json` en la raíz del proyecto configura automáticamente:

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Framework**: Vite
- **Rewrites**: Todas las rutas redirigen a `/index.html` para soporte de SPA (Single Page Application)

## Variables de Entorno

Si tu aplicación requiere variables de entorno:

1. Ve a tu proyecto en Vercel Dashboard
2. Navega a Settings → Environment Variables
3. Agrega las variables necesarias para cada entorno (Production, Preview, Development)

## Despliegue Continuo

Una vez conectado con GitHub, Vercel automáticamente:

- 🚀 Despliega cada push a la rama principal en producción
- 🔄 Crea preview deployments para cada Pull Request
- ✅ Ejecuta builds de prueba antes de mergear

## Dominios Personalizados

Para agregar un dominio personalizado:

1. Ve a Settings → Domains en tu proyecto de Vercel
2. Agrega tu dominio
3. Configura los registros DNS según las instrucciones de Vercel

## Solución de Problemas

### Error de Build

Si el build falla:
1. Verifica que todas las dependencias estén en `package.json`
2. Revisa los logs de build en Vercel Dashboard
3. Asegúrate de que el proyecto construya localmente con `npm run build`

### Rutas no funcionan (404)

El archivo `vercel.json` incluye rewrites para manejar el routing de SPA. Si tienes problemas:
1. Verifica que `vercel.json` esté en la raíz del proyecto
2. Asegúrate de que las rewrites estén configuradas correctamente

## Recursos Adicionales

- [Documentación de Vercel](https://vercel.com/docs)
- [Guía de Vite en Vercel](https://vercel.com/docs/frameworks/vite)
- [Configuración de vercel.json](https://vercel.com/docs/project-configuration)

## Monitoreo y Analytics

Vercel proporciona:
- Analytics de rendimiento
- Logs de función (si usas serverless functions)
- Métricas de uso
- Web Vitals

Accede a estos desde el Dashboard de tu proyecto en Vercel.
