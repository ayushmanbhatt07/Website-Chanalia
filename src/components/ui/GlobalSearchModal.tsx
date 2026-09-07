'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ChevronRight, Layers, Tag } from 'lucide-react';
import { allProducts } from '@/content/products';
import { categories } from '@/content/categories';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Global keyboard shortcut (Ctrl+K or Cmd+K or /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Filter products and categories based on search query
  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) {
      // Show popular / featured items when empty
      return allProducts.slice(0, 8);
    }

    return allProducts.filter((p) => {
      const nameMatch = p.name.toLowerCase().includes(q);
      const standardMatch = p.standard.toLowerCase().includes(q);
      const catMatch = p.category.toLowerCase().includes(q);
      const featureMatch = p.features.some((f) => f.toLowerCase().includes(q));
      return nameMatch || standardMatch || catMatch || featureMatch;
    }).slice(0, 12);
  }, [query]);

  // Handle arrow key navigation & Escape
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (results.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % (results.length || 1));
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl border border-white/[0.12] bg-[#0A0F1D] shadow-[0_24px_64px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.08] bg-slate-900/50">
          <Search className="w-5 h-5 text-accent-primary shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search all 68 pipes, fittings, standards (e.g. ASTM, SWR, Elbow, 110mm)..."
            className="flex-1 bg-transparent text-slate-100 placeholder-slate-500 text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-200 p-1 text-xs uppercase"
            >
              Clear
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-mono text-slate-400 bg-slate-800/80 rounded border border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Quick Category Filters */}
        <div className="flex items-center gap-2 px-5 py-2.5 bg-slate-950/40 border-b border-white/[0.04] overflow-x-auto text-xs">
          <span className="text-slate-500 uppercase tracking-wider text-[10px] font-mono shrink-0">
            Categories:
          </span>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setQuery(cat.slug)}
              className="px-2.5 py-1 rounded-full bg-slate-800/60 hover:bg-slate-700/80 text-slate-300 border border-white/[0.06] transition-colors shrink-0"
              style={{ borderColor: query === cat.slug ? cat.accentHex : undefined }}
            >
              {cat.name.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1 divide-y divide-white/[0.03]">
          {results.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <Layers className="w-8 h-8 mx-auto mb-3 text-slate-600" />
              <p className="text-base font-medium text-slate-300">No matching products found</p>
              <p className="text-sm text-slate-500 mt-1">Try searching for &quot;CPVC&quot;, &quot;Elbow&quot;, &quot;IS 4985&quot;, or &quot;Tee&quot;.</p>
            </div>
          ) : (
            results.map((product, idx) => {
              const isSelected = idx === selectedIndex;
              const cat = categories.find((c) => c.slug === product.category);

              return (
                <Link
                  key={product.slug}
                  href={`/products/${product.category}/${product.slug}`}
                  onClick={onClose}
                  className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                    isSelected
                      ? 'bg-accent-primary/10 border border-accent-primary/30 text-white'
                      : 'hover:bg-white/[0.04] text-slate-300 border border-transparent'
                  }`}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Thumbnail */}
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-800 border border-white/[0.08] shrink-0">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-600">
                          <Tag className="w-5 h-5" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span
                          className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded border"
                          style={{
                            color: cat?.accentHex || 'var(--color-accent-primary)',
                            borderColor: `${cat?.accentHex || 'var(--color-accent-primary)'}40`,
                            backgroundColor: `${cat?.accentHex || 'var(--color-accent-primary)'}15`,
                          }}
                        >
                          {cat?.name.split(' ')[0] || product.category}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500">
                          {product.standard}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-slate-100 truncate">
                        {product.name}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-500 shrink-0 ml-2" />
                </Link>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-5 py-2.5 bg-slate-950/60 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-500 font-mono">
          <span>Total Catalog: 68 Engineering Products</span>
          <span className="hidden sm:inline">Use ↑ ↓ to navigate, ↵ to select</span>
        </div>
      </div>
    </div>
  );
}
