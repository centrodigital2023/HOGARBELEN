import { MagnifyingGlass } from '@phosphor-icons/react';

interface BarraDeBúsquedaProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const BarraDeBúsqueda = ({ searchTerm, onSearchChange }: BarraDeBúsquedaProps) => {
  return (
    <div className="relative">
      <MagnifyingGlass 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
        size={20} 
      />
      <input
        type="text"
        id="search-professionals"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Buscar profesionales por nombre o especialidad..."
        className="w-full pl-12 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
      />
    </div>
  );
};

export default BarraDeBúsqueda;
