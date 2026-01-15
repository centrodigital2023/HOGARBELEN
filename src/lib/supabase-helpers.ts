export const professionalCategories = [
  'Geriatra',
  'Terapeuta Ocupacional',
  'Nutricionista',
  'Trabajador/a Social',
  'Auxiliar de Enfermería',
  'Enfermero/a',
  'Fisioterapeuta',
  'Psicólogo/a',
  'Médico General',
  'Cuidador/a Especializado/a'
]

export const cities = [
  'Buesaco',
  'Pasto',
  'La Unión',
  'Tangua',
  'Sandoná',
  'San Lorenzo'
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
  status?: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed' | 'lost'
  assigned_to?: string
  metadata?: Record<string, any>
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
  certifications?: string[]
  availability?: Record<string, any>
  bio?: string
  hourly_rate?: number
  verified?: boolean
  rating?: number
  total_reviews?: number
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
