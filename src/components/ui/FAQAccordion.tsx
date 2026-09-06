'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { faqs } from '@/content/faqs';
import { Eyebrow } from './Eyebrow';

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      <Eyebrow>FAQs</Eyebrow>
      <h2 className="text-h2 font-[var(--font-display)] text-[var(--color-rio-ink)] mb-8">
        Frequently Asked Questions
      </h2>
      <div className="space-y-0 border-t border-[var(--color-rio-line)]">
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-[var(--color-rio-line)]">
            <button
              className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              aria-expanded={openIndex === i}
            >
              <span className="text-base font-medium text-[var(--color-rio-ink)] pr-4">
                {faq.question}
              </span>
              <ChevronDown
                className={cn(
                  'w-5 h-5 shrink-0 text-[var(--color-rio-mute)] transition-transform duration-250',
                  openIndex === i && 'rotate-180'
                )}
              />
            </button>
            <div
              className={cn(
                'overflow-hidden transition-all duration-250',
                openIndex === i ? 'max-h-96 pb-5' : 'max-h-0'
              )}
            >
              <p className="text-sm text-[var(--color-rio-slate)] leading-relaxed prose-width">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
