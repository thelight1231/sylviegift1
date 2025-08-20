'use client';

import { useState } from 'react';

const responses = {
  'ضايعة': 'حتى الضياع له خريطة… لكنها تُرسم من الداخل.',
  'تايهة': 'حتى الضياع له خريطة… لكنها تُرسم من الداخل.',
  'وحدي': 'أنتِ وحدكِ حين لا تسمعين قلبك—فاستمعي.',
  'وحدة': 'أنتِ وحدكِ حين لا تسمعين قلبك—فاستمعي.',
  'خوف': 'الخوف ظلّ المعنى؛ حين يكتمل المعنى ينكمش الظل.',
  'مرعوبة': 'الخوف ظلّ المعنى؛ حين يكتمل المعنى ينكمش الظل.',
  'وجع': 'الألم مرآةٌ أيضًا؛ يرى ما لا نجرؤ أن نسمّيه.',
  'تعب': 'الألم مرآةٌ أيضًا؛ يرى ما لا نجرؤ أن نسمّيه.',
  'معنى': 'المعنى لا يُلتقط؛ إنما ينبت حين نَصدق السؤال.',
  'غرض': 'المعنى لا يُلتقط؛ إنما ينبت حين نَصدق السؤال.'
};

const defaultResponse = 'الصمت ليس فراغًا… إنه شكلٌ آخر للكلام.';

export default function HiddenVoice() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [showResponse, setShowResponse] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Find matching response
    const inputLower = input.toLowerCase();
    let matchedResponse = defaultResponse;
    
    for (const [key, value] of Object.entries(responses)) {
      if (inputLower.includes(key)) {
        matchedResponse = value;
        break;
      }
    }

    setResponse(matchedResponse);
    setInput('');
    setShowResponse(true);
    setIsTyping(true);

    // Simulate typewriter effect duration
    setTimeout(() => setIsTyping(false), matchedResponse.length * 50);
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="heading-arabic text-3xl md:text-4xl mb-8 text-slate-200">
          الصوت المخفي
        </h2>
        
        <form onSubmit={handleSubmit} className="mb-8">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="اكتبي همسًا… ثم Enter"
            className="w-full p-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl text-right prose-arabic text-lg placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
          />
        </form>
        
        {showResponse && (
          <div className="bg-slate-800/30 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 min-h-[100px] flex items-center justify-center">
            <p className={`prose-arabic text-lg md:text-xl text-purple-200 ${isTyping ? 'typewriter' : ''}`}>
              «{response}»
            </p>
          </div>
        )}
      </div>
    </section>
  );
}