import { useCallback } from 'react';
import { useRealtimeSync } from './useRealtimeSync';
import { toast } from 'sonner';

export interface Professional {
  id: string;
  name: string;
  email: string;
  title: string;
  category: string;
  description: string;
  years_experience: number;
  phone?: string;
  city?: string;
  avatar?: string;
  rating?: number;
  reviews?: number;
  schedule?: string[];
  status: 'pending' | 'approved' | 'rejected';
  ai_score?: number;
  ai_analysis?: any;
  rejection_reason?: string;
  created_at: string;
  updated_at: string;
  approved_by?: string;
  approved_at?: string;
}

export function useProfessionalsSync(options?: { onUpdate?: (data: Professional[]) => void }) {
  const { data: professionals, updateData, refresh } = useRealtimeSync<Professional[]>(
    'professionals',
    { syncInterval: 2000 },
    options?.onUpdate
  );

  const addProfessional = useCallback(async (professional: Omit<Professional, 'id' | 'created_at' | 'updated_at'>) => {
    const newProfessional: Professional = {
      ...professional,
      id: `prof_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    await updateData((current) => {
      const list = current || [];
      return [...list, newProfessional];
    });

    toast.success('Profesional registrado exitosamente');
    return newProfessional;
  }, [updateData]);

  const updateProfessional = useCallback(async (id: string, updates: Partial<Professional>) => {
    await updateData((current) => {
      const list = current || [];
      return list.map(prof => 
        prof.id === id 
          ? { ...prof, ...updates, updated_at: new Date().toISOString() }
          : prof
      );
    });

    toast.success('Profesional actualizado');
  }, [updateData]);

  const approveProfessional = useCallback(async (id: string, approvedBy: string) => {
    await updateData((current) => {
      const list = current || [];
      return list.map(prof => 
        prof.id === id 
          ? { 
              ...prof, 
              status: 'approved' as const,
              approved_by: approvedBy,
              approved_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }
          : prof
      );
    });

    toast.success('Profesional aprobado', {
      description: 'El profesional ahora aparecerá en el listado público'
    });
  }, [updateData]);

  const rejectProfessional = useCallback(async (id: string, reason: string) => {
    await updateData((current) => {
      const list = current || [];
      return list.map(prof => 
        prof.id === id 
          ? { 
              ...prof, 
              status: 'rejected' as const,
              rejection_reason: reason,
              updated_at: new Date().toISOString()
            }
          : prof
      );
    });

    toast.success('Profesional rechazado');
  }, [updateData]);

  const deleteProfessional = useCallback(async (id: string) => {
    await updateData((current) => {
      const list = current || [];
      return list.filter(prof => prof.id !== id);
    });

    toast.success('Profesional eliminado');
  }, [updateData]);

  return {
    professionals: professionals || [],
    addProfessional,
    updateProfessional,
    approveProfessional,
    rejectProfessional,
    deleteProfessional,
    refresh
  };
}
