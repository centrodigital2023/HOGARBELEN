import { useEffect, useCallback, useRef } from 'react';
import { useKV } from '@github/spark/hooks';

interface SyncConfig {
  key: string;
  syncInterval?: number;
  onUpdate?: (data: any) => void;
}

type WithTimestamp<T> = T & { _lastUpdate?: string };

export function useRealtimeSync<T>(config: SyncConfig, defaultValue: T) {
  const { key, syncInterval = 3000, onUpdate } = config;
  const [data, setData] = useKV<WithTimestamp<T>>(key, defaultValue as WithTimestamp<T>);
  const lastUpdateRef = useRef<string>('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const checkForUpdates = useCallback(async () => {
    try {
      const currentData = await window.spark.kv.get<WithTimestamp<T>>(key);
      
      if (currentData && currentData._lastUpdate !== lastUpdateRef.current) {
        lastUpdateRef.current = currentData._lastUpdate || '';
        setData(currentData);
        onUpdate?.(currentData);
      }
    } catch (error) {
      console.error('Error checking for updates:', error);
    }
  }, [key, onUpdate, setData]);

  const updateData = useCallback(async (newData: T | ((current: T) => T)) => {
    setData((current) => {
      const baseData = (current || defaultValue) as T;
      const updated = typeof newData === 'function' ? (newData as (current: T) => T)(baseData) : newData;
      const withTimestamp: WithTimestamp<T> = {
        ...updated,
        _lastUpdate: new Date().toISOString()
      };
      lastUpdateRef.current = withTimestamp._lastUpdate!;
      return withTimestamp;
    });
  }, [setData, defaultValue]);

  useEffect(() => {
    checkForUpdates();
    
    if (syncInterval > 0) {
      intervalRef.current = setInterval(checkForUpdates, syncInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [checkForUpdates, syncInterval]);

  return { data, updateData, refresh: checkForUpdates };
}



