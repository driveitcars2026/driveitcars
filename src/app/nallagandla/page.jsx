import LocationPageContent from '@/components/LocationPageContent';
import { getLocationMetadata } from '@/sanity/lib/locations';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata() {
  return getLocationMetadata('nallagandla');
}

export default function NallagandlaPage() {
  return <LocationPageContent slug="nallagandla" />;
}
