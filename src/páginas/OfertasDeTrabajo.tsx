import { useEffect, useState } from 'react';
import { Briefcase, MapPin, Clock, DollarSign, Heart, CheckCircle, Sparkle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useKV } from '@github/spark/hooks';

interface OfertasDeTrabajoProps {
  setPage: (page: string) => void;
}

const OfertasDeTrabajo = ({ setPage }: OfertasDeTrabajoProps) => {
  const [jobOffers] = useKV<any[]>('job-offers', []);
  const [approvedOffers, setApprovedOffers] = useState<any[]>([]);

  useEffect(() => {
    const approved = (jobOffers || []).filter(job => job.status === 'approved');
    setApprovedOffers(approved);
  }, [jobOffers]);

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-6">
            <Briefcase className="text-primary-600" size={40} />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Trabaja con <span className="text-primary-600">Nosotros</span>
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
          {approvedOffers.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Briefcase className="mx-auto mb-4 text-gray-400" size={48} />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No hay ofertas disponibles actualmente</h3>
                <p className="text-gray-500">Vuelve pronto para ver nuevas oportunidades laborales</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {approvedOffers.map((job) => (
                <Card key={job.id} className="border-2 hover:border-primary-300 transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-2xl">{job.title}</CardTitle>
                          {job.urgency === 'urgent' && (
                            <Badge variant="destructive" className="gap-1">
                              <Sparkle size={12} />
                              Urgente
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="text-base">{job.description}</CardDescription>
                      </div>
                      <Badge className="bg-primary-600 text-white w-fit">{job.service_type}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-primary-500" />
                        <span>{job.location}</span>
                      </div>
                      {job.salary_range && (
                        <div className="flex items-center gap-2">
                          <DollarSign size={16} className="text-primary-500" />
                          <span>{job.salary_range}</span>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {job.requirements && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Requisitos:</h4>
                        <div className="text-gray-600 whitespace-pre-line">
                          {job.requirements}
                        </div>
                      </div>
                    )}
                    {(job.salary_hour || job.salary_shift_8h || job.salary_shift_12h) && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Compensación:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                          {job.salary_hour && (
                            <div className="flex items-center gap-2">
                              <Clock size={14} className="text-primary-500" />
                              <span>Por hora: ${parseInt(job.salary_hour).toLocaleString('es-CO')}</span>
                            </div>
                          )}
                          {job.salary_shift_8h && (
                            <div className="flex items-center gap-2">
                              <Clock size={14} className="text-primary-500" />
                              <span>8h: ${parseInt(job.salary_shift_8h).toLocaleString('es-CO')}</span>
                            </div>
                          )}
                          {job.salary_shift_12h && (
                            <div className="flex items-center gap-2">
                              <Clock size={14} className="text-primary-500" />
                              <span>12h: ${parseInt(job.salary_shift_12h).toLocaleString('es-CO')}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      className="flex-1"
                      onClick={() => window.open(`mailto:${job.contact}?subject=Postulación para ${job.title}`, '_blank')}
                    >
                      Postular Ahora
                    </Button>
                    {job.contact && (
                      <Button 
                        variant="outline"
                        className="flex-1"
                        onClick={() => window.open(`https://wa.me/${job.contact.replace(/\D/g, '')}?text=Hola, me interesa la oferta de ${job.title}`, '_blank')}
                      >
                        Contactar por WhatsApp
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
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
