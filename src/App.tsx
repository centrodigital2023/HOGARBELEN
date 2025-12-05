import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { 
  Phone, 
  Envelope, 
  MapPin, 
  Heart, 
  Users, 
  House,
  Sparkle,
  List
} from '@phosphor-icons/react'
import { toast } from 'sonner'
import { useKV } from '@github/spark/hooks'

interface Inquiry {
  id: number
  name: string
  email: string
  phone: string
  message: string
  date: string
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const kvResult = useKV<Inquiry[]>('contact-inquiries', [])
  const [, setInquiries] = kvResult || [[], () => {}]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Por favor complete todos los campos requeridos')
      return
    }

    const newInquiry: Inquiry = {
      ...formData,
      id: Date.now(),
      date: new Date().toISOString()
    }

    if (setInquiries) {
      setInquiries((current) => [...(current || []), newInquiry])
    }
    
    toast.success('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.')
    
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    })
  }

  const services = [
    {
      icon: <Heart weight="fill" className="w-10 h-10 text-primary" />,
      title: 'Cuidado Personalizado',
      description: 'Atención individualizada adaptada a las necesidades únicas de cada residente, con amor y profesionalismo.'
    },
    {
      icon: <Users weight="fill" className="w-10 h-10 text-primary" />,
      title: 'Actividades Sociales',
      description: 'Programas recreativos y sociales que fomentan la comunidad, la amistad y el bienestar emocional.'
    },
    {
      icon: <House weight="fill" className="w-10 h-10 text-primary" />,
      title: 'Instalaciones Modernas',
      description: 'Espacios cómodos y seguros diseñados para sentirse como en casa, con todas las comodidades necesarias.'
    },
    {
      icon: <Sparkle weight="fill" className="w-10 h-10 text-primary" />,
      title: 'Atención Médica',
      description: 'Personal de salud capacitado disponible para garantizar el bienestar físico de nuestros residentes.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart weight="fill" className="w-8 h-8 text-primary" />
            <span className="font-heading font-bold text-2xl text-foreground">Hogar Belén</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('inicio')} 
              className="text-foreground hover:text-primary transition-colors"
            >
              Inicio
            </button>
            <button 
              onClick={() => scrollToSection('nosotros')} 
              className="text-foreground hover:text-primary transition-colors"
            >
              Nosotros
            </button>
            <button 
              onClick={() => scrollToSection('servicios')} 
              className="text-foreground hover:text-primary transition-colors"
            >
              Servicios
            </button>
            <button 
              onClick={() => scrollToSection('contacto')} 
              className="text-foreground hover:text-primary transition-colors"
            >
              Contacto
            </button>
          </div>

          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <List className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col gap-6 mt-8">
                  <button 
                    onClick={() => scrollToSection('inicio')} 
                    className="text-lg text-left text-foreground hover:text-primary transition-colors"
                  >
                    Inicio
                  </button>
                  <button 
                    onClick={() => scrollToSection('nosotros')} 
                    className="text-lg text-left text-foreground hover:text-primary transition-colors"
                  >
                    Nosotros
                  </button>
                  <button 
                    onClick={() => scrollToSection('servicios')} 
                    className="text-lg text-left text-foreground hover:text-primary transition-colors"
                  >
                    Servicios
                  </button>
                  <button 
                    onClick={() => scrollToSection('contacto')} 
                    className="text-lg text-left text-foreground hover:text-primary transition-colors"
                  >
                    Contacto
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>

      <main className="pt-16">
        <section 
          id="inicio" 
          className="relative min-h-[600px] flex items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, oklch(0.85 0.08 150) 0%, oklch(0.78 0.14 75) 100%)',
          }}
        >
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, currentColor 35px, currentColor 70px)',
            color: 'oklch(1 0 0)'
          }} />
          
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-white mb-6 animate-fade-in-up">
              Un Hogar con Corazón
            </h1>
            <p className="text-xl md:text-2xl text-white/95 mb-8 font-light animate-fade-in-up animation-delay-200">
              Brindamos cuidado, compañía y calidez a nuestros residentes, creando un ambiente donde cada persona es valorada y respetada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 font-medium text-lg px-8"
                onClick={() => scrollToSection('contacto')}
              >
                Contáctanos
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium text-lg px-8"
                onClick={() => scrollToSection('servicios')}
              >
                Conocer Más
              </Button>
            </div>
          </div>
        </section>

        <section id="nosotros" className="py-16 lg:py-24 bg-card">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-foreground mb-6">Sobre Nosotros</h2>
              <Separator className="w-24 h-1 bg-primary mx-auto mb-8" />
              <p className="text-lg text-muted-foreground leading-relaxed">
                Hogar Belén es más que un lugar de residencia; es una familia. Fundado con la misión de proporcionar cuidado de calidad en un ambiente cálido y acogedor, nos dedicamos a mejorar la calidad de vida de cada uno de nuestros residentes.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <Card className="p-8 text-center border-2 hover:border-primary transition-all duration-300 hover:shadow-lg">
                <Heart weight="fill" className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="mb-3">Nuestra Misión</h3>
                <p className="text-muted-foreground">
                  Proporcionar cuidado excepcional y compasivo que honre la dignidad y promueva el bienestar de cada residente.
                </p>
              </Card>

              <Card className="p-8 text-center border-2 hover:border-primary transition-all duration-300 hover:shadow-lg">
                <Users weight="fill" className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="mb-3">Nuestra Comunidad</h3>
                <p className="text-muted-foreground">
                  Un ambiente familiar donde se fomentan las relaciones significativas y cada persona es valorada.
                </p>
              </Card>

              <Card className="p-8 text-center border-2 hover:border-primary transition-all duration-300 hover:shadow-lg">
                <Sparkle weight="fill" className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="mb-3">Nuestros Valores</h3>
                <p className="text-muted-foreground">
                  Respeto, compasión, excelencia y compromiso guían todo lo que hacemos cada día.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section id="servicios" className="py-16 lg:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-foreground mb-6">Nuestros Servicios</h2>
              <Separator className="w-24 h-1 bg-primary mx-auto mb-8" />
              <p className="text-lg text-muted-foreground">
                Ofrecemos una gama completa de servicios diseñados para satisfacer las necesidades físicas, emocionales y sociales de nuestros residentes.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <Card 
                  key={index}
                  className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary"
                >
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="mb-3 text-xl">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </Card>
              ))}
            </div>

            <div className="mt-16 bg-primary/10 rounded-2xl p-8 md:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <h3 className="mb-4 text-primary">Servicios Adicionales</h3>
                <div className="grid md:grid-cols-2 gap-4 text-left">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <p className="text-foreground">Nutrición balanceada y personalizada</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <p className="text-foreground">Terapia ocupacional y física</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <p className="text-foreground">Transporte para citas médicas</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <p className="text-foreground">Actividades recreativas diarias</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <p className="text-foreground">Asistencia con higiene personal</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <p className="text-foreground">Apoyo emocional y espiritual</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contacto" className="py-16 lg:py-24 bg-card">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-foreground mb-6">Contáctanos</h2>
              <Separator className="w-24 h-1 bg-primary mx-auto mb-8" />
              <p className="text-lg text-muted-foreground">
                Estamos aquí para responder tus preguntas y ayudarte a encontrar la mejor opción de cuidado para tu ser querido.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <Card className="p-6 border-2 hover:border-primary transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Phone weight="fill" className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg mb-2">Teléfono</h3>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                      <p className="text-sm text-muted-foreground mt-1">Lun - Vie: 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-2 hover:border-primary transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Envelope weight="fill" className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg mb-2">Email</h3>
                      <p className="text-muted-foreground">info@hogarbelen.com</p>
                      <p className="text-sm text-muted-foreground mt-1">Respuesta en 24 horas</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-2 hover:border-primary transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <MapPin weight="fill" className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg mb-2">Dirección</h3>
                      <p className="text-muted-foreground">
                        123 Calle Principal<br />
                        Ciudad, Estado 12345
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="p-8 border-2">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Nombre Completo *
                    </label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Tu nombre"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="tu@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Teléfono
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Mensaje *
                    </label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Cuéntanos cómo podemos ayudarte..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Enviar Mensaje
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart weight="fill" className="w-6 h-6 text-primary" />
                <span className="font-heading font-bold text-xl">Hogar Belén</span>
              </div>
              <p className="text-background/80 text-sm">
                Un hogar con corazón, donde cada residente es parte de nuestra familia.
              </p>
            </div>

            <div>
              <h3 className="font-heading font-semibold text-lg mb-4">Enlaces Rápidos</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => scrollToSection('inicio')} 
                  className="block text-background/80 hover:text-primary transition-colors text-sm"
                >
                  Inicio
                </button>
                <button 
                  onClick={() => scrollToSection('nosotros')} 
                  className="block text-background/80 hover:text-primary transition-colors text-sm"
                >
                  Nosotros
                </button>
                <button 
                  onClick={() => scrollToSection('servicios')} 
                  className="block text-background/80 hover:text-primary transition-colors text-sm"
                >
                  Servicios
                </button>
                <button 
                  onClick={() => scrollToSection('contacto')} 
                  className="block text-background/80 hover:text-primary transition-colors text-sm"
                >
                  Contacto
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-heading font-semibold text-lg mb-4">Horarios</h3>
              <div className="space-y-2 text-sm text-background/80">
                <p>Lunes - Viernes: 9:00 AM - 6:00 PM</p>
                <p>Sábado: 10:00 AM - 4:00 PM</p>
                <p>Domingo: Cerrado</p>
                <p className="mt-4 text-primary">Visitas con cita previa</p>
              </div>
            </div>
          </div>

          <Separator className="bg-background/20 mb-8" />

          <div className="text-center text-sm text-background/60">
            <p>&copy; {new Date().getFullYear()} Hogar Belén. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App