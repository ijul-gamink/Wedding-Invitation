import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import type { WeddingMessage } from '../../types';
import { RsvpForm } from './RsvpForm';
import { MessageList } from './MessageList';
import { SupabaseStatusBanner } from '../common/SupabaseStatusBanner';
import { getWeddingMessages } from '../../lib/supabase';
import { FloralDivider } from '../common/FloralOrnament';

interface RsvpSectionProps {
  initialGuestName: string;
  onShowToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({ initialGuestName, onShowToast }) => {
  const [messages, setMessages] = useState<WeddingMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMessagesList = async () => {
    setIsLoading(true);
    try {
      const res = await getWeddingMessages(50);
      setMessages(res.data);
    } catch {
      // error handled in lib
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessagesList();
  }, []);

  const handleMessageAdded = (newMessage: WeddingMessage) => {
    setMessages((prev) => [newMessage, ...prev]);
  };

  return (
    <section id="rsvp" className="py-20 px-4 relative overflow-hidden bg-white/50">
      <div className="max-w-2xl mx-auto text-center">
        {/* Section Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100/70 border border-gold-300/60 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-gold-600" />
          <span className="text-[11px] font-medium tracking-widest uppercase text-gold-800">
            Buku Tamu Digital
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl text-espresso-900 font-light tracking-wide mb-2">
          RSVP & Ucapan Doa
        </h2>

        <p className="text-xs sm:text-sm text-espresso-600 max-w-md mx-auto mb-8 font-light">
          Kehadiran serta doa restu Anda merupakan hadiah terindah yang sangat kami nantikan.
        </p>

        {/* Form RSVP */}
        <RsvpForm
          initialGuestName={initialGuestName}
          onMessageAdded={handleMessageAdded}
          onShowToast={onShowToast}
        />

        {/* Banner Status Database Supabase */}
        <SupabaseStatusBanner />

        {/* Daftar Ucapan Pengunjung */}
        <MessageList messages={messages} isLoading={isLoading} />

        <FloralDivider className="w-44 h-6 text-gold-400 mx-auto mt-16" />
      </div>
    </section>
  );
};
