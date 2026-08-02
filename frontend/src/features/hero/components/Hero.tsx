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
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
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
          delay: 0.4,
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

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const words = heroContent?.title?.split(' ') || ['We', 'build', 'systems', 'that', 'work.'];

  return (
    <section
      ref={container}
      className="hero-section relative min-h-screen w-full flex flex-col items-center justify-center pt-32 pb-24 px-6 md:px-12 overflow-hidden bg-[var(--background)]"
    >
      {/* Video Background with Seamless Edge Mask */}
      <div className="absolute inset-0 z-0 overflow-hidden [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-x-0 bottom-0 top-[-26vh] sm:top-[-80px] md:top-[-230px] w-full h-full object-cover"
          src="/gifhero/cbb1942f9536d15f774a9a1e58fc0d07.mp4"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-5xl w-full ml-auto px-2 sm:px-4 md:px-0 md:mr-16 flex flex-col items-end text-right"
      >
        {/* Minimal Badge */}
        <div className="hero-sub opacity-0 mb-8 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center gap-2">
          <span className="text-xs font-mono tracking-widest uppercase text-gray-400">
            {heroContent?.badge || 'AI Engineering Studio'}
          </span>
        </div>

        {/* Typographic Headline (Plus Jakarta Sans) */}
        <div className="mb-8 flex flex-wrap justify-end gap-x-4 gap-y-2 overflow-hidden px-4">
          {words.map((word: string, i: number) => (
            <span key={i} className="inline-flex overflow-hidden pb-2">
              <span className="hero-word opacity-0 text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-white font-heading">
                {word}
              </span>
            </span>
          ))}
        </div>

        {/* Subtitle (Inter) */}
        <p className="hero-sub opacity-0 text-gray-400 max-w-2xl text-lg md:text-xl leading-relaxed mb-12 font-normal text-right font-sans">
          {heroContent?.subtitle ||
            '5+ years of engineering taught us that complexity kills. We ship fast, precise software for teams that cannot afford to fail.'}
        </p>

        {/* Magnetic Buttons */}
        <div className="hero-sub opacity-0 flex flex-wrap items-center justify-end gap-4">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#work"
            className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-sm md:text-base flex items-center gap-3 transition-colors hover:bg-gray-200 cursor-pointer shadow-lg"
          >
            <span>{heroContent?.ctaPrimary || 'View Our Work'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="group relative px-8 py-4 bg-white/10 text-white rounded-full font-bold text-sm md:text-base flex items-center gap-3 border border-white/20 transition-colors hover:bg-white/20 cursor-pointer backdrop-blur-md"
          >
            <span>{heroContent?.ctaSecondary || 'Talk to Our Expert'}</span>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
