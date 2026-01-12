import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import { supabase, professionalCategories, colombianCities, daysOfWeek, type ProfessionalProfile } from '@/lib/supabase';
import { AIService } from '@/lib/aiService';
import { CheckCircle, Warning, Upload, UserCheck } from '@phosphor-icons/react';

interface RegistroProfesionalProps {
  setPage?: (page: string) => void;
}

export default function RegistroProfesional({ setPage }: RegistroProfesionalProps) {
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [aiAlerts, setAiAlerts] = useState<string[]>([]);
  
  const [formData, setFormData] = useState<Partial<ProfessionalProfile>>({
    nombre_completo: '',
    titulo_profesional: '',
    categoria_profesional: '',
    ciudad: '',
    telefono: '',
    email: '',
    foto_perfil: '',
    descripcion_profesional: '',
    años_experiencia: 0,
    dias_disponibles: [],
    horario_atencion: '',
    tarifa_por_hora: 0,
    estado_perfil: 'pendiente_verificacion',
    check_verificado: false
  });

  const validateField = (field: string, value: any): string | null => {
    switch (field) {
      case 'nombre_completo':
        if (!value || value.length < 5) return 'El nombre debe tener al menos 5 caracteres';
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) return 'El nombre solo debe contener letras';
        return null;
        
      case 'telefono':
        if (!AIService.validateColombianPhone(value)) {
          return 'Debe ser un teléfono válido de Colombia (+57 seguido de 10 dígitos)';
        }
        return null;
        
      case 'email':
        if (!AIService.validateEmail(value)) {
          return 'Ingrese un email válido. No se permiten correos temporales';
        }
        return null;
        
      case 'descripcion_profesional':
        if (!value || value.length < 100) return 'La descripción debe tener al menos 100 caracteres';
        if (value.length > 500) return 'La descripción no puede exceder 500 caracteres';
        return null;
        
      case 'tarifa_por_hora':
        if (!value || value < 10000) return 'La tarifa mínima es $10.000 COP/hora';
        if (value > 200000) return 'La tarifa máxima es $200.000 COP/hora';
        return null;
        
      case 'años_experiencia':
        if (value < 0 || value > 50) return 'Los años de experiencia deben estar entre 0 y 50';
        return null;
        
      default:
        return null;
    }
  };

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    const error = validateField(field, value);
    setValidationErrors(prev => ({
      ...prev,
      [field]: error || ''
    }));
  };

  const handleDayToggle = (day: string) => {
    setFormData(prev => {
      const dias = prev.dias_disponibles || [];
      const newDias = dias.includes(day)
        ? dias.filter(d => d !== day)
        : [...dias, day];
      return { ...prev, dias_disponibles: newDias };
    });
  };

  const validateAllFields = (): boolean => {
    const errors: Record<string, string> = {};
    
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field as keyof typeof formData]);
      if (error) errors[field] = error;
    });
    
    if (!formData.categoria_profesional) errors.categoria_profesional = 'Debe seleccionar una categoría';
    if (!formData.ciudad) errors.ciudad = 'Debe seleccionar una ciudad';
    if (!formData.horario_atencion) errors.horario_atencion = 'Debe especificar su horario';
    if (!formData.dias_disponibles || formData.dias_disponibles.length === 0) {
      errors.dias_disponibles = 'Debe seleccionar al menos un día';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateAllFields()) {
      toast.error('Por favor corrija los errores en el formulario');
      return;
    }
    
    setLoading(true);
    
    try {
      const validation = await AIService.validateProfessionalProfile(formData);
      
      setAiAlerts(validation.alertas);
      
      if (validation.recomendacion === 'rechazar') {
        toast.error('El perfil no cumple con los requisitos. Por favor revise la información.');
        setLoading(false);
        return;
      }
      
      const profileData = {
        ...formData,
        nivel_confianza: validation.nivel_confianza
      };
      
      const { data, error } = await supabase
        .from('professional_profiles')
        .insert([profileData])
        .select()
        .single();
      
      if (error) throw error;
      
      await AIService.analyzeUserInteraction({
        pagina: '/registro-profesional',
        tipo_usuario: 'profesional',
        datos_formulario: { categoria: formData.categoria_profesional }
      });
      
      toast.success('¡Registro exitoso! Tu perfil será revisado por nuestro equipo.');
      
      setTimeout(() => {
        if (setPage) {
          setPage('dashboard-pro');
        }
      }, 2000);
      
    } catch (error: any) {
      console.error('Error al registrar:', error);
      toast.error('Error al registrar. Por favor intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-primary text-white p-4 rounded-full">
              <UserCheck size={48} weight="duotone" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Registro de Profesional
          </h1>
          <p className="text-lg text-muted-foreground">
            Completa tu perfil para aparecer en el directorio de profesionales verificados
          </p>
        </div>

        {aiAlerts.length > 0 && (
          <Alert className="mb-6 border-amber-500 bg-amber-50">
            <Warning className="h-4 w-4 text-amber-600" />
            <AlertDescription>
              <ul className="list-disc list-inside">
                {aiAlerts.map((alert, idx) => (
                  <li key={idx}>{alert}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle>Datos del Profesional</CardTitle>
            <CardDescription>
              Toda la información será revisada por nuestro equipo antes de la publicación
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">1️⃣ Datos Básicos</h3>
                
                <div>
                  <Label htmlFor="nombre_completo">Nombre completo *</Label>
                  <Input
                    id="nombre_completo"
                    value={formData.nombre_completo}
                    onChange={(e) => handleFieldChange('nombre_completo', e.target.value)}
                    placeholder="Ej: María Fernanda Rojas"
                    className={validationErrors.nombre_completo ? 'border-destructive' : ''}
                  />
                  {validationErrors.nombre_completo && (
                    <p className="text-sm text-destructive mt-1">{validationErrors.nombre_completo}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="titulo_profesional">Título profesional / Ocupación *</Label>
                  <Input
                    id="titulo_profesional"
                    value={formData.titulo_profesional}
                    onChange={(e) => handleFieldChange('titulo_profesional', e.target.value)}
                    placeholder="Ej: Enfermera Jefe – Especialista UCI"
                  />
                </div>

                <div>
                  <Label htmlFor="categoria_profesional">Categoría profesional *</Label>
                  <Select
                    value={formData.categoria_profesional}
                    onValueChange={(value) => handleFieldChange('categoria_profesional', value)}
                  >
                    <SelectTrigger className={validationErrors.categoria_profesional ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {professionalCategories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {validationErrors.categoria_profesional && (
                    <p className="text-sm text-destructive mt-1">{validationErrors.categoria_profesional}</p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">2️⃣ Ubicación y Contacto</h3>
                
                <div>
                  <Label htmlFor="ciudad">Ciudad / Municipio *</Label>
                  <Select
                    value={formData.ciudad}
                    onValueChange={(value) => handleFieldChange('ciudad', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tu ciudad" />
                    </SelectTrigger>
                    <SelectContent>
                      {colombianCities.map((city) => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="telefono">Teléfono / WhatsApp *</Label>
                  <Input
                    id="telefono"
                    value={formData.telefono}
                    onChange={(e) => handleFieldChange('telefono', e.target.value)}
                    placeholder="+573001234567"
                    className={validationErrors.telefono ? 'border-destructive' : ''}
                  />
                  {validationErrors.telefono && (
                    <p className="text-sm text-destructive mt-1">{validationErrors.telefono}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Correo electrónico *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    placeholder="ejemplo@correo.com"
                    className={validationErrors.email ? 'border-destructive' : ''}
                  />
                  {validationErrors.email && (
                    <p className="text-sm text-destructive mt-1">{validationErrors.email}</p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">3️⃣ Perfil Público</h3>
                
                <div>
                  <Label htmlFor="foto_perfil">Foto de perfil (opcional)</Label>
                  <Input
                    id="foto_perfil"
                    value={formData.foto_perfil}
                    onChange={(e) => handleFieldChange('foto_perfil', e.target.value)}
                    placeholder="URL de tu foto"
                  />
                </div>

                <div>
                  <Label htmlFor="descripcion_profesional">Descripción profesional *</Label>
                  <Textarea
                    id="descripcion_profesional"
                    value={formData.descripcion_profesional}
                    onChange={(e) => handleFieldChange('descripcion_profesional', e.target.value)}
                    placeholder="Cuéntanos brevemente tu experiencia (100-500 caracteres)"
                    rows={4}
                    className={validationErrors.descripcion_profesional ? 'border-destructive' : ''}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {formData.descripcion_profesional?.length || 0} / 500 caracteres
                  </p>
                  {validationErrors.descripcion_profesional && (
                    <p className="text-sm text-destructive mt-1">{validationErrors.descripcion_profesional}</p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">4️⃣ Experiencia y Disponibilidad</h3>
                
                <div>
                  <Label htmlFor="años_experiencia">Años de experiencia *</Label>
                  <Input
                    id="años_experiencia"
                    type="number"
                    min="0"
                    max="50"
                    value={formData.años_experiencia}
                    onChange={(e) => handleFieldChange('años_experiencia', parseInt(e.target.value))}
                  />
                </div>

                <div>
                  <Label>Días disponibles *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                    {daysOfWeek.map((day) => (
                      <div key={day} className="flex items-center space-x-2">
                        <Checkbox
                          id={`day-${day}`}
                          checked={formData.dias_disponibles?.includes(day)}
                          onCheckedChange={() => handleDayToggle(day)}
                        />
                        <Label htmlFor={`day-${day}`} className="cursor-pointer">{day}</Label>
                      </div>
                    ))}
                  </div>
                  {validationErrors.dias_disponibles && (
                    <p className="text-sm text-destructive mt-1">{validationErrors.dias_disponibles}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="horario_atencion">Horario de atención *</Label>
                  <Input
                    id="horario_atencion"
                    value={formData.horario_atencion}
                    onChange={(e) => handleFieldChange('horario_atencion', e.target.value)}
                    placeholder="Ej: 8:00 a.m. – 12:00 m, 2:00 p.m. – 6:00 p.m."
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">5️⃣ Tarifa</h3>
                
                <div>
                  <Label htmlFor="tarifa_por_hora">¿Cuánto cobras por hora? *</Label>
                  <Input
                    id="tarifa_por_hora"
                    type="number"
                    min="10000"
                    max="200000"
                    value={formData.tarifa_por_hora}
                    onChange={(e) => handleFieldChange('tarifa_por_hora', parseInt(e.target.value))}
                    placeholder="20000"
                    className={validationErrors.tarifa_por_hora ? 'border-destructive' : ''}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Se mostrará como "Desde ${formData.tarifa_por_hora?.toLocaleString('es-CO') || '0'} COP / hora"
                  </p>
                  {validationErrors.tarifa_por_hora && (
                    <p className="text-sm text-destructive mt-1">{validationErrors.tarifa_por_hora}</p>
                  )}
                </div>
              </div>

              <Alert className="bg-primary-50 border-primary-200">
                <CheckCircle className="h-4 w-4 text-primary" />
                <AlertDescription>
                  <strong>Al registrarte:</strong> Tu perfil quedará en estado "Pendiente de verificación". 
                  Nuestro equipo revisará tu información y documentos antes de activar tu check azul verificado.
                </AlertDescription>
              </Alert>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setPage && setPage('home')}
                  disabled={loading}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-primary hover:bg-primary-600"
                >
                  {loading ? 'Registrando...' : 'Completar Registro'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
