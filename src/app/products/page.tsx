import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Reveal } from '@/components/ui/Reveal';
import { CategoryGrid } from '@/components/ui/CategoryGrid';
import { CTABand } from '@/components/ui/CTABand';
import { Container } from '@/components/ui/Container';
import { ScrollRevealText } from '@/components/effects/ScrollRevealText';
import { allProducts } from '@/content/products';
import { categories, getCategoryBySlug } from '@/content/categories';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Explore our complete range of CPVC, UPVC, SWR & Agricultural pipes and fittings. All products meet international standards including ASTM and IS certifications.',
};

export default function ProductsPage() {
  return (
    <>
      {/* ── Page Header ── */}
      <section className="bg-bg-outer-alt pt-28 pb-12 md:pt-36 md:pb-16 border-b border-border">
        <Container>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Products' },
            ]}
          />
          <ScrollRevealText
            text="Engineered Product Catalog"
            preset="Cinematic"
            as="h1"
            className="text-display-lg font-heading text-text-heading mt-4 mb-2 uppercase"
          />
          <p className="text-text-body prose-width font-body text-base sm:text-lg">
            Discover our comprehensive range of high-performance piping systems for residential,
            commercial, industrial, and agricultural networks.
          </p>
        </Container>
      </section>

      {/* ── Category Navigator ── */}
      <Section>
        <Reveal>
          <Eyebrow>Product categories</Eyebrow>
          <ScrollRevealText
            text="Browse by System Category"
            preset="Fade In Up"
            as="h2"
            className="text-h2 font-heading text-text-heading mb-8 uppercase"
          />
        </Reveal>
        <CategoryGrid />
      </Section>

      {/* ── Full Product Index ── */}
      <Section bg="sink">
        <Reveal>
          <Eyebrow>Full catalogue</Eyebrow>
          <ScrollRevealText
            text="Complete 68-Product Specification Table"
            preset="Cinematic"
            as="h2"
            className="text-h2 font-heading text-text-heading mb-8 uppercase"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="overflow-x-auto rounded-2xl border border-border bg-bg-inner/80 backdrop-blur-md shadow-2xl">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-border bg-bg-outer-alt/90">
                  <th className="px-4 py-3.5 text-xs font-mono font-semibold text-text-muted">#</th>
                  <th className="px-4 py-3.5 text-xs font-mono font-semibold text-text-heading text-left">Product</th>
                  <th className="px-4 py-3.5 text-xs font-mono font-semibold text-text-heading">Category</th>
                  <th className="px-4 py-3.5 text-xs font-mono font-semibold text-text-heading">Standard</th>
                </tr>
              </thead>
              <tbody>
                {allProducts.map((product, i) => {
                  const cat = getCategoryBySlug(product.category);
                  return (
                    <tr
                      key={product.slug}
                      className={`border-b border-border hover:bg-bg-outer-alt transition-colors ${
                        i % 2 === 1 ? 'bg-bg-outer' : ''
                      }`}
                    >
                      <td className="px-4 py-3 text-sm text-text-muted font-mono text-center">{i + 1}</td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/products/${product.category}/${product.slug}`}
                          className="text-sm font-medium text-text-heading hover:text-accent-primary transition-colors inline-flex items-center gap-1.5 group"
                        >
                          <span>{product.name}</span>
                          <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-accent-primary" />
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className="inline-block px-2.5 py-0.5 text-[11px] font-mono font-medium rounded-full border border-border"
                          style={{
                            color: cat?.accentHex,
                            backgroundColor: cat?.accentHex + '18',
                          }}
                        >
                          {cat?.name}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="font-mono text-xs text-text-muted bg-bg-inner px-2 py-0.5 rounded border border-border">
                          {product.standard}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Section>

      {/* ── CTA ── */}
      <CTABand
        heading="Need custom specifications or factory dispatch?"
        body="Our technical engineering team is ready to assist you with BIM drawings, volume discounts, and test certificates."
        cta={{ label: 'Contact Engineering Team', href: '/contact' }}
      />
    </>
  );
}
