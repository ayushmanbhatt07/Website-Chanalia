import type { Product } from './types';
export type { Product, SpecTable } from './types';

import { cpvcPipes } from './cpvc-pipes';
import { cpvcFittings } from './cpvc-fittings';
import { upvcPipes } from './upvc-pipes';
import { upvcFittings } from './upvc-fittings';
import { swrSelfFitPipes } from './swr-self-fit-pipes';
import { swrRingFitPipes } from './swr-ring-fit-pipes';
import { swrSelfFitFittings } from './swr-self-fit-fittings';
import { swrRingFitFittings } from './swr-ring-fit-fittings';
import { swrSelfFitFittingsNonIsi } from './swr-self-fit-fittings-non-isi';
import { agriculturePipes } from './agriculture-pipes';
import { agricultureFittings } from './agriculture-fittings';
import { agricultureFittingsNonIsi } from './agriculture-fittings-non-isi';

export const allProducts: Product[] = [
  cpvcPipes,
  cpvcFittings,
  upvcPipes,
  upvcFittings,
  swrSelfFitPipes,
  swrRingFitPipes,
  swrSelfFitFittings,
  swrRingFitFittings,
  swrSelfFitFittingsNonIsi,
  agriculturePipes,
  agricultureFittings,
  agricultureFittingsNonIsi,
];

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find(p => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return allProducts.filter(p => p.category === category);
}

export {
  cpvcPipes,
  cpvcFittings,
  upvcPipes,
  upvcFittings,
  swrSelfFitPipes,
  swrRingFitPipes,
  swrSelfFitFittings,
  swrRingFitFittings,
  swrSelfFitFittingsNonIsi,
  agriculturePipes,
  agricultureFittings,
  agricultureFittingsNonIsi,
};
