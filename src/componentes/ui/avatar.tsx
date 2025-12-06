import { User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const Avatar = ({ 
  src, 
  alt = "Avatar", 
  size = "md",
  className = "" 
}: AvatarProps) => {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24"
  };

  return (
    <div className={cn(
      sizes[size],
      "rounded-full bg-gray-200 overflow-hidden flex items-center justify-center",
      className
    )}>
      {src ? (
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover"
        />
      ) : (
        <User className="w-1/2 h-1/2 text-gray-400" />
      )}
    </div>
  );
};

export default Avatar;
