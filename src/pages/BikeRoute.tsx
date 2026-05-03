import { useParams, Navigate } from 'react-router-dom';
import { getBrand, getBike } from '@/data/bikes';
import BikeBrandPage from './BikeBrandPage';
import BikeModelPage from './BikeModelPage';

// Single dispatcher for /bikes/:slug. Brand slugs render the brand overview
// page (model tiles); bike slugs render the model accessories page.
export default function BikeRoute() {
  const { slug } = useParams<{ slug: string }>();
  if (!slug) return <Navigate to="/products" replace />;
  if (getBrand(slug)) return <BikeBrandPage />;
  if (getBike(slug)) return <BikeModelPage />;
  return <Navigate to="/products" replace />;
}
