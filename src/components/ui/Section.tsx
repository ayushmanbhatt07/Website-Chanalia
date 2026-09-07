import { cn } from '@/lib/utils';
import { Container } from './Container';

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  bg?: 'paper' | 'sink' | 'night';
  id?: string;
};

const bgMap = {
  paper: 'bg-bg-outer',
  sink: 'bg-bg-inner border-y border-border',
  night: 'bg-bg-outer-alt border-y border-border',
};

export function Section({ children, className, bg = 'paper', id }: SectionProps) {
  return (
    <section id={id} className={cn('py-16 md:py-24 lg:py-32', bgMap[bg], className)}>
      <Container>{children}</Container>
    </section>
  );
}
