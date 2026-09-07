'use client';

import { useState } from 'react';
import { site } from '@/content/site';
import { MapPin, ExternalLink, Navigation, Phone, Clock } from 'lucide-react';

export function MapEmbed() {
  const [isLoading, setIsLoading] = useState(true);

  // Robust Google Maps embed query with direct factory coordinates
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    'Reva Polyplast Plot No G-2408 B Road No F-2 Almighty Gate Metoda GIDC Rajkot Gujarat 360021'
  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    'Reva Polyplast Almighty Gate Metoda GIDC Rajkot Gujarat'
  )}`;

  return (
    <div className="rounded-2xl overflow-hidden border border-white/[0.1] bg-[#0B1120] shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
      {/* Factory Dispatch & Status Header */}
      <div className="p-4 sm:p-5 bg-white/[0.03] border-b border-white/[0.08] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-emerald-400">
              Factory & Dispatch Hub • Active
            </span>
          </div>
          <h4 className="font-heading text-lg sm:text-xl text-white tracking-wide flex items-center gap-2">
            <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
            <span>Reva Polyplast — Metoda G.I.D.C., Rajkot</span>
          </h4>
          <p className="text-xs text-slate-400 font-body">
            Plot No. G-2408/B, Road No. F-2, Almighty Gate, Metoda G.I.D.C., Rajkot – 360021 (Gujarat), India
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-heading text-sm tracking-wider uppercase transition-all font-semibold shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:scale-105 active:scale-95"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Get Directions</span>
          </a>

          <a
            href={site.contact.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/[0.1] font-heading text-sm tracking-wider uppercase transition-all hover:scale-105 active:scale-95"
          >
            <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
            <span>Open in Maps</span>
          </a>

          <a
            href={`tel:${site.contact.phone.replace(/\s/g, '')}`}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/[0.1] font-heading text-sm tracking-wider uppercase transition-all hover:scale-105 active:scale-95"
          >
            <Phone className="w-3.5 h-3.5 text-sky-400" />
            <span>Call Desk</span>
          </a>
        </div>
      </div>

      {/* Map Iframe Container with Auto-Loading & Skeleton */}
      <div className="relative w-full h-[420px] sm:h-[480px] bg-[#070A0F]">
        {/* Loading Skeleton */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0B1120] z-10 transition-opacity duration-500">
            <div className="relative flex items-center justify-center mb-4">
              <div className="w-14 h-14 rounded-2xl border-2 border-sky-400/30 border-t-sky-400 animate-spin" />
              <MapPin className="w-6 h-6 text-sky-400 absolute" />
            </div>
            <p className="text-xs font-mono uppercase tracking-widest text-slate-300">
              Loading High-Resolution Factory Map...
            </p>
            <span className="text-[11px] text-slate-500 mt-1 font-body">
              Almighty Gate, Metoda G.I.D.C., Rajkot
            </span>
          </div>
        )}

        {/* Embedded Iframe */}
        <iframe
          src={mapSrc}
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'contrast(1.05) saturate(1.1)' }}
          allowFullScreen
          loading="lazy"
          onLoad={() => setIsLoading(false)}
          referrerPolicy="no-referrer-when-downgrade"
          title="Reva Polyplast Factory Location - Metoda GIDC Rajkot"
          className={`w-full h-full transition-opacity duration-700 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>

      {/* Footer Info Strip */}
      <div className="px-5 py-3 bg-[#070A0F]/80 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 font-mono">
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-sky-400" />
          <span>Hours: {site.contact.hours}</span>
        </div>
        <div className="text-slate-500">
          CID: {site.contact.googleMapsCID} • Heavy Vehicle Logistics Accessible
        </div>
      </div>
    </div>
  );
}
