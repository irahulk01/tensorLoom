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

      // We want the text to pin, and as we scroll, the words light up.
      // Instead of complex splitting, we use standard scrub
      const words = gsap.utils.toArray('.belief-word');

      gsap.set(words, { opacity: 0.1, y: 20 });

      gsap.to(words, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 40%',
          end: 'bottom 80%',
          scrub: 1,
        },
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="w-full min-h-screen py-32 md:py-48 bg-[var(--background)] flex items-center justify-center relative z-20"
    >
      {/* Subtle ambient light for contrast */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1200px] w-full px-6 md:px-12 relative z-10 flex flex-col justify-center">
        <span className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-16 block">
          {beliefsContent.title}
        </span>

        <div className="flex flex-col gap-8 md:gap-12">
          {beliefsContent.statements.map((statement, sIdx) => (
            <h3
              key={sIdx}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1] text-white flex flex-wrap gap-x-4 font-heading"
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
