import Link from 'next/link';
import FaqSection from '@/components/FaqSection';
import SeoSchema, {
  buildCarRentalSchema,
  buildFaqSchema,
  buildBreadcrumbSchema,
} from '@/components/SeoSchema';

export const metadata = {
  title: 'Outstation Bus Rental Hyderabad | AC Coaches | DriveItCars',
  description:
    'Book outstation luxury AC buses & coaches from Hyderabad with DriveItCars. 30 to 50 seater buses for Tirupati, Srisailam, Shirdi, Goa & corporate tours.',
  keywords:
    'outstation bus rental hyderabad, hyderabad to tirupati bus rental, hyderabad to srisailam bus hire, outstation luxury coach hyderabad, tempo traveller rental hyderabad, driveitcars',
  alternates: {
    canonical: 'https://www.driveitcars.in/outstation-bus',
  },
  openGraph: {
    title: 'Outstation Bus Rental Hyderabad | AC Coaches | DriveItCars',
    description:
      'Hire 30 to 50 seater outstation AC coaches from Hyderabad to Tirupati, Srisailam, Shirdi, Hampi & Goa with verified highway drivers.',
    url: 'https://www.driveitcars.in/outstation-bus',
    siteName: 'DriveItCars',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://www.driveitcars.in/assets/img/bus/bus4.webp',
        width: 1200,
        height: 630,
        alt: 'Outstation Bus Rental from Hyderabad — DriveItCars',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Outstation Bus Rental Hyderabad | AC Coaches | DriveItCars',
    description:
      'Rent 30 to 50 seater AC outstation coaches from Hyderabad for pilgrimages, weddings & corporate trips with DriveItCars.',
    images: ['https://www.driveitcars.in/assets/img/bus/bus4.webp'],
  },
};

const OUTSTATION_BUSES = [
  {
    name: '30 Seater Outstation AC Mini Bus',
    image: '/assets/img/bus/bus1.webp',
    alt: '30 seater outstation AC mini bus rental from Hyderabad - DriveItCars',
    routeUse: 'Ideal for Srisailam & Yadadri',
    seats: '30 Pushback Seats',
  },
  {
    name: '35 Seater Highway AC Coach',
    image: '/assets/img/bus/bus2.webp',
    alt: '35 seater outstation highway AC coach hire in Hyderabad - DriveItCars',
    routeUse: 'Ideal for Tirupati & Hampi',
    seats: '35 Reclining Seats',
  },
  {
    name: '40 Seater Interstate Luxury Bus',
    image: '/assets/img/bus/bus3.webp',
    alt: '40 seater interstate luxury bus rental from Hyderabad - DriveItCars',
    routeUse: 'Ideal for Shirdi & Destination Weddings',
    seats: '40 Plush Seats',
  },
  {
    name: '45 Seater Multi-Axle AC Coach',
    image: '/assets/img/bus/bus4.webp',
    alt: '45 seater outstation AC coach rental in Hyderabad - DriveItCars',
    routeUse: 'Ideal for Goa, Ooty & Coorg Tours',
    seats: '45 Air-Suspension Seats',
  },
  {
    name: '50 Seater Grand Tour AC Bus',
    image: '/assets/img/bus/bus6.webp',
    alt: '50 seater grand tour outstation AC bus in Hyderabad - DriveItCars',
    routeUse: 'Ideal for Corporate & College Tours',
    seats: '50 High-Back Seats',
  },
  {
    name: '32 Seater Executive Pilgrimage Coach',
    image: '/assets/img/bus/bus7.jpg',
    alt: '32 seater pilgrimage AC bus rental from Hyderabad - DriveItCars',
    routeUse: 'Ideal for Family Temple Yatra',
    seats: '32 Reclining Seats',
  },
];

const OUTSTATION_FAQS = [
  {
    question: 'Which outstation destinations from Hyderabad do your luxury buses cover?',
    answer:
      'DriveItCars operates outstation bus charters from Hyderabad across Telangana, Andhra Pradesh, Karnataka, Maharashtra, Goa, and Tamil Nadu—including Tirupati, Srisailam, Shirdi, Mantralayam, Hampi, Araku Valley, Goa, Ooty, and Bangalore.',
  },
  {
    question: 'How is outstation bus rental pricing calculated in Hyderabad?',
    answer:
      'Outstation bus tariffs are structured transparently per kilometer (with a standard 300 km/day minimum running average), plus driver allowance, interstate border permits, and actual FASTag tolls.',
  },
  {
    question: 'Do your outstation buses come with experienced night-highway drivers?',
    answer:
      'Yes, every long-distance outstation charter from DriveItCars is staffed by seasoned commercial highway drivers well-versed in ghat roads (such as Srisailam and Tirumala foothills) and interstate checkpost documentation.',
  },
  {
    question: 'Can your outstation bus pick up our group from multiple points in Hyderabad?',
    answer:
      'Yes! We happily coordinate multi-point boarding across Secunderabad, Kukatpally, HITEC City, Gachibowli, Mehdipatnam, LB Nagar, or RGIA Shamshabad Airport before departing onto the highway.',
  },
];

export default function OutstationBusPage() {
  const rentalSchema = buildCarRentalSchema({
    name: 'DriveItCars — Outstation Bus Rental Hyderabad',
    description:
      'Book 30 to 50 seater outstation luxury AC buses from Hyderabad with DriveItCars for Tirupati, Srisailam, Shirdi, Hampi, Goa, and corporate tours.',
    url: 'https://www.driveitcars.in/outstation-bus',
    priceRange: '₹12000 - ₹55000',
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Luxury Buses', url: '/luxury-buses' },
    { name: 'Outstation Bus Rental Hyderabad', url: '/outstation-bus' },
  ]);

  const faqSchema = buildFaqSchema(OUTSTATION_FAQS);

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
                <h1 className="breadcromb-title">Outstation Luxury Bus Rental in Hyderabad</h1>
                <ul>
                  <li><i className="fa fa-home" /></li>
                  <li><Link href="/">Home</Link></li>
                  <li><i className="fa fa-angle-right" /></li>
                  <li><Link href="/luxury-buses">Luxury Buses</Link></li>
                  <li><i className="fa fa-angle-right" /></li>
                  <li>Outstation Buses</li>
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
                <h2>Interstate &amp; Outstation AC Coach Charters from Hyderabad by DriveItCars</h2>
                <p style={{ textAlign: 'justify' }}>
                  Embark on unforgettable group journeys across South and West India with <strong>DriveItCars outstation bus rentals in Hyderabad</strong>. Whether you are organizing a family pilgrimage to <strong>Tirupati Balaji, Srisailam Mallikarjuna Swamy, Yadadri, or Shirdi</strong>, a destination wedding convoy, or a corporate resort retreat to <strong>Goa, Hampi, Coorg, or Araku Valley</strong>, our 30 to 50-seater luxury AC coaches deliver smooth, fatigue-free highway travel.
                </p>
                <p style={{ textAlign: 'justify' }}>
                  Every coach features air suspension, deep reclining seats with footrests, individual AC vents and mobile charging ports, spacious under-floor luggage compartments, All-India Tourist Permits, and seasoned highway drivers. Looking for smaller 7-seater family vehicles instead? Check our <Link href="/suv7" style={{ color: '#d49500', fontWeight: 700 }}>7-Seater Innova &amp; SUV Rentals</Link> or <Link href="/cabs" style={{ color: '#d49500', fontWeight: 700 }}>Outstation Chauffeur Cabs</Link>.
                </p>
                <div className="about-page-call">
                  <div className="page-call-icon">
                    <i className="fa fa-phone" />
                  </div>
                  <div className="call-info">
                    <p>24/7 Outstation Charter Desk</p>
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
                  alt="DriveItCars outstation luxury AC bus charter from Hyderabad"
                  style={{ height: '380px', borderRadius: '14px', objectFit: 'cover', width: '100%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container" style={{ paddingBottom: '40px' }}>
        <h2 className="text-center mt-2 mb-4">DriveItCars Outstation Bus Fleet</h2>
        <div className="row">
          {OUTSTATION_BUSES.map((bus) => {
            const waText = encodeURIComponent(
              `Hi DriveItCars, I am contacting you to enquire about booking the ${bus.name} for an outstation trip from Hyderabad. Please share per-km rates and availability.`
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
                      <li><i className="fa fa-road" /> {bus.routeUse}</li>
                      <li><i className="fa fa-id-card" /> All-India Permit</li>
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
        items={OUTSTATION_FAQS}
        title="Frequently Asked Questions — Outstation Bus Rental Hyderabad"
        subtitle="Clear details on per-kilometer pricing, interstate permits & highway coach amenities with DriveItCars"
      />
    </>
  );
}
