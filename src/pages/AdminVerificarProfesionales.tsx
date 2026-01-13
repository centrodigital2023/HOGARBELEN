import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useKV } from '@github/spark/hooks';
import { toast } from 'sonner';
import {
  ArrowLeft,
  Shield,
  User,
  CheckCircle,
  XCircle,
  Eye,
    Warning,
  FileText,
    Envelope,
  Phone,
  MapPin,
    Trophy,
  Clock,
    MagnifyingGlass
} from '@phosphor-icons/react';

interface AdminVerificarProfesionalesProps {
  setPage: (page: string) => void;
}

export default function AdminVerificarProfesionales({ setPage }: AdminVerificarProfesionalesProps) {
  const [pendingProfiles, setPendingProfiles] = useKV<any[]>('pending-professional-verification', []);
  const [approvedProfiles, setApprovedProfiles] = useKV<any[]>('professional-profiles', []);
  const [selectedProfile, setSelectedProfile] = useState<any | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('pending');

  const handleApprove = (profile: any) => {
    const updatedProfile = {
      ...profile,
      estado_perfil: 'aprobado',
      visible_publico: true,
      check_verificado: true,
      fecha_aprobacion: new Date().toISOString()
    };

    setApprovedProfiles((current: any[]) => [...current, updatedProfile]);
    setPendingProfiles((current: any[]) => current.filter((p: any) => p.id !== profile.id));
    
      toast.success(`Perfil de ${profile.nombre_completo} aprobado`);
    setShowDetailDialog(false);
  };

  const handleReject = (profile: any) => {
    setPendingProfiles((current: any[]) => current.filter((p: any) => p.id !== profile.id));
    toast.success(`Perfil rechazado`);
    setShowDetailDialog(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setPage('admin-dashboard')}>
              <ArrowLeft size={16} className="mr-2" />
              Volver
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Shield className="text-purple-600" size={28} />
                Verificación de Profesionales
              </h1>
              <p className="text-sm text-gray-600">Sistema de aprobación con análisis de IA</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-gray-500">Sistema de verificación listo</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
