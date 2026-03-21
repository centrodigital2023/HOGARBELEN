import { Heart } from 'lucide-react';

export default function LoadingFallback() {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Heart className="w-8 h-8 text-primary animate-pulse" />
          </div>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-foreground mb-1">Cargando...</p>
          <p className="text-sm text-muted-foreground">Preparando su experiencia</p>
        </div>
      </div>
    </div>
  );
}
