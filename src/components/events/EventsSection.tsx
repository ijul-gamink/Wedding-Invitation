import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import type { WeddingConfig, EventSchedule } from '../../types';
import { EventCard } from './EventCard';
import { GoogleMapsModal } from './GoogleMapsModal';
import { FloralDivider } from '../common/FloralOrnament';

interface EventsSectionProps {
  events: WeddingConfig['events'];
}

export const EventsSection: React.FC<EventsSectionProps> = ({ events }) => {
  const [selectedEventForMap, setSelectedEventForMap] = useState<EventSchedule | null>(null);

  return (
    <section id="events" className="py-20 px-4 relative overflow-hidden bg-white/50">
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100/70 border border-gold-300/60 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-gold-600" />
          <span className="text-[11px] font-medium tracking-widest uppercase text-gold-800">
            Waktu & Tempat Acara
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl text-espresso-900 font-light tracking-wide mb-2">
          Rangkaian Acara Bahagia
        </h2>

        <p className="text-xs sm:text-sm text-espresso-600 max-w-md mx-auto mb-12 font-light">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan
          hadir memberikan doa restu.
        </p>

        {/* 2 Kartu Acara: Akad Nikah & Resepsi (Tanpa countdown tambahan) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <EventCard event={events.akad} onOpenMap={(ev) => setSelectedEventForMap(ev)} />
          <EventCard event={events.resepsi} onOpenMap={(ev) => setSelectedEventForMap(ev)} />
        </div>

        <FloralDivider className="w-44 h-6 text-gold-400 mx-auto mt-14" />
      </div>

      {/* Google Maps Modal Interaktif */}
      <GoogleMapsModal
        event={selectedEventForMap}
        onClose={() => setSelectedEventForMap(null)}
      />
    </section>
  );
};
