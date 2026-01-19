import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useSupabaseRealtimeSync } from './useSupabaseRealtimeSync';
import { toast } from 'sonner';

export type VerificationStatus = 'pending' | 'approved' | 'rejected';

export interface ProfessionalSupabase {
  id: string;
  user_id: string;
  specialization: string;
  experience_years: number;
  certifications: string[];
  availability: Record<string, any>;
  bio: string | null;
  hourly_rate: number | null;
  documents: Record<string, any>;
  verified: boolean;
  verification_status: VerificationStatus;
  verification_date: string | null;
  verified_by: string | null;
  approved_at: string | null;
  approved_by: string | null;
  rejection_reason: string | null;
  rating: number | null;
  total_reviews: number;
  created_at: string;
  updated_at: string;
  // Campos de profiles (join)
  full_name?: string;
  email?: string;
  phone?: string;
  photo_url?: string;
}

interface UseProfessionalsSupabaseOptions {
  status?: VerificationStatus | 'all';
  autoSync?: boolean;
  onUpdate?: (professionals: ProfessionalSupabase[]) => void;
}

/**
 * Hook para gestión de profesionales con Supabase Realtime
 * 
 * Características:
 * - Sincronización en tiempo real con Supabase
 * - CRUD operations completas
 * - Filtrado por estado de verificación
 * - Funciones de aprobación/rechazo
 * - Reconexión automática
 * 
 * @example
 * ```tsx
 * const { 
 *   professionals, 
 *   loading, 
 *   approveProfessional, 
 *   rejectProfessional,
 *   isConnected
 * } = useProfessionalsSupabase({ status: 'pending' });
 * ```
 */
export function useProfessionalsSupabase(options: UseProfessionalsSupabaseOptions = {}) {
  const { status = 'all', autoSync = true, onUpdate } = options;

  const [professionals, setProfessionals] = useState<ProfessionalSupabase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Función para cargar profesionales desde Supabase
  const fetchProfessionals = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('professionals')
        .select(`
          *,
          profiles:user_id (
            full_name,
            email,
            phone,
            photo_url
          )
        `)
        .order('created_at', { ascending: false });

      // Aplicar filtro de estado si no es 'all'
      if (status !== 'all') {
        query = query.eq('verification_status', status);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      // Aplanar datos de profiles
      const formattedData = (data || []).map((prof: any) => ({
        ...prof,
        full_name: prof.profiles?.full_name,
        email: prof.profiles?.email,
        phone: prof.profiles?.phone,
        photo_url: prof.profiles?.photo_url,
      }));

      setProfessionals(formattedData);
      onUpdate?.(formattedData);
    } catch (err) {
      console.error('Error fetching professionals:', err);
      setError(err as Error);
      toast.error('Error al cargar profesionales');
    } finally {
      setLoading(false);
    }
  }, [status, onUpdate]);

  // Configurar sincronización en tiempo real
  const { status: realtimeStatus, isConnected } = useSupabaseRealtimeSync<ProfessionalSupabase>({
    table: 'professionals',
    event: '*',
    enabled: autoSync,
    onInsert: (payload) => {
      console.log('New professional inserted:', payload.new);
      fetchProfessionals();
      toast.info('Nuevo profesional registrado', {
        description: 'La lista se ha actualizado automáticamente'
      });
    },
    onUpdate: (payload) => {
      console.log('Professional updated:', payload.new);
      fetchProfessionals();
    },
    onDelete: (payload) => {
      console.log('Professional deleted:', payload.old);
      fetchProfessionals();
    },
    onError: (error) => {
      console.error('Realtime error:', error);
      toast.error('Error en sincronización en tiempo real');
    },
  });

  // Cargar datos iniciales
  useEffect(() => {
    fetchProfessionals();
  }, [fetchProfessionals]);

  // Agregar nuevo profesional
  const addProfessional = useCallback(async (
    professional: Omit<ProfessionalSupabase, 'id' | 'created_at' | 'updated_at' | 'verified' | 'verification_status'>
  ) => {
    try {
      const { data, error: insertError } = await supabase
        .from('professionals')
        .insert([{
          ...professional,
          verification_status: 'pending',
          verified: false,
        }])
        .select()
        .single();

      if (insertError) throw insertError;

      toast.success('Profesional registrado exitosamente', {
        description: 'La solicitud será revisada por un administrador'
      });

      return data as ProfessionalSupabase;
    } catch (err) {
      console.error('Error adding professional:', err);
      toast.error('Error al registrar profesional');
      throw err;
    }
  }, []);

  // Actualizar profesional
  const updateProfessional = useCallback(async (
    id: string,
    updates: Partial<ProfessionalSupabase>
  ) => {
    try {
      const { error: updateError } = await supabase
        .from('professionals')
        .update(updates)
        .eq('id', id);

      if (updateError) throw updateError;

      toast.success('Profesional actualizado');
    } catch (err) {
      console.error('Error updating professional:', err);
      toast.error('Error al actualizar profesional');
      throw err;
    }
  }, []);

  // Aprobar profesional
  const approveProfessional = useCallback(async (id: string, adminUserId: string) => {
    try {
      // Llamar a la función de Supabase
      const { error: approveError } = await supabase.rpc('approve_professional', {
        professional_id: id,
        admin_user_id: adminUserId,
      });

      if (approveError) throw approveError;

      toast.success('Profesional aprobado', {
        description: 'El profesional ahora aparecerá en el listado público',
        duration: 5000,
      });
    } catch (err) {
      console.error('Error approving professional:', err);
      toast.error('Error al aprobar profesional');
      throw err;
    }
  }, []);

  // Rechazar profesional
  const rejectProfessional = useCallback(async (
    id: string,
    adminUserId: string,
    reason: string
  ) => {
    try {
      // Llamar a la función de Supabase
      const { error: rejectError } = await supabase.rpc('reject_professional', {
        professional_id: id,
        admin_user_id: adminUserId,
        reason: reason,
      });

      if (rejectError) throw rejectError;

      toast.success('Profesional rechazado', {
        description: 'Se ha enviado una notificación con la razón del rechazo',
      });
    } catch (err) {
      console.error('Error rejecting professional:', err);
      toast.error('Error al rechazar profesional');
      throw err;
    }
  }, []);

  // Eliminar profesional
  const deleteProfessional = useCallback(async (id: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('professionals')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      toast.success('Profesional eliminado');
    } catch (err) {
      console.error('Error deleting professional:', err);
      toast.error('Error al eliminar profesional');
      throw err;
    }
  }, []);

  return {
    professionals,
    loading,
    error,
    isConnected,
    realtimeStatus,
    addProfessional,
    updateProfessional,
    approveProfessional,
    rejectProfessional,
    deleteProfessional,
    refresh: fetchProfessionals,
  };
}
