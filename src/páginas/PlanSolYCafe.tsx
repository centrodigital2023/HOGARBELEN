import { Coffee, MapPin, Sunrise, TreePine, BookOpen, Music, Heart, CheckCircle2, Phone, MessageCircle, Calendar, Shield, Sparkles, Home, UtensilsCrossed, Bus, UserCheck, Camera, ArrowLeft, Mountain, Users, Sun } from 'lucide-react';
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
import img9 from '@/assets/images/IMG-20240412-WA0019.jpg';
import img10 from '@/assets/images/IMG-20240524-WA0019.jpg';
import img11 from '@/assets/images/IMG_20220921_120656.jpg';
import img12 from '@/assets/images/IMG_20220921_122900.jpg';

interface PlanSolYCafeProps {
  setPage: (page: string) => void;
}

const PlanSolYCafe = ({ setPage }: PlanSolYCafeProps) => {
  const handleWhatsAppContact = (action: string) => {
    const phoneNumber = '573136405255';
    const message = `Hola, estoy interesado en el Plan Sol y Café - ${action}. Me gustaría recibir más información.`;
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
    { icon: Home, title: 'Hospedaje en fincas campestres', description: 'Seguras y accesibles' },
    { icon: UtensilsCrossed, title: 'Alimentación completa', description: 'Con gastronomía local' },
    { icon: Coffee, title: 'Café tradicional de la región', description: 'Servido en espacios abiertos' },
    { icon: Bus, title: 'Transporte seguro', description: 'Ida y regreso' },
    { icon: UserCheck, title: 'Acompañamiento permanente', description: 'Equipo Hogar Belén' },
    { icon: Shield, title: 'Supervisión continua', description: 'Ambiente protegido' },
    { icon: CheckCircle2, title: 'Seguro y coordinación integral', description: 'De la experiencia' },
  ];

  const activities = [
    { icon: TreePine, title: 'Caminatas suaves', description: 'Entre jardines, cafetales y paisajes naturales' },
    { icon: BookOpen, title: 'Espacios de descanso', description: 'Lectura y contemplación' },
    { icon: Users, title: 'Conversaciones tranquilas', description: 'Tertulias culturales' },
    { icon: Music, title: 'Música suave', description: 'Y tradiciones locales' },
    { icon: Sun, title: 'Momentos de silencio', description: 'Sol y naturaleza' },
    { icon: Heart, title: 'Encuentros sociales', description: 'Con otros adultos mayores' },
  ];

  const benefits = [
    'Cambio de ambiente que revitaliza cuerpo y ánimo',
    'Reducción del estrés y la sensación de encierro',
    'Estimulación emocional y social',
    'Conexión con la tierra, la memoria y la identidad cultural',
    'Sensación real de descanso y vacaciones seguras',
  ];

  const familyPeace = [
    'Acompañamiento profesional durante toda la estancia',
    'Comunicación constante con la familia',
    'Entornos controlados, accesibles y sin riesgos',
    'Todo organizado, sin preocupaciones logísticas',
  ];

  const modalities = [
    { title: 'Paseos de día completo', icon: Sun },
    { title: 'Fines de semana rurales', icon: Mountain },
    { title: 'Estancias grupales con otros adultos mayores', icon: Users },
  ];

  const galleryImages = [
    { url: img1, alt: 'Adultos mayores tomando café al aire libre', caption: 'Café que sabe a hogar' },
    { url: img2, alt: 'Fincas tradicionales con paisaje montañoso', caption: 'Paisajes que inspiran' },
    { url: img3, alt: 'Conversaciones tranquilas en corredores campestres', caption: 'Tertulias con calma' },
    { url: img4, alt: 'Caminatas suaves rodeadas de naturaleza', caption: 'Conectando con la tierra' },
    { url: img5, alt: 'Atardecer en el campo compartido en grupo', caption: 'Atardeceres memorables' },
    { url: img6, alt: 'Momentos de descanso y contemplación', caption: 'Tiempo bien vivido' },
    { url: img7, alt: 'Espacios abiertos con café tradicional', caption: 'Tradición y cultura' },
    { url: img8, alt: 'Adultos mayores disfrutando del campo', caption: 'Bienestar en la naturaleza' },
    { url: img9, alt: 'Hospedaje rural acogedor', caption: 'Descanso verdadero' },
    { url: img10, alt: 'Gastronomía local tradicional', caption: 'Sabores de casa' },
    { url: img11, alt: 'Espacios de lectura y reflexión', caption: 'Pausas que sanan' },
    { url: img12, alt: 'Vida rural tranquila', caption: 'El ritmo del campo' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 via-white to-orange-50/30">
      <div className="relative bg-gradient-to-br from-amber-600 via-orange-500 to-amber-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjIiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xNSIgZmlsbD0ibm9uZSIvPjwvZz48L3N2Zz4=')] opacity-40"></div>
        
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
              <Coffee className="text-white fill-white" size={32} />
            </div>
            <Badge className="bg-white/90 text-amber-700 text-sm px-4 py-1">
              PLAN SOL Y CAFÉ ☕
            </Badge>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Plan Sol y Café
          </h1>
          <p className="text-2xl md:text-3xl font-light text-amber-50 mb-6">
            Descanso, cultura y tradición en el corazón de Buesaco
          </p>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl leading-relaxed">
            Hospédese en fincas tradicionales y viva la experiencia del campo con calma, 
            cuidado y compañía.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <Button
              size="lg"
              onClick={() => handleWhatsAppContact('Explorar estancias disponibles')}
              className="bg-white text-amber-700 hover:bg-amber-50 shadow-lg text-lg px-8"
            >
              <Calendar className="mr-2" size={20} />
              Explorar estancias disponibles
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => handleWhatsAppContact('Solicitar información')}
              className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-amber-700 text-lg px-8"
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
              Una invitación a <span className="text-amber-600">pausar el ritmo</span>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              El Plan Sol y Café es una invitación a pausar el ritmo, respirar aire puro y reconectar con lo esencial. 
              Está pensado para adultos mayores que desean disfrutar de la vida rural, la cultura local y el calor 
              humano, con todos los servicios incluidos y acompañamiento permanente.
            </p>
            <p className="text-xl font-semibold text-amber-700 italic">
              Aquí, cada amanecer trae silencio, paisaje y una taza de café que sabe a hogar.
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-8 md:p-12 border-2 border-amber-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sunrise className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  No es turismo apresurado. Es bienestar vivido con tranquilidad.
                </h3>
                <p className="text-lg text-gray-700">
                  Son estancias rurales organizadas en fincas tradicionales de Buesaco, diseñadas como pequeñas 
                  vacaciones conscientes donde el descanso, la conversación y la naturaleza se convierten en terapia.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-2xl mb-4">
              <Mountain className="text-amber-600" size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🌄 ¿En qué consiste el Plan Sol y Café?
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Son estancias rurales organizadas en fincas tradicionales de Buesaco, diseñadas como pequeñas 
              vacaciones conscientes donde el descanso, la conversación y la naturaleza se convierten en terapia.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🏡 Experiencia Rural – Todo Incluido
            </h2>
            <p className="text-lg text-gray-600">
              Todo lo necesario para vivir el campo con tranquilidad y seguridad
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {includedServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="border-2 hover:border-amber-300 transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="text-amber-600" size={28} />
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4">
              <TreePine className="text-green-600" size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🌿 Actividades con Sentido
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Cada actividad está pensada para disfrutar sin exigencias, respetando el ritmo de cada persona
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {activities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <Card key={index} className="border-2 hover:border-green-300 transition-all hover:shadow-lg bg-gradient-to-br from-white to-green-50/30">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="text-green-600" size={24} />
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

          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
            <p className="text-center text-gray-700 text-lg">
              <strong>No hay horarios rígidos. Hay tiempo bien vivido.</strong>
            </p>
          </div>
        </div>

        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-2xl mb-4">
              <Heart className="text-emerald-600" size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              💚 Beneficios para el Adulto Mayor
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-6 border-2 border-emerald-200">
                <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-1" size={24} />
                <span className="text-gray-700 text-lg">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
              <Shield className="text-blue-600" size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              👨‍👩‍👧‍👦 Tranquilidad para la Familia
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            {familyPeace.map((item, index) => (
              <div key={index} className="flex items-start gap-3 bg-white rounded-xl p-6 border-2 border-blue-200 shadow-md">
                <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                <span className="text-gray-700 text-lg">{item}</span>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-8 text-center">
            <p className="text-2xl font-semibold">
              Usted descansa sabiendo que están bien cuidados.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-2xl mb-4">
              <Calendar className="text-purple-600" size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🗓 Modalidades Disponibles
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {modalities.map((modality, index) => {
              const Icon = modality.icon;
              return (
                <Card key={index} className="border-2 hover:border-purple-300 transition-all hover:shadow-lg bg-gradient-to-br from-white to-purple-50">
                  <CardContent className="pt-8 pb-8 text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="text-purple-600" size={32} />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-lg">{modality.title}</h3>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-2xl mb-4">
              <Camera className="text-orange-600" size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              📸 Momentos que Permanecen
            </h2>
            <p className="text-lg text-gray-600">
              Paisajes, conversaciones y experiencias que se quedan en el alma
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

        <div className="bg-gradient-to-br from-amber-600 via-orange-500 to-amber-700 text-white rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="max-w-3xl mx-auto text-center">
            <Coffee className="mx-auto mb-6 text-white" size={56} />
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Descansar también es una forma de cuidarse
            </h2>
            <p className="text-xl text-amber-50 mb-8 leading-relaxed">
              Regala experiencias que nutren el alma, conectan con las raíces y traen paz verdadera.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Button
                size="lg"
                onClick={() => handleWhatsAppContact('Explorar estancias disponibles')}
                className="bg-green-500 hover:bg-green-600 text-white text-lg px-8 shadow-lg"
              >
                <Calendar className="mr-2" size={20} />
                Explorar estancias disponibles
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleWhatsAppContact('Solicitar información')}
                className="bg-white text-amber-700 hover:bg-amber-50 border-2 border-white text-lg px-8"
              >
                <MessageCircle className="mr-2" size={20} />
                Solicitar información
              </Button>
            </div>
            <div className="flex items-center justify-center gap-2 text-amber-100">
              <Phone size={20} />
              <span className="text-lg">+57 313 640 5255</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanSolYCafe;
