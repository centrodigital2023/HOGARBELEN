import { Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface VerifiedBadgeProps {
  verified: boolean;
  verifiedAt?: string | null;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

/**
 * Blue verification check badge for verified professionals
 * Only admins can grant verification
 */
const VerifiedBadge = ({ 
  verified, 
  verifiedAt, 
  size = 'md',
  showText = true 
}: VerifiedBadgeProps) => {
  if (!verified) return null;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5'
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16
  };

  const formattedDate = verifiedAt 
    ? new Date(verifiedAt).toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : '';

  return (
    <Badge 
      variant="default" 
      className={`bg-blue-500 hover:bg-blue-600 ${sizeClasses[size]}`}
      title={verifiedAt ? `Verificado el ${formattedDate}` : 'Verificado por Hogar Belén'}
    >
      <Shield size={iconSizes[size]} className={showText ? 'mr-1' : ''} />
      {showText && 'Verificado'}
    </Badge>
  );
};

export default VerifiedBadge;
