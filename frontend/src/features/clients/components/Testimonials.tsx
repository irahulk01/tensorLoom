'use client';

import { useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "The team delivered beyond expectations — on time and within budget. Our idea was simple but at the time of discussion they understood it deeply, gave us insights we hadn't considered, and built something that truly resonated with our users.",
    name: 'Alina Dino',
    role: 'Soul Sync',
    abbr: 'SS',
    hue: '#F43F5E',
  },
  {
    quote:
      'Excellent communication, reliable support, and top-quality results. They created my website in a week, which was a tight timeline, and it came out polished and professional. TensorLoom is a team you can genuinely trust.',
    name: 'Sophia Lee',
    role: 'Owner, Money Visionaries',
    abbr: 'MV',
    hue: '#10B981',
  },
  {
    quote:
      'TensorLoom helped us complete the project on time and within budget. Our application was in Unity and an older version at that — they navigated the complexity without a single complaint and delivered cleanly.',
    name: 'Vijay Dwivedi',
    role: 'CTO, Classmates',
    abbr: 'CM',
    hue: '#8B5CF6',
  },
  {
    quote:
      'TensorLoom transformed our business with their innovative solutions! As the complete industry was having the problem of manual tracking, their platform streamlined our entire operational workflow effortlessly.',
    name: 'Nitesh Saini',
    role: 'CEO, Neumyth Marketing',
    abbr: 'NM',
    hue: '#F59E0B',
  },
];

export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(1); // start on middle card

  const total = testimonials.length;

  const prev = useCallback(() => {
    setActiveIdx((i) => (i - 1 + total) % total);
  }, [total]);

  const next = useCallback(() => {
    setActiveIdx((i) => (i + 1) % total);
  }, [total]);

  useGSAP(
    () => {
      if (!headingRef.current) return;
      gsap.fromTo(
        headingRef.current.children,
        { opacity: 0, y: 40, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        },
      );

      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="w-full py-28 md:py-36 bg-[var(--background)] relative z-20 overflow-hidden border-t border-white/10"
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 60%, rgba(139,92,246,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        {/* ── Header ── */}
        <div ref={headingRef} className="mb-20 flex flex-col items-center text-center gap-4">
          <span className="inline-flex items-center gap-2 text-[10px] font-mono text-cyan-400 uppercase tracking-[0.3em] font-semibold">
            <span className="w-6 h-[1px] bg-cyan-500/40 inline-block" />
            Testimonials
            <span className="w-6 h-[1px] bg-cyan-500/40 inline-block" />
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.03em] leading-none text-white font-heading">
            What Our <span className="text-cyan-400">Clients Say</span>
          </h2>
          <p className="text-sm text-gray-400 font-sans max-w-sm leading-relaxed">
            Real words from real partners who trusted us to build and ship.
          </p>
        </div>

        {/* ── Cards ── */}
        <div ref={cardsRef} className="relative flex flex-col items-center gap-10 opacity-0">
          {/* Card strip */}
          <div className="w-full flex items-center justify-center gap-5">
            {testimonials.map((t, idx) => {
              const isActive = idx === activeIdx;
              const isSide = !isActive;

              return (
                <div
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className="transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer"
                  style={{
                    flex: isActive ? '0 0 min(520px, 90vw)' : '0 0 min(280px, 30vw)',
                    opacity: isSide ? 0.35 : 1,
                    transform: isSide ? 'scale(0.92) translateY(16px)' : 'scale(1) translateY(0)',
                    filter: isSide ? 'blur(1px)' : 'none',
                    zIndex: isActive ? 20 : 10,
                    display:
                      idx === (activeIdx - 1 + total) % total ||
                      idx === activeIdx ||
                      idx === (activeIdx + 1) % total
                        ? 'block'
                        : 'none',
                  }}
                >
                  <div
                    className={`flagship-surface relative overflow-hidden rounded-3xl p-8 md:p-10 flex flex-col gap-6 h-full transition-all duration-500 ${
                      isActive ? 'border-white/20 shadow-xl' : 'border-white/10'
                    }`}
                    style={{
                      borderColor: isActive ? `${t.hue}50` : undefined,
                      boxShadow: isActive ? `0 0 60px -20px ${t.hue}35` : undefined,
                    }}
                  >
                    {/* Background glow orb */}
                    {isActive && (
                      <div
                        className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none blur-3xl opacity-20"
                        style={{ background: t.hue }}
                      />
                    )}

                    {/* Top: monogram + label */}
                    <div className="flex items-center gap-3 relative z-10">
                      <div
                        className="w-11 h-11 rounded-full flex items-center justify-center text-xs font-bold font-mono shrink-0"
                        style={{
                          background: `${t.hue}18`,
                          border: `1px solid ${t.hue}40`,
                          color: t.hue,
                        }}
                      >
                        {t.abbr}
                      </div>
                      <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.3em]">
                        Client Partner
                      </span>
                    </div>

                    {/* Quote */}
                    <div className="relative z-10 flex flex-col gap-4">
                      <Quote className="w-6 h-6 opacity-40" style={{ color: t.hue }} />
                      <p className="text-sm md:text-base leading-relaxed text-gray-300 font-sans">
                        {t.quote}
                      </p>
                    </div>

                    {/* Author */}
                    <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-white font-heading">{t.name}</p>
                        <p className="text-xs text-gray-400 font-sans mt-0.5">{t.role}</p>
                      </div>
                      {/* Accent line */}
                      <div
                        className="w-8 h-[2px] rounded-full"
                        style={{ background: `linear-gradient(90deg, ${t.hue}, transparent)` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Navigation ── */}
          <div className="flex items-center gap-6">
            <button
              onClick={prev}
              aria-label="Previous"
              className="w-11 h-11 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 cursor-pointer shadow-sm"
            >
              <ChevronLeft className="w-5 h-5 text-gray-400" />
            </button>

            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {testimonials.map((t, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className="transition-all duration-300 rounded-full cursor-pointer"
                  style={{
                    width: idx === activeIdx ? '24px' : '6px',
                    height: '6px',
                    background: idx === activeIdx ? t.hue : 'rgba(128,128,128,0.3)',
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next"
              className="w-11 h-11 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 cursor-pointer shadow-sm"
            >
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
