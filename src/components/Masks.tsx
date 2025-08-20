'use client';

import { useState } from 'react';

const maskQuotes = [
  'القوة ليست صلابة… بل قدرة على الانكسار والعودة.',
  'لكل قناع حكاية، ولكل حكاية صرخة مخفيّة.',
  'الظلال وجوه أيضًا—لكنها تحتاج صبرًا لتظهر.',
  'أنتِ كثرةٌ لا تُعدّ—ولا يلزمك أن تُحصيها.',
  'في تعدّدكِ اتّساعٌ للحقيقة، لا تناقض.'
];

export default function Masks() {
  const [selectedQuote, setSelectedQuote] = useState<string | null>(null);

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="heading-arabic text-3xl md:text-4xl mb-12 text-slate-200">
          أقنعة الداخل
        </h2>
        
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {maskQuotes.map((quote, index) => (
            <button
              key={index}
              onClick={() => setSelectedQuote(quote)}
              className="text-4xl md:text-6xl opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300 p-4"
              aria-label={`قناع ${index + 1}`}
            >
              🎭
            </button>
          ))}
        </div>
        
        {selectedQuote && (
          <div className="bg-slate-800/30 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 max-w-2xl mx-auto">
            <p className="prose-arabic text-lg md:text-xl text-purple-200">
              «{selectedQuote}»
            </p>
          </div>
        )}
      </div>
    </section>
  );
}