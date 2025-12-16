import { Leaf, MapPin, TreePine, Footprints, Eye, Wind, Bird, PawPrint, Landmark, Church, BookOpen, Heart, CheckCircle2, Phone, MessageCircle, Shield, Sparkles, Home, UtensilsCrossed, Bus, UserCheck, Camera, ArrowLeft, Mountain, Users, Sun, Brain, Smile, Activity } from 'lucide-react';
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
import img9 from '@/assets/images/IMG-20230423-WA0001.jpg';
import img10 from '@/assets/images/IMG-20250808-WA0004.jpg';
import img11 from '@/assets/images/IMG-20250810-WA0031.jpg';
import img12 from '@/assets/images/IMG-20230519-WA0059.jpg';

interface PlanTurismoRuralProps {
  setPage: (page: string) => void;
}

const PlanTurismoRural = ({ setPage }: PlanTurismoRuralProps) => {
  const handleWhatsAppContact = (action: string) => {
    const phoneNumber = '573136405255';
    const message = `Hola, estoy interesado en el Plan Turismo Rural - ${action}. Me gustaría recibir más información.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    toast.success('Abriendo WhatsApp...');
  };

  const handlePhoneContact = () => {
    const phoneNumber = '573136405255';
    window.location.href = `tel:+${phoneNumber}`;
    toast.success('Iniciando llamada...');
  };

  const experiences = [
    {
      icon: Leaf,
      title: 'Salidas ecológicas guiadas',
      items: [
        'Caminatas suaves por senderos naturales',
        'Observación de paisajes, flora y fauna',
        'Respiración consciente y contacto con la naturaleza',
        'Espacios de descanso al aire libre'
      ]
    },
    {
      icon: PawPrint,
      title: 'Zooterapia',
      items: [
        'Interacción guiada con animales de granja',
        'Estimulación emocional y sensorial',
        'Beneficios comprobados en el estado de ánimo y la memoria',
        'Actividades seguras, tranquilas y supervisadas'
      ]
    },
    {
      icon: Landmark,
      title: 'Recorridos históricos y culturales',
      items: [
        'Visitas a fincas y espacios de historia colonial',
        'Relatos locales y memoria cultural',
        'Conexión con tradiciones, oficios y saberes ancestrales'
      ]
    },
    {
      icon: Church,
      title: 'Espiritualidad y reflexión',
      items: [
        'Momentos de silencio y contemplación',
        'Espacios para la oración o reflexión personal',
        'Conexión interior en entornos naturales',
        'Acompañamiento respetuoso según creencias'
      ]
    }
  ];

  const includedServices = [
    { icon: Bus, title: 'Transporte seguro', description: 'Ida y regreso' },
    { icon: UserCheck, title: 'Acompañamiento permanente', description: 'Personal capacitado durante toda la jornada' },
    { icon: UtensilsCrossed, title: 'Alimentación', description: 'Durante la jornada' },
    { icon: Shield, title: 'Coordinación y supervisión', description: 'Continua' },
    { icon: Heart, title: 'Ritmo adaptado', description: 'A cada participante' },
    { icon: CheckCircle2, title: 'Ambiente seguro', description: 'Digno y acogedor' },
  ];

  const benefits = [
    { icon: Brain, text: 'Reduce el estrés y la ansiedad' },
    { icon: Eye, text: 'Estimula los sentidos y la memoria' },
    { icon: Heart, text: 'Fortalece el bienestar emocional' },
    { icon: Wind, text: 'Promueve la tranquilidad y el equilibrio' },
    { icon: Sparkles, text: 'Favorece la conexión espiritual' },
    { icon: Smile, text: 'Genera experiencias significativas' },
  ];

  const idealFor = [
    'Adultos mayores que aman la naturaleza',
    'Personas que buscan paz y serenidad',
    'Quienes disfrutan experiencias culturales y espirituales',
    'Familias que desean bienestar integral para sus seres queridos',
  ];

  const galleryImages = [
    { url: img1, alt: 'Adultos mayores caminando por senderos naturales', caption: 'Reconectando con la naturaleza' },
    { url: img2, alt: 'Interacción con animales de granja', caption: 'Zooterapia que sana el alma' },
    { url: img3, alt: 'Paisajes rurales de Buesaco', caption: 'La belleza del campo' },
    { url: img4, alt: 'Momentos de descanso bajo árboles', caption: 'Paz bajo la sombra' },
    { url: img5, alt: 'Espacios de reflexión y contemplación', caption: 'Conexión espiritual' },
    { url: img6, alt: 'Recorridos culturales', caption: 'Historia viva de nuestra región' },
    { url: img7, alt: 'Caminatas guiadas', caption: 'Cada paso con seguridad' },
    { url: img8, alt: 'Experiencias compartidas', caption: 'Momentos que perduran' },
    { url: img9, alt: 'Salidas ecológicas guiadas', caption: 'Explorando con cuidado' },
    { url: img10, alt: 'Contacto con flora local', caption: 'Naturaleza que inspira' },
    { url: img11, alt: 'Turismo rural seguro', caption: 'Aventuras con acompañamiento' },
    { url: img12, alt: 'Observación de paisajes', caption: 'Contemplación y serenidad' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/50 via-white to-green-50/30">
      <div className="relative bg-gradient-to-br from-emerald-600 via-green-600 to-teal-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
          <Button
            variant="ghost"
            onClick={() => setPage('planes-vida-activa')}
            className="mb-6 text-white hover:bg-white/20"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Planes de Vida Activa
          </Button>

          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
              <Leaf className="h-8 w-8" />
            </div>
            <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm text-white border-white/30">
              Plan Turismo Rural
            </Badge>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            🌿 Plan Turismo Rural
          </h1>
          <p className="text-xl md:text-2xl text-emerald-50 font-light mb-4">
            Conéctate con la Naturaleza
          </p>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl leading-relaxed">
            Experiencias guiadas para adultos mayores que buscan paz, sentido y conexión con el entorno natural y espiritual.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  El Plan Turismo Rural de Hogar Belén es una invitación a bajar el ritmo, respirar profundo y reencontrarse con la tranquilidad del campo. Cada salida está pensada para <strong>cuidar el cuerpo, nutrir el alma y despertar recuerdos y emociones positivas</strong> a través de la naturaleza, los animales y la historia viva de nuestra región.
                </p>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6">
                <TreePine className="h-6 w-6 text-emerald-600" />
                <h2 className="text-3xl font-bold text-gray-900">¿En qué consiste el Plan Turismo Rural?</h2>
              </div>
              <Card className="border-emerald-200 bg-emerald-50/50">
                <CardContent className="pt-6">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Salidas programadas y experiencias rurales seguras, acompañadas por personal capacitado, donde los adultos mayores disfrutan de la <strong>naturaleza, la cultura y la espiritualidad</strong>, sin exigencias físicas ni preocupaciones logísticas.
                  </p>
                  <p className="text-base text-emerald-700 mt-4 font-medium italic">
                    Cada experiencia se vive con calma, respeto y profundo sentido humano.
                  </p>
                </CardContent>
              </Card>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-8">
                <Mountain className="h-6 w-6 text-emerald-600" />
                <h2 className="text-3xl font-bold text-gray-900">🐄 Experiencias Incluidas</h2>
              </div>
              
              <div className="space-y-6">
                {experiences.map((experience, index) => (
                  <Card key={index} className="border-l-4 border-l-emerald-500 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-emerald-100 rounded-lg shrink-0">
                          <experience.icon className="h-6 w-6 text-emerald-600" />
                        </div>
                        <div>
                          <CardTitle className="text-xl text-gray-900">{experience.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {experience.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6">
                <Home className="h-6 w-6 text-emerald-600" />
                <h2 className="text-3xl font-bold text-gray-900">🏡 Todo Incluido – Sin Preocupaciones</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {includedServices.map((service, index) => (
                  <Card key={index} className="border-emerald-100 hover:border-emerald-300 transition-colors">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-emerald-100 rounded-lg shrink-0">
                          <service.icon className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{service.title}</h3>
                          <p className="text-sm text-gray-600">{service.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6">
                <Heart className="h-6 w-6 text-emerald-600" />
                <h2 className="text-3xl font-bold text-gray-900">💛 Beneficios del Plan Turismo Rural</h2>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {benefits.map((benefit, index) => (
                  <Card key={index} className="border-emerald-100 bg-gradient-to-br from-white to-emerald-50/30">
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center gap-3">
                        <div className="p-3 bg-emerald-100 rounded-full">
                          <benefit.icon className="h-6 w-6 text-emerald-600" />
                        </div>
                        <p className="text-sm font-medium text-gray-800">{benefit.text}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6">
                <Camera className="h-6 w-6 text-emerald-600" />
                <h2 className="text-3xl font-bold text-gray-900">📸 Galería de Experiencias</h2>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {galleryImages.map((image, index) => (
                  <div key={index} className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all">
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <p className="text-white text-sm font-medium">{image.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6">
                <Users className="h-6 w-6 text-emerald-600" />
                <h2 className="text-3xl font-bold text-gray-900">🌱 ¿Para quién es ideal este plan?</h2>
              </div>
              
              <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50">
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    {idealFor.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-gray-800">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-emerald-800 flex items-center gap-2">
                    <Sparkles className="h-6 w-6" />
                    Comienza tu Experiencia
                  </CardTitle>
                  <CardDescription className="text-base text-gray-700">
                    La naturaleza también cuida el alma.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={() => handleWhatsAppContact('Ver próximas salidas')}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-md"
                    size="lg"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Ver próximas salidas
                  </Button>
                  
                  <Button
                    onClick={() => handleWhatsAppContact('Solicitar información')}
                    variant="outline"
                    className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                    size="lg"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Solicitar información
                  </Button>

                  <div className="pt-4 border-t border-emerald-200">
                    <p className="text-sm text-gray-600 text-center mb-3">
                      ¿Tienes preguntas? Llámanos directamente
                    </p>
                    <Button
                      onClick={handlePhoneContact}
                      variant="ghost"
                      className="w-full text-emerald-700 hover:bg-emerald-50"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      +57 313 640 5255
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-emerald-200 bg-emerald-50/50">
                <CardHeader>
                  <CardTitle className="text-lg text-emerald-800">✨ Experiencias Auténticas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-gray-700">
                  <div className="flex items-start gap-2">
                    <Leaf className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p>Cada salida es una oportunidad de reconexión con la naturaleza</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p>Personal capacitado acompaña cada momento de la experiencia</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Heart className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p>Actividades diseñadas con profundo sentido humano</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-emerald-600 to-green-700 text-white">
                <CardContent className="pt-6">
                  <div className="text-center space-y-3">
                    <TreePine className="h-12 w-12 mx-auto opacity-90" />
                    <p className="font-semibold text-lg">
                      Conéctate con lo esencial
                    </p>
                    <p className="text-sm text-emerald-50">
                      Paz, naturaleza y experiencias que nutren el alma
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanTurismoRural;
