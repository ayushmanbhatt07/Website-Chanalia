export const homeContent = {
  hero: {
    eyebrow: 'Smart Piping Innovations for Modern Infrastructure',
    heading: 'CPVC | UPVC | SWR | AGRI PIPES & FITTINGS',
    body: 'Durable plumbing solution for clean and safe water flow and long-lasting irrigation solution.',
    cta: { label: 'Explore Now', href: '/products' },
    ctaSecondary: { label: 'Contact Us', href: '/contact' },
  },

  clientLogos: {
    eyebrow: 'Our beloved partners',
    // Real logo files must be supplied by the client.
    // The old site has client_1.png through client_10.png — request these.
    logos: null as string[] | null,
  },

  categoryGrid: {
    eyebrow: 'Our range',
    heading: 'Our Premium Piping Solutions',
  },

  about: {
    eyebrow: 'About us',
    heading: 'Leading Manufacturer of UPVC, CPVC, SWR & Agri (PVC) Pipes & Fittings',
    body: 'Founded in 2015 in Rajkot, RIO Pipes & Fittings has grown into a trusted name in polymer-based piping solutions. With expertise in CPVC, UPVC, SWR, & Agricultural pipes & fittings, we serve Residential, commercial, and industrial needs across India. Our advanced facility, transparent dealer policies, and reliable products have made RIO the preferred choice for dealers, contractors, and end-users.',
    cta: { label: 'About Us', href: '/about' },
  },

  stats: {
    // TODO: All four counters currently render as 0 on the live site.
    // Real values must be supplied by the client.
    items: [
      { label: 'Clients', value: null as number | null, suffix: '+' },
      { label: 'Projects', value: null as number | null, suffix: '+' },
      { label: 'Hours Of Support', value: null as number | null, suffix: '+' },
      { label: 'Workers', value: null as number | null },
    ],
  },

  benefits: {
    eyebrow: 'Built for real conditions',
    heading: 'Real-World Benefits',
    subtitle: 'Engineered for performance. Trusted for life. Our pipes deliver reliability across every environment.',
    items: [
      { title: 'Hot & Cold Plumbing', icon: 'Thermometer' as const, hasImage: true },
      { title: 'Residential Use', icon: 'Home' as const, hasImage: true },
      { title: 'Industrial Use', icon: 'Factory' as const, hasImage: true },
      { title: 'Corrosive & Chemical Fluids', icon: 'FlaskConical' as const, hasImage: false },
      { title: 'Drinking Water', icon: 'Droplets' as const, hasImage: false },
    ],
  },

  whatWeDo: {
    eyebrow: 'Simple. Reliable. Quality.',
    heading: 'Product That Satisfies You',
    items: [
      {
        title: 'Premium Pipe Manufacturing',
        body: 'Our state-of-the-art manufacturing facility produces high-quality CPVC, UPVC, SWR, and Agricultural pipes that meet international standards.',
      },
      {
        title: 'Custom Fitting Solutions',
        body: 'We offer tailored fitting solutions to meet your specific requirements. Our expert team provides guidance on selecting the right products for your plumbing needs.',
      },
      {
        title: 'Installation Support',
        body: 'Our team provides comprehensive installation guidance and support to ensure proper product installation and optimal performance.',
      },
      {
        title: 'Quality Assurance',
        body: 'We maintain strict quality control throughout our manufacturing process, ensuring each product meets international standards and specifications.',
      },
    ],
  },

  ctaBand: {
    eyebrow: 'Get Started',
    heading: 'Are you ready to build with us?',
    body: 'At Reva Polyplast, we specialize in high-performance UPVC and CPVC pipes designed for modern plumbing, industrial fluid handling, and infrastructure projects. Our pipes are corrosion-resistant, UV-stabilized, and built to withstand extreme temperatures—making them the go-to choice for reliability and longevity. From smooth flow rates to easy installation, every product reflects our commitment to quality and innovation.',
    cta: { label: 'About Us', href: '/about' },
  },

  dealerCta: {
    heading: 'Become a RIO Dealer',
    body: 'Join our growing network of trusted partners across India. Competitive margins, marketing support, and technical training.',
    cta: { label: 'Partner With Us', href: '/contact#dealer' },
  },
} as const;
