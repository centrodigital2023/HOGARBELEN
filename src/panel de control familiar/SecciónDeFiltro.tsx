import { Funnel } from '@phosphor-icons/react';

interface SecciónDeFiltroProps {
  selectedSpecialty: string;
  onSpecialtyChange: (specialty: string) => void;
  selectedAvailability: string;
  onAvailabilityChange: (availability: string) => void;
}

const SecciónDeFiltro = ({
  selectedSpecialty,
  onSpecialtyChange,
  selectedAvailability,
  onAvailabilityChange
}: SecciónDeFiltroProps) => {
  const specialties = [
    'Todas',
    'Enfermería',
    'Fisioterapia',
    'Terapia Ocupacional',
    'Psicología',
    'Nutrición',
    'Trabajo Social'
  ];

  const availabilities = [
    'Todos',
    'Disponible Ahora',
    'Esta Semana',
    'Este Mes'
  ];

  return (
    <div className="bg-muted/50 rounded-lg p-4 space-y-4">
      <div className="flex items-center gap-2 text-foreground font-semibold">
        <Funnel size={20} />
        <span>Filtros</span>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Especialidad
          </label>
          <select
            value={selectedSpecialty}
            onChange={(e) => onSpecialtyChange(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
          >
            {specialties.map((specialty) => (
              <option key={specialty} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Disponibilidad
          </label>
          <select
            value={selectedAvailability}
            onChange={(e) => onAvailabilityChange(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
          >
            {availabilities.map((availability) => (
              <option key={availability} value={availability}>
                {availability}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SecciónDeFiltro;
