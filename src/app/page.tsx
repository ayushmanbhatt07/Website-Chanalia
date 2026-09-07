import Image from 'next/image';
import Link from 'next/link';
import {
  Thermometer,
  Home,
  Factory,
  FlaskConical,
  Droplets,
  ArrowRight,
  ShieldCheck,
  Award,
  CheckCircle2,
} from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { CategoryScrollShowcase } from '@/components/home/CategoryScrollShowcase';
import { TestimonialSection } from '@/components/ui/TestimonialSection';
import { CTABand } from '@/components/ui/CTABand';
import { Container } from '@/components/ui/Container';
import { TrustMarquee } from '@/components/ui/TrustMarquee';
import { PipeSystemSwitcher } from '@/components/ui/PipeSystemSwitcher';
import { PipeRequirementCalculator } from '@/components/ui/PipeRequirementCalculator';
import { QualityProcessTimeline } from '@/components/ui/QualityProcessTimeline';
import { StatCounter } from '@/components/ui/StatCounter';
import { HeroSection } from '@/components/home/HeroSection';
import { ScrollRevealText } from '@/components/effects/ScrollRevealText';
import { ScrollGallery } from '@/components/effects/ScrollGallery';
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
  const { about, benefits, whatWeDo, ctaBand, dealerCta } = homeContent;

  return (
    <>
      {/* ── Cinematic Hero with AnimatePresence Slider ── */}
      <HeroSection />

      {/* ── Interactive Piping System Visualizer Centerpiece ── */}
      <section className="relative bg-[#080B10] py-14 border-t border-white/[0.06] overflow-hidden">
        <Container>
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-sky-400 font-semibold">
                Interactive Engineering Matrix
              </span>
              <ScrollRevealText
                text="Explore Complete Polymer Systems"
                preset="Cinematic"
                as="h2"
                className="text-3xl sm:text-4xl text-white mt-1 font-heading tracking-wider uppercase"
              />
              <p className="text-slate-400 text-sm mt-2">
                Click across CPVC, UPVC, SWR, and Agricultural lines to inspect operating pressure, temperature, and ASTM/IS compliance ratings.
              </p>
            </div>
            <PipeSystemSwitcher />
          </Reveal>
        </Container>
      </section>

      {/* ── Scroll-Velocity Reactive Trust Marquee ── */}
      <TrustMarquee />

      {/* ── EnviroWealth-Inspired 4-Category Sticky Bar-Fill & Content Scroll-Through Showcase ── */}
      <CategoryScrollShowcase />

      {/* ── Scroll-Through Horizontal Image Showcase Tour ── */}
      <ScrollGallery />

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
            <ScrollRevealText
              text="Zero-Defect Quality Benchmark"
              preset="Blur Reveal"
              as="h2"
              className="text-h2 text-white mt-1 mb-3 font-heading uppercase"
            />
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
            <ScrollRevealText
              text={about.heading}
              preset="Fade In Up"
              as="h2"
              className="text-h2 text-white mt-1 mb-4 font-heading uppercase"
            />
            <p className="text-slate-300 leading-relaxed mb-6 prose-width font-body">
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
          <ScrollRevealText
            text={benefits.heading}
            preset="Cinematic"
            as="h2"
            className="text-h2 text-white mt-1 mb-2 font-heading uppercase"
          />
          <p className="text-slate-400 mb-10 prose-width text-sm font-body">
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
          <ScrollRevealText
            text={whatWeDo.heading}
            preset="Fade In Up"
            as="h2"
            className="text-h2 text-white mt-1 mb-10 font-heading uppercase"
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {whatWeDo.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.07}>
              <div className="p-6 rounded-2xl bg-slate-900/30 border border-white/[0.06] flex gap-5 items-start hover:border-white/[0.12] transition-colors">
                <span className="font-mono text-2xl font-bold text-sky-400/40 shrink-0 w-10">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-xl font-bold font-heading text-white mb-2 uppercase tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-body">
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
            <ScrollRevealText
              text={dealerCta.heading}
              preset="Cinematic"
              as="h2"
              className="text-h2 text-white mb-3 font-heading uppercase"
            />
            <p className="text-slate-400 text-sm mb-8 leading-relaxed font-body">
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
