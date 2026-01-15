import { supabase } from './supabase'

export const STORAGE_BUCKETS = {
  PROFILE_IMAGES: 'profile-images',
  PROFESSIONAL_DOCUMENTS: 'professional-documents',
  APPOINTMENT_FILES: 'appointment-files'
} as const

export interface UploadResult {
  success: boolean
  url?: string
  path?: string
  error?: string
}

export interface FileValidation {
  maxSize: number
  allowedTypes: string[]
}

const FILE_VALIDATIONS: Record<string, FileValidation> = {
  [STORAGE_BUCKETS.PROFILE_IMAGES]: {
    maxSize: 5 * 1024 * 1024,
    allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  },
  [STORAGE_BUCKETS.PROFESSIONAL_DOCUMENTS]: {
    maxSize: 10 * 1024 * 1024,
    allowedTypes: ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
  },
  [STORAGE_BUCKETS.APPOINTMENT_FILES]: {
    maxSize: 10 * 1024 * 1024,
    allowedTypes: [
      'application/pdf',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
  }
}

export function validateFile(file: File, bucket: string): { valid: boolean; error?: string } {
  const validation = FILE_VALIDATIONS[bucket]
  
  if (!validation) {
    return { valid: false, error: 'Bucket no válido' }
  }
  
  if (file.size > validation.maxSize) {
    return {
      valid: false,
      error: `El archivo excede el tamaño máximo de ${validation.maxSize / (1024 * 1024)}MB`
    }
  }
  
  if (!validation.allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Tipo de archivo no permitido. Permitidos: ${validation.allowedTypes.join(', ')}`
    }
  }
  
  return { valid: true }
}

export async function compressImage(file: File, maxWidth: number = 1200): Promise<File> {
  if (!file.type.startsWith('image/')) {
    return file
  }

  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height

        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }

        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx?.drawImage(img, 0, 0, width, height)

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(new File([blob], file.name, { type: 'image/jpeg' }))
            } else {
              resolve(file)
            }
          },
          'image/jpeg',
          0.85
        )
      }
      img.src = e.target?.result as string
    }
    reader.readAsDataURL(file)
  })
}

export async function uploadFile(
  bucket: string,
  file: File,
  path: string,
  options?: {
    compress?: boolean
    upsert?: boolean
  }
): Promise<UploadResult> {
  try {
    const validation = validateFile(file, bucket)
    if (!validation.valid) {
      return { success: false, error: validation.error }
    }

    let fileToUpload = file
    if (options?.compress && file.type.startsWith('image/')) {
      fileToUpload = await compressImage(file)
    }

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, fileToUpload, {
        upsert: options?.upsert ?? false,
        contentType: fileToUpload.type
      })

    if (error) {
      return { success: false, error: error.message }
    }

    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path)

    return {
      success: true,
      url: urlData.publicUrl,
      path: data.path
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    }
  }
}

export async function deleteFile(bucket: string, path: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.storage.from(bucket).remove([path])

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    }
  }
}

export async function getPublicUrl(bucket: string, path: string): Promise<string> {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}

export async function downloadFile(bucket: string, path: string): Promise<Blob | null> {
  try {
    const { data, error } = await supabase.storage.from(bucket).download(path)

    if (error) {
      console.error('Error downloading file:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error downloading file:', error)
    return null
  }
}

export async function listFiles(
  bucket: string,
  folder?: string
): Promise<{ success: boolean; files?: any[]; error?: string }> {
  try {
    const { data, error } = await supabase.storage.from(bucket).list(folder)

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, files: data }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    }
  }
}

export function generateUserFilePath(userId: string, fileName: string, category?: string): string {
  const timestamp = Date.now()
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_')
  const basePath = `${userId}/${timestamp}_${sanitizedFileName}`
  
  return category ? `${category}/${basePath}` : basePath
}

export async function uploadProfileImage(userId: string, file: File): Promise<UploadResult> {
  const path = generateUserFilePath(userId, file.name, 'profiles')
  return uploadFile(STORAGE_BUCKETS.PROFILE_IMAGES, file, path, {
    compress: true,
    upsert: true
  })
}

export async function uploadProfessionalDocument(
  userId: string,
  file: File,
  documentType: string
): Promise<UploadResult> {
  const path = generateUserFilePath(userId, file.name, documentType)
  return uploadFile(STORAGE_BUCKETS.PROFESSIONAL_DOCUMENTS, file, path, {
    compress: file.type.startsWith('image/'),
    upsert: false
  })
}

export async function uploadAppointmentFile(
  appointmentId: string,
  file: File,
  userId: string
): Promise<UploadResult> {
  const path = `${appointmentId}/${generateUserFilePath(userId, file.name)}`
  return uploadFile(STORAGE_BUCKETS.APPOINTMENT_FILES, file, path, {
    compress: file.type.startsWith('image/'),
    upsert: false
  })
}
