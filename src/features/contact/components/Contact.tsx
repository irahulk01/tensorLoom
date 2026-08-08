'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Loader2, Sparkles, ArrowRight } from 'lucide-react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useMutation } from '@tanstack/react-query';
import { submitContact } from '@/lib/api';

interface ContactProps {
  contactContent?: any;
  translations?: any;
}

export function Contact({ contactContent, translations }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Websites',
    message: '',
  });

  const [submittedData, setSubmittedData] = useState<any>(null);
  const [phoneError, setPhoneError] = useState('');

  const mutation = useMutation({
    mutationFn: submitContact,
    onSuccess: (data) => {
      setSubmittedData(data);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: 'Websites',
        message: '',
      });
      setPhoneError('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation using libphonenumber-js standard via react-phone-number-input
    if (formData.phone && !isValidPhoneNumber(formData.phone)) {
      setPhoneError('Please enter a valid international phone number with country code.');
      return;
    }
    setPhoneError('');
    mutation.mutate(formData);
  };

  return (
    <section
      id="contact"
      className="w-full py-24 md:py-36 bg-[#fcfbf9] dark:bg-[#0b0c10] text-[#0f1117] dark:text-white relative z-20 overflow-hidden border-t border-[#c99b3e]/20 transition-colors duration-300"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-14 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono text-[#b38730] dark:text-[#e5be6b] font-bold uppercase tracking-widest block mb-2">
            START A CONVERSATION
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0f1117] dark:text-white font-heading mb-4">
            Let&apos;s Build Something Built to Last.
          </h2>
          <p className="text-base sm:text-lg text-[#4a4d57] dark:text-slate-400 font-sans leading-relaxed">
            Tell us about your product vision, engineering scope, or scale targets. Our senior
            engineers respond within 24 hours.
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-2xl mx-auto bg-white dark:bg-[#12141c] border border-[#c99b3e]/25 dark:border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            {mutation.isSuccess ? (
              /* Simple & Clean Thank You Screen */
              <motion.div
                key="success-screen"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="py-12 text-center space-y-6 max-w-md mx-auto"
              >
                <div className="w-16 h-16 rounded-full bg-[#c99b3e]/20 border border-[#c99b3e] flex items-center justify-center mx-auto text-[#c99b3e] shadow-lg">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div className="space-y-3">
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-[#0f1117] dark:text-white font-heading tracking-tight">
                    Thank You!
                  </h3>
                  <p className="text-base text-[#4a4d57] dark:text-slate-400 font-sans leading-relaxed">
                    Your message has been submitted successfully. We will get back to you shortly.
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      mutation.reset();
                      setSubmittedData(null);
                      setPhoneError('');
                    }}
                    className="px-8 py-3.5 rounded-full bg-[#c99b3e] hover:bg-[#b38730] text-slate-950 font-extrabold text-xs font-heading tracking-tight shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>Send Another Message</span>
                    <ArrowRight className="w-4 h-4 text-slate-950" />
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Main Form Area */
              <motion.form
                key="contact-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-6"
              >
                {(mutation.isError || phoneError) && (
                  <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-3">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>
                      {phoneError ||
                        (mutation.error as Error)?.message ||
                        'Validation error occurred.'}
                    </span>
                  </div>
                )}

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-heading font-bold text-[#0f1117] dark:text-slate-200 uppercase tracking-wider">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="px-4.5 py-3.5 rounded-2xl bg-[#fcfbf9] dark:bg-[#1a1d28] border border-[#c99b3e]/30 dark:border-white/10 text-[#0f1117] dark:text-white placeholder-slate-400 text-sm font-sans font-medium focus:outline-none focus:border-[#c99b3e] focus:ring-2 focus:ring-[#c99b3e]/20 transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-heading font-bold text-[#0f1117] dark:text-slate-200 uppercase tracking-wider">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="px-4.5 py-3.5 rounded-2xl bg-[#fcfbf9] dark:bg-[#1a1d28] border border-[#c99b3e]/30 dark:border-white/10 text-[#0f1117] dark:text-white placeholder-slate-400 text-sm font-sans font-medium focus:outline-none focus:border-[#c99b3e] focus:ring-2 focus:ring-[#c99b3e]/20 transition-all"
                    />
                  </div>
                </div>

                {/* International Phone Input */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-heading font-bold text-[#0f1117] dark:text-slate-200 uppercase tracking-wider flex items-center justify-between">
                    <span>Phone Number (International E.164)</span>
                    <span className="text-[10px] text-slate-400 font-mono font-normal">
                      Optional
                    </span>
                  </label>

                  <div className="phone-input-custom-container">
                    <PhoneInput
                      international
                      defaultCountry="US"
                      value={formData.phone}
                      onChange={(value) => {
                        setFormData({ ...formData, phone: value || '' });
                        if (phoneError) setPhoneError('');
                      }}
                      placeholder="Enter phone number"
                      className="w-full px-4.5 py-3.5 rounded-2xl bg-[#fcfbf9] dark:bg-[#1a1d28] border border-[#c99b3e]/30 dark:border-white/10 text-[#0f1117] dark:text-white text-sm focus-within:border-[#c99b3e] focus-within:ring-2 focus-within:ring-[#c99b3e]/20 transition-all"
                    />
                  </div>
                </div>

                {/* Service Dropdown */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-heading font-bold text-[#0f1117] dark:text-slate-200 uppercase tracking-wider">
                    Primary Service Focus
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="px-4.5 py-3.5 rounded-2xl bg-[#fcfbf9] dark:bg-[#1a1d28] border border-[#c99b3e]/30 dark:border-white/10 text-[#0f1117] dark:text-white text-sm font-heading font-semibold focus:outline-none focus:border-[#c99b3e] focus:ring-2 focus:ring-[#c99b3e]/20 transition-all cursor-pointer"
                  >
                    <option value="Websites">Business Platforms & Fullstack Apps</option>
                    <option value="AI Agents">Applied AI Agents & RAG Pipelines</option>
                    <option value="Cloud Architecture">Cloud Native Microservices & K8s</option>
                    <option value="Performance Tuning">
                      Performance Audits & Sub-15ms Latency
                    </option>
                  </select>
                </div>

                {/* Message Field */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-heading font-bold text-[#0f1117] dark:text-slate-200 uppercase tracking-wider">
                    Project Overview *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your vision, technical requirements, timeline, or scale targets..."
                    className="px-4.5 py-3.5 rounded-2xl bg-[#fcfbf9] dark:bg-[#1a1d28] border border-[#c99b3e]/30 dark:border-white/10 text-[#0f1117] dark:text-white placeholder-slate-400 text-sm font-sans font-medium leading-relaxed focus:outline-none focus:border-[#c99b3e] focus:ring-2 focus:ring-[#c99b3e]/20 transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full py-4 rounded-full bg-[#c99b3e] text-slate-950 font-extrabold text-sm sm:text-base flex items-center justify-center gap-3 hover:bg-[#b38730] transition-all cursor-pointer shadow-lg disabled:opacity-50 mt-2"
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
                      <span>Validating & Saving to MongoDB...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Inquiry</span>
                      <Send className="w-4 h-4 text-slate-950" />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default Contact;
