import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { WeddingMessage, AttendanceStatus } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Cek apakah kredensial Supabase terisi dengan nilai valid
export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith('https://') &&
  !supabaseUrl.includes('YOUR_SUPABASE_URL')
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Initial mock data ketika Supabase belum dihubungkan
const MOCK_STORAGE_KEY = 'wedding_messages_demo_v1';
const initialMockMessages: WeddingMessage[] = [
  {
    id: 'mock-1',
    guest_name: 'Dimas Wicaksono & Partner',
    attendance: 'hadir',
    guest_count: 2,
    message:
      'Selamat berbahagia untuk Radit dan Anin! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Senantiasa dilimpahi rezeki dan kehangatan selamanya. See you on your big day!',
    created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'mock-2',
    guest_name: 'Nadira Sarah',
    attendance: 'hadir',
    guest_count: 1,
    message:
      'Aniiin! Masya Allah terharu banget liat perjalanan kalian berdua dari awal kenal sampai ke titik ini. Lancar ya sampai hari H, peluk erat!',
    created_at: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
  },
  {
    id: 'mock-3',
    guest_name: 'Keluarga Bpk. Hendra Kurniawan',
    attendance: 'hadir',
    guest_count: 2,
    message:
      'Barakallahu laka wa baraka alaika wa jamaa bainakuma fii khoir. Selamat menempuh hidup baru untuk kedua mempelai.',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
  },
  {
    id: 'mock-4',
    guest_name: 'Fauzan & Gita (Alumni Teknik)',
    attendance: 'ragu',
    guest_count: 1,
    message:
      'Selamat menempuh babak baru Dit! Semoga diberi kelancaran segala persiapannya. Insya Allah kami usahakan hadir.',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

function getLocalDemoMessages(): WeddingMessage[] {
  try {
    const raw = localStorage.getItem(MOCK_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(initialMockMessages));
      return initialMockMessages;
    }
    return JSON.parse(raw);
  } catch {
    return initialMockMessages;
  }
}

function saveLocalDemoMessages(messages: WeddingMessage[]) {
  try {
    localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(messages));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
}

/**
 * Sanitasi string sederhana untuk mencegah XSS
 */
export function sanitizeInput(str: string): string {
  return str
    .trim()
    .replace(/[<>]/g, '') // remove direct tag brackets
    .slice(0, 500);
}

/**
 * Validasi form ucapan sebelum kirim
 */
export function validateMessageInput(data: {
  guest_name: string;
  attendance: AttendanceStatus;
  guest_count: number;
  message: string;
}): { isValid: boolean; error?: string } {
  const cleanName = data.guest_name.trim();
  const cleanMessage = data.message.trim();

  if (!cleanName || cleanName.length < 2) {
    return { isValid: false, error: 'Mohon isi nama Anda (minimal 2 karakter).' };
  }
  if (cleanName.length > 60) {
    return { isValid: false, error: 'Nama terlalu panjang (maksimal 60 karakter).' };
  }
  if (!['hadir', 'tidak_hadir', 'ragu'].includes(data.attendance)) {
    return { isValid: false, error: 'Silakan pilih status konfirmasi kehadiran Anda.' };
  }
  if (data.attendance === 'hadir' && (data.guest_count < 1 || data.guest_count > 10)) {
    return { isValid: false, error: 'Jumlah tamu minimal 1 dan maksimal 10 orang.' };
  }
  if (!cleanMessage || cleanMessage.length < 5) {
    return { isValid: false, error: 'Mohon tulis pesan atau doa Anda (minimal 5 karakter).' };
  }
  if (cleanMessage.length > 500) {
    return { isValid: false, error: 'Pesan terlalu panjang (maksimal 500 karakter).' };
  }

  return { isValid: true };
}

/**
 * Perlindungan Anti-Spam (Rate Limiting Sederhana)
 */
const RATE_LIMIT_KEY = 'wedding_rsvp_last_submit';
const COOLDOWN_SECONDS = 30;

export function checkRateLimit(): { allowed: boolean; remainingSeconds: number } {
  try {
    const lastSubmit = localStorage.getItem(RATE_LIMIT_KEY);
    if (!lastSubmit) return { allowed: true, remainingSeconds: 0 };

    const elapsed = (Date.now() - parseInt(lastSubmit, 10)) / 1000;
    if (elapsed < COOLDOWN_SECONDS) {
      return { allowed: false, remainingSeconds: Math.ceil(COOLDOWN_SECONDS - elapsed) };
    }
  } catch {
    // fallback
  }
  return { allowed: true, remainingSeconds: 0 };
}

export function recordSubmitTimestamp(): void {
  try {
    localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString());
  } catch {
    // ignore
  }
}

/**
 * Mengambil daftar ucapan dari Supabase (atau fallback data lokal)
 */
export async function getWeddingMessages(limit = 20): Promise<{
  data: WeddingMessage[];
  isCloud: boolean;
  error?: string;
}> {
  if (supabase && isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('wedding_messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.warn('Supabase query error:', error);
        return {
          data: getLocalDemoMessages(),
          isCloud: false,
          error: `Gagal memuat dari Supabase: ${error.message}. Menampilkan data demo.`,
        };
      }

      return {
        data: (data as WeddingMessage[]) || [],
        isCloud: true,
      };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Koneksi error';
      return {
        data: getLocalDemoMessages(),
        isCloud: false,
        error: errorMsg,
      };
    }
  }

  // Jika Supabase belum dikonfigurasi, gunakan data lokal
  return {
    data: getLocalDemoMessages(),
    isCloud: false,
  };
}

/**
 * Menyimpan ucapan baru ke Supabase (atau penyimpanan lokal jika belum ada API key)
 */
export async function addWeddingMessage(input: {
  guest_name: string;
  attendance: AttendanceStatus;
  guest_count: number;
  message: string;
}): Promise<{ success: boolean; data?: WeddingMessage; isCloud: boolean; error?: string }> {
  // 1. Validasi
  const validation = validateMessageInput(input);
  if (!validation.isValid) {
    return { success: false, isCloud: false, error: validation.error };
  }

  // 2. Rate Limit
  const rateLimit = checkRateLimit();
  if (!rateLimit.allowed) {
    return {
      success: false,
      isCloud: false,
      error: `Harap tunggu ${rateLimit.remainingSeconds} detik sebelum mengirim ucapan lagi.`,
    };
  }

  const payload = {
    guest_name: sanitizeInput(input.guest_name),
    attendance: input.attendance,
    guest_count: input.attendance === 'hadir' ? Number(input.guest_count) : 1,
    message: sanitizeInput(input.message),
  };

  // 3. Simpan ke Supabase jika tersedia
  if (supabase && isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('wedding_messages')
        .insert([payload])
        .select()
        .single();

      if (error) {
        console.error('Supabase insert error:', error);
        return {
          success: false,
          isCloud: true,
          error: `Gagal menyimpan ke Supabase: ${error.message}`,
        };
      }

      recordSubmitTimestamp();
      return {
        success: true,
        data: data as WeddingMessage,
        isCloud: true,
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Koneksi database gagal';
      return {
        success: false,
        isCloud: true,
        error: msg,
      };
    }
  }

  // 4. Jika Supabase belum dikonfigurasi, simpan di localStorage demo
  const newMockMessage: WeddingMessage = {
    id: `demo-${Date.now()}`,
    ...payload,
    created_at: new Date().toISOString(),
  };

  const existing = getLocalDemoMessages();
  saveLocalDemoMessages([newMockMessage, ...existing]);
  recordSubmitTimestamp();

  return {
    success: true,
    data: newMockMessage,
    isCloud: false,
  };
}
