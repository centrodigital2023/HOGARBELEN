import { Check, Heart, Shield, Clock, Users, Home as HomeIcon } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import CompactGallery from '../components/CompactGallery';

export default function ServicioCuidadoResidencial() {
  const residencialImages = [
    'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&auto=format&fit=crop'
  ];

  const residencialFeatures = [
    'Cuidado de enfermería 24 horas 7 días de la semana',
    'Alimentación balanceada y personalizada',
    'Actividades recreativas y terapéuticas',
    'Fisioterapia y rehabilitación',
    'Acompañamiento psicológico',
    'Ambiente familiar y acogedor'
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Seguridad Total',
      description: 'Instalaciones seguras con personal capacitado disponible las 24 horas del día'
    },
    {
      icon: Heart,
      title: 'Atención Personalizada',
      description: 'Cada residente recibe un plan de cuidado adaptado a sus necesidades específicas'
    },
    {
      icon: Users,
      title: 'Vida Social Activa',
      description: 'Actividades grupales que fomentan la interacción y el bienestar emocional'
    },
    {
      icon: Clock,
      title: 'Rutinas Estructuradas',
      description: 'Horarios organizados que proporcionan estabilidad y tranquilidad'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-primary-50/30 to-white">
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <CompactGallery images={residencialImages} alt="Cuidado Residencial Hogar Belén" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-10">
          <Badge className="mb-4 bg-primary text-primary-foreground text-sm px-4 py-1">
            Cuidado Residencial 24/7
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 max-w-4xl">
            Un hogar lleno de vida y seguridad
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl">
            Nuestro hogar ofrece un ambiente cálido y seguro donde cada residente recibe atención personalizada las 24 horas del día.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
              Agendar Visita
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20">
              Solicitar Información
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <section className="mb-20">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-0">
              Cuidado permanente y supervisión profesional
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Más que un centro de cuidado, un verdadero hogar
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Combinamos cuidado médico profesional con la calidez de un verdadero hogar, en un entorno que inspira alegría y tranquilidad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                    <CardDescription className="text-base">{benefit.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>

          <Card className="bg-gradient-to-br from-primary-50 to-white border-2 border-primary/20">
            <CardHeader className="pb-8">
              <CardTitle className="text-3xl mb-4">Servicios incluidos</CardTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {residencialFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-gray-700 text-lg">{feature}</span>
                  </div>
                ))}
              </div>
            </CardHeader>
          </Card>
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
                En el Hogar Belén, entendemos el valor incalculable que nuestros mayores han aportado a nuestras vidas. Nos comprometemos a retribuirles con amor y dedicación a un precio que refleja no solo nuestra gratitud, sino también nuestro entendimiento de la economía actual.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>

        <section className="text-center bg-gradient-to-r from-primary via-primary-600 to-primary rounded-3xl p-12 md:p-16">
          <HomeIcon className="w-16 h-16 text-primary-foreground mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            ¿Listo para conocer nuestro hogar?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
            Agende una visita y descubra personalmente la calidez de nuestras instalaciones
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" className="font-semibold">
              Agendar Visita
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20">
              Llamar Ahora: +57 321 570 8655
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
