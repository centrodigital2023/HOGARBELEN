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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, MagnifyingGlass, Funnel, Robot, Phone, Envelope,
  User, Clock, CheckCircle, XCircle, Warning, TrendUp, ChartLine, DownloadSimple, 
  Calendar as CalendarIcon, FunnelSimple
} from '@phosphor-icons/react';
import { toast } from 'sonner';
import { notifyHighPriorityLead } from '@/lib/email';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

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
  const [filterSource, setFilterSource] = useState<string>('all');
  const [filterAIIntent, setFilterAIIntent] = useState<string>('all');
  const [filterAISentiment, setFilterAISentiment] = useState<string>('all');
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [adminEmails] = useKV<string[]>('admin-notification-emails', ['hogarbelen2022@gmail.com']);

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
    const matchesSource = filterSource === 'all' || lead.source_page === filterSource;
    const matchesAIIntent = filterAIIntent === 'all' || lead.ai_classification?.intent === filterAIIntent;
    const matchesAISentiment = filterAISentiment === 'all' || lead.ai_classification?.sentiment === filterAISentiment;
    
    const leadDate = new Date(lead.created_at);
    const matchesDateFrom = !dateFrom || leadDate >= dateFrom;
    const matchesDateTo = !dateTo || leadDate <= dateTo;
    
    return matchesSearch && matchesPriority && matchesStatus && matchesSource && 
           matchesAIIntent && matchesAISentiment && matchesDateFrom && matchesDateTo;
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

  useEffect(() => {
    const checkHighPriorityLeads = async () => {
      const newHighPriorityLeads = (leads || []).filter(
        l => (l.priority === 'high' || l.priority === 'critical') && l.status === 'new'
      );

      for (const lead of newHighPriorityLeads) {
        const alreadyNotified = await window.spark.kv.get<string[]>('notified-leads') ?? [];
        if (!alreadyNotified.includes(lead.id)) {
          await notifyHighPriorityLead(lead, adminEmails || ['hogarbelen2022@gmail.com']);
          await window.spark.kv.set('notified-leads', [...alreadyNotified, lead.id]);
        }
      }
    };

    checkHighPriorityLeads();
  }, [leads]);

  const getConversionRate = () => {
    const totalLeads = (leads || []).length;
    if (totalLeads === 0) return 0;
    const convertedLeads = statusCount.converted;
    return ((convertedLeads / totalLeads) * 100).toFixed(1);
  };

  const getLeadsByMonth = () => {
    const monthlyData: Record<string, number> = {};
    
    (leads || []).forEach(lead => {
      const date = new Date(lead.created_at);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      monthlyData[monthKey] = (monthlyData[monthKey] || 0) + 1;
    });

    return Object.entries(monthlyData)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-6);
  };

  const getConversionByMonth = () => {
    const monthlyData: Record<string, { total: number; converted: number }> = {};
    
    (leads || []).forEach(lead => {
      const date = new Date(lead.created_at);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { total: 0, converted: 0 };
      }
      
      monthlyData[monthKey].total += 1;
      if (lead.status === 'converted') {
        monthlyData[monthKey].converted += 1;
      }
    });

    return Object.entries(monthlyData)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-6)
      .map(([month, data]) => ({
        month,
        rate: data.total > 0 ? ((data.converted / data.total) * 100).toFixed(1) : '0',
        total: data.total,
        converted: data.converted,
      }));
  };

  const exportToCSV = () => {
    const headers = ['Fecha', 'Nombre', 'Email', 'Teléfono', 'Estado', 'Prioridad', 'Fuente', 'Mensaje', 'IA Intención', 'IA Sentimiento', 'IA Urgencia', 'Notas'];
    
    const rows = filteredLeads.map(lead => [
      new Date(lead.created_at).toLocaleString('es-CO'),
      lead.data.name || '',
      lead.data.email || '',
      lead.data.phone || '',
      lead.status,
      lead.priority,
      lead.source_page,
      lead.data.message || '',
      lead.ai_classification?.intent || '',
      lead.ai_classification?.sentiment || '',
      lead.ai_classification?.urgency || '',
      lead.notes || ''
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success(`${filteredLeads.length} leads exportados exitosamente`);
  };

  const exportToExcel = () => {
    const headers = ['Fecha', 'Nombre', 'Email', 'Teléfono', 'Estado', 'Prioridad', 'Fuente', 'Tipo', 'Mensaje', 'IA Intención', 'IA Sentimiento', 'IA Urgencia', 'Puntuación IA', 'Asignado a', 'Notas', 'Actualizado'];
    
    const rows = filteredLeads.map(lead => [
      new Date(lead.created_at).toLocaleString('es-CO'),
      lead.data.name || '',
      lead.data.email || '',
      lead.data.phone || '',
      lead.status,
      lead.priority,
      lead.source_page,
      lead.type,
      lead.data.message || '',
      lead.ai_classification?.intent || '',
      lead.ai_classification?.sentiment || '',
      lead.ai_classification?.urgency || '',
      lead.ai_classification?.priority_score ? (lead.ai_classification.priority_score * 100).toFixed(0) + '%' : '',
      lead.assigned_to || '',
      lead.notes || '',
      lead.updated_at ? new Date(lead.updated_at).toLocaleString('es-CO') : ''
    ]);

    let excelContent = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"/><style>table { border-collapse: collapse; } th, td { border: 1px solid #ddd; padding: 8px; text-align: left; } th { background-color: #4CAF50; color: white; }</style></head><body><table>';
    
    excelContent += '<tr>' + headers.map(h => `<th>${h}</th>`).join('') + '</tr>';
    
    rows.forEach(row => {
      excelContent += '<tr>' + row.map(cell => `<td>${String(cell).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</td>`).join('') + '</tr>';
    });
    
    excelContent += '</table></body></html>';

    const blob = new Blob([excelContent], { type: 'application/vnd.ms-excel' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_export_${new Date().toISOString().split('T')[0]}.xls`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success(`${filteredLeads.length} leads exportados a Excel exitosamente`);
  };

  const uniqueSources = Array.from(new Set((leads || []).map(l => l.source_page)));
  const uniqueIntents = Array.from(new Set((leads || []).filter(l => l.ai_classification?.intent).map(l => l.ai_classification!.intent)));
  const uniqueSentiments = Array.from(new Set((leads || []).filter(l => l.ai_classification?.sentiment).map(l => l.ai_classification!.sentiment)));

  const clearAllFilters = () => {
    setSearchTerm('');
    setFilterPriority('all');
    setFilterStatus('all');
    setFilterSource('all');
    setFilterAIIntent('all');
    setFilterAISentiment('all');
    setDateFrom(undefined);
    setDateTo(undefined);
    toast.success('Filtros limpiados');
  };

  const activeFiltersCount = [
    filterPriority !== 'all',
    filterStatus !== 'all',
    filterSource !== 'all',
    filterAIIntent !== 'all',
    filterAISentiment !== 'all',
    !!dateFrom,
    !!dateTo,
  ].filter(Boolean).length;

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
        <Tabs defaultValue="leads" className="space-y-6">
          <TabsList>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="statistics">Estadísticas</TabsTrigger>
          </TabsList>

          <TabsContent value="leads" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
                <div className="flex flex-col gap-4">
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
                    <Button 
                      variant="outline" 
                      onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                      className="w-full md:w-auto"
                    >
                      <FunnelSimple size={16} className="mr-2" />
                      Filtros Avanzados
                      {activeFiltersCount > 0 && (
                        <Badge className="ml-2 bg-primary">{activeFiltersCount}</Badge>
                      )}
                    </Button>
                  </div>

                  {showAdvancedFilters && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Fuente</label>
                        <Select value={filterSource} onValueChange={setFilterSource}>
                          <SelectTrigger>
                            <SelectValue placeholder="Todas las fuentes" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Todas las fuentes</SelectItem>
                            {uniqueSources.map(source => (
                              <SelectItem key={source} value={source}>{source}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">IA: Intención</label>
                        <Select value={filterAIIntent} onValueChange={setFilterAIIntent}>
                          <SelectTrigger>
                            <SelectValue placeholder="Todas las intenciones" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Todas las intenciones</SelectItem>
                            {uniqueIntents.map(intent => (
                              <SelectItem key={intent} value={intent}>{intent}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">IA: Sentimiento</label>
                        <Select value={filterAISentiment} onValueChange={setFilterAISentiment}>
                          <SelectTrigger>
                            <SelectValue placeholder="Todos los sentimientos" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Todos los sentimientos</SelectItem>
                            {uniqueSentiments.map(sentiment => (
                              <SelectItem key={sentiment} value={sentiment}>{sentiment}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Fecha desde</label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              <CalendarIcon size={16} className="mr-2" />
                              {dateFrom ? dateFrom.toLocaleDateString('es-CO') : 'Seleccionar fecha'}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={dateFrom}
                              onSelect={setDateFrom}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Fecha hasta</label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              <CalendarIcon size={16} className="mr-2" />
                              {dateTo ? dateTo.toLocaleDateString('es-CO') : 'Seleccionar fecha'}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={dateTo}
                              onSelect={setDateTo}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="flex items-end">
                        <Button 
                          variant="ghost" 
                          onClick={clearAllFilters}
                          className="w-full"
                        >
                          Limpiar Filtros
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2 border-t">
                    <Button 
                      variant="outline" 
                      onClick={exportToCSV}
                      className="flex-1"
                    >
                      <DownloadSimple size={16} className="mr-2" />
                      Exportar CSV
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={exportToExcel}
                      className="flex-1"
                    >
                      <DownloadSimple size={16} className="mr-2" />
                      Exportar Excel
                    </Button>
                    <div className="flex items-center text-sm text-gray-600 px-4">
                      {filteredLeads.length} de {(leads || []).length} leads
                    </div>
                  </div>
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
          </TabsContent>

          <TabsContent value="statistics">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <TrendUp size={20} className="text-green-600" />
                      Tasa de Conversión
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold text-green-600">{getConversionRate()}%</p>
                    <p className="text-sm text-gray-600 mt-2">
                      {statusCount.converted} de {(leads || []).length} leads convertidos
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Warning size={20} className="text-orange-600" />
                      Alta Prioridad
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold text-orange-600">
                      {priorityCount.high + priorityCount.critical}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      Requieren atención inmediata
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <ChartLine size={20} className="text-blue-600" />
                      Promedio Mensual
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold text-blue-600">
                      {Math.round((leads || []).length / Math.max(getLeadsByMonth().length, 1))}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      Leads por mes (últimos 6 meses)
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Leads por Mes (Últimos 6 Meses)</CardTitle>
                  <CardDescription>Tendencia de nuevos leads recibidos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {getLeadsByMonth().map(([month, count]) => (
                      <div key={month} className="flex items-center gap-4">
                        <div className="w-24 text-sm font-medium text-gray-600">
                          {new Date(month + '-01').toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })}
                        </div>
                        <div className="flex-1">
                          <div className="h-8 bg-blue-100 rounded-lg overflow-hidden">
                            <div
                              className="h-full bg-blue-600 flex items-center justify-end px-3 text-white text-sm font-semibold"
                              style={{
                                width: `${Math.max((count / Math.max(...getLeadsByMonth().map(([, c]) => c))) * 100, 10)}%`
                              }}
                            >
                              {count}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tasa de Conversión por Mes</CardTitle>
                  <CardDescription>Porcentaje de leads convertidos mensualmente</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {getConversionByMonth().map(({ month, rate, total, converted }) => (
                      <div key={month} className="flex items-center gap-4">
                        <div className="w-24 text-sm font-medium text-gray-600">
                          {new Date(month + '-01').toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })}
                        </div>
                        <div className="flex-1">
                          <div className="h-8 bg-green-100 rounded-lg overflow-hidden">
                            <div
                              className="h-full bg-green-600 flex items-center justify-end px-3 text-white text-sm font-semibold"
                              style={{ width: `${Math.max(parseFloat(rate), 5)}%` }}
                            >
                              {rate}%
                            </div>
                          </div>
                        </div>
                        <div className="w-32 text-sm text-gray-600">
                          {converted} / {total} leads
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribución por Estado</CardTitle>
                  <CardDescription>Proporción de leads en cada etapa del funnel</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(statusCount).map(([status, count]) => {
                      const total = (leads || []).length;
                      const percentage = total > 0 ? ((count / total) * 100).toFixed(1) : '0';
                      const colors = {
                        new: 'bg-purple-600',
                        contacted: 'bg-blue-600',
                        qualified: 'bg-indigo-600',
                        converted: 'bg-green-600',
                        lost: 'bg-gray-600',
                      };
                      return (
                        <div key={status} className="flex items-center gap-4">
                          <div className="w-32 text-sm font-medium capitalize">{status}</div>
                          <div className="flex-1">
                            <div className="h-8 bg-gray-100 rounded-lg overflow-hidden">
                              <div
                                className={`h-full ${colors[status as keyof typeof colors]} flex items-center justify-end px-3 text-white text-sm font-semibold`}
                                style={{ width: `${Math.max(parseFloat(percentage), 5)}%` }}
                              >
                                {percentage}%
                              </div>
                            </div>
                          </div>
                          <div className="w-16 text-sm text-gray-600 text-right">{count}</div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
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
