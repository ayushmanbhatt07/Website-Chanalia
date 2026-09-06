import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MessageCircle } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Reveal } from '@/components/ui/Reveal';
import { ProductHero } from '@/components/ui/ProductHero';
import { FeatureList } from '@/components/ui/FeatureList';
import { SpecTabs } from '@/components/ui/SpecTabs';
import { ProductCard } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { categories, getCategoryBySlug } from '@/content/categories';
import { allProducts, getProductBySlug, getProductsByCategory } from '@/content/products';
import { site } from '@/content/site';

export function generateStaticParams() {
  return allProducts.map((p) => ({
    category: p.category,
    product: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; product: string }>;
}): Promise<Metadata> {
  const { product: slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: `${product.name} by RIO Pipes & Fittings. ${product.features.slice(0, 3).join('. ')}.`,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ category: string; product: string }>;
}) {
  const { category: catSlug, product: prodSlug } = await params;
  const cat = getCategoryBySlug(catSlug);
  const product = getProductBySlug(prodSlug);

  if (!cat || !product || product.category !== cat.slug) {
    notFound();
  }

  // Related products — same category, excluding current
  const related = getProductsByCategory(cat.slug).filter(p => p.slug !== product.slug);

  // Size range from table data
  const sizeRange = product.tables.length > 0
    ? `${product.tables[0].rows[0]?.[0]} – ${product.tables[0].rows[product.tables[0].rows.length - 1]?.[0]}`
    : undefined;

  return (
    <>
      {/* ── Page Header ── */}
      <section className="bg-[var(--color-rio-sink)] pt-28 pb-8 md:pt-32 md:pb-12">
        <Container>
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: cat.name, href: `/products/${cat.slug}` },
            { label: product.name },
          ]} />
        </Container>
      </section>

      {/* ── Product Hero ── */}
      <Section className="!pt-8">
        <Reveal>
          <ProductHero
            name={product.name}
            standard={product.standard}
            sizeRange={sizeRange}
            image={product.image}
            accent={cat.accentHex}
          />
        </Reveal>
      </Section>

      {/* ── Features ── */}
      <Section bg="sink">
        <Reveal>
          <Eyebrow accent={cat.accentHex}>Features & Benefits</Eyebrow>
          <div className="mb-6" />
          <FeatureList features={product.features} accent={cat.accentHex} />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8">
            <Button href="/contact" className="w-full sm:w-auto">
              Enquiry Now
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* ── Spec Tables ── */}
      <Section>
        <Reveal>
          <Eyebrow accent={cat.accentHex}>Specifications</Eyebrow>
          <h2 className="text-h2 font-[var(--font-display)] text-[var(--color-rio-ink)] mb-8">
            Technical Data
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <SpecTabs
            tables={product.tables}
            accent={cat.accentHex}
          />
        </Reveal>
      </Section>

      {/* ── Product Image Gallery ── */}
      {product.gallery && product.gallery.length > 0 && (
        <Section bg="paper">
          <Reveal>
            <Eyebrow accent={cat.accentHex}>Gallery</Eyebrow>
            <h2 className="text-h2 font-[var(--font-display)] text-[var(--color-rio-ink)] mb-8">
              Product Images
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {product.gallery.map((img, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="relative aspect-square rounded-lg overflow-hidden border border-[var(--color-rio-line)] bg-white group cursor-pointer">
                  <Image src={img} alt={`${product.name} image ${i+1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* ── Related Products ── */}
      {related.length > 0 && (
        <Section bg="sink">
          <Reveal>
            <Eyebrow accent={cat.accentHex}>Related products</Eyebrow>
            <h2 className="text-h2 font-[var(--font-display)] text-[var(--color-rio-ink)] mb-8">
              More in {cat.name}
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.07}>
                <ProductCard
                  name={p.name}
                  standard={p.standard}
                  href={`/products/${cat.slug}/${p.slug}`}
                  accent={cat.accentHex}
                  image={p.image}
                />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* ── Compact Contact Strip ── */}
      <section className="border-t border-[var(--color-rio-line)] py-6">
        <Container className="flex flex-wrap items-center justify-center gap-6">
          <a
            href={`tel:${site.contact.phone.replace(/\s/g, '')}`}
            className="flex items-center gap-2 text-sm text-[var(--color-rio-slate)] hover:text-[var(--color-rio-blue)] transition-colors"
          >
            <Phone className="w-4 h-4" />
            {site.contact.phone}
          </a>
          <a
            href={site.contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-[#25D366] hover:text-green-700 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
        </Container>
      </section>
    </>
  );
}
