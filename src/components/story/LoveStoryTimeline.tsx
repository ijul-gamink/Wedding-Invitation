import React from 'react';
import { Sparkles, Heart, Calendar } from 'lucide-react';
import type { LoveStoryItem } from '../../types';
import { FloralDivider } from '../common/FloralOrnament';

interface LoveStoryTimelineProps {
  story: LoveStoryItem[];
}

export const LoveStoryTimeline: React.FC<LoveStoryTimelineProps> = ({ story }) => {
  return (
    <section id="story" className="py-20 px-4 relative overflow-hidden bg-white/40">
      <div className="max-w-3xl mx-auto text-center">
        {/* Section Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100/70 border border-gold-300/60 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-gold-600" />
          <span className="text-[11px] font-medium tracking-widest uppercase text-gold-800">
            Perjalanan Kami
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl text-espresso-900 font-light tracking-wide mb-2">
          Kisah Cinta Kami
        </h2>

        <p className="text-xs sm:text-sm text-espresso-600 max-w-md mx-auto mb-14 font-light">
          Setiap babak kehidupan menghadirkan cerita indah yang mempertemukan dan menyatukan dua hati.
        </p>

        {/* Timeline Vertikal yang Ramping & Mobile-Friendly */}
        <div className="relative border-l-2 border-gold-300/60 ml-4 sm:mx-auto sm:max-w-xl text-left space-y-10 sm:space-y-12 pl-6 sm:pl-8">
          {story.map((item) => {
            return (
              <div key={item.id} className="relative group">
                {/* Node Titik Ikon di Garis Timeline */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-ivory-50 border-2 border-gold-500 shadow-md flex items-center justify-center text-gold-600 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-white transition-all duration-300">
                  <Heart className="w-3 h-3 fill-current" />
                </div>

                {/* Konten Kartu Timeline */}
                <div className="p-5 sm:p-6 rounded-2xl bg-ivory-50/90 border border-gold-200/90 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                  {/* Badge Tanggal / Tahun */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100/60 text-gold-800 text-[11px] font-semibold tracking-wider mb-2">
                    <Calendar className="w-3 h-3" />
                    <span>{item.dateOrYear}</span>
                  </div>

                  {/* Judul Babak */}
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-espresso-900 mb-2 tracking-wide">
                    {item.title}
                  </h3>

                  {/* Foto Pendukung Opsional */}
                  {item.photo && (
                    <div className="my-3 overflow-hidden rounded-xl aspect-[16/9] max-h-48 bg-stone-100 border border-gold-200/50">
                      <img
                        src={item.photo}
                        alt={item.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Cerita Singkat */}
                  <p className="text-xs sm:text-sm text-espresso-700 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <FloralDivider className="w-44 h-6 text-gold-400 mx-auto mt-16" />
      </div>
    </section>
  );
};
