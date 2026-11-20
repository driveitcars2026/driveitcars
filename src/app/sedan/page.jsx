import Link from 'next/link';
import FaqSection from '@/components/FaqSection';
import SeoSchema, {
  buildCarRentalSchema,
  buildFaqSchema,
  buildBreadcrumbSchema,
} from '@/components/SeoSchema';

export const metadata = {
  title: 'Sedan Car Rental Hyderabad | Verna, City | DriveItCars',
  description:
    'Book self drive sedan cars in Hyderabad with DriveItCars. Rent Hyundai Verna, Honda City, Skoda Slavia, VW Virtus, Maruti Dzire & Ciaz with doorstep delivery.',
  keywords:
    'sedan car rental hyderabad, self drive sedan hyderabad, rent hyundai verna hyderabad, rent honda city hyderabad, skoda slavia rental hyderabad, vw virtus rental hyderabad, driveitcars',
  alternates: {
    canonical: 'https://www.driveitcars.in/sedan',
  },
  openGraph: {
    title: 'Sedan Car Rental Hyderabad | Verna, City | DriveItCars',
    description:
      'Rent executive & compact self drive sedans in Hyderabad. Hyundai Verna, Honda City, Skoda Slavia, VW Virtus, Maruti Dzire & Ciaz with 300 km/day.',
    url: 'https://www.driveitcars.in/sedan',
    siteName: 'DriveItCars',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://www.driveitcars.in/assets/img/cars/seden-Verna.webp',
        width: 1200,
        height: 630,
        alt: 'Sedan Car Rental in Hyderabad — DriveItCars',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sedan Car Rental Hyderabad | Verna, City | DriveItCars',
    description:
      'Rent Hyundai Verna, Honda City, Skoda Slavia, VW Virtus & Maruti Dzire sedans in Hyderabad with DriveItCars.',
    images: ['https://www.driveitcars.in/assets/img/cars/seden-Verna.webp'],
  },
};

const SEDAN_CARS = [
  {
    name: 'Maruti Suzuki Dzire',
    image: '/assets/img/cars/seden-dzire.webp',
    alt: 'Maruti Suzuki Dzire self drive sedan rental in Hyderabad - DriveItCars',
    kmPerDay: '300/day',
    extraKm: '₹10/km',
    extraHr: '₹400/hr',
  },
  {
    name: 'Hyundai Aura',
    image: '/assets/img/cars/seden-AURA.webp',
    alt: 'Hyundai Aura compact sedan rental in Hyderabad - DriveItCars',
    kmPerDay: '300/day',
    extraKm: '₹10/km',
    extraHr: '₹400/hr',
  },
  {
    name: 'Honda City',
    image: '/assets/img/cars/seden-City.webp',
    alt: 'Honda City executive self drive sedan rental in Hyderabad - DriveItCars',
    kmPerDay: '300/day',
    extraKm: '₹10/km',
    extraHr: '₹400/hr',
  },
  {
    name: 'Hyundai Verna',
    image: '/assets/img/cars/seden-Verna.webp',
    alt: 'Hyundai Verna automatic and manual sedan rental in Hyderabad - DriveItCars',
    kmPerDay: '300/day',
    extraKm: '₹10/km',
    extraHr: '₹400/hr',
  },
  {
    name: 'Maruti Suzuki Ciaz',
    image: '/assets/img/cars/seden-Ciaz.webp',
    alt: 'Maruti Suzuki Ciaz spacious sedan rental in Hyderabad - DriveItCars',
    kmPerDay: '300/day',
    extraKm: '₹10/km',
    extraHr: '₹400/hr',
  },
  {
    name: 'Skoda Slavia Automatic',
    image: '/assets/img/cars/Skoda-Slavia-Studio.jpg',
    alt: 'Skoda Slavia automatic sedan rental in Hyderabad - DriveItCars',
    kmPerDay: '300/day',
    extraKm: '₹12/km',
    extraHr: '₹450/hr',
  },
  {
    name: 'Volkswagen Virtus GT',
    image: '/assets/img/cars/VW-Virtus-Studio.jpg',
    alt: 'Volkswagen Virtus GT automatic and manual sedan rental in Hyderabad - DriveItCars',
    kmPerDay: '300/day',
    extraKm: '₹12/km',
    extraHr: '₹450/hr',
  },
];

const SEDAN_FAQS = [
  {
    question: 'Which self drive sedans can I rent in Hyderabad with DriveItCars?',
    answer:
      'DriveItCars offers executive and compact self drive sedans in Hyderabad including Hyundai Verna, Honda City, Skoda Slavia Automatic, Volkswagen Virtus GT, Maruti Suzuki Ciaz, Maruti Suzuki Dzire, and Hyundai Aura.',
  },
  {
    question: 'Are Skoda Slavia, VW Virtus, and Honda City available in automatic transmission?',
    answer:
      'Yes! We maintain automatic transmission variants across Skoda Slavia (Torque Converter/DSG), Volkswagen Virtus GT (DSG), Honda City (CVT), Hyundai Verna (IVT/DCT), and Maruti Dzire (AMT) for smooth city and expressway driving.',
  },
  {
    question: 'Why choose a sedan rental for Hyderabad airport or outstation highway trips?',
    answer:
      'Sedans offer 500+ liters of enclosed boot space for large airport suitcases, superior high-speed aerodynamic stability on the Nehru Outer Ring Road (ORR), and plush rear-seat legroom for business meetings and family travel.',
  },
  {
    question: 'Can I book a sedan on a monthly corporate or personal subscription in Hyderabad?',
    answer:
      'Yes, executives and companies in HITEC City, Financial District, Gachibowli, and Banjara Hills can rent sedans on monthly subscriptions with up to 50% discount, zero maintenance costs, and GST-compliant billing.',
  },
];

export default function SedanPage() {
  const rentalSchema = buildCarRentalSchema({
    name: 'DriveItCars — Sedan Self Drive Car Rental Hyderabad',
    description:
      'Book executive and compact self drive sedans in Hyderabad with DriveItCars. Hyundai Verna, Honda City, Skoda Slavia, VW Virtus, Maruti Dzire & Ciaz.',
    url: 'https://www.driveitcars.in/sedan',
    priceRange: '₹1799 - ₹4000',
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Self Drive Cars', url: '/self-drive-car' },
    { name: 'Sedan Car Rental Hyderabad', url: '/sedan' },
  ]);

  const faqSchema = buildFaqSchema(SEDAN_FAQS);

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
                <h1 className="breadcromb-title">Self Drive Sedan Car Rental in Hyderabad</h1>
                <ul>
                  <li><i className="fa fa-home" /></li>
                  <li><Link href="/">Home</Link></li>
                  <li><i className="fa fa-angle-right" /></li>
                  <li><Link href="/self-drive-car">Self Drive Cars</Link></li>
                  <li><i className="fa fa-angle-right" /></li>
                  <li>Sedan Cars</li>
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
                <span
                  style={{
                    background: 'rgba(255, 185, 7, 0.15)',
                    color: '#d49500',
                    fontWeight: 700,
                    fontSize: '12px',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    display: 'inline-block',
                    marginBottom: '12px',
                  }}
                >
                  ✦ EXECUTIVE &amp; COMPACT SEDANS • MANUAL &amp; AUTOMATIC
                </span>
                <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '14px' }}>
                  Premium Comfort &amp; Highway Refinement with DriveItCars Sedans
                </h2>
                <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#4b5563', marginBottom: '14px', textAlign: 'justify' }}>
                  Experience executive cabin comfort, deep 500-liter luggage boots, and planted highway stability with <strong>DriveItCars sedan rentals in Hyderabad</strong>. Whether you are welcoming corporate delegates at <Link href="/hyderabad-airport-car-rental" style={{ color: '#d49500', fontWeight: 700 }}>Rajiv Gandhi International Airport (RGIA)</Link>, driving to boardroom meetings in <Link href="/gachibowli" style={{ color: '#d49500', fontWeight: 700 }}>Financial District</Link> and <Link href="/hitech-city" style={{ color: '#d49500', fontWeight: 700 }}>HITEC City</Link>, or cruising down NH-44 and NH-65 with family, our sedan lineup delivers unmatched sophistication.
                </p>
                <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#4b5563', marginBottom: '18px', textAlign: 'justify' }}>
                  Choose from fuel-efficient compact sedans like the <strong>Maruti Suzuki Dzire</strong> and <strong>Hyundai Aura</strong>, or step up to full-size executive sedans including the <strong>Hyundai Verna, Honda City, Maruti Suzuki Ciaz, Skoda Slavia Automatic, and 5-star Global NCAP rated Volkswagen Virtus GT</strong>.
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <Link href="/hatchback" style={{ background: '#f8fafc', color: '#0f172a', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 600, border: '1px solid #cbd5e1' }}>
                    🚗 Compare Hatchbacks
                  </Link>
                  <Link href="/suv5" style={{ background: '#f8fafc', color: '#0f172a', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 600, border: '1px solid #cbd5e1' }}>
                    🚙 5-Seater SUVs
                  </Link>
                  <Link href="/suv7" style={{ background: '#f8fafc', color: '#0f172a', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 600, border: '1px solid #cbd5e1' }}>
                    🚐 7-Seater SUVs
                  </Link>
                  <Link href="/luxurycars" style={{ background: '#0f172a', color: '#ffb907', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 700 }}>
                    ✨ Luxury BMW, Audi &amp; Mercedes
                  </Link>
                  <Link href="/corporate-car-rental-hyderabad" style={{ background: '#f8fafc', color: '#0f172a', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 600, border: '1px solid #cbd5e1' }}>
                    🏢 Corporate Car Rental
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
                <h2>Available Self Drive Sedans in Hyderabad</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {SEDAN_CARS.map((car) => {
              const waText = encodeURIComponent(
                `Hi DriveItCars, I am contacting you to enquire about booking the ${car.name} sedan in Hyderabad. Please share availability and rates.`
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
        items={SEDAN_FAQS}
        title="Frequently Asked Questions — Sedan Car Rental Hyderabad"
        subtitle="Everything you need to know about renting self drive & executive sedans with DriveItCars"
      />
    </>
  );
}
