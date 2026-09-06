import { cn } from '@/lib/utils';

type EyebrowProps = {
  children: React.ReactNode;
  accent?: string; // CSS color value or tailwind class
  className?: string;
};

export function Eyebrow({ children, accent, className }: EyebrowProps) {
  return (
    <div className={cn('flex items-center gap-3 mb-4', className)}>
      <span
        className="block w-6 h-[2px] shrink-0"
        style={{ backgroundColor: accent || 'var(--color-rio-blue)' }}
      />
      <span
        className="text-eyebrow font-[var(--font-body)]"
        style={{ color: accent || 'var(--color-rio-blue)' }}
      >
        {children}
      </span>
    </div>
  );
}
