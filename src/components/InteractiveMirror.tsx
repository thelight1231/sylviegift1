'use client';

import { useState } from 'react';

export default function InteractiveMirror() {
  const [input, setInput] = useState('');
  const [mirrorText, setMirrorText] = useState('');
  const [isCleared, setIsCleared] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMirrorText(input);
    setInput('');
  };

  const handleClarify = () => {
    setIsCleared(true);
    setTimeout(() => setIsCleared(false), 3000);
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="heading-arabic text-3xl md:text-4xl mb-8 text-slate-200">
          مرآة مُشوَّشة
        </h2>
        
        {/* Mirror */}
        <div className="w-full h-48 bg-slate-900/80 backdrop-blur-sm border-2 border-slate-700 rounded-2xl mb-8 flex items-center justify-center relative overflow-hidden">
          {mirrorText && (
            <p className={`prose-arabic text-xl md:text-2xl text-purple-200 px-4 transition-all duration-500 ${
              isCleared ? 'mirror-clear' : 'mirror-blur'
            }`}>
              {mirrorText}
            </p>
          )}
          {!mirrorText && (
            <p className="text-slate-500 prose-arabic">المرآة في انتظار كلماتك</p>
          )}
        </div>
        
        {/* Input */}
        <form onSubmit={handleSubmit} className="mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="اكتبي كلمة واضغطي Enter"
            className="w-full p-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl text-right prose-arabic text-lg placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
          />
        </form>
        
        {/* Clarify Button */}
        {mirrorText && (
          <button
            onClick={handleClarify}
            className="px-6 py-3 bg-purple-600/20 border border-purple-500/30 rounded-xl text-purple-200 hover:bg-purple-600/30 transition-all duration-300 prose-arabic"
          >
            إيضاح
          </button>
        )}
      </div>
    </section>
  );
}