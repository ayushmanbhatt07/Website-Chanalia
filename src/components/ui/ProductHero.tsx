'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle, ShieldCheck, FileSpreadsheet, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StandardsBadgeRow } from './StandardsBadgeRow';
import { site } from '@/content/site';

type ProductHeroProps = {
  name: string;
  standard: string;
  sizeRange?: string;
  image?: string;
  accent?: string;
  categoryName?: string;
};

export function ProductHero({
  name,
  standard,
  sizeRange,
  image,
  accent = '#38BDF8',
  categoryName,
}: ProductHeroProps) {
  const whatsappText = encodeURIComponent(
    `Hello RIO Pipes team, I would like to request factory pricing & availability for: ${name} (${standard}).`
  );
  const whatsappUrl = `https://wa.me/${site.contact.phone.replace(/[^0-9]/g, '')}?text=${whatsappText}`;

  return (
    <div className="w-full rounded-3xl border border-white/[0.08] bg-[#0A0F1D]/80 backdrop-blur-xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="absolute -top-32 -right-32 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: accent }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 lg:gap-12 items-center">
        {/* Left: Product Info & Direct CTAs */}
        <div>
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-semibold rounded-md border uppercase"
              style={{
                color: accent,
                borderColor: `${accent}40`,
                backgroundColor: `${accent}15`,
              }}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              {standard}
            </span>
            {categoryName && (
              <span className="text-xs font-mono text-slate-400">
                {categoryName}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold font-[var(--font-display)] text-white mb-4 leading-tight">
            {name}
          </h1>

          {sizeRange && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900 border border-white/[0.06] text-xs font-mono text-slate-300 mb-6">
              <FileSpreadsheet className="w-4 h-4 text-sky-400" />
              <span>Available Range: <strong className="text-white font-semibold">{sizeRange}</strong></span>
            </div>
          )}

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
            Engineered from virgin polymer compounds at Reva Polyplast, Metoda G.I.D.C., Rajkot. Designed for high tensile burst resistance, leakproof dimensional integrity, and long service life.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs sm:text-sm transition-all duration-300 shadow-lg"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              WhatsApp Instant RFQ
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white text-xs sm:text-sm font-semibold border border-white/[0.1] transition-colors"
            >
              Request Factory Quote
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right: High-Res Specimen Image */}
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/[0.1] bg-slate-950 group">
          {image ? (
            <>
              <Image
                src={image}
                alt={name}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-500">
              <ShieldCheck className="w-12 h-12 text-slate-700 mb-2" />
              <span className="text-xs font-mono">RIO PIPES Quality Standard</span>
            </div>
          )}

          <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-950/75 backdrop-blur-md border border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-slate-300">
            <span>Genuine Factory Inspection</span>
            <span className="text-sky-400">100% Tested</span>
          </div>
        </div>
      </div>
    </div>
  );
}
