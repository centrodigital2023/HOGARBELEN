import { Briefcase, MapPin, Clock, DollarSign, Heart, CheckCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SEOHead } from '@/components/SEOHead';
import { getRouteByPath } from '@/config/routes';
import { trackServiceView } from '@/lib/metaPixel';

interface OfertasDeTrabajoProps {
  setPage: (page: string) => void;
}

const OfertasDeTrabajo = ({ setPage }: OfertasDeTrabajoProps) => {
  const location = useLocation();
  const route = getRouteByPath(location.pathname);

  useEffect(() => {
    trackServiceView('Ofertas de Empleo Cuidadores');
  }, []);

  const jobOffers = [
    {
      title: 'Enfermero/a Geriátrico',
      type: 'Tiempo Completo',
      location: 'Centro de Día - Santiago Centro',
      salary: '$800.000 - $1.200.000',
      description: 'Buscamos enfermero/a con experiencia en cuidado geriátrico para unirse a nuestro equipo del centro de día.',
      requirements: [
        'Título de Enfermería',
        'Mínimo 2 años de experiencia',
        'Conocimientos en geriatría',
        'Excelentes habilidades interpersonales'
      ]
    },
    {
      title: 'Terapeuta Ocupacional',
      type: 'Tiempo Parcial',
      location: 'Servicio a Domicilio',
      salary: '$600.000 - $900.000',
      description: 'Profesional para diseñar e implementar planes de terapia ocupacional para adultos mayores en sus hogares.',
      requirements: [
        'Título en Terapia Ocupacional',
        'Experiencia con adultos mayores',
        'Movilización propia',
        'Empatía y paciencia'
      ]
    },
    {
      title: 'Cuidador/a Profesional',
      type: 'Tiempo Completo',
      location: 'Servicio a Domicilio',
      salary: '$500.000 - $700.000',
      description: 'Cuidador/a con formación para brindar apoyo integral en actividades diarias y acompañamiento.',
      requirements: [
        'Certificación en cuidado de adultos mayores',
        'Experiencia mínima 1 año',
        'Referencias verificables',
        'Disponibilidad de turnos rotativos'
      ]
    },
    {
      title: 'Fisioterapeuta Geriátrico',
      type: 'Tiempo Completo',
      location: 'Centro de Día',
      salary: '$700.000 - $1.000.000',
      description: 'Fisioterapeuta especializado para trabajar con adultos mayores en rehabilitación y mantenimiento físico.',
      requirements: [
        'Título de Kinesiología/Fisioterapia',
        'Especialización en geriatría (deseable)',
        'Conocimiento en rehabilitación',
        'Trabajo en equipo multidisciplinario'
      ]
    }
  ];

  const benefits = [
    'Contrato estable y formal',
    'Capacitación continua',
    'Ambiente laboral positivo',
    'Oportunidades de crecimiento',
    'Beneficios de salud',
    'Flexibilidad horaria'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <SEOHead
        title={route?.title || 'Empleo Cuidadores Adulto Mayor | Bolsa de Trabajo'}
        description={route?.description || 'Bolsa de empleo para cuidadores de adultos mayores en Nariño. Encuentra tu próximo trabajo.'}
        keywords={route?.keywords || 'empleo cuidadores, bolsa trabajo salud, vacantes adulto mayor'}
        canonical={`https://www.hogarbelen.org${location.pathname}`}
        h1={route?.h1}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-6">
            <Briefcase className="text-primary-600" size={40} />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {route?.h1 || 'Trabaja con Nosotros'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Únete a un equipo comprometido con el bienestar de los adultos mayores. 
            En Hogar Belén valoramos la vocación de servicio y el profesionalismo.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Beneficios de Trabajar con Nosotros
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-primary-50 rounded-lg">
                <CheckCircle className="text-primary-600 flex-shrink-0" size={20} />
                <span className="text-gray-700 font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Ofertas Disponibles
          </h2>
          <div className="grid gap-6">
            {jobOffers.map((job, index) => (
              <Card key={index} className="border-2 hover:border-primary-300 transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <CardTitle className="text-2xl mb-2">{job.title}</CardTitle>
                      <CardDescription className="text-base">{job.description}</CardDescription>
                    </div>
                    <Badge className="bg-primary-600 text-white w-fit">{job.type}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-primary-500" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign size={16} className="text-primary-500" />
                      <span>{job.salary}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold text-gray-900 mb-3">Requisitos:</h4>
                  <ul className="space-y-2">
                    {job.requirements.map((req, reqIndex) => (
                      <li key={reqIndex} className="flex items-start gap-2 text-gray-600">
                        <CheckCircle size={16} className="text-primary-500 mt-1 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full md:w-auto"
                    onClick={() => setPage('contact')}
                  >
                    Postular Ahora
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div className="bg-primary-600 text-white rounded-2xl p-8 md:p-12 text-center">
          <Heart className="mx-auto mb-6 fill-white" size={48} />
          <h2 className="text-3xl font-bold mb-4">¿Tienes Vocación de Servicio?</h2>
          <p className="text-lg mb-8 text-primary-100 max-w-2xl mx-auto">
            Envíanos tu CV y carta de presentación. Siempre estamos buscando profesionales comprometidos.
          </p>
          <Button 
            size="lg"
            variant="secondary"
            onClick={() => setPage('contact')}
            className="text-lg px-8"
          >
            Enviar CV
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OfertasDeTrabajo;
