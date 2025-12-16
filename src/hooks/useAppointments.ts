import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contextos/SupabaseAuthContext'

export interface Appointment {
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

export function useAppointments() {
  const { user } = useAuth()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!user) {
      setAppointments([])
      setLoading(false)
      return
    }

    fetchAppointments()

    const subscription = supabase
      .channel('appointments')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'appointments',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchAppointments()
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [user])

  const fetchAppointments = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .or(`user_id.eq.${user.id},professional_id.eq.${user.id}`)
        .order('date', { ascending: true })

      if (error) throw error
      setAppointments(data || [])
    } catch (err) {
      setError(err as Error)
      console.error('Error fetching appointments:', err)
    } finally {
      setLoading(false)
    }
  }

  const createAppointment = async (
    appointment: Omit<Appointment, 'id' | 'created_at' | 'updated_at' | 'user_id'>
  ) => {
    if (!user) throw new Error('User not authenticated')

    const { data, error } = await supabase
      .from('appointments')
      .insert({
        ...appointment,
        user_id: user.id,
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  const updateAppointment = async (id: string, updates: Partial<Appointment>) => {
    const { data, error } = await supabase
      .from('appointments')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  const deleteAppointment = async (id: string) => {
    const { error } = await supabase.from('appointments').delete().eq('id', id)

    if (error) throw error
  }

  return {
    appointments,
    loading,
    error,
    createAppointment,
    updateAppointment,
    deleteAppointment,
    refetch: fetchAppointments,
  }
}
