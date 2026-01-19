import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Briefcase, Clock, Phone } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useJobOffersSupabase, JobOfferSupabase } from '@/hooks/useJobOffersSupabase';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface PublicJobOffersProps {
  onSelectOffer?: (offer: JobOfferSupabase) => void;
}

export function PublicJobOffers({ onSelectOffer }: PublicJobOffersProps) {
  const { jobOffers, loading } = useJobOffersSupabase({ status: 'aprobada' });
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedOffer, setSelectedOffer] = useState<JobOfferSupabase | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  // Extraer ubicaciones y tipos únicos
  const locations = useMemo(() => {
    const locs = new Set(jobOffers.map(o => o.ubicacion));
    return Array.from(locs).sort();
  }, [jobOffers]);

  const types = useMemo(() => {
    const tps = new Set(jobOffers.map(o => o.tipo_servicio));
    return Array.from(tps).sort();
  }, [jobOffers]);

  // Filtrar ofertas
  const filteredOffers = useMemo(() => {
    return jobOffers.filter(offer => {
      const matchesSearch = !searchTerm || 
        offer.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLocation = locationFilter === 'all' || offer.ubicacion === locationFilter;
      const matchesType = typeFilter === 'all' || offer.tipo_servicio === typeFilter;
      
      return matchesSearch && matchesLocation && matchesType;
    });
  }, [jobOffers, searchTerm, locationFilter, typeFilter]);

  const handleViewDetails = (offer: JobOfferSupabase) => {
    setSelectedOffer(offer);
    setShowDetailsDialog(true);
    onSelectOffer?.(offer);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando ofertas de trabajo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          placeholder="Buscar ofertas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
        <Select value={locationFilter} onValueChange={setLocationFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Todas las ubicaciones" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las ubicaciones</SelectItem>
            {locations.map(loc => (
              <SelectItem key={loc} value={loc}>{loc}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Todos los tipos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los tipos</SelectItem>
            {types.map(type => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Información de resultados */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredOffers.length} oferta{filteredOffers.length !== 1 ? 's' : ''} encontrada{filteredOffers.length !== 1 ? 's' : ''}
        </p>
        <Badge variant="outline" className="animate-pulse">
          <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
          Actualización en tiempo real
        </Badge>
      </div>

      {/* Lista de ofertas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredOffers.map((offer) => (
            <motion.div
              key={offer.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-lg">{offer.titulo}</h3>
                      <Badge variant="outline" className="mt-1">
                        {offer.tipo_servicio}
                      </Badge>
                    </div>
                    {offer.urgencia === 'urgente' && (
                      <Badge variant="destructive">URGENTE</Badge>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {offer.descripcion}
                  </p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin weight="bold" className="h-4 w-4" />
                      <span>{offer.ubicacion}</span>
                    </div>
                    {offer.salario_rango && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Briefcase weight="bold" className="h-4 w-4" />
                        <span>{offer.salario_rango}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock weight="bold" className="h-4 w-4" />
                      <span>
                        Publicado {formatDistanceToNow(new Date(offer.fecha_publicacion || offer.created_at), { 
                          addSuffix: true,
                          locale: es
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button 
                      className="flex-1"
                      onClick={() => handleViewDetails(offer)}
                    >
                      Ver detalles
                    </Button>
                    {offer.contacto && (
                      <Button variant="outline" size="icon" asChild>
                        <a href={`tel:${offer.contacto}`}>
                          <Phone weight="bold" className="h-4 w-4" />
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

      {/* Mensaje cuando no hay resultados */}
      {filteredOffers.length === 0 && !loading && (
        <div className="text-center py-12">
          <Briefcase className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No se encontraron ofertas</h3>
          <p className="text-muted-foreground">
            {searchTerm || locationFilter !== 'all' || typeFilter !== 'all'
              ? 'Intenta ajustar los filtros de búsqueda'
              : 'No hay ofertas de trabajo disponibles en este momento'}
          </p>
        </div>
      )}

      {/* Dialog de detalles */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedOffer?.titulo}</DialogTitle>
            <DialogDescription>
              <div className="flex items-center gap-2 mt-2">
                <Badge>{selectedOffer?.tipo_servicio}</Badge>
                {selectedOffer?.urgencia === 'urgente' && (
                  <Badge variant="destructive">URGENTE</Badge>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
          {selectedOffer && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-1">Ubicación</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {selectedOffer.ubicacion}
                  </p>
                </div>
                {selectedOffer.salario_rango && (
                  <div>
                    <p className="text-sm font-medium mb-1">Rango Salarial</p>
                    <p className="text-sm text-muted-foreground">{selectedOffer.salario_rango}</p>
                  </div>
                )}
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Descripción</p>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{selectedOffer.descripcion}</p>
              </div>

              {selectedOffer.requisitos && (
                <div>
                  <p className="text-sm font-medium mb-2">Requisitos</p>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{selectedOffer.requisitos}</p>
                </div>
              )}

              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-2">Información de Contacto</p>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <a 
                    href={`tel:${selectedOffer.contacto}`}
                    className="text-sm text-primary hover:underline"
                  >
                    {selectedOffer.contacto}
                  </a>
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                <p>
                  Publicado {formatDistanceToNow(new Date(selectedOffer.fecha_publicacion || selectedOffer.created_at), { 
                    addSuffix: true,
                    locale: es
                  })}
                </p>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1" asChild>
                  <a href={`tel:${selectedOffer.contacto}`}>
                    <Phone weight="bold" className="h-4 w-4 mr-2" />
                    Llamar ahora
                  </a>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
