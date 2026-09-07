'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Thermometer, Droplets } from 'lucide-react';
import { categories } from '@/content/categories';

interface SystemSpec {
  id: string;
  name: string;
  tagline: string;
  accent: string;
  image: string;
  badge: string;
  specs: { label: string; value: string }[];
  highlights: string[];
  href: string;
}

const SYSTEMS: SystemSpec[] = [
  {
    id: 'upvc',
    name: 'UPVC Plumbing System',
    tagline: 'Lead-Free High Pressure Potable Water Distribution',
    accent: '#38BDF8',
    image: '/images/products/upvc-pipes-samples-standing.jpg',
    badge: 'ASTM D-1785 / SCH 40 & 80',
    specs: [
      { label: 'Pressure Rating', value: 'Up to 450 PSI' },
      { label: 'Working Temp', value: 'Up to 60°C' },
      { label: 'Material Grade', value: '100% Virgin Lead-Free' },
      { label: 'Design Life', value: '50+ Years' },
    ],
    highlights: [
      'Zero lead toxicity for pure drinking water',
      'High tensile burst resistance (Schedule 40 & 80)',
      'Smooth inner core prevents scaling and biofilm',
    ],
    href: '/products/upvc',
  },
  {
    id: 'cpvc',
    name: 'CPVC Hot & Cold System',
    tagline: 'Engineered for Extreme Thermal & Chemical Resistance',
    accent: '#F59E0B',
    image: '/images/products/cpvc-pipes-samples-standing.jpg',
    badge: 'ASTM D-2846 / SDR 11 & 13.5',
    specs: [
      { label: 'Temperature Range', value: 'Up to 93°C (200°F)' },
      { label: 'Standards', value: 'IS 15778 / ASTM D2846' },
      { label: 'Solvent Joint', value: 'One-Step Heavy Duty' },
      { label: 'Chlorine Resistance', value: '100% Immune' },
    ],
    highlights: [
      'Handles boiling water without deformation',
      'Low thermal conductivity reduces heat loss',
      'Approved for domestic geyser lines and hospital systems',
    ],
    href: '/products/cpvc',
  },
  {
    id: 'swr',
    name: 'SWR Drainage System',
    tagline: 'Ring-Fit & Self-Fit Waste & Soil Solutions',
    accent: '#94A3B8',
    image: '/images/products/swr-pipe-samples-grey.jpg',
    badge: 'IS 13592 / Type A & B',
    specs: [
      { label: 'Jointing Method', value: 'Rubber Ring / Solvent' },
      { label: 'Diameter Range', value: '75mm & 110mm' },
      { label: 'UV Resistance', value: 'High Exterior Grade' },
      { label: 'Flow Rate', value: 'Optimal Self-Cleaning' },
    ],
    highlights: [
      'German EPDM rubber ring technology prevents soil leaks',
      'High impact resistance against underground backfill',
      'Lightweight and easy push-fit installation on high-rises',
    ],
    href: '/products/swr',
  },
  {
    id: 'agriculture',
    name: 'Agri Irrigation System',
    tagline: 'Tough, Flexible Water Conveyance for Farms & Borewells',
    accent: '#10B981',
    image: '/images/products/agri-pvc-ball-valve-blue.jpg',
    badge: 'IS 4985 / Class 1 to 5',
    specs: [
      { label: 'Working Pressure', value: '2.5 to 10 kg/cm²' },
      { label: 'Borewell Depth', value: 'Heavy Duty Casing' },
      { label: 'Energy Savings', value: '25% Less Friction' },
      { label: 'Corrosion Free', value: '100% Rust Proof' },
    ],
    highlights: [
      'Withstands high soil pressure and agricultural fertilizers',
      'UV stabilized for harsh open-sun field installations',
      'Comprehensive range of ball valves, foot valves & saddles',
    ],
    href: '/products/agriculture',
  },
];

export function PipeSystemSwitcher() {
  const [activeTab, setActiveTab] = useState<string>('upvc');
  const activeSystem = SYSTEMS.find((s) => s.id === activeTab) || SYSTEMS[0];

  return (
    <div className="w-full rounded-3xl border border-border bg-bg-inner/60 backdrop-blur-2xl p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
      {/* Dynamic Background Glow matching active accent */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: activeSystem.accent }}
      />
      <div
        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: activeSystem.accent }}
      />

      {/* Interactive Tabs Header */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-border no-scrollbar">
        {SYSTEMS.map((system) => {
          const isActive = system.id === activeTab;
          return (
            <button
              key={system.id}
              onClick={() => setActiveTab(system.id)}
              className={`relative px-5 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300 flex items-center gap-2.5 ${
                isActive
                  ? 'text-text-heading shadow-md'
                  : 'text-text-body hover:text-text-heading hover:bg-bg-inner-hover'
              }`}
              style={{
                backgroundColor: isActive ? `${system.accent}20` : undefined,
                borderColor: isActive ? `${system.accent}50` : 'transparent',
                borderWidth: 1,
              }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: system.accent }}
              />
              {system.name.split(' ')[0]} System
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: system.accent }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Active System Content Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSystem.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 lg:gap-12 items-center"
        >
          {/* Left Column: Details & Technical Metrics */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span
                className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md border uppercase"
                style={{
                  color: activeSystem.accent,
                  borderColor: `${activeSystem.accent}40`,
                  backgroundColor: `${activeSystem.accent}15`,
                }}
              >
                {activeSystem.badge}
              </span>
              <span className="text-xs font-mono text-text-muted">
                100% Quality Inspected
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold font-[var(--font-display)] text-text-heading mb-2">
              {activeSystem.name}
            </h3>
            <p className="text-text-body text-base mb-6 leading-relaxed">
              {activeSystem.tagline}
            </p>

            {/* Feature Checkmarks */}
            <div className="space-y-2.5 mb-8">
              {activeSystem.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2
                    className="w-5 h-5 shrink-0 mt-0.5"
                    style={{ color: activeSystem.accent }}
                  />
                  <span className="text-sm text-text-body font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* Spec Cards Grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {activeSystem.specs.map((spec, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-bg-inner border border-border backdrop-blur-md"
                >
                  <p className="text-[11px] font-mono text-text-muted uppercase tracking-wider mb-1">
                    {spec.label}
                  </p>
                  <p className="text-sm font-semibold text-text-heading font-mono">
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={activeSystem.href}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 shadow-md"
                style={{
                  backgroundColor: activeSystem.accent,
                  color: '#FFFFFF',
                }}
              >
                Explore {activeSystem.name.split(' ')[0]} Catalog
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-text-body hover:text-text-heading border border-border hover:bg-bg-inner-hover transition-colors"
              >
                Request Technical Data
              </Link>
            </div>
          </div>

          {/* Right Column: High-Res Specimen Visualizer */}
          <div className="relative aspect-[4/3] lg:aspect-[5/4] rounded-2xl overflow-hidden border border-border bg-bg-inner group">
            <Image
              src={activeSystem.image}
              alt={activeSystem.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 45vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-bg-inner/70 backdrop-blur-md border border-border flex items-center justify-between">
              <div>
                <p className="text-xs text-text-muted font-mono">Precision Extrusion</p>
                <p className="text-sm font-bold text-text-heading font-mono">
                  BIS / ISO 9001:2015 Certified
                </p>
              </div>
              <span
                className="w-3 h-3 rounded-full animate-ping"
                style={{ backgroundColor: activeSystem.accent }}
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
