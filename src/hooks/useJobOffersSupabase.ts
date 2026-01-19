import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useSupabaseRealtimeSync } from './useSupabaseRealtimeSync';
import { toast } from 'sonner';

export type JobOfferStatus = 'pendiente' | 'aprobada' | 'rechazada';

export interface JobOfferSupabase {
  id: string;
  user_id: string;
  titulo: string;
  tipo_servicio: string;
  ubicacion: string;
  descripcion: string;
  requisitos: string | null;
  salario_rango: string | null;
  contacto: string;
  estado: JobOfferStatus;
  urgencia: 'normal' | 'urgente';
  ia_validacion: Record<string, any> | null;
  categoria_detectada: string | null;
  fecha_publicacion: string | null;
  approved_at: string | null;
  approved_by: string | null;
  created_at: string;
  updated_at: string;
  // Campos de profiles (join)
  full_name?: string;
  email?: string;
  phone?: string;
}

interface UseJobOffersSupabaseOptions {
  status?: JobOfferStatus | 'all';
  autoSync?: boolean;
  onUpdate?: (offers: JobOfferSupabase[]) => void;
}

/**
 * Hook para gestión de ofertas de trabajo con Supabase Realtime
 * 
 * Características:
 * - Sincronización en tiempo real con Supabase
 * - CRUD operations completas
 * - Filtrado por estado
 * - Funciones de aprobación/rechazo
 * - Reconexión automática
 * 
 * @example
 * ```tsx
 * const { 
 *   jobOffers, 
 *   loading, 
 *   approveJobOffer, 
 *   rejectJobOffer,
 *   isConnected
 * } = useJobOffersSupabase({ status: 'pendiente' });
 * ```
 */
export function useJobOffersSupabase(options: UseJobOffersSupabaseOptions = {}) {
  const { status = 'all', autoSync = true, onUpdate } = options;

  const [jobOffers, setJobOffers] = useState<JobOfferSupabase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Función para cargar ofertas desde Supabase
  const fetchJobOffers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('job_offers')
        .select(`
          *,
          profiles:user_id (
            full_name,
            email,
            phone
          )
        `)
        .order('created_at', { ascending: false });

      // Aplicar filtro de estado si no es 'all'
      if (status !== 'all') {
        query = query.eq('estado', status);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      // Aplanar datos de profiles
      const formattedData = (data || []).map((offer: any) => ({
        ...offer,
        full_name: offer.profiles?.full_name,
        email: offer.profiles?.email,
        phone: offer.profiles?.phone,
      }));

      setJobOffers(formattedData);
      onUpdate?.(formattedData);
    } catch (err) {
      console.error('Error fetching job offers:', err);
      setError(err as Error);
      toast.error('Error al cargar ofertas de trabajo');
    } finally {
      setLoading(false);
    }
  }, [status, onUpdate]);

  // Configurar sincronización en tiempo real
  const { status: realtimeStatus, isConnected } = useSupabaseRealtimeSync<JobOfferSupabase>({
    table: 'job_offers',
    event: '*',
    enabled: autoSync,
    onInsert: (payload) => {
      console.log('New job offer inserted:', payload.new);
      fetchJobOffers();
      toast.info('Nueva oferta de trabajo publicada', {
        description: 'La lista se ha actualizado automáticamente'
      });
    },
    onUpdate: (payload) => {
      console.log('Job offer updated:', payload.new);
      fetchJobOffers();
    },
    onDelete: (payload) => {
      console.log('Job offer deleted:', payload.old);
      fetchJobOffers();
    },
    onError: (error) => {
      console.error('Realtime error:', error);
      toast.error('Error en sincronización en tiempo real');
    },
  });

  // Cargar datos iniciales
  useEffect(() => {
    fetchJobOffers();
  }, [fetchJobOffers]);

  // Agregar nueva oferta
  const addJobOffer = useCallback(async (
    offer: Omit<JobOfferSupabase, 'id' | 'created_at' | 'updated_at' | 'estado' | 'fecha_publicacion'>
  ) => {
    try {
      const { data, error: insertError } = await supabase
        .from('job_offers')
        .insert([{
          ...offer,
          estado: 'pendiente',
        }])
        .select()
        .single();

      if (insertError) throw insertError;

      toast.success('Oferta publicada exitosamente', {
        description: 'La oferta será revisada por un administrador'
      });

      return data as JobOfferSupabase;
    } catch (err) {
      console.error('Error adding job offer:', err);
      toast.error('Error al publicar oferta');
      throw err;
    }
  }, []);

  // Actualizar oferta
  const updateJobOffer = useCallback(async (
    id: string,
    updates: Partial<JobOfferSupabase>
  ) => {
    try {
      const { error: updateError } = await supabase
        .from('job_offers')
        .update(updates)
        .eq('id', id);

      if (updateError) throw updateError;

      toast.success('Oferta actualizada');
    } catch (err) {
      console.error('Error updating job offer:', err);
      toast.error('Error al actualizar oferta');
      throw err;
    }
  }, []);

  // Aprobar oferta
  const approveJobOffer = useCallback(async (id: string, adminUserId: string) => {
    try {
      // Llamar a la función de Supabase
      const { error: approveError } = await supabase.rpc('approve_job_offer', {
        offer_id: id,
        admin_user_id: adminUserId,
      });

      if (approveError) throw approveError;

      toast.success('Oferta aprobada', {
        description: 'La oferta ahora aparecerá en el listado público',
        duration: 5000,
      });
    } catch (err) {
      console.error('Error approving job offer:', err);
      toast.error('Error al aprobar oferta');
      throw err;
    }
  }, []);

  // Rechazar oferta
  const rejectJobOffer = useCallback(async (
    id: string,
    adminUserId: string,
    reason?: string
  ) => {
    try {
      // Llamar a la función de Supabase
      const { error: rejectError } = await supabase.rpc('reject_job_offer', {
        offer_id: id,
        admin_user_id: adminUserId,
        reason: reason || null,
      });

      if (rejectError) throw rejectError;

      toast.success('Oferta rechazada');
    } catch (err) {
      console.error('Error rejecting job offer:', err);
      toast.error('Error al rechazar oferta');
      throw err;
    }
  }, []);

  // Eliminar oferta
  const deleteJobOffer = useCallback(async (id: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('job_offers')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      toast.success('Oferta eliminada');
    } catch (err) {
      console.error('Error deleting job offer:', err);
      toast.error('Error al eliminar oferta');
      throw err;
    }
  }, []);

  return {
    jobOffers,
    loading,
    error,
    isConnected,
    realtimeStatus,
    addJobOffer,
    updateJobOffer,
    approveJobOffer,
    rejectJobOffer,
    deleteJobOffer,
    refresh: fetchJobOffers,
  };
}
