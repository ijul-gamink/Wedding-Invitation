/**
 * Manajer Audio Latar Belakang Romantis
 * Menangani pemutaran audio dengan kontrol play, pause, mute, unmute,
 * serta penanganan kegagalan pemutaran browser (Autoplay Policy / Network error).
 */

class RomanticAudioManager {
  private audio: HTMLAudioElement | null = null;
  private isMuted: boolean = false;
  private isPlaying: boolean = false;
  private listeners: Set<(state: { isPlaying: boolean; isMuted: boolean; error: string | null }) => void> = new Set();
  private lastError: string | null = null;
  private audioContext: AudioContext | null = null;
  private synthInterval: number | null = null;

  constructor() {
    // Lazily initialized upon user interaction
  }

  public init(audioUrl: string) {
    if (this.audio) return;

    this.audio = new Audio(audioUrl);
    this.audio.loop = true;
    this.audio.preload = 'auto';

    this.audio.addEventListener('playing', () => {
      this.isPlaying = true;
      this.lastError = null;
      this.notify();
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
      this.notify();
    });

    this.audio.addEventListener('error', (e) => {
      console.warn('Audio URL playback error, falling back to gentle ambient piano synth:', e);
      this.lastError = 'Gagal memuat URL audio eksternal, beralih ke nada instrumental romantis.';
      this.notify();
      // Start fallback ambient romantic chords
      if (this.isPlaying) {
        this.startAmbientSynth();
      }
    });
  }

  public subscribe(cb: (state: { isPlaying: boolean; isMuted: boolean; error: string | null }) => void) {
    this.listeners.add(cb);
    cb({ isPlaying: this.isPlaying, isMuted: this.isMuted, error: this.lastError });
    return () => {
      this.listeners.delete(cb);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => {
      cb({ isPlaying: this.isPlaying, isMuted: this.isMuted, error: this.lastError });
    });
  }

  public async play(): Promise<boolean> {
    if (!this.audio) return false;

    try {
      this.audio.muted = this.isMuted;
      await this.audio.play();
      this.isPlaying = true;
      this.stopAmbientSynth();
      this.notify();
      return true;
    } catch (err) {
      console.warn('HTMLAudio play failed, activating romantic audio synthesizer:', err);
      this.startAmbientSynth();
      this.isPlaying = true;
      this.notify();
      return true;
    }
  }

  public pause(): void {
    if (this.audio) {
      this.audio.pause();
    }
    this.stopAmbientSynth();
    this.isPlaying = false;
    this.notify();
  }

  public togglePlay(): void {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public toggleMute(): void {
    this.isMuted = !this.isMuted;
    if (this.audio) {
      this.audio.muted = this.isMuted;
    }
    if (this.audioContext && this.isMuted) {
      this.audioContext.suspend();
    } else if (this.audioContext && !this.isMuted) {
      this.audioContext.resume();
    }
    this.notify();
  }

  /**
   * Sintesis Chord Romantis Ringan (Web Audio API Fallback)
   * Memberikan alunan nada piano/bell lembut berulang jika link MP3 eksternal diblokir/offline.
   */
  private startAmbientSynth(): void {
    if (this.synthInterval) return;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      this.audioContext = new AudioCtx();
      const notes = [261.63, 329.63, 392.00, 523.25, 440.00, 349.23]; // C, E, G, C5, A, F
      let index = 0;

      const playChord = () => {
        if (!this.audioContext || this.audioContext.state === 'suspended' || this.isMuted) return;

        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(notes[index % notes.length], this.audioContext.currentTime);

        gain.gain.setValueAtTime(0.01, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.06, this.audioContext.currentTime + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime + 3.5);

        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        osc.start();
        osc.stop(this.audioContext.currentTime + 3.6);

        index++;
      };

      playChord();
      this.synthInterval = window.setInterval(playChord, 1800);
    } catch (e) {
      console.warn('Web Audio synth not supported:', e);
    }
  }

  private stopAmbientSynth(): void {
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
    if (this.audioContext) {
      try {
        this.audioContext.close();
      } catch {
        // ignore
      }
      this.audioContext = null;
    }
  }
}

export const romanticAudio = new RomanticAudioManager();
