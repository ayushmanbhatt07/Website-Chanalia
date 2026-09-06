import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center gap-1.5 text-small text-[var(--color-rio-mute)]', className)}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight className="w-3.5 h-3.5 shrink-0" />}
          {item.href && i < items.length - 1 ? (
            <Link
              href={item.href}
              className="hover:text-[var(--color-rio-blue)] transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-[var(--color-rio-ink)] font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
