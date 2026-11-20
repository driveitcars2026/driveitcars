import Link from 'next/link';
import FaqSection from '@/components/FaqSection';
import SeoSchema, {
  buildCarRentalSchema,
  buildFaqSchema,
  buildBreadcrumbSchema,
} from '@/components/SeoSchema';

export const metadata = {
  title: '5-Seater SUV Rental Hyderabad | Creta, Thar | DriveItCars',
  description:
    'Rent 5-seater self drive SUVs in Hyderabad with DriveItCars. Book Hyundai Creta, Mahindra Thar 4x4, Kia Seltos, Maruti Brezza, Tata Nexon, Venue & Harrier.',
  keywords:
    '5 seater suv rental hyderabad, self drive suv hyderabad, rent hyundai creta hyderabad, rent mahindra thar hyderabad, kia seltos rental hyderabad, maruti brezza self drive hyderabad, driveitcars',
  alternates: {
    canonical: 'https://www.driveitcars.in/suv5',
  },
  openGraph: {
    title: '5-Seater SUV Rental Hyderabad | Creta, Thar | DriveItCars',
    description:
      'Book 5-seater self drive SUVs in Hyderabad. Hyundai Creta, Mahindra Thar 4x4, Kia Seltos, Maruti Brezza, Tata Nexon & Harrier with doorstep delivery.',
    url: 'https://www.driveitcars.in/suv5',
    siteName: 'DriveItCars',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://www.driveitcars.in/assets/img/cars/5-Thar.webp',
        width: 1200,
        height: 630,
        alt: '5-Seater SUV Rental in Hyderabad — DriveItCars',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '5-Seater SUV Rental Hyderabad | Creta, Thar | DriveItCars',
    description:
      'Rent Hyundai Creta, Mahindra Thar 4x4, Kia Seltos, Brezza & Nexon 5-seater SUVs in Hyderabad with DriveItCars.',
    images: ['https://www.driveitcars.in/assets/img/cars/5-Thar.webp'],
  },
};

const SUV5_CARS = [
  {
    name: 'Maruti Suzuki Brezza',
    image: '/assets/img/cars/5-Brezza.webp',
    alt: 'Maruti Suzuki Brezza 5-seater SUV rental in Hyderabad - DriveItCars',
    kmPerDay: '300/day',
    extraKm: '₹11/km',
    extraHr: '₹500/hr',
  },
  {
    name: 'Mahindra Thar 4x4',
    image: '/assets/img/cars/5-Thar.webp',
    alt: 'Mahindra Thar 4x4 self drive SUV rental in Hyderabad - DriveItCars',
    kmPerDay: '300/day',
    extraKm: '₹11/km',
    extraHr: '₹500/hr',
  },
  {
    name: 'Hyundai Creta',
    image: '/assets/img/2023-6.webp',
    alt: 'Hyundai Creta panoramic sunroof SUV rental in Hyderabad - DriveItCars',
    kmPerDay: '300/day',
    extraKm: '₹11/km',
    extraHr: '₹500/hr',
  },
  {
    name: 'Kia Seltos',
    image: '/assets/img/cars/5-Seltos.webp',
    alt: 'Kia Seltos automatic and manual 5-seater SUV rental in Hyderabad - DriveItCars',
    kmPerDay: '300/day',
    extraKm: '₹11/km',
    extraHr: '₹500/hr',
  },
  {
    name: 'Hyundai Venue',
    image: '/assets/img/cars/5-Venue.webp',
    alt: 'Hyundai Venue compact 5-seater SUV rental in Hyderabad - DriveItCars',
    kmPerDay: '300/day',
    extraKm: '₹11/km',
    extraHr: '₹500/hr',
  },
  {
    name: 'Tata Harrier',
    image: '/assets/img/cars/5-Harrier.webp',
    alt: 'Tata Harrier diesel 5-seater SUV rental in Hyderabad - DriveItCars',
    kmPerDay: '300/day',
    extraKm: '₹11/km',
    extraHr: '₹500/hr',
  },
  {
    name: 'Kia Sonet',
    image: '/assets/img/2023-4.webp',
    alt: 'Kia Sonet compact 5-seater SUV rental in Hyderabad - DriveItCars',
    kmPerDay: '300/day',
    extraKm: '₹11/km',
    extraHr: '₹500/hr',
  },
  {
    name: 'Hyundai Exter',
    image: '/assets/img/cars/5-Exter.webp',
    alt: 'Hyundai Exter sunroof micro-SUV rental in Hyderabad - DriveItCars',
    kmPerDay: '300/day',
    extraKm: '₹11/km',
    extraHr: '₹500/hr',
  },
  {
    name: 'Tata Nexon',
    image: '/assets/img/cars/5-NEXON.webp',
    alt: 'Tata Nexon 5-star safety SUV rental in Hyderabad - DriveItCars',
    kmPerDay: '300/day',
    extraKm: '₹11/km',
    extraHr: '₹500/hr',
  },
];

const SUV5_FAQS = [
  {
    question: 'Which 5-seater self drive SUVs are most popular in Hyderabad with DriveItCars?',
    answer:
      'Our top-booked 5-seater SUVs in Hyderabad are the Hyundai Creta (manual & automatic with panoramic sunroof), Mahindra Thar 4x4 Hard-Top, Kia Seltos, Maruti Suzuki Brezza, Tata Harrier, Tata Nexon, Kia Sonet, Hyundai Venue, and Hyundai Exter.',
  },
  {
    question: 'Can I rent a Mahindra Thar 4x4 or Hyundai Creta for weekend road trips from Hyderabad?',
    answer:
      'Yes! Both Mahindra Thar 4x4 (Diesel/Petrol Automatic & Manual) and Hyundai Creta are hugely popular for weekend drives to Ananthagiri Hills, Srisailam Dam, Nagarjuna Sagar, Gandikota, and Hampi.',
  },
  {
    question: 'What is included in the daily 5-seater SUV rental tariff?',
    answer:
      'Every 24-hour 5-seater SUV rental includes 300 km/day, comprehensive motor insurance, 24/7 roadside support, and FASTag readiness. Extra kilometers beyond 300 km/day are billed at ₹11/km.',
  },
  {
    question: 'Do you deliver 5-seater SUVs to HITEC City, Gachibowli, and RGIA Airport?',
    answer:
      'Yes, DriveItCars provides 15 to 30-minute doorstep SUV delivery across HITEC City, Gachibowli, Madhapur, Kondapur, Banjara Hills, Jubilee Hills, Secunderabad, and 24/7 RGIA Shamshabad Airport.',
  },
];

export default function Suv5Page() {
  const rentalSchema = buildCarRentalSchema({
    name: 'DriveItCars — 5-Seater SUV Self Drive Car Rental Hyderabad',
    description:
      'Rent 5-seater self drive SUVs in Hyderabad with DriveItCars. Hyundai Creta, Mahindra Thar 4x4, Kia Seltos, Maruti Brezza, Tata Harrier, Nexon & Venue.',
    url: 'https://www.driveitcars.in/suv5',
    priceRange: '₹2199 - ₹4500',
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Self Drive Cars', url: '/self-drive-car' },
    { name: '5-Seater SUV Rental Hyderabad', url: '/suv5' },
  ]);

  const faqSchema = buildFaqSchema(SUV5_FAQS);

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
                <h1 className="breadcromb-title">Self Drive 5-Seater SUV Rental in Hyderabad</h1>
                <ul>
                  <li><i className="fa fa-home" /></li>
                  <li><Link href="/">Home</Link></li>
                  <li><i className="fa fa-angle-right" /></li>
                  <li><Link href="/self-drive-car">Self Drive Cars</Link></li>
                  <li><i className="fa fa-angle-right" /></li>
                  <li>5-Seater SUVs</li>
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
                  ✦ HIGH GROUND CLEARANCE • SUNROOF &amp; 4x4 SUV FLEET
                </span>
                <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '14px' }}>
                  Command Every Highway &amp; City Corridor in a 5-Seater SUV from DriveItCars
                </h2>
                <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#4b5563', marginBottom: '14px', textAlign: 'justify' }}>
                  Whether you want the commanding road presence of a panoramic-sunroof <strong>Hyundai Creta</strong> or <strong>Kia Seltos</strong>, the off-road capability of a <strong>Mahindra Thar 4x4 Hard-Top</strong>, or the 5-star crash safety of a <strong>Tata Harrier</strong> and <strong>Tata Nexon</strong>, <strong>DriveItCars</strong> maintains Hyderabad’s largest self-drive 5-seater SUV fleet.
                </p>
                <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#4b5563', marginBottom: '18px', textAlign: 'justify' }}>
                  With 200mm+ ground clearance, ventilated seats on top trims, Apple CarPlay / Android Auto, and 300 km/day included, our 5-seater SUVs are engineered for both daily Cyberabad commutes and long outstation highway drives to Srisailam, Hampi, Goa, and Araku Valley.
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <Link href="/self-drive-suv-hyderabad" style={{ background: '#0f172a', color: '#ffb907', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 700 }}>
                    🚙 All Self Drive SUVs Hub
                  </Link>
                  <Link href="/suv7" style={{ background: '#f8fafc', color: '#0f172a', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 600, border: '1px solid #cbd5e1' }}>
                    🚐 7-Seater SUVs (Innova, Fortuner, XUV700)
                  </Link>
                  <Link href="/sedan" style={{ background: '#f8fafc', color: '#0f172a', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 600, border: '1px solid #cbd5e1' }}>
                    🚘 Sedans
                  </Link>
                  <Link href="/hatchback" style={{ background: '#f8fafc', color: '#0f172a', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 600, border: '1px solid #cbd5e1' }}>
                    🚗 Hatchbacks
                  </Link>
                  <Link href="/weekend-self-drive-cars-hyderabad" style={{ background: '#f8fafc', color: '#0f172a', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 600, border: '1px solid #cbd5e1' }}>
                    🌄 Weekend Road Trip Packages
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
                <h2>Available 5-Seater Self Drive SUVs in Hyderabad</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {SUV5_CARS.map((car) => {
              const waText = encodeURIComponent(
                `Hi DriveItCars, I am contacting you to enquire about booking the ${car.name} 5-seater SUV in Hyderabad. Please share availability and rates.`
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
        items={SUV5_FAQS}
        title="Frequently Asked Questions — 5-Seater SUV Rental Hyderabad"
        subtitle="Everything you need to know about renting Creta, Thar 4x4, Seltos & Brezza SUVs with DriveItCars"
      />
    </>
  );
}
