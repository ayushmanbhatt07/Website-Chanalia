'use client';

import React, { useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  borderGlowColor?: string;
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = 'rgba(56, 189, 248, 0.12)',
  borderGlowColor = 'rgba(56, 189, 248, 0.35)',
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setOpacity(1);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setOpacity(0);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'relative rounded-2xl border border-white/[0.08] bg-slate-900/40 backdrop-blur-xl overflow-hidden group transition-all duration-300',
        'hover:shadow-[0_12px_36px_-8px_rgba(0,0,0,0.6)] hover:border-white/[0.16]',
        className
      )}
      {...props}
    >
      {/* Moving Radial Spotlight on Surface */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 45%)`,
        }}
      />

      {/* Moving Subtle Border Illumination */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 z-0"
        style={{
          opacity,
          border: `1px solid ${borderGlowColor}`,
          maskImage: `radial-gradient(240px circle at ${position.x}px ${position.y}px, black 40%, transparent)`,
          WebkitMaskImage: `radial-gradient(240px circle at ${position.x}px ${position.y}px, black 40%, transparent)`,
        }}
      />

      {/* Card Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
