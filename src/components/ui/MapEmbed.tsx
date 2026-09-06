'use client';

import { useState } from 'react';
import { site } from '@/content/site';

export function MapEmbed() {
  const [loaded, setLoaded] = useState(false);

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.contact.address)}&output=embed`;

  if (!loaded) {
    return (
      <div className="relative rounded-lg overflow-hidden border border-[var(--color-rio-line)] bg-[var(--color-rio-sink)]">
        <div className="aspect-[16/9] flex items-center justify-center">
          <button
            onClick={() => setLoaded(true)}
            className="px-6 py-3 bg-[var(--color-rio-surface)] border border-[var(--color-rio-line)] rounded-lg text-sm font-medium text-[var(--color-rio-slate)] hover:text-[var(--color-rio-blue)] hover:border-[var(--color-rio-blue)] transition-colors cursor-pointer"
          >
            Load Map
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg overflow-hidden border border-[var(--color-rio-line)]">
      <iframe
        src={mapSrc}
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Reva Polyplast Location"
      />
    </div>
  );
}
