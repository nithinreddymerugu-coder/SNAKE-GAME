import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Music } from 'lucide-react';
import type { Track } from '../types';

const DUMMY_TRACKS: Track[] = [
  {
    id: 'track-1',
    title: 'Neon Drive',
    artist: 'AI Gen - Cyber Sequence',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    id: 'track-2',
    title: 'Digital Horizon',
    artist: 'AI Gen - Synthwave',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  },
  {
    id: 'track-3',
    title: 'Cybernetic Pulse',
    artist: 'AI Gen - Dark Bass',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  }
];

export const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0); // 0 to 100

  const currentTrack = DUMMY_TRACKS[currentTrackIndex];

  useEffect(() => {
    // When track changes, we need to reset progress and play if it was already playing
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      }
    }
  }, [currentTrackIndex, isPlaying]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const skipNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % DUMMY_TRACKS.length);
  };

  const skipPrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((currentTime / duration) * 100);
      }
    }
  };

  const handleTrackEnded = () => {
    skipNext();
  };

  // Keep focus on game so clicking player doesn't grab space bar 
  // We'll blur the button after click to return focus to body.
  const blurOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
  };

  return (
    <div className="w-full max-w-md mx-auto bg-slate-900 border border-slate-700/50 rounded-2xl p-4 shadow-[0_0_20px_rgba(34,211,238,0.1)] backdrop-blur-md relative overflow-hidden flex flex-col gap-4 z-30">
      
      {/* Background glow based on playing state */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[150px] bg-cyan-500/10 blur-[50px] -z-10 rounded-full transition-opacity duration-1000 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}></div>

      <audio 
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTrackEnded}
      />

      {/* Track Info */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-lg bg-slate-800 border border-cyan-500/30 flex items-center justify-center shrink-0 relative overflow-hidden group">
          {isPlaying ? (
             <div className="flex gap-[3px] h-4 items-end justify-center w-full px-2">
               {[1, 2, 3, 4].map((i) => (
                 <div 
                   key={i} 
                   className="w-1.5 bg-cyan-400 rounded-t-sm neon-glow-cyan animate-pulse" 
                   style={{ height: `${Math.random() * 100 + 40}%`, animationDuration: `${0.4 + i*0.1}s` }}
                 ></div>
               ))}
             </div>
          ) : (
            <Music className="w-6 h-6 text-cyan-500/50" />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-slate-100 font-bold truncate tracking-wide text-lg neon-text-cyan">{currentTrack.title}</h3>
          <p className="text-cyan-400/80 font-mono text-xs truncate uppercase mt-1">{currentTrack.artist}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden relative">
        <div 
          className="absolute top-0 left-0 h-full bg-cyan-400 neon-glow-cyan transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6 mt-2">
        <button 
          onClick={(e) => { skipPrev(); blurOnClick(e); }}
          className="text-slate-400 hover:text-cyan-400 transition-colors hover:neon-text-cyan flex items-center justify-center p-2"
        >
          <SkipBack className="w-6 h-6 fill-current" />
        </button>
        
        <button 
          onClick={(e) => { togglePlayPause(); blurOnClick(e); }}
          className="w-14 h-14 rounded-full bg-cyan-500 border border-cyan-400 flex items-center justify-center text-slate-900 neon-glow-cyan hover:bg-cyan-400 transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(34,211,238,0.5)]"
        >
          {isPlaying ? (
            <Pause className="w-7 h-7 fill-current" />
          ) : (
             // Offset play icon slightly to appear visually centered
            <Play className="w-7 h-7 fill-current ml-1" />
          )}
        </button>
        
        <button 
          onClick={(e) => { skipNext(); blurOnClick(e); }}
          className="text-slate-400 hover:text-cyan-400 transition-colors hover:neon-text-cyan flex items-center justify-center p-2"
        >
          <SkipForward className="w-6 h-6 fill-current" />
        </button>
      </div>

    </div>
  );
};
