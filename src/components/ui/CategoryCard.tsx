'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Layers } from 'lucide-react';
import type { Category } from '@/content/categories';
import { getProductsByCategory } from '@/content/products';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

type CategoryCardProps = {
  category: Category;
};

export function CategoryCard({ category }: CategoryCardProps) {
  const products = getProductsByCategory(category.slug);
  const productCount = products.length;

  return (
    <Link href={`/products/${category.slug}`} className="block group select-none">
      <SpotlightCard
        className="stage-3d-box h-full flex flex-col overflow-hidden bg-[#0A0F1D]/85 border-white/[0.1] hover:border-white/[0.22] rounded-2xl"
        spotlightColor={`${category.accentHex}28`}
        borderGlowColor={`${category.accentHex}65`}
      >
        {/* 3D Image Banner with Halo Backlight Blur */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
          {/* Ambient 3D Halo Glow */}
          <div
            className="halo-3d-glow"
            style={{ backgroundColor: category.accentHex }}
          />

          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          />

          {/* Top specular reflection */}
          <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/[0.1] to-transparent pointer-events-none" />

          {/* Bottom vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1D] via-[#0A0F1D]/40 to-transparent" />

          {/* Category Standard Pill */}
          <div className="absolute top-3.5 left-3.5 z-10">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-mono font-semibold rounded-lg backdrop-blur-md border uppercase shadow-lg"
              style={{
                color: category.accentHex,
                backgroundColor: 'rgba(10, 15, 29, 0.85)',
                borderColor: `${category.accentHex}40`,
              }}
            >
              <Layers className="w-3 h-3" />
              {category.standards[0] || 'IS / ASTM Certified'}
            </span>
          </div>
        </div>

        {/* Content Box */}
        <div className="p-6 flex-1 flex flex-col justify-between relative z-10">
          <div>
            <h3 className="text-xl font-bold font-heading text-white mb-2 group-hover:text-sky-300 transition-colors">
              {category.name}
            </h3>
            <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed mb-4">
              {category.description}
            </p>
          </div>

          <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500">
              {productCount} SKUs Cataloged
            </span>
            <span
              className="text-xs font-semibold font-mono flex items-center gap-1.5 transition-transform group-hover:translate-x-1"
              style={{ color: category.accentHex }}
            >
              Explore Range
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </SpotlightCard>
    </Link>
  );
}