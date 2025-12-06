import { Card, CardContent, CardHeader, CardTitle } from './ui/tarjeta';
import { Heart, Users, Brain, Clock } from '@phosphor-icons/react';

const PropuestaDeValor = () => {
  const valores = [
    {
      icon: Heart,
      title: 'Cuidado Compasivo',
      description: 'Atención personalizada con calidez humana y profesionalismo en cada interacción.',
      color: 'text-red-500'
    },
    {
      icon: Users,
      title: 'Red de Especialistas',
      description: 'Acceso a profesionales verificados en múltiples especialidades de salud.',
      color: 'text-blue-500'
    },
    {
      icon: Brain,
      title: 'Asistente IA',
      description: 'Tecnología inteligente que ayuda en el monitoreo y cuidado continuo.',
      color: 'text-purple-500'
    },
    {
      icon: Clock,
      title: 'Disponibilidad 24/7',
      description: 'Soporte y servicios disponibles cuando tu familia los necesite.',
      color: 'text-green-500'
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            ¿Por qué elegir Hogar Belén?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Combinamos experiencia, tecnología y corazón para ofrecer el mejor cuidado
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {valores.map((valor, index) => {
            const Icon = valor.icon;
            return (
              <Card 
                key={index}
                className="border-2 hover:border-primary hover:shadow-lg transition-all duration-300 group"
              >
                <CardHeader>
                  <div className={`inline-flex p-3 rounded-xl bg-muted mb-4 group-hover:scale-110 transition-transform ${valor.color}`}>
                    <Icon size={32} weight="duotone" />
                  </div>
                  <CardTitle className="text-xl">{valor.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{valor.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PropuestaDeValor;
