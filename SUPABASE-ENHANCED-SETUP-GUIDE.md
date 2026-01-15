# Guía de Configuración de Supabase - Hogar Belén

## 📋 Configuración Inicial

### 1. Crear Proyecto en Supabase

1. Visita [https://supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto:
   - **Nombre**: hogar-belen
   - **Contraseña de base de datos**: Guarda esta contraseña de forma segura
   - **Región**: Selecciona la más cercana (South America - São Paulo recomendado)

### 2. Obtener Credenciales

Una vez creado el proyecto, ve a **Settings** > **API** y copia:

- **Project URL**: `https://[tu-proyecto].supabase.co`
- **anon public key**: Tu clave pública anónima

### 3. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_SUPABASE_URL=https://[tu-proyecto].supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_anonima_aqui
```

## 🗄️ Configuración de Base de Datos

### 1. Ejecutar Schema SQL

1. Ve a **SQL Editor** en el panel de Supabase
2. Crea un nuevo query
3. Copia y pega el contenido completo de `supabase-enhanced-schema.sql`
4. Ejecuta el script (Run)
5. Verifica que no haya errores

### 2. Verificar Tablas Creadas

Ve a **Table Editor** y verifica que existan estas tablas:

- ✅ profiles
- ✅ professionals
- ✅ appointments
- ✅ subscriptions
- ✅ leads
- ✅ promo_codes
- ✅ reviews

## 📦 Configuración de Storage

### 1. Crear Buckets

Ve a **Storage** y crea los siguientes buckets:

#### Bucket: profile-images
- **Público**: ✅ Sí
- **Tamaño máximo de archivo**: 5MB
- **Tipos de archivo permitidos**: image/jpeg, image/png, image/webp

**Políticas (Policies)**:

```sql
-- Policy: Todos pueden ver las imágenes de perfil
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'profile-images');

-- Policy: Usuarios autenticados pueden subir su propia foto
CREATE POLICY "Users can upload own profile image" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'profile-images' AND
  (auth.uid())::text = (storage.foldername(name))[1]
);

-- Policy: Usuarios pueden actualizar su propia foto
CREATE POLICY "Users can update own profile image" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'profile-images' AND
  (auth.uid())::text = (storage.foldername(name))[1]
);

-- Policy: Usuarios pueden eliminar su propia foto
CREATE POLICY "Users can delete own profile image" ON storage.objects
FOR DELETE USING (
  bucket_id = 'profile-images' AND
  (auth.uid())::text = (storage.foldername(name))[1]
);
```

#### Bucket: professional-documents
- **Público**: ❌ No (privado)
- **Tamaño máximo de archivo**: 10MB
- **Tipos de archivo permitidos**: application/pdf, image/jpeg, image/png

**Políticas (Policies)**:

```sql
-- Policy: Solo el propietario puede ver sus documentos
CREATE POLICY "Users can view own documents" ON storage.objects
FOR SELECT USING (
  bucket_id = 'professional-documents' AND
  (auth.uid())::text = (storage.foldername(name))[1]
);

-- Policy: Solo profesionales pueden subir documentos
CREATE POLICY "Professionals can upload documents" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'professional-documents' AND
  (auth.uid())::text = (storage.foldername(name))[1] AND
  EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'professional'
  )
);

-- Policy: Solo el propietario puede actualizar sus documentos
CREATE POLICY "Users can update own documents" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'professional-documents' AND
  (auth.uid())::text = (storage.foldername(name))[1]
);

-- Policy: Solo el propietario puede eliminar sus documentos
CREATE POLICY "Users can delete own documents" ON storage.objects
FOR DELETE USING (
  bucket_id = 'professional-documents' AND
  (auth.uid())::text = (storage.foldername(name))[1]
);
```

#### Bucket: appointment-files
- **Público**: ❌ No (privado)
- **Tamaño máximo de archivo**: 10MB
- **Tipos de archivo permitidos**: application/pdf, image/*, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document

**Políticas (Policies)**:

```sql
-- Policy: Solo participantes de la cita pueden ver archivos
CREATE POLICY "Appointment participants can view files" ON storage.objects
FOR SELECT USING (
  bucket_id = 'appointment-files' AND
  EXISTS (
    SELECT 1 FROM appointments a
    WHERE (storage.foldername(name))[1] = a.id::text AND
    (auth.uid() = a.family_id OR auth.uid() IN (
      SELECT user_id FROM professionals WHERE id = a.professional_id
    ))
  )
);

-- Policy: Solo participantes pueden subir archivos
CREATE POLICY "Appointment participants can upload files" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'appointment-files' AND
  EXISTS (
    SELECT 1 FROM appointments a
    WHERE (storage.foldername(name))[1] = a.id::text AND
    (auth.uid() = a.family_id OR auth.uid() IN (
      SELECT user_id FROM professionals WHERE id = a.professional_id
    ))
  )
);

-- Policy: Solo quien subió puede actualizar
CREATE POLICY "Users can update files they uploaded" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'appointment-files' AND
  owner = auth.uid()
);

-- Policy: Solo quien subió puede eliminar
CREATE POLICY "Users can delete files they uploaded" ON storage.objects
FOR DELETE USING (
  bucket_id = 'appointment-files' AND
  owner = auth.uid()
);
```

## 🔐 Configuración de Autenticación

### 1. Configurar Email Auth

Ve a **Authentication** > **Providers** > **Email**:

1. **Enable Email provider**: ✅ Activado
2. **Confirm email**: ✅ Activado (requerir confirmación de email)
3. **Secure email change**: ✅ Activado
4. **Double confirm email changes**: ✅ Activado

### 2. Configurar Email Templates

Ve a **Authentication** > **Email Templates** y personaliza:

#### Confirm Signup Template:

**Asunto**: `Confirma tu cuenta en Hogar Belén`

**Cuerpo**:
```html
<h2>¡Bienvenido a Hogar Belén!</h2>
<p>Gracias por registrarte. Por favor confirma tu correo electrónico haciendo clic en el siguiente enlace:</p>
<p><a href="{{ .ConfirmationURL }}">Confirmar Email</a></p>
<p>Si no creaste esta cuenta, puedes ignorar este correo.</p>
<p>Saludos,<br>El equipo de Hogar Belén</p>
```

#### Reset Password Template:

**Asunto**: `Restablece tu contraseña - Hogar Belén`

**Cuerpo**:
```html
<h2>Restablecimiento de Contraseña</h2>
<p>Recibimos una solicitud para restablecer tu contraseña. Haz clic en el siguiente enlace para crear una nueva contraseña:</p>
<p><a href="{{ .ConfirmationURL }}">Restablecer Contraseña</a></p>
<p>Este enlace expirará en 1 hora.</p>
<p>Si no solicitaste restablecer tu contraseña, ignora este correo.</p>
<p>Saludos,<br>El equipo de Hogar Belén</p>
```

### 3. Configurar URLs de Redirección

Ve a **Authentication** > **URL Configuration**:

**Site URL**:
```
https://hogarbelen.org
```

**Redirect URLs** (agregar todas estas):
```
https://hogarbelen.org/auth/callback
https://hogarbelen.org/auth/reset-password
http://localhost:5173/auth/callback
http://localhost:5173/auth/reset-password
```

### 4. Configurar Requisitos de Contraseña

Ve a **Authentication** > **Policies**:

- **Minimum password length**: 8 caracteres
- **Require uppercase letters**: ✅ Sí
- **Require lowercase letters**: ✅ Sí
- **Require numbers**: ✅ Sí
- **Require special characters**: ❌ No (opcional)

## ✅ Verificación Final

### Checklist de Configuración:

- [ ] Variables de entorno configuradas en `.env`
- [ ] Schema SQL ejecutado sin errores
- [ ] 7 tablas creadas y visibles
- [ ] 3 buckets de storage creados
- [ ] Políticas de storage aplicadas para cada bucket
- [ ] Email authentication configurado
- [ ] Templates de email personalizados
- [ ] URLs de redirección configuradas
- [ ] Requisitos de contraseña establecidos

### Probar la Configuración:

1. **Registro de Usuario**:
   ```javascript
   import { signUp } from '@/lib/auth'
   
   const result = await signUp({
     email: 'test@example.com',
     password: 'Test1234',
     fullName: 'Usuario Prueba',
     role: 'family'
   })
   ```

2. **Subida de Archivo**:
   ```javascript
   import { uploadProfileImage } from '@/lib/storage'
   
   const result = await uploadProfileImage(userId, file)
   ```

3. **Consulta de Base de Datos**:
   ```javascript
   import { supabase } from '@/lib/supabase'
   
   const { data, error } = await supabase
     .from('profiles')
     .select('*')
     .limit(5)
   ```

## 🚨 Troubleshooting

### Error: "Invalid API key"
- Verifica que las variables de entorno estén correctamente configuradas
- Reinicia el servidor de desarrollo después de cambiar `.env`

### Error: "Row Level Security policy violation"
- Verifica que las políticas RLS estén habilitadas
- Revisa que las políticas permitan la operación que intentas realizar

### Error: "Email not confirmed"
- El usuario debe confirmar su email antes de poder iniciar sesión
- Revisa la bandeja de spam
- Usa `resendVerificationEmail()` para reenviar el correo

### Los archivos no se suben
- Verifica que los buckets existan
- Revisa las políticas de storage
- Confirma que el tamaño y tipo de archivo son válidos

## 📚 Recursos Adicionales

- [Documentación de Supabase](https://supabase.com/docs)
- [Guía de RLS Policies](https://supabase.com/docs/guides/auth/row-level-security)
- [Storage Policies](https://supabase.com/docs/guides/storage#policy-examples)
- [Auth Helpers](https://supabase.com/docs/guides/auth)
