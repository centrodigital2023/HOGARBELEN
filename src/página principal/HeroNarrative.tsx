import { Sparkles, Brain } from 'lucide-react';
import Button from '../componentes/ui/botón';
import Badge from '../componentes/ui/insignia';

interface HeroNarrativeProps {
  setPage: (page: string) => void;
}

const HeroNarrative = ({ setPage }: HeroNarrativeProps) => {
  return (
    <div className="relative bg-gradient-to-br from-primary-50 via-white to-blue-50 py-20 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2000")',
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="text-white">
          <Badge variant="ai" className="mb-4 bg-white/20 text-white border-white/30">
            <Sparkles size={12} className="inline mr-1"/> IA Integrada
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mt-4 mb-6 leading-tight">
            Encuentre el Lugar Soñado
          </h1>
          
          <p className="text-xl mb-6 leading-relaxed opacity-90">
            No es una residencia. Es un despertar. Una finca de descanso en el corazón de Buesaco 
            donde la vida no solo continúa, florece.
          </p>
          
          <div className="space-y-4 mb-8">
            <p className="text-lg opacity-80">
              Plazas limitadas para garantizar una experiencia exclusiva. 
              ¿Será su ser querido uno de los afortunados?
            </p>
            <p className="text-lg font-semibold opacity-90">
              Descubra por qué somos diferentes
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={() => setPage('dashboard-family')} 
              size="lg"
              className="px-8 py-4 text-lg bg-white text-gray-900 hover:bg-gray-100"
            >
              Buscar Profesional
            </Button>
            <Button 
              variant="ai" 
              onClick={() => setPage('ai-assistant')} 
              size="lg"
              className="px-8 py-4 text-lg font-bold"
            >
              <Brain className="mr-2"/> Asistente IA
            </Button>
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute -inset-4 bg-primary-200 rounded-full opacity-20 blur-3xl animate-pulse"></div>
          <img 
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800" 
            alt="Cuidado con amor" 
            className="relative rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroNarrative;
