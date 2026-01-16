import { useEffect, useCallback, useRef } from 'react';
import { useKV } from '@github/spark/hooks';

interface UseRealtimeSyncOptions {
  syncInterval?: number;
}

type WithTimestamp<T> = T & { _lastUpdate?: string };

export function useRealtimeSync<T>(
  key: string,
  options: UseRealtimeSyncOptions = {},
  onUpdate?: (data: T) => void
) {
  const { syncInterval = 5000 } = options;
  const [data, setData] = useKV<WithTimestamp<T> | undefined>(key, undefined);
  const lastUpdateRef = useRef<string>('');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const checkForUpdates = useCallback(async () => {
    try {
      const currentData = await window.spark.kv.get<WithTimestamp<T>>(key);
      
      if (currentData && currentData._lastUpdate !== lastUpdateRef.current) {
        lastUpdateRef.current = currentData._lastUpdate || '';
        setData(currentData);
        onUpdate?.(currentData as T);
      }
    } catch (error) {
      console.error('Error checking for updates:', error);
    }
  }, [key, onUpdate, setData]);

  const updateData = useCallback(async (newData: T | ((current: T) => T)) => {
    setData((current) => {
      const updated = typeof newData === 'function' ? (newData as (current: T) => T)(current as T) : newData;
      const withTimestamp = {
        ...updated,
        _lastUpdate: new Date().toISOString()
      };
      lastUpdateRef.current = withTimestamp._lastUpdate;
      return withTimestamp as WithTimestamp<T>;
    });
  }, [setData]);

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
