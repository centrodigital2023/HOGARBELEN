import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface ProfessionalProfile {
  id?: string;
  user_id?: string;
  nombre_completo: string;
  titulo_profesional: string;
  categoria_profesional: string;
  ciudad: string;
  telefono: string;
  email: string;
  foto_perfil?: string;
  descripcion_profesional: string;
  años_experiencia: number;
  dias_disponibles: string[];
  horario_atencion: string;
  tarifa_por_hora: number;
  documentos?: {
    cv?: string;
    documento_id?: string;
    certificados?: string[];
    tarjeta_profesional?: string;
  };
  estado_perfil: 'pendiente_verificacion' | 'aprobado' | 'rechazado' | 'eliminado_por_usuario';
  check_verificado: boolean;
  fecha_aprobacion?: string;
  aprobado_por?: string;
  motivo_rechazo?: string;
  nivel_confianza?: 'alto' | 'medio' | 'bajo';
  created_at?: string;
  updated_at?: string;
}

export interface JobOffer {
  id?: string;
  user_id?: string;
  titulo: string;
  tipo_servicio: string;
  ubicacion: string;
  descripcion: string;
  requisitos: string;
  salario_rango?: string;
  contacto: string;
  estado: 'pendiente' | 'aprobada' | 'rechazada';
  urgencia?: 'normal' | 'urgente';
  fecha_publicacion?: string;
  created_at?: string;
}

export interface Lead {
  id?: string;
  tipo_usuario: 'familia' | 'profesional' | 'empleador';
  nombre: string;
  email: string;
  telefono: string;
  ciudad?: string;
  mensaje: string;
  urgencia: 'normal' | 'urgente';
  nivel_confianza?: 'alto' | 'medio' | 'bajo';
  estado: 'nuevo' | 'atendido' | 'cerrado';
  prioridad?: 'alta' | 'media' | 'baja';
  ia_clasificacion?: any;
  created_at?: string;
}

export interface AIInteraction {
  id?: string;
  pagina: string;
  tipo_evento: string;
  tipo_usuario?: string;
  nivel_interes?: string;
  urgencia?: string;
  riesgo?: string;
  recomendacion_accion?: string;
  observaciones_admin?: string;
  session_id?: string;
  created_at?: string;
}

export interface AdminAction {
  id?: string;
  accion: string;
  usuario_afectado?: string;
  admin_id: string;
  admin_email: string;
  detalles: any;
  created_at?: string;
}

export const professionalCategories = [
  'Enfermería',
  'Cuidador(a) de adulto mayor',
  'Auxiliar de enfermería',
  'Fisioterapia',
  'Terapia ocupacional',
  'Psicología',
  'Acompañamiento terapéutico',
  'Gerontología',
  'Otro'
];

export const colombianCities = [
  'Buesaco',
  'Pasto',
  'Bogotá',
  'Medellín',
  'Cali',
  'Barranquilla',
  'Cartagena',
  'Ipiales',
  'Túquerres',
  'La Unión',
  'San Lorenzo',
  'Otro'
];

export const daysOfWeek = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo'
];
