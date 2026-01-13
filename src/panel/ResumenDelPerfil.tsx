import { Camera, Star, MapPin, Briefcase } from '@phosphor-icons/react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface ResumenDelPerfilProps {
  user: any;
  userData?: any;
}

const ResumenDelPerfil = ({ user, userData }: ResumenDelPerfilProps) => {
  const stats = [
    { label: 'Citas Completadas', value: '156' },
    { label: 'Calificación Promedio', value: '4.8' },
    { label: 'Años de Experiencia', value: '12' },
  ];

  return (
    <Card className="border-2">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="relative group">
            <Avatar className="h-24 w-24">
              <AvatarImage src={userData?.photoUrl} />
              <AvatarFallback className="text-2xl">
                {(userData?.fullName || 'P').charAt(0)}
              </AvatarFallback>
            </Avatar>
            <button className="absolute bottom-0 right-0 p-2 bg-primary rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
              <Camera size={16} />
            </button>
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-2xl font-bold text-foreground">
                  {userData?.fullName || 'Profesional'}
                </h2>
                <Badge variant="default" className="bg-green-500">Verificado</Badge>
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Briefcase size={16} />
                  <span>{userData?.specialty || 'Especialidad'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={16} />
                  <span>{userData?.location || 'Ubicación'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={16} weight="fill" className="text-yellow-500" />
                  <span>4.8 (156 reseñas)</span>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground">
              {userData?.bio || 'Profesional de la salud especializado en cuidado de adultos mayores con amplia experiencia en el sector.'}
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumenDelPerfil;
