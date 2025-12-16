import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export interface PromoCode {
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

export function usePromoCodes() {
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetchPromoCodes()

    const subscription = supabase
      .channel('promo_codes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'promo_codes',
        },
        () => {
          fetchPromoCodes()
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const fetchPromoCodes = async () => {
    try {
      const { data, error } = await supabase
        .from('promo_codes')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (error) throw error
      setPromoCodes(data || [])
    } catch (err) {
      setError(err as Error)
      console.error('Error fetching promo codes:', err)
    } finally {
      setLoading(false)
    }
  }

  const validatePromoCode = async (code: string): Promise<PromoCode | null> => {
    try {
      const { data, error } = await supabase
        .from('promo_codes')
        .select('*')
        .eq('code', code.toUpperCase())
        .eq('is_active', true)
        .single()

      if (error) throw error

      if (!data) return null

      const now = new Date()
      const validFrom = new Date(data.valid_from)
      const validUntil = new Date(data.valid_until)

      if (now < validFrom || now > validUntil) {
        return null
      }

      if (data.max_uses && data.current_uses >= data.max_uses) {
        return null
      }

      return data
    } catch (err) {
      console.error('Error validating promo code:', err)
      return null
    }
  }

  const usePromoCode = async (id: string) => {
    const { data, error } = await supabase.rpc('increment_promo_code_usage', {
      promo_id: id,
    })

    if (error) {
      const { data: promoData, error: fetchError } = await supabase
        .from('promo_codes')
        .select('current_uses')
        .eq('id', id)
        .single()

      if (fetchError) throw fetchError

      const { error: updateError } = await supabase
        .from('promo_codes')
        .update({ current_uses: (promoData?.current_uses || 0) + 1 })
        .eq('id', id)

      if (updateError) throw updateError
    }

    return data
  }

  const createPromoCode = async (
    promoCode: Omit<PromoCode, 'id' | 'created_at' | 'updated_at'>
  ) => {
    const { data, error } = await supabase
      .from('promo_codes')
      .insert(promoCode)
      .select()
      .single()

    if (error) throw error
    return data
  }

  const updatePromoCode = async (id: string, updates: Partial<PromoCode>) => {
    const { data, error } = await supabase
      .from('promo_codes')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  const deletePromoCode = async (id: string) => {
    const { error } = await supabase.from('promo_codes').delete().eq('id', id)

    if (error) throw error
  }

  return {
    promoCodes,
    loading,
    error,
    validatePromoCode,
    usePromoCode,
    createPromoCode,
    updatePromoCode,
    deletePromoCode,
    refetch: fetchPromoCodes,
  }
}
