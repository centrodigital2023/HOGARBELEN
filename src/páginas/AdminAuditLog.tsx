import { useState, useEffect } from 'react';
import { useAdminAuth } from '@/contextos/AdminAuthContext';
import { useKV } from '@github/spark/hooks';
import { AuditLog } from '@/types/admin';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, MagnifyingGlass, Clock, User, Warning, CheckCircle, 
  XCircle, FileText, Shield
} from '@phosphor-icons/react';

interface AdminAuditLogProps {
  setPage: (page: string) => void;
}

const AdminAuditLog = ({ setPage }: AdminAuditLogProps) => {
  const { isAuthenticated } = useAdminAuth();
  const [auditLogs] = useKV<AuditLog[]>('audit-logs', []);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState<string>('all');
  const [filterResource, setFilterResource] = useState<string>('all');
  const [filterUser, setFilterUser] = useState<string>('all');

  useEffect(() => {
    if (!isAuthenticated) {
      setPage('admin-login');
    }
  }, [isAuthenticated]);

  const sortedLogs = [...(auditLogs || [])].sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const filteredLogs = sortedLogs.filter(log => {
    const matchesSearch = !searchTerm || 
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource_type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = filterAction === 'all' || log.action === filterAction;
    const matchesResource = filterResource === 'all' || log.resource_type === filterResource;
    const matchesUser = filterUser === 'all' || log.user_email === filterUser;
    return matchesSearch && matchesAction && matchesResource && matchesUser;
  });

  const uniqueActions = Array.from(new Set(sortedLogs.map(l => l.action)));
  const uniqueResources = Array.from(new Set(sortedLogs.map(l => l.resource_type)));
  const uniqueUsers = Array.from(new Set(sortedLogs.map(l => l.user_email)));

  const getActionIcon = (action: string) => {
    if (action.includes('login')) return <Shield size={16} />;
    if (action.includes('create')) return <CheckCircle size={16} className="text-green-600" />;
    if (action.includes('delete') || action.includes('reject')) return <XCircle size={16} className="text-red-600" />;
    if (action.includes('update') || action.includes('approve')) return <CheckCircle size={16} className="text-blue-600" />;
    return <FileText size={16} />;
  };

  const getActionColor = (action: string) => {
    if (action.includes('login') || action.includes('logout')) return 'bg-blue-100 text-blue-800';
    if (action.includes('create')) return 'bg-green-100 text-green-800';
    if (action.includes('delete') || action.includes('reject')) return 'bg-red-100 text-red-800';
    if (action.includes('update') || action.includes('approve')) return 'bg-purple-100 text-purple-800';
    if (action.includes('failed') || action.includes('blocked')) return 'bg-orange-100 text-orange-800';
    return 'bg-gray-100 text-gray-800';
  };

  const todayLogs = filteredLogs.filter(l => {
    const logDate = new Date(l.created_at);
    const today = new Date();
    return logDate.toDateString() === today.toDateString();
  });

  const thisWeekLogs = filteredLogs.filter(l => {
    const logDate = new Date(l.created_at);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return logDate >= weekAgo;
  });

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
              <h1 className="text-2xl font-bold text-gray-900">Registro de Auditoría</h1>
              <p className="text-sm text-gray-600">Historial completo de acciones administrativas</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Acciones Hoy</p>
                <p className="text-3xl font-bold text-blue-600">{todayLogs.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Esta Semana</p>
                <p className="text-3xl font-bold text-purple-600">{thisWeekLogs.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Total de Registros</p>
                <p className="text-3xl font-bold">{sortedLogs.length}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <MagnifyingGlass size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterAction} onValueChange={setFilterAction}>
                <SelectTrigger>
                  <SelectValue placeholder="Acción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las acciones</SelectItem>
                  {uniqueActions.map(action => (
                    <SelectItem key={action} value={action}>{action}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterResource} onValueChange={setFilterResource}>
                <SelectTrigger>
                  <SelectValue placeholder="Recurso" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los recursos</SelectItem>
                  {uniqueResources.map(resource => (
                    <SelectItem key={resource} value={resource}>{resource}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterUser} onValueChange={setFilterUser}>
                <SelectTrigger>
                  <SelectValue placeholder="Usuario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los usuarios</SelectItem>
                  {uniqueUsers.map(user => (
                    <SelectItem key={user} value={user}>{user}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Registros de Actividad</CardTitle>
            <CardDescription>
              Mostrando {filteredLogs.length} de {sortedLogs.length} registros
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredLogs.length === 0 ? (
              <p className="text-center py-8 text-gray-500">
                No se encontraron registros
              </p>
            ) : (
              <div className="space-y-2">
                {filteredLogs.slice(0, 100).map((log) => (
                  <div
                    key={log.id}
                    className="border rounded-lg p-4 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getActionIcon(log.action)}
                          <Badge className={getActionColor(log.action)}>
                            {log.action}
                          </Badge>
                          <Badge variant="outline">{log.resource_type}</Badge>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <User size={14} />
                            <span>{log.user_email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={14} />
                            <span>{new Date(log.created_at).toLocaleString('es-CO')}</span>
                          </div>
                          {log.resource_id && (
                            <div className="flex items-center gap-2">
                              <FileText size={14} />
                              <span className="font-mono text-xs">ID: {log.resource_id}</span>
                            </div>
                          )}
                          {log.details && Object.keys(log.details).length > 0 && (
                            <details className="mt-2">
                              <summary className="cursor-pointer text-xs font-medium text-blue-600">
                                Ver detalles
                              </summary>
                              <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                                {JSON.stringify(log.details, null, 2)}
                              </pre>
                            </details>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredLogs.length > 100 && (
                  <p className="text-center text-sm text-gray-500 py-4">
                    Mostrando los primeros 100 resultados. Use los filtros para refinar la búsqueda.
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAuditLog;
