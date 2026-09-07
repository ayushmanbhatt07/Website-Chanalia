'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calculator, CheckCircle2, MessageCircle, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';
import { site } from '@/content/site';

interface ApplicationScenario {
  id: string;
  title: string;
  subtitle: string;
  recommendedCategory: string;
  recommendedStandard: string;
  pressureRating: string;
  tempRating: string;
  jointingMethod: string;
  keyFittings: string[];
  whyThisChoice: string;
  accent: string;
}

const SCENARIOS: ApplicationScenario[] = [
  {
    id: 'res-hot-cold',
    title: 'Domestic Hot & Cold Water',
    subtitle: 'Apartments, villas, bathroom geysers & solar water heaters',
    recommendedCategory: 'RIO CPVC Plumbing System',
    recommendedStandard: 'ASTM D-2846 / SDR 11 & SDR 13.5',
    pressureRating: 'Up to 28 kg/cm² (400 PSI at 23°C)',
    tempRating: 'Up to 93°C (Continuous Hot Water)',
    jointingMethod: 'RIO CPVC Heavy Duty Solvent Cement',
    keyFittings: ['Brass MTA / FTA', '90° Elbow', 'Equal Tee', 'Step Over Bend', 'Union'],
    whyThisChoice: 'Zero corrosion with boiling hot water, prevents bacteria scaling, and ensures 100% lead-free drinking purity.',
    accent: '#F59E0B',
  },
  {
    id: 'res-pressure',
    title: 'Cold Water Mains & Commercial High-Rise',
    subtitle: 'Overhead tank downers, riser shafts, and potable cold distribution',
    recommendedCategory: 'RIO UPVC Pressure System',
    recommendedStandard: 'ASTM D-1785 / Schedule 40 & 80',
    pressureRating: 'Up to 450 PSI (Schedule 80)',
    tempRating: 'Cold Water Distribution (Up to 60°C)',
    jointingMethod: 'RIO UPVC Medium/Heavy Solvent Cement',
    keyFittings: ['Coupler Socket', 'Reducing Tee', 'Threaded Ball Valve', 'End Cap', 'Flange'],
    whyThisChoice: 'Highest burst strength per rupee, high chemical resistance, and non-conductive safety.',
    accent: '#38BDF8',
  },
  {
    id: 'drainage',
    title: 'Soil, Waste & Rainwater (Drainage)',
    subtitle: 'Building discharge stacks, vent lines, and underground sewage',
    recommendedCategory: 'RIO SWR Drainage System',
    recommendedStandard: 'IS 13592 / Type A (Vent) & Type B (Soil)',
    pressureRating: 'Gravity Flow & Hydrostatic Head',
    tempRating: 'Atmospheric Drainage',
    jointingMethod: 'German EPDM Ring-Fit (Self-Expanding Gasket)',
    keyFittings: ['Door Elbow 90°', 'Door Tee', 'Nahani Floor Trap', 'Double Wye', 'Vent Cowl'],
    whyThisChoice: '100% leakproof rubber ring joints absorb building thermal expansion and eliminate foul odor backflow.',
    accent: '#94A3B8',
  },
  {
    id: 'agriculture',
    title: 'Agricultural Farm & Borewell Delivery',
    subtitle: 'Drip irrigation, submersible pump delivery, and field flooding',
    recommendedCategory: 'RIO Agriculture Pressure System',
    recommendedStandard: 'IS 4985 / Class 1 to 5',
    pressureRating: '2.5 to 10 kg/cm²',
    tempRating: 'Outdoor Ambient (UV Stabilized)',
    jointingMethod: 'Elastomeric Ring Joint / Solvent Fit',
    keyFittings: ['PVC Agriculture Ball Valve', 'HDPE Foot Valve', 'Service Saddle', 'Tail Piece'],
    whyThisChoice: 'UV protected against harsh direct sun, low hydraulic friction gives 25% higher water discharge at farm.',
    accent: '#10B981',
  },
];

export function PipeRequirementCalculator() {
  const [selectedId, setSelectedId] = useState<string>('res-hot-cold');
  const scenario = SCENARIOS.find((s) => s.id === selectedId) || SCENARIOS[0];

  const whatsappMessage = encodeURIComponent(
    `Hello RIO Pipes team, I used your Online Piping Calculator for: "${scenario.title}". Please share quotation & catalog for ${scenario.recommendedCategory} (${scenario.recommendedStandard}).`
  );
  const whatsappUrl = `https://wa.me/${site.contact.phone.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`;

  return (
    <div className="rounded-3xl border border-border bg-bg-inner/80 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Calculator className="w-5 h-5 text-accent-primary" />
            <span className="text-xs font-mono font-semibold text-accent-primary uppercase tracking-wider">
              Interactive B2B Engineer Tool
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-[var(--font-display)] text-text-heading">
            Piping System Recommendation Wizard
          </h3>
          <p className="text-text-body text-sm mt-1">
            Select your project requirements to calculate the exact pipe class, standards, and required fittings list.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-xs text-accent-primary font-mono shrink-0">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Instant Specification Match</span>
        </div>
      </div>

      {/* Step 1: Select Scenario Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {SCENARIOS.map((sc) => {
          const isSelected = sc.id === selectedId;
          return (
            <button
              key={sc.id}
              onClick={() => setSelectedId(sc.id)}
              className={`p-4 rounded-xl text-left transition-all duration-300 border ${
                isSelected
                  ? 'bg-bg-inner border-accent-primary/50 shadow-md shadow-accent-primary/15'
                  : 'bg-bg-inner/40 border-border hover:bg-bg-inner-hover hover:border-text-muted'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: sc.accent }}
                />
                {isSelected && (
                  <span className="text-[10px] font-mono font-semibold text-accent-primary uppercase">
                    Selected
                  </span>
                )}
              </div>
              <p className="text-sm font-semibold text-text-heading mb-1">{sc.title}</p>
              <p className="text-xs text-text-muted line-clamp-2 leading-relaxed">{sc.subtitle}</p>
            </button>
          );
        })}
      </div>

      {/* Step 2: Recommendation Card */}
      <div className="rounded-2xl border border-border bg-bg-inner/60 p-6 sm:p-8 backdrop-blur-md">
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8 items-center">
          <div>
            <div className="inline-block text-xs font-mono font-semibold px-2.5 py-1 rounded border mb-3 uppercase"
              style={{
                color: scenario.accent,
                borderColor: `${scenario.accent}40`,
                backgroundColor: `${scenario.accent}15`,
              }}
            >
              Recommended Specification
            </div>

            <h4 className="text-xl sm:text-2xl font-bold text-text-heading mb-2">
              {scenario.recommendedCategory}
            </h4>
            <p className="text-sm text-text-body mb-6 leading-relaxed">
              {scenario.whyThisChoice}
            </p>

            {/* Spec Matrix */}
            <div className="grid grid-cols-2 gap-3 mb-6 text-xs">
              <div className="p-3 rounded-lg bg-bg-outer/60 border border-border">
                <span className="text-text-muted block mb-0.5 font-mono">Standard Compliance</span>
                <span className="font-semibold text-text-heading">{scenario.recommendedStandard}</span>
              </div>
              <div className="p-3 rounded-lg bg-bg-outer/60 border border-border">
                <span className="text-text-muted block mb-0.5 font-mono">Pressure Rating</span>
                <span className="font-semibold text-text-heading">{scenario.pressureRating}</span>
              </div>
              <div className="p-3 rounded-lg bg-bg-outer/60 border border-border">
                <span className="text-text-muted block mb-0.5 font-mono">Temperature Range</span>
                <span className="font-semibold text-text-heading">{scenario.tempRating}</span>
              </div>
              <div className="p-3 rounded-lg bg-bg-outer/60 border border-border">
                <span className="text-text-muted block mb-0.5 font-mono">Recommended Jointing</span>
                <span className="font-semibold text-text-heading">{scenario.jointingMethod}</span>
              </div>
            </div>

            {/* Fittings checklist */}
            <div>
              <p className="text-xs font-mono uppercase text-text-muted mb-2">Essential Fittings Required:</p>
              <div className="flex flex-wrap gap-1.5">
                {scenario.keyFittings.map((fit, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md bg-bg-outer text-text-body border border-border"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-status-success" />
                    {fit}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: CTA Box */}
          <div className="rounded-xl border border-border bg-bg-inner p-6 flex flex-col justify-center text-center">
            <ShieldAlert className="w-8 h-8 mx-auto text-accent-primary mb-3" />
            <h5 className="text-base font-bold text-text-heading mb-1">
              Need Bulk Factory Pricing?
            </h5>
            <p className="text-xs text-text-body mb-6 leading-relaxed">
              Direct factory supply for builders, plumbing contractors, and agricultural projects from Metoda G.I.D.C., Rajkot.
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-semibold text-sm transition-all duration-300 shadow-md mb-3"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              1-Click WhatsApp RFQ
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-border text-xs font-medium text-text-body hover:text-text-heading hover:bg-bg-inner-hover transition-colors"
            >
              Request Formal Rate Sheet
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
