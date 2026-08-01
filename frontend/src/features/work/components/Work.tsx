'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

interface WorkProps {
  workContent: any;
}

export function Work({ workContent }: WorkProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!wrapperRef.current || !sectionRef.current) return;

      const panels = gsap.utils.toArray('.work-panel');

      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => '+=' + wrapperRef.current?.offsetWidth,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="work"
      ref={sectionRef}
      className="w-full h-screen overflow-hidden bg-[var(--background)] relative z-20"
    >
      {/* Title Overlap */}
      <div className="absolute top-12 md:top-24 left-6 md:left-12 z-30 pointer-events-none mix-blend-difference text-white">
        <span className="text-xs font-mono text-gray-400 uppercase tracking-widest block mb-2">
          {workContent.title}
        </span>
      </div>

      {/* Horizontal Pinned Wrapper */}
      <div ref={wrapperRef} className="flex h-full w-[300vw] sm:w-[300vw]">
        {workContent.items.map((project: any, idx: number) => (
          <div
            key={project.id}
            className="work-panel w-screen h-full flex flex-col justify-center items-center relative px-6 md:px-24"
          >
            {/* Cinematic Container */}
            <div className="relative w-full max-w-7xl h-[60vh] md:h-[75vh] rounded-3xl overflow-hidden group cursor-pointer bg-[#0a0a0a] border border-white/10">
              {/* Background gradient hint */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.accentColor} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}
              />

              {/* Abstract technical representation instead of a fake browser */}
              <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity duration-500">
                <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
              </div>

              {/* Content */}
              <div className="absolute bottom-10 left-10 md:bottom-16 md:left-16 z-40">
                <span className="text-xs font-mono uppercase tracking-widest text-gray-400 bg-black/60 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md mb-6 inline-block">
                  {project.category}
                </span>

                <h3 className="text-5xl md:text-8xl font-extrabold text-white tracking-tighter drop-shadow-2xl mb-4 group-hover:translate-x-2 transition-transform duration-500">
                  {project.title}
                </h3>

                <p className="text-lg md:text-2xl text-gray-400 max-w-xl font-medium leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Metric Pill */}
              <div className="absolute top-10 right-10 md:top-16 md:right-16 bg-black/80 backdrop-blur-2xl border border-white/10 p-6 rounded-2xl transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-40">
                <div className="text-4xl md:text-5xl font-bold text-white mb-1 tracking-tight">
                  {project.metric}
                </div>
                <div className="text-xs uppercase tracking-widest text-gray-400 font-mono">
                  {project.metricLabel}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
