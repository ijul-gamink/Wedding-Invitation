import { useState, useEffect } from 'react';
import { weddingConfig } from './config/wedding';
import type { ToastNotification } from './types';
import { InvitationCover } from './components/cover/InvitationCover';
import { HeroCountdown } from './components/hero/HeroCountdown';
import { QuranVerse } from './components/ayat/QuranVerse';
import { CoupleProfile } from './components/couple/CoupleProfile';
import { EventsSection } from './components/events/EventsSection';
import { GallerySection } from './components/gallery/GallerySection';
import { LoveStoryTimeline } from './components/story/LoveStoryTimeline';
import { DigitalEnvelope } from './components/gift/DigitalEnvelope';
import { RsvpSection } from './components/rsvp/RsvpSection';
import { Footer } from './components/footer/Footer';
import { BottomNavbar } from './components/navigation/BottomNavbar';
import { AudioPlayer } from './components/common/AudioPlayer';
import { BackToTop } from './components/common/BackToTop';
import { ToastContainer } from './components/common/Toast';

export function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [guestName, setGuestName] = useState('Tamu Undangan');
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Ekstrak nama tamu dinamis dari URL query parameter ?to=Nama%20Tamu atau ?u=
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const queryName = params.get('to') || params.get('u') || params.get('nama');
      if (queryName && queryName.trim()) {
        setGuestName(queryName.trim());
      }
    } catch {
      // ignore
    }
  }, []);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <main className="relative min-h-screen bg-ivory-100 bg-paper-pattern text-espresso-800 overflow-x-hidden">
      {/* Toast Notifikasi Global */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Floating Audio Player (Tersedia setelah atau saat dibuka) */}
      {isOpened && (
        <AudioPlayer
          trackTitle={weddingConfig.audio.title}
          artist={weddingConfig.audio.artist}
        />
      )}

      {/* Halaman Pembuka / Cover Undangan Layar Penuh */}
      {!isOpened ? (
        <InvitationCover
          config={weddingConfig}
          guestName={guestName}
          onOpenInvitation={() => setIsOpened(true)}
        />
      ) : (
        <div className="animate-fade-in">
          {/* Section 1: Hero & Real-time Hitung Mundur */}
          <HeroCountdown config={weddingConfig} />

          {/* Section 2: Ayat Al-Qur'an & Doa */}
          <QuranVerse verse={weddingConfig.verse} />

          {/* Section 3: Profil Mempelai Pria & Wanita */}
          <CoupleProfile
            groom={weddingConfig.couple.groom}
            bride={weddingConfig.couple.bride}
          />

          {/* Section 4: Akad & Resepsi (Tanpa countdown tambahan) */}
          <EventsSection events={weddingConfig.events} />

          {/* Section 5: Galeri Foto Prewedding & Lightbox */}
          <GallerySection gallery={weddingConfig.gallery} />

          {/* Section 6: Our Love Story Timeline */}
          <LoveStoryTimeline story={weddingConfig.story} />

          {/* Section 7: Amplop Digital & WhatsApp Confirmation */}
          <DigitalEnvelope gift={weddingConfig.gift} onShowToast={showToast} />

          {/* Section 8: RSVP & Buku Ucapan Digital */}
          <RsvpSection initialGuestName={guestName} onShowToast={showToast} />

          {/* Section 9: Footer & Penutup */}
          <Footer config={weddingConfig} />

          {/* Navigasi Bawah Mengambang */}
          <BottomNavbar />

          {/* Tombol Kembali ke Atas */}
          <BackToTop />
        </div>
      )}
    </main>
  );
}

export default App;
