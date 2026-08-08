'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Mail,
  User,
  MessageSquare,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Tag,
  Clock,
  Inbox,
  RefreshCw,
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Navbar } from '@/features/navbar/components/Navbar';
import { Footer } from '@/features/footer/components/Footer';
import { fetchContent, fetchContacts } from '@/lib/api';
import { languages } from '@/constants/languages';

interface ContactRecord {
  _id: string;
  contactId: string;
  name: string;
  email: string;
  service?: string;
  subject?: string;
  message: string;
  createdAt: string;
}

export default function ClientsDataPage() {
  const [currentLang, setCurrentLang] = useState('en');
  const [content, setContent] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<'newest' | 'oldest'>('newest');

  useEffect(() => {
    fetchContent(currentLang)
      .then(setContent)
      .catch((err) => console.error('Failed to load content:', err));
  }, [currentLang]);

  // TanStack Query Hook
  const {
    data: contactsData,
    isLoading: loading,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: ['contacts', page, sort],
    queryFn: () => fetchContacts({ page, limit: 9, sort }),
  });

  const contacts: ContactRecord[] = contactsData?.contacts || [];
  const pagination = contactsData?.pagination || {
    totalCount: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 9,
  };

  return (
    <div className="min-h-screen bg-[#fcfbf9] dark:bg-[#0b0c10] text-[#0f1117] dark:text-[#f8fafc] flex flex-col justify-between transition-colors duration-300">
      {content && (
        <Navbar
          navContent={content.nav}
          languages={languages}
          currentLang={currentLang}
          setCurrentLang={setCurrentLang}
        />
      )}

      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-gradient-to-b from-[#c99b3e]/20 via-[#e5be6b]/5 to-transparent blur-[150px] pointer-events-none rounded-full" />

      <main className="max-w-[1280px] mx-auto px-6 md:px-12 pt-32 pb-24 relative z-10 w-full flex-1">
        {/* Top Header Controls */}
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-xs font-mono font-bold text-[#b38730] dark:text-[#e5be6b] hover:text-[#c99b3e] transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#c99b3e]" />
            <span>RETURN TO HOMEPAGE</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full border border-[#c99b3e]/30 bg-[#c99b3e]/10 text-[#b38730] dark:text-[#e5be6b] text-[10px] font-mono font-bold tracking-widest uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#c99b3e]" />
              CLIENT SUBMISSIONS PORTAL
            </span>
          </div>
        </div>

        {/* Page Hero Title */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0f1117] dark:text-white leading-tight font-heading mb-2">
              Client Contact <span className="text-[#c99b3e]">Submissions</span>
            </h1>
            <p className="text-sm md:text-base text-[#4a4d57] dark:text-slate-400 font-sans">
              Real-time contact requests & inquiry submissions stored in MongoDB (powered by
              TanStack Query).
            </p>
          </div>

          {/* Controls Bar: Sort & Refresh */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSort(sort === 'newest' ? 'oldest' : 'newest')}
              className="px-4 py-2 rounded-xl bg-white dark:bg-[#12141c] border border-[#c99b3e]/30 text-[#0f1117] dark:text-white font-mono text-xs font-bold flex items-center gap-2 shadow-xs hover:border-[#c99b3e] transition-all cursor-pointer"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-[#c99b3e]" />
              <span>Sort: {sort === 'newest' ? 'Newest First' : 'Oldest First'}</span>
            </button>

            <button
              onClick={() => refetch()}
              className="p-2.5 rounded-xl bg-white dark:bg-[#12141c] border border-[#c99b3e]/30 text-[#c99b3e] hover:border-[#c99b3e] shadow-xs transition-all cursor-pointer"
              title="Refresh Data via TanStack Query"
            >
              <RefreshCw className={`w-4 h-4 ${isRefetching || loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Content Display: 9 Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-64 rounded-3xl bg-slate-100 dark:bg-[#12141c]/60 animate-pulse border border-[#c99b3e]/10"
              />
            ))}
          </div>
        ) : contacts.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-[#12141c] rounded-3xl border border-[#c99b3e]/20 p-8">
            <Inbox className="w-12 h-12 text-[#c99b3e] mx-auto mb-4 opacity-80" />
            <h3 className="text-xl font-bold text-[#0f1117] dark:text-white font-heading">
              No Submissions Found
            </h3>
            <p className="text-xs text-slate-500 mt-1 font-mono">
              Fill out the contact form on the homepage to see incoming leads here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contacts.map((contact, idx) => (
              <motion.div
                key={contact._id || idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-3xl bg-white dark:bg-[#12141c] border border-[#c99b3e]/25 dark:border-white/10 shadow-sm hover:shadow-xl hover:border-[#c99b3e] transition-all duration-300 flex flex-col justify-between gap-4 group relative overflow-hidden"
              >
                <div className="space-y-3.5">
                  {/* Top Bar: Contact ID & Service Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-extrabold text-[#b38730] dark:text-[#e5be6b] bg-[#c99b3e]/10 px-2.5 py-0.5 rounded-md border border-[#c99b3e]/30">
                      {contact.contactId || `TL-C-${idx + 1}`}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#c99b3e]" />
                      {new Date(contact.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  {/* Client Info */}
                  <div>
                    <h3 className="text-lg font-extrabold text-[#0f1117] dark:text-white group-hover:text-[#b38730] dark:group-hover:text-[#e5be6b] transition-colors font-heading tracking-tight flex items-center gap-2">
                      <User className="w-4 h-4 text-[#c99b3e] shrink-0" />
                      <span className="truncate">{contact.name}</span>
                    </h3>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-xs font-mono text-slate-600 dark:text-slate-400 hover:text-[#c99b3e] transition-colors flex items-center gap-1.5 mt-1"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#c99b3e] shrink-0" />
                      <span className="truncate">{contact.email}</span>
                    </a>
                  </div>

                  {/* Category / Service Pill */}
                  {contact.service && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-50 dark:bg-[#1a1d28] border border-slate-200 dark:border-white/10 text-xs font-mono text-[#0f1117] dark:text-slate-300">
                      <Tag className="w-3 h-3 text-[#c99b3e]" />
                      <span>{contact.service}</span>
                    </div>
                  )}

                  {/* Submission Message */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1a1d28]/70 border border-slate-200/80 dark:border-white/5 text-xs text-[#4a4d57] dark:text-slate-300 font-sans leading-relaxed min-h-[72px]">
                    <div className="flex items-start gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-[#c99b3e] shrink-0 mt-0.5" />
                      <p className="line-clamp-4">
                        {contact.message || 'No additional project details provided.'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Timestamp */}
                <div className="pt-3 border-t border-[#c99b3e]/15 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Received:</span>
                  <span className="font-semibold text-[#0f1117] dark:text-white">
                    {new Date(contact.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination Bar (9 items per page) */}
        {!loading && pagination.totalPages > 1 && (
          <div className="mt-12 flex items-center justify-between border-t border-[#c99b3e]/20 pt-6">
            <div className="text-xs font-mono text-slate-500">
              Showing page{' '}
              <span className="font-bold text-[#0f1117] dark:text-white">
                {pagination.currentPage}
              </span>{' '}
              of{' '}
              <span className="font-bold text-[#0f1117] dark:text-white">
                {pagination.totalPages}
              </span>{' '}
              ({pagination.totalCount} total submissions)
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="px-3.5 py-2 rounded-xl bg-white dark:bg-[#12141c] border border-[#c99b3e]/30 text-[#0f1117] dark:text-white text-xs font-mono font-bold flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#c99b3e] transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 text-[#c99b3e]" />
                <span>Newer</span>
              </button>

              <button
                disabled={page >= pagination.totalPages}
                onClick={() => setPage(page + 1)}
                className="px-3.5 py-2 rounded-xl bg-white dark:bg-[#12141c] border border-[#c99b3e]/30 text-[#0f1117] dark:text-white text-xs font-mono font-bold flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#c99b3e] transition-all cursor-pointer"
              >
                <span>Older</span>
                <ChevronRight className="w-4 h-4 text-[#c99b3e]" />
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
