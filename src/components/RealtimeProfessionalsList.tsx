import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MapPin, Phone, Clock, CheckCircle, User, EnvelopeSimple } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useProfessionalsSync } from '@/hooks/useProfessionalsSync';

interface RealtimeProfessionalsListProps {
  onSelectProfessional?: (professional: any) => void;
}

export function RealtimeProfessionalsList({ onSelectProfessional }: RealtimeProfessionalsListProps) {
  const { professionals } = useProfessionalsSync();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const approvedProfessionals = professionals.filter(p => p.status === 'approved');

  const categories = useMemo(() => {
    const cats = new Set(approvedProfessionals.map(p => p.category));
    return Array.from(cats).sort();
  }, [approvedProfessionals]);

  const filteredProfessionals = useMemo(() => {
    return approvedProfessionals.filter(prof => {
      const matchesSearch = !searchTerm || 
        prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prof.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prof.city?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === 'all' || prof.category === categoryFilter;
      
      return matchesSearch && matchesCategory;
    });
  }, [approvedProfessionals, searchTerm, categoryFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Buscar por nombre, especialidad o ciudad..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-64">
            <SelectValue placeholder="Todas las categorías" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las categorías</SelectItem>
            {categories.map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredProfessionals.length} profesional{filteredProfessionals.length !== 1 ? 'es' : ''} encontrado{filteredProfessionals.length !== 1 ? 's' : ''}
        </p>
        <Badge variant="outline" className="animate-pulse">
          <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
          Actualización en tiempo real
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProfessionals.map((prof) => (
            <motion.div
              key={prof.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={prof.avatar} alt={prof.name} />
                      <AvatarFallback>
                        {prof.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg truncate">{prof.name}</h3>
                      <p className="text-sm text-muted-foreground truncate">{prof.title}</p>
                      <Badge variant="secondary" className="mt-1">
                        {prof.category}
                      </Badge>
                    </div>
                  </div>

                  {prof.rating && (
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <Star weight="fill" className="h-4 w-4 text-yellow-500" />
                        <span className="ml-1 font-medium">{prof.rating.toFixed(1)}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({prof.reviews || 0} reseñas)
                      </span>
                    </div>
                  )}

                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {prof.description}
                  </p>

                  <div className="space-y-2 text-sm">
                    {prof.years_experience && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle weight="bold" className="h-4 w-4" />
                        <span>{prof.years_experience} años de experiencia</span>
                      </div>
                    )}
                    {prof.city && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin weight="bold" className="h-4 w-4" />
                        <span>{prof.city}</span>
                      </div>
                    )}
                    {prof.schedule && prof.schedule.length > 0 && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock weight="bold" className="h-4 w-4" />
                        <span className="truncate">{prof.schedule[0]}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button 
                      className="flex-1" 
                      onClick={() => onSelectProfessional?.(prof)}
                    >
                      Ver perfil
                    </Button>
                    {prof.phone && (
                      <Button variant="outline" size="icon" asChild>
                        <a href={`tel:${prof.phone}`}>
                          <Phone weight="bold" className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {prof.email && (
                      <Button variant="outline" size="icon" asChild>
                        <a href={`mailto:${prof.email}`}>
                          <EnvelopeSimple weight="bold" className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredProfessionals.length === 0 && (
        <div className="text-center py-12">
          <User className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No se encontraron profesionales</h3>
          <p className="text-muted-foreground">
            Intenta ajustar los filtros de búsqueda
          </p>
        </div>
      )}
    </div>
  );
}
