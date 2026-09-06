import { cn } from '@/lib/utils';
import { Container } from './Container';

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  bg?: 'paper' | 'sink' | 'night';
  id?: string;
};

const bgMap = {
  paper: 'bg-[var(--color-rio-paper)]',
  sink: 'bg-[var(--color-rio-sink)]',
  night: 'bg-[var(--color-rio-night)] text-white',
};

export function Section({ children, className, bg = 'paper', id }: SectionProps) {
  return (
    <section id={id} className={cn('py-16 md:py-24 lg:py-32', bgMap[bg], className)}>
      <Container>{children}</Container>
    </section>
  );
}
