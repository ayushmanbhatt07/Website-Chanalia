'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShieldCheck, Activity, Gauge, Award, ChevronRight } from 'lucide-react';

interface Stage {
  id: number;
  title: string;
  tagline: string;
  icon: typeof ShieldCheck;
  description: string;
  metric: string;
  metricLabel: string;
  standards: string[];
  image: string;
}

const STAGES: Stage[] = [
  {
    id: 1,
    title: 'Virgin Compound Formulation',
    tagline: 'Zero Recycled Adulteration Guarantee',
    icon: ShieldCheck,
    description: 'We exclusively source polymer-grade raw virgin PVC resin with micro-stabilizers. Every batch undergoes laboratory testing for K-value, bulk density, and pigment dispersion before feeding into extrusion.',
    metric: '100% Virgin',
    metricLabel: 'Material Purity Assurance',
    standards: ['IS 4985 Certified', 'Food-Grade Potable Safe'],
    image: '/images/products/factory-raw-material-pvc-resin.jpg',
  },
  {
    id: 2,
    title: 'Precision German Extrusion',
    tagline: 'Ultrasonic Wall-Thickness Monitoring',
    icon: Activity,
    description: 'Our automated multi-screw extrusion lines maintain uniform wall thickness and zero internal ovality. In-line ultrasonic thickness monitors continuously verify compliance with Schedule 40, Schedule 80, and SDR tolerances.',
    metric: '± 0.05 mm',
    metricLabel: 'Tolerance Precision Level',
    standards: ['ASTM D-1785', 'ASTM D-2846'],
    image: '/images/products/factory-pipe-extrusion-line.jpg',
  },
  {
    id: 3,
    title: 'Hydrostatic Burst Stress-Testing',
    tagline: 'Tested to 2.5x Working Pressure',
    icon: Gauge,
    description: 'Pipes are subjected to accelerated internal hydrostatic pressure testing at elevated temperatures to guarantee zero bursting, stress cracks, or seam separation throughout a 50+ year design lifespan.',
    metric: '2.5x Working PSI',
    metricLabel: 'Continuous Burst Safety Factor',
    standards: ['1000-Hour Sustained Test', 'Zero Leakage Guarantee'],
    image: '/images/products/factory-machinery-and-racks.jpg',
  },
  {
    id: 4,
    title: 'Traceability & Batch Certification',
    tagline: 'Every Meter Laser-Marked and Inspected',
    icon: Award,
    description: 'Each pipe and fitting is laser-etched with product name, schedule/class, batch number, date, and shift ID. Material Test Certificates (MTC) are issued for every project consignment dispatched from our Metoda factory.',
    metric: '100% Traceable',
    metricLabel: 'Batch Quality Audit Guarantee',
    standards: ['ISO 9001:2015', 'BIS Quality Mark'],
    image: '/images/products/factory-overhead-crane-production.jpg',
  },
];

export function QualityProcessTimeline() {
  const [activeStageId, setActiveStageId] = useState<number>(1);
  const activeStage = STAGES.find((s) => s.id === activeStageId) || STAGES[0];

  return (
    <div className="w-full">
      {/* Step Selector Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {STAGES.map((stage) => {
          const isActive = stage.id === activeStageId;
          const Icon = stage.icon;

          return (
            <button
              key={stage.id}
              onClick={() => setActiveStageId(stage.id)}
              className={`p-4 rounded-xl text-left transition-all duration-300 border flex items-center gap-3.5 ${
                isActive
                  ? 'bg-sky-500/10 border-sky-400/50 shadow-[0_0_24px_rgba(56,189,248,0.15)] text-white'
                  : 'bg-slate-900/40 border-white/[0.06] hover:bg-white/[0.02] text-slate-400'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                  isActive
                    ? 'bg-sky-400 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">
                  Stage 0{stage.id}
                </span>
                <p className="text-sm font-semibold truncate text-slate-200">
                  {stage.title}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Stage Detailed Display */}
      <div className="rounded-3xl border border-white/[0.08] bg-[#0A0F1D]/80 backdrop-blur-xl p-6 sm:p-10 overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs text-sky-400 font-mono mb-4 uppercase">
              Quality Assurance Milestone 0{activeStage.id}
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold font-[var(--font-display)] text-white mb-2">
              {activeStage.title}
            </h3>
            <p className="text-sm text-sky-300 font-mono mb-4">{activeStage.tagline}</p>
            <p className="text-slate-400 text-base leading-relaxed mb-6">
              {activeStage.description}
            </p>

            {/* Metric Callout */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/[0.06] flex items-center justify-between mb-6">
              <div>
                <p className="text-xs font-mono text-slate-500 uppercase">Benchmark</p>
                <p className="text-xs font-medium text-slate-300 mt-0.5">{activeStage.metricLabel}</p>
              </div>
              <span className="text-xl sm:text-2xl font-bold font-mono text-sky-400">
                {activeStage.metric}
              </span>
            </div>

            {/* Compliance Standards */}
            <div className="flex flex-wrap gap-2">
              {activeStage.standards.map((std, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-md text-xs font-mono bg-white/[0.04] border border-white/[0.08] text-slate-300"
                >
                  ✓ {std}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Factory Image */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/[0.1] bg-slate-950">
            <Image
              src={activeStage.image}
              alt={activeStage.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-slate-950/70 backdrop-blur-md border border-white/[0.08] text-xs font-mono text-slate-300 flex items-center justify-between">
              <span>Metoda G.I.D.C. Manufacturing Facility</span>
              <span className="text-sky-400">Verified Process</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
