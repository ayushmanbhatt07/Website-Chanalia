import Link from 'next/link';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { site } from '@/content/site';
import { categories } from '@/content/categories';
import Image from 'next/image';

export function SiteFooter() {
  return (
    <footer className="bg-[var(--color-rio-night)] text-white">
      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image src="/images/logo.webp" alt="RIO Pipes & Fittings" width={140} height={48} className="object-contain" style={{ width: 'auto', height: 'auto' }} />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 prose-width">
              Manufacturer of CPVC, UPVC, SWR & Agricultural pipes and fittings since 2015.
            </p>
            <div className="flex items-center gap-4">
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
            </div>
          </div>

          {/* Product tree */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-white">Products</h3>
            <ul className="space-y-2.5">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/products/${cat.slug}`}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/products"
                  className="text-sm text-[var(--color-rio-blue)] hover:text-white transition-colors font-medium"
                >
                  View all products →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/contact#dealer" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Become a Dealer
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-white">Get In Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 shrink-0 text-gray-400 mt-0.5" />
                <a
                  href={site.contact.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-white transition-colors leading-relaxed"
                >
                  {site.contact.address}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 shrink-0 text-gray-400" />
                <a
                  href={`tel:${site.contact.phone.replace(/\s/g, '')}`}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {site.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 shrink-0 text-gray-400" />
                <a
                  href={site.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  WhatsApp: {site.contact.whatsapp}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 shrink-0 text-gray-400" />
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {site.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 shrink-0 text-gray-400" />
                <span className="text-sm text-gray-400">{site.contact.hours}</span>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-[var(--color-rio-night-line)]">
        <Container className="py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">{site.copyright}</p>
        </Container>
      </div>
    </footer>
  );
}
