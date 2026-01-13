import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { 
  CheckCircle, 
  AlertTriangle, 
  Upload, 
  UserCheck, 
  FileText, 
  Camera, 
  Sparkles,
  Shield,
  CheckCircle2,
  AlertCircle,
  Clock,
  Brain
} from 'lucide-react';
import { useKV } from '@github/spark/hooks';

interface RegistroProfesionalProps {
  setPage?: (page: string) => void;
}

interface FormData {
  nombre_completo: string;
  titulo_profesional: string;
  categoria_profesional: string;
  ciudad: string;
  telefono: string;
  email: string;
  foto_perfil: string | null;
  dias_disponibles: string[];
  horario_atencion: string;
  descripcion_profesional: string;
  
  documento_cedula: string | null;
  documento_hoja_vida: string | null;
  documento_antecedentes: string | null;
  requiere_tarjeta_profesional: boolean;
  numero_tarjeta_profesional: string;
  
  test_completado: boolean;
  test_score: number;
  test_respuestas: any[];
  
  acepta_terminos: boolean;
  acepta_datos: boolean;
  acepta_foto: boolean;
  firma_digital: string;
}

interface TestQuestion {
  id: number;
  pregunta: string;
  opciones: string[];
  respuesta_correcta: number;
  categoria: string;
}

const professionalCategories = [
  'Enfermería',
  'Cuidador adulto mayor',
  'Fisioterapia',
  'Medicina general',
  'Psicología',
  'Trabajo Social',
  'Terapia Ocupacional',
  'Nutrición'
];

const colombianCities = [
  'Bogotá',
  'Medellín',
  'Cali',
  'Barranquilla',
  'Cartagena',
  'Cúcuta',
  'Bucaramanga',
  'Pereira',
  'Santa Marta',
  'Ibagué',
  'Pasto',
  'Manizales',
  'Neiva',
  'Villavicencio',
  'Armenia',
  'Valledupar',
  'Montería',
  'Sincelejo',
  'Popayán',
  'Tunja',
  'Buesaco'
];

const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

export default function RegistroProfesionalInteligente({ setPage }: RegistroProfesionalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [aiProcessing, setAiProcessing] = useState(false);
  const [showTestDialog, setShowTestDialog] = useState(false);
  const [currentTestQuestion, setCurrentTestQuestion] = useState(0);
  const [testQuestions, setTestQuestions] = useState<TestQuestion[]>([]);
  const [testAnswers, setTestAnswers] = useState<number[]>([]);
  const [showSignaturePad, setShowSignaturePad] = useState(false);
  
  const [profiles, setProfiles] = useKV<any[]>('professional-profiles', []);
  const [pendingProfiles, setPendingProfiles] = useKV<any[]>('pending-professional-verification', []);
  
  const [formData, setFormData] = useState<FormData>({
    nombre_completo: '',
    titulo_profesional: '',
    categoria_profesional: '',
    ciudad: '',
    telefono: '',
    email: '',
    foto_perfil: null,
    dias_disponibles: [],
    horario_atencion: '',
    descripcion_profesional: '',
    documento_cedula: null,
    documento_hoja_vida: null,
    documento_antecedentes: null,
    requiere_tarjeta_profesional: false,
    numero_tarjeta_profesional: '',
    test_completado: false,
    test_score: 0,
    test_respuestas: [],
    acepta_terminos: false,
    acepta_datos: false,
    acepta_foto: false,
    firma_digital: ''
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const getFieldCompletionCount = () => {
    let completed = 0;
    let total = 0;

    if (currentStep === 1) {
      total = 7;
      if (formData.nombre_completo) completed++;
      if (formData.titulo_profesional) completed++;
      if (formData.categoria_profesional) completed++;
      if (formData.ciudad) completed++;
      if (formData.telefono && validatePhone(formData.telefono)) completed++;
      if (formData.dias_disponibles.length > 0) completed++;
      if (formData.horario_atencion) completed++;
      if (formData.descripcion_profesional && formData.descripcion_profesional.length >= 100) completed++;
    } else if (currentStep === 2) {
      total = formData.requiere_tarjeta_profesional ? 5 : 4;
      if (formData.documento_cedula) completed++;
      if (formData.documento_hoja_vida) completed++;
      if (formData.documento_antecedentes) completed++;
      if (formData.requiere_tarjeta_profesional && formData.numero_tarjeta_profesional) completed++;
    } else if (currentStep === 3) {
      total = 1;
      if (formData.test_completado) completed++;
    } else if (currentStep === 4) {
      total = 4;
      if (formData.acepta_terminos) completed++;
      if (formData.acepta_datos) completed++;
      if (formData.acepta_foto) completed++;
      if (formData.firma_digital) completed++;
    }

    return { completed, total, percentage: total > 0 ? (completed / total) * 100 : 0 };
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\+57\d{10}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const tempEmailDomains = ['tempmail', 'guerrillamail', '10minutemail', 'throwaway'];
    const isTemp = tempEmailDomains.some(domain => email.toLowerCase().includes(domain));
    return emailRegex.test(email) && !isTemp;
  };

  const handleFieldChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const validateField = (field: keyof FormData, value: any): string | null => {
    let error: string | null = null;

    switch (field) {
      case 'nombre_completo':
        if (!value || value.length < 5) error = 'El nombre debe tener al menos 5 caracteres';
        else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) error = 'Solo letras permitidas';
        break;
      case 'telefono':
        if (!validatePhone(value)) error = 'Formato: +57 seguido de 10 dígitos';
        break;
      case 'email':
        if (!validateEmail(value)) error = 'Email inválido o temporal no permitido';
        break;
      case 'descripcion_profesional':
        if (!value || value.length < 100) error = 'Mínimo 100 caracteres';
        else if (value.length > 200) error = 'Máximo 200 caracteres';
        break;
    }

    setValidationErrors(prev => ({
      ...prev,
      [field]: error || ''
    }));

    return error;
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

  const generateTestQuestions = async () => {
    setAiProcessing(true);
    
    try {
      const prompt = `Genera exactamente 20 preguntas de opción múltiple para evaluar competencias de un profesional en ${formData.categoria_profesional} especializado en cuidado de adultos mayores. 

Cada pregunta debe tener:
- Una pregunta clara y específica
- 4 opciones de respuesta
- Una respuesta correcta (índice 0-3)
- Categoría (técnica, ética, práctica, emergencias)

Las preguntas deben evaluar:
- Conocimientos técnicos básicos
- Habilidades de comunicación
- Ética profesional
- Manejo de situaciones comunes
- Cuidados específicos para adultos mayores

Retorna un objeto JSON con una propiedad "preguntas" que contenga el array de preguntas. Cada pregunta debe tener: pregunta (string), opciones (array de 4 strings), respuesta_correcta (número 0-3), categoria (string).`;

      const response = await window.spark.llm(prompt, 'gpt-4o-mini', true);
      const data = JSON.parse(response);
      const questions: TestQuestion[] = data.preguntas.map((q: any, idx: number) => ({
        id: idx + 1,
        pregunta: q.pregunta,
        opciones: q.opciones,
        respuesta_correcta: q.respuesta_correcta,
        categoria: q.categoria
      }));
      
      setTestQuestions(questions);
      setTestAnswers(new Array(questions.length).fill(-1));
      setShowTestDialog(true);
    } catch (error) {
      console.error('Error generating test:', error);
      toast.error('Error al generar test. Intenta nuevamente.');
    } finally {
      setAiProcessing(false);
    }
  };

  const handleTestAnswer = (answerIndex: number) => {
    const newAnswers = [...testAnswers];
    newAnswers[currentTestQuestion] = answerIndex;
    setTestAnswers(newAnswers);
  };

  const finishTest = () => {
    let correct = 0;
    testQuestions.forEach((q, idx) => {
      if (testAnswers[idx] === q.respuesta_correcta) {
        correct++;
      }
    });

    const score = Math.round((correct / testQuestions.length) * 100);
    
    setFormData(prev => ({
      ...prev,
      test_completado: true,
      test_score: score,
      test_respuestas: testQuestions.map((q, idx) => ({
        pregunta: q.pregunta,
        respuesta_usuario: testAnswers[idx],
        respuesta_correcta: q.respuesta_correcta,
        correcta: testAnswers[idx] === q.respuesta_correcta
      }))
    }));

    setShowTestDialog(false);
    toast.success(`Test completado. Puntuación: ${score}/100`);
  };

  const generateAIAnalysis = async () => {
    try {
      const prompt = `Analiza el siguiente perfil profesional y proporciona un informe de verificación:

Datos básicos:
- Nombre: ${formData.nombre_completo}
- Título: ${formData.titulo_profesional}
- Categoría: ${formData.categoria_profesional}
- Ciudad: ${formData.ciudad}
- Email: ${formData.email}
- Teléfono: ${formData.telefono}

Descripción profesional:
${formData.descripcion_profesional}

Test de competencias:
- Puntuación: ${formData.test_score}/100
- ${formData.test_respuestas.filter((r: any) => r.correcta).length} respuestas correctas de ${formData.test_respuestas.length}

Documenta:
- Cédula: ${formData.documento_cedula ? 'Sí' : 'No'}
- Hoja de vida: ${formData.documento_hoja_vida ? 'Sí' : 'No'}
- Antecedentes: ${formData.documento_antecedentes ? 'Sí' : 'No'}
${formData.requiere_tarjeta_profesional ? `- Tarjeta profesional: ${formData.numero_tarjeta_profesional}` : ''}

Genera un informe de verificación que incluya:
1. Nivel de confianza (1-100)
2. Recomendación (aprobar_automaticamente, revisar_manualmente, rechazar)
3. Alertas o inconsistencias detectadas
4. Fortalezas del perfil
5. Áreas de mejora o verificación adicional
6. Búsquedas sugeridas (LinkedIn, redes, Google) para validación manual

Retorna un objeto JSON con propiedades: nivel_confianza, recomendacion, alertas (array), fortalezas (array), verificaciones_sugeridas (array), comentario_general.`;

      const response = await window.spark.llm(prompt, 'gpt-4o', true);
      return JSON.parse(response);
    } catch (error) {
      console.error('Error in AI analysis:', error);
      return null;
    }
  };

  const canProceedToNextStep = (): boolean => {
    if (currentStep === 1) {
      return !!(
        formData.nombre_completo &&
        formData.titulo_profesional &&
        formData.categoria_profesional &&
        formData.ciudad &&
        validatePhone(formData.telefono) &&
        validateEmail(formData.email) &&
        formData.dias_disponibles.length > 0 &&
        formData.horario_atencion &&
        formData.descripcion_profesional &&
        formData.descripcion_profesional.length >= 100 &&
        formData.descripcion_profesional.length <= 200
      );
    } else if (currentStep === 2) {
      const basicDocs = formData.documento_cedula && 
                       formData.documento_hoja_vida && 
                       formData.documento_antecedentes;
      const professionalCard = !formData.requiere_tarjeta_profesional || 
                              formData.numero_tarjeta_profesional;
      return !!(basicDocs && professionalCard);
    } else if (currentStep === 3) {
      return formData.test_completado;
    } else if (currentStep === 4) {
      return !!(
        formData.acepta_terminos &&
        formData.acepta_datos &&
        formData.acepta_foto &&
        formData.firma_digital
      );
    }
    return false;
  };

  const handleNextStep = () => {
    if (canProceedToNextStep()) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      toast.error('Por favor completa todos los campos requeridos');
    }
  };

  const handleSubmit = async () => {
    if (!canProceedToNextStep()) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    setAiProcessing(true);

    try {
      const aiAnalysis = await generateAIAnalysis();

      const profileData = {
        ...formData,
        estado_perfil: 'pendiente_verificacion',
        fecha_registro: new Date().toISOString(),
        ai_analysis: aiAnalysis,
        visible_publico: false,
        check_verificado: false,
        id: `prof_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      };

      setPendingProfiles((current: any[]) => [...current, profileData]);

      toast.success('¡Registro exitoso! Tu perfil será revisado por nuestro equipo administrativo.');
      
      setTimeout(() => {
        if (setPage) {
          setPage('home');
        }
      }, 2000);

    } catch (error) {
      console.error('Error al registrar:', error);
      toast.error('Error al registrar. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
      setAiProcessing(false);
    }
  };

  const fieldCompletion = getFieldCompletionCount();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-primary text-white p-4 rounded-full">
              <UserCheck size={48} />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Registro de Profesional
          </h1>
          <p className="text-lg text-muted-foreground">
            Formulario inteligente con validación en tiempo real
          </p>
        </div>

        <Card className="mb-6 shadow-lg border-2 border-primary/20">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Brain className="text-primary" size={20} />
                  <span className="font-semibold text-sm">Progreso del Formulario</span>
                </div>
                <Badge variant="secondary" className="text-sm">
                  Paso {currentStep} de {totalSteps}
                </Badge>
              </div>
              
              <Progress value={progress} className="h-3" />
              
              <div className="flex justify-between text-xs text-muted-foreground">
                <span className={currentStep === 1 ? 'text-primary font-semibold' : ''}>Perfil</span>
                <span className={currentStep === 2 ? 'text-primary font-semibold' : ''}>Documentos</span>
                <span className={currentStep === 3 ? 'text-primary font-semibold' : ''}>Test</span>
                <span className={currentStep === 4 ? 'text-primary font-semibold' : ''}>Contrato</span>
              </div>

              <div className="flex items-center gap-2 bg-primary-50 p-3 rounded-lg mt-4">
                <CheckCircle2 className="text-primary flex-shrink-0" size={20} />
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Sección actual: {fieldCompletion.completed} de {fieldCompletion.total} campos completados
                  </p>
                  <Progress value={fieldCompletion.percentage} className="h-1 mt-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && 'Parte 1: Datos del Perfil'}
              {currentStep === 2 && 'Parte 2: Documentos'}
              {currentStep === 3 && 'Parte 3: Test Inteligente'}
              {currentStep === 4 && 'Parte 4: Contrato y Autorizaciones'}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && 'Completa tu información profesional y de contacto'}
              {currentStep === 2 && 'Sube tus documentos de verificación'}
              {currentStep === 3 && 'Evaluación de competencias adaptada a tu profesión'}
              {currentStep === 4 && 'Acepta los términos y firma digitalmente'}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {/* PARTE 1 - DATOS DEL PERFIL */}
            {currentStep === 1 && (
              <div className="space-y-6">
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
                    <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {validationErrors.nombre_completo}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="titulo_profesional">Especialidad / Título profesional *</Label>
                  <Input
                    id="titulo_profesional"
                    value={formData.titulo_profesional}
                    onChange={(e) => handleFieldChange('titulo_profesional', e.target.value)}
                    placeholder="Ej: Enfermera Jefe Especialista UCI"
                  />
                </div>

                <div>
                  <Label htmlFor="categoria_profesional">Categoría *</Label>
                  <Select
                    value={formData.categoria_profesional}
                    onValueChange={(value) => handleFieldChange('categoria_profesional', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {professionalCategories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="ciudad">Ciudad *</Label>
                  <Select
                    value={formData.ciudad}
                    onValueChange={(value) => handleFieldChange('ciudad', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Ej: Bogotá" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {colombianCities.map((city) => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="telefono">Teléfono *</Label>
                  <Input
                    id="telefono"
                    value={formData.telefono}
                    onChange={(e) => handleFieldChange('telefono', e.target.value)}
                    placeholder="+573001234567"
                    className={validationErrors.telefono ? 'border-destructive' : ''}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Formato: +57 seguido de 10 dígitos</p>
                  {validationErrors.telefono && (
                    <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {validationErrors.telefono}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    placeholder="ejemplo@correo.com"
                    className={validationErrors.email ? 'border-destructive' : ''}
                  />
                  {validationErrors.email && (
                    <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {validationErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="foto_perfil">Foto de perfil (opcional)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="foto_perfil"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            handleFieldChange('foto_perfil', reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="flex-1"
                    />
                    <Button type="button" variant="outline" size="icon">
                      <Camera size={20} />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Si no subes foto, se usará una imagen por defecto
                  </p>
                </div>

                <div>
                  <Label>Disponibilidad - Días *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                    {daysOfWeek.map((day) => (
                      <div key={day} className="flex items-center space-x-2">
                        <Checkbox
                          id={`day-${day}`}
                          checked={formData.dias_disponibles.includes(day)}
                          onCheckedChange={() => handleDayToggle(day)}
                        />
                        <Label htmlFor={`day-${day}`} className="cursor-pointer text-sm">{day}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="horario_atencion">Disponibilidad - Horario *</Label>
                  <Input
                    id="horario_atencion"
                    value={formData.horario_atencion}
                    onChange={(e) => handleFieldChange('horario_atencion', e.target.value)}
                    placeholder="Ej: 8-12, 2-6"
                  />
                </div>

                <div>
                  <Label htmlFor="descripcion_profesional">Descripción profesional *</Label>
                  <Textarea
                    id="descripcion_profesional"
                    value={formData.descripcion_profesional}
                    onChange={(e) => handleFieldChange('descripcion_profesional', e.target.value)}
                    placeholder="Describe brevemente tu experiencia y habilidades..."
                    rows={4}
                    className={validationErrors.descripcion_profesional ? 'border-destructive' : ''}
                    maxLength={200}
                  />
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-muted-foreground">
                      Máximo 200 caracteres
                    </p>
                    <p className={`text-xs ${
                      formData.descripcion_profesional.length < 100 
                        ? 'text-destructive' 
                        : formData.descripcion_profesional.length > 200 
                          ? 'text-destructive'
                          : 'text-primary'
                    }`}>
                      {formData.descripcion_profesional.length} / 200
                    </p>
                  </div>
                  {validationErrors.descripcion_profesional && (
                    <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {validationErrors.descripcion_profesional}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* PARTE 2 - DOCUMENTOS */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <Alert className="bg-blue-50 border-blue-200">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <AlertDescription>
                    <strong>Documentos requeridos:</strong> Todos los documentos deben estar en formato PDF o imagen clara. 
                    La IA validará la coherencia de tus datos.
                  </AlertDescription>
                </Alert>

                <div>
                  <Label htmlFor="documento_cedula">Cédula *</Label>
                  <Input
                    id="documento_cedula"
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          handleFieldChange('documento_cedula', reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  {formData.documento_cedula && (
                    <div className="flex items-center gap-2 mt-2 text-sm text-green-600">
                      <CheckCircle size={16} />
                      Documento cargado
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="documento_hoja_vida">Hoja de vida (formato Función Pública) *</Label>
                  <Input
                    id="documento_hoja_vida"
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          handleFieldChange('documento_hoja_vida', reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  {formData.documento_hoja_vida && (
                    <div className="flex items-center gap-2 mt-2 text-sm text-green-600">
                      <CheckCircle size={16} />
                      Documento cargado
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="documento_antecedentes">Antecedentes penales *</Label>
                  <Input
                    id="documento_antecedentes"
                    type="file"
                    accept="application/pdf,image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          handleFieldChange('documento_antecedentes', reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  {formData.documento_antecedentes && (
                    <div className="flex items-center gap-2 mt-2 text-sm text-green-600">
                      <CheckCircle size={16} />
                      Documento cargado
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 p-4 bg-muted rounded-lg">
                  <Checkbox
                    id="requiere_tarjeta_profesional"
                    checked={formData.requiere_tarjeta_profesional}
                    onCheckedChange={(checked) => handleFieldChange('requiere_tarjeta_profesional', checked)}
                  />
                  <Label htmlFor="requiere_tarjeta_profesional" className="cursor-pointer">
                    ¿Aplica tarjeta profesional?
                  </Label>
                </div>

                {formData.requiere_tarjeta_profesional && (
                  <div>
                    <Label htmlFor="numero_tarjeta_profesional">Número de tarjeta profesional *</Label>
                    <Input
                      id="numero_tarjeta_profesional"
                      value={formData.numero_tarjeta_profesional}
                      onChange={(e) => handleFieldChange('numero_tarjeta_profesional', e.target.value)}
                      placeholder="TP-123456"
                    />
                  </div>
                )}

                <Alert className="bg-amber-50 border-amber-200">
                  <Sparkles className="h-4 w-4 text-amber-600" />
                  <AlertDescription>
                    <strong>Verificación IA:</strong> La inteligencia artificial puede consultar información adicional 
                    en web y redes sociales para generar un informe al administrador. 
                    Esta información NO es visible para el profesional.
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {/* PARTE 3 - TEST INTELIGENTE */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <Alert className="bg-purple-50 border-purple-200">
                  <Brain className="h-4 w-4 text-purple-600" />
                  <AlertDescription>
                    <strong>Test de competencias:</strong> 20 preguntas adaptadas a tu profesión. 
                    La IA evaluará tus habilidades y conocimientos. Calificación de 1 a 100.
                  </AlertDescription>
                </Alert>

                {!formData.test_completado ? (
                  <div className="text-center py-8">
                    <Brain className="mx-auto mb-4 text-primary" size={64} />
                    <h3 className="text-xl font-semibold mb-2">Test Inteligente</h3>
                    <p className="text-muted-foreground mb-6">
                      Evaluación automática de 20 preguntas adaptadas a {formData.categoria_profesional}
                    </p>
                    <Button
                      onClick={generateTestQuestions}
                      disabled={aiProcessing}
                      size="lg"
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      {aiProcessing ? (
                        <>
                          <Clock className="mr-2 animate-spin" size={20} />
                          Generando test...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2" size={20} />
                          Iniciar Test
                        </>
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="mx-auto mb-4 text-green-600" size={64} />
                    <h3 className="text-xl font-semibold mb-2">Test Completado</h3>
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 mb-4">
                      <p className="text-4xl font-bold text-purple-600 mb-2">
                        {formData.test_score}/100
                      </p>
                      <p className="text-muted-foreground">
                        {formData.test_score >= 80 ? 'Excelente desempeño' : 
                         formData.test_score >= 60 ? 'Buen desempeño' : 
                         'Desempeño aceptable'}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Resultado visible solo para el administrador
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, test_completado: false, test_score: 0 }));
                        setTestQuestions([]);
                        setTestAnswers([]);
                      }}
                    >
                      Realizar test nuevamente
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* PARTE 4 - CONTRATO Y AUTORIZACIONES */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <Alert className="bg-green-50 border-green-200">
                  <Shield className="h-4 w-4 text-green-600" />
                  <AlertDescription>
                    <strong>Contrato de transparencia:</strong> Este contrato protege legalmente a Hogar Belén 
                    como intermediario y garantiza tus derechos como profesional.
                  </AlertDescription>
                </Alert>

                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Contrato Digital de Transparencia</CardTitle>
                  </CardHeader>
                  <CardContent className="max-h-[300px] overflow-y-auto text-sm space-y-2">
                    <p><strong>ENTRE:</strong> Hogar Belén (EL INTERMEDIARIO) y {formData.nombre_completo} (EL PROFESIONAL)</p>
                    
                    <p><strong>OBJETO:</strong> Hogar Belén actúa como plataforma intermediaria para conectar profesionales 
                    del cuidado con familias que requieren servicios.</p>
                    
                    <p><strong>RESPONSABILIDADES DEL PROFESIONAL:</strong></p>
                    <ul className="list-disc list-inside ml-4">
                      <li>Mantener información veraz y actualizada</li>
                      <li>Cumplir estándares éticos y profesionales</li>
                      <li>Responder oportunamente a solicitudes de servicio</li>
                      <li>Mantener documentación vigente</li>
                    </ul>
                    
                    <p><strong>RESPONSABILIDADES DE HOGAR BELÉN:</strong></p>
                    <ul className="list-disc list-inside ml-4">
                      <li>Verificar documentación del profesional</li>
                      <li>Proporcionar plataforma segura de contacto</li>
                      <li>Facilitar comunicación entre partes</li>
                      <li>Mantener confidencialidad de datos</li>
                    </ul>
                    
                    <p><strong>LIMITACIÓN DE RESPONSABILIDAD:</strong> Hogar Belén actúa únicamente como intermediario. 
                    La relación contractual de servicios se establece directamente entre el profesional y el cliente.</p>
                    
                    <p><strong>COMISIÓN:</strong> Hogar Belén puede cobrar una comisión del 10% sobre servicios contratados 
                    a través de la plataforma.</p>
                    
                    <p><strong>PROTECCIÓN DE DATOS:</strong> Ambas partes se comprometen a cumplir con la Ley 1581 de 2012 
                    y demás normativa aplicable sobre protección de datos personales.</p>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <div className="flex items-start space-x-2 p-4 bg-muted rounded-lg">
                    <Checkbox
                      id="acepta_terminos"
                      checked={formData.acepta_terminos}
                      onCheckedChange={(checked) => handleFieldChange('acepta_terminos', checked)}
                    />
                    <Label htmlFor="acepta_terminos" className="cursor-pointer text-sm">
                      Acepto los términos y condiciones del contrato de transparencia *
                    </Label>
                  </div>

                  <div className="flex items-start space-x-2 p-4 bg-muted rounded-lg">
                    <Checkbox
                      id="acepta_datos"
                      checked={formData.acepta_datos}
                      onCheckedChange={(checked) => handleFieldChange('acepta_datos', checked)}
                    />
                    <Label htmlFor="acepta_datos" className="cursor-pointer text-sm">
                      Autorizo el tratamiento de mis datos personales según la Ley 1581 de 2012 *
                    </Label>
                  </div>

                  <div className="flex items-start space-x-2 p-4 bg-muted rounded-lg">
                    <Checkbox
                      id="acepta_foto"
                      checked={formData.acepta_foto}
                      onCheckedChange={(checked) => handleFieldChange('acepta_foto', checked)}
                    />
                    <Label htmlFor="acepta_foto" className="cursor-pointer text-sm">
                      Autorizo el uso de mi foto de perfil en el directorio público *
                    </Label>
                  </div>
                </div>

                <div>
                  <Label htmlFor="firma_digital">Firma Digital *</Label>
                  <div className="space-y-2">
                    <Input
                      id="firma_digital"
                      value={formData.firma_digital}
                      onChange={(e) => handleFieldChange('firma_digital', e.target.value)}
                      placeholder="Escribe tu nombre completo como firma"
                      className="font-cursive text-lg"
                    />
                    <p className="text-xs text-muted-foreground">
                      Al escribir tu nombre, confirmas que has leído y aceptas todo lo anterior
                    </p>
                    {formData.firma_digital && formData.firma_digital === formData.nombre_completo && (
                      <div className="flex items-center gap-2 text-sm text-green-600">
                        <CheckCircle size={16} />
                        Firma válida
                      </div>
                    )}
                    {formData.firma_digital && formData.firma_digital !== formData.nombre_completo && (
                      <div className="flex items-center gap-2 text-sm text-amber-600">
                        <AlertTriangle size={16} />
                        La firma debe coincidir con tu nombre completo
                      </div>
                    )}
                  </div>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Importante:</strong> No puedes auto-verificarte ni cambiar tu estado de aprobación. 
                    Un administrador revisará tu perfil y documentos antes de activarte en el directorio público.
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {/* NAVIGATION BUTTONS */}
            <div className="flex gap-4 mt-8 pt-6 border-t">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  disabled={loading}
                  className="flex-1"
                >
                  Anterior
                </Button>
              )}
              
              {currentStep < totalSteps ? (
                <Button
                  type="button"
                  onClick={handleNextStep}
                  disabled={!canProceedToNextStep()}
                  className="flex-1"
                >
                  Siguiente
                  <CheckCircle className="ml-2" size={18} />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading || !canProceedToNextStep()}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  {loading ? (
                    <>
                      <Clock className="mr-2 animate-spin" size={18} />
                      Procesando...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2" size={18} />
                      Completar Registro
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {aiProcessing && (
          <Alert className="mt-6 bg-purple-50 border-purple-200">
            <Brain className="h-4 w-4 text-purple-600 animate-pulse" />
            <AlertDescription>
              La IA está procesando tu información para generar un análisis completo...
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* TEST DIALOG */}
      <Dialog open={showTestDialog} onOpenChange={setShowTestDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Brain className="text-purple-600" size={24} />
              Test de Competencias - {formData.categoria_profesional}
            </DialogTitle>
            <DialogDescription>
              Pregunta {currentTestQuestion + 1} de {testQuestions.length}
            </DialogDescription>
          </DialogHeader>

          {testQuestions.length > 0 && currentTestQuestion < testQuestions.length && (
            <div className="space-y-6">
              <Progress value={((currentTestQuestion + 1) / testQuestions.length) * 100} className="h-2" />
              
              <Card className="bg-muted/50">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">
                    {testQuestions[currentTestQuestion].pregunta}
                  </h3>
                  
                  <RadioGroup
                    value={testAnswers[currentTestQuestion]?.toString()}
                    onValueChange={(value) => handleTestAnswer(parseInt(value))}
                  >
                    {testQuestions[currentTestQuestion].opciones.map((opcion, idx) => (
                      <div key={idx} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted transition-colors">
                        <RadioGroupItem value={idx.toString()} id={`option-${idx}`} />
                        <Label htmlFor={`option-${idx}`} className="cursor-pointer flex-1">
                          {opcion}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => setCurrentTestQuestion(prev => Math.max(0, prev - 1))}
                  disabled={currentTestQuestion === 0}
                  className="flex-1"
                >
                  Anterior
                </Button>
                
                {currentTestQuestion < testQuestions.length - 1 ? (
                  <Button
                    onClick={() => setCurrentTestQuestion(prev => prev + 1)}
                    disabled={testAnswers[currentTestQuestion] === -1}
                    className="flex-1"
                  >
                    Siguiente
                  </Button>
                ) : (
                  <Button
                    onClick={finishTest}
                    disabled={testAnswers.some(a => a === -1)}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    Finalizar Test
                  </Button>
                )}
              </div>

              <div className="text-center text-sm text-muted-foreground">
                <Badge variant="secondary">
                  {testQuestions[currentTestQuestion].categoria}
                </Badge>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
