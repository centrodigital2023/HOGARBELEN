import { useKV } from '@github/spark/hooks'
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
  const [allAppointments, setAllAppointments] = useKV<Appointment[]>('all-appointments', [])

  const appointments = (allAppointments || []).filter(
    (apt) => apt.user_id === user?.id || apt.professional_id === user?.id
  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const createAppointment = async (
    appointment: Omit<Appointment, 'id' | 'created_at' | 'updated_at' | 'user_id'>
  ) => {
    if (!user) throw new Error('User not authenticated')

    const newAppointment: Appointment = {
      ...appointment,
      id: `apt-${Date.now()}`,
      user_id: user.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    await setAllAppointments((current) => [...(current || []), newAppointment])
    return newAppointment
  }

  const updateAppointment = async (id: string, updates: Partial<Appointment>) => {
    await setAllAppointments((current) =>
      (current || []).map((apt) =>
        apt.id === id
          ? { ...apt, ...updates, updated_at: new Date().toISOString() }
          : apt
      )
    )

    return (allAppointments || []).find((apt) => apt.id === id)
  }

  const deleteAppointment = async (id: string) => {
    await setAllAppointments((current) =>
      (current || []).filter((apt) => apt.id !== id)
    )
  }

  const refetch = async () => {
    const current = await window.spark.kv.get<Appointment[]>('all-appointments')
    setAllAppointments(current || [])
  }

  return {
    appointments,
    loading: false,
    error: null,
    createAppointment,
    updateAppointment,
    deleteAppointment,
    refetch,
  }
}
