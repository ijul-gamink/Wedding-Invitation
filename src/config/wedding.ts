import type { WeddingConfig } from '../types';

/**
 * =====================================================================
 * PUSAT KONFIGURASI UNDANGAN PERNIKAHAN DIGITAL (WEDDING CONFIG)
 * =====================================================================
 * Semua informasi acara, profil mempelai, rekening, jadwal, dan galeri
 * dapat diubah langsung melalui file ini tanpa mengubah kode komponen.
 * Catatan: Data di bawah merupakan contoh (placeholder) yang elegan.
 */

export const weddingConfig: WeddingConfig = {
  // Metadata Website (SEO & OpenGraph WhatsApp Preview)
  meta: {
    siteTitle: 'The Wedding of Raditya & Anindya',
    siteDescription:
      'Dengan penuh rasa syukur, kami mengundang Anda untuk hadir dan merayakan hari bahagia pernikahan kami, Raditya & Anindya.',
    ogImage:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
  },

  // Pengaturan Musik Latar
  // Anda dapat mengganti url dengan file audio Anda di /audio/nama-lagu.mp3 atau URL stream legal.
  audio: {
    title: 'A Thousand Years (Acoustic Piano & Cello)',
    artist: 'Romantic Wedding Instrumental',
    url: 'https://cdn.freesound.org/previews/612/612095_5674468-lq.mp3', // Instrumental acoustic fallback
  },

  // Halaman Cover Pembuka Undangan
  cover: {
    heading: 'THE WEDDING',
    subheading: 'A Celebration of Love',
    couplePhoto:
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    invitationGreeting:
      'Dengan penuh rasa syukur dan sukacita, kami mengundang Anda untuk hadir dan menjadi bagian dari hari bahagia kami.',
  },

  // Bagian Hero & Hitung Mundur
  hero: {
    badge: 'The Wedding of',
    groomNickname: 'Raditya',
    brideNickname: 'Anindya',
    weddingDateLabel: 'Sabtu, 12 Desember 2026',
    // Format ISO untuk target countdown (Tahun-Bulan-TanggalTHour:Minute:Second+Timezone)
    // Ubah sesuai waktu akad atau resepsi Anda:
    countdownTarget: '2026-12-12T08:00:00+07:00',
    romanticQuote:
      'Di antara miliaran jiwa di dunia, takdir mempertemukan kita untuk saling mengasihi, menguatkan, dan melangkah bersama menuju keabadian.',
    romanticQuoteAuthor: 'Raditya & Anindya',
    heroPhoto:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
  },

  // Kutipan Ayat Al-Qur'an & Doa
  verse: {
    arabic:
      'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ',
    translation:
      '“Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir.”',
    surah: 'QS. Ar-Rum: 21',
    prayer:
      'Semoga Allah SWT memberkahi ikatan suci pernikahan ini, membimbing langkah kami berdua, dan menjadikannya keluarga yang senantiasa sakinah, mawaddah, warahmah. Aamiin ya Rabbal Alamin.',
  },

  // Profil Kedua Mempelai
  couple: {
    groom: {
      fullName: 'Raditya Pratama, S.T.',
      nickname: 'Radit',
      fatherName: 'Bpk. Bambang Hermawan',
      motherName: 'Ibu Ratna Dewi',
      photo:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      instagramUsername: '@radityapratama_',
      instagramUrl: 'https://instagram.com/radityapratama_',
      bio: 'Putra pertama yang berdedikasi, pecinta petualangan alam, dan siap menjadi nahkoda keluarga yang penuh kehangatan serta tanggung jawab.',
    },
    bride: {
      fullName: 'Anindya Larasati Putri, S.Ds.',
      nickname: 'Anin',
      fatherName: 'Bpk. Hendra Gunawan',
      motherName: 'Ibu Sri Wahyuni',
      photo:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      instagramUsername: '@anindya_larasati',
      instagramUrl: 'https://instagram.com/anindya_larasati',
      bio: 'Putri bungsu yang ceria, penyuka estetika dan seni visual, yang menemukan tempat terbaik untuk pulang dalam dekap dan hati Raditya.',
    },
  },

  // Bagian Akad Nikah dan Resepsi (PENTING: Tanpa countdown tambahan)
  events: {
    akad: {
      title: 'Akad Nikah',
      badge: 'Ijab Kabul & Sakral',
      day: 'Sabtu',
      date: '12 Desember 2026',
      time: '08.00 – 10.00 WIB',
      venue: 'Masjid Agung Al-Barkah',
      address: 'Jl. Veteran No. 45, Marga Jaya, Bekasi Selatan, Kota Bekasi, Jawa Barat 17141',
      mapsUrl: 'https://maps.google.com/?q=Masjid+Agung+Al-Barkah+Bekasi',
      mapsEmbedUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.1966270451633!2d106.99616237586884!3d-6.237792661077579!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698c2579dfd2d7%3A0xe54e60a373ff23f1!2sMasjid%20Agung%20Al-Barkah%20Bekasi!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid',
      coordinates: {
        lat: -6.2377926,
        lng: 106.998351,
      },
      calendarDetails: {
        title: 'Akad Nikah Raditya & Anindya',
        description: 'Momen sakral ijab kabul pernikahan Raditya Pratama & Anindya Larasati.',
        location: 'Masjid Agung Al-Barkah, Kota Bekasi',
        startTime: '2026-12-12T08:00:00+07:00',
        endTime: '2026-12-12T10:00:00+07:00',
      },
    },
    resepsi: {
      title: 'Resepsi Pernikahan',
      badge: 'Walimatul Ursy',
      day: 'Sabtu',
      date: '12 Desember 2026',
      time: '11.00 – 16.00 WIB',
      venue: 'The Grand Ballroom Aston Imperial',
      address: 'Jl. KH. Noer Ali No. 1, Pekayon Jaya, Bekasi Selatan, Kota Bekasi, Jawa Barat 17148',
      mapsUrl: 'https://maps.google.com/?q=Aston+Imperial+Bekasi+Hotel+%26+Conference+Center',
      mapsEmbedUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.1360667086815!2d106.99042577586894!3d-6.2458021611596765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698c2efaa43567%3A0xc47b993f41fa2a79!2sAston%20Imperial%20Bekasi%20Hotel%20%26%20Conference%20Center!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid',
      coordinates: {
        lat: -6.2458021,
        lng: 106.9926144,
      },
      calendarDetails: {
        title: 'Resepsi Pernikahan Raditya & Anindya',
        description: 'Perayaan resepsi pernikahan Raditya Pratama & Anindya Larasati.',
        location: 'The Grand Ballroom Aston Imperial Bekasi',
        startTime: '2026-12-12T11:00:00+07:00',
        endTime: '2026-12-12T16:00:00+07:00',
      },
    },
  },

  // Galeri Foto Prewedding
  gallery: [
    {
      id: 'photo-1',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      alt: 'Momen romantis di bawah kehangatan sinar mentari senja',
      caption: 'Di bawah langit yang sama, cinta kami bertumbuh tanpa henti.',
      orientation: 'landscape',
    },
    {
      id: 'photo-2',
      url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
      alt: 'Genggaman tangan yang melambangkan saling menguatkan',
      caption: 'Genggaman tangan ini adalah janji untuk saling menemani di setiap musim kehidupan.',
      orientation: 'portrait',
    },
    {
      id: 'photo-3',
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
      alt: 'Cincin pernikahan bertabur bunga melati',
      caption: 'Lambang komitmen suci yang tak berujung.',
      orientation: 'square',
    },
    {
      id: 'photo-4',
      url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80',
      alt: 'Tawa bahagia calon mempelai saat sesi prewedding',
      caption: 'Tawa terbaik adalah tawa yang kita bagi bersama dengan ketulusan.',
      orientation: 'landscape',
    },
    {
      id: 'photo-5',
      url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
      alt: 'Mempelai wanita dalam gaun berenda elegan dengan buket bunga',
      caption: 'Keanggunan yang menyambut hari paling berharga.',
      orientation: 'portrait',
    },
    {
      id: 'photo-6',
      url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80',
      alt: 'Langkah bersama menatap masa depan yang cerah',
      caption: 'Melangkah menuju gerbang baru kehidupan berdua.',
      orientation: 'landscape',
    },
  ],

  // Kisah Perjalanan Cinta (Our Love Story)
  story: [
    {
      id: 'story-1',
      dateOrYear: 'Oktober 2021',
      title: 'First Meet — Pertemuan Pertama',
      description:
        'Takdir mempertemukan kami di sebuah workshop desain dan arsitektur di Bandung. Berawal dari percakapan sederhana tentang selera kopi dan seni, kami menemukan kecocokan yang tidak terduga.',
      photo:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'story-2',
      dateOrYear: 'Mei 2022',
      title: 'Our Beginning — Memulai Cerita',
      description:
        'Setelah berbulan-bulan saling bertukar kabar dan mendengarkan impian masing-masing, kami sepakat untuk melangkah lebih dekat sebagai sepasang kekasih.',
      photo:
        'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'story-3',
      dateOrYear: 'Agustus 2024',
      title: 'The Journey — Melewati Rintangan',
      description:
        'Jarak, kesibukan karier, dan perbedaan sudut pandang justru menjadi guru terbaik yang mendewasakan kasih kami. Kami belajar bahwa cinta sejati bukan hanya rasa, tetapi komitmen untuk saling menguatkan.',
      photo:
        'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'story-4',
      dateOrYear: 'Februari 2026',
      title: 'The Proposal — Sebuah Janji Suci',
      description:
        'Di sebuah tepi bukit yang tenang saat mentari terbenam, Raditya berlutut membawa sebuah cincin sederhana dan kalimat yang menggetarkan hati: "Maukah kamu menemani sisa perjalananku selamanya?" Anindya menjawab "Ya" dengan air mata haru.',
      photo:
        'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'story-5',
      dateOrYear: 'Desember 2026',
      title: 'The Wedding — Menuju Keabadian',
      description:
        'Kini, dengan restu orang tua dan doa tulus para sahabat, kami bersiap menyatukan cinta dalam ikatan suci pernikahan.',
      photo:
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    },
  ],

  // Amplop Digital (Wedding Gift)
  gift: {
    groomBank: {
      bankName: 'Bank Central Asia (BCA)',
      accountNumber: '8830592817', // Placeholder nomor rekening
      accountHolder: 'RADITYA PRATAMA',
      badge: 'Rekening Mempelai Pria',
    },
    brideBank: {
      bankName: 'Bank Mandiri',
      accountNumber: '1560018274910', // Placeholder nomor rekening
      accountHolder: 'ANINDYA LARASATI PUTRI',
      badge: 'Rekening Mempelai Wanita',
    },
    // Nomor WhatsApp untuk konfirmasi bukti transfer (Ganti dengan nomor aktif diawali kode negara 62)
    whatsappNumber: '6281234567890',
    whatsappTemplate:
      'Halo Raditya & Anindya, saya telah mengirimkan hadiah pernikahan. Berikut saya ingin mengonfirmasi bukti transfer. Semoga pernikahan kalian senantiasa diberkahi kebahagiaan!',
  },
};
