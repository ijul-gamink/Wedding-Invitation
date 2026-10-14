import type { CalendarEventDetails } from '../types';

/**
 * Format string tanggal ISO menjadi format YYYYMMDDTHHmmssZ untuk Google Calendar
 */
function formatUtcForCalendar(isoString: string): string {
  const date = new Date(isoString);
  return date.toISOString().replace(/-|:|\.\d\d\d/g, '');
}

/**
 * Buat URL Google Calendar langsung
 */
export function getGoogleCalendarUrl(event: CalendarEventDetails): string {
  const startUtc = formatUtcForCalendar(event.startTime);
  const endUtc = formatUtcForCalendar(event.endTime);

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${startUtc}/${endUtc}`,
    details: event.description,
    location: event.location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Buat dan unduh file .ics (iCalendar) untuk Apple Calendar, Outlook, atau kalender bawaan smartphone
 */
export function downloadIcsFile(event: CalendarEventDetails): void {
  const startUtc = formatUtcForCalendar(event.startTime);
  const endUtc = formatUtcForCalendar(event.endTime);
  const nowUtc = formatUtcForCalendar(new Date().toISOString());

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//The Wedding Invitation//ID',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:wedding-${Date.now()}@undangan`,
    `DTSTAMP:${nowUtc}`,
    `DTSTART:${startUtc}`,
    `DTEND:${endUtc}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
    `LOCATION:${event.location.replace(/\n/g, ', ')}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    'DESCRIPTION:Pengingat Acara Pernikahan Besok',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${event.title.replace(/\s+/g, '-').toLowerCase()}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
