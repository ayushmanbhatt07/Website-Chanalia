import type { Metadata } from 'next';
import Image from 'next/image';
import { Wrench, Headset, Handshake, ShieldCheck } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Reveal } from '@/components/ui/Reveal';
import { CTABand } from '@/components/ui/CTABand';
import { Container } from '@/components/ui/Container';
import { ScrollRevealText } from '@/components/effects/ScrollRevealText';
import { aboutContent } from '@/content/about';
import { images } from '@/content/images';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about RIO Pipes & Fittings, manufactured by Reva Polyplast in Rajkot, Gujarat. Over 20 years of expertise in polymer piping solutions.',
};

const whyIcons = {
  Wrench,
  Headset,
  Handshake,
  ShieldCheck,
};

export default function AboutPage() {
  const { pageHeader, story, founding, mission, whyChooseUs, standards, ctaBand } = aboutContent;

  return (
    <>
      {/* ── Page Header ── */}
      <section className="bg-bg-outer-alt pt-28 pb-12 md:pt-36 md:pb-16 border-b border-border">
        <Container>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'About Us' },
            ]}
          />
          <ScrollRevealText
            text={pageHeader.heading}
            preset="Cinematic"
            as="h1"
            className="text-display-lg font-heading text-text-heading mt-4 uppercase"
          />
        </Container>
      </section>

      {/* ── Company Story ── */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-start">
          <Reveal>
            <Eyebrow>{story.eyebrow}</Eyebrow>
            <ScrollRevealText
              text={story.heading}
              preset="Fade In Up"
              as="h2"
              className="text-h2 font-heading text-text-heading mb-4 uppercase"
            />
            <p className="text-text-body leading-relaxed mb-6 prose-width font-body text-base sm:text-lg">
              {story.body}
            </p>
          </Reveal>

          {/* Founding facts */}
          <Reveal delay={0.1}>
            <div className="bg-bg-inner/80 backdrop-blur-md rounded-2xl p-6 space-y-4 border border-border shadow-xl">
              <h3 className="text-sm font-mono uppercase tracking-widest text-accent-primary font-semibold mb-3">
                At a Glance
              </h3>
              {[
                { label: 'Founded', value: String(founding.year) },
                { label: 'Location', value: founding.location },
                { label: 'Entity', value: founding.entity },
                { label: 'Managing Director', value: founding.md },
              ].map((fact) => (
                <div key={fact.label} className="flex justify-between items-baseline gap-4 pb-2 border-b border-border last:border-b-0">
                  <span className="text-xs text-text-muted font-mono">{fact.label}</span>
                  <span className="text-sm font-mono text-text-heading text-right">{fact.value}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── Mission & Vision ── */}
      <Section bg="sink">
        <Reveal>
          <Eyebrow>{mission.eyebrow}</Eyebrow>
          <ScrollRevealText
            text={mission.heading}
            preset="Cinematic"
            as="h2"
            className="text-h2 font-heading text-text-heading mb-4 uppercase"
          />
        </Reveal>

        {/* Pull quote */}
        <Reveal delay={0.1}>
          <blockquote className="text-display-lg font-heading text-accent-primary my-10 text-center tracking-wider uppercase">
            &ldquo;{mission.pullQuote}&rdquo;
          </blockquote>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Reveal delay={0.15}>
            <div className="p-8 rounded-2xl border border-border bg-bg-inner/80 backdrop-blur-md shadow-xl">
              <h3 className="text-2xl font-heading text-text-heading mb-3 tracking-wide uppercase">Our Mission</h3>
              <p className="text-sm text-text-body leading-relaxed font-body">{mission.mission}</p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="p-8 rounded-2xl border border-border bg-bg-inner/80 backdrop-blur-md shadow-xl">
              <h3 className="text-2xl font-heading text-text-heading mb-3 tracking-wide uppercase">Our Vision</h3>
              <p className="text-sm text-text-body leading-relaxed font-body">{mission.vision}</p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── Why Choose Us ── */}
      <Section>
        <Reveal>
          <Eyebrow>{whyChooseUs.eyebrow}</Eyebrow>
          <ScrollRevealText
            text={whyChooseUs.heading}
            preset="Fade In Up"
            as="h2"
            className="text-h2 font-heading text-text-heading mb-10 uppercase"
          />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseUs.items.map((item, i) => {
            const Icon = whyIcons[item.icon];
            return (
              <Reveal key={item.title} delay={i * 0.07}>
                <div className="p-6 rounded-2xl border border-border bg-bg-inner/60 hover:bg-bg-inner-hover transition-all hover:border-accent-primary/30 group">
                  <div className="w-12 h-12 rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-accent-primary" />
                  </div>
                  <h3 className="text-xl font-heading text-text-heading mb-2 uppercase tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-body leading-relaxed font-body">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* ── Manufacturing ── */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <Image
          src={images.facility.production}
          alt="Factory floor with machinery and conveyor"
          fill
          sizes="100vw"
          className="object-cover brightness-[0.35] contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080B10] via-transparent to-[#080B10]" />
        <Container className="relative z-10">
          <Reveal>
            <div className="max-w-2xl">
              <Eyebrow accent="var(--color-accent-primary)">Infrastructure Excellence</Eyebrow>
              <ScrollRevealText
                text="Advanced Extrusion Facility in Rajkot"
                preset="Cinematic"
                as="h2"
                className="text-display-lg font-heading text-white mb-4 uppercase"
              />
              <p className="text-slate-300 leading-relaxed text-base sm:text-lg font-body">
                Our state-of-the-art manufacturing infrastructure in Metoda G.I.D.C., Rajkot produces high-durability polymer-based piping solutions adhering strictly to BIS and ASTM standards with rigorous computer-monitored hydrostatic tests.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Standards & Warranty ── */}
      <Section bg="sink">
        <Reveal>
          <Eyebrow>Certifications</Eyebrow>
          <ScrollRevealText
            text={standards.heading}
            preset="Cinematic"
            as="h2"
            className="text-h2 font-heading text-text-heading mb-8 uppercase"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="overflow-x-auto rounded-2xl border border-border bg-bg-inner/80 backdrop-blur-md">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-bg-outer-alt">
                  <th className="px-5 py-3.5 text-xs font-mono font-semibold text-text-muted text-left">Standard</th>
                  <th className="px-5 py-3.5 text-xs font-mono font-semibold text-text-heading text-left">Applies To</th>
                </tr>
              </thead>
              <tbody>
                {standards.items.map((item, i) => (
                  <tr key={item.standard} className={i % 2 === 1 ? 'bg-bg-outer' : ''}>
                    <td className="px-5 py-3 text-sm font-mono text-accent-primary font-semibold">{item.standard}</td>
                    <td className="px-5 py-3 text-sm text-text-body font-body">{item.appliesTo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            <div className="p-6 rounded-2xl border border-border bg-bg-inner/80">
              <p className="text-xs font-mono text-text-muted uppercase mb-1">Warranty (UPVC & CPVC)</p>
              <p className="text-2xl font-heading text-text-heading tracking-wider">{standards.warranty.upvcCpvc}</p>
            </div>
            <div className="p-6 rounded-2xl border border-border bg-bg-inner/80">
              <p className="text-xs font-mono text-text-muted uppercase mb-1">Warranty (SWR & Agriculture)</p>
              <p className="text-2xl font-heading text-text-heading tracking-wider">{standards.warranty.swrAgri}</p>
            </div>
            <div className="p-6 rounded-2xl border border-border bg-bg-inner/80">
              <p className="text-xs font-mono text-text-muted uppercase mb-1">Service Temperature</p>
              <p className="text-sm font-mono text-text-body">
                CPVC: {standards.temperatures.cpvc}<br />
                UPVC: {standards.temperatures.upvc}
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ── CTA ── */}
      <CTABand
        eyebrow={ctaBand.eyebrow}
        heading={ctaBand.heading}
        body={ctaBand.body}
        cta={ctaBand.cta}
      />
    </>
  );
}
