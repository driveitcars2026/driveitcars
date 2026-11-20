import LocationPageContent from '@/components/LocationPageContent';
import { getLocationMetadata } from '@/sanity/lib/locations';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata() {
  return getLocationMetadata('sr-nagar');
}

export default function SrNagarPage() {
  return <LocationPageContent slug="sr-nagar" />;
}
