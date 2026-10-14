import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { MailOpen, Heart, Sparkles } from 'lucide-react';
import type { WeddingConfig } from '../../types';
import { FloralCornerTopLeft, FloralCornerTopRight, FloralDivider } from '../common/FloralOrnament';
import { romanticAudio } from '../../lib/audio';

interface InvitationCoverProps {
  config: WeddingConfig;
  guestName: string;
  onOpenInvitation: () => void;
}

export const InvitationCover: React.FC<InvitationCoverProps> = ({
  config,
  guestName,
  onOpenInvitation,
}) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleOpen = () => {
    setIsOpening(true);

    // Jalankan efek kelopak bunga / confetti emas yang romantis
    try {
      confetti({
        particleCount: 65,
        spread: 80,
        origin: { y: 0.65 },
        colors: ['#D4AF37', '#EEDCB8', '#C5A059', '#FAF8F2', '#8A9E8A'],
        ticks: 200,
        gravity: 0.8,
        scalar: 1.1,
      });
    } catch {
      // ignore
    }

    // Putar musik setelah interaksi eksplisit pengguna
    romanticAudio.init(config.audio.url);
    romanticAudio.play();

    // Beri waktu animasi transisi sebelum membuka sepenuhnya
    setTimeout(() => {
      onOpenInvitation();
    }, 700);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between min-h-screen px-4 py-8 overflow-y-auto bg-ivory-50 bg-paper-pattern transition-all duration-700 ease-in-out ${
        isOpening ? 'opacity-0 scale-95 pointer-events-none -translate-y-4' : 'opacity-100 scale-100'
      }`}
    >
      {/* Ornamen Sudut Atas */}
      <div className="absolute top-0 left-0 pointer-events-none">
        <FloralCornerTopLeft className="w-20 h-20 sm:w-28 sm:h-28 text-gold-500/70" />
      </div>
      <div className="absolute top-0 right-0 pointer-events-none">
        <FloralCornerTopRight className="w-20 h-20 sm:w-28 sm:h-28 text-gold-500/70" />
      </div>

      {/* Bagian Atas: Heading & Subheading */}
      <div
        className={`w-full max-w-md mx-auto text-center pt-4 transition-all duration-1000 ${
          isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
      >
        <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-gold-50 border border-gold-200/80 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-gold-600" />
          <span className="text-[11px] font-medium tracking-widest uppercase text-gold-700">
            {config.cover.subheading}
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl tracking-widest text-espresso-900 uppercase font-light mt-1">
          {config.cover.heading}
        </h1>

        <p className="font-script text-3xl sm:text-4xl text-gold-600 mt-1 mb-1">
          {config.hero.groomNickname} & {config.hero.brideNickname}
        </p>

        <FloralDivider className="w-36 h-6 text-gold-400 mx-auto" />
      </div>

      {/* Bagian Tengah: Foto Mempelai dengan Bingkai Elegan */}
      <div
        className={`relative my-auto py-2 transition-all duration-1000 delay-200 ${
          isMounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        {/* Bingkai Luar Lengkung Berlapis */}
        <div className="relative p-2.5 rounded-[90px] border-2 border-gold-300/80 bg-white/70 shadow-2xl backdrop-blur-sm">
          <div className="p-1 rounded-[80px] border border-gold-200/90">
            <div className="w-52 h-72 sm:w-60 sm:h-80 rounded-[75px] overflow-hidden relative shadow-inner bg-stone-100">
              <img
                src={config.cover.couplePhoto}
                alt={`${config.hero.groomNickname} & ${config.hero.brideNickname}`}
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-1000"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Aksen Hati Kecil di Bawah Foto */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-ivory-50 border border-gold-300 flex items-center justify-center text-gold-600 shadow-md">
            <Heart className="w-4 h-4 fill-current text-gold-500 animate-pulse-subtle" />
          </div>
        </div>
      </div>

      {/* Bagian Bawah: Nama Tamu Dinamis & Tombol Buka Undangan */}
      <div
        className={`w-full max-w-sm mx-auto text-center pb-4 transition-all duration-1000 delay-300 ${
          isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <p className="text-xs text-espresso-600 mb-1 font-light tracking-wide">
          Kepada Yth. Bapak/Ibu/Saudara/i:
        </p>

        {/* Nama Tamu yang Elegan */}
        <div className="my-2 py-2 px-4 rounded-xl bg-white/75 border border-gold-200 shadow-sm backdrop-blur-sm inline-block max-w-[90%]">
          <h2 className="font-serif text-lg sm:text-xl font-semibold text-espresso-900 tracking-wide truncate">
            {guestName}
          </h2>
          <p className="text-[10px] text-gold-700 tracking-wider uppercase mt-0.5">
            Tamu Terhormat
          </p>
        </div>

        <p className="text-[11px] sm:text-xs text-espresso-600 leading-relaxed px-4 mb-5 font-light">
          {config.cover.invitationGreeting}
        </p>

        {/* Tombol Utama Buka Undangan */}
        <button
          onClick={handleOpen}
          disabled={isOpening}
          className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full btn-gold font-medium text-xs sm:text-sm tracking-wider uppercase focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 transition-all active:scale-95 shadow-lg"
          aria-label="Buka Undangan Pernikahan"
        >
          <MailOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>{isOpening ? 'Membuka Undangan...' : 'BUKA UNDANGAN'}</span>
        </button>

        <p className="text-[10px] text-espresso-400 mt-4 italic">
          *Sentuh tombol untuk membuka & memutar alunan musik
        </p>
      </div>
    </div>
  );
};
