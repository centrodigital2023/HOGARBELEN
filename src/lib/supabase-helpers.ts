export const professionalCategories = [
  'Geriatra',
  'Terapeuta Ocupacional',
  'Nutricionista',
  'Trabajador/a Social',
  'Auxiliar de Enfermería',
  'Enfermero/a',
  'Fisioterapeuta',
  'Psicólogo/a',
  'Médico General',
  'Cuidador/a Especializado/a'
]

export const cities = [
  'Buesaco',
  'Pasto',
  'La Unión',
  'Tangua',
  'Sandoná',
  'San Lorenzo'
]

export const daysOfWeek = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo'
]

export interface Lead {
  id?: string
  name: string
  email: string
  phone?: string
  message?: string
  source?: string
  status?: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed' | 'lost'
  assigned_to?: string
  metadata?: Record<string, any>
  created_at?: string
  updated_at?: string
}

export interface ProfessionalProfile {
  id?: string
  user_id: string
  full_name: string
  email: string
  phone?: string
  specialization: string
  experience_years: number
  certifications?: string[]
  availability?: Record<string, any>
  bio?: string
  hourly_rate?: number
  verified?: boolean
  rating?: number
  total_reviews?: number
  created_at?: string
  updated_at?: string
}

export interface JobOffer {
  id?: string
  title: string
  description: string
  category: string
  location: string
  salary_range?: string
  requirements: string[]
  status: 'active' | 'closed' | 'draft'
  created_at?: string
  updated_at?: string
}

export interface AdminAction {
  id?: string
  admin_id: string
  action_type: string
  description: string
  metadata?: Record<string, any>
  created_at?: string
}

// ================================================================
// FUNCIONES DE APROBACIÓN
// ================================================================

import { supabase } from './supabase';

/**
 * Aprueba un profesional usando la función SQL de Supabase
 */
export async function approveProfessional(
  professionalId: string,
  adminUserId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.rpc('approve_professional', {
      professional_id: professionalId,
      admin_user_id: adminUserId,
    });

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Error approving professional:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Rechaza un profesional con una razón
 */
export async function rejectProfessional(
  professionalId: string,
  adminUserId: string,
  reason: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.rpc('reject_professional', {
      professional_id: professionalId,
      admin_user_id: adminUserId,
      reason: reason,
    });

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Error rejecting professional:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Aprueba una oferta de trabajo
 */
export async function approveJobOffer(
  offerId: string,
  adminUserId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.rpc('approve_job_offer', {
      offer_id: offerId,
      admin_user_id: adminUserId,
    });

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Error approving job offer:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Rechaza una oferta de trabajo
 */
export async function rejectJobOffer(
  offerId: string,
  adminUserId: string,
  reason?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.rpc('reject_job_offer', {
      offer_id: offerId,
      admin_user_id: adminUserId,
      reason: reason || null,
    });

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Error rejecting job offer:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Obtiene estadísticas de profesionales por estado
 */
export async function getProfessionalStats(): Promise<{
  pending: number;
  approved: number;
  rejected: number;
  total: number;
}> {
  try {
    const { data, error } = await supabase
      .from('professionals')
      .select('verification_status');

    if (error) throw error;

    const stats = {
      pending: data?.filter(p => p.verification_status === 'pending').length || 0,
      approved: data?.filter(p => p.verification_status === 'approved').length || 0,
      rejected: data?.filter(p => p.verification_status === 'rejected').length || 0,
      total: data?.length || 0,
    };

    return stats;
  } catch (error) {
    console.error('Error getting professional stats:', error);
    return { pending: 0, approved: 0, rejected: 0, total: 0 };
  }
}

/**
 * Obtiene estadísticas de ofertas de trabajo por estado
 */
export async function getJobOfferStats(): Promise<{
  pendiente: number;
  aprobada: number;
  rechazada: number;
  total: number;
}> {
  try {
    const { data, error } = await supabase
      .from('job_offers')
      .select('estado');

    if (error) throw error;

    const stats = {
      pendiente: data?.filter(o => o.estado === 'pendiente').length || 0,
      aprobada: data?.filter(o => o.estado === 'aprobada').length || 0,
      rechazada: data?.filter(o => o.estado === 'rechazada').length || 0,
      total: data?.length || 0,
    };

    return stats;
  } catch (error) {
    console.error('Error getting job offer stats:', error);
    return { pendiente: 0, aprobada: 0, rechazada: 0, total: 0 };
  }
}
