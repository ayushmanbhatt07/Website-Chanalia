'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { site } from '@/content/site';
import { categories } from '@/content/categories';
import { getProductsByCategory } from '@/content/products';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-200',
        scrolled
          ? 'bg-[var(--color-rio-surface)]/95 backdrop-blur-sm shadow-[0_1px_2px_rgba(22,24,26,.06)] h-16'
          : 'bg-[var(--color-rio-paper)] h-20'
      )}
    >
      <Container className="flex items-center justify-between h-full">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/images/logo.webp" alt="RIO Pipes & Fittings" width={140} height={48} className="object-contain" style={{ width: 'auto', height: 'auto' }} priority />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {site.nav.map((item) =>
            'children' in item && item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
              >
                <button
                  className="flex items-center gap-1 text-sm font-medium text-[var(--color-rio-slate)] hover:text-[var(--color-rio-blue)] transition-colors cursor-pointer"
                  aria-expanded={megaOpen}
                  aria-haspopup="true"
                  onClick={() => setMegaOpen(!megaOpen)}
                >
                  {item.label}
                  <ChevronDown className={cn('w-4 h-4 transition-transform', megaOpen && 'rotate-180')} />
                </button>

                {/* Mega menu panel */}
                {megaOpen && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[700px] bg-[var(--color-rio-surface)] border border-[var(--color-rio-line)] rounded-lg shadow-[0_8px_24px_rgba(22,24,26,.08)] p-6"
                    onKeyDown={(e) => e.key === 'Escape' && setMegaOpen(false)}
                  >
                    <div className="grid grid-cols-4 gap-6">
                      {categories.map((cat) => {
                        const products = getProductsByCategory(cat.slug);
                        return (
                          <div key={cat.slug}>
                            <Link
                              href={`/products/${cat.slug}`}
                              className="text-sm font-semibold mb-3 block hover:text-[var(--color-rio-blue)] transition-colors"
                              style={{ color: cat.accentHex }}
                              onClick={() => setMegaOpen(false)}
                            >
                              {cat.name}
                            </Link>
                            <ul className="space-y-1.5">
                              {products.map((p) => (
                                <li key={p.slug}>
                                  <Link
                                    href={`/products/${cat.slug}/${p.slug}`}
                                    className="text-xs text-[var(--color-rio-mute)] hover:text-[var(--color-rio-ink)] transition-colors block leading-snug"
                                    onClick={() => setMegaOpen(false)}
                                  >
                                    {p.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-4 pt-4 border-t border-[var(--color-rio-line)]">
                      <Link
                        href="/products"
                        className="text-sm text-[var(--color-rio-blue)] font-medium hover:underline"
                        onClick={() => setMegaOpen(false)}
                      >
                        View all products →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-[var(--color-rio-slate)] hover:text-[var(--color-rio-blue)] transition-colors"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Desktop right */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href={`tel:${site.contact.phone.replace(/\s/g, '')}`}
            className="flex items-center gap-2 text-sm text-[var(--color-rio-slate)] hover:text-[var(--color-rio-blue)] transition-colors"
          >
            <Phone className="w-4 h-4" />
            {site.contact.phone}
          </a>
          <Button href="/contact" className="text-sm">
            Get a Quote
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 text-[var(--color-rio-ink)] cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </Container>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-[var(--color-rio-surface)] z-50 overflow-y-auto">
          <Container className="py-6">
            <nav className="space-y-1">
              {site.nav.map((item) =>
                'children' in item && item.children ? (
                  <MobileAccordion key={item.label} item={item} onClose={() => setMobileOpen(false)} />
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block py-3 text-base font-medium text-[var(--color-rio-ink)] border-b border-[var(--color-rio-line)]"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>
            <div className="mt-6 space-y-3">
              <a
                href={`tel:${site.contact.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-2 text-sm text-[var(--color-rio-slate)]"
              >
                <Phone className="w-4 h-4" />
                {site.contact.phone}
              </a>
              <Button href="/contact" className="w-full" onClick={() => setMobileOpen(false)}>
                Get a Quote
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
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
    <div className="border-b border-[var(--color-rio-line)]">
      <div className="flex items-center justify-between">
        <Link
          href={item.href}
          className="flex-1 py-3 text-base font-medium text-[var(--color-rio-ink)]"
          onClick={onClose}
        >
          {item.label}
        </Link>
        {children && (
          <button
            className="p-3 cursor-pointer"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Collapse' : 'Expand'}
          >
            <ChevronDown className={cn('w-4 h-4 transition-transform', open && 'rotate-180')} />
          </button>
        )}
      </div>
      {open && children && (
        <div className="pb-3 pl-4 space-y-2">
          {children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="block text-sm text-[var(--color-rio-mute)] hover:text-[var(--color-rio-blue)]"
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
