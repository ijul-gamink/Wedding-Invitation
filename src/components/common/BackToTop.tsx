import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-20 right-4 z-30 p-2.5 rounded-full bg-ivory-50/90 text-espresso-700 border border-gold-300/40 shadow-md hover:bg-gold-500 hover:text-white transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gold-400"
      aria-label="Kembali ke atas"
      title="Kembali ke atas"
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
};
