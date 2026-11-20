import Link from 'next/link';
import FaqSection from '@/components/FaqSection';
import SeoSchema, {
  buildCarRentalSchema,
  buildFaqSchema,
  buildBreadcrumbSchema,
} from '@/components/SeoSchema';

export const metadata = {
  title: 'Luxury Car Rental in Hyderabad | VIP Hire | DriveItCars',
  description:
    'Experience chauffeur-driven luxury car rental in Hyderabad for weddings, VIP arrivals & corporate travel. Rent Mercedes, BMW, Audi & Range Rover at best rates.',
  alternates: {
    canonical: 'https://www.driveitcars.in/luxury-car-in-hyderabad',
  },
  openGraph: {
    title: 'Luxury Car Rental in Hyderabad | DriveItCars',
    description:
      'Premier luxury car rental in Hyderabad. Drive Mercedes, BMW, Audi, Range Rover & Rolls Royce with white-glove doorstep delivery and executive chauffeurs.',
    url: 'https://www.driveitcars.in/luxury-car-in-hyderabad',
    siteName: 'DriveItCars Hyderabad',
    locale: 'en_IN',
    type: 'article',
  },
};

const LUXURY_GUIDE_FAQS = [
  {
    question: 'What is the process of hiring a Luxury Car in Hyderabad to attend a special event?',
    answer:
      'Select your preferred luxury vehicle (Mercedes, BMW, Audi, or Range Rover), specify your date, timing, and pickup address, submit digital KYC on WhatsApp (+91 6300041186), and DriveItCars will confirm your booking with guaranteed on-time doorstep delivery.',
  },
  {
    question: 'What is included with a Luxury Car Rental Service in Hyderabad?',
    answer:
      'Our luxury car rental bookings include a showroom-conditioned, fully sanitized vehicle, commercial passenger insurance, 24/7 roadside assistance, and the option of a suited executive chauffeur or private self-drive freedom.',
  },
  {
    question: 'Do you provide Wedding Car service in Hyderabad for multiple days?',
    answer:
      'Yes, we provide multi-event packages covering Mehendi, Sangeet, Wedding Baraat, and Reception with optional fresh floral vehicle decoration and formal event protocol.',
  },
  {
    question: 'Are luxury cars available for corporate VIP travel and airport transfers in Hyderabad?',
    answer:
      'Definitely! We specialize in executive CEO travel, board meeting delegations, and 24/7 airport transfers to Rajiv Gandhi International Airport (RGIA Shamshabad) with real-time flight tracking.',
  },
  {
    question: 'When should I reserve a luxury wedding car in Hyderabad during peak season?',
    answer:
      'During the wedding and auspicious muhurtham season in Telangana, we recommend reserving your preferred luxury vehicle 2 to 4 weeks in advance to ensure guaranteed model availability.',
  },
];

export default function luxuryCarInHyderabadPage() {
  const rentalSchema = buildCarRentalSchema({
    name: 'DriveItCars Luxury Car Rental in Hyderabad',
    description:
      'Premier luxury car rental in Hyderabad for weddings, VIP events, corporate travel, and airport transfers.',
    url: 'https://www.driveitcars.in/luxury-car-in-hyderabad',
    areaServed: ['Hyderabad', 'Banjara Hills', 'Jubilee Hills', 'HITEC City', 'Gachibowli', 'RGIA Airport'],
    priceRange: 'Tariff on Request',
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Luxury Cars', url: '/luxurycars' },
    { name: 'Luxury Car in Hyderabad Guide', url: '/luxury-car-in-hyderabad' },
  ]);

  const faqSchema = buildFaqSchema(LUXURY_GUIDE_FAQS);

  return (
    <>
      <SeoSchema schema={rentalSchema} />
      <SeoSchema schema={breadcrumbSchema} />
      <SeoSchema schema={faqSchema} />

      {/* Breadcrumb Area */}
      <section className="gauto-breadcromb-area section_70">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="breadcromb-box">
                <span
                  style={{
                    color: '#ffb907',
                    fontWeight: 700,
                    fontSize: '13px',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: 8,
                  }}
                >
                  HYDERABAD LUXURY CAR RENTALS
                </span>
                <p className="breadcromb-title">Luxury Car in Hyderabad</p>
                <ul>
                  <li><i className="fa fa-home" /></li>
                  <li><Link href="/">Home</Link></li>
                  <li><i className="fa fa-angle-right" /></li>
                  <li><Link href="/luxurycars">Luxury Cars</Link></li>
                  <li><i className="fa fa-angle-right" /></li>
                  <li>Luxury Car in Hyderabad</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container section_70">
        <div className="row">
          {/* Left Column: Comprehensive Guide */}
          <div className="col-lg-8">
            <div style={{ background: '#fff', borderRadius: '16px', padding: '36px', boxShadow: '0 4px 25px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
              <span className="editorial-eyebrow">
                PRESTIGE &amp; ELEGANCE
              </span>
              <h1 style={{ fontSize: '30px', fontWeight: 800, color: '#191c20', marginBottom: '22px', lineHeight: '1.3' }}>
                Luxury Car in Hyderabad Where Every Moment Feels Like a Memorable Arrival!
              </h1>

              {/* Brand Navigation Bar */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                <Link href="/mercedes-rental-hyderabad" style={{ background: '#191c20', color: '#ffb907', padding: '7px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 700 }}>
                  Mercedes Rental
                </Link>
                <Link href="/bmw-rental-hyderabad" style={{ background: '#f5f6f7', color: '#191c20', padding: '7px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, border: '1px solid #cbd5e1' }}>
                  BMW Rental
                </Link>
                <Link href="/audi-rental-hyderabad" style={{ background: '#f5f6f7', color: '#191c20', padding: '7px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, border: '1px solid #cbd5e1' }}>
                  Audi Rental
                </Link>
                <Link href="/range-rover-rental-hyderabad" style={{ background: '#f5f6f7', color: '#191c20', padding: '7px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, border: '1px solid #cbd5e1' }}>
                  Range Rover
                </Link>
                <Link href="/luxury-chauffeur-hyderabad" style={{ background: '#f5f6f7', color: '#191c20', padding: '7px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, border: '1px solid #cbd5e1' }}>
                  Luxury Chauffeur
                </Link>
                <Link href="/vip-car-rental-hyderabad" style={{ background: '#ffb907', color: '#191c20', padding: '7px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 700 }}>
                  VIP &amp; CEO Car Hire
                </Link>
              </div>

              <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#60656d', marginBottom: '16px' }}>
                It is a captivating silence that occurs when a truly elite car arrives. Conversations pause. Heads turn. It is not just about the vehicle, but the emotion and stature it commands. Whether leading a royal wedding baraat in <strong>Banjara Hills</strong> or hosting high-profile corporate delegates in <strong>HITEC City</strong>, renting a <strong>Luxury Car in Hyderabad</strong> transforms an ordinary occasion into an unforgettable memory.
              </p>

              <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#191c20', marginTop: '28px', marginBottom: '14px' }}>
                Why a Luxury Car Rental in Hyderabad is Transformational
              </h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#60656d', marginBottom: '16px' }}>
                Hyderabad has its own majestic rhythm — historic Hyderabadi architecture, gleaming cyber skyscrapers, long open stretches on the Outer Ring Road, and celebrations celebrated on a grand scale. A premium car rental matches this vibrant atmosphere:
              </p>
              <ul style={{ paddingLeft: '20px', fontSize: '15px', lineHeight: '1.8', color: '#60656d', marginBottom: '20px' }}>
                <li><strong>Corporate Executive Meetings:</strong> First impressions define leadership. Arrive composed in a Mercedes-Benz S-Class or BMW 7 Series.</li>
                <li><strong>Royal Weddings &amp; Baraat Entries:</strong> A Range Rover or convertible roadster elevates the visual narrative in wedding photo shoots.</li>
                <li><strong>RGIA Airport VIP Transfers:</strong> After international travel, step directly into an air-conditioned cabin with an executive chauffeur.</li>
                <li><strong>Anniversaries &amp; Luxury Celebrations:</strong> Celebrate milestones with supreme privacy behind the wheel of an exotic self-drive car.</li>
              </ul>

              {/* Direct Booking CTA Block */}
              <div style={{ background: '#f5f6f7', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', margin: '28px 0', textAlign: 'center' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#191c20', marginBottom: '8px' }}>
                  Reserve Your Luxury Ride in Hyderabad Today
                </h3>
                <p style={{ color: '#60656d', fontSize: '14px', marginBottom: '18px' }}>
                  Instant digital KYC, transparent tariffs, and guaranteed white-glove doorstep delivery.
                </p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a href="tel:+916300041186" style={{ background: '#191c20', color: '#ffb907', padding: '12px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <i className="fa fa-phone" /> Call Luxury Desk (+91 6300041186)
                  </a>
                  <a href="https://api.whatsapp.com/send?phone=+916300041186&text=Hi%20DriveItCars%2C%20I%20want%20to%20enquire%20about%20luxury%20car%20rental%20in%20Hyderabad." target="_blank" rel="noopener noreferrer" style={{ background: '#25D366', color: '#fff', padding: '12px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <i className="fa fa-whatsapp" /> Inquire via WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Fleet Highlights */}
          <div className="col-lg-4 mt-4 mt-lg-0">
            <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#191c20', marginBottom: '16px', borderBottom: '2px solid #ffb907', paddingBottom: '8px', display: 'inline-block' }}>
                Featured Luxury Fleet
              </h3>
              <div style={{ marginBottom: '18px' }}>
                <img loading="lazy" src="/rangerover.webp" alt="Range Rover Luxury Car in Hyderabad" className="img-fluid rounded" style={{ width: '100%', height: '170px', objectFit: 'cover' }} />
                <h4 style={{ fontSize: '16px', fontWeight: 700, marginTop: '10px', color: '#191c20' }}>Range Rover Evoque &amp; Sport</h4>
                <p style={{ fontSize: '13px', color: '#60656d', margin: 0 }}>Tariff on Request • Self Drive &amp; Wedding</p>
                <Link href="/range-rover-rental-hyderabad" style={{ color: '#ffb907', fontSize: '13px', fontWeight: 600, display: 'inline-block', marginTop: '4px' }}>View Range Rover Details →</Link>
              </div>

              <div style={{ paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#191c20' }}>Mercedes-Benz S-Class &amp; E-Class</h4>
                <p style={{ fontSize: '13px', color: '#60656d', margin: 0 }}>Tariff on Request • Flagship German Luxury</p>
                <Link href="/mercedes-rental-hyderabad" style={{ color: '#ffb907', fontSize: '13px', fontWeight: 600, display: 'inline-block', marginTop: '4px' }}>View Mercedes Details →</Link>
              </div>

              <div style={{ paddingTop: '16px', borderTop: '1px solid #f1f5f9', marginTop: '16px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#191c20' }}>BMW 5 &amp; 7 Series</h4>
                <p style={{ fontSize: '13px', color: '#60656d', margin: 0 }}>Tariff on Request • Chauffeur &amp; Self-Drive Options</p>
                <Link href="/bmw-rental-hyderabad" style={{ color: '#ffb907', fontSize: '13px', fontWeight: 600, display: 'inline-block', marginTop: '4px' }}>View BMW Details →</Link>
              </div>
            </div>

            {/* Quick Contact Card */}
            <div style={{ background: '#191c20', color: '#fff', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
              <span style={{ color: '#ffb907', fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>24/7 VIP CONCIERGE</span>
              <h3 style={{ fontSize: '19px', fontWeight: 800, marginTop: '8px', color: '#fff' }}>Need Custom Fleet Quotes?</h3>
              <p style={{ fontSize: '13px', color: '#9ca3af', margin: '8px 0 16px' }}>Weddings, film shoots, corporate retainers, or VIP delegations.</p>
              <a href="tel:+916300041186" style={{ background: '#ffb907', color: '#191c20', padding: '10px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>
                <i className="fa fa-phone" style={{ marginRight: 6 }} /> +91 6300041186
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive FAQ Section */}
      <FaqSection
        items={LUXURY_GUIDE_FAQS}
        title="Frequently Asked Questions — Luxury Car Rental in Hyderabad"
        subtitle="Key insights about booking luxury vehicles for weddings and VIP travel"
      />
    </>
  );
}