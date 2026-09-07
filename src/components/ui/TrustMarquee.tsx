'use client';

import React from 'react';
import { Star, ShieldCheck, Award, Zap } from 'lucide-react';
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from '@/components/effects/ScrollVelocityMarquee';

const ROW1_ITEMS = [
  'ASTM D-2846 CPVC STANDARD',
  'ASTM D-1785 SCH 40 & 80 UPVC',
  'IS 13592 SWR DRAINAGE SYSTEM',
  'IS 4985 AGRI PRESSURE PIPES',
  '100% VIRGIN POLYMERS ONLY',
  'HIGH TENSILE CRUSH RESISTANCE',
  'ZERO LEAD NON-TOXIC DRINKING SAFE',
  'PRECISION INJECTION MOULDED',
];

const ROW2_ITEMS = [
  'DIRECT FACTORY MANUFACTURING • METODA GIDC',
  'PAN-INDIA COMMERCIAL & INFRA LOGISTICS',
  '20+ YEARS LEADERSHIP EXPERIENCE',
  '68+ HEAVY-DUTY INDUSTRIAL FITTINGS',
  'CHEMICAL & CORROSION IMMUNITY',
  'RAPID DISPATCH BULK CONSIGNMENTS',
];

export function TrustMarquee() {
  return (
    <div className="w-full bg-[#070B12] border-y border-white/[0.08] py-5 relative overflow-hidden select-none">
      {/* Subtle edge masks for sleek fade out */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 z-10 pointer-events-none bg-gradient-to-r from-[#070B12] to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 z-10 pointer-events-none bg-gradient-to-l from-[#070B12] to-transparent" />

      <ScrollVelocityContainer className="flex flex-col gap-3.5">
        {/* Row 1: Leftward moving */}
        <ScrollVelocityRow baseVelocity={3} direction={1}>
          <div className="inline-flex items-center gap-8 px-4">
            {ROW1_ITEMS.map((item, index) => (
              <div key={index} className="inline-flex items-center gap-6">
                <span className="font-heading text-lg sm:text-xl tracking-wider text-slate-200 uppercase whitespace-nowrap hover:text-sky-400 transition-colors">
                  {item}
                </span>
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-400">
                  <Star className="w-2.5 h-2.5 fill-sky-400" />
                </span>
              </div>
            ))}
          </div>
        </ScrollVelocityRow>

        {/* Row 2: Rightward moving */}
        <ScrollVelocityRow baseVelocity={3} direction={-1}>
          <div className="inline-flex items-center gap-8 px-4">
            {ROW2_ITEMS.map((item, index) => (
              <div key={index} className="inline-flex items-center gap-6">
                <span className="font-heading text-base sm:text-lg tracking-wider text-slate-400 uppercase whitespace-nowrap hover:text-white transition-colors">
                  {item}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 shadow-[0_0_6px_#F59E0B]" />
              </div>
            ))}
          </div>
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
    </div>
  );
}

export default TrustMarquee;
