'use client';

import { useRef } from 'react';

interface ThinkingProps {
  thinkingContent: {
    title: string;
    subtitle: string;
    items: {
      id: string;
      title: string;
      description: string;
    }[];
  };
}

export function Thinking({ thinkingContent }: ThinkingProps) {
  const container = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={container}
      className="w-full py-32 md:py-48 bg-[var(--background)] relative z-20 overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12">
          <div>
            <span className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6 block">
              {thinkingContent.title}
            </span>
            <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white leading-tight">
              {thinkingContent.subtitle}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
          {thinkingContent.items.map((item, idx) => (
            <PrincipleCard key={item.id} item={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PrincipleCard({ item, index }: { item: any; index: number }) {
  return (
    <div className="group relative bg-[#0a0a0a] p-10 hover:bg-[#111111] transition-colors duration-300 flex flex-col justify-between h-full min-h-[320px]">
      <div className="flex justify-between items-start mb-12">
        <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
          Principle 0{index + 1}
        </span>
      </div>

      <div>
        <h3 className="text-2xl font-bold tracking-tight text-white mb-4 group-hover:text-gray-200 transition-colors duration-300">
          {item.title}
        </h3>
        <p className="text-gray-400 text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
          {item.description}
        </p>
      </div>
    </div>
  );
}
