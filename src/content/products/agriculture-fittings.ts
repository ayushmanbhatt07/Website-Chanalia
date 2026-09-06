import type { Product } from './types';

// TODO: Pull spec table data from https://riopipes.com/agriculture-fitting-as-per-is-7834/
export const agricultureFittings: Product = {
  name: 'Agriculture Fitting as per IS-7834',
  slug: 'agriculture-fittings',
  category: 'agriculture',
  standard: 'IS 7834',
  features: [
    'Light weight, easy to transport, store, handle and install',
    'Smooth bore ensures higher flow compared to G.I. pipes',
    'A high degree of dimensional accuracy',
    'Solvent cement joint therefore quick installation',
    'Corrosion resistance',
    'Long working life',
    'Cost effective',
  ],
    image: '/images/products/agri-pvc-ball-valve-blue.jpg',
  gallery: [
    "/images/products/agri-pvc-ball-valve-blue.jpg",
    "/images/products/agri-service-saddle-clamp.jpg",
    "/images/products/flange-gasket-rubber-ring.jpg"
],
  tables: [],
};
