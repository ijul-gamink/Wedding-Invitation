import React from 'react';
import { BookOpen, HeartHandshake } from 'lucide-react';
import type { WeddingConfig } from '../../types';
import { FloralDivider } from '../common/FloralOrnament';

interface QuranVerseProps {
  verse: WeddingConfig['verse'];
}

export const QuranVerse: React.FC<QuranVerseProps> = ({ verse }) => {
  return (
    <section className="py-16 px-4 relative overflow-hidden bg-white/40">
      <div className="max-w-xl mx-auto text-center">
        {/* Ikon Al-Qur'an */}
        <div className="w-12 h-12 mx-auto rounded-full bg-gold-100/70 border border-gold-300/60 flex items-center justify-center text-gold-700 mb-4 shadow-sm">
          <BookOpen className="w-5 h-5" />
        </div>

        <h3 className="font-serif italic text-sm tracking-widest uppercase text-gold-800 mb-6">
          Kalam Ilahi & Doa Restu
        </h3>

        {/* Teks Ayat Al-Qur'an (Amiri Arabic Typography) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-ivory-50/90 border border-gold-200/90 shadow-md backdrop-blur-sm">
          <p
            dir="rtl"
            lang="ar"
            className="font-arabic text-xl sm:text-2xl lg:text-3xl text-espresso-900 leading-[2.2] tracking-wide mb-6 select-text text-center"
          >
            {verse.arabic}
          </p>

          <FloralDivider className="w-32 h-6 text-gold-400 mx-auto my-4" />

          {/* Terjemahan Bahasa Indonesia */}
          <p className="font-serif text-xs sm:text-sm text-espresso-700 leading-relaxed italic mb-3">
            {verse.translation}
          </p>

          <p className="text-xs font-semibold text-gold-700 tracking-wider">
            ({verse.surah})
          </p>
        </div>

        {/* Doa Sakinah, Mawaddah, Warahmah */}
        <div className="mt-8 px-6 py-5 rounded-2xl bg-sage-50/70 border border-sage-200/80 max-w-lg mx-auto text-center">
          <div className="flex items-center justify-center gap-1.5 text-sage-700 mb-2">
            <HeartHandshake className="w-4 h-4" />
            <span className="text-xs font-semibold tracking-wider uppercase">Doa & Harapan</span>
          </div>
          <p className="font-sans text-xs sm:text-sm text-espresso-700 leading-relaxed font-light">
            {verse.prayer}
          </p>
        </div>
      </div>
    </section>
  );
};
