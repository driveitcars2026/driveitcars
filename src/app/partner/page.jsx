import SeoSchema, { buildBreadcrumbSchema } from '@/components/SeoSchema';
export const metadata = {
  title: 'Attach Car for Rent in Hyderabad | Partner | DriveItCars',
  description:
    'Partner with DriveItCars in Hyderabad to lease your idle hatchback, sedan, or SUV. Earn guaranteed monthly rental income with verified customer bookings.',
  alternates: {
    canonical: 'https://www.driveitcars.in/partner',
  },
  openGraph: {
    title: 'Attach Car for Rent in Hyderabad | Partner | DriveItCars',
    description:
      'Attach your hatchback, sedan, or SUV with DriveItCars in Hyderabad and earn guaranteed monthly rental income.',
    url: 'https://www.driveitcars.in/partner',
    siteName: 'DriveItCars',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://www.driveitcars.in/suv.webp',
        width: 1200,
        height: 630,
        alt: 'Partner With DriveItCars Hyderabad — Attach Your Car',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Attach Car for Rent in Hyderabad | Partner | DriveItCars',
    description:
      'Lease your idle car with DriveItCars in Hyderabad for steady monthly income.',
    images: ['https://www.driveitcars.in/suv.webp'],
  },
};

export default function partnerPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Partner With DriveItCars', url: '/partner' },
  ]);

  return (
    <>
      <SeoSchema schema={breadcrumbSchema} />
      <section className="gauto-breadcromb-area section_70">
         <div className="container">
            <div className="row">
               <div className="col-md-12">
                  <div className="breadcromb-box">
                     <h1>Partner With Us</h1>
                     <ul>
                        <li><i className="fa fa-home"></i></li>
                        <li><a href="/">Home</a></li>
                        <li><i className="fa fa-angle-right"></i></li>
                        <li>Partner With Us</li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </section>
      {/* Breadcromb Area End */}
       
       
      {/* Login Area Start */}
      <section className="gauto-login-area section_70">
         <div className="container">
            <div className="row">
               <div className="col-md-7">
                  <div className="">
                     <div className="login-page-heading">
                       
                        <h2>In partner with us</h2>
                     </div>
                  <p>DriveItCars IS A BOOKING PLATFORM ENABLES AND FACILITATES THE USERS TO LIST AND LEASE VEHICLES DIRECTLY WITH ONE ANOTHER AS PER THE THE <span className="cstmp1">TERMS AND CONDITIONS</span> OF THE DriveItCars POLICIES ON THIS PLATFORM WE DOENS NOT SELL, HIRE, MANAGE AND CONTROL THE VEHICLES. </p>
                  <p>WE PROVIDE PLATFORM FOR THE LESSOR OR LESSEE TO GET BENEFIT FROM THIS PLATFORM FOR THEIR USE. WE REDUCE THE BURDEN OF THE VEHICLES EMI OF THE VEHICLES OWNERS, WE PROVIDE THEM BOOKING HOURLY/DAILY &amp; MONTHLY BY THEIR CHOICE. </p>
                  </div>
               </div>
            
			<div className="col-md-5">
                  <div className="partner-inquiry-panel">
                     <div className="login-page-heading">
                       
                        <h2>Partner With Us</h2>
                     </div>
                     <form action="#" method="post">
  <div className="form-group">
    <input type="text" name="fname" className="form-control" placeholder="Name" required />
  </div>
  <div className="form-group">
    
    <input type="number" name="phone" className="form-control" placeholder="Phone" required />
  </div>
  
  <div className="form-group">
    
    <input type="text" name="carname" className="form-control" placeholder="Car name" required />
  </div>
   <div className="form-group">
    
    <input type="text" name="carmodel" className="form-control" placeholder="Car model" required />
  </div>
   <div className="form-group">
    
    <input type="text" name="km" className="form-control" placeholder="KM" required />
  </div>
  <div className="form-group">
    
    <textarea placeholder="Write here your message" name="message" className="form-control" spellCheck="false"></textarea>
  </div>
  
  
 
  <button type="submit" value="submit" className="btn btn-warning btn-block mybtn">Submit</button>
 
</form>
                        </div>
                  </div>
               </div>
            </div>
      </section>
      {/* Login Area End */}
       
       
      
	  
      {/* Footer Area Start */}
    </>
  );
}
