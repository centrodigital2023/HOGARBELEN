import { Heart, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  setPage: (page: string) => void;
}

export default function Footer({ setPage }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-xl">
              <Heart className="fill-primary text-primary" size={24} />
              Hogar Belén
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Centro de vida y plataforma de profesionales de salud en Nariño, Colombia. 
              Conectando familias con cuidado de calidad.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="text-white font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => setPage('home')}
                  className="hover:text-primary transition-colors"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPage('services')}
                  className="hover:text-primary transition-colors"
                >
                  Servicios
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPage('pricing')}
                  className="hover:text-primary transition-colors"
                >
                  Planes
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPage('about')}
                  className="hover:text-primary transition-colors"
                >
                  Nosotros
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-primary transition-colors cursor-pointer">
                Términos y Condiciones
              </li>
              <li className="hover:text-primary transition-colors cursor-pointer">
                Política de Privacidad
              </li>
              <li className="hover:text-primary transition-colors cursor-pointer">
                Aviso de Cookies
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-primary" />
                <span>contacto@hogarbelen.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-primary" />
                <span>+57 300 123 4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                <span>Buesaco, Nariño, Colombia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© 2024 Hogar Belén. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
