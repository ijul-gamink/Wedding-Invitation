import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Sparkles } from 'lucide-react';
import type { WeddingConfig } from '../../types';
import { FloralDivider } from '../common/FloralOrnament';

interface HeroCountdownProps {
  config: WeddingConfig;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPassed: boolean;
}

export const HeroCountdown: React.FC<HeroCountdownProps> = ({ config }) => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const targetTime = new Date(config.hero.countdownTarget).getTime();
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPassed: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isPassed: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [config.hero.countdownTarget]);

  return (
    <section id="home" className="relative pt-12 pb-20 px-4 overflow-hidden text-center">
      <div className="max-w-xl mx-auto">
        {/* Badge Pembuka */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100/70 border border-gold-300/50 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-gold-600" />
          <span className="font-serif italic text-xs tracking-wider text-gold-800">
            {config.hero.badge}
          </span>
        </div>

        {/* Nama Mempelai Lengkap */}
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-espresso-900 tracking-wide leading-tight">
          {config.couple.groom.fullName}
        </h2>

        <div className="my-2 flex items-center justify-center">
          <span className="font-script text-4xl sm:text-5xl text-gold-600 px-3">&</span>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-espresso-900 tracking-wide leading-tight mb-4">
          {config.couple.bride.fullName}
        </h2>

        {/* Tanggal Pernikahan */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-gold-200/80 shadow-sm text-xs sm:text-sm font-medium text-espresso-700 mb-6">
          <Calendar className="w-4 h-4 text-gold-600" />
          <span>{config.hero.weddingDateLabel}</span>
        </div>

        {/* Foto Prewedding Utama dengan Bingkai Kubah Lengkung */}
        <div className="relative my-6 mx-auto w-full max-w-sm">
          <div className="relative p-2 rounded-t-[140px] rounded-b-3xl border border-gold-300/60 bg-white/60 shadow-xl backdrop-blur-sm">
            <div className="overflow-hidden rounded-t-[130px] rounded-b-2xl aspect-[3/4] relative bg-stone-100">
              <img
                src={config.hero.heroPhoto}
                alt="Foto Utama Mempelai"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-1000"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-left">
                <p className="font-script text-2xl sm:text-3xl text-gold-200">
                  {config.hero.groomNickname} & {config.hero.brideNickname}
                </p>
                <p className="text-[11px] tracking-widest uppercase opacity-90">Menuju Hari Bahagia</p>
              </div>
            </div>
          </div>
        </div>

        {/* Kutipan Romantis */}
        <div className="px-6 my-6 max-w-md mx-auto">
          <p className="font-serif italic text-sm sm:text-base text-espresso-700 leading-relaxed">
            "{config.hero.romanticQuote}"
          </p>
          <p className="font-script text-xl text-gold-600 mt-2">— {config.hero.romanticQuoteAuthor}</p>
        </div>

        <FloralDivider className="w-40 h-6 text-gold-400 mx-auto my-6" />

        {/* Kotak Hitung Mundur Real-Time */}
        <div className="mt-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-gold-700 mb-4 flex items-center justify-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Waktu Menuju Hari Bahagia</span>
          </p>

          {timeLeft.isPassed ? (
            <div className="p-6 rounded-2xl bg-white/90 border border-gold-300 shadow-md max-w-md mx-auto animate-fade-in">
              <Sparkles className="w-8 h-8 text-gold-600 mx-auto mb-2 animate-bounce" />
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-espresso-900 mb-1">
                Hari Bahagia Kami Telah Tiba!
              </h3>
              <p className="text-xs sm:text-sm text-espresso-600 leading-relaxed">
                Terima kasih yang tak terhingga telah menjadi bagian berharga dari perjalanan cinta
                kami berdua.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
              {/* Hari */}
              <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-white/85 border border-gold-200/90 shadow-sm backdrop-blur-sm">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-espresso-900 leading-none">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs text-espresso-500 uppercase tracking-wider mt-1 font-medium">
                  Hari
                </span>
              </div>

              {/* Jam */}
              <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-white/85 border border-gold-200/90 shadow-sm backdrop-blur-sm">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-espresso-900 leading-none">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs text-espresso-500 uppercase tracking-wider mt-1 font-medium">
                  Jam
                </span>
              </div>

              {/* Menit */}
              <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-white/85 border border-gold-200/90 shadow-sm backdrop-blur-sm">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-espresso-900 leading-none">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs text-espresso-500 uppercase tracking-wider mt-1 font-medium">
                  Menit
                </span>
              </div>

              {/* Detik */}
              <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-white/85 border border-gold-200/90 shadow-sm backdrop-blur-sm">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-gold-600 leading-none">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs text-espresso-500 uppercase tracking-wider mt-1 font-medium">
                  Detik
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
