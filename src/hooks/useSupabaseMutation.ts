import { useState } from 'react'

interface UseSupabaseMutationResult<TData, TVariables> {
  mutate: (variables: TVariables) => Promise<TData | undefined>
  loading: boolean
  error: Error | null
  data: TData | null
  reset: () => void
}

export function useSupabaseMutation<TData = unknown, TVariables = unknown>(
  mutationFn: (variables: TVariables) => Promise<TData>
): UseSupabaseMutationResult<TData, TVariables> {
  const [data, setData] = useState<TData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const mutate = async (variables: TVariables): Promise<TData | undefined> => {
    setLoading(true)
    setError(null)

    try {
      const result = await mutationFn(variables)
      setData(result)
      return result
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err))
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setData(null)
    setError(null)
    setLoading(false)
  }

  return {
    mutate,
    loading,
    error,
    data,
    reset
  }
}
