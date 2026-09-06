export type CategorySlug = 'cpvc' | 'upvc' | 'swr' | 'agriculture';

export type Category = {
  slug: CategorySlug;
  name: string;
  accent: string; // CSS variable name
  accentHex: string;
  description: string;
  standards: string[];
  image: string; // key into images.categories
};

export const categories: Category[] = [
  {
    slug: 'upvc',
    name: 'UPVC Plumbing System',
    accent: 'cat-upvc',
    accentHex: '#0B5E8A',
    description: 'Schedule 40 and Schedule 80 pipes and fittings to ASTM D-1785 and D-2467, for cold water distribution and general plumbing. Corrosion-proof, UV resistant, service temperature up to 60°C.',
    standards: ['ASTM D-1785', 'ASTM D-2467'],
    image: '/images/categories/cat-upvc.jpg',
  },
  {
    slug: 'cpvc',
    name: 'CPVC Plumbing System',
    accent: 'cat-cpvc',
    accentHex: '#C8843A',
    description: 'SDR 11 and SDR 13.5 pipes and fittings to ASTM D-2846 in CTS sizing, engineered for hot and cold water lines. Flame and smoke resistant, service temperature up to 93°C.',
    standards: ['ASTM D-2846'],
    image: '/images/categories/cat-cpvc.jpg',
  },
  {
    slug: 'swr',
    name: 'SWR Plumbing System',
    accent: 'cat-swr',
    accentHex: '#5B6770',
    description: 'Soil, waste and rainwater systems to IS 13592 and IS 14735, in both self-fit and ring-fit jointing. 100% leak-proof joints, high flow rates, UV stabilised.',
    standards: ['IS 13592', 'IS 14735'],
    image: '/images/categories/cat-swr.jpg',
  },
  {
    slug: 'agriculture',
    name: 'Agriculture Plumbing System',
    accent: 'cat-agri',
    accentHex: '#4C7A3F',
    description: 'PVC irrigation pipes to IS 4985 and fittings to IS 7834, in 4 and 6 kg/cm³ pressure classes from 40 mm to 160 mm. Smooth bore for higher flow than equivalent G.I.',
    standards: ['IS 4985', 'IS 7834'],
    image: '/images/categories/cat-agriculture.jpg',
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug);
}
