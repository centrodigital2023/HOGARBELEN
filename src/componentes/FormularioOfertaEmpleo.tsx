import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useKV } from '@github/spark/hooks';
import { 
  Briefcase, 
  Sparkle, 
  CheckCircle, 
  Warning, 
  Clock,
  Robot,
  TrendUp,
  Shield
} from '@phosphor-icons/react';

interface JobOfferFormData {
  title: string;
  service_type: string;
  location: string;
  description: string;
  requirements: string;
  salary_range: string;
  salary_hour: string;
  salary_shift_8h: string;
  salary_shift_12h: string;
  contact: string;
  urgency: 'normal' | 'urgent';
}

const serviceTypes = [
  'Enfermería',
  'Cuidador adulto mayor',
  'Fisioterapia',
  'Medicina general',
  'Psicología',
  'Trabajo Social',
  'Terapia Ocupacional',
  'Nutrición',
  'Asistente Personal de Salud y Trámites'
];

const colombianCities = [
  'Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena',
  'Cúcuta', 'Bucaramanga', 'Pereira', 'Santa Marta', 'Ibagué',
  'Pasto', 'Manizales', 'Neiva', 'Villavicencio', 'Armenia',
  'Valledupar', 'Montería', 'Sincelejo', 'Popayán', 'Tunja', 'Buesaco'
];

export default function FormularioOfertaEmpleo() {
  const [jobOffers, setJobOffers] = useKV<any[]>('job-offers', []);
  const [loading, setLoading] = useState(false);
  const [aiProcessing, setAiProcessing] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<any>(null);
  const [validationResults, setValidationResults] = useState<any>(null);

  const [formData, setFormData] = useState<JobOfferFormData>({
    title: '',
    service_type: '',
    location: '',
    description: '',
    requirements: '',
    salary_range: '',
    salary_hour: '',
    salary_shift_8h: '',
    salary_shift_12h: '',
    contact: '',
    urgency: 'normal'
  });

  const handleFieldChange = (field: keyof JobOfferFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (field === 'title' || field === 'service_type') {
      if (formData.service_type && value) {
        autoCompleteWithAI(field === 'title' ? value : formData.title, field === 'service_type' ? value : formData.service_type);
      }
    }

    if (field === 'description' && value.length > 50) {
      validateWithAI(value);
    }
  };

  const autoCompleteWithAI = async (title: string, serviceType: string) => {
    if (!title || !serviceType) return;

    setAiProcessing(true);
    try {
      const prompt = (window.spark.llmPrompt as any)`You are an AI assistant helping families post job offers for elderly care professionals in Colombia.

Job Title: ${title}
Service Type: ${serviceType}

Generate professional job posting suggestions in Spanish (Colombian context). Return JSON with:

{
  "description": "Professional 2-3 paragraph description (150-250 words)",
  "requirements": "List of 5-7 realistic requirements as bullet points",
  "salary_suggestions": {
    "hourly_min": "minimum hourly rate in COP",
    "hourly_max": "maximum hourly rate in COP",
    "shift_8h": "suggested 8-hour shift rate in COP",
    "shift_12h": "suggested 12-hour shift rate in COP",
    "range_text": "salary range text like '$500.000 - $800.000 mensual'"
  }
}

Be specific to Colombian market rates for ${serviceType} in elderly care.`;

      const response = await window.spark.llm(prompt, 'gpt-4o', true);
      const suggestions = JSON.parse(response);
      setAiSuggestions(suggestions);

      toast.success('IA generó sugerencias para tu oferta');
    } catch (error) {
      console.error('AI autocomplete error:', error);
    } finally {
      setAiProcessing(false);
    }
  };

  const validateWithAI = async (description: string) => {
    setAiProcessing(true);
    try {
      const prompt = (window.spark.llmPrompt as any)`Analyze this job offer description for quality and compliance in Colombian employment context:

Description: ${description}
Job Title: ${formData.title}
Requirements: ${formData.requirements || 'Not provided yet'}

Check for:
1. Discriminatory language (age, gender, race, disability)
2. Legal compliance (Colombian labor law)
3. Professional tone and clarity
4. Completeness of information
5. Unrealistic expectations

Return JSON:
{
  "has_discrimination": true/false,
  "discrimination_issues": ["issue1", "issue2"],
  "legal_compliance": true/false,
  "legal_issues": ["issue1"],
  "quality_score": 0-1,
  "tone_appropriate": true/false,
  "completeness": 0-1,
  "red_flags": ["flag1", "flag2"],
  "suggestions": ["improvement1", "improvement2"],
  "overall_recommendation": "approve|review|reject"
}`;

      const response = await window.spark.llm(prompt, 'gpt-4o', true);
      const validation = JSON.parse(response);
      setValidationResults(validation);

      if (validation.has_discrimination || !validation.legal_compliance) {
        toast.error('⚠️ Problemas detectados en la oferta');
      } else if (validation.quality_score > 0.7) {
        toast.success('✅ Oferta bien estructurada');
      }
    } catch (error) {
      console.error('AI validation error:', error);
    } finally {
      setAiProcessing(false);
    }
  };

  const applySuggestions = () => {
    if (!aiSuggestions) return;

    setFormData(prev => ({
      ...prev,
      description: aiSuggestions.description || prev.description,
      requirements: aiSuggestions.requirements || prev.requirements,
      salary_range: aiSuggestions.salary_suggestions?.range_text || prev.salary_range,
      salary_hour: aiSuggestions.salary_suggestions?.hourly_min || prev.salary_hour,
      salary_shift_8h: aiSuggestions.salary_suggestions?.shift_8h || prev.salary_shift_8h,
      salary_shift_12h: aiSuggestions.salary_suggestions?.shift_12h || prev.salary_shift_12h,
    }));

    toast.success('Sugerencias aplicadas al formulario');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.service_type || !formData.description) {
      toast.error('Completa los campos obligatorios');
      return;
    }

    setLoading(true);
    try {
      await validateWithAI(formData.description);

      const newJobOffer = {
        id: `job-${Date.now()}`,
        ...formData,
        status: 'pending',
        created_at: new Date().toISOString(),
        created_by: 'family',
        ai_validation: validationResults,
      };

      await setJobOffers((current) => [...(current || []), newJobOffer]);

      toast.success('¡Oferta enviada! Será revisada por el equipo administrativo.');
      
      setFormData({
        title: '',
        service_type: '',
        location: '',
        description: '',
        requirements: '',
        salary_range: '',
        salary_hour: '',
        salary_shift_8h: '',
        salary_shift_12h: '',
        contact: '',
        urgency: 'normal'
      });
      setAiSuggestions(null);
      setValidationResults(null);

    } catch (error) {
      console.error('Error submitting job offer:', error);
      toast.error('Error al enviar la oferta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Briefcase className="text-primary" size={24} />
            </div>
            <div>
              <CardTitle>Publicar Oferta de Empleo</CardTitle>
              <CardDescription>
                Formulario inteligente con asistencia de IA
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Título de la Oferta *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                  placeholder="Ej: Enfermero/a para adulto mayor"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="service_type">Tipo de Servicio *</Label>
                <Select
                  value={formData.service_type}
                  onValueChange={(value) => handleFieldChange('service_type', value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Ubicación *</Label>
              <Select
                value={formData.location}
                onValueChange={(value) => handleFieldChange('location', value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona ciudad" />
                </SelectTrigger>
                <SelectContent>
                  {colombianCities.map((city) => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {aiSuggestions && (
              <Alert className="bg-primary/5 border-primary/20">
                <Robot className="h-4 w-4 text-primary" />
                <AlertDescription>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm">IA generó sugerencias para tu oferta</span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={applySuggestions}
                      className="ml-2"
                    >
                      <Sparkle size={16} className="mr-1" />
                      Aplicar Sugerencias
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="description">Descripción de la Oferta *</Label>
                {aiProcessing && (
                  <Badge variant="secondary" className="gap-1">
                    <Clock className="animate-spin" size={12} />
                    Analizando con IA...
                  </Badge>
                )}
              </div>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleFieldChange('description', e.target.value)}
                placeholder="Describe las responsabilidades, horarios, y características del trabajo..."
                rows={6}
                required
              />
              <p className="text-xs text-muted-foreground">
                {formData.description.length} caracteres
              </p>
            </div>

            {validationResults && (
              <div className="space-y-2">
                {validationResults.has_discrimination && (
                  <Alert variant="destructive">
                    <Warning className="h-4 w-4" />
                    <AlertDescription>
                      <p className="font-semibold mb-1">⚠️ Lenguaje discriminatorio detectado:</p>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {validationResults.discrimination_issues.map((issue: string, i: number) => (
                          <li key={i}>{issue}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}

                {!validationResults.legal_compliance && (
                  <Alert variant="destructive">
                    <Shield className="h-4 w-4" />
                    <AlertDescription>
                      <p className="font-semibold mb-1">⚠️ Problemas de cumplimiento legal:</p>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {validationResults.legal_issues?.map((issue: string, i: number) => (
                          <li key={i}>{issue}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}

                {validationResults.quality_score > 0.7 && !validationResults.has_discrimination && validationResults.legal_compliance && (
                  <Alert className="bg-green-50 border-green-200">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      <p className="font-semibold">✅ Oferta bien estructurada</p>
                      <p className="text-sm mt-1">
                        Calidad: {Math.round(validationResults.quality_score * 100)}% | 
                        Completitud: {Math.round(validationResults.completeness * 100)}%
                      </p>
                    </AlertDescription>
                  </Alert>
                )}

                {validationResults.suggestions && validationResults.suggestions.length > 0 && (
                  <Alert className="bg-blue-50 border-blue-200">
                    <TrendUp className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                      <p className="font-semibold mb-1">💡 Sugerencias de mejora:</p>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {validationResults.suggestions.map((suggestion: string, i: number) => (
                          <li key={i}>{suggestion}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="requirements">Requisitos</Label>
              <Textarea
                id="requirements"
                value={formData.requirements}
                onChange={(e) => handleFieldChange('requirements', e.target.value)}
                placeholder="Lista los requisitos necesarios para el puesto..."
                rows={4}
              />
            </div>

            <div className="space-y-4">
              <Label>Compensación</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="salary_range" className="text-sm">Rango Salarial Mensual</Label>
                  <Input
                    id="salary_range"
                    value={formData.salary_range}
                    onChange={(e) => handleFieldChange('salary_range', e.target.value)}
                    placeholder="Ej: $800.000 - $1.200.000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salary_hour" className="text-sm">Tarifa por Hora (COP)</Label>
                  <Input
                    id="salary_hour"
                    type="number"
                    value={formData.salary_hour}
                    onChange={(e) => handleFieldChange('salary_hour', e.target.value)}
                    placeholder="50000"
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salary_shift_8h" className="text-sm">Turno 8 Horas (COP)</Label>
                  <Input
                    id="salary_shift_8h"
                    type="number"
                    value={formData.salary_shift_8h}
                    onChange={(e) => handleFieldChange('salary_shift_8h', e.target.value)}
                    placeholder="350000"
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salary_shift_12h" className="text-sm">Turno 12 Horas (COP)</Label>
                  <Input
                    id="salary_shift_12h"
                    type="number"
                    value={formData.salary_shift_12h}
                    onChange={(e) => handleFieldChange('salary_shift_12h', e.target.value)}
                    placeholder="500000"
                    min="0"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact">Información de Contacto *</Label>
              <Input
                id="contact"
                value={formData.contact}
                onChange={(e) => handleFieldChange('contact', e.target.value)}
                placeholder="Email o teléfono de contacto"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="urgency">Urgencia</Label>
              <Select
                value={formData.urgency}
                onValueChange={(value: 'normal' | 'urgent') => handleFieldChange('urgency', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="urgent">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={loading || aiProcessing}
                className="flex-1"
              >
                {loading ? (
                  <>
                    <Clock className="animate-spin mr-2" size={16} />
                    Enviando...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2" size={16} />
                    Publicar Oferta
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
