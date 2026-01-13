import { useState, useEffect } from 'react';
import { useAdminAuth } from '@/contextos/AdminAuthContext';
import { useKV } from '@github/spark/hooks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowLeft, TrendUp, TrendDown, Users, Briefcase, ChartBar, 
  ChartLine, Calendar as CalendarIcon, DownloadSimple
} from '@phosphor-icons/react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { toast } from 'sonner';

interface AdminAnalyticsProps {
  setPage: (page: string) => void;
}

const AdminAnalytics = ({ setPage }: AdminAnalyticsProps) => {
  const { isAuthenticated } = useAdminAuth();
  const [leads] = useKV<any[]>('leads', []);
  const [professionals] = useKV<any[]>('professionals', []);
  const [jobOffers] = useKV<any[]>('job-offers', []);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y' | 'all'>('30d');

  useEffect(() => {
    if (!isAuthenticated) {
      setPage('admin-login');
    }
  }, [isAuthenticated]);

  const getFilteredLeadsByTimeRange = () => {
    if (timeRange === 'all') return leads || [];
    
    const now = new Date();
    const ranges = {
      '7d': 7,
      '30d': 30,
      '90d': 90,
      '1y': 365
    };
    
    const daysAgo = ranges[timeRange];
    const cutoffDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    
    return (leads || []).filter((lead: any) => new Date(lead.created_at) >= cutoffDate);
  };

  const filteredLeads = getFilteredLeadsByTimeRange();

  const getLeadsTrend = () => {
    const dailyData: Record<string, number> = {};
    
    filteredLeads.forEach((lead: any) => {
      const date = new Date(lead.created_at);
      const dateKey = date.toISOString().split('T')[0];
      dailyData[dateKey] = (dailyData[dateKey] || 0) + 1;
    });

    return Object.entries(dailyData)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-30)
      .map(([date, count]) => ({
        date: new Date(date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }),
        leads: count
      }));
  };

  const getConversionFunnel = () => {
    const total = filteredLeads.length;
    const statusCount = {
      new: filteredLeads.filter((l: any) => l.status === 'new').length,
      contacted: filteredLeads.filter((l: any) => l.status === 'contacted').length,
      qualified: filteredLeads.filter((l: any) => l.status === 'qualified').length,
      converted: filteredLeads.filter((l: any) => l.status === 'converted').length,
    };

    return [
      { name: 'Nuevos', value: statusCount.new, percentage: total > 0 ? ((statusCount.new / total) * 100).toFixed(1) : 0 },
      { name: 'Contactados', value: statusCount.contacted, percentage: total > 0 ? ((statusCount.contacted / total) * 100).toFixed(1) : 0 },
      { name: 'Calificados', value: statusCount.qualified, percentage: total > 0 ? ((statusCount.qualified / total) * 100).toFixed(1) : 0 },
      { name: 'Convertidos', value: statusCount.converted, percentage: total > 0 ? ((statusCount.converted / total) * 100).toFixed(1) : 0 },
    ];
  };

  const getPriorityDistribution = () => {
    const priorityCount = {
      critical: filteredLeads.filter((l: any) => l.priority === 'critical').length,
      high: filteredLeads.filter((l: any) => l.priority === 'high').length,
      medium: filteredLeads.filter((l: any) => l.priority === 'medium').length,
      low: filteredLeads.filter((l: any) => l.priority === 'low').length,
    };

    return [
      { name: 'Crítica', value: priorityCount.critical, color: '#ef4444' },
      { name: 'Alta', value: priorityCount.high, color: '#f97316' },
      { name: 'Media', value: priorityCount.medium, color: '#eab308' },
      { name: 'Baja', value: priorityCount.low, color: '#3b82f6' },
    ].filter(item => item.value > 0);
  };

  const getSourceDistribution = () => {
    const sourceCount: Record<string, number> = {};
    
    filteredLeads.forEach((lead: any) => {
      sourceCount[lead.source_page] = (sourceCount[lead.source_page] || 0) + 1;
    });

    return Object.entries(sourceCount)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  };

  const getMonthlyComparison = () => {
    const monthlyData: Record<string, { leads: number; professionals: number; jobs: number }> = {};
    
    const allItems = [
      ...(leads || []).map((item: any) => ({ ...item, type: 'lead' })),
      ...(professionals || []).map((item: any) => ({ ...item, type: 'professional' })),
      ...(jobOffers || []).map((item: any) => ({ ...item, type: 'job' })),
    ];

    allItems.forEach((item: any) => {
      const date = new Date(item.created_at || item.createdAt || Date.now());
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { leads: 0, professionals: 0, jobs: 0 };
      }
      
      if (item.type === 'lead') monthlyData[monthKey].leads += 1;
      if (item.type === 'professional') monthlyData[monthKey].professionals += 1;
      if (item.type === 'job') monthlyData[monthKey].jobs += 1;
    });

    return Object.entries(monthlyData)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-6)
      .map(([month, data]) => ({
        month: new Date(month + '-01').toLocaleDateString('es-ES', { month: 'short', year: 'numeric' }),
        ...data
      }));
  };

  const getAIPerformance = () => {
    const leadsWithAI = filteredLeads.filter((l: any) => l.ai_classification);
    
    const sentimentCount: Record<string, number> = {};
    const urgencyCount: Record<string, number> = {};
    
    leadsWithAI.forEach((lead: any) => {
      if (lead.ai_classification.sentiment) {
        sentimentCount[lead.ai_classification.sentiment] = (sentimentCount[lead.ai_classification.sentiment] || 0) + 1;
      }
      if (lead.ai_classification.urgency) {
        urgencyCount[lead.ai_classification.urgency] = (urgencyCount[lead.ai_classification.urgency] || 0) + 1;
      }
    });

    return {
      sentiment: Object.entries(sentimentCount).map(([name, value]) => ({ 
        subject: name, 
        A: value,
        fullMark: Math.max(...Object.values(sentimentCount)) 
      })),
      urgency: Object.entries(urgencyCount).map(([name, value]) => ({ name, value }))
    };
  };

  const getConversionRate = () => {
    const total = filteredLeads.length;
    if (total === 0) return 0;
    const converted = filteredLeads.filter((l: any) => l.status === 'converted').length;
    return ((converted / total) * 100).toFixed(1);
  };

  const getAvgResponseTime = () => {
    const responseTimes: number[] = [];
    
    filteredLeads.forEach((lead: any) => {
      if (lead.updated_at && lead.created_at && lead.status !== 'new') {
        const created = new Date(lead.created_at).getTime();
        const updated = new Date(lead.updated_at).getTime();
        const hours = (updated - created) / (1000 * 60 * 60);
        responseTimes.push(hours);
      }
    });

    if (responseTimes.length === 0) return 'N/A';
    const avg = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
    
    if (avg < 24) {
      return `${avg.toFixed(1)} horas`;
    } else {
      return `${(avg / 24).toFixed(1)} días`;
    }
  };

  const exportAnalytics = () => {
    const report = {
      fecha_generacion: new Date().toISOString(),
      periodo: timeRange,
      resumen: {
        total_leads: filteredLeads.length,
        tasa_conversion: getConversionRate() + '%',
        tiempo_respuesta_promedio: getAvgResponseTime(),
        total_profesionales: (professionals || []).length,
        ofertas_activas: (jobOffers || []).filter((j: any) => j.active || j.published).length,
      },
      tendencia_leads: getLeadsTrend(),
      distribucion_prioridad: getPriorityDistribution(),
      distribucion_fuente: getSourceDistribution(),
      embudo_conversion: getConversionFunnel(),
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `analytics_report_${new Date().toISOString().split('T')[0]}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Reporte de analíticas exportado exitosamente');
  };

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#6366f1'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => setPage('admin-dashboard')}>
                <ArrowLeft size={16} className="mr-2" />
                Volver
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Panel de Analíticas</h1>
                <p className="text-sm text-gray-600">Visualización de datos y métricas clave</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Select value={timeRange} onValueChange={(value: any) => setTimeRange(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Últimos 7 días</SelectItem>
                  <SelectItem value="30d">Últimos 30 días</SelectItem>
                  <SelectItem value="90d">Últimos 90 días</SelectItem>
                  <SelectItem value="1y">Último año</SelectItem>
                  <SelectItem value="all">Todo el tiempo</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={exportAnalytics}>
                <DownloadSimple size={16} className="mr-2" />
                Exportar Reporte
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Leads</CardDescription>
              <CardTitle className="text-3xl">{filteredLeads.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-green-600">
                <TrendUp size={16} />
                <span>Período seleccionado</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Tasa de Conversión</CardDescription>
              <CardTitle className="text-3xl text-green-600">{getConversionRate()}%</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <ChartBar size={16} />
                <span>De leads a convertidos</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Tiempo de Respuesta</CardDescription>
              <CardTitle className="text-2xl">{getAvgResponseTime()}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CalendarIcon size={16} />
                <span>Promedio de respuesta</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Profesionales</CardDescription>
              <CardTitle className="text-3xl">{(professionals || []).length}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users size={16} />
                <span>Registrados totales</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Vista General</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="comparison">Comparación</TabsTrigger>
            <TabsTrigger value="ai">Análisis IA</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tendencia de Leads</CardTitle>
                  <CardDescription>Evolución de nuevos leads en el tiempo</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={getLeadsTrend()}>
                      <defs>
                        <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="leads" stroke="#3b82f6" fillOpacity={1} fill="url(#colorLeads)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribución por Prioridad</CardTitle>
                  <CardDescription>Clasificación de leads por urgencia</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={getPriorityDistribution()}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${name}: ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {getPriorityDistribution().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Embudo de Conversión</CardTitle>
                  <CardDescription>Progreso de leads por etapa</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={getConversionFunnel()} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8b5cf6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Leads por Fuente</CardTitle>
                  <CardDescription>Origen de los contactos</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={getSourceDistribution()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="leads" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tendencia Diaria</CardTitle>
                  <CardDescription>Leads recibidos por día</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={getLeadsTrend()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="leads" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Estado de Leads</CardTitle>
                  <CardDescription>Distribución por estado actual</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {getConversionFunnel().map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">{item.name}</span>
                          <span className="text-sm text-gray-600">{item.value} ({item.percentage}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Comparación Mensual</CardTitle>
                <CardDescription>Leads, profesionales y ofertas por mes</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={getMonthlyComparison()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="leads" fill="#3b82f6" name="Leads" />
                    <Bar dataKey="professionals" fill="#8b5cf6" name="Profesionales" />
                    <Bar dataKey="jobs" fill="#10b981" name="Ofertas" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Análisis de Sentimiento IA</CardTitle>
                  <CardDescription>Clasificación emocional de los leads</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <RadarChart data={getAIPerformance().sentiment}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis />
                      <Radar name="Sentimiento" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Urgencia Detectada por IA</CardTitle>
                  <CardDescription>Nivel de urgencia en las solicitudes</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie
                        data={getAIPerformance().urgency}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {getAIPerformance().urgency.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Estadísticas de IA</CardTitle>
                <CardDescription>Rendimiento del sistema de clasificación inteligente</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">
                      {filteredLeads.filter((l: any) => l.ai_classification).length}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Leads clasificados por IA</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">
                      {filteredLeads.filter((l: any) => l.ai_classification && (l.ai_classification.priority_score || 0) > 0.7).length}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Alta confianza (&gt;70%)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      {(filteredLeads.filter((l: any) => l.ai_classification).length / Math.max(filteredLeads.length, 1) * 100).toFixed(0)}%
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Tasa de clasificación</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminAnalytics;
