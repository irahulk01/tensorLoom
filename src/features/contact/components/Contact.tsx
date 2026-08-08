'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitContact } from '@/lib/api';

interface ContactProps {
  contactContent?: any;
  translations?: any;
}

export function Contact({ contactContent, translations }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Websites',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await submitContact(formData);
      if (res.success) {
        setStatus('success');
        setFormData({ name: '', email: '', service: 'Websites', message: '' });
      } else {
        setStatus('error');
        setErrorMsg(res.message || 'Something went wrong.');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || 'Failed to connect.');
    }
  };

  return (
    <section
      id="contact"
      className="w-full py-24 md:py-36 bg-[#fcfbf9] relative z-20 overflow-hidden border-t border-[#c99b3e]/20"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-14 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono text-[#b38730] font-semibold uppercase tracking-widest block mb-2">
            START A PROJECT
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0f1117] font-heading mb-4">
            Let&apos;s Build Something Built to Last.
          </h2>
          <p className="text-base sm:text-lg text-[#4a4d57] font-sans">
            Tell us about your product idea, timeline, or engineering goals. We usually reply within
            24 hours.
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-2xl mx-auto bg-white border border-[#c99b3e]/20 rounded-3xl p-8 sm:p-12 shadow-xl">
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center flex flex-col items-center gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-[#c99b3e]/15 border border-[#c99b3e]/30 flex items-center justify-center text-[#c99b3e]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#0f1117] font-heading">
                Message Received!
              </h3>
              <p className="text-sm text-[#4a4d57] max-w-md leading-relaxed font-sans">
                Thank you for reaching out. A tensorLoom engineer will review your request and get
                back to you shortly.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-4 px-6 py-2.5 bg-[#0f1117] text-white rounded-full text-xs font-bold hover:bg-[#c99b3e] hover:text-slate-950 transition-all cursor-pointer"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {status === 'error' && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-3">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono font-semibold text-[#0f1117]">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="px-4 py-3 rounded-2xl bg-[#fcfbf9] border border-[#c99b3e]/20 text-[#0f1117] placeholder-slate-400 text-sm focus:outline-none focus:border-[#c99b3e] focus:bg-white transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono font-semibold text-[#0f1117]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@company.com"
                    className="px-4 py-3 rounded-2xl bg-[#fcfbf9] border border-[#c99b3e]/20 text-[#0f1117] placeholder-slate-400 text-sm focus:outline-none focus:border-[#c99b3e] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono font-semibold text-[#0f1117]">
                  Service Needed
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="px-4 py-3 rounded-2xl bg-[#fcfbf9] border border-[#c99b3e]/20 text-[#0f1117] text-sm focus:outline-none focus:border-[#c99b3e] focus:bg-white transition-all cursor-pointer"
                >
                  <option value="Websites">Business Websites & Platforms</option>
                  <option value="Apps">Mobile & Web Applications</option>
                  <option value="AI">AI Agents & Chatbots</option>
                  <option value="Marketing">Performance Marketing & SEO</option>
                  <option value="Branding">Visual Branding & Design Systems</option>
                  <option value="Automation">Process Automation & APIs</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono font-semibold text-[#0f1117]">
                  Project Details
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your project requirements, goals, or timeline..."
                  className="px-4 py-3 rounded-2xl bg-[#fcfbf9] border border-[#c99b3e]/20 text-[#0f1117] placeholder-slate-400 text-sm focus:outline-none focus:border-[#c99b3e] focus:bg-white transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-4 rounded-full bg-[#c99b3e] text-slate-950 font-extrabold text-sm sm:text-base flex items-center justify-center gap-3 hover:bg-[#b38730] transition-all cursor-pointer shadow-[0_10px_30px_rgba(201,155,62,0.3)] disabled:opacity-50"
              >
                {status === 'submitting' ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <span>Submit Inquiry</span>
                    <Send className="w-4 h-4 text-slate-950" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default Contact;
