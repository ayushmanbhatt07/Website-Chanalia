'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

type ProductCardProps = {
  name: string;
  standard: string;
  href: string;
  accent?: string;
  image?: string;
};

export function ProductCard({ name, standard, href, accent, image }: ProductCardProps) {
  return (
    <>
      <Link
        href={href}
        className={cn(
          'group block relative p-6 rounded-xl border border-[var(--color-rio-line)] bg-[var(--color-rio-surface)]',
          'hover:border-[var(--color-rio-blue)] hover:shadow-[0_8px_24px_rgba(22,24,26,0.12)] transition-all duration-300'
        )}
      >
        {/* Hover overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[var(--color-rio-blue)]/5 pointer-events-none">
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="flex items-center justify-center text-[var(--color-rio-ink)] bg-[var(--color-rio-blue-tint)]/20 hover:bg-[var(--color-rio-blue-tint)]/30 border border-[var(--color-rio-blue)]/30 px-4 py-2 text-sm font-medium cursor-pointer pointer-events-auto"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/contact';
              }}
            >
              Enquire Now
            </span>
          </div>
        </div>

        <div className="relative z-10 mb-4 flex items-start justify-between">
          <span
            className="inline-block px-3 py-1.5 text-[11px] font-data rounded border border-[var(--color-rio-line)]"
            style={{ color: accent }}
          >
            {standard}
          </span>
        </div>

        {image && (
          <div className="relative h-48 w-full mb-4 rounded overflow-hidden bg-[var(--color-rio-paper)] flex items-center justify-center">
            <Image src={image} alt={name} fill className="object-cover" />
          </div>
        )}

        <h3 className="text-h3 font-[var(--font-display)] text-[var(--color-rio-ink)] mb-4 leading-snug">
          {name}
        </h3>

        <div className="mb-4">
          <span
            className="text-sm font-medium transition-colors"
            style={{ color: accent || 'var(--color-rio-blue)' }}
          >
            View specifications →
          </span>
        </div>

        <div
          className="mt-4 h-[2px] w-0 group-hover:w-full transition-all duration-300"
          style={{ backgroundColor: accent || 'var(--color-rio-blue)' }}
        />
      </Link>
    </>
  );
}
