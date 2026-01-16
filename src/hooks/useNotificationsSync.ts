import { useCallback } from 'react';
import { useRealtimeSync } from './useRealtimeSync';
import { toast } from 'sonner';

export interface Notification {
  id: string;
  type: 'professional_approved' | 'professional_rejected' | 'new_message' | 'system';
  title: string;
  message: string;
  recipient_id: string;
  recipient_role: 'professional' | 'family' | 'admin';
  read: boolean;
  created_at: string;
  data?: any;
}

export function useNotificationsSync(userId?: string, role?: string) {
  const { data: allNotifications, updateData, refresh } = useRealtimeSync<Notification[]>(
    'notifications',
    { syncInterval: 3000 },
    (data) => {
      if (!userId) return;
      
      const userNotifications = data?.filter(
        (n: Notification) => n.recipient_id === userId && !n.read
      ) || [];

      const lastNotification = userNotifications[userNotifications.length - 1];
      if (lastNotification && Date.now() - new Date(lastNotification.created_at).getTime() < 5000) {
        toast.info(lastNotification.title, {
          description: lastNotification.message
        });
      }
    }
  );

  const notifications = userId 
    ? (allNotifications || []).filter(n => n.recipient_id === userId || n.recipient_role === role)
    : allNotifications || [];

  const unreadCount = notifications.filter(n => !n.read).length;

  const sendNotification = useCallback(async (notification: Omit<Notification, 'id' | 'created_at' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      read: false,
      created_at: new Date().toISOString()
    };

    await updateData((current) => {
      const list = current || [];
      return [...list, newNotification];
    });

    return newNotification;
  }, [updateData]);

  const markAsRead = useCallback(async (id: string) => {
    await updateData((current) => {
      const list = current || [];
      return list.map(notif => 
        notif.id === id 
          ? { ...notif, read: true }
          : notif
      );
    });
  }, [updateData]);

  const markAllAsRead = useCallback(async () => {
    if (!userId) return;
    
    await updateData((current) => {
      const list = current || [];
      return list.map(notif => 
        notif.recipient_id === userId
          ? { ...notif, read: true }
          : notif
      );
    });

    toast.success('Todas las notificaciones marcadas como leídas');
  }, [updateData, userId]);

  const deleteNotification = useCallback(async (id: string) => {
    await updateData((current) => {
      const list = current || [];
      return list.filter(notif => notif.id !== id);
    });
  }, [updateData]);

  return {
    notifications,
    unreadCount,
    sendNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    refresh
  };
}
