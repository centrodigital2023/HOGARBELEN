import { Heart, Mail, Phone, MapPin } from 'lucide-react';
import { Facebook, Instagram, Youtube } from 'lucide-react';

interface FooterProps {
  setPage: (page: string) => void;
}

export default function Footer({ setPage }: FooterProps) {
  const socialLinks = [
    { 
      name: 'TikTok', 
      url: 'https://www.tiktok.com/@hogarbelen2022?is_from_webapp=1&sender_device=pc',
      icon: () => (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      )
    },
    { 
      name: 'Facebook', 
      url: 'https://www.facebook.com/share/1QnRagV8BB/',
      icon: Facebook
    },
    { 
      name: 'Instagram', 
      url: 'https://www.instagram.com/hogargeriatricobelen?igsh=em45dWVwc2Nza2ln',
      icon: Instagram
    },
    { 
      name: 'YouTube', 
      url: 'https://www.youtube.com/@hogarbelengeriatrico9521',
      icon: Youtube
    },
    { 
      name: 'X (Twitter)', 
      url: 'https://twitter.com/HogarBelen',
      icon: () => (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
  ];

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
            
            {/* Redes Sociales */}
            <div className="pt-4">
              <h5 className="text-white font-semibold mb-3 text-sm">Síguenos</h5>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-gray-800 hover:bg-primary flex items-center justify-center transition-all hover:scale-110"
                      aria-label={social.name}
                    >
                      <Icon />
                    </a>
                  );
                })}
              </div>
            </div>
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
                <Mail size={16} className="text-primary flex-shrink-0" />
                <a href="mailto:hogarbelen2022@gmail.com" className="hover:text-primary transition-colors">
                  hogarbelen2022@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-primary flex-shrink-0" />
                <a href="tel:+573215708655" className="hover:text-primary transition-colors">
                  +57 321 570 8655
                </a>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <a href="https://wa.me/3215708655" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  WhatsApp: 321 570 8655
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-primary flex-shrink-0" />
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
