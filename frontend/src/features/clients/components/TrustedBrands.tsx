'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Row 1: 5 brands moving left
const brandsRow1 = [
  { name: 'Neumyth Marketing', url: 'https://neumythmarketing.com/', abbr: 'NM', hue: '#F59E0B' },
  { name: 'Classmates', url: 'https://www.classmates.com/', abbr: 'CM', hue: '#8B5CF6' },
  {
    name: 'Vankazo',
    url: 'https://dashboard.vankazo.de/admin/auth/login',
    abbr: 'VKZ',
    hue: '#EAB308',
  },
  { name: 'Soul Syncing', url: 'https://soulsync.com/', abbr: 'SS', hue: '#F43F5E' },
  {
    name: 'Multifolks',
    url: 'https://multifolks.com/',
    abbr: 'MF',
    hue: '#06B6D4',
    svgUrl: 'https://cdn.multifolks.com/desktop/images/multifolks-logo.svg',
  },
];

// Row 2: 4 brands moving right (reverse)
const brandsRow2 = [
  { name: 'Raj Communications', url: 'https://rajcommunication.net/', abbr: 'RC', hue: '#3B82F6' },
  { name: 'Moneyvisionaries', url: 'https://www.moneyvisionaries.in/', abbr: 'MV', hue: '#10B981' },
  { name: 'Map my tour', url: '#', abbr: 'MMT', hue: '#F97316' },
  {
    name: 'Inspiring Together',
    url: 'https://inspiringtogether.aonetech.in/',
    abbr: 'IT',
    hue: '#EC4899',
  },
];

interface Brand {
  name: string;
  url: string;
  abbr: string;
  hue: string;
  svgUrl?: string;
}

function BrandPill({ brand }: { brand: Brand }) {
  return (
    <a
      href={brand.url}
      target="_blank"
      rel="noopener noreferrer"
      className="brand-card relative group shrink-0 flex items-center gap-4 px-7 py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all duration-500 cursor-pointer select-none overflow-hidden"
      style={{
        boxShadow: '0 0 0 0 transparent',
        transition: 'box-shadow 0.4s ease, border-color 0.4s ease, background 0.4s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          `0 0 30px -5px ${brand.hue}40, inset 0 0 30px -15px ${brand.hue}20`;
        (e.currentTarget as HTMLElement).style.borderColor = `${brand.hue}60`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 0 transparent';
        (e.currentTarget as HTMLElement).style.borderColor = '';
      }}
    >
      {/* Glow orb behind monogram */}
      <div
        className="absolute -left-2 -top-2 w-16 h-16 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-xl pointer-events-none"
        style={{ background: brand.hue }}
      />

      {/* Monogram / SVG Logo */}
      <div
        className="relative w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold font-mono shrink-0 transition-transform duration-300 group-hover:scale-110"
        style={{
          background: `${brand.hue}18`,
          border: `1px solid ${brand.hue}40`,
          color: brand.hue,
        }}
      >
        {brand.svgUrl ? (
          <img src={brand.svgUrl} alt={brand.name} className="w-6 h-6 object-contain" />
        ) : (
          brand.abbr
        )}
      </div>

      {/* Brand Name */}
      <span className="text-sm font-semibold tracking-wide text-white/70 group-hover:text-white transition-colors duration-300 font-sans whitespace-nowrap">
        {brand.name}
      </span>

      {/* Subtle right-side accent line */}
      <div
        className="absolute right-0 top-1/4 bottom-1/4 w-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(to bottom, transparent, ${brand.hue}, transparent)` }}
      />
    </a>
  );
}

export function TrustedBrands() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  // Duplicate rows for seamless infinite loop
  const doubleRow1 = [...brandsRow1, ...brandsRow1];
  const doubleRow2 = [...brandsRow2, ...brandsRow2];

  useGSAP(
    () => {
      if (!sectionRef.current || !headingRef.current) return;

      // Stagger reveal: section header
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

      // Divider line draw-in
      if (dividerRef.current) {
        gsap.fromTo(
          dividerRef.current,
          { scaleX: 0, opacity: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              once: true,
            },
          },
        );
      }

      // Marquee rows slide in
      const rows = [row1Ref.current, row2Ref.current].filter(Boolean);
      gsap.fromTo(
        rows,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
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
      className="w-full py-24 md:py-32 bg-[var(--background)] relative z-20 overflow-hidden border-t border-white/10"
    >
      {/* Ambient background grid */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(128,128,128,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(128,128,128,.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Subtle radial glow center */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(6,182,212,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        {/* ── Header ── */}
        <div
          ref={headingRef}
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <span className="inline-flex items-center gap-2 text-[10px] font-mono text-cyan-400 uppercase tracking-[0.3em] mb-4 font-semibold">
              <span className="w-6 h-[1px] bg-cyan-500/40 inline-block" />
              Trusted By
              <span className="w-6 h-[1px] bg-cyan-500/40 inline-block" />
            </span>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.03em] leading-none text-white font-heading">
              Companies That <span className="text-cyan-400">Trust Us</span>
            </h2>
          </div>

          <p className="max-w-xs text-sm text-gray-400 font-sans leading-relaxed text-left md:text-right">
            From early-stage startups to established enterprises — we've built for them all.
          </p>
        </div>

        {/* ── Divider ── */}
        <div ref={dividerRef} className="w-full h-[1px] mb-12 bg-white/10" />

        {/* ── Marquee Rows ── */}
        <div className="flex flex-col gap-5">
          {/* Row 1 – Left scrolling */}
          <div ref={row1Ref} className="w-full overflow-hidden relative opacity-0">
            {/* Fade masks using var(--background) */}
            <div className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none bg-gradient-to-r from-[var(--background)] to-transparent" />
            <div className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none bg-gradient-to-l from-[var(--background)] to-transparent" />

            <div className="animate-marquee gap-4 items-center">
              {doubleRow1.map((brand, idx) => (
                <BrandPill key={`r1-${idx}`} brand={brand} />
              ))}
            </div>
          </div>

          {/* Row 2 – Right scrolling (reverse) */}
          <div ref={row2Ref} className="w-full overflow-hidden relative opacity-0">
            {/* Fade masks using var(--background) */}
            <div className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none bg-gradient-to-r from-[var(--background)] to-transparent" />
            <div className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none bg-gradient-to-l from-[var(--background)] to-transparent" />

            <div className="animate-marquee-reverse gap-4 items-center">
              {doubleRow2.map((brand, idx) => (
                <BrandPill key={`r2-${idx}`} brand={brand} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom stat strip ── */}
        <div className="mt-16 pt-10 border-t border-white/10 flex flex-wrap gap-8 md:gap-16">
          {[
            { value: '9+', label: 'Clients served' },
            { value: '15+', label: 'Active partnerships' },
            { value: '100%', label: 'Client retention' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span className="text-2xl md:text-3xl font-extrabold text-white tracking-tight font-heading">
                {stat.value}
              </span>
              <span className="text-[11px] text-gray-400 uppercase tracking-widest font-mono">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
