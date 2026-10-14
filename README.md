# 💍 Website Undangan Pernikahan Digital — Elegant Romantic Wedding

Website undangan pernikahan digital modern, romantis, interaktif, dan responsif (dioptimalkan khusus untuk smartphone) dengan sentuhan desain premium bernuansa *ivory, champagne, sage green, dan sentuhan gold*.

Dibuat menggunakan **React 19**, **TypeScript**, **Vite**, **Tailwind CSS**, **Lucide Icons**, **Canvas Confetti**, dan terintegrasi dengan **Supabase** untuk penyimpanan buku ucapan online secara *real-time*.

---

## ✨ Fitur Utama

1. **Cover Pembuka Undangan Layar Penuh (Mobile-First):**
   - Mendukung nama tamu undangan dinamis via URL: `?to=Nama%20Tamu` (contoh: `?to=Dimas%20Wicaksono%20%26%20Partner`).
   - Tombol **"BUKA UNDANGAN"** dengan animasi kelopak bunga emas (*confetti burst*).
   - Memutar musik latar romantis hanya setelah interaksi pengguna (mematuhi *browser autoplay policy*).

2. **Hero & Countdown Timer Real-Time:**
   - Hitung mundur hari, jam, menit, dan detik secara *live* menuju waktu akad/pernikahan.
   - Status otomatis berubah menjadi ucapan syukur setelah tanggal pernikahan terlewati.
   - Bingkai foto kubah lengkung estetis dengan kutipan romantis.

3. **Kutipan Ayat Al-Qur'an & Doa Restu:**
   - Teks Arab autentik QS. Ar-Rum ayat 21 dengan tipografi khat Amiri yang indah.
   - Terjemahan bahasa Indonesia resmi dan doa sakinah, mawaddah, warahmah.

4. **Profil Mempelai Pria & Wanita:**
   - Foto portrait berbingkai elegan, nama lengkap, gelar, nama panggilan.
   - Keterangan orang tua kedua mempelai.
   - Tombol tautan langsung ke profil media sosial Instagram mempelai.

5. **Rangkaian Acara (Akad Nikah & Resepsi):**
   - Desain kartu cetak undangan premium dengan ikon kalender dan waktu.
   - **Simpan ke Kalender**: tautan langsung Google Calendar serta opsi unduh file `.ics` (untuk iPhone/Apple Calendar & Outlook).
   - **Lihat Lokasi**: Modal interaktif dengan *embedded Google Maps*, tombol rute navigasi, dan tautan Google Maps resmi.

6. **Galeri Foto Prewedding & Lightbox Interaktif:**
   - Grid masonry editorial dengan rasio foto portrait dan landscape.
   - Lightbox layar penuh dengan navigasi foto sebelumnya/selanjutnya, keyboard arrow, indikator jumlah foto, serta *touch swipe gesture* pada smartphone.

7. **Our Love Story (Kisah Perjalanan Cinta):**
   - Garis waktu vertikal (*vertical timeline*) berisi babak: *First Meet*, *Our Beginning*, *The Journey*, *The Proposal*, hingga *The Wedding*.

8. **Amplop Digital & Wedding Gift:**
   - Rekening mempelai pria (BCA) dan mempelai wanita (Mandiri).
   - Tombol **"Salin Nomor Rekening"** dengan Clipboard API & *fallback* otomatis untuk semua browser.
   - Tombol **"Kirim Bukti Transfer via WhatsApp"** yang membuka percakapan WhatsApp dengan pesan otomatis terisi.

9. **Buku Ucapan & RSVP Digital dengan Supabase Backend:**
   - Formulir konfirmasi kehadiran (*Hadir, Tidak Hadir, Masih Ragu*), jumlah tamu, dan pesan doa.
   - Validasi form, pencegahan XSS (*sanitization*), serta *rate limiting* anti-spam.
   - Daftar ucapan dengan *timestamp* relatif (*misal: 2 jam lalu*), filter kehadiran, dan tombol *"Muat Lebih Banyak"*.
   - **Mode Fallback**: Berjalan mulus di mode demo lokal jika kunci API Supabase belum dimasukkan, disertai panduan aktivasi Supabase instan.

10. **Pemutar Musik Latar Belakang Melayang (Floating Audio Player):**
    - Kontrol Play / Pause dan Mute / Unmute.
    - Ikon piringan hitam berputar halus dengan indikator visual.
    - *Fallback synthesizer chord* romantis berbasis Web Audio API jika link MP3 eksternal tidak dapat diakses.

11. **Navigasi Bawah Mengambang (Bottom Bar):**
    - Navigasi satu tangan di smartphone (*Home, Mempelai, Acara, Galeri, Kisah, Hadiah, RSVP*).
    - Indikator bagian aktif secara otomatis menggunakan `IntersectionObserver`.
    - Tombol kembali ke atas (*Back to Top*).

---

## 📁 Struktur Folder Proyek

```
undangan/
├── public/
│   ├── favicon.svg          # Favicon cincin pernikahan emas
│   ├── audio/               # Folder file audio lokal (opsional)
│   └── images/              # Folder foto aset lokal (opsional)
├── src/
│   ├── assets/              # Aset grafis
│   ├── config/
│   │   └── wedding.ts       # ⭐ PUSAT SEMUA DATA & KONFIGURASI UNDANGAN
│   ├── lib/
│   │   ├── audio.ts         # Audio player & fallback synthesizer
│   │   ├── calendar.ts      # Generator Google Calendar & file .ics
│   │   └── supabase.ts      # Koneksi database Supabase & validasi form
│   ├── types/
│   │   └── index.ts         # Definisi tipe TypeScript
│   ├── components/
│   │   ├── common/          # Ornamen floral, audio player, banner status, toast
│   │   ├── cover/           # Cover pembuka layar penuh & nama tamu dinamis
│   │   ├── hero/            # Hero section & hitung mundur real-time
│   │   ├── ayat/            # QS. Ar-Rum: 21 & doa restu
│   │   ├── couple/          # Profil kedua mempelai & orang tua
│   │   ├── events/          # Kartu Akad & Resepsi, Google Maps modal
│   │   ├── gallery/         # Galeri foto & modal lightbox
│   │   ├── story/           # Timeline perjalanan cinta
│   │   ├── gift/            # Amplop digital & konfirmasi WhatsApp
│   │   ├── rsvp/            # Formulir RSVP & daftar ucapan
│   │   ├── navigation/      # Bottom navbar mengambang
│   │   └── footer/          # Penutup & ucapan terima kasih
│   ├── App.tsx              # Komponen utama aplikasi
│   ├── main.tsx             # Entry point React
│   └── index.css            # Styling Tailwind & custom paper texture
├── .env.example             # Contoh file variabel lingkungan Supabase
├── index.html               # Template HTML & Google Fonts
├── tailwind.config.js       # Konfigurasi warna, font, dan animasi Tailwind
└── package.json
```

---

## 🚀 Panduan Memulai Cepat (Local Development)

### 1. Prasyarat
- Node.js versi 18 ke atas (Direkomendasikan v20+)
- npm atau yarn / pnpm

### 2. Instalasi Dependensi
Jalankan perintah berikut di terminal:
```bash
npm install
```

### 3. Menjalankan Server Pengembangan
```bash
npm run dev
```
Buka browser di alamat `http://localhost:5173`.

### 4. Menguji Parameter Nama Tamu
Tambahkan parameter `?to=` pada URL untuk melihat nama tamu dinamis:
```
http://localhost:5173/?to=Bapak%20Budi%20Santoso%20%26%20Keluarga
```

---

## ⚙️ Cara Mengubah Data Undangan

Cukup buka satu file: **`src/config/wedding.ts`**. Di file tersebut, Anda dapat langsung mengganti:
- Nama lengkap & panggilan kedua mempelai.
- Nama orang tua kedua mempelai.
- Tanggal & waktu countdown akad/resepsi (`countdownTarget: 'YYYY-MM-DDTHH:mm:ss+07:00'`).
- Jadwal, nama gedung, alamat, dan link Google Maps.
- Nomor rekening bank dan nama pemilik.
- Nomor WhatsApp tujuan konfirmasi transfer (format internasional: `628xxxxxxxxxx`).
- Foto galeri dan foto prewedding.
- Cerita perjalanan cinta (*love story*).
- URL lagu latar romantis.

---

## 🗄️ Menghubungkan Backend Supabase (Database Online)

Jika Anda ingin ucapan tamu tersimpan online di cloud database agar dapat dibaca oleh tamu lain di seluruh dunia:

### Langkah 1: Buat Proyek Supabase
1. Kunjungi [https://supabase.com](https://supabase.com) dan masuk atau daftar (Gratis).
2. Buat proyek baru (*New Project*), tentukan nama proyek dan password database.

### Langkah 2: Buat Tabel Database
Buka menu **SQL Editor** di dashboard Supabase Anda, buat *query* baru, lalu salin dan jalankan script SQL berikut:

```sql
-- 1. Buat Tabel wedding_messages
CREATE TABLE IF NOT EXISTS public.wedding_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    guest_name VARCHAR(100) NOT NULL,
    attendance VARCHAR(20) NOT NULL CHECK (attendance IN ('hadir', 'tidak_hadir', 'ragu')),
    guest_count INTEGER DEFAULT 1,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Aktifkan Row Level Security (RLS)
ALTER TABLE public.wedding_messages ENABLE ROW LEVEL SECURITY;

-- 3. Kebijakan: Izinkan siapa saja membaca ucapan publik
CREATE POLICY "Public read access for messages"
ON public.wedding_messages
FOR SELECT
USING (true);

-- 4. Kebijakan: Izinkan tamu mengirim ucapan baru (Insert Anon)
CREATE POLICY "Public insert access for messages"
ON public.wedding_messages
FOR INSERT
WITH CHECK (true);
```

### Langkah 3: Konfigurasi File `.env`
1. Di dashboard Supabase, buka **Project Settings** -> **API**.
2. Salin **Project URL** dan **anon public key**.
3. Di root proyek ini, buat file baru bernama `.env` (atau salin dari `.env.example`):
```env
VITE_SUPABASE_URL=https://proyek-anda.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...kunci-anon-anda...
```
4. Restart server pengembangan (`npm run dev`). Banner pada buku tamu akan langsung menampilkan status **"Database Cloud Supabase Aktif: Ucapan tersinkronisasi online"**.

---

## 🌐 Panduan Deployment

### A. Deploy ke Vercel (Paling Direkomendasikan)
1. Unggah proyek ini ke repositori GitHub Anda.
2. Buka [vercel.com](https://vercel.com) dan klik **Add New** -> **Project**.
3. Pilih repositori GitHub Anda.
4. Pada bagian **Environment Variables**, tambahkan:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Klik **Deploy**. Website Anda akan langsung online dengan domain HTTPS gratis!

### B. Deploy ke Netlify
1. Buka [netlify.com](https://netlify.com) dan hubungkan repositori GitHub Anda.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Tambahkan variabel lingkungan pada menu **Site configuration** -> **Environment variables**.
5. Klik **Deploy**.

---

## 🛡️ Keamanan & Aksesibilitas
- Menggunakan kunci publik anonim (`anon key`), tidak pernah mengekspos `service_role key`.
- Input tamu disanitasi untuk mencegah serangan injeksi HTML/XSS.
- Rate limiting sederhana untuk mencegah spam pengiriman formulir.
- Mematuhi standar aksesibilitas WCAG: teks berkontras tinggi, semantic HTML, `aria-label` pada tombol ikonik, dan dukungan `prefers-reduced-motion`.
