import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          role: 'family' | 'professional'
          plan: string | null
          photo_url: string | null
          phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          role: 'family' | 'professional'
          plan?: string | null
          photo_url?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          role?: 'family' | 'professional'
          plan?: string | null
          photo_url?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      professionals: {
        Row: {
          id: string
          user_id: string
          specialization: string
          experience_years: number
          certifications: string[]
          availability: Record<string, any>
          hourly_rate: number | null
          bio: string | null
          verified: boolean
          rating: number | null
          total_reviews: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          specialization: string
          experience_years: number
          certifications?: string[]
          availability?: Record<string, any>
          hourly_rate?: number | null
          bio?: string | null
          verified?: boolean
          rating?: number | null
          total_reviews?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          specialization?: string
          experience_years?: number
          certifications?: string[]
          availability?: Record<string, any>
          hourly_rate?: number | null
          bio?: string | null
          verified?: boolean
          rating?: number | null
          total_reviews?: number
          created_at?: string
          updated_at?: string
        }
      }
      appointments: {
        Row: {
          id: string
          family_id: string
          professional_id: string
          scheduled_date: string
          status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          service_type: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          family_id: string
          professional_id: string
          scheduled_date: string
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          service_type: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          family_id?: string
          professional_id?: string
          scheduled_date?: string
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          service_type?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      leads: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          message: string | null
          source: string | null
          status: 'new' | 'contacted' | 'converted' | 'closed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          message?: string | null
          source?: string | null
          status?: 'new' | 'contacted' | 'converted' | 'closed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          message?: string | null
          source?: string | null
          status?: 'new' | 'contacted' | 'converted' | 'closed'
          created_at?: string
          updated_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          plan_name: string
          status: 'active' | 'cancelled' | 'expired'
          start_date: string
          end_date: string | null
          payment_method: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan_name: string
          status?: 'active' | 'cancelled' | 'expired'
          start_date: string
          end_date?: string | null
          payment_method?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plan_name?: string
          status?: 'active' | 'cancelled' | 'expired'
          start_date?: string
          end_date?: string | null
          payment_method?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      promo_codes: {
        Row: {
          id: string
          code: string
          discount_percentage: number
          max_uses: number | null
          current_uses: number
          valid_from: string
          valid_until: string | null
          active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          code: string
          discount_percentage: number
          max_uses?: number | null
          current_uses?: number
          valid_from: string
          valid_until?: string | null
          active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          code?: string
          discount_percentage?: number
          max_uses?: number | null
          current_uses?: number
          valid_from?: string
          valid_until?: string | null
          active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
