import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('⚠️ Supabase credentials missing. Please configure environment variables.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
        c
      },
    persistSession: true,
    storage: {
      getItem: async (key: string) => {
        const data = await window.spark.kv.get<string>(key)
  }
export i
          photo_url?: string
        await window.spark.kv.set(key, value)
        
          id: string
        await window.spark.kv.delete(key)
       
     
   
  

          role?: 'family' |
          p
          cre
        }
      appointm
          id: string
          professional_
          date: string
          status: 'pending' | 'confirmed'
          created_at: s
        }
          id?: string
          professional_id?: 
          date: string
         
          created
        }
          id?: string
          professional_id?:
          date?: string
          status?: 'pen
          created_at?: strin
        }
      promo_codes: {
          id: string
         
          discoun
          current_use
          valid_until: s
          created_at: string
        }
          id?: string
          description: strin
          discount_value
          current_uses?: numb
          valid_until: string
         
       
          id?: string
          desc
          discount_v
          current_uses?: 
          valid_until?: string
          created_at?: st
        }
      subscriptions: {
          id: string
          plan: string
          start_date: string
          payment_method?: s
         
        }
          id?: string
          plan: string
          start_date: string
          payment_method?
          created_at?:
        }
          id?: string
          plan?: string
          start_date?: string
          payment_method?: st
         
        }
    }
}































































































