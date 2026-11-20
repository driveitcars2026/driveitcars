import Link from 'next/link';
import FaqSection from '@/components/FaqSection';
import { getLocationData } from '@/sanity/lib/locations';
import { getCarsForPage } from '@/sanity/lib/cars';
import SeoSchema, {
  buildCarRentalSchema,
  buildFaqSchema,
  buildBreadcrumbSchema,
} from '@/components/SeoSchema';

export default async function LocationPageContent({ slug }) {
  const loc = await getLocationData(slug);
  const cars = await getCarsForPage(slug, null, 'self-drive-car');
  const cleanSlug = slug.replace(/-luxury-car-rental$/, '');
  const pageUrl = `https://www.driveitcars.in/${cleanSlug}`;

  const rentalSchema = buildCarRentalSchema({
    name: `DriveItCars Self Drive Cars ${loc.name} Hyderabad`,
    description:
      loc.seoDescription ||
      `Rent self drive cars in ${loc.name}, Hyderabad with DriveItCars. Sanitized hatchbacks, sedans & SUVs with fast doorstep delivery.`,
    url: pageUrl,
    areaServed: [loc.name, ...(loc.serviceAreas || []), 'Hyderabad', 'Telangana'],
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Self Drive Cars', url: '/self-drive-car' },
    { name: `${loc.name}`, url: `/${cleanSlug}` },
  ]);

  const faqSchema = buildFaqSchema(loc.customFaqs);

  return (
    <>
      <SeoSchema schema={rentalSchema} />
      <SeoSchema schema={breadcrumbSchema} />
      {faqSchema && <SeoSchema schema={faqSchema} />}

      {/* ========== BREADCRUMB ========== */}
      <section className="gauto-breadcromb-area section_70">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="breadcromb-box">
                <p className="breadcromb-title">{loc.name} Car Rentals</p>
                <ul>
                  <li><i className="fa fa-home" /></li>
                  <li><Link href="/">Home</Link></li>
                  <li><i className="fa fa-angle-right" /></li>
                  <li>{loc.name}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== ABOUT LOCATION SECTION ========== */}
      <section className="about-page-area section_70">
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
                  ✦ 24/7 SELF DRIVE &amp; LUXURY CAR RENTALS BY DRIVEITCARS
                </span>
                <h1 style={{ color: '#ffb907', fontSize: '32px', fontWeight: 800, marginBottom: '20px' }}>
                  {loc.h1Title}
                </h1>
                <p style={{ textAlign: 'justify', fontSize: '15px', lineHeight: '1.8', color: '#4b5563', marginBottom: '16px' }}>
                  {loc.introParagraph1}
                </p>
                {loc.introParagraph2 && (
                  <p style={{ textAlign: 'justify', fontSize: '15px', lineHeight: '1.8', color: '#4b5563', marginBottom: '16px' }}>
                    {loc.introParagraph2}
                  </p>
                )}
                {loc.introParagraph3 && (
                  <p style={{ textAlign: 'justify', fontSize: '15px', lineHeight: '1.8', color: '#4b5563', marginBottom: '20px' }}>
                    {loc.introParagraph3}
                  </p>
                )}

                {/* Local Driving & Route Highlights Grid */}
                {loc.localHighlights && (
                  <div style={{ marginTop: '24px', marginBottom: '28px', padding: '24px', background: '#f8fafc', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>
                      {loc.name} Car Rental &amp; Route Quick Facts
                    </h2>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <div style={{ background: '#ffffff', padding: '14px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', height: '100%' }}>
                          <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#d49500', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '4px' }}>
                            ✈️ RGIA Airport Distance &amp; Route
                          </h3>
                          <p style={{ fontSize: '14px', color: '#334155', margin: 0, fontWeight: 600 }}>
                            {loc.localHighlights.airportDistance}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div style={{ background: '#ffffff', padding: '14px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', height: '100%' }}>
                          <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#d49500', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '4px' }}>
                            🛣️ Primary Corridors &amp; Transit Access
                          </h3>
                          <p style={{ fontSize: '14px', color: '#334155', margin: 0, fontWeight: 600 }}>
                            {loc.localHighlights.keyCorridors}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div style={{ background: '#ffffff', padding: '14px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', height: '100%' }}>
                          <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#d49500', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '4px' }}>
                            🚗 Top Booked Models in {loc.name}
                          </h3>
                          <p style={{ fontSize: '14px', color: '#334155', margin: 0, fontWeight: 600 }}>
                            {loc.localHighlights.popularCars}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div style={{ background: '#ffffff', padding: '14px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', height: '100%' }}>
                          <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#d49500', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '4px' }}>
                            ⭐ Best Suited For
                          </h3>
                          <p style={{ fontSize: '14px', color: '#334155', margin: 0, fontWeight: 600 }}>
                            {loc.localHighlights.idealFor}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Service Area Landmarks */}
                {loc.serviceAreas && loc.serviceAreas.length > 0 && (
                  <div style={{ marginTop: '15px', marginBottom: '25px' }}>
                    <strong style={{ fontSize: '13px', color: '#111827', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>
                      📍 Prominent Landmarks &amp; Delivery Points in {loc.name}:
                    </strong>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {loc.serviceAreas.map((area, idx) => (
                        <span
                          key={idx}
                          style={{
                            background: '#f1f5f9',
                            color: '#334155',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: 600,
                            border: '1px solid #e2e8f0',
                          }}
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Related Specialized Hubs Cross-Links */}
                <div style={{ marginTop: '20px', padding: '16px 20px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.8px', display: 'block', marginBottom: '10px' }}>
                    ✦ Explore DriveItCars Categories &amp; Plans in {loc.name}:
                  </span>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <Link href="/hatchback" style={{ background: '#ffffff', color: '#0f172a', padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, border: '1px solid #cbd5e1' }}>
                      🚗 Hatchbacks
                    </Link>
                    <Link href="/sedan" style={{ background: '#ffffff', color: '#0f172a', padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, border: '1px solid #cbd5e1' }}>
                      🚘 Sedans
                    </Link>
                    <Link href="/suv5" style={{ background: '#ffffff', color: '#0f172a', padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, border: '1px solid #cbd5e1' }}>
                      🚙 5-Seater SUVs
                    </Link>
                    <Link href="/suv7" style={{ background: '#ffffff', color: '#0f172a', padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, border: '1px solid #cbd5e1' }}>
                      🚐 7-Seater SUVs
                    </Link>
                    <Link href="/luxurycars" style={{ background: '#0f172a', color: '#ffb907', padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}>
                      ✨ Luxury Cars
                    </Link>
                    <Link href="/monthly-self-drive-cars-hyderabad" style={{ background: '#ffffff', color: '#0f172a', padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, border: '1px solid #cbd5e1' }}>
                      📅 Monthly Car Rental
                    </Link>
                    <Link href="/weekly-self-drive-cars-hyderabad" style={{ background: '#ffffff', color: '#0f172a', padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, border: '1px solid #cbd5e1' }}>
                      ⚡ Weekly Car Rental
                    </Link>
                    <Link href="/hyderabad-airport-car-rental" style={{ background: '#ffffff', color: '#0f172a', padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, border: '1px solid #cbd5e1' }}>
                      ✈️ Airport Car Rental
                    </Link>
                    <Link href="/wedding-car-rental-hyderabad" style={{ background: '#ffffff', color: '#0f172a', padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, border: '1px solid #cbd5e1' }}>
                      💍 Wedding Cars
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FLEET CARDS GRID ========== */}
      <section className="gauto-offers-area section_70" style={{ background: '#f8fafc', paddingTop: '40px' }}>
        <div className="container">
          <div className="site-heading text-center" style={{ marginBottom: '35px' }}>
            <span
              style={{
                color: '#ffb907',
                fontWeight: 700,
                fontSize: '13px',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                display: 'inline-block',
                marginBottom: '6px',
              }}
            >
              Sanitized Fleet in {loc.name}
            </span>
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#111827' }}>
              DriveItCars Available Cars in {loc.name}
            </h2>
          </div>

          <div className="row">
            {cars.map((car, idx) => {
              const whatsappText = encodeURIComponent(
                `Hi DriveItCars, I am contacting you to enquire about booking the ${car.name} in ${loc.name}. Please share availability and rates.`
              );

              return (
                <div className="col-lg-4 col-md-6 mb-4" key={car.id || idx}>
                  <div className="single-offers" style={{ background: '#ffffff', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                    <div className="offer-image" style={{ width: '100%', height: '195px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img
                        loading="lazy"
                        src={car.image || '/assets/img/cars/Swift.webp'}
                        alt={`${car.name} self drive car rental in ${loc.name} Hyderabad - DriveItCars`}
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                      />
                    </div>
                    <div className="offer-text" style={{ padding: '20px' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111827', margin: '0 0 10px' }}>
                        {car.name}
                      </h3>
                      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px', display: 'flex', gap: '14px', flexWrap: 'wrap', color: '#6b7280', fontSize: '13px' }}>
                        <li><i className="fa fa-car" style={{ color: '#ffb907', marginRight: 5 }} /> {car.modelYear || '2023'}</li>
                        <li><i className="fa fa-users" style={{ color: '#ffb907', marginRight: 5 }} /> {car.seats || 5} Seater</li>
                        <li><i className="fa fa-cogs" style={{ color: '#ffb907', marginRight: 5 }} /> {car.transmission || 'Manual'}</li>
                        <li><i className="fa fa-gas-pump" style={{ color: '#ffb907', marginRight: 5 }} /> {car.fuelType || 'Petrol'}</li>
                      </ul>
                      <div className="offer-action" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                        <a href="tel:+916300041186" className="offer-btn-1">
                          <i className="fa fa-phone" /> Enquire Now
                        </a>
                        <a
                          href={`https://api.whatsapp.com/send?phone=+916300041186&text=${whatsappText}`}
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

      {/* ========== PROGRAMMATIC RENTAL PACKAGES & NEARBY HUBS MESH ========== */}
      <section className="section_70" style={{ background: '#ffffff', paddingTop: '50px', paddingBottom: '40px' }}>
        <div className="container">
          <div className="row mb-4">
            <div className="col-lg-12">
              <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
                Flexible Self Drive &amp; Chauffeur Rental Plans in {loc.name}
              </h2>
              <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.7', marginBottom: '22px' }}>
                DriveItCars structures every booking in {loc.name} around your exact schedule—whether you need a compact automatic hatchback for a 24-hour city errand, an outstation SUV for a weekend road trip, or a long-term monthly subscription.
              </p>
              <div className="row g-3">
                <div className="col-md-3 col-sm-6 mb-3">
                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '18px', height: '100%' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
                      24-Hr Daily Self Drive
                    </h3>
                    <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6', marginBottom: '10px' }}>
                      Includes 300 km/day allowance, comprehensive insurance, and 15–20 min doorstep delivery in {loc.name}.
                    </p>
                    <Link href="/self-drive-car" style={{ fontSize: '13px', fontWeight: 700, color: '#d49500' }}>
                      View Daily Fleet &rarr;
                    </Link>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6 mb-3">
                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '18px', height: '100%' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
                      Weekly 7-Day Plans
                    </h3>
                    <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6', marginBottom: '10px' }}>
                      Save up to 25% on 7-day bookings in {loc.name}—ideal for visiting NRI families, business projects, and road trips.
                    </p>
                    <Link href="/weekly-self-drive-cars-hyderabad" style={{ fontSize: '13px', fontWeight: 700, color: '#d49500' }}>
                      Explore Weekly Plans &rarr;
                    </Link>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6 mb-3">
                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '18px', height: '100%' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
                      Monthly Subscriptions
                    </h3>
                    <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6', marginBottom: '10px' }}>
                      Zero maintenance, zero down payment, and up to 50% off daily tariffs for professionals and corporate teams in {loc.name}.
                    </p>
                    <Link href="/monthly-self-drive-cars-hyderabad" style={{ fontSize: '13px', fontWeight: 700, color: '#d49500' }}>
                      View Monthly Rates &rarr;
                    </Link>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6 mb-3">
                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '18px', height: '100%' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
                      {loc.name} to RGIA Airport
                    </h3>
                    <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6', marginBottom: '10px' }}>
                      Pick up in {loc.name} and drop at Shamshabad Airport (or vice versa) with 24/7 terminal parking handover.
                    </p>
                    <Link href="/hyderabad-airport-car-rental" style={{ fontSize: '13px', fontWeight: 700, color: '#d49500' }}>
                      Airport Car Rental &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {loc.nearbyLocations && loc.nearbyLocations.length > 0 && (
            <div style={{ background: '#0f172a', borderRadius: '16px', padding: '28px', marginTop: '10px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
                Nearby DriveItCars Delivery Hubs Around {loc.name}
              </h2>
              <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '18px' }}>
                Also looking for doorstep self-drive car delivery in adjacent neighborhoods near {loc.name}? Explore our nearby Hyderabad hubs:
              </p>
              <div className="row g-3">
                {loc.nearbyLocations.map((near) => (
                  <div className="col-lg-4 col-md-6 mb-2" key={near.slug}>
                    <Link
                      href={`/${near.slug}`}
                      style={{
                        display: 'block',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: '10px',
                        padding: '12px 16px',
                        color: '#ffffff',
                        textDecoration: 'none',
                      }}
                    >
                      <strong style={{ display: 'block', fontSize: '14px', color: '#ffb907', marginBottom: '2px' }}>
                        Self Drive Cars in {near.name} &rarr;
                      </strong>
                      <span style={{ fontSize: '12px', color: '#cbd5e1' }}>
                        Serving {near.corridor} &amp; nearby lanes
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========== FAQ SECTION ========== */}
      <FaqSection
        items={loc.customFaqs}
        title={`Frequently Asked Questions — ${loc.name}`}
        subtitle={`Everything you need to know about DriveItCars self drive & luxury car rentals in ${loc.name}`}
      />
    </>
  );
}
