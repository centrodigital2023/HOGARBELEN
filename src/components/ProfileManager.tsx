import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { toast } from 'sonner'
import {
  CloudArrowUp,
  User,
  Lock,
  CheckCircle,
  XCircle,
  Trash,
  Download
} from '@phosphor-icons/react'
import { uploadProfileImage, deleteFile, STORAGE_BUCKETS } from '@/lib/storage'
import { updatePassword, validatePassword } from '@/lib/auth'
import { supabase } from '@/lib/supabase'

interface ProfileManagerProps {
  userId: string
  currentProfile: {
    full_name: string
    email: string
    phone?: string
    photo_url?: string
    role: 'family' | 'professional'
  }
  onProfileUpdate: () => void
}

export function ProfileManager({ userId, currentProfile, onProfileUpdate }: ProfileManagerProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [previewUrl, setPreviewUrl] = useState(currentProfile.photo_url)
  const [passwordChanging, setPasswordChanging] = useState(false)

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors, isSubmitting: isProfileSubmitting }
  } = useForm({
    defaultValues: {
      full_name: currentProfile.full_name,
      phone: currentProfile.phone || ''
    }
  })

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    watch,
    reset: resetPasswordForm,
    formState: { errors: passwordErrors }
  } = useForm()

  const newPassword = watch('newPassword')

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    await uploadImage(file)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      await uploadImage(file)
    }
  }

  const uploadImage = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Solo se permiten imágenes')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('La imagen no debe superar 5MB')
      return
    }

    setUploading(true)
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prev) => Math.min(prev + 10, 90))
    }, 200)

    const result = await uploadProfileImage(userId, file)

    clearInterval(interval)
    setUploadProgress(100)

    if (result.success && result.url) {
      const { error } = await supabase
        .from('profiles')
        .update({ photo_url: result.url })
        .eq('id', userId)

      if (error) {
        toast.error('Error al actualizar perfil')
      } else {
        setPreviewUrl(result.url)
        toast.success('Imagen de perfil actualizada')
        onProfileUpdate()
      }
    } else {
      toast.error(result.error || 'Error al subir imagen')
    }

    setUploading(false)
    setTimeout(() => setUploadProgress(0), 1000)
  }

  const handleDeleteImage = async () => {
    if (!currentProfile.photo_url) return

    const path = currentProfile.photo_url.split('/').slice(-2).join('/')

    const result = await deleteFile(STORAGE_BUCKETS.PROFILE_IMAGES, path)

    if (result.success) {
      const { error } = await supabase
        .from('profiles')
        .update({ photo_url: null })
        .eq('id', userId)

      if (error) {
        toast.error('Error al actualizar perfil')
      } else {
        setPreviewUrl(undefined)
        toast.success('Imagen eliminada')
        onProfileUpdate()
      }
    } else {
      toast.error(result.error || 'Error al eliminar imagen')
    }
  }

  const onUpdateProfile = async (data: any) => {
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: data.full_name,
        phone: data.phone
      })
      .eq('id', userId)

    if (error) {
      toast.error('Error al actualizar perfil')
    } else {
      toast.success('Perfil actualizado exitosamente')
      onProfileUpdate()
    }
  }

  const onUpdatePassword = async (data: any) => {
    setPasswordChanging(true)

    const result = await updatePassword({ newPassword: data.newPassword })

    if (result.success) {
      toast.success('Contraseña actualizada exitosamente')
      resetPasswordForm()
    } else {
      toast.error(result.error || 'Error al actualizar contraseña')
    }

    setPasswordChanging(false)
  }

  const passwordValidation = newPassword ? validatePassword(newPassword) : { valid: true, errors: [] }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Foto de Perfil
          </CardTitle>
          <CardDescription>
            Sube una imagen para tu perfil (máximo 5MB)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="w-32 h-32">
                <AvatarImage src={previewUrl} />
                <AvatarFallback className="text-2xl">
                  {currentProfile.full_name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              {previewUrl && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDeleteImage}
                >
                  <Trash className="w-4 h-4 mr-2" />
                  Eliminar
                </Button>
              )}
            </div>

            <div className="flex-1 w-full">
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors"
              >
                <CloudArrowUp className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Arrastra una imagen aquí o haz clic para seleccionar
                </p>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  disabled={uploading}
                  className="max-w-xs mx-auto"
                />
              </div>

              {uploading && (
                <div className="mt-4">
                  <Progress value={uploadProgress} className="h-2" />
                  <p className="text-sm text-muted-foreground mt-2 text-center">
                    Subiendo... {uploadProgress}%
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Información Personal</CardTitle>
          <CardDescription>
            Actualiza tu información de perfil
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitProfile(onUpdateProfile)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">Nombre Completo</Label>
              <Input
                id="full_name"
                {...registerProfile('full_name', {
                  required: 'El nombre es requerido',
                  minLength: {
                    value: 3,
                    message: 'El nombre debe tener al menos 3 caracteres'
                  }
                })}
              />
              {profileErrors.full_name && (
                <p className="text-sm text-destructive">
                  {profileErrors.full_name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                value={currentProfile.email}
                disabled
                className="bg-muted"
              />
              <p className="text-sm text-muted-foreground">
                El correo electrónico no se puede cambiar
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+57 300 123 4567"
                {...registerProfile('phone')}
              />
            </div>

            <Button type="submit" disabled={isProfileSubmitting}>
              {isProfileSubmitting ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Cambiar Contraseña
          </CardTitle>
          <CardDescription>
            Actualiza tu contraseña de acceso
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitPassword(onUpdatePassword)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword">Nueva Contraseña</Label>
              <Input
                id="newPassword"
                type="password"
                {...registerPassword('newPassword', {
                  required: 'La contraseña es requerida',
                  validate: (value) => {
                    const validation = validatePassword(value)
                    return validation.valid || validation.errors[0]
                  }
                })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...registerPassword('confirmPassword', {
                  required: 'Confirma tu contraseña',
                  validate: (value) =>
                    value === newPassword || 'Las contraseñas no coinciden'
                })}
              />
              {passwordErrors.confirmPassword && (
                <p className="text-sm text-destructive">
                  {passwordErrors.confirmPassword.message}
                </p>
              )}
            </div>

            {newPassword && !passwordValidation.valid && (
              <Alert>
                <AlertDescription>
                  <p className="font-medium mb-2">La contraseña debe cumplir:</p>
                  <ul className="space-y-1">
                    {passwordValidation.errors.map((error, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <XCircle className="w-4 h-4 text-destructive" />
                        {error}
                      </li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            {newPassword && passwordValidation.valid && (
              <Alert className="border-green-500 bg-green-50">
                <AlertDescription className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="w-4 h-4" />
                  La contraseña cumple todos los requisitos
                </AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              disabled={passwordChanging || !passwordValidation.valid}
            >
              {passwordChanging ? 'Actualizando...' : 'Actualizar Contraseña'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
