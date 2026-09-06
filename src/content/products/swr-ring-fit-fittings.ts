import type { Product } from './types';

// TODO: Pull spec table data from https://riopipes.com/swr-ring-fit-fittings-as-per-is-14735/
export const swrRingFitFittings: Product = {
  name: 'SWR Ring Fit Fittings as per IS-14735',
  slug: 'swr-ring-fit-fittings',
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
    image: '/images/products/swr-ringfit-elbow-90-deg.jpg',
  gallery: [
    "/images/products/swr-ringfit-elbow-45-deg.jpg",
    "/images/products/swr-ringfit-elbow-90-deg.jpg",
    "/images/products/swr-ringfit-equal-tee.jpg",
    "/images/products/swr-ringfit-wye-y-branch.jpg"
],
  tables: [],
};
