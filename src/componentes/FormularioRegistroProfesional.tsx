import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Check, X, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useKV } from '@github/spark/hooks';

interface ProfessionalFormData {
  name: string;
  role: string;
  category: string;
  location: string;
  whatsappNumber: string;
  image: string;
  schedule: string[];
}

const CATEGORIES = ['Enfermería', 'Cuidadores', 'Terapia', 'Médicos', 'Otros'];
const DAYS = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sáb', 'Dom'];
const COMMON_RANGES = ['Lun a Vie', 'Lun a Jue', 'Sáb a Dom', 'Lun a Dom', 'Solo Urgencias'];

export default function FormularioRegistroProfesional({ onSuccess }: { onSuccess?: () => void }) {
  const [professionals, setProfessionals] = useKV<any[]>('professionals-list', []);
  const [formData, setFormData] = useState<ProfessionalFormData>({
    name: '',
    role: '',
    category: '',
    location: '',
    whatsappNumber: '+57',
    image: '',
    schedule: []
  });
  
  const [currentSchedule, setCurrentSchedule] = useState({
    days: '',
    timeRange: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addScheduleSlot = () => {
    if (!currentSchedule.days || !currentSchedule.timeRange) {
      toast.error('Por favor completa los días y el horario');
      return;
    }
    
    const newSlot = `${currentSchedule.days} ${currentSchedule.timeRange}`;
    setFormData(prev => ({
      ...prev,
      schedule: [...prev.schedule, newSlot]
    }));
    setCurrentSchedule({ days: '', timeRange: '' });
  };

  const removeScheduleSlot = (index: number) => {
    setFormData(prev => ({
      ...prev,
      schedule: prev.schedule.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.role || !formData.category || !formData.location || !formData.whatsappNumber) {
      toast.error('Por favor completa todos los campos obligatorios');
      return;
    }

    if (!formData.whatsappNumber.startsWith('+57') || formData.whatsappNumber.length < 12) {
      toast.error('Número de WhatsApp inválido. Debe ser +57 seguido de 10 dígitos');
      return;
    }

    if (formData.schedule.length === 0) {
      toast.error('Por favor agrega al menos un horario de disponibilidad');
      return;
    }

    try {
      const newProfessional = {
        id: Date.now(),
        name: formData.name,
        role: formData.role,
        category: formData.category,
        rating: 4.5,
        reviews: 0,
        location: formData.location,
        image: formData.image || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop',
        whatsappNumber: formData.whatsappNumber,
        initialStatus: 'Disponible',
        schedule: formData.schedule
      };

      setProfessionals((current) => [...(current || []), newProfessional]);
      
      toast.success('¡Registro exitoso! Tu perfil ya está visible para las familias');
      
      setFormData({
        name: '',
        role: '',
        category: '',
        location: '',
        whatsappNumber: '+57',
        image: '',
        schedule: []
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error al registrar profesional:', error);
      toast.error('Error al registrar. Por favor intenta de nuevo.');
    }
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
            <UserPlus className="text-primary-600" size={24} />
          </div>
          <div>
            <CardTitle className="text-2xl">Registro de Profesional</CardTitle>
            <CardDescription className="text-base">
              Completa tu perfil para aparecer en el directorio de profesionales
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base font-semibold">
                Nombre Completo <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Ej: María Fernanda Rojas"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-base font-semibold">
                Rol o Especialidad <span className="text-red-500">*</span>
              </Label>
              <Input
                id="role"
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                placeholder="Ej: Enfermera Jefe Especialista UCI"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-base font-semibold">
                Categoría <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-base font-semibold">
                Ubicación <span className="text-red-500">*</span>
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="Ej: Bogotá"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp" className="text-base font-semibold">
                WhatsApp <span className="text-red-500">*</span>
              </Label>
              <Input
                id="whatsapp"
                value={formData.whatsappNumber}
                onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                placeholder="+573001234567"
                required
              />
              <p className="text-xs text-gray-500">Formato: +57 seguido de 10 dígitos</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image" className="text-base font-semibold">
                URL de Foto (opcional)
              </Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
                placeholder="https://ejemplo.com/foto.jpg"
              />
              <p className="text-xs text-gray-500">Deja vacío para usar imagen por defecto</p>
            </div>
          </div>

          <div className="space-y-4 border-t pt-6">
            <Label className="text-base font-semibold">
              Horarios de Disponibilidad <span className="text-red-500">*</span>
            </Label>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={currentSchedule.days} onValueChange={(value) => setCurrentSchedule(prev => ({ ...prev, days: value }))}>
                <SelectTrigger className="sm:w-48">
                  <SelectValue placeholder="Días" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Solo Urgencias">Solo Urgencias</SelectItem>
                  {COMMON_RANGES.filter(r => r !== 'Solo Urgencias').map(range => (
                    <SelectItem key={range} value={range}>{range}</SelectItem>
                  ))}
                  {DAYS.map(day => (
                    <SelectItem key={day} value={day}>{day}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {currentSchedule.days !== 'Solo Urgencias' && (
                <Input
                  placeholder="Horario (Ej: 8-12, 2-6)"
                  value={currentSchedule.timeRange}
                  onChange={(e) => setCurrentSchedule(prev => ({ ...prev, timeRange: e.target.value }))}
                  className="flex-1"
                />
              )}

              <Button
                type="button"
                onClick={addScheduleSlot}
                className="sm:w-auto"
              >
                <Plus className="w-4 h-4 mr-2" />
                Agregar
              </Button>
            </div>

            {formData.schedule.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.schedule.map((slot, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-2 text-sm">
                    {slot}
                    <button
                      type="button"
                      onClick={() => removeScheduleSlot(index)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-4 pt-6 border-t">
            <Button type="submit" className="flex-1" size="lg">
              <Check className="w-5 h-5 mr-2" />
              Registrar Perfil
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
