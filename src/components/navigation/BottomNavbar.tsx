import React, { useState, useEffect } from 'react';
import { Home, Heart, Calendar, Image as ImageIcon, BookHeart, Gift, MessageSquare } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'couple', label: 'Mempelai', icon: Heart },
  { id: 'events', label: 'Acara', icon: Calendar },
  { id: 'gallery', label: 'Galeri', icon: ImageIcon },
  { id: 'story', label: 'Kisah', icon: BookHeart },
  { id: 'gift', label: 'Hadiah', icon: Gift },
  { id: 'rsvp', label: 'RSVP', icon: MessageSquare },
];

export const BottomNavbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0,
    });

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <nav
      aria-label="Navigasi Bagian Undangan"
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-full max-w-md px-3 pointer-events-none"
    >
      <div className="pointer-events-auto flex items-center justify-around py-2 px-2.5 rounded-full bg-ivory-50/90 backdrop-blur-md border border-gold-300/60 shadow-xl">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`flex flex-col items-center justify-center min-w-[42px] py-1 px-1.5 rounded-full transition-all duration-300 ${
                isActive
                  ? 'text-gold-700 bg-gold-100/80 font-semibold scale-105'
                  : 'text-espresso-500 hover:text-gold-600 hover:bg-gold-50/50'
              }`}
              aria-label={`Scroll ke bagian ${item.label}`}
              title={item.label}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
              <span className="text-[9px] tracking-tight leading-none mt-1 hidden sm:inline">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
