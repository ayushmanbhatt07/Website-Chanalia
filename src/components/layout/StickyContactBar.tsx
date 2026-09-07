'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Phone, MessageCircle, FileText } from 'lucide-react';
import { site } from '@/content/site';
import { cn } from '@/lib/utils';

export function StickyContactBar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname !== '/') return null;

  return (
    <div 
      className={cn(
        "lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--color-rio-surface)] border-t border-[var(--color-rio-line)] shadow-[0_-2px_8px_rgba(22,24,26,.08)] transition-transform duration-300",
        scrolled ? "translate-y-full" : "translate-y-0"
      )}
    >
      <div className="grid grid-cols-3 divide-x divide-[var(--color-rio-line)]">
        <a
          href={`tel:${site.contact.phone.replace(/\s/g, '')}`}
          className="flex flex-col items-center justify-center gap-1 py-2.5 text-[var(--color-rio-blue)] hover:bg-[var(--color-rio-blue-tint)] transition-colors"
        >
          <Phone className="w-5 h-5" />
          <span className="text-[10px] font-medium">Call</span>
        </a>
        <a
          href={site.contact.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-2.5 text-[#25D366] hover:bg-green-50 transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-[10px] font-medium">WhatsApp</span>
        </a>
        <a
          href="/contact"
          className="flex flex-col items-center justify-center gap-1 py-2.5 text-[var(--color-rio-blue)] hover:bg-[var(--color-rio-blue-tint)] transition-colors"
        >
          <FileText className="w-5 h-5" />
          <span className="text-[10px] font-medium">Enquire</span>
        </a>
      </div>
    </div>
  );
}
