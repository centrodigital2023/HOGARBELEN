import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contextos/SupabaseAuthContext'
import type { Database } from '@/lib/supabase'

type AppointmentRow = Database['public']['Tables']['appointments']['Row']
type AppointmentInsert = Database['public']['Tables']['appointments']['Insert']
type AppointmentUpdate = Database['public']['Tables']['appointments']['Update']

export interface Appointment extends AppointmentRow {}

export function useAppointments() {
  const { user } = useAuth()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchAppointments = async () => {
    if (!user) return

    try {
      setLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from('appointments')
        .select('*')
        .or(`family_id.eq.${user.id},professional_id.eq.${user.id}`)
        .order('scheduled_date', { ascending: true })

      if (fetchError) throw fetchError

      setAppointments(data || [])
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error fetching appointments'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAppointments()
  }, [user])

  const createAppointment = async (
    appointment: Omit<AppointmentInsert, 'id' | 'created_at' | 'updated_at' | 'family_id'>
  ) => {
    if (!user) throw new Error('User not authenticated')

    try {
      const { data, error: insertError } = await supabase
        .from('appointments')
        .insert({
          ...appointment,
          family_id: user.id,
        })
        .select()
        .single()

      if (insertError) throw insertError

      await fetchAppointments()
      return data
    } catch (err) {
      throw err instanceof Error ? err : new Error('Error creating appointment')
    }
  }

  const updateAppointment = async (id: string, updates: AppointmentUpdate) => {
    try {
      const { data, error: updateError } = await supabase
        .from('appointments')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (updateError) throw updateError

      await fetchAppointments()
      return data
    } catch (err) {
      throw err instanceof Error ? err : new Error('Error updating appointment')
    }
  }

  const deleteAppointment = async (id: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('appointments')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError

      await fetchAppointments()
    } catch (err) {
      throw err instanceof Error ? err : new Error('Error deleting appointment')
    }
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
