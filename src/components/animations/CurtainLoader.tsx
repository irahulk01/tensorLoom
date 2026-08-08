'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CurtainLoaderProps {
  onComplete?: () => void;
}

export function CurtainLoader({ onComplete }: CurtainLoaderProps) {
  const [stage, setStage] = useState<'appear' | 'slashDissolve' | 'split' | 'done'>('appear');

  useEffect(() => {
    // 0.8s: Slash dissolves in the middle
    const timer1 = setTimeout(() => {
      setStage('slashDissolve');
    }, 800);

    // 1.3s: Chevrons split left & right, backdrop fades out
    const timer2 = setTimeout(() => {
      setStage('split');
    }, 1300);

    // 2.3s: Complete and unmount
    const timer3 = setTimeout(() => {
      setStage('done');
      if (onComplete) onComplete();
    }, 2300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  if (stage === 'done') return null;

  const isSplitting = stage === 'split';
  const showSlash = stage === 'appear';

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden select-none flex items-center justify-center">
      {/* Dark Overlay Backdrop that fades away during split */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isSplitting ? 0 : 1 }}
        transition={{ duration: 1.0, ease: [0.77, 0, 0.175, 1] }}
        className="fixed inset-0 bg-[#09090b] z-[9998]"
      />

      {/* Main Logo Container */}
      <div className="relative z-[10000] flex flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-4 md:gap-8">
          {/* Left Chevron < (Silver/White) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 0 }}
            animate={{
              opacity: isSplitting ? 0 : 1,
              scale: isSplitting ? 1.1 : 1,
              x: isSplitting ? '-65vw' : 0,
            }}
            transition={{
              duration: isSplitting ? 1.0 : 0.7,
              ease: isSplitting ? [0.77, 0, 0.175, 1] : 'easeOut',
            }}
            className="relative flex items-center justify-center"
          >
            <svg
              viewBox="0 0 100 120"
              className="w-24 h-24 md:w-40 md:h-40 drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]"
            >
              <defs>
                <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="40%" stopColor="#F1F5F9" />
                  <stop offset="100%" stopColor="#94A3B8" />
                </linearGradient>
              </defs>
              <path
                d="M 45,10 L 10,60 L 45,110 L 45,80 L 25,60 L 45,40 Z"
                fill="url(#silverGrad)"
              />
            </svg>
          </motion.div>

          {/* Central Dissolving Slash '/' */}
          <AnimatePresence>
            {showSlash && (
              <motion.div
                key="slash"
                initial={{ opacity: 0, scaleY: 0, rotate: 20 }}
                animate={{ opacity: 1, scaleY: 1, rotate: 20 }}
                exit={{ opacity: 0, scaleY: 0, rotate: 20 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="w-2 md:w-3 h-28 md:h-44 bg-gradient-to-b from-amber-200 via-white to-yellow-500 rounded-full shadow-[0_0_25px_rgba(234,179,8,0.9)]"
              />
            )}
          </AnimatePresence>

          {/* Right Chevron > (Luxury Gold) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 0 }}
            animate={{
              opacity: isSplitting ? 0 : 1,
              scale: isSplitting ? 1.1 : 1,
              x: isSplitting ? '65vw' : 0,
            }}
            transition={{
              duration: isSplitting ? 1.0 : 0.7,
              ease: isSplitting ? [0.77, 0, 0.175, 1] : 'easeOut',
            }}
            className="relative flex items-center justify-center"
          >
            <svg
              viewBox="0 0 100 120"
              className="w-24 h-24 md:w-40 md:h-40 drop-shadow-[0_0_35px_rgba(234,179,8,0.6)]"
            >
              <defs>
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FEF08A" />
                  <stop offset="35%" stopColor="#EAB308" />
                  <stop offset="100%" stopColor="#A16207" />
                </linearGradient>
              </defs>
              <path d="M 55,10 L 90,60 L 55,110 L 55,80 L 75,60 L 55,40 Z" fill="url(#goldGrad)" />
            </svg>
          </motion.div>
        </div>

        {/* Animated Brand Text Fading In Below Brackets */}
        <motion.div
          initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
          animate={{
            opacity: isSplitting ? 0 : 1,
            y: isSplitting ? 15 : 0,
            filter: isSplitting ? 'blur(6px)' : 'blur(0px)',
          }}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease: 'easeOut',
          }}
          className="mt-6 text-xl md:text-3xl font-extrabold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-amber-300 uppercase drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        >
          tensorLoom
        </motion.div>
      </div>
    </div>
  );
}
