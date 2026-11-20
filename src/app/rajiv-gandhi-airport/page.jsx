import LocationPageContent from '@/components/LocationPageContent';
import { getLocationMetadata } from '@/sanity/lib/locations';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata() {
  return getLocationMetadata('rajiv-gandhi-airport');
}

export default function RajivGandhiAirportPage() {
  return <LocationPageContent slug="rajiv-gandhi-airport" />;
}
