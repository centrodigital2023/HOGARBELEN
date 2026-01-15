export const professionalCategories = [
  'Geriatra',
  'Terapeuta 
  'Nutricionista',
  'Trabajador/a Social',
  'Auxiliar de Enfermería'

  'Pasto',
  'La Unión',
  'Tangua',
  'Sandoná',
 

  'Lunes',
  'Miércol
  'Viernes',
  'Domingo'

  id?: stri
  email: strin
  message?: 
  status?: '
  updated_at?


  full_name: string
  phone?: 
  experienc
  availability
  bio?: str
  rating?: n
  created_a
}
e

  category: string
  salary_rang
  status: 'act
  updated_at?: 

  id?: string
  action_type: st
  metadata?: Record<string, any>
}

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
