'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const clientLogosRow1 = [
  {
    name: 'Soul Sync',
    tag: 'Mobile Platform',
    metric: '2.4M Active Users',
    icon: (
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#c99b3e] to-[#b38730] text-slate-950 flex items-center justify-center font-extrabold text-xs font-mono shadow-xs">
        SS
      </div>
    ),
  },
  {
    name: 'Money Visionaries',
    tag: 'FinTech Core',
    metric: '$140M Transacted',
    icon: (
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-[#c99b3e] text-slate-950 flex items-center justify-center font-extrabold text-xs font-mono shadow-xs">
        MV
      </div>
    ),
  },
  {
    name: 'Apex Logistics',
    tag: 'Supply Chain AI',
    metric: '4M Events/Day',
    icon: (
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#e5be6b] to-[#c99b3e] text-slate-950 flex items-center justify-center font-extrabold text-xs font-mono shadow-xs">
        AL
      </div>
    ),
  },
  {
    name: 'Nexus Health',
    tag: 'Healthcare Systems',
    metric: 'HIPAA Compliant',
    icon: (
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#c99b3e] to-[#8d6924] text-white flex items-center justify-center font-extrabold text-xs font-mono shadow-xs">
        NH
      </div>
    ),
  },
  {
    name: 'Vanguard Retail',
    tag: 'Ecommerce Cloud',
    metric: '99.99% Uptime',
    icon: (
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-[#b38730] text-slate-950 flex items-center justify-center font-extrabold text-xs font-mono shadow-xs">
        VR
      </div>
    ),
  },
  {
    name: 'Solaris Energy',
    tag: 'IoT Telemetry',
    metric: 'Sub-12ms Ingestion',
    icon: (
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#c99b3e] to-amber-700 text-white flex items-center justify-center font-extrabold text-xs font-mono shadow-xs">
        SE
      </div>
    ),
  },
  {
    name: 'Chronos Media',
    tag: 'Streaming Engine',
    metric: '1080p 60fps Pipeline',
    icon: (
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#e5be6b] to-[#b38730] text-slate-950 flex items-center justify-center font-extrabold text-xs font-mono shadow-xs">
        CM
      </div>
    ),
  },
];

const clientLogosRow2 = [
  {
    name: 'Aether Capital',
    tag: 'Web3 Analytics',
    metric: 'Sub-Second Indexing',
    icon: (
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#b38730] to-slate-900 text-amber-300 flex items-center justify-center font-extrabold text-xs font-mono shadow-xs">
        AC
      </div>
    ),
  },
  {
    name: 'Pulse Dynamics',
    tag: 'SaaS Infrastructure',
    metric: 'Multi-Tenant K8s',
    icon: (
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#c99b3e] to-[#e5be6b] text-slate-950 flex items-center justify-center font-extrabold text-xs font-mono shadow-xs">
        PD
      </div>
    ),
  },
  {
    name: 'Veritas Education',
    tag: 'LMS Platform',
    metric: '500k Students',
    icon: (
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-600 to-[#c99b3e] text-white flex items-center justify-center font-extrabold text-xs font-mono shadow-xs">
        VE
      </div>
    ),
  },
  {
    name: 'Horizon Bio',
    tag: 'Genome Search',
    metric: 'Vector DB RAG',
    icon: (
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#e5be6b] to-[#b38730] text-slate-950 flex items-center justify-center font-extrabold text-xs font-mono shadow-xs">
        HB
      </div>
    ),
  },
  {
    name: 'Omni Robotics',
    tag: 'Automation Core',
    metric: 'Zero Packet Loss',
    icon: (
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#c99b3e] to-[#8d6924] text-white flex items-center justify-center font-extrabold text-xs font-mono shadow-xs">
        OR
      </div>
    ),
  },
  {
    name: 'Starlight Games',
    tag: 'Unity Engine',
    metric: '60 FPS Multiplayer',
    icon: (
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-[#b38730] text-slate-950 flex items-center justify-center font-extrabold text-xs font-mono shadow-xs">
        SG
      </div>
    ),
  },
];

export function TrustedBrands() {
  const container = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={container}
      className="w-full py-24 md:py-36 bg-[#fcfbf9] dark:bg-[#0b0c10] relative z-20 overflow-hidden border-t border-[#c99b3e]/20"
    >
      {/* Background Ambient Radial Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#c99b3e]/15 via-[#e5be6b]/10 to-transparent blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 mb-16 relative z-10 text-center flex flex-col items-center">
        {/* Glowing Pill Badge */}
        <div className="mb-4 px-4 py-1.5 rounded-full border border-[#c99b3e]/30 bg-[#c99b3e]/10 dark:bg-[#c99b3e]/20 text-[#b38730] dark:text-[#e5be6b] text-xs font-mono font-semibold tracking-widest uppercase flex items-center gap-2 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#c99b3e]" />
          <span>GLOBAL CLIENT ECOSYSTEM</span>
        </div>

        {/* Section Headline */}
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0f1117] dark:text-white font-heading mb-4 max-w-3xl leading-tight">
          Trusted by High-Scale Industry Leaders
        </h2>
        <p className="text-base sm:text-lg text-[#4a4d57] dark:text-slate-400 font-sans max-w-2xl leading-relaxed">
          Powering critical digital infrastructure for SaaS platforms, FinTech providers, healthcare
          networks, and AI enterprise systems.
        </p>
      </div>

      {/* Row 1 Marquee Stream with Pure CSS Edge Vignette */}
      <div className="relative w-full overflow-hidden mb-6 flex items-center animate-marquee-hover-pause select-none [mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)]">
        <div className="animate-marquee flex items-center gap-5 sm:gap-6">
          {[...clientLogosRow1, ...clientLogosRow1].map((client, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="px-6 py-4 rounded-3xl bg-white dark:bg-[#161722] border border-[#c99b3e]/25 dark:border-white/10 shadow-sm hover:shadow-xl hover:border-[#c99b3e] transition-all duration-300 flex items-center gap-4 shrink-0 group cursor-pointer"
            >
              {client.icon}
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-extrabold text-[#0f1117] dark:text-white font-heading tracking-tight group-hover:text-[#b38730] dark:group-hover:text-[#e5be6b] transition-colors">
                    {client.name}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c99b3e] animate-pulse" />
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] font-mono text-[#b38730] dark:text-[#e5be6b] bg-[#c99b3e]/10 dark:bg-[#c99b3e]/20 px-2 py-0.5 rounded border border-[#c99b3e]/20 font-semibold">
                    {client.tag}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                    • {client.metric}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Row 2 Marquee Stream Reverse */}
      <div className="relative w-full overflow-hidden mb-16 flex items-center animate-marquee-hover-pause select-none [mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)]">
        <div className="animate-marquee-reverse flex items-center gap-5 sm:gap-6">
          {[...clientLogosRow2, ...clientLogosRow2].map((client, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="px-6 py-4 rounded-3xl bg-white dark:bg-[#161722] border border-[#c99b3e]/25 dark:border-white/10 shadow-sm hover:shadow-xl hover:border-[#c99b3e] transition-all duration-300 flex items-center gap-4 shrink-0 group cursor-pointer"
            >
              {client.icon}
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-extrabold text-[#0f1117] dark:text-white font-heading tracking-tight group-hover:text-[#b38730] dark:group-hover:text-[#e5be6b] transition-colors">
                    {client.name}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#b38730] animate-pulse" />
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] font-mono text-[#b38730] dark:text-[#e5be6b] bg-[#c99b3e]/10 dark:bg-[#c99b3e]/20 px-2 py-0.5 rounded border border-[#c99b3e]/20 font-semibold">
                    {client.tag}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                    • {client.metric}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
