import { Heart, MapPin, Users, Coffee, Gamepad2, Music, Sparkles, CheckCircle2, Phone, MessageCircle, Calendar, Shield, Smile, TreePine, Home, UtensilsCrossed, Bus, UserCheck, Camera, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import img1 from '@/assets/images/IMG-20230519-WA0016.jpg';
import img2 from '@/assets/images/IMG-20230519-WA0040.jpg';
import img3 from '@/assets/images/IMG-20230519-WA0087.jpg';
import img4 from '@/assets/images/IMG-20230526-WA0012.jpg';
import img5 from '@/assets/images/IMG-20230528-WA0011.jpg';
import img6 from '@/assets/images/IMG-20240410-WA0018.jpg';
import img7 from '@/assets/images/IMG-20230508-WA0005.jpg';
import img8 from '@/assets/images/IMG-20230509-WA0015.jpg';

interface PlanAmigosProps {
  setPage: (page: string) => void;
}

const PlanAmigos = ({ setPage }: PlanAmigosProps) => {
  const handleWhatsAppContact = (action: string) => {
    const phoneNumber = '573136405255';
    const message = `Hola, estoy interesado en el Plan Amigos - ${action}. Me gustaría recibir más información.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    toast.success('Abriendo WhatsApp...');
  };

  const handlePhoneContact = () => {
    const phoneNumber = '573136405255';
    window.location.href = `tel:+${phoneNumber}`;
    toast.success('Iniciando llamada...');
  };

  const includedServices = [
    { icon: Bus, title: 'Transporte seguro', description: 'Ida y regreso' },
    { icon: Home, title: 'Hospedaje campestre', description: 'Cómodo y accesible' },
    { icon: UtensilsCrossed, title: 'Alimentación completa', description: 'Desayuno, almuerzo, cena y refrigerios' },
    { icon: UserCheck, title: 'Acompañamiento permanente', description: 'Personal capacitado' },
    { icon: Shield, title: 'Coordinación y cuidado', description: 'Durante toda la experiencia' },
    { icon: CheckCircle2, title: 'Seguro y supervisión', description: 'Continua' },
  ];

  const activities = [
    { icon: Gamepad2, title: 'Juegos de mesa', description: 'Dinámicas grupales' },
    { icon: TreePine, title: 'Caminatas suaves', description: 'En entornos naturales' },
    { icon: Users, title: 'Conversatorios', description: 'Espacios de socialización' },
    { icon: Sparkles, title: 'Talleres creativos', description: 'Y recreativos' },
    { icon: Music, title: 'Música e integración', description: 'Risas y momentos memorables' },
    { icon: Coffee, title: 'Espacios de descanso', description: 'Y contemplación' },
  ];

  const idealFor = [
    'Adultos mayores que desean salir de la rutina',
    'Personas que disfrutan la compañía y la conversación',
    'Quienes buscan paseos seguros y bien organizados',
    'Familias que desean ver a sus seres queridos activos y felices',
  ];

  const galleryImages = [
    { url: img1, alt: 'Adultos mayores compartiendo en finca', caption: 'Compartiendo momentos de alegría' },
    { url: img2, alt: 'Grupos conversando al aire libre', caption: 'Conversaciones que reconfortan' },
    { url: img3, alt: 'Caminatas entre jardines', caption: 'Conectando con la naturaleza' },
    { url: img4, alt: 'Juegos de mesa en corredor campestre', caption: 'Juegos y risas compartidas' },
    { url: img5, alt: 'Café compartido al atardecer', caption: 'Café y compañía real' },
    { url: img6, alt: 'Actividades grupales', caption: 'Juntos es mejor' },
    { url: img7, alt: 'Encuentro social', caption: 'Nuevas amistades florecen' },
    { url: img8, alt: 'Momentos de integración', caption: 'Cada encuentro es especial' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/50 via-white to-amber-50/30">
      <div className="relative bg-gradient-to-br from-rose-500 via-rose-600 to-amber-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
          <Button
            variant="ghost"
            onClick={() => setPage('planes-vida-activa')}
            className="mb-6 text-white hover:bg-white/20"
          >
            <ArrowLeft className="mr-2" size={18} />
            Volver a Planes
          </Button>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Heart className="text-white fill-white" size={32} />
            </div>
            <Badge className="bg-white/90 text-rose-600 text-sm px-4 py-1">
              PLAN AMIGOS 🤝
            </Badge>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Plan Amigos
          </h1>
          <p className="text-2xl md:text-3xl font-light text-rose-50 mb-6">
            Alegría compartida y compañía real
          </p>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl leading-relaxed">
            Paseos y fines de semana en fincas, compartidos con otros adultos mayores, 
            con todos los servicios incluidos.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <Button
              size="lg"
              onClick={() => handleWhatsAppContact('Próximas salidas')}
              className="bg-white text-rose-600 hover:bg-rose-50 shadow-lg text-lg px-8"
            >
              <Calendar className="mr-2" size={20} />
              Ver próximas salidas
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => handleWhatsAppContact('Solicitar información')}
              className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-rose-600 text-lg px-8"
            >
              <MessageCircle className="mr-2" size={20} />
              Solicitar información
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-16">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Un plan para vivir <span className="text-rose-600">experiencias compartidas</span>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              El Plan Amigos está diseñado para quienes disfrutan la compañía, la conversación tranquila 
              y los momentos sencillos que se vuelven memorables. No es solo salir de casa: es vivir 
              experiencias compartidas en entornos naturales, seguros y acogedores, rodeados de personas 
              con intereses y ritmos similares.
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-rose-50 rounded-3xl p-8 md:p-12 border-2 border-amber-100">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-rose-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Aquí, la amistad nace sin prisa
                </h3>
                <p className="text-lg text-gray-700">
                  El descanso se siente verdadero y cada encuentro se convierte en una oportunidad para sonreír.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-2xl mb-4">
              <TreePine className="text-rose-600" size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🌿 ¿En qué consiste el Plan Amigos?
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Paseos organizados y fines de semana en fincas campestres, especialmente seleccionadas, 
              donde los adultos mayores comparten actividades recreativas, descanso y acompañamiento 
              profesional, sin preocuparse por nada.
            </p>
            <p className="text-xl font-semibold text-rose-600 mt-4">
              Todo está pensado para que disfruten con tranquilidad, seguridad y alegría.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🏡 Experiencia en Finca – Todo Incluido
            </h2>
            <p className="text-lg text-gray-600">
              Todo lo necesario para una experiencia completa y sin preocupaciones
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {includedServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="border-2 hover:border-rose-300 transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="w-14 h-14 bg-rose-100 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="text-rose-600" size={28} />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-2xl mb-4">
              <Gamepad2 className="text-amber-600" size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🎲 Actividades Compartidas
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Diseñadas para estimular la alegría, la conexión y el bienestar integral
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {activities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <Card key={index} className="border-2 hover:border-amber-300 transition-all hover:shadow-lg bg-gradient-to-br from-white to-amber-50/30">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="text-amber-600" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{activity.title}</h3>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
            <p className="text-center text-gray-700 text-lg">
              <strong>Las actividades se adaptan al ritmo y las capacidades de cada participante.</strong>
            </p>
          </div>
        </div>

        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-2xl mb-4">
              <Heart className="text-rose-600" size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              💛 Acompañamiento Humano
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Durante toda la experiencia, nuestros adultos mayores cuentan con:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            {[
              'Acompañamiento emocional grupal',
              'Supervisión constante y cercana',
              'Apoyo en actividades básicas si se requiere',
              'Un ambiente de respeto, dignidad y calidez',
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 bg-white rounded-xl p-4 border-2 border-rose-100">
                <CheckCircle2 className="text-rose-600 flex-shrink-0 mt-1" size={24} />
                <span className="text-gray-700 text-lg">{item}</span>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-rose-600 to-amber-500 text-white rounded-2xl p-8 text-center">
            <p className="text-2xl font-semibold">
              Aquí nadie está solo. Todos hacen parte del grupo.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-2xl mb-4">
              <Camera className="text-purple-600" size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              📸 Experiencia que se Recuerda
            </h2>
            <p className="text-lg text-gray-600">
              Momentos compartidos que permanecen en el corazón
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white text-sm font-medium">{image.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4">
              <Smile className="text-green-600" size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🌱 ¿Para quién es ideal el Plan Amigos?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {idealFor.map((item, index) => (
              <div key={index} className="flex items-start gap-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={24} />
                <span className="text-gray-700 text-lg">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-rose-600 via-rose-700 to-amber-600 text-white rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="max-w-3xl mx-auto text-center">
            <TreePine className="mx-auto mb-6 text-white" size={56} />
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Vivir acompañado también es bienestar
            </h2>
            <p className="text-xl text-rose-50 mb-8 leading-relaxed">
              Regala momentos de alegría, compañía real y experiencias memorables en entornos naturales y seguros.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Button
                size="lg"
                onClick={() => handleWhatsAppContact('Ver próximas salidas')}
                className="bg-green-500 hover:bg-green-600 text-white text-lg px-8 shadow-lg"
              >
                <Calendar className="mr-2" size={20} />
                Ver próximas salidas
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleWhatsAppContact('Solicitar información')}
                className="bg-white text-rose-600 hover:bg-rose-50 border-2 border-white text-lg px-8"
              >
                <MessageCircle className="mr-2" size={20} />
                Solicitar información
              </Button>
            </div>
            <div className="flex items-center justify-center gap-2 text-rose-100">
              <Phone size={20} />
              <span className="text-lg">+57 313 640 5255</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanAmigos;
