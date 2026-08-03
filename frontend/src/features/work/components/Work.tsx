'use client';

import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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

  // Consistent SSR initial state (1200) to prevent hydration mismatches
  const [screenWidth, setScreenWidth] = useState<number>(1200);

  const projects = useMemo(() => workContent.items || [], [workContent]);

  // Handle window resize for dynamic mobile/tablet/desktop 3D card math after client mount
  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Find active index in projects array memoized
  const activeIdx = useMemo(() => {
    return projects.findIndex((p: any) => p.id === (stackedActiveId || projects[0]?.id));
  }, [projects, stackedActiveId]);

  // Refresh ScrollTrigger whenever view mode changes so vertical page scrolling is smooth
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
    return () => clearTimeout(timer);
  }, [isStacked]);

  // Mobile & Tablet Optimized 3D card layout position calculator
  const calculateCardMath = useCallback(
    (idx: number, activeIndex: number) => {
      const offset = idx - activeIndex;
      const isCenter = offset === 0;
      const absOffset = Math.abs(offset);

      if (isCenter) {
        return {
          translateX: 0,
          translateY: 0,
          translateZ: 40,
          rotateY: 0,
          scale: 1,
          zIndex: 50,
          opacity: 1,
          isCenter: true,
        };
      }

      const direction = offset < 0 ? -1 : 1;
      const isMobile = screenWidth < 640;
      const isTablet = screenWidth >= 640 && screenWidth < 1024;

      // Adjust translation & rotation based on screen size
      const translateXMult = isMobile ? 12 : isTablet ? 16 : 20;
      const rotateYMax = isMobile ? 0 : isTablet ? 8 : 16;
      const translateZMult = isMobile ? 35 : 60;

      return {
        translateX: direction * (translateXMult * absOffset + 1),
        translateY: absOffset * 3,
        translateZ: -translateZMult * absOffset,
        rotateY: -direction * Math.min(rotateYMax, absOffset * 8),
        scale: Math.max(0.85, 0.94 - absOffset * 0.05),
        zIndex: 40 - absOffset * 5,
        opacity: 1,
        isCenter: false,
      };
    },
    [screenWidth],
  );

  // Handle GSAP Horizontal Scroll Pinning when in SlideView mode
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
      className={`w-full overflow-hidden bg-[var(--background)] relative z-20 transition-all duration-300 ${
        isStacked
          ? 'h-auto min-h-[90vh] sm:min-h-screen py-[4vh] md:py-[8vh] flex flex-col justify-center items-center'
          : 'h-screen'
      }`}
    >
      {/* Title Overlap */}
      <div className="absolute top-[2.5vh] left-[4vw] right-[4vw] z-50 flex items-center justify-between pointer-events-none">
        <div className="text-white">
          <span className="text-[clamp(0.65rem,1vw,0.85rem)] font-mono text-gray-400 uppercase tracking-widest block">
            {workContent.title}
          </span>
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
              onMouseLeave={() => setHoveredProjectId(null)}
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
