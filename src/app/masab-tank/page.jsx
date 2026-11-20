import LocationPageContent from '@/components/LocationPageContent';
import { getLocationMetadata } from '@/sanity/lib/locations';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata() {
  return getLocationMetadata('masab-tank');
}

export default function MasabTankPage() {
  return <LocationPageContent slug="masab-tank" />;
}
