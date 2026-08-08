'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Loader2 } from 'lucide-react';

interface DownloadQuoteButtonProps {
  projectName: string;
  category: string;
  buttonText?: string;
  className?: string;
}

export function DownloadQuoteButton({
  projectName,
  category,
  buttonText,
  className = '',
}: DownloadQuoteButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDirectDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDownloading(true);

    const pdfUrl = `/api/quote/pdf?project=${encodeURIComponent(
      projectName,
    )}&service=${encodeURIComponent(category)}`;

    const anchor = document.createElement('a');
    anchor.href = pdfUrl;
    anchor.download = `tensorLoom_quote_${projectName.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    setTimeout(() => {
      setIsDownloading(false);
    }, 1200);
  };

  return (
    <motion.button
      onClick={handleDirectDownload}
      disabled={isDownloading}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={`relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#c99b3e] text-slate-950 font-extrabold text-xs font-heading tracking-tight shadow-md hover:bg-[#b38730] transition-all cursor-pointer border border-[#c99b3e]/40 disabled:opacity-50 ${className}`}
      title={`Download PDF Proposal for ${projectName}`}
    >
      {isDownloading ? (
        <>
          <Loader2 className="w-3.5 h-3.5 text-slate-950 animate-spin" />
          <span>Generating PDF...</span>
        </>
      ) : (
        <>
          <Download className="w-3.5 h-3.5 text-slate-950 shrink-0" />
          <span>{buttonText || `Download Quote PDF`}</span>
        </>
      )}
    </motion.button>
  );
}
