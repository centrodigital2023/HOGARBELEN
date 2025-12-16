import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contextos/SupabaseAuthContext'

export interface Subscription {
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

export function useSubscriptions() {
  const { user } = useAuth()
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!user) {
      setSubscriptions([])
      setLoading(false)
      return
    }

    fetchSubscriptions()

    const subscription = supabase
      .channel('subscriptions')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'subscriptions',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchSubscriptions()
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [user])

  const fetchSubscriptions = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setSubscriptions(data || [])
    } catch (err) {
      setError(err as Error)
      console.error('Error fetching subscriptions:', err)
    } finally {
      setLoading(false)
    }
  }

  const createSubscription = async (
    subscription: Omit<Subscription, 'id' | 'created_at' | 'updated_at' | 'user_id'>
  ) => {
    if (!user) throw new Error('User not authenticated')

    const { data, error } = await supabase
      .from('subscriptions')
      .insert({
        ...subscription,
        user_id: user.id,
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  const updateSubscription = async (id: string, updates: Partial<Subscription>) => {
    const { data, error } = await supabase
      .from('subscriptions')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  const cancelSubscription = async (id: string) => {
    return updateSubscription(id, { status: 'cancelled' })
  }

  const activeSubscription = subscriptions.find((sub) => sub.status === 'active')

  return {
    subscriptions,
    activeSubscription,
    loading,
    error,
    createSubscription,
    updateSubscription,
    cancelSubscription,
    refetch: fetchSubscriptions,
  }
}
