import { Home, Check, MapPin, Calendar, Award, Trees, PartyPopper, Mountain, Sparkles, Heart, Shield, Clock, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import CompactGallery from '../components/CompactGallery';

export default function ServicesPage() {
  const residencialImages = [
    'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&auto=format&fit=crop'
  ];

  const dulceHogarImages = [
    'https://images.unsplash.com/photo-1516733968668-dbdce39c4651?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1609188076864-c35269136896?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&auto=format&fit=crop'
  ];

  const belenConectaImage = 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop';

  const heroImages = [
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1599045118441-c8b9d0457db4?w=1200&auto=format&fit=crop'
  ];

  const residencialFeatures = [
    'Atención médica 24/7',
    'Alimentación balanceada y personalizada',
    'Actividades recreativas y terapéuticas',
    'Fisioterapia y rehabilitación',
    'Acompañamiento psicológico',
    'Ambiente familiar y acogedor'
  ];

  const dulceHogarFeatures = [
    'Cuidadores certificados y de confianza',
    'Atención personalizada en casa',
    'Horarios flexibles adaptados a usted',
    'Seguimiento médico continuo',
    'Apoyo en actividades diarias',
    'Compañía y fomento del bienestar emocional'
  ];

  const belenConectaFeatures = [
    {
      title: 'Perfiles Verificados',
      description: 'Profesionales cualificados y de confianza.',
      icon: Shield
    },
    {
      title: 'Calificaciones y Reseñas',
      description: 'Transparencia y fiabilidad en cada elección.',
      icon: Award
    },
    {
      title: 'Búsqueda Personalizada',
      description: 'Por especialidad y ubicación, cerca de usted.',
      icon: MapPin
    },
    {
      title: 'Comunicación Segura',
      description: 'Directa y protegida con cada cuidador.',
      icon: Shield
    },
    {
      title: 'Gestión Fácil',
      description: 'Organice citas y servicios sin complicaciones.',
      icon: Calendar
    },
    {
      title: 'Soporte 24/7',
      description: 'Siempre a su disposición para cualquier consulta.',
      icon: Clock
    }
  ];

  const programasActivos = [
    {
      name: 'Plan Amigos',
      description: 'Actividades lúdicas y estimulantes para abuelos que buscan alegría y compañía.',
      image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=800&auto=format&fit=crop',
      icon: Users
    },
    {
      name: 'Plan en mi Casa',
      description: 'Equipo de enfermería y asistencia personal 24/7 en la comodidad de su hogar.',
      image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&auto=format&fit=crop',
      icon: Home
    },
    {
      name: 'Plan Sol y Café',
      description: 'Hospédese en fincas tradicionales de Buesaco y disfrute la cultura local.',
      image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&auto=format&fit=crop',
      icon: Trees
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-primary-50/30 to-white">
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <CompactGallery images={heroImages} alt="Servicios Hogar Belén" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-10">
          <Badge className="mb-4 bg-accent text-accent-foreground text-sm px-4 py-1">
            Cuidado con amor y profesionalismo
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 max-w-4xl">
            Nuestros servicios para la tercera edad
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl">
            Soluciones integrales de cuidado diseñadas con amor, profesionalismo y tecnología de vanguardia para sus seres queridos.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
              Solicitar Información
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20">
              Conocer Precios
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-0">
            Cuidado permanente y supervisión profesional
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Descubra la excelencia en cuidados para la tercera edad con Hogar Belén
          </h2>
        </div>

        <section className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
            <div className="order-2 lg:order-1">
              <Badge className="mb-4 bg-primary text-primary-foreground">
                Cuidado Residencial
              </Badge>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Un hogar lleno de vida y seguridad
              </h3>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Nuestro hogar ofrece un ambiente cálido y seguro donde cada residente recibe atención personalizada las 24 horas del día. Combinamos cuidado médico profesional con la calidez de un verdadero hogar, en un entorno que inspira alegría y tranquilidad.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {residencialFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <CompactGallery images={residencialImages} alt="Cuidado Residencial" />
              <p className="text-sm text-muted-foreground mt-3 text-center italic">
                Un grupo de residentes sonriendo y participando en una actividad grupal en un salón luminoso.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
            <div>
              <CompactGallery images={dulceHogarImages} alt="Plan Dulce Hogar" />
              <p className="text-sm text-muted-foreground mt-3 text-center italic">
                Una cuidadora sonriente comparte un momento agradable con una persona mayor en su sala de estar.
              </p>
            </div>
            <div>
              <Badge className="mb-4 bg-accent text-accent-foreground">
                Plan Dulce Hogar
              </Badge>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Cuidado experto en su propio espacio
              </h3>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Llevamos nuestro cuidado profesional y nuestra calidez directamente a la comodidad de su hogar. Nuestros cuidadores certificados brindan atención personalizada, permitiendo que sus seres queridos mantengan su independencia y rutina en un entorno familiar.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {dulceHogarFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-3xl p-8 md:p-12">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <Badge className="bg-primary text-primary-foreground">
                  Belén Conecta
                </Badge>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                La Tecnología al Servicio del Cuidado
              </h3>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Nuestra plataforma digital revoluciona la forma de encontrar cuidadores especializados. Conectamos familias con profesionales verificados, garantizando calidad y confianza en cada servicio.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {belenConectaFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <h4 className="font-bold text-gray-900 text-sm">{feature.title}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  );
                })}
              </div>
              <Button size="lg" className="w-full sm:w-auto">
                Acceder a la Plataforma
              </Button>
            </div>
            <div className="order-1 lg:order-2">
              <img 
                src={belenConectaImage}
                alt="Mujer sonriendo mientras usa una tablet para conectar con cuidadores"
                className="w-full h-[400px] object-cover rounded-2xl shadow-xl"
              />
              <p className="text-sm text-muted-foreground mt-3 text-center italic">
                Mujer sonriendo mientras usa una tablet para conectar con cuidadores.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-32">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Programas de vida activa y saludable
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programasActivos.map((programa, index) => {
              const Icon = programa.icon;
              return (
                <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow group">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={programa.image}
                      alt={programa.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="w-10 h-10 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{programa.name}</CardTitle>
                    <CardDescription className="text-base">{programa.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card className="bg-gradient-to-br from-primary to-primary-600 text-primary-foreground overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <CardHeader className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                  <PartyPopper className="w-6 h-6" />
                </div>
                <CardTitle className="text-2xl mb-3">Plan Sonreír: Celebraciones Inolvidables</CardTitle>
                <CardDescription className="text-primary-foreground/90 text-base leading-relaxed">
                  En Belén, cada ocasión especial se convierte en un recuerdo precioso. Nuestro equipo se encarga de cada detalle para garantizar que su celebración sea amena, agradable, divertida y segura. Perfecto para cumpleaños, aniversarios y reuniones que unen a la familia.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-to-br from-accent to-accent/80 text-accent-foreground overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <CardHeader className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                  <Mountain className="w-6 h-6" />
                </div>
                <CardTitle className="text-2xl mb-3">Plan Turismo Rural: Conecte con la Naturaleza</CardTitle>
                <CardDescription className="text-accent-foreground/90 text-base leading-relaxed">
                  Sumérjase en la serenidad del campo con nuestro Plan Turismo Rural. Desde salidas ecológicas hasta zooterapia y recorridos por la rica historia colonial, cada actividad es una invitación a conectarse con la naturaleza, los animales y su propia espiritualidad.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        <section className="mb-20">
          <Card className="bg-gradient-to-br from-primary-50 via-white to-accent-50 border-2 border-primary/20">
            <CardHeader className="text-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8" />
              </div>
              <CardTitle className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Atención médica y asistencia personalizada
              </CardTitle>
              <CardDescription className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                En el Hogar Belén, entendemos el valor incalculable que nuestros mayores han aportado a nuestras vidas. Nos comprometemos a retribuirles con amor y dedicación a un precio que refleja no solo nuestra gratitud, sino también nuestro entendimiento de la economía actual. Comparado con la suma de costos individuales, el Hogar Belén no solo es una opción económica, sino también la elección más completa y cariñosa.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>

        <section className="text-center bg-gradient-to-r from-primary via-primary-600 to-primary rounded-3xl p-12 md:p-16">
          <Sparkles className="w-16 h-16 text-primary-foreground mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            ¡En el Hogar Belén cada día es una celebración de la vida!
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
            Descubra cómo podemos brindarle el cuidado que su ser querido merece
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" className="font-semibold">
              Agendar Visita
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20">
              Llamar Ahora
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
