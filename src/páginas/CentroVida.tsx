import { Heart, Users, Calendar, Home, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ServiceGallery from '@/components/ServiceGallery';

interface CentroVidaProps {
  setPage: (page: string) => void;
}

const CentroVida = ({ setPage }: CentroVidaProps) => {
  const centroVidaGallery = [
    {
      url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop',
      alt: 'Entrada principal Centro de Vida Hogar Belén',
      caption: 'Bienvenido a nuestro acogedor Centro de Vida'
    },
    {
      url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop',
      alt: 'Sala común del Centro de Vida',
      caption: 'Espacios amplios y confortables para la convivencia'
    },
    {
      url: 'https://images.unsplash.com/photo-1599045118441-c8b9d0457db4?w=800&auto=format&fit=crop',
      alt: 'Actividades recreativas grupales',
      caption: 'Actividades diseñadas para el bienestar y la socialización'
    },
    {
      url: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=800&auto=format&fit=crop',
      alt: 'Comedor del Centro de Vida',
      caption: 'Alimentación balanceada en un ambiente familiar'
    },
    {
      url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&auto=format&fit=crop',
      alt: 'Huerta terapéutica',
      caption: 'Huerta terapéutica: conexión con la naturaleza'
    },
    {
      url: 'https://images.unsplash.com/photo-1574887427561-d3d5d58c9273?w=800&auto=format&fit=crop',
      alt: 'Sala de terapias físicas',
      caption: 'Salas equipadas para fisioterapia y rehabilitación'
    },
    {
      url: 'https://images.unsplash.com/photo-1546953304-5d96f43c2e94?w=800&auto=format&fit=crop',
      alt: 'Sesión de musicoterapia',
      caption: 'Musicoterapia para estimulación cognitiva'
    },
    {
      url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop',
      alt: 'Clase de ejercicio adaptado',
      caption: 'Ejercicio adaptado para todas las capacidades'
    },
    {
      url: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?w=800&auto=format&fit=crop',
      alt: 'Jardines exteriores',
      caption: 'Hermosos jardines para disfrutar al aire libre'
    },
    {
      url: 'https://images.unsplash.com/photo-1587850450970-61a7fc4f0c59?w=800&auto=format&fit=crop',
      alt: 'Atención personalizada',
      caption: 'Cuidado individualizado con profesionales capacitados'
    },
    {
      url: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=800&auto=format&fit=crop',
      alt: 'Sala de lectura y relajación',
      caption: 'Espacios tranquilos para lectura y descanso'
    },
    {
      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop',
      alt: 'Terapia ocupacional',
      caption: 'Terapias ocupacionales para mantener la autonomía'
    }
  ];
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-6">
            <Home className="text-primary-600" size={40} />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Centro de Día <span className="text-primary-600">Hogar Belén</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Un espacio seguro, cálido y estimulante donde tus seres queridos reciben atención profesional 
            mientras tú te ocupas de tus actividades diarias.
          </p>
        </div>

        <div className="mb-16">
          <ServiceGallery
            title="Conoce Nuestras Instalaciones"
            description="Un recorrido visual por nuestro Centro de Vida, donde cada espacio está diseñado pensando en el bienestar y la comodidad de nuestros residentes."
            images={centroVidaGallery}
            columns={4}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="border-2 hover:border-primary-300 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-primary-600" size={24} />
              </div>
              <CardTitle className="text-2xl">Atención Personalizada</CardTitle>
              <CardDescription className="text-base">
                Cuidado individualizado con profesionales especializados en geriatría y gerontología
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <Sparkles className="text-primary-500 mt-1 flex-shrink-0" size={16} />
                  <span>Evaluación inicial y plan de cuidados personalizado</span>
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="text-primary-500 mt-1 flex-shrink-0" size={16} />
                  <span>Ratio óptimo cuidador-residente</span>
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="text-primary-500 mt-1 flex-shrink-0" size={16} />
                  <span>Seguimiento continuo del estado de salud</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary-300 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="text-primary-600" size={24} />
              </div>
              <CardTitle className="text-2xl">Actividades Terapéuticas</CardTitle>
              <CardDescription className="text-base">
                Programa diario diseñado para estimular física, cognitiva y socialmente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <Sparkles className="text-primary-500 mt-1 flex-shrink-0" size={16} />
                  <span>Terapia ocupacional y fisioterapia</span>
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="text-primary-500 mt-1 flex-shrink-0" size={16} />
                  <span>Estimulación cognitiva y memoria</span>
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="text-primary-500 mt-1 flex-shrink-0" size={16} />
                  <span>Actividades recreativas y socialización</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Nuestro Día a Día
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { time: '8:00 - 9:00', activity: 'Recepción y desayuno' },
              { time: '9:00 - 11:00', activity: 'Actividades de estimulación' },
              { time: '11:00 - 12:30', activity: 'Terapias individuales' },
              { time: '12:30 - 14:00', activity: 'Almuerzo y descanso' },
              { time: '14:00 - 16:00', activity: 'Actividades grupales' },
              { time: '16:00 - 17:00', activity: 'Merienda y socialización' },
              { time: '17:00 - 18:00', activity: 'Actividades de relajación' },
              { time: '18:00 - 19:00', activity: 'Despedida y retorno' },
            ].map((slot, index) => (
              <div key={index} className="text-center p-4 bg-primary-50 rounded-lg">
                <p className="font-semibold text-primary-600 mb-2">{slot.time}</p>
                <p className="text-sm text-gray-700">{slot.activity}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-primary-600 text-white rounded-2xl p-8 md:p-12 text-center">
          <Heart className="mx-auto mb-6 fill-white" size={48} />
          <h2 className="text-3xl font-bold mb-4">¿Interesado en Nuestro Centro de Día?</h2>
          <p className="text-lg mb-8 text-primary-100 max-w-2xl mx-auto">
            Agenda una visita guiada sin compromiso y conoce nuestras instalaciones y equipo profesional
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              variant="secondary"
              onClick={() => setPage('contact')}
              className="text-lg px-8"
            >
              Agendar Visita
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => setPage('pricing')}
              className="text-lg px-8 bg-transparent text-white border-white hover:bg-white hover:text-primary-600"
            >
              Ver Planes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CentroVida;
