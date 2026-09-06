export const aboutContent = {
  pageHeader: {
    heading: 'About RIO Pipes & Fittings',
  },

  story: {
    eyebrow: 'Our story',
    heading: 'Mr. Dharmesh Khoont, Managing Director',
    body: 'With over 20 years of industry experience, Mr. Khoont has shaped RIO into a dealer-centric, innovation-driven, & value-focused brand. His leadership ensures growth opportunities, competitive pricing, & a commitment to integrity for every partner.',
    // No portrait available — do not substitute a stock person.
    // Request the real photo from the client (old site has story.png).
    image: null as string | null,
  },

  founding: {
    year: 2015,
    location: 'Rajkot, Gujarat, India',
    entity: 'Reva Polyplast',
    md: 'Mr. Dharmesh Khoont',
  },

  mission: {
    eyebrow: 'Our Purpose & Promise',
    heading: 'Driving Growth with Quality, Innovation & Trust',
    pullQuote: 'Power of Quality, Advantage of Value',
    mission: 'To deliver innovative, reliable, & value-driven piping solutions for every household, contractor, and farmer, while ensuring consistent growth opportunities for our dealer network.',
    vision: 'To be among India\'s top-tier piping brands, expanding nationwide by 2026 with sustainable manufacturing, digital connectivity, & water-efficient innovations. Long-term, RIO aims to represent Indian excellence globally.',
  },

  whyChooseUs: {
    eyebrow: 'Why Choose Us',
    heading: 'The Strength Behind Your Trust',
    items: [
      {
        title: 'Low maintenance',
        body: 'Preferred by contractors for reliability & low maintenance',
        icon: 'Wrench' as const,
      },
      {
        title: 'Holistic support',
        body: 'Technical guidance, after-sales service, & marketing visibility',
        icon: 'Headset' as const,
      },
      {
        title: 'Strong support',
        body: 'Dealer-friendly policies with strong support',
        icon: 'Handshake' as const,
      },
      {
        title: 'Trusted quality',
        body: 'RIO Pipes & Fittings — Trusted Quality in Every Pipe & Fitting.',
        icon: 'ShieldCheck' as const,
      },
    ],
  },

  standards: {
    heading: 'Standards & Certifications',
    items: [
      { standard: 'ASTM D-2846', appliesTo: 'CPVC pipes & fittings (CTS, SDR 11 / SDR 13.5)' },
      { standard: 'ASTM D-1785', appliesTo: 'UPVC pipes (Schedule 40 / Schedule 80)' },
      { standard: 'ASTM D-2467', appliesTo: 'UPVC fittings (Schedule 80)' },
      { standard: 'IS 13592', appliesTo: 'SWR pipes (self-fit & ring-fit)' },
      { standard: 'IS 14735', appliesTo: 'SWR fittings (self-fit & ring-fit)' },
      { standard: 'IS 4985', appliesTo: 'Agricultural PVC pipes' },
      { standard: 'IS 7834', appliesTo: 'Agricultural PVC fittings' },
    ],
    warranty: {
      upvcCpvc: '10 years',
      swrAgri: '7 years',
    },
    temperatures: {
      cpvc: 'Up to 93°C',
      upvc: 'Up to 60°C',
    },
  },

  ctaBand: {
    eyebrow: 'Get Started',
    heading: 'Are you ready to build with us?',
    body: 'Your trusted partner for all piping solutions across India',
    cta: { label: 'Get Started', href: '/contact' },
  },
} as const;
