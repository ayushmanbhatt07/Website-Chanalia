import type { Metadata } from 'next';
import Image from 'next/image';
import { Wrench, Headset, Handshake, ShieldCheck } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Reveal } from '@/components/ui/Reveal';
import { CTABand } from '@/components/ui/CTABand';
import { Container } from '@/components/ui/Container';
import { aboutContent } from '@/content/about';
import { images } from '@/content/images';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Founded in 2015 in Rajkot, RIO Pipes & Fittings by Reva Polyplast is a trusted manufacturer of CPVC, UPVC, SWR & Agricultural pipes and fittings.',
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
      <section className="bg-[var(--color-rio-sink)] pt-28 pb-12 md:pt-32 md:pb-16">
        <Container>
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'About Us' },
          ]} />
          <h1 className="text-display-lg font-[var(--font-display)] text-[var(--color-rio-ink)] mt-4">
            {pageHeader.heading}
          </h1>
        </Container>
      </section>

      {/* ── Company Story ── */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 items-start">
          <Reveal>
            <Eyebrow>{story.eyebrow}</Eyebrow>
            <h2 className="text-h2 font-[var(--font-display)] text-[var(--color-rio-ink)] mb-4">
              {story.heading}
            </h2>
            <p className="text-[var(--color-rio-slate)] leading-relaxed mb-6 prose-width">
              {story.body}
            </p>
            {/* No portrait available — request real photo from client */}
          </Reveal>

          {/* Founding facts */}
          <Reveal delay={0.1}>
            <div className="bg-[var(--color-rio-sink)] rounded-lg p-6 space-y-4">
              <h3 className="text-sm font-semibold text-[var(--color-rio-ink)] mb-3">At a Glance</h3>
              {[
                { label: 'Founded', value: String(founding.year) },
                { label: 'Location', value: founding.location },
                { label: 'Entity', value: founding.entity },
                { label: 'Managing Director', value: founding.md },
              ].map((fact) => (
                <div key={fact.label} className="flex justify-between items-baseline gap-4">
                  <span className="text-xs text-[var(--color-rio-mute)]">{fact.label}</span>
                  <span className="text-sm font-data text-[var(--color-rio-ink)] text-right">{fact.value}</span>
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
          <h2 className="text-h2 font-[var(--font-display)] text-[var(--color-rio-ink)] mb-4">
            {mission.heading}
          </h2>
        </Reveal>

        {/* Pull quote */}
        <Reveal delay={0.1}>
          <blockquote className="text-display-lg font-[var(--font-display)] text-[var(--color-rio-blue)] my-10 text-center italic">
            &ldquo;{mission.pullQuote}&rdquo;
          </blockquote>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Reveal delay={0.15}>
            <div className="p-6 rounded-lg border border-[var(--color-rio-line)] bg-[var(--color-rio-surface)]">
              <h3 className="text-h3 font-[var(--font-display)] text-[var(--color-rio-ink)] mb-3">Our Mission</h3>
              <p className="text-sm text-[var(--color-rio-slate)] leading-relaxed">{mission.mission}</p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="p-6 rounded-lg border border-[var(--color-rio-line)] bg-[var(--color-rio-surface)]">
              <h3 className="text-h3 font-[var(--font-display)] text-[var(--color-rio-ink)] mb-3">Our Vision</h3>
              <p className="text-sm text-[var(--color-rio-slate)] leading-relaxed">{mission.vision}</p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── Why Choose Us ── */}
      <Section>
        <Reveal>
          <Eyebrow>{whyChooseUs.eyebrow}</Eyebrow>
          <h2 className="text-h2 font-[var(--font-display)] text-[var(--color-rio-ink)] mb-10">
            {whyChooseUs.heading}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseUs.items.map((item, i) => {
            const Icon = whyIcons[item.icon];
            return (
              <Reveal key={item.title} delay={i * 0.07}>
                <div className="p-5 rounded-lg border border-[var(--color-rio-line)] bg-[var(--color-rio-surface)]">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-rio-blue-tint)] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[var(--color-rio-blue)]" />
                  </div>
                  <h3 className="text-h3 font-[var(--font-display)] text-[var(--color-rio-ink)] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--color-rio-slate)] leading-relaxed">
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
        {/* STOCK IMAGERY — replace with real facility photo when supplied */}
        <Image
          src={images.facility.production}
          alt="Factory floor with machinery and conveyor"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[var(--color-rio-night)]/80" />
        <Container className="relative z-10">
          <Reveal>
            <div className="max-w-xl">
              <Eyebrow accent="#FFFFFF">Manufacturing</Eyebrow>
              <h2 className="text-h2 font-[var(--font-display)] text-white mb-4">
                Advanced Manufacturing Facility
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Our state-of-the-art manufacturing facility in Rajkot, Gujarat produces high-quality
                polymer-based piping solutions that meet international standards and rigorous quality
                benchmarks.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Standards & Warranty ── */}
      <Section bg="sink">
        <Reveal>
          <Eyebrow>Certifications</Eyebrow>
          <h2 className="text-h2 font-[var(--font-display)] text-[var(--color-rio-ink)] mb-8">
            {standards.heading}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="overflow-x-auto rounded-lg border border-[var(--color-rio-line)]">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-[var(--color-rio-blue)]">
                  <th className="px-4 py-3 text-xs font-semibold text-[var(--color-rio-ink)] bg-[var(--color-rio-surface)]">Standard</th>
                  <th className="px-4 py-3 text-xs font-semibold text-[var(--color-rio-ink)] bg-[var(--color-rio-surface)]">Applies To</th>
                </tr>
              </thead>
              <tbody>
                {standards.items.map((item, i) => (
                  <tr key={item.standard} className={i % 2 === 1 ? 'bg-[var(--color-rio-sink)]' : ''}>
                    <td className="px-4 py-2.5 text-sm font-medium">{item.standard}</td>
                    <td className="px-4 py-2.5 text-sm text-[var(--color-rio-slate)]">{item.appliesTo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            <div className="p-5 rounded-lg border border-[var(--color-rio-line)] bg-[var(--color-rio-surface)]">
              <p className="text-xs text-[var(--color-rio-mute)] mb-1">Warranty (UPVC & CPVC)</p>
              <p className="text-lg font-[var(--font-display)] font-bold text-[var(--color-rio-ink)]">{standards.warranty.upvcCpvc}</p>
            </div>
            <div className="p-5 rounded-lg border border-[var(--color-rio-line)] bg-[var(--color-rio-surface)]">
              <p className="text-xs text-[var(--color-rio-mute)] mb-1">Warranty (SWR & Agriculture)</p>
              <p className="text-lg font-[var(--font-display)] font-bold text-[var(--color-rio-ink)]">{standards.warranty.swrAgri}</p>
            </div>
            <div className="p-5 rounded-lg border border-[var(--color-rio-line)] bg-[var(--color-rio-surface)]">
              <p className="text-xs text-[var(--color-rio-mute)] mb-1">Service Temperature</p>
              <p className="text-sm font-data text-[var(--color-rio-ink)]">
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

      {/* NOTE: Team section removed — the old site used 100% stock-photo placeholders
          with the job title "Vapers". Leave this commented-out stub for when real staff
          data arrives from the client.
          <TeamSection members={[]} />
      */}
    </>
  );
}
