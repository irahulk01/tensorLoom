'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
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
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 3D Parallax Mouse Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useMotionValue(0), { damping: 25, stiffness: 100 });
  const rotateY = useSpring(useMotionValue(0), { damping: 25, stiffness: 100 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    rotateY.set(x * 10);
    rotateX.set(y * -10);
  };

  useEffect(() => {
    if (inputRef.current && step > 0) {
      inputRef.current.focus({ preventScroll: true });
    }
  }, [step]);

  const questions = [
    { key: 'message', label: translations.form.message, type: 'textarea' },
    { key: 'name', label: "What's your name?", type: 'text' },
    { key: 'email', label: "What's your email address?", type: 'email' },
    { key: 'company', label: 'Company name (optional)', type: 'text' },
  ];

  const handleNext = async () => {
    const currentKey = questions[step].key as keyof typeof formData;
    if (currentKey !== 'company' && !formData[currentKey].trim()) return;

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      await submitForm();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleNext();
    }
  };

  const submitForm = async () => {
    setSubmitting(true);
    try {
      await submitContact(formData);
      setSubmitted(true);
    } catch (err) {
      alert('Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[85vh] flex flex-col items-center justify-center py-32 px-6 perspective-1200 overflow-hidden"
    >
      {/* Volumetric Voluminous Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-violet-600/10 blur-[170px] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-600/10 blur-[130px] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center preserve-3d">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full flex flex-col items-center preserve-3d"
            >
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-6 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>07 / Start A Project</span>
              </div>

              <h2 className="text-5xl md:text-8xl font-extrabold tracking-tighter mb-4 text-white">
                {translations.title}
              </h2>
              <p className="text-gray-400 text-lg md:text-2xl mb-16 font-light max-w-2xl">
                {translations.subtitle}
              </p>

              {/* 3D Spatial Form Card */}
              <motion.div
                style={{ rotateX, rotateY }}
                className="w-full max-w-3xl glass-depth glass-rim-light p-8 md:p-16 rounded-[2.5rem] border border-white/10 relative overflow-hidden preserve-3d shadow-2xl"
              >
                {/* Glowing Progress bar */}
                <div className="absolute top-0 left-0 h-1 bg-white/10 w-full">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-600 shadow-[0_0_15px_rgba(0,242,255,0.8)]"
                    initial={{ width: '0%' }}
                    animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: 'circOut' }}
                  />
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
                    animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                    exit={{ opacity: 0, filter: 'blur(10px)', y: -20 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-start w-full text-left preserve-3d"
                  >
                    <label
                      className="text-2xl md:text-4xl font-bold text-white mb-8 tracking-tight"
                      style={{ transform: 'translateZ(30px)' }}
                    >
                      {questions[step].label}
                    </label>

                    <div
                      className="relative w-full flex items-center"
                      style={{ transform: 'translateZ(50px)' }}
                    >
                      {questions[step].type === 'textarea' ? (
                        <textarea
                          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                          value={formData[questions[step].key as keyof typeof formData]}
                          onChange={(e) =>
                            setFormData({ ...formData, [questions[step].key]: e.target.value })
                          }
                          onKeyDown={handleKeyDown}
                          className="w-full bg-transparent border-none text-2xl md:text-3xl text-white placeholder-gray-600 focus:ring-0 resize-none h-32 md:h-48 font-light"
                          placeholder="Type your response..."
                        />
                      ) : (
                        <input
                          ref={inputRef as React.RefObject<HTMLInputElement>}
                          type={questions[step].type}
                          value={formData[questions[step].key as keyof typeof formData]}
                          onChange={(e) =>
                            setFormData({ ...formData, [questions[step].key]: e.target.value })
                          }
                          onKeyDown={handleKeyDown}
                          className="w-full bg-transparent border-none text-3xl md:text-5xl text-white placeholder-gray-600 focus:ring-0 pb-4 border-b-2 border-white/10 focus:border-cyan-400 transition-colors font-light"
                          placeholder="Type your response..."
                        />
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div
                  className="w-full flex justify-between items-center mt-12 preserve-3d"
                  style={{ transform: 'translateZ(40px)' }}
                >
                  <span className="text-gray-500 font-mono text-sm tracking-widest uppercase">
                    Step {step + 1} of {questions.length}
                  </span>

                  <motion.button
                    whileHover={{ scale: 1.06, translateZ: 20 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNext}
                    disabled={submitting}
                    className="px-8 py-4 bg-white text-black rounded-full font-bold text-lg flex items-center gap-3 transition-all hover:bg-cyan-300 disabled:opacity-50 cursor-pointer shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                  >
                    {submitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <span>{step === questions.length - 1 ? 'Submit' : 'Next'}</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9, translateZ: 50 }}
              animate={{ opacity: 1, scale: 1, translateZ: 50 }}
              className="flex flex-col items-center justify-center text-center py-20 preserve-3d"
            >
              <div className="w-28 h-28 rounded-full glass-depth glass-rim-light flex items-center justify-center mb-8 border border-cyan-400/40 shadow-[0_0_50px_rgba(0,242,255,0.4)]">
                <CheckCircle2 className="w-14 h-14 text-cyan-400" />
              </div>
              <h3 className="text-5xl font-bold tracking-tighter text-white mb-4">Request Sent.</h3>
              <p className="text-gray-300 text-xl font-light">
                We will review your project requirements and respond within 24 hours.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
