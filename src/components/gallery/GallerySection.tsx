import React, { useState } from 'react';
import { Sparkles, Maximize2 } from 'lucide-react';
import type { GalleryItem } from '../../types';
import { LightboxModal } from './LightboxModal';
import { FloralDivider } from '../common/FloralOrnament';

interface GallerySectionProps {
  gallery: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ gallery }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  return (
    <section id="gallery" className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        {/* Section Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100/70 border border-gold-300/60 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-gold-600" />
          <span className="text-[11px] font-medium tracking-widest uppercase text-gold-800">
            Galeri Memori
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl text-espresso-900 font-light tracking-wide mb-2">
          Momen Prewedding
        </h2>

        <p className="text-xs sm:text-sm text-espresso-600 max-w-md mx-auto mb-10 font-light">
          Setiap potret mengabadikan sepenggal kisah dan senyuman tulus dalam perjalanan kami menuju
          ikatan suci.
        </p>

        {/* Editorial Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
          {gallery.map((item, index) => {
            const isFeatured = index === 0 || index === 3;

            return (
              <div
                key={item.id}
                onClick={() => openLightbox(index)}
                className={`group relative overflow-hidden rounded-2xl bg-stone-100 shadow-md cursor-pointer border border-gold-200/60 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${
                  isFeatured ? 'col-span-2 md:col-span-1 md:row-span-2 aspect-[4/5] sm:aspect-auto' : 'aspect-square sm:aspect-[4/5]'
                }`}
              >
                <img
                  src={item.url}
                  alt={item.alt}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Gradient Overlay & Hover Icon */}
                <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-left">
                  <div className="flex items-center justify-between text-white">
                    <p className="font-serif text-xs italic text-gold-200 line-clamp-1">
                      {item.caption || 'Lihat Foto'}
                    </p>
                    <div className="p-1.5 rounded-full bg-gold-500/80 text-white backdrop-blur-sm">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Delicate Inner Border */}
                <div className="absolute inset-2 border border-white/30 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>

        <p className="text-[11px] text-espresso-500 mt-5 italic">
          *Ketuk salah satu foto untuk melihat dalam ukuran penuh
        </p>

        <FloralDivider className="w-44 h-6 text-gold-400 mx-auto mt-14" />
      </div>

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && (
        <LightboxModal
          items={gallery}
          currentIndex={selectedPhotoIndex}
          isOpen={selectedPhotoIndex !== null}
          onClose={closeLightbox}
          onNavigate={(newIdx) => setSelectedPhotoIndex(newIdx)}
        />
      )}
    </section>
  );
};
