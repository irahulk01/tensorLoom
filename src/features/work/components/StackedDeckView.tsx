'use client';

import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { DownloadQuoteButton } from '@/components/quote/DownloadQuoteButton';

interface StackedDeckViewProps {
  projects: any[];
  activeIdx: number;
  calculateCardMath: (idx: number, activeIndex: number) => any;
  iframeKeys: Record<string, number>;
  onSelectProject: (id: string) => void;
  prevStacked: () => void;
  nextStacked: () => void;
  reloadIframe: (id: string) => void;
}

export const StackedDeckView = memo(function StackedDeckView({
  projects,
  activeIdx,
  calculateCardMath,
  iframeKeys,
  onSelectProject,
  prevStacked,
  nextStacked,
  reloadIframe,
}: StackedDeckViewProps) {
  return (
    <div className="relative w-full max-w-[1300px] flex flex-col items-center justify-center py-4">
      {/* 3D Perspective Deck Container */}
      <div
        className="relative w-full h-[560px] sm:h-[620px] md:h-[680px] lg:h-[720px] flex items-center justify-center"
        style={{ perspective: '1200px' }}
      >
        <AnimatePresence initial={false}>
          {projects.map((project: any, idx: number) => {
            const math = calculateCardMath(idx, activeIdx);

            return (
              <motion.div
                key={project.id}
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  x: math.translateX * 2,
                }}
                animate={{
                  x: `${math.translateX}vw`,
                  y: math.translateY,
                  z: math.translateZ,
                  rotateY: math.rotateY,
                  scale: math.scale,
                  opacity: math.opacity,
                  zIndex: math.zIndex,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                  x: math.translateX * 2,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 1, 0.5, 1],
                }}
                onClick={() => !math.isCenter && onSelectProject(project.id)}
                className={`absolute work-card-container group overflow-hidden bg-white shadow-2xl border border-[#c99b3e]/25 ${
                  !math.isCenter ? 'cursor-pointer hover:border-[#c99b3e]/60' : ''
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.accentColor} opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}
                />

                {/* Left Side: Metadata */}
                <div className="work-meta-panel">
                  <div className="flex flex-col items-start gap-3 sm:gap-4">
                    <div className="flex items-center gap-2">
                      <span className="work-badge-tag">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c99b3e] animate-pulse" />
                        {project.category}
                      </span>
                    </div>

                    <h3 className="work-heading-title">{project.title}</h3>

                    <p className="work-desc-text">{project.description}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-4">
                    <div className="work-metric-box !mt-0">
                      <div className="work-metric-val">{project.metric}</div>
                      <div className="work-metric-lbl">{project.metricLabel}</div>
                    </div>
                    <DownloadQuoteButton
                      projectName={project.title}
                      category={project.category}
                      buttonText={`Get Quote PDF 📄`}
                      className="!py-2.5 !px-4 shadow-sm hover:shadow-md shrink-0"
                    />
                  </div>
                </div>

                {/* Right Side: Mockup Browser Window */}
                <div className="work-mockup-container">
                  {project.url ? (
                    <>
                      <div className="work-chrome-header">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                        </div>

                        <div className="flex-1 max-w-xs h-6 rounded-md bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 px-2.5 flex items-center justify-between text-[10px] font-mono text-slate-600 dark:text-gray-300 overflow-hidden">
                          <span className="truncate select-all">{project.url}</span>
                          {math.isCenter && (
                            <button
                              onClick={() => reloadIframe(project.id)}
                              className="p-0.5 hover:text-[#c99b3e] transition-colors cursor-pointer flex items-center justify-center shrink-0"
                              title="Reload live preview"
                            >
                              <RefreshCw className="w-2.5 h-2.5" />
                            </button>
                          )}
                        </div>

                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-[#b38730] hover:text-[#c99b3e] font-semibold transition-colors flex items-center gap-1 font-sans cursor-pointer shrink-0"
                        >
                          <span>Launch Site</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      <div className="work-iframe-window flex-1 h-[calc(100%-40px)] min-h-0 w-full relative overflow-hidden bg-white">
                        <iframe
                          key={`${project.id}-${iframeKeys[project.id] || 0}`}
                          src={project.url}
                          title={`Live preview of ${project.title}`}
                          className={`w-full h-full border-none relative z-10 bg-white ${
                            math.isCenter ? 'pointer-events-auto' : 'pointer-events-none'
                          }`}
                          style={{
                            width: '100%',
                            height: '100%',
                            minWidth: '100%',
                            minHeight: '100%',
                          }}
                          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
                          loading="eager"
                        />
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center text-slate-500 text-sm font-mono">
                      No Live URL Configured
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Manual Deck Navigation Controls */}
      <div className="mt-6 flex items-center gap-4 z-50">
        <button onClick={prevStacked} className="work-nav-btn" title="Previous Project">
          <ChevronLeft className="w-5 h-5 text-[#b38730]" />
        </button>

        <div className="flex items-center gap-2">
          {projects.map((p: any, idx: number) => (
            <button
              key={p.id}
              onClick={() => onSelectProject(p.id)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                idx === activeIdx ? 'bg-[#c99b3e] w-6' : 'bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

        <button onClick={nextStacked} className="work-nav-btn" title="Next Project">
          <ChevronRight className="w-5 h-5 text-[#b38730]" />
        </button>
      </div>
    </div>
  );
});
