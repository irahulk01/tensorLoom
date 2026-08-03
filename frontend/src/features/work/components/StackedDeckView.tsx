import { memo, useState, useEffect } from 'react';
import { ExternalLink, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';

interface StackedDeckViewProps {
  projects: any[];
  activeIdx: number;
  calculateCardMath: (idx: number, activeIdx: number) => any;
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
  // Cache set of project IDs whose iframes have been initialized once
  const [loadedProjectIds, setLoadedProjectIds] = useState<Set<string>>(
    () => new Set([projects[activeIdx]?.id]),
  );

  useEffect(() => {
    // Ensure active card is immediately marked as loaded
    if (projects[activeIdx]?.id) {
      setLoadedProjectIds((prev) => new Set(prev).add(projects[activeIdx].id));
    }
  }, [activeIdx, projects]);

  useEffect(() => {
    // Gradually load remaining unrendered project iframes in background without resetting active ones
    const unrendered = projects.filter((p: any) => !loadedProjectIds.has(p.id));
    if (unrendered.length === 0) return;

    const timer = setTimeout(() => {
      setLoadedProjectIds((prev) => {
        const nextSet = new Set(prev);
        unrendered.forEach((p: any) => nextSet.add(p.id));
        return nextSet;
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [projects, loadedProjectIds]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center px-4 md:px-16 relative [perspective:1400px] pt-12 overflow-hidden animate-in fade-in duration-500">
      {/* Left / Right Carousel Controls */}
      <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 z-50 flex justify-between pointer-events-none">
        <button
          onClick={prevStacked}
          aria-label="Previous project"
          className="pointer-events-auto w-12 h-12 rounded-full border border-white/15 bg-black/60 dark:bg-white/10 hover:bg-cyan-500 hover:text-black hover:border-cyan-500 text-white flex items-center justify-center transition-all shadow-2xl backdrop-blur-md cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextStacked}
          aria-label="Next project"
          className="pointer-events-auto w-12 h-12 rounded-full border border-white/15 bg-black/60 dark:bg-white/10 hover:bg-cyan-500 hover:text-black hover:border-cyan-500 text-white flex items-center justify-center transition-all shadow-2xl backdrop-blur-md cursor-pointer"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* 3D Stack Container */}
      <div className="relative w-full max-w-4xl lg:max-w-5xl h-[65vh] md:h-[75vh] flex items-center justify-center">
        {projects.map((project: any, idx: number) => {
          const cardMath = calculateCardMath(idx, activeIdx);
          const isCenter = cardMath.isCenter;
          const iframeKey = iframeKeys[project.id] || 0;
          const offsetDistance = Math.abs(idx - activeIdx);

          return (
            <div
              key={project.id}
              onClick={() => {
                if (!isCenter) {
                  onSelectProject(project.id);
                }
              }}
              className={`absolute inset-0 w-full h-full rounded-3xl bg-[#0e0f14] dark:bg-[#0c0d12] border border-zinc-200 dark:border-white/15 flex flex-col lg:flex-row p-6 md:p-10 gap-6 md:gap-10 transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu will-change-transform ${
                !isCenter ? 'cursor-pointer hover:border-cyan-500/50 hover:opacity-100 group' : ''
              }`}
              style={{
                transform: isCenter
                  ? 'translate3d(0%, 0px, 0px) rotateY(0deg) scale(1)'
                  : `translate3d(${cardMath.translateX}%, ${cardMath.translateY}px, ${cardMath.translateZ}px) rotateY(${cardMath.rotateY}deg) scale(${cardMath.scale})`,
                zIndex: cardMath.zIndex,
                opacity: cardMath.opacity,
                transitionDelay: `${offsetDistance * 60}ms`,
                transformStyle: 'preserve-3d',
                boxShadow: isCenter
                  ? '0 35px 70px -15px rgba(0,0,0,0.7), 0 0 50px rgba(6,182,212,0.2)'
                  : '0 20px 40px -10px rgba(0,0,0,0.5)',
              }}
            >
              {/* Background gradient hint */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.accentColor} ${
                  isCenter ? 'opacity-10' : 'opacity-5'
                } transition-opacity duration-500 pointer-events-none rounded-3xl`}
              />

              {/* Left Side: Metadata */}
              <div className="flex flex-col justify-between lg:w-2/5 relative z-10 text-left">
                <div className="flex flex-col items-start gap-4">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#c89a43] bg-[#c89a43]/10 px-4 py-1.5 rounded-full border border-[#c89a43]/25 backdrop-blur-md shadow-[0_0_15px_rgba(200,154,67,0.15)] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c89a43] animate-pulse" />
                    {project.category}
                  </span>

                  <h3 className="text-3xl md:text-5xl font-extrabold tracking-tighter font-heading leading-tight bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
                    {project.title}
                  </h3>

                  <p className="text-xs md:text-base text-gray-400 font-normal leading-relaxed font-sans mt-1 line-clamp-3 md:line-clamp-none">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6 bg-black/40 dark:bg-white/[0.03] border border-white/10 p-4 rounded-2xl max-w-xs flex flex-col gap-1 backdrop-blur-xl">
                  <div className="text-2xl font-extrabold text-white tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {project.metric}
                  </div>
                  <div className="text-[9px] uppercase tracking-widest text-[#c89a43] font-mono">
                    {project.metricLabel}
                  </div>
                </div>
              </div>

              {/* Right Side: Iframe Browser Mockup */}
              <div className="flex-1 h-full lg:w-3/5 min-h-[250px] flex flex-col relative z-10 [perspective:1200px]">
                {project.url ? (
                  <div className="w-full h-full rounded-2xl overflow-hidden bg-[#0d0d0d] border border-white/10 flex flex-col shadow-2xl">
                    {/* Chrome Header */}
                    <div className="w-full h-10 bg-zinc-100 dark:bg-[#121212] border-b border-zinc-200 dark:border-white/5 flex items-center justify-between px-4 gap-4 shrink-0">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                      </div>

                      <div className="flex-1 max-w-xs h-6 rounded-md bg-white dark:bg-black/40 border border-zinc-200 dark:border-white/5 px-2.5 flex items-center justify-between text-[9px] font-mono text-zinc-500 dark:text-gray-500 overflow-hidden">
                        <span className="truncate select-all">{project.url}</span>
                        {isCenter && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              reloadIframe(project.id);
                            }}
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
                        onClick={(e) => e.stopPropagation()}
                        className="text-[10px] text-zinc-600 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-white transition-colors flex items-center gap-1 font-sans cursor-pointer"
                      >
                        <span>Launch</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    {/* Iframe Window */}
                    <div
                      className="w-full flex-1 bg-white relative"
                      onWheelCapture={(e) => {
                        if (isCenter) e.stopPropagation();
                      }}
                      onTouchMoveCapture={(e) => {
                        if (isCenter) e.stopPropagation();
                      }}
                    >
                      <div className="absolute inset-0 bg-[#0d0d0d] flex items-center justify-center z-0 pointer-events-none">
                        <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                      </div>

                      {loadedProjectIds.has(project.id) ? (
                        <iframe
                          key={`${project.id}-${iframeKey}`}
                          src={project.url}
                          title={`Live preview of ${project.title}`}
                          className={`w-full h-full border-none relative z-10 bg-white ${
                            isCenter ? 'pointer-events-auto' : 'pointer-events-none'
                          }`}
                          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
                          loading="eager"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-[#0d0d0d] flex items-center justify-center z-10">
                          <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                        </div>
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
          );
        })}
      </div>

      {/* Dot Indicator at bottom of Stack Deck */}
      <div className="absolute bottom-8 z-50 flex items-center gap-2">
        {projects.map((p: any, idx: number) => (
          <button
            key={p.id}
            onClick={() => {
              onSelectProject(p.id);
            }}
            className="transition-all duration-300 rounded-full cursor-pointer"
            style={{
              width: idx === activeIdx ? '24px' : '8px',
              height: '8px',
              background: idx === activeIdx ? '#06b6d4' : 'rgba(255,255,255,0.2)',
            }}
          />
        ))}
      </div>
    </div>
  );
});
