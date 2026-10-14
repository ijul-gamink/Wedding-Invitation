import React from 'react';
import { X, Navigation, ExternalLink, MapPin } from 'lucide-react';
import type { EventSchedule } from '../../types';

interface GoogleMapsModalProps {
  event: EventSchedule | null;
  onClose: () => void;
}

export const GoogleMapsModal: React.FC<GoogleMapsModalProps> = ({ event, onClose }) => {
  if (!event) return null;

  const navigationUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${event.coordinates.lat},${event.coordinates.lng}`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-espresso-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-ivory-50 border border-gold-300 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header Modal */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gold-200/80 bg-white/60">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-gold-100 text-gold-700">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-espresso-900 leading-tight">
                Lokasi {event.title}
              </h3>
              <p className="text-xs text-espresso-600 font-medium">{event.venue}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-espresso-400 hover:text-espresso-800 hover:bg-espresso-100 transition"
            aria-label="Tutup peta lokasi"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Google Maps Embed Frame */}
        <div className="w-full h-64 sm:h-80 bg-stone-200 relative">
          <iframe
            title={`Peta Lokasi ${event.venue}`}
            src={event.mapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        </div>

        {/* Alamat Lengkap & Aksi Navigasi */}
        <div className="p-4 sm:p-6 bg-ivory-50 flex flex-col gap-3">
          <p className="text-xs sm:text-sm text-espresso-700 leading-relaxed font-light">
            <strong className="text-espresso-900 font-semibold">{event.venue}</strong>: {event.address}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-2">
            <a
              href={navigationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl btn-gold text-xs font-semibold tracking-wide shadow-md hover:scale-[1.02] active:scale-95 transition"
            >
              <Navigation className="w-4 h-4" />
              <span>Petunjuk Arah (Navigasi)</span>
            </a>

            <a
              href={event.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-gold-300 bg-white hover:bg-gold-50 text-espresso-800 text-xs font-semibold tracking-wide transition shadow-sm"
            >
              <ExternalLink className="w-4 h-4 text-gold-600" />
              <span>Buka Google Maps</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
