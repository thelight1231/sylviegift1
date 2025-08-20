'use client';

import { useState, useEffect, useRef } from 'react';

const journeyStages = [
  "قبل كل حاجة: كنا شايفين بعض غُرباء.",
  "وبعدين: ابتدينا نتلخبط في بعض وكان إحساسنا إن ورانا أسرار كتير.",
  "ومع الوقت: كل ما قضّينا وقت مع بعض أكتر، كل ما حسّينا بأمان… وبشعور غريب إننا حابين نحكي.",
  "يمكن: مكناش جاهزين للخطوات دي… ويمكن مكناش فاهمين إيه بيحصل.",
  "بس الأكيد: إننا قدرنا نشارك مشاعر لبعض.",
  "وهنا: دي مش النهاية—دي بداية رحلتنا… أنا وإنتِ يا سيلفي."
];

export default function JourneyTimeline() {
  const [visibleNodes, setVisibleNodes] = useState<boolean[]>(new Array(6).fill(false));
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          if (entry.isIntersecting) {
            setVisibleNodes(prev => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
          }
        });
      },
      { threshold: 0.3, rootMargin: '-50px' }
    );

    nodeRefs.current.forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="heading-arabic text-3xl md:text-4xl text-center mb-16 text-slate-200">
          الرحلة الرمزية
        </h2>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute right-1/2 transform translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-purple-500 to-blue-500 opacity-30"></div>
          
          {journeyStages.map((stage, index) => (
            <div
              key={index}
              ref={(el) => { nodeRefs.current[index] = el; }}
              data-index={index}
              className={`journey-node ${visibleNodes[index] ? 'visible' : ''} relative mb-12 flex items-center`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Node circle */}
              <div className="absolute right-1/2 transform translate-x-1/2 w-4 h-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-lg shadow-purple-500/50"></div>
              
              {/* Content */}
              <div className={`${index % 2 === 0 ? 'mr-8 text-right' : 'ml-8 text-left'} w-5/12 ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'}`}>
                <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700 glow-hover">
                  <p className="prose-arabic text-base md:text-lg text-slate-200 leading-relaxed">
                    {index === 5 ? (
                      <>
                        {stage.replace('يا سيلفي', '')}
                        <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-semibold">
                          يا سيلفي
                        </span>
                      </>
                    ) : stage}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}