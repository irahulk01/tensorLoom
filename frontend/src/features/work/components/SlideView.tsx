'use client';

import { memo, useState, useEffect } from 'react';
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
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="work-panel w-screen h-full flex flex-col justify-center items-center relative px-[3vw] will-change-transform transform-gpu">
      {/* Cinematic Split Layout Container */}
      <div
        className="work-card-container group overflow-hidden bg-white dark:bg-[#0c0d12]"
        onMouseEnter={() => onMouseEnter(project.id)}
        onMouseLeave={onMouseLeave}
      >
        {/* Background gradient hint */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.accentColor} opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}
        />

        {/* Left Side: Metadata */}
        <div className="work-meta-panel">
          <div className="flex flex-col items-start gap-3 sm:gap-4">
            <div className="flex items-center gap-2">
              <span className="work-badge-tag">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c89a43] animate-pulse" />
                {project.category}
              </span>
            </div>

            <h3 className="work-heading-title group-hover:translate-x-1 transition-all duration-500">
              {project.title}
            </h3>

            <p className="work-desc-text">{project.description}</p>
          </div>

          <div className="work-metric-box group-hover:border-[#c89a43]/40 group-hover:shadow-[0_0_25px_rgba(200,154,67,0.1)] transition-all duration-500">
            <div className="work-metric-val">{project.metric}</div>
            <div className="work-metric-lbl">{project.metricLabel}</div>
          </div>
        </div>

        {/* Right Side: Website Browser Mockup (Live Iframe on Desktop, High-Res Preview Image on Mobile) */}
        <div className="work-mockup-container">
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
              <div className="work-chrome-header">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>

                <div className="flex-1 max-w-xs h-5 sm:h-6 rounded-md bg-white dark:bg-black/40 border border-zinc-200 dark:border-white/5 px-2 flex items-center justify-between text-[9px] font-mono text-zinc-500 dark:text-gray-500 overflow-hidden">
                  <span className="truncate select-all">{project.url}</span>
                  {!isMobile && (
                    <button
                      onClick={() => reloadIframe(project.id)}
                      className="p-0.5 hover:text-cyan-500 dark:hover:text-white transition-colors cursor-pointer flex items-center justify-center"
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
                  className="text-[10px] text-zinc-600 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-white transition-colors flex items-center gap-1 font-sans cursor-pointer shrink-0"
                >
                  <span>Launch Site</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Iframe Window (Desktop) vs High-Res Image Window (Mobile iOS Safari safety) */}
              <div className="work-iframe-window flex-1 cursor-pointer">
                {isMobile ? (
                  <img
                    src={`/projects/${project.id}.png`}
                    alt={`Preview of ${project.title}`}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-[#0d0d0d] flex items-center justify-center z-0 pointer-events-none">
                      <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
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
                  </>
                )}
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
