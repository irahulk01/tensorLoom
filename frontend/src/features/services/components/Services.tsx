'use client';

import { useRef, useEffect, useState } from 'react';

// Tab configuration with high-fidelity content details
const capabilitiesData = [
  {
    id: 'Websites',
    title: 'Business Websites',
    subtitle:
      'From company profiles to enterprise platforms, we build websites that establish trust and generate enquiries.',
    checklist: [
      'Corporate Websites',
      'Ecommerce Platforms',
      'Portfolio Showcase',
      'Healthcare Portals',
      'Real Estate Listings',
      'Education Systems',
      'Manufacturing Platforms',
    ],
    mockupType: 'browser',
    mockupContent: {
      url: 'https://tensorloom.com/dashboard',
      title: 'Enterprise Platform',
      body: (
        <div className="p-6 flex flex-col gap-4 text-xs font-mono text-zinc-400 h-full justify-between">
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <span className="text-white font-semibold">tensorLoom Console</span>
            <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded text-[10px]">
              Active
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/5 border border-white/10 p-3 rounded-lg flex flex-col gap-1">
              <span className="text-[10px] text-zinc-500">API Latency</span>
              <span className="text-white text-sm font-semibold">12ms</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-3 rounded-lg flex flex-col gap-1">
              <span className="text-[10px] text-zinc-500">Server Load</span>
              <span className="text-white text-sm font-semibold">14.2%</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-3 rounded-lg flex flex-col gap-1">
              <span className="text-[10px] text-zinc-500">Node Status</span>
              <span className="text-emerald-400 text-sm font-semibold">Healthy</span>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 p-4 rounded-lg flex-1 flex flex-col gap-2">
            <span className="text-zinc-500 text-[10px]">System Logs</span>
            <div className="text-[10px] text-zinc-400 flex flex-col gap-1 overflow-hidden font-mono">
              <span className="text-zinc-500">[14:02:11] Init database cluster connection...</span>
              <span className="text-emerald-500">
                [14:02:12] DB Cluster connected (8 replica nodes)
              </span>
              <span className="text-zinc-500">[14:02:15] Load balancer health check PASSED</span>
            </div>
          </div>
        </div>
      ),
    },
  },
  {
    id: 'Apps',
    title: 'Mobile & Web Apps',
    subtitle:
      'Custom mobile apps and SaaS platforms designed for seamless user experiences, instant reactivity, and high scalability.',
    checklist: [
      'iOS & Android Apps',
      'SaaS Web Applications',
      'Customer Cloud Portals',
      'Real-time Dashboards',
      'Custom CRM Systems',
      'Proprietary Databases',
    ],
    mockupType: 'phone',
    mockupContent: {
      title: 'Active Session',
      body: (
        <div className="p-4 flex flex-col gap-4 text-xs font-mono text-zinc-400 h-full">
          <div className="flex justify-between items-center border-b border-white/5 pb-2 mt-4">
            <span className="text-white font-bold text-xs">tL Mobile</span>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className="flex-1 flex flex-col justify-center items-center gap-2">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-indigo-500/20">
              tL
            </div>
            <span className="text-white text-xs font-medium mt-2">Deploying Build #4021</span>
            <span className="text-zinc-500 text-[9px]">Target: AWS us-east-1</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-3 rounded-lg flex flex-col gap-1.5">
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-indigo-500 h-full w-[70%]" />
            </div>
            <span className="text-[9px] text-zinc-500 text-center">Uploading assets... 70%</span>
          </div>
        </div>
      ),
    },
  },
  {
    id: 'AI',
    title: 'AI Agents & Chatbots',
    subtitle:
      'Intelligent automation and natural language agents that integrate with your internal APIs and data pipelines to streamline processes.',
    checklist: [
      'Autonomous AI Agents',
      'Smart Client Chatbots',
      'LLM Integrations (Gemini/OpenAI)',
      'Custom NLP Pipelines',
      'RAG & Vector Database Setup',
      'Semantic Search Engines',
    ],
    mockupType: 'browser',
    mockupContent: {
      url: 'https://tensorloom.com/ai-console',
      title: 'Agent Workspace',
      body: (
        <div className="p-4 flex flex-col justify-between text-xs font-mono text-zinc-400 h-full">
          <div className="flex flex-col gap-3 overflow-y-auto max-h-[170px]">
            <div className="flex gap-2">
              <span className="text-zinc-500">[User]:</span>
              <span className="text-white">Run analytical report on Q3 database latency.</span>
            </div>
            <div className="flex gap-2 bg-indigo-500/5 border border-indigo-500/10 p-2.5 rounded-lg">
              <span className="text-indigo-400 font-bold">[Agent]:</span>
              <span className="text-zinc-300">
                Searching vector DB... Found 3 logs. Average query time is 14ms (12% decrease).
                Generating chart...
              </span>
            </div>
          </div>
          <div className="flex gap-2 items-center border-t border-white/5 pt-3">
            <span className="text-zinc-600">&gt;</span>
            <span className="text-zinc-400 animate-pulse">Ask agent anything...</span>
          </div>
        </div>
      ),
    },
  },
  {
    id: 'Marketing',
    title: 'Performance Marketing',
    subtitle:
      'Data-driven marketing systems and conversion funnel optimization to establish brand authority and capture high-intent leads.',
    checklist: [
      'SEO Strategy & Auditing',
      'Conversion Funnel Optimization',
      'Performance Marketing Systems',
      'Client Acquisition Strategy',
      'Data Analytics Dashboarding',
    ],
    mockupType: 'browser',
    mockupContent: {
      url: 'https://tensorloom.com/insights',
      title: 'Marketing Dashboard',
      body: (
        <div className="p-6 flex flex-col gap-4 text-xs font-mono text-zinc-400 h-full">
          <div className="flex justify-between items-center">
            <span className="text-white font-semibold">User Acquisition</span>
            <span className="text-emerald-400 font-bold">+28.4%</span>
          </div>
          {/* Custom SVG Line Chart */}
          <div className="w-full h-24 bg-white/5 border border-white/10 rounded-lg p-2 relative flex items-end">
            <svg
              className="w-full h-full text-indigo-500"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d="M0,90 Q15,80 30,50 T60,30 T90,10 T100,0"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]"
              />
            </svg>
            <div className="absolute bottom-2 left-4 text-[9px] text-zinc-600">Jan</div>
            <div className="absolute bottom-2 right-4 text-[9px] text-zinc-600">Jun</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg">
              <span className="text-[10px] text-zinc-500">Impressions</span>
              <div className="text-white font-bold text-sm">1.2M</div>
            </div>
            <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg">
              <span className="text-[10px] text-zinc-500">Conversion Rate</span>
              <div className="text-white font-bold text-sm">4.82%</div>
            </div>
          </div>
        </div>
      ),
    },
  },
  {
    id: 'Branding',
    title: 'Visual Branding',
    subtitle:
      'Cohesive brand identities and design systems crafted meticulously to resonate with customers across all mediums.',
    checklist: [
      'Logo & Wordmark Systems',
      'Visual Style Guidelines',
      'Tailwind Design Systems',
      'Corporate Presentation Assets',
      'Interactive Design Guidelines',
    ],
    mockupType: 'browser',
    mockupContent: {
      url: 'https://tensorloom.com/brand-hub',
      title: 'Design Tokens',
      body: (
        <div className="p-6 flex flex-col gap-6 text-xs font-mono text-zinc-400 h-full">
          <div className="flex flex-col gap-1">
            <span className="text-white font-semibold">tensorLoom Style Guide</span>
            <span className="text-zinc-600 text-[10px]">Active Design System Tokens</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div className="flex flex-col gap-1 items-center">
              <div className="w-10 h-10 rounded bg-[#6366F1] border border-white/10" />
              <span className="text-[8px] text-zinc-500">Indigo</span>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <div className="w-10 h-10 rounded bg-[#a855f7] border border-white/10" />
              <span className="text-[8px] text-zinc-500">Purple</span>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <div className="w-10 h-10 rounded bg-[#000000] border border-white/10" />
              <span className="text-[8px] text-zinc-500">Pure Black</span>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <div className="w-10 h-10 rounded bg-[#ffffff] border border-white/10" />
              <span className="text-[8px] text-zinc-500">Pure White</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[9px] text-zinc-500">Typography Suite</span>
            <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg flex flex-col gap-0.5">
              <span className="text-white font-sans text-xs font-bold">
                Inter Display ExtraBold
              </span>
              <span className="text-zinc-500 text-[9px]">Geometrical sans-serif font family</span>
            </div>
          </div>
        </div>
      ),
    },
  },
  {
    id: 'Automation',
    title: 'Process Automation',
    subtitle:
      'Streamline repetitive daily operations with custom script bots, API integrations, and robust database architectures.',
    checklist: [
      'API Integration Pipelines',
      'Zapier & Make System Bots',
      'Automated Data Scraping',
      'RPA (Robotic Process Automation)',
      'Legacy System Synchronization',
      'Automated Email & SMS Alerts',
    ],
    mockupType: 'browser',
    mockupContent: {
      url: 'https://tensorloom.com/nodes',
      title: 'Workflow Orchestration',
      body: (
        <div className="p-6 flex flex-col gap-4 text-xs font-mono text-zinc-400 h-full">
          <div className="flex justify-between items-center">
            <span className="text-white font-semibold">Active Pipeline: SyncNodes</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          {/* Node graph visualization simulation */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex justify-between items-center gap-2 relative">
            <div className="bg-zinc-800 border border-white/10 px-2 py-1 rounded text-[10px] text-white">
              Webhook
            </div>
            <div className="flex-1 h-[2px] bg-gradient-to-r from-emerald-500 to-indigo-500 relative">
              <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            </div>
            <div className="bg-indigo-950 border border-indigo-500/20 px-2 py-1 rounded text-[10px] text-indigo-300">
              AI Parser
            </div>
            <div className="flex-1 h-[2px] bg-indigo-500" />
            <div className="bg-zinc-800 border border-white/10 px-2 py-1 rounded text-[10px] text-white">
              Postgres
            </div>
          </div>
          <div className="text-[10px] text-zinc-500 flex justify-between">
            <span>Runs: 14,204</span>
            <span>Success Rate: 100%</span>
          </div>
        </div>
      ),
    },
  },
];

interface ServicesProps {
  servicesContent?: any;
}

export function Services({ servicesContent }: ServicesProps) {
  const container = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeTab, setActiveTab] = useState('Websites');

  const currentCap = capabilitiesData.find((cap) => cap.id === activeTab) || capabilitiesData[0];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (ctx.canvas.width = canvas.offsetWidth);
    let h = (ctx.canvas.height = canvas.offsetHeight);
    let nt = 0;

    const colors = [
      'rgba(99, 102, 241, 0.48)',
      'rgba(168, 85, 247, 0.45)',
      'rgba(59, 130, 246, 0.45)',
      'rgba(236, 72, 153, 0.38)',
      'rgba(20, 184, 166, 0.40)',
    ];

    const drawWave = (n: number) => {
      nt += 0.002;
      for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.lineWidth = 40 + i * 15;
        ctx.strokeStyle = colors[i % colors.length];
        ctx.lineCap = 'round';

        for (let x = 0; x < w; x += 10) {
          const y =
            Math.sin(x * 0.002 + nt + i) * 80 +
            Math.cos(x * 0.001 - nt * 0.5 + i * 2) * 50 +
            Math.sin(x * 0.003 + nt * 1.5) * 30;
          if (x === 0) {
            ctx.moveTo(x, y + h * 0.5);
          } else {
            ctx.lineTo(x, y + h * 0.5);
          }
        }
        ctx.stroke();
        ctx.closePath();
      }
    };

    let animationId: number;
    const render = () => {
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      drawWave(5);
      animationId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas) return;
      w = ctx.canvas.width = canvas.offsetWidth;
      h = ctx.canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section
      id="services"
      ref={container}
      className="w-full bg-[#050505] py-32 md:py-48 relative overflow-hidden z-20"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-95"
        style={{ filter: 'blur(20px)' }}
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12">
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight text-white uppercase font-heading">
            WHAT WE BUILD
          </h2>
          <p className="text-lg md:text-xl text-gray-400 font-normal max-w-sm font-sans">
            Engineering digital products that solve real business problems.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 md:gap-3 mb-16 justify-center md:justify-start">
          {capabilitiesData.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-white text-black shadow-lg shadow-white/10'
                  : 'bg-white/5 text-zinc-400 hover:text-white border border-white/5 hover:border-white/20'
              }`}
            >
              {tab.id}
            </button>
          ))}
        </div>

        {/* Dynamic Display Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center bg-[#0a0a0a]/80 border border-white/10 rounded-2xl p-8 md:p-14 backdrop-blur-md min-h-[620px] lg:min-h-[520px]">
          {/* Left Column: Device Mockups (Fixed Height Wrapper to prevent fluctuation) */}
          <div className="flex justify-center items-center w-full min-h-[420px] h-[420px]">
            {currentCap.mockupType === 'browser' ? (
              <div className="w-full max-w-lg rounded-xl overflow-hidden border border-white/10 bg-[#0E0E0E] shadow-2xl flex flex-col">
                <div className="bg-[#151515] border-b border-white/5 px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  </div>
                  <div className="flex-1 bg-black/40 border border-white/5 rounded px-3 py-0.5 text-[10px] text-zinc-500 font-mono text-center max-w-[280px] mx-auto truncate select-none">
                    {currentCap.mockupContent.url}
                  </div>
                </div>
                <div className="w-full h-64 bg-black/60 relative">
                  {currentCap.mockupContent.body}
                </div>
              </div>
            ) : (
              <div className="relative w-64 h-[420px] rounded-[36px] border-[6px] border-zinc-800 bg-[#0E0E0E] shadow-2xl overflow-hidden flex flex-col">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-zinc-800 rounded-b-xl z-20 flex justify-center items-center">
                  <div className="w-12 h-1 bg-black rounded-full" />
                </div>
                <div className="w-full h-full bg-black/60 relative">
                  {currentCap.mockupContent.body}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Descriptions and Checklist */}
          <div className="flex flex-col justify-center min-h-[360px]">
            <span className="text-zinc-500 uppercase tracking-widest font-mono text-xs mb-3 block">
              Capabilities • {currentCap.id}
            </span>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6">
              {currentCap.title}
            </h3>
            <p className="text-base md:text-lg text-zinc-400 leading-relaxed mb-8">
              {currentCap.subtitle}
            </p>

            <div className="w-full h-[1px] bg-white/10 mb-8" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5">
              {currentCap.checklist.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm text-zinc-300">
                  <span className="text-emerald-500 font-medium">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
