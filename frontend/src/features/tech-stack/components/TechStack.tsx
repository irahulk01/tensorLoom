'use client';

import { useRef } from 'react';

const technologies = [
  {
    name: 'React 19',
    category: 'Frontend',
    description: 'Concurrent rendering and compiler optimizations.',
  },
  {
    name: 'Next.js',
    category: 'Framework',
    description: 'Edge computing and server-side streaming.',
  },
  {
    name: 'TypeScript',
    category: 'Language',
    description: 'Strict type safety for mission-critical logic.',
  },
  { name: 'Node.js', category: 'Backend', description: 'High-throughput async event loops.' },
  {
    name: 'Postgres',
    category: 'Database',
    description: 'Relational integrity and JSONB flexibility.',
  },
  {
    name: 'Docker',
    category: 'Infrastructure',
    description: 'Immutable containerized deployments.',
  },
  { name: 'TailwindCSS', category: 'Styling', description: 'Utility-first zero-runtime CSS.' },
  { name: 'Framer Motion', category: 'Motion', description: 'Spring-based physics interactions.' },
];

export function TechStack() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="w-full bg-[var(--background)] py-32 md:py-48 relative z-20"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="mb-24">
          <span className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6 block">
            Architecture
          </span>
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white leading-tight max-w-3xl">
            Engineered for performance, built on robust standards.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
          {technologies.map((tech, idx) => (
            <div
              key={idx}
              className="group bg-[#0a0a0a] p-8 hover:bg-[#111111] transition-colors duration-300 min-h-[220px] flex flex-col justify-between"
            >
              <div className="text-xs font-mono text-gray-600 tracking-widest uppercase">
                {tech.category}
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-200 transition-colors">
                  {tech.name}
                </h3>
                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  {tech.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
