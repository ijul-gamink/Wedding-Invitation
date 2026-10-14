import React, { useState } from 'react';
import { Calendar, Clock, MapPin, CalendarPlus, ChevronDown, Download } from 'lucide-react';
import type { EventSchedule } from '../../types';
import { getGoogleCalendarUrl, downloadIcsFile } from '../../lib/calendar';

interface EventCardProps {
  event: EventSchedule;
  onOpenMap: (event: EventSchedule) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onOpenMap }) => {
  const [showCalendarMenu, setShowCalendarMenu] = useState(false);

  const googleCalUrl = getGoogleCalendarUrl(event.calendarDetails);

  return (
    <div className="relative p-6 sm:p-8 rounded-3xl bg-ivory-50/95 border-2 border-gold-300/70 shadow-lg backdrop-blur-md flex flex-col justify-between text-left transition-transform duration-300 hover:-translate-y-1">
      {/* Ornamen Garis Sudut Atas */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-gold-400 pointer-events-none" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-gold-400 pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-gold-400 pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-gold-400 pointer-events-none" />

      <div>
        {/* Badge Acara */}
        <div className="inline-block px-3 py-1 rounded-full bg-gold-100/80 border border-gold-300 text-[10px] font-semibold tracking-widest uppercase text-gold-800 mb-3">
          {event.badge}
        </div>

        {/* Judul Acara */}
        <h3 className="font-serif text-2xl sm:text-3xl font-light text-espresso-900 tracking-wide mb-4">
          {event.title}
        </h3>

        {/* Garis Pembatas Halus */}
        <div className="w-16 h-0.5 bg-gradient-to-r from-gold-500 to-transparent mb-5" />

        {/* Tanggal & Hari */}
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 rounded-xl bg-gold-50 border border-gold-200 text-gold-700 flex-shrink-0 mt-0.5">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[11px] text-espresso-500 uppercase tracking-wider font-medium">Hari & Tanggal</p>
            <p className="font-serif text-base sm:text-lg font-bold text-espresso-900 leading-snug">
              {event.day}, {event.date}
            </p>
          </div>
        </div>

        {/* Waktu Pelaksanaan */}
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 rounded-xl bg-gold-50 border border-gold-200 text-gold-700 flex-shrink-0 mt-0.5">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[11px] text-espresso-500 uppercase tracking-wider font-medium">Waktu Acara</p>
            <p className="font-serif text-base sm:text-lg font-bold text-espresso-900 leading-snug">
              {event.time}
            </p>
          </div>
        </div>

        {/* Tempat & Alamat Lengkap */}
        <div className="flex items-start gap-3 mb-6">
          <div className="p-2 rounded-xl bg-gold-50 border border-gold-200 text-gold-700 flex-shrink-0 mt-0.5">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[11px] text-espresso-500 uppercase tracking-wider font-medium">Tempat Acara</p>
            <p className="font-serif text-sm sm:text-base font-bold text-espresso-900 leading-snug">
              {event.venue}
            </p>
            <p className="text-xs text-espresso-600 mt-1 leading-relaxed font-light">
              {event.address}
            </p>
          </div>
        </div>
      </div>

      {/* Tombol Aksi */}
      <div className="pt-4 border-t border-gold-200/60 flex flex-col gap-2.5 relative">
        <div className="grid grid-cols-2 gap-2">
          {/* Tombol Dropdown Simpan Kalender */}
          <div className="relative">
            <button
              onClick={() => setShowCalendarMenu(!showCalendarMenu)}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-gold-300 bg-white hover:bg-gold-50 text-espresso-800 text-xs font-semibold tracking-wide transition shadow-sm"
              aria-expanded={showCalendarMenu}
            >
              <CalendarPlus className="w-3.5 h-3.5 text-gold-600" />
              <span>Simpan Jadwal</span>
              <ChevronDown className="w-3 h-3 text-espresso-500 ml-0.5" />
            </button>

            {/* Menu Popover Kalender */}
            {showCalendarMenu && (
              <div className="absolute bottom-full left-0 mb-1.5 w-48 bg-white border border-gold-200 rounded-xl shadow-xl p-1.5 z-20 animate-fade-in text-xs">
                <a
                  href={googleCalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowCalendarMenu(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gold-50 text-espresso-800 transition"
                >
                  <CalendarPlus className="w-3.5 h-3.5 text-blue-600" />
                  <span>Google Calendar</span>
                </a>
                <button
                  onClick={() => {
                    downloadIcsFile(event.calendarDetails);
                    setShowCalendarMenu(false);
                  }}
                  className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-gold-50 text-espresso-800 transition text-left"
                >
                  <Download className="w-3.5 h-3.5 text-gold-600" />
                  <span>Apple / Outlook (.ics)</span>
                </button>
              </div>
            )}
          </div>

          {/* Tombol Lihat Lokasi */}
          <button
            onClick={() => onOpenMap(event)}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl btn-gold text-xs font-semibold tracking-wide shadow-sm hover:scale-[1.02] active:scale-95 transition"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Lihat Lokasi</span>
          </button>
        </div>
      </div>
    </div>
  );
};
