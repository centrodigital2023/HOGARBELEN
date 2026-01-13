import { AuditLog } from '@/types/admin';

export const logAudit = async (logData: Omit<AuditLog, 'id' | 'timestamp'>) => {
  try {
    const logs = await window.spark.kv.get<AuditLog[]>('audit-logs') ?? [];
    
    const newLog: AuditLog = {
      ...logData,
      id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
    };

    await window.spark.kv.set('audit-logs', [...logs, newLog]);
    
    return newLog;
  } catch (error) {
    console.error('Failed to log audit:', error);
    return null;
  }
};

export const getAuditLogs = async (filters?: {
  user_id?: string;
  action?: string;
  resource_type?: string;
  start_date?: string;
  end_date?: string;
  limit?: number;
}): Promise<AuditLog[]> => {
  try {
    let logs = await window.spark.kv.get<AuditLog[]>('audit-logs') ?? [];

    if (filters?.user_id) {
      logs = logs.filter(log => log.user_id === filters.user_id);
    }

    if (filters?.action) {
      logs = logs.filter(log => log.action === filters.action);
    }

    if (filters?.resource_type) {
      logs = logs.filter(log => log.resource_type === filters.resource_type);
    }

    if (filters?.start_date) {
      logs = logs.filter(log => log.timestamp >= filters.start_date!);
    }

    if (filters?.end_date) {
      logs = logs.filter(log => log.timestamp <= filters.end_date!);
    }

    logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    if (filters?.limit) {
      logs = logs.slice(0, filters.limit);
    }

    return logs;
  } catch (error) {
    console.error('Failed to get audit logs:', error);
    return [];
  }
};

export const exportAuditLogs = (logs: AuditLog[]): string => {
  const headers = ['ID', 'Timestamp', 'User Email', 'Action', 'Resource Type', 'Resource ID', 'IP Address', 'Details'];
  const rows = logs.map(log => [
    log.id,
    log.timestamp,
    log.user_email,
    log.action,
    log.resource_type,
    log.resource_id || '',
    log.ip_address,
    JSON.stringify(log.details),
  ]);

  const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
  return csv;
};
