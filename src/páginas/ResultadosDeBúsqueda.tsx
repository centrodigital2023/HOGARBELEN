import { useState, useMemo } from 'react';
import { ArrowLeft } from '@phosphor-icons/react';
import Button from '../componentes/ui/botón';
import BarraDeBúsqueda from '../panel de control familiar/BarraDeBúsqueda';
import SecciónDeFiltro from '../panel de control familiar/SecciónDeFiltro';
import ListaDeProfesionales from '../panel de control familiar/ListaDeProfesionales';

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

interface ResultadosDeBúsquedaProps {
  setPage?: (page: string) => void;
}

const ResultadosDeBúsqueda = ({ setPage }: ResultadosDeBúsquedaProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('Todas');
  const [selectedAvailability, setSelectedAvailability] = useState('Todos');

  const professionals: Professional[] = [
    {
      id: '1',
      name: 'Dra. María González',
      specialty: 'Enfermería',
      rating: 4.9,
      reviews: 156,
      availability: 'Disponible Ahora',
      location: 'Ciudad de México',
      verified: true
    },
    {
      id: '2',
      name: 'Lic. Juan Pérez',
      specialty: 'Fisioterapia',
      rating: 4.7,
      reviews: 89,
      availability: 'Esta Semana',
      location: 'Guadalajara',
      verified: true
    },
    {
      id: '3',
      name: 'Dra. Ana Martínez',
      specialty: 'Psicología',
      rating: 4.8,
      reviews: 134,
      availability: 'Disponible Ahora',
      location: 'Monterrey',
      verified: true
    },
    {
      id: '4',
      name: 'Lic. Carlos López',
      specialty: 'Terapia Ocupacional',
      rating: 4.6,
      reviews: 67,
      availability: 'Este Mes',
      location: 'Puebla',
      verified: false
    },
    {
      id: '5',
      name: 'Nut. Laura Sánchez',
      specialty: 'Nutrición',
      rating: 4.9,
      reviews: 201,
      availability: 'Disponible Ahora',
      location: 'Ciudad de México',
      verified: true
    },
    {
      id: '6',
      name: 'T.S. Roberto Ramírez',
      specialty: 'Trabajo Social',
      rating: 4.7,
      reviews: 78,
      availability: 'Esta Semana',
      location: 'Querétaro',
      verified: true
    }
  ];

  const filteredProfessionals = useMemo(() => {
    return professionals.filter(prof => {
      const matchesSearch = prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           prof.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSpecialty = selectedSpecialty === 'Todas' || prof.specialty === selectedSpecialty;
      
      const matchesAvailability = selectedAvailability === 'Todos' || prof.availability === selectedAvailability;

      return matchesSearch && matchesSpecialty && matchesAvailability;
    });
  }, [professionals, searchTerm, selectedSpecialty, selectedAvailability]);

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-primary-50 to-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {setPage && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPage('home')}
              className="mb-6"
            >
              <ArrowLeft size={20} />
              Volver
            </Button>
          )}
          
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Encuentra tu Profesional Ideal
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Explora nuestra red de profesionales verificados especializados en el cuidado de adultos mayores
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <BarraDeBúsqueda 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <SecciónDeFiltro
          selectedSpecialty={selectedSpecialty}
          onSpecialtyChange={setSelectedSpecialty}
          selectedAvailability={selectedAvailability}
          onAvailabilityChange={setSelectedAvailability}
        />

        <ListaDeProfesionales professionals={filteredProfessionals} />
      </div>
    </div>
  );
};

export default ResultadosDeBúsqueda;
