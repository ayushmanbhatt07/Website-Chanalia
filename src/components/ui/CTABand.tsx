import { cn } from '@/lib/utils';
import { Container } from './Container';
import { Eyebrow } from './Eyebrow';
import { Button } from './Button';

type CTABandProps = {
  eyebrow?: string;
  heading: string;
  body?: string;
  cta: { label: string; href: string };
  className?: string;
};

export function CTABand({ eyebrow, heading, body, cta, className }: CTABandProps) {
  return (
    <section className={cn('py-16 md:py-24 bg-accent-primary', className)}>
      <Container className="text-center max-w-2xl mx-auto">
        {eyebrow && <Eyebrow accent="#FFFFFF" className="justify-center">{eyebrow}</Eyebrow>}
        <h2 className="text-h2 font-[var(--font-display)] text-white mb-4">
          {heading}
        </h2>
        {body && (
          <p className="text-sm text-slate-300 leading-relaxed mb-8 prose-width mx-auto">
            {body}
          </p>
        )}
        <Button href={cta.href} className="bg-white text-accent-primary hover:bg-gray-100">
          {cta.label}
        </Button>
      </Container>
    </section>
  );
}
