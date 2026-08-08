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
  const [isStacked, setIsStacked] = useState<boolean>(true);
  const [stackedActiveId, setStackedActiveId] = useState<string | null>(null);
  const [screenWidth, setScreenWidth] = useState<number>(1200);

  const projects = useMemo(() => workContent.items || [], [workContent]);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeIdx = useMemo(() => {
    return projects.findIndex((p: any) => p.id === (stackedActiveId || projects[0]?.id));
  }, [projects, stackedActiveId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
    return () => clearTimeout(timer);
  }, [isStacked]);

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

      const translateXMult = isMobile ? 18 : isTablet ? 24 : 28;
      const rotateYMax = isMobile ? 0 : isTablet ? 10 : 18;
      const translateZMult = isMobile ? 35 : 70;

      return {
        translateX: direction * (translateXMult * absOffset + 1),
        translateY: absOffset * 3,
        translateZ: -translateZMult * absOffset,
        rotateY: -direction * Math.min(rotateYMax, absOffset * 8),
        scale: Math.max(0.82, 0.92 - absOffset * 0.06),
        zIndex: 40 - absOffset * 5,
        opacity: 1,
        isCenter: false,
      };
    },
    [screenWidth],
  );

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
      });

      return () => {
        st.kill();
      };
    },
    { scope: sectionRef, dependencies: [projects, isStacked] },
  );

  const detectReadingUser = useCallback(
    (projectId: string) => {
      setHoveredProjectId(projectId);

      if (!isStacked) {
        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
          const targetIdx = projects.findIndex((p: any) => p.id === projectId);
          const panels = gsap.utils.toArray('.work-panel');

          if (targetIdx !== -1 && wrapperRef.current && panels.length > 0) {
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
      className={`w-full overflow-hidden bg-[#fcfbf9] relative z-20 transition-all duration-300 flex flex-col justify-center items-center ${
        isStacked ? 'h-auto min-h-[90vh] sm:min-h-screen py-16' : 'h-screen pt-12 pb-6'
      }`}
    >
      {/* Centered Section Header */}
      <div className="w-full max-w-xl mx-auto text-center px-4 mb-4 z-50 shrink-0 pointer-events-none">
        <span className="text-xs font-mono text-[#b38730] font-semibold uppercase tracking-widest block mb-1">
          {workContent.title || 'OUR WORK'}
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#0f1117] font-heading">
          FEATURED PROJECTS
        </h2>
      </div>

      {!isStacked ? (
        <div
          ref={wrapperRef}
          className="flex-1 flex w-[400vw] sm:w-[400vw] items-center will-change-transform transform-gpu"
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
