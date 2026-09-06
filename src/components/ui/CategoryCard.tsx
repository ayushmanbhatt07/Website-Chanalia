'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { Category } from '@/content/categories';
import { getProductsByCategory } from '@/content/products';

type CategoryCardProps = {
  category: Category;
};

export function CategoryCard({ category }: CategoryCardProps) {
  const productCount = getProductsByCategory(category.slug).length;

  return (
    <>
      <Link
        href={`/products/${category.slug}`}
        className={cn(
          'group relative block rounded-lg overflow-hidden border border-[var(--color-rio-line)]',
          'hover:border-[var(--color-rio-blue)] hover:shadow-[0_8px_24px_rgba(22,24,26,0.12)] transition-all duration-300'
        )}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {/* STOCK IMAGERY — replace with real client photography when supplied */}
          <Image
            src={category.image}
            alt={`Stacked pipes for ${category.name.toLowerCase()}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-[1.06] transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-5 bg-[var(--color-rio-surface)]">
          <h3 className="text-h3 font-[var(--font-display)] text-[var(--color-rio-ink)] mb-3">
            {category.name}
          </h3>
          <p className="text-sm text-[var(--color-rio-mute)] line-clamp-2 mb-4">
            {category.description}
          </p>
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs text-[var(--color-rio-mute)] font-data">
              {productCount} product{productCount !== 1 ? 's' : ''}
            </span>
            <span
              className="text-sm font-medium transition-colors opacity-hover group-hover:opacity-100"
              style={{ color: category.accentHex }}
            >
              View products →
            </span>
          </div>

          {/* Accent rule */}
          <div
            className="mt-4 h-[2px] w-0 group-hover:w-full transition-all duration-300"
            style={{ backgroundColor: category.accentHex }}
          />
        </div>

        {/* Hover overlay for enquiry */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[var(--color-rio-blue)]/5 pointer-events-none">
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="flex items-center justify-center text-[var(--color-rio-ink)] bg-[var(--color-rio-blue-tint)]/20 hover:bg-[var(--color-rio-blue-tint)]/30 border border-[var(--color-rio-blue)]/30 px-6 py-2.5 text-sm font-semibold rounded cursor-pointer pointer-events-auto"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/contact';
              }}
            >
              Enquire Now
            </span>
          </div>
        </div>
      </Link>
    </>
  );
}