import { Heart, Home, Smartphone, Users, Sun, Coffee, Smile, Mountain, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ServiciosIntegralesProps {
  setPage: (page: string) => void;
}

const ServiciosIntegrales = ({ setPage }: ServiciosIntegralesProps) => {
  const serviciosPrincipales = [
    {
      titulo: 'Cuidado Residencial',
      subtitulo: 'Un hogar lleno de vida y seguridad',
      descripcion: 'Nuestro hogar ofrece un ambiente cálido y seguro donde cada residente recibe atención personalizada las 24 horas del día. Combinamos cuidado médico profesional con la calidez de un verdadero hogar, en un entorno que inspira alegría y tranquilidad.',
      imagen: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
      beneficios: [
        'Cuidado de enfermería 24 horas 7 días de la semana',
        'Alimentación balanceada y personalizada',
        'Actividades recreativas y terapéuticas',
        'Fisioterapia y rehabilitación',
        'Acompañamiento psicológico',
        'Ambiente familiar y acogedor'
      ],
      extras: [
        { icon: Home, texto: 'Hospedaje Confortable', descripcion: 'Su espacio para sentirse en casa.' },
        { icon: Heart, texto: 'Nutrición Deliciosa', descripcion: '5 comidas al día que nutren cuerpo y alma.' },
        { icon: Users, texto: 'Personal 24/7', descripcion: 'Cuidado con calidez humana.' },
        { icon: Sparkles, texto: 'Acompañamiento Médico', descripcion: 'Sin estrés por las citas.' },
        { icon: Heart, texto: 'Terapias Vitalizantes', descripcion: 'Movilidad e independencia.' },
        { icon: Sun, texto: 'Celebración Diaria', descripcion: 'La alegría es nuestra rutina.' },
        { icon: Mountain, texto: 'Espacios terapéuticos', descripcion: 'Conexión con la naturaleza y la creatividad.' },
        { icon: Heart, texto: 'Apoyo emocional', descripcion: 'Un oído siempre dispuesto a escuchar.' },
        { icon: Sparkles, texto: 'Bienestar espiritual', descripcion: 'Paz para el alma.' },
        { icon: Home, texto: 'Lavandería incluida', descripcion: 'Olvídese de las preocupaciones.' }
      ],
      color: 'from-emerald-500 to-teal-600'
    },
    {
      titulo: 'Plan Dulce Hogar',
      subtitulo: 'Cuidado experto en su propio espacio',
      descripcion: 'Llevamos nuestro cuidado profesional y nuestra calidez directamente a la comodidad de su hogar. Nuestros cuidadores certificados brindan atención personalizada, permitiendo que sus seres queridos mantengan su independencia y rutina en un entorno familiar.',
      imagen: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&q=80&w=800',
      beneficios: [
        'Cuidadores certificados y de confianza',
        'Atención personalizada en casa',
        'Horarios flexibles adaptados a usted',
        'Seguimiento médico continuo',
        'Apoyo en actividades diarias',
        'Compañía y fomento del bienestar emocional'
      ],
      color: 'from-amber-500 to-orange-600'
    },
    {
      titulo: 'Belén Conecta',
      subtitulo: 'La Tecnología al Servicio del Cuidado',
      descripcion: 'Nuestra plataforma digital revoluciona la forma de encontrar cuidadores especializados. Conectamos familias con profesionales verificados, garantizando calidad y confianza en cada servicio.',
      imagen: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
      caracteristicas: [
        { titulo: 'Perfiles Verificados', descripcion: 'Profesionales cualificados y de confianza.' },
        { titulo: 'Calificaciones y Reseñas', descripcion: 'Transparencia y fiabilidad en cada elección.' },
        { titulo: 'Búsqueda Personalizada', descripcion: 'Por especialidad y ubicación, cerca de usted.' },
        { titulo: 'Comunicación Segura', descripcion: 'Directa y protegida con cada cuidador.' },
        { titulo: 'Gestión Fácil', descripcion: 'Organice citas y servicios sin complicaciones.' },
        { titulo: 'Soporte 24/7', descripcion: 'Siempre a su disposición para cualquier consulta.' }
      ],
      color: 'from-violet-500 to-purple-600'
    }
  ];

  const programasEspeciales = [
    {
      titulo: 'Plan Amigos',
      descripcion: 'Actividades lúdicas y estimulantes para abuelos que buscan alegría y compañía.',
      icon: Users,
      imagen: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&q=80&w=400'
    },
    {
      titulo: 'Plan en mi Casa',
      descripcion: 'Equipo de enfermería y asistencia personal 24/7 en la comodidad de su hogar.',
      icon: Home,
      imagen: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400'
    },
    {
      titulo: 'Plan Sol y Café',
      descripcion: 'Hospédese en fincas tradicionales de Buesaco y disfrute la cultura local.',
      icon: Coffee,
      imagen: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=400'
    },
    {
      titulo: 'Plan Sonreír',
      descripcion: 'Celebraciones seguras y memorables para cumpleaños, aniversarios y encuentros familiares.',
      icon: Smile,
      imagen: 'https://images.unsplash.com/photo-1530268729831-4b0b9e170218?auto=format&fit=crop&q=80&w=400'
    },
    {
      titulo: 'Plan Turismo Rural',
      descripcion: 'Salidas ecológicas, zooterapia, historia, espiritualidad y conexión con la naturaleza.',
      icon: Mountain,
      imagen: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&q=80&w=400'
    }
  ];

  return (
    <div className="bg-gradient-to-b from-white via-primary-50/30 to-white">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <Badge className="mb-4 bg-primary-500 text-white border-primary-600 text-base px-6 py-2">
          Soluciones Integrales de Cuidado
        </Badge>
        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Descubra la excelencia en cuidados para la tercera edad con{' '}
          <span className="text-primary-600">Hogar Belén</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Soluciones integrales de cuidado diseñadas con amor, profesionalismo y tecnología de vanguardia para sus seres queridos.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button size="lg" onClick={() => setPage('contact')} className="text-lg px-8">
            Solicitar Información
          </Button>
          <Button size="lg" variant="outline" onClick={() => setPage('pricing')} className="text-lg px-8">
            Conocer Precios
          </Button>
        </div>
      </div>

      {/* Servicios Principales */}
      {serviciosPrincipales.map((servicio, index) => (
        <div key={index} className={`py-20 ${index % 2 === 1 ? 'bg-gray-50' : ''}`}>
          <div className="max-w-7xl mx-auto px-4">
            <div className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                <Badge className={`mb-4 bg-gradient-to-r ${servicio.color} text-white border-0`}>
                  Servicio Premium
                </Badge>
                <h3 className="text-4xl font-bold text-gray-900 mb-4">{servicio.titulo}</h3>
                <p className="text-xl text-primary-600 font-semibold mb-6">{servicio.subtitulo}</p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">{servicio.descripcion}</p>
                
                {servicio.beneficios && (
                  <div className="space-y-3 mb-8">
                    {servicio.beneficios.map((beneficio, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${servicio.color} flex items-center justify-center flex-shrink-0 mt-1`}>
                          <span className="text-white text-sm">✓</span>
                        </div>
                        <span className="text-gray-700">{beneficio}</span>
                      </div>
                    ))}
                  </div>
                )}

                {servicio.caracteristicas && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {servicio.caracteristicas.map((car, idx) => (
                      <Card key={idx} className="border-primary-200 hover:shadow-lg transition-shadow">
                        <CardContent className="p-4">
                          <h4 className="font-bold text-gray-900 mb-1">{car.titulo}</h4>
                          <p className="text-sm text-gray-600">{car.descripcion}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {index === 0 && servicio.extras && (
                  <div className="mt-12 p-8 bg-white rounded-2xl shadow-xl border-2 border-primary-200">
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">
                      "Todo Incluido" para una Vida Plena
                    </h4>
                    <p className="text-gray-600 mb-6">
                      Nuestra promesa es simple: una vida sin preocupaciones donde cada necesidad está cubierta con amor y profesionalismo.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {servicio.extras.map((extra, idx) => {
                        const Icon = extra.icon;
                        return (
                          <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-primary-50 transition-colors">
                            <Icon className="w-5 h-5 text-primary-600 flex-shrink-0 mt-1" />
                            <div>
                              <h5 className="font-semibold text-gray-900 text-sm">{extra.texto}</h5>
                              <p className="text-xs text-gray-600">{extra.descripcion}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <Button 
                  size="lg" 
                  onClick={() => setPage('belen-familias')} 
                  className={`mt-8 bg-gradient-to-r ${servicio.color} text-white text-lg px-8`}
                >
                  {index === 2 ? 'Acceder a la Plataforma' : 'Más Información'}
                </Button>
              </div>
              
              <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                <div className="relative group">
                  <div className={`absolute -inset-4 bg-gradient-to-r ${servicio.color} rounded-3xl opacity-20 blur-2xl group-hover:opacity-30 transition-opacity`}></div>
                  <img
                    src={servicio.imagen}
                    alt={servicio.titulo}
                    className="relative rounded-2xl shadow-2xl w-full h-[500px] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Programas Especiales */}
      <div className="py-20 bg-gradient-to-br from-primary-100 via-white to-primary-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary-500 text-white border-primary-600 text-base px-6 py-2">
              Más que Cuidado
            </Badge>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Programas de vida activa y saludable
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experiencias diseñadas para enriquecer cada día con alegría, conexión y bienestar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {programasEspeciales.map((programa, idx) => {
              const Icon = programa.icon;
              return (
                <Card key={idx} className="overflow-hidden hover:shadow-2xl transition-all duration-300 group border-2 border-transparent hover:border-primary-300">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={programa.imagen} 
                      alt={programa.titulo}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">{programa.titulo}</h4>
                    <p className="text-gray-600">{programa.descripcion}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Planes Especiales Detallados */}
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <Card className="overflow-hidden border-2 border-yellow-300 hover:shadow-2xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Smile className="w-12 h-12 text-yellow-600" />
                  <h4 className="text-2xl font-bold text-gray-900">Plan Sonreír: Celebraciones Inolvidables</h4>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  En Belén, cada ocasión especial se convierte en un recuerdo precioso. Nuestro equipo se encarga de cada detalle para garantizar que su celebración sea amena, agradable, divertida y segura. Perfecto para cumpleaños, aniversarios y reuniones que unen a la familia.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-2 border-green-300 hover:shadow-2xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Mountain className="w-12 h-12 text-green-600" />
                  <h4 className="text-2xl font-bold text-gray-900">Plan Turismo Rural: Conecte con la Naturaleza</h4>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Sumérjase en la serenidad del campo con nuestro Plan Turismo Rural. Desde salidas ecológicas hasta zooterapia y recorridos por la rica historia colonial, cada actividad es una invitación a conectarse con la naturaleza, los animales y su propia espiritualidad.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Call to Action Final */}
      <div className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-4xl md:text-5xl font-bold mb-6">
            Atención médica y asistencia personalizada
          </h3>
          <p className="text-xl mb-8 leading-relaxed opacity-90">
            En el Hogar Belén, entendemos el valor incalculable que nuestros mayores han aportado a nuestras vidas. Nos comprometemos a retribuirles con amor y dedicación a un precio que refleja no solo nuestra gratitud, sino también nuestro entendimiento de la economía actual. Comparado con la suma de costos individuales, el Hogar Belén no solo es una opción económica, sino también la elección más completa y cariñosa.
          </p>
          <h4 className="text-3xl font-bold mb-8">
            ¡En el Hogar Belén cada día es una celebración de la vida!
          </h4>
          <p className="text-2xl mb-8 font-semibold">
            Descubra cómo podemos brindarle el cuidado que su ser querido merece
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => setPage('contact')}
              className="bg-white text-primary-600 hover:bg-gray-100 text-lg px-8"
            >
              Agendar Visita
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => window.location.href = 'tel:+573001234567'}
              className="border-2 border-white text-white hover:bg-white/10 text-lg px-8"
            >
              Llamar Ahora
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiciosIntegrales;
