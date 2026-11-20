import { SERVICE_VEHICLE_IMAGES } from '@/data/service-vehicle-images';
import Link from 'next/link';
import FaqSection from '@/components/FaqSection';
import SeoSchema, {
  buildCarRentalSchema,
  buildFaqSchema,
  buildBreadcrumbSchema,
} from '@/components/SeoSchema';

export const metadata = {
  title: 'Hyderabad Airport Car Rental | RGIA 24/7 | DriveItCars',
  description:
    '24/7 Hyderabad airport car rental at RGIA Shamshabad. Self drive cars with refundable deposit, curbside terminal delivery in 10 mins & unlimited KMs. Call +91 63000 41186.',
  alternates: {
    canonical: 'https://www.driveitcars.in/hyderabad-airport-car-rental',
  },
  openGraph: {
    title: 'Hyderabad Airport Car Rental | Self Drive & Chauffeur Services | DriveItCars',
    description:
      'Book Hyderabad Airport car rental at Rajiv Gandhi International Airport (RGIA). Self drive cars, airport pickup & drop, luxury cars & SUVs with 24/7 terminal handover.',
    url: 'https://www.driveitcars.in/hyderabad-airport-car-rental',
    siteName: 'DriveItCars Hyderabad',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://www.driveitcars.in/assets/img/cars/5-Thar.webp',
        width: 1200,
        height: 630,
        alt: 'Hyderabad Airport Car Rental DriveItCars',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hyderabad Airport Car Rental | RGIA Shamshabad | DriveItCars',
    description:
      '24/7 HYD airport self drive, airport pickup/drop, luxury cars and SUV rentals with zero surge pricing.',
  },
};

const AIRPORT_FLEET_SELF_DRIVE = [
  {
    name: 'Hyundai Creta Automatic',
    category: 'Airport SUV',
    image: '/assets/img/2023-6.webp',
    rate: 'Tariff on Request',
    seats: '5 Seater',
    fuel: 'Petrol / Diesel',
    luggage: '3 Large Bags + 2 Small Bags',
    idealFor: 'IT executives heading to Gachibowli, couples, small families',
  },
  {
    name: 'Toyota Innova Crysta',
    category: 'Airport 7-Seater SUV',
    image: '/assets/img/crysta.webp',
    rate: 'Tariff on Request',
    seats: '7 Seater',
    fuel: 'Diesel',
    luggage: '4-5 Large International Bags',
    idealFor: 'NRI family arrivals, heavy luggage, outstation trips to Tirupati/Srisailam',
  },
  {
    name: 'Mahindra Thar 4x4',
    category: 'Adventure SUV',
    image: '/assets/img/cars/5-Thar.webp',
    rate: 'Tariff on Request',
    seats: '4-5 Seater',
    fuel: 'Diesel 4x4',
    luggage: '2 Large Bags',
    idealFor: 'Weekend explorers, solo business flyers, holiday road trips',
  },
  {
    name: 'Maruti Suzuki Dzire',
    category: 'Economy Sedan',
    image: '/assets/img/cars/Dzire.webp',
    rate: 'Tariff on Request',
    seats: '5 Seater',
    fuel: 'Petrol',
    luggage: '2 Large Bags + 1 Cabin Bag',
    idealFor: 'Budget business travel, city transit, quick business meetings',
  },
];

const AIRPORT_TRANSFERS = [
  {
    name: 'Airport Chauffeur Sedan (Dzire / Etios)',
    type: 'Airport Pickup & Drop',
    image: '/assets/img/cars/seden-dzire.webp',
    rate: 'Fixed Rate • No Surge',
    features: ['Punctual Chauffeur', 'Flight Delay Tracking', 'Luggage Loading', 'AC Sedan'],
    desc: 'Zero-stress airport transfer with meet-and-greet placard at RGIA arrivals.',
  },
  {
    name: 'Innova Crysta Executive Transfer',
    type: 'Airport Chauffeur Service',
    image: '/assets/img/cars/7-Innova Crysta.webp',
    rate: 'Fixed Rate • Premium MUV',
    features: ['Plush Captain Chairs', 'Huge Boot Space', 'Highway Expert Driver', 'FASTag Included'],
    desc: 'The gold standard for corporate delegations, NRI visitors, and family airport pickups.',
  },
  {
    name: 'Mercedes-Benz / BMW VIP Transfer',
    type: 'Airport Luxury Car Rental',
    image: SERVICE_VEHICLE_IMAGES.eclass,
    rate: 'VIP Chauffeur Package',
    features: ['Uniformed Chauffeur', 'Red Carpet Cleanliness', 'Bottled Water & Mints', 'VIP Terminal Access'],
    desc: 'For high-profile executives, celebrity arrivals, weddings, and foreign dignitaries.',
  },
];

const AIRPORT_FAQS = [
  {
    question: 'How does self drive car pickup work at Hyderabad Airport (RGIA Shamshabad)?',
    answer:
      'Our team meets you right outside the arrivals terminal at RGIA Shamshabad (Aero Plaza or designated Airport Car Park). After a quick 5-minute digital document verification and vehicle inspection, you receive the car keys and can immediately drive off via the Outer Ring Road (ORR) or PVNR Expressway.',
  },
  {
    question: 'How do airport pickup and airport drop services work in Hyderabad?',
    answer:
      'For airport pickup, our professional chauffeur monitors your flight landing time in real-time and waits at the arrival gate with a name placard. For airport drop, our chauffeur arrives at your doorstep in HITEC City, Gachibowli, Banjara Hills, or Secunderabad 15 minutes ahead of schedule with zero cancellation risk.',
  },
  {
    question: 'Can I rent a luxury car at Hyderabad Airport for VIP arrivals or weddings?',
    answer:
      'Yes! We provide airport luxury car rentals in Hyderabad featuring Mercedes-Benz, BMW, Audi, Range Rover Evoque, and Toyota Fortuner Legender. Available for self-drive or with a suited, professional executive chauffeur.',
  },
  {
    question: 'Which SUVs are best for airport rental in Hyderabad with large luggage?',
    answer:
      'For international flyers with 4 to 6 large suitcases, the Toyota Innova Crysta 7-seater and Toyota Fortuner are the top choices. For domestic travel with 2 to 3 suitcases, the Hyundai Creta, Mahindra XUV700, and Brezza provide ample luggage capacity.',
  },
  {
    question: 'What if my flight to Hyderabad is delayed?',
    answer:
      'We track your incoming flight number automatically. There are zero penalty fees for delayed flights; our team adjusts your vehicle handover or chauffeur pickup time to match your actual landing time.',
  },
  {
    question: 'Are there surge charges during late-night or early-morning airport transfers?',
    answer:
      'Unlike app-based aggregators, DriveItCars provides 100% transparent, fixed-fare pricing with zero surge pricing, even during midnight or peak early morning flight hours (2:00 AM – 6:00 AM).',
  },
];

export default function HyderabadAirportCarRentalPage() {
  const rentalSchema = buildCarRentalSchema({
    name: 'DriveItCars Hyderabad Airport Car Rental & Transfers',
    description:
      '24/7 car rental at Rajiv Gandhi International Airport (RGIA Shamshabad), Hyderabad. Self drive cars, airport pickup & drop, luxury cars & SUVs with zero surge pricing.',
    url: 'https://www.driveitcars.in/hyderabad-airport-car-rental',
    areaServed: [
      'Rajiv Gandhi International Airport (RGIA)',
      'Shamshabad',
      'Hyderabad',
      'HITEC City',
      'Gachibowli',
      'Financial District',
      'Banjara Hills',
      'Telangana',
    ],
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Hyderabad Airport Car Rental', url: '/hyderabad-airport-car-rental' },
  ]);

  const faqSchema = buildFaqSchema(AIRPORT_FAQS);

  return (
    <>
      <SeoSchema schema={rentalSchema} />
      <SeoSchema schema={breadcrumbSchema} />
      <SeoSchema schema={faqSchema} />

      {/* ========== BREADCRUMB ========== */}
      <section className="gauto-breadcromb-area section_70">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="breadcromb-box">
                <p className="breadcromb-title">Hyderabad Airport Car Rental</p>
                <ul>
                  <li><i className="fa fa-home" /></li>
                  <li><Link href="/">Home</Link></li>
                  <li><i className="fa fa-angle-right" /></li>
                  <li>Hyderabad Airport Car Rental</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== HERO / INTRO SECTION ========== */}
      <section className="about-page-area section_70" style={{ paddingBottom: '30px' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="about-page-left">
                <span className="editorial-eyebrow">
                  24/7 RAJIV GANDHI INTERNATIONAL AIRPORT (RGIA) TERMINAL DESK
                </span>
                <h1 style={{ color: '#191c20', fontSize: '32px', fontWeight: 600, marginBottom: '20px' }}>
                  Hyderabad Airport Car Rental — 24/7 Self Drive &amp; Chauffeur Transfers
                </h1>
                <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#60656d', marginBottom: '16px' }}>
                  Landing at Rajiv Gandhi International Airport (RGIA Shamshabad)? Skip long taxi queues, surge pricing, and sudden driver cancellations with DriveItCars&apos;s premier <strong>Hyderabad Airport car rental</strong> service. Whether you require a flexible <strong>HYD airport self drive</strong> car ready at Aero Plaza to hit the Outer Ring Road (ORR) immediately, a punctual <strong>airport pickup Hyderabad</strong> transfer to your hotel, or a reliable early-morning <strong>airport drop Hyderabad</strong>, we deliver reliable convenience 24 hours a day, 7 days a week.
                </p>
                <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#60656d', marginBottom: '20px' }}>
                  Our diverse fleet caters to every travel profile: executive sedans for business professionals heading to HITEC City, spacious <strong>airport SUV rental Hyderabad</strong> options like the Toyota Innova Crysta and Fortuner for families with heavy luggage, and <strong>airport luxury car rental Hyderabad</strong> models (BMW, Mercedes-Benz, Audi) for VIP delegations and weddings. Enjoy our dedicated <strong>airport chauffeur service Hyderabad</strong> with flight delay tracking, meet-and-greet placard service, and luggage assistance.
                </p>

                {/* 4 Quick Jump Badges */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <a href="#self-drive" className="gauto-btn" style={{ padding: '8px 16px', fontSize: '13px' }}>
                    HYD Airport Self Drive
                  </a>
                  <a href="#transfers" className="gauto-btn" style={{ padding: '8px 16px', fontSize: '13px', background: '#191c20' }}>
                    Airport Pickup &amp; Drop
                  </a>
                  <a href="#luxury" className="gauto-btn" style={{ padding: '8px 16px', fontSize: '13px', background: '#191c20' }}>
                    Airport Luxury Cars
                  </a>
                  <a href="#suv" className="gauto-btn" style={{ padding: '8px 16px', fontSize: '13px', background: '#191c20' }}>
                    Airport SUV Rental
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 4 CORE AIRPORT SERVICES STRIP ========== */}
      <section style={{ background: '#f5f6f7', padding: '50px 0', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-3 col-md-6">
              <div style={{ background: '#fff', padding: '24px', borderRadius: '14px', border: '1px solid #e2e8f0', height: '100%', boxShadow: 'none' }}>
                <div style={{ width: '46px', height: '46px', borderRadius: '10px', background: 'rgba(255, 185, 7, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60656d', fontSize: '20px', marginBottom: '14px' }}>
                  <i className="fa fa-key" />
                </div>
                <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#191c20', marginBottom: '8px' }}>HYD Airport Self Drive</h2>
                <p style={{ fontSize: '13px', color: '#60656d', lineHeight: '1.6', margin: 0 }}>
                  Keys handed over directly at RGIA car park within 10 minutes of landing. Total driving freedom across Hyderabad and interstate highways.
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div style={{ background: '#fff', padding: '24px', borderRadius: '14px', border: '1px solid #e2e8f0', height: '100%', boxShadow: 'none' }}>
                <div style={{ width: '46px', height: '46px', borderRadius: '10px', background: 'rgba(255, 185, 7, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60656d', fontSize: '20px', marginBottom: '14px' }}>
                  <i className="fa fa-plane" />
                </div>
                <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#191c20', marginBottom: '8px' }}>Airport Pickup Hyderabad</h2>
                <p style={{ fontSize: '13px', color: '#60656d', lineHeight: '1.6', margin: 0 }}>
                  Real-time flight arrival tracking, name placard meet-and-greet, luggage handling, and direct transfers to HITEC City, Gachibowli, or Banjara Hills.
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div style={{ background: '#fff', padding: '24px', borderRadius: '14px', border: '1px solid #e2e8f0', height: '100%', boxShadow: 'none' }}>
                <div style={{ width: '46px', height: '46px', borderRadius: '10px', background: 'rgba(255, 185, 7, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60656d', fontSize: '20px', marginBottom: '14px' }}>
                  <i className="fa fa-diamond" />
                </div>
                <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#191c20', marginBottom: '8px' }}>
                  <Link href="/luxurycars" style={{ color: '#191c20' }}>Airport Luxury Car Rental</Link>
                </h2>
                <p style={{ fontSize: '13px', color: '#60656d', lineHeight: '1.6', margin: 0 }}>
                  First-class travel in <Link href="/mercedes-rental-hyderabad" style={{ color: '#ffb907', fontWeight: 600 }}>Mercedes-Benz</Link>, <Link href="/bmw-rental-hyderabad" style={{ color: '#ffb907', fontWeight: 600 }}>BMW</Link>, <Link href="/audi-rental-hyderabad" style={{ color: '#ffb907', fontWeight: 600 }}>Audi</Link>, and <Link href="/range-rover-rental-hyderabad" style={{ color: '#ffb907', fontWeight: 600 }}>Range Rover</Link>. Tailored for <Link href="/vip-car-rental-hyderabad" style={{ color: '#191c20', fontWeight: 600 }}>VIP dignitaries &amp; CEOs</Link>.
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div style={{ background: '#fff', padding: '24px', borderRadius: '14px', border: '1px solid #e2e8f0', height: '100%', boxShadow: 'none' }}>
                <div style={{ width: '46px', height: '46px', borderRadius: '10px', background: 'rgba(255, 185, 7, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60656d', fontSize: '20px', marginBottom: '14px' }}>
                  <i className="fa fa-suitcase" />
                </div>
                <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#191c20', marginBottom: '8px' }}>Airport SUV Rental</h2>
                <p style={{ fontSize: '13px', color: '#60656d', lineHeight: '1.6', margin: 0 }}>
                  High-capacity 5 &amp; 7-seater SUVs (Innova Crysta, Fortuner, Creta) equipped to carry 4–6 full international suitcases with supreme comfort.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 1: HYD AIRPORT SELF DRIVE FLEET ========== */}
      <section className="gauto-offers-area section_70" id="self-drive" style={{ paddingTop: '60px' }}>
        <div className="container">
          <div className="site-heading text-center" style={{ marginBottom: '35px' }}>
            <span style={{ color: '#ffb907', fontWeight: 700, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>
              Drive Directly from the Terminal
            </span>
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#111827' }}>
              HYD Airport Self Drive Cars (RGIA Shamshabad)
            </h2>
            <p style={{ color: '#60656d', fontSize: '14px', maxWidth: '650px', margin: '8px auto 0' }}>
              Pickup your sanitized self-drive car right outside Rajiv Gandhi International Airport. Instant digital KYC and 24/7 handover.
            </p>
          </div>

          <div className="row">
            {AIRPORT_FLEET_SELF_DRIVE.map((car, idx) => {
              const whatsappText = encodeURIComponent(
                `Hi DriveItCars, I want to book the [${car.name}] for self drive at Hyderabad Airport (RGIA). Please share rates and availability.`
              );

              return (
                <div className="col-lg-3 col-md-6 mb-4" key={idx}>
                  <div className="single-offers" style={{ background: '#ffffff', borderRadius: '14px', overflow: 'hidden', border: '1px solid #e3e5e8' }}>
                    <div className="offer-image" style={{ width: '100%', height: '175px', background: '#f5f6f7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img
                        loading="lazy"
                        src={car.image}
                        alt={`${car.name} Hyderabad airport car rental`}
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                      />
                    </div>
                    <div className="offer-text" style={{ padding: '18px' }}>
                      <span style={{ display: 'inline-block', fontSize: '11px', background: '#f5f6f7', color: '#191c20', padding: '2px 8px', borderRadius: '4px', fontWeight: 700, marginBottom: '6px' }}>
                        {car.category}
                      </span>
                      <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#111827', margin: '0 0 4px' }}>
                        {car.name}
                      </h3>
                      <div style={{ background: '#f5f6f7', padding: '6px 10px', borderRadius: '6px', color: '#191c20', fontWeight: 700, fontSize: '13px', marginBottom: '8px', display: 'inline-block' }}>
                        <i className="fa fa-tag" style={{ color: '#191c20', marginRight: 4 }} /> {car.rate}
                      </div>
                      <p style={{ fontSize: '12px', color: '#60656d', marginBottom: '8px', lineHeight: '1.4' }}>
                        <i className="fa fa-suitcase" style={{ color: '#ffb907', marginRight: 4 }} /> <strong>Luggage:</strong> {car.luggage}
                      </p>
                      <p style={{ fontSize: '11px', color: '#9ca3af', fontStyle: 'italic', marginBottom: '12px' }}>
                        {car.idealFor}
                      </p>
                      <div className="offer-action" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                        <a href="tel:+916300041186" className="offer-btn-1" style={{ fontSize: '11px', padding: '8px 4px' }}>
                          <i className="fa fa-phone" /> Call
                        </a>
                        <a
                          href={`https://api.whatsapp.com/send?phone=+916300041186&text=${whatsappText}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="offer-btn-2"
                          style={{ fontSize: '11px', padding: '8px 4px' }}
                        >
                          <i className="fa fa-whatsapp" /> WhatsApp
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

      {/* ========== SECTION 2: AIRPORT TRANSFERS & CHAUFFEUR SERVICES ========== */}
      <section className="about-page-area section_70" id="transfers" style={{ background: '#f5f6f7', paddingTop: '50px' }}>
        <div className="container">
          <div className="site-heading text-center" style={{ marginBottom: '35px' }}>
            <span style={{ color: '#ffb907', fontWeight: 700, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>
              Chauffeur Driven • Fixed Fares
            </span>
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#111827' }}>
              Airport Pickup &amp; Airport Drop Hyderabad
            </h2>
            <p style={{ color: '#60656d', fontSize: '14px', maxWidth: '650px', margin: '8px auto 0' }}>
              Zero cancellations, zero surge pricing, and guaranteed on-time airport transfers across Hyderabad with verified executive chauffeurs.
            </p>
          </div>

          <div className="row">
            {AIRPORT_TRANSFERS.map((cab, idx) => {
              const whatsappText = encodeURIComponent(
                `Hi DriveItCars, I would like to book the [${cab.name}] for Hyderabad airport transfer. Please share pricing and driver details.`
              );

              return (
                <div className="col-lg-4 col-md-6 mb-4" key={idx}>
                  <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ width: '100%', height: '190px', background: '#f5f6f7', overflow: 'hidden' }}>
                      <img
                        loading="lazy"
                        src={cab.image}
                        alt={cab.name}
                        style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '16px' }}
                      />
                    </div>
                    <div style={{ padding: '22px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <span style={{ display: 'inline-block', fontSize: '11px', background: '#f5f6f7', color: '#191c20', padding: '3px 8px', borderRadius: '4px', fontWeight: 700, marginBottom: '6px' }}>
                        {cab.type}
                      </span>
                      <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#191c20', margin: '0 0 6px' }}>
                        {cab.name}
                      </h3>
                      <p style={{ color: '#60656d', fontSize: '13px', marginBottom: '14px', lineHeight: '1.5' }}>
                        {cab.desc}
                      </p>
                      <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '12px', marginBottom: '16px', flexGrow: 1 }}>
                        {cab.features.map((feat, fIdx) => (
                          <div key={fIdx} style={{ fontSize: '12px', color: '#60656d', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <i className="fa fa-check" style={{ color: '#16a34a', fontSize: '12px' }} />
                            {feat}
                          </div>
                        ))}
                      </div>
                      <div className="offer-action" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: 'auto' }}>
                        <a href="tel:+916300041186" className="offer-btn-1" style={{ textAlign: 'center', borderRadius: '6px', padding: '8px' }}>
                          <i className="fa fa-phone" /> Call
                        </a>
                        <a
                          href={`https://api.whatsapp.com/send?phone=+916300041186&text=${whatsappText}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="offer-btn-2"
                          style={{ textAlign: 'center', borderRadius: '6px', padding: '8px' }}
                        >
                          <i className="fa fa-whatsapp" /> WhatsApp
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

      {/* ========== TRAVEL TIME & CORRIDOR DISTANCES FROM RGIA ========== */}
      <section className="about-page-area section_70" style={{ paddingTop: '50px' }}>
        <div className="container">
          <div className="site-heading text-center" style={{ marginBottom: '35px' }}>
            <span style={{ color: '#ffb907', fontWeight: 700, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>
              Transit Guide
            </span>
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#111827' }}>
              Travel Times from Hyderabad Airport (RGIA Shamshabad)
            </h2>
          </div>

          <div className="table-responsive" style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e3e5e8', overflow: 'hidden' }}>
            <table className="table" style={{ margin: 0, fontSize: '14px' }}>
              <thead style={{ background: '#191c20', color: '#fff' }}>
                <tr>
                  <th style={{ padding: '16px' }}>Hyderabad City Zone</th>
                  <th style={{ padding: '16px' }}>Fastest Expressway Route</th>
                  <th style={{ padding: '16px' }}>Approx Distance / Travel Time</th>
                  <th style={{ padding: '16px', color: '#ffb907' }}>Recommended Vehicle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '14px 16px', fontWeight: 700 }}>
                    <Link href="/gachibowli" style={{ color: '#191c20' }}>Gachibowli &amp; Financial District</Link>
                  </td>
                  <td style={{ padding: '14px 16px' }}>Nehru Outer Ring Road (ORR Exit 19)</td>
                  <td style={{ padding: '14px 16px', color: '#16a34a', fontWeight: 600 }}>30 Km • ~25 to 30 Mins</td>
                  <td style={{ padding: '14px 16px' }}>Creta Automatic / Dzire Sedan</td>
                </tr>
                <tr style={{ background: '#f5f6f7' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 700 }}>
                    <Link href="/hitech-city" style={{ color: '#191c20' }}>HITEC City &amp; Mindspace</Link>
                  </td>
                  <td style={{ padding: '14px 16px' }}>Outer Ring Road (ORR) via Gachibowli</td>
                  <td style={{ padding: '14px 16px', color: '#16a34a', fontWeight: 600 }}>35 Km • ~30 to 35 Mins</td>
                  <td style={{ padding: '14px 16px' }}>Innova Crysta / Swift Dzire</td>
                </tr>
                <tr>
                  <td style={{ padding: '14px 16px', fontWeight: 700 }}>
                    <Link href="/madhapur" style={{ color: '#191c20' }}>Madhapur &amp; Durgam Cheruvu</Link>
                  </td>
                  <td style={{ padding: '14px 16px' }}>ORR via Inorbit / Cable Bridge</td>
                  <td style={{ padding: '14px 16px', color: '#16a34a', fontWeight: 600 }}>36 Km • ~35 Mins</td>
                  <td style={{ padding: '14px 16px' }}>Baleno / Creta / Fortuner</td>
                </tr>
                <tr style={{ background: '#f5f6f7' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 700 }}>
                    <Link href="/kondapur" style={{ color: '#191c20' }}>Kondapur &amp; Kothaguda</Link>
                  </td>
                  <td style={{ padding: '14px 16px' }}>ORR Exit 19 via Botanical Garden</td>
                  <td style={{ padding: '14px 16px', color: '#16a34a', fontWeight: 600 }}>38 Km • ~35 to 40 Mins</td>
                  <td style={{ padding: '14px 16px' }}>Innova Crysta / Thar 4x4</td>
                </tr>
                <tr>
                  <td style={{ padding: '14px 16px', fontWeight: 700 }}>
                    <Link href="/banjara-hills" style={{ color: '#191c20' }}>Banjara Hills &amp; Jubilee Hills</Link>
                  </td>
                  <td style={{ padding: '14px 16px' }}>PVNR Elevated Expressway via Mehdipatnam</td>
                  <td style={{ padding: '14px 16px', color: '#16a34a', fontWeight: 600 }}>31 Km • ~35 to 40 Mins</td>
                  <td style={{ padding: '14px 16px' }}>Mercedes-Benz / BMW Luxury</td>
                </tr>
                <tr style={{ background: '#f5f6f7' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 700 }}>
                    <Link href="/secunderabad" style={{ color: '#191c20' }}>Secunderabad &amp; Begumpet</Link>
                  </td>
                  <td style={{ padding: '14px 16px' }}>PVNR Expressway &amp; Tank Bund Corridor</td>
                  <td style={{ padding: '14px 16px', color: '#16a34a', fontWeight: 600 }}>38 Km • ~45 to 55 Mins</td>
                  <td style={{ padding: '14px 16px' }}>Innova Crysta / Ertiga 7-Seater</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========== FAQ SECTION ========== */}
      <FaqSection
        items={AIRPORT_FAQS}
        title="Frequently Asked Questions — Hyderabad Airport Car Rental"
        subtitle="Key details about self drive car hire, airport pickups, drops, and luxury transfers at RGIA Shamshabad"
      />
    </>
  );
}
