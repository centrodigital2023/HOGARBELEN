import HeroNarrative from '../página principal/HeroNarrative';
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
      <HeroNarrative setPage={setPage} />
      <PromiseSection />
      <ServiciosCarousel setPage={setPage} />
      <TrustSection />
      <SecciónDeTestimonios />
      <SoulCarousel />
    </div>
  );
};

export default PáginaPrincipal;
