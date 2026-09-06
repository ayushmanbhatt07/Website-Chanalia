'use client';

import { Phone, MessageCircle, FileText } from 'lucide-react';
import { site } from '@/content/site';

export function StickyContactBar() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--color-rio-surface)] border-t border-[var(--color-rio-line)] shadow-[0_-2px_8px_rgba(22,24,26,.08)]">
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
