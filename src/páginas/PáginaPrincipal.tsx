import { useEffect } from 'react';
import { SEOHead } from '../components/SEOHead';
import { getRouteByPath } from '../config/routes';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const route = getRouteByPath(location.pathname);

  return (
    <div>
      <SEOHead
        title={route?.title || 'Hogar Belén | Hogar Geriátrico en Nariño – Cuidado Adulto Mayor'}
        description={route?.description || 'Hogar geriátrico en Nariño con cuidado integral para adultos mayores. Ambiente natural, atención humana y profesionales verificados en Buesaco.'}
        keywords={route?.keywords || 'hogar geriátrico en nariño, hogar geriátrico en pasto, cuidado adulto mayor nariño'}
        canonical="https://www.hogarbelen.org/"
        ogImage="https://www.hogarbelen.org/images/og-home.jpg"
      />
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
