'use client';

import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock } from 'lucide-react';
import { SlideView } from './SlideView';
import { StackedDeckView } from './StackedDeckView';

gsap.registerPlugin(ScrollTrigger);

interface WorkProps {
  workContent: any;
}

export function Work({ workContent }: WorkProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [iframeKeys, setIframeKeys] = useState<Record<string, number>>({});
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [isStacked, setIsStacked] = useState<boolean>(false);
  const [stackedActiveId, setStackedActiveId] = useState<string | null>(null);
  const [hoverTimerProgress, setHoverTimerProgress] = useState<number>(0);

  const projects = useMemo(() => workContent.items || [], [workContent]);

  // Find active index in projects array memoized
  const activeIdx = useMemo(() => {
    return projects.findIndex((p: any) => p.id === (stackedActiveId || projects[0]?.id));
  }, [projects, stackedActiveId]);

  // Memoized 3D card layout position calculator
  const calculateCardMath = useCallback((idx: number, activeIndex: number) => {
    const offset = idx - activeIndex;
    const isCenter = offset === 0;
    const absOffset = Math.abs(offset);

    if (isCenter) {
      return {
        translateX: 0,
        translateY: 0,
        translateZ: 50,
        rotateY: 0,
        scale: 1,
        zIndex: 50,
        opacity: 1,
        isCenter: true,
      };
    }

    const direction = offset < 0 ? -1 : 1;
    return {
      translateX: direction * (32 * absOffset + 4),
      translateY: absOffset * 4,
      translateZ: -90 * absOffset,
      rotateY: -direction * Math.min(22, absOffset * 14),
      scale: Math.max(0.8, 0.94 - absOffset * 0.06),
      zIndex: 40 - absOffset * 5,
      opacity: Math.max(0.65, 0.9 - absOffset * 0.12),
      isCenter: false,
    };
  }, []);

  // Scroll stop detection timer ref
  const scrollStopTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Handle GSAP Horizontal Scroll Pinning
  useGSAP(
    () => {
      if (!wrapperRef.current || !sectionRef.current || isStacked) return;

      const panels = gsap.utils.toArray('.work-panel');
      const totalWidth = wrapperRef.current?.scrollWidth || window.innerWidth * panels.length;

      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        start: 'top top',
        end: () => '+=' + (totalWidth - window.innerWidth),
        animation: gsap.to(panels, {
          xPercent: -100 * (panels.length - 1),
          ease: 'none',
        }),
        onRefresh: () => {
          ScrollTrigger.update();
        },
      });

      return () => {
        st.kill();
      };
    },
    { scope: sectionRef, dependencies: [projects, isStacked] },
  );

  // Timer interval for progress bar feedback (3 seconds reading detection)
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (hoveredProjectId && !isStacked) {
      setHoverTimerProgress(0);
      const startTime = Date.now();
      interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min((elapsed / 3000) * 100, 100);
        setHoverTimerProgress(progress);
      }, 30);
    } else {
      setHoverTimerProgress(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [hoveredProjectId, isStacked]);

  // Explicit Reading Detection trigger function (3 second reading duration threshold)
  const detectReadingUser = useCallback(
    (projectId: string) => {
      setHoveredProjectId(projectId);

      if (!isStacked) {
        if (timerRef.current) clearTimeout(timerRef.current);

        // 3 Second Reading Detection Timer
        timerRef.current = setTimeout(() => {
          const targetIdx = projects.findIndex((p: any) => p.id === projectId);
          const panels = gsap.utils.toArray('.work-panel');

          if (targetIdx !== -1 && wrapperRef.current && panels.length > 0) {
            // Smoothly glide horizontal scroll to center card first before opening 3D Deck view
            gsap.to(panels, {
              xPercent: -100 * targetIdx,
              scale: 0.98,
              duration: 0.75,
              ease: 'power2.inOut',
              onComplete: () => {
                setStackedActiveId(projectId);
                setIsStacked(true);
              },
            });
          } else {
            setStackedActiveId(projectId);
            setIsStacked(true);
          }
        }, 3000);
      }
    },
    [isStacked, projects],
  );

  const handleMouseEnter = useCallback(
    (projectId: string) => {
      detectReadingUser(projectId);
    },
    [detectReadingUser],
  );

  const handleMouseLeave = useCallback(() => {
    if (!isStacked) {
      if (timerRef.current) clearTimeout(timerRef.current);
      setHoveredProjectId(null);
      setHoverTimerProgress(0);
    }
  }, [isStacked]);

  const reloadIframe = useCallback((projectId: string) => {
    setIframeKeys((prev) => ({
      ...prev,
      [projectId]: (prev[projectId] || 0) + 1,
    }));
  }, []);

  const prevStacked = useCallback(() => {
    const nextIdx = (activeIdx - 1 + projects.length) % projects.length;
    setStackedActiveId(projects[nextIdx].id);
  }, [activeIdx, projects.length]);

  const nextStacked = useCallback(() => {
    const nextIdx = (activeIdx + 1) % projects.length;
    setStackedActiveId(projects[nextIdx].id);
  }, [activeIdx, projects.length]);

  return (
    <section
      id="work"
      ref={sectionRef}
      className={`w-full overflow-hidden bg-[var(--background)] relative z-20 ${
        isStacked ? 'h-auto min-h-screen py-12' : 'h-screen'
      }`}
    >
      {/* Title Overlap & Control Badge */}
      <div className="absolute top-8 md:top-14 left-6 md:left-12 right-6 md:right-12 z-50 flex items-center justify-between pointer-events-none">
        <div className="text-white">
          <span className="text-xs font-mono text-gray-400 uppercase tracking-widest block mb-1">
            {workContent.title}
          </span>
        </div>

        {/* 3s Reading Timer Indicator */}
        <div className="pointer-events-auto flex items-center gap-3">
          {!isStacked && hoveredProjectId && hoverTimerProgress > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/70 border border-[#c89a43]/30 text-[10px] font-mono text-[#c89a43] backdrop-blur-xl shadow-[0_0_20px_rgba(200,154,67,0.15)]">
              <Clock className="w-3.5 h-3.5 animate-spin text-[#c89a43]" />
              <span>
                Reading detected... Stacking in{' '}
                {Math.max(1, Math.ceil(3 - (hoverTimerProgress * 3) / 100))}s
              </span>
              <div className="w-14 h-1 bg-white/10 rounded-full overflow-hidden ml-1">
                <div
                  className="h-full bg-[#c89a43] transition-all duration-75 shadow-[0_0_8px_#c89a43]"
                  style={{ width: `${hoverTimerProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Clean Component Architecture: SlideView vs StackedDeckView */}
      {!isStacked ? (
        <div
          ref={wrapperRef}
          className="flex h-full w-[400vw] sm:w-[400vw] will-change-transform transform-gpu"
        >
          {projects.map((project: any) => (
            <SlideView
              key={project.id}
              project={project}
              isHovered={hoveredProjectId === project.id}
              iframeKey={iframeKeys[project.id] || 0}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              reloadIframe={reloadIframe}
            />
          ))}
        </div>
      ) : (
        <StackedDeckView
          projects={projects}
          activeIdx={activeIdx}
          calculateCardMath={calculateCardMath}
          iframeKeys={iframeKeys}
          onSelectProject={setStackedActiveId}
          prevStacked={prevStacked}
          nextStacked={nextStacked}
          reloadIframe={reloadIframe}
        />
      )}
    </section>
  );
}
