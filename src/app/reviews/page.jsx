import Link from 'next/link';
import FaqSection from '@/components/FaqSection';
import SeoSchema, {
  buildCarRentalSchema,
  buildBreadcrumbSchema,
} from '@/components/SeoSchema';

export const metadata = {
  title: 'DriveItCars Reviews Hyderabad | 4.9★ Verified Ratings',
  description:
    'Read verified Google reviews for DriveItCars Hyderabad. Rated 4.9/5 by 1,240+ customers for sanitized self-drive cars, airport drops & fast refunds.',
  keywords:
    'driveitcars reviews, driveitcars hyderabad reviews, best self drive car rental hyderabad reviews, car rental ratings hyderabad',
  alternates: {
    canonical: 'https://www.driveitcars.in/reviews',
  },
  openGraph: {
    title: 'DriveItCars Reviews Hyderabad | 4.9★ Verified Customer Ratings',
    description:
      'Discover why 1,240+ customers rate DriveItCars 4.9/5 in Hyderabad for self-drive cars, luxury wedding cars & 24/7 RGIA airport rentals.',
    url: 'https://www.driveitcars.in/reviews',
    siteName: 'DriveItCars',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://www.driveitcars.in/suv.webp',
        width: 1200,
        height: 630,
        alt: 'DriveItCars Hyderabad Customer Reviews',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DriveItCars Reviews Hyderabad | 4.9★ Customer Ratings',
    description:
      'Read verified customer experiences with DriveItCars self-drive & luxury car rentals in Hyderabad.',
    images: ['https://www.driveitcars.in/suv.webp'],
  },
};

const REVIEWS = [
  {
    name: 'Vikramjit D.',
    date: 'a month ago',
    initial: 'V',
    color: '#004d40',
    text: 'I booked a car from DriveItCars and I am genuinely satisfied with their service. The vehicle was clean, well-maintained, and the Masab Tank team handled handover and deposit return smoothly.',
  },
  {
    name: 'Akram M.',
    date: '5 months ago',
    initial: 'A',
    color: '#ad1457',
    text: 'Great service! I took a self-drive car for 2 days in Hyderabad. The car was in top mechanical condition, pricing was transparent, and I highly recommend DriveItCars.',
  },
  {
    name: 'Syed Adnan Quadri',
    date: '2 months ago',
    initial: 'S',
    color: '#3e2723',
    text: 'One of the best car rental services in Hyderabad. Very cooperative staff, well-maintained cars, and fair tariffs compared to apps.',
  },
  {
    name: 'Amair Khan',
    date: '4 months ago',
    initial: 'A',
    color: '#d84315',
    text: 'Best self drive car rental experience in Hyderabad. Quick 10-minute WhatsApp KYC verification and on-time doorstep delivery.',
  },
  {
    name: 'Maaz Bin',
    date: '5 months ago',
    initial: 'M',
    color: '#3e2723',
    text: 'Booked an SUV for a family trip. The car was spotless, AC worked great, and the security deposit was refunded right on schedule.',
  },
  {
    name: 'Imran',
    date: '3 months ago',
    initial: 'I',
    color: '#3e2723',
    text: 'Very reasonable prices and prompt customer support. Picked up a Swift Automatic for HITEC City commuting and had zero issues.',
  },
  {
    name: 'Khaja Qutubuddin',
    date: '6 months ago',
    initial: 'K',
    color: '#ad1457',
    text: 'Awesome service by DriveItCars. Their luxury and self-drive fleet in Masab Tank and Banjara Hills is truly showroom condition.',
  },
  {
    name: 'Ayaan',
    date: '5 months ago',
    initial: 'A',
    color: '#ad1457',
    text: 'Friendly staff, clean interiors, and reliable airport pickup at RGIA Shamshabad. Will definitely book with DriveItCars again!',
  },
];

export default function ReviewsPage() {
  const rentalSchema = {
    ...buildCarRentalSchema({
      name: 'DriveItCars — Self Drive & Luxury Car Rental Hyderabad',
      description:
        'Rated 4.9/5 by 1,240+ verified customers in Hyderabad for self-drive hatchbacks, sedans, SUVs, luxury wedding cars, and 24/7 RGIA airport transfers.',
      url: 'https://www.driveitcars.in/reviews',
    }),
    review: REVIEWS.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.name },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: r.text,
    })),
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'DriveItCars Customer Reviews', url: '/reviews' },
  ]);

  return (
    <>
      <SeoSchema schema={rentalSchema} />
      <SeoSchema schema={breadcrumbSchema} />

      <section className="gauto-breadcromb-area section_70">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="breadcromb-box">
                <h1 className="breadcromb-title">DriveItCars Customer Reviews — Hyderabad</h1>
                <ul>
                  <li><i className="fa fa-home" /></li>
                  <li><Link href="/">Home</Link></li>
                  <li><i className="fa fa-angle-right" /></li>
                  <li>Reviews</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container my-5">
        <div className="text-center mb-4">
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
              marginBottom: '10px',
            }}
          >
            ✦ 4.9 / 5.0 AVERAGE RATING • 1,240+ VERIFIED RENTERS
          </span>
          <h2 style={{ fontSize: '30px', fontWeight: 800, color: '#0f172a' }}>
            What Renters Say About DriveItCars Hyderabad
          </h2>
          <p style={{ color: '#475569', maxWidth: '680px', margin: '8px auto 0', fontSize: '15px' }}>
            From IT commuters in <Link href="/hitech-city" style={{ color: '#d49500', fontWeight: 700 }}>HITEC City</Link> and <Link href="/gachibowli" style={{ color: '#d49500', fontWeight: 700 }}>Gachibowli</Link> to NRI families landing at <Link href="/hyderabad-airport-car-rental" style={{ color: '#d49500', fontWeight: 700 }}>RGIA Airport</Link>, read real customer feedback on our fleet cleanliness, punctuality, and deposit transparency.
          </p>
        </div>

        <div className="row g-4">
          {REVIEWS.map((rev) => (
            <div className="col-12 col-sm-6 col-lg-3 mb-4" key={rev.name}>
              <div className="review-card h-100">
                <div className="d-flex align-items-center mb-2">
                  <div className="profile-initial" style={{ backgroundColor: rev.color }}>
                    {rev.initial}
                  </div>
                  <div className="ms-2 flex-grow-1" style={{ marginLeft: '10px' }}>
                    <h3 className="mb-0 fw-bold" style={{ fontSize: '16px' }}>
                      {rev.name}
                    </h3>
                    <small className="text-muted">{rev.date}</small>
                  </div>
                  <img
                    loading="lazy"
                    src="/assets/img/google-icon.svg"
                    width="20"
                    height="20"
                    alt={`Verified Google Review for DriveItCars Hyderabad by ${rev.name}`}
                  />
                </div>
                <div className="mb-2">
                  <span className="star-rating">★★★★★</span>
                  <span className="verified-icon">✔</span>
                </div>
                <p className="mb-0 text-muted" style={{ fontSize: '0.9rem' }}>
                  {rev.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FaqSection />
    </>
  );
}
