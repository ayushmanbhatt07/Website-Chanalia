'use client';

import React, { useRef, useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';

const PRESETS = {
  Default: { splitMode: 'Characters', revealDirection: 'Left to Right', stagger: 0.08, xOffset: 6, yOffset: 0, blur: 0, rotateX: 0, perspective: 800, scale: 1 },
  'Fade In Up': { splitMode: 'Characters', revealDirection: 'Left to Right', stagger: 0.05, xOffset: 0, yOffset: 20, blur: 0, rotateX: 0, perspective: 800, scale: 1 },
  'Blur Reveal': { splitMode: 'Characters', revealDirection: 'Left to Right', stagger: 0.06, xOffset: 0, yOffset: 0, blur: 6, rotateX: 0, perspective: 800, scale: 1 },
  Cinematic: { splitMode: 'Characters', revealDirection: 'Left to Right', stagger: 0.04, xOffset: 8, yOffset: 16, blur: 3, rotateX: 0, perspective: 800, scale: 1 },
  '3D Flip': { splitMode: 'Characters', revealDirection: 'Left to Right', stagger: 0.05, xOffset: 0, yOffset: 0, blur: 2, rotateX: 35, perspective: 800, scale: 1 },
  'Soft Words': { splitMode: 'Words', revealDirection: 'Left to Right', stagger: 0.12, xOffset: 0, yOffset: 12, blur: 2, rotateX: 0, perspective: 800, scale: 1 },
  'Masked Lines': { splitMode: 'Lines', revealDirection: 'Left to Right', stagger: 0.15, xOffset: 0, yOffset: 0, blur: 0, rotateX: 0, perspective: 800, scale: 1 },
} as const;

type PresetKey = keyof typeof PRESETS;

export interface ScrollRevealTextProps {
  text: string;
  preset?: PresetKey;
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
  colorHidden?: string;
  colorRevealed?: string;
  splitMode?: 'Characters' | 'Words' | 'Lines';
  revealDirection?: 'Left to Right' | 'Right to Left';
  stagger?: number;
  xOffset?: number;
  yOffset?: number;
  blur?: number;
  rotateX?: number;
  perspective?: number;
  scale?: number;
  offsetStart?: number;
  offsetEnd?: number;
}

export function ScrollRevealText({
  text,
  preset = 'Cinematic',
  as: Component = 'span',
  className,
  style,
  colorHidden = 'rgba(148, 163, 184, 0.25)',
  colorRevealed = '#F0F4F8',
  splitMode: propSplitMode,
  revealDirection: propRevealDirection,
  stagger: propStagger,
  xOffset: propXOffset,
  yOffset: propYOffset,
  blur: propBlur,
  rotateX: propRotateX,
  perspective: propPerspective,
  scale: propScale,
  offsetStart = 85,
  offsetEnd = 30,
}: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const spanRefs = useRef<(HTMLElement | null)[]>([]);
  const lineRefs = useRef<(HTMLElement | null)[]>([]);
  const isVisible = useRef(false);
  const rafId = useRef(0);
  const scheduled = useRef(false);
  const [lineGroups, setLineGroups] = useState<number[][] | null>(null);

  const config = PRESETS[preset] || PRESETS.Cinematic;
  const splitMode = propSplitMode ?? config.splitMode;
  const revealDirection = propRevealDirection ?? config.revealDirection;
  const stagger = propStagger ?? config.stagger;
  const xOffset = propXOffset ?? config.xOffset;
  const yOffset = propYOffset ?? config.yOffset;
  const blur = propBlur ?? config.blur;
  const rotateX = propRotateX ?? config.rotateX;
  const perspective = propPerspective ?? config.perspective;
  const scale = propScale ?? config.scale;

  const isLinesMode = splitMode === 'Lines';

  const { allSpans, unitCount, wordGroups } = useMemo(() => {
    const spans: { char: string; isSpace: boolean; unit: number }[] = [];
    let unitIdx = 0;

    if (splitMode === 'Words') {
      const words = text.split(/(\s+)/);
      words.forEach((w) => {
        if (/^\s+$/.test(w)) {
          for (let i = 0; i < w.length; i++) {
            spans.push({ char: w[i], isSpace: true, unit: -1 });
          }
        } else {
          for (let i = 0; i < w.length; i++) {
            spans.push({ char: w[i], isSpace: false, unit: unitIdx });
          }
          unitIdx++;
        }
      });
    } else {
      for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if (c === ' ' || c === '\n') {
          spans.push({ char: c, isSpace: true, unit: -1 });
        } else {
          spans.push({ char: c, isSpace: false, unit: unitIdx });
          unitIdx++;
        }
      }
    }

    const groups: { type: 'word' | 'space'; spans: any[] }[] = [];
    let current: { type: 'word'; spans: any[] } | null = null;

    spans.forEach((span, i) => {
      if (span.isSpace) {
        if (current) {
          groups.push(current);
          current = null;
        }
        groups.push({ type: 'space', spans: [{ ...span, idx: i }] });
      } else {
        if (!current) current = { type: 'word', spans: [] };
        current.spans.push({ ...span, idx: i });
      }
    });
    if (current) groups.push(current);

    if (revealDirection === 'Right to Left' && !isLinesMode) {
      const max = unitIdx - 1;
      spans.forEach((s) => {
        if (!s.isSpace) s.unit = max - s.unit;
      });
    }

    return { allSpans: spans, unitCount: unitIdx, wordGroups: groups };
  }, [text, splitMode, revealDirection, isLinesMode]);

  useEffect(() => {
    if (!isLinesMode) {
      if (lineGroups !== null) setLineGroups(null);
      return;
    }
    const detect = () => {
      const container = containerRef.current;
      if (!container) return;
      const wordEls = container.querySelectorAll('[data-wg]');
      if (wordEls.length === 0) return;
      const positions: { gi: number; top: number }[] = [];
      wordEls.forEach((el) => {
        positions.push({
          gi: parseInt((el as HTMLElement).dataset.wg!, 10),
          top: Math.round(el.getBoundingClientRect().top),
        });
      });

      const lineWordGis: number[][] = [];
      let currentLine: number[] = [];
      let lastTop = -Infinity;

      positions.forEach(({ gi, top }) => {
        if (currentLine.length > 0 && Math.abs(top - lastTop) > 3) {
          lineWordGis.push([...currentLine]);
          currentLine = [];
        }
        currentLine.push(gi);
        lastTop = top;
      });

      if (currentLine.length > 0) lineWordGis.push([...currentLine]);

      const lines = lineWordGis.map((wGis, li) => {
        const start = wGis[0];
        const end = li < lineWordGis.length - 1 ? lineWordGis[li + 1][0] : wordGroups.length;
        return Array.from({ length: end - start }, (_, k) => start + k);
      });

      if (revealDirection === 'Right to Left') lines.reverse();
      setLineGroups(lines);
    };

    requestAnimationFrame(() => requestAnimationFrame(detect));
  }, [text, splitMode, revealDirection, isLinesMode, wordGroups.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (isLinesMode && !lineGroups) return;

    const totalUnits = isLinesMode ? lineGroups!.length : unitCount;
    if (totalUnits === 0) return;

    if (!isLinesMode) {
      spanRefs.current = spanRefs.current.slice(0, allSpans.length);
    }

    const dur = 0.5;
    const totalTime = dur + (totalUnits - 1) * stagger;

    const applyProgress = (scrollP: number) => {
      const time = scrollP * totalTime;
      if (isLinesMode) {
        lineRefs.current.forEach((el, lineIdx) => {
          if (!el) return;
          const p = totalUnits <= 1 ? scrollP : Math.max(0, Math.min(1, (time - lineIdx * stagger) / dur));
          const ty = ((1 - p) * 100).toFixed(1);
          let tf = `translateY(${ty}%)`;
          if (rotateX !== 0) {
            tf = `perspective(${perspective}px) rotateX(${(rotateX * (1 - p)).toFixed(1)}deg) ${tf}`;
          }
          if (scale < 1) {
            tf += ` scale(${(scale + (1 - scale) * p).toFixed(3)})`;
          }
          el.style.transform = tf;
          el.style.opacity = `${0.2 + p * 0.8}`;
          el.style.filter = blur > 0 ? `blur(${(blur * (1 - p)).toFixed(1)}px)` : 'none';
          const pct = Math.round(p * 100);
          el.style.color = `color-mix(in srgb, ${colorRevealed} ${pct}%, ${colorHidden})`;
        });
      } else {
        spanRefs.current.forEach((el, i) => {
          if (!el) return;
          const span = allSpans[i];
          if (!span || span.isSpace) return;
          const p = totalUnits <= 1 ? scrollP : Math.max(0, Math.min(1, (time - span.unit * stagger) / dur));
          el.style.opacity = `${0.2 + p * 0.8}`;
          const tx = (-xOffset + xOffset * p).toFixed(1);
          const ty = (yOffset * (1 - p)).toFixed(1);
          let tf = '';
          if (rotateX !== 0) {
            tf = `perspective(${perspective}px) rotateX(${(rotateX * (1 - p)).toFixed(1)}deg) `;
          }
          tf += `translateX(${tx}px) translateY(${ty}px)`;
          if (scale < 1) {
            tf += ` scale(${(scale + (1 - scale) * p).toFixed(3)})`;
          }
          el.style.transform = tf;
          el.style.filter = blur > 0 ? `blur(${(blur * (1 - p)).toFixed(1)}px)` : 'none';
          const pct = Math.round(p * 100);
          el.style.color = `color-mix(in srgb, ${colorRevealed} ${pct}%, ${colorHidden})`;
        });
      }
    };

    const startFrac = offsetStart / 100;
    const endFrac = offsetEnd / 100;

    const update = () => {
      const vh = window.innerHeight;
      const rect = container.getBoundingClientRect();
      const range = (startFrac - endFrac) * vh;
      let scrollP = 0;

      if (range > 0) {
        scrollP = Math.max(0, Math.min(1, (startFrac * vh - rect.top) / range));
        if (rect.top < 0 && rect.bottom > 0) scrollP = 1;
      }
      applyProgress(scrollP);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
        if (entry.isIntersecting) update();
      },
      { rootMargin: '200px' }
    );
    observer.observe(container);

    const onScroll = () => {
      if (!isVisible.current || scheduled.current) return;
      scheduled.current = true;
      rafId.current = requestAnimationFrame(() => {
        update();
        scheduled.current = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [allSpans, unitCount, lineGroups, isLinesMode, stagger, xOffset, yOffset, blur, rotateX, perspective, scale, offsetStart, offsetEnd, colorHidden, colorRevealed]);

  const renderWordGroup = (group: any, gi: number) => {
    if (group.type === 'word') {
      return (
        <span key={`w-${gi}`} data-wg={gi} className="inline whitespace-nowrap">
          {group.spans.map(({ char, idx }: any) => (
            <span
              key={idx}
              ref={(el) => {
                spanRefs.current[idx] = el;
              }}
              style={{
                display: 'inline-block',
                willChange: isLinesMode ? undefined : 'transform, opacity, color, filter',
              }}
            >
              {char}
            </span>
          ))}
        </span>
      );
    }
    return group.spans.map(({ char, idx }: any) => (
      <span key={idx} className="inline-block">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  if (isLinesMode && lineGroups) {
    return (
      <Component
        ref={containerRef}
        className={cn('inline-block', className)}
        style={style}
      >
        {lineGroups.map((groupIndices, lineIdx) => (
          <div key={lineIdx} className="overflow-hidden block">
            <div
              ref={(el) => {
                lineRefs.current[lineIdx] = el;
              }}
              style={{ display: 'block', willChange: 'transform, opacity, filter' }}
            >
              {groupIndices.map((gi) => renderWordGroup(wordGroups[gi], gi))}
            </div>
          </div>
        ))}
      </Component>
    );
  }

  return (
    <Component
      ref={containerRef}
      className={cn('inline-block', className)}
      style={style}
    >
      {wordGroups.map((group, gi) => renderWordGroup(group, gi))}
    </Component>
  );
}

export default ScrollRevealText;
