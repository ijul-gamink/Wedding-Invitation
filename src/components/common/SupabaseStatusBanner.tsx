import React, { useState } from 'react';
import { Database, HelpCircle, Copy, Check, X } from 'lucide-react';
import { isSupabaseConfigured } from '../../lib/supabase';

export const SupabaseStatusBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const sqlSchema = `-- Salin dan jalankan script ini di SQL Editor pada Supabase Dashboard Anda:

CREATE TABLE IF NOT EXISTS public.wedding_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    guest_name VARCHAR(100) NOT NULL,
    attendance VARCHAR(20) NOT NULL CHECK (attendance IN ('hadir', 'tidak_hadir', 'ragu')),
    guest_count INTEGER DEFAULT 1,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Aktifkan Row Level Security (RLS)
ALTER TABLE public.wedding_messages ENABLE ROW LEVEL SECURITY;

-- Izinkan semua pengunjung membaca ucapan yang telah dikirim
CREATE POLICY "Public read access for messages"
ON public.wedding_messages
FOR SELECT
USING (true);

-- Izinkan pengunjung mengirim ucapan baru (Anon Insert)
CREATE POLICY "Public insert access for messages"
ON public.wedding_messages
FOR INSERT
WITH CHECK (true);`;

  const copySql = () => {
    navigator.clipboard.writeText(sqlSchema);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="w-full max-w-xl mx-auto px-4 mt-6">
        <div
          className={`flex items-center justify-between p-3 rounded-xl border text-xs transition ${
            isSupabaseConfigured
              ? 'bg-emerald-50/80 border-emerald-200 text-emerald-800'
              : 'bg-amber-50/90 border-amber-200/90 text-amber-900 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 flex-shrink-0" />
            <span>
              {isSupabaseConfigured ? (
                <span className="font-medium">
                  Database Cloud Supabase Aktif: Ucapan tersinkronisasi online.
                </span>
              ) : (
                <span>
                  <strong>Mode Demo Lokal:</strong> Ucapan tersimpan di browser Anda. Hubungkan Supabase
                  agar ucapan tersimpan online.
                </span>
              )}
            </span>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-1 font-semibold underline underline-offset-2 ml-2 hover:opacity-80 flex-shrink-0"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{isSupabaseConfigured ? 'Info' : 'Panduan'}</span>
          </button>
        </div>
      </div>

      {/* Modal Petunjuk Aktivasi Supabase */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-ivory-50 border border-gold-300 rounded-2xl p-6 max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-espresso-400 hover:text-espresso-800 hover:bg-espresso-100 transition"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-gold-700 mb-3">
              <Database className="w-5 h-5" />
              <h3 className="font-serif text-lg font-bold">Panduan Supabase Database</h3>
            </div>

            <p className="text-xs text-espresso-600 mb-4 leading-relaxed">
              Website ini sudah terhubung secara kode dengan <strong>Supabase JS SDK</strong>. Untuk
              mengaktifkan sinkronisasi database cloud publik yang aman, ikuti 3 langkah mudah berikut:
            </p>

            <ol className="text-xs text-espresso-700 space-y-3 list-decimal list-inside mb-4 font-normal">
              <li>
                Buka <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-gold-700 underline font-semibold">supabase.com</a> dan buat proyek baru (gratis).
              </li>
              <li>
                Buka menu <strong>SQL Editor</strong> di dashboard Supabase Anda, lalu jalankan script berikut:
              </li>
            </ol>

            <div className="relative mb-4">
              <pre className="bg-espresso-900 text-ivory-100 p-3 rounded-lg text-[11px] overflow-x-auto font-mono max-h-48 border border-espresso-700">
                {sqlSchema}
              </pre>
              <button
                onClick={copySql}
                className="absolute top-2 right-2 flex items-center gap-1 bg-gold-600 hover:bg-gold-500 text-white px-2 py-1 rounded text-[10px] font-medium transition"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Tersalin' : 'Salin SQL'}
              </button>
            </div>

            <ol start={3} className="text-xs text-espresso-700 space-y-2 list-decimal list-inside mb-5 font-normal">
              <li>
                Buat file <code className="bg-espresso-100 px-1 py-0.5 rounded font-mono">.env</code> di root folder proyek ini berisi:
                <div className="bg-espresso-100 p-2 rounded mt-1.5 font-mono text-[11px] text-espresso-900 border border-espresso-200">
                  VITE_SUPABASE_URL=https://proyek-anda.supabase.co<br />
                  VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
                </div>
              </li>
            </ol>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 bg-espresso-800 hover:bg-espresso-900 text-white rounded-xl text-xs font-semibold tracking-wide transition shadow"
            >
              Mengerti & Tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
};
