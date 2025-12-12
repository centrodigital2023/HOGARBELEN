import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, Check, X, Plus } from '@phosphor-icons/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useKV } from '@github/spark/hooks';
import { toast } from 'sonner';

const DAYS_OF_WEEK = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const TIME_SLOTS = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', 
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', 
  '18:00', '19:00', '20:00', '21:00', '22:00'
];

interface AvailabilitySlot {
  day: number;
  time: string;
  available: boolean;
}

export const AvailabilityManager = ({ professionalId }: { professionalId: string }) => {
  const [availability, setAvailability] = useKV<Record<string, boolean>>(
    `availability-${professionalId}`,
    {}
  );
  const [bookings] = useKV<Record<string, string[]>>('professional-bookings', {});

  const professionalBookings = useMemo(() => {
    return bookings?.[professionalId] || [];
  }, [bookings, professionalId]);

  const toggleSlot = (day: number, time: string) => {
    const key = `${day}_${time}`;
    
    setAvailability((current) => {
      const updated = { ...(current || {}) };
      updated[key] = !updated[key];
      return updated;
    });

    const isCurrentlyAvailable = availability?.[key];
    toast.success(isCurrentlyAvailable ? 'Horario bloqueado' : 'Horario habilitado');
  };

  const isSlotBooked = (day: number, time: string): boolean => {
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const daysUntilSlot = (day - currentDayOfWeek + 7) % 7;
    const slotDate = new Date(today);
    slotDate.setDate(today.getDate() + daysUntilSlot);
    
    const dateKey = `${slotDate.toISOString().split('T')[0]}_${time}`;
    return professionalBookings.includes(dateKey);
  };

  const isSlotAvailable = (day: number, time: string): boolean => {
    const key = `${day}_${time}`;
    return availability?.[key] === true;
  };

  const availableCount = useMemo(() => {
    return Object.values(availability || {}).filter(v => v === true).length;
  }, [availability]);

  const bookedCount = professionalBookings.length;

  const setDayAvailability = (day: number, available: boolean) => {
    const updates: Record<string, boolean> = {};
    TIME_SLOTS.forEach(time => {
      const key = `${day}_${time}`;
      if (!isSlotBooked(day, time)) {
        updates[key] = available;
      }
    });
    
    setAvailability((current) => ({
      ...current,
      ...updates,
    }));

    toast.success(available ? `${DAYS_OF_WEEK[day]} habilitado` : `${DAYS_OF_WEEK[day]} bloqueado`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-primary" weight="fill" />
            Gestión de Disponibilidad
          </CardTitle>
          <CardDescription>
            Configura tus horarios disponibles para recibir reservas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <Card className="border-2">
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">{availableCount}</div>
                <div className="text-sm text-muted-foreground">Horarios Disponibles</div>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">{bookedCount}</div>
                <div className="text-sm text-muted-foreground">Citas Reservadas</div>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-gray-600 mb-1">
                  {Math.max(0, availableCount - bookedCount)}
                </div>
                <div className="text-sm text-muted-foreground">Espacios Libres</div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-4 p-4 bg-muted/50 rounded-lg space-y-2">
            <h4 className="font-semibold text-sm mb-3">Leyenda</h4>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 rounded bg-green-200 border-2 border-green-500" />
                <span>Disponible</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 rounded bg-blue-200 border-2 border-blue-500" />
                <span>Reservado</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 rounded bg-gray-100 border-2 border-gray-300" />
                <span>No disponible</span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-3 text-left font-semibold text-sm sticky left-0 bg-muted/50 z-10">
                    Hora
                  </th>
                  {DAYS_OF_WEEK.map((day, idx) => (
                    <th key={day} className="border p-3 text-center font-semibold text-sm min-w-[80px]">
                      <div className="flex flex-col gap-2">
                        <span>{day}</span>
                        <div className="flex gap-1 justify-center">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0"
                            onClick={() => setDayAvailability(idx, true)}
                            title={`Habilitar todo ${day}`}
                          >
                            <Check className="w-3 h-3 text-green-600" weight="bold" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0"
                            onClick={() => setDayAvailability(idx, false)}
                            title={`Bloquear todo ${day}`}
                          >
                            <X className="w-3 h-3 text-red-600" weight="bold" />
                          </Button>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TIME_SLOTS.map((time) => (
                  <tr key={time} className="hover:bg-muted/30 transition-colors">
                    <td className="border p-3 font-medium text-sm sticky left-0 bg-background z-10">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        {time}
                      </div>
                    </td>
                    {DAYS_OF_WEEK.map((_, dayIdx) => {
                      const available = isSlotAvailable(dayIdx, time);
                      const booked = isSlotBooked(dayIdx, time);
                      
                      return (
                        <td key={dayIdx} className="border p-2">
                          <motion.button
                            whileHover={{ scale: booked ? 1 : 1.05 }}
                            whileTap={{ scale: booked ? 1 : 0.95 }}
                            onClick={() => !booked && toggleSlot(dayIdx, time)}
                            disabled={booked}
                            className={`
                              w-full h-10 rounded-lg transition-all flex items-center justify-center
                              ${booked 
                                ? 'bg-blue-200 border-2 border-blue-500 cursor-not-allowed' 
                                : available 
                                  ? 'bg-green-200 border-2 border-green-500 hover:bg-green-300 cursor-pointer' 
                                  : 'bg-gray-100 border-2 border-gray-300 hover:bg-gray-200 cursor-pointer'
                              }
                            `}
                          >
                            {booked && (
                              <Badge variant="secondary" className="text-xs">
                                Reservado
                              </Badge>
                            )}
                            {!booked && available && (
                              <Check className="w-5 h-5 text-green-700" weight="bold" />
                            )}
                          </motion.button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-2 text-blue-900">
              <CalendarIcon className="w-4 h-4" />
              Instrucciones
            </h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Haz clic en una casilla para habilitar/deshabilitar ese horario</li>
              <li>• Usa los botones de cada columna para habilitar/bloquear días completos</li>
              <li>• Las citas ya reservadas no se pueden modificar</li>
              <li>• Los cambios se guardan automáticamente</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
