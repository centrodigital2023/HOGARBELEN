import { Heart, Users, Shield, Sparkles, Home, Target, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import imagenMision from '@/assets/images/IMG-20230519-WA0059.jpg';

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-white via-primary-50/30 to-white">
      {/* Hero Section */}
      <div className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-primary-400/10"></div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Hogar Belén
          </h1>
          <p className="text-2xl md:text-3xl text-primary-600 font-semibold mb-8 italic">
            Donde cada día es una invitación a vivir
          </p>
          
          <div className="prose prose-lg max-w-3xl mx-auto text-gray-700 space-y-6 text-left">
            <p className="text-xl leading-relaxed">
              Hay decisiones que no se toman con la cabeza,<br />
              sino con el pecho apretado<br />
              y el amor preguntando en silencio<br />
              si estamos haciendo lo correcto.
            </p>
            
            <p className="text-xl leading-relaxed">
              Nos enseñaron que la familia siempre cuida en casa.<br />
              Pero hay un momento —íntimo, profundo—<br />
              en el que entendemos que amar<br />
              también es saber pedir ayuda.
            </p>
            
            <p className="text-xl leading-relaxed font-semibold text-primary-700">
              Hogar Belén nace ahí.<br />
              En ese punto exacto donde el amor deja de resistirse<br />
              y aprende a confiar.
            </p>
            
            <p className="text-xl leading-relaxed">
              No somos solo un lugar.<br />
              Somos una forma de acompañar la vida<br />
              cuando el tiempo cambia de ritmo,<br />
              pero no de sentido.
            </p>
            
            <p className="text-2xl font-bold text-gray-900 text-center mt-8">
              Aquí, el cuidado no se delega.<br />
              Se abraza.
            </p>
          </div>
        </div>
      </div>

      {/* Por qué Hogar Belén */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
            ¿Por qué <span className="text-primary-600">Hogar Belén</span>?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 border-primary-200 hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-8">
                <Heart className="w-12 h-12 text-primary-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Porque elegirse también es un acto de amor
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Elegir Hogar Belén no es renunciar. Es liberar la culpa, soltar el miedo y transformar la preocupación constante en tranquilidad compartida.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-8">
                <Home className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Porque destruimos el mito del "ancianato"
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Hogar Belén es una finca de descanso en Buesaco, llena de luz, naturaleza y vida. Aquí no se espera el tiempo. Aquí se habita cada día.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-yellow-200 hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-8">
                <Sparkles className="w-12 h-12 text-yellow-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Porque la felicidad no tiene edad
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Una persona necesita lo mismo a cualquier edad:
                </p>
                <ul className="space-y-1 text-gray-600 text-sm">
                  <li>• Sentirse útil</li>
                  <li>• Ser escuchada</li>
                  <li>• Reír</li>
                  <li>• Aprender</li>
                  <li>• Pertenecer</li>
                  <li>• Amar y ser amada</li>
                </ul>
                <p className="text-gray-600 mt-4">Y eso es lo que cultivamos cada día.</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-8">
                <Users className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Porque cuidamos con ciencia y con alma
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Nuestro equipo está formado en atención integral del adulto mayor, guiado por protocolos, pero sostenido por la vocación.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-8">
                <Target className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Porque creemos en proyectos de vida, no en finales
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Aquí la vida no se apaga. Se transforma. Acompañamos a cada residente a seguir construyendo nuevas metas, relaciones y aprendizajes.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-teal-200 hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-8">
                <Shield className="w-12 h-12 text-teal-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Porque somos confianza
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Somos Sociedad BIC, supervisados y avalados por la Secretaría de Salud. Pero más allá de sellos, somos tranquilidad para las familias.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Misión y Historia */}
      <div className="py-20 bg-gradient-to-r from-primary-50 to-primary-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <BookOpen className="w-16 h-16 text-primary-600 mb-6" />
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Nuestra Misión</h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                Nacimos con el propósito de democratizar el acceso a cuidados de calidad para adultos mayores, empoderando a las familias con herramientas tecnológicas que no pierden el toque humano.
              </p>
            </div>
            <div className="relative">
              <img
                src={imagenMision}
                alt="Hogar Belén"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="md:order-2">
              <Heart className="w-16 h-16 text-primary-600 mb-6" />
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Nuestra Historia</h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  Hogar Belén nació de una necesidad real. La de una familia en Nariño que buscaba cuidado digno, confiable y humano para un ser querido.
                </p>
                <p>
                  Descubrimos que muchas familias vivían la misma inquietud: coordinar servicios, confiar en extraños, sentirse solos en el proceso.
                </p>
                <p className="font-semibold">
                  Hoy somos un ecosistema integral de cuidado: un Centro de Vida donde los adultos mayores disfrutan actividades terapéuticas diarias y una red verificada de profesionales de salud para acompañar también en casa.
                </p>
              </div>
            </div>
            <div className="md:order-1 relative">
              <img
                src={imagenMision}
                alt="Historia Hogar Belén"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Cifras */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-primary-600 mb-2">2022</div>
              <div className="text-gray-600 font-semibold">Año de Fundación</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary-600 mb-2">500+</div>
              <div className="text-gray-600 font-semibold">Familias Atendidas</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary-600 mb-2">98%</div>
              <div className="text-gray-600 font-semibold">Satisfacción</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary-600 mb-2">24/7</div>
              <div className="text-gray-600 font-semibold">Disponibilidad</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-4xl md:text-5xl font-bold mb-6">
            Hogar Belén
          </h3>
          <p className="text-2xl mb-8 italic opacity-90">
            Donde el amor se organiza, se profesionaliza<br />
            y nunca deja de ser amor.
          </p>
          <Button 
            size="lg"
            className="bg-white text-primary-600 hover:bg-gray-100 text-lg px-8"
            onClick={() => window.location.href = '/contact'}
          >
            Agenda tu visita. Ven a sentir la diferencia.
          </Button>
        </div>
      </div>
    </div>
  );
}
