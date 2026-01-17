import { Sparkles, Shield, Award, MapPin, Calendar, Clock, Heart } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

export default function ServicioBelenConecta() {
  const belenConectaImage = 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop';

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-primary-50/30 to-white">
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={belenConectaImage}
            alt="Plataforma Digital Belén Conecta"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/80" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-10">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-white" />
            <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/40 text-sm px-4 py-1">
              Plataforma Digital
            </Badge>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 max-w-4xl">
            Belén Conecta: La Tecnología al Servicio del Cuidado
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl">
            Nuestra plataforma digital revoluciona la forma de encontrar cuidadores especializados. Conectamos familias con profesionales verificados.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-white hover:bg-white/90 text-primary font-semibold">
              Acceder a la Plataforma
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20">
              Conocer Más
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <section className="mb-20">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-0">
              Encuentra cuidadores verificados en minutos
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Conectamos familias con profesionales de confianza
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Garantizamos calidad y confianza en cada servicio mediante verificación exhaustiva y seguimiento continuo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {belenConectaFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="bg-white hover:shadow-lg transition-shadow border-2 hover:border-primary/30">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-primary text-primary-foreground">
                Para Familias
              </Badge>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Encuentre el cuidador perfecto para su ser querido
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                Busque por especialidad, ubicación, disponibilidad y calificaciones. Compare perfiles, lea reseñas de otras familias y contrate con confianza.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-gray-700">Búsqueda inteligente con filtros avanzados</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-gray-700">Mensajería directa y segura con profesionales</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-gray-700">Gestión de citas y pagos en un solo lugar</span>
                </li>
              </ul>
              <Button size="lg">
                Registrarse como Familia
              </Button>
            </div>
            <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-2xl p-8 lg:p-12">
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop"
                alt="Familia feliz usando la plataforma"
                className="w-full h-80 object-cover rounded-xl shadow-xl mb-6"
              />
              <p className="text-sm text-muted-foreground text-center italic">
                Miles de familias ya confían en Belén Conecta para encontrar el mejor cuidado
              </p>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 bg-gradient-to-br from-accent-50 to-accent-100/50 rounded-2xl p-8 lg:p-12">
              <img 
                src="https://images.unsplash.com/photo-1516733968668-dbdce39c4651?w=800&auto=format&fit=crop"
                alt="Profesional de la salud"
                className="w-full h-80 object-cover rounded-xl shadow-xl mb-6"
              />
              <p className="text-sm text-muted-foreground text-center italic">
                Únete a nuestra red de profesionales certificados
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <Badge className="mb-4 bg-accent text-accent-foreground">
                Para Profesionales
              </Badge>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Expanda su práctica y llegue a más familias
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                Cree su perfil profesional, establezca sus tarifas y horarios, y conecte con familias que buscan exactamente sus servicios.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-gray-700">Gestione su agenda y disponibilidad fácilmente</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-gray-700">Reciba valoraciones y construya su reputación</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-gray-700">Pagos seguros y puntuales por sus servicios</span>
                </li>
              </ul>
              <Button size="lg" variant="default" className="bg-accent hover:bg-accent/90">
                Registrarse como Profesional
              </Button>
            </div>
          </div>
        </section>

        <section className="text-center bg-gradient-to-r from-primary via-primary-600 to-primary rounded-3xl p-12 md:p-16">
          <Heart className="w-16 h-16 text-primary-foreground mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Una plataforma que facilita el cuidado de calidad
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
            Únase a nuestra comunidad de familias y profesionales comprometidos con el bienestar de nuestros mayores
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" className="font-semibold">
              Comenzar Ahora
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20">
              Ver Demo
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
