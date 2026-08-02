'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

// Brand SVGs & 3D styling for main grid
const mainTechnologies = [
  {
    name: 'React 19',
    category: 'Frontend',
    description: 'Concurrent rendering, Server Components, and compiler optimizations.',
    color: '#61DAFB',
    glow: 'rgba(97, 218, 251, 0.25)',
    svg: (
      <svg
        className="w-7 h-7"
        viewBox="-11.5 -10.23174 23 20.46348"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  {
    name: 'Next.js 15',
    category: 'Framework',
    description: 'Turbopack compilation, App Router, and edge server streaming.',
    color: '#ffffff',
    glow: 'rgba(255, 255, 255, 0.25)',
    svg: (
      <svg className="w-7 h-7" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
          <circle cx="90" cy="90" r="90" fill="#000" />
        </mask>
        <g mask="url(#mask0)">
          <circle cx="90" cy="90" r="90" fill="currentColor" />
          <path
            d="M149.508 157.52L69.143 54H54V125.97H66.8136V69.9628L136.985 160.771C141.42 159.865 145.602 158.766 149.508 157.52Z"
            fill="url(#nextGradient)"
          />
          <rect x="115" y="54" width="12" height="72" fill="url(#nextGradient2)" />
        </g>
        <defs>
          <linearGradient
            id="nextGradient"
            x1="109"
            y1="116.5"
            x2="144.5"
            y2="160.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="nextGradient2"
            x1="121"
            y1="54"
            x2="120.799"
            y2="106.875"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    category: 'Language',
    description: 'Strict type safety and robust refactoring for enterprise codebases.',
    color: '#3178C6',
    glow: 'rgba(49, 120, 198, 0.25)',
    svg: (
      <svg
        className="w-7 h-7 rounded-md"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100" height="100" rx="20" fill="#3178C6" />
        <path
          d="M62.5 68.3C64.6 70.2 67.8 71.4 71.3 71.4C76 71.4 78.5 69.1 78.5 65.6C78.5 62.4 76.5 60.7 70.8 58.7L68.2 57.8C61.4 55.4 57.6 51.5 57.6 44.9C57.6 37.3 64.2 32 74.3 32C79 32 83.1 33.3 86.1 35.5L82.6 44C80 42.4 77.2 41.4 74.1 41.4C70 41.4 67.7 43.3 67.7 46.2C67.7 49.3 69.5 50.7 75.3 52.8L77.9 53.7C85.5 56.4 88.8 60.5 88.8 66.8C88.8 75.5 81.3 81 70.7 81C65.2 81 60 79.2 56.4 76.2L62.5 68.3ZM36.1 41.7H48.4V80H37.8V41.7H25.3V32.8H48.7V41.7H36.1Z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    name: 'Node.js',
    category: 'Backend',
    description: 'High-throughput async event loops and microservices execution.',
    color: '#5FA04E',
    glow: 'rgba(95, 160, 78, 0.25)',
    svg: (
      <svg className="w-7 h-7" viewBox="0 0 256 270" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M128 0L8 69.3V200.7L128 270L248 200.7V69.3L128 0Z" fill="#5FA04E" />
        <path
          d="M128 139.5L180.5 109.2V169.8L128 200.1L75.5 169.8V109.2L128 139.5Z"
          fill="#ffffff"
          fillOpacity="0.85"
        />
      </svg>
    ),
  },
  {
    name: 'PostgreSQL',
    category: 'Database',
    description: 'Relational integrity, JSONB document querying, and vector embeddings.',
    color: '#4169E1',
    glow: 'rgba(65, 105, 225, 0.25)',
    svg: (
      <svg className="w-7 h-7" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M50 5C25.1 5 5 25.1 5 50C5 74.9 25.1 95 50 95C74.9 95 95 74.9 95 50C95 25.1 74.9 5 50 5ZM68 45C66 45 64 46 63 47.5C61 44 57 42 52 42C45 42 40 48 40 56C40 64 45 70 52 70C57 70 61 68 63 64.5C64 66 66 67 68 67C71 67 74 65 74 61C74 57 71 55 68 55C66 55 64.5 55.5 63.5 56.5C62.5 52.5 58.5 49 53 49C48.5 49 45 52.5 45 57C45 61.5 48.5 65 53 65C56 65 58.5 63.5 60 61C60.5 62 61.5 63 63 63C64.5 63 66 62 66 60.5C66 59 64.5 58 63 58"
          fill="#4169E1"
        />
      </svg>
    ),
  },
  {
    name: 'Docker',
    category: 'Infrastructure',
    description: 'Immutable containerized deployments and multi-arch image builds.',
    color: '#2496ED',
    glow: 'rgba(36, 150, 237, 0.25)',
    svg: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M13 3h2v2h-2V3zm-3 0h2v2h-2V3zM7 3h2v2H7V3zm6 3h2v2h-2V6zm-3 0h2v2h-2V6zm-3 0h2v2H7V6zm-3 0h2v2H4V6zm9 3h2v2h-2V9zm-3 0h2v2h-2V9zm-3 0h2v2H7V9zm-3 0h2v2H4V9zm-3 0h2v2H1V9zm22.5 3.5c-.5-.4-1.6-.5-2.5-.2-.3-.6-.8-1.1-1.4-1.3l-.6-.2-.4.5c-.7.9-1.8 1.4-3 1.4H1c-.3 0-.6.2-.7.5C.1 13.7 0 14.8 0 16c0 4.4 3.6 8 8 8 4.2 0 7.7-3.3 8-7.5 1.5 0 3-1 3.5-2.2.3.1.6.2.9.2 1.1 0 2.1-.5 2.1-1z"
          fill="#2496ED"
        />
      </svg>
    ),
  },
  {
    name: 'TailwindCSS',
    category: 'Styling',
    description: 'Utility-first CSS architecture with zero-runtime performance.',
    color: '#06B6D4',
    glow: 'rgba(6, 182, 212, 0.25)',
    svg: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"
          fill="#06B6D4"
        />
      </svg>
    ),
  },
  {
    name: 'Framer Motion',
    category: 'Motion',
    description: 'Spring-based physics animations and layout transformations.',
    color: '#F0047F',
    glow: 'rgba(240, 4, 127, 0.25)',
    svg: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" fill="#F0047F" />
      </svg>
    ),
  },
];

export function TechStack() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="tech-stack"
      ref={containerRef}
      className="w-full bg-[var(--background)] py-32 md:py-48 relative z-20 border-t border-white/10"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-4 block font-semibold">
              Architecture & Stack
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white leading-tight max-w-3xl font-heading">
              Engineered for performance, built on robust standards.
            </h2>
          </div>

          <Link
            href="/stack"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] cursor-pointer font-heading w-fit"
          >
            <span>Explore Full Stack</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid (8 Main Tech Cards + 9th "See More" Card) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mainTechnologies.map((tech, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="group flagship-surface p-8 rounded-2xl hover:border-cyan-500/40 transition-all duration-300 min-h-[220px] flex flex-col justify-between border border-white/10 shadow-lg hover:shadow-2xl relative overflow-hidden [perspective:800px]"
            >
              {/* Subtle accent glow behind icon */}
              <div
                className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none"
                style={{ background: tech.glow }}
              />

              {/* Category & 3D Badge Icon */}
              <div className="flex items-center justify-between w-full relative z-10">
                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                  {tech.category}
                </span>

                {/* 3D Elevated Badge */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/15 bg-white/5 shadow-[0_10px_20px_rgba(0,0,0,0.3)] transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"
                  style={{
                    boxShadow: `0 10px 25px -5px ${tech.glow}`,
                  }}
                >
                  {tech.svg}
                </div>
              </div>

              {/* Name & Description */}
              <div className="mt-6 relative z-10">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors font-heading">
                  {tech.name}
                </h3>
                <p className="text-sm text-gray-400 font-sans leading-relaxed">
                  {tech.description}
                </p>
              </div>
            </motion.div>
          ))}

          {/* 9th "See More" Link Card to /stack */}
          <Link href="/stack">
            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="group cursor-pointer p-8 rounded-2xl border border-dashed border-cyan-500/40 bg-cyan-500/5 hover:bg-cyan-500/10 transition-all duration-300 min-h-[220px] flex flex-col justify-between relative overflow-hidden shadow-lg h-full"
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ecosystem</span>
                </span>
                <div className="w-12 h-12 rounded-2xl bg-cyan-500 text-black flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)] group-hover:scale-110 transition-transform">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors font-heading flex items-center gap-2">
                  <span>View Full Stack</span>
                  <span className="text-cyan-400">→</span>
                </h3>
                <p className="text-sm text-gray-400 font-sans leading-relaxed">
                  Explore our complete technology stack including Cloud Infrastructure, AI Engines,
                  & Databases.
                </p>
              </div>
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
}
