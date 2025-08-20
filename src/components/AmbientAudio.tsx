'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AmbientAudio() {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio('/Audio/music.mp3');
    audio.loop = true; // Make the audio loop
    audioRef.current = audio;

    // Clean up audio on component unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isMuted) {
      audioRef.current.play()
        .then(() => {
          console.log('Audio started playing');
        })
        .catch(error => {
          console.error('Error playing audio:', error);
        });
    } else {
      audioRef.current.pause();
    }
    
    setIsMuted(!isMuted);
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