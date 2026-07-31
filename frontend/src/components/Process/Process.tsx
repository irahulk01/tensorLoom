'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    id: '01',
    title: 'Discover',
    description:
      'Deep-diving into your system constraints, business rules, and technical objectives.',
  },
  {
    id: '02',
    title: 'Research',
    description:
      'Assessing architectural patterns, data structures, and comparative performance benchmarks.',
  },
  {
    id: '03',
    title: 'Design',
    description: 'Drafting deterministic APIs, database schemas, and microservice topologies.',
  },
  {
    id: '04',
    title: 'Develop',
    description:
      'Writing type-safe, optimized codebacked by unit, integration, and performance suites.',
  },
  {
    id: '05',
    title: 'Deploy',
    description:
      'Orchestrating immutable infrastructure via blue-green deployments and automated pipelines.',
  },
  {
    id: '06',
    title: 'Scale',
    description: 'Monitoring latency distribution, horizontal scaling policies, and load profiles.',
  },
];

export function Process() {
  return (
    <section id="process" className="w-full max-w-6xl mx-auto px-6 py-48 border-t border-white/5">
      <div className="mb-32 max-w-3xl">
        <span className="text-xs font-mono text-accent-purple tracking-widest uppercase mb-4 block">
          04 / Engine Execution
        </span>
        <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 text-white leading-tight">
          How we solve engineering problems.
        </h2>
        <p className="text-muted-dark text-lg md:text-xl font-light leading-relaxed">
          A predictable, repeatable framework for building robust enterprise-grade applications.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-12 relative">
        {steps.map((step, idx) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="flex flex-col relative group"
          >
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-sm font-mono text-accent-cyan">{step.id}</span>
              <div className="h-px bg-white/10 flex-grow" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-accent-cyan transition-colors duration-300">
              {step.title}
            </h3>
            <p className="text-muted-dark text-base font-light leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
