import { useKV } from '@github/spark/hooks'
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
  const [allSubscriptions, setAllSubscriptions] = useKV<Subscription[]>('all-subscriptions', [])

  const subscriptions = (allSubscriptions || [])
    .filter((sub) => sub.user_id === user?.id)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  const createSubscription = async (
    subscription: Omit<Subscription, 'id' | 'created_at' | 'updated_at' | 'user_id'>
  ) => {
    if (!user) throw new Error('User not authenticated')

    const newSubscription: Subscription = {
      ...subscription,
      id: `sub-${Date.now()}`,
      user_id: user.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    await setAllSubscriptions((current) => [...(current || []), newSubscription])
    return newSubscription
  }

  const updateSubscription = async (id: string, updates: Partial<Subscription>) => {
    await setAllSubscriptions((current) =>
      (current || []).map((sub) =>
        sub.id === id
          ? { ...sub, ...updates, updated_at: new Date().toISOString() }
          : sub
      )
    )

    return (allSubscriptions || []).find((sub) => sub.id === id)
  }

  const cancelSubscription = async (id: string) => {
    return updateSubscription(id, { status: 'cancelled' })
  }

  const activeSubscription = subscriptions.find((sub) => sub.status === 'active')

  const refetch = async () => {
    const current = await window.spark.kv.get<Subscription[]>('all-subscriptions')
    setAllSubscriptions(current || [])
  }

  return {
    subscriptions,
    activeSubscription,
    loading: false,
    error: null,
    createSubscription,
    updateSubscription,
    cancelSubscription,
    refetch,
  }
}
