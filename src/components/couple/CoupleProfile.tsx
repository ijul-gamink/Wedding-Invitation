import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import type { PersonProfile } from '../../types';
import { FloralDivider } from '../common/FloralOrnament';

const InstagramIcon = ({ className = 'w-3.5 h-3.5' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

interface CoupleProfileProps {
  groom: PersonProfile;
  bride: PersonProfile;
}

export const CoupleProfile: React.FC<CoupleProfileProps> = ({ groom, bride }) => {
  return (
    <section id="couple" className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Heading */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100/70 border border-gold-300/60 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-gold-600" />
          <span className="text-[11px] font-medium tracking-widest uppercase text-gold-800">
            Kedua Mempelai
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl text-espresso-900 font-light tracking-wide mb-2">
          Mempelai Pengantin
        </h2>

        <p className="text-xs sm:text-sm text-espresso-600 max-w-md mx-auto mb-12 font-light">
          Dengan memohon ridho dan rahmat Allah SWT, kami menyatukan dua insan dalam ikatan suci
          pernikahan.
        </p>

        {/* Profil Container: Mobile vertical, Desktop side-by-side with heart connector */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start relative">
          {/* Mempelai Pria */}
          <div className="flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl bg-white/70 border border-gold-200/80 shadow-md backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1">
            {/* Foto Portrait Mempelai Pria */}
            <div className="relative mb-5 p-2 rounded-t-[100px] rounded-b-2xl border-2 border-gold-300/80 bg-ivory-50 shadow-lg">
              <div className="w-48 h-64 sm:w-52 sm:h-68 rounded-t-[92px] rounded-b-xl overflow-hidden relative bg-stone-100">
                <img
                  src={groom.photo}
                  alt={groom.fullName}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Nama Lengkap & Panggilan */}
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-espresso-900 tracking-wide mb-1">
              {groom.fullName}
            </h3>

            <p className="font-script text-2xl sm:text-3xl text-gold-600 mb-3">
              ({groom.nickname})
            </p>

            {/* Keterangan Orang Tua */}
            <p className="text-xs text-espresso-600 leading-relaxed mb-4 max-w-xs font-light">
              Putra tercinta dari
              <br />
              <strong className="text-espresso-800 font-semibold">{groom.fatherName}</strong>
              <br />
              & <strong className="text-espresso-800 font-semibold">{groom.motherName}</strong>
            </p>

            {groom.bio && (
              <p className="text-[11px] sm:text-xs text-espresso-500 italic mb-5 max-w-xs leading-normal">
                "{groom.bio}"
              </p>
            )}

            {/* Tombol Media Sosial Instagram */}
            <a
              href={groom.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-300/80 bg-ivory-100/80 text-espresso-800 text-xs font-medium hover:bg-gold-500 hover:text-white transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-pink-600 group-hover:text-white" />
              <span>{groom.instagramUsername}</span>
            </a>
          </div>

          {/* Divider "&" Penghubung di Desktop */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-ivory-50 border-2 border-gold-300 shadow-md items-center justify-center text-gold-600">
            <Heart className="w-5 h-5 fill-current animate-pulse-subtle" />
          </div>

          {/* Mempelai Wanita */}
          <div className="flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl bg-white/70 border border-gold-200/80 shadow-md backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1">
            {/* Foto Portrait Mempelai Wanita */}
            <div className="relative mb-5 p-2 rounded-t-[100px] rounded-b-2xl border-2 border-gold-300/80 bg-ivory-50 shadow-lg">
              <div className="w-48 h-64 sm:w-52 sm:h-68 rounded-t-[92px] rounded-b-xl overflow-hidden relative bg-stone-100">
                <img
                  src={bride.photo}
                  alt={bride.fullName}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Nama Lengkap & Panggilan */}
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-espresso-900 tracking-wide mb-1">
              {bride.fullName}
            </h3>

            <p className="font-script text-2xl sm:text-3xl text-gold-600 mb-3">
              ({bride.nickname})
            </p>

            {/* Keterangan Orang Tua */}
            <p className="text-xs text-espresso-600 leading-relaxed mb-4 max-w-xs font-light">
              Putri tercinta dari
              <br />
              <strong className="text-espresso-800 font-semibold">{bride.fatherName}</strong>
              <br />
              & <strong className="text-espresso-800 font-semibold">{bride.motherName}</strong>
            </p>

            {bride.bio && (
              <p className="text-[11px] sm:text-xs text-espresso-500 italic mb-5 max-w-xs leading-normal">
                "{bride.bio}"
              </p>
            )}

            {/* Tombol Media Sosial Instagram */}
            <a
              href={bride.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-300/80 bg-ivory-100/80 text-espresso-800 text-xs font-medium hover:bg-gold-500 hover:text-white transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-pink-600 group-hover:text-white" />
              <span>{bride.instagramUsername}</span>
            </a>
          </div>
        </div>

        <FloralDivider className="w-44 h-6 text-gold-400 mx-auto mt-14" />
      </div>
    </section>
  );
};
