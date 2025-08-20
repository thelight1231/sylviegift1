'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export default function MysteryDoor() {
  const [showRoom, setShowRoom] = useState(false);

  const openDoor = () => setShowRoom(true);
  const closeDoor = () => setShowRoom(false);

  return (
    <>
      <section className="py-20 px-4 pb-32">
        <div className="text-center">
          <button
            onClick={openDoor}
            className="group relative p-8 bg-gradient-to-b from-amber-600 to-amber-800 rounded-2xl border-4 border-amber-500 hover:from-amber-500 hover:to-amber-700 transition-all duration-300 shadow-2xl"
            aria-label="افتح الباب"
          >
            <div className="text-6xl md:text-8xl group-hover:scale-110 transition-transform duration-300">
              🚪
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
          </button>
          
          <p className="mt-6 prose-arabic text-lg text-slate-400">
            اضغطي لتدخلي
          </p>
        </div>
      </section>

      {/* Empty Room Modal */}
      {showRoom && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeDoor}
        >
          <div 
            className="relative w-full max-w-4xl h-96 bg-slate-900/50 border border-slate-700 rounded-3xl flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeDoor}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white transition-colors"
              aria-label="إغلاق"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center">
              <p className="prose-arabic text-3xl md:text-4xl text-pink-300 font-bold">
                بحبك يا منة
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}