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
import { ScrollRevealText } from '@/components/effects/ScrollRevealText';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with RIO Pipes & Fittings by Reva Polyplast. Contact us for product enquiries, dealer partnerships, or technical support.',
};

export default function ContactPage() {
  return (
    <>
      {/* ── Page Header ── */}
      <section className="bg-[#080B10] pt-28 pb-12 md:pt-36 md:pb-16 border-b border-white/[0.06]">
        <Container>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Contact Us' },
            ]}
          />
          <ScrollRevealText
            text="Get in Touch with RioPipes"
            preset="Cinematic"
            as="h1"
            className="text-display-lg font-heading text-white mt-4 uppercase"
          />
          <p className="text-slate-400 mt-2 font-body text-base sm:text-lg max-w-2xl">
            Reach out directly to our Rajkot manufacturing facility for wholesale supply, technical assistance, or channel dealership inquiries.
          </p>
        </Container>
      </section>

      {/* ── Enquiry Form + Contact Info ── */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">
          <Reveal>
            <Eyebrow>Get in touch</Eyebrow>
            <ScrollRevealText
              text="Send us an Enquiry"
              preset="Fade In Up"
              as="h2"
              className="text-h2 font-heading text-white mb-6 uppercase"
            />
            <EnquiryForm />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="lg:sticky lg:top-24">
              <h3 className="text-h3 font-heading text-white mb-6 uppercase tracking-wider">
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
          <ScrollRevealText
            text="Visit Our Factory in Rajkot"
            preset="Cinematic"
            as="h2"
            className="text-h2 font-heading text-white mb-6 uppercase"
          />
          <MapEmbed />
        </Reveal>
      </Section>

      {/* ── Dealer Enquiry ── */}
      <Section id="dealer">
        <Reveal>
          <Eyebrow>Partnership Opportunity</Eyebrow>
          <ScrollRevealText
            text="Become an Authorized RIO Dealer"
            preset="Cinematic"
            as="h2"
            className="text-h2 font-heading text-white mb-3 uppercase"
          />
          <p className="text-slate-400 mb-6 prose-width font-body">
            We are always looking to expand our network of trusted partners across India and overseas export corridors. We offer competitive margins, priority dispatch, marketing collateral, and technical certifications to our channel partners.
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
