import { supabase } from './supabase';
import { RealtimeChannel } from '@supabase/supabase-js';

/**
 * Utilidades para Supabase Realtime
 * Configuración de canales, suscripciones y helpers
 */

export interface RealtimeChannelConfig {
  name: string;
  table: string;
  event?: 'INSERT' | 'UPDATE' | 'DELETE' | '*';
  filter?: string;
  schema?: string;
}

/**
 * Crea un canal de Realtime configurado
 */
export function createRealtimeChannel(config: RealtimeChannelConfig): RealtimeChannel {
  const { name, table, event = '*', filter, schema = 'public' } = config;

  const channel = supabase.channel(name);

  return channel.on(
    'postgres_changes' as any,
    {
      event: event as any,
      schema,
      table,
      ...(filter ? { filter } : {}),
    },
    (payload) => {
      console.log(`Realtime event on ${table}:`, payload);
    }
  );
}

/**
 * Suscribe a un canal y maneja el ciclo de vida
 */
export async function subscribeToChannel(
  channel: RealtimeChannel,
  onSubscribed?: () => void,
  onError?: (error: Error) => void
): Promise<RealtimeChannel> {
  return new Promise((resolve, reject) => {
    channel.subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        console.log('✅ Channel subscribed successfully');
        onSubscribed?.();
        resolve(channel);
      } else if (status === 'CLOSED' || status === 'CHANNEL_ERROR') {
        const error = new Error(`Channel subscription failed with status: ${status}`);
        console.error('❌ Channel subscription error:', error);
        onError?.(error);
        reject(error);
      }
    });
  });
}

/**
 * Desuscribe de un canal de manera segura
 */
export async function unsubscribeFromChannel(channel: RealtimeChannel): Promise<void> {
  try {
    await supabase.removeChannel(channel);
    console.log('✅ Channel unsubscribed successfully');
  } catch (error) {
    console.error('❌ Error unsubscribing from channel:', error);
    throw error;
  }
}

/**
 * Verifica si Realtime está habilitado en Supabase
 */
export async function checkRealtimeStatus(): Promise<boolean> {
  try {
    const testChannel = supabase.channel('test-channel');
    
    return new Promise((resolve) => {
      testChannel.subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          supabase.removeChannel(testChannel);
          resolve(true);
        } else if (status === 'CLOSED' || status === 'CHANNEL_ERROR') {
          resolve(false);
        }
      });

      // Timeout después de 5 segundos
      setTimeout(() => {
        supabase.removeChannel(testChannel);
        resolve(false);
      }, 5000);
    });
  } catch (error) {
    console.error('Error checking realtime status:', error);
    return false;
  }
}

/**
 * Obtiene todos los canales activos
 */
export function getActiveChannels(): RealtimeChannel[] {
  return supabase.getChannels();
}

/**
 * Limpia todos los canales activos
 */
export async function cleanupAllChannels(): Promise<void> {
  const channels = getActiveChannels();
  
  for (const channel of channels) {
    try {
      await supabase.removeChannel(channel);
    } catch (error) {
      console.error('Error removing channel:', error);
    }
  }
  
  console.log(`✅ Cleaned up ${channels.length} channels`);
}

/**
 * Helper para crear filtros de Realtime
 */
export function createRealtimeFilter(column: string, value: string): string {
  return `${column}=eq.${value}`;
}

/**
 * Helper para eventos de profesionales
 */
export const professionalRealtimeHelpers = {
  filterByStatus: (status: 'pending' | 'approved' | 'rejected') => 
    createRealtimeFilter('verification_status', status),
  
  filterByUserId: (userId: string) => 
    createRealtimeFilter('user_id', userId),
};

/**
 * Helper para eventos de ofertas de trabajo
 */
export const jobOfferRealtimeHelpers = {
  filterByStatus: (status: 'pendiente' | 'aprobada' | 'rechazada') => 
    createRealtimeFilter('estado', status),
  
  filterByUserId: (userId: string) => 
    createRealtimeFilter('user_id', userId),
  
  filterByLocation: (location: string) => 
    createRealtimeFilter('ubicacion', location),
};

/**
 * Configuración de reconexión automática
 */
export interface ReconnectConfig {
  maxAttempts: number;
  baseDelay: number;
  maxDelay: number;
}

export const defaultReconnectConfig: ReconnectConfig = {
  maxAttempts: 5,
  baseDelay: 1000,
  maxDelay: 30000,
};

/**
 * Calcula el delay exponencial para reconexión
 */
export function calculateReconnectDelay(
  attempt: number,
  config: ReconnectConfig = defaultReconnectConfig
): number {
  const delay = config.baseDelay * Math.pow(2, attempt);
  return Math.min(delay, config.maxDelay);
}
