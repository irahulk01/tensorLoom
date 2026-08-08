'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Command, Terminal, Sparkles, AlertTriangle, ArrowRight } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [terminalInput, setTerminalInput] = useState('');
  const [logs, setLogs] = useState<string[]>([
    'System status: ERR_ROUTE_NOT_FOUND',
    'Type "home" or press "/" key on keyboard to return to base.',
  ]);

  // Global "/" keyboard listener to navigate home automatically
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid triggering when user is typing in terminal or input element
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea') return;

      if (e.key === '/') {
        e.preventDefault();
        router.push('/');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  // Interactive Quantum Particle System Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const mouse = { x: width / 2, y: height / 2, radius: 180, isClicked: false };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseClick = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.isClicked = true;

      // Burst particles outward on click
      particles.forEach((p) => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 250) {
          p.vx += (dx / dist) * 12;
          p.vy += (dy / dist) * 12;
        }
      });

      setTimeout(() => {
        mouse.isClicked = false;
      }, 300);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleMouseClick);

    // Create particle network
    const numParticles = Math.min(100, Math.floor((width * height) / 12000));
    const particles = Array.from({ length: numParticles }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      size: Math.random() * 2 + 1,
      baseAlpha: Math.random() * 0.5 + 0.2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw particle connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 242, 255, ${0.15 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Update & render particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse gravity pull
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x -= (dx / dist) * force * 2;
          p.y -= (dy / dist) * force * 2;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 242, 255, ${p.baseAlpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleMouseClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    setTerminalInput('');

    if (!cmd) return;

    if (cmd === 'home' || cmd === '/' || cmd === 'cd /') {
      setLogs((prev) => [...prev, `$ ${cmd}`, 'Navigating to base homepage...']);
      setTimeout(() => router.push('/'), 400);
    } else if (cmd === 'help') {
      setLogs((prev) => [
        ...prev,
        `$ ${cmd}`,
        'Available commands:',
        '  home | /   -> Return to Homepage',
        '  ping      -> Test node connectivity',
        '  clear     -> Clear terminal output',
      ]);
    } else if (cmd === 'ping') {
      setLogs((prev) => [...prev, `$ ${cmd}`, 'pong: 12ms latency [tensorLoom Node OK]']);
    } else if (cmd === 'clear') {
      setLogs([]);
    } else {
      setLogs((prev) => [
        ...prev,
        `$ ${cmd}`,
        `Command "${cmd}" not recognized. Type "help" or "home".`,
      ]);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[var(--background)] text-[var(--foreground)] flex flex-col items-center justify-center p-6 overflow-hidden select-none">
      {/* Background Noise & Interactive Canvas */}
      <div className="bg-noise" />
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Main Glassmorphic 404 Container */}
      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center text-center">
        {/* Minimal Error Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-8 backdrop-blur-md"
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>ERR_404_PAGE_NOT_FOUND</span>
        </motion.div>

        {/* Dynamic Glowing 404 Typography */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative mb-6"
        >
          <h1 className="text-8xl md:text-[13rem] font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-white/20 select-none drop-shadow-2xl leading-none">
            404
          </h1>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-xl md:text-2xl font-light text-gray-300 max-w-xl mb-10 leading-relaxed"
        >
          The page or route you requested does not exist in this quantum space.
        </motion.p>

        {/* Primary CTA & Interactive "/" Keyboard Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={() => router.push('/')}
            className="group px-8 py-4 bg-white text-black rounded-full font-bold text-sm md:text-base flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-xl"
            title="Press '/' on your keyboard to navigate home"
          >
            <Home className="w-4 h-4 text-black" />
            <span>Return Home</span>
            <kbd className="ml-2 px-2 py-0.5 text-xs font-mono bg-black/10 text-black rounded border border-black/20 group-hover:bg-black/20 transition-colors">
              /
            </kbd>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Interactive Node Terminal Console */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="w-full max-w-xl glass-depth glass-rim-light rounded-2xl p-6 border border-white/10 text-left font-mono text-xs shadow-2xl backdrop-blur-xl"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="text-gray-300 font-semibold">tensorLoom Node Console</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            </div>
          </div>

          <div className="space-y-2 mb-4 max-h-36 overflow-y-auto font-mono text-gray-300 scrollbar-none">
            {logs.map((log, i) => (
              <div
                key={i}
                className={log.startsWith('$') ? 'text-cyan-400 font-bold' : 'text-gray-400'}
              >
                {log}
              </div>
            ))}
          </div>

          {/* Terminal Input Form */}
          <form
            onSubmit={handleTerminalSubmit}
            className="flex items-center gap-2 border-t border-white/10 pt-3"
          >
            <span className="text-cyan-400 font-bold">&gt;</span>
            <input
              type="text"
              placeholder="Type 'home', 'help', or 'ping'..."
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              className="flex-1 bg-transparent border-none text-xs text-white placeholder-gray-600 focus:outline-none focus:ring-0"
            />
            <button
              type="submit"
              className="px-3 py-1 bg-white/10 hover:bg-white/20 text-gray-300 text-[10px] font-mono rounded transition-colors cursor-pointer"
            >
              Run
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
