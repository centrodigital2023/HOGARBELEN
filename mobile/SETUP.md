# Humanix Mobile — Guía de instalación

## 1. Instalar dependencias

```bash
cd mobile
npm install
npx pod-install        # Solo iOS
```

## 2. Variables de entorno

Crear `mobile/.env`:
```
SUPABASE_URL=https://<tu-proyecto>.supabase.co
SUPABASE_ANON_KEY=<tu-anon-key>
```

## 3. Configurar permisos iOS

Abrir `ios/HumanixApp/Info.plist` y pegar el contenido de `ios/HealthKitPermissions.plist`.

En Xcode → Target → Signing & Capabilities → **+ Capability** → agregar:
- **HealthKit**
- **Background Modes** (fetch, processing, location, remote notifications)

## 4. Configurar permisos Android

Copiar los `<uses-permission>` de `android/permissions.xml` al `AndroidManifest.xml`.

## 5. Uso en el turno activo

```tsx
// En tu stack de navegación, navega a ActiveServiceScreen así:
navigation.navigate('ActiveService', {
  serviceId:   'uuid-del-servicio',
  patientId:   'uuid-del-paciente',
  patientName: 'María García',
})
```

El componente se encarga de:
1. Solicitar permisos HealthKit / Health Connect
2. Leer vitales inmediatamente
3. Iniciar sync en segundo plano cada 2 minutos
4. Evaluar alertas contra umbrales configurados por la familia
5. Abrir SOS automático si se detectan valores críticos

## 6. Compatibilidad de dispositivos

| Dispositivo            | FC | SpO₂ | Temp | Pasos | Notas                  |
|------------------------|:--:|:----:|:----:|:-----:|------------------------|
| Apple Watch S4+        | ✅  | ✅    | ✅    | ✅     | Automático             |
| Samsung Galaxy Watch 4+| ✅  | ✅    | -    | ✅     | Automático             |
| Google Pixel Watch     | ✅  | ✅    | -    | ✅     | Automático             |
| Xiaomi Mi Band 8+      | ✅  | ✅    | -    | ✅     | Requiere sync manual 1x |
| Amazfit GTR/GTS        | ✅  | -    | -    | ✅     | Requiere sync manual 1x |
| iPhone sin reloj       | -  | -    | -    | ✅     | GPS + SOS disponibles  |
