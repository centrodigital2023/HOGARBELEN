import { Check, Heart, Shield, Clock, HomeIcon, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import CompactGallery from '../components/CompactGallery';

export default function ServicioDulceHogar() {
  const dulceHogarImages = [
    'https://images.unsplash.com/photo-1516733968668-dbdce39c4651?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1609188076864-c35269136896?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&auto=format&fit=crop'
  ];

  const dulceHogarFeatures = [
    'Cuidadores certificados y de confianza',
    'Atención personalizada en casa',
    'Horarios flexibles adaptados a usted',
    'Seguimiento médico continuo',
    'Apoyo en actividades diarias',
    'Compañía y fomento del bienestar emocional'
  ];

  const benefits = [
    {
      icon: HomeIcon,
      title: 'Comodidad del Hogar',
      description: 'Sus seres queridos reciben atención profesional sin salir de su espacio familiar'
    },
    {
      icon: Shield,
      title: 'Profesionales Certificados',
      description: 'Todo nuestro personal cuenta con certificaciones y experiencia comprobada'
    },
    {
      icon: Clock,
      title: 'Horarios Flexibles',
      description: 'Adaptamos nuestros servicios a las necesidades y rutinas de su familia'
    },
    {
      icon: Users,
      title: 'Atención Personalizada',
      description: 'Cada plan de cuidado se diseña específicamente para cada persona'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-accent-50/30 to-white">
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <CompactGallery images={dulceHogarImages} alt="Plan Dulce Hogar" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-10">
          <Badge className="mb-4 bg-accent text-accent-foreground text-sm px-4 py-1">
            Plan Dulce Hogar
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 max-w-4xl">
            Cuidado experto en su propio espacio
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl">
            Llevamos nuestro cuidado profesional y nuestra calidez directamente a la comodidad de su hogar.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
              Solicitar Servicio
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20">
              Conocer Planes
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <section className="mb-20">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent border-0">
              Cuidado profesional en casa
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Mantener la independencia sin sacrificar el cuidado
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Nuestros cuidadores certificados brindan atención personalizada, permitiendo que sus seres queridos mantengan su independencia y rutina en un entorno familiar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="border-2 hover:border-accent/50 transition-colors">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                    <CardDescription className="text-base">{benefit.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>

          <Card className="bg-gradient-to-br from-accent-50 to-white border-2 border-accent/20">
            <CardHeader className="pb-8">
              <CardTitle className="text-3xl mb-4">Servicios incluidos</CardTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dulceHogarFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-gray-700 text-lg">{feature}</span>
                  </div>
                ))}
              </div>
            </CardHeader>
          </Card>
        </section>

        <section className="mb-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-gradient-to-br from-primary-50 to-white">
            <CardHeader>
              <CardTitle className="text-2xl mb-2">Cuidado Básico</CardTitle>
              <CardDescription className="text-base">
                Acompañamiento y apoyo en actividades diarias, de 4 a 8 horas al día.
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="bg-gradient-to-br from-accent-50 to-white border-2 border-accent">
            <CardHeader>
              <Badge className="mb-3 w-fit bg-accent text-accent-foreground">Más Popular</Badge>
              <CardTitle className="text-2xl mb-2">Cuidado Integral</CardTitle>
              <CardDescription className="text-base">
                Atención médica y personal, de 12 a 16 horas al día con seguimiento continuo.
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="bg-gradient-to-br from-primary-50 to-white">
            <CardHeader>
              <CardTitle className="text-2xl mb-2">Cuidado 24/7</CardTitle>
              <CardDescription className="text-base">
                Asistencia completa las 24 horas con personal rotativo especializado.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>

        <section className="text-center bg-gradient-to-r from-accent via-accent/90 to-accent rounded-3xl p-12 md:p-16">
          <Heart className="w-16 h-16 text-accent-foreground mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-accent-foreground mb-6">
            El mejor cuidado sin salir de casa
          </h2>
          <p className="text-xl text-accent-foreground/90 mb-8 max-w-3xl mx-auto">
            Solicite una consulta gratuita y descubra cómo podemos ayudarle
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" className="font-semibold">
              Consulta Gratuita
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20">
              WhatsApp: +57 321 570 8655
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
