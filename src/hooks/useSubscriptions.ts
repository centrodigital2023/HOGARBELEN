import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contextos/SupabaseAuthContext'
import type { Database } from '@/lib/supabase'

type SubscriptionRow = Database['public']['Tables']['subscriptions']['Row']
type SubscriptionInsert = Database['public']['Tables']['subscriptions']['Insert']
type SubscriptionUpdate = Database['public']['Tables']['subscriptions']['Update']

export interface Subscription extends SubscriptionRow {}

export function useSubscriptions() {
  const { user } = useAuth()
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchSubscriptions = async () => {
    if (!user) return

    try {
      setLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      setSubscriptions(data || [])
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error fetching subscriptions'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubscriptions()
  }, [user])

  const createSubscription = async (
    subscription: Omit<SubscriptionInsert, 'id' | 'created_at' | 'updated_at' | 'user_id'>
  ) => {
    if (!user) throw new Error('User not authenticated')

    try {
      const { data, error: insertError } = await supabase
        .from('subscriptions')
        .insert({
          ...subscription,
          user_id: user.id,
        })
        .select()
        .single()

      if (insertError) throw insertError

      await fetchSubscriptions()
      return data
    } catch (err) {
      throw err instanceof Error ? err : new Error('Error creating subscription')
    }
  }

  const updateSubscription = async (id: string, updates: SubscriptionUpdate) => {
    try {
      const { data, error: updateError } = await supabase
        .from('subscriptions')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (updateError) throw updateError

      await fetchSubscriptions()
      return data
    } catch (err) {
      throw err instanceof Error ? err : new Error('Error updating subscription')
    }
  }

  const cancelSubscription = async (id: string) => {
    return updateSubscription(id, { 
      status: 'cancelled',
      cancelled_at: new Date().toISOString()
    })
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
