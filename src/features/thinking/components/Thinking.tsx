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
      className="w-full py-24 md:py-36 bg-[#fcfbf9] relative z-20 overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#c99b3e]/20 pb-10">
          <div>
            <span className="text-xs font-mono text-[#b38730] font-semibold uppercase tracking-widest mb-2 block">
              {thinkingContent.title}
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#0f1117] leading-tight font-heading">
              {thinkingContent.subtitle}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
    <div className="group relative bg-white p-8 sm:p-10 hover:bg-[#fcfbf9] transition-all duration-300 flex flex-col justify-between h-full min-h-[280px] rounded-3xl border border-[#c99b3e]/20 shadow-sm hover:shadow-md hover:border-[#c99b3e]/50">
      <div className="flex justify-between items-start mb-8">
        <span className="text-xs font-mono text-[#b38730] bg-[#c99b3e]/10 px-3 py-1 rounded-full border border-[#c99b3e]/25 font-semibold tracking-wider">
          0{index + 1}
        </span>
      </div>

      <div>
        <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0f1117] mb-3 font-heading">
          {item.title}
        </h3>
        <p className="text-[#4a4d57] text-sm sm:text-base leading-relaxed font-sans">
          {item.description}
        </p>
      </div>
    </div>
  );
}
