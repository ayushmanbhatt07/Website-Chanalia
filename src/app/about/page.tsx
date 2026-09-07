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
      <section className="bg-[#080B10] pt-28 pb-12 md:pt-36 md:pb-16 border-b border-white/[0.06]">
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
            className="text-display-lg font-heading text-white mt-4 uppercase"
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
              className="text-h2 font-heading text-white mb-4 uppercase"
            />
            <p className="text-slate-300 leading-relaxed mb-6 prose-width font-body text-base sm:text-lg">
              {story.body}
            </p>
          </Reveal>

          {/* Founding facts */}
          <Reveal delay={0.1}>
            <div className="bg-[#0A0F1D]/80 backdrop-blur-md rounded-2xl p-6 space-y-4 border border-white/[0.08] shadow-xl">
              <h3 className="text-sm font-mono uppercase tracking-widest text-sky-400 font-semibold mb-3">
                At a Glance
              </h3>
              {[
                { label: 'Founded', value: String(founding.year) },
                { label: 'Location', value: founding.location },
                { label: 'Entity', value: founding.entity },
                { label: 'Managing Director', value: founding.md },
              ].map((fact) => (
                <div key={fact.label} className="flex justify-between items-baseline gap-4 pb-2 border-b border-white/[0.04] last:border-b-0">
                  <span className="text-xs text-slate-400 font-mono">{fact.label}</span>
                  <span className="text-sm font-mono text-white text-right">{fact.value}</span>
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
            className="text-h2 font-heading text-white mb-4 uppercase"
          />
        </Reveal>

        {/* Pull quote */}
        <Reveal delay={0.1}>
          <blockquote className="text-display-lg font-heading text-sky-400 my-10 text-center tracking-wider uppercase">
            &ldquo;{mission.pullQuote}&rdquo;
          </blockquote>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Reveal delay={0.15}>
            <div className="p-8 rounded-2xl border border-white/[0.08] bg-[#0A0F1D]/80 backdrop-blur-md shadow-xl">
              <h3 className="text-2xl font-heading text-white mb-3 tracking-wide uppercase">Our Mission</h3>
              <p className="text-sm text-slate-300 leading-relaxed font-body">{mission.mission}</p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="p-8 rounded-2xl border border-white/[0.08] bg-[#0A0F1D]/80 backdrop-blur-md shadow-xl">
              <h3 className="text-2xl font-heading text-white mb-3 tracking-wide uppercase">Our Vision</h3>
              <p className="text-sm text-slate-300 leading-relaxed font-body">{mission.vision}</p>
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
            className="text-h2 font-heading text-white mb-10 uppercase"
          />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseUs.items.map((item, i) => {
            const Icon = whyIcons[item.icon];
            return (
              <Reveal key={item.title} delay={i * 0.07}>
                <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#0A0F1D]/60 hover:bg-[#0A0F1D]/90 transition-all hover:border-sky-500/30 group">
                  <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-sky-400" />
                  </div>
                  <h3 className="text-xl font-heading text-white mb-2 uppercase tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-body">
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
              <Eyebrow accent="#38BDF8">Infrastructure Excellence</Eyebrow>
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
            className="text-h2 font-heading text-white mb-8 uppercase"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-[#0A0F1D]/80 backdrop-blur-md">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.1] bg-[#0F172A]">
                  <th className="px-5 py-3.5 text-xs font-mono font-semibold text-slate-400">Standard</th>
                  <th className="px-5 py-3.5 text-xs font-mono font-semibold text-slate-200">Applies To</th>
                </tr>
              </thead>
              <tbody>
                {standards.items.map((item, i) => (
                  <tr key={item.standard} className={i % 2 === 1 ? 'bg-white/[0.015]' : ''}>
                    <td className="px-5 py-3 text-sm font-mono text-sky-400 font-semibold">{item.standard}</td>
                    <td className="px-5 py-3 text-sm text-slate-300 font-body">{item.appliesTo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#0A0F1D]/80">
              <p className="text-xs font-mono text-slate-400 uppercase mb-1">Warranty (UPVC & CPVC)</p>
              <p className="text-2xl font-heading text-white tracking-wider">{standards.warranty.upvcCpvc}</p>
            </div>
            <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#0A0F1D]/80">
              <p className="text-xs font-mono text-slate-400 uppercase mb-1">Warranty (SWR & Agriculture)</p>
              <p className="text-2xl font-heading text-white tracking-wider">{standards.warranty.swrAgri}</p>
            </div>
            <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#0A0F1D]/80">
              <p className="text-xs font-mono text-slate-400 uppercase mb-1">Service Temperature</p>
              <p className="text-sm font-mono text-slate-300">
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
