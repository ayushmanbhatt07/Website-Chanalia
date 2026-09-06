import Image from 'next/image';
import { cn } from '@/lib/utils';
import { StandardsBadgeRow } from './StandardsBadgeRow';

type ProductHeroProps = {
  name: string;
  standard: string;
  sizeRange?: string;
  image?: string;
  accent?: string;
};

export function ProductHero({ name, standard, sizeRange, image, accent }: ProductHeroProps) {
  if (image) {
    return (
      <div className="relative w-full aspect-[16/7] rounded-lg overflow-hidden bg-[var(--color-rio-sink)]">
        <Image
          src={image}
          alt={name}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>
    );
  }

  // Typographic panel — deliberate, technical, not broken
  return (
    <div
      className={cn(
        'relative w-full rounded-lg overflow-hidden p-8 md:p-12 lg:p-16',
        'bg-[var(--color-rio-sink)]'
      )}
    >
      <div
        className="absolute top-0 left-0 w-1.5 h-full"
        style={{ backgroundColor: accent || 'var(--color-rio-blue)' }}
      />
      <div className="max-w-2xl">
        <StandardsBadgeRow standards={[standard]} className="mb-4" />
        <h1 className="text-display-lg font-[var(--font-display)] text-[var(--color-rio-ink)] mb-3">
          {name}
        </h1>
        {sizeRange && (
          <p className="text-sm font-data text-[var(--color-rio-mute)]">
            Available sizes: {sizeRange}
          </p>
        )}
      </div>
    </div>
  );
}
