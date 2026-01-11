import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { supabase, colombianCities, type Lead } from '@/lib/supabase';
import { AIService } from '@/lib/aiService';
import { MetaPixelService } from '@/lib/metaPixel';
import { CheckCircle, EnvelopeSimple, Phone, MapPin, User } from '@phosphor-icons/react';

interface FormularioInteligenteProps {
  setPage?: (page: string) => void;
}

export default function FormularioInteligente({ setPage }: FormularioInteligenteProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState<'familia' | 'profesional' | 'empleador' | ''>('');
  
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    ciudad: '',
    mensaje: '',
    necesidad_especifica: '',
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateField = (field: string, value: string): string | null => {
    switch (field) {
      case 'nombre':
        if (!value || value.length < 3) return 'El nombre debe tener al menos 3 caracteres';
        return null;
      
      case 'email':
        if (!AIService.validateEmail(value)) return 'Ingrese un email válido';
        return null;
      
      case 'telefono':
        if (!AIService.validateColombianPhone(value)) {
          return 'Formato: +57 seguido de 10 dígitos';
        }
        return null;
      
      case 'mensaje':
        if (!value || value.length < 20) return 'El mensaje debe tener al menos 20 caracteres';
        return null;
      
      default:
        return null;
    }
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    const error = validateField(field, value);
    setValidationErrors(prev => ({ ...prev, [field]: error || '' }));
  };

  const validateStep1 = (): boolean => {
    if (!userType) {
      toast.error('Por favor selecciona tu tipo de necesidad');
      return false;
    }
    return true;
  };

  const validateStep2 = (): boolean => {
    const errors: Record<string, string> = {};
    
    ['nombre', 'email', 'telefono', 'mensaje'].forEach(field => {
      const error = validateField(field, formData[field as keyof typeof formData]);
      if (error) errors[field] = error;
    });
    
    if (!formData.ciudad) errors.ciudad = 'Selecciona tu ciudad';
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep2()) {
      toast.error('Por favor completa todos los campos correctamente');
      return;
    }
    
    setLoading(true);
    
    try {
      const urgency = AIService.detectUrgencyKeywords(formData.mensaje) ? 'urgente' : 'normal';
      
      const leadData: Omit<Lead, 'id' | 'created_at'> = {
        tipo_usuario: userType as 'familia' | 'profesional' | 'empleador',
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono,
        ciudad: formData.ciudad,
        mensaje: formData.mensaje,
        urgencia: urgency as 'normal' | 'urgente',
        estado: 'nuevo',
        prioridad: urgency === 'urgente' ? 'alta' : 'media',
      };
      
      const iaClassification = await AIService.classifyLead({
        ...leadData,
        userType,
        necesidad: formData.necesidad_especifica,
      });
      
      leadData.nivel_confianza = 'alto';
      leadData.ia_clasificacion = iaClassification;
      leadData.prioridad = iaClassification.prioridad as 'alta' | 'media' | 'baja';
      
      const { error } = await supabase.from('leads').insert([leadData]);
      
      if (error) throw error;
      
      await AIService.analyzeUserInteraction({
        pagina: '/formulario-contacto',
        tipo_evento: 'lead_generado',
        datos_formulario: { tipo: userType, urgencia: urgency },
      });
      
      MetaPixelService.trackLead({
        source: 'Formulario Inteligente',
        content_name: userType,
      });
      
      toast.success('¡Mensaje enviado! Te contactaremos pronto.');
      
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        ciudad: '',
        mensaje: '',
        necesidad_especifica: '',
      });
      setUserType('');
      setStep(1);
      
    } catch (error: any) {
      console.error('Error al enviar formulario:', error);
      toast.error('Error al enviar el mensaje. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-primary text-white p-4 rounded-full">
              <EnvelopeSimple size={48} weight="duotone" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            ¿Cómo podemos ayudarte?
          </h1>
          <p className="text-lg text-muted-foreground">
            Completa el formulario y nos pondremos en contacto contigo
          </p>
        </div>

        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle>Formulario de Contacto Inteligente</CardTitle>
            <CardDescription>
              Paso {step} de 2 - Nos adaptamos a tu necesidad
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-lg font-semibold mb-4 block">
                    ¿Para qué deseas usar Hogar Belén?
                  </Label>
                  <RadioGroup value={userType} onValueChange={(value) => setUserType(value as any)}>
                    <Card className={`cursor-pointer hover:shadow-md transition-shadow ${userType === 'familia' ? 'border-primary border-2' : ''}`}>
                      <CardContent className="pt-6">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="familia" id="familia" />
                          <Label htmlFor="familia" className="cursor-pointer flex-1">
                            <div className="flex items-start">
                              <User className="mr-3 h-6 w-6 text-primary" weight="duotone" />
                              <div>
                                <p className="font-semibold text-lg">Busco cuidado para un adulto mayor</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Necesito servicios de cuidado, residencia o profesionales
                                </p>
                              </div>
                            </div>
                          </Label>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className={`cursor-pointer hover:shadow-md transition-shadow ${userType === 'profesional' ? 'border-primary border-2' : ''}`}>
                      <CardContent className="pt-6">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="profesional" id="profesional" />
                          <Label htmlFor="profesional" className="cursor-pointer flex-1">
                            <div className="flex items-start">
                              <User className="mr-3 h-6 w-6 text-primary" weight="duotone" />
                              <div>
                                <p className="font-semibold text-lg">Soy profesional de la salud / cuidado</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Quiero registrarme o buscar oportunidades laborales
                                </p>
                              </div>
                            </div>
                          </Label>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className={`cursor-pointer hover:shadow-md transition-shadow ${userType === 'empleador' ? 'border-primary border-2' : ''}`}>
                      <CardContent className="pt-6">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="empleador" id="empleador" />
                          <Label htmlFor="empleador" className="cursor-pointer flex-1">
                            <div className="flex items-start">
                              <User className="mr-3 h-6 w-6 text-primary" weight="duotone" />
                              <div>
                                <p className="font-semibold text-lg">Quiero publicar una oferta de trabajo</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Busco contratar profesionales del cuidado
                                </p>
                              </div>
                            </div>
                          </Label>
                        </div>
                      </CardContent>
                    </Card>
                  </RadioGroup>
                </div>

                <Button
                  onClick={handleNextStep}
                  disabled={!userType}
                  className="w-full"
                  size="lg"
                >
                  Continuar
                </Button>
              </div>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <Alert className="bg-primary-50 border-primary-200">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <AlertDescription>
                    <strong>Perfil seleccionado:</strong>{' '}
                    {userType === 'familia' && 'Busco cuidado para un adulto mayor'}
                    {userType === 'profesional' && 'Soy profesional de la salud'}
                    {userType === 'empleador' && 'Quiero publicar una oferta'}
                    <Button
                      variant="link"
                      size="sm"
                      onClick={() => setStep(1)}
                      className="ml-2 p-0 h-auto"
                    >
                      Cambiar
                    </Button>
                  </AlertDescription>
                </Alert>

                <div>
                  <Label htmlFor="nombre">Nombre completo *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="nombre"
                      value={formData.nombre}
                      onChange={(e) => handleFieldChange('nombre', e.target.value)}
                      placeholder="Tu nombre completo"
                      className={`pl-10 ${validationErrors.nombre ? 'border-destructive' : ''}`}
                    />
                  </div>
                  {validationErrors.nombre && (
                    <p className="text-sm text-destructive mt-1">{validationErrors.nombre}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Correo electrónico *</Label>
                    <div className="relative">
                      <EnvelopeSimple className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleFieldChange('email', e.target.value)}
                        placeholder="tu@correo.com"
                        className={`pl-10 ${validationErrors.email ? 'border-destructive' : ''}`}
                      />
                    </div>
                    {validationErrors.email && (
                      <p className="text-sm text-destructive mt-1">{validationErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="telefono">Teléfono / WhatsApp *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="telefono"
                        value={formData.telefono}
                        onChange={(e) => handleFieldChange('telefono', e.target.value)}
                        placeholder="+573001234567"
                        className={`pl-10 ${validationErrors.telefono ? 'border-destructive' : ''}`}
                      />
                    </div>
                    {validationErrors.telefono && (
                      <p className="text-sm text-destructive mt-1">{validationErrors.telefono}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="ciudad">Ciudad *</Label>
                  <Select value={formData.ciudad} onValueChange={(value) => handleFieldChange('ciudad', value)}>
                    <SelectTrigger className={validationErrors.ciudad ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Selecciona tu ciudad" />
                    </SelectTrigger>
                    <SelectContent>
                      {colombianCities.map((city) => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {validationErrors.ciudad && (
                    <p className="text-sm text-destructive mt-1">{validationErrors.ciudad}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="mensaje">Cuéntanos qué necesitas *</Label>
                  <Textarea
                    id="mensaje"
                    value={formData.mensaje}
                    onChange={(e) => handleFieldChange('mensaje', e.target.value)}
                    placeholder={
                      userType === 'familia'
                        ? 'Ej: Busco cuidador para mi madre de 75 años, necesita atención diaria...'
                        : userType === 'profesional'
                        ? 'Ej: Soy enfermera con 5 años de experiencia en geriatría...'
                        : 'Ej: Necesito contratar un fisioterapeuta para atención domiciliaria...'
                    }
                    rows={5}
                    className={validationErrors.mensaje ? 'border-destructive' : ''}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {formData.mensaje.length} caracteres (mínimo 20)
                  </p>
                  {validationErrors.mensaje && (
                    <p className="text-sm text-destructive mt-1">{validationErrors.mensaje}</p>
                  )}
                </div>

                {AIService.detectUrgencyKeywords(formData.mensaje) && (
                  <Alert className="bg-amber-50 border-amber-500">
                    <AlertDescription className="text-amber-900">
                      <strong>⚡ Detectamos urgencia en tu mensaje.</strong> Tu solicitud será priorizada.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    disabled={loading}
                    className="flex-1"
                  >
                    Volver
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-primary hover:bg-primary-600"
                  >
                    {loading ? 'Enviando...' : 'Enviar Mensaje'}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
