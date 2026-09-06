import type { Product } from './types';

export const swrSelfFitPipes: Product = {
  name: 'SWR Self Fit Pipes as per IS-13592',
  slug: 'swr-self-fit-pipes',
  category: 'swr',
  standard: 'IS 13592',
  features: [
    '100% leak-proof joints',
    'High flow rates - no choking',
    'A high degree of dimensional accuracy',
    'UV stabilized',
    'Quick and convenient installation',
    'Cost-effective',
    'Light weight, easy to handle & transport',
    'Strong and durable',
    'Maintenance-free',
    'Push-fit and selfit jointing technology',
  ],
    image: '/images/products/swr-pipe-samples-grey.jpg',
  gallery: [],
  tables: [
    {
      label: 'SWR Self Fit Pipes as per IS-13592',
      caption: 'Type – A Rate Per Piece',
      columns: ['Size', 'Product Code', 'Single Socket 3 Mtr – ISI', 'Product Code', 'Single Socket 6 Mtr – ISI'],
      // NOTE: These columns contain public INR pricing.
      // Confirm with the client whether public pricing is intended.
      containsPricing: true,
      rows: [
        ['40 MM', 'SSPA403', 165, 'SSPA406', 330],
        ['50 MM', 'SSPA503', 247, 'SSPA506', 494],
        ['63 MM', 'SSPA633', 289, 'SSPA636', 578],
        ['75 MM', 'SSPA753', 371, 'SSPA756', 742],
        ['90 MM', 'SSPA903', 515, 'SSPA906', 1030],
        ['110 MM', 'SSPA1103', 710, 'SSPA1106', 1420],
        ['160 MM', 'SSPA1603', 1646, 'SSPA1606', 3292],
      ],
    },
    {
      label: 'SWR Self Fit Pipes as per IS-13592',
      caption: 'Type – B Rate Per Piece',
      columns: ['Size', 'Product Code', 'Single Socket 3 Mtr – ISI', 'Product Code', 'Single Socket 6 Mtr – ISI'],
      containsPricing: true,
      rows: [
        ['40 MM', 'SSPB403', 258, 'SSPB406', 516],
        ['50 MM', 'SSPB503', 357, 'SSPB506', 714],
        ['63 MM', 'SSPB633', 531, 'SSPB636', 1070],
        ['75 MM', 'SSPB753', 635, 'SSPB756', 1270],
        ['90 MM', 'SSPB903', 970, 'SSPB906', 1940],
        ['110 MM', 'SSPB1103', 926, 'SSPB1106', 1852],
        ['160 MM', 'SSPB1603', 2058, 'SSPB1606', 4116],
      ],
    },
  ],
};
