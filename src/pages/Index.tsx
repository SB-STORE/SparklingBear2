import { StorefrontLayout } from '@/components/layout/StorefrontLayout';
import { HeroCarousel } from '@/components/storefront/HeroCarousel';
import { TrustStrip } from '@/components/storefront/TrustStrip';
import { MosaicPromoGrid } from '@/components/storefront/MosaicPromoGrid';
import { BrandSlider } from '@/components/storefront/BrandSlider';
import { FeaturedCollection } from '@/components/storefront/FeaturedCollection';
import { PromoBanner } from '@/components/storefront/PromoBanner';
import { WhyChooseUs } from '@/components/storefront/WhyChooseUs';
import { TestimonialsSection } from '@/components/storefront/TestimonialsSection';
import { StoreLocation } from '@/components/storefront/StoreLocation';
import { FloatingButtons } from '@/components/storefront/FloatingButtons';

const Index = () => {
  return (
    <StorefrontLayout>
      <HeroCarousel />
      <TrustStrip />
      <MosaicPromoGrid />
      <FeaturedCollection title="BEST SELLERS" featured />
      <PromoBanner />
      <BrandSlider />
      <FeaturedCollection title="NEW ARRIVALS" featured moreLink="/products" />
      <WhyChooseUs />
      <TestimonialsSection />
      <StoreLocation />
      <FloatingButtons />
    </StorefrontLayout>
  );
};

export default Index;
