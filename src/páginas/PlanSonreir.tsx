import { Cake, Heart, Music, PartyPopper, Camera, Sparkles, CheckCircle2, Phone, MessageCircle, Shield, Users, Home, MapPin, Palette, UserCheck, Clock, Gift, ArrowLeft, Smile } from 'lucide-react';
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
import img9 from '@/assets/images/IMG_20221012_102341.jpg';
import img10 from '@/assets/images/IMG_20230519_085342.jpg';
import img11 from '@/assets/images/IMG_20240620_103035.jpg';
import img12 from '@/assets/images/IMG_20250819_093737.jpg';

interface PlanSonreirProps {
  setPage: (page: string) => void;
}

const PlanSonreir = ({ setPage }: PlanSonreirProps) => {
  const handleWhatsAppContact = (action: string) => {
    const phoneNumber = '573136405255';
    const message = `Hola, estoy interesado en el Plan Sonreír - ${action}. Me gustaría recibir más información.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    toast.success('Abriendo WhatsApp...');
  };

  const handlePhoneContact = () => {
    const phoneNumber = '573136405255';
    window.location.href = `tel:+${phoneNumber}`;
    toast.success('Iniciando llamada...');
  };

  const perfectFor = [
    { icon: Cake, text: 'Cumpleaños' },
    { icon: Heart, text: 'Aniversarios' },
    { icon: Users, text: 'Reencuentros familiares' },
    { icon: Gift, text: 'Fechas especiales y homenajes' },
  ];

  const includedServices = [
    { icon: Palette, title: 'Planeación personalizada', description: 'De la celebración' },
    { icon: PartyPopper, title: 'Decoración cálida', description: 'Adecuada al evento' },
    { icon: Home, title: 'Espacios seguros', description: 'Accesibles y confortables' },
    { icon: UserCheck, title: 'Acompañamiento permanente', description: 'Personal capacitado' },
    { icon: Clock, title: 'Coordinación del evento', description: 'Antes, durante y después' },
    { icon: Shield, title: 'Supervisión y apoyo', description: 'A los adultos mayores' },
    { icon: Heart, title: 'Ambiente respetuoso', description: 'Digno y alegre' },
  ];

  const accompaniment = [
    'Apoyo emocional y acompañamiento cercano',
    'Supervisión discreta para garantizar seguridad',
    'Atención personalizada según necesidades',
    'Un entorno donde todos se sienten bienvenidos',
  ];

  const specialMoments = [
    { icon: Music, title: 'Música suave', description: 'O preferida del homenajeado' },
    { icon: Users, title: 'Espacios para recuerdos', description: 'Palabras y agradecimientos' },
    { icon: Sparkles, title: 'Actividades recreativas', description: 'Ligeras' },
    { icon: Heart, title: 'Momentos de oración', description: 'O espiritualidad (si la familia lo desea)' },
    { icon: Camera, title: 'Fotografías y recuerdos', description: 'Compartidos' },
  ];

  const idealFor = [
    'Familias que desean celebrar sin preocupaciones',
    'Adultos mayores que merecen momentos especiales',
    'Personas que valoran la seguridad y el acompañamiento',
    'Reuniones donde la alegría y el cuidado van de la mano',
  ];

  const galleryImages = [
    { url: img1, alt: 'Cumpleaños con decoración cálida y familiar', caption: 'Cada celebración es única' },
    { url: img2, alt: 'Adultos mayores rodeados de su familia', caption: 'Momentos que abrazan el corazón' },
    { url: img3, alt: 'Sonrisas, abrazos y mesas compartidas', caption: 'Alegría genuina' },
    { url: img4, alt: 'Celebraciones al aire libre en la finca', caption: 'Naturaleza y celebración' },
    { url: img5, alt: 'Detalles sencillos que transmiten amor', caption: 'El amor en cada detalle' },
    { url: img6, alt: 'Familia reunida celebrando', caption: 'Unidos por el amor' },
    { url: img7, alt: 'Momentos de agradecimiento', caption: 'Palabras que perduran' },
    { url: img8, alt: 'Celebración memorable', caption: 'Recuerdos preciosos' },
    { url: img9, alt: 'Preparativos de celebración', caption: 'Cada detalle importa' },
    { url: img10, alt: 'Eventos especiales compartidos', caption: 'Momentos inolvidables' },
    { url: img11, alt: 'Decoración y ambiente festivo', caption: 'Espacios que abrazan' },
    { url: img12, alt: 'Celebración con acompañamiento', caption: 'Cuidado en cada momento' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50/50 via-white to-rose-50/30">
      <div className="relative bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zMCAzMG0tMTAgMGExMCAxMCAwIDEgMCAyMCAwYTEwIDEwIDAgMSAwLTIwIDAiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        
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
              <Cake className="text-white" size={32} />
            </div>
            <Badge className="bg-white/90 text-pink-600 text-sm px-4 py-1">
              PLAN SONREÍR 🎂
            </Badge>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Plan Sonreír
          </h1>
          <p className="text-2xl md:text-3xl font-light text-pink-50 mb-6">
            Celebraciones Inolvidables que Abrazan el Corazón
          </p>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl leading-relaxed">
            En Hogar Belén, cada ocasión especial se transforma en un recuerdo precioso, seguro y lleno de amor.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section className="mb-16">
          <Card className="border-none shadow-lg bg-gradient-to-br from-white to-pink-50/30">
            <CardHeader className="pb-4">
              <CardTitle className="text-3xl text-pink-700 flex items-center gap-3">
                <Heart className="text-pink-500" size={32} />
                Celebrar también es cuidar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Reír juntos, cantar, compartir un pastel o una historia antigua es una forma profunda de decir "aquí estamos". 
                El Plan Sonreír nace para que los momentos importantes de la vida se vivan con tranquilidad, alegría y 
                acompañamiento profesional, sin preocupaciones para la familia.
              </p>
              <div className="bg-pink-50 border-l-4 border-pink-400 p-6 rounded-r-xl">
                <p className="text-gray-700 italic">
                  "Cada celebración se adapta a la historia, gustos y ritmo de quien celebra."
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-pink-100 px-6 py-2 rounded-full mb-4">
              <Sparkles className="text-pink-600" size={20} />
              <span className="text-pink-700 font-semibold">¿Qué es el Plan Sonreír?</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Un servicio integral de organización y acompañamiento
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Diseñado especialmente para adultos mayores y sus familias. Nos encargamos de cada detalle para que 
              usted solo se concentre en disfrutar el momento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {perfectFor.map((item, index) => (
              <Card key={index} className="border-pink-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="pt-6 text-center">
                  <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <item.icon className="text-pink-600" size={28} />
                  </div>
                  <p className="text-lg font-semibold text-gray-900">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-rose-100 px-6 py-2 rounded-full mb-4">
              <PartyPopper className="text-rose-600" size={20} />
              <span className="text-rose-700 font-semibold">Celebrar con Tranquilidad</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Todo Incluido
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {includedServices.map((service, index) => (
              <Card key={index} className="border-rose-200/50 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <service.icon className="text-rose-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{service.title}</h3>
                      <p className="text-gray-600 text-sm">{service.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <Card className="border-pink-200 bg-gradient-to-br from-pink-50 to-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl text-pink-700 flex items-center gap-3">
                <Heart className="text-pink-500" size={32} />
                Acompañamiento Humano y Profesional
              </CardTitle>
              <CardDescription className="text-base text-gray-600 pt-2">
                Durante toda la celebración, nuestros residentes y visitantes cuentan con:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {accompaniment.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-pink-100">
                    <CheckCircle2 className="text-pink-500 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-white border-2 border-pink-200 p-6 rounded-xl">
                <p className="text-lg text-center text-gray-700 font-medium">
                  Aquí, la familia se reúne sin estrés y el adulto mayor se siente protagonista.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-100 px-6 py-2 rounded-full mb-4">
              <Music className="text-purple-600" size={20} />
              <span className="text-purple-700 font-semibold">Momentos que se Quedan en el Alma</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Las celebraciones pueden incluir
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Nada forzado. Todo auténtico.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialMoments.map((moment, index) => (
              <Card key={index} className="border-purple-200/50 hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <moment.icon className="text-purple-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{moment.title}</h3>
                      <p className="text-gray-600 text-sm">{moment.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <Card className="border-none shadow-xl bg-gradient-to-br from-white via-pink-50/30 to-rose-50/30">
            <CardHeader>
              <CardTitle className="text-3xl text-gray-900 flex items-center gap-3">
                <Camera className="text-pink-500" size={32} />
                Momentos que abrazan el corazón
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {galleryImages.map((image, index) => (
                  <div key={index} className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                    <img 
                      src={image.url} 
                      alt={image.alt}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white text-sm font-medium">{image.caption}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <Card className="border-pink-200 bg-gradient-to-br from-white to-pink-50/30 shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl text-pink-700 flex items-center gap-3">
                <Smile className="text-pink-500" size={32} />
                ¿Para quién es ideal el Plan Sonreír?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {idealFor.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-pink-100 hover:border-pink-300 transition-colors">
                    <CheckCircle2 className="text-pink-500 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card className="border-none shadow-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjMiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
            
            <CardContent className="relative z-10 py-12">
              <div className="text-center mb-8">
                <Heart className="mx-auto mb-4 text-white fill-white" size={48} />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Celebrar la vida también es un acto de amor
                </h2>
                <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                  Permítanos acompañarlo en esos momentos especiales que merecen ser inolvidables.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  onClick={() => handleWhatsAppContact('Planear celebración')}
                  className="bg-white text-pink-600 hover:bg-pink-50 hover:text-pink-700 shadow-lg text-lg px-8 py-6 h-auto group"
                >
                  <PartyPopper className="mr-2 group-hover:scale-110 transition-transform" size={24} />
                  Planear celebración
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => handleWhatsAppContact('Solicitar información')}
                  className="bg-white/10 text-white border-2 border-white hover:bg-white hover:text-pink-600 backdrop-blur-sm shadow-lg text-lg px-8 py-6 h-auto group"
                >
                  <MessageCircle className="mr-2 group-hover:scale-110 transition-transform" size={24} />
                  Solicitar información
                </Button>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center text-white/90">
                <a 
                  href={`tel:+573136405255`}
                  onClick={handlePhoneContact}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone size={20} />
                  <span className="font-medium">+57 313 640 5255</span>
                </a>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-2">
                  <MapPin size={20} />
                  <span>Buesaco, Nariño</span>
                </span>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default PlanSonreir;
