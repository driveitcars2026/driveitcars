/**
 * Reusable JSON-LD Schema Component for CarRental, LocalBusiness, FAQPage, and BreadcrumbList.
 */
export default function SeoSchema({ schema }) {
  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function normalizeBrandName(str = '') {
  if (typeof str !== 'string') return str;
  return str
    .replace(/\bDRIVEIT\s+Cars\b/gi, 'DriveItCars')
    .replace(/\bDriveIt\s+Cars\b/gi, 'DriveItCars')
    .replace(/\bDRIVEIT\b/g, 'DriveItCars')
    .replace(/\bDriveIt\b(?!Cars)/g, 'DriveItCars');
}

export function buildCarRentalSchema(data = {}) {
  const baseUrl = 'https://www.driveitcars.in';
  const pageUrl = data.url || baseUrl;

  return {
    '@context': 'https://schema.org',
    '@type': ['AutoRental', 'LocalBusiness'],
    '@id': `${pageUrl}#autorental`,
    name: normalizeBrandName(data.name || 'DriveItCars — Self Drive & Luxury Car Rental Hyderabad'),
    alternateName: 'DriveItCars',
    description: normalizeBrandName(
      data.description ||
        'Book self drive cars, luxury wedding cars, monthly car rentals, and airport car rentals in Hyderabad with DriveItCars. 24/7 doorstep delivery across HITEC City, Gachibowli, Banjara Hills, Jubilee Hills & RGIA Airport.'
    ),
    url: pageUrl,
    telephone: '+91-6300041186',
    email: 'driveitcars@gmail.com',
    priceRange: data.priceRange || '₹1499 - ₹35000',
    image: data.image || `${baseUrl}/suv.webp`,
    logo: `${baseUrl}/logo.webp`,
    hasMap: 'https://maps.google.com/?q=10-2-289/83,+Mehar+mansion,+Rd+Number+2,+Shantinagar+Colony,+Masab+Tank,+Hyderabad,+Telangana+500028',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '10-2-289/83, Mehar Mansion, Rd Number 2, Shantinagar Colony, Masab Tank',
      addressLocality: 'Hyderabad',
      addressRegion: 'Telangana',
      postalCode: '500028',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 17.4021,
      longitude: 78.4519,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1240',
      bestRating: '5',
      worstRating: '1',
    },
    areaServed: (
      data.areaServed || [
        'Hyderabad',
        'HITEC City',
        'Gachibowli',
        'Madhapur',
        'Kondapur',
        'Banjara Hills',
        'Jubilee Hills',
        'Secunderabad',
        'Kukatpally',
        'Begumpet',
        'Masab Tank',
        'Shamshabad Airport',
        'Telangana',
      ]
    ).map((area) => (typeof area === 'string' ? { '@type': 'Place', name: area } : area)),
  };
}

export function buildFaqSchema(faqs = []) {
  if (!faqs || faqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: normalizeBrandName(item.question),
      acceptedAnswer: {
        '@type': 'Answer',
        text: normalizeBrandName(item.answer),
      },
    })),
  };
}

export function buildBreadcrumbSchema(items = []) {
  const baseUrl = 'https://www.driveitcars.in';

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: normalizeBrandName(item.name),
      item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`,
    })),
  };
}
