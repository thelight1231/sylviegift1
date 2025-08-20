'use client';

import { useState, useEffect } from 'react';

const bookPages = [
  'ما نكتبه لا ينجو بنا—بل ينجو بنا ما نصدّقه.',
  'حين يهدأ الضجيج، تسمعين اسمكِ كما لم يُنطق من قبل.',
  'الطرق التي لا نمشيها تبقى فينا كاحتمالات دافئة.',
  'ليس كل سؤال ينتظر إجابة… بعضُ الأسئلة أبواب.',
  'وما بيننا خيط، شدّته في أننا لا نراه.',
  'إلى الغرفة التي تعرفكِ، تعالي كما أنتِ.'
];

export default function OpenBook() {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % bookPages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="heading-arabic text-3xl md:text-4xl mb-12 text-slate-200">
          دفتر مفتوح
        </h2>
        
        <div className="relative">
          {/* Book */}
          <div className="bg-gradient-to-br from-amber-100 to-amber-200 text-slate-800 p-8 md:p-12 rounded-2xl shadow-2xl min-h-[300px] flex items-center justify-center border-4 border-amber-300">
            <div className="prose-arabic text-lg md:text-xl leading-relaxed max-w-md text-center">
              <p className="animate-fade-in">
                «{bookPages[currentPage]}»
              </p>
            </div>
          </div>
          
          {/* Page indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {bookPages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentPage 
                    ? 'bg-amber-400 scale-110' 
                    : 'bg-slate-600 hover:bg-slate-500'
                }`}
                aria-label={`الصفحة ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}