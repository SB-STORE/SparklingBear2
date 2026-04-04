import { StorefrontLayout } from '@/components/layout/StorefrontLayout';
import { HeroCarousel } from '@/components/storefront/HeroCarousel';
import { BrandSlider } from '@/components/storefront/BrandSlider';
import { GridBanner } from '@/components/storefront/GridBanner';
import { FeaturedCollection } from '@/components/storefront/FeaturedCollection';
import { CategoryIconSlider } from '@/components/storefront/CategoryIconSlider';
import { VideoSection } from '@/components/storefront/VideoSection';
import { CustomerServiceIcons } from '@/components/storefront/CustomerServiceIcons';
import { useCategories } from '@/hooks/use-products';

import heroCarImg from '@/assets/hero-car.jpg';
import heroBikeImg from '@/assets/hero-bike.jpg';

const Index = () => {
  const { data: categories } = useCategories();

  return (
    <StorefrontLayout>
      <HeroCarousel />
      <BrandSlider />
      <GridBanner
        title="MOTORCYCLE ACCESSORIES"
        image={heroCarImg}
        link="/products?category=bike-protection-fitments"
      />
      <FeaturedCollection title="NEW ARRIVALS" featured />
      <CategoryIconSlider
        title="SHOP BY CATEGORY"
        categories={categories || []}
      />
      <GridBanner
        title="RIDING GEARS"
        image={heroBikeImg}
        link="/products?category=riding-gears-luggage"
      />
      <FeaturedCollection title="HELMETS" categorySlug="helmets" />
      <VideoSection />
      <CustomerServiceIcons />
    </StorefrontLayout>
  );
};

export default Index;
