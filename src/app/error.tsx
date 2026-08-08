'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled app error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white px-6 text-center">
      <h2 className="text-3xl font-extrabold mb-4 font-heading">Something went wrong!</h2>
      <p className="text-gray-400 mb-6 max-w-md font-sans text-sm">
        {error.message || 'An unexpected error occurred.'}
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-2.5 rounded-full bg-cyan-500 text-black font-semibold text-sm hover:bg-cyan-400 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
