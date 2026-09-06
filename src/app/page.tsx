import Image from 'next/image';
import { Thermometer, Home, Factory, FlaskConical, Droplets } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { CategoryGrid } from '@/components/ui/CategoryGrid';
import { StandardsBadgeRow } from '@/components/ui/StandardsBadgeRow';
import { TestimonialSection } from '@/components/ui/TestimonialSection';
import { CTABand } from '@/components/ui/CTABand';
import { Container } from '@/components/ui/Container';
import TypewriterText from '@/components/ui/TypewriterText';
import TrustMarquee from '@/components/ui/TrustMarquee';
import { homeContent } from '@/content/home';
import { images } from '@/content/images';

const benefitIcons = {
  Thermometer,
  Home,
  Factory,
  FlaskConical,
  Droplets,
};

const benefitImages: Record<string, string> = {
  'Hot & Cold Plumbing': images.applications.hotCold,
  'Residential Use': images.applications.residential,
  'Industrial Use': images.applications.industrial,
};

export default function HomePage() {
  const { hero, categoryGrid, about, benefits, whatWeDo, ctaBand, dealerCta } = homeContent;

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-[var(--color-rio-paper)] pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-36 lg:pb-32 overflow-hidden">
        <Container className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 items-center">
          <Reveal>
            <div className="max-w-xl">
              <Eyebrow>{hero.eyebrow}</Eyebrow>
              <TypewriterText 
                text={hero.heading} 
                className="text-display-xl font-[var(--font-display)] text-[var(--color-rio-ink)] mb-6" 
                typingSpeed={70} 
              />
              <p className="text-body-lg text-[var(--color-rio-slate)] mb-6 prose-width">
                {hero.body}
              </p>
              <div className="flex items-center gap-6 mb-8">
                <StandardsBadgeRow
                  standards={['ASTM D-2846', 'ASTM D-1785', 'IS 13592', 'IS 4985']}
                />
                <Image src="/images/trust-badge.webp" alt="20 Years of Trust" width={80} height={80} className="object-contain" style={{ width: 'auto', height: 'auto' }} />
              </div>
              <div className="flex flex-wrap gap-3">
                <Button href={hero.cta.href}>{hero.cta.label}</Button>
                <Button href={hero.ctaSecondary.href} variant="secondary">
                  {hero.ctaSecondary.label}
                </Button>
              </div>
            </div>
          </Reveal>

          {/* Hero image */}
          <Reveal delay={0.15}>
            <div className="relative aspect-[3/4] lg:aspect-auto lg:h-[500px] rounded-lg overflow-hidden">
              {/* STOCK IMAGERY — replace with real client photography when supplied */}
              <Image
                src={images.hero}
                alt="Stacked PVC pipes seen end-on"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Trust Marquee */}
      <TrustMarquee />

      {/* ── Category Grid ── */}
      <Section bg="sink">
        <Reveal>
          <Eyebrow>{categoryGrid.eyebrow}</Eyebrow>
          <h2 className="text-h2 font-[var(--font-display)] text-[var(--color-rio-ink)] mb-8">
            {categoryGrid.heading}
          </h2>
        </Reveal>
        <CategoryGrid />
      </Section>

      {/* ── About Block ── */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              {/* STOCK IMAGERY — replace with real facility photo when supplied */}
              <Image
                src={images.facility.production}
                alt="Factory floor with machinery and conveyor"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow>{about.eyebrow}</Eyebrow>
            <h2 className="text-h2 font-[var(--font-display)] text-[var(--color-rio-ink)] mb-4">
              {about.heading}
            </h2>
            <p className="text-[var(--color-rio-slate)] leading-relaxed mb-6 prose-width">
              {about.body}
            </p>
            <Button href={about.cta.href} variant="secondary">
              {about.cta.label}
            </Button>
          </Reveal>
        </div>
      </Section>

      {/* ── Benefits ── */}
      <Section bg="sink">
        <Reveal>
          <Eyebrow>{benefits.eyebrow}</Eyebrow>
          <h2 className="text-h2 font-[var(--font-display)] text-[var(--color-rio-ink)] mb-2">
            {benefits.heading}
          </h2>
          <p className="text-[var(--color-rio-slate)] mb-10 prose-width">
            {benefits.subtitle}
          </p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {benefits.items.map((item, i) => {
            const Icon = benefitIcons[item.icon];
            const bgImage = benefitImages[item.title];

            return (
              <Reveal key={item.title} delay={i * 0.07}>
                <div className="flex flex-col items-center text-center">
                  {bgImage ? (
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden mb-3">
                      {/* STOCK IMAGERY — replace with real photography when supplied */}
                      <Image
                        src={bgImage}
                        alt={`${item.title} application`}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-[var(--color-rio-blue-tint)] flex items-center justify-center mb-3">
                      <Icon className="w-7 h-7 text-[var(--color-rio-blue)]" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-[var(--color-rio-ink)]">
                    {item.title}
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* ── What We Do ── */}
      <Section>
        <Reveal>
          <Eyebrow>{whatWeDo.eyebrow}</Eyebrow>
          <h2 className="text-h2 font-[var(--font-display)] text-[var(--color-rio-ink)] mb-10">
            {whatWeDo.heading}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {whatWeDo.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.07}>
              <div className="flex gap-4">
                <span className="font-data text-2xl font-bold text-[var(--color-rio-line)] shrink-0 w-10">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-h3 font-[var(--font-display)] text-[var(--color-rio-ink)] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--color-rio-slate)] leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── CTA Band ── */}
      <CTABand
        eyebrow={ctaBand.eyebrow}
        heading={ctaBand.heading}
        body={ctaBand.body}
        cta={ctaBand.cta}
      />

      {/* ── Testimonials ── */}
      <Section bg="sink">
        <TestimonialSection />
      </Section>

      {/* ── Dealer CTA ── */}
      <Section>
        <Reveal>
          <div className="text-center max-w-lg mx-auto">
            <h2 className="text-h2 font-[var(--font-display)] text-[var(--color-rio-ink)] mb-3">
              {dealerCta.heading}
            </h2>
            <p className="text-[var(--color-rio-slate)] mb-6">
              {dealerCta.body}
            </p>
            <Button href={dealerCta.cta.href}>{dealerCta.cta.label}</Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
