import { useState, useEffect } from 'react';
import { useAdminAuth } from '@/contextos/AdminAuthContext';
import { useKV } from '@github/spark/hooks';
import { Lead } from '@/types/admin';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  ArrowLeft, MagnifyingGlass, Funnel, Robot, Phone, Envelope,
  User, Clock, CheckCircle, XCircle, Warning
} from '@phosphor-icons/react';
import { toast } from 'sonner';

interface AdminLeadsProps {
  setPage: (page: string) => void;
}

const AdminLeads = ({ setPage }: AdminLeadsProps) => {
  const { isAuthenticated, adminUser } = useAdminAuth();
  const [leads, setLeads] = useKV<Lead[]>('leads', []);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [notes, setNotes] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    if (!isAuthenticated) {
      setPage('admin-login');
    }
  }, [isAuthenticated]);

  const filteredLeads = (leads || []).filter(lead => {
    const matchesSearch = !searchTerm || 
      lead.data.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.data.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.data.message?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === 'all' || lead.priority === filterPriority;
    const matchesStatus = filterStatus === 'all' || lead.status === filterStatus;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const updateLeadStatus = async (leadId: string, status: Lead['status']) => {
    await setLeads((current) =>
      (current || []).map(l =>
        l.id === leadId
          ? {
              ...l,
              status,
              assigned_to: adminUser?.email,
              updated_at: new Date().toISOString(),
            }
          : l
      )
    );
    toast.success('Estado actualizado');
  };

  const saveNotes = async () => {
    if (!selectedLead) return;
    
    await setLeads((current) =>
      (current || []).map(l =>
        l.id === selectedLead.id
          ? {
              ...l,
              notes,
              updated_at: new Date().toISOString(),
            }
          : l
      )
    );
    toast.success('Notas guardadas');
    setSelectedLead(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-purple-100 text-purple-800';
      case 'contacted': return 'bg-blue-100 text-blue-800';
      case 'qualified': return 'bg-indigo-100 text-indigo-800';
      case 'converted': return 'bg-green-100 text-green-800';
      case 'lost': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const priorityCount = {
    critical: (leads || []).filter(l => l.priority === 'critical').length,
    high: (leads || []).filter(l => l.priority === 'high').length,
    medium: (leads || []).filter(l => l.priority === 'medium').length,
    low: (leads || []).filter(l => l.priority === 'low').length,
  };

  const statusCount = {
    new: (leads || []).filter(l => l.status === 'new').length,
    contacted: (leads || []).filter(l => l.status === 'contacted').length,
    qualified: (leads || []).filter(l => l.status === 'qualified').length,
    converted: (leads || []).filter(l => l.status === 'converted').length,
    lost: (leads || []).filter(l => l.status === 'lost').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setPage('admin-dashboard')}>
              <ArrowLeft size={16} className="mr-2" />
              Volver
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestión de Leads</h1>
              <p className="text-sm text-gray-600">Seguimiento de contactos y solicitudes</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Total</p>
                <p className="text-3xl font-bold">{(leads || []).length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Nuevos</p>
                <p className="text-3xl font-bold text-purple-600">{statusCount.new}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Contactados</p>
                <p className="text-3xl font-bold text-blue-600">{statusCount.contacted}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Calificados</p>
                <p className="text-3xl font-bold text-indigo-600">{statusCount.qualified}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Convertidos</p>
                <p className="text-3xl font-bold text-green-600">{statusCount.converted}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <MagnifyingGlass size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Buscar por nombre, email o mensaje..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Prioridad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las prioridades</SelectItem>
                  <SelectItem value="critical">Crítica</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="medium">Media</SelectItem>
                  <SelectItem value="low">Baja</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="new">Nuevo</SelectItem>
                  <SelectItem value="contacted">Contactado</SelectItem>
                  <SelectItem value="qualified">Calificado</SelectItem>
                  <SelectItem value="converted">Convertido</SelectItem>
                  <SelectItem value="lost">Perdido</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4">
          {filteredLeads.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-gray-500">
                No se encontraron leads
              </CardContent>
            </Card>
          ) : (
            filteredLeads.map((lead) => (
              <Card key={lead.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{lead.data.name || 'Sin nombre'}</h3>
                        <Badge className={getPriorityColor(lead.priority)}>
                          {lead.priority}
                        </Badge>
                        <Badge className={getStatusColor(lead.status)}>
                          {lead.status}
                        </Badge>
                        {lead.ai_classification && (
                          <Badge variant="outline" className="bg-purple-50">
                            <Robot size={14} className="mr-1" />
                            IA: {lead.ai_classification.intent}
                          </Badge>
                        )}
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        {lead.data.email && (
                          <div className="flex items-center gap-2">
                            <Envelope size={14} />
                            <a href={`mailto:${lead.data.email}`} className="hover:underline">
                              {lead.data.email}
                            </a>
                          </div>
                        )}
                        {lead.data.phone && (
                          <div className="flex items-center gap-2">
                            <Phone size={14} />
                            <a href={`tel:${lead.data.phone}`} className="hover:underline">
                              {lead.data.phone}
                            </a>
                          </div>
                        )}
                        {lead.data.message && (
                          <p className="text-gray-600 mt-2 line-clamp-2">{lead.data.message}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
                          {new Date(lead.created_at).toLocaleDateString('es-CO')}
                        </div>
                        <div className="flex items-center gap-1">
                          <User size={12} />
                          Fuente: {lead.source_page}
                        </div>
                        {lead.ai_classification && (
                          <div className="flex items-center gap-1">
                            <Robot size={12} />
                            Sentimiento: {lead.ai_classification.sentiment}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedLead(lead);
                          setNotes(lead.notes || '');
                        }}
                      >
                        Ver Detalles
                      </Button>
                      {lead.status === 'new' && (
                        <Button
                          size="sm"
                          onClick={() => updateLeadStatus(lead.id, 'contacted')}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Marcar Contactado
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalles del Lead</DialogTitle>
            <DialogDescription>
              Gestione el seguimiento y actualice el estado
            </DialogDescription>
          </DialogHeader>

          {selectedLead && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Nombre</label>
                  <p className="text-base">{selectedLead.data.name || 'No proporcionado'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <p className="text-base">{selectedLead.data.email || 'No proporcionado'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Teléfono</label>
                  <p className="text-base">{selectedLead.data.phone || 'No proporcionado'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Fuente</label>
                  <p className="text-base">{selectedLead.source_page}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Tipo</label>
                  <p className="text-base">{selectedLead.type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Fecha</label>
                  <p className="text-base">{new Date(selectedLead.created_at).toLocaleString('es-CO')}</p>
                </div>
                {selectedLead.data.message && (
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-600">Mensaje</label>
                    <p className="text-base">{selectedLead.data.message}</p>
                  </div>
                )}
              </div>

              {selectedLead.ai_classification && (
                <Card className="bg-purple-50 border-purple-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Robot size={16} />
                      Clasificación IA
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-1">
                    <p><strong>Intención:</strong> {selectedLead.ai_classification.intent}</p>
                    <p><strong>Sentimiento:</strong> {selectedLead.ai_classification.sentiment}</p>
                    <p><strong>Urgencia:</strong> {selectedLead.ai_classification.urgency}</p>
                    <p><strong>Puntuación:</strong> {(selectedLead.ai_classification.priority_score * 100).toFixed(0)}%</p>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Estado</label>
                <Select
                  value={selectedLead.status}
                  onValueChange={(value) => updateLeadStatus(selectedLead.id, value as Lead['status'])}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">Nuevo</SelectItem>
                    <SelectItem value="contacted">Contactado</SelectItem>
                    <SelectItem value="qualified">Calificado</SelectItem>
                    <SelectItem value="converted">Convertido</SelectItem>
                    <SelectItem value="lost">Perdido</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Notas Internas</label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Agregar notas sobre este lead..."
                  rows={4}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={saveNotes} className="flex-1">
                  Guardar Notas
                </Button>
                <Button variant="outline" onClick={() => setSelectedLead(null)} className="flex-1">
                  Cerrar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminLeads;
