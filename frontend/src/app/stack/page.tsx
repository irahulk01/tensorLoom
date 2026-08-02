'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Search,
  Sparkles,
  Layers,
  Cpu,
  Cloud,
  Database,
  Code2,
  BrainCircuit,
  ShieldCheck,
  Palette,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { fetchContent } from '@/lib/api';
import { Navbar } from '@/features/navbar/components/Navbar';
import { Footer } from '@/features/footer/components/Footer';

const languages = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
];

const fullStackCategories = [
  {
    id: 'ai-ml',
    title: 'AI & Data Science',
    icon: BrainCircuit,
    color: 'text-violet-400',
    borderColor: 'border-violet-500/20',
    bgColor: 'bg-violet-500/10',
    items: [
      {
        name: 'PyTorch',
        desc: 'Deep learning & custom neural network architectures.',
        tag: 'ML Engine',
        version: 'v2.5',
      },
      {
        name: 'OpenAI API',
        desc: 'LLM integrations, GPT-4o embeddings & fine-tuning.',
        tag: 'Generative AI',
        version: 'v1.0',
      },
      {
        name: 'LangChain / LlamaIndex',
        desc: 'Agentic multi-step workflows & vector RAG pipelines.',
        tag: 'AI Orchestration',
        version: 'v0.3',
      },
      {
        name: 'Google BigQuery ML',
        desc: 'Petabyte-scale in-database ML & SQL analytics.',
        tag: 'Data Analytics',
        version: 'Cloud',
      },
      {
        name: 'Pinecone / Qdrant',
        desc: 'High-dimensional vector storage & similarity search.',
        tag: 'Vector DB',
        version: 'Cloud',
      },
    ],
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & Infrastructure',
    icon: Cloud,
    color: 'text-sky-400',
    borderColor: 'border-sky-500/20',
    bgColor: 'bg-sky-500/10',
    items: [
      {
        name: 'Amazon Web Services (AWS)',
        desc: 'ECS, S3, Lambda, CloudFront, Aurora & EKS clusters.',
        tag: 'Cloud Provider',
        version: 'Global',
      },
      {
        name: 'Google Cloud Platform (GCP)',
        desc: 'BigQuery, Vertex AI, Cloud Run & Composer Airflow.',
        tag: 'Cloud Provider',
        version: 'Global',
      },
      {
        name: 'Kubernetes (K8s)',
        desc: 'Container orchestration, autoscaling & zero-downtime deploys.',
        tag: 'DevOps',
        version: 'v1.31',
      },
      {
        name: 'Docker',
        desc: 'Multi-stage container builds & microservice isolation.',
        tag: 'Containers',
        version: 'v27.0',
      },
      {
        name: 'Terraform & Pulumi',
        desc: 'Declarative Infrastructure as Code across multi-cloud.',
        tag: 'IaC',
        version: 'v1.9',
      },
    ],
  },
  {
    id: 'backend-data',
    title: 'Backend & Event Streaming',
    icon: Cpu,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/20',
    bgColor: 'bg-emerald-500/10',
    items: [
      {
        name: 'Go (Golang)',
        desc: 'Ultra-low latency concurrent microservices & gRPC APIs.',
        tag: 'Language',
        version: '1.23',
      },
      {
        name: 'Python (FastAPI / Pydantic)',
        desc: 'Asynchronous REST APIs, data pipelines & AI backends.',
        tag: 'Language',
        version: '3.12',
      },
      {
        name: 'Node.js & Bun',
        desc: 'High-throughput async event loops & real-time WebSockets.',
        tag: 'Runtime',
        version: 'v22 / v1.1',
      },
      {
        name: 'Apache Kafka & RabbitMQ',
        desc: 'Distributed event-driven stream processing & queues.',
        tag: 'Streaming',
        version: 'v3.8',
      },
      {
        name: 'Redis / DragonFly',
        desc: 'Sub-millisecond in-memory caching & distributed locks.',
        tag: 'Cache',
        version: 'v7.4',
      },
      {
        name: 'GraphQL & gRPC',
        desc: 'Typed schema contracts & high-speed binary RPC.',
        tag: 'API Layer',
        version: 'Spec',
      },
    ],
  },
  {
    id: 'databases',
    title: 'Databases & Storage',
    icon: Database,
    color: 'text-indigo-400',
    borderColor: 'border-indigo-500/20',
    bgColor: 'bg-indigo-500/10',
    items: [
      {
        name: 'PostgreSQL',
        desc: 'Relational integrity, JSONB document querying & PostGIS.',
        tag: 'Relational DB',
        version: 'v16',
      },
      {
        name: 'MongoDB',
        desc: 'Flexible document store for rapid schema iteration.',
        tag: 'NoSQL DB',
        version: 'v8.0',
      },
      {
        name: 'Supabase / Firebase',
        desc: 'Realtime database subscriptions, Auth & Row Level Security.',
        tag: 'BaaS',
        version: 'Latest',
      },
    ],
  },
  {
    id: 'frontend-styling',
    title: 'Frontend & UI Engineering',
    icon: Palette,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/20',
    bgColor: 'bg-cyan-500/10',
    items: [
      {
        name: 'React 19 & Next.js 15',
        desc: 'Server Components, Turbopack & edge rendering.',
        tag: 'Framework',
        version: 'v19',
      },
      {
        name: 'TypeScript',
        desc: 'Strict end-to-end type safety from DB schema to UI components.',
        tag: 'Language',
        version: 'v5.6',
      },
      {
        name: 'TailwindCSS v4',
        desc: 'Utility-first styling with zero-runtime CSS footprint.',
        tag: 'Styling',
        version: 'v4.0',
      },
      {
        name: 'Framer Motion & GSAP',
        desc: 'Spring physics, layout transitions & scroll-triggered timeline animations.',
        tag: 'Motion',
        version: 'v11',
      },
      {
        name: 'Three.js / React Three Fiber',
        desc: 'WebGL 3D graphics, shaders, and interactive spatial canvases.',
        tag: '3D WebGL',
        version: 'r168',
      },
    ],
  },
  {
    id: 'security-qa',
    title: 'Security & Quality Assurance',
    icon: ShieldCheck,
    color: 'text-rose-400',
    borderColor: 'border-rose-500/20',
    bgColor: 'bg-rose-500/10',
    items: [
      {
        name: 'OAuth 2.0 / Auth0 / Clerk',
        desc: 'Secure SSO, multi-tenant RBAC & JWT token verification.',
        tag: 'Auth',
        version: 'Standard',
      },
      {
        name: 'Playwright & Vitest',
        desc: 'Automated end-to-end browser testing and unit test suites.',
        tag: 'Testing',
        version: 'v1.46',
      },
      {
        name: 'Datadog & Sentry',
        desc: 'Real-time application performance monitoring & crash reports.',
        tag: 'Observability',
        version: 'Cloud',
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
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-white/20 selection:text-black relative flex flex-col justify-between">
      {/* Background Noise & Lighting */}
      <div className="bg-noise" />
      <div className="absolute top-0 left-1/3 w-[700px] h-[700px] bg-cyan-600/10 blur-[180px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-violet-600/10 blur-[160px] pointer-events-none" />

      {/* Main Navbar */}
      {content && (
        <Navbar
          navContent={content.nav}
          languages={languages}
          currentLang={currentLang}
          setCurrentLang={setCurrentLang}
        />
      )}

      {/* Main Content */}
      <main className="max-w-[1280px] mx-auto px-6 md:px-12 pt-36 pb-32 relative z-10 w-full flex-1">
        {/* Navigation Breadcrumb & Back button */}
        <div className="mb-12 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-sm font-semibold text-gray-400 hover:text-white transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-cyan-400" />
            <span>Return to Homepage</span>
          </Link>

          <div className="px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono tracking-widest uppercase flex items-center gap-2 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Full Architecture Directory</span>
          </div>
        </div>

        {/* Page Hero Title */}
        <div className="mb-14 max-w-4xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-white leading-tight font-heading mb-6">
            The Technology <span className="text-cyan-400">Ecosystem</span>
          </h1>
          <p className="text-base md:text-xl text-gray-400 font-sans leading-relaxed">
            Our comprehensive stack powering high-scale web platforms, distributed cloud engines,
            vector database search, and real-time streaming infrastructure.
          </p>
        </div>

        {/* 1. Search Bar */}
        <div className="mb-6 p-4 rounded-2xl flagship-surface border border-white/10 shadow-lg flex items-center gap-3">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search frameworks, languages, or tools (e.g. Go, AWS, PyTorch)..."
            className="w-full bg-transparent border-none text-white text-base placeholder-gray-400 focus:outline-none focus:ring-0 font-sans"
          />
        </div>

        {/* 2. Category Filter Pills */}
        <div className="mb-16 flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2.5 rounded-xl text-xs font-mono tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-cyan-500 text-black font-extrabold shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 hover:border-cyan-500/40'
            }`}
          >
            All Categories
          </button>
          {fullStackCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500 text-black font-extrabold shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                  : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 hover:border-cyan-500/40'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Technology Categories Display Grid */}
        <div className="flex flex-col gap-16">
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-6"
              >
                {/* Category Title Header */}
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center border ${cat.borderColor} ${cat.bgColor}`}
                  >
                    <CatIcon className={`w-5 h-5 ${cat.color}`} />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white font-heading tracking-tight">
                      {cat.title}
                    </h2>
                  </div>
                  <span className="ml-auto text-xs font-mono text-gray-500">
                    {filteredItems.length}{' '}
                    {filteredItems.length === 1 ? 'Technology' : 'Technologies'}
                  </span>
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -4, scale: 1.01 }}
                      className="flagship-surface p-6 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between gap-4 shadow-lg group relative overflow-hidden"
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors font-heading">
                            {item.name}
                          </h3>
                          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20 shrink-0">
                            {item.tag}
                          </span>
                        </div>

                        <p className="text-sm text-gray-400 font-sans leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-gray-500">
                        <span>Version / Scope:</span>
                        <span className="text-gray-300 font-semibold">{item.version}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
