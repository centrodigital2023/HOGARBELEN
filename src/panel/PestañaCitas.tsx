import { Card, CardContent, CardHeader, CardTitle } from '../componentes/ui/tarjeta';
import { Calendar, Clock, User } from '@phosphor-icons/react';
import Insignia from '../componentes/ui/insignia';
import Button from '../componentes/ui/botón';

interface Appointment {
  id: string;
  patientName: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  type: string;
}

const PestañaCitas = () => {
  const appointments: Appointment[] = [
    {
      id: '1',
      patientName: 'María González',
      date: '2024-01-15',
      time: '10:00 AM',
      status: 'confirmed',
      type: 'Consulta General'
    },
    {
      id: '2',
      patientName: 'Juan Pérez',
      date: '2024-01-15',
      time: '2:00 PM',
      status: 'pending',
      type: 'Seguimiento'
    },
    {
      id: '3',
      patientName: 'Ana Martínez',
      date: '2024-01-16',
      time: '11:00 AM',
      status: 'confirmed',
      type: 'Terapia'
    }
  ];

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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Próximas Citas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div 
                key={appointment.id}
                className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
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
                  </div>

                  <p className="text-sm text-muted-foreground">{appointment.type}</p>
                </div>

                <div className="flex gap-2">
                  {appointment.status === 'pending' && (
                    <Button size="sm" variant="primary">
                      Confirmar
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    Ver Detalles
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PestañaCitas;
