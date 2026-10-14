import React, { useState } from 'react';
import { MessageSquareQuote, CheckCircle2, XCircle, HelpCircle, ChevronDown, Clock } from 'lucide-react';
import type { WeddingMessage } from '../../types';

interface MessageListProps {
  messages: WeddingMessage[];
  isLoading: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  const [displayCount, setDisplayCount] = useState(6);

  const formatTimeAgo = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffMinutes < 1) return 'Baru saja';
      if (diffMinutes < 60) return `${diffMinutes} menit lalu`;
      if (diffHours < 24) return `${diffHours} jam lalu`;
      if (diffDays < 7) return `${diffDays} hari lalu`;

      return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return 'Beberapa saat lalu';
    }
  };

  const visibleMessages = messages.slice(0, displayCount);
  const hasMore = displayCount < messages.length;

  return (
    <div className="mt-8 text-left">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-serif text-lg font-bold text-espresso-900 flex items-center gap-2">
          <MessageSquareQuote className="w-5 h-5 text-gold-600" />
          <span>Doa & Ucapan ({messages.length})</span>
        </h4>
      </div>

      {/* Loading State */}
      {isLoading && messages.length === 0 && (
        <div className="py-12 text-center text-espresso-400">
          <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <p className="text-xs">Memuat ucapan selamat...</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && messages.length === 0 && (
        <div className="py-12 px-4 text-center rounded-2xl bg-white/70 border border-gold-200/80">
          <MessageSquareQuote className="w-10 h-10 text-gold-300 mx-auto mb-2" />
          <p className="font-serif text-base text-espresso-800 font-medium">Belum Ada Ucapan</p>
          <p className="text-xs text-espresso-500 mt-1">
            Jadilah orang pertama yang mengirimkan doa restu untuk kedua mempelai!
          </p>
        </div>
      )}

      {/* Daftar Kartu Ucapan Tipis & Elegan */}
      <div className="space-y-3">
        {visibleMessages.map((item) => {
          const isHadir = item.attendance === 'hadir';
          const isTidakHadir = item.attendance === 'tidak_hadir';

          return (
            <div
              key={item.id}
              className="p-4 sm:p-5 rounded-2xl bg-white/85 border border-gold-200/70 shadow-sm transition hover:shadow-md backdrop-blur-sm"
            >
              {/* Header Kartu: Nama Pengirim, Badge Kehadiran, Waktu */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-sm sm:text-base font-bold text-espresso-900 truncate">
                    {item.guest_name}
                  </span>

                  {/* Badge Kehadiran */}
                  {isHadir && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Hadir {item.guest_count > 1 ? `(${item.guest_count})` : ''}</span>
                    </span>
                  )}
                  {isTidakHadir && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                      <XCircle className="w-3 h-3 text-rose-600" />
                      <span>Tidak Hadir</span>
                    </span>
                  )}
                  {!isHadir && !isTidakHadir && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                      <HelpCircle className="w-3 h-3 text-amber-600" />
                      <span>Ragu-ragu</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 text-[10px] text-espresso-400 flex-shrink-0">
                  <Clock className="w-3 h-3" />
                  <span>{formatTimeAgo(item.created_at)}</span>
                </div>
              </div>

              {/* Teks Pesan / Doa */}
              <p className="text-xs sm:text-sm text-espresso-700 leading-relaxed font-light whitespace-pre-line">
                {item.message}
              </p>
            </div>
          );
        })}
      </div>

      {/* Tombol Muat Lebih Banyak */}
      {hasMore && (
        <div className="text-center mt-5">
          <button
            onClick={() => setDisplayCount((prev) => prev + 6)}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white border border-gold-300 text-espresso-800 text-xs font-semibold hover:bg-gold-50 shadow-sm transition active:scale-95"
          >
            <span>Muat Lebih Banyak Ucapan</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
