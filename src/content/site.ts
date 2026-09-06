export const site = {
  brand: 'RIO Pipes & Fittings',
  legalEntity: 'Reva Polyplast',
  tagline: 'Power of Quality, Advantage of Value',
  founded: 2015,
  foundedIn: 'Rajkot, Gujarat, India',
  managingDirector: 'Mr. Dharmesh Khoont',
  mdExperience: 'Over 20 years of industry experience',
  business: 'Manufacturer of polymer-based piping solutions',
  productFamilies: ['CPVC', 'UPVC', 'SWR', 'Agricultural (PVC)'],
  marketsServed: 'Residential, commercial, and industrial, across India',

  contact: {
    address: 'Reva Polyplast, Plot No. G-2408/B, Road No. F-2, Almighty Gate, Metoda G.I.D.C., Rajkot – 360021 (Gujarat), India',
    phone: '+91 93169 28238',
    whatsapp: '+91 98250 78383',
    whatsappLink: 'https://wa.me/+919825078383',
    email: 'info@riopipes.com',
    hours: 'Mon–Sat: 09:00 AM – 5:00 PM',
    googleMapsCID: '605963425207668080',
    googleMapsUrl: 'https://www.google.com/maps?cid=605963425207668080',
  },

  social: {
    facebook: 'https://www.facebook.com/Riopipesandfitting/',
    linkedin: 'https://in.linkedin.com/in/dharmesh-khoont-b5771524a',
    instagram: 'https://www.instagram.com/reva.polyplast/?hl=en',
  },

  copyright: `COPYRIGHT © ${new Date().getFullYear()} Reva Polyplast. ALL RIGHTS RESERVED.`,

  nav: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    {
      label: 'Products',
      href: '/products',
      children: [
        { label: 'CPVC Plumbing System', href: '/products/cpvc' },
        { label: 'UPVC Plumbing System', href: '/products/upvc' },
        { label: 'SWR Plumbing System', href: '/products/swr' },
        { label: 'Agriculture Plumbing System', href: '/products/agriculture' },
      ],
    },
    { label: 'Contact Us', href: '/contact' },
  ],
} as const;
