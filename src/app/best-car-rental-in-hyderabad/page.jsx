import Link from 'next/link';
import FaqSection from '@/components/FaqSection';
import SeoSchema, {
  buildCarRentalSchema,
  buildBreadcrumbSchema,
} from '@/components/SeoSchema';

export const metadata = {
  title: 'Best Car Rental in Hyderabad | Self Drive | DriveItCars',
  description:
    'DriveItCars is rated the best car rental in Hyderabad for sanitized self-drive hatchbacks, sedans, SUVs, luxury wedding cars & 24/7 RGIA airport delivery.',
  keywords:
    'best car rental in hyderabad, top car rental hyderabad, best self drive cars hyderabad, luxury car hire hyderabad, driveitcars',
  alternates: {
    canonical: 'https://www.driveitcars.in/best-car-rental-in-hyderabad',
  },
  openGraph: {
    title: 'Best Car Rental in Hyderabad | Self Drive & Luxury | DriveItCars',
    description:
      'Rent from Hyderabad’s trusted car rental fleet. Sanitized self-drive cars, luxury wedding cars & 30–50 seater AC coaches with 24/7 support.',
    url: 'https://www.driveitcars.in/best-car-rental-in-hyderabad',
    siteName: 'DriveItCars',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://www.driveitcars.in/suv.webp',
        width: 1200,
        height: 630,
        alt: 'Best Car Rental in Hyderabad — DriveItCars',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Car Rental in Hyderabad | Self Drive & Luxury | DriveItCars',
    description:
      'Rated 4.9/5 in Hyderabad for self-drive hatchbacks, sedans, SUVs & luxury wedding cars.',
    images: ['https://www.driveitcars.in/suv.webp'],
  },
};

export default function BestCarRentalInHyderabadPage() {
  const rentalSchema = buildCarRentalSchema({
    name: 'DriveItCars — Best Car Rental in Hyderabad',
    description:
      'DriveItCars is rated the best car rental service in Hyderabad (4.9/5 across 1,240+ customers), offering self-drive cars, luxury wedding cars, monthly subscriptions, and 24/7 airport delivery.',
    url: 'https://www.driveitcars.in/best-car-rental-in-hyderabad',
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Best Car Rental in Hyderabad', url: '/best-car-rental-in-hyderabad' },
  ]);

  return (
    <>
      <SeoSchema schema={rentalSchema} />
      <SeoSchema schema={breadcrumbSchema} />

      {/* Breadcrumb Area Start */}
      <section className="gauto-breadcromb-area section_70">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="breadcromb-box">
                <h1 className="breadcromb-title">Best Car Rental in Hyderabad — DriveItCars</h1>
                <ul>
                  <li><i className="fa fa-home" /></li>
                  <li><Link href="/">Home</Link></li>
                  <li><i className="fa fa-angle-right" /></li>
                  <li>Best Car Rental in Hyderabad</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Breadcrumb Area End */}

      {/* About Page Area Start */}
      <section className="about-page-area section_70">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="about-page-left">
                <h2>Why DriveItCars Is Rated the Best Car Rental Service in Hyderabad</h2>
                <p >
                  Choosing the <strong>best car rental in Hyderabad</strong> comes down to three things: showroom-clean vehicles, transparent pricing with zero hidden charges, and guaranteed on-time delivery. At <strong>DriveItCars</strong>, our central operations team in <Link href="/masab-tank" style={{ color: '#191c20', fontWeight: 600, textDecoration: 'underline' }}>Masab Tank</Link> maintains over 28+ modern vehicle models—ranging from fuel-efficient <Link href="/hatchback" style={{ color: '#191c20', fontWeight: 600, textDecoration: 'underline' }}>hatchbacks</Link> and <Link href="/sedan" style={{ color: '#191c20', fontWeight: 600, textDecoration: 'underline' }}>executive sedans</Link> to rugged <Link href="/suv5" style={{ color: '#191c20', fontWeight: 600, textDecoration: 'underline' }}>5-seater</Link> &amp; <Link href="/suv7" style={{ color: '#191c20', fontWeight: 600, textDecoration: 'underline' }}>7-seater SUVs</Link>, <Link href="/luxurycars" style={{ color: '#191c20', fontWeight: 600, textDecoration: 'underline' }}>luxury wedding cars</Link>, and <Link href="/luxury-buses" style={{ color: '#191c20', fontWeight: 600, textDecoration: 'underline' }}>30–50 seater AC coaches</Link>.
                </p>
                <p >
                  With a <strong>4.9★ rating from 1,240+ verified customers</strong>, instant 10-minute WhatsApp KYC verification, 300 km/day included on daily plans, and 15 to 30-minute doorstep delivery across <Link href="/hitech-city" style={{ color: '#191c20', fontWeight: 600, textDecoration: 'underline' }}>HITEC City</Link>, <Link href="/gachibowli" style={{ color: '#191c20', fontWeight: 600, textDecoration: 'underline' }}>Gachibowli</Link>, <Link href="/banjara-hills" style={{ color: '#191c20', fontWeight: 600, textDecoration: 'underline' }}>Banjara Hills</Link>, <Link href="/jubilee-hills" style={{ color: '#191c20', fontWeight: 600, textDecoration: 'underline' }}>Jubilee Hills</Link>, and <Link href="/hyderabad-airport-car-rental" style={{ color: '#191c20', fontWeight: 600, textDecoration: 'underline' }}>RGIA Shamshabad Airport</Link>, DriveItCars sets the benchmark for car rentals in Hyderabad.
                </p>
                <div className="about-page-call">
                  <div className="page-call-icon">
                    <i className="fa fa-phone" />
                  </div>
                  <div className="call-info">
                    <p>24/7 Reservations &amp; Fleet Desk</p>
                    <h3><a href="tel:+916300041186">+91 63000 41186</a></h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-page-right">
                <img
                  loading="lazy"
                  src="/assets/img/cars.jpg"
                  alt="Best car rental in Hyderabad - DriveItCars self drive and luxury fleet"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* About Page Area End */}

      {/* Promo Area Start */}
      <section className="gauto-about-promo section_70">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="about-promo-text">
                <h2>Rent Self Drive, Luxury &amp; Corporate Cars with <span>DriveItCars</span></h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="about-promo-image">
                <img
                  loading="lazy"
                  src="/assets/img/cars.png"
                  alt="DriveItCars Hyderabad fleet of SUVs, sedans, and hatchbacks"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Promo Area End */}

      <FaqSection />
    </>
  );
}
