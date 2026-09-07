'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Phone,
  ArrowRight,
  ChevronDown,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { site } from '@/content/site';
import { categories } from '@/content/categories';
import { getProductsByCategory } from '@/content/products';
import { GlobalSearchModal } from '@/components/ui/GlobalSearchModal';

interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/products', hasDropdown: true },
  { label: 'Contact', href: '/contact' },
];

export function PillNav() {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut Ctrl+K
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close menus and reset scroll when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProductsOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setIsProductsOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsProductsOpen(false);
    }, 180);
  };

  return (
    <>
      {/* Floating Pill Container */}
      <header
        className={cn(
          'fixed top-4 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none transition-all duration-300',
          scrolled ? 'top-3' : 'top-5'
        )}
      >
        <div className="pointer-events-auto relative flex items-center justify-between w-full max-w-5xl rounded-full bg-[#0B1120]/85 backdrop-blur-2xl border border-white/[0.12] shadow-[0_12px_40px_rgba(0,0,0,0.6)] px-2 sm:px-3 py-1.5 transition-all duration-300 hover:border-white/[0.2]">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center pl-3 pr-3 py-0.5 rounded-full group transition-all shrink-0"
            aria-label="RIO Pipes & Fittings Home"
          >
            <Image
              src="/images/logo.webp"
              alt="RIO Pipes & Fittings"
              width={130}
              height={44}
              className="h-9 sm:h-10 w-auto object-contain transition-transform group-hover:scale-105"
              priority
            />
          </Link>

          {/* Desktop Navigation Pills */}
          <nav className="hidden md:flex items-center gap-1 relative" onMouseLeave={() => setHoveredIndex(null)}>
            {NAV_ITEMS.map((item, index) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);

              if (item.hasDropdown) {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => {
                      setHoveredIndex(index);
                      handleDropdownEnter();
                    }}
                    onMouseLeave={() => {
                      handleDropdownLeave();
                    }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        'relative px-4 py-2 rounded-full font-heading text-sm sm:text-base tracking-wider uppercase transition-colors flex items-center gap-1.5 z-10 select-none',
                        isActive ? 'text-sky-400' : 'text-slate-300 hover:text-white'
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          'w-3.5 h-3.5 transition-transform duration-200 opacity-70',
                          isProductsOpen && 'rotate-180 text-sky-400'
                        )}
                      />
                    </Link>

                    {/* Floating Hover Background */}
                    {hoveredIndex === index && (
                      <motion.div
                        layoutId="pillNavHover"
                        className="absolute inset-0 bg-white/[0.08] rounded-full z-0"
                        transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                      />
                    )}

                    {/* Active Route Dot */}
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38BDF8]" />
                    )}

                    {/* Desktop Mega Dropdown */}
                    <AnimatePresence>
                      {isProductsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 12, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[720px] rounded-3xl bg-[#080D1A]/95 backdrop-blur-3xl border border-white/[0.14] shadow-[0_24px_70px_rgba(0,0,0,0.85)] p-6 z-50 overflow-hidden"
                          onMouseEnter={handleDropdownEnter}
                          onMouseLeave={handleDropdownLeave}
                        >
                          {/* Radial ambient glow */}
                          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

                          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
                            <div>
                              <span className="text-[11px] font-mono uppercase tracking-widest text-sky-400 font-semibold">
                                Engineered Piping Systems
                              </span>
                              <h4 className="font-heading text-lg text-white tracking-wide">
                                Precision Polymer Catalogs
                              </h4>
                            </div>
                            <Link
                              href="/products"
                              className="text-xs font-mono text-slate-400 hover:text-sky-400 transition-colors flex items-center gap-1.5"
                              onClick={() => setIsProductsOpen(false)}
                            >
                              <span>View All 68 Products</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>

                          <div className="grid grid-cols-4 gap-4">
                            {categories.map((cat) => {
                              const products = getProductsByCategory(cat.slug);
                              return (
                                <div
                                  key={cat.slug}
                                  className="group/cat p-3 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.04] hover:border-white/[0.12] transition-all"
                                >
                                  <Link
                                    href={`/products/${cat.slug}`}
                                    className="block"
                                    onClick={() => setIsProductsOpen(false)}
                                  >
                                    <div className="flex items-center justify-between mb-1.5">
                                      <span
                                        className="font-heading text-base tracking-wider transition-colors"
                                        style={{ color: cat.accentHex }}
                                      >
                                        {cat.name.split(' ')[0]}
                                      </span>
                                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.06] text-slate-400">
                                        {products.length}
                                      </span>
                                    </div>
                                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-snug mb-3">
                                      {cat.description.slice(0, 60)}...
                                    </p>
                                  </Link>

                                  <ul className="space-y-1 pt-1 border-t border-white/[0.04]">
                                    {products.slice(0, 3).map((p) => (
                                      <li key={p.slug}>
                                        <Link
                                          href={`/products/${cat.slug}/${p.slug}`}
                                          className="text-[11px] text-slate-400 hover:text-white truncate block transition-colors leading-relaxed"
                                          onClick={() => setIsProductsOpen(false)}
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

                          <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400 font-mono">
                            <span className="flex items-center gap-1.5">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                              ISO 9001:2015 & BIS Certified Heavy-Duty Manufacturing
                            </span>
                            <span className="text-slate-500">
                              Direct Factory Rajkot GIDC
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setHoveredIndex(index)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'relative px-4 py-2 rounded-full font-heading text-sm sm:text-base tracking-wider uppercase transition-colors z-10 select-none block',
                      isActive ? 'text-sky-400' : 'text-slate-300 hover:text-white'
                    )}
                  >
                    {item.label}
                  </Link>

                  {/* Floating Hover Background */}
                  {hoveredIndex === index && (
                    <motion.div
                      layoutId="pillNavHover"
                      className="absolute inset-0 bg-white/[0.08] rounded-full z-0"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}

                  {/* Active Route Dot */}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38BDF8]" />
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Action Icons & Quote CTA */}
          <div className="flex items-center gap-2">
            {/* Search Pill Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-slate-300 hover:text-white transition-all text-xs font-mono cursor-pointer"
              title="Search products (Ctrl+K)"
              aria-label="Search products"
            >
              <Search className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden lg:inline text-slate-400">Search</span>
              <kbd className="hidden lg:inline px-1.5 py-0.5 rounded bg-black/40 text-[9px] text-slate-400 border border-white/[0.06]">
                Ctrl+K
              </kbd>
            </button>

            {/* Direct Phone link (hidden on small screens) */}
            <a
              href={`tel:${site.contact.phone.replace(/\s/g, '')}`}
              className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] text-slate-300 hover:text-sky-400 text-xs font-mono transition-colors"
              title="Call Sales & Support"
            >
              <Phone className="w-3.5 h-3.5 text-sky-400" />
              <span>{site.contact.phone}</span>
            </a>

            {/* Quote Pill Button */}
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-300 hover:to-sky-400 text-slate-950 font-heading text-sm sm:text-base tracking-wider uppercase transition-all shadow-[0_0_16px_rgba(56,189,248,0.35)] hover:shadow-[0_0_24px_rgba(56,189,248,0.6)] hover:scale-105 active:scale-95"
            >
              <span>Get Quote</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-white/[0.06] text-white hover:bg-white/[0.12] transition-colors cursor-pointer"
              aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 top-0 z-40 bg-[#080B10]/98 backdrop-blur-3xl pt-24 px-6 pb-8 overflow-y-auto md:hidden flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <Image
                    src="/images/logo.webp"
                    alt="RIO Pipes & Fittings"
                    width={120}
                    height={40}
                    className="h-8 w-auto object-contain"
                  />
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="space-y-3">
                {NAV_ITEMS.map((item) => (
                  <div key={item.label}>
                    <Link
                      href={item.href}
                      className={cn(
                        'block py-2 font-heading text-3xl tracking-wider uppercase transition-colors',
                        pathname === item.href ? 'text-sky-400' : 'text-slate-200 hover:text-sky-400'
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>

                    {/* Expandable Categories on Mobile */}
                    {item.hasDropdown && (
                      <div className="pl-4 mt-2 space-y-2 border-l border-white/[0.08]">
                        {categories.map((cat) => (
                          <Link
                            key={cat.slug}
                            href={`/products/${cat.slug}`}
                            className="block py-1 text-sm font-medium text-slate-400 hover:text-white transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {cat.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            <div className="pt-6 mt-6 border-t border-white/[0.08] space-y-4">
              <div className="flex flex-col gap-2 font-mono text-xs text-slate-400">
                <a
                  href={`tel:${site.contact.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 text-slate-200 hover:text-sky-400"
                >
                  <Phone className="w-4 h-4 text-sky-400" />
                  <span>{site.contact.phone}</span>
                </a>
                <a
                  href={site.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>WhatsApp: {site.contact.whatsapp}</span>
                </a>
              </div>

              <Link
                href="/contact"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-400 to-sky-500 text-slate-950 font-heading text-lg tracking-wider uppercase text-center flex items-center justify-center gap-2 font-bold shadow-[0_0_20px_rgba(56,189,248,0.3)]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>Request Quotation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Search Modal */}
      <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

export default PillNav;
