import type { Product } from './types';

export const upvcPipes: Product = {
  name: 'UPVC PIPES SCH-40 & SCH-80 as per ASTM D-1785',
  slug: 'upvc-pipes',
  category: 'upvc',
  standard: 'ASTM D-1785',
  features: [
    'Excellent resistance to corrosion and chemical attacks',
    'Maintenance-free & easy to install',
    'Simple and leak proof joint',
    'Better insulation properties',
    'Designed to last for ages',
    'Most cost-effective',
    'Low thermal conductivity',
    'UV resistant',
    'Service temperature up to 60°C',
  ],
    image: '/images/products/upvc-pipes-samples-standing.jpg',
  gallery: [],
  tables: [
    {
      label: 'RIO PRIME UPVC SCHEDULE-40 ASTM D-1785',
      columns: ['Size (Inch)', 'Size (mm)', '3 Mtr Pack', 'Product Code', '6 Mtr Pack', 'Product Code'],
      rows: [
        ['1/2″', '15', 50, 'UPP40123', 30, 'UPP40126'],
        ['3/4″', '20', 40, 'UPP40343', 25, 'UPP40346'],
        ['1″', '25', 30, 'UPP401S3', 20, 'UPP401S6'],
        ['1 1/4″', '32', 20, 'UPP401143', 15, 'UPP401146'],
        ['1 1/2″', '40', 15, 'UPP401123', 10, 'UPP401126'],
        ['2″', '50', 10, 'UPP402S3', 5, 'UPP402S6'],
      ],
    },
    {
      label: 'RIO PRIME UPVC SCHEDULE-80 ASTM D-1785',
      columns: ['Size (Inch)', 'Size (mm)', '3 Mtr Pack', 'Product Code', '6 Mtr Pack', 'Product Code'],
      rows: [
        ['1/2″', '15', 50, 'UPP80123', 30, 'UPP80126'],
        ['3/4″', '20', 40, 'UPP80343', 25, 'UPP80346'],
        ['1″', '25', 30, 'UPP801S3', 20, 'UPP801S6'],
        ['1 1/4″', '32', 20, 'UPP801143', 15, 'UPP801146'],
        ['1 1/2″', '40', 15, 'UPP801123', 10, 'UPP801126'],
        ['2″', '50', 10, 'UPP802S3', 5, 'UPP802S6'],
      ],
    },
  ],
};
