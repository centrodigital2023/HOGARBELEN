import { Home, Stethoscope, Heart, Users, Clock, Shield, Bell, Activity, Music, Utensils, Sprout } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import ServiceGallery from '../components/ServiceGallery';

export default function ServicesPage() {
  const serviceGalleries = {
    medicos: [
      {
        url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&auto=format&fit=crop',
        alt: 'Médico geriatra realizando consulta domiciliaria',
        caption: 'Atención médica especializada en la comodidad del hogar'
      },
      {
        url: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=800&auto=format&fit=crop',
        alt: 'Consulta médica personalizada',
        caption: 'Consultas personalizadas con médicos certificados'
      },
      {
        url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop',
        alt: 'Evaluación de signos vitales',
        caption: 'Monitoreo continuo de salud y bienestar'
      },
      {
        url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&auto=format&fit=crop',
        alt: 'Médico revisando historial clínico',
        caption: 'Expediente médico digital y actualizado'
      },
      {
        url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop',
        alt: 'Atención médica compasiva',
        caption: 'Cuidado médico con calidez humana'
      },
      {
        url: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&auto=format&fit=crop',
        alt: 'Médico especialista en geriatría',
        caption: 'Especialistas en el cuidado del adulto mayor'
      }
    ],
    enfermeria: [
      {
        url: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&auto=format&fit=crop',
        alt: 'Enfermera profesional brindando cuidados',
        caption: 'Cuidados de enfermería profesionales y compasivos'
      },
      {
        url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop',
        alt: 'Administración de medicamentos',
        caption: 'Administración segura de medicamentos'
      },
      {
        url: 'https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=800&auto=format&fit=crop',
        alt: 'Toma de signos vitales',
        caption: 'Monitoreo constante de signos vitales'
      },
      {
        url: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&auto=format&fit=crop',
        alt: 'Cuidados paliativos',
        caption: 'Cuidados paliativos especializados'
      },
      {
        url: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&auto=format&fit=crop',
        alt: 'Enfermería domiciliaria',
        caption: 'Servicios de enfermería en casa'
      },
      {
        url: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&auto=format&fit=crop',
        alt: 'Cuidado postoperatorio',
        caption: 'Recuperación asistida postoperatoria'
      }
    ],
    terapia: [
      {
        url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop',
        alt: 'Sesión de fisioterapia',
        caption: 'Fisioterapia personalizada para recuperación'
      },
      {
        url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&auto=format&fit=crop',
        alt: 'Terapia ocupacional',
        caption: 'Terapia ocupacional para independencia'
      },
      {
        url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop',
        alt: 'Ejercicios de rehabilitación',
        caption: 'Ejercicios adaptados de rehabilitación'
      },
      {
        url: 'https://images.unsplash.com/photo-1594737626072-90dc274bc2bd?w=800&auto=format&fit=crop',
        alt: 'Terapia respiratoria',
        caption: 'Terapia respiratoria especializada'
      },
      {
        url: 'https://images.unsplash.com/photo-1616391182219-e080b4d1043a?w=800&auto=format&fit=crop',
        alt: 'Fonoaudiología',
        caption: 'Fonoaudiología y terapia del lenguaje'
      },
      {
        url: 'https://images.unsplash.com/photo-1591343395902-bce8b1b49741?w=800&auto=format&fit=crop',
        alt: 'Terapia física',
        caption: 'Terapia física para movilidad'
      }
    ],
    cuidadores: [
      {
        url: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&auto=format&fit=crop',
        alt: 'Cuidador acompañando adulto mayor',
        caption: 'Acompañamiento cálido y profesional'
      },
      {
        url: 'https://images.unsplash.com/photo-1516733968668-dbdce39c4651?w=800&auto=format&fit=crop',
        alt: 'Cuidado personalizado',
        caption: 'Cuidado personalizado 24/7'
      },
      {
        url: 'https://images.unsplash.com/photo-1609188076864-c35269136896?w=800&auto=format&fit=crop',
        alt: 'Asistencia en actividades diarias',
        caption: 'Asistencia en actividades de la vida diaria'
      },
      {
        url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop',
        alt: 'Compañía y conversación',
        caption: 'Compañía significativa y conversación'
      },
      {
        url: 'https://images.unsplash.com/photo-1587850450970-61a7fc4f0c59?w=800&auto=format&fit=crop',
        alt: 'Cuidado especializado Alzheimer',
        caption: 'Cuidado especializado para Alzheimer'
      },
      {
        url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop',
        alt: 'Apoyo emocional',
        caption: 'Apoyo emocional y bienestar integral'
      }
    ],
    centroVida: [
      {
        url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop',
        alt: 'Instalaciones del Centro de Vida',
        caption: 'Espacios acogedores y seguros'
      },
      {
        url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop',
        alt: 'Áreas de recreación',
        caption: 'Áreas amplias para actividades recreativas'
      },
      {
        url: 'https://images.unsplash.com/photo-1599045118441-c8b9d0457db4?w=800&auto=format&fit=crop',
        alt: 'Actividades grupales',
        caption: 'Actividades sociales y recreativas'
      },
      {
        url: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=800&auto=format&fit=crop',
        alt: 'Comedor Centro de Vida',
        caption: 'Alimentación balanceada y nutritiva'
      },
      {
        url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&auto=format&fit=crop',
        alt: 'Huerta terapéutica',
        caption: 'Huerta terapéutica y conexión con la naturaleza'
      },
      {
        url: 'https://images.unsplash.com/photo-1574887427561-d3d5d58c9273?w=800&auto=format&fit=crop',
        alt: 'Sala de terapias',
        caption: 'Salas equipadas para terapias'
      },
      {
        url: 'https://images.unsplash.com/photo-1546953304-5d96f43c2e94?w=800&auto=format&fit=crop',
        alt: 'Musicoterapia',
        caption: 'Sesiones de musicoterapia'
      },
      {
        url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop',
        alt: 'Ejercicio adaptado',
        caption: 'Programas de ejercicio adaptado'
      }
    ],
    otros: [
      {
        url: 'https://images.unsplash.com/photo-1551135049-8a33b5883817?w=800&auto=format&fit=crop',
        alt: 'Consulta psicológica',
        caption: 'Apoyo psicológico profesional'
      },
      {
        url: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop',
        alt: 'Nutrición especializada',
        caption: 'Planes nutricionales personalizados'
      },
      {
        url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop',
        alt: 'Terapia psicológica',
        caption: 'Terapia individual y familiar'
      },
      {
        url: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop',
        alt: 'Evaluación nutricional',
        caption: 'Evaluaciones nutricionales completas'
      },
      {
        url: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=800&auto=format&fit=crop',
        alt: 'Trabajo social',
        caption: 'Apoyo en gestión de trámites y recursos'
      },
      {
        url: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=800&auto=format&fit=crop',
        alt: 'Servicios complementarios',
        caption: 'Servicios complementarios para bienestar integral'
      }
    ]
  };
  const servicePackages = [
    {
      name: 'Plan Básico Centro Vida',
      description: 'Servicios esenciales de centro de día',
      price: '$800.000/mes',
      features: [
        'Acceso al centro 5 días/semana',
        'Alimentación balanceada',
        'Actividades recreativas básicas',
        'Monitoreo de signos vitales',
        'Reportes semanales a familiares',
      ],
      icon: Home,
      popular: false,
    },
    {
      name: 'Plan Integral Conectado',
      description: 'Centro de vida + profesionales a domicilio',
      price: '$1.200.000/mes',
      features: [
        'Todo el Plan Básico',
        '4 visitas mensuales de enfermería',
        '2 consultas médicas a domicilio',
        'App familiar premium',
        'Alertas inteligentes',
        'Expediente digital',
      ],
      icon: Users,
      popular: true,
    },
    {
      name: 'Plan Premium Total',
      description: 'Ecosistema completo de cuidado',
      price: '$2.000.000/mes',
      features: [
        'Todo el Plan Integral',
        'Cuidador personalizado 8h/día',
        'Terapias especializadas',
        'Monitoreo 24/7 con sensores',
        'Asistente IA personal',
        'Coordinador de cuidado dedicado',
      ],
      icon: Shield,
      popular: false,
    },
  ];

  const additionalServices = [
    {
      name: 'Consultas Médicas Especializadas',
      description: 'Geriatra, cardiólogo, neurólogo a domicilio',
      price: '$80.000 - $150.000',
      icon: Stethoscope,
    },
    {
      name: 'Terapias de Rehabilitación',
      description: 'Fisioterapia, terapia ocupacional, fonoaudiología',
      price: '$60.000 - $100.000/sesión',
      icon: Heart,
    },
    {
      name: 'Cuidado Nocturno',
      description: 'Acompañamiento durante la noche',
      price: '$120.000/noche',
      icon: Clock,
    },
    {
      name: 'Emergencias Médicas',
      description: 'Respuesta inmediata 24/7',
      price: '$200.000/visita',
      icon: Bell,
    },
  ];

  const dayCarActivities = [
    { icon: Music, name: 'Musicoterapia', description: 'Estimulación cognitiva y emocional' },
    { icon: Utensils, name: 'Nutrición', description: 'Menús balanceados supervisados' },
    { icon: Sprout, name: 'Huerta Terapéutica', description: 'Conexión con la naturaleza' },
    { icon: Activity, name: 'Ejercicio Adaptado', description: 'Rutinas personalizadas' },
  ];

  return (
    <div className="min-h-screen bg-muted/50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Nuestros Servicios</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Ofrecemos soluciones integrales que combinan la calidez del cuidado humano con la eficiencia de la
            tecnología más avanzada.
          </p>
        </div>

        {/* Service Photo Galleries */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Galería de Servicios</h2>
          
          <Tabs defaultValue="centroVida" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-8 h-auto gap-2">
              <TabsTrigger value="centroVida" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Centro de Vida
              </TabsTrigger>
              <TabsTrigger value="medicos" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Médicos
              </TabsTrigger>
              <TabsTrigger value="enfermeria" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Enfermería
              </TabsTrigger>
              <TabsTrigger value="terapia" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Terapias
              </TabsTrigger>
              <TabsTrigger value="cuidadores" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Cuidadores
              </TabsTrigger>
              <TabsTrigger value="otros" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Otros
              </TabsTrigger>
            </TabsList>

            <TabsContent value="centroVida" className="space-y-8">
              <ServiceGallery
                title="Centro de Vida Hogar Belén"
                description="Un espacio donde la vida florece. Nuestro centro de día ofrece un ambiente acogedor y seguro con actividades diseñadas para el bienestar integral."
                images={serviceGalleries.centroVida}
                columns={4}
              />
            </TabsContent>

            <TabsContent value="medicos" className="space-y-8">
              <ServiceGallery
                title="Atención Médica Especializada"
                description="Médicos geriatras, internistas y especialistas certificados que brindan atención domiciliaria de calidad."
                images={serviceGalleries.medicos}
                columns={3}
              />
            </TabsContent>

            <TabsContent value="enfermeria" className="space-y-8">
              <ServiceGallery
                title="Servicios de Enfermería Profesional"
                description="Enfermeras certificadas brindando cuidados clínicos, paliativos y seguimiento médico continuo."
                images={serviceGalleries.enfermeria}
                columns={3}
              />
            </TabsContent>

            <TabsContent value="terapia" className="space-y-8">
              <ServiceGallery
                title="Terapias de Rehabilitación"
                description="Fisioterapia, terapia ocupacional, respiratoria y fonoaudiología personalizada para cada paciente."
                images={serviceGalleries.terapia}
                columns={3}
              />
            </TabsContent>

            <TabsContent value="cuidadores" className="space-y-8">
              <ServiceGallery
                title="Cuidadores Certificados"
                description="Cuidadores profesionales capacitados en el cuidado integral del adulto mayor, incluyendo casos especiales como Alzheimer."
                images={serviceGalleries.cuidadores}
                columns={3}
              />
            </TabsContent>

            <TabsContent value="otros" className="space-y-8">
              <ServiceGallery
                title="Servicios Complementarios"
                description="Psicología, nutrición, trabajo social y otros servicios para el bienestar integral."
                images={serviceGalleries.otros}
                columns={3}
              />
            </TabsContent>
          </Tabs>
        </section>

        {/* Day Care Activities */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Actividades del Centro de Vida</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dayCarActivities.map((activity, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                    <activity.icon size={24} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{activity.name}</h3>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Service Packages */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Planes de Servicio</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {servicePackages.map((pkg, index) => (
              <Card
                key={index}
                className={`relative transition-all duration-300 hover:shadow-xl ${
                  pkg.popular ? 'border-primary border-2 transform -translate-y-2' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">MÁS POPULAR</Badge>
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                      <pkg.icon size={24} />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{pkg.name}</CardTitle>
                      <CardDescription>{pkg.description}</CardDescription>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{pkg.price}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant={pkg.popular ? 'default' : 'outline'}>
                    Solicitar Información
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Additional Services */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Servicios Adicionales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                    <service.icon size={24} />
                  </div>
                  <h3 className="font-bold mb-2">{service.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                  <div className="text-primary font-bold">{service.price}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="pt-12 pb-12">
              <h2 className="text-3xl font-bold mb-4">¿No encuentras lo que necesitas?</h2>
              <p className="text-primary-foreground/90 mb-8 text-lg max-w-2xl mx-auto">
                Contáctanos para crear un plan personalizado adaptado a las necesidades específicas de tu ser
                querido.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="secondary" size="lg">
                  Agendar Evaluación
                </Button>
                <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                  Llamar Ahora
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
