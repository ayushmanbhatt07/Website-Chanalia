'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { SpecTable } from './SpecTable';
import type { SpecTable as SpecTableType } from '@/content/products';

type SpecTabsProps = {
  tables: SpecTableType[];
  accent?: string;
  showPricing?: boolean;
};

export function SpecTabs({ tables, accent, showPricing }: SpecTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  if (tables.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-[var(--color-rio-mute)] text-sm">
          Specifications coming soon. Contact us for details.
        </p>
      </div>
    );
  }

  if (tables.length === 1) {
    return <SpecTable table={tables[0]} accent={accent} showPricing={showPricing} />;
  }

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-0 border-b border-[var(--color-rio-line)] mb-6" role="tablist">
        {tables.map((table, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={activeTab === i}
            className={cn(
              'relative px-4 py-3 text-sm font-medium transition-colors cursor-pointer',
              activeTab === i
                ? 'text-[var(--color-rio-ink)]'
                : 'text-[var(--color-rio-mute)] hover:text-[var(--color-rio-slate)]'
            )}
            onClick={() => setActiveTab(i)}
          >
            {table.label}
            {activeTab === i && (
              <motion.div
                layoutId="spec-tab-underline"
                className="absolute bottom-0 left-0 right-0 h-[2px]"
                style={{ backgroundColor: accent || 'var(--color-rio-blue)' }}
                transition={{ duration: 0.25 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Active table */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25 }}
      >
        <SpecTable table={tables[activeTab]} accent={accent} showPricing={showPricing} />
      </motion.div>
    </div>
  );
}
