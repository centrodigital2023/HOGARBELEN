import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import PromoCodeManager from '../components/PromoCodeManager';

interface AdminPromoCodesProps {
  setPage: (page: string) => void;
}

export default function AdminPromoCodes({ setPage }: AdminPromoCodesProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => setPage('dashboard-pro')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Dashboard
          </Button>
        </div>

        <PromoCodeManager />
      </div>
    </div>
  );
}
