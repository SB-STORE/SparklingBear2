import { StorefrontLayout } from '@/components/layout/StorefrontLayout';
import { HeroCarousel } from '@/components/storefront/HeroCarousel';
import { TrustStrip } from '@/components/storefront/TrustStrip';
import { CategoryGrid } from '@/components/storefront/CategoryGrid';
import { BrandSlider } from '@/components/storefront/BrandSlider';
import { FeaturedCollection } from '@/components/storefront/FeaturedCollection';
import { PromoBanner } from '@/components/storefront/PromoBanner';
import { ShopByBike } from '@/components/storefront/ShopByBike';
import { WhyChooseUs } from '@/components/storefront/WhyChooseUs';
import { TestimonialsSection } from '@/components/storefront/TestimonialsSection';
import { StoreLocation } from '@/components/storefront/StoreLocation';
import { CustomerServiceIcons } from '@/components/storefront/CustomerServiceIcons';
import { FloatingButtons } from '@/components/storefront/FloatingButtons';

const Index = () => {
  return (
    <StorefrontLayout>
      <HeroCarousel />
      <TrustStrip />
      <CategoryGrid />
      <FeaturedCollection title="BEST SELLERS" featured />
      <PromoBanner />
      <ShopByBike />
      <BrandSlider />
      <FeaturedCollection title="NEW ARRIVALS" featured moreLink="/products" />
      <WhyChooseUs />
      <TestimonialsSection />
      <StoreLocation />
      <CustomerServiceIcons />
      <FloatingButtons />
    </StorefrontLayout>
  );
};

export default Index;
