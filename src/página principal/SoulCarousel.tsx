import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

const SoulCarousel = () => {
  const quotes = [
    { 
      text: "El arte de la medicina consiste en entretener al paciente mientras la naturaleza cura la enfermedad.", 
      author: "Voltaire" 
    },
    { 
      text: "Cuidar es la esencia de la enfermería y el corazón del sistema de salud.", 
      author: "Anónimo" 
    },
    { 
      text: "Donde quiera que se ame el arte de la medicina, se ama también a la humanidad.", 
      author: "Hipócrates" 
    }
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gray-900 text-white py-20 text-center px-4">
      <div className="max-w-4xl mx-auto">
        <Heart className="w-12 h-12 text-primary-500 mx-auto mb-8" />
        
        <div className="relative h-32">
          {quotes.map((quote, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <h3 className="text-2xl md:text-3xl font-serif italic mb-6 leading-relaxed">
                "{quote.text}"
              </h3>
              <p className="text-primary-400 font-semibold text-lg">
                — {quote.author}
              </p>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-8 space-x-2">
          {quotes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? 'bg-primary-500' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SoulCarousel;
