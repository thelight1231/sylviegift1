'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AmbientAudio() {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create a simple ambient pad using Web Audio API
    const createAmbientSound = () => {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        const createTone = (freq: number, gain: number) => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
          oscillator.type = 'sine';
          gainNode.gain.setValueAtTime(gain, audioContext.currentTime);
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          return { oscillator, gainNode };
        };

        let tones: any[] = [];
        
        const startAmbient = () => {
          if (tones.length > 0) return;
          
          // Create multiple tones for ambient pad
          tones = [
            createTone(110, 0.02), // A
            createTone(165, 0.015), // E
            createTone(220, 0.01), // A octave
            createTone(330, 0.008), // E octave
          ];
          
          tones.forEach(({ oscillator }) => {
            oscillator.start();
          });
        };

        const stopAmbient = () => {
          tones.forEach(({ oscillator }) => {
            try {
              oscillator.stop();
            } catch (e) {
              // Ignore if already stopped
            }
          });
          tones = [];
        };

        audioRef.current = {
          play: startAmbient,
          pause: stopAmbient,
          muted: true
        } as any;

      } catch (e) {
        console.log('Web Audio API not supported');
      }
    };

    createAmbientSound();
  }, []);

  const toggleAudio = () => {
    setIsMuted(!isMuted);
    
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  return (
    <button
      onClick={toggleAudio}
      className="fixed top-6 left-6 z-50 p-3 bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-full hover:bg-slate-700/80 transition-all duration-300 group"
      aria-label={isMuted ? 'تشغيل الصوت' : 'إيقاف الصوت'}
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
      ) : (
        <Volume2 className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
      )}
    </button>
  );
}