import EnhancedHeroSection from '../página principal/EnhancedHeroSection';
import PromiseSection from '../página principal/PromiseSection';
import SoulCarousel from '../página principal/SoulCarousel';
import TrustSection from '../componentes/TrustSection';
import ServiciosCarousel from '../componentes/ServiciosCarousel';
import SecciónDeTestimonios from '../componentes/SecciónDeTestimonios';

interface PáginaPrincipalProps {
  setPage: (page: string) => void;
}

const PáginaPrincipal = ({ setPage }: PáginaPrincipalProps) => {
  return (
    <div>
      <EnhancedHeroSection setPage={setPage} />
      <SecciónDeTestimonios />
    </div>
  );
};

export default PáginaPrincipal;
