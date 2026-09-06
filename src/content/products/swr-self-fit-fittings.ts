import type { Product } from './types';

// TODO: Pull spec table data from https://riopipes.com/swr-self-fit-fittings-as-per-is-14735/
export const swrSelfFitFittings: Product = {
  name: 'SWR Self Fit Fittings as per IS-14735',
  slug: 'swr-self-fit-fittings',
  category: 'swr',
  standard: 'IS 14735',
  features: [
    '100% leak-proof joints',
    'High flow rates - no choking',
    'UV stabilized',
    'Quick and convenient installation',
    'Cost-effective',
    'Strong and durable',
    'Maintenance-free',
  ],
    image: '/images/products/swr-door-elbow-90-deg.jpg',
  gallery: [
    "/images/products/swr-coupler-socket.jpg",
    "/images/products/swr-door-elbow-90-deg.jpg",
    "/images/products/swr-door-equal-tee.jpg",
    "/images/products/swr-double-wye-cross.jpg",
    "/images/products/swr-equal-tee-75mm.jpg",
    "/images/products/swr-nahani-floor-trap.jpg",
    "/images/products/swr-pipe-socket-end.jpg",
    "/images/products/swr-reducing-tee-110-75mm.jpg"
],
  tables: [],
};
