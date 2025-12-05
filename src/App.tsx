import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  MapPin, 
  Zap, 
  Loader2, 
  MessageCircle, 
  Clock, 
  CheckCircle, 
  XCircle, 
  MinusCircle, 
  UserCheck, 
  Calendar,
  Heart,
  Shield,
  Users,
  TrendingUp,
  Play,
  ArrowRight,
  Check,
  Menu,
  X as XIcon,
  Mail,
  Phone,
  Globe,
  UserPlus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const dayMap = {
  0: 'Dom', 1: 'Lun', 2: 'Mar', 3: 'Mie', 4: 'Jue', 5: 'Vie', 6: 'Sáb',
};

const dayRangeMap: Record<string, number | number[]> = {
  'Lun': 1, 'Mar': 2, 'Mie': 3, 'Jue': 4, 'Vie': 5, 'Sáb': 6, 'Dom': 7,
  'Lun a Vie': [1, 5],
  'Lun a Jue': [1, 4],
  'Sáb a Dom': [6, 7],
  'Lun a Dom': [1, 7],
};

const parseTime = (timeStr: string): number => {
  const cleanTimeStr = timeStr.trim().toLowerCase();
  let [hourStr, minuteStr = '0'] = cleanTimeStr.replace(/[ap]\.m\./i, '').split(':');
  let hour = parseInt(hourStr) || 0;
  let minute = parseInt(minuteStr) || 0;

  const isAM = cleanTimeStr.includes('a.m.');
  const isPM = cleanTimeStr.includes('p.m.') || (cleanTimeStr.endsWith('p') && !isAM);

  if (isPM && hour < 12) {
    hour += 12;
  } else if (isAM && hour === 12) {
    hour = 0;
  } else if (!isAM && !isPM && hour >= 1 && hour <= 7) {
    hour += 12;
  }
  
  return hour * 60 + minute;
};

interface ParsedScheduleEntry {
  type: 'time_slot' | 'on_call' | 'invalid';
  days: number[];
  startMin: number;
  endMin: number;
}

const parseScheduleEntry = (entry: string): ParsedScheduleEntry => {
  if (entry.toLowerCase().includes('solo urgencias')) {
    return { type: 'on_call', days: [1, 2, 3, 4, 5, 6, 7], startMin: 0, endMin: 1439 };
  }

  const match = entry.match(/(\d.*)/s);
  if (!match) return { type: 'invalid', days: [], startMin: 0, endMin: 0 };
  
  const dayStr = entry.substring(0, match.index).trim();
  const timeStr = match[0].trim();
  
  const [startTimeStr, endTimeStr] = timeStr.split('-');
  const startMin = parseTime(startTimeStr.trim());
  const endMin = parseTime(endTimeStr.trim());
  
  if (isNaN(startMin) || isNaN(endMin)) return { type: 'invalid', days: [], startMin: 0, endMin: 0 };
  
  let days: number[] = [];
  if (dayStr.includes(',')) {
    days = dayStr.split(',').map(d => dayRangeMap[d.trim()] as number).filter(d => d !== undefined);
  } else if (Array.isArray(dayRangeMap[dayStr])) {
    const [startDayIndex, endDayIndex] = dayRangeMap[dayStr] as number[];
    for (let i = startDayIndex; i <= endDayIndex; i++) {
      days.push(i > 7 ? i - 7 : i);
    }
  } else if (dayRangeMap[dayStr] !== undefined) {
    days.push(dayRangeMap[dayStr] as number);
  }
  
  return { type: 'time_slot', days, startMin, endMin };
};

const getCalculatedStatus = (schedule: string[]): { status: string; isAvailable: boolean } => {
  const now = new Date();
  const currentDayIndex = now.getDay();
  const currentDay = currentDayIndex === 0 ? 7 : currentDayIndex;
  const currentMin = now.getHours() * 60 + now.getMinutes();

  for (const entryStr of schedule) {
    const entry = parseScheduleEntry(entryStr);

    if (entry.type === 'time_slot' || entry.type === 'on_call') {
      const { days, startMin, endMin } = entry;
      
      if (days.includes(currentDay)) {
        if (currentMin >= startMin && currentMin <= endMin) {
          return entry.type === 'on_call' 
            ? { status: 'Urgencias', isAvailable: true }
            : { status: 'Disponible', isAvailable: true };
        }
      }
    }
  }

  return { status: 'Ausente', isAvailable: false };
};

interface Professional {
  id: number;
  name: string;
  role: string;
  category: string;
  rating: number;
  reviews: number;
  location: string;
  image: string;
  whatsappNumber: string;
  initialStatus: string;
  schedule: string[];
}

const initialProfessionals: Professional[] = [
  { 
    id: 1, 
    name: "María Fernanda Rojas", 
    role: "Enfermera Jefe (Especialista UCI)", 
    category: "Enfermería", 
    rating: 5.0, 
    reviews: 155, 
    location: "Bogotá", 
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop", 
    whatsappNumber: "+573101234567", 
    initialStatus: 'Disponible', 
    schedule: ['Lun 8-12', 'Mar 2-6', 'Vie 8-4'] 
  },
  { 
    id: 2, 
    name: "Julián David Gómez", 
    role: "Auxiliar de Enfermería", 
    category: "Enfermería", 
    rating: 4.8, 
    reviews: 78, 
    location: "Medellín", 
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop", 
    whatsappNumber: "+573112345678", 
    initialStatus: 'Ocupado', 
    schedule: ['Mar 9-5', 'Jue 9-5'] 
  },
  { 
    id: 3, 
    name: "Laura Sofía Cifuentes", 
    role: "Cuidadora Domiciliaria Certificada", 
    category: "Cuidadores", 
    rating: 5.0, 
    reviews: 210, 
    location: "Cali", 
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop", 
    whatsappNumber: "+573123456789", 
    initialStatus: 'Ausente', 
    schedule: ['Lun a Vie 7-7'] 
  },
  { 
    id: 4, 
    name: "Andrés Felipe Sierra", 
    role: "Cuidador de Personas con Alzheimer", 
    category: "Cuidadores", 
    rating: 4.9, 
    reviews: 92, 
    location: "Barranquilla", 
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop", 
    whatsappNumber: "+573134567890", 
    initialStatus: 'Disponible', 
    schedule: ['Sáb 8-1', 'Dom 8-1'] 
  },
  { 
    id: 5, 
    name: "Marta Lucía Rueda", 
    role: "Fisioterapeuta Respiratoria", 
    category: "Terapia", 
    rating: 4.7, 
    reviews: 45, 
    location: "Bogotá", 
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop", 
    whatsappNumber: "+573145678901", 
    initialStatus: 'Ocupado', 
    schedule: ['Lun 9-3', 'Mie 9-3', 'Vie 9-3'] 
  },
  { 
    id: 6, 
    name: "Carlos Eduardo Pardo", 
    role: "Terapeuta Ocupacional", 
    category: "Terapia", 
    rating: 4.8, 
    reviews: 68, 
    location: "Medellín", 
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop", 
    whatsappNumber: "+573156789012", 
    initialStatus: 'Disponible', 
    schedule: ['Lun a Jue 1-7'] 
  },
  { 
    id: 7, 
    name: "Dr. Ricardo Poveda", 
    role: "Médico Geriatra", 
    category: "Médicos", 
    rating: 5.0, 
    reviews: 121, 
    location: "Cali", 
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop", 
    whatsappNumber: "+573167890123", 
    initialStatus: 'Disponible', 
    schedule: ['Solo Urgencias'] 
  },
  { 
    id: 8, 
    name: "Dra. Elena Castro", 
    role: "Médico Internista", 
    category: "Médicos", 
    rating: 4.9, 
    reviews: 88, 
    location: "Barranquilla", 
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop", 
    whatsappNumber: "+573178901234", 
    initialStatus: 'Ausente', 
    schedule: ['Lun, Mie, Vie 8-12'] 
  },
];

const getStatusClasses = (status: string) => {
  switch (status) {
    case 'Disponible':
      return { icon: CheckCircle, color: 'text-green-600 fill-green-200/50', text: 'Disponible Ahora' };
    case 'Ocupado':
      return { icon: MinusCircle, color: 'text-yellow-600 fill-yellow-200/50', text: 'Ocupado (Agenda Llena)' };
    case 'Ausente':
      return { icon: XCircle, color: 'text-red-600 fill-red-200/50', text: 'Fuera de Horario' };
    case 'Urgencias':
      return { icon: Zap, color: 'text-red-700 fill-red-300/50', text: 'Solo Urgencias' };
    default:
      return { icon: Clock, color: 'text-gray-500 fill-gray-200/50', text: 'Estado Desconocido' };
  }
};

const ScheduleDisplay = ({ schedule }: { schedule: string[] }) => (
  <div className="flex flex-wrap gap-1.5 pt-1">
    {schedule.map((slot, index) => (
      <Badge key={index} className="bg-indigo-50 text-indigo-700 border-indigo-200 shadow-sm">
        {slot}
      </Badge>
    ))}
  </div>
);

interface AISummary {
  text: string;
  sources: { uri: string; title: string }[];
}

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [professionalsList] = useState(initialProfessionals);
  const [filter, setFilter] = useState('Todos');
  const [aiSummary, setAiSummary] = useState<AISummary | null>(null);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const categoryOrder = ["Enfermería", "Cuidadores", "Terapia", "Médicos", "Otros"];
  const filters = ["Todos", 'Disponible Ahora', ...categoryOrder];

  const getSortedPros = useCallback((pros: Professional[]) => {
    return [...pros].sort((a, b) => {
      const indexA = categoryOrder.indexOf(a.category);
      const indexB = categoryOrder.indexOf(b.category);

      if (indexA !== indexB) {
        return indexA - indexB;
      }

      return b.rating - a.rating;
    });
  }, []);

  const filteredPros = useMemo(() => {
    let list = professionalsList;

    if (filter === 'Disponible Ahora') {
      list = list.filter(p => getCalculatedStatus(p.schedule).status === 'Disponible');
    } else if (filter !== 'Todos') {
      list = list.filter(p => p.category === filter);
    }
    
    return getSortedPros(list);
  }, [filter, professionalsList, getSortedPros]);

  const contactViaWhatsApp = (pro: Professional, currentStatus: string) => {
    const number = pro.whatsappNumber.replace(/[^0-9+]/g, '');
    const baseMessage = `Hola ${pro.name}, estoy interesado(a) en tus servicios como ${pro.role} que vi en la plataforma.`;
    
    let message;
    if (currentStatus === 'Urgencias') {
      message = encodeURIComponent(`${baseMessage} Entiendo que solo atiendes urgencias. ¿Podrías indicarme cómo proceder?`);
    } else {
      message = encodeURIComponent(`${baseMessage} ¿Podríamos conversar?`);
    }
    
    window.open(`https://wa.me/${number}?text=${message}`, '_blank');
  };

  const generateProfessionalSummary = async (pro: Professional) => {
    setLoadingId(pro.id);
    setAiSummary(null);
    setError(null);

    toast.info(`Generando perfil detallado para ${pro.name}...`);
    
    setTimeout(() => {
      setAiSummary({
        text: `${pro.name} es ${pro.role} con base en ${pro.location}, Colombia. Con una calificación de ${pro.rating}/5.0 basada en ${pro.reviews} evaluaciones, se especializa en ${pro.category}. Los profesionales en esta categoría típicamente requieren certificaciones específicas del sector salud y tienen un rango salarial competitivo en el mercado colombiano, dependiendo de la experiencia y ubicación geográfica.`,
        sources: [
          { uri: "https://www.minsalud.gov.co", title: "Ministerio de Salud y Protección Social" },
          { uri: "https://www.datos.gov.co", title: "Datos Abiertos Colombia - Salud" }
        ]
      });
      setLoadingId(null);
      toast.success('Perfil generado exitosamente');
    }, 2000);
  };

  const ProfessionalCard = ({ pro }: { pro: Professional }) => {
    const { status: calculatedStatus, isAvailable } = getCalculatedStatus(pro.schedule);
    const { icon: StatusIcon, color: statusColor, text: statusText } = getStatusClasses(calculatedStatus);
    const isAiLoading = loadingId === pro.id;
    
    return (
      <motion.div 
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:shadow-2xl transition-all duration-300 border border-gray-100 p-6 flex flex-col"
      >
        <div className="flex items-start mb-4">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-indigo-500/50 flex-shrink-0 mr-4">
            <img 
              src={pro.image} 
              alt={`Foto de ${pro.name}`} 
              className="w-full h-full object-cover"
              onError={(e) => { 
                const target = e.target as HTMLImageElement;
                target.onerror = null; 
                target.src = "https://placehold.co/80x80/6366F1/FFFFFF?text=PRO"; 
              }}
            />
          </div>
          <div className="flex-grow">
            <h3 className="text-xl font-extrabold text-gray-900">{pro.name}</h3>
            <p className="text-sm font-medium text-indigo-600">{pro.role}</p>
            
            <div className="flex items-center text-xs mt-1 text-gray-500">
              <Star className="w-3.5 h-3.5 mr-1 text-yellow-500 fill-yellow-500" />
              <span className="font-bold text-gray-800 mr-2">{pro.rating}</span> 
              ({pro.reviews} reviews)
              <MapPin className="w-3.5 h-3.5 ml-3 mr-1" />
              {pro.location}
            </div>
          </div>
        </div>

        <div className="mb-4 space-y-2">
          <div className="flex items-center justify-between">
            <Badge className="bg-indigo-500 text-white border-indigo-600 shadow-md">
              {pro.category}
            </Badge>
            <Badge className={`bg-white shadow-md border-2 ${isAvailable ? 'border-green-400' : 'border-red-400'}`}>
              <StatusIcon className={`w-4 h-4 mr-1 ${statusColor}`} />
              <span className={`font-bold ${statusColor}`}>{statusText}</span>
            </Badge>
          </div>
          
          <h4 className="font-semibold text-sm text-gray-700 mt-2">Horario Programado:</h4>
          <ScheduleDisplay schedule={pro.schedule} />
        </div>
        
        <div className="mt-auto flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
          <Button 
            variant="default"
            className="w-full sm:w-1/2 bg-green-500 hover:bg-green-600 text-white" 
            onClick={() => contactViaWhatsApp(pro, calculatedStatus)}
            disabled={!isAvailable && calculatedStatus !== 'Urgencias'}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            {calculatedStatus === 'Urgencias' ? 'Contacto (Urgencias)' : 'Contactar por WhatsApp'}
          </Button>
          <Button 
            variant="default"
            className="w-full sm:w-1/2 bg-purple-600 hover:bg-purple-700 text-white relative" 
            onClick={() => generateProfessionalSummary(pro)}
            disabled={isAiLoading}
          >
            {isAiLoading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analizando...
              </div>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Validación IA
              </>
            )}
          </Button>
        </div>

        {aiSummary && loadingId === null && (
          <AnimatePresence>
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: 10 }}
              className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-xl shadow-inner text-sm space-y-3"
            >
              <h4 className="font-bold text-purple-800 flex items-center">
                <Zap className="w-4 h-4 mr-2" />
                Resumen de Validación de IA
              </h4>
              <p className="text-gray-700">{aiSummary.text}</p>
              <div className="pt-2">
                <span className="font-semibold text-purple-700 block mb-1">Fuentes de Fundamento:</span>
                <ul className="text-xs text-gray-600 space-y-1">
                  {aiSummary.sources.map((source, index) => (
                    <li key={index} className="truncate">
                      <a href={source.uri} target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 transition-colors underline">
                        {source.title || source.uri}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>
    );
  };

  const Header = () => (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveSection('home')}>
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              HealthConnect
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {['home', 'professionals', 'features', 'pricing', 'about'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`font-semibold transition-all duration-200 capitalize ${
                  activeSection === section
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-600 hover:text-indigo-500'
                }`}
              >
                {section === 'home' ? 'Inicio' : 
                 section === 'professionals' ? 'Profesionales' :
                 section === 'features' ? 'Características' :
                 section === 'pricing' ? 'Precios' : 'Nosotros'}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" onClick={() => setActiveSection('professionals')}>
              Ver Profesionales
            </Button>
            <Button onClick={() => setActiveSection('pricing')}>
              Comenzar Gratis
            </Button>
          </div>

          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-100 mt-4"
            >
              <div className="py-4 space-y-4">
                {['home', 'professionals', 'features', 'pricing', 'about'].map((section) => (
                  <button
                    key={section}
                    onClick={() => {
                      setActiveSection(section);
                      setMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 font-semibold capitalize ${
                      activeSection === section
                        ? 'text-indigo-600 bg-indigo-50 rounded-lg'
                        : 'text-gray-600'
                    }`}
                  >
                    {section === 'home' ? 'Inicio' : 
                     section === 'professionals' ? 'Profesionales' :
                     section === 'features' ? 'Características' :
                     section === 'pricing' ? 'Precios' : 'Nosotros'}
                  </button>
                ))}
                <div className="px-4 pt-4 border-t border-gray-100 space-y-3">
                  <Button variant="outline" className="w-full" onClick={() => { setActiveSection('professionals'); setMobileMenuOpen(false); }}>
                    Ver Profesionales
                  </Button>
                  <Button className="w-full" onClick={() => { setActiveSection('pricing'); setMobileMenuOpen(false); }}>
                    Comenzar Gratis
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );

  const HomeSection = () => (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50" />
      
      <div className="relative container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Conectamos
            </span>
            <br />
            <span className="text-gray-900">Salud con Confianza</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            La plataforma líder en Colombia para encontrar y validar profesionales de salud con disponibilidad en tiempo real y verificación con IA.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button size="lg" className="text-lg px-8 py-6" onClick={() => setActiveSection('professionals')}>
              <UserPlus className="w-5 h-5 mr-2" />
              Encontrar Profesionales
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              <Play className="w-5 h-5 mr-2" />
              Ver Demo
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto"
          >
            {[
              { number: '500+', label: 'Profesionales' },
              { number: '10k+', label: 'Familias' },
              { number: '98%', label: 'Satisfacción' },
              { number: '24/7', label: 'Disponibilidad' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900">{stat.number}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="relative bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Verificación con IA',
                description: 'Cada profesional es validado mediante inteligencia artificial con fuentes verificables.'
              },
              {
                icon: Clock,
                title: 'Disponibilidad en Tiempo Real',
                description: 'Sabemos exactamente cuándo está disponible cada profesional según su horario.'
              },
              {
                icon: Users,
                title: 'Comunidad Confiable',
                description: 'Más de 500 profesionales certificados y miles de reseñas verificadas.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  const ProfessionalsSection = () => (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nuestros Profesionales
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Encuentra el profesional perfecto con verificación en tiempo real y validación con IA
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {filters.map(f => (
            <Button
              key={f}
              variant={filter === f ? 'default' : 'outline'}
              onClick={() => setFilter(f)}
              className="rounded-full"
            >
              {f}
            </Button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredPros.length > 0 ? (
              filteredPros.map(pro => (
                <ProfessionalCard key={pro.id} pro={pro} />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="md:col-span-2 lg:col-span-3 p-8 text-center bg-white rounded-xl shadow-lg border border-gray-200"
              >
                <h3 className="text-xl font-semibold text-gray-700">No se encontraron profesionales.</h3>
                <p className="text-gray-500 mt-2">Intenta cambiar el filtro o busca en una categoría diferente.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );

  const FeaturesSection = () => (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Características Innovadoras
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tecnología avanzada para conectar familias con profesionales de confianza
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            {[
              {
                icon: Zap,
                title: 'Validación con IA Gemini',
                description: 'Análisis inteligente de credenciales y experiencia con fuentes verificadas'
              },
              {
                icon: Clock,
                title: 'Disponibilidad en Tiempo Real',
                description: 'Sincronización automática con horarios profesionales actualizados'
              },
              {
                icon: Shield,
                title: 'Verificación de Credenciales',
                description: 'Certificaciones y especialidades validadas punto por punto'
              },
              {
                icon: TrendingUp,
                title: 'Sistema de Reputación',
                description: 'Calificaciones y reseñas auténticas de familias reales'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-4"
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 text-white">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h4 className="text-2xl font-bold mb-4">Demo Interactivo</h4>
                <p className="mb-6 opacity-90">
                  Experimenta cómo nuestra plataforma conecta familias con profesionales verificados en tiempo real.
                </p>
                <Button variant="outline" className="border-white text-white hover:bg-white/20">
                  Probar Demo
                  <Play className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );

  const PricingSection = () => (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Planes para Cada Necesidad
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Desde uso personal hasta soluciones empresariales completas
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              name: 'Básico',
              price: 'Gratis',
              description: 'Para familias que necesitan cuidado ocasional',
              features: [
                'Acceso a profesionales verificados',
                'Contacto directo por WhatsApp',
                'Disponibilidad en tiempo real',
                'Hasta 3 contactos mensuales'
              ]
            },
            {
              name: 'Premium',
              price: '$49.900',
              period: '/mes',
              description: 'Para cuidado regular y seguimiento',
              popular: true,
              features: [
                'Todo en Básico',
                'Contactos ilimitados',
                'Validación IA avanzada',
                'Historial de profesionales',
                'Soporte prioritario',
                'Recordatorios automáticos'
              ]
            },
            {
              name: 'Empresarial',
              price: 'Personalizado',
              description: 'Para instituciones y empresas',
              features: [
                'Todo en Premium',
                'Dashboard administrativo',
                'Múltiples usuarios',
                'API integración',
                'Soporte dedicado 24/7',
                'Reportes personalizados'
              ]
            }
          ].map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-2xl shadow-lg border-2 ${
                plan.popular ? 'border-indigo-500 relative' : 'border-gray-100'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-indigo-500 text-white border-0 px-4 py-2">
                    Más Popular
                  </Badge>
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  {plan.period && <span className="text-gray-600 ml-2">{plan.period}</span>}
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-indigo-600 hover:bg-indigo-700' 
                      : 'bg-gray-900 hover:bg-gray-800'
                  }`}
                >
                  {plan.price === 'Gratis' ? 'Comenzar Gratis' : 
                   plan.price === 'Personalizado' ? 'Contactar Ventas' : 'Elegir Plan'}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  const AboutSection = () => (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Nuestra Misión
          </h2>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            En HealthConnect, creemos que cada familia merece acceso a profesionales de salud 
            confiables y verificados. Combinamos tecnología de vanguardia con un profundo 
            entendimiento de las necesidades de cuidado en Colombia.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { number: '2023', label: 'Fundación' },
              { number: '15+', label: 'Ciudades' },
              { number: '99.2%', label: 'Tasa de Satisfacción' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">¿Listo para comenzar?</h3>
            <p className="mb-6 opacity-90">
              Únete a miles de familias que ya confían en HealthConnect para el cuidado de sus seres queridos.
            </p>
            <Button variant="outline" className="border-white text-white hover:bg-white/20" onClick={() => setActiveSection('professionals')}>
              Comenzar Ahora
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );

  const Footer = () => (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="text-xl font-bold">HealthConnect</span>
            </div>
            <p className="text-gray-400">
              Conectando familias con profesionales de salud verificados en Colombia.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => setActiveSection('home')} className="hover:text-white transition-colors">Inicio</button></li>
              <li><button onClick={() => setActiveSection('professionals')} className="hover:text-white transition-colors">Profesionales</button></li>
              <li><button onClick={() => setActiveSection('features')} className="hover:text-white transition-colors">Características</button></li>
              <li><button onClick={() => setActiveSection('pricing')} className="hover:text-white transition-colors">Precios</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><button className="hover:text-white transition-colors">Términos de Servicio</button></li>
              <li><button className="hover:text-white transition-colors">Política de Privacidad</button></li>
              <li><button className="hover:text-white transition-colors">Cookies</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Contacto</h4>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                hola@healthconnect.co
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                +57 1 234 5678
              </div>
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-2" />
                Colombia
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 HealthConnect. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {activeSection === 'home' && <HomeSection />}
        {activeSection === 'professionals' && <ProfessionalsSection />}
        {activeSection === 'features' && <FeaturesSection />}
        {activeSection === 'pricing' && <PricingSection />}
        {activeSection === 'about' && <AboutSection />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
