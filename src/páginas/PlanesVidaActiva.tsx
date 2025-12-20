import { useState, useEffect } from 'react';
import { Heart, Sun, Smile, TreePine, Users, Phone, Share2, Calendar, CheckCircle2, Sparkles, MessageCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { SEOHead } from '@/components/SEOHead';
import { getRouteByPath } from '@/config/routes';
import { trackPlanView } from '@/lib/metaPixel';
import ServiceGallery from '@/components/ServiceGallery';
import img1 from '@/assets/images/IMG-20230519-WA0016.jpg';
import img2 from '@/assets/images/IMG-20230519-WA0040.jpg';
import img3 from '@/assets/images/IMG-20230519-WA0087.jpg';
import img4 from '@/assets/images/IMG-20230526-WA0012.jpg';
import img5 from '@/assets/images/IMG-20230528-WA0011.jpg';
import img6 from '@/assets/images/IMG-20240410-WA0018.jpg';
import img7 from '@/assets/images/IMG-20230508-WA0005.jpg';
import img8 from '@/assets/images/IMG-20230509-WA0015.jpg';

interface PlanesVidaActivaProps {
  setPage: (page: string) => void;
}

interface Plan {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: typeof Heart;
  color: string;
  bgGradient: string;
  activities: string[];
  images: Array<{ url: string; alt: string; caption: string }>;
}

const PlanesVidaActiva = ({ setPage }: PlanesVidaActivaProps) => {
  const location = useLocation();
  const route = getRouteByPath(location.pathname);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showShareDialog, setShowShareDialog] = useState(false);

  useEffect(() => {
    // Track plan view
    trackPlanView('Planes para Adultos Mayores en Nariño');
  }, []);

  const planes: Plan[] = [
    {
      id: 'amigos',
      title: 'Plan Amigos',
      subtitle: 'Alegría compartida y compañía real',
      description: 'Paseos y fines de semana en fincas campestres, compartidos con otros adultos mayores. Transporte, hospedaje, alimentación y acompañamiento profesional incluidos.',
      icon: Heart,
      color: 'text-rose-600',
      bgGradient: 'from-rose-50 to-rose-100',
      activities: [
        'Transporte seguro ida y regreso',
        'Hospedaje campestre cómodo y accesible',
        'Alimentación completa (desayuno, almuerzo, cena y refrigerios)',
        'Acompañamiento permanente de personal capacitado',
        'Juegos de mesa y dinámicas grupales',
        'Caminatas suaves en entornos naturales',
        'Conversatorios y espacios de socialización',
        'Talleres creativos y recreativos',
        'Música, risas y momentos de integración',
        'Espacios de descanso y contemplación',
        'Seguro y supervisión continua',
        'Coordinación y cuidado durante toda la experiencia'
      ],
      images: [
        { url: img1, alt: 'Actividades grupales', caption: 'Compartiendo momentos de alegría' },
        { url: img2, alt: 'Juegos de mesa', caption: 'Compañía real y conexión auténtica' },
        { url: img3, alt: 'Talleres creativos', caption: 'Creatividad sin límites' }
      ]
    },
    {
      id: 'sol-cafe',
      title: 'Plan Sol y Café',
      subtitle: 'Estancias rurales con sabor a tradición',
      description: 'Hospedaje campestre, gastronomía local, caminatas suaves y conversaciones con café de Buesaco.',
      icon: Sun,
      color: 'text-amber-600',
      bgGradient: 'from-amber-50 to-amber-100',
      activities: [
        'Estancias en finca campestre acogedora',
        'Desayunos y almuerzos con gastronomía tradicional nariñense',
        'Café especial de Buesaco en tertulias',
        'Caminatas suaves por senderos naturales',
        'Conversatorios sobre historia y cultura local',
        'Avistamiento de aves y naturaleza',
        'Descanso en hamacas y miradores',
        'Conexión con la ruralidad y tradiciones'
      ],
      images: [
        { url: img4, alt: 'Estancia rural', caption: 'Naturaleza y tradición' },
        { url: img5, alt: 'Café y conversación', caption: 'El mejor café de Buesaco' },
        { url: img6, alt: 'Caminatas suaves', caption: 'Paseos que reconfortan' }
      ]
    },
    {
      id: 'sonreir',
      title: 'Plan Sonreír',
      subtitle: 'Celebraciones Inolvidables',
      description: 'Organización completa del evento, acompañamiento profesional y espacios seguros para celebrar.',
      icon: Smile,
      color: 'text-purple-600',
      bgGradient: 'from-purple-50 to-purple-100',
      activities: [
        'Organización completa de cumpleaños y celebraciones',
        'Decoración temática personalizada',
        'Refrigerio y torta incluidos',
        'Música en vivo o DJ según preferencia',
        'Animación y actividades recreativas',
        'Fotografía del evento',
        'Espacios amplios y seguros',
        'Acompañamiento profesional durante todo el evento'
      ],
      images: [
        { url: img7, alt: 'Celebraciones', caption: 'Momentos que permanecen en el corazón' },
        { url: img8, alt: 'Eventos especiales', caption: 'Cada celebración es única' },
        { url: img1, alt: 'Alegría compartida', caption: 'Sonrisas que no se olvidan' }
      ]
    },
    {
      id: 'turismo-rural',
      title: 'Plan Turismo Rural',
      subtitle: 'Naturaleza y Espiritualidad',
      description: 'Salidas ecológicas, zooterapia, recorridos históricos y espacios de reflexión espiritual.',
      icon: TreePine,
      color: 'text-green-600',
      bgGradient: 'from-green-50 to-green-100',
      activities: [
        'Salidas a reservas naturales y ecoparques',
        'Zooterapia con animales de granja',
        'Recorridos por sitios históricos de la región',
        'Visitas a santuarios y lugares de paz',
        'Momentos de reflexión y meditación',
        'Terapia de bosque (Shinrin-yoku)',
        'Contacto directo con la naturaleza',
        'Actividades de conexión espiritual'
      ],
      images: [
        { url: img6, alt: 'Naturaleza', caption: 'Conexión con la tierra' },
        { url: img4, alt: 'Espiritualidad', caption: 'Momentos de paz interior' },
        { url: img5, alt: 'Turismo rural', caption: 'Descubriendo nuestra región' }
      ]
    }
  ];

  const handleWhatsAppContact = (plan: Plan) => {
    const phoneNumber = '573136405255';
    const message = `Hola, estoy interesado en el ${plan.title} - ${plan.subtitle}. Me gustaría recibir más información.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    toast.success('Abriendo WhatsApp...');
  };

  const handlePhoneContact = () => {
    const phoneNumber = '573136405255';
    window.location.href = `tel:+${phoneNumber}`;
    toast.success('Iniciando llamada...');
  };

  const handleBooking = (plan: Plan) => {
    setSelectedPlan(plan);
    if (plan.id === 'amigos') {
      setPage('plan-amigos');
    } else if (plan.id === 'sol-cafe') {
      setPage('plan-sol-cafe');
    } else if (plan.id === 'sonreir') {
      setPage('plan-sonreir');
    } else if (plan.id === 'turismo-rural') {
      setPage('plan-turismo-rural');
    } else {
      toast.success(`${plan.title} seleccionado. Por favor contáctanos para completar tu reserva.`);
    }
  };

  const handleShare = (platform: string, plan: Plan) => {
    const shareUrl = window.location.href;
    const shareText = `¡Mira este increíble plan! ${plan.title} - ${plan.subtitle} en Hogar Belén`;

    let url = '';
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
    }

    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
      toast.success(`Compartiendo en ${platform}...`);
    }
    setShowShareDialog(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50/30 via-white to-primary-50/20">
      <SEOHead
        title={route?.title || 'Planes para Adultos Mayores en Nariño | Hogar Belén'}
        description={route?.description || 'Planes recreativos, terapéuticos y de bienestar diseñados para adultos mayores en Nariño.'}
        keywords={route?.keywords || 'planes adultos mayores, actividades tercera edad, recreación adulto mayor'}
        canonical={`https://www.hogarbelen.org${location.pathname}`}
        h1={route?.h1}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-6">
            <Sparkles className="text-primary-600" size={40} />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            {route?.h1 || 'Planes de Vida Activa'}
          </h1>
          <p className="text-2xl text-primary-700 font-light mb-8">
            Programas diseñados para mantener la alegría, la conexión social y el bienestar integral
          </p>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-primary-100">
            <p className="text-lg text-gray-700 leading-relaxed">
              Nuestros planes están pensados para enriquecer cada día con <strong>actividades significativas</strong>,
              <strong> conexiones auténticas</strong> y <strong>experiencias memorables</strong> que nutren el cuerpo, la mente y el espíritu.
            </p>
          </div>
        </div>

        <div className="grid gap-12 mb-16">
          {planes.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <Card 
                key={plan.id} 
                className={`border-2 hover:border-primary-400 transition-all hover:shadow-xl overflow-hidden ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } lg:flex`}
              >
                <div className="lg:w-1/3 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br opacity-10 z-10" style={{
                    backgroundImage: index % 2 === 0 
                      ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)'
                      : 'linear-gradient(135deg, rgba(234, 179, 8, 0.1) 0%, rgba(249, 115, 22, 0.1) 100%)'
                  }} />
                  <img 
                    src={plan.images[0].url} 
                    alt={plan.images[0].alt}
                    className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-20" />
                  <div className="absolute bottom-4 left-4 right-4 z-30">
                    <Badge className={`bg-white/90 text-gray-900`}>
                      <Icon className="mr-1" size={16} />
                      {plan.id.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                <div className="lg:w-2/3 flex flex-col">
                  <CardHeader className={`bg-gradient-to-br ${plan.bgGradient} pb-6`}>
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                        <Icon className={plan.color} size={28} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-3xl text-gray-900 mb-2">{plan.title}</CardTitle>
                        <CardDescription className="text-base text-gray-700 font-medium">
                          {plan.subtitle}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-6 flex-1">
                    <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                      {plan.description}
                    </p>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <CheckCircle2 className="text-primary-600" size={20} />
                        Actividades Incluidas:
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {plan.activities.slice(0, 6).map((activity, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                            <CheckCircle2 className="text-primary-600 flex-shrink-0 mt-0.5" size={16} />
                            <span>{activity}</span>
                          </div>
                        ))}
                      </div>
                      {plan.activities.length > 6 && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="link" className="px-0 mt-2 text-primary-600">
                              Ver todas las actividades ({plan.activities.length})
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <Icon className={plan.color} size={24} />
                                {plan.title} - Todas las Actividades
                              </DialogTitle>
                              <DialogDescription>
                                {plan.subtitle}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-2 mt-4">
                              {plan.activities.map((activity, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-gray-700">
                                  <CheckCircle2 className="text-primary-600 flex-shrink-0 mt-0.5" size={18} />
                                  <span>{activity}</span>
                                </div>
                              ))}
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter className="bg-gray-50 border-t flex-wrap gap-3 py-4">
                    <Button
                      onClick={() => handleBooking(plan)}
                      className="flex-1 min-w-[200px]"
                      size="lg"
                    >
                      {(plan.id === 'amigos' || plan.id === 'sol-cafe' || plan.id === 'sonreir' || plan.id === 'turismo-rural') ? (
                        <>
                          <Sparkles className="mr-2" size={18} />
                          Ver detalles completos
                        </>
                      ) : (
                        <>
                          <Calendar className="mr-2" size={18} />
                          Seleccionar Plan
                        </>
                      )}
                    </Button>
                    
                    <Button
                      onClick={() => handleWhatsAppContact(plan)}
                      variant="outline"
                      className="flex-1 min-w-[200px] border-green-600 text-green-600 hover:bg-green-50"
                      size="lg"
                    >
                      <MessageCircle className="mr-2" size={18} />
                      WhatsApp
                    </Button>

                    <Button
                      onClick={handlePhoneContact}
                      variant="outline"
                      className="flex-1 min-w-[140px]"
                      size="lg"
                    >
                      <Phone className="mr-2" size={18} />
                      Llamar
                    </Button>

                    <Dialog open={showShareDialog && selectedPlan?.id === plan.id} onOpenChange={(open) => {
                      setShowShareDialog(open);
                      if (open) setSelectedPlan(plan);
                    }}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="lg"
                          onClick={() => {
                            setSelectedPlan(plan);
                            setShowShareDialog(true);
                          }}
                        >
                          <Share2 className="mr-2" size={18} />
                          Compartir
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Compartir {plan.title}</DialogTitle>
                          <DialogDescription>
                            Comparte este plan en tus redes sociales
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-2 gap-4 py-4">
                          <Button
                            onClick={() => handleShare('facebook', plan)}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            <Users className="mr-2" size={18} />
                            Facebook
                          </Button>
                          <Button
                            onClick={() => handleShare('twitter', plan)}
                            className="bg-sky-500 hover:bg-sky-600"
                          >
                            <Share2 className="mr-2" size={18} />
                            Twitter
                          </Button>
                          <Button
                            onClick={() => handleShare('whatsapp', plan)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <MessageCircle className="mr-2" size={18} />
                            WhatsApp
                          </Button>
                          <Button
                            onClick={() => handleShare('linkedin', plan)}
                            className="bg-blue-700 hover:bg-blue-800"
                          >
                            <Users className="mr-2" size={18} />
                            LinkedIn
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {planes.map((plan) => (
            <div key={`gallery-${plan.id}`}>
              <ServiceGallery
                title={`${plan.title} - Galería`}
                description={plan.subtitle}
                images={plan.images}
                columns={3}
              />
            </div>
          ))}
        </div>

        <div className="bg-primary-600 text-white rounded-2xl p-8 md:p-12 text-center shadow-xl">
          <Heart className="mx-auto mb-6 text-white fill-white" size={48} />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Listo para una Vida Activa?</h2>
          <p className="text-lg md:text-xl mb-8 text-primary-50 max-w-2xl mx-auto leading-relaxed">
            Nuestros planes están diseñados para que cada día sea una nueva oportunidad
            de <strong className="text-white">disfrutar, conectar y vivir plenamente</strong>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => handleWhatsAppContact(planes[0])}
              className="text-lg px-8 bg-white text-primary-600 hover:bg-primary-50"
            >
              <MessageCircle className="mr-2" size={20} />
              Contactar por WhatsApp
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setPage('contact')}
              className="text-lg px-8 bg-transparent text-white border-2 border-white hover:bg-white hover:text-primary-600"
            >
              <Calendar className="mr-2" size={20} />
              Agendar Visita
            </Button>
          </div>
          <div className="mt-8 flex items-center justify-center gap-2 text-primary-100">
            <Phone size={20} />
            <span className="text-lg">+57 313 640 5255</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanesVidaActiva;
