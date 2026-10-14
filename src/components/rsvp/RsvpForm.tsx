import React, { useState } from 'react';
import { Send, Users, User, CheckCircle2, XCircle, HelpCircle } from 'lucide-react';
import type { AttendanceStatus, WeddingMessage } from '../../types';
import { addWeddingMessage } from '../../lib/supabase';

interface RsvpFormProps {
  initialGuestName: string;
  onMessageAdded: (message: WeddingMessage, isCloud: boolean) => void;
  onShowToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

export const RsvpForm: React.FC<RsvpFormProps> = ({
  initialGuestName,
  onMessageAdded,
  onShowToast,
}) => {
  const [name, setName] = useState(
    initialGuestName && initialGuestName !== 'Tamu Undangan' ? initialGuestName : ''
  );
  const [attendance, setAttendance] = useState<AttendanceStatus>('hadir');
  const [guestCount, setGuestCount] = useState<number>(1);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      onShowToast('Mohon masukkan nama Anda.', 'error');
      return;
    }

    if (!message.trim()) {
      onShowToast('Mohon tulis ucapan atau doa Anda.', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await addWeddingMessage({
        guest_name: name,
        attendance,
        guest_count: attendance === 'hadir' ? Number(guestCount) : 1,
        message,
      });

      if (result.success && result.data) {
        onMessageAdded(result.data, result.isCloud);
        setMessage('');
        onShowToast(
          result.isCloud
            ? 'Terima kasih! Ucapan Anda berhasil terkirim ke server.'
            : 'Ucapan Anda berhasil dikirim (Mode Demo Lokal).',
          'success'
        );
      } else {
        onShowToast(result.error || 'Gagal mengirim ucapan.', 'error');
      }
    } catch {
      onShowToast('Terjadi kesalahan koneksi saat mengirim ucapan.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 sm:p-8 rounded-3xl bg-ivory-50/95 border border-gold-300/80 shadow-lg backdrop-blur-md text-left"
    >
      <h3 className="font-serif text-xl sm:text-2xl font-bold text-espresso-900 mb-1">
        Konfirmasi Kehadiran & Kirim Ucapan
      </h3>
      <p className="text-xs text-espresso-600 mb-6 font-light">
        Kirimkan doa restu Anda kepada kedua mempelai.
      </p>

      {/* Field: Nama Lengkap */}
      <div className="mb-4">
        <label htmlFor="guest_name" className="block text-xs font-semibold text-espresso-800 uppercase tracking-wider mb-1.5">
          Nama Lengkap <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-espresso-400">
            <User className="w-4 h-4" />
          </div>
          <input
            id="guest_name"
            type="text"
            required
            maxLength={60}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Contoh: Dimas Wicaksono"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gold-200/90 bg-white text-espresso-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition"
          />
        </div>
      </div>

      {/* Field: Pilihan Kehadiran */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-espresso-800 uppercase tracking-wider mb-2">
          Konfirmasi Kehadiran <span className="text-rose-500">*</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          {/* Hadir */}
          <button
            type="button"
            onClick={() => setAttendance('hadir')}
            className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-medium transition ${
              attendance === 'hadir'
                ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-sm font-semibold'
                : 'bg-white border-gold-200 text-espresso-700 hover:bg-gold-50/50'
            }`}
          >
            <CheckCircle2
              className={`w-4 h-4 mb-1 ${attendance === 'hadir' ? 'text-emerald-600' : 'text-espresso-400'}`}
            />
            <span>Hadir</span>
          </button>

          {/* Tidak Hadir */}
          <button
            type="button"
            onClick={() => setAttendance('tidak_hadir')}
            className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-medium transition ${
              attendance === 'tidak_hadir'
                ? 'bg-rose-50 border-rose-500 text-rose-800 shadow-sm font-semibold'
                : 'bg-white border-gold-200 text-espresso-700 hover:bg-gold-50/50'
            }`}
          >
            <XCircle
              className={`w-4 h-4 mb-1 ${attendance === 'tidak_hadir' ? 'text-rose-600' : 'text-espresso-400'}`}
            />
            <span>Tidak Hadir</span>
          </button>

          {/* Ragu-ragu */}
          <button
            type="button"
            onClick={() => setAttendance('ragu')}
            className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-medium transition ${
              attendance === 'ragu'
                ? 'bg-amber-50 border-amber-500 text-amber-800 shadow-sm font-semibold'
                : 'bg-white border-gold-200 text-espresso-700 hover:bg-gold-50/50'
            }`}
          >
            <HelpCircle
              className={`w-4 h-4 mb-1 ${attendance === 'ragu' ? 'text-amber-600' : 'text-espresso-400'}`}
            />
            <span>Masih Ragu</span>
          </button>
        </div>
      </div>

      {/* Field: Jumlah Tamu (jika hadir) */}
      {attendance === 'hadir' && (
        <div className="mb-4 animate-fade-in">
          <label htmlFor="guest_count" className="block text-xs font-semibold text-espresso-800 uppercase tracking-wider mb-1.5">
            Jumlah Tamu Hadir
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-espresso-400">
              <Users className="w-4 h-4" />
            </div>
            <select
              id="guest_count"
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gold-200/90 bg-white text-espresso-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition"
            >
              <option value={1}>1 Orang</option>
              <option value={2}>2 Orang</option>
              <option value={3}>3 Orang</option>
              <option value={4}>4 Orang</option>
              <option value={5}>5 Orang</option>
            </select>
          </div>
        </div>
      )}

      {/* Field: Pesan & Doa */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="guest_message" className="block text-xs font-semibold text-espresso-800 uppercase tracking-wider">
            Pesan & Doa Restu <span className="text-rose-500">*</span>
          </label>
          <span className="text-[10px] text-espresso-500">{message.length}/500</span>
        </div>
        <div className="relative">
          <textarea
            id="guest_message"
            required
            rows={4}
            maxLength={500}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tuliskan ucapan selamat dan doa tulus untuk kedua mempelai di sini..."
            className="w-full p-3.5 rounded-xl border border-gold-200/90 bg-white text-espresso-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition resize-none"
          />
        </div>
      </div>

      {/* Tombol Kirim */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl btn-gold text-xs sm:text-sm font-semibold tracking-wider uppercase transition shadow-md active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Mengirim Ucapan...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Kirim Ucapan</span>
          </>
        )}
      </button>
    </form>
  );
};
