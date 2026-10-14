import React, { useState, useEffect } from 'react';
import { Music, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { romanticAudio } from '../../lib/audio';

interface AudioPlayerProps {
  trackTitle: string;
  artist: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ trackTitle, artist }) => {
  const [audioState, setAudioState] = useState({
    isPlaying: false,
    isMuted: false,
    error: null as string | null,
  });
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const unsubscribe = romanticAudio.subscribe((state) => {
      setAudioState(state);
    });
    return unsubscribe;
  }, []);

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    romanticAudio.togglePlay();
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    romanticAudio.toggleMute();
  };

  return (
    <aside aria-label="Pemutar Musik Latar" className="fixed top-4 right-4 z-40">
      <div
        className={`flex items-center gap-1.5 p-1.5 rounded-full border border-gold-300/40 bg-ivory-50/90 backdrop-blur-md shadow-lg transition-all duration-300 ${
          isExpanded ? 'pr-3 shadow-gold-500/10' : ''
        }`}
      >
        {/* Main Music Button (Spinning when playing) */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all ${
            audioState.isPlaying
              ? 'bg-gradient-to-tr from-gold-600 to-gold-400 text-white shadow-md'
              : 'bg-espresso-100 text-espresso-600'
          }`}
          title={audioState.isPlaying ? 'Musik berputar (Klik untuk opsi)' : 'Musik dijeda'}
          aria-label={audioState.isPlaying ? 'Musik berputar' : 'Musik dijeda'}
        >
          <Music
            className={`w-4 h-4 sm:w-5 sm:h-5 ${
              audioState.isPlaying && !audioState.isMuted ? 'animate-spin-slow' : ''
            }`}
          />
          {audioState.isPlaying && !audioState.isMuted && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full animate-ping" />
          )}
        </button>

        {/* Expanded Controls & Track Name */}
        {isExpanded && (
          <div className="flex items-center gap-2 pl-1 animate-fade-in text-xs">
            <div className="max-w-[120px] sm:max-w-[150px] overflow-hidden whitespace-nowrap text-left">
              <p className="font-medium text-espresso-800 truncate leading-none">{trackTitle}</p>
              <p className="text-[10px] text-espresso-500 truncate mt-0.5">{artist}</p>
            </div>

            <div className="flex items-center gap-1 border-l border-gold-200 pl-2">
              <button
                onClick={handleTogglePlay}
                className="p-1.5 rounded-full hover:bg-gold-100/60 text-espresso-700 transition"
                title={audioState.isPlaying ? 'Jeda Musik' : 'Putar Musik'}
                aria-label={audioState.isPlaying ? 'Jeda Musik' : 'Putar Musik'}
              >
                {audioState.isPlaying ? (
                  <Pause className="w-3.5 h-3.5 fill-current" />
                ) : (
                  <Play className="w-3.5 h-3.5 fill-current" />
                )}
              </button>

              <button
                onClick={handleToggleMute}
                className="p-1.5 rounded-full hover:bg-gold-100/60 text-espresso-700 transition"
                title={audioState.isMuted ? 'Nyalakan Suara' : 'Bisukan Suara'}
                aria-label={audioState.isMuted ? 'Nyalakan Suara' : 'Bisukan Suara'}
              >
                {audioState.isMuted ? (
                  <VolumeX className="w-3.5 h-3.5 text-rose-500" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
