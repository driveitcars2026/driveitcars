export default function robots() {
  return {
    rules: [
      {
        userAgent: 'OpenSEO-Audit',
        disallow: [
          '/cgi-bin/',
          '/api/',
          '/studio/',
          '/studio',
          '/googleb13fac68823625ba',
          '/blog/',
          '/blog',
          '/privacy',
          '/terms-conditions',
          '/partner',
          '/reviews',
          '/about',
          '/outstation-bus',
          '/vijay-nagar-colony',
          '/langer-house',
          '/sun-city',
          '/himmatnagar',
          '/bowenpally',
          '/tarnaka',
          '/habsiguda',
          '/yousufguda',
          '/sr-nagar',
          '/guttala-begumpet',
        ],
      },
      {
        userAgent: '*',
        disallow: ['/cgi-bin/', '/api/', '/studio/', '/studio', '/googleb13fac68823625ba'],
      },
    ],
    sitemap: 'https://www.driveitcars.in/sitemap.xml',
  };
}
