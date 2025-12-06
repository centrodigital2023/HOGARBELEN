import { useState, useEffect } from 'react';
import { useToastContext } from './ToastContext';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = (message: string, type: Toast['type'] = 'info', duration = 3000) => {
    const id = Date.now().toString();
    const newToast = { id, message, type, duration };
    
    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        dismiss(id);
      }, duration);
    }

    return id;
  };

  const dismiss = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return {
    toasts,
    toast,
    success: (message: string, duration?: number) => toast(message, 'success', duration),
    error: (message: string, duration?: number) => toast(message, 'error', duration),
    info: (message: string, duration?: number) => toast(message, 'info', duration),
    warning: (message: string, duration?: number) => toast(message, 'warning', duration),
    dismiss,
  };
}
