import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, MapPin, Clock, User, Sparkles } from 'lucide-react';

interface BusquedaServiciosProps {
  onSearch: (filters: SearchFilters) => void;
}

interface SearchFilters {
  category: string;
  location: string;
  availability: string;
  experience: string;
  specialNeeds: string;
}

const CATEGORIES = ['Enfermería', 'Cuidadores', 'Terapia', 'Médicos', 'Otros'];
const LOCATIONS = ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Pasto', 'Otra'];
const AVAILABILITY = ['Inmediata', 'En 24 horas', 'En una semana', 'Flexible'];
const EXPERIENCE_LEVELS = ['Menos de 1 año', '1-3 años', '3-5 años', 'Más de 5 años', 'Cualquiera'];

export default function FormularioBusquedaServicios({ onSearch }: BusquedaServiciosProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    category: '',
    location: '',
    availability: '',
    experience: '',
    specialNeeds: ''
  });

  const handleFilterChange = (field: keyof SearchFilters, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleReset = () => {
    setFilters({
      category: '',
      location: '',
      availability: '',
      experience: '',
      specialNeeds: ''
    });
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
            <Search className="text-primary-600" size={24} />
          </div>
          <div>
            <CardTitle className="text-2xl">Encuentra el Profesional Ideal</CardTitle>
            <CardDescription className="text-base">
              Completa tus necesidades y te mostraremos los mejores profesionales disponibles
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-base font-semibold flex items-center gap-2">
                <User className="w-4 h-4" />
                Tipo de Profesional
              </Label>
              <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {CATEGORIES.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-base font-semibold flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Ubicación
              </Label>
              <Select value={filters.location} onValueChange={(value) => handleFilterChange('location', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="¿Dónde necesitas el servicio?" />
                </SelectTrigger>
                <SelectContent>
                  {LOCATIONS.map(loc => (
                    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="availability" className="text-base font-semibold flex items-center gap-2">
                <Clock className="w-4 h-4" />
                ¿Cuándo necesitas el servicio?
              </Label>
              <Select value={filters.availability} onValueChange={(value) => handleFilterChange('availability', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona disponibilidad" />
                </SelectTrigger>
                <SelectContent>
                  {AVAILABILITY.map(avail => (
                    <SelectItem key={avail} value={avail}>{avail}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience" className="text-base font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Experiencia Deseada
              </Label>
              <Select value={filters.experience} onValueChange={(value) => handleFilterChange('experience', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Años de experiencia" />
                </SelectTrigger>
                <SelectContent>
                  {EXPERIENCE_LEVELS.map(exp => (
                    <SelectItem key={exp} value={exp}>{exp}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialNeeds" className="text-base font-semibold">
              Necesidades Especiales o Comentarios
            </Label>
            <Textarea
              id="specialNeeds"
              value={filters.specialNeeds}
              onChange={(e) => handleFilterChange('specialNeeds', e.target.value)}
              placeholder="Describe cualquier necesidad especial, condición médica o requisito específico..."
              className="min-h-24"
            />
            <p className="text-xs text-gray-500">
              Ej: Experiencia con Alzheimer, disponibilidad nocturna, manejo de sonda, etc.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
            <Button type="submit" className="flex-1" size="lg">
              <Search className="w-5 h-5 mr-2" />
              Buscar Profesionales
            </Button>
            <Button type="button" variant="outline" onClick={handleReset} size="lg" className="sm:w-auto">
              Limpiar Filtros
            </Button>
          </div>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>💡 Consejo:</strong> Cuanto más específica sea tu búsqueda, mejores resultados obtendrás. 
            Nuestro algoritmo inteligente te mostrará los profesionales más adecuados para tus necesidades.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
