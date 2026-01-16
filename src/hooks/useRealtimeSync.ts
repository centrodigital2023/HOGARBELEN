import { useEffect, useCallback, useRef } from 'react';
import { useKV } from '@github/spark/hooks';

interface SyncConfig {
  key: string;
  syncInterval?: number;

 


    try {
      
  const lastUpdateRef = useRef<string>('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const checkForUpdates = useCallback(async () => {
    try {
      const currentData = await window.spark.kv.get<T & { _lastUpdate?: string }>(key);
      
      if (currentData && currentData._lastUpdate !== lastUpdateRef.current) {
        lastUpdateRef.current = currentData._lastUpdate || '';
        setData(currentData);
        onUpdate?.(currentData);
      }
    } catch (error) {
      console.error('Error checking for updates:', error);
    }
  }, [key, onUpdate]);

  const updateData = useCallback(async (newData: T | ((current: T) => T)) => {
    setData((current) => {
      const updated = typeof newData === 'function' ? (newData as (current: T) => T)(current) : newData;
      const withTimestamp = {
        ...updated,
        _lastUpdate: new Date().toISOString()
      };
      lastUpdateRef.current = withTimestamp._lastUpdate;
      return withTimestamp as T;
    });
  }, [setData]);

  useEffect(() => {
    checkForUpdates();
    
    if (syncInterval > 0) {
      intervalRef.current = setInterval(checkForUpdates, syncInterval);
    }

}








