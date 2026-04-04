import { StorefrontLayout } from '@/components/layout/StorefrontLayout';
import { HeroCarousel } from '@/components/storefront/HeroCarousel';
import { BrandSlider } from '@/components/storefront/BrandSlider';
import { GridBanner } from '@/components/storefront/GridBanner';
import { FeaturedCollection } from '@/components/storefront/FeaturedCollection';
import { CategoryIconSlider } from '@/components/storefront/CategoryIconSlider';
import { VideoSection } from '@/components/storefront/VideoSection';
import { CustomerServiceIcons } from '@/components/storefront/CustomerServiceIcons';
import { useCategories } from '@/hooks/use-products';

const bannerMotorcycle = 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=1920&h=600&q=80&auto=format&fit=crop';
const bannerRidingGear = 'https://images.pexels.com/photos/6762793/pexels-photo-6762793.jpeg?auto=compress&cs=tinysrgb&w=1920';

const Index = () => {
  const { data: categories } = useCategories();

  return (
    <StorefrontLayout>
      <HeroCarousel />
      <BrandSlider />
      <GridBanner
        title="MOTORCYCLE ACCESSORIES"
        image={bannerMotorcycle}
        link="/products?category=bike-protection-fitments"
      />
      <FeaturedCollection title="NEW ARRIVALS" featured />
      <CategoryIconSlider
        title="SHOP BY CATEGORY"
        categories={categories || []}
      />
      <GridBanner
        title="RIDING GEARS"
        image={bannerRidingGear}
        link="/products?category=riding-gears-luggage"
      />
      <FeaturedCollection title="HELMETS" categorySlug="helmets" />
      <VideoSection />
      <CustomerServiceIcons />
    </StorefrontLayout>
  );
};

export default Index;
