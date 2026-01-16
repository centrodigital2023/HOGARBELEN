import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, CircleNotch } from '@phosphor-icons/react'

export function SupabaseConnectionTest() {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking')
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('count')
          .limit(1)

        if (error) {
          setStatus('error')
          setMessage(`Error: ${error.message}`)
        } else {
          setStatus('connected')
          setMessage('Conexión exitosa a Supabase')
        }
      } catch (err) {
        setStatus('error')
        setMessage(`Error de conexión: ${err instanceof Error ? err.message : 'Unknown error'}`)
      }
    }

    checkConnection()
  }, [])

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Estado de Conexión Supabase
          {status === 'checking' && <CircleNotch className="animate-spin" size={20} />}
          {status === 'connected' && <CheckCircle size={20} className="text-green-500" weight="fill" />}
          {status === 'error' && <XCircle size={20} className="text-red-500" weight="fill" />}
        </CardTitle>
        <CardDescription>
          Verificando la conexión a la base de datos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          {status === 'checking' && (
            <Badge variant="secondary">Verificando...</Badge>
          )}
          {status === 'connected' && (
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Conectado</Badge>
          )}
          {status === 'error' && (
            <Badge variant="destructive">Error</Badge>
          )}
        </div>
        <p className="mt-3 text-sm text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  )
}
