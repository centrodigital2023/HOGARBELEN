import { Phone, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import MetaPixel from '@/lib/metaPixel';

const FixedMobileButtons = () => {
  const [isVisible, setIsVisible] = useState(false);
  const phoneNumber = '+573215708655';
  const whatsappMessage = encodeURIComponent(
    '¡Hola! Me interesa conocer más sobre los servicios de Hogar Belén.'
  );

  useEffect(() => {
    // Show buttons after a small delay
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handlePhoneClick = () => {
    MetaPixel.trackLead('llamada_telefono');
  };

  const handleWhatsAppClick = () => {
    MetaPixel.trackLead('whatsapp_click');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 md:hidden">
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${phoneNumber}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWhatsAppClick}
        className="flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 animate-bounce"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle size={28} />
      </a>

      {/* Phone Button */}
      <a
        href={`tel:${phoneNumber}`}
        onClick={handlePhoneClick}
        className="flex items-center justify-center w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg transform transition-all duration-300 hover:scale-110"
        aria-label="Llamar"
      >
        <Phone size={26} />
      </a>
    </div>
  );
};

export default FixedMobileButtons;
