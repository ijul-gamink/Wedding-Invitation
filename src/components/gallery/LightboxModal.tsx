import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import type { GalleryItem } from '../../types';

interface LightboxModalProps {
  items: GalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  items,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const currentItem = items[currentIndex];

  // Navigasi Keyboard (Esc, ArrowLeft, ArrowRight)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  // Reset loading spinner ketika index berubah
  useEffect(() => {
    setIsImageLoading(true);
  }, [currentIndex]);

  const handlePrev = () => {
    const nextIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    onNavigate(nextIndex);
  };

  const handleNext = () => {
    const nextIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
    onNavigate(nextIndex);
  };

  // Touch Swipe Gesture di Smartphone
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  if (!isOpen || !currentItem) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-espresso-950/95 backdrop-blur-md animate-fade-in select-none"
      onClick={onClose}
    >
      {/* Top Header: Counter & Close Button */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between text-white pointer-events-auto">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-espresso-900/80 border border-gold-300/30 text-xs text-gold-300">
          <ImageIcon className="w-3.5 h-3.5" />
          <span>
            {currentIndex + 1} / {items.length}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-full bg-espresso-900/80 text-ivory-200 hover:text-white hover:bg-gold-600 transition"
          aria-label="Tutup galeri"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Tombol Sebelumnya (Desktop & Tablet) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        className="absolute left-3 sm:left-6 z-20 p-2.5 sm:p-3 rounded-full bg-espresso-900/70 border border-gold-300/30 text-white hover:bg-gold-500 transition-all hover:scale-110 active:scale-95 focus:outline-none"
        aria-label="Foto sebelumnya"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Gambar Aktif & Touch Listener */}
      <div
        className="relative max-w-4xl max-h-[80vh] mx-4 flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {isImageLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        <img
          src={currentItem.url}
          alt={currentItem.alt}
          onLoad={() => setIsImageLoading(false)}
          className={`max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl transition-opacity duration-300 ${
            isImageLoading ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Caption Foto */}
        {currentItem.caption && (
          <div className="mt-3 px-4 py-2 rounded-xl bg-espresso-900/80 border border-gold-300/20 text-center max-w-lg">
            <p className="font-serif italic text-xs sm:text-sm text-gold-200">
              "{currentItem.caption}"
            </p>
          </div>
        )}
      </div>

      {/* Tombol Selanjutnya (Desktop & Tablet) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        className="absolute right-3 sm:right-6 z-20 p-2.5 sm:p-3 rounded-full bg-espresso-900/70 border border-gold-300/30 text-white hover:bg-gold-500 transition-all hover:scale-110 active:scale-95 focus:outline-none"
        aria-label="Foto selanjutnya"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Petunjuk Swipe di Smartphone */}
      <p className="absolute bottom-4 text-[10px] text-espresso-400 sm:hidden">
        Geser ke kiri / kanan untuk melihat foto lain
      </p>
    </div>
  );
};
