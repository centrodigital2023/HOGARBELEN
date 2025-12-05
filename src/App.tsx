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
  Calendar 
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
    image: "https://placehold.co/200x200/6366F1/FFFFFF?text=MFR", 
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
    image: "https://placehold.co/200x200/6366F1/FFFFFF?text=JDG", 
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
    image: "https://placehold.co/200x200/10B981/FFFFFF?text=LSC", 
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
    image: "https://placehold.co/200x200/10B981/FFFFFF?text=AFS", 
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
    image: "https://placehold.co/200x200/F59E0B/FFFFFF?text=MLR", 
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
    image: "https://placehold.co/200x200/F59E0B/FFFFFF?text=CEP", 
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
    image: "https://placehold.co/200x200/EF4444/FFFFFF?text=RP", 
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
    image: "https://placehold.co/200x200/EF4444/FFFFFF?text=EC", 
    whatsappNumber: "+573178901234", 
    initialStatus: 'Ausente', 
    schedule: ['Lun, Mie, Vie 8-12'] 
  },
  { 
    id: 9, 
    name: "Juan Camilo Restrepo", 
    role: "Nutricionista Dietista", 
    category: "Otros", 
    rating: 4.6, 
    reviews: 30, 
    location: "Bogotá", 
    image: "https://placehold.co/200x200/8B5CF6/FFFFFF?text=JCR", 
    whatsappNumber: "+573189012345", 
    initialStatus: 'Disponible', 
    schedule: ['Lun a Vie 1-5'] 
  },
  { 
    id: 10, 
    name: "Dra. Paula Andrea Vélez", 
    role: "Psicóloga Clínica", 
    category: "Otros", 
    rating: 4.9, 
    reviews: 105, 
    location: "Medellín", 
    image: "https://placehold.co/200x200/8B5CF6/FFFFFF?text=PAV", 
    whatsappNumber: "+573190123456", 
    initialStatus: 'Ocupado', 
    schedule: ['Mar, Jue 2-7a.m.'] 
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

  const exponentialBackoffFetch = async (url: string, options: RequestInit, maxRetries = 5): Promise<Response> => {
    for (let i = 0; i < maxRetries; i++) {
      try {
        const response = await fetch(url, options);
        if (response.ok) return response;
        if (response.status === 429 || response.status >= 500) {
          const delay = Math.pow(2, i) * 1000 + Math.random() * 1000;
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
        throw new Error(`API returned status ${response.status}`);
      } catch (error) {
        if (i === maxRetries - 1) throw error;
      }
    }
    throw new Error('Max retries reached');
  };

  const generateProfessionalSummary = async (pro: Professional) => {
    setLoadingId(pro.id);
    setAiSummary(null);
    setError(null);

    const systemPrompt = "Actúa como un experto en recursos humanos y salud en Colombia. Genera un resumen conciso y fáctico, en un solo párrafo, sobre el rol, las certificaciones clave y las expectativas salariales aproximadas (rangos) del profesional de la salud. Incluye la localización.";
    
    const userQuery = `Analiza la información del siguiente profesional en Colombia: Nombre: ${pro.name}, Rol: ${pro.role}, Categoría: ${pro.category}, Ciudad: ${pro.location}, Rating: ${pro.rating}. Genera el resumen solicitado.`;
    
    const apiKey = "";
    
    if (!apiKey) {
      toast.error("API key no configurada. Simularemos un resumen de IA.");
      setLoadingId(null);
      
      setTimeout(() => {
        setAiSummary({
          text: `${pro.name} es ${pro.role} con base en ${pro.location}, Colombia. Con una calificación de ${pro.rating}/5.0 basada en ${pro.reviews} evaluaciones, se especializa en ${pro.category}. Los profesionales en esta categoría típicamente requieren certificaciones específicas del sector salud y tienen un rango salarial competitivo en el mercado colombiano, dependiendo de la experiencia y ubicación geográfica.`,
          sources: [
            { uri: "https://www.minsalud.gov.co", title: "Ministerio de Salud y Protección Social" },
            { uri: "https://www.datos.gov.co", title: "Datos Abiertos Colombia - Salud" }
          ]
        });
        setLoadingId(null);
      }, 2000);
      
      return;
    }
    
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{ parts: [{ text: userQuery }] }],
      tools: [{ "google_search": {} }],
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
    };

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    };

    try {
      const response = await exponentialBackoffFetch(apiUrl, options);
      const result = await response.json();
      
      const candidate = result.candidates?.[0];
      if (candidate && candidate.content?.parts?.[0]?.text) {
        const text = candidate.content.parts[0].text;
        
        let sources: { uri: string; title: string }[] = [];
        const groundingMetadata = candidate.groundingMetadata;
        if (groundingMetadata && groundingMetadata.groundingAttributions) {
          sources = groundingMetadata.groundingAttributions
            .map((attribution: any) => ({
              uri: attribution.web?.uri,
              title: attribution.web?.title,
            }))
            .filter((source: any) => source.uri && source.title);
        }

        setAiSummary({ text, sources });
      } else {
        setError("No se pudo generar el resumen. Intenta de nuevo.");
      }
    } catch (err) {
      console.error("Gemini API Error:", err);
      setError("Ocurrió un error de conexión con la IA. Por favor, verifica tu red.");
    } finally {
      setLoadingId(null);
    }
  };

  const ProfessionalCard = ({ pro }: { pro: Professional }) => {
    const { status: calculatedStatus, isAvailable } = getCalculatedStatus(pro.schedule);
    const { icon: StatusIcon, color: statusColor, text: statusText } = getStatusClasses(calculatedStatus);
    const isAiLoading = loadingId === pro.id;
    
    const renderAiSummary = () => {
      if (!aiSummary || aiSummary.sources.length === 0 || aiSummary.text === '') return null;
      
      return (
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
      );
    };

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
            {renderAiSummary()}
          </AnimatePresence>
        )}
        
        {error && loadingId === pro.id && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg text-sm text-red-700"
          >
            {error}
          </motion.div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-8 font-[Inter]">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-black text-indigo-800 flex items-center">
          <UserCheck className="w-7 h-7 mr-3" />
          Pro-Salud: Profesionales Validados
        </h1>
        <p className="text-lg text-gray-600 mt-1">Encuentra y valida enfermeros, cuidadores, médicos y terapeutas en Colombia.</p>
      </header>
      
      <div className="mb-8 p-4 bg-white rounded-xl shadow-lg border border-gray-100 flex flex-wrap gap-2 sticky top-0 z-10">
        <span className="font-bold text-gray-700 self-center mr-2">Filtrar por:</span>
        {filters.map(f => (
          <Button 
            key={f}
            variant={filter === f ? 'default' : 'secondary'}
            onClick={() => {
              setFilter(f);
              setAiSummary(null);
            }}
            className={`transition-all duration-200 text-sm ${f === 'Disponible Ahora' && (filter === 'Disponible Ahora' ? 'bg-green-600 hover:bg-green-700' : 'text-green-700 hover:bg-green-100')}`}
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

      <footer className="mt-12 text-center text-sm text-gray-500 p-4">
        <p>La validación con IA utiliza el modelo Gemini para generar un resumen fáctico basado en información disponible públicamente (Google Search). Los estados de disponibilidad se calculan en tiempo real usando el horario local de tu navegador.</p>
      </footer>
    </div>
  );
}

export default App;
