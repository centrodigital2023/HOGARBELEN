export const LoadingFallback = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
      </div>
      <p className="text-muted-foreground mt-4">Cargando...</p>
    </div>
  );
};






