import Link from 'next/link';
import { cn } from '@/lib/utils';

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
};

const variants = {
  primary:
    'bg-[var(--color-rio-blue)] text-white hover:bg-[var(--color-rio-blue-dark)] border border-transparent',
  secondary:
    'bg-transparent text-[var(--color-rio-blue)] border border-[var(--color-rio-blue)] hover:bg-[var(--color-rio-blue-tint)]',
  ghost:
    'bg-transparent text-[var(--color-rio-ink)] hover:bg-[var(--color-rio-sink)] border border-transparent',
};

export function Button({
  children,
  href,
  variant = 'primary',
  className,
  type = 'button',
  disabled,
  onClick,
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-lg transition-colors duration-150 cursor-pointer',
    'focus-visible:outline-2 focus-visible:outline-[var(--color-rio-blue)] focus-visible:outline-offset-2',
    disabled && 'opacity-50 cursor-not-allowed',
    variants[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
