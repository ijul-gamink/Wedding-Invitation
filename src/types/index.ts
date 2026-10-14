export type AttendanceStatus = 'hadir' | 'tidak_hadir' | 'ragu';

export interface CalendarEventDetails {
  title: string;
  description: string;
  location: string;
  startTime: string; // ISO 8601 string or YYYY-MM-DDTHH:mm:ss
  endTime: string;   // ISO 8601 string or YYYY-MM-DDTHH:mm:ss
}

export interface EventSchedule {
  title: string;
  badge: string;
  day: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  mapsUrl: string;
  mapsEmbedUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  calendarDetails: CalendarEventDetails;
}

export interface PersonProfile {
  fullName: string;
  nickname: string;
  fatherName: string;
  motherName: string;
  photo: string;
  instagramUsername: string;
  instagramUrl: string;
  bio?: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  orientation?: 'portrait' | 'landscape' | 'square';
}

export interface LoveStoryItem {
  id: string;
  dateOrYear: string;
  title: string;
  description: string;
  photo?: string;
}

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  badge: string;
}

export interface WeddingConfig {
  meta: {
    siteTitle: string;
    siteDescription: string;
    ogImage: string;
  };
  audio: {
    title: string;
    artist: string;
    url: string;
  };
  cover: {
    heading: string;
    subheading: string;
    couplePhoto: string;
    invitationGreeting: string;
  };
  hero: {
    badge: string;
    groomNickname: string;
    brideNickname: string;
    weddingDateLabel: string;
    countdownTarget: string; // e.g. "2026-12-12T08:00:00+07:00"
    romanticQuote: string;
    romanticQuoteAuthor: string;
    heroPhoto: string;
  };
  verse: {
    arabic: string;
    translation: string;
    surah: string;
    prayer: string;
  };
  couple: {
    groom: PersonProfile;
    bride: PersonProfile;
  };
  events: {
    akad: EventSchedule;
    resepsi: EventSchedule;
  };
  gallery: GalleryItem[];
  story: LoveStoryItem[];
  gift: {
    groomBank: BankAccount;
    brideBank: BankAccount;
    whatsappNumber: string; // Format: 628xxxx (for wa.me)
    whatsappTemplate: string;
  };
}

export interface WeddingMessage {
  id: string;
  guest_name: string;
  attendance: AttendanceStatus;
  guest_count: number;
  message: string;
  created_at: string;
}

export interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}
