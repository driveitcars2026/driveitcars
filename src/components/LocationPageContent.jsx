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
                <span className="editorial-eyebrow">
                  Hyderabad Self-Drive &amp; Chauffeur Fleet
                </span>
                <h1>
                  {loc.h1Title}
                </h1>
                <p className="editorial-lead">
                  {loc.introParagraph1}
                </p>
                {loc.introParagraph2 && (
                  <p className="editorial-lead">
                    {loc.introParagraph2}
                  </p>
                )}
                {loc.introParagraph3 && (
                  <p className="editorial-lead">
                    {loc.introParagraph3}
                  </p>
                )}

                {/* Local Driving & Route Highlights Grid */}
                {loc.localHighlights && (
                  <div className="editorial-facts-box">
                    <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#191c20', marginBottom: '16px' }}>
                      {loc.name} Car Rental &amp; Route Quick Facts
                    </h2>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="editorial-fact-card">
                          <h3 className="editorial-fact-label">
                            RGIA Airport Distance
                          </h3>
                          <p className="editorial-fact-value">
                            {loc.localHighlights.airportDistance}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="editorial-fact-card">
                          <h3 className="editorial-fact-label">
                            Primary Corridors
                          </h3>
                          <p className="editorial-fact-value">
                            {loc.localHighlights.keyCorridors}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="editorial-fact-card">
                          <h3 className="editorial-fact-label">
                            Popular Models in {loc.name}
                          </h3>
                          <p className="editorial-fact-value">
                            {loc.localHighlights.popularCars}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="editorial-fact-card">
                          <h3 className="editorial-fact-label">
                            Recommended For
                          </h3>
                          <p className="editorial-fact-value">
                            {loc.localHighlights.idealFor}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Service Area Landmarks */}
                {loc.serviceAreas && loc.serviceAreas.length > 0 && (
                  <div style={{ marginTop: '20px', marginBottom: '24px' }}>
                    <span className="editorial-link-title">
                      Key Landmarks &amp; Delivery Points in {loc.name}
                    </span>
                    <div className="editorial-chip-row">
                      {loc.serviceAreas.map((area, idx) => (
                        <span
                          key={idx}
                          className="editorial-chip"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Related Specialized Hubs Cross-Links */}
                <div className="editorial-link-strip">
                  <span className="editorial-link-title">
                    Categories &amp; Rental Plans in {loc.name}
                  </span>
                  <div className="editorial-chip-row">
                    <Link href="/hatchback" className="editorial-chip">
                      Hatchbacks
                    </Link>
                    <Link href="/sedan" className="editorial-chip">
                      Sedans
                    </Link>
                    <Link href="/suv5" className="editorial-chip">
                      5-Seater SUVs
                    </Link>
                    <Link href="/suv7" className="editorial-chip">
                      7-Seater SUVs
                    </Link>
                    <Link href="/luxurycars" className="editorial-chip editorial-chip-dark">
                      Luxury Cars
                    </Link>
                    <Link href="/monthly-self-drive-cars-hyderabad" className="editorial-chip">
                      Monthly Car Rental
                    </Link>
                    <Link href="/weekly-self-drive-cars-hyderabad" className="editorial-chip">
                      Weekly Car Rental
                    </Link>
                    <Link href="/hyderabad-airport-car-rental" className="editorial-chip">
                      Airport Car Rental
                    </Link>
                    <Link href="/wedding-car-rental-hyderabad" className="editorial-chip">
                      Wedding Cars
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FLEET CARDS GRID ========== */}
      <section className="gauto-offers-area section_70">
        <div className="container">
          <div className="site-heading text-center">
            <span className="editorial-eyebrow">
              Sanitized Fleet in {loc.name}
            </span>
            <h2>
              Available Cars in {loc.name}
            </h2>
          </div>

          <div className="row">
            {cars.map((car, idx) => {
              const whatsappText = encodeURIComponent(
                `Hi DriveItCars, I am contacting you to enquire about booking the ${car.name} in ${loc.name}. Please share availability and rates.`
              );

              return (
                <div className="col-lg-4 col-md-6 mb-4" key={car.id || idx}>
                  <div className="single-offers">
                    <div className="offer-image" style={{ width: '100%', height: '195px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img
                        loading="lazy"
                        src={car.image || '/assets/img/cars/Swift.webp'}
                        alt={`${car.name} self drive car rental in ${loc.name} Hyderabad - DriveItCars`}
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                      />
                    </div>
                    <div className="offer-text" style={{ padding: '20px' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#191c20', margin: '0 0 10px' }}>
                        {car.name}
                      </h3>
                      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px', display: 'flex', gap: '14px', flexWrap: 'wrap', color: '#60656d', fontSize: '13px' }}>
                        <li><i className="fa fa-car" style={{ color: '#ffb907', marginRight: 5 }} /> {car.modelYear || '2023'}</li>
                        <li><i className="fa fa-users" style={{ color: '#ffb907', marginRight: 5 }} /> {car.seats || 5} Seater</li>
                        <li><i className="fa fa-cogs" style={{ color: '#ffb907', marginRight: 5 }} /> {car.transmission || 'Manual'}</li>
                        <li><i className="fa fa-tint" style={{ color: '#ffb907', marginRight: 5 }} /> {car.fuelType || 'Petrol'}</li>
                      </ul>
                      <div className="offer-action">
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
      <section className="section_70" style={{ background: '#ffffff' }}>
        <div className="container">
          <div className="row mb-4">
            <div className="col-lg-12">
              <h2 style={{ fontSize: '26px', fontWeight: 600, color: '#191c20', marginBottom: '12px' }}>
                Flexible Self Drive &amp; Chauffeur Rental Plans in {loc.name}
              </h2>
              <p className="editorial-lead" style={{ marginBottom: '22px' }}>
                DriveItCars structures every booking in {loc.name} around your schedule—whether you need an automatic hatchback for a 24-hour city trip, an outstation SUV, or a monthly rental plan.
              </p>
              <div className="row g-3">
                <div className="col-md-3 col-sm-6 mb-3">
                  <div className="editorial-fact-card">
                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#191c20', marginBottom: '6px' }}>
                      24-Hr Daily Self Drive
                    </h3>
                    <p style={{ fontSize: '13.5px', color: '#60656d', lineHeight: '1.6', marginBottom: '12px' }}>
                      Includes 300 km/day allowance, insurance coverage, and doorstep delivery in {loc.name}.
                    </p>
                    <Link href="/self-drive-car" style={{ fontSize: '13px', fontWeight: 600, color: '#191c20' }}>
                      View Daily Fleet &rarr;
                    </Link>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6 mb-3">
                  <div className="editorial-fact-card">
                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#191c20', marginBottom: '6px' }}>
                      Weekly 7-Day Plans
                    </h3>
                    <p style={{ fontSize: '13.5px', color: '#60656d', lineHeight: '1.6', marginBottom: '12px' }}>
                      Weekly rates for 7-day bookings in {loc.name}—suited for visiting families, projects, and road trips.
                    </p>
                    <Link href="/weekly-self-drive-cars-hyderabad" style={{ fontSize: '13px', fontWeight: 600, color: '#191c20' }}>
                      Explore Weekly Plans &rarr;
                    </Link>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6 mb-3">
                  <div className="editorial-fact-card">
                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#191c20', marginBottom: '6px' }}>
                      Monthly Subscriptions
                    </h3>
                    <p style={{ fontSize: '13.5px', color: '#60656d', lineHeight: '1.6', marginBottom: '12px' }}>
                      Routine maintenance included with competitive monthly rates for professionals and corporate teams in {loc.name}.
                    </p>
                    <Link href="/monthly-self-drive-cars-hyderabad" style={{ fontSize: '13px', fontWeight: 600, color: '#191c20' }}>
                      View Monthly Plans &rarr;
                    </Link>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6 mb-3">
                  <div className="editorial-fact-card">
                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#191c20', marginBottom: '6px' }}>
                      {loc.name} to RGIA Airport
                    </h3>
                    <p style={{ fontSize: '13.5px', color: '#60656d', lineHeight: '1.6', marginBottom: '12px' }}>
                      Pick up in {loc.name} and drop at Shamshabad Airport (or vice versa) with 24/7 terminal handover.
                    </p>
                    <Link href="/hyderabad-airport-car-rental" style={{ fontSize: '13px', fontWeight: 600, color: '#191c20' }}>
                      Airport Car Rental &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {loc.nearbyLocations && loc.nearbyLocations.length > 0 && (
            <div className="editorial-hubs-band">
              <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#ffffff', marginBottom: '8px' }}>
                Nearby DriveItCars Delivery Hubs Around {loc.name}
              </h2>
              <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '18px' }}>
                Looking for doorstep car delivery in adjacent neighborhoods near {loc.name}? Browse nearby Hyderabad hubs:
              </p>
              <div className="row g-3">
                {loc.nearbyLocations.map((near) => (
                  <div className="col-lg-4 col-md-6 mb-2" key={near.slug}>
                    <Link
                      href={`/${near.slug}`}
                      className="editorial-hub-link"
                    >
                      <strong style={{ display: 'block', fontSize: '14px', color: '#ffb907', marginBottom: '2px' }}>
                        Self Drive Cars in {near.name} &rarr;
                      </strong>
                      <span style={{ fontSize: '12px', color: '#d1d5db' }}>
                        Serving {near.corridor} &amp; nearby areas
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
