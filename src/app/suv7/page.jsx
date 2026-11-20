import Link from 'next/link';
import FaqSection from '@/components/FaqSection';
import SeoSchema, {
  buildCarRentalSchema,
  buildFaqSchema,
  buildBreadcrumbSchema,
} from '@/components/SeoSchema';

export const metadata = {
  title: '7 Seater Car Rental Hyderabad | Innova Crysta | DriveItCars',
  description:
    'Rent 7-seater self drive SUVs & MPVs in Hyderabad with DriveItCars. Book Toyota Innova Crysta, Hycross, Fortuner, XUV700, Kia Carens, Carnival & Ertiga.',
  keywords:
    '7 seater car rental hyderabad, 7 seater suv rental hyderabad, innova crysta self drive hyderabad, toyota fortuner self drive hyderabad, mahindra xuv700 rental hyderabad, maruti ertiga self drive hyderabad, driveitcars',
  alternates: {
    canonical: 'https://www.driveitcars.in/suv7',
  },
  openGraph: {
    title: '7-Seater SUV Rental Hyderabad | Innova | DriveItCars',
    description:
      'Rent 7-seater self drive SUVs & family MPVs in Hyderabad. Innova Crysta, Innova Hycross, Fortuner, XUV700, Kia Carnival, Carens & Ertiga.',
    url: 'https://www.driveitcars.in/suv7',
    siteName: 'DriveItCars',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://www.driveitcars.in/assets/img/cars/Innova-Hycross-Studio.jpg',
        width: 1200,
        height: 630,
        alt: '7-Seater SUV & MPV Rental in Hyderabad — DriveItCars',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '7-Seater SUV Rental Hyderabad | Innova | DriveItCars',
    description:
      'Book Toyota Innova Crysta, Hycross, Fortuner, Mahindra XUV700 & Maruti Ertiga 7-seater SUVs in Hyderabad with DriveItCars.',
    images: ['https://www.driveitcars.in/assets/img/cars/Innova-Hycross-Studio.jpg'],
  },
};

const SUV7_CARS = [
  {
    name: 'Mahindra XUV700',
    image: '/assets/img/cars/7-XUV700.webp',
    alt: 'Mahindra XUV700 7-seater sunroof SUV rental in Hyderabad - DriveItCars',
    kmPerDay: '300/day',
    extraKm: '₹13/km',
    extraHr: '₹650/hr',
  },
  {
    name: 'Toyota Innova Crysta',
    image: '/assets/img/cars/7-Innova%20Crysta.webp',
    alt: 'Toyota Innova Crysta 7-seater MPV rental in Hyderabad - DriveItCars',
    kmPerDay: '300/day',
    extraKm: '₹13/km',
    extraHr: '₹650/hr',
  },
  {
    name: 'Toyota Innova Hycross Automatic',
    image: '/assets/img/cars/Innova-Hycross-Studio.jpg',
    alt: 'Toyota Innova Hycross hybrid automatic 7-seater rental in Hyderabad - DriveItCars',
    kmPerDay: '300/day',
    extraKm: '₹15/km',
    extraHr: '₹800/hr',
  },
  {
    name: 'Toyota Fortuner',
    image: '/assets/img/cars/7-Fortuner.webp',
    alt: 'Toyota Fortuner 7-seater luxury SUV rental in Hyderabad - DriveItCars',
    kmPerDay: '300/day',
    extraKm: '₹15/km',
    extraHr: '₹900/hr',
  },
  {
    name: 'Ford Endeavour',
    image: '/assets/img/cars/7-FordEndeavour.webp',
    alt: 'Ford Endeavour automatic 7-seater SUV rental in Hyderabad - DriveItCars',
    kmPerDay: '300/day',
    extraKm: '₹14/km',
    extraHr: '₹800/hr',
  },
  {
    name: 'Kia Carnival',
    image: '/assets/img/cars/7-KiaCarnival.webp',
    alt: 'Kia Carnival luxury 7-seater MPV rental in Hyderabad - DriveItCars',
    kmPerDay: '300/day',
    extraKm: '₹15/km',
    extraHr: '₹900/hr',
  },
  {
    name: 'Kia Carens',
    image: '/assets/img/cars/7-Kia%20Carens.webp',
    alt: 'Kia Carens 7-seater family MPV rental in Hyderabad - DriveItCars',
    kmPerDay: '300/day',
    extraKm: '₹13/km',
    extraHr: '₹500/hr',
  },
  {
    name: 'Maruti Suzuki Ertiga',
    image: '/assets/img/cars/7-Ertiga.webp',
    alt: 'Maruti Suzuki Ertiga 7-seater MPV rental in Hyderabad - DriveItCars',
    kmPerDay: '300/day',
    extraKm: '₹12/km',
    extraHr: '₹500/hr',
  },
  {
    name: 'Maruti Suzuki XL6 (6-Seater Captain Chairs)',
    image: '/assets/img/cars/XL6-Studio.jpg',
    alt: 'Maruti Suzuki XL6 6-seater captain chairs MPV rental in Hyderabad - DriveItCars',
    kmPerDay: '300/day',
    extraKm: '₹12/km',
    extraHr: '₹500/hr',
  },
  {
    name: 'Jeep Compass',
    image: '/assets/img/cars/7-Compass.webp',
    alt: 'Jeep Compass premium SUV rental in Hyderabad - DriveItCars',
    kmPerDay: '300/day',
    extraKm: '₹13/km',
    extraHr: '₹650/hr',
  },
  {
    name: 'Maruti Suzuki Grand Vitara',
    image: '/assets/img/cars/7-Grand%20Vitara.webp',
    alt: 'Maruti Suzuki Grand Vitara SUV rental in Hyderabad - DriveItCars',
    kmPerDay: '300/day',
    extraKm: '₹13/km',
    extraHr: '₹650/hr',
  },
];

const SUV7_FAQS = [
  {
    question: 'Which 7-seater cars and SUVs can I rent in Hyderabad with DriveItCars?',
    answer:
      'DriveItCars offers Toyota Innova Crysta, Toyota Innova Hycross Hybrid Automatic, Toyota Fortuner, Mahindra XUV700, Ford Endeavour, Kia Carnival, Kia Carens, Maruti Suzuki Ertiga, and Maruti Suzuki XL6 (6-seater captain seats) for self-drive and chauffeur hire.',
  },
  {
    question: 'Are 7-seater SUVs ideal for Tirupati, Srisailam, and Shirdi family pilgrimages?',
    answer:
      'Yes! Toyota Innova Crysta, Innova Hycross, Mahindra XUV700, and Maruti Ertiga are Hyderabad’s most trusted family highway cruisers, featuring dedicated third-row AC vents, reclining seats, and active FASTag for quick toll crossings.',
  },
  {
    question: 'Can I book a 7-seater SUV for Hyderabad Airport (RGIA) family pickup?',
    answer:
      'Absolutely. NRI families and international travelers landing at RGIA Shamshabad with 4 to 6 large suitcases frequently book our Innova Crysta, Innova Hycross, Kia Carnival, or Fortuner with direct terminal car-park handover.',
  },
  {
    question: 'Do you offer both self-drive and chauffeur-driven 7-seater Innova rentals?',
    answer:
      'Yes, all our 7-seater MPVs and SUVs can be booked as 100% private self-drive rentals or with a verified, uniformed chauffeur for weddings, corporate delegations, and outstation tours.',
  },
];

export default function Suv7Page() {
  const rentalSchema = buildCarRentalSchema({
    name: 'DriveItCars — 7-Seater SUV & Innova Car Rental Hyderabad',
    description:
      'Rent 7-seater self drive SUVs and MPVs in Hyderabad with DriveItCars. Toyota Innova Crysta, Innova Hycross, Fortuner, Mahindra XUV700, Kia Carnival, Carens & Ertiga.',
    url: 'https://www.driveitcars.in/suv7',
    priceRange: '₹2499 - ₹8500',
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Self Drive Cars', url: '/self-drive-car' },
    { name: '7-Seater SUV Rental Hyderabad', url: '/suv7' },
  ]);

  const faqSchema = buildFaqSchema(SUV7_FAQS);

  return (
    <>
      <SeoSchema schema={rentalSchema} />
      <SeoSchema schema={breadcrumbSchema} />
      <SeoSchema schema={faqSchema} />

      {/* Breadcrumb Area Start */}
      <section className="gauto-breadcromb-area section_70">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="breadcromb-box">
                <h1 className="breadcromb-title">Self Drive 7-Seater SUV &amp; MPV Rental in Hyderabad</h1>
                <ul>
                  <li><i className="fa fa-home" /></li>
                  <li><Link href="/">Home</Link></li>
                  <li><i className="fa fa-angle-right" /></li>
                  <li><Link href="/self-drive-car">Self Drive Cars</Link></li>
                  <li><i className="fa fa-angle-right" /></li>
                  <li>7-Seater SUVs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Breadcrumb Area End */}

      {/* Intro SEO Copy Start */}
      <section className="about-page-area section_70" style={{ paddingBottom: '20px' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="about-page-left">
                <span className="editorial-eyebrow">
                  6 &amp; 7-SEATER FAMILY SUVs • CAPTAIN CHAIRS &amp; BENCH SEATING
                </span>
                <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#191c20', marginBottom: '14px' }}>
                  Travel Together in First-Class Comfort with DriveItCars 7-Seater SUVs
                </h2>
                <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#60656d', marginBottom: '14px', textAlign: 'justify' }}>
                  Planning an extended family pilgrimage to Tirupati or Srisailam, welcoming NRI relatives at <Link href="/hyderabad-airport-car-rental" style={{ color: '#191c20', fontWeight: 600, textDecoration: 'underline' }}>RGIA Shamshabad Airport</Link>, or heading out on a corporate team retreat? <strong>DriveItCars</strong> offers Hyderabad’s most dependable 6-seater and 7-seater self-drive SUV and MPV fleet—led by the legendary <strong>Toyota Innova Crysta, Toyota Innova Hycross Hybrid Automatic, Toyota Fortuner, Mahindra XUV700, Kia Carnival, Kia Carens, Maruti Suzuki Ertiga, and Maruti XL6</strong>.
                </p>
                <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#60656d', marginBottom: '18px', textAlign: 'justify' }}>
                  Every 7-seater vehicle undergoes a 40-point pre-trip mechanical and AC inspection at our Masab Tank hub, includes <strong>300 km/day</strong>, and is delivered sanitized to your doorstep in <Link href="/hitech-city" style={{ color: '#191c20', fontWeight: 600, textDecoration: 'underline' }}>HITEC City</Link>, <Link href="/gachibowli" style={{ color: '#191c20', fontWeight: 600, textDecoration: 'underline' }}>Gachibowli</Link>, <Link href="/banjara-hills" style={{ color: '#191c20', fontWeight: 600, textDecoration: 'underline' }}>Banjara Hills</Link>, <Link href="/jubilee-hills" style={{ color: '#191c20', fontWeight: 600, textDecoration: 'underline' }}>Jubilee Hills</Link>, <Link href="/kukatpally" style={{ color: '#191c20', fontWeight: 600, textDecoration: 'underline' }}>Kukatpally</Link>, and <Link href="/secunderabad" style={{ color: '#191c20', fontWeight: 600, textDecoration: 'underline' }}>Secunderabad</Link>.
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <Link href="/self-drive-suv-hyderabad" style={{ background: '#191c20', color: '#ffb907', padding: '7px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 700 }}>
                    All Self Drive SUVs Hub
                  </Link>
                  <Link href="/suv5" style={{ background: '#f5f6f7', color: '#191c20', padding: '7px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, border: '1px solid #cbd5e1' }}>
                    5-Seater SUVs (Creta, Thar, Seltos)
                  </Link>
                  <Link href="/luxury-buses" style={{ background: '#f5f6f7', color: '#191c20', padding: '7px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, border: '1px solid #cbd5e1' }}>
                    Need 30–50 Seater Luxury Buses?
                  </Link>
                  <Link href="/hyderabad-airport-car-rental" style={{ background: '#f5f6f7', color: '#191c20', padding: '7px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, border: '1px solid #cbd5e1' }}>
                    RGIA Airport SUV Pickup
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Intro SEO Copy End */}

      {/* Offers Area Start */}
      <section className="gauto-offers-area section_70" id="self" style={{ paddingTop: '30px' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="site-heading">
                <h2>Available 7-Seater SUVs &amp; MPVs in Hyderabad</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {SUV7_CARS.map((car) => {
              const waText = encodeURIComponent(
                `Hi DriveItCars, I am contacting you to enquire about booking the ${car.name} in Hyderabad. Please share availability and rates.`
              );
              return (
                <div className="col-lg-4 col-md-6" key={car.name}>
                  <div className="single-offers">
                    <div className="offer-image">
                      <img loading="lazy" src={car.image} alt={car.alt} />
                    </div>
                    <div className="offer-text">
                      <h3>{car.name}</h3>
                      <ul>
                        <li><i className="fa fa-car" /> Km: {car.kmPerDay}</li>
                        <li><i className="fa fa-road" /> Extra Km: {car.extraKm}</li>
                        <li><i className="fa fa-clock-o" /> Extra Hr: {car.extraHr}</li>
                      </ul>
                      <div className="offer-action">
                        <a href="tel:+916300041186" className="offer-btn-1">
                          <i className="fa fa-phone" /> Enquire Now
                        </a>
                        <a
                          href={`https://api.whatsapp.com/send?phone=916300041186&text=${waText}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="offer-btn-2"
                        >
                          <i className="fa fa-whatsapp" /> WhatsApp Us
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Offers Area End */}

      <FaqSection
        items={SUV7_FAQS}
        title="Frequently Asked Questions — 7-Seater SUV Rental Hyderabad"
        subtitle="Everything you need to know about renting Innova Crysta, Hycross, Fortuner, XUV700 & Ertiga with DriveItCars"
      />
    </>
  );
}
