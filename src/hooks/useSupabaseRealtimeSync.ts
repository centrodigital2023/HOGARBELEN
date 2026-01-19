import { useEffect, useState, useCallback, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { RealtimeChannel, RealtimePostgresChangesPayload } from '@supabase/supabase-js';

export type RealtimeEvent = 'INSERT' | 'UPDATE' | 'DELETE' | '*';
export type ConnectionStatus = 'connected' | 'connecting' | 'disconnected';

interface UseSupabaseRealtimeSyncOptions<T extends Record<string, any>> {
  table: string;
  event?: RealtimeEvent;
  filter?: string;
  onInsert?: (payload: RealtimePostgresChangesPayload<T>) => void;
  onUpdate?: (payload: RealtimePostgresChangesPayload<T>) => void;
  onDelete?: (payload: RealtimePostgresChangesPayload<T>) => void;
  onError?: (error: Error) => void;
  enabled?: boolean;
}

/**
 * Hook genérico para sincronización en tiempo real con Supabase
 * 
 * @example
 * ```tsx
 * const { status, subscribe, unsubscribe } = useSupabaseRealtimeSync({
 *   table: 'professionals',
 *   event: '*',
 *   onInsert: (payload) => console.log('New professional:', payload.new),
 *   onUpdate: (payload) => console.log('Updated professional:', payload.new),
 *   onDelete: (payload) => console.log('Deleted professional:', payload.old),
 * });
 * ```
 */
export function useSupabaseRealtimeSync<T extends Record<string, any> = Record<string, any>>(
  options: UseSupabaseRealtimeSyncOptions<T>
) {
  const {
    table,
    event = '*',
    filter,
    onInsert,
    onUpdate,
    onDelete,
    onError,
    enabled = true,
  } = options;

  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const channelRef = useRef<RealtimeChannel | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 5;

  const cleanup = useCallback(() => {
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  }, []);

  const subscribe = useCallback(async () => {
    try {
      cleanup();
      setStatus('connecting');

      // Crear nombre de canal único
      const channelName = `realtime:${table}:${Date.now()}`;
      
      // Crear canal de Realtime
      const channel = supabase.channel(channelName);

      // Configurar filtro si existe
      let subscription = channel.on(
        'postgres_changes' as any,
        {
          event: event as any,
          schema: 'public',
          table: table,
          ...(filter ? { filter } : {}),
        },
        (payload: RealtimePostgresChangesPayload<T>) => {
          try {
            // Manejar diferentes tipos de eventos
            if (payload.eventType === 'INSERT' && onInsert) {
              onInsert(payload);
            } else if (payload.eventType === 'UPDATE' && onUpdate) {
              onUpdate(payload);
            } else if (payload.eventType === 'DELETE' && onDelete) {
              onDelete(payload);
            }
          } catch (error) {
            console.error('Error handling realtime event:', error);
            onError?.(error as Error);
          }
        }
      );

      // Suscribir al canal
      channel.subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setStatus('connected');
          reconnectAttemptsRef.current = 0;
          console.log(`✅ Subscribed to ${table} realtime updates`);
        } else if (status === 'CLOSED' || status === 'CHANNEL_ERROR') {
          setStatus('disconnected');
          
          // Intentar reconectar automáticamente
          if (reconnectAttemptsRef.current < maxReconnectAttempts) {
            reconnectAttemptsRef.current++;
            const delay = Math.min(1000 * Math.pow(2, reconnectAttemptsRef.current), 30000);
            
            console.log(`⚠️ Connection lost. Reconnecting in ${delay}ms (attempt ${reconnectAttemptsRef.current}/${maxReconnectAttempts})...`);
            
            reconnectTimeoutRef.current = setTimeout(() => {
              subscribe();
            }, delay);
          } else {
            console.error(`❌ Failed to reconnect after ${maxReconnectAttempts} attempts`);
            onError?.(new Error('Failed to maintain realtime connection'));
          }
        }
      });

      channelRef.current = channel;
    } catch (error) {
      console.error('Error subscribing to realtime:', error);
      setStatus('disconnected');
      onError?.(error as Error);
    }
  }, [table, event, filter, onInsert, onUpdate, onDelete, onError, cleanup]);

  const unsubscribe = useCallback(() => {
    cleanup();
    setStatus('disconnected');
  }, [cleanup]);

  // Auto-subscribe cuando el hook se monta y está habilitado
  useEffect(() => {
    if (enabled) {
      subscribe();
    }

    return () => {
      cleanup();
    };
  }, [enabled, subscribe, cleanup]);

  return {
    status,
    subscribe,
    unsubscribe,
    isConnected: status === 'connected',
    isConnecting: status === 'connecting',
    isDisconnected: status === 'disconnected',
  };
}
