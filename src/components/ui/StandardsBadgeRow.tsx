import { cn } from '@/lib/utils';

type StandardsBadgeRowProps = {
  standards: string[];
  className?: string;
};

export function StandardsBadgeRow({ standards, className }: StandardsBadgeRowProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {standards.map((std) => (
        <span
          key={std}
          className="inline-block px-3 py-1 text-xs font-data border border-[var(--color-rio-line)] rounded text-[var(--color-rio-slate)] bg-[var(--color-rio-surface)]"
        >
          {std}
        </span>
      ))}
    </div>
  );
}
