import EnhancedHeroSection from '../página principal/EnhancedHeroSection';
import SoulCarousel from '../página principal/SoulCarousel';
import TrustSection from '../componentes/TrustSection';
import ServiciosIntegrales from '../componentes/ServiciosIntegrales';
import SecciónDeTestimonios from '../componentes/SecciónDeTestimonios';
import ProfessionalsCarousel from '../componentes/ProfessionalsCarousel';

interface PáginaPrincipalProps {
  setPage: (page: string) => void;
}

const PáginaPrincipal = ({ setPage }: PáginaPrincipalProps) => {
  return (
    <div>
      <EnhancedHeroSection setPage={setPage} />
      <ProfessionalsCarousel setPage={setPage} />
      <ServiciosIntegrales setPage={setPage} />
      <TrustSection />
      <SecciónDeTestimonios />
      <SoulCarousel />
    </div>
  );
};

export default PáginaPrincipal;
