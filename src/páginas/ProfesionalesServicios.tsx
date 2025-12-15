import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MapPin, Zap, Loader2, MessageCircle, Clock, CheckCircle, XCircle, MinusCircle, UserCheck, NotebookText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useKV } from '@github/spark/hooks';

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

const parseScheduleEntry = (entry: string) => {
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
    days = dayStr.split(',').map(d => dayRangeMap[d.trim()]).filter(d => d !== undefined).flat() as number[];
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

const getCalculatedStatus = (schedule: string[]) => {
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
  { id: 1, name: "María Fernanda Rojas", role: "Enfermera Jefe (Especialista UCI)", category: "Enfermería", rating: 5.0, reviews: 155, location: "Bogotá", 
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop", 
    whatsappNumber: "+573101234567", initialStatus: 'Disponible', schedule: ['Lun 8-12', 'Mar 2-6', 'Vie 8-4'] },
  { id: 2, name: "Julián David Gómez", role: "Auxiliar de Enfermería", category: "Enfermería", rating: 4.8, reviews: 78, location: "Medellín", 
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop", 
    whatsappNumber: "+573112345678", initialStatus: 'Ocupado', schedule: ['Mar 9-5', 'Jue 9-5'] },
  { id: 3, name: "Laura Sofía Cifuentes", role: "Cuidadora Domiciliaria Certificada", category: "Cuidadores", rating: 5.0, reviews: 210, location: "Cali", 
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&auto=format&fit=crop", 
    whatsappNumber: "+573123456789", initialStatus: 'Ausente', schedule: ['Lun a Vie 7-7'] },
  { id: 4, name: "Andrés Felipe Sierra", role: "Cuidador de Personas con Alzheimer", category: "Cuidadores", rating: 4.9, reviews: 92, location: "Barranquilla", 
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop",
    whatsappNumber: "+573134567890", initialStatus: 'Disponible', schedule: ['Sáb 8-1', 'Dom 8-1'] },
  { id: 5, name: "Marta Lucía Rueda", role: "Fisioterapeuta Respiratoria", category: "Terapia", rating: 4.7, reviews: 45, location: "Bogotá", 
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&auto=format&fit=crop", 
    whatsappNumber: "+573145678901", initialStatus: 'Ocupado', schedule: ['Lun 9-3', 'Mie 9-3', 'Vie 9-3'] },
  { id: 6, name: "Carlos Eduardo Pardo", role: "Terapeuta Ocupacional", category: "Terapia", rating: 4.8, reviews: 68, location: "Medellín", 
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop", 
    whatsappNumber: "+573156789012", initialStatus: 'Disponible', schedule: ['Lun a Jue 1-7'] },
  { id: 7, name: "Dr. Ricardo Poveda", role: "Médico Geriatra", category: "Médicos", rating: 5.0, reviews: 121, location: "Cali", 
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&auto=format&fit=crop", 
    whatsappNumber: "+573167890123", initialStatus: 'Disponible', schedule: ['Solo Urgencias'] },
  { id: 8, name: "Dra. Elena Castro", role: "Médico Internista", category: "Médicos", rating: 4.9, reviews: 88, location: "Barranquilla", 
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&auto=format&fit=crop", 
    whatsappNumber: "+573178901234", initialStatus: 'Ausente', schedule: ['Lun, Mie, Vie 8-12'] },
  { id: 9, name: "Juan Camilo Restrepo", role: "Nutricionista Dietista", category: "Otros", rating: 4.6, reviews: 30, location: "Bogotá", 
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop", 
    whatsappNumber: "+573189012345", initialStatus: 'Disponible', schedule: ['Lun a Vie 1-5'] },
  { id: 10, name: "Dra. Paula Andrea Vélez", role: "Psicóloga Clínica", category: "Otros", rating: 4.9, reviews: 105, location: "Medellín", 
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&auto=format&fit=crop", 
    whatsappNumber: "+573190123456", initialStatus: 'Ocupado', schedule: ['Mar, Jue 2-7p.m.'] },
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

interface ContactPlan {
  initialMessage: string;
  keyQuestions: string[];
}

interface ContactPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  professional: Professional | null;
  contactPlan: ContactPlan | null;
  loading: boolean;
  error: string | null;
  onStartChat: (pro: Professional, message: string) => void;
}

const ContactPlanModal = ({ isOpen, onClose, professional, contactPlan, loading, error, onStartChat }: ContactPlanModalProps) => {
  if (!isOpen || !professional) return null;

  const Icon = loading ? Loader2 : NotebookText;
  
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6"
      >
        <div className="flex items-start justify-between">
          <h3 className="text-2xl font-bold text-indigo-700 flex items-center">
            <Icon className={`w-6 h-6 mr-3 ${loading ? 'animate-spin' : 'text-purple-600'}`} />
            Plan de Contacto ✨
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors">
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        <p className="text-gray-600 border-b pb-4">
          Estrategia de comunicación generada por IA para contactar a <strong>{professional.name} ({professional.role})</strong>
        </p>

        {loading && (
          <div className="flex flex-col items-center justify-center py-10 text-gray-500">
            <Loader2 className="w-8 h-8 animate-spin text-purple-600 mb-3" />
            <p className="font-semibold">Generando estrategia de contacto...</p>
            <p className="text-sm">Esto puede tomar unos segundos.</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg">
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {contactPlan && !loading && (
          <div className="space-y-6">
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
              <h4 className="font-bold text-purple-700 flex items-center mb-2">
                <MessageCircle className="w-5 h-5 mr-2" />
                Mensaje Inicial Sugerido:
              </h4>
              <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-inner">
                <p className="text-sm text-gray-800 whitespace-pre-line">{contactPlan.initialMessage}</p>
              </div>
              <p className="text-xs text-purple-600 mt-2">Copia y pega este texto en WhatsApp para un primer contacto efectivo.</p>
            </div>
            
            <div>
              <h4 className="font-bold text-indigo-700 flex items-center mb-3">
                <NotebookText className="w-5 h-5 mr-2" />
                3 Preguntas Clave para la Conversación:
              </h4>
              <ul className="space-y-2 text-gray-700">
                {contactPlan.keyQuestions.map((q, index) => (
                  <li key={index} className="flex items-start">
                    <span className="font-bold text-purple-600 mr-2 flex-shrink-0">{index + 1}.</span>
                    <p className='text-sm'>{q}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <Button variant="default" className="w-full bg-green-500 hover:bg-green-600" onClick={() => {
                onStartChat(professional, contactPlan.initialMessage);
                onClose(); 
              }}>
                <MessageCircle className="w-5 h-5 mr-2" />
                Iniciar Chat en WhatsApp
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default function ProfesionalesServicios() {
  const [professionalsList] = useKV<Professional[]>('professionals-list', initialProfessionals);
  const [filter, setFilter] = useState('Todos');
  const [aiSummary, setAiSummary] = useState<{ id: number; text: string; sources: any[] } | null>(null);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [proForContact, setProForContact] = useState<Professional | null>(null);
  const [contactPlan, setContactPlan] = useState<ContactPlan | null>(null);
  const [isContactLoading, setIsContactLoading] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);

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
    let list = professionalsList || [];

    if (filter === 'Disponible Ahora') {
      list = list.filter(p => getCalculatedStatus(p.schedule).status === 'Disponible');
    } else if (filter !== 'Todos') {
      list = list.filter(p => p.category === filter);
    }
    
    return getSortedPros(list);
  }, [filter, professionalsList, getSortedPros]);

  const contactViaWhatsApp = (pro: Professional, calculatedStatus: string, initialMessage: string | null = null) => {
    const number = pro.whatsappNumber.replace(/[^0-9+]/g, '');
    
    const baseMessage = initialMessage 
      ? initialMessage 
      : `Hola ${pro.name}, estoy interesado(a) en tus servicios como ${pro.role} que vi en la plataforma.`;
    
    let message;
    if (calculatedStatus === 'Urgencias' && !initialMessage) {
      message = encodeURIComponent(`${baseMessage} Entiendo que solo atiendes urgencias. ¿Podrías indicarme cómo proceder?`);
    } else {
      message = encodeURIComponent(baseMessage);
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
      } catch (err) {
        if (i === maxRetries - 1) throw err;
      }
    }
    throw new Error('Max retries reached');
  };

  const generateProfessionalSummary = async (pro: Professional) => {
    setLoadingId(pro.id);
    setAiSummary(null);
    setError(null);

    const prompt = (window as any).spark.llmPrompt`Analiza la información del siguiente profesional en Colombia: Nombre: ${pro.name}, Rol: ${pro.role}, Categoría: ${pro.category}, Ciudad: ${pro.location}, Rating: ${pro.rating}. Genera un resumen conciso y fáctico sobre el rol, las certificaciones clave y las expectativas salariales aproximadas (rangos) del profesional de la salud. Incluye la localización.`;
    
    try {
      const result = await (window as any).spark.llm(prompt, 'gpt-4o', false);
      setAiSummary({ id: pro.id, text: result, sources: [] });
    } catch (err) {
      console.error('AI Error:', err);
      setError('Ocurrió un error de conexión con la IA. Por favor, verifica tu red.');
    } finally {
      setLoadingId(null);
    }
  };

  const generateContactPlan = async (pro: Professional) => {
    setProForContact(pro);
    setContactPlan(null);
    setContactError(null);
    setIsContactLoading(true);
    setIsModalOpen(true);

    const prompt = (window as any).spark.llmPrompt`Profesional: ${pro.name}, Rol: ${pro.role}, Especialidad: ${pro.role}, Categoría: ${pro.category}. Genera un plan de contacto en español con un mensaje inicial de WhatsApp profesional (máximo 3 líneas) y 3 preguntas clave que el usuario debe hacer para evaluar al profesional.`;
    
    try {
      const result = await (window as any).spark.llm(prompt, 'gpt-4o', true);
      const parsedJson = JSON.parse(result);
      setContactPlan(parsedJson);
    } catch (err) {
      console.error('AI Error (Contact Plan):', err);
      setContactError('Ocurrió un error de conexión con la IA al generar el plan.');
    } finally {
      setIsContactLoading(false);
    }
  };

  const ProfessionalCard = ({ pro }: { pro: Professional }) => {
    const { status: calculatedStatus, isAvailable } = getCalculatedStatus(pro.schedule);
    const { icon: StatusIcon, color: statusColor, text: statusText } = getStatusClasses(calculatedStatus);
    const isAiValidationLoading = loadingId === pro.id;
    
    const renderAiSummary = () => {
      if (!aiSummary || aiSummary.id !== pro.id || aiSummary.text === '') return null;
      
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
              onError={(e) => { (e.target as HTMLImageElement).src="https://placehold.co/80x80/6366F1/FFFFFF?text=PRO"; }}
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
        
        <div className="mt-auto flex flex-col gap-3 pt-4 border-t border-gray-100">
          <div className="flex gap-3">
            <Button 
              variant="default"
              className="w-1/2 relative bg-purple-600 hover:bg-purple-700" 
              onClick={() => generateProfessionalSummary(pro)}
              disabled={isAiValidationLoading}
            >
              {isAiValidationLoading ? (
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
            <Button 
              variant="outline"
              className="w-1/2 relative border-purple-300 text-purple-800 hover:bg-purple-50" 
              onClick={() => generateContactPlan(pro)}
              disabled={isAiValidationLoading}
            >
              <NotebookText className="w-4 h-4 mr-2" />
              Plan de Contacto ✨
            </Button>
          </div>

          <Button 
            variant="default"
            className="w-full bg-green-500 hover:bg-green-600" 
            onClick={() => contactViaWhatsApp(pro, calculatedStatus)}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            {calculatedStatus === 'Urgencias' ? 'Contactar (Urgencias)' : 'Contactar por WhatsApp'}
          </Button>
        </div>

        {aiSummary && aiSummary.id === pro.id && (
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
    <div className="bg-gray-50 min-h-screen p-4 sm:p-8 font-sans">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-black text-indigo-800 flex items-center">
          <UserCheck className="w-7 h-7 mr-3" />
          Profesionales Cerca de Usted
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
              className="md:col-span-3 lg:col-span-3 p-8 text-center bg-white rounded-xl shadow-lg border border-gray-200"
            >
              <h3 className="text-xl font-semibold text-gray-700">No se encontraron profesionales.</h3>
              <p className="text-gray-500 mt-2">Intenta cambiar el filtro o busca en una categoría diferente.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <footer className="mt-12 text-center text-sm text-gray-500 p-4">
        <p>La validación con IA utiliza el modelo GPT-4 para generar un resumen fáctico basado en información disponible. Los estados de disponibilidad se calculan en tiempo real usando el horario local de tu navegador.</p>
      </footer>

      <ContactPlanModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        professional={proForContact}
        contactPlan={contactPlan}
        loading={isContactLoading}
        error={contactError}
        onStartChat={(pro, message) => contactViaWhatsApp(pro, getCalculatedStatus(pro.schedule).status, message)}
      />
    </div>
  );
}
