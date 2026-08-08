'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface BeliefsProps {
  beliefsContent: {
    title: string;
    statements: string[];
  };
}

export function Beliefs({ beliefsContent }: BeliefsProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!container.current) return;

      const words = gsap.utils.toArray('.belief-word');
      gsap.set(words, { opacity: 0.2, y: 15 });

      gsap.to(words, {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 70%',
          end: 'bottom 50%',
          scrub: 0.8,
        },
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="w-full min-h-[85vh] py-24 md:py-36 bg-[#fcfbf9] flex items-center justify-center relative z-20 overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#c99b3e]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1200px] w-full px-6 md:px-12 relative z-10 flex flex-col justify-center min-w-0">
        <span className="text-xs sm:text-sm font-mono text-[#b38730] font-semibold uppercase tracking-widest mb-10 md:mb-16 block">
          {beliefsContent.title}
        </span>

        <div className="flex flex-col gap-6 md:gap-10">
          {beliefsContent.statements.map((statement, sIdx) => (
            <h3
              key={sIdx}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-[#0f1117] flex flex-wrap gap-x-3 sm:gap-x-4 font-heading break-words"
            >
              {statement.split(' ').map((word, wIdx) => (
                <span key={`${sIdx}-${wIdx}`} className="belief-word inline-block">
                  {word}
                </span>
              ))}
            </h3>
          ))}
        </div>
      </div>
    </section>
  );
}
