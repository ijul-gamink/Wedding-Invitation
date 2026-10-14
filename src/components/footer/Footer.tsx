import React from 'react';
import { Heart } from 'lucide-react';
import type { WeddingConfig } from '../../types';
import { MonogramRing } from '../common/FloralOrnament';

interface FooterProps {
  config: WeddingConfig;
}

export const Footer: React.FC<FooterProps> = ({ config }) => {
  return (
    <footer className="pt-16 pb-28 px-4 text-center bg-espresso-900 text-ivory-100 relative overflow-hidden">
      <div className="max-w-xl mx-auto flex flex-col items-center">
        {/* Monogram Lingkaran Emas */}
        <div className="mb-6">
          <MonogramRing
            textGroom={config.hero.groomNickname}
            textBride={config.hero.brideNickname}
            className="w-16 h-16 bg-espresso-800 border-gold-400"
          />
        </div>

        <p className="font-serif italic text-xs tracking-widest uppercase text-gold-300 mb-2">
          Ungkapan Terima Kasih
        </p>

        <h3 className="font-serif text-2xl sm:text-3xl font-light text-ivory-50 tracking-wide mb-4">
          {config.hero.groomNickname} & {config.hero.brideNickname}
        </h3>

        <p className="text-xs sm:text-sm text-espresso-300 leading-relaxed max-w-md font-light mb-8">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami atas kehadiran serta doa restu yang
          Bapak/Ibu/Saudara/i berikan. Semoga cinta dan ketulusan senantiasa menyertai kita semua.
        </p>

        <div className="w-24 h-px bg-gold-400/40 mb-8" />

        <div className="flex items-center gap-1.5 text-xs text-gold-300 font-serif italic mb-2">
          <span>Kami yang berbahagia</span>
        </div>

        <p className="text-xs text-espresso-400 font-light">
          Keluarga Besar {config.couple.groom.fullName.split(' ')[0]} & {config.couple.bride.fullName.split(' ')[0]}
        </p>

        <div className="mt-12 text-[11px] text-espresso-500 flex items-center justify-center gap-1 font-sans">
          <span>Dibuat dengan</span>
          <Heart className="w-3 h-3 text-rose-400 fill-current" />
          <span>untuk hari bahagia selamanya</span>
        </div>
      </div>
    </footer>
  );
};
