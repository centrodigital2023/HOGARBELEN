import { Star, MapPin, Calendar } from '@phosphor-icons/react';
import { Card, CardContent } from '../componentes/ui/tarjeta';
import Button from '../componentes/ui/botón';
import Avatar from '../componentes/ui/avatar';
import Insignia from '../componentes/ui/insignia';

interface Professional {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  availability: string;
  location: string;
  photoUrl?: string;
  verified?: boolean;
}

interface TarjetaProfesionalProps {
  professional: Professional;
  onContact: (id: string) => void;
}

const TarjetaProfesional = ({ professional, onContact }: TarjetaProfesionalProps) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-shrink-0">
            <Avatar src={professional.photoUrl} size="lg" />
          </div>

          <div className="flex-1 space-y-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-semibold text-foreground">{professional.name}</h3>
                {professional.verified && (
                  <Insignia variant="success">Verificado</Insignia>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{professional.specialty}</p>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star size={16} weight="fill" className="text-yellow-500" />
                <span className="font-medium">{professional.rating}</span>
                <span>({professional.reviews} reseñas)</span>
              </div>

              <div className="flex items-center gap-1">
                <MapPin size={16} />
                <span>{professional.location}</span>
              </div>

              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>{professional.availability}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => onContact(professional.id)}
              >
                Contactar
              </Button>
              <Button variant="outline" size="sm">
                Ver Perfil
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TarjetaProfesional;
