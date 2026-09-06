'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Tag, ShieldCheck, Sparkles } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

type ProductCardProps = {
  name: string;
  standard: string;
  href: string;
  accent?: string;
  image?: string;
};

export function ProductCard({
  name,
  standard,
  href,
  accent = '#38BDF8',
  image,
}: ProductCardProps) {
  return (
    <Link href={href} className="block group select-none">
      <SpotlightCard
        className="stage-3d-box h-full flex flex-col p-5 bg-[#0A0F1D]/80 border-white/[0.1] hover:border-white/[0.22] rounded-2xl"
        spotlightColor={`${accent}22`}
        borderGlowColor={`${accent}60`}
      >
        {/* Top Badges Row */}
        <div className="flex items-center justify-between gap-2 mb-3.5 relative z-10">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono font-semibold rounded-lg border backdrop-blur-md shadow-sm"
            style={{
              color: accent,
              borderColor: `${accent}40`,
              backgroundColor: `${accent}15`,
            }}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            {standard}
          </span>
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">
            BIS Grade
          </span>
        </div>

        {/* 3D Recessed Image Stage with Ambient Backlight Halo */}
        <div className="relative h-52 w-full rounded-xl overflow-hidden bg-slate-950 border border-white/[0.08] shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)] mb-4 flex items-center justify-center group/img">
          {/* Ambient 3D Colored Halo Glow */}
          <div
            className="halo-3d-glow"
            style={{ backgroundColor: accent }}
          />

          {image ? (
            <div className="relative w-full h-full p-2">
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover rounded-lg group-hover:scale-108 transition-transform duration-500 ease-out"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
          ) : (
            <div className="relative z-10 flex flex-col items-center justify-center text-slate-500 gap-1.5">
              <Tag className="w-7 h-7 text-slate-600" />
              <span className="text-[11px] font-mono text-slate-500">RIO Fitting</span>
            </div>
          )}

          {/* Top specular glass reflection */}
          <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />

          {/* Bottom subtle shadow vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Product Title */}
        <div className="flex-1 mb-2 relative z-10">
          <h3 className="text-base sm:text-lg font-bold font-heading text-slate-100 group-hover:text-white transition-colors leading-snug">
            {name}
          </h3>
        </div>

        {/* Card Footer with Link Cue */}
        <div className="pt-3 mt-auto border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold relative z-10">
          <span
            className="transition-colors group-hover:underline flex items-center gap-1 font-mono text-[11px]"
            style={{ color: accent }}
          >
            Specifications
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
          <span className="text-emerald-400/90 font-mono text-[10px] inline-flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            In Stock
          </span>
        </div>
      </SpotlightCard>
    </Link>
  );
}
