import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, User, Phone, MapPin, X, Check, Info } from '@phosphor-icons/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useKV } from '@github/spark/hooks';
import { toast } from 'sonner';

interface Booking {
  id: string;
  professionalId: string;
  professionalName: string;
  professionalRole: string;
  professionalImage?: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export const AppointmentsView = () => {
  const [bookings] = useKV<Record<string, string[]>>('professional-bookings', {});
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('upcoming');

  const allBookings = useMemo(() => {
    const bookingsList: Booking[] = [];
    
    Object.entries(bookings || {}).forEach(([professionalId, dateTimeSlots]) => {
      dateTimeSlots.forEach((slot) => {
        const [date, time] = slot.split('_');
        const bookingDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        let status: 'upcoming' | 'completed' | 'cancelled' = 'upcoming';
        if (bookingDate < today) {
          status = 'completed';
        }
        
        bookingsList.push({
          id: `${professionalId}_${slot}`,
          professionalId,
          professionalName: getProfessionalName(professionalId),
          professionalRole: getProfessionalRole(professionalId),
          professionalImage: getProfessionalImage(professionalId),
          date,
          time,
          status,
        });
      });
    });
    
    return bookingsList.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateB.getTime() - dateA.getTime();
    });
  }, [bookings]);

  const filteredBookings = useMemo(() => {
    if (filter === 'all') return allBookings;
    return allBookings.filter(b => b.status === filter);
  }, [allBookings, filter]);

  const upcomingCount = allBookings.filter(b => b.status === 'upcoming').length;
  const completedCount = allBookings.filter(b => b.status === 'completed').length;

  const getProfessionalName = (id: string): string => {
    const names: Record<string, string> = {
      '1': 'Dra. María González',
      '2': 'Lic. Ana Rodríguez',
      '3': 'Lic. Carlos Mendoza',
      '4': 'Sra. Marta López',
    };
    return names[id] || 'Profesional';
  };

  const getProfessionalRole = (id: string): string => {
    const roles: Record<string, string> = {
      '1': 'Médico Geriatra',
      '2': 'Enfermera Jefe',
      '3': 'Fisioterapeuta',
      '4': 'Cuidadora Geriátrica',
    };
    return roles[id] || 'Profesional de Salud';
  };

  const getProfessionalImage = (id: string): string | undefined => {
    const images: Record<string, string> = {
      '1': 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=150&h=150',
      '2': 'https://images.unsplash.com/photo-1584515933487-98db080537ad?auto=format&fit=crop&q=80&w=150&h=150',
      '3': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=150&h=150',
      '4': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150',
    };
    return images[id];
  };

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-CO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'Próxima';
      case 'completed':
        return 'Completada';
      case 'cancelled':
        return 'Cancelada';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-primary" weight="fill" />
            Gestión de Citas
          </CardTitle>
          <CardDescription>
            Visualiza y administra todas tus citas médicas y terapéuticas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="border-2">
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-primary mb-1">{allBookings.length}</div>
                <div className="text-sm text-muted-foreground">Total de Citas</div>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">{upcomingCount}</div>
                <div className="text-sm text-muted-foreground">Próximas</div>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">{completedCount}</div>
                <div className="text-sm text-muted-foreground">Completadas</div>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-gray-600 mb-1">0</div>
                <div className="text-sm text-muted-foreground">Canceladas</div>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-2 mb-6 flex-wrap">
            {['all', 'upcoming', 'completed', 'cancelled'].map((f) => (
              <Button
                key={f}
                variant={filter === f ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(f as typeof filter)}
                className="capitalize"
              >
                {f === 'all' ? 'Todas' : getStatusLabel(f)}
              </Button>
            ))}
          </div>

          {filteredBookings.length === 0 && (
            <div className="text-center py-12">
              <CalendarIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No hay citas {filter !== 'all' ? getStatusLabel(filter).toLowerCase() : ''}</h3>
              <p className="text-muted-foreground mb-4">
                {filter === 'upcoming' 
                  ? 'Agenda una nueva cita desde la sección de Profesionales'
                  : 'No se encontraron citas con este filtro'
                }
              </p>
            </div>
          )}

          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredBookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="hover:shadow-md transition-all">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={booking.professionalImage} />
                          <AvatarFallback>{booking.professionalName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <h3 className="font-bold text-lg">{booking.professionalName}</h3>
                              <p className="text-sm text-primary">{booking.professionalRole}</p>
                            </div>
                            <Badge className={getStatusColor(booking.status)}>
                              {getStatusLabel(booking.status)}
                            </Badge>
                          </div>
                          
                          <div className="grid sm:grid-cols-2 gap-3 mt-4">
                            <div className="flex items-center gap-2 text-sm">
                              <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                              <span className="capitalize">{formatDate(booking.date)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span>{booking.time}</span>
                            </div>
                          </div>
                          
                          {booking.status === 'upcoming' && (
                            <div className="flex gap-2 mt-4">
                              <Button size="sm" className="flex-1">
                                <Phone className="w-4 h-4 mr-2" />
                                Contactar
                              </Button>
                              <Button size="sm" variant="outline">
                                <Info className="w-4 h-4 mr-2" />
                                Detalles
                              </Button>
                              <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
