'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  CheckCircle2,
  Loader2,
  Sparkles,
  Mail,
  User,
  Building,
  MessageSquare,
} from 'lucide-react';
import { submitContact } from '@/lib/api';

interface ContactProps {
  translations: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      email: string;
      phone: string;
      company: string;
      message: string;
      submit: string;
    };
  };
}

export default function Contact({ translations }: ContactProps) {
  const [emailInput, setEmailInput] = useState('');
  const [emailStepDone, setEmailStepDone] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailStepSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim() || !emailInput.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    setErrorMessage('');
    setFormData((prev) => ({ ...prev, email: emailInput }));
    setEmailStepDone(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setErrorMessage('');
    setSubmitting(true);
    try {
      await submitContact(formData);
      setSubmitted(true);
    } catch (err) {
      setErrorMessage('Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setEmailInput('');
    setEmailStepDone(false);
    setFormData({ name: '', email: '', company: '', message: '' });
    setSubmitted(false);
    setErrorMessage('');
  };

  return (
    <section className="w-full py-28 md:py-36 bg-[var(--background)] relative z-20 overflow-hidden border-t border-white/10">
      {/* Ambient background lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c89a43]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="mb-16 flex flex-col items-center text-center gap-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c89a43]/30 bg-[#c89a43]/10 text-[#c89a43] text-xs font-mono tracking-widest uppercase backdrop-blur-md shadow-[0_0_15px_rgba(200,154,67,0.15)]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Initialize Connection.</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-heading"
          >
            Contact <span className="text-[#c89a43]">Us</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-gray-400 font-sans max-w-xl leading-relaxed"
          >
            Enter your email to start. Our engineering team will get back to you within 24 hours.
          </motion.p>
        </div>

        {/* Animated Contact Card */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success-screen"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="flagship-surface p-12 md:p-16 rounded-3xl border border-white/10 shadow-2xl flex flex-col items-center text-center gap-6"
              >
                <div className="w-20 h-20 rounded-full bg-[#c89a43]/10 border border-[#c89a43]/30 flex items-center justify-center shadow-[0_0_40px_rgba(200,154,67,0.3)]">
                  <CheckCircle2 className="w-10 h-10 text-[#c89a43]" />
                </div>

                <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight font-heading">
                  Connection Initialized!
                </h3>

                <p className="text-base text-gray-400 font-sans max-w-md leading-relaxed">
                  Thank you for reaching out (
                  <span className="text-white font-mono">{formData.email}</span>). We have received
                  your details and will get back to you within 24 hours.
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReset}
                  className="mt-4 px-6 py-3 bg-white/5 border border-white/10 hover:border-[#c89a43]/40 text-white rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer"
                >
                  Send Another Message
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="contact-box"
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="bg-[#0d0e12] border border-white/15 rounded-3xl p-8 md:p-14 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_50px_rgba(200,154,67,0.08)] relative overflow-hidden backdrop-blur-2xl"
              >
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-sans"
                  >
                    {errorMessage}
                  </motion.div>
                )}

                {/* Step 1: Initial Email Only Input */}
                {!emailStepDone && (
                  <form onSubmit={handleEmailStepSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3 text-left">
                      <label className="text-xs font-mono text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-[#c89a43]" />
                        <span>Enter your Email to Start *</span>
                      </label>
                      <div className="relative flex flex-col md:flex-row gap-3">
                        <input
                          type="email"
                          required
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          placeholder="name@company.com"
                          className="flex-1 bg-white/[0.04] border border-white/15 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#c89a43] focus:ring-2 focus:ring-[#c89a43]/30 transition-all font-sans text-base shadow-inner"
                        />
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          className="py-4 px-8 bg-[#c89a43] hover:bg-[#d4a853] text-black font-extrabold rounded-xl text-base flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_0_25px_rgba(200,154,67,0.35)] cursor-pointer font-heading whitespace-nowrap"
                        >
                          <span>Get Started</span>
                          <Send className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </form>
                )}

                {/* Step 2: Ultra-Accurate Curtain Unveil Animation for Rest of Form */}
                <AnimatePresence>
                  {emailStepDone && (
                    <motion.form
                      key="full-form-curtain"
                      initial={{
                        opacity: 0,
                        height: 0,
                        scaleY: 0,
                        clipPath: 'inset(0% 0% 100% 0%)',
                      }}
                      animate={{
                        opacity: 1,
                        height: 'auto',
                        scaleY: 1,
                        clipPath: 'inset(0% 0% 0% 0%)',
                      }}
                      exit={{ opacity: 0, height: 0, scaleY: 0, clipPath: 'inset(0% 0% 100% 0%)' }}
                      transition={{
                        duration: 0.85,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-6 overflow-hidden transform-gpu origin-top"
                    >
                      {/* Pre-filled Email Header Bar */}
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                        className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.04] border border-[#c89a43]/30 backdrop-blur-xl shadow-[0_0_25px_rgba(200,154,67,0.12)]"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-[#c89a43]/15 border border-[#c89a43]/30 flex items-center justify-center">
                            <Mail className="w-4 h-4 text-[#c89a43]" />
                          </div>
                          <div className="flex flex-col text-left">
                            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                              Verified Contact Email
                            </span>
                            <span className="text-sm font-semibold text-white font-mono">
                              {formData.email}
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setEmailStepDone(false)}
                          className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-[#c89a43] hover:bg-[#c89a43]/15 hover:border-[#c89a43]/30 transition-all cursor-pointer"
                        >
                          Change
                        </button>
                      </motion.div>

                      {/* Staggered Field Unveils */}
                      <div className="flex flex-col gap-5">
                        {/* Name Input */}
                        <motion.div
                          initial={{ opacity: 0, y: -25 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.25, duration: 0.5, ease: 'easeOut' }}
                          className="flex flex-col gap-2 text-left"
                        >
                          <label className="text-xs font-mono text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-[#c89a43]" />
                            <span>Name *</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="John Doe"
                            className="w-full bg-white/[0.04] border border-white/15 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#c89a43] focus:ring-2 focus:ring-[#c89a43]/30 transition-all font-sans text-sm shadow-inner"
                          />
                        </motion.div>

                        {/* Company Input */}
                        <motion.div
                          initial={{ opacity: 0, y: -25 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.35, duration: 0.5, ease: 'easeOut' }}
                          className="flex flex-col gap-2 text-left"
                        >
                          <label className="text-xs font-mono text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                            <Building className="w-3.5 h-3.5 text-[#c89a43]" />
                            <span>Company (Optional)</span>
                          </label>
                          <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            placeholder="Acme Corp"
                            className="w-full bg-white/[0.04] border border-white/15 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#c89a43] focus:ring-2 focus:ring-[#c89a43]/30 transition-all font-sans text-sm shadow-inner"
                          />
                        </motion.div>

                        {/* Message Input */}
                        <motion.div
                          initial={{ opacity: 0, y: -25 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.45, duration: 0.5, ease: 'easeOut' }}
                          className="flex flex-col gap-2 text-left"
                        >
                          <label className="text-xs font-mono text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                            <MessageSquare className="w-3.5 h-3.5 text-[#c89a43]" />
                            <span>Message *</span>
                          </label>
                          <textarea
                            required
                            rows={4}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder="Tell us about your project, timeline, and goals..."
                            className="w-full bg-white/[0.04] border border-white/15 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#c89a43] focus:ring-2 focus:ring-[#c89a43]/30 transition-all font-sans text-sm resize-none shadow-inner"
                          />
                        </motion.div>
                      </div>

                      {/* Final Submit Button */}
                      <motion.button
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.55, duration: 0.4 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={submitting}
                        className="mt-2 w-full py-4 px-8 bg-[#c89a43] hover:bg-[#d4a853] text-black font-extrabold rounded-xl text-base flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_0_25px_rgba(200,154,67,0.3)] disabled:opacity-50 cursor-pointer font-heading"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Sending Request...</span>
                          </>
                        ) : (
                          <>
                            <span>Complete Request</span>
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
