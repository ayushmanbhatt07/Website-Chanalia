import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Reveal } from '@/components/ui/Reveal';
import { EnquiryForm } from '@/components/ui/EnquiryForm';
import { ContactInfoBlock } from '@/components/ui/ContactInfoBlock';
import { MapEmbed } from '@/components/ui/MapEmbed';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { TestimonialSection } from '@/components/ui/TestimonialSection';
import { Container } from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with RIO Pipes & Fittings by Reva Polyplast. Contact us for product enquiries, dealer partnerships, or technical support.',
};

export default function ContactPage() {
  return (
    <>
      {/* ── Page Header ── */}
      <section className="bg-[var(--color-rio-sink)] pt-28 pb-12 md:pt-32 md:pb-16">
        <Container>
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Contact Us' },
          ]} />
          <h1 className="text-display-lg font-[var(--font-display)] text-[var(--color-rio-ink)] mt-4">
            Contact Us
          </h1>
        </Container>
      </section>

      {/* ── Enquiry Form + Contact Info ── */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">
          <Reveal>
            <Eyebrow>Get in touch</Eyebrow>
            <h2 className="text-h2 font-[var(--font-display)] text-[var(--color-rio-ink)] mb-6">
              Send us an Enquiry
            </h2>
            <EnquiryForm />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="lg:sticky lg:top-24">
              <h3 className="text-h3 font-[var(--font-display)] text-[var(--color-rio-ink)] mb-6">
                Contact Information
              </h3>
              <ContactInfoBlock />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── Map ── */}
      <Section bg="sink">
        <Reveal>
          <Eyebrow>Our location</Eyebrow>
          <h2 className="text-h2 font-[var(--font-display)] text-[var(--color-rio-ink)] mb-6">
            Find Us
          </h2>
          <MapEmbed />
        </Reveal>
      </Section>

      {/* ── Dealer Enquiry ── */}
      <Section id="dealer">
        <Reveal>
          <Eyebrow>Partnership</Eyebrow>
          <h2 className="text-h2 font-[var(--font-display)] text-[var(--color-rio-ink)] mb-3">
            Become a RIO Dealer
          </h2>
          <p className="text-[var(--color-rio-slate)] mb-6 prose-width">
            We&apos;re always looking to expand our network of trusted partners. We offer competitive margins,
            marketing support, technical training, and regular product updates to our channel partners.
            Our team will guide you through the partnership process and provide all necessary information.
          </p>
          <EnquiryForm />
        </Reveal>
      </Section>

      {/* ── FAQ ── */}
      <Section bg="sink">
        <FAQAccordion />
      </Section>

      {/* ── Testimonials ── */}
      <Section>
        <TestimonialSection />
      </Section>
    </>
  );
}
