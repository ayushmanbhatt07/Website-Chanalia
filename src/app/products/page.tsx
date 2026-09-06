import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Reveal } from '@/components/ui/Reveal';
import { CategoryGrid } from '@/components/ui/CategoryGrid';
import { CTABand } from '@/components/ui/CTABand';
import { Container } from '@/components/ui/Container';
import { allProducts } from '@/content/products';
import { categories, getCategoryBySlug } from '@/content/categories';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Explore our complete range of CPVC, UPVC, SWR & Agricultural pipes and fittings. All products meet international standards including ASTM and IS certifications.',
};

export default function ProductsPage() {
  return (
    <>
      {/* ── Page Header ── */}
      <section className="bg-[var(--color-rio-sink)] pt-28 pb-12 md:pt-32 md:pb-16">
        <Container>
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Products' },
          ]} />
          <h1 className="text-display-lg font-[var(--font-display)] text-[var(--color-rio-ink)] mt-4 mb-2">
            Our Products
          </h1>
          <p className="text-[var(--color-rio-slate)] prose-width">
            Discover our comprehensive range of high-quality piping solutions for residential,
            commercial, industrial, and agricultural needs.
          </p>
        </Container>
      </section>

      {/* ── Category Navigator ── */}
      <Section>
        <Reveal>
          <Eyebrow>Product categories</Eyebrow>
          <h2 className="text-h2 font-[var(--font-display)] text-[var(--color-rio-ink)] mb-8">
            Browse by Category
          </h2>
        </Reveal>
        <CategoryGrid />
      </Section>

      {/* ── Full Product Index ── */}
      <Section bg="sink">
        <Reveal>
          <Eyebrow>Full catalogue</Eyebrow>
          <h2 className="text-h2 font-[var(--font-display)] text-[var(--color-rio-ink)] mb-8">
            All Products
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="overflow-x-auto rounded-lg border border-[var(--color-rio-line)]">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b-2 border-[var(--color-rio-blue)]">
                  <th className="px-4 py-3 text-xs font-semibold text-[var(--color-rio-ink)] bg-[var(--color-rio-surface)]">#</th>
                  <th className="px-4 py-3 text-xs font-semibold text-[var(--color-rio-ink)] bg-[var(--color-rio-surface)] text-left">Product</th>
                  <th className="px-4 py-3 text-xs font-semibold text-[var(--color-rio-ink)] bg-[var(--color-rio-surface)]">Category</th>
                  <th className="px-4 py-3 text-xs font-semibold text-[var(--color-rio-ink)] bg-[var(--color-rio-surface)]">Standard</th>
                </tr>
              </thead>
              <tbody>
                {allProducts.map((product, i) => {
                  const cat = getCategoryBySlug(product.category);
                  return (
                    <tr
                      key={product.slug}
                      className={`border-b border-[var(--color-rio-line)] last:border-b-0 ${i % 2 === 1 ? 'bg-[var(--color-rio-sink)]' : ''}`}
                    >
                      <td className="px-4 py-2.5 text-sm text-[var(--color-rio-mute)] text-center">{i + 1}</td>
                      <td className="px-4 py-2.5">
                        <Link
                          href={`/products/${product.category}/${product.slug}`}
                          className="text-sm font-medium text-[var(--color-rio-ink)] hover:text-[var(--color-rio-blue)] transition-colors"
                        >
                          {product.name}
                        </Link>
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <span
                          className="inline-block px-2 py-0.5 text-[10px] font-medium rounded"
                          style={{
                            color: cat?.accentHex,
                            backgroundColor: cat?.accentHex + '15',
                          }}
                        >
                          {cat?.name}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <span className="font-data text-xs text-[var(--color-rio-slate)]">{product.standard}</span>
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
        heading="Need specifications or a quote?"
        body="Our team is ready to help you find the right piping solution for your project."
        cta={{ label: 'Contact Us', href: '/contact' }}
      />
    </>
  );
}
