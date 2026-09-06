import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Reveal } from '@/components/ui/Reveal';
import { ProductCard } from '@/components/ui/ProductCard';
import { StandardsBadgeRow } from '@/components/ui/StandardsBadgeRow';
import { CTABand } from '@/components/ui/CTABand';
import { Container } from '@/components/ui/Container';
import { categories, getCategoryBySlug } from '@/content/categories';
import { getProductsByCategory } from '@/content/products';

export function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return {};
  return {
    title: cat.name,
    description: cat.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) notFound();

  const products = getProductsByCategory(cat.slug);

  return (
    <>
      {/* ── Page Header with category accent ── */}
      <section className="relative bg-[var(--color-rio-sink)] pt-28 pb-12 md:pt-32 md:pb-16 overflow-hidden">
        {/* STOCK IMAGERY — category image at low opacity behind scrim */}
        <Image
          src={cat.image}
          alt={`Pipes for ${cat.name.toLowerCase()}`}
          fill
          sizes="100vw"
          className="object-cover opacity-10"
        />
        <Container className="relative z-10">
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: cat.name },
          ]} />
          <h1
            className="text-display-lg font-[var(--font-display)] mt-4 mb-3"
            style={{ color: cat.accentHex }}
          >
            {cat.name}
          </h1>
          <p className="text-[var(--color-rio-slate)] prose-width mb-4">
            {cat.description}
          </p>
          <StandardsBadgeRow standards={cat.standards} />
        </Container>
      </section>

      {/* ── Product Cards ── */}
      <Section>
        <Reveal>
          <Eyebrow accent={cat.accentHex}>Products in this category</Eyebrow>
          <h2 className="text-h2 font-[var(--font-display)] text-[var(--color-rio-ink)] mb-8">
            {products.length} product{products.length !== 1 ? 's' : ''} available
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
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

      {/* ── CTA ── */}
      <CTABand
        heading={`Need specifications or a quote for ${cat.name.split(' ')[0]}?`}
        body="Our team is ready to help you find the right piping solution for your project."
        cta={{ label: 'Contact Us', href: '/contact' }}
      />
    </>
  );
}
