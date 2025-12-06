import { X } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  onClose?: () => void;
}

export const Toast = ({ message, type = 'info', onClose }: ToastProps) => {
  const typeStyles = {
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  };

  return (
    <div className={cn(
      "flex items-center justify-between p-4 rounded-lg border shadow-lg",
      typeStyles[type]
    )}>
      <span className="text-sm font-medium">{message}</span>
      {onClose && (
        <button 
          onClick={onClose}
          className="ml-4 text-current opacity-70 hover:opacity-100 transition-opacity"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};
