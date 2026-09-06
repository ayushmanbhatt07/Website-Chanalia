import Image from 'next/image';
import Link from 'next/link';
import { Thermometer, Home, Factory, FlaskConical, Droplets, ArrowRight, ShieldCheck, Award, CheckCircle2 } from 'lucide-react';
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
import { PipeSystemSwitcher } from '@/components/ui/PipeSystemSwitcher';
import { PipeRequirementCalculator } from '@/components/ui/PipeRequirementCalculator';
import { QualityProcessTimeline } from '@/components/ui/QualityProcessTimeline';
import { StatCounter } from '@/components/ui/StatCounter';
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
      {/* ── Cinematic Hero with Ambient Radial Lighting ── */}
      <section className="relative bg-[#080B10] pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-radial-mesh">
        {/* Subtle Ambient Aura Glow Behind Hero */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />

        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[58%_42%] gap-12 items-center mb-16">
            <Reveal>
              <div className="max-w-2xl">
                {/* Eyebrow badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-mono text-sky-400 mb-6 uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                  {hero.eyebrow}
                </div>

                <TypewriterText
                  text={hero.heading}
                  className="text-display-xl font-[var(--font-display)] text-white mb-6 leading-tight"
                  typingSpeed={50}
                />

                <p className="text-body-lg text-slate-300 mb-8 prose-width leading-relaxed">
                  {hero.body}
                </p>

                {/* Standards row & Trust Badge */}
                <div className="flex flex-wrap items-center gap-6 mb-8 p-4 rounded-2xl bg-slate-900/40 border border-white/[0.06] backdrop-blur-md">
                  <StandardsBadgeRow
                    standards={['ASTM D-2846', 'ASTM D-1785', 'IS 13592', 'IS 4985']}
                  />
                  <div className="h-8 w-px bg-white/[0.1] hidden sm:block" />
                  <div className="flex items-center gap-3">
                    <Image
                      src="/images/trust-badge.webp"
                      alt="20 Years of Trust"
                      width={56}
                      height={56}
                      style={{ width: '56px', height: '56px' }}
                      className="object-contain shrink-0"
                    />
                    <div>
                      <p className="text-xs font-mono font-bold text-white uppercase">20+ Years</p>
                      <p className="text-[11px] text-slate-400 font-mono">Industry Heritage</p>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4">
                  <Button href={hero.cta.href} className="text-sm px-6 py-3.5 shadow-[0_0_25px_rgba(56,189,248,0.3)]">
                    {hero.cta.label}
                  </Button>
                  <Button href={hero.ctaSecondary.href} variant="secondary" className="text-sm px-6 py-3.5">
                    {hero.ctaSecondary.label}
                  </Button>
                </div>
              </div>
            </Reveal>

            {/* Hero Image Showcase with 3D Depth */}
            <Reveal delay={0.15}>
              <div className="stage-3d-box relative aspect-[4/3] lg:aspect-[5/4] rounded-3xl overflow-hidden border border-white/[0.15] bg-slate-900 shadow-2xl group">
                <div className="halo-3d-glow bg-sky-500/30" />
                <Image
                  src={images.hero}
                  alt="Stacked PVC pipes seen end-on"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/[0.1] to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080B10]/90 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#0A0F1D]/80 backdrop-blur-md border border-white/[0.08] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-mono text-sky-400 uppercase">Manufactured by Reva Polyplast</span>
                    <p className="text-sm font-bold text-white font-mono">Metoda G.I.D.C., Rajkot, Gujarat</p>
                  </div>
                  <ShieldCheck className="w-6 h-6 text-sky-400 shrink-0" />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Centerpiece: Interactive Piping System Visualizer */}
          <Reveal delay={0.25}>
            <div className="mt-8">
              <PipeSystemSwitcher />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Trust Marquee */}
      <TrustMarquee />

      {/* ── Category Grid ── */}
      <Section bg="sink">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <Eyebrow>{categoryGrid.eyebrow}</Eyebrow>
              <h2 className="text-h2 font-[var(--font-display)] text-white mt-1">
                {categoryGrid.heading}
              </h2>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors"
            >
              View Full 68-Product Range
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>
        <CategoryGrid />
      </Section>

      {/* ── Interactive B2B Requirement Estimator ── */}
      <Section bg="paper">
        <Reveal>
          <PipeRequirementCalculator />
        </Reveal>
      </Section>

      {/* ── Quality Assurance & 4-Stage Testing Timeline ── */}
      <Section bg="sink">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Eyebrow>Precision Engineering & Testing</Eyebrow>
            <h2 className="text-h2 font-[var(--font-display)] text-white mt-1 mb-3">
              Zero-Defect Quality Benchmark
            </h2>
            <p className="text-slate-400 text-sm">
              Every meter of pipe and every fitting manufactured at our Rajkot facility conforms to strict Bureau of Indian Standards (BIS) and ASTM protocols.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <QualityProcessTimeline />
        </Reveal>
      </Section>

      {/* ── About Block with Live Factory Photo & Stats ── */}
      <Section bg="paper">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/[0.1] shadow-2xl group">
              <Image
                src={images.facility.production}
                alt="Factory floor with machinery and conveyor"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080B10]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/[0.08]">
                  <p className="text-[10px] font-mono uppercase text-slate-400">Total Factory Area</p>
                  <p className="text-base font-bold font-mono text-white">45,000+ Sq. Ft.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/[0.08]">
                  <p className="text-[10px] font-mono uppercase text-slate-400">Annual Capacity</p>
                  <p className="text-base font-bold font-mono text-sky-400">12,000+ Metric Tons</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Eyebrow>{about.eyebrow}</Eyebrow>
            <h2 className="text-h2 font-[var(--font-display)] text-white mt-1 mb-4">
              {about.heading}
            </h2>
            <p className="text-slate-300 leading-relaxed mb-6 prose-width">
              {about.body}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-slate-900/40 border border-white/[0.06]">
                <StatCounter value={20} suffix="+" label="Years of Manufacturing Trust" />
              </div>
              <div className="p-4 rounded-xl bg-slate-900/40 border border-white/[0.06]">
                <StatCounter value={68} suffix="+" label="Certified Piping SKUs" />
              </div>
            </div>

            <Button href={about.cta.href} variant="secondary">
              {about.cta.label}
            </Button>
          </Reveal>
        </div>
      </Section>

      {/* ── Applications / Benefits ── */}
      <Section bg="sink">
        <Reveal>
          <Eyebrow>{benefits.eyebrow}</Eyebrow>
          <h2 className="text-h2 font-[var(--font-display)] text-white mt-1 mb-2">
            {benefits.heading}
          </h2>
          <p className="text-slate-400 mb-10 prose-width text-sm">
            {benefits.subtitle}
          </p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {benefits.items.map((item, i) => {
            const Icon = benefitIcons[item.icon];
            const bgImage = benefitImages[item.title];

            return (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="p-5 rounded-2xl bg-[#0A0F1D]/60 border border-white/[0.06] hover:border-sky-500/30 flex flex-col items-center text-center transition-all group">
                  {bgImage ? (
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden mb-3 border border-white/[0.08]">
                      <Image
                        src={bgImage}
                        alt={`${item.title} application`}
                        fill
                        sizes="56px"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-3">
                      <Icon className="w-6 h-6 text-sky-400" />
                    </div>
                  )}
                  <span className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                    {item.title}
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* ── What We Do ── */}
      <Section bg="paper">
        <Reveal>
          <Eyebrow>{whatWeDo.eyebrow}</Eyebrow>
          <h2 className="text-h2 font-[var(--font-display)] text-white mt-1 mb-10">
            {whatWeDo.heading}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {whatWeDo.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.07}>
              <div className="p-6 rounded-2xl bg-slate-900/30 border border-white/[0.06] flex gap-5 items-start hover:border-white/[0.12] transition-colors">
                <span className="font-mono text-2xl font-bold text-sky-400/40 shrink-0 w-10">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-lg font-bold font-[var(--font-display)] text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
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
      <Section bg="paper">
        <Reveal>
          <div className="text-center max-w-xl mx-auto p-10 rounded-3xl border border-white/[0.08] bg-gradient-to-b from-slate-900/80 to-[#080B10] shadow-2xl">
            <h2 className="text-h2 font-[var(--font-display)] text-white mb-3">
              {dealerCta.heading}
            </h2>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
              {dealerCta.body}
            </p>
            <Button href={dealerCta.cta.href} className="px-8 py-3.5 shadow-lg shadow-sky-500/20">
              {dealerCta.cta.label}
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
