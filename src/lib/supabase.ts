import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://cgfpwlqnhgclzzaiqhwz.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('⚠️ Supabase credentials missing. Please configure environment variables.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: {
      getItem: async (key: string) => {
        const data = await window.spark.kv.get<string>(key)
        return data || null
      },
      setItem: async (key: string, value: string) => {
        await window.spark.kv.set(key, value)
      },
      removeItem: async (key: string) => {
        await window.spark.kv.delete(key)
      },
    },
  },
})

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          role: 'family' | 'professional'
          plan?: string
          photo_url?: string
          phone?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          role: 'family' | 'professional'
          plan?: string
          photo_url?: string
          phone?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          role?: 'family' | 'professional'
          plan?: string
          photo_url?: string
          phone?: string
          created_at?: string
          updated_at?: string
        }
      }
      appointments: {
        Row: {
          id: string
          user_id: string
          professional_id?: string
          service: string
          date: string
          time: string
          status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          notes?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          professional_id?: string
          service: string
          date: string
          time: string
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          notes?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          professional_id?: string
          service?: string
          date?: string
          time?: string
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          notes?: string
          created_at?: string
          updated_at?: string
        }
      }
      promo_codes: {
        Row: {
          id: string
          code: string
          description: string
          discount_type: 'percentage' | 'fixed'
          discount_value: number
          max_uses?: number
          current_uses: number
          valid_from: string
          valid_until: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          code: string
          description: string
          discount_type: 'percentage' | 'fixed'
          discount_value: number
          max_uses?: number
          current_uses?: number
          valid_from: string
          valid_until: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          code?: string
          description?: string
          discount_type?: 'percentage' | 'fixed'
          discount_value?: number
          max_uses?: number
          current_uses?: number
          valid_from?: string
          valid_until?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          plan: string
          status: 'active' | 'cancelled' | 'expired' | 'pending'
          start_date: string
          end_date?: string
          payment_method?: string
          amount: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan: string
          status?: 'active' | 'cancelled' | 'expired' | 'pending'
          start_date: string
          end_date?: string
          payment_method?: string
          amount: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plan?: string
          status?: 'active' | 'cancelled' | 'expired' | 'pending'
          start_date?: string
          end_date?: string
          payment_method?: string
          amount?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
