import LocationPageContent from '@/components/LocationPageContent';
import { getLocationMetadata } from '@/sanity/lib/locations';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata() {
  return getLocationMetadata('jubilee-hills');
}

export default function JubileeHillsPage() {
  return <LocationPageContent slug="jubilee-hills" />;
}
