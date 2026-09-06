'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

type StatCounterProps = {
  label: string;
  value: number | null;
  suffix?: string;
};

export function StatCounter({ label, value, suffix }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const springValue = useSpring(0, { stiffness: 50, damping: 20 });
  const displayValue = useTransform(springValue, (current) => Math.floor(current));
  
  useEffect(() => {
    if (isInView && value !== null) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  if (value === null) return null;

  return (
    <div ref={ref} className="text-center p-6 bg-rio-surface border border-rio-line rounded-xl hover:border-rio-blue transition-colors duration-300">
      <div className="flex items-center justify-center font-display text-5xl font-bold text-rio-ink mb-2">
        <motion.span>{displayValue}</motion.span>
        {suffix && <span className="ml-1 text-rio-slate">{suffix}</span>}
      </div>
      <div className="text-sm font-medium text-rio-slate uppercase tracking-widest">{label}</div>
    </div>
  );
}
