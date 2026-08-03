'use client';

import { memo, useState } from 'react';
import { ExternalLink, RefreshCw } from 'lucide-react';

interface SlideViewProps {
  project: any;
  isHovered: boolean;
  iframeKey: number;
  onMouseEnter: (id: string) => void;
  onMouseLeave: () => void;
  reloadIframe: (id: string) => void;
}

export const SlideView = memo(function SlideView({
  project,
  isHovered,
  iframeKey,
  onMouseEnter,
  onMouseLeave,
  reloadIframe,
}: SlideViewProps) {
  const [scrollActive, setScrollActive] = useState<boolean>(false);

  return (
    <div className="work-panel w-screen h-full flex flex-col justify-center items-center relative px-6 md:px-20 lg:px-24 will-change-transform transform-gpu">
      {/* Cinematic Split Layout Container */}
      <div
        className="relative w-full max-w-7xl h-[65vh] md:h-[75vh] rounded-3xl overflow-hidden bg-white dark:bg-[#0c0d12] border border-zinc-200 dark:border-white/15 flex flex-col lg:flex-row p-6 md:p-12 gap-8 md:gap-12 group shadow-2xl"
        onMouseEnter={() => onMouseEnter(project.id)}
        onMouseLeave={() => {
          onMouseLeave();
          setScrollActive(false);
        }}
      >
        {/* Background gradient hint */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.accentColor} opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}
        />

        {/* Left Side: Metadata */}
        <div className="flex flex-col justify-between lg:w-2/5 relative z-10 text-left">
          <div className="flex flex-col items-start gap-5">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#c89a43] bg-[#c89a43]/10 px-4 py-1.5 rounded-full border border-[#c89a43]/25 backdrop-blur-md shadow-[0_0_15px_rgba(200,154,67,0.15)] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c89a43] animate-pulse" />
                {project.category}
              </span>
            </div>

            <h3 className="text-4xl md:text-6xl font-extrabold tracking-tighter drop-shadow-2xl font-heading leading-tight bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent transition-all duration-500 group-hover:translate-x-1">
              {project.title}
            </h3>

            <p className="text-sm md:text-base text-gray-400 font-normal leading-relaxed font-sans mt-1">
              {project.description}
            </p>
          </div>

          <div className="mt-8 bg-black/40 dark:bg-white/[0.03] border border-white/10 p-5 rounded-2xl max-w-xs flex flex-col gap-1 transition-all duration-500 group-hover:border-[#c89a43]/40 group-hover:shadow-[0_0_25px_rgba(200,154,67,0.1)] backdrop-blur-xl">
            <div className="text-3xl font-extrabold text-white tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {project.metric}
            </div>
            <div className="text-[10px] uppercase tracking-widest text-[#c89a43] font-mono">
              {project.metricLabel}
            </div>
          </div>
        </div>

        {/* Right Side: Iframe Browser Mockup */}
        <div className="flex-1 h-full lg:w-3/5 min-h-[300px] flex flex-col relative z-10 [perspective:1200px]">
          {project.url ? (
            <div
              className="w-full h-full rounded-2xl overflow-hidden bg-[#0d0d0d] border border-white/10 flex flex-col shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] transform-gpu will-change-transform"
              style={{
                transform: isHovered ? 'none' : 'rotateY(-12deg) rotateX(4deg) skewY(-1deg)',
                boxShadow: isHovered
                  ? `0 25px 50px -12px ${
                      project.id === 'icashiq'
                        ? 'rgba(6,182,212,0.25)'
                        : project.id === 'easydocuments'
                          ? 'rgba(139,92,246,0.25)'
                          : project.id === 'studentscorner'
                            ? 'rgba(244,63,94,0.25)'
                            : 'rgba(16,185,129,0.25)'
                    }`
                  : '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
              }}
            >
              {/* Chrome Header */}
              <div className="w-full h-10 bg-zinc-100 dark:bg-[#121212] border-b border-zinc-200 dark:border-white/5 flex items-center justify-between px-4 gap-4 shrink-0">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>

                <div className="flex-1 max-w-xs h-6 rounded-md bg-white dark:bg-black/40 border border-zinc-200 dark:border-white/5 px-2.5 flex items-center justify-between text-[9px] font-mono text-zinc-500 dark:text-gray-500 overflow-hidden">
                  <span className="truncate select-all">{project.url}</span>
                  <button
                    onClick={() => reloadIframe(project.id)}
                    className="p-0.5 hover:text-cyan-500 dark:hover:text-white transition-colors cursor-pointer flex items-center justify-center"
                    title="Reload live preview"
                  >
                    <RefreshCw className="w-2.5 h-2.5" />
                  </button>
                </div>

                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-zinc-600 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-white transition-colors flex items-center gap-1 font-sans cursor-pointer"
                >
                  <span>Launch</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Iframe Window */}
              <div
                className="w-full flex-1 bg-white relative cursor-pointer"
                onMouseEnter={() => setScrollActive(true)}
                onWheelCapture={(e) => {
                  e.stopPropagation();
                }}
                onTouchMoveCapture={(e) => {
                  e.stopPropagation();
                }}
              >
                <div className="absolute inset-0 bg-[#0d0d0d] flex items-center justify-center z-0 pointer-events-none">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                    <span className="text-[9px] text-gray-500 font-mono">Loading live site...</span>
                  </div>
                </div>

                <iframe
                  key={`${project.id}-${iframeKey}`}
                  src={project.url}
                  title={`Live preview of ${project.title}`}
                  className={`w-full h-full border-none relative z-10 bg-white ${
                    isHovered ? 'pointer-events-auto' : 'pointer-events-none'
                  }`}
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
                  loading="eager"
                />
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-gray-500 text-sm font-mono">
              No Live URL Configured
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
