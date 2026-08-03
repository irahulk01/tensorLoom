'use client';

import { ReactLenis } from 'lenis/react';
import { ReactNode } from 'react';

export function LenisProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true,
        syncTouch: false, // Disable touch sync so native mobile scrolling is smooth & error-free
      }}
    >
      {children}
    </ReactLenis>
  );
}
