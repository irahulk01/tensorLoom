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
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-6 md:px-16 py-12 relative overflow-hidden">
      {/* Background Noise & Lighting */}
      <div className="bg-noise" />
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-cyan-600/10 blur-[160px] pointer-events-none" />

      {/* Top Header Navigation */}
      <header className="max-w-7xl mx-auto flex items-center justify-between pb-12 border-b border-white/10 relative z-10">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-sm font-semibold text-gray-300 hover:text-white transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Return Home</span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono tracking-widest uppercase flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            <span>Tech Insights</span>
          </div>
        </div>
      </header>

      {/* Main Title & Subtitle */}
      <main className="max-w-7xl mx-auto pt-16 pb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-4">
            tensorLoom Journal
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 text-white leading-tight">
            Engineering & System Architecture.
          </h1>
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-light">
            Technical perspectives, benchmarks, and deep dives on building resilient digital
            products at scale.
          </p>
        </motion.div>

        {/* Filter Controls: Search & Category Chips */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-16 border-b border-white/10 pb-8">
          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative glass-depth glass-rim-light p-8 md:p-10 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex items-center justify-between mb-6 text-xs text-gray-400 font-mono">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                    <Tag className="w-3 h-3 text-cyan-400" />
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-gray-500" />
                    {post.readTime}
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4 group-hover:text-cyan-300 transition-colors">
                  {post.title}
                </h2>

                <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8">
                  {post.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <span className="text-xs text-gray-500 font-mono">{post.date}</span>
                <span className="flex items-center gap-1 text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
                  Read Article
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="py-24 text-center text-gray-400">
            <p className="text-lg">No articles found matching &quot;{searchQuery}&quot;.</p>
          </div>
        )}
      </main>
    </div>
  );
}
