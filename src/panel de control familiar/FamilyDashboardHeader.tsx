import { User, Bell, Gear } from '@phosphor-icons/react';
import Button from '../componentes/ui/botón';
import Avatar from '../componentes/ui/avatar';

interface FamilyDashboardHeaderProps {
  user: any;
  userData?: any;
}

const FamilyDashboardHeader = ({ user, userData }: FamilyDashboardHeaderProps) => {
  return (
    <div className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <Avatar 
              src={userData?.photoUrl} 
              size="lg"
            />
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Bienvenido, {userData?.fullName || 'Usuario'}
              </h1>
              <p className="text-sm text-muted-foreground">
                Panel de Control Familiar
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            <Button variant="ghost" size="sm">
              <Gear size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyDashboardHeader;
