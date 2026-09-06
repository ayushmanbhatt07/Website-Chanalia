export const testimonials = {
  aggregate: {
    rating: 4.4,
    totalReviews: 20,
    source: 'Google Reviews',
    googleListingUrl: 'https://www.google.com/maps?cid=605963425207668080',
  },
  // Curated: only reviews with actual body text and 4+ stars
  reviews: [
    {
      name: 'Milan Moliya',
      rating: 5,
      age: 'a week ago',
      text: 'Good Quality product',
    },
    {
      name: 'Upendar Kalia',
      rating: 4,
      age: '5 years ago',
      text: 'Good',
    },
    {
      name: 'Vimal Dhamsania',
      rating: 5,
      age: '9 years ago',
      text: 'Manufacturers of CPVC Pipe Fittings',
    },
    {
      name: 'jaimin boghani',
      rating: 5,
      age: '6 years ago',
      text: 'Good',
    },
    {
      name: 'harry music',
      rating: 5,
      age: '8 years ago',
      text: 'Vav',
    },
  ],
} as const;
