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
  projects = [],
  activeIdx = 0,
  calculateCardMath,
  iframeKeys = {},
  onSelectProject,
  prevStacked,
  nextStacked,
  reloadIframe,
}: StackedDeckViewProps) {
  const safeActiveIdx = Math.max(0, Math.min(activeIdx, projects.length - 1));
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cache set of project IDs whose iframes have been initialized once
  const [loadedProjectIds, setLoadedProjectIds] = useState<Set<string>>(
    () => new Set(projects[safeActiveIdx]?.id ? [projects[safeActiveIdx].id] : []),
  );

  useEffect(() => {
    if (projects[safeActiveIdx]?.id) {
      setLoadedProjectIds((prev) => new Set(prev).add(projects[safeActiveIdx].id));
    }
  }, [safeActiveIdx, projects]);

  useEffect(() => {
    const unrendered = projects.filter((p: any) => p?.id && !loadedProjectIds.has(p.id));
    if (unrendered.length === 0) return;

    const timer = setTimeout(() => {
      setLoadedProjectIds((prev) => {
        const nextSet = new Set(prev);
        unrendered.forEach((p: any) => p?.id && nextSet.add(p.id));
        return nextSet;
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [projects, loadedProjectIds]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (diff > 35) {
      nextStacked(); // Swiped left -> next card
    } else if (diff < -35) {
      prevStacked(); // Swiped right -> prev card
    }
    setTouchStart(null);
  };

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="w-full h-full flex flex-col justify-center items-center px-[1vw] sm:px-[3vw] relative [perspective:1400px] pt-[1vh] pb-[4vh] overflow-hidden animate-in fade-in duration-500 select-none"
    >
      {/* Left / Right Carousel Controls - High Z-Index & Visibility */}
      <div className="absolute inset-x-[0.5vw] sm:inset-x-[1vw] top-1/2 -translate-y-1/2 z-[60] flex justify-between pointer-events-none">
        <button
          onClick={prevStacked}
          aria-label="Previous project"
          className="work-nav-btn ring-2 ring-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
          title="Previous project"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </button>
        <button
          onClick={nextStacked}
          aria-label="Next project"
          className="work-nav-btn ring-2 ring-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
          title="Next project"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </button>
      </div>

      {/* 3D Stack Container - Decreased Mobile Height (h-[63vh], min-h-[390px]) */}
      <div className="relative w-[95vw] sm:w-[86vw] max-w-[1150px] min-w-[280px] h-[63vh] sm:h-[68vh] lg:h-[70vh] max-h-[680px] min-h-[390px] flex items-center justify-center">
        {projects.map((project: any, idx: number) => {
          const cardMath = calculateCardMath(idx, safeActiveIdx);
          const isCenter = cardMath.isCenter;
          const iframeKey = iframeKeys[project.id] || 0;
          const offsetDistance = Math.abs(idx - safeActiveIdx);

          return (
            <div
              key={project.id}
              onClick={() => {
                if (!isCenter) {
                  onSelectProject(project.id);
                }
              }}
              className={`absolute inset-0 work-card-container ${
                !isCenter ? 'cursor-pointer hover:border-cyan-500/50 group' : ''
              }`}
              style={{
                transform: isCenter
                  ? 'translate3d(0%, 0px, 0px) rotateY(0deg) scale(1)'
                  : `translate3d(${cardMath.translateX}%, ${cardMath.translateY}px, ${cardMath.translateZ}px) rotateY(${cardMath.rotateY}deg) scale(${cardMath.scale})`,
                zIndex: cardMath.zIndex,
                opacity: 1,
                transitionDelay: `${offsetDistance * 60}ms`,
                transformStyle: 'preserve-3d',
                boxShadow: isCenter ? 'var(--shadow-card-glow)' : 'var(--shadow-card-subtle)',
              }}
            >
              {/* Opaque Background Layer to prevent bleed-through */}
              <div className="absolute inset-0 bg-[#0c0d12] rounded-3xl pointer-events-none z-0" />

              {/* Background gradient hint */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.accentColor || ''} ${
                  isCenter ? 'opacity-10' : 'opacity-5'
                } transition-opacity duration-500 pointer-events-none rounded-3xl z-0`}
              />

              {/* Left Side: Metadata */}
              <div className="work-meta-panel">
                <div className="flex flex-col items-start gap-2 sm:gap-3">
                  <span className="work-badge-tag">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#cd9d3d] animate-pulse" />
                    {project.category}
                  </span>

                  <h3 className="work-heading-title">{project.title}</h3>

                  <p className="work-desc-text">{project.description}</p>
                </div>

                <div className="work-metric-box">
                  <div className="work-metric-val">{project.metric}</div>
                  <div className="work-metric-lbl">{project.metricLabel}</div>
                </div>
              </div>

              {/* Right Side: Website Browser Mockup */}
              <div className="work-mockup-container">
                {project.url ? (
                  <div className="w-full h-full rounded-2xl overflow-hidden bg-[#0d0d0d] border border-white/10 flex flex-col shadow-2xl">
                    {/* Chrome Header */}
                    <div className="work-chrome-header">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                      </div>

                      <div className="flex-1 max-w-xs h-5 sm:h-6 rounded-md bg-black/60 border border-white/10 px-2 flex items-center justify-between text-[9px] font-mono text-gray-400 overflow-hidden">
                        <span className="truncate select-all">{project.url}</span>
                        {isCenter && !isMobile && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              reloadIframe(project.id);
                            }}
                            className="p-0.5 hover:text-cyan-400 transition-colors cursor-pointer flex items-center justify-center"
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
                        className="text-[10px] text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-1 font-sans cursor-pointer shrink-0"
                      >
                        <span>Launch Site</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    {/* Window content */}
                    <div className="work-iframe-window">
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
          );
        })}
      </div>

      {/* Dot Indicators at bottom of Stack Deck */}
      <div className="absolute bottom-[1.5vh] z-50 flex items-center gap-2">
        {projects.map((p: any, idx: number) => (
          <button
            key={p.id}
            onClick={() => {
              onSelectProject(p.id);
            }}
            className="transition-all duration-300 rounded-full cursor-pointer"
            style={{
              width: idx === safeActiveIdx ? '24px' : '8px',
              height: '8px',
              background: idx === safeActiveIdx ? '#06b6d4' : 'rgba(255,255,255,0.25)',
            }}
          />
        ))}
      </div>
    </div>
  );
});
