import { useKV } from '@github/spark/hooks'

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
  const [promoCodes, setPromoCodes] = useKV<PromoCode[]>('promo-codes', [])

  const activePromoCodes = (promoCodes || []).filter((code) => code.is_active)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  const validatePromoCode = async (code: string): Promise<PromoCode | null> => {
    try {
      const allCodes = await window.spark.kv.get<PromoCode[]>('promo-codes') || []
      const promoCode = allCodes.find(
        (pc) => pc.code.toUpperCase() === code.toUpperCase() && pc.is_active
      )

      if (!promoCode) return null

      const now = new Date()
      const validFrom = new Date(promoCode.valid_from)
      const validUntil = new Date(promoCode.valid_until)

      if (now < validFrom || now > validUntil) {
        return null
      }

      if (promoCode.max_uses && promoCode.current_uses >= promoCode.max_uses) {
        return null
      }

      return promoCode
    } catch (err) {
      console.error('Error validating promo code:', err)
      return null
    }
  }

  const usePromoCode = async (id: string) => {
    await setPromoCodes((current) =>
      (current || []).map((code) =>
        code.id === id
          ? { ...code, current_uses: code.current_uses + 1 }
          : code
      )
    )
  }

  const createPromoCode = async (
    promoCode: Omit<PromoCode, 'id' | 'created_at' | 'updated_at'>
  ) => {
    const newPromoCode: PromoCode = {
      ...promoCode,
      id: `promo-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    await setPromoCodes((current) => [...(current || []), newPromoCode])
    return newPromoCode
  }

  const updatePromoCode = async (id: string, updates: Partial<PromoCode>) => {
    await setPromoCodes((current) =>
      (current || []).map((code) =>
        code.id === id
          ? { ...code, ...updates, updated_at: new Date().toISOString() }
          : code
      )
    )

    return (promoCodes || []).find((code) => code.id === id)
  }

  const deletePromoCode = async (id: string) => {
    await setPromoCodes((current) =>
      (current || []).filter((code) => code.id !== id)
    )
  }

  const refetch = async () => {
    const current = await window.spark.kv.get<PromoCode[]>('promo-codes')
    setPromoCodes(current || [])
  }

  return {
    promoCodes: activePromoCodes,
    loading: false,
    error: null,
    validatePromoCode,
    usePromoCode,
    createPromoCode,
    updatePromoCode,
    deletePromoCode,
    refetch,
  }
}
