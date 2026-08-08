'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Search,
  Sparkles,
  Cpu,
  Cloud,
  Database,
  BrainCircuit,
  ShieldCheck,
  Palette,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { fetchContent } from '@/lib/api';
import { languages } from '@/constants/languages';
import { Navbar } from '@/features/navbar/components/Navbar';
import { Footer } from '@/features/footer/components/Footer';

const fullStackCategories = [
  {
    id: 'ai-ml',
    title: 'AI & Data Science',
    icon: BrainCircuit,
    tag: 'APPLIED AI & VECTOR RAG',
    items: [
      {
        name: 'PyTorch',
        desc: 'Deep learning & custom neural network architectures.',
        tag: 'ML Engine',
        version: 'v2.5',
        monogram: 'PT',
        hue: 'from-[#c99b3e] to-[#b38730]',
      },
      {
        name: 'OpenAI API',
        desc: 'LLM integrations, GPT-4o embeddings & fine-tuning.',
        tag: 'Generative AI',
        version: 'v1.0',
        monogram: 'AI',
        hue: 'from-amber-500 to-[#c99b3e]',
      },
      {
        name: 'LangChain / LlamaIndex',
        desc: 'Agentic multi-step workflows & vector RAG pipelines.',
        tag: 'AI Orchestration',
        version: 'v0.3',
        monogram: 'LC',
        hue: 'from-[#e5be6b] to-[#b38730]',
      },
      {
        name: 'Google BigQuery ML',
        desc: 'Petabyte-scale in-database ML & SQL analytics.',
        tag: 'Data Analytics',
        version: 'Cloud',
        monogram: 'BQ',
        hue: 'from-[#c99b3e] to-amber-700',
      },
      {
        name: 'Pinecone / Qdrant',
        desc: 'High-dimensional vector storage & similarity search.',
        tag: 'Vector DB',
        version: 'Cloud',
        monogram: 'PC',
        hue: 'from-[#e5be6b] to-[#c99b3e]',
      },
    ],
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & Infrastructure',
    icon: Cloud,
    tag: 'CLOUD NATIVE & CONTAINER ORCHESTRATION',
    items: [
      {
        name: 'Amazon Web Services (AWS)',
        desc: 'ECS, S3, Lambda, CloudFront, Aurora & EKS clusters.',
        tag: 'Cloud Provider',
        version: 'Global',
        monogram: 'AWS',
        hue: 'from-amber-500 to-[#b38730]',
      },
      {
        name: 'Google Cloud Platform (GCP)',
        desc: 'BigQuery, Vertex AI, Cloud Run & Composer Airflow.',
        tag: 'Cloud Provider',
        version: 'Global',
        monogram: 'GCP',
        hue: 'from-[#c99b3e] to-[#e5be6b]',
      },
      {
        name: 'Kubernetes (K8s)',
        desc: 'Container orchestration, autoscaling & zero-downtime deploys.',
        tag: 'DevOps',
        version: 'v1.31',
        monogram: 'K8',
        hue: 'from-[#b38730] to-amber-800',
      },
      {
        name: 'Docker',
        desc: 'Multi-stage container builds & microservice isolation.',
        tag: 'Containers',
        version: 'v27.0',
        monogram: 'DK',
        hue: 'from-[#c99b3e] to-[#b38730]',
      },
      {
        name: 'Terraform & Pulumi',
        desc: 'Declarative Infrastructure as Code across multi-cloud.',
        tag: 'IaC',
        version: 'v1.9',
        monogram: 'TF',
        hue: 'from-[#e5be6b] to-amber-600',
      },
    ],
  },
  {
    id: 'backend-data',
    title: 'Backend & Event Streaming',
    icon: Cpu,
    tag: 'HIGH-THROUGHPUT CONCURRENCY',
    items: [
      {
        name: 'Go (Golang)',
        desc: 'Ultra-low latency concurrent microservices & gRPC APIs.',
        tag: 'Language',
        version: '1.23',
        monogram: 'GO',
        hue: 'from-[#c99b3e] to-amber-600',
      },
      {
        name: 'Python (FastAPI / Pydantic)',
        desc: 'Asynchronous REST APIs, data pipelines & AI backends.',
        tag: 'Language',
        version: '3.12',
        monogram: 'PY',
        hue: 'from-[#e5be6b] to-[#b38730]',
      },
      {
        name: 'Node.js & Bun',
        desc: 'High-throughput async event loops & real-time WebSockets.',
        tag: 'Runtime',
        version: 'v22 / v1.1',
        monogram: 'JS',
        hue: 'from-[#b38730] to-[#c99b3e]',
      },
      {
        name: 'Apache Kafka & RabbitMQ',
        desc: 'Distributed event-driven stream processing & queues.',
        tag: 'Streaming',
        version: 'v3.8',
        monogram: 'KF',
        hue: 'from-amber-600 to-[#b38730]',
      },
      {
        name: 'Redis / DragonFly',
        desc: 'Sub-millisecond in-memory caching & distributed locks.',
        tag: 'Cache',
        version: 'v7.4',
        monogram: 'RD',
        hue: 'from-[#c99b3e] to-[#e5be6b]',
      },
      {
        name: 'GraphQL & gRPC',
        desc: 'Typed schema contracts & high-speed binary RPC.',
        tag: 'API Layer',
        version: 'Spec',
        monogram: 'RPC',
        hue: 'from-amber-500 to-[#c99b3e]',
      },
    ],
  },
  {
    id: 'databases',
    title: 'Databases & Storage',
    icon: Database,
    tag: 'DISTRIBUTED PERSISTENCE',
    items: [
      {
        name: 'MongoDB Atlas',
        desc: 'Flexible document store for rapid schema iteration & scale.',
        tag: 'NoSQL DB',
        version: 'v8.0',
        monogram: 'MG',
        hue: 'from-[#c99b3e] to-amber-700',
      },
      {
        name: 'PostgreSQL',
        desc: 'Relational integrity, JSONB document querying & PostGIS.',
        tag: 'Relational DB',
        version: 'v16',
        monogram: 'PG',
        hue: 'from-[#b38730] to-[#e5be6b]',
      },
      {
        name: 'Supabase / Firebase',
        desc: 'Realtime database subscriptions, Auth & Row Level Security.',
        tag: 'BaaS',
        version: 'Latest',
        monogram: 'SB',
        hue: 'from-[#e5be6b] to-[#b38730]',
      },
    ],
  },
  {
    id: 'frontend-styling',
    title: 'Frontend & UI Engineering',
    icon: Palette,
    tag: 'EDGE PERFORMANCE & MOTION',
    items: [
      {
        name: 'React 19 & Next.js 16',
        desc: 'Server Components, Turbopack & edge rendering.',
        tag: 'Framework',
        version: 'v19',
        monogram: 'RX',
        hue: 'from-[#c99b3e] to-[#b38730]',
      },
      {
        name: 'TypeScript',
        desc: 'Strict end-to-end type safety from DB schema to UI components.',
        tag: 'Language',
        version: 'v5.6',
        monogram: 'TS',
        hue: 'from-[#b38730] to-amber-600',
      },
      {
        name: 'TailwindCSS v4',
        desc: 'Utility-first styling with zero-runtime CSS footprint.',
        tag: 'Styling',
        version: 'v4.0',
        monogram: 'TW',
        hue: 'from-[#e5be6b] to-[#c99b3e]',
      },
      {
        name: 'Framer Motion & GSAP',
        desc: 'Spring physics, layout transitions & scroll-triggered timeline animations.',
        tag: 'Motion',
        version: 'v12',
        monogram: 'FM',
        hue: 'from-[#c99b3e] to-[#b38730]',
      },
      {
        name: 'Three.js / React Three Fiber',
        desc: 'WebGL 3D graphics, shaders, and interactive spatial canvases.',
        tag: '3D WebGL',
        version: 'r168',
        monogram: '3D',
        hue: 'from-amber-500 to-[#e5be6b]',
      },
    ],
  },
  {
    id: 'security-qa',
    title: 'Security & Quality Assurance',
    icon: ShieldCheck,
    tag: 'ENTERPRISE HARDENING & SLA',
    items: [
      {
        name: 'OAuth 2.0 / Auth0 / Clerk',
        desc: 'Secure SSO, multi-tenant RBAC & JWT token verification.',
        tag: 'Auth',
        version: 'Standard',
        monogram: 'AUTH',
        hue: 'from-[#b38730] to-amber-700',
      },
      {
        name: 'Playwright & Vitest',
        desc: 'Automated end-to-end browser testing and unit test suites.',
        tag: 'Testing',
        version: 'v1.46',
        monogram: 'QA',
        hue: 'from-[#c99b3e] to-[#e5be6b]',
      },
      {
        name: 'Datadog & Sentry',
        desc: 'Real-time application performance monitoring & crash reports.',
        tag: 'Observability',
        version: 'Cloud',
        monogram: 'DD',
        hue: 'from-[#e5be6b] to-[#b38730]',
      },
    ],
  },
];

export default function StackPage() {
  const [currentLang, setCurrentLang] = useState('en');
  const [content, setContent] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchContent(currentLang)
      .then(setContent)
      .catch((err) => console.error('Failed to load stack content:', err));
  }, [currentLang]);

  return (
    <div className="min-h-screen bg-[#fcfbf9] dark:bg-[#0b0c10] text-[#0f1117] dark:text-[#f8fafc] relative flex flex-col justify-between transition-colors duration-300">
      {/* Main Navbar */}
      {content && (
        <Navbar
          navContent={content.nav}
          languages={languages}
          currentLang={currentLang}
          setCurrentLang={setCurrentLang}
        />
      )}

      {/* Background Ambient Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-gradient-to-b from-[#c99b3e]/20 via-[#e5be6b]/5 to-transparent blur-[150px] pointer-events-none rounded-full" />

      {/* Main Content Container */}
      <main className="max-w-[1320px] mx-auto px-6 md:px-12 pt-32 pb-24 relative z-10 w-full flex-1">
        {/* Navigation Breadcrumb */}
        <div className="mb-10 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-xs font-mono font-bold text-[#b38730] dark:text-[#e5be6b] hover:text-[#c99b3e] transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#c99b3e]" />
            <span>RETURN TO HOMEPAGE</span>
          </Link>

          <div className="px-3.5 py-1.5 rounded-full border border-[#c99b3e]/30 bg-[#c99b3e]/10 text-[#b38730] dark:text-[#e5be6b] text-[10px] font-mono font-bold tracking-widest uppercase flex items-center gap-2 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#c99b3e]" />
            <span>FULL ARCHITECTURE DIRECTORY</span>
          </div>
        </div>

        {/* Page Hero Header */}
        <div className="mb-12 max-w-4xl">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#0f1117] dark:text-white leading-tight font-heading mb-4">
            The Technology <span className="text-[#c99b3e]">Ecosystem</span>
          </h1>
          <p className="text-base md:text-lg text-[#4a4d57] dark:text-slate-400 font-sans leading-relaxed mb-6">
            Our comprehensive technology stack powering high-scale web platforms, distributed cloud
            microservices, vector AI database search, and sub-15ms databases.
          </p>

          {/* Key Architecture Stats Bar */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-[#12141c] border border-[#c99b3e]/25 text-[#0f1117] dark:text-white font-semibold shadow-xs">
              <Zap className="w-3.5 h-3.5 text-[#c99b3e]" />
              <span>Sub-15ms Target Latency</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-[#12141c] border border-[#c99b3e]/25 text-[#0f1117] dark:text-white font-semibold shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#c99b3e]" />
              <span>99.99% Multi-Cloud SLA</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-[#12141c] border border-[#c99b3e]/25 text-[#0f1117] dark:text-white font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#c99b3e]" />
              <span>24 Modern Tech Nodes</span>
            </div>
          </div>
        </div>

        {/* 1. Search Bar with Gold Focus Aura */}
        <div className="mb-8 p-4 rounded-2xl bg-white dark:bg-[#12141c] border border-[#c99b3e]/30 shadow-md flex items-center gap-3 transition-all focus-within:border-[#c99b3e] focus-within:shadow-xl">
          <Search className="w-5 h-5 text-[#c99b3e] shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search frameworks, languages, or databases (e.g. Go, AWS, PyTorch, MongoDB)..."
            className="w-full bg-transparent border-none text-[#0f1117] dark:text-white text-sm sm:text-base placeholder-slate-400 focus:outline-none font-sans"
          />
        </div>

        {/* 2. Category Filter Pills */}
        <div className="mb-12 flex flex-wrap items-center gap-2 sm:gap-2.5">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-[#c99b3e] text-slate-950 border border-[#c99b3e] shadow-md'
                : 'bg-white dark:bg-[#12141c] text-[#0f1117] dark:text-slate-200 border border-[#c99b3e]/20 hover:border-[#c99b3e]/60'
            }`}
          >
            All Categories
          </button>
          {fullStackCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-[#c99b3e] text-slate-950 border border-[#c99b3e] shadow-md'
                  : 'bg-white dark:bg-[#12141c] text-[#0f1117] dark:text-slate-200 border border-[#c99b3e]/20 hover:border-[#c99b3e]/60'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Technology Categories Display Grid */}
        <div className="flex flex-col gap-14">
          {fullStackCategories.map((cat) => {
            if (selectedCategory !== 'all' && selectedCategory !== cat.id) return null;

            const CatIcon = cat.icon;
            const filteredItems = cat.items.filter(
              (item) =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.tag.toLowerCase().includes(searchQuery.toLowerCase()),
            );

            if (filteredItems.length === 0) return null;

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-6"
              >
                {/* Category Title Header */}
                <div className="flex items-center gap-3.5 border-b border-[#c99b3e]/20 pb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-[#c99b3e]/30 bg-[#c99b3e]/10 text-[#c99b3e] shrink-0">
                    <CatIcon className="w-5 h-5 text-[#c99b3e]" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-extrabold text-[#0f1117] dark:text-white font-heading tracking-tight">
                      {cat.title}
                    </h2>
                    <span className="text-[10px] font-mono text-[#b38730] dark:text-[#e5be6b] uppercase font-bold tracking-widest">
                      {cat.tag}
                    </span>
                  </div>
                  <span className="ml-auto text-xs font-mono text-[#b38730] dark:text-[#e5be6b] bg-[#c99b3e]/10 px-3 py-1 rounded-full border border-[#c99b3e]/20 font-bold">
                    {filteredItems.length}{' '}
                    {filteredItems.length === 1 ? 'Technology' : 'Technologies'}
                  </span>
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -4, scale: 1.01 }}
                      transition={{ duration: 0.25 }}
                      className="p-6 rounded-3xl bg-white dark:bg-[#12141c] border border-[#c99b3e]/25 dark:border-white/10 shadow-sm hover:shadow-xl hover:border-[#c99b3e] transition-all duration-300 flex flex-col justify-between gap-4 group relative overflow-hidden text-left"
                    >
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className={`w-9 h-9 rounded-xl bg-gradient-to-br ${item.hue} text-slate-950 font-extrabold text-xs font-mono flex items-center justify-center shadow-xs shrink-0`}
                            >
                              {item.monogram}
                            </div>
                            <h3 className="text-base font-extrabold text-[#0f1117] dark:text-white group-hover:text-[#b38730] dark:group-hover:text-[#e5be6b] transition-colors font-heading tracking-tight truncate">
                              {item.name}
                            </h3>
                          </div>

                          <span className="text-[10px] font-mono text-[#b38730] dark:text-[#e5be6b] bg-[#c99b3e]/10 dark:bg-[#c99b3e]/20 px-2.5 py-0.5 rounded-full border border-[#c99b3e]/30 font-bold shrink-0">
                            {item.tag}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-[#4a4d57] dark:text-slate-400 font-sans leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#c99b3e]/15 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                        <span>Scope / Spec:</span>
                        <span className="text-[#0f1117] dark:text-white font-bold">
                          {item.version}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
