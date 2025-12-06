import { useState } from 'react';
import TarjetaProfesional from './TarjetaProfesional';
import { toast } from 'sonner';

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

interface ListaDeProfesionalesProps {
  professionals: Professional[];
}

const ListaDeProfesionales = ({ professionals }: ListaDeProfesionalesProps) => {
  const handleContact = (professionalId: string) => {
    const professional = professionals.find(p => p.id === professionalId);
    if (professional) {
      toast.success(`Solicitud de contacto enviada a ${professional.name}`);
    }
  };

  if (professionals.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">
          No se encontraron profesionales con los filtros seleccionados
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Mostrando {professionals.length} profesional{professionals.length !== 1 ? 'es' : ''}
      </p>

      <div className="space-y-4">
        {professionals.map((professional) => (
          <TarjetaProfesional
            key={professional.id}
            professional={professional}
            onContact={handleContact}
          />
        ))}
      </div>
    </div>
  );
};

export default ListaDeProfesionales;
