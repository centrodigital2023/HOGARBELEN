import { Heart, Phone, Mail, MessageCircle } from 'lucide-react';
import logoImg from '@/assets/images/logo-hogar-belen.png';

interface PieDePáginaProps {
  setPage: (page: string) => void;
}

const PieDePágina = ({ setPage }: PieDePáginaProps) => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={logoImg} alt="Hogar Belén Logo" className="h-12 w-12 object-contain" />
              <div className="text-white font-bold text-xl">
                Hogar Belén
              </div>
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
                <button 
                  onClick={() => setPage('centro-vida')}
                  className="hover:text-teal-400 transition-colors cursor-pointer"
                >
                  Centro Vida
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
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-primary-400" />
                <a href="tel:+573215708655" className="hover:text-teal-400 transition-colors">
                  +57 321 570 8655
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle size={16} className="text-green-400" />
                <a 
                  href="https://wa.me/573215708655" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-teal-400 transition-colors"
                >
                  WhatsApp: 321 570 8655
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-primary-400" />
                <a href="mailto:hogarbelen2022@gmail.com" className="hover:text-teal-400 transition-colors">
                  hogarbelen2022@gmail.com
                </a>
              </div>
              <p className="text-gray-400 pt-2">
                Buesaco, Nariño<br />
                Colombia
              </p>
            </div>

            <div className="mt-6">
              <h5 className="text-white font-semibold mb-3 text-sm">Síguenos</h5>
              <div className="flex gap-3">
                <a 
                  href="https://www.facebook.com/share/1QnRagV8BB/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.instagram.com/hogargeriatricobelen?igsh=em45dWVwc2Nza2ln" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-gray-800 hover:bg-pink-600 flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.tiktok.com/@hogarbelen2022?is_from_webapp=1&sender_device=pc" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-gray-800 hover:bg-black flex items-center justify-center transition-colors"
                  aria-label="TikTok"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
                <a 
                  href="https://youtube.com/@hogarbelengeriatrico9521" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-gray-800 hover:bg-red-600 flex items-center justify-center transition-colors"
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a 
                  href="https://x.com/HogarBelen" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                  aria-label="X (Twitter)"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
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
