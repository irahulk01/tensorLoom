'use client';

import { useRef, useState } from 'react';
import { ExternalLink, RefreshCw, Layers, Monitor } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const industries = [
  'Healthcare',
  'E-commerce',
  'Survey platform',
  'Travel & tourism',
  'Edtech',
  'Fintech',
  'Real estate',
  'Wellness and beauty',
  'CRM dashboard',
  'DevOps',
  'Machine learning',
  'Cloud Service',
];

const projects = [
  {
    id: 'icashiq',
    name: 'iCashiq',
    url: 'https://icashiq.com/',
    tagline: 'Smart Financial Management',
    description:
      'A cutting-edge financial solution designed to streamline cash flows and provide deep analytics.',
  },
  {
    id: 'easydocuments',
    name: 'Easy Documents',
    url: 'https://easydocoments.com/',
    tagline: 'Document Automation Platform',
    description:
      'Instant document compilation and workflow orchestrator built for modern enterprises.',
  },
  {
    id: 'studentscorner',
    name: 'Students Corner',
    url: 'https://studentscorners.com/',
    tagline: 'Educational Hub & Community',
    description:
      'A unified portal for students to collaborate, manage courses, and access learning assets.',
  },
];

export function Proof() {
  const container = useRef<HTMLDivElement>(null);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [iframeKey, setIframeKey] = useState(0);

  const activeProject = projects[selectedIdx];

  useGSAP(
    () => {
      if (!container.current) return;

      // Animate industry tags
      gsap.fromTo(
        '.industry-tag',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: '.industries-container',
            start: 'top 85%',
          },
        },
      );

      // Animate section headers
      gsap.fromTo(
        '.proof-header',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
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

  const reloadIframe = () => {
    setIframeKey((prev) => prev + 1);
  };

  return (
    <section
      ref={container}
      className="w-full py-32 md:py-48 bg-[var(--background)] relative z-20 border-t border-white/5"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="proof-header mb-20 text-center flex flex-col items-center">
          <span className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-4 block">
            Proof That We're Good
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter leading-tight text-white uppercase font-heading">
            Trust & Examples
          </h2>
        </div>

        {/* Industries Section */}
        <div className="mb-24 industries-container">
          <div className="flex items-center gap-2 mb-6 justify-center text-gray-400 font-mono text-xs uppercase tracking-wider">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Industries We Work With</span>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {industries.map((ind, idx) => (
              <span
                key={idx}
                className="industry-tag text-xs md:text-sm font-semibold text-gray-300 bg-white/5 border border-white/10 px-4 py-2 rounded-full transition-all duration-300 hover:border-cyan-500/30 hover:bg-cyan-500/5 hover:text-white"
              >
                {ind}
              </span>
            ))}
          </div>
        </div>

        {/* Live Preview / Showcase Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Column: Project Selector */}
          <div className="lg:col-span-4 flex flex-col gap-6 justify-center">
            <div className="flex items-center gap-2 text-gray-400 font-mono text-xs uppercase tracking-wider">
              <Monitor className="w-4 h-4 text-cyan-400" />
              <span>Live Project Showcase</span>
            </div>

            <div className="flex flex-col gap-4">
              {projects.map((proj, idx) => {
                const isActive = selectedIdx === idx;
                return (
                  <button
                    key={proj.id}
                    onClick={() => setSelectedIdx(idx)}
                    className={`w-full text-left p-6 rounded-3xl transition-all duration-300 flagship-surface border cursor-pointer ${
                      isActive
                        ? 'border-cyan-500/40 bg-cyan-500/5 shadow-[0_4px_20px_rgba(6,182,212,0.1)]'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                      {proj.tagline}
                    </span>
                    <h3 className="text-xl font-bold text-white tracking-tight mb-2 font-heading">
                      {proj.name}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed font-sans">
                      {proj.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Live Iframe Browser Mockup */}
          <div className="lg:col-span-8 flex flex-col h-[500px] md:h-[600px]">
            <div className="w-full flex-1 rounded-3xl overflow-hidden bg-[#0d0d0d] border border-white/10 flex flex-col shadow-2xl relative">
              {/* Browser Header / Navigation Chrome */}
              <div className="w-full h-12 bg-[#121212] border-b border-white/5 flex items-center justify-between px-4 gap-4 shrink-0">
                {/* Windows Traffic Light Buttons */}
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>

                {/* URL Bar */}
                <div className="flex-1 max-w-md h-7 rounded-lg bg-black/40 border border-white/5 px-3 flex items-center justify-between text-[10px] font-mono text-gray-500 overflow-hidden">
                  <span className="truncate select-all">{activeProject.url}</span>
                  <button
                    onClick={reloadIframe}
                    className="p-1 hover:text-white transition-colors cursor-pointer"
                    title="Reload live preview"
                  >
                    <RefreshCw className="w-2.5 h-2.5" />
                  </button>
                </div>

                {/* Open in New Tab Button */}
                <a
                  href={activeProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1 font-sans cursor-pointer"
                >
                  <span className="hidden sm:inline">Launch Site</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Iframe Content Container */}
              <div className="w-full flex-1 bg-white relative">
                {/* Loading State Overlay */}
                <div className="absolute inset-0 bg-[#0d0d0d] flex items-center justify-center z-0 pointer-events-none">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs text-gray-500 font-mono">
                      Loading dynamic preview...
                    </span>
                  </div>
                </div>

                {/* Actual Iframe */}
                <iframe
                  key={`${activeProject.id}-${iframeKey}`}
                  src={activeProject.url}
                  title={`Live preview of ${activeProject.name}`}
                  className="w-full h-full border-none relative z-10 bg-white"
                  sandbox="allow-scripts allow-same-origin allow-popups"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
