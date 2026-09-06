'use client';

import { cn } from '@/lib/utils';
import type { SpecTable as SpecTableType } from '@/content/products';

type SpecTableProps = {
  table: SpecTableType;
  accent?: string;
  showPricing?: boolean;
};

export function SpecTable({ table, accent, showPricing = true }: SpecTableProps) {
  // Filter out pricing columns if showPricing is false and table contains pricing
  const visibleColumns = table.columns;
  const visibleRows = table.rows;

  if (table.containsPricing && !showPricing) {
    // For now, render all — pricing gate can filter specific columns later
    // when the client confirms which columns contain prices
  }

  return (
    <div className="relative">
      {table.caption && (
        <p className="text-sm font-medium text-[var(--color-rio-mute)] mb-3 font-data">
          {table.caption}
        </p>
      )}
      <div
        className="overflow-x-auto relative rounded-lg border border-[var(--color-rio-line)/50] bg-[var(--color-rio-surface)]/5 backdrop-blur-sm"
        tabIndex={0}
        role="region"
        aria-label={`Specifications: ${table.label}`}
      >
        {/* Edge fade hint for mobile */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[var(--color-rio-surface)]/20 to-transparent pointer-events-none z-10 md:hidden" />

        <table className="w-full min-w-[500px]">
          <caption className="sr-only">{table.label}</caption>
          <thead>
            <tr
              className="border-b-2"
              style={{ borderBottomColor: accent || 'var(--color-rio-blue)' }}
            >
              {visibleColumns.map((col, i) => (
                <th
                  key={i}
                  scope="col"
                  className={cn(
                    'px-4 py-3 text-xs font-semibold text-[var(--color-rio-ink)] bg-[var(--color-rio-surface)]/10 backdrop-blur-sm whitespace-nowrap',
                    i === 0 && 'sticky left-0 z-10 bg-[var(--color-rio-surface)]/10 backdrop-blur-sm'
                  )}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row, ri) => (
              <tr
                key={ri}
                className={cn(
                  'border-b border-[var(--color-rio-line)/50] last:border-b-0',
                  ri % 2 === 1 && 'bg-[var(--color-rio-surface)]/10'
                )}
              >
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className={cn(
                      'px-4 py-2.5 text-sm text-[var(--color-rio-ink)]',
                      ci === 0 && 'sticky left-0 z-10 font-medium',
                      ci === 0 && ri % 2 === 1 ? 'bg-[var(--color-rio-surface)]/10' : ci === 0 ? 'bg-[var(--color-rio-surface)]/5' : ''
                    )}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}