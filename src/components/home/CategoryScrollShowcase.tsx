'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue } from 'framer-motion';
import {
  ArrowRight,
  ShieldCheck,
  Flame,
  Droplets,
  Layers,
  Sparkles,
  CheckCircle2,
  Maximize2,
  ExternalLink,
} from 'lucide-react';
import { categories } from '@/content/categories';
import { getProductsByCategory } from '@/content/products';

interface CategoryShowcaseStep {
  slug: string;
  step: string;
  name: string;
  shortName: string;
  tagline: string;
  standard: string;
  accentHex: string;
  gradientClass: string;
  glowClass: string;
  image: string;
  secondaryImage: string;
  description: string;
  specs: {
    temp: string;
    pressure: string;
    joint: string;
    life: string;
  };
  highlights: string[];
}

const SHOWCASE_STEPS: CategoryShowcaseStep[] = [
  {
    slug: 'cpvc',
    step: '01',
    name: 'CPVC Plumbing System',
    shortName: 'CPVC System',
    tagline: 'High-Temperature Potable & Industrial Hot/Cold Flow',
    standard: 'ASTM D-2846 • SDR 11 & SDR 13.5',
    accentHex: '#F59E0B',
    gradientClass: 'from-amber-500 to-amber-400',
    glowClass: 'bg-amber-500/15',
    image: '/images/categories/cat-cpvc.jpg',
    secondaryImage: '/images/products/cpvc-pipes-samples-standing.jpg',
    description:
      'Precision engineered from Chlorinated Polyvinyl Chloride to withstand continuous water temperatures up to 93°C. Non-toxic, corrosion-proof, and fire-retardant (LOI 60) for residential, commercial towers, and industrial process lines.',
    specs: {
      temp: 'Up to 93°C (200°F)',
      pressure: '28.1 kg/cm² @ 23°C',
      joint: 'Solvent Weld (One-Step/Two-Step)',
      life: '50+ Years Service Life',
    },
    highlights: [
      'Zero biofilm & bacterial growth — 100% potable water hygiene',
      'High chemical resistance against chlorine and chloramines',
      'Low thermal conductivity reduces condensation & heat loss',
    ],
  },
  {
    slug: 'upvc',
    step: '02',
    name: 'UPVC Plumbing System',
    shortName: 'UPVC System',
    tagline: 'High-Pressure Heavy-Duty Cold Water Distribution',
    standard: 'ASTM D-1785 & ASTM D-2467 (Sch 40 / Sch 80)',
    accentHex: 'var(--color-accent-primary)',
    gradientClass: 'from-accent-primary to-accent-primary',
    glowClass: 'bg-accent-primary/15',
    image: '/images/categories/cat-upvc.jpg',
    secondaryImage: '/images/products/upvc-pipes-samples-standing.jpg',
    description:
      'Unplasticized Polyvinyl Chloride piping designed for heavy-duty pressure distributions. Features mirror-smooth hydraulic bores (Hazen-Williams C=150) that eliminate friction head loss and guarantee non-leaching chemical stability.',
    specs: {
      temp: 'Up to 60°C (140°F)',
      pressure: 'Class Sch 40 & Sch 80',
      joint: 'Solvent Cement & Threaded',
      life: '50+ Years Service Life',
    },
    highlights: [
      '100% lead-free formulation certified for municipal water mains',
      'TiO₂ UV-stabilized compounding prevents solar embrittlement',
      'High impact resistance absorbing hydraulic water hammer',
    ],
  },
  {
    slug: 'swr',
    step: '03',
    name: 'SWR Plumbing System',
    shortName: 'SWR Drainage',
    tagline: 'Clog-Free Soil, Waste & Rainwater Gravity Networks',
    standard: 'IS 13592 & IS 14735 Type A / Type B',
    accentHex: '#94A3B8',
    gradientClass: 'from-slate-400 to-slate-200',
    glowClass: 'bg-slate-400/15',
    image: '/images/categories/cat-swr.jpg',
    secondaryImage: '/images/products/swr-pipe-samples-grey.jpg',
    description:
      'Integrated architectural drainage systems featuring precision self-fit and rubber ring-fit sockets with factory-fitted EPDM gaskets. Eliminates leakage, sewer gas ingress, and microbial buildup in vertical soil stacks.',
    specs: {
      temp: 'Ambient & Hot Waste Discharge',
      pressure: 'Gravity Flow / Gravity Siphon',
      joint: 'Ring-Fit (EPDM) & Self-Fit',
      life: '50+ Years Leak-Proof',
    },
    highlights: [
      'EPDM elastomeric seal absorbs thermal expansion & building settling',
      'High resistance to household disinfectants, bleaches & acids',
      'Mirror inner wall ensures 100% self-cleansing velocity',
    ],
  },
  {
    slug: 'agriculture',
    step: '04',
    name: 'Agriculture Plumbing System',
    shortName: 'Agri PVC',
    tagline: 'High-Yield Irrigation & Submersible Borewell Drop Lines',
    standard: 'IS 4985 & IS 7834 (Class 1 to 5)',
    accentHex: '#10B981',
    gradientClass: 'from-emerald-500 to-teal-400',
    glowClass: 'bg-emerald-500/15',
    image: '/images/categories/cat-agriculture.jpg',
    secondaryImage: '/images/products/agri-pvc-ball-valve-blue.jpg',
    description:
      'Heavy-duty agricultural PVC piping manufactured to withstand farm soil pressure, high pumping head, and harsh outdoor weather. Optimized for drip irrigation, canal distribution, lift schemes, and deep borewells.',
    specs: {
      temp: 'Ambient Outdoor Agricultural',
      pressure: '2.5, 4, 6 & 10 kg/cm²',
      joint: 'Solvent Socket & Elastomeric',
      life: '50+ Years Farm Durability',
    },
    highlights: [
      '30% higher flow discharge rate compared to corroding metal lines',
      'Weather-shield UV inhibitors protect against sun damage in open fields',
      'Heavy wall thickness prevents collapse under vacuum & pump surges',
    ],
  },
];

// Single Segment Progress Bar Component
function SegmentBar({
  step,
  index,
  total,
  scrollProgress,
  isActive,
  onJump,
}: {
  step: CategoryShowcaseStep;
  index: number;
  total: number;
  scrollProgress: MotionValue<number>;
  isActive: boolean;
  onJump: () => void;
}) {
  const segmentSize = 1 / total;
  const start = index * segmentSize;
  const end = (index + 1) * segmentSize;

  // The bar fills dynamically from 0% to 100% as the scroll position enters this segment
  const width = useTransform(scrollProgress, [start, end], ['0%', '100%'], {
    clamp: true,
  });

  return (
    <button
      onClick={onJump}
      className="group relative flex-1 text-left focus:outline-none transition-all duration-200"
      aria-label={`Jump to ${step.name}`}
    >
      <div className="flex items-center justify-between gap-1 mb-2">
        <div className="flex items-center gap-1.5 truncate">
          <span
            className="text-[11px] font-mono font-bold transition-colors"
            style={{ color: isActive ? step.accentHex : '#64748B' }}
          >
            {step.step}
          </span>
          <span
            className="text-xs font-heading tracking-wider uppercase truncate transition-colors"
            style={{ color: isActive ? 'var(--color-text-heading)' : 'var(--color-text-muted)' }}
          >
            {step.shortName}
          </span>
        </div>
        {isActive && (
          <span
            className="hidden sm:inline-block w-1.5 h-1.5 rounded-full animate-ping shrink-0"
            style={{ backgroundColor: step.accentHex }}
          />
        )}
      </div>

      {/* Progress Track & Animated Fill Bar */}
      <div className="h-1.5 sm:h-2 w-full rounded-full bg-bg-inner overflow-hidden relative backdrop-blur-sm border border-border">
        <motion.div
          style={{ width }}
          className={`h-full rounded-full bg-gradient-to-r ${step.gradientClass} shadow-md`}
        />
      </div>
    </button>
  );
}

// Left Column: Text & Engineering Beat
function StoryTextBeat({
  step,
  index,
  total,
  scrollProgress,
  activeIndex,
}: {
  step: CategoryShowcaseStep;
  index: number;
  total: number;
  scrollProgress: MotionValue<number>;
  activeIndex: number;
}) {
  const isVisible = activeIndex === index;
  const products = getProductsByCategory(step.slug as any);

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : index < activeIndex ? -25 : 25,
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="absolute inset-0 flex flex-col justify-center max-w-xl pr-2 sm:pr-6"
    >
      {/* Category Standard Pill Badge */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider border backdrop-blur-md"
          style={{
            borderColor: `${step.accentHex}40`,
            backgroundColor: `${step.accentHex}15`,
            color: step.accentHex,
          }}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{step.standard}</span>
        </span>

        <span className="text-xs font-mono text-text-muted uppercase tracking-widest">
          {products.length} Products Available
        </span>
      </div>

      {/* Main Headline */}
      <h3 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-text-heading tracking-wider uppercase leading-[0.95] mb-3">
        {step.name}
      </h3>

      {/* Tagline */}
      <p
        className="text-base sm:text-lg font-medium mb-4 font-body leading-snug"
        style={{ color: step.accentHex }}
      >
        {step.tagline}
      </p>

      {/* Description */}
      <p className="text-text-body text-sm sm:text-base font-body leading-relaxed mb-6 line-clamp-3 sm:line-clamp-none">
        {step.description}
      </p>

      {/* Key Engineering Highlights */}
      <div className="space-y-2 mb-8 border-l-2 pl-4 py-1" style={{ borderColor: `${step.accentHex}50` }}>
        {step.highlights.map((item, idx) => (
          <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-text-body">
            <CheckCircle2
              className="w-4 h-4 shrink-0 mt-0.5"
              style={{ color: step.accentHex }}
            />
            <span className="font-body">{item}</span>
          </div>
        ))}
      </div>

      {/* Call to Action Button */}
      <div className="flex items-center gap-3">
        <Link
          href={`/products/${step.slug}`}
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-white font-heading text-base sm:text-lg tracking-wider uppercase transition-all duration-300 font-bold shadow-md hover:scale-105 active:scale-95 group"
          style={{
            backgroundColor: step.accentHex,
          }}
        >
          <span>Explore {step.shortName} Catalog</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-white" />
        </Link>

        <Link
          href="/products"
          className="px-4 py-3 rounded-full bg-bg-inner hover:bg-bg-inner-hover text-text-body hover:text-text-heading border border-border font-heading text-base tracking-wider uppercase transition-colors"
        >
          All Categories
        </Link>
      </div>
    </motion.div>
  );
}

// Right Column: Cinematic Product Visual Frame
function StoryVisualBeat({
  step,
  index,
  total,
  scrollProgress,
  activeIndex,
}: {
  step: CategoryShowcaseStep;
  index: number;
  total: number;
  scrollProgress: MotionValue<number>;
  activeIndex: number;
}) {
  const isVisible = activeIndex === index;

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : index < activeIndex ? 1.05 : 0.95,
      }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      style={{
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
      className="absolute inset-0 rounded-3xl overflow-hidden border border-border bg-bg-inner shadow-2xl"
    >
      {/* Category Ambient Radial Halo Glow */}
      <div
        className={`absolute inset-0 ${step.glowClass} blur-3xl pointer-events-none transition-colors duration-700`}
      />

      {/* Main High-Resolution Category Image */}
      <div className="relative w-full h-full">
        <Image
          src={step.image}
          alt={step.name}
          fill
          className="object-cover object-center transition-transform duration-700 hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={index === 0}
        />

        {/* Cinematic Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-outer-alt via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-outer-alt/60 via-transparent to-transparent pointer-events-none" />

        {/* Floating Spec Panel Overlay */}
        <div className="absolute bottom-5 left-5 right-5 p-4 sm:p-5 rounded-2xl bg-bg-inner/85 backdrop-blur-2xl border border-border shadow-2xl">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-border">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: step.accentHex }}
              />
              <span className="text-xs font-mono uppercase tracking-wider text-text-heading font-semibold">
                Factory Test Specifications
              </span>
            </div>
            <span
              className="text-xs font-mono font-bold"
              style={{ color: step.accentHex }}
            >
              RIO ORIGINAL
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div>
              <span className="text-[10px] font-mono text-text-muted uppercase block">
                Temp Rating
              </span>
              <span className="text-xs font-mono text-text-heading font-semibold truncate block">
                {step.specs.temp}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-mono text-text-muted uppercase block">
                Pressure Class
              </span>
              <span className="text-xs font-mono text-text-heading font-semibold truncate block">
                {step.specs.pressure}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-mono text-text-muted uppercase block">
                Joint Type
              </span>
              <span className="text-xs font-mono text-text-heading font-semibold truncate block">
                {step.specs.joint}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-mono text-text-muted uppercase block">
                Service Life
              </span>
              <span className="text-xs font-mono text-status-success font-semibold truncate block">
                {step.specs.life}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function CategoryScrollShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Measure vertical scroll through this multi-height section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Track active step based on scroll progression
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const total = SHOWCASE_STEPS.length;
    const segment = 1 / total;
    const current = Math.min(Math.floor(latest / segment), total - 1);
    setActiveIndex(current);
  });

  // Jump to specific step upon clicking its progress bar segment
  const handleJumpToStep = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const totalHeight = rect.height - window.innerHeight;
    const targetScroll = scrollTop + (index / SHOWCASE_STEPS.length) * totalHeight + 10;
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative bg-bg-outer-alt border-t border-b border-border">
      {/* Outer Multi-Screen Scroll Driver */}
      <div
        ref={containerRef}
        className="relative h-[340vh]"
      >
        {/* Sticky Full-Viewport Stage */}
        <div className="sticky top-16 sm:top-20 lg:top-24 h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] flex flex-col justify-between py-6 sm:py-8 overflow-hidden">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-between">
            {/* ── Top Header Strip with Interactive Segmented Bar Fill ── */}
            <div className="w-full pb-4 sm:pb-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-inner border border-border text-[11px] font-mono uppercase tracking-widest text-accent-primary font-semibold mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Engineered Product Categories</span>
                  </div>
                  <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-text-heading tracking-wider uppercase">
                    Precision Polymer Solutions
                  </h2>
                </div>

                <div className="text-right hidden sm:block">
                  <span className="text-xs font-mono text-text-muted">
                    Scroll or click bar to inspect systems •{' '}
                    <span className="text-accent-primary font-bold">
                      0{activeIndex + 1} / 0{SHOWCASE_STEPS.length}
                    </span>
                  </span>
                </div>
              </div>

              {/* 4 Segmented Progress Fill Bars (EnviroWealth Style) */}
              <div className="grid grid-cols-4 gap-2 sm:gap-4 p-2 sm:p-3 rounded-2xl bg-bg-inner border border-border backdrop-blur-xl">
                {SHOWCASE_STEPS.map((step, i) => (
                  <SegmentBar
                    key={step.slug}
                    step={step}
                    index={i}
                    total={SHOWCASE_STEPS.length}
                    scrollProgress={scrollYProgress}
                    isActive={activeIndex === i}
                    onJump={() => handleJumpToStep(i)}
                  />
                ))}
              </div>
            </div>

            {/* ── Main Interactive Split Showcase Stage ── */}
            <div className="relative flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[380px] sm:min-h-[440px] my-auto">
              {/* Left Column: Story & Specification Beat */}
              <div className="lg:col-span-6 relative h-full min-h-[360px] sm:min-h-[420px] flex items-center">
                {SHOWCASE_STEPS.map((step, i) => (
                  <StoryTextBeat
                    key={step.slug}
                    step={step}
                    index={i}
                    total={SHOWCASE_STEPS.length}
                    scrollProgress={scrollYProgress}
                    activeIndex={activeIndex}
                  />
                ))}
              </div>

              {/* Right Column: Cinematic Visual Stage */}
              <div className="lg:col-span-6 relative h-[320px] sm:h-[420px] lg:h-[480px] w-full">
                {SHOWCASE_STEPS.map((step, i) => (
                  <StoryVisualBeat
                    key={step.slug}
                    step={step}
                    index={i}
                    total={SHOWCASE_STEPS.length}
                    scrollProgress={scrollYProgress}
                    activeIndex={activeIndex}
                  />
                ))}
              </div>
            </div>

            {/* ── Bottom Ambient Indicator Strip ── */}
            <div className="pt-3 border-t border-border flex items-center justify-between text-[11px] font-mono text-text-muted">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-status-success" />
                ASTM & BIS Certified Heavy-Duty Manufacturing • Rajkot GIDC
              </span>

              <div className="flex items-center gap-3">
                <span className="text-text-muted hidden sm:inline">
                  Step {activeIndex + 1} of {SHOWCASE_STEPS.length}: {SHOWCASE_STEPS[activeIndex].name}
                </span>
                <Link
                  href={`/products/${SHOWCASE_STEPS[activeIndex].slug}`}
                  className="text-accent-primary hover:text-accent-primary/80 transition-colors flex items-center gap-1 font-bold uppercase"
                >
                  <span>View SKUs</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CategoryScrollShowcase;
