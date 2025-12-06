import { Heart, Shield, Calendar, Clock, Users, Video, MessageCircle, FileText, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface BelenConectaFamiliasProps {
  setPage: (page: string) => void;
}

const BelenConectaFamilias = ({ setPage }: BelenConectaFamiliasProps) => {
  const features = [
    {
      icon: Users,
      title: 'Encuentra el Cuidador Ideal',
      description: 'Accede a una red de profesionales verificados y con experiencia en cuidado geriátrico.'
    },
    {
      icon: Shield,
      title: 'Perfiles Verificados',
      description: 'Todos los profesionales pasan por un riguroso proceso de verificación de antecedentes y referencias.'
    },
    {
      icon: Calendar,
      title: 'Gestión de Citas',
      description: 'Programa y gestiona las visitas de cuidadores desde una sola plataforma.'
    },
    {
      icon: Video,
      title: 'Seguimiento en Tiempo Real',
      description: 'Recibe actualizaciones y reportes diarios sobre el cuidado de tu ser querido.'
    },
    {
      icon: MessageCircle,
      title: 'Comunicación Directa',
      description: 'Chatea directamente con los profesionales y resuelve dudas al instante.'
    },
    {
      icon: FileText,
      title: 'Registros Médicos',
      description: 'Almacena y comparte información médica relevante de forma segura.'
    }
  ];

  const steps = [
    {
      number: '1',
      title: 'Crea tu Perfil',
      description: 'Regístrate gratis y completa la información sobre las necesidades de cuidado.'
    },
    {
      number: '2',
      title: 'Explora Profesionales',
      description: 'Revisa perfiles, calificaciones y experiencia de nuestros cuidadores.'
    },
    {
      number: '3',
      title: 'Agenda una Entrevista',
      description: 'Conoce a los candidatos antes de tomar una decisión.'
    },
    {
      number: '4',
      title: 'Comienza el Cuidado',
      description: 'Inicia el servicio con total tranquilidad y seguimiento continuo.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-6">
            <Heart className="text-primary-600 fill-primary-600" size={40} />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Belén Conecta <span className="text-primary-600">Para Familias</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Encuentra el cuidado profesional que tu familia necesita. Conectamos a familias con 
            profesionales de salud verificados y especializados en adultos mayores.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button 
              size="lg"
              onClick={() => setPage('register')}
              className="text-lg px-8"
            >
              Comenzar Ahora - Gratis
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => setPage('pricing')}
              className="text-lg px-8"
            >
              Ver Planes
            </Button>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Todo lo que Necesitas en un Solo Lugar
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-primary-300 transition-colors text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="text-primary-600" size={28} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Cómo Funciona
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {step.number}
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="border-2 border-primary-200 bg-gradient-to-br from-white to-primary-50">
            <CardHeader>
              <Clock className="text-primary-600 mb-4" size={32} />
              <CardTitle className="text-2xl">Ahorra Tiempo</CardTitle>
              <CardDescription className="text-base">
                Deja de buscar en múltiples lugares. Toda la información y gestión en una plataforma.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 border-primary-200 bg-gradient-to-br from-white to-primary-50">
            <CardHeader>
              <Star className="text-primary-600 mb-4" size={32} />
              <CardTitle className="text-2xl">Calidad Garantizada</CardTitle>
              <CardDescription className="text-base">
                Lee reseñas reales de otras familias y elige con confianza basándote en experiencias verificadas.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="bg-primary-600 text-white rounded-2xl p-8 md:p-12 text-center">
          <Heart className="mx-auto mb-6 fill-white" size={48} />
          <h2 className="text-3xl font-bold mb-4">¿Listo para Encontrar el Cuidado Perfecto?</h2>
          <p className="text-lg mb-8 text-primary-100 max-w-2xl mx-auto">
            Únete a cientos de familias que ya confían en Belén Conecta para el cuidado de sus seres queridos.
          </p>
          <Button 
            size="lg"
            variant="secondary"
            onClick={() => setPage('register')}
            className="text-lg px-8"
          >
            Crear Cuenta Gratis
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BelenConectaFamilias;
