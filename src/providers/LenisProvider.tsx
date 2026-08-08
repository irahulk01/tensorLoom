'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import { ReactNode, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useLenis(({ progress }) => {
    if (barRef.current) {
      barRef.current.style.transform = `scaleX(${progress})`;
    }
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[9999] pointer-events-none bg-black/10 dark:bg-white/5">
      <div
        ref={barRef}
        className="w-full h-full bg-gradient-to-r from-cyan-400 via-[#cd9d3d] to-cyan-300 origin-left shadow-[0_0_10px_rgba(6,182,212,0.8)] transition-transform duration-75 ease-out"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}

function LenisGsapSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // Connect Lenis scroll updates to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateRaf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateRaf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off('scroll', ScrollTrigger.update);
      gsap.ticker.remove(updateRaf);
    };
  }, [lenis]);

  return null;
}

export function LenisProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.5,
        infinite: false,
      }}
    >
      <ScrollProgress />
      <LenisGsapSync />
      {children}
    </ReactLenis>
  );
}
