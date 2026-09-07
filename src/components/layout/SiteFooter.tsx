import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Award } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { site } from '@/content/site';
import { categories } from '@/content/categories';

export function SiteFooter() {
  return (
    <footer className="bg-[#0B0F1A] text-slate-300 border-t border-[#1F2937] relative overflow-hidden">
      {/* Top Status Bar */}
      <div className="border-b border-[#1F2937] bg-[#0B0F1A]/60 py-3.5">
        <Container className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-success opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-status-success" />
            </span>
            <span className="text-slate-300">
              Manufacturing Facility Active • Metoda G.I.D.C., Rajkot, Gujarat
            </span>
          </div>

          <div className="flex max-sm:flex-col items-center gap-2 sm:gap-4 text-slate-400">
            <span className="inline-flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-accent-primary" />
              ISO 9001:2015 Certified
            </span>
            <span className="hidden sm:inline text-[#1F2937]">•</span>
            <span className="text-slate-300">
              BIS Standard Conformity
            </span>
          </div>
        </Container>
      </div>

      <Container className="py-10 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/logo.jpg"
                alt="RIO Pipes & Fittings"
                width={140}
                height={48}
                className="object-contain"
                style={{ width: 'auto', height: 'auto' }}
              />
            </Link>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Premier manufacturer of CPVC, UPVC, SWR, and Agricultural pipes & fittings. Produced with 100% virgin polymer by Reva Polyplast since 2015.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#131b2e] border border-[#1F2937] flex items-center justify-center text-slate-400 max-md:text-white hover:text-white hover:border-slate-500 transition-colors"
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#131b2e] border border-[#1F2937] flex items-center justify-center text-slate-400 max-md:text-white hover:text-white hover:border-slate-500 transition-colors"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
            </div>
          </div>

          {/* Product Range */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white max-md:!text-white mb-4">
              Piping Systems
            </h3>
            <ul className="space-y-2.5">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/products/${cat.slug}`}
                    className="text-sm text-slate-300 hover:text-accent-primary transition-colors flex items-center gap-2"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: cat.accentHex }}
                    />
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/products"
                  className="text-xs font-mono font-semibold text-accent-primary hover:underline inline-flex items-center gap-1"
                >
                  Full 68-SKU Catalog →
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white max-md:!text-white mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Reva Polyplast
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Sales Desk
                </Link>
              </li>
              <li>
                <Link href="/contact#dealer" className="hover:text-white transition-colors">
                  Distributor / Dealer Network
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  Product Specifications
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white max-md:!text-white mb-4">
              Direct Contact
            </h3>
            <ul className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 shrink-0 text-accent-primary mt-0.5" />
                <a
                  href={site.contact.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {site.contact.address}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 shrink-0 text-accent-primary" />
                <a href={`tel:${site.contact.phone.replace(/\\s/g, '')}`} className="hover:text-white font-mono transition-colors">
                  {site.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 shrink-0 text-accent-primary" />
                <a href={`mailto:${site.contact.email}`} className="hover:text-white transition-colors">
                  {site.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 shrink-0 text-accent-primary" />
                <span className="font-mono">{site.contact.hours}</span>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-[#1F2937] bg-[#05070d]">
        <Container className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-mono">
          <p>{site.copyright}</p>
          <p>ISO 9001:2015 & BIS Certified Manufacturer</p>
        </Container>
      </div>
    </footer>
  );
}
