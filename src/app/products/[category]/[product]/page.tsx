import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MessageCircle, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
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
    title: `${product.name} (${product.standard}) - RIO PIPES`,
    description: `${product.name} manufactured by RIO Pipes & Fittings. ${product.features.slice(0, 3).join('. ')}.`,
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
      {/* ── Breadcrumb Bar ── */}
      <section className="bg-[#080B10] pt-28 pb-4 border-b border-white/[0.06]">
        <Container>
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: cat.name, href: `/products/${cat.slug}` },
            { label: product.name },
          ]} />
        </Container>
      </section>

      {/* ── Product Hero Showcase ── */}
      <Section className="!pt-8 !pb-10" bg="paper">
        <Reveal>
          <ProductHero
            name={product.name}
            standard={product.standard}
            sizeRange={sizeRange}
            image={product.image}
            accent={cat.accentHex}
            categoryName={cat.name}
          />
        </Reveal>
      </Section>

      {/* ── Features & Benefits ── */}
      <Section bg="sink">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 items-start">
          <Reveal>
            <Eyebrow accent={cat.accentHex}>Engineering Highlights</Eyebrow>
            <h2 className="text-h2 font-[var(--font-display)] text-white mt-1 mb-4">
              Material Standards & Reliability
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Manufactured under strict ISO 9001:2015 quality surveillance. Engineered to eliminate thermal scaling, pressure drops, and premature failure across long commercial and domestic runs.
            </p>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/[0.08] space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Standard: {product.standard}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% Virgin Polymer Composition</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Full Material Test Certificate (MTC) Included</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <FeatureList features={product.features} accent={cat.accentHex} />
          </Reveal>
        </div>
      </Section>

      {/* ── Specification Tables ── */}
      <Section bg="paper">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <Eyebrow accent={cat.accentHex}>Technical Data & Dimensions</Eyebrow>
              <h2 className="text-h2 font-[var(--font-display)] text-white mt-1">
                Dimensional Specifications
              </h2>
            </div>
            <p className="text-xs font-mono text-slate-500">
              All dimensions in mm / inches as specified
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-white/[0.08] overflow-hidden bg-slate-900/40 p-4 sm:p-6 backdrop-blur-md">
            <SpecTabs
              tables={product.tables}
              accent={cat.accentHex}
            />
          </div>
        </Reveal>
      </Section>

      {/* ── Product Image Gallery ── */}
      {product.gallery && product.gallery.length > 0 && (
        <Section bg="sink">
          <Reveal>
            <Eyebrow accent={cat.accentHex}>Visual Inspection</Eyebrow>
            <h2 className="text-h2 font-heading text-white mt-1 mb-8">
              Specimen Gallery
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {product.gallery.map((img, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="stage-3d-box relative aspect-square rounded-2xl overflow-hidden border border-white/[0.1] bg-slate-950 group cursor-pointer">
                  <div
                    className="halo-3d-glow"
                    style={{ backgroundColor: cat.accentHex }}
                  />
                  <Image
                    src={img}
                    alt={`${product.name} specimen ${i+1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover rounded-xl group-hover:scale-108 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/[0.1] to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3.5">
                    <span className="text-[11px] font-mono text-white font-semibold">Specimen #{i+1}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* ── Related Products ── */}
      {related.length > 0 && (
        <Section bg="paper">
          <Reveal>
            <div className="flex items-center justify-between mb-8">
              <div>
                <Eyebrow accent={cat.accentHex}>Related Fittings & Pipes</Eyebrow>
                <h2 className="text-h2 font-[var(--font-display)] text-white mt-1">
                  More in {cat.name}
                </h2>
              </div>
              <Link
                href={`/products/${cat.slug}`}
                className="text-xs font-semibold flex items-center gap-1 hover:underline"
                style={{ color: cat.accentHex }}
              >
                View category
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.slice(0, 6).map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05}>
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
      <section className="border-t border-white/[0.08] bg-[#0A0F1D] py-8">
        <Container className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-sm font-bold text-white">Need contractor rate cards or custom dispatch?</p>
            <p className="text-xs text-slate-400 font-mono">Reva Polyplast Sales Desk • Metoda G.I.D.C., Rajkot</p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${site.contact.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-white px-4 py-2 rounded-xl bg-slate-900 border border-white/[0.08]"
            >
              <Phone className="w-3.5 h-3.5 text-sky-400" />
              {site.contact.phone}
            </a>
            <a
              href={site.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-bold text-black px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              Direct WhatsApp
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
