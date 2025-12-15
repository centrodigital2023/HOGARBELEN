import { useState } from 'react';
import { Briefcase, TrendingUp, Calendar, DollarSign, Star, Shield, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FormularioRegistroProfesional from '../componentes/FormularioRegistroProfesional';

interface BelenConectaProfesionalesProps {
  setPage: (page: string) => void;
}

const BelenConectaProfesionales = ({ setPage }: BelenConectaProfesionalesProps) => {
  const [activeTab, setActiveTab] = useState('info');

  const benefits = [
    {
      icon: DollarSign,
      title: 'Aumenta tus Ingresos',
      description: 'Accede a más oportunidades laborales y gestiona múltiples clientes desde una plataforma.'
    },
    {
      icon: Calendar,
      title: 'Organiza tu Agenda',
      description: 'Gestiona tus citas, horarios y disponibilidad de forma fácil y eficiente.'
    },
    {
      icon: Shield,
      title: 'Perfil Verificado',
      description: 'Destaca con una insignia de verificación que genera confianza en las familias.'
    },
    {
      icon: Star,
      title: 'Construye tu Reputación',
      description: 'Recibe reseñas y calificaciones que aumentan tu visibilidad y credibilidad.'
    },
    {
      icon: Clock,
      title: 'Flexibilidad Total',
      description: 'Tú decides cuándo y dónde trabajar. Define tu propia disponibilidad.'
    },
    {
      icon: Users,
      title: 'Comunidad Profesional',
      description: 'Conéctate con otros profesionales, comparte experiencias y aprende.'
    }
  ];

  const steps = [
    {
      number: '1',
      title: 'Regístrate Gratis',
      description: 'Crea tu perfil profesional con tu experiencia, certificaciones y disponibilidad.'
    },
    {
      number: '2',
      title: 'Verificación',
      description: 'Completa el proceso de verificación de antecedentes y credenciales.'
    },
    {
      number: '3',
      title: 'Recibe Solicitudes',
      description: 'Las familias te contactarán directamente basándose en tu perfil.'
    },
    {
      number: '4',
      title: 'Trabaja y Crece',
      description: 'Gestiona tus servicios, recibe pagos y construye tu reputación.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Profesionales Activos' },
    { number: '95%', label: 'Satisfacción de Familias' },
    { number: '3,000+', label: 'Servicios Completados' },
    { number: '4.8/5', label: 'Calificación Promedio' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-6">
            <Briefcase className="text-primary-600" size={40} />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Belén Conecta <span className="text-primary-600">Para Profesionales</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Impulsa tu carrera profesional en el cuidado geriátrico. Conecta con familias 
            que necesitan tus servicios y gestiona todo desde una plataforma integral.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
            <TabsTrigger value="info" className="text-base">Información</TabsTrigger>
            <TabsTrigger value="register" className="text-base">Registrarse</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => setActiveTab('register')}
                className="text-lg px-8"
              >
                Únete Como Profesional
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => setPage('jobs')}
                className="text-lg px-8"
              >
                Ver Ofertas de Trabajo
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-6 text-center shadow-md border-2 border-primary-100">
                  <div className="text-4xl font-bold text-primary-600 mb-2">{stat.number}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
                Beneficios de Unirte a Nuestra Red
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => (
                  <Card key={index} className="border-2 hover:border-primary-300 transition-colors">
                    <CardHeader>
                      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                        <benefit.icon className="text-primary-600" size={28} />
                      </div>
                      <CardTitle className="text-xl">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base text-gray-600">
                        {benefit.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
                Cómo Empezar
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

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-primary-600 to-primary-700 text-white border-0">
                <CardHeader>
                  <TrendingUp className="mb-4" size={32} />
                  <CardTitle className="text-2xl text-white">Crece Profesionalmente</CardTitle>
                  <CardDescription className="text-base text-primary-100">
                    Accede a capacitaciones exclusivas, actualizaciones del sector y oportunidades de especialización.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-gradient-to-br from-primary-600 to-primary-700 text-white border-0">
                <CardHeader>
                  <Shield className="mb-4" size={32} />
                  <CardTitle className="text-2xl text-white">Trabajo Seguro</CardTitle>
                  <CardDescription className="text-base text-primary-100">
                    Sistema de pagos protegido, contratos claros y soporte dedicado para resolver cualquier inconveniente.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <div className="bg-primary-600 text-white rounded-2xl p-8 md:p-12 text-center">
              <Briefcase className="mx-auto mb-6" size={48} />
              <h2 className="text-3xl font-bold mb-4">¿Listo para Impulsar tu Carrera?</h2>
              <p className="text-lg mb-8 text-primary-100 max-w-2xl mx-auto">
                Únete a nuestra red de profesionales y comienza a conectar con familias hoy mismo.
              </p>
              <Button 
                size="lg"
                variant="secondary"
                onClick={() => setActiveTab('register')}
                className="text-lg px-8"
              >
                Crear Perfil Profesional
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="register">
            <FormularioRegistroProfesional onSuccess={() => {
              setActiveTab('info');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BelenConectaProfesionales;
