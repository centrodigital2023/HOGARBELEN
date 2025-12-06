import { CheckCircle } from '@phosphor-icons/react';
import { Card, CardContent } from '../componentes/ui/tarjeta';

const CronologíaInclusiva = () => {
  const steps = [
    {
      year: '2010',
      title: 'Fundación de Hogar Belén',
      description: 'Iniciamos nuestro camino con la visión de brindar cuidado digno y profesional a adultos mayores.',
      color: 'bg-primary-100 border-primary-300'
    },
    {
      year: '2015',
      title: 'Apertura del Centro de Vida',
      description: 'Inauguramos nuestras instalaciones físicas con programas terapéuticos y actividades diarias.',
      color: 'bg-accent/20 border-accent/40'
    },
    {
      year: '2020',
      title: 'Red de Profesionales',
      description: 'Expandimos nuestros servicios incorporando una red de especialistas certificados.',
      color: 'bg-blue-100 border-blue-300'
    },
    {
      year: '2024',
      title: 'Plataforma Digital e IA',
      description: 'Integramos tecnología de asistencia inteligente para un cuidado más completo y personalizado.',
      color: 'bg-purple-100 border-purple-300'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Nuestra Historia de Cuidado
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Más de una década comprometidos con la excelencia en el cuidado de adultos mayores
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-accent to-purple-500 hidden md:block"></div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="flex-1">
                  <Card className={`border-2 ${step.color} hover:shadow-xl transition-all duration-300`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
                            <CheckCircle size={24} weight="fill" className="text-primary" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="text-2xl font-bold text-primary mb-2">{step.year}</div>
                          <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                          <p className="text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-white border-4 border-primary shadow-lg z-10">
                  <span className="text-xl font-bold text-primary">{index + 1}</span>
                </div>

                <div className="flex-1 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CronologíaInclusiva;
