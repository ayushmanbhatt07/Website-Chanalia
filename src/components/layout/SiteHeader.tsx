'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, Phone, Search, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { site } from '@/content/site';
import { categories } from '@/content/categories';
import { getProductsByCategory } from '@/content/products';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { GlobalSearchModal } from '@/components/ui/GlobalSearchModal';

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Global shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-[#080B10]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.5)] h-16'
            : 'bg-gradient-to-b from-[#080B10]/95 via-[#080B10]/70 to-transparent h-20'
        )}
      >
        <Container className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <Image
              src="/images/logo.webp"
              alt="RIO Pipes & Fittings"
              width={140}
              height={48}
              className="object-contain transition-transform group-hover:scale-102"
              style={{ width: 'auto', height: 'auto' }}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {site.nav.map((item) =>
              'children' in item && item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setMegaOpen(true)}
                  onMouseLeave={() => setMegaOpen(false)}
                >
                  <button
                    className="flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-sky-400 transition-colors py-2 cursor-pointer"
                    aria-expanded={megaOpen}
                    aria-haspopup="true"
                    onClick={() => setMegaOpen(!megaOpen)}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        'w-4 h-4 text-slate-500 transition-transform duration-200',
                        megaOpen && 'rotate-180 text-sky-400'
                      )}
                    />
                  </button>

                  {/* Mega Menu Panel */}
                  {megaOpen && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[820px] rounded-2xl bg-[#0A0F1D]/95 border border-white/[0.1] backdrop-blur-2xl shadow-[0_24px_64px_rgba(0,0,0,0.8)] p-6"
                      onKeyDown={(e) => e.key === 'Escape' && setMegaOpen(false)}
                    >
                      <div className="grid grid-cols-4 gap-5">
                        {categories.map((cat) => {
                          const products = getProductsByCategory(cat.slug);
                          return (
                            <div key={cat.slug} className="space-y-2">
                              <Link
                                href={`/products/${cat.slug}`}
                                className="text-sm font-bold block transition-colors flex items-center justify-between pb-1.5 border-b border-white/[0.06]"
                                style={{ color: cat.accentHex }}
                                onClick={() => setMegaOpen(false)}
                              >
                                <span>{cat.name.split(' ')[0]}</span>
                                <span className="text-[10px] font-mono text-slate-500">
                                  {products.length}
                                </span>
                              </Link>
                              <ul className="space-y-1.5 pt-1">
                                {products.slice(0, 5).map((p) => (
                                  <li key={p.slug}>
                                    <Link
                                      href={`/products/${cat.slug}/${p.slug}`}
                                      className="text-xs text-slate-400 hover:text-white transition-colors block truncate leading-relaxed"
                                      onClick={() => setMegaOpen(false)}
                                    >
                                      {p.name}
                                    </Link>
                                  </li>
                                ))}
                                {products.length > 5 && (
                                  <li>
                                    <Link
                                      href={`/products/${cat.slug}`}
                                      className="text-[11px] font-medium transition-colors inline-flex items-center gap-1 mt-1"
                                      style={{ color: cat.accentHex }}
                                      onClick={() => setMegaOpen(false)}
                                    >
                                      +{products.length - 5} more fittings
                                      <ArrowRight className="w-3 h-3" />
                                    </Link>
                                  </li>
                                )}
                              </ul>
                            </div>
                          );
                        })}
                      </div>

                      <div className="mt-5 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-mono">
                          ISO 9001:2015 & BIS Certified Products
                        </span>
                        <Link
                          href="/products"
                          className="text-sky-400 font-semibold hover:underline flex items-center gap-1"
                          onClick={() => setMegaOpen(false)}
                        >
                          Browse Full 68-Product Catalog
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-slate-300 hover:text-sky-400 transition-colors py-2"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Quick Search Button (Ctrl+K) */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-white/[0.08] hover:border-white/[0.18] transition-all text-xs font-mono cursor-pointer"
              title="Search products (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-sky-400" />
              <span>Search products...</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 border border-slate-700">
                Ctrl+K
              </kbd>
            </button>

            {/* Direct Phone link */}
            <a
              href={`tel:${site.contact.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-sky-400 font-mono transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-sky-400" />
              <span>{site.contact.phone}</span>
            </a>

            {/* Get Quote CTA */}
            <Link
              href="/contact"
              className="px-4 py-2 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 text-xs font-bold transition-all shadow-[0_0_20px_rgba(56,189,248,0.25)] hover:shadow-[0_0_25px_rgba(56,189,248,0.4)]"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-slate-300 hover:text-sky-400 rounded-lg hover:bg-white/[0.05]"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              className="p-2 text-slate-100 rounded-lg hover:bg-white/[0.05] cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </Container>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 top-16 bg-[#080B10]/98 backdrop-blur-2xl z-50 overflow-y-auto border-t border-white/[0.08]">
            <Container className="py-6">
              <nav className="space-y-1 mb-6">
                {site.nav.map((item) =>
                  'children' in item && item.children ? (
                    <MobileAccordion key={item.label} item={item} onClose={() => setMobileOpen(false)} />
                  ) : (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block py-3 text-base font-semibold text-slate-200 hover:text-sky-400 border-b border-white/[0.06]"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )
                )}
              </nav>

              <div className="space-y-3 pt-2">
                <a
                  href={`tel:${site.contact.phone.replace(/\s/g, '')}`}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 border border-white/[0.08] text-sm font-mono text-slate-300"
                >
                  <Phone className="w-4 h-4 text-sky-400" />
                  {site.contact.phone}
                </a>
                <Link
                  href="/contact"
                  className="block w-full py-3 rounded-xl bg-sky-400 text-slate-950 font-bold text-center text-sm"
                  onClick={() => setMobileOpen(false)}
                >
                  Request Factory Quotation
                </Link>
              </div>
            </Container>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

function MobileAccordion({
  item,
  onClose,
}: {
  item: (typeof site.nav)[number];
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);
  const children = 'children' in item ? item.children : undefined;

  return (
    <div className="border-b border-white/[0.06]">
      <div className="flex items-center justify-between">
        <Link
          href={item.href}
          className="flex-1 py-3 text-base font-semibold text-slate-200"
          onClick={onClose}
        >
          {item.label}
        </Link>
        {children && (
          <button
            className="p-3 text-slate-400 hover:text-white"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Collapse' : 'Expand'}
          >
            <ChevronDown className={cn('w-4 h-4 transition-transform duration-200', open && 'rotate-180 text-sky-400')} />
          </button>
        )}
      </div>
      {open && children && (
        <div className="pb-3 pl-4 space-y-2">
          {children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="block text-sm text-slate-400 hover:text-sky-400"
              onClick={onClose}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
