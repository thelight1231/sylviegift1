'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AmbientAudio() {
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // ✅ Correct path: no "public/"
    const audio = new Audio('/Audio/music.mp3');
    audio.loop = true;
    audio.muted = true;
    audio.preload = 'auto';

    const handleCanPlay = () => {
      console.log('Audio can play');
      setIsLoading(false);
    };

    audio.addEventListener('canplay', handleCanPlay);

    audioRef.current = audio;

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleAudio = async () => {
    if (!audioRef.current) return;

    try {
      if (isMuted) {
        audioRef.current.muted = false;
        await audioRef.current.play();
        console.log('Audio started playing');
      } else {
        audioRef.current.muted = true;
        audioRef.current.pause();
      }
      setIsMuted(!isMuted);
    } catch (error) {
      console.error('Error toggling audio:', error);
      if (error instanceof Error && error.name === 'NotAllowedError') {
        alert('Please tap the page first to enable audio playback');
      }
    }
  };

  return (
    <button
      onClick={toggleAudio}
      className="fixed top-6 left-6 z-50 p-3 bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-full hover:bg-slate-700/80 transition-all duration-300 group"
      aria-label={isMuted ? 'Play music' : 'Pause music'}
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
      ) : (
        <Volume2 className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
      )}
    </button>
  );
}
