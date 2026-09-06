import type { CategorySlug } from '../categories';

export type SpecTable = {
  label: string;
  caption?: string;
  columns: string[];
  rows: (string | number)[][];
  containsPricing?: boolean;
};

export type Product = {
  name: string;
  slug: string;
  category: CategorySlug;
  standard: string;
  image?: string;
  gallery?: string[];
  features: string[];
  tables: SpecTable[];
};
