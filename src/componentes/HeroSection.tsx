import Button from './ui/botón';
import { ArrowRight, Heart } from '@phosphor-icons/react';

interface HeroSectionProps {
  setPage: (page: string) => void;
}

const HeroSection = ({ setPage }: HeroSectionProps) => {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-accent/10 py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/40 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-primary-100">
            <Heart className="text-primary" weight="fill" size={20} />
            <span className="text-sm font-medium text-primary-700">Cuidado integral para tus seres queridos</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground max-w-4xl mx-auto leading-tight">
            Hogar <span className="text-primary">Belén</span>
            <br />
            <span className="text-3xl md:text-4xl lg:text-5xl text-muted-foreground font-normal mt-4 block">
              Centro de Vida y Profesionales de Salud
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Brindamos servicios integrales de cuidado para adultos mayores combinando nuestro Centro de Vida 
            con una red de profesionales especializados y tecnología de asistencia inteligente.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => setPage('register')}
              className="group"
            >
              Comenzar ahora
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setPage('services')}
            >
              Conocer servicios
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8 border-t border-border/50">
            <div>
              <div className="text-3xl font-bold text-primary">15+</div>
              <div className="text-sm text-muted-foreground">Años de experiencia</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Familias atendidas</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Profesionales</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
