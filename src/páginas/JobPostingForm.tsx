import { useState } from 'react';
import { useKV } from '@github/spark/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, MapPin, DollarSign, Clock } from 'lucide-react';
import { toast } from 'sonner';
import LegalConsentCheckbox from '@/components/LegalConsentCheckbox';
import MetaPixel from '@/lib/metaPixel';

interface JobFormData {
  title: string;
  description: string;
  serviceType: string;
  location: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  salary: string;
  schedule: string;
  legalConsent: boolean;
}

interface JobPostingFormProps {
  setPage: (page: string) => void;
}

const JobPostingForm = ({ setPage }: JobPostingFormProps) => {
  const [jobPostings, setJobPostings] = useKV<any[]>('job-postings', []);
  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    description: '',
    serviceType: '',
    location: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    salary: '',
    schedule: '',
    legalConsent: false
  });

  const SERVICE_TYPES = [
    'Enfermería para Adulto Mayor',
    'Cuidador de Adulto Mayor',
    'Auxiliar de Enfermería Geriátrica',
    'Fisioterapeuta Geriátrico',
    'Terapeuta Ocupacional',
    'Médico Geriatra',
    'Nutricionista Especializado',
    'Otro (Salud/Adulto Mayor)'
  ];

  const handleInputChange = (field: string, value: string) => {
    if (field === 'legalConsent') {
      setFormData(prev => ({ ...prev, [field]: value === 'true' }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.title || !formData.description || !formData.serviceType || 
        !formData.location || !formData.contactName || !formData.contactPhone || 
        !formData.contactEmail) {
      toast.error('Por favor completa todos los campos obligatorios');
      return;
    }

    if (!formData.legalConsent) {
      toast.error('Debes aceptar los términos y condiciones');
      return;
    }

    try {
      const newJobPosting = {
        id: Date.now(),
        ...formData,
        status: 'Pendiente', // Admin must approve
        createdAt: new Date().toISOString(),
        approvedAt: null,
        approvedBy: null
      };

      setJobPostings((current) => [...(current || []), newJobPosting]);

      // Track Meta Pixel event
      MetaPixel.trackLead('job_posting');

      toast.success('¡Oferta enviada! Será revisada por un administrador antes de publicarse.');

      // Reset form
      setFormData({
        title: '',
        description: '',
        serviceType: '',
        location: '',
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        salary: '',
        schedule: '',
        legalConsent: false
      });

    } catch (error) {
      console.error('Error al publicar oferta:', error);
      toast.error('Error al enviar la oferta. Por favor intenta de nuevo.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <Briefcase className="text-primary-600" size={24} />
              </div>
              <div>
                <CardTitle className="text-2xl">Publicar Oferta de Empleo</CardTitle>
                <CardDescription className="text-base">
                  Solo para servicios de salud y cuidado del adulto mayor
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-base font-semibold">
                    Título de la Oferta <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Ej: Enfermera para Cuidado de Adulto Mayor en Casa"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="serviceType" className="text-base font-semibold">
                    Tipo de Servicio <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.serviceType} onValueChange={(value) => handleInputChange('serviceType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo de servicio" />
                    </SelectTrigger>
                    <SelectContent>
                      {SERVICE_TYPES.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">
                    Solo se aceptan ofertas relacionadas con salud y cuidado del adulto mayor
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-base font-semibold">
                    Descripción del Trabajo <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe las responsabilidades, requisitos y condiciones del trabajo..."
                    rows={6}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-base font-semibold">
                      <MapPin size={16} className="inline mr-1" />
                      Ubicación <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="Ej: Pasto, Nariño"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="salary" className="text-base font-semibold">
                      <DollarSign size={16} className="inline mr-1" />
                      Salario (opcional)
                    </Label>
                    <Input
                      id="salary"
                      value={formData.salary}
                      onChange={(e) => handleInputChange('salary', e.target.value)}
                      placeholder="Ej: $1,500,000 - $2,000,000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="schedule" className="text-base font-semibold">
                      <Clock size={16} className="inline mr-1" />
                      Horario (opcional)
                    </Label>
                    <Input
                      id="schedule"
                      value={formData.schedule}
                      onChange={(e) => handleInputChange('schedule', e.target.value)}
                      placeholder="Ej: Lun a Vie, 8am-5pm"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4 border-t pt-6">
                <h3 className="text-lg font-semibold">Información de Contacto</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactName" className="text-base font-semibold">
                      Nombre de Contacto <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="contactName"
                      value={formData.contactName}
                      onChange={(e) => handleInputChange('contactName', e.target.value)}
                      placeholder="Tu nombre completo"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPhone" className="text-base font-semibold">
                      Teléfono <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="contactPhone"
                      value={formData.contactPhone}
                      onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                      placeholder="+573001234567"
                      required
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="contactEmail" className="text-base font-semibold">
                      Correo Electrónico <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Legal Consent */}
              <div className="border-t pt-6">
                <LegalConsentCheckbox
                  checked={formData.legalConsent}
                  onCheckedChange={(checked) => handleInputChange('legalConsent', checked.toString())}
                  onLegalClick={(page) => setPage(page)}
                  required
                />
              </div>

              <div className="flex gap-4 pt-6">
                <Button type="submit" className="flex-1" size="lg">
                  Publicar Oferta
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setPage('jobs')}
                  size="lg"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobPostingForm;
