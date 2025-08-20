'use client';

import { useState, useEffect } from 'react';

const starMessages = [
  'أنتِ لستِ وحدك.',
  'هناك معنى لم يولد بعد.',
  'الاستماع شكل من أشكال الحب.',
  'حتى في الصمت، يوجد كلام.',
  'أنتِ عالمٌ صغير يمشي بين الناس.',
  'ما تخفينه يزهر حين يؤمن به أحد.',
  'لا أحد يرى الكل—وهذا حسن.'
];

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  animationDelay: number;
}

export default function StarField() {
  const [stars, setStars] = useState<Star[]>([]);
  const [showMessage, setShowMessage] = useState<{ message: string; x: number; y: number } | null>(null);

  useEffect(() => {
    // Generate random stars
    const generatedStars: Star[] = [];
    for (let i = 0; i < 25; i++) {
      generatedStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 2,
        animationDelay: Math.random() * 3
      });
    }
    setStars(generatedStars);
  }, []);

  const handleStarClick = (star: Star, e: React.MouseEvent) => {
    const randomMessage = starMessages[Math.floor(Math.random() * starMessages.length)];
    
    // Get click position relative to viewport
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    
    setShowMessage({
      message: randomMessage,
      x: rect.left + rect.width / 2,
      y: rect.top
    });

    // Hide message after 4 seconds
    setTimeout(() => setShowMessage(null), 4000);
  };

  return (
    <>
      {/* Stars */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute star cursor-pointer pointer-events-auto"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.animationDelay}s`
            }}
            onClick={(e) => handleStarClick(star, e)}
          >
            <div className="w-full h-full bg-white rounded-full opacity-70 hover:opacity-100 transition-opacity"></div>
          </div>
        ))}
      </div>

      {/* Message tooltip */}
      {showMessage && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: showMessage.x,
            top: showMessage.y - 60,
            transform: 'translateX(-50%)'
          }}
        >
          <div className="bg-slate-800/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg border border-slate-600 shadow-xl animate-fade-in">
            <p className="prose-arabic text-sm whitespace-nowrap">
              {showMessage.message}
            </p>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45"></div>
          </div>
        </div>
      )}
    </>
  );
}