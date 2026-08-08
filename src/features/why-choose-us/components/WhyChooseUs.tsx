'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const statsData = [
  {
    targetVal: 99.8,
    suffix: '%',
    label: 'Uptime Reliability',
    sub: 'Production Systems',
  },
  {
    targetVal: 5,
    suffix: '+',
    label: 'Years Engineering',
    sub: 'Full-Stack Expertise',
  },
  {
    targetVal: 40,
    suffix: '+',
    label: 'Products Shipped',
    sub: 'Web, Mobile & AI',
  },
  {
    targetVal: 100,
    suffix: '%',
    label: 'On-Time Delivery',
    sub: 'Agile Milestones',
  },
];

export function WhyChooseUs() {
  const container = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={container}
      className="w-full py-24 md:py-36 bg-[#fcfbf9] relative z-20 overflow-hidden border-t border-[#c99b3e]/20"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-14 text-center max-w-3xl mx-auto">
          <span className="text-xs font-mono text-[#b38730] font-semibold uppercase tracking-widest block mb-2">
            WHY TENSORLOOM
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0f1117] font-heading mb-4">
            Engineering Precision. Delivered.
          </h2>
          <p className="text-base sm:text-lg text-[#4a4d57] font-sans">
            We don&apos;t build disposable code. Every architecture is engineered for long-term
            maintainability, security, and performance.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, idx) => (
            <StatCard key={idx} stat={stat} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ stat, index }: { stat: any; index: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      const obj = { count: 0 };
      gsap.to(obj, {
        count: stat.targetVal,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
        },
        onUpdate: () => {
          setVal(Number(obj.count.toFixed(stat.targetVal % 1 !== 0 ? 1 : 0)));
        },
      });
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      className="p-8 rounded-3xl bg-white border border-[#c99b3e]/20 shadow-sm hover:shadow-md hover:border-[#c99b3e]/50 transition-all duration-300 flex flex-col justify-between h-full min-h-[200px]"
    >
      <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#c99b3e] tracking-tight font-heading mb-2">
        {val}
        {stat.suffix}
      </div>
      <div>
        <h4 className="text-lg font-bold text-[#0f1117] font-heading">{stat.label}</h4>
        <p className="text-xs text-[#b38730] font-mono font-semibold">{stat.sub}</p>
      </div>
    </div>
  );
}
