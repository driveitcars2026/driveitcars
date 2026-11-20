import Link from 'next/link';
import FaqSection from '@/components/FaqSection';
import SeoSchema, {
  buildCarRentalSchema,
  buildBreadcrumbSchema,
} from '@/components/SeoSchema';

export const metadata = {
  title: 'About DriveItCars | Self Drive & Luxury Car Rental Hyderabad',
  description:
    'Learn about DriveItCars, Hyderabad’s trusted self-drive car rental, luxury wedding fleet, and corporate mobility partner headquartered in Masab Tank.',
  keywords:
    'about driveitcars, driveitcars hyderabad, self drive car rental company hyderabad, masab tank car rental, luxury car rental hyderabad',
  alternates: {
    canonical: 'https://www.driveitcars.in/about',
  },
  openGraph: {
    title: 'About DriveItCars | Self Drive & Luxury Car Rental Hyderabad',
    description:
      'Discover how DriveItCars delivers sanitized self-drive hatchbacks, sedans, SUVs, luxury wedding cars & 30–50 seater buses across 28+ Hyderabad hubs.',
    url: 'https://www.driveitcars.in/about',
    siteName: 'DriveItCars',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://www.driveitcars.in/suv.webp',
        width: 1200,
        height: 630,
        alt: 'About DriveItCars Hyderabad',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About DriveItCars | Self Drive & Luxury Car Rental Hyderabad',
    description:
      'Hyderabad’s premier self-drive car rental, luxury wedding fleet & corporate mobility partner.',
    images: ['https://www.driveitcars.in/suv.webp'],
  },
};

export default function AboutPage() {
  const rentalSchema = buildCarRentalSchema({
    name: 'DriveItCars — Self Drive & Luxury Car Rental Hyderabad',
    description:
      'DriveItCars is Hyderabad’s premier self-drive car rental, luxury wedding car hire, and corporate mobility provider headquartered at Mehar Mansion, Masab Tank.',
    url: 'https://www.driveitcars.in/about',
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'About DriveItCars', url: '/about' },
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
                <h1 className="breadcromb-title">About DriveItCars — Self Drive &amp; Luxury Car Rentals</h1>
                <ul>
                  <li><i className="fa fa-home" /></li>
                  <li><Link href="/">Home</Link></li>
                  <li><i className="fa fa-angle-right" /></li>
                  <li>About Us</li>
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
                <h2>Hyderabad’s Trusted Self-Drive, Luxury &amp; Corporate Mobility Partner</h2>
                <p >
                  Headquartered at Mehar Mansion in <Link href="/masab-tank" style={{ color: '#191c20', fontWeight: 600, textDecoration: 'underline' }}>Masab Tank</Link>, <strong>DriveItCars</strong> was built to solve the biggest frustrations faced by Hyderabad commuters and travelers: cab cancellations, unpredictable surge tariffs, poorly maintained rental vehicles, and opaque deposit rules. Today, DriveItCars operates a 100% sanitized, showroom-inspected fleet spanning <Link href="/hatchback" style={{ color: '#191c20', fontWeight: 600, textDecoration: 'underline' }}>hatchbacks</Link>, <Link href="/sedan" style={{ color: '#191c20', fontWeight: 600, textDecoration: 'underline' }}>executive sedans</Link>, <Link href="/suv5" style={{ color: '#191c20', fontWeight: 600, textDecoration: 'underline' }}>5-seater SUVs</Link>, <Link href="/suv7" style={{ color: '#191c20', fontWeight: 600, textDecoration: 'underline' }}>7-seater MPVs</Link>, <Link href="/luxurycars" style={{ color: '#191c20', fontWeight: 600, textDecoration: 'underline' }}>luxury German marquees</Link>, and <Link href="/luxury-buses" style={{ color: '#191c20', fontWeight: 600, textDecoration: 'underline' }}>30–50 seater AC coaches</Link>.
                </p>
                <p >
                  Whether you are an IT professional in <Link href="/hitech-city" style={{ color: '#191c20', fontWeight: 600, textDecoration: 'underline' }}>HITEC City</Link> or <Link href="/gachibowli" style={{ color: '#191c20', fontWeight: 600, textDecoration: 'underline' }}>Gachibowli</Link> subscribing to a monthly automatic car, an NRI family landing at <Link href="/hyderabad-airport-car-rental" style={{ color: '#191c20', fontWeight: 600, textDecoration: 'underline' }}>RGIA Shamshabad Airport</Link>, or a family celebrating a grand wedding in <Link href="/banjara-hills" style={{ color: '#191c20', fontWeight: 600, textDecoration: 'underline' }}>Banjara Hills</Link> or <Link href="/jubilee-hills" style={{ color: '#191c20', fontWeight: 600, textDecoration: 'underline' }}>Jubilee Hills</Link>, DriveItCars guarantees 15–30 minute doorstep delivery, 10-minute WhatsApp KYC, and 24/7 roadside support.
                </p>
                <div className="about-page-call">
                  <div className="page-call-icon">
                    <i className="fa fa-phone" />
                  </div>
                  <div className="call-info">
                    <p>We Are Here to Help 24/7</p>
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
                  alt="DriveItCars self drive and luxury car rental fleet in Hyderabad"
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
                <h2>Explore Hyderabad &amp; Beyond with <span>DriveItCars</span></h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="about-promo-image">
                <img
                  loading="lazy"
                  src="/assets/img/cars.png"
                  alt="DriveItCars SUV, sedan, and hatchback lineup in Hyderabad"
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
