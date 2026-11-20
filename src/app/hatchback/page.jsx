import Link from 'next/link';
import FaqSection from '@/components/FaqSection';
import SeoSchema, {
  buildCarRentalSchema,
  buildFaqSchema,
  buildBreadcrumbSchema,
} from '@/components/SeoSchema';

export const metadata = {
  title: 'Hatchback Car Rental Hyderabad | Swift | DriveItCars',
  description:
    'Rent fuel-efficient self drive hatchbacks in Hyderabad with DriveItCars. Manual & automatic Maruti Swift, Baleno, Hyundai i20, Fronx & Tata Punch.',
  keywords:
    'hatchback car rental hyderabad, self drive hatchback hyderabad, rent maruti swift hyderabad, rent baleno hyderabad, automatic hatchback rental hyderabad, driveitcars',
  alternates: {
    canonical: 'https://www.driveitcars.in/hatchback',
  },
  openGraph: {
    title: 'Hatchback Car Rental Hyderabad | Swift | DriveItCars',
    description:
      'Rent manual & automatic self drive hatchbacks in Hyderabad. Maruti Swift, Baleno, Hyundai i20, Fronx & Tata Punch with 300 km/day & doorstep delivery.',
    url: 'https://www.driveitcars.in/hatchback',
    siteName: 'DriveItCars',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://www.driveitcars.in/assets/img/cars/Baleno.webp',
        width: 1200,
        height: 630,
        alt: 'Hatchback Car Rental in Hyderabad — DriveItCars',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hatchback Car Rental Hyderabad | Swift | DriveItCars',
    description:
      'Book Maruti Swift, Baleno, i20, Fronx & Tata Punch self drive hatchbacks in Hyderabad with DriveItCars.',
    images: ['https://www.driveitcars.in/assets/img/cars/Baleno.webp'],
  },
};

const HATCHBACK_CARS = [
  {
    name: 'Maruti Suzuki Baleno',
    image: '/assets/img/cars/Baleno.webp',
    alt: 'Maruti Suzuki Baleno self drive hatchback rental in Hyderabad - DriveItCars',
    kmPerDay: '300/day',
    extraKm: '₹9/km',
    extraHr: '₹300/hr',
    transmission: 'Manual & Automatic (AMT)',
  },
  {
    name: 'Hyundai i20',
    image: '/assets/img/cars/i20.webp',
    alt: 'Hyundai i20 automatic and manual self drive car rental in Hyderabad - DriveItCars',
    kmPerDay: '300/day',
    extraKm: '₹9/km',
    extraHr: '₹300/hr',
    transmission: 'Manual & IVT Automatic',
  },
  {
    name: 'Maruti Suzuki Fronx',
    image: '/assets/img/cars/Fronx.webp',
    alt: 'Maruti Suzuki Fronx crossover hatchback rental in Hyderabad - DriveItCars',
    kmPerDay: '300/day',
    extraKm: '₹9/km',
    extraHr: '₹300/hr',
    transmission: 'Manual & Automatic',
  },
  {
    name: 'Tata Altroz',
    image: '/assets/img/cars/Altroz.webp',
    alt: 'Tata Altroz 5-star safety hatchback rental in Hyderabad - DriveItCars',
    kmPerDay: '300/day',
    extraKm: '₹10/km',
    extraHr: '₹300/hr',
    transmission: 'Manual & DCA Automatic',
  },
  {
    name: 'Volkswagen Polo',
    image: '/assets/img/cars/polo.webp',
    alt: 'Volkswagen Polo hatchback self drive car in Hyderabad - DriveItCars',
    kmPerDay: '300/day',
    extraKm: '₹9/km',
    extraHr: '₹300/hr',
    transmission: 'Manual & TSI Automatic',
  },
  {
    name: 'Hyundai Grand i10 Nios Asta',
    image: '/assets/img/cars/asta.webp',
    alt: 'Hyundai i10 Asta compact hatchback rental in Hyderabad - DriveItCars',
    kmPerDay: '300/day',
    extraKm: '₹9/km',
    extraHr: '₹300/hr',
    transmission: 'Manual & AMT Automatic',
  },
  {
    name: 'Tata Punch',
    image: '/assets/img/cars/Tata-Punch.webp',
    alt: 'Tata Punch micro-SUV hatchback rental in Hyderabad - DriveItCars',
    kmPerDay: '300/day',
    extraKm: '₹9/km',
    extraHr: '₹300/hr',
    transmission: 'Manual & AMT Automatic',
  },
  {
    name: 'Maruti Suzuki Swift',
    image: '/assets/img/suzuki.webp',
    alt: 'Maruti Suzuki Swift self drive hatchback rental in Hyderabad - DriveItCars',
    kmPerDay: '300/day',
    extraKm: '₹9/km',
    extraHr: '₹300/hr',
    transmission: 'Manual & AMT Automatic',
  },
];

const HATCHBACK_FAQS = [
  {
    question: 'Which self drive hatchbacks are available for rent in Hyderabad with DriveItCars?',
    answer:
      'DriveItCars offers Hyderabad’s widest hatchback fleet including Maruti Suzuki Swift, Maruti Suzuki Baleno, Maruti Fronx, Hyundai i20, Hyundai Grand i10 Nios Asta, Tata Punch, Tata Altroz, and Volkswagen Polo in both manual and automatic transmissions.',
  },
  {
    question: 'Do you provide automatic transmission hatchbacks for Hyderabad IT traffic?',
    answer:
      'Yes! Automatic hatchbacks (Maruti Swift AMT, Baleno AMT, Hyundai i20 IVT, Tata Punch AMT, and Maruti Fronx Auto) are our most requested cars for effortless bumper-to-bumper driving across HITEC City, Gachibowli, Madhapur, and Banjara Hills.',
  },
  {
    question: 'What is the daily kilometer limit on hatchback car rentals?',
    answer:
      'Every 24-hour hatchback rental with DriveItCars includes a generous 300 km/day allowance. Extra kilometers are billed transparently at ₹9/km to ₹10/km, with discounted 7-day weekly and 30-day monthly subscription plans available.',
  },
  {
    question: 'Can I take a rental hatchback outside Hyderabad on highway trips?',
    answer:
      'Yes, all DriveItCars hatchbacks carry valid permits and active FASTag, making models like the 5-star safety-rated Tata Altroz, Tata Punch, Hyundai i20, and Maruti Baleno great choices for weekend highway trips to Srisailam, Warangal, or Bidar.',
  },
];

export default function HatchbackPage() {
  const rentalSchema = buildCarRentalSchema({
    name: 'DriveItCars — Hatchback Self Drive Car Rental Hyderabad',
    description:
      'Rent manual and automatic self drive hatchbacks in Hyderabad with DriveItCars. Maruti Swift, Baleno, Hyundai i20, Fronx, Tata Punch & Altroz with doorstep delivery.',
    url: 'https://www.driveitcars.in/hatchback',
    priceRange: '₹1499 - ₹2800',
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Self Drive Cars', url: '/self-drive-car' },
    { name: 'Hatchback Car Rental Hyderabad', url: '/hatchback' },
  ]);

  const faqSchema = buildFaqSchema(HATCHBACK_FAQS);

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
                <h1 className="breadcromb-title">Self Drive Hatchback Car Rental in Hyderabad</h1>
                <ul>
                  <li><i className="fa fa-home" /></li>
                  <li><Link href="/">Home</Link></li>
                  <li><i className="fa fa-angle-right" /></li>
                  <li><Link href="/self-drive-car">Self Drive Cars</Link></li>
                  <li><i className="fa fa-angle-right" /></li>
                  <li>Hatchback Cars</li>
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
                  MANUAL &amp; AUTOMATIC HATCHBACKS • 300 KM/DAY INCLUDED
                </span>
                <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#191c20', marginBottom: '14px' }}>
                  Fuel-Efficient &amp; Easy-to-Park Hatchback Rentals by DriveItCars
                </h2>
                <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#60656d', marginBottom: '14px', textAlign: 'justify' }}>
                  Navigating Hyderabad’s IT corridors, shopping avenues, and busy residential lanes is effortless when you rent a compact hatchback from <strong>DriveItCars</strong>. Our self-drive hatchback fleet features India’s highest-mileage and highest-safety models—including the <strong>Maruti Suzuki Swift, Maruti Baleno, Maruti Fronx, Hyundai i20, Grand i10 Nios Asta, Tata Punch, Tata Altroz, and Volkswagen Polo</strong>—available in both manual and clutch-free automatic transmissions.
                </p>
                <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#60656d', marginBottom: '18px', textAlign: 'justify' }}>
                  Every DriveItCars hatchback booking comes with <strong>300 km/day included</strong>, comprehensive insurance, FASTag readiness, 10-minute digital KYC verification, and 15 to 30-minute doorstep delivery across <Link href="/hitech-city" style={{ color: '#191c20', fontWeight: 600, textDecoration: 'underline' }}>HITEC City</Link>, <Link href="/gachibowli" style={{ color: '#191c20', fontWeight: 600, textDecoration: 'underline' }}>Gachibowli</Link>, <Link href="/madhapur" style={{ color: '#191c20', fontWeight: 600, textDecoration: 'underline' }}>Madhapur</Link>, <Link href="/kukatpally" style={{ color: '#191c20', fontWeight: 600, textDecoration: 'underline' }}>Kukatpally</Link>, <Link href="/banjara-hills" style={{ color: '#191c20', fontWeight: 600, textDecoration: 'underline' }}>Banjara Hills</Link>, <Link href="/masab-tank" style={{ color: '#191c20', fontWeight: 600, textDecoration: 'underline' }}>Masab Tank</Link>, and <Link href="/hyderabad-airport-car-rental" style={{ color: '#191c20', fontWeight: 600, textDecoration: 'underline' }}>RGIA Shamshabad Airport</Link>.
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <Link href="/sedan" style={{ background: '#f5f6f7', color: '#191c20', padding: '7px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, border: '1px solid #cbd5e1' }}>
                    Compare Sedans
                  </Link>
                  <Link href="/suv5" style={{ background: '#f5f6f7', color: '#191c20', padding: '7px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, border: '1px solid #cbd5e1' }}>
                    5-Seater SUVs
                  </Link>
                  <Link href="/suv7" style={{ background: '#f5f6f7', color: '#191c20', padding: '7px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, border: '1px solid #cbd5e1' }}>
                    7-Seater SUVs
                  </Link>
                  <Link href="/weekly-self-drive-cars-hyderabad" style={{ background: '#f5f6f7', color: '#191c20', padding: '7px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, border: '1px solid #cbd5e1' }}>
                    Weekly Plans (Save 25%)
                  </Link>
                  <Link href="/monthly-self-drive-cars-hyderabad" style={{ background: '#191c20', color: '#ffb907', padding: '7px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 700 }}>
                    Monthly Subscriptions (Save 50%)
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
                <h2>Available Self Drive Hatchbacks in Hyderabad</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {HATCHBACK_CARS.map((car) => {
              const waText = encodeURIComponent(
                `Hi DriveItCars, I am contacting you to enquire about booking the ${car.name} hatchback in Hyderabad. Please share availability and rates.`
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
        items={HATCHBACK_FAQS}
        title="Frequently Asked Questions — Hatchback Car Rental Hyderabad"
        subtitle="Everything you need to know about renting manual & automatic hatchbacks with DriveItCars"
      />
    </>
  );
}
