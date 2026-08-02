'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const clients = [
  {
    name: 'Vortex Corp',
    project: 'Project Aeon',
    logo: '/clients/client_vortex.png',
    details:
      'Architected and deployed a multi-region real-time stream processing platform for AI inference logs with < 10ms latency.',
    tech: ['Next.js', 'Go', 'K8s', 'Kafka'],
  },
  {
    name: 'Nova Labs',
    project: 'Smart Contract Engine',
    logo: '/clients/client_nova.png',
    details:
      'Engineered a high-performance web dashboard for validating smart contract security and predicting gas consumption.',
    tech: ['React', 'Rust', 'Wasm', 'TypeScript'],
  },
  {
    name: 'Acme Systems',
    project: 'Edge AI Deployment',
    logo: '/clients/client_acme.png',
    details:
      'Built a central orchestration console managing edge devices running computer vision pipelines with automated OTA updates.',
    tech: ['Next.js', 'Python', 'FastAPI', 'Docker'],
  },
];

export function Clients() {
  const container = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useGSAP(
    () => {
      if (!container.current) return;

      // Ambient/entrance fade-in animation for client cards
      gsap.fromTo(
        '.client-card-wrap',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.2,
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
      {/* Ambient background decoration */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="mb-20 text-center flex flex-col items-center">
          <span className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-4 block">
            Trusted Clients
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter leading-tight text-white uppercase font-heading">
            Featured Engagements
          </h2>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {clients.map((client, idx) => {
            const isHovered = hoveredIdx === idx;
            const isAnyHovered = hoveredIdx !== null;
            const isDimmed = isAnyHovered && !isHovered;

            return (
              <div
                key={idx}
                className="relative cursor-pointer h-full"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <div
                  className="client-card-wrap transition-all duration-500 ease-out h-full"
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
                  <div className="flagship-surface p-8 rounded-3xl flex flex-col justify-between h-[360px] group transition-all duration-500 border border-white/10 hover:border-cyan-500/40 hover:shadow-[0_12px_36px_rgba(6,182,212,0.12)]">
                    {/* Top: Logo & Branding */}
                    <div className="flex flex-col gap-6">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 flex items-center justify-center p-2 group-hover:border-cyan-500/30 transition-colors">
                        <img
                          src={client.logo}
                          alt={`${client.name} Logo`}
                          className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                      </div>
                      <div>
                        <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                          {client.project}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white font-heading">
                          {client.name}
                        </h3>
                      </div>
                    </div>

                    {/* Expandable Details Container */}
                    <div className="mt-4 flex flex-col justify-end">
                      <div
                        className="transition-all duration-500 ease-out overflow-hidden"
                        style={{
                          maxHeight: isHovered ? '160px' : '0px',
                          opacity: isHovered ? 1 : 0,
                        }}
                      >
                        <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
                          <p className="text-xs md:text-sm text-gray-300 font-normal leading-relaxed font-sans">
                            {client.details}
                          </p>
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {client.tech.map((t, tIdx) => (
                              <span
                                key={tIdx}
                                className="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
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
