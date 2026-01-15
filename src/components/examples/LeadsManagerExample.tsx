import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery'
import { useSupabaseMutation } from '@/hooks/useSupabaseMutation'
import { supabase } from '@/lib/supabase'
import type { Lead } from '@/lib/supabase-helpers'
import { EnvelopeSimple, Phone, MapPin, CheckCircle, Warning } from '@phosphor-icons/react'

export function LeadsManagerExample() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')

  const { data: leads, loading, refetch } = useSupabaseQuery<Lead[]>(
    'leads',
    async () => {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10)

      return { data: data as Lead[], error }
    }
  )

  const createLead = useSupabaseMutation<void, Omit<Lead, 'id' | 'created_at' | 'updated_at'>>(
    async (newLead) => {
      const { error } = await supabase
        .from('leads')
        .insert([newLead])

      if (error) throw new Error(error.message)
    }
  )

  const updateLeadStatus = useSupabaseMutation<void, { id: string; status: Lead['status'] }>(
    async ({ id, status }) => {
      const { error } = await supabase
        .from('leads')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id)

      if (error) throw new Error(error.message)
    }
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await createLead.mutate({
        name,
        email,
        phone,
        message,
        source: 'web',
        status: 'new'
      })

      toast.success('¡Lead creado exitosamente!')
      setName('')
      setEmail('')
      setPhone('')
      setMessage('')
      refetch()
    } catch (error) {
      toast.error('Error al crear el lead')
    }
  }

  const handleStatusChange = async (leadId: string, newStatus: Lead['status']) => {
    try {
      await updateLeadStatus.mutate({ id: leadId, status: newStatus })
      toast.success('Estado actualizado')
      refetch()
    } catch (error) {
      toast.error('Error al actualizar estado')
    }
  }

  const getStatusColor = (status: Lead['status']) => {
    switch (status) {
      case 'new':
        return 'bg-blue-500'
      case 'contacted':
        return 'bg-yellow-500'
      case 'converted':
        return 'bg-green-500'
      case 'closed':
        return 'bg-gray-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Crear Nuevo Lead</CardTitle>
            <CardDescription>
              Registra un nuevo prospecto en el sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Completo</Label>
                <Input
                  id="name"
                  placeholder="Juan Pérez"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <EnvelopeSimple size={16} />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="juan@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone size={16} />
                  Teléfono
                </Label>
                <Input
                  id="phone"
                  placeholder="+57 321 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mensaje</Label>
                <Textarea
                  id="message"
                  placeholder="¿En qué podemos ayudarte?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={createLead.loading}
              >
                {createLead.loading ? 'Creando...' : 'Crear Lead'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Leads Recientes</CardTitle>
            <CardDescription>
              Últimos 10 prospectos registrados
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
              </div>
            ) : leads && leads.length > 0 ? (
              <div className="space-y-3">
                {leads.map((lead) => (
                  <div
                    key={lead.id}
                    className="p-4 border rounded-lg space-y-2 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="font-medium">{lead.name}</p>
                        <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <EnvelopeSimple size={14} />
                            {lead.email}
                          </span>
                          {lead.phone && (
                            <span className="flex items-center gap-1">
                              <Phone size={14} />
                              {lead.phone}
                            </span>
                          )}
                        </div>
                      </div>
                      <Badge className={getStatusColor(lead.status || 'new')}>
                        {lead.status || 'new'}
                      </Badge>
                    </div>

                    {lead.message && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {lead.message}
                      </p>
                    )}

                    <div className="flex gap-2 flex-wrap">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusChange(lead.id!, 'contacted')}
                        disabled={updateLeadStatus.loading}
                      >
                        <CheckCircle size={14} className="mr-1" />
                        Contactado
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusChange(lead.id!, 'converted')}
                        disabled={updateLeadStatus.loading}
                      >
                        <CheckCircle size={14} className="mr-1" />
                        Convertido
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusChange(lead.id!, 'closed')}
                        disabled={updateLeadStatus.loading}
                      >
                        Cerrar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Warning size={48} className="mx-auto mb-2 opacity-50" />
                <p>No hay leads registrados</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
