import { Heart, Users, Home, Sparkles, CheckCircle2, Music, Brain, Flower2, Book, Utensils, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ServiceGallery from '@/components/ServiceGallery';
import img1 from '@/assets/images/IMG-20230423-WA0001.jpg';
import img2 from '@/assets/images/IMG-20230508-WA0005.jpg';
import img3 from '@/assets/images/IMG-20230509-WA0015.jpg';
import img4 from '@/assets/images/IMG-20230519-WA0016.jpg';
import img5 from '@/assets/images/IMG-20230519-WA0040.jpg';
import img6 from '@/assets/images/IMG-20230519-WA0042.jpg';
import img7 from '@/assets/images/IMG-20230519-WA0049.jpg';
import img8 from '@/assets/images/IMG-20230519-WA0059.jpg';
import img9 from '@/assets/images/IMG-20230519-WA0087.jpg';
import img10 from '@/assets/images/IMG-20230526-WA0012.jpg';
import img11 from '@/assets/images/IMG-20230528-WA0011.jpg';
import img12 from '@/assets/images/IMG-20240410-WA0018.jpg';

interface CentroVidaProps {
  setPage: (page: string) => void;
}

const CentroVida = ({ setPage }: CentroVidaProps) => {
  const centroVidaGallery = [
    {
      url: img1,
      alt: 'Entrada principal del Centro Vida Hogar Belén',
      caption: 'Donde el día empieza con calma y bienvenida'
    },
    {
      url: img2,
      alt: 'Sala común',
      caption: 'Voces suaves, risas compartidas, encuentros sin soledad'
    },
    {
      url: img3,
      alt: 'Comedor del Centro de Vida',
      caption: 'Nutrición que alimenta el cuerpo y el alma'
    },
    {
      url: img4,
      alt: 'Huerta terapéutica',
      caption: 'Manos en la tierra, memoria viva, raíces que aún florecen'
    },
    {
      url: img5,
      alt: 'Sala de terapias físicas',
      caption: 'Movimiento sin presión, recuperación con respeto'
    },
    {
      url: img6,
      alt: 'Sala de lectura y relajación',
      caption: 'Silencio que descansa, palabras que acompañan'
    },
    {
      url: img7,
      alt: 'Jardines exteriores',
      caption: 'Aire limpio, sol amable, pensamientos en libertad'
    },
    {
      url: img8,
      alt: 'Actividades terapéuticas',
      caption: 'El cuerpo se mueve, la mente se activa'
    },
    {
      url: img9,
      alt: 'Momentos de convivencia',
      caption: 'El corazón se siente acompañado'
    },
    {
      url: img10,
      alt: 'Atención personalizada',
      caption: 'Aquí nadie es un número. Cada historia importa'
    },
    {
      url: img11,
      alt: 'Espacios de bienestar',
      caption: 'Un hogar donde convivir, florecer y vivir con dignidad'
    },
    {
      url: img12,
      alt: 'Cuidado integral',
      caption: 'Envejecer no es apagarse, es transformarse con dignidad'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50/30 via-white to-primary-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-6">
            <Home className="text-primary-600" size={40} />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Centro Vida – <span className="text-primary-600">Hogar Belén</span>
          </h1>
          <p className="text-2xl text-primary-700 font-light italic mb-8">
            Un lugar donde el tiempo no se pierde… se abraza.
          </p>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-primary-100">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Hay etapas de la vida en las que no se necesita prisa,<br />
              sino <strong>presencia</strong>.<br />
              No ruido, sino <strong>compañía</strong>.<br />
              No exigencias, sino <strong>cuidado</strong>.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Centro Vida nace de esa verdad profunda:<br />
              que <strong>envejecer no es apagarse,<br />
              es transformarse con dignidad</strong>.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Aquí, cada mañana comienza con un saludo sincero,<br />
              con un nombre dicho despacio,<br />
              con una mirada que reconoce la historia detrás del rostro.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary-100 via-primary-50 to-secondary rounded-2xl p-8 mb-16 text-center border border-primary-200">
          <p className="text-xl text-gray-800 leading-relaxed max-w-3xl mx-auto">
            Es un espacio seguro, cálido y estimulante,<br />
            donde tus seres queridos reciben <strong>atención cálida</strong><br />
            mientras tú continúas con tus responsabilidades,<br />
            con la tranquilidad de saber<br />
            que están <strong>cuidados…</strong><br />
            y <strong>acompañados</strong>.
          </p>
        </div>

        <div className="mb-16">
          <ServiceGallery
            title="🌼 Conoce Nuestras Instalaciones"
            description="Un recorrido por espacios que no son solo físicos, sino emocionales"
            images={centroVidaGallery}
            columns={4}
          />
        </div>

        <div className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center gap-3">
            <Heart className="text-primary-600 fill-primary-600" size={36} />
            Atención Personalizada
          </h2>
          <p className="text-center text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Porque cada persona es única<br />
            y merece un cuidado hecho a su medida
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="border-2 border-primary-200 hover:border-primary-400 transition-all hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Users className="text-primary-600 flex-shrink-0 mt-1" size={32} />
                  <div>
                    <h3 className="font-semibold text-xl text-gray-900 mb-2">Profesionales con experiencia</h3>
                    <p className="text-gray-600">Equipo especializado en geriatría y gerontología</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-primary-200 hover:border-primary-400 transition-all hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Activity className="text-primary-600 flex-shrink-0 mt-1" size={32} />
                  <div>
                    <h3 className="font-semibold text-xl text-gray-900 mb-2">Seguimiento continuo del estado de salud</h3>
                    <p className="text-gray-600">Aquí nadie es un número. Cada historia importa.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-16 bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-primary-100">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center flex items-center justify-center gap-3">
            <Sparkles className="text-primary-600" size={36} />
            Actividades Terapéuticas
          </h2>
          <p className="text-center text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Un programa diario que estimula sin agotar,<br />
            que acompaña sin imponer
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center border-2 hover:border-primary-300 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Activity className="text-primary-600" size={32} />
                </div>
                <CardTitle className="text-lg">Terapia ocupacional y fisioterapia</CardTitle>
              </CardHeader>
            </Card>
            <Card className="text-center border-2 hover:border-primary-300 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Brain className="text-primary-600" size={32} />
                </div>
                <CardTitle className="text-lg">Estimulación cognitiva y memoria</CardTitle>
              </CardHeader>
            </Card>
            <Card className="text-center border-2 hover:border-primary-300 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="text-primary-600" size={32} />
                </div>
                <CardTitle className="text-lg">Actividades recreativas y socialización</CardTitle>
              </CardHeader>
            </Card>
            <Card className="text-center border-2 hover:border-primary-300 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Music className="text-primary-600" size={32} />
                </div>
                <CardTitle className="text-lg">Musicoterapia y ejercicio adaptado</CardTitle>
              </CardHeader>
            </Card>
          </div>
          <p className="text-center text-lg text-gray-600 mt-8 italic">
            El cuerpo se mueve,<br />
            la mente se activa,<br />
            el corazón se siente acompañado.
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center flex items-center justify-center gap-3">
            <Home className="text-primary-600" size={36} />
            Planes Centro Vida – Cuidado Residencial
          </h2>
          <p className="text-center text-lg text-gray-600 mb-10 max-w-3xl mx-auto">
            Recibimos con los brazos abiertos<br />
            a personas maravillosas desde los 50 hasta los 100 años.<br />
            <strong>Un hogar donde convivir, florecer y vivir con dignidad.</strong>
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="border-2 border-primary-300 hover:border-primary-500 transition-all hover:shadow-xl">
              <CardHeader className="bg-gradient-to-br from-primary-50 to-secondary pb-8">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Heart className="text-primary-600 fill-primary-600" size={32} />
                </div>
                <CardTitle className="text-3xl text-center text-gray-900">Convivir y Florecer</CardTitle>
                <CardDescription className="text-center text-base text-gray-700 mt-2">
                  La alegría de compartir
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="mb-6">
                  <p className="text-gray-600 mb-2">Habitación compartida (2 personas), cómoda y acogedora</p>
                  <div className="text-center py-4">
                    <p className="text-4xl font-bold text-primary-600">$1.700.000</p>
                    <p className="text-gray-600">/ mes – Todo Incluido</p>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary-600 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">Atención profesional 24/7</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary-600 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">Nutrición completa (5 comidas diarias)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary-600 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">Hospedaje confortable</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary-600 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">Terapias físicas, cognitivas y ocupacionales</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary-600 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">Actividades recreativas diarias</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary-600 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">Comunidad, eventos y acompañamiento social</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary-600 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">Acompañamiento médico</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary-600 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">Bienestar espiritual y emocional</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary-600 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">Lavandería y comodidad total</span>
                  </div>
                </div>
                <Button 
                  className="w-full text-lg"
                  size="lg"
                  onClick={() => setPage('contact')}
                >
                  Seleccionar plan
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary-400 hover:border-primary-600 transition-all hover:shadow-xl relative">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-600 text-white px-4 py-1">
                Más Privacidad
              </Badge>
              <CardHeader className="bg-gradient-to-br from-primary-100 to-primary-200 pb-8">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Flower2 className="text-primary-600" size={32} />
                </div>
                <CardTitle className="text-3xl text-center text-gray-900">Privacidad y Armonía</CardTitle>
                <CardDescription className="text-center text-base text-gray-700 mt-2">
                  Su propio santuario personal
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="mb-6">
                  <p className="text-gray-600 mb-2">Habitación individual, íntima y tranquila</p>
                  <div className="text-center py-4">
                    <p className="text-4xl font-bold text-primary-600">$1.950.000</p>
                    <p className="text-gray-600">/ mes – Todo Incluido</p>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary-600 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">Atención profesional 24/7</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary-600 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">Nutrición completa (5 comidas diarias)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary-600 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">Hospedaje confortable</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary-600 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">Terapias y actividades personalizadas</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary-600 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">Comunidad y eventos</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary-600 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">Acompañamiento médico</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary-600 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">Bienestar espiritual y emocional</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary-600 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">Lavandería y comodidad total</span>
                  </div>
                </div>
                <Button 
                  className="w-full text-lg"
                  size="lg"
                  onClick={() => setPage('contact')}
                >
                  Seleccionar plan
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary-50 via-white to-primary-50 rounded-2xl p-8 md:p-12 mb-16 border-2 border-primary-200">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-6 flex items-center justify-center gap-2">
            <CheckCircle2 className="text-primary-600" size={28} />
            Siempre Incluido en Centro Vida
          </h3>
          <p className="text-center text-gray-600 mb-8 italic">
            Sin sorpresas.<br />
            Solo cuidado, comodidad y felicidad.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { icon: Activity, text: 'Atención profesional 24/7' },
              { icon: Utensils, text: 'Nutrición completa' },
              { icon: Home, text: 'Hospedaje confortable' },
              { icon: Sparkles, text: 'Terapias y actividades' },
              { icon: Users, text: 'Comunidad y eventos' },
              { icon: Heart, text: 'Acompañamiento médico' },
              { icon: Flower2, text: 'Bienestar espiritual y emocional' },
              { icon: CheckCircle2, text: 'Lavandería' }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-primary-100">
                <item.icon className="text-primary-600 flex-shrink-0" size={20} />
                <span className="text-sm text-gray-700">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-primary-600 text-white rounded-2xl p-8 md:p-12 text-center shadow-xl">
          <Sparkles className="mx-auto mb-6 text-white" size={48} />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Interesado en Nuestro Centro Vida?</h2>
          <p className="text-lg md:text-xl mb-2 text-primary-50 max-w-2xl mx-auto leading-relaxed">
            Agenda una visita guiada sin compromiso<br />
            y siente por ti mismo<br />
            la tranquilidad de saber<br />
            que aquí…
          </p>
          <p className="text-2xl font-bold mb-8 text-white">
            nadie envejece solo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              variant="secondary"
              onClick={() => setPage('contact')}
              className="text-lg px-8 bg-white text-primary-600 hover:bg-primary-50"
            >
              Agendar Visita
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => setPage('pricing')}
              className="text-lg px-8 bg-transparent text-white border-2 border-white hover:bg-white hover:text-primary-600"
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
