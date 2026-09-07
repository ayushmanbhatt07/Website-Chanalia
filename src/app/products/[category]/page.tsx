import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, ArrowRight, Layers, FileText, Download } from 'lucide-react';
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
    title: `${cat.name} - RIO PIPES & FITTINGS`,
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
      {/* ── Category Header with Ambient Glow ── */}
      <section className="relative bg-[#080B10] pt-28 pb-14 md:pt-36 md:pb-20 overflow-hidden border-b border-white/[0.08]">
        {/* Ambient colored aura */}
        <div
          className="absolute -top-40 right-10 w-[500px] h-[500px] rounded-full blur-[140px] opacity-25 pointer-events-none"
          style={{ backgroundColor: cat.accentHex }}
        />

        {/* Low opacity background texture image */}
        <Image
          src={cat.image}
          alt={`Pipes for ${cat.name.toLowerCase()}`}
          fill
          sizes="100vw"
          className="object-cover opacity-10 filter grayscale"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080B10] via-[#080B10]/80 to-transparent" />

        <Container className="relative z-10">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/products' },
              { label: cat.name },
            ]}
          />

          <div className="mt-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono font-semibold uppercase mb-4 border"
              style={{
                color: cat.accentHex,
                borderColor: `${cat.accentHex}40`,
                backgroundColor: `${cat.accentHex}15`,
              }}
            >
              <Layers className="w-3.5 h-3.5" />
              Complete Engineering Range
            </div>

            <h1
              className="text-display-lg font-heading text-white mb-4 leading-tight uppercase tracking-wider"
            >
              {cat.name}
            </h1>
            <p className="text-slate-300 text-base sm:text-lg prose-width leading-relaxed mb-6">
              {cat.description}
            </p>

            {/* Standards row */}
            <div className="flex flex-wrap items-center gap-4">
              <StandardsBadgeRow standards={cat.standards} />
              <Link
                href="/contact"
                className="text-xs font-mono font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.1] transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-sky-400" />
                Request Technical Spec Sheet
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Product Cards Grid ── */}
      <Section bg="sink">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <Eyebrow accent={cat.accentHex}>Cataloged Products</Eyebrow>
              <h2 className="text-h2 font-heading text-white mt-1 uppercase tracking-wide">
                {products.length} Products & Fitting Types
              </h2>
            </div>
            <div className="text-xs font-mono text-slate-400">
              Standard: <span className="text-slate-200 font-semibold">{cat.standards.join(' • ')}</span>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.04}>
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

      {/* ── CTA Band ── */}
      <CTABand
        eyebrow="Direct Factory Dispatch"
        heading={`Ready to order or require custom project sizes for ${cat.name.split(' ')[0]}?`}
        body="Get competitive factory pricing, full test certificates, and immediate delivery schedules from our Rajkot production unit."
        cta={{ label: 'Request Factory Quote', href: '/contact' }}
      />
    </>
  );
}
