import { useState, useEffect } from 'react';
import { useKV } from '@github/spark/hooks';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, Shield, User, DollarSign, Calendar, MapPin, Mail, Phone } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../contextos/SupabaseAuthContext';

interface Professional {
  id: number;
  name: string;
  role: string;
  category: string;
  documentId: string;
  email: string;
  phone: string;
  location: string;
  whatsappNumber: string;
  experience: string;
  certificates: string;
  hourlyRate: number;
  dailyRate: number;
  image: string;
  initialStatus: string;
  verified: boolean;
  verifiedAt: string | null;
  verifiedBy: string | null;
  schedule: string[];
}

interface AdminProfessionalsProps {
  setPage: (page: string) => void;
}

const AdminProfessionals = ({ setPage }: AdminProfessionalsProps) => {
  const [professionals, setProfessionals] = useKV<Professional[]>('professionals-list', []);
  const { user, userData } = useAuth();
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  // Check if user is admin
  useEffect(() => {
    if (!user || !userData || userData.role !== 'professional') {
      // In a real app, you'd have an 'admin' role
      // For now, we'll allow any logged-in user to access this as a demo
      // toast.error('Acceso denegado. Solo administradores pueden ver esta página.');
      // setPage('home');
    }
  }, [user, userData, setPage]);

  const handleApprove = (professionalId: number) => {
    setProfessionals((current) => 
      (current || []).map((prof) => 
        prof.id === professionalId
          ? {
              ...prof,
              initialStatus: 'Aprobado',
              verified: true,
              verifiedAt: new Date().toISOString(),
              verifiedBy: user?.id || 'admin'
            }
          : prof
      )
    );
    toast.success('Profesional aprobado y verificado con check azul');
  };

  const handleReject = (professionalId: number) => {
    setProfessionals((current) => 
      (current || []).map((prof) => 
        prof.id === professionalId
          ? {
              ...prof,
              initialStatus: 'Rechazado',
              verified: false,
              verifiedAt: null,
              verifiedBy: null
            }
          : prof
      )
    );
    toast.success('Profesional rechazado');
  };

  const filteredProfessionals = (professionals || []).filter((prof) => {
    if (filter === 'all') return true;
    if (filter === 'pending') return prof.initialStatus === 'Pendiente';
    if (filter === 'approved') return prof.initialStatus === 'Aprobado';
    if (filter === 'rejected') return prof.initialStatus === 'Rechazado';
    return true;
  });

  const stats = {
    total: professionals?.length || 0,
    pending: (professionals || []).filter((p) => p.initialStatus === 'Pendiente').length,
    approved: (professionals || []).filter((p) => p.initialStatus === 'Aprobado').length,
    verified: (professionals || []).filter((p) => p.verified).length,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Panel de Administración - Profesionales
          </h1>
          <p className="text-gray-600">
            Gestiona las solicitudes de registro de profesionales de salud
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <User className="text-gray-400" size={32} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Pendientes</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <Clock className="text-yellow-400" size={32} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Aprobados</p>
                  <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
                </div>
                <CheckCircle className="text-green-400" size={32} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Verificados</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.verified}</p>
                </div>
                <Shield className="text-blue-400" size={32} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
          >
            Todos
          </Button>
          <Button
            variant={filter === 'pending' ? 'default' : 'outline'}
            onClick={() => setFilter('pending')}
          >
            Pendientes ({stats.pending})
          </Button>
          <Button
            variant={filter === 'approved' ? 'default' : 'outline'}
            onClick={() => setFilter('approved')}
          >
            Aprobados
          </Button>
          <Button
            variant={filter === 'rejected' ? 'default' : 'outline'}
            onClick={() => setFilter('rejected')}
          >
            Rechazados
          </Button>
        </div>

        {/* Professionals List */}
        <div className="space-y-6">
          {filteredProfessionals.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-gray-500">
                No hay profesionales en esta categoría
              </CardContent>
            </Card>
          ) : (
            filteredProfessionals.map((prof) => (
              <Card key={prof.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src={prof.image}
                        alt={prof.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle>{prof.name}</CardTitle>
                          {prof.verified && (
                            <Badge variant="default" className="bg-blue-500">
                              <Shield size={14} className="mr-1" />
                              Verificado
                            </Badge>
                          )}
                        </div>
                        <CardDescription>{prof.role} • {prof.category}</CardDescription>
                      </div>
                    </div>
                    <Badge
                      variant={
                        prof.initialStatus === 'Aprobado'
                          ? 'default'
                          : prof.initialStatus === 'Pendiente'
                          ? 'secondary'
                          : 'destructive'
                      }
                    >
                      {prof.initialStatus}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User size={16} />
                        <span>ID: {prof.documentId}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail size={16} />
                        <span>{prof.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone size={16} />
                        <span>{prof.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin size={16} />
                        <span>{prof.location}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <DollarSign size={16} />
                        <span>Hora: ${prof.hourlyRate.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={16} />
                        <span>Jornada: ${prof.dailyRate.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2">Experiencia:</h4>
                    <p className="text-sm text-gray-600">{prof.experience}</p>
                  </div>

                  {prof.certificates && (
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Certificados:</h4>
                      <p className="text-sm text-gray-600">{prof.certificates}</p>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold text-sm mb-2">Horarios:</h4>
                    <div className="flex flex-wrap gap-2">
                      {prof.schedule.map((slot, idx) => (
                        <Badge key={idx} variant="outline">
                          {slot}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {prof.verified && prof.verifiedAt && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-xs text-blue-700">
                        Verificado el {new Date(prof.verifiedAt).toLocaleDateString('es-CO', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  )}

                  {prof.initialStatus === 'Pendiente' && (
                    <div className="flex gap-3 pt-4 border-t">
                      <Button
                        onClick={() => handleApprove(prof.id)}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="mr-2" size={18} />
                        Aprobar y Verificar
                      </Button>
                      <Button
                        onClick={() => handleReject(prof.id)}
                        variant="destructive"
                        className="flex-1"
                      >
                        <XCircle className="mr-2" size={18} />
                        Rechazar
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfessionals;
