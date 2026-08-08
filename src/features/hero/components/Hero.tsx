'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  heroContent: any;
  startVideo?: boolean;
}

export function Hero({ heroContent, startVideo }: HeroProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!startVideo) return;

      gsap.fromTo(
        '.hero-word',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.05,
          ease: 'power4.out',
        },
      );

      gsap.fromTo(
        '.hero-sub',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          delay: 0.35,
          stagger: 0.1,
        },
      );
    },
    { scope: container, dependencies: [startVideo] },
  );

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const words = heroContent?.title?.split(' ') || [
    'We',
    'build',
    'brands',
    'that',
    'are',
    'clear,',
    'cohesive,',
    'and',
    'built',
    'to',
    'last.',
  ];

  return (
    <section
      ref={container}
      className="hero-section relative min-h-[92vh] sm:min-h-screen w-full flex flex-col items-center justify-center pt-28 sm:pt-36 pb-20 sm:pb-24 px-4 sm:px-8 md:px-12 overflow-hidden bg-[#0f1117]"
    >
      {/* Background Banner Video - Full Visibility */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-x-0 bottom-0 max-sm:top-0 top-[-26vh] sm:top-[-80px] md:top-[-230px] w-full h-full object-cover opacity-90"
          src="/gifhero/cbb1942f9536d15f774a9a1e58fc0d07.mp4"
        />
        {/* Subtle Backdrop Overlay for Crisp Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1117] via-transparent to-transparent" />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-5xl w-full ml-auto px-2 sm:px-4 md:px-0 md:mr-12 flex flex-col items-end text-right min-w-0"
      >
        {/* Minimal Gold Badge */}
        <div className="hero-sub opacity-0 mb-6 sm:mb-8 px-4 py-1.5 rounded-full border border-[#c99b3e]/40 bg-[#c99b3e]/20 backdrop-blur-md flex items-center gap-2 shadow-lg">
          <span className="text-xs font-mono tracking-widest uppercase text-[#e5be6b] font-bold">
            {heroContent?.badge || 'AI Engineering Studio'}
          </span>
        </div>

        {/* Typographic Headline */}
        <div className="mb-6 sm:mb-8 flex flex-wrap justify-end gap-x-3 sm:gap-x-4 gap-y-1 sm:gap-y-2 overflow-hidden px-1 sm:px-4 max-w-full">
          {words.map((word: string, i: number) => (
            <span key={i} className="inline-flex overflow-hidden pb-1 sm:pb-2">
              <span className="hero-word opacity-0 text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white font-heading break-words drop-shadow-xl">
                {word}
              </span>
            </span>
          ))}
        </div>

        {/* Subtitle */}
        <p className="hero-sub opacity-0 text-gray-200 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-12 font-normal text-right font-sans break-words drop-shadow-md">
          {heroContent?.subtitle ||
            '5+ years of engineering taught us that complexity kills. We ship fast, precise software for teams that cannot afford to fail.'}
        </p>

        {/* Action Buttons */}
        <div className="hero-sub opacity-0 flex flex-wrap items-center justify-end gap-3 sm:gap-4">
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href="#work"
            className="group relative px-7 sm:px-9 py-3.5 sm:py-4 bg-[#c99b3e] text-slate-950 rounded-full font-extrabold text-sm md:text-base flex items-center gap-3 hover:bg-[#b38730] transition-all cursor-pointer shadow-[0_10px_35px_rgba(201,155,62,0.4)]"
          >
            <span>{heroContent?.ctaPrimary || 'View Our Work'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-slate-950" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href="#contact"
            className="group relative px-7 sm:px-9 py-3.5 sm:py-4 bg-black/60 text-white rounded-full font-bold text-sm md:text-base flex items-center gap-3 border border-white/30 hover:border-[#c99b3e] hover:bg-black/80 transition-all cursor-pointer backdrop-blur-md shadow-lg"
          >
            <span>{heroContent?.ctaSecondary || 'Talk to Our Expert'}</span>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
