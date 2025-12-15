import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../componentes/ui/tarjeta';
import { Calendar, Clock, User, X, Check, Phone, Prohibit, CalendarX } from '@phosphor-icons/react';
import Insignia from '../componentes/ui/insignia';
import Button from '../componentes/ui/botón';
import { useKV } from '@github/spark/hooks';
import { toast } from 'sonner';
import { AvailabilityManager } from '../components/AvailabilityManager';
import { notificationService } from '../lib/notificationService';

interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  type: string;
}

interface PestañaCitasProps {
  professionalId?: string;
  userData?: any;
}

const PestañaCitas = ({ professionalId = '1', userData }: PestañaCitasProps) => {
  const [appointments, setAppointments] = useKV<Appointment[]>(`appointments-${professionalId}`, [
    {
      id: '1',
      patientName: 'María González',
      patientEmail: 'maria.gonzalez@email.com',
      patientPhone: '+57 300 123 4567',
      date: '2024-01-15',
      time: '10:00',
      status: 'confirmed',
      type: 'Consulta General'
    },
    {
      id: '2',
      patientName: 'Juan Pérez',
      patientEmail: 'juan.perez@email.com',
      patientPhone: '+57 310 234 5678',
      date: '2024-01-15',
      time: '14:00',
      status: 'pending',
      type: 'Seguimiento'
    },
    {
      id: '3',
      patientName: 'Ana Martínez',
      patientEmail: 'ana.martinez@email.com',
      patientPhone: '+57 320 345 6789',
      date: '2024-01-16',
      time: '11:00',
      status: 'confirmed',
      type: 'Terapia'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'list' | 'availability'>('list');

  const confirmAppointment = async (appointmentId: string) => {
    setAppointments((current) =>
      (current || []).map((apt) =>
        apt.id === appointmentId ? { ...apt, status: 'confirmed' as const } : apt
      )
    );
    
    const appointment = appointments?.find(a => a.id === appointmentId);
    if (appointment) {
      const notificationData = {
        recipientEmail: appointment.patientEmail,
        recipientPhone: appointment.patientPhone,
        recipientName: appointment.patientName,
        appointmentDate: appointment.date,
        appointmentTime: appointment.time,
        professionalName: userData?.fullName || 'Profesional de Hogar Belén',
        appointmentType: appointment.type,
      };
      
      const result = await notificationService.sendBothNotifications(notificationData, 'confirmed');
      
      if (result.email && result.sms) {
        toast.success('Cita confirmada. Se han enviado notificaciones por correo y SMS.');
      } else if (result.email) {
        toast.success('Cita confirmada. Se ha enviado notificación por correo.');
      } else {
        toast.success('Cita confirmada.');
      }
    }
  };

  const cancelAppointment = async (appointmentId: string) => {
    setAppointments((current) =>
      (current || []).map((apt) =>
        apt.id === appointmentId ? { ...apt, status: 'cancelled' as const } : apt
      )
    );
    
    const appointment = appointments?.find(a => a.id === appointmentId);
    if (appointment) {
      const notificationData = {
        recipientEmail: appointment.patientEmail,
        recipientPhone: appointment.patientPhone,
        recipientName: appointment.patientName,
        appointmentDate: appointment.date,
        appointmentTime: appointment.time,
        professionalName: userData?.fullName || 'Profesional de Hogar Belén',
        appointmentType: appointment.type,
      };
      
      const result = await notificationService.sendBothNotifications(notificationData, 'cancelled');
      
      if (result.email && result.sms) {
        toast.success('Cita cancelada. Se han enviado notificaciones al paciente.');
      } else if (result.email) {
        toast.success('Cita cancelada. Se ha notificado al paciente por correo.');
      } else {
        toast.success('Cita cancelada.');
      }
    }
  };

  const rescheduleAppointment = async (appointmentId: string) => {
    const appointment = appointments?.find(a => a.id === appointmentId);
    if (appointment) {
      toast.info('Función de reprogramación próximamente disponible', {
        description: 'Pronto podrá seleccionar nueva fecha y hora desde el calendario.'
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      confirmed: 'success' as const,
      pending: 'warning' as const,
      completed: 'default' as const,
      cancelled: 'error' as const
    };

    const labels = {
      confirmed: 'Confirmada',
      pending: 'Pendiente',
      completed: 'Completada',
      cancelled: 'Cancelada'
    };

    return <Insignia variant={variants[status as keyof typeof variants]}>{labels[status as keyof typeof labels]}</Insignia>;
  };

  const upcomingAppointments = appointments?.filter(a => a.status !== 'completed' && a.status !== 'cancelled') || [];
  const completedAppointments = appointments?.filter(a => a.status === 'completed') || [];

  return (
    <div className="space-y-6">
      <div className="flex gap-2 mb-4">
        <Button
          variant={activeTab === 'list' ? 'primary' : 'outline'}
          onClick={() => setActiveTab('list')}
          className="flex-1"
        >
          <Calendar size={16} className="mr-2" />
          Lista de Citas
        </Button>
        <Button
          variant={activeTab === 'availability' ? 'primary' : 'outline'}
          onClick={() => setActiveTab('availability')}
          className="flex-1"
        >
          <Clock size={16} className="mr-2" />
          Gestionar Disponibilidad
        </Button>
      </div>

      {activeTab === 'list' ? (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar size={20} />
                Próximas Citas ({upcomingAppointments.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingAppointments.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <CalendarX size={48} className="mx-auto mb-3 opacity-50" />
                  <p>No tienes citas próximas</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div 
                      key={appointment.id}
                      className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <User size={20} className="text-muted-foreground" />
                          <span className="font-semibold text-foreground">{appointment.patientName}</span>
                          {getStatusBadge(appointment.status)}
                        </div>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar size={16} />
                            <span>{new Date(appointment.date).toLocaleDateString('es-ES', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={16} />
                            <span>{appointment.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone size={16} />
                            <span>{appointment.patientPhone}</span>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground">{appointment.type}</p>
                      </div>

                      <div className="flex gap-2 flex-wrap">
                        {appointment.status === 'pending' && (
                          <Button 
                            size="sm" 
                            variant="primary"
                            onClick={() => confirmAppointment(appointment.id)}
                          >
                            <Check size={16} className="mr-1" />
                            Confirmar
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => rescheduleAppointment(appointment.id)}
                        >
                          <Calendar size={16} className="mr-1" />
                          Reprogramar
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => cancelAppointment(appointment.id)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <X size={16} className="mr-1" />
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {completedAppointments.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-muted-foreground">Citas Completadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {completedAppointments.map((appointment) => (
                    <div 
                      key={appointment.id}
                      className="p-3 border border-border rounded-lg bg-muted/30 text-sm"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{appointment.patientName}</span>
                        <span className="text-muted-foreground">{appointment.date} - {appointment.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        <AvailabilityManager professionalId={professionalId} />
      )}
    </div>
  );
};

export default PestañaCitas;
