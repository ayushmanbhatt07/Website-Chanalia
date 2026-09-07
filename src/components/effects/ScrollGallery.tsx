'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Factory, Layers, Award, Sparkles } from 'lucide-react';
import { images } from '@/content/images';

interface GallerySlide {
  id: string;
  image: string;
  badge: string;
  title: string;
  category: string;
  description: string;
  accent: string;
}

const GALLERY_SLIDES: GallerySlide[] = [
  {
    id: 'fitting-precision',
    image: images.hero,
    badge: 'Flagship Quality',
    title: 'ENGINEERED PRECISION FITTINGS',
    category: 'CPVC & UPVC Plumbing Systems',
    description:
      'Precision injection-moulded elbows, tees, and brass-inserted adapters manufactured from 100% virgin polymer for zero-leak longevity.',
    accent: '#38BDF8',
  },
  {
    id: 'extrusion-plant',
    image: images.facility.production,
    badge: 'Rajkot G.I.D.C. Hub',
    title: 'AUTOMATED HIGH-TECH EXTRUSION',
    category: 'Continuous Wall-Thickness Surveillance',
    description:
      'Advanced multi-screw extrusion lines operating 24/7 with computer-controlled temperature and dimensional profiling adhering to ASTM & IS tolerances.',
    accent: '#F59E0B',
  },
  {
    id: 'warehouse-logistics',
    image: images.texture.pipesWall,
    badge: 'Pan-India Distribution',
    title: 'HIGH-VOLUME LOGISTICS & STAGING',
    category: '45,000+ Sq. Ft. Facility',
    description:
      'Overhead crane logistics and multi-tiered storage infrastructure delivering high-tonnage consignments directly to construction and municipal sites.',
    accent: '#10B981',
  },
  {
    id: 'testing-rigor',
    image: images.applications.industrial,
    badge: 'Zero-Defect Standard',
    title: 'RIGOROUS HYDROSTATIC TESTING',
    category: 'ASTM D-2846 & IS 13592 Protocols',
    description:
      'Every batch undergoes prolonged pressure endurance, heat reversion, drop-impact, and tensile burst validation before dispatch.',
    accent: '#A855F7',
  },
];

export function ScrollGallery() {
  const targetRef = useRef<HTMLDivElement | null>(null);

  // Track scroll progress relative to the tall container
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Transform vertical scroll progress into smooth horizontal scroll
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-68%']);

  return (
    <section
      ref={targetRef}
      className="relative h-[320vh] bg-[#070A10] border-t border-white/[0.08] select-none"
    >
      {/* Sticky Fullscreen Container */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center pt-24 sm:pt-28 pb-6">
        {/* Subtle Ambient Radial Backlight */}
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[400px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

        {/* Section Header (Fixed in place at the top of the sticky viewport) */}
        <div className="w-full max-w-6xl mx-auto px-6 sm:px-8 mb-6 z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] text-[11px] font-mono tracking-widest uppercase text-sky-400 mb-2">
                <Sparkles className="w-3 h-3" />
                <span>Scroll-Through Visual Tour</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl text-white tracking-wider uppercase leading-none">
                MANUFACTURING INFRASTRUCTURE.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-200 to-white">
                  PRECISION AT EVERY STAGE.
                </span>
              </h2>
            </div>
            <div className="text-xs font-mono text-slate-400 hidden md:block text-right">
              <span>Scroll down to navigate gallery</span>
              <div className="flex items-center justify-end gap-1 mt-1 text-sky-400">
                <span>Horizontal Reel</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Track of Cinematic Image Cards */}
        <motion.div
          style={{ x }}
          className="flex items-center gap-8 pl-6 sm:pl-16 pr-[25vw] sm:pr-[35vw] will-change-transform"
        >
          {GALLERY_SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className="w-[85vw] sm:w-[65vw] md:w-[50vw] lg:w-[42vw] h-[52vh] sm:h-[58vh] relative shrink-0 rounded-3xl overflow-hidden group border border-white/[0.12] bg-[#0C1222] shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-500 hover:border-white/[0.25]"
            >
              {/* Image with zoom on hover */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                sizes="(max-width: 768px) 85vw, 45vw"
                className="object-cover brightness-[0.45] contrast-[1.15] group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080B10]/95 via-[#080B10]/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />

              {/* Top Tag & Counter */}
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                <span
                  className="px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider backdrop-blur-md border border-white/[0.15]"
                  style={{
                    backgroundColor: `${slide.accent}20`,
                    color: slide.accent,
                  }}
                >
                  {slide.badge}
                </span>
                <span className="font-mono text-xs font-bold text-white/60 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/[0.08]">
                  0{index + 1} / 05
                </span>
              </div>

              {/* Bottom Information */}
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <span className="text-xs font-mono uppercase tracking-widest text-slate-300 mb-1.5 block">
                  {slide.category}
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-white tracking-wide uppercase mb-2 leading-tight">
                  {slide.title}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm line-clamp-3 leading-relaxed font-body">
                  {slide.description}
                </p>
              </div>
            </div>
          ))}

          {/* Final Item: Interactive CTA Card */}
          <div className="w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[36vw] h-[52vh] sm:h-[58vh] relative shrink-0 rounded-3xl overflow-hidden flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#0B1329] via-[#080D1A] to-[#04060A] border border-sky-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.85)] group">
            <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Factory className="w-8 h-8 text-sky-400" />
            </div>

            <span className="text-xs font-mono uppercase tracking-widest text-sky-400 font-semibold mb-2">
              Factory Direct Advantage
            </span>

            <h3 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-white tracking-wide uppercase mb-4 leading-tight">
              Ready to Order Wholesale?
            </h3>

            <p className="text-slate-400 text-xs sm:text-sm font-body max-w-sm mb-8 leading-relaxed">
              Connect directly with our Rajkot manufacturing floor for bulk contractor pricing, dispatch schedules, and test certifications.
            </p>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-300 hover:to-sky-400 text-slate-950 font-heading text-lg tracking-wider uppercase font-bold shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:scale-105 transition-all"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ScrollGallery;
