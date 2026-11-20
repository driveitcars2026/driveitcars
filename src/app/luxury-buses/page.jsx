import Link from 'next/link';
import FaqSection from '@/components/FaqSection';
import SeoSchema, {
  buildCarRentalSchema,
  buildFaqSchema,
  buildBreadcrumbSchema,
} from '@/components/SeoSchema';

export const metadata = {
  title: 'Luxury Bus Rental Hyderabad | 30-50 Seater | DriveItCars',
  description:
    'Book 30 to 50 seater luxury AC buses in Hyderabad with DriveItCars. Volvo, BharatBenz & Tempo Traveller coaches for weddings, corporate outings & pilgrimages.',
  keywords:
    'luxury bus rental hyderabad, 40 seater bus hire hyderabad, 50 seater ac bus rental hyderabad, wedding bus rental hyderabad, volvo bus hire hyderabad, driveitcars',
  alternates: {
    canonical: 'https://www.driveitcars.in/luxury-buses',
  },
  openGraph: {
    title: 'Luxury Bus Rental Hyderabad | 30-50 Seater | DriveItCars',
    description:
      'Rent 30, 35, 40, 45 & 50 seater AC luxury coaches in Hyderabad for weddings, corporate offsites, airport group transfers & outstation tours.',
    url: 'https://www.driveitcars.in/luxury-buses',
    siteName: 'DriveItCars',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://www.driveitcars.in/assets/img/bus/bus1.webp',
        width: 1200,
        height: 630,
        alt: 'Luxury AC Bus Rental in Hyderabad — DriveItCars',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxury Bus Rental Hyderabad | 30-50 Seater | DriveItCars',
    description:
      'Hire 30 to 50 seater luxury AC coaches in Hyderabad for weddings, corporate retreats & group travel with DriveItCars.',
    images: ['https://www.driveitcars.in/assets/img/bus/bus1.webp'],
  },
};

const LUXURY_BUSES = [
  {
    name: '30 Seater Luxury AC Mini Coach',
    image: '/assets/img/bus/bus1.webp',
    alt: '30 seater luxury AC mini coach bus rental in Hyderabad - DriveItCars',
    seats: '30 Pushback Seats',
    features: 'Air Suspension • Dual AC',
  },
  {
    name: '35 Seater Executive AC Bus',
    image: '/assets/img/bus/bus2.webp',
    alt: '35 seater executive AC bus hire in Hyderabad - DriveItCars',
    seats: '35 Reclining Seats',
    features: 'LED TV • Surround Audio',
  },
  {
    name: '40 Seater Luxury Wedding Coach',
    image: '/assets/img/bus/bus3.webp',
    alt: '40 seater luxury wedding bus rental in Hyderabad - DriveItCars',
    seats: '40 Plush Seats',
    features: 'VIP Baraat & Guest Transit',
  },
  {
    name: '45 Seater Volvo / BharatBenz AC Coach',
    image: '/assets/img/bus/bus4.webp',
    alt: '45 seater Volvo and BharatBenz AC coach rental in Hyderabad - DriveItCars',
    seats: '45 Air-Suspension Seats',
    features: 'Panoramic Windows • USB Ports',
  },
  {
    name: '50 Seater Deluxe AC Highway Coach',
    image: '/assets/img/bus/bus6.webp',
    alt: '50 seater deluxe AC highway bus hire in Hyderabad - DriveItCars',
    seats: '50 High-Back Seats',
    features: 'Deep Luggage Bays • GPS',
  },
  {
    name: '32 Seater Corporate Charter Coach',
    image: '/assets/img/bus/bus7.jpg',
    alt: '32 seater corporate charter bus rental in Hyderabad - DriveItCars',
    seats: '32 Executive Seats',
    features: 'Individual Reading Lamps',
  },
];

const BUS_FAQS = [
  {
    question: 'What seating capacities are available for luxury bus rentals in Hyderabad with DriveItCars?',
    answer:
      'DriveItCars offers 30-seater, 32-seater, 35-seater, 40-seater, 45-seater, and 50-seater luxury AC coaches—along with 14 to 24-seater Force Urbania and Tempo Travellers—for weddings, corporate retreats, and pilgrimages.',
  },
  {
    question: 'Can I book luxury AC buses for Hyderabadi wedding guest transportation?',
    answer:
      'Yes! We specialize in coordinated multi-bus wedding charters across Banjara Hills, Jubilee Hills, Shamshabad convention centers, Gachibowli, and Ramoji Film City, including RGIA Airport guest pickups and hotel shuttles.',
  },
  {
    question: 'Are your luxury buses equipped for interstate outstation tours to Tirupati, Shirdi, or Srisailam?',
    answer:
      'Absolutely. Every luxury coach in our fleet carries commercial permits, air suspension, reclining pushback seats, climate control AC, under-belly luggage bays, and two experienced commercial highway drivers for long overnight journeys.',
  },
  {
    question: 'Do you provide GST invoices for corporate bus charters and IT company outings?',
    answer:
      'Yes, DriveItCars provides 100% GST-compliant billing for corporate team offsites, industrial visits, conference shuttles at HITECEX, and employee transport in HITEC City and Financial District.',
  },
];

export default function LuxuryBusesPage() {
  const rentalSchema = buildCarRentalSchema({
    name: 'DriveItCars — Luxury Bus Rental Hyderabad (30–50 Seater AC Coaches)',
    description:
      'Rent 30 to 50 seater luxury AC coaches, Volvo & BharatBenz buses in Hyderabad with DriveItCars for weddings, corporate outings, and outstation group travel.',
    url: 'https://www.driveitcars.in/luxury-buses',
    priceRange: '₹9500 - ₹45000',
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Luxury Bus Rental Hyderabad', url: '/luxury-buses' },
  ]);

  const faqSchema = buildFaqSchema(BUS_FAQS);

  return (
    <>
      <SeoSchema schema={rentalSchema} />
      <SeoSchema schema={breadcrumbSchema} />
      <SeoSchema schema={faqSchema} />

      <section className="gauto-breadcromb-area section_70">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="breadcromb-box">
                <h1 className="breadcromb-title">Luxury Bus Rental in Hyderabad</h1>
                <ul>
                  <li><i className="fa fa-home" /></li>
                  <li><Link href="/">Home</Link></li>
                  <li><i className="fa fa-angle-right" /></li>
                  <li>Luxury Buses</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-page-area section_70">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="about-page-left">
                <h2>30 to 50-Seater Luxury AC Bus Hire in Hyderabad by DriveItCars</h2>
                <p style={{ textAlign: 'justify' }}>
                  <strong>DriveItCars</strong> offers Hyderabad’s cleanest, most reliable fleet of 30, 35, 40, 45, and 50-seater luxury AC coaches for grand weddings, corporate retreats, convention shuttles, and family pilgrimages. Equipped with plush reclining pushback seats, pneumatic air suspension, panoramic tinted windows, dual-zone climate control, and high-definition audio-visual systems, our coaches turn group transit into a first-class lounge experience.
                </p>
                <p style={{ textAlign: 'justify' }}>
                  Every luxury bus booking includes a verified, uniformed commercial driver and assistant, GPS tracking, and punctual doorstep reporting at your hotel, wedding convention hall, IT campus in <Link href="/hitech-city" style={{ color: '#d49500', fontWeight: 700 }}>HITEC City</Link> or <Link href="/gachibowli" style={{ color: '#d49500', fontWeight: 700 }}>Gachibowli</Link>, or <Link href="/hyderabad-airport-car-rental" style={{ color: '#d49500', fontWeight: 700 }}>RGIA Shamshabad Airport</Link>. Need interstate highway charters? Explore our <Link href="/outstation-bus" style={{ color: '#d49500', fontWeight: 700 }}>Outstation Bus Rental Hyderabad</Link> packages.
                </p>
                <div className="about-page-call">
                  <div className="page-call-icon">
                    <i className="fa fa-phone" />
                  </div>
                  <div className="call-info">
                    <p>24/7 Group Charter &amp; Bus Desk</p>
                    <h3><a href="tel:+916300041186">+91 63000 41186</a></h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-page-right">
                <img
                  loading="lazy"
                  src="/assets/img/bus/bus8.jpg"
                  alt="DriveItCars 45 seater luxury AC coach rental in Hyderabad"
                  style={{ height: '380px', borderRadius: '14px', objectFit: 'cover', width: '100%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container" style={{ paddingBottom: '40px' }}>
        <h2 className="text-center mt-2 mb-4">DriveItCars Luxury AC Coaches (30–50 Seaters)</h2>
        <div className="row">
          {LUXURY_BUSES.map((bus) => {
            const waText = encodeURIComponent(
              `Hi DriveItCars, I am contacting you to enquire about booking the ${bus.name} in Hyderabad. Please share availability and tariff.`
            );
            return (
              <div className="col-lg-4 col-md-6" key={bus.name}>
                <div className="single-offers">
                  <div className="offer-image">
                    <img loading="lazy" src={bus.image} className="cstimg1" alt={bus.alt} />
                  </div>
                  <div className="offer-text">
                    <h3>{bus.name}</h3>
                    <ul>
                      <li><i className="fa fa-users" /> {bus.seats}</li>
                      <li><i className="fa fa-snowflake-o" /> {bus.features}</li>
                      <li><i className="fa fa-shield" /> Chauffeur Driven</li>
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

      <FaqSection
        items={BUS_FAQS}
        title="Frequently Asked Questions — Luxury Bus Rental Hyderabad"
        subtitle="Everything you need to know about chartering 30 to 50 seater luxury AC coaches with DriveItCars"
      />
    </>
  );
}
