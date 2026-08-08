'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const mainTechnologies = [
  {
    name: 'React 19',
    category: 'Frontend',
    description: 'Concurrent rendering, Server Components, and compiler optimizations.',
    color: '#c99b3e',
    glow: 'rgba(201, 155, 62, 0.15)',
    svg: (
      <svg
        className="w-7 h-7"
        viewBox="-11.5 -10.23174 23 20.46348"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="0" cy="0" r="2.05" fill="#c99b3e" />
        <g stroke="#c99b3e" strokeWidth="1" fill="none">
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
    color: '#0f1117',
    glow: 'rgba(15, 17, 23, 0.15)',
    svg: (
      <svg
        className="w-7 h-7 text-[#0f1117]"
        viewBox="0 0 180 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
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
            x2="121"
            y2="126"
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
    description: 'Strict typing for zero runtime surprises and type-safe APIs.',
    color: '#b38730',
    glow: 'rgba(179, 135, 48, 0.15)',
    svg: (
      <svg className="w-7 h-7" viewBox="0 0 128 128" fill="none">
        <rect width="128" height="128" rx="20" fill="#b38730" />
        <path
          d="M75.2 60.8V49.6H107.2V60.8H96.8V108.8H85.6V60.8H75.2ZM53.3 90.7C55.6 90.7 57.7 90.2 59.8 89.2C61.9 88.2 63.6 86.8 64.9 85.1L72.8 91.5C70.6 94.6 67.7 97.1 64.1 98.9C60.5 100.7 56.4 101.6 51.9 101.6C46.8 101.6 42.4 100.5 38.6 98.2C34.9 95.9 31.9 92.7 29.8 88.6C27.7 84.5 26.6 79.7 26.6 74.3C26.6 68.9 27.7 64.2 29.8 60.1C32 56 35 52.8 38.8 50.5C42.7 48.2 47.1 47.1 52.2 47.1C56.6 47.1 60.5 48 64 49.8C67.5 51.6 70.3 54.1 72.4 57.2L64.5 63.6C63.2 61.8 61.6 60.4 59.7 59.4C57.7 58.4 55.6 57.9 53.3 57.9C49.9 57.9 47 58.7 44.5 60.4C42 62.1 40.1 64.4 38.8 67.4C37.5 70.4 36.8 73.7 36.8 77.4C36.8 81.1 37.5 84.4 38.8 87.4C40.1 90.4 42 92.7 44.5 94.4C47 96.1 49.9 96.9 53.3 96.9V90.7Z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    name: 'Golang',
    category: 'Backend Engine',
    description: 'High-concurrency microservices, gRPC protocols, and low memory overhead.',
    color: '#0f1117',
    glow: 'rgba(15, 17, 23, 0.15)',
    svg: (
      <svg className="w-7 h-7 text-[#0f1117]" viewBox="0 0 100 100" fill="currentColor">
        <path d="M78.8 32.5c-1.3-1.6-3.1-2.9-5.1-3.6-2.9-1-6.1-1.1-9.1-.5-2.2.4-4.3 1.3-6.2 2.5-3.3 2.1-5.9 5.2-7.4 8.8-1.5 3.6-1.9 7.6-1.1 11.4.8 3.8 2.7 7.2 5.5 9.8 2.8 2.6 6.3 4.3 10.1 4.8 3.8.5 7.7-.1 11.2-1.7 3.5-1.6 6.4-4.2 8.3-7.5.5-.9.9-1.9 1.2-2.9h-18.4v-6.9h26.4c.1 1.1.2 2.2.1 3.3-.2 4.1-1.6 8.1-4 11.4-2.4 3.3-5.7 5.9-9.5 7.5-3.8 1.6-8 2.1-12.1 1.6-4.1-.5-8-2.2-11.2-4.8-3.2-2.6-5.6-6-7-9.8-1.4-3.8-1.7-8-.9-12.1.8-4.1 2.6-7.9 5.4-11 2.8-3.1 6.4-5.4 10.4-6.6 4-1.2 8.3-1.3 12.4-.3 3.6.9 7 2.6 9.8 5.1l-6.2 5.5z" />
      </svg>
    ),
  },
  {
    name: 'PostgreSQL',
    category: 'Relational DB',
    description: 'ACID transaction reliability, JSONB indexing, and geospatial extensions.',
    color: '#b38730',
    glow: 'rgba(179, 135, 48, 0.15)',
    svg: (
      <svg className="w-7 h-7" viewBox="0 0 128 128">
        <path
          d="M64 12C35.3 12 12 35.3 12 64s23.3 52 52 52 52-23.3 52-52S92.7 12 64 12zm22.8 62.4c-1.8 4.2-4.8 7.8-8.6 10.4-3.8 2.6-8.3 4-13 4.1-3.6.1-7.2-.8-10.4-2.5-3.2-1.7-5.9-4.2-7.8-7.3-1.9-3.1-2.9-6.7-2.9-10.4 0-4.8 1.7-9.4 4.8-13 3.1-3.6 7.4-6 12.2-6.8 1.5-.3 3-.4 4.6-.4 4.5 0 8.9 1.4 12.5 4.1 3.6 2.7 6.2 6.5 7.4 10.9.3 1 .4 2 .4 3 0 2.9-.8 5.7-2.2 8.1z"
          fill="#b38730"
        />
      </svg>
    ),
  },
  {
    name: 'Docker & K8s',
    category: 'Container Orchestration',
    description: 'Declarative container builds, auto-healing clusters, and zero-downtime deploys.',
    color: '#c99b3e',
    glow: 'rgba(201, 155, 62, 0.15)',
    svg: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="#c99b3e" strokeWidth="2">
        <path d="M22 12.5c0 5.523-4.477 10-10 10S2 18.023 2 12.5 6.477 2.5 12 2.5s10 4.477 10 10z" />
        <path d="M12 6v12M6 12h12" />
      </svg>
    ),
  },
];

interface TechStackProps {
  techContent?: any;
}

export function TechStack({ techContent }: TechStackProps) {
  const container = useRef<HTMLDivElement>(null);

  return (
    <section
      id="tech-stack"
      ref={container}
      className="w-full py-24 md:py-36 bg-[#fcfbf9] relative z-20 overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#c99b3e]/20 pb-10">
          <div>
            <span className="text-xs font-mono text-[#b38730] font-semibold uppercase tracking-widest mb-2 block">
              ENGINEERING ECOSYSTEM
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#0f1117] font-heading">
              OUR TECH STACK
            </h2>
          </div>
          <p className="text-base md:text-lg text-[#4a4d57] font-normal max-w-md font-sans">
            Battletested frameworks and cloud infrastructure built for speed, resilience, and scale.
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {mainTechnologies.map((tech, idx) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -4 }}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-[#c99b3e]/20 shadow-sm hover:shadow-lg hover:border-[#c99b3e]/50 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-6">
                  <div className="p-3 rounded-2xl bg-[#c99b3e]/10 border border-[#c99b3e]/25">
                    {tech.svg}
                  </div>
                  <span className="text-[10px] font-mono text-[#b38730] bg-[#c99b3e]/10 px-3 py-1 rounded-full border border-[#c99b3e]/25 font-semibold">
                    {tech.category}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0f1117] mb-2 font-heading group-hover:text-[#b38730] transition-colors">
                  {tech.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#4a4d57] font-sans leading-relaxed">
                  {tech.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA to Full Architecture Directory */}
        <div className="flex justify-center">
          <Link
            href="/stack"
            className="group px-8 py-4 bg-[#0f1117] text-white rounded-full font-bold text-sm sm:text-base flex items-center gap-3 hover:bg-[#c99b3e] hover:text-slate-950 transition-all cursor-pointer shadow-md hover:shadow-xl"
          >
            <Sparkles className="w-4 h-4 text-[#c99b3e] group-hover:text-slate-950" />
            <span>Explore Full Architecture Directory</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
