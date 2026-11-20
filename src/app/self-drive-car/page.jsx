import Link from 'next/link';
import FaqSection from '@/components/FaqSection';
import SelfDriveFleetTabs from './SelfDriveFleetTabs';
import SeoSchema, {
   buildCarRentalSchema,
   buildFaqSchema,
   buildBreadcrumbSchema,
} from '@/components/SeoSchema';

export const metadata = {
   title: 'Self Drive Cars in Hyderabad | 28+ Models | DriveItCars',
   description:
      'Book self drive cars in Hyderabad with DriveItCars. 28+ manual & automatic hatchbacks, sedans & SUVs with 30-min doorstep delivery across 26+ HYD hubs.',
   alternates: {
      canonical: 'https://www.driveitcars.in/self-drive-car',
   },
   openGraph: {
      title: 'Self Drive Cars in Hyderabad | Unlimited KMs | DriveItCars',
      description:
         'Rent sanitized self drive cars in Hyderabad with refundable security deposit & doorstep delivery. Hatchbacks, sedans, 5 & 7 seater SUVs, and luxury cars.',
      url: 'https://www.driveitcars.in/self-drive-car',
      siteName: 'DriveItCars Hyderabad',
      locale: 'en_IN',
      type: 'website',
      images: [
         {
            url: 'https://www.driveitcars.in/suv.webp',
            width: 1200,
            height: 630,
            alt: 'Self Drive Cars Hyderabad',
         },
      ],
   },
   twitter: {
      card: 'summary_large_image',
      title: 'Self Drive Cars in Hyderabad | Unlimited KMs | DriveItCars',
      description: 'Best self drive car rental in Hyderabad with Refundable Deposit, Unlimited KMs, and 24/7 delivery across 31 hubs.',
   },
};

const SELF_DRIVE_FAQS = [
   {
      question: 'How do I book self drive cars in Hyderabad with DriveItCars?',
      answer:
         'Booking a self drive car in Hyderabad is 100% digital and takes under 5 minutes. Select your preferred hatchback, sedan, or SUV on our website, or contact us directly on WhatsApp (+91 6300041186). Submit your driving licence and Aadhaar card for instant digital verification, and we deliver the sanitized car to your doorstep anywhere in Hyderabad.',
   },
   {
      question: 'Where can I get doorstep delivery of self drive cars in Hyderabad?',
      answer:
         'We provide 15 to 30-minute doorstep delivery across all major Hyderabad zones including HITEC City, Gachibowli, Madhapur, Kondapur, Banjara Hills, Jubilee Hills, Begumpet, Secunderabad, Kukatpally, and Rajiv Gandhi International Airport (RGIA Shamshabad).',
   },
   {
      question: 'What is the security deposit for renting self drive cars in Hyderabad?',
      answer:
         'DriveItCars requires a refundable security deposit for self-drive rentals as per rental terms. The deposit is returned within 24 to 48 hours of vehicle drop-off following standard inspection and FASTag reconciliation.',
   },
   {
      question: 'Are self drive SUVs available for outstation and highway road trips?',
      answer:
         'Yes! All DriveItCars self drive cars come with All-India Tourist Permits and FASTag. Our popular self drive SUVs including Mahindra Thar 4x4, Hyundai Creta, Toyota Innova Crysta, and Toyota Fortuner Legender are equipped for highway journeys to Srisailam, Araku, Goa, and Tirupati.',
   },
   {
      question: 'Do you offer monthly and weekend self drive car rental plans?',
      answer:
         'Yes, we offer specialized Weekend Self Drive packages (Friday evening to Monday morning) and flexible Monthly Self Drive Subscriptions with discounts up to 45% off daily rental rates.',
   },
];

export default function selfDriveCarPage() {
   const rentalSchema = buildCarRentalSchema({
      name: 'DriveItCars Self Drive Cars Hyderabad',
      description:
         'Book self drive cars in Hyderabad with DriveItCars. Hatchbacks, sedans, SUVs & luxury cars with doorstep delivery, Security Deposit, and best customized rates.',
      url: 'https://www.driveitcars.in/self-drive-car',
      areaServed: [
         'Hyderabad',
         'HITEC City',
         'Gachibowli',
         'Madhapur',
         'Kondapur',
         'Banjara Hills',
         'Jubilee Hills',
         'Secunderabad',
         'Kukatpally',
         'Telangana',
      ],
   });

   const breadcrumbSchema = buildBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Self Drive Cars in Hyderabad', url: '/self-drive-car' },
   ]);

   const faqSchema = buildFaqSchema(SELF_DRIVE_FAQS);

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
                        <p className="breadcromb-title">Self Drive Cars</p>
                        <ul>
                           <li><i className="fa fa-home"></i></li>
                           <li><a href="/">Home</a></li>
                           <li><i className="fa fa-angle-right"></i></li>
                           <li>Self Drive Cars</li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         {/* Breadcromb Area End */}


         {/* About Page Area Start */}
         <section className="about-page-area section_70">
            <div className="container">
               <div className="row">
                  <div className="col-lg-12">
                     <div className="about-page-left">
                        <span className="editorial-eyebrow">
                           Hyderabad Self-Drive Fleet
                        </span>
                        <h1>
                           Self-Drive Cars in Hyderabad
                        </h1>
                        <p className="editorial-lead">
                           DriveItCars provides well-maintained, sanitized self-drive cars across Hyderabad without driver interference. Choose from fuel-efficient hatchbacks (Swift, Baleno), executive sedans (Dzire, Verna), 5 &amp; 7-seater SUVs (Creta, Thar 4x4, Innova Crysta, Fortuner), and luxury models (BMW, Audi, Range Rover Evoque).
                        </p>
                        <p className="editorial-lead">
                           Whether you need a car for daily office commutes in HITEC City or Gachibowli, a weekend trip to Srisailam or Ananthagiri Hills, or a monthly car subscription, DriveItCars offers digital KYC verification, clear fuel terms, FASTag-equipped vehicles, and 24/7 roadside assistance.
                        </p>

                        {/* Popular Search Category & Locality Clusters */}
                        <div className="editorial-link-strip">
                           <span className="editorial-link-title">
                              Self-Drive Categories &amp; Delivery Hubs
                           </span>
                           <div className="editorial-chip-row">
                              <Link href="/self-drive-suv-hyderabad" className="editorial-chip">
                                 Self Drive SUV Hyderabad
                              </Link>
                              <Link href="/luxurycars" className="editorial-chip">
                                 Luxury Self Drive Cars
                              </Link>
                              <Link href="/weekend-self-drive-cars-hyderabad" className="editorial-chip">
                                 Weekend Self Drive Cars
                              </Link>
                              <Link href="/weekly-self-drive-cars-hyderabad" className="editorial-chip">
                                 Weekly Self Drive Cars
                              </Link>
                              <Link href="/monthly-self-drive-cars-hyderabad" className="editorial-chip">
                                 Monthly Self Drive Cars
                              </Link>
                              <Link href="/corporate-car-rental-hyderabad" className="editorial-chip editorial-chip-dark">
                                 Corporate Car Rental
                              </Link>
                              <Link href="/hyderabad-airport-car-rental" className="editorial-chip">
                                 Hyderabad Airport Car Rental
                              </Link>
                              <Link href="/hitech-city" className="editorial-chip">
                                 HITEC City
                              </Link>
                              <Link href="/gachibowli" className="editorial-chip">
                                 Gachibowli
                              </Link>
                              <Link href="/madhapur" className="editorial-chip">
                                 Madhapur
                              </Link>
                              <Link href="/kondapur" className="editorial-chip">
                                 Kondapur
                              </Link>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         {/* About Page Area End */}
         {/* lux Area End */}
         {/* Offers Area Start */}
         <section className="gauto-offers-area section_70" id="self">
            <div className="container">
               <div className="row">
                  <div className="col-md-12">

                     <div className="site-heading">

                        <h2>Self Drive Cars </h2>
                     </div>
                  </div>
               </div>
               <div className="row">
                  <div className="col-md-12">
                     <SelfDriveFleetTabs />
                  </div>
               </div>
            </div>
         </section>
         {/* Offers Area End */}
         {/* Offers Area Start */}

         <FaqSection items={SELF_DRIVE_FAQS} title="Frequently Asked Questions — Self Drive Cars in Hyderabad" subtitle="Everything you need to know about renting self drive hatchbacks, sedans & SUVs with DriveItCars" />
         {/* Service Details Page End */}

         {/* Footer Area Start */}
      </>
   );
}
