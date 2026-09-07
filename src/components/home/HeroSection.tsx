'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  Layers,
  CheckCircle2,
  ChevronRight,
  Phone,
} from 'lucide-react';
import { site } from '@/content/site';
import { images } from '@/content/images';

const HERO_SLIDES = [
  {
    image: images.hero,
    tag: 'Flagship Manufacturing',
    title: 'POWER OF QUALITY.',
    highlight: 'ADVANTAGE OF VALUE.',
    description:
      'Engineered CPVC, UPVC, SWR & Agricultural piping systems crafted from 100% virgin polymers for leak-proof longevity.',
    stat: '68+ Precision Fittings',
    accentColor: 'var(--color-accent-primary)',
  },
  {
    image: images.applications.industrial,
    tag: 'Industrial Facility • Rajkot GIDC',
    title: 'PRECISION EXTRUSION.',
    highlight: 'UNRIVALED STRENGTH.',
    description:
      'High-capacity automated extrusion lines maintaining strict ASTM & IS tolerances for residential and industrial water networks.',
    stat: 'ISO 9001:2015 Certified',
    accentColor: '#F59E0B',
  },
  {
    image: images.facility.production,
    tag: 'Direct Factory Advantage',
    title: 'PAN-INDIA SUPPLY.',
    highlight: 'RAPID DISPATCH.',
    description:
      'Overhead crane inventory logistics delivering bulk plumbing consignments to contractors, dealers, and infrastructure projects.',
    stat: '10+ Years Industry Trust',
    accentColor: '#10B981',
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen w-full flex items-center justify-center overflow-hidden pt-24 pb-16 bg-[#080B10]">
      {/* Background Image Carousel with Zoom & Fade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />

          {/* Luxury Film Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Industrial Grid Lines Overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Main Hero Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        {/* Animated Eyebrow Badge */}
        <motion.div
          key={`tag-${currentSlide}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/[0.12] text-xs font-mono tracking-widest uppercase mb-6 text-slate-200"
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: slide.accentColor }}
          />
          <span>{slide.tag}</span>
          <span className="text-white/30">•</span>
          <span className="text-white font-semibold">{slide.stat}</span>
        </motion.div>

        {/* Primary Impact Headline with Bebas Neue font */}
        <motion.div
          key={`headline-${currentSlide}`}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 max-w-4xl"
        >
          <h1 
            className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.92] tracking-wider select-none"
            style={{ color: '#FFFFFF', textShadow: '0 2px 16px rgba(0,0,0,0.55)' }}
          >
            {slide.title}
            <br />
            <span className="text-[#FFFFFF]">
              {slide.highlight}
            </span>
          </h1>
        </motion.div>

        {/* Narrative Description */}
        <motion.p
          key={`desc-${currentSlide}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-[#F1F3F5] text-base sm:text-lg md:text-xl font-body max-w-2xl leading-relaxed mb-10 text-balance"
          style={{ textShadow: '0 2px 16px rgba(0,0,0,0.55)' }}
        >
          {slide.description}
        </motion.p>

        {/* Action Button Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-accent-primary hover:bg-accent-primary-hover text-white font-heading text-lg sm:text-xl tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 group font-bold"
          >
            <span>Explore 68+ Products</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-white/[0.07] hover:bg-white/[0.14] text-white font-heading text-lg sm:text-xl tracking-wider uppercase backdrop-blur-md border border-white/[0.16] hover:border-white/[0.3] transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span>Request Factory Quote</span>
          </Link>

          <a
            href={site.contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-6 py-4 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white font-mono text-sm transition-all shadow-md hover:shadow-lg"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="font-semibold">WhatsApp Enquiry</span>
          </a>
        </motion.div>

        {/* Slide Progress Indicators */}
        <div className="flex items-center gap-3 mb-6">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                i === currentSlide
                  ? 'w-12 bg-accent-primary'
                  : 'w-4 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Feature Badges Footer Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-4xl pt-6 border-t border-white/[0.08] text-left">
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.02]">
            <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
            <span className="text-xs font-mono text-slate-300">100% Virgin Polymer</span>
          </div>
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.02]">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-xs font-mono text-slate-300">BIS & ASTM Standard</span>
          </div>
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.02]">
            <Award className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-xs font-mono text-slate-300">Zero-Leak Assurance</span>
          </div>
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.02]">
            <Layers className="w-4 h-4 text-purple-400 shrink-0" />
            <span className="text-xs font-mono text-slate-300">Complete Plumbing Kit</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
