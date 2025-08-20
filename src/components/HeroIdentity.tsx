'use client';

export default function HeroIdentity() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="heading-arabic text-4xl md:text-6xl lg:text-7xl mb-8 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
          Sylvie's gift
        </h1>
        
        <div className="relative h-20 flex items-center justify-center">
          <p className="prose-arabic text-lg md:text-xl lg:text-2xl text-slate-300 max-w-2xl">
            «that's For You, only You»
          </p>
        </div>
        
        <div className="mt-12 opacity-70">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-slate-600 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}