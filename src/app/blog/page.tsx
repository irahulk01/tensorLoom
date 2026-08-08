'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Clock, Tag, ArrowUpRight, Sparkles } from 'lucide-react';

const blogPosts = [
  {
    id: 'edge-architecture',
    title: 'Building Zero-Latency Edge Architectures with Next.js 15 & Bun',
    excerpt:
      'How to optimize serverless routing, minimize cold starts, and eliminate layout shifts for global real-time applications.',
    category: 'Architecture',
    readTime: '6 min read',
    date: 'Aug 01, 2026',
    author: 'tensorLoom Core',
    featured: true,
  },
  {
    id: 'applied-rag-pipelines',
    title: 'Applied RAG & Semantic Search in High-Concurrency Pipelines',
    excerpt:
      'Lessons learned wiring LLM vector indices directly into distributed database clusters without performance bottlenecks.',
    category: 'Applied AI',
    readTime: '8 min read',
    date: 'Jul 28, 2026',
    author: 'AI Systems Lab',
    featured: false,
  },
  {
    id: 'real-time-telemetry',
    title: 'Sub-5ms Real-Time Telemetry: Lessons from Production Systems',
    excerpt:
      'Architecting memory-mapped message queues to ingest and process millions of metric events per second.',
    category: 'Performance',
    readTime: '5 min read',
    date: 'Jul 20, 2026',
    author: 'Infra Team',
    featured: false,
  },
  {
    id: 'microservice-bottlenecks',
    title: 'Eliminating Microservice Bottlenecks in Event-Driven Clusters',
    excerpt:
      'Why synchronous RPC calls degrade uptime, and how asynchronous event sourcing recovers system throughput.',
    category: 'Cloud Native',
    readTime: '7 min read',
    date: 'Jul 15, 2026',
    author: 'Backend Engineering',
    featured: false,
  },
];

const categories = ['All', 'Architecture', 'Applied AI', 'Performance', 'Cloud Native'];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-slate-900 px-6 md:px-16 py-12 relative overflow-hidden flex flex-col justify-between">
      {/* Top Header Navigation */}
      <header className="max-w-7xl mx-auto w-full flex items-center justify-between pb-10 border-b border-slate-200 relative z-10">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-sm font-semibold text-slate-600 hover:text-sky-600 transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-sky-600" />
          <span>Return Home</span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded-full border border-sky-600/20 bg-sky-50 text-sky-700 text-xs font-mono font-semibold tracking-widest uppercase flex items-center gap-1.5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tech Insights</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto pt-14 pb-24 relative z-10 w-full flex-1">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-14"
        >
          <span className="text-xs font-mono text-sky-700 font-semibold uppercase tracking-widest block mb-2">
            tensorLoom Journal
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-slate-900 leading-tight font-heading">
            Engineering & System Architecture.
          </h1>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed font-sans">
            Technical perspectives, benchmarks, and deep dives on building resilient digital
            products at scale.
          </p>
        </motion.div>

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 border-b border-slate-200 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white font-bold shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-600 transition-colors shadow-xs"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="group p-8 md:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex items-center justify-between mb-5 text-xs text-slate-500 font-mono">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 font-semibold">
                    <Tag className="w-3 h-3 text-sky-600" />
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {post.readTime}
                  </span>
                </div>

                <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-900 mb-3 group-hover:text-sky-600 transition-colors font-heading">
                  {post.title}
                </h2>

                <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6 font-sans">
                  {post.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                <span className="text-xs text-slate-500 font-mono">{post.date}</span>
                <span className="flex items-center gap-1 text-xs font-bold text-sky-600 group-hover:translate-x-1 transition-transform">
                  Read Article
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="py-20 text-center text-slate-500">
            <p className="text-base">No articles found matching &quot;{searchQuery}&quot;.</p>
          </div>
        )}
      </main>
    </div>
  );
}
