import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ConnectionStatus } from '@/hooks/useSupabaseRealtimeSync';
import { Circle } from '@phosphor-icons/react';

interface RealtimeIndicatorProps {
  status: ConnectionStatus;
  showLabel?: boolean;
  className?: string;
}

/**
 * Indicador visual del estado de sincronización en tiempo real
 * 
 * - Verde pulsante: Conectado y sincronizando
 * - Amarillo: Conectando...
 * - Rojo: Desconectado
 */
export function RealtimeIndicator({ 
  status, 
  showLabel = true,
  className = '' 
}: RealtimeIndicatorProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'connected':
        return {
          color: 'bg-green-500',
          label: 'Sincronizado',
          variant: 'default' as const,
          pulse: true,
          tooltip: 'Conectado - Los cambios se sincronizan automáticamente en tiempo real'
        };
      case 'connecting':
        return {
          color: 'bg-yellow-500',
          label: 'Conectando...',
          variant: 'secondary' as const,
          pulse: false,
          tooltip: 'Estableciendo conexión con el servidor...'
        };
      case 'disconnected':
        return {
          color: 'bg-red-500',
          label: 'Desconectado',
          variant: 'destructive' as const,
          pulse: false,
          tooltip: 'Sin conexión - Los datos pueden no estar actualizados'
        };
    }
  };

  const config = getStatusConfig();

  const indicator = (
    <Badge 
      variant={config.variant} 
      className={`flex items-center gap-2 ${className}`}
    >
      <div className="relative flex items-center justify-center">
        <Circle 
          weight="fill" 
          className={`h-2 w-2 ${config.color} rounded-full`}
        />
        {config.pulse && (
          <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
        )}
      </div>
      {showLabel && <span className="text-xs">{config.label}</span>}
    </Badge>
  );

  if (!showLabel) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {indicator}
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">{config.tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return indicator;
}
