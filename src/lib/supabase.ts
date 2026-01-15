import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type AppointmentStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show'
export type SubscriptionStatus = 'active' | 'cancelled' | 'expired' | 'suspended' | 'trial'
export type PlanName = 'amigos' | 'sol_y_cafe' | 'sonreir' | 'free'
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'closed' | 'lost'
export type VerificationStatus = 'pending' | 'approved' | 'rejected'

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
          availability: Json
          hourly_rate: number | null
          bio: string | null
          documents: Json
          verified: boolean
          verification_status: VerificationStatus
          verification_date: string | null
          verified_by: string | null
          rejection_reason: string | null
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
          availability?: Json
          hourly_rate?: number | null
          bio?: string | null
          documents?: Json
          verified?: boolean
          verification_status?: VerificationStatus
          verification_date?: string | null
          verified_by?: string | null
          rejection_reason?: string | null
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
          availability?: Json
          hourly_rate?: number | null
          bio?: string | null
          documents?: Json
          verified?: boolean
          verification_status?: VerificationStatus
          verification_date?: string | null
          verified_by?: string | null
          rejection_reason?: string | null
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
          duration_minutes: number
          service_type: string
          status: AppointmentStatus
          notes: string | null
          location: string | null
          cancellation_reason: string | null
          cancelled_by: string | null
          cancelled_at: string | null
          files: Json
          rating: number | null
          review: string | null
          reviewed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          family_id: string
          professional_id: string
          scheduled_date: string
          duration_minutes?: number
          service_type: string
          status?: AppointmentStatus
          notes?: string | null
          location?: string | null
          cancellation_reason?: string | null
          cancelled_by?: string | null
          cancelled_at?: string | null
          files?: Json
          rating?: number | null
          review?: string | null
          reviewed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          family_id?: string
          professional_id?: string
          scheduled_date?: string
          duration_minutes?: number
          service_type?: string
          status?: AppointmentStatus
          notes?: string | null
          location?: string | null
          cancellation_reason?: string | null
          cancelled_by?: string | null
          cancelled_at?: string | null
          files?: Json
          rating?: number | null
          review?: string | null
          reviewed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          plan_name: PlanName
          plan_price: number
          billing_cycle: 'monthly' | 'quarterly' | 'annual'
          status: SubscriptionStatus
          start_date: string
          end_date: string | null
          trial_end_date: string | null
          cancelled_at: string | null
          payment_method: string | null
          last_payment_date: string | null
          next_payment_date: string | null
          promo_code_id: string | null
          discount_applied: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan_name: PlanName
          plan_price: number
          billing_cycle?: 'monthly' | 'quarterly' | 'annual'
          status?: SubscriptionStatus
          start_date?: string
          end_date?: string | null
          trial_end_date?: string | null
          cancelled_at?: string | null
          payment_method?: string | null
          last_payment_date?: string | null
          next_payment_date?: string | null
          promo_code_id?: string | null
          discount_applied?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plan_name?: PlanName
          plan_price?: number
          billing_cycle?: 'monthly' | 'quarterly' | 'annual'
          status?: SubscriptionStatus
          start_date?: string
          end_date?: string | null
          trial_end_date?: string | null
          cancelled_at?: string | null
          payment_method?: string | null
          last_payment_date?: string | null
          next_payment_date?: string | null
          promo_code_id?: string | null
          discount_applied?: number
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
          status: LeadStatus
          assigned_to: string | null
          metadata: Json
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
          status?: LeadStatus
          assigned_to?: string | null
          metadata?: Json
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
          status?: LeadStatus
          assigned_to?: string | null
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
      }
      promo_codes: {
        Row: {
          id: string
          code: string
          description: string | null
          discount_type: 'percentage' | 'fixed'
          discount_value: number
          max_uses: number | null
          current_uses: number
          max_uses_per_user: number
          valid_from: string
          valid_until: string | null
          active: boolean
          applicable_plans: string[]
          minimum_purchase: number | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          code: string
          description?: string | null
          discount_type: 'percentage' | 'fixed'
          discount_value: number
          max_uses?: number | null
          current_uses?: number
          max_uses_per_user?: number
          valid_from?: string
          valid_until?: string | null
          active?: boolean
          applicable_plans?: string[]
          minimum_purchase?: number | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          code?: string
          description?: string | null
          discount_type?: 'percentage' | 'fixed'
          discount_value?: number
          max_uses?: number | null
          current_uses?: number
          max_uses_per_user?: number
          valid_from?: string
          valid_until?: string | null
          active?: boolean
          applicable_plans?: string[]
          minimum_purchase?: number | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          appointment_id: string
          professional_id: string
          family_id: string
          rating: number
          comment: string | null
          punctuality_rating: number | null
          professionalism_rating: number | null
          communication_rating: number | null
          visible: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          appointment_id: string
          professional_id: string
          family_id: string
          rating: number
          comment?: string | null
          punctuality_rating?: number | null
          professionalism_rating?: number | null
          communication_rating?: number | null
          visible?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          appointment_id?: string
          professional_id?: string
          family_id?: string
          rating?: number
          comment?: string | null
          punctuality_rating?: number | null
          professionalism_rating?: number | null
          communication_rating?: number | null
          visible?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
