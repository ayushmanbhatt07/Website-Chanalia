import type { Product } from './types';

export const cpvcPipes: Product = {
  name: 'CPVC PIPES in SDR 11 & 13.5 as per ASTM D-2846 in CTS',
  slug: 'cpvc-pipes',
  category: 'cpvc',
  standard: 'ASTM D-2846',
  // No stock image — request real product photo from client
  // Old site had: /wp-content/uploads/2025/10/Product-1.jpg
  features: [
    'Smooth continuous flow of water due to smooth inner surface',
    'Low thermal expansion & conductivity',
    'Light weight & long service life',
    'Easy to handle & install',
    'Flame & smoke resistant',
    'Resilient & long-lasting',
    'Most cost-effective',
    'Service temperature up to 93°C',
  ],
    image: '/images/products/cpvc-pipes-samples-standing.jpg',
  gallery: [],
  tables: [
    {
      label: 'CPVC PIPES SDR 11 CLASS-1',
      columns: ['Size (Inch)', 'Size (mm)', '3 Mtr Pack', 'Product Code', '5 Mtr Pack', 'Product Code'],
      rows: [
        ['1/2″', '15', 75, 'CP11123', 75, 'CP11125'],
        ['3/4″', '20', 60, 'CP11343', 60, 'CP11345'],
        ['1″', '25', 35, 'CP11153', 35, 'CP11155'],
        ['1 1/4″', '32', 25, 'CP111143', 25, 'CP111145'],
        ['1 1/2″', '40', 15, 'CP111123', 15, 'CP111125'],
        ['2″', '50', 10, 'CP112S3', 10, 'CP112S5'],
      ],
    },
    {
      // FIXME: client to confirm — SDR 13.5 codes appear duplicated from SDR 11
      label: 'CPVC PIPES SDR 13.5 CLASS-2',
      columns: ['Size (Inch)', 'Size (mm)', '3 Mtr Pack', 'Product Code', '5 Mtr Pack', 'Product Code'],
      rows: [
        ['1/2″', '15', 75, 'CP11123', 75, 'CP11125'],
        ['3/4″', '20', 60, 'CP11343', 60, 'CP11345'],
        ['1″', '25', 35, 'CP11153', 35, 'CP11155'],
        ['1 1/4″', '32', 25, 'CP111143', 25, 'CP111145'],
        ['1 1/2″', '40', 15, 'CP111123', 15, 'CP111125'],
        ['2″', '50', 10, 'CP112S3', 10, 'CP112S5'],
      ],
    },
  ],
};
