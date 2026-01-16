import { useCallback } from 'react';
import { useRealtimeSync } from './useRealtimeSync';

export interface ActivityLog {
  id: string;
  user_id: string;
  user_name: string;
  user_role: 'admin' | 'professional' | 'family';
  action: string;
  entity_type: 'professional' | 'message' | 'notification' | 'profile' | 'system';
  entity_id?: string;
  details: string;
  metadata?: any;
  ip_address?: string;
  created_at: string;
}

export function useActivitySync() {
  const { data: activities, updateData, refresh } = useRealtimeSync<ActivityLog[]>({
    key: 'activity_logs',
    syncInterval: 5000
  }, []);

  const logActivity = useCallback(async (
    activity: Omit<ActivityLog, 'id' | 'created_at'>
  ) => {
    const newActivity: ActivityLog = {
      ...activity,
      id: `act_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      created_at: new Date().toISOString()
    };

    await updateData((current) => {
      const list = current || [];
      return [newActivity, ...list].slice(0, 1000);
    });

    return newActivity;
  }, [updateData]);

  const getActivitiesByUser = useCallback((userId: string) => {
    return (activities || []).filter(act => act.user_id === userId);
  }, [activities]);

  const getActivitiesByEntity = useCallback((entityType: string, entityId: string) => {
    return (activities || []).filter(
      act => act.entity_type === entityType && act.entity_id === entityId
    );
  }, [activities]);

  const getRecentActivities = useCallback((limit: number = 50) => {
    return (activities || []).slice(0, limit);
  }, [activities]);

  return {
    activities: activities || [],
    logActivity,
    getActivitiesByUser,
    getActivitiesByEntity,
    getRecentActivities,
    refresh
  };
}
