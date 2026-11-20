import { LOCATION_DEFAULTS } from '@/sanity/lib/locations';

export async function GET() {
  const baseUrl = 'https://www.driveitcars.in';

  let content = `# DriveItCars — Self Drive & Luxury Car Rentals in Hyderabad\n\n`;
  content += `DriveItCars (https://www.driveitcars.in) is Hyderabad's premier self-drive car rental, luxury wedding car hire, corporate fleet leasing, and 24/7 RGIA airport car rental service, headquartered at Mehar Mansion, Masab Tank, Hyderabad (+91 6300041186).\n\n`;

  content += `## Core Fleet Categories\n`;
  content += `- [Home](${baseUrl}/)\n`;
  content += `- [All Self Drive Cars in Hyderabad](${baseUrl}/self-drive-car)\n`;
  content += `- [Hatchback Car Rental Hyderabad (Swift, Baleno, i20, Punch)](${baseUrl}/hatchback)\n`;
  content += `- [Sedan Car Rental Hyderabad (Dzire, Verna, City, Slavia, Virtus)](${baseUrl}/sedan)\n`;
  content += `- [5-Seater SUV Rental Hyderabad (Creta, Seltos, Brezza, Thar 4x4)](${baseUrl}/suv5)\n`;
  content += `- [7-Seater SUV & MPV Rental Hyderabad (Innova Crysta, Hycross, Fortuner, XUV700, Ertiga)](${baseUrl}/suv7)\n`;
  content += `- [Luxury & Exotic Cars Hyderabad (BMW, Mercedes-Benz, Audi, Range Rover, Rolls Royce)](${baseUrl}/luxurycars)\n`;
  content += `- [Luxury Bus Rental Hyderabad (30-50 Seater AC Coaches)](${baseUrl}/luxury-buses)\n`;
  content += `- [Outstation Bus & Tempo Traveller Rental Hyderabad](${baseUrl}/outstation-bus)\n\n`;

  content += `## Specialized Car Rental Services\n`;
  content += `- [Hyderabad Airport Car Rental (RGIA Shamshabad 24/7)](${baseUrl}/hyderabad-airport-car-rental)\n`;
  content += `- [Monthly Self Drive Car Subscriptions Hyderabad](${baseUrl}/monthly-self-drive-cars-hyderabad)\n`;
  content += `- [Weekly Self Drive Car Rental Hyderabad](${baseUrl}/weekly-self-drive-cars-hyderabad)\n`;
  content += `- [Weekend Self Drive Cars Hyderabad](${baseUrl}/weekend-self-drive-cars-hyderabad)\n`;
  content += `- [Self Drive SUV Rental Hyderabad](${baseUrl}/self-drive-suv-hyderabad)\n`;
  content += `- [Corporate Car Rental Hyderabad](${baseUrl}/corporate-car-rental-hyderabad)\n`;
  content += `- [Monthly Corporate Car Lease Hyderabad](${baseUrl}/monthly-corporate-car-rental-hyderabad)\n`;
  content += `- [Wedding Car Rental Hyderabad](${baseUrl}/wedding-car-rental-hyderabad)\n`;
  content += `- [Bridal Entry Car Rental Hyderabad](${baseUrl}/bridal-entry-car-hyderabad)\n`;
  content += `- [Groom Entry Luxury Car Hyderabad](${baseUrl}/groom-entry-luxury-car-hyderabad)\n`;
  content += `- [Rolls Royce Wedding Car Hyderabad](${baseUrl}/rolls-royce-wedding-hyderabad)\n`;
  content += `- [Vintage Open-Top Wedding Car Hyderabad](${baseUrl}/vintage-wedding-car-hyderabad)\n`;
  content += `- [Mercedes-Benz Rental Hyderabad](${baseUrl}/mercedes-rental-hyderabad)\n`;
  content += `- [BMW Rental Hyderabad](${baseUrl}/bmw-rental-hyderabad)\n`;
  content += `- [Audi Rental Hyderabad](${baseUrl}/audi-rental-hyderabad)\n`;
  content += `- [Range Rover Rental Hyderabad](${baseUrl}/range-rover-rental-hyderabad)\n`;
  content += `- [Luxury Chauffeur Service Hyderabad](${baseUrl}/luxury-chauffeur-hyderabad)\n`;
  content += `- [VIP & CEO Car Rental Hyderabad](${baseUrl}/vip-car-rental-hyderabad)\n`;
  content += `- [Chauffeur Cab Service Hyderabad](${baseUrl}/cabs)\n\n`;

  content += `## Hyderabad Neighborhood Delivery Hubs (15–20 Min Doorstep Delivery)\n`;
  for (const [slug, loc] of Object.entries(LOCATION_DEFAULTS)) {
    content += `- [Self Drive Cars in ${loc.name}](${baseUrl}/${slug}): ${loc.seoDescription}\n`;
  }

  content += `\n## Company & Support\n`;
  content += `- [Hyderabad Car Rental Guides & Blog](${baseUrl}/blog)\n`;
  content += `- [About DriveItCars](${baseUrl}/about)\n`;
  content += `- [Customer Reviews](${baseUrl}/reviews)\n`;
  content += `- [Partner With DriveItCars (Attach Your Car)](${baseUrl}/partner)\n`;
  content += `- [Contact DriveItCars Masab Tank Hub](${baseUrl}/contact)\n`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
