import { useState, useEffect, useRef } from 'react';
import { MapPin, Users, Zap, Clock, RefreshCw } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface ProfessionalPin {
  id: number;
  name: string;
  role: string;
  status: 'Disponible' | 'Ocupado' | 'Ausente' | 'Urgencias';
  location: string;
  x: number;
  y: number;
}

interface LiveMapProfessionalsProps {
  professionals: Array<{
    id: number;
    name: string;
    role: string;
    status: string;
    location: string;
  }>;
}

const CITY_COORDS: Record<string, { x: number; y: number }> = {
  'Bogotá':      { x: 52, y: 48 },
  'Medellín':    { x: 38, y: 38 },
  'Cali':        { x: 32, y: 58 },
  'Barranquilla':{ x: 42, y: 18 },
  'Cartagena':   { x: 36, y: 20 },
  'Cúcuta':      { x: 56, y: 28 },
  'Bucaramanga': { x: 52, y: 34 },
  'Pereira':     { x: 36, y: 50 },
  'Pasto':       { x: 30, y: 72 },
  'Manizales':   { x: 38, y: 48 },
  'Ibagué':      { x: 44, y: 54 },
  'Buesaco':     { x: 31, y: 73 },
  'Armenia':     { x: 36, y: 52 },
  'Colombia':    { x: 45, y: 45 },
};

const STATUS_COLORS: Record<string, string> = {
  Disponible: '#22c55e',
  Ocupado:    '#f59e0b',
  Ausente:    '#ef4444',
  Urgencias:  '#7c3aed',
};

function getCoords(location: string, offset: number) {
  const base = CITY_COORDS[location] ?? CITY_COORDS['Colombia'];
  const jitter = ((offset * 7919) % 6) - 3;
  return { x: base.x + jitter, y: base.y + jitter };
}

export default function LiveMapProfessionals({ professionals }: LiveMapProfessionalsProps) {
  const [selected, setSelected] = useState<ProfessionalPin | null>(null);
  const [pulse, setPulse] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const pins: ProfessionalPin[] = professionals.map((p, i) => {
    const coords = getCoords(p.location, i);
    return {
      id: p.id,
      name: p.name,
      role: p.role,
      status: p.status as ProfessionalPin['status'],
      location: p.location,
      x: coords.x,
      y: coords.y,
    };
  });

  const counts = {
    total:      pins.length,
    disponible: pins.filter(p => p.status === 'Disponible').length,
    ocupado:    pins.filter(p => p.status === 'Ocupado').length,
    ausente:    pins.filter(p => p.status === 'Ausente').length,
    urgencias:  pins.filter(p => p.status === 'Urgencias').length,
  };

  useEffect(() => {
    timerRef.current = setInterval(() => setPulse(p => p + 1), 3000);
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header counters */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 px-4 py-3 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-white font-bold text-sm">
          <MapPin size={16} />
          Mapa en Vivo — Colombia
        </div>
        <div className="flex items-center gap-2 ml-auto flex-wrap">
          <CounterBadge label="Total" value={counts.total} color="bg-white/20 text-white" />
          <CounterBadge label="Disponibles" value={counts.disponible} color="bg-green-500 text-white" pulse />
          <CounterBadge label="Ocupados" value={counts.ocupado} color="bg-amber-500 text-white" />
          <CounterBadge label="Ausentes" value={counts.ausente} color="bg-red-500 text-white" />
          {counts.urgencias > 0 && (
            <CounterBadge label="Urgencias" value={counts.urgencias} color="bg-purple-600 text-white" />
          )}
        </div>
      </div>

      {/* Map canvas */}
      <div className="relative bg-gradient-to-br from-sky-50 to-emerald-50 overflow-hidden" style={{ height: 340 }}>
        {/* Colombia silhouette (SVG simplified outline) */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
          fill="none"
          stroke="#6366f1"
          strokeWidth="0.5"
        >
          <ellipse cx="45" cy="48" rx="22" ry="32" />
          <ellipse cx="45" cy="48" rx="14" ry="22" />
        </svg>

        {/* Grid lines */}
        {[20, 40, 60, 80].map(v => (
          <div key={`h${v}`} className="absolute inset-x-0 border-t border-indigo-100/60" style={{ top: `${v}%` }} />
        ))}
        {[25, 50, 75].map(v => (
          <div key={`v${v}`} className="absolute inset-y-0 border-l border-indigo-100/60" style={{ left: `${v}%` }} />
        ))}

        {/* Professional pins */}
        {pins.map((pin) => (
          <button
            key={pin.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 focus:outline-none"
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            onClick={() => setSelected(prev => prev?.id === pin.id ? null : pin)}
            title={pin.name}
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: (pin.id % 5) * 0.4 }}
              className="relative"
            >
              <div
                className="w-4 h-4 rounded-full border-2 border-white shadow-md cursor-pointer"
                style={{ backgroundColor: STATUS_COLORS[pin.status] ?? '#94a3b8' }}
              />
              {pin.status === 'Disponible' && (
                <span
                  className="absolute inset-0 rounded-full animate-ping opacity-60"
                  style={{ backgroundColor: STATUS_COLORS.Disponible }}
                />
              )}
            </motion.div>
          </button>
        ))}

        {/* Selected tooltip */}
        <AnimatePresence>
          {selected && (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="absolute z-20 bg-white rounded-xl shadow-2xl border border-gray-100 p-3 min-w-[180px] pointer-events-none"
              style={{
                left: `${Math.min(selected.x, 70)}%`,
                top: `${Math.max(selected.y - 20, 4)}%`,
              }}
            >
              <p className="font-bold text-gray-900 text-sm">{selected.name}</p>
              <p className="text-xs text-indigo-600">{selected.role}</p>
              <div className="flex items-center gap-1 mt-1">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: STATUS_COLORS[selected.status] }}
                />
                <span className="text-xs text-gray-600">{selected.status}</span>
                <span className="text-xs text-gray-400 ml-1">· {selected.location}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Legend */}
        <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 text-xs space-y-1 shadow">
          {Object.entries(STATUS_COLORS).map(([label, color]) => (
            <div key={label} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-gray-600">{label}</span>
            </div>
          ))}
        </div>

        {/* Live indicator */}
        <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs shadow">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-gray-700 font-medium">En vivo</span>
          <RefreshCw size={10} className="text-gray-400" />
        </div>
      </div>

      {/* Bottom summary */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-500">
        <Users size={13} />
        <span>{counts.disponible} profesionales disponibles ahora mismo en toda Colombia</span>
        <span className="ml-auto flex items-center gap-1">
          <Clock size={11} />
          Actualizado hace {pulse > 0 ? `${pulse * 3}s` : 'unos segundos'}
        </span>
      </div>
    </div>
  );
}

function CounterBadge({
  label, value, color, pulse = false
}: { label: string; value: number; color: string; pulse?: boolean }) {
  return (
    <div className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${color}`}>
      {pulse && value > 0 && <Zap size={10} className="animate-pulse" />}
      <span>{value}</span>
      <span className="opacity-80">{label}</span>
    </div>
  );
}
