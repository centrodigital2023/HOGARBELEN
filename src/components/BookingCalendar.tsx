import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, CaretLeft, CaretRight, Clock, X, Check } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useKV } from '@github/spark/hooks';
import { toast } from 'sonner';

interface TimeSlot {
  time: string;
  available: boolean;
  booked?: boolean;
}

interface DaySchedule {
  date: Date;
  slots: TimeSlot[];
}

interface BookingCalendarProps {
  professionalId: string;
  professionalName: string;
  professionalRole: string;
  schedule: string[];
  open: boolean;
  onClose: () => void;
}

const DAYS_OF_WEEK = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const dayRangeMap: Record<string, number | number[]> = {
  'Lun': 1, 'Mar': 2, 'Mié': 3, 'Jue': 4, 'Vie': 5, 'Sáb': 6, 'Dom': 0,
  'Lun a Vie': [1, 2, 3, 4, 5],
  'Lun a Jue': [1, 2, 3, 4],
  'Sáb a Dom': [6, 0],
  'Lun a Dom': [0, 1, 2, 3, 4, 5, 6],
};

const parseTime = (timeStr: string): number => {
  const cleanTimeStr = timeStr.trim().toLowerCase();
  let [hourStr, minuteStr = '0'] = cleanTimeStr.replace(/[ap]\.m\./i, '').split(':');
  let hour = parseInt(hourStr) || 0;
  const minute = parseInt(minuteStr) || 0;

  const isAM = cleanTimeStr.includes('a.m.');
  const isPM = cleanTimeStr.includes('p.m.') || (cleanTimeStr.endsWith('p') && !isAM);

  if (isPM && hour < 12) {
    hour += 12;
  } else if (isAM && hour === 12) {
    hour = 0;
  } else if (!isAM && !isPM && hour >= 1 && hour <= 7) {
    hour += 12;
  }
  
  return hour * 60 + minute;
};

const parseScheduleEntry = (entry: string) => {
  if (entry.toLowerCase().includes('solo urgencias')) {
    return { type: 'on_call', days: [0, 1, 2, 3, 4, 5, 6], startMin: 0, endMin: 1439 };
  }

  const match = entry.match(/(\d.*)/s);
  if (!match) return { type: 'invalid', days: [], startMin: 0, endMin: 0 };
  
  const dayStr = entry.substring(0, match.index).trim();
  const timeStr = match[0].trim();
  
  const [startTimeStr, endTimeStr] = timeStr.split('-');
  const startMin = parseTime(startTimeStr.trim());
  const endMin = parseTime(endTimeStr.trim());
  
  if (isNaN(startMin) || isNaN(endMin)) return { type: 'invalid', days: [], startMin: 0, endMin: 0 };
  
  let days: number[] = [];
  if (dayStr.includes(',')) {
    days = dayStr.split(',').map(d => {
      const val = dayRangeMap[d.trim()];
      return typeof val === 'number' ? val : -1;
    }).filter(d => d !== -1);
  } else if (Array.isArray(dayRangeMap[dayStr])) {
    days = dayRangeMap[dayStr] as number[];
  } else if (typeof dayRangeMap[dayStr] === 'number') {
    days.push(dayRangeMap[dayStr] as number);
  }
  
  return { type: 'time_slot', days, startMin, endMin };
};

const generateTimeSlots = (date: Date, schedule: string[], bookedSlots: string[]): TimeSlot[] => {
  const dayOfWeek = date.getDay();
  const slots: TimeSlot[] = [];
  
  for (const entryStr of schedule) {
    const entry = parseScheduleEntry(entryStr);
    
    if ((entry.type === 'time_slot' || entry.type === 'on_call') && entry.days.includes(dayOfWeek)) {
      const startHour = Math.floor(entry.startMin / 60);
      const endHour = Math.floor(entry.endMin / 60);
      
      for (let hour = startHour; hour <= endHour; hour++) {
        const timeStr = `${hour.toString().padStart(2, '0')}:00`;
        const dateKey = `${date.toISOString().split('T')[0]}_${timeStr}`;
        const isBooked = bookedSlots.includes(dateKey);
        
        slots.push({
          time: timeStr,
          available: !isBooked,
          booked: isBooked,
        });
      }
      break;
    }
  }
  
  return slots;
};

export const BookingCalendar = ({ 
  professionalId, 
  professionalName, 
  professionalRole,
  schedule,
  open, 
  onClose 
}: BookingCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [bookings, setBookings] = useKV<Record<string, string[]>>('professional-bookings', {});

  const professionalBookings = useMemo(() => {
    return bookings?.[professionalId] || [];
  }, [bookings, professionalId]);

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevMonthLastDay = new Date(year, month, 0);
    
    const days: (Date | null)[] = [];
    
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push(new Date(year, month - 1, prevMonthLastDay.getDate() - i));
    }
    
    for (let date = 1; date <= lastDay.getDate(); date++) {
      days.push(new Date(year, month, date));
    }
    
    const remainingDays = 7 - (days.length % 7);
    if (remainingDays < 7) {
      for (let i = 1; i <= remainingDays; i++) {
        days.push(new Date(year, month + 1, i));
      }
    }
    
    return days;
  }, [currentMonth]);

  const timeSlots = useMemo(() => {
    if (!selectedDate) return [];
    return generateTimeSlots(selectedDate, schedule, professionalBookings);
  }, [selectedDate, schedule, professionalBookings]);

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDateClick = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (date < today) {
      toast.error('No puedes reservar en fechas pasadas');
      return;
    }
    
    if (date.getMonth() !== currentMonth.getMonth()) {
      return;
    }
    
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleSlotClick = (slot: TimeSlot) => {
    if (!slot.available) return;
    setSelectedSlot(slot);
  };

  const handleConfirmBooking = () => {
    if (!selectedDate || !selectedSlot) return;

    const dateKey = `${selectedDate.toISOString().split('T')[0]}_${selectedSlot.time}`;
    
    setBookings((current) => {
      const updated = { ...current };
      if (!updated[professionalId]) {
        updated[professionalId] = [];
      }
      updated[professionalId] = [...updated[professionalId], dateKey];
      return updated;
    });

    toast.success(`Reserva confirmada para ${selectedDate.toLocaleDateString('es-CO')} a las ${selectedSlot.time}`);
    setSelectedDate(null);
    setSelectedSlot(null);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return selectedDate?.toDateString() === date.toDateString();
  };

  const hasAvailability = (date: Date) => {
    const dayOfWeek = date.getDay();
    return schedule.some(entry => {
      const parsed = parseScheduleEntry(entry);
      return parsed.days.includes(dayOfWeek);
    });
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <CalendarIcon className="w-6 h-6 text-primary" weight="fill" />
            Reservar Cita
          </DialogTitle>
          <DialogDescription className="text-base">
            {professionalName} - {professionalRole}
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-4">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-foreground">
                {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handlePrevMonth}>
                  <CaretLeft weight="bold" />
                </Button>
                <Button variant="outline" size="sm" onClick={handleNextMonth}>
                  <CaretRight weight="bold" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-2">
              {DAYS_OF_WEEK.map((day) => (
                <div key={day} className="text-center text-xs font-semibold text-muted-foreground py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((date, idx) => {
                if (!date) return <div key={idx} />;
                
                const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
                const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));
                const available = hasAvailability(date);
                
                return (
                  <motion.button
                    key={idx}
                    onClick={() => handleDateClick(date)}
                    disabled={!isCurrentMonth || isPast || !available}
                    whileHover={isCurrentMonth && !isPast && available ? { scale: 1.05 } : {}}
                    whileTap={isCurrentMonth && !isPast && available ? { scale: 0.95 } : {}}
                    className={`
                      aspect-square p-2 rounded-lg text-sm font-medium transition-all
                      ${!isCurrentMonth ? 'text-muted-foreground/30' : ''}
                      ${isPast || !available ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
                      ${isToday(date) ? 'ring-2 ring-primary' : ''}
                      ${isSelected(date) ? 'bg-primary text-primary-foreground' : ''}
                      ${!isSelected(date) && isCurrentMonth && !isPast && available ? 'hover:bg-accent' : ''}
                      ${available && isCurrentMonth && !isPast ? 'font-semibold' : ''}
                    `}
                  >
                    {date.getDate()}
                  </motion.button>
                );
              })}
            </div>

            <div className="mt-4 p-4 bg-muted/50 rounded-lg space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 rounded-full bg-primary" />
                <span>Día seleccionado</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 rounded-full ring-2 ring-primary" />
                <span>Hoy</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 rounded-full bg-foreground" />
                <span>Días con disponibilidad</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" weight="fill" />
              {selectedDate 
                ? `Horarios - ${selectedDate.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' })}`
                : 'Selecciona una fecha'
              }
            </h3>

            {!selectedDate && (
              <div className="flex items-center justify-center h-64 text-center">
                <div className="space-y-2">
                  <CalendarIcon className="w-12 h-12 text-muted-foreground mx-auto" />
                  <p className="text-muted-foreground">Selecciona una fecha para ver los horarios disponibles</p>
                </div>
              </div>
            )}

            {selectedDate && timeSlots.length === 0 && (
              <div className="flex items-center justify-center h-64 text-center">
                <div className="space-y-2">
                  <X className="w-12 h-12 text-destructive mx-auto" />
                  <p className="text-muted-foreground">No hay horarios disponibles para esta fecha</p>
                </div>
              </div>
            )}

            {selectedDate && timeSlots.length > 0 && (
              <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                <AnimatePresence mode="popLayout">
                  {timeSlots.map((slot, idx) => (
                    <motion.button
                      key={`${slot.time}-${idx}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => handleSlotClick(slot)}
                      disabled={!slot.available}
                      className={`
                        w-full p-4 rounded-lg border-2 transition-all text-left
                        ${slot.available ? 'cursor-pointer hover:border-primary hover:bg-accent' : 'cursor-not-allowed opacity-50'}
                        ${selectedSlot?.time === slot.time ? 'border-primary bg-accent' : 'border-border'}
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-lg">{slot.time}</span>
                        <Badge variant={slot.available ? 'default' : 'secondary'}>
                          {slot.available ? 'Disponible' : 'Reservado'}
                        </Badge>
                      </div>
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {selectedDate && selectedSlot && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-primary/10 rounded-lg border-2 border-primary"
              >
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" weight="bold" />
                  Resumen de la Reserva
                </h4>
                <div className="space-y-1 text-sm mb-4">
                  <p><strong>Profesional:</strong> {professionalName}</p>
                  <p><strong>Servicio:</strong> {professionalRole}</p>
                  <p><strong>Fecha:</strong> {selectedDate.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  <p><strong>Hora:</strong> {selectedSlot.time}</p>
                </div>
                <Button 
                  onClick={handleConfirmBooking}
                  className="w-full"
                  size="lg"
                >
                  <Check className="mr-2" weight="bold" />
                  Confirmar Reserva
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
