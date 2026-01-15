import { useState, useEffect } from 'react'
import type { PostgrestError } from '@supabase/supabase-js'

interface UseSupabaseQueryOptions {
  enabled?: boolean
  refetchInterval?: number
}

interface UseSupabaseQueryResult<T> {
  data: T | null
  loading: boolean
  error: PostgrestError | null
  refetch: () => Promise<void>
}

export function useSupabaseQuery<T>(
  key: string,
  queryFn: () => Promise<{ data: T | null; error: PostgrestError | null }>,
  options: UseSupabaseQueryOptions = {}
): UseSupabaseQueryResult<T> {
  const { enabled = true, refetchInterval } = options
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<PostgrestError | null>(null)

  const fetchData = async () => {
    if (!enabled) return

    setLoading(true)
    try {
      const result = await queryFn()
      setData(result.data)
      setError(result.error)
    } catch (err) {
      setError(err as PostgrestError)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()

    if (refetchInterval) {
      const interval = setInterval(fetchData, refetchInterval)
      return () => clearInterval(interval)
    }
  }, [key, enabled])

  return {
    data,
    loading,
    error,
    refetch: fetchData
  }
}
