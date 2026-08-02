'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    value: 20,
    suffix: '+',
    label: 'Projects Completed',
    mission: 'Delivering bulletproof, production-grade systems on time.',
  },
  {
    value: 15,
    suffix: '+',
    label: 'Happy Clients',
    mission: 'Fostering trusted partnerships built on reliability.',
  },
  {
    value: 5,
    suffix: '+',
    label: 'Team Members',
    mission: 'Operating as a high-density, elite engineering unit.',
  },
  {
    value: 8,
    suffix: '+',
    label: 'Years of Experience',
    mission: 'Refining architectures that eliminate costly complexity.',
  },
];

export function WhyChooseUs() {
  const container = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useGSAP(
    () => {
      if (!container.current) return;

      const elements = gsap.utils.toArray('.stat-number');

      elements.forEach((el: any) => {
        const targetVal = parseInt(el.getAttribute('data-target') || '0', 10);

        gsap.fromTo(
          el,
          { textContent: '0' },
          {
            textContent: targetVal,
            duration: 2,
            ease: 'power2.out',
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          },
        );
      });

      // Ambient/entrance fade-in animation for cards
      gsap.fromTo(
        '.stat-card-wrap',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container.current,
            start: 'top 80%',
          },
        },
      );
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="w-full py-32 md:py-48 bg-[var(--background)] relative z-20 border-t border-white/5"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="mb-20 text-center flex flex-col items-center">
          <span className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-4 block">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter leading-tight text-white uppercase font-heading">
            Numbers That Speak
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, idx) => {
            const isHovered = hoveredIdx === idx;
            const isAnyHovered = hoveredIdx !== null;
            const isDimmed = isAnyHovered && !isHovered;

            return (
              <div
                key={idx}
                className="relative h-full cursor-pointer"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <div
                  className="stat-card-wrap transition-all duration-500 ease-out h-full"
                  style={{
                    transform: isDimmed
                      ? 'scale(0.93) translateY(4px)'
                      : isHovered
                        ? 'scale(1.04) translateY(-4px)'
                        : 'scale(1) translateY(0)',
                    opacity: isDimmed ? 0.35 : 1,
                    filter: isDimmed ? 'blur(0.8px)' : 'none',
                    zIndex: isHovered ? 30 : 10,
                  }}
                >
                  <div className="stat-card flagship-surface p-8 rounded-3xl flex flex-col justify-between h-[240px] md:h-[260px] group transition-all duration-500 border border-white/10 hover:border-cyan-500/40 hover:shadow-[0_10px_30px_rgba(6,182,212,0.1)]">
                    <div>
                      <span className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white font-heading inline-flex items-baseline">
                        <span
                          className="stat-number inline-block text-cyan-400"
                          data-target={stat.value}
                        >
                          0
                        </span>
                        <span className="text-white ml-0.5">{stat.suffix}</span>
                      </span>
                    </div>

                    <div className="mt-6">
                      <p className="text-xs md:text-sm text-gray-400 font-semibold font-sans uppercase tracking-wider">
                        {stat.label}
                      </p>

                      <div
                        className="transition-all duration-500 ease-out overflow-hidden"
                        style={{
                          maxHeight: isHovered ? '100px' : '0px',
                          opacity: isHovered ? 1 : 0,
                          marginTop: isHovered ? '12px' : '0px',
                        }}
                      >
                        <p className="text-xs md:text-sm text-gray-300 font-normal leading-relaxed border-t border-white/10 pt-3">
                          {stat.mission}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
