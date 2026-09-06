import type { Product } from './types';

export const agriculturePipes: Product = {
  name: 'Agriculture PIPES as per IS-4985',
  slug: 'agriculture-pipes',
  category: 'agriculture',
  standard: 'IS 4985',
  features: [
    'Light weight, easy to transport, store, handle and install. Saves labour',
    'Smooth bore ensures higher flow compared to G.I. pipes and fittings of the same size. No clogging. Saves operational cost',
    'A high degree of dimensional accuracy',
    'Solvent cement joint therefore quick installation',
    'Corrosion resistance, UPVC is rustproof material therefore bore diameter remains constant, ensuring constant flow over a lifetime',
    'Long working life (if operated under normal/recommended working conditions)',
    'Cost effective. Added value for your money',
  ],
    image: '/images/products/upvc-cpvc-pipe-samples-standing.jpg',
  gallery: [],
  tables: [
    {
      label: 'Agriculture Pipes IS-4985',
      caption: 'Rate per mtr - ISI',
      columns: ['Size', 'Product Code (6 KG/cm³)', 'Product Code (4 KG/cm³)'],
      rows: [
        ['40 MM', 'RPP406', '–'],
        ['50 MM', 'RPP506', '–'],
        ['63 MM', 'RPP636', 'RPP634'],
        ['75 MM', 'RPP756', 'RPP754'],
        ['90 MM', 'RPP906', 'RPP904'],
        ['110 MM', 'RPP1106', 'RPP1104'],
        ['140 MM', 'RPP1406', 'RPP1404'],
        ['160 MM', 'RPP1606', 'RPP1604'],
      ],
    },
  ],
};
