'use client';

import { useRef, useEffect, useState } from 'react';

const capabilitiesData = [
  {
    id: 'Websites',
    title: 'Business Websites',
    subtitle:
      'From company profiles to enterprise platforms, we build websites that establish trust and generate high-intent enquiries.',
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
        <div className="p-6 flex flex-col gap-4 text-xs font-mono text-[#4a4d57] h-full justify-between bg-white">
          <div className="flex justify-between items-center border-b border-amber-900/10 pb-3">
            <span className="text-[#0f1117] font-semibold">tensorLoom Console</span>
            <span className="text-[#b38730] bg-[#c99b3e]/10 px-2 py-0.5 rounded text-[10px] border border-[#c99b3e]/25 font-semibold">
              Active
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#fcfbf9] border border-[#c99b3e]/15 p-3 rounded-lg flex flex-col gap-1">
              <span className="text-[10px] text-slate-500">API Latency</span>
              <span className="text-[#0f1117] text-sm font-semibold">12ms</span>
            </div>
            <div className="bg-[#fcfbf9] border border-[#c99b3e]/15 p-3 rounded-lg flex flex-col gap-1">
              <span className="text-[10px] text-slate-500">Server Load</span>
              <span className="text-[#0f1117] text-sm font-semibold">14.2%</span>
            </div>
            <div className="bg-[#fcfbf9] border border-[#c99b3e]/15 p-3 rounded-lg flex flex-col gap-1">
              <span className="text-[10px] text-slate-500">Node Status</span>
              <span className="text-[#b38730] text-sm font-semibold">Healthy</span>
            </div>
          </div>
          <div className="bg-[#fcfbf9] border border-[#c99b3e]/15 p-4 rounded-lg flex-1 flex flex-col gap-2">
            <span className="text-slate-500 text-[10px]">System Logs</span>
            <div className="text-[10px] text-slate-600 flex flex-col gap-1 overflow-hidden font-mono">
              <span className="text-slate-400">[14:02:11] Init database cluster connection...</span>
              <span className="text-[#b38730] font-semibold">
                [14:02:12] DB Cluster connected (8 replica nodes)
              </span>
              <span className="text-slate-400">[14:02:15] Load balancer health check PASSED</span>
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
        <div className="p-4 flex flex-col gap-4 text-xs font-mono text-slate-600 h-full bg-[#fcfbf9]">
          <div className="flex justify-between items-center border-b border-amber-900/10 pb-2 mt-4">
            <span className="text-[#0f1117] font-bold text-xs">tL Mobile</span>
            <div className="w-2 h-2 rounded-full bg-[#c99b3e] animate-pulse" />
          </div>
          <div className="flex-1 flex flex-col justify-center items-center gap-2">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#c99b3e] to-[#b38730] flex items-center justify-center text-slate-950 text-lg font-extrabold shadow-md">
              tL
            </div>
            <span className="text-[#0f1117] text-xs font-semibold mt-2">Deploying Build #4021</span>
            <span className="text-slate-500 text-[9px]">Target: AWS us-east-1</span>
          </div>
          <div className="bg-white border border-[#c99b3e]/20 p-3 rounded-lg flex flex-col gap-1.5 shadow-xs">
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#c99b3e] h-full w-[70%]" />
            </div>
            <span className="text-[9px] text-slate-500 text-center">Uploading assets... 70%</span>
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
        <div className="p-4 flex flex-col justify-between text-xs font-mono text-slate-600 h-full bg-white">
          <div className="flex flex-col gap-3 overflow-y-auto max-h-[170px]">
            <div className="flex gap-2">
              <span className="text-slate-400">[User]:</span>
              <span className="text-[#0f1117]">Run analytical report on Q3 database latency.</span>
            </div>
            <div className="flex gap-2 bg-[#c99b3e]/10 border border-[#c99b3e]/20 p-2.5 rounded-lg">
              <span className="text-[#b38730] font-bold">[Agent]:</span>
              <span className="text-slate-700">
                Searching vector DB... Found 3 logs. Average query time is 14ms (12% decrease).
                Generating chart...
              </span>
            </div>
          </div>
          <div className="flex gap-2 items-center border-t border-slate-200 pt-3">
            <span className="text-slate-400">&gt;</span>
            <span className="text-[#b38730] animate-pulse">Ask agent anything...</span>
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
        <div className="p-6 flex flex-col gap-4 text-xs font-mono text-slate-600 h-full bg-white">
          <div className="flex justify-between items-center">
            <span className="text-[#0f1117] font-semibold">User Acquisition</span>
            <span className="text-[#b38730] font-bold">+28.4%</span>
          </div>
          <div className="w-full h-24 bg-[#fcfbf9] border border-[#c99b3e]/15 rounded-lg p-2 relative flex items-end">
            <svg
              className="w-full h-full text-[#c99b3e]"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d="M0,90 Q15,80 30,50 T60,30 T90,10 T100,0"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
            </svg>
            <div className="absolute bottom-2 left-4 text-[9px] text-slate-400">Jan</div>
            <div className="absolute bottom-2 right-4 text-[9px] text-slate-400">Jun</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#fcfbf9] border border-[#c99b3e]/15 p-2.5 rounded-lg">
              <span className="text-[10px] text-slate-500">Impressions</span>
              <div className="text-[#0f1117] font-bold text-sm">1.2M</div>
            </div>
            <div className="bg-[#fcfbf9] border border-[#c99b3e]/15 p-2.5 rounded-lg">
              <span className="text-[10px] text-slate-500">Conversion Rate</span>
              <div className="text-[#0f1117] font-bold text-sm">4.82%</div>
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
        <div className="p-6 flex flex-col gap-5 text-xs font-mono text-slate-600 h-full bg-white">
          <div className="flex flex-col gap-0.5">
            <span className="text-[#0f1117] font-semibold">tensorLoom Style Guide</span>
            <span className="text-slate-400 text-[10px]">Active Design System Tokens</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div className="flex flex-col gap-1 items-center">
              <div className="w-9 h-9 rounded bg-[#c99b3e] border border-[#b38730]" />
              <span className="text-[8px] text-slate-500">Gold #c99b3e</span>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <div className="w-9 h-9 rounded bg-[#b38730] border border-amber-900/20" />
              <span className="text-[8px] text-slate-500">Deep Gold</span>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <div className="w-9 h-9 rounded bg-[#0f1117] border border-slate-700" />
              <span className="text-[8px] text-slate-500">Obsidian</span>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <div className="w-9 h-9 rounded bg-[#fcfbf9] border border-slate-300" />
              <span className="text-[8px] text-slate-500">Cream Offwhite</span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[9px] text-slate-500">Typography Suite</span>
            <div className="bg-[#fcfbf9] border border-[#c99b3e]/15 p-2.5 rounded-lg flex flex-col gap-0.5">
              <span className="text-[#0f1117] font-sans text-xs font-bold">
                Plus Jakarta Sans & Inter
              </span>
              <span className="text-slate-500 text-[9px]">Geometrical sans-serif font family</span>
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
        <div className="p-6 flex flex-col gap-4 text-xs font-mono text-slate-600 h-full bg-white">
          <div className="flex justify-between items-center">
            <span className="text-[#0f1117] font-semibold">Active Pipeline: SyncNodes</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#c99b3e] animate-pulse" />
          </div>
          <div className="bg-[#fcfbf9] border border-[#c99b3e]/15 rounded-lg p-4 flex justify-between items-center gap-2 relative">
            <div className="bg-white border border-slate-200 px-2 py-1 rounded text-[10px] text-slate-800 shadow-xs">
              Webhook
            </div>
            <div className="flex-1 h-[2px] bg-gradient-to-r from-[#c99b3e] to-[#b38730] relative">
              <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#c99b3e] animate-ping" />
            </div>
            <div className="bg-[#c99b3e]/10 border border-[#c99b3e]/30 px-2 py-1 rounded text-[10px] text-[#b38730] font-bold">
              AI Parser
            </div>
            <div className="flex-1 h-[2px] bg-[#c99b3e]" />
            <div className="bg-white border border-slate-200 px-2 py-1 rounded text-[10px] text-slate-800 shadow-xs">
              Postgres
            </div>
          </div>
          <div className="text-[10px] text-slate-500 flex justify-between">
            <span>Runs: 14,204</span>
            <span className="text-[#b38730] font-semibold">Success Rate: 100%</span>
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
      'rgba(201, 155, 62, 0.08)',
      'rgba(179, 135, 48, 0.06)',
      'rgba(229, 190, 107, 0.07)',
    ];

    const drawWave = (n: number) => {
      nt += 0.002;
      for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.lineWidth = 40 + i * 15;
        ctx.strokeStyle = colors[i % colors.length];
        ctx.lineCap = 'round';

        for (let x = 0; x < w; x += 10) {
          const y = Math.sin(x * 0.002 + nt + i) * 70 + Math.cos(x * 0.001 - nt * 0.5 + i * 2) * 40;
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
      ctx.fillStyle = '#fcfbf9';
      ctx.fillRect(0, 0, w, h);
      drawWave(3);
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
      className="w-full bg-[#fcfbf9] py-24 md:py-36 relative overflow-hidden z-20"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-90"
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-amber-900/10 pb-10">
          <div>
            <span className="text-xs font-mono text-[#b38730] font-semibold uppercase tracking-widest mb-2 block">
              CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#0f1117] font-heading">
              WHAT WE BUILD
            </h2>
          </div>
          <p className="text-base md:text-lg text-[#4a4d57] font-normal max-w-md font-sans">
            Engineering digital products that solve complex business problems.
          </p>
        </div>

        {/* Capabilities Category Tabs */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-12 justify-center md:justify-start">
          {capabilitiesData.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 sm:px-6 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#c99b3e] text-slate-950 shadow-md scale-105 font-extrabold'
                  : 'bg-white text-[#0f1117] hover:text-[#b38730] border border-[#c99b3e]/20 hover:border-[#c99b3e] shadow-xs'
              }`}
            >
              {tab.id}
            </button>
          ))}
        </div>

        {/* Dynamic Display Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center bg-white border border-[#c99b3e]/20 rounded-3xl p-6 sm:p-10 md:p-14 shadow-xl min-h-[560px] lg:min-h-[500px]">
          {/* Mockups Column */}
          <div className="flex justify-center items-center w-full min-h-[360px] sm:min-h-[400px]">
            {currentCap.mockupType === 'browser' ? (
              <div className="w-full max-w-lg rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-100 shadow-lg flex flex-col">
                <div className="bg-slate-200/80 border-b border-slate-300 px-4 py-2.5 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="flex-1 bg-white border border-slate-300/80 rounded px-3 py-0.5 text-[10px] text-slate-500 font-mono text-center max-w-[280px] mx-auto truncate select-none shadow-xs">
                    {currentCap.mockupContent.url}
                  </div>
                </div>
                <div className="w-full h-64 relative bg-white">{currentCap.mockupContent.body}</div>
              </div>
            ) : (
              <div className="relative w-64 h-[400px] rounded-[32px] border-[6px] border-[#0f1117] bg-[#fcfbf9] shadow-xl overflow-hidden flex flex-col">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-4 bg-[#0f1117] rounded-b-xl z-20 flex justify-center items-center">
                  <div className="w-10 h-1 bg-slate-700 rounded-full" />
                </div>
                <div className="w-full h-full bg-[#fcfbf9] relative">
                  {currentCap.mockupContent.body}
                </div>
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="flex flex-col justify-center min-h-[320px]">
            <span className="text-[#b38730] font-semibold uppercase tracking-widest font-mono text-xs mb-2 block">
              Capabilities • {currentCap.id}
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#0f1117] mb-4 font-heading">
              {currentCap.title}
            </h3>
            <p className="text-sm sm:text-base text-[#4a4d57] leading-relaxed mb-6 font-sans">
              {currentCap.subtitle}
            </p>

            <div className="w-full h-[1px] bg-[#c99b3e]/20 mb-6" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              {currentCap.checklist.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 text-xs sm:text-sm text-[#0f1117]"
                >
                  <span className="text-[#b38730] font-bold">✓</span>
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
