import { useState } from 'react';
import {
  Calendar,
  Video,
  FileText,
  MessageCircle,
  Heart,
  Users,
  Bell,
  Settings,
  Clock,
  Star,
  MapPin,
  CheckCircle,
  MinusCircle,
  XCircle,
  Zap,
  Loader2,
  CreditCard,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import SubscriptionManager from '../components/SubscriptionManager';
import UpgradeBanner from '../components/UpgradeBanner';
import type { User } from '../App';

interface FamilyDashboardProps {
  user: User | null;
  setPage: (page: string) => void;
}

interface Professional {
  id: number;
  name: string;
  specialty: string;
  category: string;
  rating: number;
  reviews: number;
  experience: string;
  rate: number;
  available: boolean;
  verified: boolean;
  image: string;
  skills: string[];
  availability: string[];
}

export default function FamilyDashboard({ user, setPage }: FamilyDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const professionals: Professional[] = [
    {
      id: 1,
      name: 'Dra. María González',
      specialty: 'Médico Geriatra',
      category: 'medicos',
      rating: 4.9,
      reviews: 47,
      experience: '12 años',
      rate: 80000,
      available: true,
      verified: true,
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=150&h=150',
      skills: ['Demencia', 'Alzheimer', 'Cuidado paliativo'],
      availability: ['Lun 10:00-12:00', 'Mié 14:00-16:00'],
    },
    {
      id: 2,
      name: 'Lic. Ana Rodríguez',
      specialty: 'Enfermera Jefe',
      category: 'enfermeria',
      rating: 5.0,
      reviews: 32,
      experience: '8 años',
      rate: 55000,
      available: true,
      verified: true,
      image: 'https://images.unsplash.com/photo-1584515933487-98db080537ad?auto=format&fit=crop&q=80&w=150&h=150',
      skills: ['Cuidado post-operatorio', 'Administración medicamentos', 'Curas'],
      availability: ['Mar 09:00-13:00', 'Jue 15:00-18:00'],
    },
    {
      id: 3,
      name: 'Lic. Carlos Mendoza',
      specialty: 'Fisioterapeuta',
      category: 'terapia',
      rating: 4.8,
      reviews: 28,
      experience: '6 años',
      rate: 60000,
      available: false,
      verified: true,
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=150&h=150',
      skills: ['Rehabilitación', 'Movilidad', 'Ejercicio terapéutico'],
      availability: ['Lun-Vie 08:00-17:00'],
    },
    {
      id: 4,
      name: 'Sra. Marta López',
      specialty: 'Cuidadora Geriátrica',
      category: 'cuidadores',
      rating: 4.7,
      reviews: 65,
      experience: '15 años',
      rate: 35000,
      available: true,
      verified: true,
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150',
      skills: ['Aseo personal', 'Alimentación', 'Compañía'],
      availability: ['Lun-Dom 06:00-22:00'],
    },
  ];

  const filteredProfessionals = professionals.filter((pro) => {
    const matchesSearch =
      pro.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pro.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || pro.category === filter || (filter === 'disponible' && pro.available);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-muted/50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user?.photoUrl} />
                <AvatarFallback>{user?.fullName?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Hola, {user?.fullName || 'Familia'}</h1>
                <p className="text-muted-foreground">Bienvenido al centro de control de Hogar Belén</p>
              </div>
              <Badge variant="secondary" className="ml-2">
                Plan: {user?.plan || 'Básico'}
              </Badge>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
              </button>
              <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Settings size={20} />
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-6 mt-4 overflow-x-auto pb-2">
            <div className="flex items-center gap-2 text-sm whitespace-nowrap">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-muted-foreground">Estado:</span>
              <span className="font-semibold text-foreground">Estable</span>
            </div>
            <div className="flex items-center gap-2 text-sm whitespace-nowrap">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-muted-foreground">Próxima cita:</span>
              <span className="font-semibold text-foreground">Hoy 3:00 PM</span>
            </div>
            <div className="flex items-center gap-2 text-sm whitespace-nowrap">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-muted-foreground">Profesionales activos:</span>
              <span className="font-semibold text-foreground">3</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview" className="gap-2">
              <Heart size={16} />
              <span className="hidden sm:inline">Resumen</span>
            </TabsTrigger>
            <TabsTrigger value="professionals" className="gap-2">
              <Users size={16} />
              <span className="hidden sm:inline">Profesionales</span>
            </TabsTrigger>
            <TabsTrigger value="appointments" className="gap-2">
              <Calendar size={16} />
              <span className="hidden sm:inline">Citas</span>
            </TabsTrigger>
            <TabsTrigger value="subscription" className="gap-2">
              <CreditCard size={16} />
              <span className="hidden sm:inline">Suscripción</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="gap-2">
              <FileText size={16} />
              <span className="hidden sm:inline">Reportes</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="gap-2">
              <MessageCircle size={16} />
              <span className="hidden sm:inline">Mensajes</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Upgrade Banner */}
            <UpgradeBanner onUpgrade={() => setPage('pricing')} />

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Calendar, title: 'Agendar Cita', description: 'Programar nueva consulta' },
                { icon: Video, title: 'Videollamada', description: 'Llamar al profesional' },
                { icon: FileText, title: 'Expediente', description: 'Ver historial médico' },
                { icon: MessageCircle, title: 'Mensajes', description: 'Chat con el equipo' },
              ].map((action, index) => (
                <Card key={index} className="hover:shadow-lg transition-all cursor-pointer group">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <action.icon size={24} />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Health Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Estado de Salud Hoy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { label: 'Ánimo', value: 'Contento' },
                    { label: 'Sueño', value: '7.5 horas' },
                    { label: 'Actividad', value: '45 min' },
                    { label: 'Medicación', value: 'Al día' },
                  ].map((metric, i) => (
                    <div key={i} className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">{metric.value}</div>
                      <div className="text-sm text-muted-foreground">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Appointments & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Próximas Citas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-semibold">Dra. María López</p>
                      <p className="text-sm text-muted-foreground">Consulta Geriátrica</p>
                      <p className="text-xs text-muted-foreground">15 Ene 2024 a las 10:00 AM</p>
                    </div>
                    <Button size="sm">Unirse</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Actividad Reciente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { title: 'Reporte de Salud Actualizado', desc: 'El Dr. Pérez actualizó el expediente', time: 'Hace 2 horas' },
                    { title: 'Cita Programada', desc: 'Terapia física con Lic. Laura Torres', time: 'Mañana 3:00 PM' },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 hover:bg-muted/50 rounded-lg transition-colors">
                      <Bell size={16} className="text-muted-foreground mt-1" />
                      <div>
                        <p className="font-medium text-sm">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.desc}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="professionals" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    placeholder="Buscar profesionales..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <div className="flex gap-2 flex-wrap">
                    {['all', 'disponible', 'medicos', 'enfermeria', 'terapia', 'cuidadores'].map((f) => (
                      <Button
                        key={f}
                        variant={filter === f ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilter(f)}
                        className="capitalize"
                      >
                        {f === 'all' ? 'Todos' : f === 'disponible' ? 'Disponible' : f}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Professionals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProfessionals.map((pro) => (
                <Card key={pro.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex gap-4 mb-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={pro.image} />
                        <AvatarFallback>{pro.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg flex items-center gap-2">
                          {pro.name}
                          {pro.verified && <CheckCircle className="w-4 h-4 text-primary" />}
                        </h3>
                        <p className="text-sm text-primary">{pro.specialty}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            {pro.rating} ({pro.reviews})
                          </span>
                          <span>{pro.experience}</span>
                        </div>
                      </div>
                      <Badge variant={pro.available ? 'default' : 'secondary'}>
                        {pro.available ? 'Disponible' : 'Ocupado'}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {pro.skills.slice(0, 3).map((skill, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1" disabled={!pro.available}>
                        <MessageCircle size={16} className="mr-2" />
                        Contactar
                      </Button>
                      <Button variant="outline">
                        <FileText size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProfessionals.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No se encontraron profesionales</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Citas</CardTitle>
                <CardDescription>Próximamente: Sistema completo de gestión de citas</CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>

          <TabsContent value="subscription">
            <SubscriptionManager />
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Reportes y Documentos</CardTitle>
                <CardDescription>Próximamente: Acceso a expediente médico completo</CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Centro de Mensajes</CardTitle>
                <CardDescription>Próximamente: Chat directo con profesionales</CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
