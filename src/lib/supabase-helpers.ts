export const professionalCategories = [
  'Enfermero/a',
  'Geriatra',
  'Fisioterapeuta',
  'Terapeuta Ocupacional',
  'Psicólogo/a Geriátrico',
  'Nutricionista',
  'Cuidador/a',
  'Trabajador/a Social',
  'Médico General',
  'Auxiliar de Enfermería'
]

export const colombianCities = [
  'Pasto',
  'Buesaco',
  'La Unión',
  'San Lorenzo',
  'Tangua',
  'Chachagüí',
  'Sandoná',
  'Ipiales',
  'Túquerres'
]

export const daysOfWeek = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo'
]

export interface Lead {
  id?: string
  name: string
  email: string
  phone?: string
  message?: string
  source?: string
  status?: 'new' | 'contacted' | 'converted' | 'closed'
  created_at?: string
  updated_at?: string
}

export interface ProfessionalProfile {
  id?: string
  user_id: string
  full_name: string
  email: string
  phone?: string
  specialization: string
  experience_years: number
  certifications: string[]
  availability: Record<string, any>
  hourly_rate?: number
  bio?: string
  verified: boolean
  rating?: number
  total_reviews: number
  created_at?: string
  updated_at?: string
}

export interface JobOffer {
  id?: string
  title: string
  description: string
  category: string
  location: string
  salary_range?: string
  requirements: string[]
  status: 'active' | 'closed' | 'draft'
  created_at?: string
  updated_at?: string
}

export interface AdminAction {
  id?: string
  admin_id: string
  action_type: string
  description: string
  metadata?: Record<string, any>
  created_at?: string
}
