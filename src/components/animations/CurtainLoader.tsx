'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CurtainLoaderProps {
  onComplete?: () => void;
}

export function CurtainLoader({ onComplete }: CurtainLoaderProps) {
  const [stage, setStage] = useState<'appear' | 'slashDissolve' | 'split' | 'done'>('appear');

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setStage('slashDissolve');
    }, 700);

    const timer2 = setTimeout(() => {
      setStage('split');
    }, 1100);

    const timer3 = setTimeout(() => {
      setStage('done');
      if (onComplete) onComplete();
    }, 1800);

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
      {/* Light Overlay Backdrop */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isSplitting ? 0 : 1 }}
        transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
        className="fixed inset-0 bg-[#fcfbf9] z-[9998]"
      />

      {/* Main Logo Container */}
      <div className="relative z-[10000] flex flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-4 md:gap-8">
          {/* Left Chevron < (Obsidian Dark) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 0 }}
            animate={{
              opacity: isSplitting ? 0 : 1,
              scale: isSplitting ? 1.1 : 1,
              x: isSplitting ? '-65vw' : 0,
            }}
            transition={{
              duration: isSplitting ? 0.8 : 0.6,
              ease: isSplitting ? [0.77, 0, 0.175, 1] : 'easeOut',
            }}
            className="relative flex items-center justify-center"
          >
            <svg viewBox="0 0 100 120" className="w-20 h-20 md:w-32 md:h-32 drop-shadow-md">
              <defs>
                <linearGradient id="obsidianGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0F1117" />
                  <stop offset="100%" stopColor="#212533" />
                </linearGradient>
              </defs>
              <path
                d="M 45,10 L 10,60 L 45,110 L 45,80 L 25,60 L 45,40 Z"
                fill="url(#obsidianGrad)"
              />
            </svg>
          </motion.div>

          {/* Central Dissolving Slash '/' (Signature Warm Gold) */}
          <AnimatePresence>
            {showSlash && (
              <motion.div
                key="slash"
                initial={{ opacity: 0, scaleY: 0, rotate: 20 }}
                animate={{ opacity: 1, scaleY: 1, rotate: 20 }}
                exit={{ opacity: 0, scaleY: 0, rotate: 20 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="w-2 md:w-3 h-24 md:h-36 bg-gradient-to-b from-[#e5be6b] via-[#c99b3e] to-[#b38730] rounded-full shadow-[0_0_20px_rgba(201,155,62,0.4)]"
              />
            )}
          </AnimatePresence>

          {/* Right Chevron > (Signature Warm Gold) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 0 }}
            animate={{
              opacity: isSplitting ? 0 : 1,
              scale: isSplitting ? 1.1 : 1,
              x: isSplitting ? '65vw' : 0,
            }}
            transition={{
              duration: isSplitting ? 0.8 : 0.6,
              ease: isSplitting ? [0.77, 0, 0.175, 1] : 'easeOut',
            }}
            className="relative flex items-center justify-center"
          >
            <svg viewBox="0 0 100 120" className="w-20 h-20 md:w-32 md:h-32 drop-shadow-md">
              <defs>
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E5BE6B" />
                  <stop offset="50%" stopColor="#C99B3E" />
                  <stop offset="100%" stopColor="#B38730" />
                </linearGradient>
              </defs>
              <path d="M 55,10 L 90,60 L 55,110 L 55,80 L 75,60 L 55,40 Z" fill="url(#goldGrad)" />
            </svg>
          </motion.div>
        </div>

        {/* Animated Brand Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: isSplitting ? 0 : 1,
            y: isSplitting ? 10 : 0,
          }}
          transition={{
            duration: 0.5,
            delay: 0.15,
            ease: 'easeOut',
          }}
          className="mt-4 text-lg md:text-2xl font-extrabold tracking-[0.25em] text-[#0f1117] uppercase font-heading"
        >
          tensorLoom
        </motion.div>
      </div>
    </div>
  );
}
