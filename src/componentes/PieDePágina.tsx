import { Heart } from 'lucide-react';

interface PieDePáginaProps {
  setPage: (page: string) => void;
}

const PieDePágina = ({ setPage }: PieDePáginaProps) => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-xl">
              <Heart className="fill-primary-600 text-primary-600" size={24} />
              Hogar Belén
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Plataforma líder en cuidado de adultos mayores en Nariño. 
              Conectando familias con profesionales de confianza.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => setPage('about')}
                  className="hover:text-teal-400 transition-colors cursor-pointer"
                >
                  Nosotros
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setPage('contact')}
                  className="hover:text-teal-400 transition-colors cursor-pointer"
                >
                  Contacto
                </button>
              </li>
              <li>
                <button className="hover:text-teal-400 transition-colors">
                  Blog
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-teal-400 transition-colors cursor-pointer">
                Términos y Condiciones
              </li>
              <li className="hover:text-teal-400 transition-colors cursor-pointer">
                Política de Privacidad
              </li>
              <li className="hover:text-teal-400 transition-colors cursor-pointer">
                Cookies
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <div className="space-y-2 text-sm">
              <p className="hover:text-teal-400 transition-colors cursor-pointer">
                soporte@hogarbelen.com
              </p>
              <p className="hover:text-teal-400 transition-colors cursor-pointer">
                +57 300 123 4567
              </p>
              <p className="text-gray-400">
                Buesaco, Nariño<br />
                Colombia
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 Hogar Belén. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default PieDePágina;
