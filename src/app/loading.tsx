'use client';

export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono text-sm">
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
        <span>Loading tensorLoom...</span>
      </div>
    </div>
  );
}
