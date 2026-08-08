'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Download, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';

interface GetQuoteModalProps {
  buttonText?: string;
  className?: string;
  projectName?: string;
  initialService?: string;
}

export function GetQuoteModal({
  buttonText = 'Get a Quote',
  className = '',
  projectName = '',
  initialService = '',
}: GetQuoteModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quoteData, setQuoteData] = useState<any>(null);

  const defaultService = initialService || 'Fullstack Web Application';
  const defaultMessage = projectName
    ? `I am interested in building a high-performance solution similar to ${projectName}.`
    : '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: defaultService,
    budget: '$10,000 - $25,000',
    message: defaultMessage,
    projectName: projectName || '',
  });

  useEffect(() => {
    if (projectName || initialService) {
      setFormData((prev) => ({
        ...prev,
        service: initialService || prev.service,
        projectName: projectName || prev.projectName,
        message: projectName
          ? `I am interested in building a high-performance solution similar to ${projectName}.`
          : prev.message,
      }));
    }
  }, [projectName, initialService]);

  const services = [
    'AI & Machine Learning',
    'Fullstack Web Application',
    'Mobile App (iOS/Android)',
    'Cloud Infrastructure',
    'Custom Engine / Backend',
    'EdTech & Analytics Hub',
    'Fintech Core',
    'Ecommerce Cloud',
  ];

  const budgetTiers = ['< $10,000', '$10,000 - $25,000', '$25,000 - $50,000', '$50,000+'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.status === 'success') {
        setQuoteData(data.quote);
        setIsSubmitted(true);
      } else {
        alert(data.message || 'Failed to submit quote request.');
      }
    } catch (err) {
      console.error('Quote submission error:', err);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadPDF = () => {
    if (!quoteData?.quoteId) return;
    const pdfUrl = `/api/quote/pdf?id=${encodeURIComponent(quoteData.quoteId)}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', pdfUrl);
    downloadAnchor.setAttribute('download', `tensorLoom_quote_${quoteData.quoteId}.pdf`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setQuoteData(null);
    setFormData({
      name: '',
      email: '',
      company: '',
      service: defaultService,
      budget: '$10,000 - $25,000',
      message: defaultMessage,
      projectName: projectName || '',
    });
    setIsOpen(false);
  };

  return (
    <>
      {/* High-Converting Trigger Button */}
      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#c99b3e] text-slate-950 font-extrabold text-xs font-heading tracking-tight shadow-md hover:bg-[#b38730] transition-all cursor-pointer border border-[#c99b3e]/40 ${className}`}
      >
        <Sparkles className="w-3.5 h-3.5 text-slate-950 animate-pulse" />
        <span>{buttonText}</span>
      </motion.button>

      {/* Modal Popup */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-[#12141c] border border-[#c99b3e]/30 shadow-2xl p-6 sm:p-8 md:p-10 z-10 my-auto text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 dark:bg-[#1a1d28] border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-[#c99b3e] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {!isSubmitted ? (
                <>
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c99b3e]/10 border border-[#c99b3e]/30 text-[#b38730] text-[10px] font-mono font-bold uppercase tracking-widest mb-2">
                      <Sparkles className="w-3 h-3 text-[#c99b3e]" />
                      {projectName ? `PROJECT QUOTE: ${projectName}` : 'PROJECT INQUIRY'}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0f1117] dark:text-white font-heading tracking-tight">
                      {projectName ? `Request Quote for ${projectName}` : 'Request a Custom Quote'}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4a4d57] dark:text-slate-400 font-sans mt-1">
                      {projectName
                        ? `Tell us about your requirements for building a product like ${projectName}.`
                        : 'Tell us about your project requirements and expected timeline.'}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Service Selection */}
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                        Select Primary Service
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {services.map((service) => (
                          <button
                            type="button"
                            key={service}
                            onClick={() => setFormData({ ...formData, service })}
                            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all border cursor-pointer ${
                              formData.service === service
                                ? 'bg-[#c99b3e] text-slate-950 border-[#c99b3e] shadow-xs'
                                : 'bg-slate-50 dark:bg-[#1a1d28] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-[#c99b3e]/50'
                            }`}
                          >
                            {service}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Budget Tier Selection */}
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                        Estimated Budget
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {budgetTiers.map((tier) => (
                          <button
                            type="button"
                            key={tier}
                            onClick={() => setFormData({ ...formData, budget: tier })}
                            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold text-center transition-all border cursor-pointer ${
                              formData.budget === tier
                                ? 'bg-[#c99b3e] text-slate-950 border-[#c99b3e] shadow-xs'
                                : 'bg-slate-50 dark:bg-[#1a1d28] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-[#c99b3e]/50'
                            }`}
                          >
                            {tier}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Input Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Jane Doe"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#1a1d28] border border-slate-200 dark:border-white/10 text-xs font-sans text-slate-900 dark:text-white focus:outline-none focus:border-[#c99b3e]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="jane@company.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#1a1d28] border border-slate-200 dark:border-white/10 text-xs font-sans text-slate-900 dark:text-white focus:outline-none focus:border-[#c99b3e]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Acme Enterprise"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#1a1d28] border border-slate-200 dark:border-white/10 text-xs font-sans text-slate-900 dark:text-white focus:outline-none focus:border-[#c99b3e]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Project Overview
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Describe your vision, technical requirements, or key goals..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#1a1d28] border border-slate-200 dark:border-white/10 text-xs font-sans text-slate-900 dark:text-white focus:outline-none focus:border-[#c99b3e] resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 rounded-xl bg-[#c99b3e] hover:bg-[#b38730] text-slate-950 font-extrabold text-sm font-heading transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Saving to MongoDB...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Quote Request</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                </>
              ) : (
                /* Success & Download Screen */
                <div className="text-center py-6 space-y-5">
                  <div className="w-14 h-14 rounded-full bg-[#c99b3e]/20 border border-[#c99b3e] flex items-center justify-center mx-auto text-[#c99b3e]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-extrabold text-[#0f1117] dark:text-white font-heading">
                      Quote Request Received!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans mt-1">
                      Your quote has been saved to the database. Reference ID:
                    </p>
                    <div className="inline-block mt-2 px-4 py-1.5 rounded-lg bg-[#c99b3e]/10 border border-[#c99b3e]/30 font-mono font-extrabold text-[#b38730] text-base">
                      {quoteData?.quoteId}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1a1d28] border border-slate-200 dark:border-white/10 text-left text-xs font-mono space-y-1">
                    {quoteData?.projectName && (
                      <div>
                        <span className="text-slate-500">Project Reference:</span>{' '}
                        <span className="font-bold text-[#c99b3e]">{quoteData.projectName}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-slate-500">Service:</span>{' '}
                      <span className="font-bold text-slate-900 dark:text-white">
                        {quoteData?.service}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500">Budget:</span>{' '}
                      <span className="font-bold text-slate-900 dark:text-white">
                        {quoteData?.budget}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500">Status:</span>{' '}
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        Stored in MongoDB
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      onClick={downloadPDF}
                      className="px-5 py-2.5 rounded-xl bg-[#c99b3e] text-slate-950 font-bold text-xs font-mono flex items-center gap-2 shadow-md hover:bg-[#b38730] transition-colors cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Quote PDF 📄</span>
                    </button>
                    <button
                      onClick={resetForm}
                      className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-[#1a1d28] text-slate-800 dark:text-slate-200 font-bold text-xs font-mono hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
