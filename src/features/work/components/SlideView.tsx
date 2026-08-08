'use client';

import { memo, useState, useEffect } from 'react';
import { ExternalLink, RefreshCw } from 'lucide-react';
import { DownloadQuoteButton } from '@/components/quote/DownloadQuoteButton';

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
      <div
        className="work-card-container group overflow-hidden bg-white shadow-2xl border border-[#c99b3e]/25"
        onMouseEnter={() => onMouseEnter(project.id)}
        onMouseLeave={onMouseLeave}
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

            <h3 className="work-heading-title group-hover:translate-x-1 transition-all duration-500">
              {project.title}
            </h3>

            <p className="work-desc-text">{project.description}</p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-4">
            <div className="work-metric-box !mt-0 group-hover:border-[#c99b3e]/40 transition-all duration-500">
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

        {/* Right Side: Website Browser Mockup */}
        <div className="work-mockup-container">
          {project.url ? (
            <>
              {/* Chrome Header */}
              <div className="work-chrome-header">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>

                <div className="flex-1 max-w-xs h-6 rounded-md bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 px-2.5 flex items-center justify-between text-[10px] font-mono text-slate-600 dark:text-gray-300 overflow-hidden">
                  <span className="truncate select-all">{project.url}</span>
                  {!isMobile && (
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

              {/* Iframe Window */}
              <div className="work-iframe-window flex-1 h-[calc(100%-40px)] min-h-0 w-full relative overflow-hidden bg-white">
                {isMobile ? (
                  <img
                    src={`/projects/${project.id}.png`}
                    alt={`Preview of ${project.title}`}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-[#0d0d0d] flex items-center justify-center z-0 pointer-events-none">
                      <div className="w-5 h-5 border-2 border-[#c99b3e] border-t-transparent rounded-full animate-spin" />
                    </div>

                    <iframe
                      key={`${project.id}-${iframeKey}`}
                      src={project.url}
                      title={`Live preview of ${project.title}`}
                      className={`w-full h-full border-none relative z-10 bg-white ${
                        isHovered ? 'pointer-events-auto' : 'pointer-events-none'
                      }`}
                      style={{ width: '100%', height: '100%', minWidth: '100%', minHeight: '100%' }}
                      sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
                      loading="eager"
                    />
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="w-full h-full bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center text-slate-500 text-sm font-mono">
              No Live URL Configured
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
